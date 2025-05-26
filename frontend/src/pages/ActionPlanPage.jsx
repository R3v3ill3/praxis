// frontend/src/pages/ActionPlanPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCampaign } from '../contexts/CampaignContext';
import { useToast } from '../components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Download } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useAuth } from '../contexts/AuthContext'; // <<< 1. IMPORT useAuth

export default function ActionPlanPage() {
  const { campaignId } = useParams();
  // const { userId } = useCampaign(); // userId from campaign context might be different from auth user
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user: authUser } = useAuth(); // <<< 2. GET AUTHENTICATED USER

  const [actionPlan, setActionPlan] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState(null);

  const generateActionPlan = useCallback(async () => {
    if (!campaignId) {
      setError("Campaign ID is missing.");
      toast({ variant: "destructive", title: "Error", description: "No Campaign ID found." });
      return;
    }
    if (!authUser) { // <<< CHECK IF AUTH USER EXISTS
      setError("User not authenticated. Please log in.");
      toast({ variant: "destructive", title: "Authentication Error", description: "User not authenticated." });
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const token = await authUser.getIdToken(); // <<< GET TOKEN FOR API CALL

      console.log(`[ActionPlanPage] Requesting action plan for campaignId: ${campaignId}`);
      const response = await fetch('/api/generate-action-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // <<< ADD TOKEN TO HEADER
        },
        // Pass campaignId. userId from authUser.uid can be used if backend expects it for auth/ownership.
        // The backend action-plan-generator.js uses campaignData.userId OR req.body.userId.
        // If you want to use the authenticated user's ID for ownership checks in the backend,
        // ensure your backend logic for generate-action-plan expects it or can derive it.
        body: JSON.stringify({ campaignId, userId: authUser.uid }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to generate action plan. Server returned non-JSON response.' }));
        let errorMessage = errorData.error || `HTTP error! status: ${response.status}`;
        if (response.status === 401) {
            errorMessage = "Unauthorized to generate action plan. Please check your permissions or session."
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      if (result.actionPlan) {
        setActionPlan(result.actionPlan);
        toast({ title: "Success", description: "Action plan generated!" });
      } else {
        throw new Error("No action plan content received from the server.");
      }
    } catch (err) {
      console.error("[ActionPlanPage] Error generating action plan:", err);
      setError(err.message || "An unexpected error occurred while generating the plan.");
      toast({ variant: "destructive", title: "Generation Failed", description: err.message });
    } finally {
      setIsLoading(false);
    }
  }, [campaignId, authUser, toast]); // <<< ADD authUser to dependencies

  useEffect(() => {
    if (!actionPlan && campaignId && authUser) { // Ensure authUser is available before generating
        generateActionPlan();
    } else if (!authUser && !isLoading) {
        toast({ variant: "destructive", title: "Authentication Required", description: "Please log in to generate an action plan."});
    }
  }, [generateActionPlan, actionPlan, campaignId, authUser, isLoading]);


  const handleDownloadForReportGenerator = async () => {
    if (!campaignId) {
      toast({ variant: "destructive", title: "Error", description: "Campaign ID is missing for export." });
      return;
    }
    if (!actionPlan) {
      toast({ variant: "destructive", title: "No Action Plan", description: "Please generate the action plan before downloading." });
      return;
    }
    if (!authUser) { // <<< CHECK IF AUTH USER EXISTS
      toast({ variant: "destructive", title: "Authentication Error", description: "User not authenticated. Please log in to download." });
      return;
    }

    setIsDownloading(true);
    try {
      const token = await authUser.getIdToken(); // <<< 3. GET THE TOKEN

      // This is line 94 from your error trace for the fetch call
      const response = await fetch(`/api/campaigns/${campaignId}/export`, {
        headers: {
          'Authorization': `Bearer ${token}` // <<< 4. ADD THE Authorization HEADER
        }
      });

      // This is line 97 from your error trace where the error is thrown
      if (!response.ok) {
        let errorMessage = `HTTP error! Status: ${response.status}`;
        try {
            const errorData = await response.json();
            errorMessage = errorData.error || (errorData.message || errorMessage);
        } catch (e) {
            // response was not JSON
            const textError = await response.text();
            errorMessage = textError || errorMessage;
        }
        if (response.status === 401) {
            errorMessage = "Unauthorized: Invalid or missing token. Please ensure you are logged in."
        }
        throw new Error(errorMessage);
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
        description: "Campaign data for the report generator is downloading.",
      });

    } catch (error) {
      // This is line 118 from your error trace
      console.error("[ActionPlanPage] Error downloading data for report generator:", error);
      toast({
        variant: "destructive",
        title: "Download Failed",
        description: error.message || "Could not download campaign data.",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">Campaign Action Plan</CardTitle>
          <CardDescription>
            {`Generated 6-week digital action plan for campaign ID: ${campaignId || 'N/A'}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-10">
              <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
              <p className="text-lg text-gray-600">Generating your action plan... This may take a moment.</p>
            </div>
          )}

          {error && !isLoading && (
            <Alert variant="destructive">
              <AlertTitle>Error Generating Plan</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
              <div className="mt-4 space-x-2">
                <Button onClick={generateActionPlan} disabled={isLoading || !authUser}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Retry Generation
                </Button>
                <Button variant="outline" onClick={() => navigate(`/app/campaign/${campaignId}/messaging-guide`)}>Back to Messaging Guide</Button>
              </div>
            </Alert>
          )}

          {!isLoading && !error && actionPlan && (
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {actionPlan}
              </ReactMarkdown>
            </div>
          )}

          {!isLoading && !error && !actionPlan && (
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">
                {authUser ? "No action plan has been generated yet." : "Please log in to generate an action plan."}
              </p>
              <Button onClick={generateActionPlan} disabled={isLoading || !authUser}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Generate Action Plan Now
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="max-w-4xl mx-auto text-center mt-4 flex flex-wrap justify-center gap-2">
        <Button
          variant="outline"
          onClick={() => navigate('/dashboard')}
          disabled={isDownloading}
        >
            Back to Dashboard
        </Button>
        <Button
          variant="outline"
          onClick={() => navigate('/app/campaign/next-steps-summary')}
          disabled={isDownloading}
        >
            Back to Campaign Steps
        </Button>

        {actionPlan && !isLoading && !error && authUser && ( // Only show if plan exists and user is authenticated
          <Button
            onClick={handleDownloadForReportGenerator}
            disabled={isDownloading}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {isDownloading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
            Download Data for Report Generator
          </Button>
        )}
      </div>
    </div>
  );
}
