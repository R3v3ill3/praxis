    // backend-node/routes/classify-campaign-type.js

    import express from 'express';
    import path from 'path';
    import fs from 'fs/promises';
    import { fileURLToPath } from 'url';

    const router = express.Router();

    // --- Determine Directory Path ---
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const dataDir = path.join(__dirname, '..', 'data');

    // --- Load JSON Data Asynchronously ---
    let campaignData = {
        types: [], subtypes: [], useCases: [], goals: [], goalMappings: [],
        isLoaded: false, loadError: null,
        typesMap: new Map(), subtypesMap: new Map(), useCasesMap: new Map(),
        goalsMap: new Map(), goalMappingsMap: new Map(),
        // Store canonical goal names/IDs for matching
        canonicalGoalNames: new Map() // Map<canonical_id, canonical_name_lower>
    };

    async function loadData() {
        const filesToLoad = [
            { key: 'types', file: 'campaign_types.json' },
            { key: 'subtypes', file: 'campaign_subtypes.json' },
            { key: 'useCases', file: 'campaign_use_cases.json' },
            { key: 'goals', file: 'campaign_goals.json' },
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
                throw campaignData.loadError || new Error("One or more data files failed to load.");
            }

            // --- Populate maps ---
            campaignData.types.forEach(t => campaignData.typesMap.set(t.id, t));
            campaignData.subtypes.forEach(st => {
                if (st.id === 'envrionmental_political') { st.id = 'environmental_political'; st.type_id = 'environmental'; }
                campaignData.subtypesMap.set(st.id, st);
            });
            campaignData.useCases.forEach(uc => campaignData.useCasesMap.set(uc.id, uc));

            // Build goalsMap AND canonicalGoalNames map
            campaignData.goals.forEach(g => {
                let canonId = g.id === 'poltical_decision' ? 'political_decision' : g.id;
                const canonNameLower = g.name.toLowerCase();
                campaignData.goalsMap.set(canonNameLower, canonId);
                campaignData.goalsMap.set(g.id.toLowerCase(), canonId);
                if (canonId !== g.id) {
                     campaignData.goalsMap.set(canonId.toLowerCase(), canonId);
                }
                // Store canonical name associated with the canonical ID
                campaignData.canonicalGoalNames.set(canonId, canonNameLower);
            });

            // Build goalMappingsMap using canonical IDs
            campaignData.goalMappings.forEach(gm => {
                const priorities = new Map();
                if(Array.isArray(gm.goals)) {
                    gm.goals.forEach(g => {
                        // Find the canonical ID using the potentially misspelled ID from the mapping file
                        const canonicalGoalId = campaignData.goalsMap.get(g.goal_id.toLowerCase());
                        if (canonicalGoalId) {
                             // Store the priority using the CORRECTED canonical ID
                             priorities.set(canonicalGoalId, g.priority);
                        } else {
                             // This warning should now only appear if a goal_id truly doesn't exist in campaign_goals.json
                             console.warn(`[classify-campaign] WARN: Goal ID "${g.goal_id}" in goal_mappings for use case "${gm.use_case_id}" could not be mapped to a canonical ID.`);
                        }
                    });
                } else {
                     console.warn(`[classify-campaign] WARN: goals array missing or invalid for use_case_id "${gm.use_case_id}" in goal_mappings.json`);
                }
                campaignData.goalMappingsMap.set(gm.use_case_id, priorities);
            });
            // --- End populating maps ---

            campaignData.isLoaded = true;
            campaignData.loadError = null;
            console.log(`[classify-campaign] INFO: Successfully processed relational JSON data files.`);
        } catch (err) {
             campaignData.loadError = err; // Ensure error is stored if loading fails
             console.error(`[classify-campaign] ERROR: Critical failure during data loading or processing:`, err);
             // Keep isLoaded false
        }
    }
    loadData(); // Call loadData immediately when module loads
    // --- End Load JSON Data ---


    // --- Classification Logic ---
    function classifyCampaign(summary) {
        // 1. Normalize User Goals by matching canonical names within descriptions
        const userRankedGoalIds = [];
        if (Array.isArray(summary.goals)) {
            summary.goals.forEach((goalDescription, index) => {
                const goalDescLower = String(goalDescription).toLowerCase().trim();
                let bestMatchId = null;
                let longestMatchLength = 0;

                // Iterate through the canonical goal map <canonId, canonNameLower>
                for (const [canonId, canonNameLower] of campaignData.canonicalGoalNames.entries()) {
                    // Match whole word using regex boundary anchors (^|\W) and (\W|$)
                    const pattern = new RegExp(`(^|\\W)${canonNameLower.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}(\\W|$)`); // Escape regex special chars in name
                    if (pattern.test(goalDescLower)) {
                        // Prioritize longer matches if multiple canonical names match (e.g., "political decision" vs "decision")
                        if (canonNameLower.length > longestMatchLength) {
                            bestMatchId = canonId;
                            longestMatchLength = canonNameLower.length;
                        }
                    }
                }

                if (bestMatchId) {
                    userRankedGoalIds.push({ id: bestMatchId, rank: index + 1 });
                } else {
                    // Fallback: Check if description contains parts of the ID (less reliable)
                    for (const [canonId] of campaignData.canonicalGoalNames.entries()) {
                         const idParts = canonId.split('_');
                         // Check parts longer than 3 chars to avoid common words like 'of', 'to'
                         if (idParts.some(part => part.length > 3 && goalDescLower.includes(part))) {
                             console.warn(`[classify-campaign] WARN: Using fallback ID part match for "${goalDescription}" -> ${canonId}`);
                             userRankedGoalIds.push({ id: canonId, rank: index + 1 });
                             bestMatchId = canonId; // Mark as found to prevent double warning
                             break; // Stop fallback check once one is found
                         }
                    }
                    // If still no match after primary and fallback checks
                    if (!bestMatchId) {
                         console.warn(`[classify-campaign] WARN: User goal description "${goalDescription}" (rank ${index + 1}) did not match any canonical goal name/ID.`);
                    }
                }
            });
        }
        console.log(`[classify-campaign] INFO: Normalized User Ranked Goal IDs (Improved Match):`, userRankedGoalIds);

        if (userRankedGoalIds.length === 0) {
            console.log(`[classify-campaign] INFO: No goals could be normalized. Cannot classify based on goals.`);
            return null; // Cannot proceed without normalized goals
        }

        // --- Sections 2, 3, 4 (Scoring, Hierarchy Trace, Result) ---
        // 2. Score Use Cases
        let bestUseCaseId = null;
        let highestScore = -1;

        campaignData.goalMappingsMap.forEach((useCaseGoalPriorities, useCaseId) => {
            let currentScore = 0;
            let matchedGoalCount = 0;

            userRankedGoalIds.forEach(userGoal => {
                if (useCaseGoalPriorities.has(userGoal.id)) {
                    matchedGoalCount++;
                    const predefinedPriority = useCaseGoalPriorities.get(userGoal.id);
                    let goalScore = (9 - predefinedPriority); // Higher score for lower priority number
                    // Apply rank weight: Rank 1 = 1.0, Rank 2 = 0.75, Rank 3 = 0.5, Rank 4 = 0.25, others = 0.1
                    const rankWeight = userGoal.rank <= 4 ? (5 - userGoal.rank) / 4 : 0.1;
                    goalScore *= rankWeight;
                    currentScore += goalScore;
                }
            });

            // Only consider use cases that match at least one goal
            if (matchedGoalCount > 0 && currentScore > highestScore) {
                highestScore = currentScore;
                bestUseCaseId = useCaseId;
            }
        });

        if (!bestUseCaseId) {
            console.log(`[classify-campaign] INFO: No matching use case found based on goal priorities and ranking.`);
            return null;
        }
        console.log(`[classify-campaign] INFO: Best matching Use Case ID determined by ranked goals: ${bestUseCaseId} (Score: ${highestScore.toFixed(2)})`);

        // 3. Trace Hierarchy
        const bestUseCase = campaignData.useCasesMap.get(bestUseCaseId);
        if (!bestUseCase) { console.error(`[classify-campaign] ERROR: Data inconsistency - Use Case ${bestUseCaseId} not found.`); return null; }
        // Refined subtype matching logic
        const bestSubtype = campaignData.subtypes.find(st =>
            st.id.toLowerCase() === bestUseCase.subtype_id.toLowerCase() || // Check full ID first
            st.name.toLowerCase() === bestUseCase.subtype_id.toLowerCase() || // Then check name
            st.id.toLowerCase().endsWith(`_${bestUseCase.subtype_id.toLowerCase()}`) // Finally check suffix
        );
        if (!bestSubtype) { console.error(`[classify-campaign] ERROR: Data inconsistency - Subtype for ${bestUseCase.subtype_id} not found.`); return null; }
        const bestType = campaignData.typesMap.get(bestSubtype.type_id);
        if (!bestType) { console.error(`[classify-campaign] ERROR: Data inconsistency - Type for ${bestSubtype.type_id} not found.`); return null; }
        console.log(`[classify-campaign] INFO: Classification Path: Type=${bestType.name}(${bestType.id}), Subtype=${bestSubtype.name}(${bestSubtype.id}), UseCase=${bestUseCase.name}(${bestUseCase.id})`);

        // 4. Construct Result
        return {
            id: bestUseCaseId,
            primary_type: bestType.name,
            secondary_type: bestSubtype.name,
            sub_type: bestUseCase.name,
            type_id: bestType.id,
            subtype_id: bestSubtype.id,
            confidence: highestScore
        };
    }
    // --- End Classification Logic ---


    // --- Route Handler ---
    router.post('/', (req, res) => {
        const requestTimestamp = new Date().toISOString();
        console.log(`[${requestTimestamp}] INFO: Received POST /api/classify-campaign-type`);

        // Check if data loaded correctly before proceeding
        if (!campaignData.isLoaded) {
            console.error(`[${requestTimestamp}] ERROR: Classification unavailable - data not loaded. Load Error: ${JSON.stringify(campaignData.loadError)}`);
            // Send 503 Service Unavailable if data isn't ready
            return res.status(503).json({ error: 'Classification service temporarily unavailable (data loading error).' });
        }

        const { summary } = req.body;

        // Validate summary structure
        // Allow empty goals array now, as classification might fallback or handle it
        if (!summary || typeof summary !== 'object' || !summary.purpose || !summary.audience || !summary.target || !Array.isArray(summary.goals)) {
          console.warn(`[${requestTimestamp}] WARN: Received invalid or incomplete summary object. Must include purpose, audience, target, goals array. Keys:`, Object.keys(summary));
          // Return 400 Bad Request for invalid input
          return res.status(400).json({ error: 'Missing expected fields (purpose, audience, target, goals array) in summary object.' });
        }
         console.log(`[${requestTimestamp}] DEBUG: Received summary goals (order implies rank):`, summary.goals);

        // Perform classification
        const result = classifyCampaign(summary);

        // Send response
        if (!result) {
          console.log(`[${requestTimestamp}] INFO: Classification result: No match found.`);
          return res.status(200).json({
            match: null,
            confidence: 0.0,
            message: 'Could not classify campaign type based on provided summary goals.'
          });
        } else {
          console.log(`[${requestTimestamp}] INFO: Classification result: Match found - Type: ${result.primary_type}, SubType: ${result.secondary_type}, UseCase: ${result.sub_type}`);
          return res.status(200).json({
            match: result, // Send the detailed match object
            message: 'Campaign type classification successful.'
          });
        }
    });
    // --- End Route Handler ---

    // --- Ensure Default Export ---
    export default router;
    // --- End Ensure Default Export ---
    
