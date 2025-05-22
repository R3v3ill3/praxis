// frontend/src/pages/MessagingGuidePage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '../components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExternalLink, Download, Send, FileText } from 'lucide-react'; // Added Send for Action Plan
import { mockScenarios } from '../lib/mock-data';

// API function to fetch campaign data (remains as is for this update)
async function fetchCampaignDataById(campaignId, selectedMockScenarioKey) {
  console.log(`Attempting to fetch campaign data for ID: ${campaignId}`);
  if (selectedMockScenarioKey && mockScenarios && mockScenarios[selectedMockScenarioKey]) {
    console.warn(`Using PREDEFINED MOCK SCENARIO: '${selectedMockScenarioKey}' from mock-data.js.`);
    return { ...mockScenarios[selectedMockScenarioKey], id: campaignId };
  }
  const localStorageKey = `campaign-${campaignId}`;
  if (localStorage.getItem(localStorageKey)) {
    try {
      console.log(`Found campaign data in localStorage for key: ${localStorageKey}.`);
      return JSON.parse(localStorage.getItem(localStorageKey));
    } catch(e) {
      console.error(`Error parsing campaign data from localStorage for key ${localStorageKey}. Falling back. Error:`, e);
    }
  }
  console.warn(`No specific mock scenario requested via query param, and no data in localStorage for '${campaignId}'. Using DEFAULT hardcoded mock from mock-data.js.`);
  const defaultMock = mockScenarios && mockScenarios.defaultGigWorkers
                      ? mockScenarios.defaultGigWorkers
                      : { id: campaignId, summary: { purpose: "Default Mock Summary"}, classification: { primary_type: "Default Mock Type"}, goals: [], messaging_inputs: { issueName: 'Default Mock Issue' }};
  return { ...defaultMock, id: campaignId };
}

// API function to generate the messaging guide (remains as is)
async function generateMessagingGuideApi(campaignDetails) {
  console.log("LIVE API Call to /api/messaging-guide with details:", campaignDetails);
  const response = await fetch('/api/messaging-guide', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(campaignDetails),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Failed to generate messaging guide. Server returned non-JSON response.' }));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }
  return response.json(); // Expects { step1Analysis: "...", messagingGuide: "..." }
}

// NEW API function to save messaging outputs to Firestore via backend
async function saveMessagingOutputsToFirestore(campaignId, step1Analysis, messagingGuide) {
  console.log(`Attempting to save messaging outputs for campaign ID: ${campaignId}`);
  const response = await fetch('/api/save-campaign', { // Assuming this endpoint handles the update
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      campaignId, // Important: ensure your backend uses this to find the doc
      step1Analysis,
      messagingGuide,
      // Send other essential fields if your save-campaign endpoint requires them for validation,
      // or ensure it can handle partial updates with just these fields + campaignId.
      // For this example, we assume the backend can merge these fields using campaignId.
    }),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Failed to save messaging outputs. Server returned non-JSON response.' }));
    throw new Error(errorData.error || `HTTP error! status: ${response.status} while saving outputs.`);
  }
  return response.json(); // Expects a success response
}


export default function MessagingGuidePage() {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();

  const [campaignData, setCampaignData] = useState(null);
  const [step1Analysis, setStep1Analysis] = useState('');
  const [messagingGuide, setMessagingGuide] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false); // For save operation
  const [isGuideSaved, setIsGuideSaved] = useState(false); // To track if guide is saved
  const [error, setError] = useState(null);

  const loadDataAndGenerateGuide = useCallback(async () => {
    if (!campaignId) {
        setError("Campaign ID is missing from URL.");
        setIsLoading(false);
        if (toast) toast({ variant: "destructive", title: "Error", description: "No Campaign ID found." });
        if (navigate) navigate('/dashboard');
        return;
    }

    const queryParams = new URLSearchParams(location.search);
    const selectedMockKey = queryParams.get('mockScenario');

    console.log(`Attempting to load data and generate guide for campaign ID: ${campaignId}${selectedMockKey ? ` (Using Mock Scenario: ${selectedMockKey})` : ''}.`);
    setIsLoading(true);
    setIsGuideSaved(false); // Reset save status
    setError(null);
    setStep1Analysis('');
    setMessagingGuide('');
    setCampaignData(null);

    try {
      const fetchedData = await fetchCampaignDataById(campaignId, selectedMockKey);
      setCampaignData(fetchedData);
      console.log("Full campaign data fetched:", fetchedData);

      if (!fetchedData || !fetchedData.messaging_inputs) {
        throw new Error("Messaging inputs are missing from the fetched campaign data.");
      }
      const payloadForGuide = { ...fetchedData.messaging_inputs }; // Pass only messaging_inputs
      if (!payloadForGuide.issueName || !payloadForGuide.proposedChange || !payloadForGuide.primaryAudience) {
          throw new Error("Core data (issue, proposed change, primary audience) for generating the guide is missing.");
      }
      
      const guideResult = await generateMessagingGuideApi(payloadForGuide);

      let generatedStep1 = '';
      let generatedMessagingGuide = '';

      if (guideResult && guideResult.step1Analysis) {
        generatedStep1 = guideResult.step1Analysis;
        setStep1Analysis(generatedStep1);
      } else {
        console.warn("Step 1 analysis content is missing from API response.");
      }

      if (guideResult && guideResult.messagingGuide) {
        generatedMessagingGuide = guideResult.messagingGuide;
        setMessagingGuide(generatedMessagingGuide);
      } else {
        console.warn("Messaging guide (Step 2) content is missing from API response.");
      }
      
      if (generatedStep1 || generatedMessagingGuide) {
        toast({ title: "Success", description: "Messaging guide content generated!" });
        // Now, attempt to save the generated outputs
        setIsSaving(true);
        try {
          await saveMessagingOutputsToFirestore(campaignId, generatedStep1, generatedMessagingGuide);
          toast({ title: "Saved to DB", description: "Messaging outputs saved to campaign." });
          setIsGuideSaved(true); // Mark as saved
        } catch (saveError) {
          console.error("Error saving messaging outputs to Firestore:", saveError);
          toast({ variant: "destructive", title: "Save Failed", description: `Could not save outputs to DB: ${saveError.message}` });
          // Proceed even if saving fails, user can download.
        } finally {
          setIsSaving(false);
        }
      } else if (guideResult) {
        toast({ variant: "default", title: "Notice", description: "Guide generation complete, but no content was returned." });
      }

    } catch (err) {
      console.error("Error in MessagingGuidePage:", err);
      setError(err.message || "An unexpected error occurred.");
      if (toast) toast({ variant: "destructive", title: "Error", description: err.message });
    } finally {
      setIsLoading(false);
    }
  }, [campaignId, navigate, toast, location.search]);

  useEffect(() => {
    loadDataAndGenerateGuide();
  }, [loadDataAndGenerateGuide]);

  const handleDownload = () => {
    // ... (download logic remains the same)
    if (!step1Analysis && !messagingGuide) {
      if (toast) toast({
        variant: "destructive",
        title: "No content to download",
        description: "Please generate the guide first.",
      });
      return;
    }
    let fullContent = `CAMPAIGN MESSAGING GUIDE\n============================\n\n`;
    if (campaignData?.summary?.purpose) {
      fullContent += `Campaign: ${campaignData.summary.purpose}\n----------------------------\n\n`;
    }
    if (step1Analysis) {
      fullContent += `STEP 1: DEEP RESEARCH & ANALYSIS\n---------------------------------\n${step1Analysis}\n\n\n`;
    }
    if (messagingGuide) {
      fullContent += `STEP 2: SYNTHESIZED MESSAGING GUIDE\n------------------------------------\n${messagingGuide}\n`;
    }
    const blob = new Blob([fullContent], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    const campaignNameForFile = campaignData?.summary?.purpose?.replace(/[^a-z0-9_.-]/gi, '_').toLowerCase() || 'messaging_guide';
    link.download = `${campaignNameForFile}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
    if (toast) toast({ title: "Download Started", description: "Your guide is being downloaded." });
  };

  const handleDevelopActionPlan = () => {
    if (!campaignId) {
      toast({ variant: "destructive", title: "Error", description: "Campaign ID is missing." });
      return;
    }
    if (!messagingGuide && !step1Analysis) {
        toast({ variant: "default", title: "Wait", description: "Please generate messaging guide content first." });
        return;
    }
    // It's good if it's saved, but allow proceeding even if save failed, as user might want to try.
    // The action plan generator will use what's in DB. If save failed, it might use older data or defaults.
    navigate(`/app/campaign/${campaignId}/action-plan`);
  };


  if (isLoading) {
    return (
      <div className="container mx-auto p-6 text-center">
        <Card className="max-w-2xl mx-auto">
          <CardHeader><CardTitle>Loading & Generating Guide...</CardTitle></CardHeader>
          <CardContent><p>Please wait while we fetch campaign details and generate your messaging guide. This may take a moment.</p></CardContent>
        </Card>
      </div>
    );
  }

  if (error && !isLoading) { // Ensure error is shown only when not loading
    return (
      <div className="container mx-auto p-6">
        <Alert variant="destructive" className="max-w-2xl mx-auto">
          <ExternalLink className="h-4 w-4" />
          <AlertTitle>Error Encountered</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
          <div className="mt-4 space-x-2">
            <Button onClick={loadDataAndGenerateGuide} disabled={isLoading || isSaving}>Retry</Button>
            <Button variant="outline" onClick={() => navigate(`/app/campaign/${campaignId}/develop-messaging`)}>Edit Inputs</Button>
            <Button variant="outline" onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
          </div>
        </Alert>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-4 md:p-6 space-y-8">
      {campaignData?.summary?.purpose && (
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl">Campaign Context</CardTitle>
            <CardDescription>For campaign: {campaignData.summary.purpose}</CardDescription>
          </CardHeader>
        </Card>
      )}

      {step1Analysis && (
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl">Step 1: Deep Research & Analysis</CardTitle>
            <CardDescription>
              This is the foundational analysis performed by the AI based on your inputs.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg max-w-none whitespace-pre-wrap dark:prose-invert">
              {step1Analysis}
            </div>
          </CardContent>
        </Card>
      )}

      {messagingGuide && (
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl">Step 2: Synthesized Messaging Guide</CardTitle>
            <CardDescription>
              Based on the initial inputs and the deep analysis, here is the synthesized messaging guide.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg max-w-none whitespace-pre-wrap dark:prose-invert">
              {messagingGuide}
            </div>
          </CardContent>
        </Card>
      )}
      
      {!isLoading && !error && !step1Analysis && !messagingGuide && (
         <div className="container mx-auto p-6 text-center">
         <Card className="max-w-2xl mx-auto">
          <CardHeader><CardTitle>Messaging Guide</CardTitle></CardHeader>
          <CardContent>
            <p>No messaging guide content is available. This could be because the generation process didn't produce a guide, or there was an issue that resolved without producing content.</p>
            <div className="mt-4 space-x-2">
                <Button onClick={loadDataAndGenerateGuide} disabled={isLoading || isSaving}>
                    {isLoading ? 'Generating...' : (isSaving ? 'Saving...' : 'Try Generating Again')}
                </Button>
                <Button variant="outline" onClick={() => navigate(`/app/campaign/${campaignId}/develop-messaging`)}>
                    Go Back to Chat
                </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      )}

      <div className="mt-8 text-center space-x-4 flex flex-wrap justify-center items-center gap-2">
        {(step1Analysis || messagingGuide) && (
            <Button onClick={handleDownload} disabled={isSaving}>
                <Download className="mr-2 h-4 w-4" /> Download Guide
            </Button>
        )}
        {/* New Button for Action Plan */}
        {(step1Analysis || messagingGuide) && ( // Show if there's content, ideally also check isGuideSaved
            <Button 
                onClick={handleDevelopActionPlan} 
                disabled={isSaving} 
                variant="default" 
                className="bg-green-600 hover:bg-green-700 text-white"
            >
                <FileText className="mr-2 h-4 w-4" /> Develop Action Plan
            </Button>
        )}
        <Button onClick={() => navigate('/dashboard')} variant="outline" disabled={isSaving}>Back to Dashboard</Button>
      </div>
      {isSaving && <p className="text-center mt-2 text-sm text-gray-500">Saving messaging outputs to database...</p>}
    </div>
  );
}
