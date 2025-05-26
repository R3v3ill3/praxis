// frontend/src/api/saveCampaignApi.js
import { getAuth, getIdToken } from 'firebase/auth'; // <<< 1. IMPORT FIREBASE AUTH FUNCTIONS

// Corrected to align with backend save-campaign.js which expects 'id' in the payload top-level
export async function saveCampaignProgress(currentCampaignId, data) {
  try {
    const auth = getAuth(); // <<< 2. GET AUTH INSTANCE
    const user = auth.currentUser; // <<< 3. GET CURRENT USER

    if (!user) { // <<< 4. CHECK IF USER IS LOGGED IN
      console.error("saveCampaignApi.js: User not logged in.");
      throw new Error("User not authenticated. Please log in.");
    }

    const token = await getIdToken(user); // <<< 5. GET THE ID TOKEN

    if (!token) { // <<< 6. CHECK IF TOKEN WAS RETRIEVED
        console.error("saveCampaignApi.js: Could not retrieve Firebase ID token.");
        throw new Error("Authentication token could not be retrieved.");
    }

    const payload = {
      ...data,
      campaignId: currentCampaignId,
    };

    console.log("saveCampaignApi.js: Sending payload to /api/save-campaign:", JSON.stringify(payload, null, 2));

    const response = await fetch('/api/save-campaign', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // <<< 7. ADD AUTHORIZATION HEADER
      },
      body: JSON.stringify(payload),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const errorMessage = responseData.error || `Failed to save campaign progress. Status: ${response.status}`;
      console.error("saveCampaignApi.js: API Error -", errorMessage, "Full response:", responseData);
      throw new Error(errorMessage);
    }
    
    console.log("saveCampaignApi.js: Save successful, responseData:", responseData);
    return responseData;
  } catch (e) {
    console.error("Error in saveCampaignProgress function:", e.message);
    throw e; 
  }
}
