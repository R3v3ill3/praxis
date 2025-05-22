// backend-node/routes/index.js
import express from 'express';
import segmentsRouter from './segments.js';
import statusRouter from './status.js';
import campaignRoutes from './campaigns.js';
import campaignAssistant from './campaign-assistant.js'; // Related to current frontend error
import classifyCampaign from './classify-campaign-type.js';
import testGoalMapping from './test-goal-mapping.js';
import saveCampaign from './save-campaign.js';
import campaignPlanRouter from './campaign-plan.js';
import messagingGuideRouter from './messaging-guide2.js';
import contentGeneratorRouter from './generate-content.js';
import messagingChatRouter from './messaging-chat.js'; // This is the import for the module PM2 says it can't find
import classificationOptions from './classification-options.js';
import actionPlanGeneratorRouter from './action-plan-generator.js';

const router = express.Router();

console.log('--- [routes/index.js] YEAH BABY FULL FUCKING ROUTER ---');
router.use('/segments', segmentsRouter);
router.use('/', statusRouter);
router.use('/campaigns', campaignRoutes);
router.use('/campaign-assistant', campaignAssistant); // Mounted here
router.use('/classify-campaign-type', classifyCampaign);
router.use('/test-goal-mapping', testGoalMapping);
router.use('/save-campaign', saveCampaign);
router.use('/campaign-plan', campaignPlanRouter);
router.use('/messaging-guide', messagingGuideRouter);
router.use('/generate-content', contentGeneratorRouter);
router.use('/messaging-chat', messagingChatRouter); // Mounted here
router.use('/classification-options', classificationOptions);
router.use('/generate-action-plan', actionPlanGeneratorRouter);

export default router;
