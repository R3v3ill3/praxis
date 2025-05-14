import express from 'express';
import segmentsRouter from './segments.js';
import statusRouter from './status.js';
import campaignRoutes from './campaigns.js';
import campaignAssistant from './campaign-assistant.js';
import classifyCampaign from './classify-campaign-type.js';
import testGoalMapping from './test-goal-mapping.js';
import saveCampaign from './save-campaign.js';
import campaignPlanRouter from './campaign-plan.js';
import messagingGuideRouter from './messaging-guide2.js';
import contentGeneratorRouter from './generate-content.js';
import messagingChatRouter from './messaging-chat.js';
import classificationOptions from './classification-options.js';

const router = express.Router();

router.use('/segments', segmentsRouter);
router.use('/', statusRouter);
router.use('/campaigns', campaignRoutes);
router.use('/campaign-assistant', campaignAssistant);
router.use('/classify-campaign-type', classifyCampaign);
router.use('/test-goal-mapping', testGoalMapping);
router.use('/save-campaign', saveCampaign);
router.use('/campaign-plan', campaignPlanRouter);
router.use('/messaging-guide', messagingGuideRouter);
router.use('/generate-content', contentGeneratorRouter); // Mount new router
router.use('/ai/messaging-chat', messagingChatRouter);
router.use('/classification-options', classificationOptions);

export default router;
