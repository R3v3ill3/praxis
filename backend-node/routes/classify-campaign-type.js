// backend-node/routes/classify-campaign-type.js

import express from 'express';
import path from 'path';
import fs from 'fs/promises'; // Using fs.promises for async file reading
import { fileURLToPath } from 'url';
// Ensure goal-mapping.js is primarily used for formatting the response,
// while this file handles the core classification logic against detailed JSON data.
import { mapGoalsToCanonical, formatCanonicalGoalsForFirestore } from './goal-mapping.js';

const router = express.Router();

// --- Determine Directory Path ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, '..', 'data'); // Assumes data folder is at backend-node/data

// --- Global Campaign Data Store ---
let campaignDataStore = {
    types: [],
    subtypes: [],
    useCases: [],
    goalsData: [],    // Raw data from campaign_goals.json
    goalMappings: [], // Raw data from goal_mappings.json
    isLoaded: false,
    loadError: null,
    typesMap: new Map(),           // Map<id, typeObject>
    subtypesMap: new Map(),        // Map<id, subtypeObject>
    useCasesMap: new Map(),        // Map<id, useCaseObject>
    canonicalGoalDetails: new Map(), // Map<goal_id, goalDetailObject> from campaign_goals.json
    goalMappingsMap: new Map()     // Map<use_case_id, Map<goal_id, rank>> from goal_mappings.json
};

async function loadAndProcessData() {
    const filesToLoad = [
        { key: 'types', file: 'campaign_types.json', map: campaignDataStore.typesMap, idField: 'id' },
        { key: 'subtypes', file: 'campaign_subtypes.json', map: campaignDataStore.subtypesMap, idField: 'id' },
        { key: 'useCases', file: 'campaign_use_cases.json', map: campaignDataStore.useCasesMap, idField: 'id' },
        { key: 'goalsData', file: 'campaign_goals.json', map: campaignDataStore.canonicalGoalDetails, idField: 'id' },
        { key: 'goalMappings', file: 'goal_mappings.json' } // Special handling for goalMappingsMap
    ];

    console.log(`[classify-campaign] INFO: Starting data load from ${dataDir}`);
    let allSucceeded = true;

    for (const item of filesToLoad) {
        try {
            const filePath = path.join(dataDir, item.file);
            const fileContent = await fs.readFile(filePath, 'utf-8');
            const jsonData = JSON.parse(fileContent);
            campaignDataStore[item.key] = jsonData; // Store raw data

            if (item.map && item.idField) { // Populate simple maps
                if (Array.isArray(jsonData)) {
                    jsonData.forEach(entry => {
                        if (entry && entry[item.idField]) {
                            item.map.set(entry[item.idField], entry);
                        } else {
                            console.warn(`[classify-campaign] WARN: Entry in ${item.file} missing '${item.idField}' or is invalid. Entry:`, entry);
                        }
                    });
                    console.log(`[classify-campaign] INFO: Loaded and mapped ${item.map.size} entries from ${item.file} into ${item.key}Map.`);
                } else {
                    throw new Error(`${item.file} did not parse into an array.`);
                }
            }
        } catch (err) {
            allSucceeded = false;
            campaignDataStore.loadError = err;
            console.error(`[classify-campaign] ERROR: Failed to load or process ${item.file}:`, err.message, err.stack ? err.stack.split('\n')[1] : '');
            // If critical files like goalsData or goalMappings fail, classification will be severely impacted.
            if (item.key === 'goalsData' || item.key === 'goalMappings') {
                console.error(`[classify-campaign] CRITICAL: Failure with ${item.file} will prevent proper classification.`);
            }
        }
    }

    // Special handling for goalMappingsMap
    if (allSucceeded && Array.isArray(campaignDataStore.goalMappings)) {
        campaignDataStore.goalMappings.forEach(mapping => {
            if (mapping && mapping.use_case_id && Array.isArray(mapping.goals)) {
                const prioritiesMap = new Map();
                mapping.goals.forEach(p => {
                    if (p && p.goal_id && typeof p.priority === 'number') {
                        prioritiesMap.set(p.goal_id, p.priority);
                    } else {
                         console.warn(`[classify-campaign] WARN: Invalid goal_priority entry in goal_mappings.json for use_case_id ${mapping.use_case_id}. Entry:`, p);
                    }
                });
                if (prioritiesMap.size > 0) {
                    campaignDataStore.goalMappingsMap.set(mapping.use_case_id, prioritiesMap);
                }
            } else {
                console.warn(`[classify-campaign] WARN: Invalid mapping entry in goal_mappings.json. Entry:`, mapping);
            }
        });
        console.log(`[classify-campaign] INFO: Processed ${campaignDataStore.goalMappingsMap.size} entries into goalMappingsMap.`);
    } else if (allSucceeded && !Array.isArray(campaignDataStore.goalMappings)) {
        console.error("[classify-campaign] CRITICAL: goal_mappings.json did not parse into an array, but other files succeeded.");
        allSucceeded = false; // Mark as not fully loaded if this critical part fails
    }


    if (allSucceeded) {
        campaignDataStore.isLoaded = true;
        campaignDataStore.loadError = null;
        console.log(`[classify-campaign] INFO: All campaign data files loaded and processed successfully.`);
        // console.log('[classify-campaign] DEBUG: Canonical Goal IDs loaded:', Array.from(campaignDataStore.canonicalGoalDetails.keys()));
        // console.log('[classify-campaign] DEBUG: Use Case IDs in goalMappingsMap:', Array.from(campaignDataStore.goalMappingsMap.keys()));
    } else {
        campaignDataStore.isLoaded = false; // Ensure this is false if any step failed
        console.error(`[classify-campaign] ERROR: Not all data files loaded successfully. Classification service may be impaired.`);
    }
}

// Load data when the module is initialized
loadAndProcessData();

function classifyCampaignByGoals(summaryGoals) {
    if (!campaignDataStore.isLoaded || campaignDataStore.canonicalGoalDetails.size === 0 || campaignDataStore.goalMappingsMap.size === 0) {
        console.warn('[classify-campaign] WARN: Classification attempted but data not fully loaded or critical maps are empty.');
        console.warn(`[classify-campaign] WARN: Details - isLoaded: ${campaignDataStore.isLoaded}, canonicalGoalDetails size: ${campaignDataStore.canonicalGoalDetails.size}, goalMappingsMap size: ${campaignDataStore.goalMappingsMap.size}`);
        return null;
    }

    const matchedCanonicalGoals = [];
    if (Array.isArray(summaryGoals)) {
        summaryGoals.forEach((goalDescription, index) => {
            const goalDescLower = String(goalDescription).toLowerCase().trim();
            // console.log(`[classify-campaign] DEBUG: Processing user goal for classification: "${goalDescLower}"`);
            let foundMatchForThisDesc = false;
            for (const [canonId, goalDetail] of campaignDataStore.canonicalGoalDetails.entries()) {
                if (goalDetail.keywords && Array.isArray(goalDetail.keywords) && goalDetail.keywords.length > 0) {
                    for (const keyword of goalDetail.keywords) {
                        const keywordPattern = new RegExp(`\\b${keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'i');
                        if (keywordPattern.test(goalDescLower)) {
                            // console.log(`[classify-campaign] DEBUG: Match! User goal "${goalDescLower}" matched keyword "${keyword}" for canonical ID "${canonId}"`);
                            // Ensure we don't add duplicate canonical goals if multiple user goals map to the same one,
                            // but preserve their original index for potential future ranking tie-breaking (if needed).
                            if (!matchedCanonicalGoals.some(g => g.id === canonId)) {
                                matchedCanonicalGoals.push({ id: canonId, originalIndex: index });
                            }
                            foundMatchForThisDesc = true;
                            break; // Found a keyword match for this canonical goal.
                        }
                    }
                }
                if (foundMatchForThisDesc) break; // Matched this user goal to a canonical goal. Move to next user goal.
            }
            if (!foundMatchForThisDesc) {
                console.warn(`[classify-campaign] WARN: User goal description "${goalDescription}" did not match any canonical goal via keywords.`);
            }
        });
    } else {
        console.warn('[classify-campaign] WARN: summary.goals is not an array or is missing for classification.');
        return null;
    }

    console.log('[classify-campaign] INFO: Matched canonical goals from summary:', matchedCanonicalGoals);

    if (matchedCanonicalGoals.length === 0) {
        console.log('[classify-campaign] INFO: No canonical goals were matched from the summary. Cannot classify by goals.');
        return null;
    }

    let bestUseCaseId = null;
    let highestScore = -1;

    campaignDataStore.goalMappingsMap.forEach((useCaseGoalPriorities, useCaseId) => { // useCaseGoalPriorities is a Map<goal_id, rank>
        let currentScore = 0;
        let matchedGoalsForThisUseCase = 0;
        matchedCanonicalGoals.forEach(userGoal => { // userGoal is { id: canonId, originalIndex: index }
            if (useCaseGoalPriorities.has(userGoal.id)) {
                // Simple scoring: points for matching, more points for higher ranked goals (lower rank number = higher priority)
                // Max rank is typically 10, so (11 - rank) gives more points to rank 1.
                currentScore += (11 - useCaseGoalPriorities.get(userGoal.id));
                matchedGoalsForThisUseCase++;
            }
        });

        // console.log(`[classify-campaign] DEBUG: Scoring Use Case ID "${useCaseId}": Score = ${currentScore}, Matched Goals = ${matchedGoalsForThisUseCase}`);

        if (matchedGoalsForThisUseCase > 0 && currentScore > highestScore) {
            highestScore = currentScore;
            bestUseCaseId = useCaseId;
        }
        // Basic tie-breaking: if scores are equal, prefer the one that matched more goals (if implemented)
        // For now, first one with highest score wins.
    });

    if (!bestUseCaseId) {
        console.log('[classify-campaign] INFO: No use case found based on goal scoring.');
        return null;
    }

    const bestUseCase = campaignDataStore.useCasesMap.get(bestUseCaseId);
    if (!bestUseCase) {
        console.error(`[classify-campaign] ERROR: Best use case ID "${bestUseCaseId}" found, but no corresponding object in useCasesMap.`);
        return null;
    }

    // The subtype_id in campaign_use_cases.json might be the core part (e.g., 'industrial')
    // or the full ID (e.g., 'union_industrial'). We need to find the matching subtype object.
    const subtypeIdForUseCase = String(bestUseCase.subtype_id).toLowerCase().trim();
    let bestSubtype = campaignDataStore.subtypesMap.get(subtypeIdForUseCase);

    if (!bestSubtype) { // Try matching by the core part if full ID didn't match
        for (const [id, subtype] of campaignDataStore.subtypesMap.entries()) {
            if (id.endsWith(`_${subtypeIdForUseCase}`) || id === subtypeIdForUseCase) { // More flexible match
                bestSubtype = subtype;
                break;
            }
        }
    }

    if (!bestSubtype) {
        console.error(`[classify-campaign] ERROR: Use case "${bestUseCase.name}" has subtype_id "${subtypeIdForUseCase}", but no matching subtype found in subtypesMap.`);
        return null;
    }

    const bestType = campaignDataStore.typesMap.get(String(bestSubtype.type_id).toLowerCase().trim());
    if (!bestType) {
        console.error(`[classify-campaign] ERROR: Subtype "${bestSubtype.name}" has type_id "${bestSubtype.type_id}", but no matching type found in typesMap.`);
        return null;
    }

    return {
        id: bestUseCaseId, // This is the use_case_id
        primary_type: bestType.name,
        secondary_type: bestSubtype.name,
        sub_type: bestUseCase.name, // This is the use_case name
        type_id: bestType.id,
        subtype_id: bestSubtype.id, // This is the full subtype ID
        confidence_score: parseFloat(highestScore.toFixed(2)) // Or some other metric of confidence
    };
}

// --- Route Handler ---
router.post('/', async (req, res) => {
    const requestTimestamp = new Date().toISOString();
    console.log(`[${requestTimestamp}] INFO: POST /api/classify-campaign-type received.`);

    if (!campaignDataStore.isLoaded) {
        const loadErrorMessage = campaignDataStore.loadError ? campaignDataStore.loadError.message : "Data not yet loaded or a loading error occurred.";
        console.error(`[${requestTimestamp}] ERROR: Classification service unavailable. Detail: ${loadErrorMessage}`);
        // Retry loading if it failed previously and was transient? For now, just report error.
        // await loadAndProcessData(); // Be cautious with retrying on every request.
        // if (!campaignDataStore.isLoaded) { ... }
        return res.status(503).json({ error: 'Classification service temporarily unavailable.', details: loadErrorMessage });
    }

    const { summary } = req.body;

    if (!summary || typeof summary !== 'object' || !Array.isArray(summary.goals)) {
      console.warn(`[${requestTimestamp}] WARN: Received invalid or incomplete summary object for classification. Summary:`, summary);
      return res.status(400).json({ error: 'Invalid or incomplete summary object for classification. "summary" and "summary.goals" (array) are required.' });
    }
    console.log(`[${requestTimestamp}] DEBUG: Received summary for classification:`, JSON.stringify(summary, null, 2));

    const classificationMatch = classifyCampaignByGoals(summary.goals);

    let processedGoalsForResponse = [];
    // The mapGoalsToCanonical from goal-mapping.js uses a simpler synonym list.
    // This is fine for providing a quick canonical version of goals in the response,
    // but the classification logic above should rely on the richer keyword data from campaign_goals.json.
    try {
        const canonicalGoalIdsFromSynonyms = mapGoalsToCanonical(summary.goals);
        processedGoalsForResponse = formatCanonicalGoalsForFirestore(canonicalGoalIdsFromSynonyms);
        console.log(`[${requestTimestamp}] INFO: Goals processed for response (using goal-mapping.js synonyms):`, processedGoalsForResponse);
    } catch (goalMappingError) {
        console.error(`[${requestTimestamp}] ERROR: Failed to map goals for response using goal-mapping.js:`, goalMappingError);
        // Continue without processed_goals in response if this fails, classificationMatch is more important.
    }

    if (!classificationMatch) {
      console.log(`[${requestTimestamp}] INFO: Classification result: No programmatic match found based on goals.`);
      return res.status(200).json({ // Still 200, but with match: null
        match: null,
        message: 'Could not classify campaign type based on provided summary goals.',
        processed_goals: processedGoalsForResponse // Send back goals processed by simpler synonym matching
      });
    } else {
      console.log(`[${requestTimestamp}] INFO: Classification result: Match found - Type: ${classificationMatch.primary_type}, SubType: ${classificationMatch.secondary_type}, UseCase: ${classificationMatch.sub_type}, Score: ${classificationMatch.confidence_score}`);
      return res.status(200).json({
        match: classificationMatch,
        message: 'Campaign type classification successful.',
        processed_goals: processedGoalsForResponse
      });
    }
});

export default router;
