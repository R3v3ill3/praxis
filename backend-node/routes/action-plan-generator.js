// backend/routes/action-plan-generator.js
import express from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import { db } // Assuming you have db initialized in firebase.js (Firebase Admin SDK)
from '../firebase.js'; 

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Revised PROMPT_TEMPLATE with restructured Plan Requirements
const PROMPT_TEMPLATE = `
You are a seasoned digital campaign director for progressive, values-driven organisations.
You have received the following:
1.  Organisational Profile.
2.  Current Campaign Context.
3.  A comprehensive "Foundational Strategic Analysis" document.
4.  A "Core Persuasive Messages" guide.

**I. Organisational Profile:**
* **Organisation Type:** {{org_type}}
* **Scale of Operation:** {{scale}}
* **Membership Size:** {{membership_size}}
* **Typical Campaign Budget Range:** {{campaign_budget}}
* **Staff Count:** {{staff_count}}
* **Volunteer Count:** {{volunteer_count}}
* **Key Technologies Used:** {{tech_stack}}

**II. Current Campaign Context:**
* **Campaign Name/Purpose:** {{campaign_purpose}}
* **Campaign Classification:** {{campaign_classification}}
* **Primary Goals:** {{primary_goals}}
* **Core Issue Addressed:** {{core_issue}}
* **Proposed Change/Solution:** {{proposed_change}}
* **Desired Long-Term Outcome:** {{desired_outcome}}
* **Primary Target Audience:** {{primary_audience}}
* **Audience Profile Summary:**
    * Demographics: {{audience_demographics}}
    * Psychographics & Values: {{audience_psychographics}}
    * Relevant Prior Beliefs: {{audience_prior_beliefs}}
    * Typical Media Habits: {{audience_media_habits}}

**III. Foundational Strategic Analysis Document:**
--- BEGIN STEP 1 ANALYSIS DOCUMENT ---
{{full_step1_analysis}}
--- END STEP 1 ANALYSIS DOCUMENT ---

**IV. Core Persuasive Messages Guide:**
--- BEGIN MESSAGING GUIDE DOCUMENT ---
{{full_messaging_guide}}
--- END MESSAGING GUIDE DOCUMENT ---

---
**Your Task: Generate a 6-Week Digital Action Plan**

Using all the provided information above (Organisational Profile, Campaign Context, the full Foundational Strategic Analysis Document, and the full Core Persuasive Messages Guide) as your foundation, generate a detailed, values-driven 6-week digital campaign action plan.

**Follow these strict plan requirements:**

1.  **Escalating Structure:**
    * Break the plan down week-by-week, building momentum and community engagement as the campaign progresses.
    * Include two “mini” peaks (e.g., end of week 2 & end of week 4) and a final major peak (e.g., last 5-7 days of week 6).

2.  **Weekly Narrative and Content:**
    * For each week, define the narrative arc and core content theme.
    * Ensure all content is grounded in the campaign’s key values and narrative frames (as detailed in the provided documents).
    * At least 50% of posts (across all platforms) must feature real people or real-life stories (e.g., testimonials, interviews, day-in-the-life vignettes, community spotlights).
    * Content Ratio: At least 40% video (e.g., reels, short interviews, TikToks, stories), 30% photo-based, remainder text or other. Every week must include at least one carousel or story compilation.
    * Weekly CTA: Every Friday, include a direct, positive call to action (e.g., sign a petition, share a story, join an event).
    * Tone: Use affirming, optimistic language. Do not use fear-based or negative messaging — always foreground hope, community, and agency. All narrative must explicitly foreground the Schwartz values of “universalism” and “self-direction,” even when other values are present (refer to the messaging guide for value mapping).

3.  **Daily Content Plan Details:**
    * For each day within the 6-week calendar, specify:
        * Post format (e.g., video, reel, photo, text, story, infographic, carousel).
        * Platform (e.g., Instagram, TikTok, Facebook, SMS, Email).
        * Suggested topic or hook.
        * (Optional) Script outline or production cue for on-camera pieces or more complex content.

4.  **Platform and Paid Strategy Integration:**
    * Platform Priority: Focus content creation on Instagram and TikTok for organic reach and engagement. Use Facebook and SMS primarily for paid promotion and action reminders. Include at least two email updates to the list during the campaign — one at mid-point, one in the final week.
    * Paid Spend Phasing: Recommend how to phase in paid digital ad spend. It should begin in week 3, double in the final two weeks, and target “peak” moments.
    * Paid Content & Targeting: Paid content should include short, high-impact video and direct asks, but maintain positive framing. Use paid retargeting to reinforce key calls-to-action and bring back previous engagers. Specify target audience segments for paid promotion where appropriate.

5.  **Values, Narrative, and Risk Mitigation:**
    * Briefly note how the overall plan and weekly themes ensure the campaign’s core messaging values and narrative frames (from the provided documents) remain central and consistently reinforced.
    * Suggest concrete ways the plan addresses or mitigates any risks or weaknesses identified in the "Core Persuasive Messages Guide."

---
**Format your output as follows (must be copy-paste ready with clear headings, tables, and bullet points):**

1.  **Campaign Overview:** (1-2 paragraphs: values focus, goals, overall strategy, drawing from the provided context and guides).
2.  **Weekly Narrative Arcs and Content Themes:** (For each of the 6 weeks).
3.  **6-Week Detailed Content Calendar:** (Table format: Week, Day, Post Format, Platform, Example Post/Hook/Topic. Include script/production cues where appropriate, as per Plan Requirement #3).
4.  **Paid Digital Integration Table:** (Table format: Timing/Week, Target Audience, Spend Focus/Phasing, Content Type/Examples, Platform).
5.  **Notes on Values/Narrative Grounding, Risk Mitigation, and CTA Strategy:** (Addressing Plan Requirement #5).

---
Messaging guide and analysis documents are embedded above.
`;

// Helper function to safely get nested properties
const getSafe = (fn, defaultValue = 'Not specified') => {
  try {
    const value = fn();
    if (value === undefined || value === null || (typeof value === 'string' && value.trim() === '')) {
      return defaultValue;
    }
    if (Array.isArray(value) && value.length === 0) {
      return 'None specified';
    }
    return value;
  } catch (e) {
    return defaultValue;
  }
};

// Corrected route path: from '/generate-action-plan' to '/'
router.post('/', async (req, res) => {
  const { campaignId, userId } = req.body; 

  if (!campaignId) {
    return res.status(400).json({ error: 'Campaign ID is required.' });
  }

  try {
    console.log(`[ActionPlanGenerator] Received request for campaignId: ${campaignId} (Path: /api/generate-action-plan)`);

    const campaignDocRef = db.collection('campaigns').doc(campaignId);
    const campaignDoc = await campaignDocRef.get();

    if (!campaignDoc.exists) {
      console.error(`[ActionPlanGenerator] Campaign not found: ${campaignId}`);
      return res.status(404).json({ error: 'Campaign not found.' });
    }
    const campaignData = campaignDoc.data();
    console.log(`[ActionPlanGenerator] Fetched campaign data for ${campaignId}`);

    if (!campaignData.messaging_inputs || !campaignData.summary || !campaignData.classification || !campaignData.goals) {
        console.error(`[ActionPlanGenerator] Missing critical campaign data fields for ${campaignId}`);
        return res.status(400).json({ error: 'Campaign data is incomplete. Missing messaging_inputs, summary, classification, or goals.' });
    }
    
    const fullStep1Analysis = getSafe(() => campaignData.step1Analysis, "Foundational Strategic Analysis document was not available for this campaign.");
    const fullMessagingGuide = getSafe(() => campaignData.messagingGuide, "Core Persuasive Messages guide was not available for this campaign.");

    let orgData = {};
    const campaignUserId = campaignData.userId || userId; 

    if (campaignUserId) {
        try {
            const orgDocRef = db.collection('organisations').doc(campaignUserId);
            const orgDoc = await orgDocRef.get();
            if (orgDoc.exists) {
                orgData = orgDoc.data();
                console.log(`[ActionPlanGenerator] Fetched organisation data for userId: ${campaignUserId}`);
            } else {
                console.warn(`[ActionPlanGenerator] Organisation data not found for userId: ${campaignUserId}. Org profile in prompt will use defaults.`);
            }
        } catch (e) {
             console.error(`[ActionPlanGenerator] Error fetching organisation data for userId ${campaignUserId}:`, e);
             console.warn(`[ActionPlanGenerator] Org profile in prompt will use defaults due to error.`);
        }
    } else {
        console.warn(`[ActionPlanGenerator] No userId available to fetch organisation data. Org profile in prompt will use defaults.`);
    }

    let populatedPrompt = PROMPT_TEMPLATE;
    const replacements = {
        '{{org_type}}': getSafe(() => orgData.org_type),
        '{{scale}}': getSafe(() => orgData.scale),
        '{{membership_size}}': getSafe(() => orgData.membership_size),
        '{{campaign_budget}}': getSafe(() => orgData.campaign_budget),
        '{{staff_count}}': getSafe(() => orgData.staff_count),
        '{{volunteer_count}}': getSafe(() => orgData.volunteer_count),
        '{{tech_stack}}': getSafe(() => Array.isArray(orgData.tech_stack) ? orgData.tech_stack.join(', ') : orgData.tech_stack, 'None specified'),
        '{{campaign_purpose}}': getSafe(() => campaignData.summary.purpose),
        '{{campaign_classification}}': getSafe(() => `${campaignData.classification.primary_type} - ${campaignData.classification.secondary_type} (${campaignData.classification.sub_type || campaignData.classification.id || 'N/A'})`),
        '{{primary_goals}}': getSafe(() => Array.isArray(campaignData.goals) ? campaignData.goals.map(g => g.label || g.id).join(', ') : '', 'None specified'),
        '{{core_issue}}': getSafe(() => campaignData.messaging_inputs.issueName),
        '{{proposed_change}}': getSafe(() => campaignData.messaging_inputs.proposedChange),
        '{{desired_outcome}}': getSafe(() => campaignData.messaging_inputs.desiredOutcome),
        '{{primary_audience}}': getSafe(() => campaignData.messaging_inputs.primaryAudience),
        '{{audience_demographics}}': getSafe(() => campaignData.messaging_inputs.audienceProfile.demographics),
        '{{audience_psychographics}}': getSafe(() => campaignData.messaging_inputs.audienceProfile.psychographics),
        '{{audience_prior_beliefs}}': getSafe(() => campaignData.messaging_inputs.audienceProfile.priorBeliefs),
        '{{audience_media_habits}}': getSafe(() => campaignData.messaging_inputs.audienceProfile.mediaHabits),
        '{{full_step1_analysis}}': fullStep1Analysis,
        '{{full_messaging_guide}}': fullMessagingGuide,
    };

    for (const [key, value] of Object.entries(replacements)) {
        const replacementValue = (typeof value === 'string' || typeof value === 'number') ? String(value) : JSON.stringify(value);
        populatedPrompt = populatedPrompt.replace(new RegExp(key.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replacementValue);
    }
    
    console.log("[ActionPlanGenerator] Sending request to OpenAI...");
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o', 
      messages: [{ role: 'user', content: populatedPrompt }],
      temperature: 0.7,
    });

    const actionPlanResult = completion.choices[0].message.content;
    console.log("[ActionPlanGenerator] Received action plan from OpenAI.");

    try {
        await campaignDocRef.update({ 
            actionPlan: actionPlanResult, 
            actionPlanGeneratedAt: new Date().toISOString() 
        });
        console.log(`[ActionPlanGenerator] Successfully saved generated action plan to Firestore for campaign ${campaignId}`);
    } catch (updateError) {
        console.error(`[ActionPlanGenerator] Failed to save action plan to Firestore for campaign ${campaignId}:`, updateError);
    }

    res.json({ actionPlan: actionPlanResult });

  } catch (error) {
    console.error('[ActionPlanGenerator] Error generating action plan:', error);
    let errorMessage = 'Failed to generate action plan.';
    if (error.response && error.response.data && error.response.data.error && error.response.data.error.message) {
        errorMessage = `OpenAI API Error: ${error.response.data.error.message}`;
    } else if (error.message) {
        errorMessage = error.message;
    }
    console.error('[ActionPlanGenerator] Stacktrace:', error.stack); 
    res.status(500).json({ error: errorMessage });
  }
});

export default router;
