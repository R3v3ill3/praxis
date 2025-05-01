// frontend/src/pages/CampaignPlan.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCampaign } from '../context/CampaignContext'; // Import context hook
import { useNavigate } from 'react-router-dom';


export default function CampaignPlan() {
  // const [plan, setPlan] = useState(''); // Replaced by context
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { campaignData, updateCampaignData } = useCampaign(); // Use context
  const navigate = useNavigate();

  useEffect(() => {
    // Check if summary exists in context
    if (!campaignData.summary) {
      setError('Campaign summary is missing. Please define the campaign first.');
      console.error("CampaignPlan: Missing summary in context.");
      setLoading(false);
      // Optional: Redirect back to builder if summary is missing
      // navigate('/app/campaign/new');
      return;
    }

    // If plan already exists in context, don't refetch unless needed
    if (campaignData.plan) {
         console.log("CampaignPlan: Using existing plan from context.");
         setLoading(false);
         return;
    }


    console.log("CampaignPlan: Fetching plan with summary:", campaignData.summary);
    setLoading(true);
    setError('');

    // Pass only the summary object, not the entire campaignData
    axios.post('/api/campaign-plan', campaignData.summary) // Send only summary
      .then((res) => {
         console.log("CampaignPlan: Received plan data:", res.data);
         updateCampaignData({ plan: res.data.plan }); // Update context
        setLoading(false);
      })
      .catch((err) => {
        console.error("CampaignPlan: Failed to generate campaign plan:", err);
        setError('Failed to generate campaign plan. ' + (err.response?.data?.error || err.message));
        updateCampaignData({ plan: { error: "Plan generation failed" } }); // Store error state
        setLoading(false);
      });

  // Rerun effect if the summary changes (e.g., user goes back and modifies)
  // Note: This might cause refetching if summary object reference changes without content change.
  // Could potentially stringify summary for dependency array if needed, but object ref is usually fine.
  }, [campaignData.summary, campaignData.plan, updateCampaignData, navigate]);


  const renderContent = () => {
      if (loading) return <p className="text-gray-500">Thinking… generating plan...</p>;
      if (error) return <p className="text-red-600">{error}</p>;
      if (campaignData.plan?.error) return <p className="text-red-600">Error: {campaignData.plan.error}</p>;
      if (campaignData.plan) return (
         <pre className="whitespace-pre-wrap bg-white shadow p-4 rounded text-sm">
            {campaignData.plan}
         </pre>
      );
       return <p className="text-gray-500">No plan generated yet.</p>; // Fallback
  };

  return (
    <div className="p-6 space-y-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">📋 Campaign Action Plan</h1>

      {renderContent()}

       <div className="mt-6 flex space-x-4 border-t pt-4">
            <button
                onClick={() => navigate('/campaign/message')}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
            >
               Next: Write Messaging Guide ✍️
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
