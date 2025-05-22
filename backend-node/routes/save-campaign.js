// backend-node/routes/save-campaign.js
import express from 'express';
import { db } from '../firebase.js'; // Ensure this path is correct for your Firebase admin init
import { Timestamp } from 'firebase-admin/firestore';

const router = express.Router();

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
  // campaignId is now guaranteed to be a non-empty string by the route handler.

  const docRef = db.collection('campaigns').doc(campaignId);

  const dataToSave = {
    ...campaignData, // Spread the incoming data
    updatedAt: Timestamp.now(),
  };

  if (isNewCampaign) {
    dataToSave.createdAt = Timestamp.now(); // Add createdAt timestamp for new campaigns
  }

  // Use merge: true to update existing fields or create the document if it doesn't exist with all fields.
  // If isNewCampaign is true, it's effectively a create.
  // If isNewCampaign is false, it's an update (merge will update existing fields and add new ones).
  await docRef.set(dataToSave, { merge: true });
  console.log(`(INFO) [/api/save-campaign] Campaign data for ID: ${campaignId} ${isNewCampaign ? 'created' : 'merged'} successfully.`);
  return { success: true, id: campaignId }; // Return the campaignId used
}

// Route to handle saving (creating new or updating existing) campaign progress
router.post('/', async (req, res) => {
  console.log("(INFO) [/api/save-campaign] Endpoint hit. Body:", req.body);
  
  let { // Use 'let' because campaignId might be (re)assigned
    campaignId, 
    summary, 
    classification, 
    goals, 
    messaging_inputs,
    step1Analysis,
    messagingGuide
    // Add any other top-level fields you expect in the campaign document
  } = req.body;

  let isNewCampaign = false;

  // If campaignId is not provided (falsy: null, undefined, empty string),
  // it's a new campaign, so generate an ID.
  if (!campaignId) {
    campaignId = db.collection('campaigns').doc().id; // Generate a new unique ID
    isNewCampaign = true;
    console.log(`(INFO) [/api/save-campaign] No campaignId from client. Generated new ID: ${campaignId}`);
  }

  // Construct the payload with only the fields that are present in the request.
  const campaignDataPayload = {};
  if (summary !== undefined) campaignDataPayload.summary = summary;
  if (classification !== undefined) campaignDataPayload.classification = classification;
  if (goals !== undefined) campaignDataPayload.goals = goals; // Assuming goals is an array or object
  if (messaging_inputs !== undefined) campaignDataPayload.messaging_inputs = messaging_inputs;
  if (step1Analysis !== undefined) campaignDataPayload.step1Analysis = step1Analysis;
  if (messagingGuide !== undefined) campaignDataPayload.messagingGuide = messagingGuide;
  
  // Add userId if available in request (e.g. from auth middleware if you implement it)
  // This is an example, adapt if you have user auth
  // if (req.user && req.user.uid) {
  //   campaignDataPayload.userId = req.user.uid;
  //   if (isNewCampaign) { // Only add createdByUserId if it's a new campaign and you have a user
  //     campaignDataPayload.createdByUserId = req.user.uid;
  //   }
  // }

  // It's okay to create a new campaign with minimal data (e.g., just an ID and timestamps).
  // But for updates, we might expect some data.
  if (Object.keys(campaignDataPayload).length === 0 && !isNewCampaign) {
    console.warn(`(WARN) [/api/save-campaign] No actual data fields provided to update for existing campaignId: ${campaignId}. Sending success as nothing to change.`);
    // Depending on desired behavior, you could return success or a specific notice.
    // For now, let's assume an update with no changed fields is still a "success" in terms of the operation completing.
    // Or, you could return a 204 No Content or a 400 if you require data for updates.
    // Let's return success with the ID.
    return res.status(200).json({ 
        success: true, 
        id: campaignId, 
        message: `No data fields provided to update for campaign ${campaignId}. Operation successful.` 
    });
  }

  try {
    console.log(`(INFO) [/api/save-campaign] Attempting to ${isNewCampaign ? 'create' : 'update'} campaign ID: ${campaignId} with payload fields:`, Object.keys(campaignDataPayload));
    // Pass campaignId (which is now guaranteed to be a string) and isNewCampaign flag
    const result = await storeCampaignInFirestore(campaignId, campaignDataPayload, isNewCampaign);
    
    // Ensure the response to the client includes the campaignId, especially the newly generated one
    return res.status(200).json({
      success: true,
      id: campaignId, // Send back the ID (new or existing)
      message: `Campaign ${isNewCampaign ? 'created' : 'updated'} successfully.`
    });
  } catch (error) {
    console.error(`(ERROR) [/api/save-campaign] Error processing campaign ${campaignId}:`, error.message, error.stack);
    return res.status(500).json({ error: 'Failed to save campaign data.', details: error.message });
  }
});

export default router;
