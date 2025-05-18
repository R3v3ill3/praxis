// backend-node/api/save-campaign.js

import { getFirestore, Timestamp } from 'firebase-admin/firestore';

/**
 * Save a campaign object to Firestore under /campaigns/{campaignId}
 * @param {string} campaignId
 * @param {object} campaignData
 * @returns {Promise<object>} result
 */
export async function saveCampaign(campaignId, campaignData) {
  if (!campaignId || !campaignData) {
    throw new Error('Missing campaignId or campaignData');
  }

  const db = getFirestore();
  const campaignRef = db.collection('campaigns').doc(campaignId);

  const dataToSave = {
    ...campaignData,
    updatedAt: Timestamp.now(),
  };

  await campaignRef.set(dataToSave, { merge: true });

  return { success: true, id: campaignId };
}
