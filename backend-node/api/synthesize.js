// backend-node/api/synthesize.js
import express from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/', async (req, res) => {
  const { analysis } = req.body;

  if (!analysis) {
    return res.status(400).json({ error: 'Missing analysis input from Stage 1.' });
  }

  const synthPrompt = `You are a senior communications strategist. Based on the following narrative analysis, generate:

- 1 message using shared values and moral clarity
- 1 message anchored in identity, pride, and belonging
- 1 message driving urgency and clear action
- 1 strong oppositional message using persuasive narrative devices

Then, for each message, create a message matrix:
- Title
- Primary Frame
- Schwartz Values evoked
- Suggested Format (e.g., video, flyer, post)
- Efficacy Score (0–100)
- Risk or Backlash Potential
- Suggestions to Improve

Narrative Analysis:
${analysis}`.trim();

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'system', content: synthPrompt }],
      temperature: 0.7
    });

    const result = completion.choices[0].message.content;
    res.json({ messages: result });
  } catch (error) {
    console.error('❌ Synthesize Error:', error);
    res.status(500).json({ error: 'Failed to generate campaign messages.' });
  }
});

export default router;
