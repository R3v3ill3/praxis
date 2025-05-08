// backend-node/routes/messaging-guide.js

import express from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

router.post('/', async (req, res) => {
  const { issueName, proposedChange, primaryAudience, geographicContext, summary } = req.body;

  const hasStructuredFields = issueName && proposedChange && primaryAudience && geographicContext;

  const prompt = `You are a cognitive linguist and expert in progressive political communications. Your task is to deeply analyse and synthesise the dominant language, values, and frames used both for and against a proposed social change.

The issue is: ${issueName || summary?.goal || '[unspecified]'}
Location/context: ${geographicContext || summary?.location || '[unspecified]'}
The proposed change is: ${proposedChange || summary?.intent || '[unspecified]'}
Target audience: ${primaryAudience || summary?.audience || '[unspecified]'}

Conduct the following analysis using publicly available messaging (political speeches, media articles, campaign materials, interviews, etc.):

1. Frames: Identify 4–6 of the most common frames used to support the change, and 4–6 used to oppose it. Name each frame and provide a short description or example of its use.
2. Values: Map the dominant Schwartz values (e.g., Benevolence, Security, Tradition, Self-Direction) evoked in both supporting and opposing messages.
3. Linguistic and Narrative Devices: Analyse the linguistic features and rhetorical devices:

- Recurring metaphors (e.g., “war on X”, “clean break”, “family under attack”)
- Similes, personifications, or analogies
- Use of militaristic, organic, moralistic, or economic themes
- Common keywords or lexical clusters

4. Messaging Synthesis: Based on this analysis, draft:
- Three 150-word messages most likely to be persuasive in support of the change. Use the structure:
  a. Evoke shared values
  b. Frame the problem
  c. Frame the general solution
  d. Frame the specific solution/call to action
- Two 150-word messages most likely to be persuasive in opposition to the change, following the same structure

5. Message Scoring: Rate and explain the persuasive strength of each message (out of 100), justifying the score based on emotional appeal, cognitive coherence, and clarity.

Write the output for a public communications strategist seeking to design a campaign with a narrative frame that moves hearts and minds, not just argues facts.`;

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
