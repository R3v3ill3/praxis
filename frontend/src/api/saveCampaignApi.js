// frontend/src/api/saveCampaignApi.js
// Corrected to align with backend save-campaign.js which expects 'id' in the payload top-level
export async function saveCampaignProgress(currentCampaignId, data) {
  try {
    const payload = {
      ...data, // This should contain summary, classification, goals from CampaignContext
      id: currentCampaignId, // Send the currentCampaignId as 'id' in the payload.
                            // Backend will use this 'id' or generate one if it's null/undefined.
    };

    console.log("saveCampaignApi.js: Sending payload to /api/save-campaign:", JSON.stringify(payload, null, 2));

    const response = await fetch('/api/save-campaign', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const responseData = await response.json(); // Try to parse JSON regardless of status

    if (!response.ok) {
      const errorMessage = responseData.error || `Failed to save campaign progress. Status: ${response.status}`;
      console.error("saveCampaignApi.js: API Error -", errorMessage, "Full response:", responseData);
      throw new Error(errorMessage);
    }
    
    console.log("saveCampaignApi.js: Save successful, responseData:", responseData);
    return responseData; // Expected: { success: true, id: campaignId }
  } catch (e) {
    console.error("Error in saveCampaignProgress function:", e.message);
    throw e; 
  }
}
