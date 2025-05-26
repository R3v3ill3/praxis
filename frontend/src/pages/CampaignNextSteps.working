// frontend/src/pages/CampaignNextSteps.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCampaign } from '../contexts/CampaignContext'; // Ensure this path is correct
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card'; // Assuming shadcn/ui
import { Button } from '../components/ui/Button';

export default function CampaignNextStepsPage() { // Renamed component for clarity
  // Use the campaign context to get the latest campaign data
  // campaignId, summary, classification, goals should be populated from previous steps.
  const { campaignId, summary, classification, goals } = useCampaign();
  const navigate = useNavigate();

  console.log("CampaignNextStepsPage: Loaded. Context Data:", { campaignId, summary, classification, goals });

  if (!summary || !classification || !goals || !campaignId) {
    // This can happen if the user navigates here directly without completing previous steps
    // or if context state was somehow lost.
    console.error("CampaignNextStepsPage: Essential campaign data (summary, classification, goals, or campaignId) is missing from context.");
    return (
      <div className="p-6 max-w-3xl mx-auto text-center">
        <Card>
          <CardHeader>
            <CardTitle>Error: Campaign Data Missing</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              It looks like some essential campaign data is missing. Please ensure you've completed
              the initial campaign setup steps.
            </p>
            <Button onClick={() => navigate('/app/campaign/new')}>Start New Campaign</Button>
            {campaignId && <Button variant="outline" className="ml-2" onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>}
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleNavigate = (path) => {
    // You might want to pass the campaignId as a URL param or ensure the next pages
    // also pull it from context.
    navigate(path);
  };

  // Ensure goals are displayed correctly (they should be an array of objects)
  const displayGoals = goals.map(goal => goal.label || goal.id).join(', ');

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">Campaign Setup Complete!</CardTitle>
          <CardDescription>Your initial campaign details have been saved. What's next?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-1">Campaign ID:</h3>
            <p className="text-sm text-gray-700 bg-gray-100 p-2 rounded">{campaignId}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-1">Summary:</h3>
            <p className="text-sm text-gray-700"><strong>Purpose:</strong> {summary.purpose}</p>
            <p className="text-sm text-gray-700"><strong>Audience:</strong> {summary.audience}</p>
            <p className="text-sm text-gray-700"><strong>Target:</strong> {summary.target}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-1">Classification:</h3>
            <p className="text-sm text-gray-700"><strong>Type:</strong> {classification.primary_type} - {classification.secondary_type} ({classification.sub_type || classification.use_case})</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-1">Goals:</h3>
            <p className="text-sm text-gray-700">{displayGoals}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Choose Your Next Step</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button 
            onClick={() => handleNavigate('/app/campaign/develop-messaging')} // New route for step 1 of messaging
            className="w-full text-lg py-3"
            size="lg"
          >
            Develop Messaging
          </Button>
          <Button 
            onClick={() => handleNavigate('/app/campaign/develop-action-plan')} // Placeholder
            className="w-full text-lg py-3"
            variant="outline"
            size="lg"
            disabled 
          >
            Action Plan Development (Placeholder)
          </Button>
          <Button 
            onClick={() => handleNavigate('/app/campaign/build-audience')} // Placeholder
            className="w-full text-lg py-3"
            variant="outline"
            size="lg"
            disabled
          >
            Build Audience (Placeholder)
          </Button>
          <Button 
            onClick={() => handleNavigate('/app/campaign/generate-summary-doc')} // Placeholder
            className="w-full text-lg py-3"
            variant="outline"
            size="lg"
            disabled
          >
            Generate Summary Doc (Placeholder)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
