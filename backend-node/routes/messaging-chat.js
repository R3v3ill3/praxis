// backend-node/routes/messaging-chat.js
import express from 'express';
import OpenAI from 'openai';

const router = express.Router(); // Router is defined here, on line 4

let openai;
try {
    openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    if (!process.env.OPENAI_API_KEY) {
        console.error("❌ OPENAI_API_KEY is not set. Messaging chat will likely fail.");
    }
} catch (e) {
    console.error("❌ Failed to initialize OpenAI client:", e.message);
    openai = null;
}

// --- Helper Function to Set Nested Values ---
function setNestedValue(obj, path, value) {
    if (!obj || typeof path !== 'string') {
        console.warn("setNestedValue: Invalid object or path provided.", {obj, path});
        return;
    }
    const parts = path.split('.');
    let current = obj;
    for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (i === parts.length - 1) {
            current[part] = value;
        } else {
            if (!current[part] || typeof current[part] !== 'object') {
                current[part] = {};
            }
            current = current[part];
        }
    }
}

// --- Field Definitions ---
const REQUIRED_KEYS = [
    "issueName",
    "geographicContext",
    "proposedChange",
    "primaryAudience",
    "desiredOutcome"
];

const ALL_POTENTIAL_KEYS_WITH_FRIENDLY_NAMES = {
    "issueName": "The core issue or problem your campaign addresses",
    "geographicContext": "The specific location or community context of your campaign",
    "proposedChange": "The specific change or solution your campaign is proposing",
    "primaryAudience": "The main group of people you want to reach and persuade with your messaging",
    "desiredOutcome": "The ultimate overall outcome or impact you hope to achieve with the campaign (this may be related to your main campaign goals, which we have noted from your earlier setup)",
    "campaignObjective": "A more specific objective for this particular messaging effort (e.g., what should people think, feel, or do after seeing/hearing the message?)",
    "audienceProfile.demographics": "Key demographics of your primary audience (e.g., age, gender, occupation, location, specific community groups)",
    "audienceProfile.psychographics": "Common values, attitudes, lifestyles, aspirations, or concerns of your audience",
    "audienceProfile.priorBeliefs": "What your audience likely already thinks, feels, or believes about the issue or the proposed change",
    "audienceProfile.mediaHabits": "How or where your audience typically gets their information or spends their time (e.g., specific social media, local news, community events, word-of-mouth)",
    "deliveryContext.format": "The planned formats for delivering these messages (e.g., social media posts, flyers, emails, public talks, videos)",
    "deliveryContext.messenger": "Who (person, group, or type of individual) would be the most credible or relatable to deliver these messages to your audience",
    "deliveryContext.timing": "Any specific timing considerations for when these messages should be delivered (e.g., tied to an upcoming event, a particular phase of the campaign, a specific time of year/day)",
    "knownComparisons": "Any similar campaigns or messaging efforts (from your side or others, successful or not) that you are aware of that might offer insights or lessons",
    "benchmarkData": "Any existing data, statistics, or benchmarks related to current audience awareness, attitudes, or behaviors regarding the issue"
};
const ORDERED_ALL_POTENTIAL_KEYS = Object.keys(ALL_POTENTIAL_KEYS_WITH_FRIENDLY_NAMES);
const OPTIONAL_KEYS = ORDERED_ALL_POTENTIAL_KEYS.filter(k => !REQUIRED_KEYS.includes(k));

const MAX_OPTIONAL_FIELDS_TO_ATTEMPT = 4; // How many optional fields we aim to fill after required ones are done.

const initialMessagingInputsState = {
    issueName: '',
    geographicContext: '',
    proposedChange: '',
    primaryAudience: '',
    desiredOutcome: '',
    campaignObjective: '',
    audienceProfile: {
        demographics: '',
        psychographics: '',
        priorBeliefs: '',
        mediaHabits: ''
    },
    deliveryContext: {
        format: '',
        messenger: '',
        timing: ''
    },
    knownComparisons: '',
    benchmarkData: ''
};

// --- Helper Functions (Continued) ---
function getFieldValue(obj, path) {
    if (!obj) return undefined;
    const parts = path.split('.');
    let current = obj;
    for (const part of parts) {
        if (current && typeof current === 'object' && part in current) {
            current = current[part];
        } else { return undefined; }
    }
    return current;
}

function identifyStillNeeded(knownInputs, keysToCheck) {
    const needed = [];
    for (const key of keysToCheck) {
        const value = getFieldValue(knownInputs, key);
        if (value === undefined || value === null || (typeof value === 'string' && value.trim() === '')) {
            needed.push(key);
        }
    }
    return needed;
}

function buildIntroMessage(inputs, nextFieldKey, classification) {
    const lines = [];
    lines.push("👋 Let's work on your messaging strategy. To start, I'll confirm what I understand about your campaign so far (some of this may be pre-filled from your earlier campaign setup):");
    if (inputs.issueName) lines.push(`- **Issue**: ${inputs.issueName}`);
    if (classification && classification.primary_type) {
        lines.push(`- **Campaign Type**: ${classification.primary_type}${classification.secondary_type ? ' - ' + classification.secondary_type : ''}${classification.use_case ? ' (' + classification.use_case + ')' : ''}`);
    }
    if (inputs.primaryAudience) lines.push(`- **Primary Audience**: ${inputs.primaryAudience}`);
    if (inputs.desiredOutcome) lines.push(`- **Desired Outcome**: ${inputs.desiredOutcome}`);
    lines.push('\nOkay, let\'s dive a bit deeper.');

    const specificPrompts = {
        'audienceProfile.demographics': "To help tailor the message, could you tell me a bit about your audience — perhaps their age, background, or who they are?",
        'campaignObjective': "For this specific messaging, what’s the main thing you want to achieve? (e.g., raise awareness, encourage an action)",
    };
    lines.push(specificPrompts[nextFieldKey] || `First, can you tell me about: ${ALL_POTENTIAL_KEYS_WITH_FRIENDLY_NAMES[nextFieldKey]}?`);
    return lines.join('\n');
}


// --- OpenAI Function Calling Schema ---
const dataExtractionFunctionSchema = {
    name: "extract_and_respond_messaging_data",
    description: "Extracts relevant information from the user's message for campaign messaging fields, and provides a conversational response or next question.",
    parameters: {
        type: "object",
        properties: {
            aiMessage: {
                type: "string",
                description: "Your conversational message to the user (e.g., your next question, an acknowledgement, or a clarifying question to get the required information for the field in focus). This message should guide the user to provide the information if not clear from their last response."
            },
            extractedFields: {
                type: "object",
                description: "An object where keys are the specific field names (e.g., 'issueName', 'audienceProfile.demographics') and values are the extracted strings. Only include fields for which data was confidently found in the user's *latest* message. If no data was found for a field, do not include it or set its value to null. If no data was extracted for *any* field in the user's last response, send an empty object {} for extractedFields.",
            }
        },
        required: ["aiMessage", "extractedFields"]
    }
};

// --- Route Handler ---
router.post('/', async (req, res) => {
    console.log("\n=============== /api/messaging-chat HIT ===============");
    if (!openai) {
        console.error("❌ OpenAI client not initialized. Aborting.");
        return res.status(500).json({ error: 'AI service is not configured properly.' });
    }

    const { campaignId, conversationHistory, knownInputs, classification } = req.body;

    if (!Array.isArray(conversationHistory) || !knownInputs || !classification) {
        console.error("❌ Invalid request body parameters. Received:", { campaignId, conversationHistoryExists: !!conversationHistory, knownInputsExists: !!knownInputs, classificationExists: !!classification });
        return res.status(400).json({ error: 'Missing or invalid request body parameters: conversationHistory, knownInputs, and classification are required.' });
    }

    let currentInputs;
    try {
        const deepMerge = (target, source) => {
            for (const key in source) {
                if (source.hasOwnProperty(key)) {
                    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                        if (!target[key] || typeof target[key] !== 'object') {
                             target[key] = {};
                        }
                        deepMerge(target[key], source[key]);
                    } else {
                        target[key] = source[key];
                    }
                }
            }
            return target;
        };
        currentInputs = deepMerge(JSON.parse(JSON.stringify(initialMessagingInputsState)), knownInputs);
    } catch (mergeError) {
        console.error("❌ Error merging knownInputs:", mergeError);
        return res.status(500).json({ error: 'Failed to process inputs.', details: mergeError.message });
    }
    console.log("BACKEND: Initial currentInputs before identifying needed (or for intro):", JSON.stringify(currentInputs, null, 2));


    let stillNeededRequiredKeys = identifyStillNeeded(currentInputs, REQUIRED_KEYS);
    let stillNeededOptionalKeys = identifyStillNeeded(currentInputs, OPTIONAL_KEYS);
    let filledOptionalKeysCount = OPTIONAL_KEYS.length - stillNeededOptionalKeys.length;

    console.log("BACKEND (Before AI Call or for Intro): Still Needed Required:", stillNeededRequiredKeys);
    console.log("BACKEND (Before AI Call or for Intro): Still Needed Optional:", stillNeededOptionalKeys);
    console.log("BACKEND (Before AI Call or for Intro): Filled Optional Count:", filledOptionalKeysCount);

    if (stillNeededRequiredKeys.length === 0 && (stillNeededOptionalKeys.length === 0 || filledOptionalKeysCount >= MAX_OPTIONAL_FIELDS_TO_ATTEMPT)) {
        const initialCompletionMessage = "It looks like all necessary information was already available!";
        console.log("BACKEND: Reporting completion (initial check based on incoming knownInputs).");
        return res.json({ aiMessage: initialCompletionMessage, updatedKnownInputs: currentInputs, fieldInFocus: null, isComplete: true });
    }

    let nextFieldToQuery;
    let askingRequired = false;
    if (stillNeededRequiredKeys.length > 0) {
        nextFieldToQuery = stillNeededRequiredKeys[0];
        askingRequired = true;
    } else if (stillNeededOptionalKeys.length > 0) {
        nextFieldToQuery = stillNeededOptionalKeys[0];
    } else {
        const fallbackCompletionMessage = "It seems we've covered all the details already!";
        console.log("BACKEND: Reporting completion (unexpected fallback after field selection logic).");
        return res.json({ aiMessage: fallbackCompletionMessage, updatedKnownInputs: currentInputs, fieldInFocus: null, isComplete: true });
    }
    console.log(`BACKEND: Next field to query based on current state: ${nextFieldToQuery} (Required: ${askingRequired})`);

    if (conversationHistory.length === 0) {
        const introMessage = buildIntroMessage(currentInputs, nextFieldToQuery, classification);
        console.log("BACKEND: Sending initial intro message (empty conversation history).");
        return res.json({ aiMessage: introMessage, updatedKnownInputs: currentInputs, fieldInFocus: nextFieldToQuery, isComplete: false });
    }

    const friendlyNameForField = ALL_POTENTIAL_KEYS_WITH_FRIENDLY_NAMES[nextFieldToQuery] || nextFieldToQuery;
    let classificationText = "The campaign is of a general nature.";
     if (classification && classification.primary_type) {
        classificationText = `This is specifically a "${classification.primary_type || ''}${classification.secondary_type ? ' - ' + classification.secondary_type : ''}${classification.use_case ? ' (' + classification.use_case + ')' : ''}" campaign.`;
        if (classification.primary_type.toLowerCase().includes('union') ||
            (classification.secondary_type && classification.secondary_type.toLowerCase().includes('workplace'))) {
            classificationText += " The user is likely an organiser or advocate familiar with workplace issues, possibly within a union context. Tailor your examples and phrasing accordingly, focusing on collective action, member engagement, and negotiations where appropriate.";
        }
    }

    const systemPrompt = `
You are a warm, thoughtful communications expert helping a user develop their messaging by filling out a communication brief.
${classificationText}
Your tone is calm, encouraging, and friendly. Avoid jargon. Ask one clear, open-ended question at a time.
The user may not know all answers; if they seem unsure or want to skip an optional question, gently acknowledge this and be ready to move to the next relevant field.

The current field we are focusing on is: "${friendlyNameForField}" (field key: "${nextFieldToQuery}").
This field is: ${askingRequired ? "Required information. We need this to proceed." : "Optional detail. If the user isn't sure or wants to skip, that's okay."}
Based on the user's last message, try to extract the information for this field.
If the user's last message clearly provides the information for "${nextFieldToQuery}", acknowledge it in your "aiMessage" and then formulate your "aiMessage" to ask about the *next* logical piece of information, or confirm if all information seems complete.
If the user's last message is unclear or doesn't provide the information for "${nextFieldToQuery}", your "aiMessage" should be a clear, guiding question to elicit it.
If the user wants to skip an optional field, acknowledge it in your "aiMessage" and move on to the next field.

You MUST use the "extract_and_respond_messaging_data" function to structure your response.
The "extractedFields" object in your function call arguments MUST always be present.
In the "extractedFields" object, only include data you are confident was provided by the user in their *latest* message for any known fields (especially "${nextFieldToQuery}"). If no data was extracted for any field in the user's last response, send an empty object {} for "extractedFields".
The "aiMessage" should be your conversational reply to the user.
`.trim();

    const messagesForAI = [ { role: 'system', content: systemPrompt } ];
    conversationHistory.forEach(msg => {
        if (msg.role === 'user' || msg.role === 'assistant') {
            messagesForAI.push({ role: msg.role, content: msg.content });
        }
    });

    try {
        console.log(`BACKEND: Making OpenAI call for field: ${nextFieldToQuery}. History length: ${conversationHistory.length}`);
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: messagesForAI,
            functions: [dataExtractionFunctionSchema],
            function_call: { name: dataExtractionFunctionSchema.name },
            temperature: 0.6,
        });

        const message = completion.choices[0].message;
        let aiConversationalMessage = "I'm sorry, I had a little trouble processing that. Could you try rephrasing?";
        let isNowComplete = false;
        let finalFieldInFocus = nextFieldToQuery;

        if (message.function_call && message.function_call.arguments) {
            let functionArgs;
            try {
                functionArgs = JSON.parse(message.function_call.arguments);
            } catch (parseError) {
                console.error("BACKEND: Error parsing AI function call arguments:", parseError, "Arguments:", message.function_call.arguments);
                return res.status(500).json({
                    aiMessage: "I received an unusual response from my thought process. Let's try that again. What are your thoughts on " + friendlyNameForField + "?",
                    updatedKnownInputs: currentInputs,
                    fieldInFocus: nextFieldToQuery,
                    isComplete: false
                });
            }

            aiConversationalMessage = functionArgs.aiMessage || aiConversationalMessage;
            const extractedDataFromAI = functionArgs.extractedFields || {};

            console.log("BACKEND: AI Function Call Arguments:", JSON.stringify(functionArgs, null, 2));

            if (typeof extractedDataFromAI === 'object' && Object.keys(extractedDataFromAI).length > 0) {
                for (const [key, value] of Object.entries(extractedDataFromAI)) {
                    if (ALL_POTENTIAL_KEYS_WITH_FRIENDLY_NAMES.hasOwnProperty(key)) {
                        if (value !== null && value !== undefined && String(value).trim() !== '') {
                           console.log(`BACKEND: Updating currentInputs.${key} with value: "${value}"`);
                           setNestedValue(currentInputs, key, value);
                        } else if (value === "" && !REQUIRED_KEYS.includes(key)) {
                           console.log(`BACKEND: Clearing optional field currentInputs.${key} as AI returned empty string.`);
                           setNestedValue(currentInputs, key, "");
                        }
                    } else {
                        console.warn(`BACKEND: AI tried to extract for an unknown key: ${key}`);
                    }
                }
            } else {
                console.log("BACKEND: No data in extractedFields from AI or extractedFields was not an object/empty.");
            }

            stillNeededRequiredKeys = identifyStillNeeded(currentInputs, REQUIRED_KEYS);
            stillNeededOptionalKeys = identifyStillNeeded(currentInputs, OPTIONAL_KEYS);
            filledOptionalKeysCount = OPTIONAL_KEYS.length - stillNeededOptionalKeys.length;

            console.log("BACKEND (After AI Update): Still Needed Required:", stillNeededRequiredKeys);
            console.log("BACKEND (After AI Update): Still Needed Optional:", stillNeededOptionalKeys);
            console.log("BACKEND (After AI Update): Filled Optional Count:", filledOptionalKeysCount);
            console.log("BACKEND (After AI Update): MAX_OPTIONAL_FIELDS_TO_ATTEMPT:", MAX_OPTIONAL_FIELDS_TO_ATTEMPT);

            // MODIFIED COMPLETION LOGIC BLOCK STARTS HERE
            let isConversationallyDone = false;
            if (aiConversationalMessage) { 
                const lowerAiMessage = aiConversationalMessage.toLowerCase();
                if (lowerAiMessage.includes("anything else") ||
                    lowerAiMessage.includes("you're well on your way") ||
                    lowerAiMessage.includes("we can look at any other aspects") ||
                    lowerAiMessage.includes("feel free to let me know") || 
                    lowerAiMessage.includes("sound good?") ||
                    lowerAiMessage.includes("shall we move on?") ||
                    lowerAiMessage.includes("we've covered a lot") ||
                    lowerAiMessage.includes("good amount of information")) {
                    isConversationallyDone = true;
                    console.log("BACKEND: AI message sounds like it's concluding or has enough info.");
                }
            }

            if (stillNeededRequiredKeys.length === 0) {
                if (stillNeededOptionalKeys.length === 0 || filledOptionalKeysCount >= MAX_OPTIONAL_FIELDS_TO_ATTEMPT) {
                    isNowComplete = true;
                    console.log(`BACKEND: Setting isNowComplete = true. Reason: Required done, and (all optional done OR enough optional filled). Filled: ${filledOptionalKeysCount}, Needed: ${stillNeededOptionalKeys.length}`);
                } else if (isConversationallyDone && filledOptionalKeysCount >= 1) { 
                    isNowComplete = true;
                    console.log(`BACKEND: Setting isNowComplete = true. Reason: Required done, AI sounds conversationally done, AND at least one optional field was filled. Filled: ${filledOptionalKeysCount}`);
                }
                 else {
                    console.log(`BACKEND: Required done, but optional/conversational completion conditions not met. isConversationallyDone: ${isConversationallyDone}, filledOptionalKeysCount: ${filledOptionalKeysCount}`);
                }
            } else {
                 console.log("BACKEND: Required fields still needed, not complete. Needed:", stillNeededRequiredKeys);
            }
            // MODIFIED COMPLETION LOGIC BLOCK ENDS HERE


            if (isNowComplete) {
                finalFieldInFocus = null;
                console.log("BACKEND: Chat is determined complete. Final field in focus: null.");
            } else {
                 if (stillNeededRequiredKeys.length > 0) {
                     finalFieldInFocus = stillNeededRequiredKeys[0];
                 } else if (stillNeededOptionalKeys.length > 0) {
                     finalFieldInFocus = stillNeededOptionalKeys[0];
                 } else {
                     console.warn("BACKEND: Edge case - not complete, but no more distinct fields to query. Forcing completion.");
                     finalFieldInFocus = null;
                     isNowComplete = true;
                 }
                 console.log(`BACKEND: Chat not complete. Next field for frontend to focus on: ${finalFieldInFocus}`);
            }
        } else {
            aiConversationalMessage = message.content || aiConversationalMessage;
            console.warn("BACKEND: AI did not use function call or arguments were missing. Response content:", message.content);
            finalFieldInFocus = nextFieldToQuery;
        }

        console.log("BACKEND: Final response to frontend:", { aiMessage: aiConversationalMessage, updatedKnownInputs: currentInputs, fieldInFocus: finalFieldInFocus, isComplete: isNowComplete });
        res.json({
            aiMessage: aiConversationalMessage,
            updatedKnownInputs: currentInputs,
            fieldInFocus: finalFieldInFocus,
            isComplete: isNowComplete
        });

    } catch (err) {
        console.error('❌ Messaging Chat Error during OpenAI call:', err);
        if (err.response && err.response.data) {
            console.error('OpenAI API Error Response Data:', err.response.data);
        }
        if (err instanceof OpenAI.APIError || (err.response && err.response.status)) { 
            return res.status(err.status || err.response?.status || 500).json({ error: `OpenAI API error: ${err.name || 'Unknown'}`, details: err.message, responseData: err.response?.data });
        }
        res.status(500).json({ error: 'Internal server error while communicating with AI.', details: err.message });
    }
    console.log("=============== /api/messaging-chat END ===============\n");
});

export default router;
