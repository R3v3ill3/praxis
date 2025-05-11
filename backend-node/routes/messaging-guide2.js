console.log("✅ Loaded messaging-guide.js from", import.meta.url);
console.log("✅ ENV:", process.env.OPENAI_API_KEY ? "Key loaded" : "Key missing");
console.log("✅ Line 4 is actually:", (new Error().stack).split("\\n")[1]);



import express from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

router.post('/', async (req, res) => {
  const {
    issueName,
    proposedChange,
    geographicContext,
    desiredOutcome,
    primaryAudience,
    audienceProfile,
    campaignObjective,
    deliveryContext,
    knownComparisons,
    benchmarkData
  } = req.body;

  if (!issueName || !proposedChange || !geographicContext || !desiredOutcome || !primaryAudience || !audienceProfile) {
    return res.status(400).json({ error: 'Missing required campaign messaging inputs.' });
  }

  const prompt = `
You are a cognitive linguist and expert in progressive political communications. Your task is to deeply analyse and synthesise the dominant language, values, and frames used both for and against a proposed social change.

The issue is: ${issueName}
Location/context: ${geographicContext}
The proposed change is: ${proposedChange}
Target audience: ${primaryAudience}

Campaign objective: ${campaignObjective || 'not specified'}
Known comparisons: ${knownComparisons || 'not provided'}
Benchmark insights: ${benchmarkData || 'none'}

Audience profile:
- Demographics: ${audienceProfile.demographics}
- Psychographics: ${audienceProfile.psychographics}
- Prior beliefs: ${audienceProfile.priorBeliefs}
- Media habits: ${audienceProfile.mediaHabits}

Message delivery context:
- Format: ${deliveryContext?.format}
- Messenger: ${deliveryContext?.messenger}
- Timing: ${deliveryContext?.timing}

Conduct the following analysis using publicly available messaging and your knowledge base:

1. Frames: Identify 4–6 of the most common frames used to support the change, and 4–6 used to oppose it. Name each frame and provide a short description or example of its use.

2. Values: Map the dominant Schwartz values (e.g., Benevolence, Security, Tradition, Self-Direction) evoked in both supporting and opposing messages.

3. Linguistic and Narrative Devices:
  - Recurring metaphors (e.g., “war on X”, “clean break”, “family under attack”)
  - Similes, personifications, or analogies
  - Use of militaristic, organic, moralistic, or economic themes
  - Common keywords or lexical clusters

4. Messaging Synthesis: Based on this analysis, draft:
  - Three 150-word messages most likely to be persuasive in support of the change
  - Two 150-word messages most likely to be persuasive in opposition to the change
Each message should:
  a. Evoke shared values
  b. Frame the problem
  c. Frame the general solution
  d. Frame the specific solution/call to action

5. Scoring & Justification:
  For each message, provide a probable efficacy score (0–100) for the primary audience.
  Explain the score using:
    - Values alignment
    - Narrative and emotional resonance
    - Clarity and relevance of the call to action
    - Likelihood of backlash or dismissal
    - Effectiveness or alienation of frames or metaphors
  Suggest improvements to raise each score.

Write the output for a public communications strategist seeking to design a campaign narrative that moves hearts and minds—not just argues facts.
  `.trim();

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: prompt }
      ],
      temperature: 0.7
    });

    const result = completion.choices[0].message.content;
    res.json({ messagingGuide: result });
  } catch (error) {
    console.error('❌ Messaging Guide Error:', error);
    res.status(500).json({ error: 'Failed to generate messaging guide.' });
  }
});

export default router;
