// backend-node/routes/campaign-assistant.js
import express from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// --- Function to parse structured data from AI text ---
function parseStructuredSummary(text) {
    const summary = {};
    // Use a Map to preserve insertion order for goals if needed, or just an array
    const goals = [];
    let collectingGoals = false; // Flag to indicate if we are currently parsing goals

    const lines = text.split('\n');

    lines.forEach(line => {
        const trimmedLine = line.trim();

        // Reset goal collection if we hit the final marker or a new section
        if (trimmedLine.startsWith('✅ Final summary complete') || (trimmedLine.startsWith('- **') && !trimmedLine.startsWith('- **Goals:**'))) {
            collectingGoals = false;
        }

        if (trimmedLine.startsWith('- **Purpose:**')) {
            summary.purpose = trimmedLine.substring('- **Purpose:**'.length).trim();
        } else if (trimmedLine.startsWith('- **Audience:**')) {
            summary.audience = trimmedLine.substring('- **Audience:**'.length).trim();
        } else if (trimmedLine.startsWith('- **Target:**')) {
            summary.target = trimmedLine.substring('- **Target:**'.length).trim();
        } else if (trimmedLine.startsWith('- **Intent:**')) {
            summary.intent = trimmedLine.substring('- **Intent:**'.length).trim();
        } else if (trimmedLine.startsWith('- **Location:**')) {
            summary.location = trimmedLine.substring('- **Location:**'.length).trim();
        } else if (trimmedLine.startsWith('- **Problem:**')) {
            summary.problem = trimmedLine.substring('- **Problem:**'.length).trim();
        } else if (trimmedLine.startsWith('- **Goals:**')) {
            collectingGoals = true; // Start collecting goals from the next lines
        } else if (collectingGoals && /^\s*\d+\.\s/.test(trimmedLine)) {
            // If collecting goals and line starts with "1. ", "2. ", etc.
            const goalMatch = trimmedLine.match(/^\s*\d+\.\s*(.*)/);
            if (goalMatch && goalMatch[1]) {
                goals.push(goalMatch[1].trim()); // Add goal to array, order implies rank
            }
        }
    });

    // Assign collected goals if any were found
    if (goals.length > 0) {
        summary.goals = goals; // Store as an ordered array
    }

    // Check if essential fields were parsed
    // Make goals optional for structure check initially, as AI might sometimes fail format
    if (summary.purpose && summary.audience && summary.target) {
        summary.structured = true; // Mark as successfully parsed
        // Ensure goals array exists, even if empty, if structured
        if (!summary.goals) {
             summary.goals = [];
        }
        return summary;
    }
    // Return null only if core fields (purpose, audience, target) are missing
    return null;
}
// --- END NEW FUNCTION ---


// Detect summary ending phrase
function detectFinalSummaryMessage(message) {
  if (!message) return false;
  // Use only the explicit marker for reliability
  return message.includes("✅ Final summary complete");
}

router.post('/', async (req, res) => {
  try {
    const { input, history = [] } = req.body;

    if (!input) {
      console.error('❌ Missing input');
      return res.status(400).json({ error: 'Missing input' });
    }

    // --- MODIFIED SYSTEM PROMPT ---
    const messages = [
      {
        role: 'system',
        content: `
You are a sharp, confident, and experienced campaign strategist working with unions and progressive organisations. Speak conversationally, like an organiser.

Your job is to guide users to define their campaign by collecting key details.

Start by asking what they are working on. Assume union context if workplace issues (pay, safety, rosters, voice, management) are mentioned. Be persuasive about union power.

Ask only 1–2 questions at a time. Always clarify:
- Audience: Who to involve/mobilise (coworkers, members, public)?
- Target: Who holds power for the change (boss, CEO, board, government)? Explain the difference clearly.

Your goal is to collect:
- purpose: The main aim (e.g., win pay rise, stop cuts).
- audience: Who to involve.
- target: Who has power.
- intent: "growth" (recruitment, engagement, fundraising) or "change" (winning a demand).
- location: Where it's happening.
- problem: What's driving the campaign (optional).
- goals: Ask the user for their **top 1-4 goals for THIS campaign, IN ORDER OF PRIORITY.** List them clearly using numbers (1., 2., 3., 4.). Choose from: participation, membership, activism, donation, sales, vote, corporate decision, political decision, issue awareness, issue support.

When finished, format the summary EXACTLY like this example:

Here is the summary:

- **Purpose:** Win a fair pay rise for warehouse staff.
- **Audience:** Warehouse workers at ACME Corp.
- **Target:** ACME Corp CEO.
- **Intent:** change
- **Location:** ACME Warehouse, Brisbane.
- **Problem:** Stagnant wages despite high profits.
- **Goals:**
  1. Corporate decision (achieve the pay rise)
  2. Membership (recruit non-members during the campaign)
  3. Participation (get high member involvement in actions)

Then, conclude EXACTLY with this phrase on a new line, with no extra text:
✅ Final summary complete
        `.trim(),
      },
      // Map history, ensuring roles are 'user' or 'assistant'
      ...history.map((msg) => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content,
      })),
      { role: 'user', content: input },
    ];
    // --- END MODIFIED SYSTEM PROMPT ---


    const completion = await openai.chat.completions.create({
      model: 'gpt-4o', // Or your preferred model
      messages,
      temperature: 0.7,
    });

    const rawMessage = completion.choices?.[0]?.message?.content?.trim();

    if (!rawMessage) {
      console.error('❌ OpenAI returned empty message');
      return res.status(500).json({ error: 'AI returned empty response.' });
    }

    const isFinalSummary = detectFinalSummaryMessage(rawMessage);
    let responsePayload = {};

    if (isFinalSummary) {
        console.log(`[campaign-assistant] INFO: Final summary detected. Attempting to parse structure.`);
        const parsedSummary = parseStructuredSummary(rawMessage);

        if (parsedSummary) {
            console.log(`[campaign-assistant] INFO: Successfully parsed structured summary (Goals order implies rank):`, parsedSummary.goals);
            responsePayload = {
                ...parsedSummary, // Includes purpose, audience, target, goals (ordered array), etc.
                aiMessage: rawMessage,
                done: true,
                structured: true
            };
        } else {
            console.warn(`[campaign-assistant] WARN: Failed to parse structure from final summary text.`);
            responsePayload = {
                aiMessage: rawMessage,
                done: true,
                structured: false
            };
        }
    } else {
        console.log(`[campaign-assistant] INFO: Assistant response is not final summary.`);
        responsePayload = {
            aiMessage: rawMessage,
            done: false,
            structured: false
        };
    }

    console.log("[campaign-assistant] INFO: Sending response to frontend:", responsePayload);
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
