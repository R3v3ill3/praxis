import React from 'react';
import { useCampaign } from '../contexts/CampaignContext'; // Or load specific campaign
import { Link } from 'react-router-dom';

export default function ContentGenerator() {
    // In a real scenario, you might load a specific campaign ID
    // or pass selected plan actions here.
    const { campaignData } = useCampaign();

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Generate Campaign Content</h1>
             <p className="mb-4">Select an action from your plan and generate content.</p>
            {/* TODO: Add UI to select actions from campaignData.plan */}
            {/* TODO: Add UI to trigger API call to backend content generator */}
             <pre className="bg-gray-100 p-2 rounded text-xs mb-4">
                Plan Data (for reference): {JSON.stringify(campaignData.plan, null, 2)}
             </pre>
             <p className="text-gray-500 italic">Content generation UI and API integration needed here.</p>
             <Link to="/dashboard" className="text-blue-600 underline mt-4 block">Back to Dashboard</Link>
        </div>
    );
}
