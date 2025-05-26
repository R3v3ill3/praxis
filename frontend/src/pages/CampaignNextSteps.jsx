// frontend/src/pages/CampaignNextSteps.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCampaign } from '../contexts/CampaignContext'; // Ensure this path is correct
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card'; // Assuming shadcn/ui
import { Button } from '../components/ui/Button';
import { useToast } from '../components/ui/use-toast'; // For download feedback
import { Download, Loader2 } from 'lucide-react'; // For icons

export default function CampaignNextStepsPage() {
  // Use the campaign context to get the latest campaign data
  const { campaignId, summary, classification, goals, messagingGuide, step1Analysis } = useCampaign();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isDownloading, setIsDownloading] = useState(false);

  console.log("CampaignNextStepsPage: Loaded. Context Data:", { campaignId, summary, classification, goals, messagingGuide, step1Analysis });

  if (!summary || !classification || !goals || !campaignId) {
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
    navigate(path);
  };

  const handleDownloadCampaignData = async () => {
    if (!campaignId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Campaign ID is missing for export.",
      });
      return;
    }

    setIsDownloading(true);
    try {
      const response = await fetch(`/api/campaigns/${campaignId}/export`); // Calls export-campaign.js
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Failed to fetch campaign data for export." }));
        throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
      }
      const campaignExportData = await response.json();

      const jsonString = JSON.stringify(campaignExportData, null, 2);
      const blob = new Blob([jsonString], { type: "application/json" });
      const href = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = href;
      link.download = `campaign-data-${campaignId}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(href);

      toast({
        title: "Download Started",
        description: "Full campaign data export is downloading.",
      });

    } catch (error) {
      console.error("[CampaignNextStepsPage] Error downloading campaign data:", error);
      toast({
        variant: "destructive",
        title: "Download Failed",
        description: error.message || "Could not download campaign data.",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const displayGoals = goals.map(goal => goal.label || goal.id).join(', ');
  const canDevelopActionPlan = !!messagingGuide && !!step1Analysis; // Check if messaging data is present

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
            <p className="text-sm text-gray-700"><strong>Type:</strong> {classification.primary_type} - {classification.secondary_type} ({classification.sub_type || classification.use_case || classification.id})</p>
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
            onClick={() => handleNavigate(`/app/campaign/${campaignId}/messaging-guide`)} // Navigate to messaging guide generation
            className="w-full text-lg py-3"
            size="lg"
            // Consider if this should also be disabled if already generated, or allow re-generation.
            // For now, always enabled.
          >
            Develop/View Messaging Guide
          </Button>
          <Button
            onClick={() => handleNavigate(`/app/campaign/${campaignId}/action-plan`)} // Links to ActionPlanPage
            className="w-full text-lg py-3"
            variant={canDevelopActionPlan ? "default" : "outline"}
            size="lg"
            disabled={!canDevelopActionPlan || isDownloading}
            title={!canDevelopActionPlan ? "Complete 'Develop Messaging' step first" : "Develop Digital Action Plan"}
          >
            Develop Action Plan
          </Button>
          <Button
            onClick={handleDownloadCampaignData}
            className="w-full text-lg py-3 bg-green-600 hover:bg-green-700 text-white"
            size="lg"
            disabled={isDownloading || !campaignId} // Ensure campaignId exists
          >
            {isDownloading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Download className="mr-2 h-5 w-5" />}
            Download Campaign Data
          </Button>
          <Button
            onClick={() => handleNavigate('/app/campaign/build-audience')} // Placeholder
            className="w-full text-lg py-3"
            variant="outline"
            size="lg"
            disabled // Remains placeholder
          >
            Build Audience (Placeholder)
          </Button>
        </CardContent>
      </Card>
       <div className="text-center mt-4">
         <Button variant="outline" onClick={() => navigate('/dashboard')} disabled={isDownloading}>
           Back to Dashboard
         </Button>
       </div>
    </div>
  );
}
