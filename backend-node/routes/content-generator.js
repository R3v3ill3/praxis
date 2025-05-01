import express from 'express';
import OpenAI from 'openai';
import authMiddleware from '../middleware/authMiddleware.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.use(authMiddleware); // Protect this route

// Placeholder POST route for generating content
router.post('/', async (req, res) => {
    const { contentType, context } = req.body; // e.g., contentType: 'email_subject', context: { planAction: '...', messagingGuide: '...' }
    const userId = req.user.uid;

    console.log(`User ${userId} requested content type: ${contentType}`);

    if (!contentType || !context) {
        return res.status(400).json({ error: 'Missing contentType or context' });
    }

    // TODO: Implement specific prompts based on contentType and context
    const prompt = `Generate content for type "${contentType}" based on this context: ${JSON.stringify(context)}`;

    try {
         const completion = await openai.chat.completions.create({
             model: 'gpt-4', // Or another suitable model
             messages: [{ role: 'user', content: prompt }],
             temperature: 0.7,
         });
         const generatedContent = completion.choices?.[0]?.message?.content?.trim();
         res.json({ generatedContent });
    } catch (err) {
        console.error(`❌ Error generating content for user ${userId}:`, err);
        res.status(500).json({ error: 'AI content generation failed.' });
    }
});

export default router;
