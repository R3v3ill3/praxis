// frontend/src/pages/MessagingGuidePage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '../components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExternalLink, Download, FileText } from 'lucide-react';
import { mockScenarios } from '../lib/mock-data';
import { useAuth } from '../contexts/AuthContext.jsx';

// API function to fetch campaign data (remains the same)
async function fetchCampaignDataById(campaignId, selectedMockScenarioKey) {
  console.log(`Attempting to fetch campaign data for ID: ${campaignId}`);
  if (selectedMockScenarioKey && mockScenarios && mockScenarios[selectedMockScenarioKey]) {
    console.warn(`Using PREDEFINED MOCK SCENARIO: '${selectedMockScenarioKey}' from mock-data.js.`);
    return { ...mockScenarios[selectedMockScenarioKey], id: campaignId };
  }
  const localStorageKey = `campaign-${campaignId}`;
  const storedData = localStorage.getItem(localStorageKey);
  if (storedData) {
    try {
      console.log(`Found campaign data in localStorage for key: ${localStorageKey}.`);
      return JSON.parse(storedData);
    } catch(e) {
      console.error(`Error parsing campaign data from localStorage for key ${localStorageKey}. Falling back. Error:`, e);
    }
  }
  console.warn(`No specific mock scenario requested via query param, and no data in localStorage for '${campaignId}'. Using DEFAULT hardcoded mock from mock-data.js.`);
  const defaultMock = mockScenarios?.defaultGigWorkers || {
    id: campaignId,
    summary: { purpose: "Default Mock: Campaign Purpose", audience: "Default Mock: Audience", location: "Default Mock: Location" },
    classification: { primary_type: "Default Mock Type" },
    goals: [{ id: "mockgoal1", label: "Default Mock: Goal 1", rank: 1 }],
    messaging_inputs: { issueName: 'Default Mock Issue', primaryAudience: 'Default Mock Audience', proposedChange: 'Default Mock Change' }
  };
  return { ...defaultMock, id: campaignId };
}

// API function to generate the messaging guide (remains the same)
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
  return response.json();
}

// MODIFIED API function to save messaging outputs
async function saveMessagingOutputsToFirestore(campaignId, step1Analysis, messagingGuide, token) {
  console.log(`Attempting to save messaging outputs for campaign ID: ${campaignId}. Token provided: ${!!token}`);
  if (!token) {
    console.error("saveMessagingOutputsToFirestore: No token provided to function.");
    // This specific error message "Unauthorized: No token provided" matches your console.
    // It suggests the 'token' variable itself was falsy when the function was called.
    throw new Error("Unauthorized: No token provided");
  }
  const response = await fetch('/api/save-campaign', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      campaignId,
      step1Analysis,
      messagingGuide,
    }),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Failed to save messaging outputs. Server returned non-JSON response.' }));
    if (response.status === 401) throw new Error("Unauthorized: Token rejected by server. Failed to save outputs.");
    throw new Error(errorData.error || `HTTP error! status: ${response.status} while saving outputs.`);
  }
  return response.json();
}


export default function MessagingGuidePage() {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();
  const { user, loading: authLoading } = useAuth();

  const [campaignData, setCampaignData] = useState(null);
  const [step1Analysis, setStep1Analysis] = useState('');
  const [messagingGuide, setMessagingGuide] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isGuideSaved, setIsGuideSaved] = useState(false);
  const [error, setError] = useState(null);

  const loadDataAndGenerateGuide = useCallback(async () => {
    if (!campaignId) {
        setError("Campaign ID is missing from URL.");
        setIsLoading(false);
        if (toast) toast({ variant: "destructive", title: "Error", description: "No Campaign ID found." });
        if (navigate) navigate('/dashboard');
        return;
    }

    // <<< ADDED authLoading CHECK AT THE VERY BEGINNING of data operations >>>
    if (authLoading) {
      console.log("MessagingGuidePage: Auth state is loading. Waiting to load data and generate guide...");
      setIsLoading(true); // Ensure main loading state reflects this
      return;
    }
    // <<< END ADDED CHECK >>>

    const queryParams = new URLSearchParams(location.search);
    const selectedMockKey = queryParams.get('mockScenario');

    console.log(`Attempting to load data and generate guide for campaign ID: ${campaignId}${selectedMockKey ? ` (Using Mock Scenario: ${selectedMockKey})` : ''}. User: ${user ? user.uid : 'None'}`);
    setIsLoading(true);
    setIsGuideSaved(false);
    setError(null);
    setStep1Analysis('');
    setMessagingGuide('');
    setCampaignData(null);

    try {
      const fetchedData = await fetchCampaignDataById(campaignId, selectedMockKey);
      setCampaignData(fetchedData);
      console.log("Full campaign data fetched for guide page:", fetchedData);

      if (!fetchedData) {
        throw new Error("Failed to fetch campaign data. Data is null.");
      }

      const currentMessagingInputs = fetchedData.messaging_inputs || {};
      const payloadForGuide = { ...currentMessagingInputs };

      console.log("MessagingGuidePage: Starting prefill. Initial payloadForGuide:", JSON.parse(JSON.stringify(payloadForGuide)));
      if (fetchedData.summary) {
        if (!payloadForGuide.issueName && fetchedData.summary.purpose) {
          payloadForGuide.issueName = fetchedData.summary.purpose;
        }
        if (!payloadForGuide.primaryAudience && fetchedData.summary.audience) {
          payloadForGuide.primaryAudience = fetchedData.summary.audience;
        }
        if (!payloadForGuide.geographicContext && fetchedData.summary.location) {
          payloadForGuide.geographicContext = fetchedData.summary.location;
        }
        if (!payloadForGuide.proposedChange && fetchedData.summary.proposedChange) {
            payloadForGuide.proposedChange = fetchedData.summary.proposedChange;
        }
      }

      if (fetchedData.goals && fetchedData.goals.length > 0) {
        if (!payloadForGuide.proposedChange && fetchedData.goals[0] && fetchedData.goals[0].label) {
          payloadForGuide.proposedChange = fetchedData.goals[0].label;
        }
        if (!payloadForGuide.desiredOutcome) {
          payloadForGuide.desiredOutcome = fetchedData.goals.map(g => g.label).filter(Boolean).join('; ');
        }
      }

      payloadForGuide.audienceProfile = payloadForGuide.audienceProfile || {};
      payloadForGuide.deliveryContext = payloadForGuide.deliveryContext || {};
      console.log("MessagingGuidePage: Prefill complete. Final payloadForGuide before validation:", JSON.parse(JSON.stringify(payloadForGuide)));
      
      if (!payloadForGuide.issueName || !payloadForGuide.proposedChange || !payloadForGuide.primaryAudience) {
          console.error("MessagingGuidePage: Core data still missing AFTER prefill attempt.", payloadForGuide, "Original fetchedData for context:", fetchedData);
          throw new Error("Core data (issue, proposed change, primary audience) for generating the guide is missing, even after prefill. Please ensure campaign summary and goals are complete and try again, or use the chat to define these values.");
      }
      
      const guideResult = await generateMessagingGuideApi(payloadForGuide);

      let generatedStep1 = '';
      let generatedMessagingGuide = '';

      if (guideResult && guideResult.step1Analysis) {
        generatedStep1 = guideResult.step1Analysis;
        setStep1Analysis(generatedStep1);
      } else { console.warn("Step 1 analysis content is missing from API response."); }

      if (guideResult && guideResult.messagingGuide) {
        generatedMessagingGuide = guideResult.messagingGuide;
        setMessagingGuide(generatedMessagingGuide);
      } else { console.warn("Messaging guide (Step 2) content is missing from API response."); }
      
      if (generatedStep1 || generatedMessagingGuide) {
        toast({ title: "Success", description: "Messaging guide content generated!" });
        
        // Check for user *before* trying to get token or save
        if (!user) {
          console.error("MessagingGuidePage: No authenticated user. Outputs generated but cannot save.");
          toast({ variant: "destructive", title: "Save Error", description: "No authenticated user. Generated outputs cannot be saved." });
        } else {
          setIsSaving(true);
          let token = null; // Initialize token
          try {
            console.log("MessagingGuidePage: Attempting to get ID token for saving outputs...");
            token = await user.getIdToken(true); // Pass true to force refresh, just in case
            console.log("MessagingGuidePage: Token for save obtained:", !!token);

            if (!token) { // Explicit check again
                throw new Error("Failed to retrieve authentication token for saving.");
            }

            await saveMessagingOutputsToFirestore(campaignId, generatedStep1, generatedMessagingGuide, token);
            toast({ title: "Saved to DB", description: "Messaging outputs saved to campaign." });
            setIsGuideSaved(true);
          } catch (saveError) {
            console.error("Error saving messaging outputs to Firestore:", saveError, "Token was:", token); // Log the token state
            toast({ variant: "destructive", title: "Save Failed", description: `Could not save outputs to DB: ${saveError.message}` });
          } finally {
            setIsSaving(false);
          }
        }
      } else if (guideResult) {
        toast({ variant: "default", title: "Notice", description: "Guide generation complete, but no content was returned from the AI." });
      }

    } catch (err) {
      console.error("Error in MessagingGuidePage loadDataAndGenerateGuide:", err);
      setError(err.message || "An unexpected error occurred.");
      if (toast) toast({ variant: "destructive", title: "Error", description: err.message });
    } finally {
      setIsLoading(false);
    }
  }, [campaignId, navigate, toast, location.search, user, authLoading]); // Keep user & authLoading as dependencies

  useEffect(() => {
    // This effect will now re-run if authLoading or user changes.
    // If authLoading was true, loadDataAndGenerateGuide will return early.
    // Once authLoading is false and user is available (or null), it will proceed.
    loadDataAndGenerateGuide();
  }, [loadDataAndGenerateGuide]); // loadDataAndGenerateGuide is memoized with its own deps

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
    navigate(`/app/campaign/${campaignId}/action-plan`);
  };
  
  if (authLoading) { // Check authLoading first
      return (
        <div className="container mx-auto p-6 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader><CardTitle>Authenticating...</CardTitle></CardHeader>
            <CardContent><p>Please wait while we verify your session.</p></CardContent>
          </Card>
        </div>
      );
  }
  
  if (isLoading) { // Then check general isLoading (for data/guide gen)
    return (
      <div className="container mx-auto p-6 text-center">
        <Card className="max-w-2xl mx-auto">
          <CardHeader><CardTitle>Loading & Generating Guide...</CardTitle></CardHeader>
          <CardContent><p>Please wait while we fetch campaign details and generate your messaging guide. This may take a moment.</p></CardContent>
        </Card>
      </div>
    );
  }

  if (error && !isLoading) { // Error display should also only be when not primary loading
    return (
      <div className="container mx-auto p-6">
        <Alert variant="destructive" className="max-w-2xl mx-auto">
          <ExternalLink className="h-4 w-4" />
          <AlertTitle>Error Encountered</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
          <div className="mt-4 space-x-2">
            <Button onClick={loadDataAndGenerateGuide} disabled={isLoading || isSaving}>Retry</Button>
            <Button variant="outline" onClick={() => navigate(`/app/campaign/${campaignId}/develop-messaging`)}>Edit Inputs via Chat</Button>
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
      
      {!isLoading && !authLoading && !error && !step1Analysis && !messagingGuide && ( // Added !authLoading here
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
        {(step1Analysis || messagingGuide) && (
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
