// backend-node/routes/classify-campaign-type.js

import express from 'express';
import path from 'path';
import fs from 'fs/promises'; // Using fs.promises for async file reading
import { fileURLToPath } from 'url';

const router = express.Router();

// --- Determine Directory Path ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, '..', 'data'); // Assumes data folder is at backend-node/data

// --- Load JSON Data Asynchronously ---
let campaignData = {
    types: [], subtypes: [], useCases: [], goalsData: [], // Renamed to goalsData to avoid conflict with summary.goals
    goalMappings: [],
    isLoaded: false, loadError: null,
    typesMap: new Map(), subtypesMap: new Map(), useCasesMap: new Map(),
    // goalsMap: new Map(), // For mapping various goal inputs (name, id) to a canonical ID
    canonicalGoalDetails: new Map(), // Map<canonical_id, full_goal_object_with_keywords>
    goalMappingsMap: new Map() // For mapping use_case_id to its goal priorities
};

async function loadData() {
    const filesToLoad = [
        { key: 'types', file: 'campaign_types.json' },
        { key: 'subtypes', file: 'campaign_subtypes.json' },
        { key: 'useCases', file: 'campaign_use_cases.json' },
        { key: 'goalsData', file: 'campaign_goals.json' }, // Loads into goalsData
        { key: 'goalMappings', file: 'goal_mappings.json' },
    ];
    try {
        console.log(`[classify-campaign] INFO: Attempting to load JSON data from ${dataDir}`);
        const results = await Promise.allSettled(
            filesToLoad.map(item =>
                fs.readFile(path.join(dataDir, item.file), 'utf-8').then(JSON.parse)
            )
        );
        let allSucceeded = true;
        results.forEach((result, index) => {
            const item = filesToLoad[index];
            if (result.status === 'fulfilled') {
                campaignData[item.key] = result.value;
            } else {
                allSucceeded = false;
                console.error(`[classify-campaign] ERROR: Failed to load ${item.file}:`, result.reason);
                campaignData.loadError = campaignData.loadError || result.reason; // Store first error
            }
        });

        if (!allSucceeded) {
            const goalMappingsFileConfig = filesToLoad.find(item => item.key === 'goalMappings');
            const loadedGoalMappings = campaignData.goalMappings;
            if (goalMappingsFileConfig && (!loadedGoalMappings || (Array.isArray(loadedGoalMappings) && loadedGoalMappings.length === 0))) {
                 console.error(`[classify-campaign] CRITICAL: ${goalMappingsFileConfig.file} failed to load or is empty. Classification depends heavily on this file.`);
            }
            // Do not throw here, let the route handler check campaignData.isLoaded
        }

        // --- Populate maps ---
        campaignData.types.forEach(t => campaignData.typesMap.set(t.id, t));
        campaignData.subtypes.forEach(st => {
            let currentId = st.id.toLowerCase().trim();
            let currentTypeId = st.type_id.toLowerCase().trim();
            if (currentId === 'envrionmental_political') currentId = 'environmental_political';
            if (currentTypeId === 'environmental ') currentTypeId = 'environmental';
            campaignData.subtypesMap.set(currentId, {...st, id: currentId, type_id: currentTypeId});
        });
        campaignData.useCases.forEach(uc => campaignData.useCasesMap.set(uc.id, uc));

        // Populate canonicalGoalDetails with full goal objects including keywords
        if (Array.isArray(campaignData.goalsData)) {
            campaignData.goalsData.forEach(g => {
                if (g && g.id && g.name) {
                    let canonId = g.id.toLowerCase().trim();
                    if (canonId === 'poltical_decision') canonId = 'political_decision'; // Correction
                    // Store the full goal object, including keywords
                    campaignData.canonicalGoalDetails.set(canonId, {
                        ...g,
                        id: canonId, // ensure ID is normalized
                        name: g.name.trim(),
                        keywords: Array.isArray(g.keywords) ? g.keywords.map(kw => String(kw).toLowerCase().trim()) : []
                    });
                } else {
                    console.warn(`[classify-campaign] WARN: Invalid goal object in campaign_goals.json:`, g);
                }
            });
        } else {
            console.error('[classify-campaign] CRITICAL: campaign_goals.json data is not an array or is missing.');
            campaignData.goalsData = []; // Ensure it's an array to prevent errors later
        }
        console.log('[classify-campaign] DEBUG: Loaded Canonical Goal Details:', Array.from(campaignData.canonicalGoalDetails.keys()));


        if (Array.isArray(campaignData.goalMappings)) {
            campaignData.goalMappings.forEach(gm => {
                if (gm && gm.use_case_id) {
                    const priorities = new Map();
                    if(Array.isArray(gm.goals)) {
                        gm.goals.forEach(g => {
                            if (g && g.goal_id) {
                                const inputGoalIdLower = String(g.goal_id).toLowerCase().trim();
                                // Check if this ID exists in our canonicalGoalDetails
                                if (campaignData.canonicalGoalDetails.has(inputGoalIdLower)) {
                                     priorities.set(inputGoalIdLower, g.priority);
                                } else {
                                     console.warn(`[classify-campaign] WARN: Goal ID "${g.goal_id}" in goal_mappings for use case "${gm.use_case_id}" is not a recognized canonical goal ID.`);
                                }
                            }
                        });
                    } else {
                         console.warn(`[classify-campaign] WARN: goals array missing or invalid for use_case_id "${gm.use_case_id}" in goal_mappings.json`);
                    }
                    campaignData.goalMappingsMap.set(gm.use_case_id, priorities);
                }
            });
        } else {
            console.error('[classify-campaign] CRITICAL: goal_mappings.json data is not an array or is missing. Classification will likely fail.');
            campaignData.goalMappings = [];
        }
        // --- End populating maps ---

        if (allSucceeded) {
            campaignData.isLoaded = true;
            campaignData.loadError = null; // Clear any previous non-critical errors if all files are now loaded
            console.log(`[classify-campaign] INFO: Successfully processed relational JSON data files.`);
        } else {
            // If any file failed, isLoaded remains false
            console.error(`[classify-campaign] ERROR: Not all data files loaded successfully. Classification service might be impaired.`);
        }

    } catch (err) {
         campaignData.loadError = err; // Store critical processing error
         campaignData.isLoaded = false;
         console.error(`[classify-campaign] ERROR: Critical failure during data loading or processing:`, err);
    }
}
loadData(); // Call loadData immediately when module loads

// --- Classification Logic ---
function classifyCampaign(summary) {
    const matchedCanonicalGoals = []; // [{ id: <canonical_id>, rank: <original_index_for_tie_breaking_later_if_needed> }]

    if (Array.isArray(summary.goals)) {
        summary.goals.forEach((goalDescription, index) => {
            const goalDescLower = String(goalDescription).toLowerCase().trim();
            let foundMatchForThisDesc = false;

            // Attempt 1: Match using keywords
            for (const [canonId, goalDetail] of campaignData.canonicalGoalDetails.entries()) {
                if (goalDetail.keywords && goalDetail.keywords.length > 0) {
                    for (const keyword of goalDetail.keywords) {
                        // Using regex for whole word matching of keyword
                        const keywordPattern = new RegExp(`\\b${keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'i');
                        if (keywordPattern.test(goalDescLower)) {
                            matchedCanonicalGoals.push({ id: canonId, rank: index + 1 });
                            console.log(`[classify-campaign] INFO: Matched "${goalDescription}" to canonical goal "${canonId}" using keyword "${keyword}"`);
                            foundMatchForThisDesc = true;
                            break; // Keyword found for this canonical goal, move to next user goal description
                        }
                    }
                }
                if (foundMatchForThisDesc) break; // Matched this user goal description, move to next one
            }

            // Attempt 2: Fallback - Match canonical name (if keywords didn't match)
            if (!foundMatchForThisDesc) {
                for (const [canonId, goalDetail] of campaignData.canonicalGoalDetails.entries()) {
                    const canonNameLower = goalDetail.name.toLowerCase();
                    const namePattern = new RegExp(`\\b${canonNameLower.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'i');
                    if (namePattern.test(goalDescLower)) {
                        matchedCanonicalGoals.push({ id: canonId, rank: index + 1 });
                        console.log(`[classify-campaign] INFO: Matched "${goalDescription}" to canonical goal "${canonId}" using canonical name "${goalDetail.name}" (fallback).`);
                        foundMatchForThisDesc = true;
                        break;
                    }
                }
            }
            
            // Attempt 3: Fallback - ID part match (if still no match)
            if (!foundMatchForThisDesc) {
                for (const [canonId] of campaignData.canonicalGoalDetails.entries()) { // Iterate canonId from canonicalGoalDetails keys
                     const idParts = canonId.split('_');
                     if (idParts.some(part => part.length > 2 && goalDescLower.includes(part))) { // Min part length 3
                         console.warn(`[classify-campaign] WARN: Using fallback ID part match for "${goalDescription}" -> ${canonId}`);
                         matchedCanonicalGoals.push({ id: canonId, rank: index + 1 });
                         foundMatchForThisDesc = true;
                         break;
                     }
                }
            }

            if (!foundMatchForThisDesc) {
                 console.warn(`[classify-campaign] WARN: User goal description "${goalDescription}" (original index ${index}) did not match any canonical goal.`);
            }
        });
    }
    console.log(`[classify-campaign] INFO: Normalized Canonical Goal IDs (from summary goals):`, matchedCanonicalGoals);

    if (matchedCanonicalGoals.length === 0) {
        console.log(`[classify-campaign] INFO: No goals from summary could be normalized. Cannot classify based on goals.`);
        return null;
    }

    let bestUseCaseId = null;
    let highestScore = -1;
    let bestUseCaseDetails = {};

    campaignData.goalMappingsMap.forEach((useCaseGoalPriorities, useCaseId) => {
        let currentScore = 0;
        let matchedGoalCountInUseCase = 0;
        let contributingGoalsToScore = [];

        matchedCanonicalGoals.forEach(userGoal => {
            if (useCaseGoalPriorities.has(userGoal.id)) {
                matchedGoalCountInUseCase++;
                const predefinedPriority = useCaseGoalPriorities.get(userGoal.id);
                // Scoring: lower priority number = higher score.
                // Max priority could be e.g. 8, so (9 - priority) gives higher score for priority 1.
                // Adjust the '9' if your max priority number is different.
                let goalScore = (10 - predefinedPriority); // Example: priority 1 -> 9 points, priority 8 -> 2 points.
                currentScore += goalScore;
                contributingGoalsToScore.push({goal: userGoal.id, priority: predefinedPriority, score: goalScore});
            }
        });
        
        // console.log(`[classify-campaign] DEBUG: Use Case ${useCaseId} - Score: ${currentScore}, Matched Goals: ${matchedGoalCountInUseCase}, Contributing:`, contributingGoalsToScore);


        if (matchedGoalCountInUseCase > 0) { // Only consider use cases that had at least one goal match
            if (currentScore > highestScore) {
                highestScore = currentScore;
                bestUseCaseId = useCaseId;
                bestUseCaseDetails = { score: currentScore, contributingGoals: contributingGoalsToScore, matchedGoalCount: matchedGoalCountInUseCase };
            } else if (currentScore === highestScore) {
                // Handle ties: e.g., prefer the one with more matched goals, or one with higher priority primary goal
                // For now, just log the tie. The first one encountered with the high score will be kept.
                const existingBestContributing = bestUseCaseDetails.contributingGoals?.map(g=>g.goal).join(',');
                const currentContributing = contributingGoalsToScore.map(g=>g.goal).join(',');
                console.log(`[classify-campaign] INFO: Tie in score for Use Case ID: ${useCaseId} (Score: ${currentScore.toFixed(2)}, Matched: ${matchedGoalCountInUseCase}, Goals: ${currentContributing}) with ${bestUseCaseId} (Goals: ${existingBestContributing})`);
            }
        }
    });

    if (!bestUseCaseId) {
        console.log(`[classify-campaign] INFO: No matching use case found based on goal priorities and normalized summary goals.`);
        return null;
    }
    console.log(`[classify-campaign] INFO: Best matching Use Case ID determined by goals: ${bestUseCaseId} (Score: ${highestScore.toFixed(2)}, Details: ${JSON.stringify(bestUseCaseDetails)})`);

    const bestUseCase = campaignData.useCasesMap.get(bestUseCaseId);
    if (!bestUseCase) { console.error(`[classify-campaign] ERROR: Data inconsistency - Use Case ${bestUseCaseId} not found in useCasesMap.`); return null; }
    
    // Find bestSubtype: Ensure subtype_id from use case matches an ID in subtypesMap
    const subtypeForUseCase = String(bestUseCase.subtype_id).toLowerCase().trim();
    let bestSubtype = null;
    for(const [id, subtype] of campaignData.subtypesMap.entries()){
        // The subtype_id in use_cases.json might be a "core" name like "industrial"
        // while the actual subtype ID in campaign_subtypes.json might be "union_industrial".
        // This checks if the subtype's ID ends with the use case's subtype_id, or direct match.
        if(id === subtypeForUseCase || id.split('_').pop() === subtypeForUseCase){
            bestSubtype = subtype;
            break;
        }
    }
    if (!bestSubtype) { console.error(`[classify-campaign] ERROR: Data inconsistency - Subtype for use case subtype_id "${subtypeForUseCase}" (from use case ${bestUseCaseId}) not found in subtypesMap.`); return null; }
    
    const bestType = campaignData.typesMap.get(String(bestSubtype.type_id).toLowerCase().trim());
    if (!bestType) { console.error(`[classify-campaign] ERROR: Data inconsistency - Type for subtype type_id "${bestSubtype.type_id}" (from subtype ${bestSubtype.id}) not found in typesMap.`); return null; }
    
    console.log(`[classify-campaign] INFO: Classification Path: Type=${bestType.name}(${bestType.id}), Subtype=${bestSubtype.name}(${bestSubtype.id}), UseCase=${bestUseCase.name}(${bestUseCase.id})`);

    return {
        id: bestUseCaseId, // This is the use_case.id
        primary_type: bestType.name,
        secondary_type: bestSubtype.name,
        sub_type: bestUseCase.name, // This is the use_case.name
        type_id: bestType.id,
        subtype_id: bestSubtype.id, // This is the actual matched subtype ID
        confidence: parseFloat(highestScore.toFixed(2)) // Ensure confidence is a number
    };
}
// --- End Classification Logic ---


// --- Route Handler ---
router.post('/', (req, res) => {
    const requestTimestamp = new Date().toISOString();
    console.log(`[${requestTimestamp}] INFO: Received POST /api/classify-campaign-type`);

    if (!campaignData.isLoaded) {
        const loadErrorMessage = campaignData.loadError ? campaignData.loadError.message : "Unknown data loading error";
        console.error(`[${requestTimestamp}] ERROR: Classification unavailable - data not loaded. Load Error: ${loadErrorMessage}`);
        return res.status(503).json({ error: 'Classification service temporarily unavailable (data loading error).', details: loadErrorMessage });
    }

    const { summary } = req.body;

    console.log(`[${requestTimestamp}] [classify-campaign] DEBUG: Received summary for classification:`, JSON.stringify(summary, null, 2));

    if (!summary || typeof summary !== 'object' || 
        typeof summary.purpose !== 'string' || 
        typeof summary.audience !== 'string' || 
        typeof summary.target !== 'string' || 
        !Array.isArray(summary.goals)) {
      console.warn(`[${requestTimestamp}] WARN: Received invalid or incomplete summary object. Summary keys:`, Object.keys(summary || {}));
      return res.status(400).json({ error: 'Invalid summary object. Must include string fields: purpose, audience, target, and an array field: goals.' });
    }
     console.log(`[${requestTimestamp}] DEBUG: Received summary goals (free-text from AI for classification):`, summary.goals);

    const result = classifyCampaign(summary); // This function now handles unranked goals

    if (!result) {
      console.log(`[${requestTimestamp}] INFO: Classification result: No match found.`);
      return res.status(200).json({
        match: null,
        // confidence: 0.0, // Confidence is part of the result object now
        message: 'Could not classify campaign type based on provided summary goals.'
      });
    } else {
      console.log(`[${requestTimestamp}] INFO: Classification result: Match found - Type: ${result.primary_type}, SubType: ${result.secondary_type}, UseCase: ${result.sub_type}, Confidence: ${result.confidence}`);
      return res.status(200).json({
        match: result, // result already contains confidence
        message: 'Campaign type classification successful.'
      });
    }
});
// --- End Route Handler ---

export default router;
