// frontend/src/api/classify.js (Enhanced Version)

export async function classifyCampaign(summaryData) {
  console.log("classifyCampaign API call: Sending summary data:", summaryData);
  try {
    const response = await fetch('/api/classify-campaign-type', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // Backend expects the summary object nested under a 'summary' key
      body: JSON.stringify({ summary: summaryData }),
    });

    console.log("classifyCampaign API call: Response Status:", response.status);

    // Try parsing the JSON body regardless of status for potential error messages
    const data = await response.json().catch(e => {
        console.error("classifyCampaign API call: Failed to parse JSON response body", e)
        // If JSON parsing fails AND status is not ok, throw generic error
        if (!response.ok) {
             throw new Error(`Classifier API request failed with status ${response.status} and non-JSON response.`);
        }
        // If JSON parsing fails but status IS ok, something strange happened
        return { message: "Received OK status but failed to parse response body." };
    });


    if (!response.ok) {
      console.error("classifyCampaign API call: API Error Response Data:", data);
      // Use message from parsed error data if available
      throw new Error(data?.message || `Classifier API request failed with status ${response.status}`);
    }

    console.log("classifyCampaign API call: API Response Data:", data);

    // Check if the backend returned a valid match object
    if (data && data.match) {
       return data; // Return just the classification details object
    } else {
       // Handle cases where classification wasn't successful (match: null) but API call was okay
       console.warn("classifyCampaign API call: Classification returned no match. Message:", data?.message);
       // Throw an error to signal failure to classify - CampaignBuilder can catch this
       throw new Error(data?.message || "Campaign could not be classified.");
    }
  } catch (error) {
    console.error('❌ Error in classifyCampaign API call:', error);
    // Re-throw the error so the calling function (in CampaignBuilder) can handle it
    // This allows displaying specific error messages to the user via toast/state
    throw error;
  }
}
