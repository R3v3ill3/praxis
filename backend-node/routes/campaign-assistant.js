// backend-node/routes/campaign-assistant.js
import express from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// 🔒 PROMPT_VERSION: v1.3.2-full-union-structured — DO NOT simplify without explicit instruction

function parseStructuredSummary(text) {
    const summary = {};
    // Rename 'goals' to 'goals_text' here to clarify these are raw text goals from AI
    const goals_text = []; // MODIFIED: was 'goals'
    let collectingGoals = false;
    const lines = text.split('\n');

    lines.forEach(line => {
        const trimmedLine = line.trim();
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
            collectingGoals = true;
        } else if (collectingGoals && /^[-*]\s+/.test(trimmedLine)) {
          const goalMatch = trimmedLine.match(/^[-*]\s+(.*)/);
            if (goalMatch && goalMatch[1]) {
                goals_text.push(goalMatch[1].trim()); // MODIFIED: was 'goals'
            }
        }
    });

    if (goals_text.length > 0) { // MODIFIED: was 'goals'
        summary.goals_text = goals_text; // MODIFIED: was 'goals', key is now 'goals_text'
    }

    // Ensure essential fields are present to consider it a valid structured summary
    if (summary.purpose && summary.audience && summary.target) {
        summary.structured_parse_success = true; // Internal flag indicating this function considers it parsed
        if (!summary.goals_text) { // MODIFIED: was 'goals'
            summary.goals_text = []; // MODIFIED: was 'goals'
        }
        return summary; // summary object contains { purpose, audience, ..., goals_text }
    }

    return null; // Return null if essential fields are missing
}

function detectFinalSummaryMessage(message) {
  return message && message.includes("✅ Final summary complete");
}

router.post('/', async (req, res) => {
console.log(`--- ${new Date().toISOString()} CAMPAIGN-ASSISTANT ROUTE HIT ---`);
console.log('Request Body:', JSON.stringify(req.body, null, 2));
// ... (API key check remains the same)
  try {
    const { input, history = [] } = req.body;

    if (!input) {
      return res.status(400).json({ error: 'Missing input' });
    }

    const messages = [
        // ... (system message and history remain the same)
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
  • goals: up to 4 relevant goals, selected from:
    participation, membership, activism, donation, vote, corporate decision, political decision, issue awareness, issue support

Once complete, respond with:

Here is the summary:

- **Purpose:** [campaign purpose]
- **Audience:** [campaign audience]
- **Target:** [who holds power]
- **Intent:** [growth or change]
- **Location:** [where the campaign is happening]
- **Problem:** [optional — the core problem or motivation]
- **Goals:**
  - [goal 1]
  - [goal 2]
  - [goal 3]
  - [optional goal 4]

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
      return res.status(500).json({ error: 'AI returned empty response.' });
    }

    const isFinalSummaryFromAI = detectFinalSummaryMessage(rawMessage); // Renamed for clarity
    let responsePayload = {};

    if (isFinalSummaryFromAI) { // Corresponds to 'done: true' on frontend
        const parsedSummaryObject = parseStructuredSummary(rawMessage); // This is the object {purpose, ..., goals_text} or null

        if (parsedSummaryObject && parsedSummaryObject.structured_parse_success) {
            // MODIFICATION START
            responsePayload = {
                summary: parsedSummaryObject, // Nest the parsed summary object
                aiMessage: rawMessage,
                done: true,
                structured: true // Indicates overall AI interaction structure is as expected
            };
            // MODIFICATION END
        } else {
            // MODIFICATION START
            responsePayload = {
                summary: null, // Explicitly send null if parsing failed or incomplete
                aiMessage: rawMessage,
                done: true, // AI indicated it's done, but we couldn't parse it
                structured: false // Indicates summary structure is not usable
            };
            // MODIFICATION END
        }
    } else {
        responsePayload = {
            summary: null, // No final summary attempted by AI
            aiMessage: rawMessage,
            done: false,
            structured: false
        };
    }
    console.log('Campaign Assistant Response Payload:', JSON.stringify(responsePayload, null, 2));
    return res.status(200).json(responsePayload);
  } catch (err) {
    console.error('❌ Error in /campaign-assistant:', err.stack || err);
    return res.status(500).json({ error: 'AI assistant failed. ' + err.message });
  }
});

export default router;
