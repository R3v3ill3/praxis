
import express from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Helper: extract missing fields from knownInputs
function identifyMissingInputs(knownInputs) {
  const flat = JSON.stringify(knownInputs).toLowerCase();
  return {
    issueName: !knownInputs.issueName,
    proposedChange: !knownInputs.proposedChange,
    geographicContext: !knownInputs.geographicContext,
    desiredOutcome: !knownInputs.desiredOutcome,
    primaryAudience: !knownInputs.primaryAudience,
    demographics: !flat.includes('demographics'),
    psychographics: !flat.includes('psychographics'),
    priorBeliefs: !flat.includes('prior beliefs'),
    mediaHabits: !flat.includes('media'),
    campaignObjective: !knownInputs.campaignObjective,
    deliveryFormat: !flat.includes('format'),
    messenger: !flat.includes('messenger'),
    timing: !flat.includes('timing'),
    knownComparisons: !knownInputs.knownComparisons,
    benchmarkData: !knownInputs.benchmarkData
  };
}

router.post('/', async (req, res) => {
  const { history, knownInputs } = req.body;
  if (!history || !Array.isArray(history)) {
    return res.status(400).json({ error: 'Missing or invalid history' });
  }

  const missing = identifyMissingInputs(knownInputs);
  const stillNeeded = Object.entries(missing).filter(([k, v]) => v).map(([k]) => k);

  if (stillNeeded.length === 0) {
    return res.json({ done: true, update: {} });
  }

  const summaryOfKnown = Object.entries(knownInputs)
    .map(([k, v]) => `${k}: ${typeof v === 'object' ? JSON.stringify(v) : v}`)
    .join('\n');

  const prompt = `
You are a messaging strategist helping a campaign organiser prepare inputs for a messaging guide.
You are friendly and efficient. Your job is to gather the following fields:
${stillNeeded.join(', ')}

Known so far:
${summaryOfKnown}

Please ask a simple and friendly question to fill in one missing field at a time. Avoid repeating questions.
Once all fields are complete, stop.
`.trim();

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [...history, { role: 'system', content: prompt }],
      temperature: 0.6
    });

    const reply = completion.choices[0].message.content;
    res.json({ aiMessage: reply, update: null, done: false });
  } catch (err) {
    console.error('❌ Messaging Chat Error:', err);
    res.status(500).json({ error: 'Failed to generate chat message.' });
  }
});

export default router;
