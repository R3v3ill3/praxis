// backend-node/routes/save-campaign.js
import express from 'express';
import { db } from '../firebase.js'; // Ensure this path is correct for your Firebase admin init
import { Timestamp } from 'firebase-admin/firestore';
import authMiddleware from '../middleware/authMiddleware.js'; // <<< 1. IMPORT AUTH MIDDLEWARE

const router = express.Router();
router.use(authMiddleware); // <<< 2. APPLY AUTH MIDDLEWARE TO ALL ROUTES IN THIS FILE

/**
 * Helper function to save/update campaign data in Firestore.
 * @param {string} campaignId - The ID of the campaign (guaranteed to be a string by the caller).
 * @param {object} campaignData - The data to save.
 * @param {boolean} isNewCampaign - Flag to indicate if this is a new campaign creation.
 * @returns {Promise<object>} result with id
 */
async function storeCampaignInFirestore(campaignId, campaignData, isNewCampaign) {
  if (!db) {
    console.error("(ERROR) [/api/save-campaign] Firestore DB instance is not available.");
    throw new Error("Firestore service is unavailable.");
  }

  const docRef = db.collection('campaigns').doc(campaignId);

  const dataToSave = {
    ...campaignData, // Spread the incoming data
    updatedAt: Timestamp.now(),
  };

  if (isNewCampaign) {
    dataToSave.createdAt = Timestamp.now(); // Add createdAt timestamp for new campaigns
  }

  await docRef.set(dataToSave, { merge: true });
  console.log(`(INFO) [/api/save-campaign] Campaign data for ID: ${campaignId} ${isNewCampaign ? 'created' : 'merged'} successfully.`);
  return { success: true, id: campaignId };
}

// Route to handle saving (creating new or updating existing) campaign progress
router.post('/', async (req, res) => {
  console.log("(INFO) [/api/save-campaign] Endpoint hit. Body:", JSON.stringify(req.body, null, 2));
  
  let { // Use 'let' because campaignId might be (re)assigned
    campaignId, 
    summary, 
    classification, 
    goals, 
    messaging_inputs,
    step1Analysis,
    messagingGuide,
    name // Assuming 'name' might also be part of the campaign data
    // Add any other top-level fields you expect in the campaign document
  } = req.body;

  let isNewCampaign = false;

  if (!campaignId) {
    campaignId = db.collection('campaigns').doc().id; // Generate a new unique ID
    isNewCampaign = true;
    console.log(`(INFO) [/api/save-campaign] No campaignId from client. Generated new ID: ${campaignId}`);
  }

  const campaignDataPayload = {};
  if (summary !== undefined) campaignDataPayload.summary = summary;
  if (classification !== undefined) campaignDataPayload.classification = classification;
  if (goals !== undefined) campaignDataPayload.goals = goals;
  if (messaging_inputs !== undefined) campaignDataPayload.messaging_inputs = messaging_inputs;
  if (step1Analysis !== undefined) campaignDataPayload.step1Analysis = step1Analysis;
  if (messagingGuide !== undefined) campaignDataPayload.messagingGuide = messagingGuide;
  if (name !== undefined) campaignDataPayload.name = name; // Include campaign name if provided

  // <<< 3. ADD/VERIFY userId FROM AUTHENTICATED USER >>>
  if (req.user && req.user.uid) {
    campaignDataPayload.userId = req.user.uid;
    console.log(`(INFO) [/api/save-campaign] Operation for campaignId: ${campaignId} by userId: ${req.user.uid}.`);
  } else {
    // This block should ideally not be reached if authMiddleware is correctly applied
    // and rejects unauthenticated requests.
    console.error(`(ERROR) [/api/save-campaign] Critical: No authenticated user (req.user.uid) found for campaignId: ${campaignId}. This indicates an issue with authentication middleware setup or an unauthenticated request reaching this point.`);
    return res.status(401).json({ error: 'User authentication is required to save a campaign. User ID is missing.' });
  }

  // Check if there's any actual campaign content data to save, besides potentially userId.
  // Create a temporary object for this check, excluding userId.
  const contentFieldsToCheck = { ...campaignDataPayload };
  delete contentFieldsToCheck.userId;

  if (Object.keys(contentFieldsToCheck).length === 0 && !isNewCampaign) {
    console.warn(`(WARN) [/api/save-campaign] No new content data fields provided to update for existing campaignId: ${campaignId} by userId: ${req.user.uid}. Proceeding to update timestamp and ensure userId consistency.`);
    // Even if no other fields changed, we proceed to ensure `updatedAt` is set and `userId` is affirmed.
  }

  try {
    console.log(`(INFO) [/api/save-campaign] Attempting to ${isNewCampaign ? 'create' : 'update'} campaign ID: ${campaignId}. Payload includes keys: ${Object.keys(campaignDataPayload).join(', ')}`);
    await storeCampaignInFirestore(campaignId, campaignDataPayload, isNewCampaign);
    
    return res.status(200).json({
      success: true,
      id: campaignId,
      message: `Campaign ${isNewCampaign ? 'created' : 'updated'} successfully.`
    });
  } catch (error) {
    console.error(`(ERROR) [/api/save-campaign] Error processing campaign ${campaignId}:`, error.message, error.stack);
    return res.status(500).json({ error: 'Failed to save campaign data.', details: error.message });
  }
});

export default router;
