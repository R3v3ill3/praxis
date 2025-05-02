// frontend/src/pages/CampaignBuilder.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCampaign } from '../context/CampaignContext'; // Import context hook

export default function CampaignBuilder() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  // const [summary, setSummary] = useState(null); // Replaced by context
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [forceDone, setForceDone] = useState(false); // Keep local state for force done

  const navigate = useNavigate();
  const { campaignData, updateCampaignData, resetCampaignData } = useCampaign(); // Use context

  // Reset local state and context if starting fresh
  useEffect(() => {
      // --- DEBUG LOG ---
      console.log("[CampaignBuilder useEffect] Running effect, resetting campaign data.");
      // --- END DEBUG LOG ---
      resetCampaignData(); // Clear any previous campaign data on mount
      // Add any other initial message logic if needed
       setHistory([{ role: 'assistant', content: "What kind of campaign are you working on? Tell me what’s going on at your workplace or in your community." }]);
  }, []); // Use empty dependency array to run only once on mount


  const handleSendMessage = async () => {
    // --- DEBUG LOG ---
    console.log("[handleSendMessage] Function called. Input:", input);
    // --- END DEBUG LOG ---

    if (!input.trim()) return;
       console.log("[handleSendMessage] Input is empty, exiting.");
    const userMessage = { role: 'user', content: input };
    const newHistory = [...history, userMessage];
    setHistory(newHistory); // Update local history for display
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/campaign-assistant', {
        // Send only necessary history for the API call, not including the initial prompt if managed locally
        history: newHistory.filter(msg => msg.role !== 'system'), // Exclude system messages if any
        input: input, // Send current input separately if API expects it
      });

      const { aiMessage, done, ...structuredData } = response.data;
      const assistantMessage = { role: 'assistant', content: aiMessage };
      setHistory((prev) => [...prev, assistantMessage]); // Update local history with AI response

      // Check if the conversation is marked as done or forced done
      if (done || forceDone) {
         console.log('✅ Assistant conversation ended. Data:', response.data);
        let finalSummary;
        if (structuredData.purpose || structuredData.goals) {
          // We have structured data
          finalSummary = { ...structuredData, structured: true };
          console.log('✅ Final summary captured (structured):', finalSummary);
        } else {
          // Fallback to using the last AI message as summary
          finalSummary = { message: aiMessage, structured: false };
          console.log('✅ Final summary captured (unstructured):', finalSummary);
        }

        // --- Update Context ---
        updateCampaignData({ summary: finalSummary });

        // --- Call Classification API ---
         if (finalSummary) { // Only classify if we have a summary
            setLoading(true); // Show loading for classification
            setError(null);
            try {
                console.log("🚀 Calling classification API with summary:", finalSummary);
                const classificationRes = await axios.post('/api/classify-campaign-type', { summary: finalSummary });
                console.log('✅ Classification Result:', classificationRes.data);
                updateCampaignData({ classification: classificationRes.data.match || null }); // Update context with classification result
            } catch (classifyErr) {
                console.error("❌ Error calling classification API:", classifyErr);
                setError("Failed to classify campaign type.");
                updateCampaignData({ classification: { error: "Classification failed" } }); // Store error in context?
            } finally {
                 // setLoading(false); // Handled below
            }
        }
      }
    } catch (err) {
      console.error('❌ Error communicating with assistant:', err);
      setError('Failed to communicate with the assistant.');
    } finally {
      setLoading(false);
      setForceDone(false); // Reset force done after attempting send
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Determine if ready for next steps (summary and classification received)
   const isReadyForNextSteps = campaignData.summary && campaignData.classification !== null; // Check classification is attempted (null initially)


  const renderHistory = () => (
    <div className="space-y-4 max-h-[50vh] overflow-y-auto border rounded p-4 mb-4 bg-gray-50">
      {history.map((msg, index) => (
        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-3 rounded-lg max-w-[80%] ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
            {/* Optional: Add role indicator */}
            {/* <strong>{msg.role === 'user' ? 'You' : 'Assistant'}: </strong> */}
             <div className="whitespace-pre-wrap">{msg.content}</div>
            </div>
        </div>

      ))}
       {loading && <div className="text-center text-gray-500">Assistant is thinking...</div>}
    </div>
  );

  const renderNextSteps = () => (
    <div className="mt-6 p-4 border-t">
      <h3 className="text-lg font-semibold mb-2">Campaign Defined! Next Steps:</h3>
       {campaignData.classification?.type && (
           <p className="mb-2 text-sm text-green-700">
               Classified as: <strong>{campaignData.classification.type}</strong> ({campaignData.classification.description})
           </p>
       )}
        {campaignData.classification?.error && (
           <p className="mb-2 text-sm text-red-700">
               Classification failed. Proceeding without classification.
           </p>
       )}
        {!campaignData.classification && !loading &&(
             <p className="mb-2 text-sm text-yellow-700">
               Classification pending or unavailable.
           </p>
        )}

      <div className="flex space-x-4">
          <button
            onClick={() => navigate('/campaign/plan')} // Navigate to plan page
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50"
             disabled={loading} // Disable while loading anything
          >
            🗺 Build Campaign Plan
          </button>
           <button
            onClick={() => navigate('/campaign/message')} // Navigate to messaging page
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded disabled:opacity-50"
             disabled={loading}
          >
            ✍️ Write Messaging Guide
          </button>
           <button
            onClick={() => navigate('/campaign/review')} // Navigate to review page
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50"
             disabled={loading}
          >
            🔬 Review & Save
          </button>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Campaign Design Assistant</h1>

       {renderHistory()}

      {/* Only show input area if campaign summary is not yet finalized */}
      {!campaignData.summary && (
        <>
          <textarea
            className="w-full p-3 border rounded mb-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={3}
            disabled={loading}
          />
          <div className="flex space-x-2">
            <button
              onClick={handleSendMessage}
              disabled={loading || !input.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {loading ? 'Thinking…' : 'Send'}
            </button>
            {/* Keep Force Done if needed, ensure it triggers handleSendMessage */}
             <button
                onClick={() => { setForceDone(true); handleSendMessage(); }}
                disabled={loading}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded disabled:opacity-50"
                title="Force the assistant to provide a summary now"
            >
                Force Summary
            </button>
          </div>
        </>
      )}

      {error && <p className="text-red-600 mt-2">{error}</p>}

      {/* Show next steps once summary is available and classification is attempted */}
      {isReadyForNextSteps && renderNextSteps()}
    </div>
  );
}
