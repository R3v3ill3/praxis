// backend-node/routes/messaging-chat.js
import express from 'express';
import OpenAI from 'openai';
// Ensure your environment variables are loaded (e.g., using dotenv)
// import dotenv from 'dotenv';
// dotenv.config(); // If not already handled globally

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


// Define the full list of expected input keys (including nested paths)
// This helps in systematically checking for missing inputs and determining the 'fieldInFocus'
const allInputKeysWithFriendlyNames = {
  "issueName": "The name or a brief description of the issue",
  "proposedChange": "The specific change you are proposing",
  "geographicContext": "The geographic location or community context",
  "desiredOutcome": "The ultimate desired outcome of the campaign",
  "primaryAudience": "The primary target audience for your messaging",
  "audienceProfile.demographics": "Key demographics of your primary audience (e.g., age, gender, location, occupation)",
  "audienceProfile.psychographics": "Psychographics of your audience (e.g., values, lifestyles, interests, opinions)",
  "audienceProfile.priorBeliefs": "Prior beliefs or attitudes your audience holds about the issue",
  "audienceProfile.mediaHabits": "Media consumption habits of your audience (e.g., social media platforms, news sources)",
  "campaignObjective": "The main objective of this specific messaging campaign (e.g., raise awareness, drive action, change perception)",
  "deliveryContext.format": "The planned format for delivering these messages (e.g., social media posts, emails, flyers)",
  "deliveryContext.messenger": "Who will be the primary messenger or voice for these messages",
  "deliveryContext.timing": "Any specific timing considerations for the message delivery (e.g., upcoming event, specific phase of campaign)",
  "knownComparisons": "Any known comparisons or similar campaigns (successful or unsuccessful) that might provide insights",
  "benchmarkData": "Any benchmark data or baseline metrics you have related to the campaign's goals or audience awareness"
};
const orderedInputKeys = Object.keys(allInputKeysWithFriendlyNames);

function getFieldValue(obj, path) {
  if (!obj) return undefined; // Handle null or undefined obj
  const parts = path.split('.');
  let current = obj;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return undefined;
    }
  }
  return current;
}

function identifyStillNeeded(knownInputs) {
  const needed = [];
  for (const key of orderedInputKeys) {
    const value = getFieldValue(knownInputs, key);
    if (value === undefined || value === null || (typeof value === 'string' && value.trim() === '')) {
      needed.push(key);
    }
  }
  return needed; // Returns an array of keys that are still missing
}


router.post('/', async (req, res) => {
  const {
    campaignId, // We'll want to use this for context or saving later
    conversationHistory, // Array of { role: 'user'/'assistant', content: '...'}
    currentUserMessage, // The latest message from the user (string)
    knownInputs // The current state of messagingInputs from the frontend
  } = req.body;

  if (!conversationHistory || !Array.isArray(conversationHistory) || !knownInputs) {
    return res.status(400).json({ error: 'Missing or invalid request body parameters: conversationHistory and knownInputs are required.' });
  }
  
  // It's good practice to ensure knownInputs has a predictable structure,
  // especially for nested objects, even if they are empty.
  const currentInputs = {
      ...initialMessagingInputsState, // Defined below or imported
      ...knownInputs,
      audienceProfile: {
          ...initialMessagingInputsState.audienceProfile,
          ...(knownInputs.audienceProfile || {}),
      },
      deliveryContext: {
          ...initialMessagingInputsState.deliveryContext,
          ...(knownInputs.deliveryContext || {}),
      },
  };


  const stillNeededKeys = identifyStillNeeded(currentInputs);

  if (stillNeededKeys.length === 0) {
    return res.json({
      aiMessage: "Great! It looks like we have all the information needed to start drafting the messaging guide.",
      updatedKnownInputs: currentInputs,
      fieldInFocus: null,
      isComplete: true
    });
  }

  const nextFieldToQuery = stillNeededKeys[0]; // Get the next missing field
  const friendlyNameForField = allInputKeysWithFriendlyNames[nextFieldToQuery];

  // Construct a summary of known inputs for the AI, focusing on what's filled.
  let knownSummaryForPrompt = "Here's what we have so far:\n";
  let hasFilledFields = false;
  for (const key of orderedInputKeys) {
      const value = getFieldValue(currentInputs, key);
      if (!(value === undefined || value === null || (typeof value === 'string' && value.trim() === ''))) {
          knownSummaryForPrompt += `- ${allInputKeysWithFriendlyNames[key]}: ${value}\n`;
          hasFilledFields = true;
      }
  }
  if (!hasFilledFields) {
      knownSummaryForPrompt = "We're just getting started and haven't filled in any details yet.\n";
  }


  // Basic prompt - we'll refine this.
  // The goal is for the AI to ask the question for `nextFieldToQuery`.
  const systemPrompt = `
You are a friendly and efficient AI assistant helping a user develop a messaging strategy for their campaign.
Your goal is to collect specific pieces of information by asking clear, targeted questions one at a time.
The user has already provided some initial campaign details.

${knownSummaryForPrompt}

Based on what's missing, please ask the user for the following information:
**"${friendlyNameForField}"**

Frame your question clearly and politely. If the user's previous message seems to provide information, you can acknowledge it briefly before asking your question.
For example, if you asked for "Issue Name" and the user said "We're working on a campaign for better local parks", you could say:
"Okay, 'better local parks' is a good start for the issue. Now, could you tell me about [next field]?"
However, for this turn, focus on asking for "${friendlyNameForField}".
Do not ask for multiple pieces of information at once.
  `.trim();

  const messagesForAI = [
    ...conversationHistory, // Includes previous user and assistant messages
    // We add currentUserMessage to the history if it exists, before the system prompt for the current turn.
    // The CampaignBuilder.jsx pattern is: { role: "user", content: currentMessage }
    // So, conversationHistory should already include the latest user message if this isn't the first turn.
  ];
  
  // If this is the *very first* message from the AI (history is empty or only contains a setup system message),
  // the currentUserMessage might be undefined or empty. The system prompt will guide the first question.
  // If conversationHistory already contains the user's latest message, we don't need to add currentUserMessage again.

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o', // Or your preferred model
      messages: [
        ...messagesForAI, // Full history up to user's last message
        { role: 'system', content: systemPrompt } // System prompt for *this specific turn*
    ],
      temperature: 0.7,
    });

    const aiResponseText = completion.choices[0].message.content;

    // For now, updatedKnownInputs is the same as currentInputs.
    // Later, we can add logic here to try and parse the *previous* user message
    // (if fieldInFocus was set) and update currentInputs *before* sending it back.
    const responsePayload = {
      aiMessage: aiResponseText,
      updatedKnownInputs: currentInputs, // For now, no updates based on current user turn in this simplified version
      fieldInFocus: nextFieldToQuery,
      isComplete: false
    };
    
    console.log("Responding with payload:", responsePayload);
    res.json(responsePayload);

  } catch (err) {
    console.error('❌ Messaging Chat Error:', err);
    res.status(500).json({ error: 'Failed to generate chat message from AI.', details: err.message });
  }
});

// This needs to be defined in this file or imported, mirroring CampaignContext
const initialMessagingInputsState = {
  issueName: '',
  proposedChange: '',
  geographicContext: '',
  desiredOutcome: '',
  primaryAudience: '',
  audienceProfile: {
    demographics: '',
    psychographics: '',
    priorBeliefs: '',
    mediaHabits: ''
  },
  campaignObjective: '',
  deliveryContext: {
    format: '',
    messenger: '',
    timing: ''
  },
  knownComparisons: '',
  benchmarkData: ''
};

export default router;
