// backend/routes/export-campaign.js
import express from 'express';
import { db } from '../firebase.js';

const router = express.Router();

router.get('/:campaignId/export', async (req, res) => {
  const { campaignId } = req.params;
  
  try {
    const campaignDoc = await db.collection('campaigns').doc(campaignId).get();
    
    if (!campaignDoc.exists) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    
    const campaignData = campaignDoc.data();
    
    // Create three separate export files
    const exports = {
      step1Analysis: {
        type: 'step1Analysis',
        content: campaignData.step1Analysis || '',
        metadata: {
          campaignId,
          exportedAt: new Date().toISOString(),
          version: '1.0'
        }
      },
      messagingGuide: {
        type: 'messagingGuide',
        content: campaignData.messagingGuide || '',
        metadata: {
          campaignId,
          exportedAt: new Date().toISOString(),
          version: '1.0'
        }
      },
      actionPlan: {
        type: 'actionPlan',
        content: campaignData.actionPlan || '',
        metadata: {
          campaignId,
          exportedAt: new Date().toISOString(),
          version: '1.0'
        }
      }
    };

    // Send all three files as a ZIP archive
    res.json(exports);
  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ error: 'Failed to export campaign data' });
  }
});

export default router;
