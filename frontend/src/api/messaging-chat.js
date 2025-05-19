// frontend/src/api/messaging-chat.js
/**
 * Sends a chat turn to the backend API.
 * @param {object} params - The parameters for the API call.
 * @param {string} params.campaignId - The ID of the current campaign.
 * @param {Array<object>} params.conversationHistory - The history of the conversation.
 * @param {object} params.knownInputs - The currently known inputs for the messaging guide.
 * @param {object} params.classification - The classification of the campaign.
 * @returns {Promise<object>} The JSON response from the backend.
 * @throws {Error} If the network response is not ok or if the API returns an error.
 */
export const sendMessagingChatTurn = async ({ campaignId, conversationHistory, knownInputs, classification }) => {
  const apiEndpoint = '/api/messaging-chat'; // Your backend endpoint

  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        campaignId,
        conversationHistory,
        knownInputs,
        classification,
      }),
    });

    if (!response.ok) {
      // Try to parse the error response body
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        // If parsing fails, use the status text
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      // Throw an error with more details from the backend if available
      throw new Error(errorData.error || errorData.message || `API request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error in sendMessagingChatTurn:', error);
    // Re-throw the error so it can be caught by the calling component
    // This allows for specific error handling (e.g., showing a toast notification)
    throw error;
  }
};
