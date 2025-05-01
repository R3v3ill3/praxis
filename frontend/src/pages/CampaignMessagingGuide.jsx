// frontend/src/pages/CampaignMessagingGuide.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCampaign } from '../context/CampaignContext'; // Import context hook
 import { useNavigate } from 'react-router-dom';

export default function CampaignMessagingGuide() {
  // const [guide, setGuide] = useState(''); // Replaced by context
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { campaignData, updateCampaignData } = useCampaign(); // Use context
  const navigate = useNavigate();

  useEffect(() => {
    // Check if summary exists in context
    if (!campaignData.summary) {
      setError('Campaign summary is missing. Please define the campaign first.');
      console.error("CampaignMessagingGuide: Missing summary in context.");
      setLoading(false);
       // navigate('/app/campaign/new'); // Optional redirect
      return;
    }

     // If guide already exists in context, don't refetch unless needed
    if (campaignData.messagingGuide) {
         console.log("CampaignMessagingGuide: Using existing guide from context.");
         setLoading(false);
         return;
    }

    console.log("CampaignMessagingGuide: Fetching guide with summary:", campaignData.summary);
    setLoading(true);
    setError('');

    // Pass only the summary object
    axios.post('/api/messaging-guide', campaignData.summary) // Send only summary
      .then((res) => {
         console.log("CampaignMessagingGuide: Received guide data:", res.data);
        updateCampaignData({ messagingGuide: res.data.messagingGuide }); // Update context
        setLoading(false);
      })
      .catch((err) => {
        console.error("CampaignMessagingGuide: Failed to generate messaging guide:", err);
        setError('Failed to generate messaging guide. ' + (err.response?.data?.error || err.message));
         updateCampaignData({ messagingGuide: { error: "Guide generation failed" } }); // Store error state
        setLoading(false);
      });

  }, [campaignData.summary, campaignData.messagingGuide, updateCampaignData, navigate]);


  const renderContent = () => {
    if (loading) return <p className="text-gray-500">Thinking… writing guide...</p>;
    if (error) return <p className="text-red-600">{error}</p>;
    if (campaignData.messagingGuide?.error) return <p className="text-red-600">Error: {campaignData.messagingGuide.error}</p>;
    if (campaignData.messagingGuide) return (
        <pre className="whitespace-pre-wrap bg-white shadow p-4 rounded text-sm">
            {campaignData.messagingGuide}
        </pre>
    );
    return <p className="text-gray-500">No messaging guide generated yet.</p>; // Fallback
  };

  return (
    <div className="p-6 space-y-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">🗣️ Messaging Guide</h1>

      {renderContent()}

       <div className="mt-6 flex space-x-4 border-t pt-4">
            <button
                onClick={() => navigate('/campaign/plan')}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
                Review Campaign Plan 🗺
            </button>
             <button
                onClick={() => navigate('/campaign/review')}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
            >
                Review & Save 🔬
            </button>
              <button
                 onClick={() => navigate('/app/campaign/new')} // Go back to builder
                 className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
             >
                Back to Builder
             </button>
        </div>
    </div>
  );
}
