// frontend/src/pages/MessagingGuidePage.jsx
import React, { useState, useEffect, useCallback, useContext, useRef } from 'react'; // useRef can be removed if no other refs are used
import { useParams, useNavigate } from 'react-router-dom';
import { useCampaign } from '../contexts/CampaignContext';
import { useToast } from '../components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExternalLink } from 'lucide-react';

// Placeholder API function to fetch a single campaign's full data
async function fetchCampaignDataById(campaignId) {
  console.log(`API Call (Placeholder): Fetching full campaign data for ID: ${campaignId}`);
  if (localStorage.getItem(`campaign-${campaignId}`)) {
    try {
      return JSON.parse(localStorage.getItem(`campaign-${campaignId}`));
    } catch(e) {
      console.error("Error parsing campaign data from localStorage", e);
    }
  }
  console.warn("Using fallback mock campaign data in fetchCampaignDataById. Implement actual API call.");
  return {
    id: campaignId,
    summary: { purpose: "Mock Summary Purpose", location: "Mock Location", audience: "Mock Audience", intent: "Mock Intent", target: "Mock Target", problem: "Mock Problem", proposedChange: "Mock Proposed Change"},
    classification: { primary_type: "Mock Type", secondary_type: "Mock Subtype", use_case: "Mock Use Case"},
    goals: [{id: "g1", label: "Mock Goal 1", rank: 1}],
    messaging_inputs: {
      issueName: 'Mock Issue from fetched data',
      proposedChange: 'Mock Proposed Change from fetched data',
      geographicContext: 'Mock Geo Context from fetched data',
      desiredOutcome: 'Mock Desired Outcome from fetched data',
      primaryAudience: 'Mock Primary Audience from fetched data',
      audienceProfile: {
        demographics: 'Mock Demographics',
        psychographics: 'Mock Psychographics',
        priorBeliefs: 'Mock Prior Beliefs',
        mediaHabits: 'Mock Media Habits'
      },
      campaignObjective: 'Mock Campaign Objective from fetched data',
      deliveryContext: {
        format: 'Mock Format',
        messenger: 'Mock Messenger',
        timing: 'Mock Timing'
      },
      knownComparisons: 'Mock Known Comparisons',
      benchmarkData: 'Mock Benchmark Data'
    }
  };
}

// API function to generate the messaging guide
async function generateMessagingGuideApi(campaignDetails) {
  console.log("LIVE API Call to /api/messaging-guide with details:", campaignDetails);
  const response = await fetch('/api/messaging-guide', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(campaignDetails),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Failed to generate messaging guide. Server returned non-JSON response.' }));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }
  return response.json();
}


export default function MessagingGuidePage() {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast(); // This should now be stable thanks to use-toast.jsx fix

  // const renderCountRef = useRef(0); // Diagnostic removed

  const [campaignData, setCampaignData] = useState(null);
  const [messagingGuide, setMessagingGuide] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Unified loading state
  const [error, setError] = useState(null);

  const loadDataAndGenerateGuide = useCallback(async () => {
    if (!campaignId) {
      setError("Campaign ID is missing from URL.");
      setIsLoading(false);
      if (toast) toast({ variant: "destructive", title: "Error", description: "No Campaign ID found." });
      if (navigate) navigate('/app/dashboard');
      return;
    }

    // renderCountRef.current +=1 ; // Diagnostic removed
    console.log(`Attempting to load data and generate guide for campaign ID: ${campaignId}.`);
    setIsLoading(true);
    setError(null);
    setMessagingGuide('');
    setCampaignData(null);

    try {
      console.log(`Workspaceing full campaign data for ID: ${campaignId}`);
      const fetchedData = await fetchCampaignDataById(campaignId);
      setCampaignData(fetchedData);
      console.log("Full campaign data fetched (mock):", fetchedData);

      if (!fetchedData || !fetchedData.messaging_inputs) {
        throw new Error("Messaging inputs are missing from the fetched campaign data. Please complete the AI chat step.");
      }

      const payloadForGuide = {
        ...fetchedData.messaging_inputs,
      };

      if (!payloadForGuide.issueName || !payloadForGuide.proposedChange || !payloadForGuide.geographicContext || !payloadForGuide.desiredOutcome || !payloadForGuide.primaryAudience || !payloadForGuide.audienceProfile) {
          console.error("Payload for guide generation is missing required fields:", payloadForGuide);
          throw new Error("Critical data for generating the guide is missing from messaging inputs. Please ensure the chat was completed fully.");
      }
      console.log("Payload being sent to /api/messaging-guide:", payloadForGuide);

      // --- Re-enable actual API call ---
      const guideResult = await generateMessagingGuideApi(payloadForGuide);
      // --- Removed simulated API call and logs for skipping ---

      if (guideResult && guideResult.messagingGuide) {
        setMessagingGuide(guideResult.messagingGuide);
        // Standard success toast
        if (toast) toast({ title: "Success", description: "Messaging guide generated!" });
      } else {
        console.warn("Messaging guide generation may have succeeded but content is empty or missing.");
        setMessagingGuide('');
         // Optionally, inform the user if the guide is empty but no error occurred
        if (toast) toast({ variant: "default", title: "Notice", description: "Guide generated, but no content was returned." });
      }

    } catch (err) {
      console.error("Error in MessagingGuidePage during data load or guide generation:", err);
      setError(err.message || "An unexpected error occurred.");
      if (toast) toast({ variant: "destructive", title: "Error", description: err.message });
    } finally {
      setIsLoading(false);
      console.log("loadDataAndGenerateGuide finished.");
    }
  }, [campaignId, navigate, toast]); // Dependencies are campaignId, navigate, and the now-stable toast

  useEffect(() => {
    // console.log(`Main effect to call loadDataAndGenerateGuide is running.`); // Optional: keep for one load check
    loadDataAndGenerateGuide();
  }, [loadDataAndGenerateGuide]);


  // --- UI Rendering (removing "Diagnostic Mode" text) ---
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
          <ExternalLink className="h-4 w-4" />
          <AlertTitle>Error Encountered</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
          <div className="mt-4 space-x-2">
            <Button onClick={loadDataAndGenerateGuide}> {/* Retry the whole process */}
              Retry
            </Button>
            <Button variant="outline" onClick={() => navigate(`/app/campaign/${campaignId}/develop-messaging`)}>
              Edit Messaging Inputs (Chat)
            </Button>
            <Button variant="outline" onClick={() => navigate('/app/dashboard')}>
              Go to Dashboard
            </Button>
          </div>
        </Alert>
      </div>
    );
  }

  if (!messagingGuide && !isLoading && !error) {
    return (
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
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">Your Messaging Guide</CardTitle>
          {campaignData?.summary?.purpose && (
            <CardDescription>For campaign: {campaignData.summary.purpose}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <div className="prose prose-lg max-w-none whitespace-pre-wrap">
            {messagingGuide}
          </div>
          <div className="mt-8 text-center">
            <Button onClick={() => navigate('/app/dashboard')} variant="outline">Back to Dashboard</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
