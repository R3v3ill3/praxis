// backend-node/routes/save-campaign.js

import express from 'express';
import { db } from '../firebase.js';

const router = express.Router();

// Validate campaign summary structure
function validateCampaignData(data) {
  const requiredFields = ['purpose', 'audience', 'target'];
  for (const field of requiredFields) {
    if (!data.summary?.[field] || typeof data.summary[field] !== 'string') {
      return `Missing or invalid summary field: ${field}`;
    }
  }

  const classification = data.classification;
  if (
    !classification ||
    typeof classification.primary_type !== 'string' ||
    typeof classification.secondary_type !== 'string' ||
    typeof classification.use_case !== 'string'
  ) {
    return "Invalid or incomplete classification object.";
  }

  if (!Array.isArray(data.goals)) {
    return "Goals must be an array.";
  }

  for (const goal of data.goals) {
    if (
      typeof goal.id !== 'string' ||
      typeof goal.label !== 'string' ||
      typeof goal.rank !== 'number'
    ) {
      return "Each goal must have id (string), label (string), and rank (number).";
    }
  }

  return null; // no error
}

router.post('/', async (req, res) => {
  try {
    const campaignData = req.body;
    const validationError = validateCampaignData(campaignData);

    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    // Generate a campaign ID if not provided
    const campaignId = campaignData.id || db.collection('campaigns').doc().id;

    await db.collection('campaigns').doc(campaignId).set({
      id: campaignId,
      summary: campaignData.summary,
      classification: campaignData.classification,
      goals: campaignData.goals,
      createdAt: new Date().toISOString()
    });

    res.status(200).json({ success: true, id: campaignId });
  } catch (error) {
    console.error('❌ Error saving campaign:', error);
    res.status(500).json({ error: 'Failed to save campaign' });
  }
});

export default router;
