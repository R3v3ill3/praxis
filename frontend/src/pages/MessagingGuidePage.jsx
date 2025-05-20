// frontend/src/pages/MessagingGuidePage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '../components/ui/use-toast'; // Assuming path is correct
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card'; // Assuming path is correct
import { Button } from '../components/ui/Button'; // Assuming path is correct
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // Assuming path is correct
import { ExternalLink, Download } from 'lucide-react';
import { mockScenarios } from '../lib/mock-data'; // Assuming path is correct

// API function to fetch campaign data
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

// API function to generate the messaging guide
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

export default function MessagingGuidePage() {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();

  const [campaignData, setCampaignData] = useState(null);
  const [step1Analysis, setStep1Analysis] = useState('');
  const [messagingGuide, setMessagingGuide] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadDataAndGenerateGuide = useCallback(async () => {
    if (!campaignId) {
        setError("Campaign ID is missing from URL.");
        setIsLoading(false);
        if (toast) toast({ variant: "destructive", title: "Error", description: "No Campaign ID found." });
        if (navigate) navigate('/dashboard'); // Or your preferred error/redirect path
        return;
    }

    const queryParams = new URLSearchParams(location.search);
    const selectedMockKey = queryParams.get('mockScenario');

    console.log(`Attempting to load data and generate guide for campaign ID: ${campaignId}${selectedMockKey ? ` (Using Mock Scenario: ${selectedMockKey})` : ''}.`);
    setIsLoading(true);
    setError(null);
    setStep1Analysis('');
    setMessagingGuide('');
    setCampaignData(null);

    try {
      const fetchedData = await fetchCampaignDataById(campaignId, selectedMockKey);
      setCampaignData(fetchedData);
      console.log("Full campaign data fetched:", fetchedData);

      if (!fetchedData || !fetchedData.messaging_inputs) {
        throw new Error("Messaging inputs are missing from the fetched campaign data. Ensure the AI chat step was completed or mock data is sufficient.");
      }
      const payloadForGuide = { ...fetchedData.messaging_inputs };
      if (!payloadForGuide.issueName || !payloadForGuide.proposedChange || !payloadForGuide.primaryAudience) {
          throw new Error("Core data (issue, proposed change, primary audience) for generating the guide is missing.");
      }
      
      const guideResult = await generateMessagingGuideApi(payloadForGuide);

      if (guideResult && guideResult.step1Analysis) {
        setStep1Analysis(guideResult.step1Analysis);
      } else {
        console.warn("Step 1 analysis content is missing from API response.");
      }

      if (guideResult && guideResult.messagingGuide) {
        setMessagingGuide(guideResult.messagingGuide);
      } else {
        console.warn("Messaging guide (Step 2) content is missing from API response.");
      }
      
      // Success toast only if at least one part of the guide is present
      if (guideResult && (guideResult.step1Analysis || guideResult.messagingGuide)) {
        toast({ title: "Success", description: "Messaging guide content generated!" });
      } else if (guideResult) { // API call succeeded but returned no content for either part
        toast({ variant: "default", title: "Notice", description: "Guide generation complete, but no content was returned from the AI for either step." });
      }
      // If guideResult is null/undefined or doesn't have these properties, error would have been caught

    } catch (err) {
      console.error("Error in MessagingGuidePage during data load or guide generation:", err);
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
    if (!step1Analysis && !messagingGuide) {
      if (toast) toast({
        variant: "destructive",
        title: "No content to download",
        description: "Please generate the guide first.",
      });
      return;
    }

    let fullContent = `CAMPAIGN MESSAGING GUIDE\n`;
    fullContent += `============================\n\n`;
    if (campaignData?.summary?.purpose) {
      fullContent += `Campaign: ${campaignData.summary.purpose}\n`;
      fullContent += `----------------------------\n\n`;
    }

    if (step1Analysis) {
      fullContent += `STEP 1: DEEP RESEARCH & ANALYSIS\n`;
      fullContent += `---------------------------------\n`;
      fullContent += `${step1Analysis}\n\n\n`;
    }

    if (messagingGuide) {
      fullContent += `STEP 2: SYNTHESIZED MESSAGING GUIDE\n`;
      fullContent += `------------------------------------\n`;
      fullContent += `${messagingGuide}\n`;
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

    if (toast) toast({
      title: "Download Started",
      description: "Your guide is being downloaded as a .txt file.",
    });
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

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Alert variant="destructive" className="max-w-2xl mx-auto">
          <ExternalLink className="h-4 w-4" /> {/* Ensure ExternalLink is imported or handle appropriately */}
          <AlertTitle>Error Encountered</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
          <div className="mt-4 space-x-2">
            <Button onClick={loadDataAndGenerateGuide}>Retry</Button>
            <Button variant="outline" onClick={() => navigate(`/app/campaign/${campaignId}/develop-messaging`)}>Edit Messaging Inputs</Button>
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
              It includes frame identification, value mapping, linguistic device analysis, and more.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg max-w-none whitespace-pre-wrap">
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
              Based on the initial inputs and the deep analysis, here is the synthesized messaging guide 
              including core messages and justifications.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg max-w-none whitespace-pre-wrap">
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
                <Button onClick={loadDataAndGenerateGuide}>
                    Try Generating Again
                </Button>
                <Button variant="outline" onClick={() => navigate(`/app/campaign/${campaignId}/develop-messaging`)}>
                    Go Back to Chat
                </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      )}

      <div className="mt-8 text-center space-x-2">
        {(step1Analysis || messagingGuide) && (
            <Button onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" /> Download Full Guide
            </Button>
        )}
        <Button onClick={() => navigate('/dashboard')} variant="outline">Back to Dashboard</Button>
      </div>
    </div>
  );
}
