// frontend/src/pages/CampaignReviewSave.jsx
import React, { useState } from 'react';
import { useCampaign } from '../context/CampaignContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CampaignReviewSave() {
    const { campaignData, updateCampaignData } = useCampaign();
    const { getIdToken, currentUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [campaignName, setCampaignName] = useState(campaignData.name || ''); // Local state for name input
    const navigate = useNavigate();

    const handleSave = async () => {
        if (!currentUser) {
            setError('You must be logged in to save.');
            return;
        }
         if (!campaignName.trim()) {
            setError('Please provide a name for your campaign.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const token = await getIdToken();
            if (!token) {
                setError('Authentication error. Please log in again.');
                setLoading(false);
                return;
            }

            // Prepare data to save, including the name
            const dataToSave = {
                ...campaignData,
                name: campaignName.trim(), // Add name from local state
            };
             // Optionally remove temporary error states before saving
             if (dataToSave.plan?.error) dataToSave.plan = null;
             if (dataToSave.messagingGuide?.error) dataToSave.messagingGuide = null;
             if (dataToSave.classification?.error) dataToSave.classification = null;


            console.log("🚀 Saving campaign data:", dataToSave);

            // Assuming your backend expects the full campaign object
            const response = await axios.post('/api/campaigns/create', dataToSave, {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log('✅ Campaign saved successfully:', response.data);
            // Optional: Clear context after saving? Or rely on dashboard fetch.
            // resetCampaignData();
            navigate('/dashboard'); // Navigate to dashboard after save

        } catch (err) {
            console.error('❌ Error saving campaign:', err);
            setError('Failed to save campaign. ' + (err.response?.data?.error || err.message));
        } finally {
            setLoading(false);
        }
    };

    // Helper to render potentially complex objects/strings nicely
    const renderSection = (title, data) => {
        let content = 'Not generated yet.';
        if (data?.error) {
            content = <span className="text-red-500">Error: {data.error}</span>;
        } else if (data) {
             content = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
        }

        return (
             <div className="mb-4 p-4 border rounded shadow-sm bg-white">
                <h3 className="text-lg font-semibold mb-2 border-b pb-1">{title}</h3>
                 <pre className="whitespace-pre-wrap text-sm">{content}</pre>
            </div>
        );
    };

     const renderClassification = (data) => {
          let content = 'Not classified.';
          if (data?.error) {
              content = <span className="text-red-500">Error: {data.error}</span>;
          } else if (data?.type) {
               content = `Type: ${data.type}\nDescription: ${data.description}\nSuggested Actions: ${data.suggested_actions || 'None'}`;
          } else if (data === null && campaignData.summary) { // Explicitly checked if null (meaning classification ran but found no match)
              content = 'No specific type matched based on summary.'
          }

          return (
             <div className="mb-4 p-4 border rounded shadow-sm bg-white">
                <h3 className="text-lg font-semibold mb-2 border-b pb-1">Classification</h3>
                 <pre className="whitespace-pre-wrap text-sm">{content}</pre>
            </div>
        );
     }


    return (
        <div className="p-6 max-w-4xl mx-auto space-y-4">
            <h1 className="text-3xl font-bold">🔬 Review & Save Campaign</h1>

            <div className="mb-4">
                <label htmlFor="campaignName" className="block text-sm font-medium text-gray-700 mb-1">
                    Campaign Name
                </label>
                <input
                    type="text"
                    id="campaignName"
                    value={campaignName}
                    onChange={(e) => {
                        setCampaignName(e.target.value);
                        // Optionally update context immediately if desired
                        // updateCampaignData({ name: e.target.value });
                    }}
                    placeholder="Enter a name for this campaign"
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            {renderSection("Campaign Summary", campaignData.summary)}
            {renderClassification(campaignData.classification)}
            {renderSection("Campaign Plan", campaignData.plan)}
            {renderSection("Messaging Guide", campaignData.messagingGuide)}


            {error && <p className="text-red-600 mt-2">{error}</p>}

            <div className="mt-6 flex space-x-4 border-t pt-4">
                 <button
                    onClick={handleSave}
                    disabled={loading || !campaignName.trim()}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded disabled:opacity-50"
                >
                    {loading ? 'Saving...' : 'Save Campaign'}
                </button>
                  <button
                     onClick={() => navigate('/campaign/plan')} // Or back to builder?
                     className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
                 >
                    Back to Plan
                 </button>
            </div>
        </div>
    );
}
