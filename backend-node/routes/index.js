import express from 'express';
import segmentsRouter from './segments.js';
import statusRouter from './status.js';
import suggest from './suggest.js';
import campaignRoutes from './campaigns.js';
import campaignAssistant from './campaign-assistant.js';
import classifyCampaign from './classify-campaign-type.js';
import campaignPlanRouter from './campaign-plan.js';
import messagingGuideRouter from './messaging-guide.js';
import contentGeneratorRouter from './content-generator.js'; // Import new router

const router = express.Router();

router.use('/segments', segmentsRouter);
router.use('/', statusRouter);
router.use('/suggest-plan', suggest);
router.use('/campaigns', campaignRoutes);
router.use('/campaign-assistant', campaignAssistant);
router.use('/classify-campaign-type', classifyCampaign);
router.use('/campaign-plan', campaignPlanRouter);
router.use('/messaging-guide', messagingGuideRouter);
router.use('/generate-content', contentGeneratorRouter); // Mount new router

export default router;
