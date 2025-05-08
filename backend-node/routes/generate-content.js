// backend-node/routes/generate-content.js

import express from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const formatInstructions = {
  "SMS": "Write a concise 2–3 sentence SMS that motivates action.",
  "Social Media Post": "Write a social media post (e.g., for Facebook or Instagram) with a compelling hook, message, and call to action.",
  "Email Intro": "Write the opening paragraph of a campaign email that emotionally engages the reader and outlines the issue.",
  "Poster Slogan": "Create a short, bold campaign slogan suitable for a poster.",
  "Speech Excerpt": "Write a 60-second excerpt of a speech using powerful narrative language."
};

router.post('/', async (req, res) => {
  const { format, messagingGuide, summary } = req.body;

  if (!format || !messagingGuide) {
    return res.status(400).json({ error: 'Format and messagingGuide are required.' });
  }

  const instructions = formatInstructions[format] || `Write a campaign message in the following format: ${format}`;

  const prompt = `You are a progressive political communications expert.
Use the following messaging guide to generate campaign content.

---
CAMPAIGN CONTEXT:
${JSON.stringify(summary, null, 2)}

MESSAGING GUIDE:
${messagingGuide}

---

Task: ${instructions}`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: prompt }
      ],
      temperature: 0.7
    });

    const result = completion.choices[0].message.content;
    res.json({ content: result });
  } catch (error) {
    console.error('❌ Content Generation Error:', error);
    res.status(500).json({ error: 'Failed to generate content.' });
  }
});

export default router;
