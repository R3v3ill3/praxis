// backend-node/routes/campaign-assistant.js
import express from 'express';
import OpenAI from 'openai';
//import dotenv from 'dotenv';
// Using the dotenv setup that was confirmed to be working for you:
//import path from 'path';
//import { fileURLToPath } from 'url';
console.log("✅ Runtime OPENAI_API_KEY =", process.env.OPENAI_API_KEY);
//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);
//dotenv.config({ path: path.resolve(__dirname, '../.env') });

import { mapGoalsToCanonical, formatCanonicalGoalsForFirestore } from './goal-mapping.js';
const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// 🔒 PROMPT_VERSION: v1.3.4-ai-classification-guess — Preserving full original detail

// Updated parser to extract summary AND the AI's classification guess
function parseSummaryAndClassification(text) {
    const summary = { goals: [] }; // Initialize goals as array
    let classification_guess = { primary_type: null, secondary_type: null, use_case: null }; // Initialize guess
    let collectingGoals = false;
    let collectingClassification = false;
    const lines = text.split('\n');

    lines.forEach(line => {
        const trimmedLine = line.trim();

        // Reset flags if we hit the final marker or a new major section
        if (trimmedLine.startsWith('✅ Final summary complete') ||
            (trimmedLine.startsWith('- **') &&
             !trimmedLine.startsWith('- **Goals:**') &&
             !trimmedLine.startsWith('- **Initial Classification Guess:**'))) {
            collectingGoals = false;
            collectingClassification = false;
        }

        if (trimmedLine.startsWith('- **Purpose:**')) summary.purpose = trimmedLine.substring('- **Purpose:**'.length).trim();
        else if (trimmedLine.startsWith('- **Audience:**')) summary.audience = trimmedLine.substring('- **Audience:**'.length).trim();
        else if (trimmedLine.startsWith('- **Target:**')) summary.target = trimmedLine.substring('- **Target:**'.length).trim();
        else if (trimmedLine.startsWith('- **Intent:**')) summary.intent = trimmedLine.substring('- **Intent:**'.length).trim();
        else if (trimmedLine.startsWith('- **Location:**')) summary.location = trimmedLine.substring('- **Location:**'.length).trim();
        else if (trimmedLine.startsWith('- **Problem:**')) summary.problem = trimmedLine.substring('- **Problem:**'.length).trim();
        else if (trimmedLine.startsWith('- **Goals:**')) {
            collectingGoals = true;
            collectingClassification = false;
        } else if (trimmedLine.startsWith('- **Initial Classification Guess:**')) {
            collectingClassification = true;
            collectingGoals = false;
        } else if (collectingGoals) {
            const goalMatch = trimmedLine.match(/^[-*•\s]*\s*(.*)/);
            if (goalMatch && goalMatch[1] && goalMatch[1].trim() !== '' && !trimmedLine.startsWith('- **')) {
                summary.goals.push(goalMatch[1].trim());
            }
        } else if (collectingClassification) {
            if (trimmedLine.startsWith('- Primary Type:')) classification_guess.primary_type = trimmedLine.substring('- Primary Type:'.length).trim() || null;
            else if (trimmedLine.startsWith('- Secondary Type:')) classification_guess.secondary_type = trimmedLine.substring('- Secondary Type:'.length).trim() || null;
            else if (trimmedLine.startsWith('- Use Case:')) classification_guess.use_case = trimmedLine.substring('- Use Case:'.length).trim() || null;
        }
    });

    // Determine if the core summary structure is present
    if (summary.purpose && summary.audience && summary.target) {
        summary.structured = true;
        if (!summary.goals) summary.goals = []; // Ensure goals array exists
    } else {
        summary.structured = false;
        console.warn("[campaign-assistant] parseSummaryAndClassification: Failed to parse core summary fields (purpose, audience, target). Summary:", summary);
    }

    // Return null for classification_guess if no parts of it were found
    const guessValues = Object.values(classification_guess);
    if (guessValues.every(val => val === null || val === '')) {
        classification_guess = null;
    }

    return { summary, classification_guess };
}

function detectFinalSummaryMessage(message) {
  return message && message.includes("✅ Final summary complete");
}

router.post('/', async (req, res) => {
  try {
    const { input, history = [] } = req.body;

    if (!input) {
      console.error('❌ Missing input in /campaign-assistant request');
      return res.status(400).json({ error: 'Missing input' });
    }

    const messages = [
      {
        role: 'system',
        content: `
You are a sharp, confident, and experienced campaign strategist who works with unions and progressive organisations. You speak in a natural, conversational tone — like an organiser who’s been there before and knows what it takes to win.

You start every conversation as if you’re talking to someone who wants to make change happen — and might need a little help turning that energy into strategy.

⸻

When a campaign involves pay, safety, rosters, workplace voice, or management decisions — assume it’s a union campaign. Don’t wait to be told.

Talk like someone who knows that union power works. Use language like:
  • “Sounds like a union campaign to me — are you already organised, or is this a chance to build?”
  • “Power starts with people — do you already have union members on board?”
  • “This might be the perfect time to recruit your coworkers.”
  • “Let’s figure out if you’re ready to take action or need to build support first.”

Never be neutral about organising. If the user describes workplace problems, help them connect that to union strength. Be strategic and persuasive — you’re here to help them win.

Ask only 1–2 questions at a time, and always clarify two distinct roles:
  • Audience: who do they want to involve or mobilise? (e.g. coworkers, union members, customers)
  • Target: who holds the power to make the change? (e.g. boss, company execs, government)

When asking about audience and target, always explain the difference like this:
  • “Let’s break it down:
     - Who do you want to join or support the campaign with you? That’s your audience — often coworkers or the public.
     - And who has the power to make the change — like approving the pay rise or stopping the cuts? That’s your target — usually a manager, board, or government.”

Your goal is to collect the following structured summary:
  • purpose: what does this campaign aim to achieve? (e.g. win a pay rise, stop a restructure)
  • audience: who will be involved or mobilised?
  • target: who has the power to make the change?
  • intent: “growth” (recruitment, engagement, fundraising) or “change” (winning a demand)
  • location: where is this happening? (e.g. hospital, warehouse, city/state)
  • problem: what’s driving the campaign (optional)
  • goals: Ask the user for up to 4 key goals for THIS campaign. List them clearly as bullet points or a simple list. Examples: participation, membership, activism, donation, vote, corporate decision, political decision, issue awareness, issue support.

After listing the freeform goals, also include a canonical goal classification underneath each one, formatted like this:

  - Recruit new members to the fund  
    → Goal Type: membership

Only use the following allowed canonical goal types:
  participation, membership, activism, donation, sales, vote, corporate decision, political decision, issue awareness, issue support, other

If a goal does not clearly match any of the above, classify it as: other

After gathering the above, ALSO make your best guess at the campaign's classification based on ALL the information discussed.
Present this guess in the summary. Your available classification options are (these are examples to guide you, the user will confirm/edit later):
- Primary Types: union, environmental, community_activism, social_enterprise
- Secondary Types are linked to Primary Types (e.g., union can be Industrial or political; environmental can be political or Corporate).
- Use Cases are linked to Secondary Types (e.g., union/political can be a Decision or electoral campaign; union/industrial can be a workplace campaign).

When finished, format the summary EXACTLY like this example:

Here is the summary:

- **Purpose:** [campaign purpose]
- **Audience:** [campaign audience]
- **Target:** [who holds power]
- **Intent:** [growth or change]
- **Location:** [where the campaign is happening]
- **Problem:** [optional — the core problem or motivation]
- **Goals:**
  - [goal 1 as a bullet or simple list item]
  - [goal 2 as a bullet or simple list item]
- **Initial Classification Guess:**
  - Primary Type: [AI's guess for primary type, e.g., union]
  - Secondary Type: [AI's guess for secondary type, e.g., Industrial]
  - Use Case: [AI's guess for use case, e.g., workplace]

Then, conclude EXACTLY with this phrase on a new line, with no extra text:
✅ Final summary complete
        `.trim(),
      },
      ...history.map((msg) => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content,
      })),
      { role: 'user', content: input },
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages,
      temperature: 0.7,
    });

    const rawMessage = completion.choices?.[0]?.message?.content?.trim();
    if (!rawMessage) {
      console.error('❌ OpenAI returned empty message in /campaign-assistant');
      return res.status(500).json({ error: 'AI returned empty response.' });
    }

    const isFinalSummary = detectFinalSummaryMessage(rawMessage);
    let responsePayload = {};

    if (isFinalSummary) {
        console.log(`[campaign-assistant] INFO: Final summary marker detected. Attempting to parse structure and classification guess.`);
        const parsedData = parseSummaryAndClassification(rawMessage); // Use the new parser

        // Check if the main summary structure was parsed successfully
        if (parsedData && parsedData.summary && parsedData.summary.structured) {
                            const canonicalGoals = mapGoalsToCanonical(parsedData.summary.goals);
                const firestoreFormattedGoals = formatCanonicalGoalsForFirestore(canonicalGoals);
                responsePayload.goals = firestoreFormattedGoals;
responsePayload = {
                summary: parsedData.summary,
                classification_guess: parsedData.classification_guess, // Will be null if not found
                aiMessage: rawMessage,
                done: true,
                structured: true
            };
            console.log(`[campaign-assistant] INFO: Successfully parsed summary and classification guess.`);
        } else {
            // Summary structure parsing failed, even if marker was present
            console.warn(`[campaign-assistant] WARN: Failed to parse core summary structure from final summary text, though marker was present.`);
            responsePayload = {
                summary: parsedData?.summary || null, // Send what was partially parsed, if anything
                classification_guess: parsedData?.classification_guess || null,
                aiMessage: rawMessage,
                done: true, // Still "done" because marker was found
                structured: false // But core summary structure parsing failed
            };
        }
    } else {
        // Not the final summary yet
        responsePayload = {
            aiMessage: rawMessage,
            done: false,
            structured: false,
            classification_guess: null // No guess if not done
        };
    }

    // console.log("[campaign-assistant] INFO: Sending response to frontend:", responsePayload);
    return res.status(200).json(responsePayload);

  } catch (err) {
    console.error('❌ Error in /campaign-assistant:', err.stack || err);
    if (err instanceof OpenAI.APIError) {
         console.error('OpenAI API Error Status:', err.status);
         console.error('OpenAI API Error Headers:', err.headers);
         console.error('OpenAI API Error Body:', err.error);
    }
    return res.status(500).json({ error: 'AI assistant failed. ' + err.message });
  }
});

export default router;
