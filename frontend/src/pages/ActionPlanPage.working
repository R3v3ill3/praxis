// frontend/src/pages/ActionPlanPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCampaign } from '../contexts/CampaignContext'; // To get userId if needed
import { useToast } from '../components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from 'lucide-react'; // For loading spinner
import ReactMarkdown from 'react-markdown'; // To render Markdown content
import remarkGfm from 'remark-gfm'; // For GitHub Flavored Markdown (tables, etc.)

export default function ActionPlanPage() {
  const { campaignId } = useParams();
  const { userId } = useCampaign(); // Get userId from context if your backend needs it explicitly
  const navigate = useNavigate();
  const { toast } = useToast();

  const [actionPlan, setActionPlan] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateActionPlan = useCallback(async () => {
    if (!campaignId) {
      setError("Campaign ID is missing.");
      toast({ variant: "destructive", title: "Error", description: "No Campaign ID found." });
      return;
    }

    setIsLoading(true);
    setError(null);
    setActionPlan('');

    try {
      console.log(`[ActionPlanPage] Requesting action plan for campaignId: ${campaignId}`);
      const response = await fetch('/api/generate-action-plan', { // Ensure this matches your backend router setup
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Pass userId if your backend endpoint requires it in the body and can't get it from campaign doc
        body: JSON.stringify({ campaignId, userId }), 
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to generate action plan. Server returned non-JSON response.' }));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
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
  }, [campaignId, userId, toast]);

  // Automatically trigger generation when the page loads, or you can add a button.
  useEffect(() => {
    generateActionPlan();
  }, [generateActionPlan]);

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
                <Button onClick={generateActionPlan}>Retry Generation</Button>
                <Button variant="outline" onClick={() => navigate(`/app/campaign/${campaignId}/develop-messaging`)}>Back to Messaging</Button>
              </div>
            </Alert>
          )}

          {!isLoading && !error && actionPlan && (
            <div className="prose prose-lg max-w-none dark:prose-invert">
              {/* Using ReactMarkdown to render the plan which is expected in Markdown format */}
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {actionPlan}
              </ReactMarkdown>
            </div>
          )}
          
          {!isLoading && !error && !actionPlan && (
            <div className="text-center py-10">
                <p className="text-gray-500 mb-4">No action plan has been generated yet, or the generation process is pending.</p>
                <Button onClick={generateActionPlan} disabled={isLoading}>
                    {isLoading ? 'Generating...' : 'Generate Action Plan Now'}
                </Button>
            </div>
          )}
        </CardContent>
      </Card>
      <div className="max-w-4xl mx-auto text-center mt-4">
        <Button variant="outline" onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
      </div>
    </div>
  );
}
