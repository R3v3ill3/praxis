// frontend/src/pages/CampaignBuilder.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Textarea } from '../components/ui/Textarea.jsx';
import { Button } from '../components/ui/Button.jsx';
import { useToast } from '../components/ui/use-toast.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card.jsx';
import { useCampaign } from '../contexts/CampaignContext';
import { classifyCampaign } from '../api/classify.js';
import { sendQuery } from '../api/assistant.js';

export default function CampaignBuilder() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { updateCampaignData, resetCampaignData, saveCurrentCampaignState, campaignId: contextCampaignId } = useCampaign();
  const chatBoxRef = useRef(null);

  // Count user messages
  const userMessageCount = history.filter(msg => msg.role === 'user').length;

  useEffect(() => {
    console.log("CampaignBuilder: Mounting and resetting campaign data.");
    resetCampaignData();
  }, [resetCampaignData]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [history]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const currentInput = input;
    const historyForApi = [...history];
    setHistory(prevHistory => [...prevHistory, userMessage]);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const assistantData = await sendQuery(currentInput, historyForApi);

      if (!assistantData) {
        toast({ variant: "destructive", title: "Error", description: "AI assistant returned no data or failed." });
        setLoading(false);
        throw new Error("AI assistant returned no data or failed.");
      }
      console.log("CampaignBuilder sendMessage: Assistant API Response Data:", assistantData);

      const {
        aiMessage,
        done,
        structured: overallStructured,
        summary: assistantSummaryObject
      } = assistantData;

      if (aiMessage) {
        setHistory((prevHistory) => [...prevHistory, { role: 'assistant', content: aiMessage }]);
      }

      if (done && overallStructured && assistantSummaryObject) {
        console.log("CampaignBuilder: Assistant Done & Overall Structured. Summary Object:", assistantSummaryObject);
        await processAndNavigate(assistantSummaryObject, true); // Pass true for 'aiCompleted'
      } else if (done && (!overallStructured || !assistantSummaryObject)) {
         setError("Assistant finished, but the summary was incomplete or not understood.");
         updateCampaignData({
            summary: assistantSummaryObject || null,
            classification_guess: null,
            goals: [],
            classification: null
         });
         console.warn("CampaignBuilder: AI done, but summary incomplete/unstructured. Raw assistantData:", assistantData);
         // Consider if we should still offer manual navigation here or let user try again
      }
    } catch (err) {
      console.error('❌ Error in sendMessage (CampaignBuilder):', err);
      toast({ variant: 'destructive', title: 'Error', description: err.message || 'AI assistant interaction failed.' });
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  // Extracted processing logic to be reusable by manual proceed
  const processAndNavigate = async (summaryData, aiCompleted = false) => {
    setLoading(true); // Show loading state for this process

    const newSummary = summaryData;
    let finalClassificationForContext = null;
    let goalsForContextAndSave = [];

    // For manual proceed, summaryData will be very basic.
    // For AI completion, it's the assistantSummaryObject.
    updateCampaignData({
      summary: newSummary,
      classification_guess: null,
      goals: []
    });

    // Only attempt classification if AI completed and provided goals_text
    // or if we decide to try with whatever is in newSummary for manual mode.
    // For this version, let's only run classifyCampaign if AI completed it properly.
    if (aiCompleted && newSummary.goals_text) {
      const goalStringsForClassification = newSummary.goals_text || [];
      try {
        console.log("CampaignBuilder: Calling classifyCampaign with summary:", { ...newSummary, goals: goalStringsForClassification });
        const classificationApiResult = await classifyCampaign({
          ...newSummary,
          goals: goalStringsForClassification
        });
        console.log("CampaignBuilder: classifyCampaign API Result:", classificationApiResult);

        if (classificationApiResult) {
          if (classificationApiResult.match) {
            finalClassificationForContext = { ...classificationApiResult.match, source: 'programmatic' };
          } else {
            toast({ title: "Classification Note", description: classificationApiResult.message || "Could not programmatically classify campaign.", duration: 4000 });
          }
          if (Array.isArray(classificationApiResult.processed_goals)) {
            goalsForContextAndSave = classificationApiResult.processed_goals;
          } else {
            console.warn("CampaignBuilder: classifyCampaign API did not return 'processed_goals'.");
            toast({ title: "Goal Processing Issue", description: "Goals were not processed by classification service.", duration: 4000 });
          }
        } else {
          toast({ title: "Classification Error", description: "Classification service returned no result.", duration: 5000 });
        }
      } catch (classificationError) {
        console.error("CampaignBuilder: Programmatic classification/goal processing error -", classificationError);
        toast({ variant: "destructive", title: "Classification System Error", description: classificationError.message || "Failed to classify/process goals." });
      }
    } else if (!aiCompleted) {
        // Manual proceed: skip classification API call for now, set default classification
        console.log("CampaignBuilder (Manual): Skipping programmatic classification.");
        toast({ title: "Manual Proceed", description: "Proceeding with available data. Classification will be manual.", duration: 3000 });
    }


    // Update context with classification and goals
    updateCampaignData({
      classification: finalClassificationForContext, // Will be null if not set
      goals: goalsForContextAndSave // Will be empty if not set
    });
    console.log("CampaignBuilder: Updated context with classification:", finalClassificationForContext, "and goals:", goalsForContextAndSave);
    
    if (!finalClassificationForContext && aiCompleted) { // If AI completed but classification failed
         toast({ title: "Classification Failed", description: "No campaign classification could be determined by AI. Review goals if any were processed.", duration: 5000 });
    }


    // Determine data for saving
    const classificationToSave = finalClassificationForContext || {
        primary_type: 'Unknown (Manual Proceed)', secondary_type: 'Unknown', sub_type: 'Unknown',
        id: null, type_id: null, subtype_id: null, source: aiCompleted ? 'unavailable' : 'manual_override_initiation'
    };
    
    // Save campaign state if we have a summary. For manual proceed, goals might be empty.
    // Let's allow saving even with empty goals if it's a manual override.
    if (newSummary && Object.keys(newSummary).length > 0) {
      const dataToSave = {
        summary: newSummary,
        classification: classificationToSave,
        goals: goalsForContextAndSave, // Use processed goals (could be empty for manual)
        campaignId: contextCampaignId || null
      };
      console.log(`CampaignBuilder (${aiCompleted ? 'AI' : 'Manual'}): Attempting initial save with data:`, dataToSave);

      const savedId = await saveCurrentCampaignState(
        aiCompleted ? "Campaign Initiation Complete (AI)" : "Campaign Initiation (Manual Override)",
        dataToSave
      );

      if (!savedId) {
        console.warn(`CampaignBuilder (${aiCompleted ? 'AI' : 'Manual'}): Initial save FAILED or was skipped.`);
        toast({ variant: "destructive", title: "Save Failed", description: "Failed to save initial campaign details. Please try again.", duration: 5000 });
        setLoading(false); // Ensure loading is stopped
        return; // Do not navigate if save failed
      } else {
         console.log(`CampaignBuilder (${aiCompleted ? 'AI' : 'Manual'}): Initial campaign details saved with ID:`, savedId);
      }
    } else {
      console.warn(`CampaignBuilder (${aiCompleted ? 'AI' : 'Manual'}): Skipping initial save due to incomplete summary.`);
      toast({ variant: "warning", title: "Save Skipped", description: "Initial campaign data was incomplete for saving. Proceeding to manual classification.", duration: 6000 });
      // Still proceed to navigation for manual classification if summary is missing for some reason
    }
    
    setLoading(false);
    navigate('/app/campaign/edit-classification');
  };

  const handleManualProceed = async () => {
    console.log("CampaignBuilder: Manual Proceed to Classification triggered.");
    toast({ title: "Processing Manual Request", description: "Preparing to move to classification...", duration: 2000});

    // Create a very basic summary.
    // We could try to extract some text from history, but for simplicity:
    let combinedUserInputs = "User inputs: ";
    history.filter(msg => msg.role === 'user').forEach(msg => {
        combinedUserInputs += `\n- ${msg.content}`;
    });
    if (userMessageCount === 0) combinedUserInputs = "No user input captured before manual proceed.";


    const manualSummary = {
      purpose: `Manually proceeded after ${userMessageCount} user inputs. Full chat history may contain more details. ${combinedUserInputs.substring(0,500)}`, // Truncate if too long
      audience: "To be defined by user",
      target: "To be defined by user",
      intent: "To be defined by user",
      location: "To be defined by user",
      problem: "Manually proceeded, details to be confirmed by user.",
      goals_text: [] // No goals automatically parsed in manual mode
    };

    // Call the common processing and navigation function
    await processAndNavigate(manualSummary, false); // Pass false for 'aiCompleted'
  };


  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="container py-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Describe Your Campaign</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div
              ref={chatBoxRef}
              className="min-h-[200px] max-h-[400px] overflow-y-auto border rounded p-4 bg-gray-50 flex flex-col gap-2"
            >
              {history.length === 0 && !loading && (
                <p className="text-muted-foreground">Start by describing what you’re working on…</p>
              )}
              {history.map((msg, idx) => (
                <div
                  key={idx}
                  className={`px-4 py-2 rounded max-w-[80%] text-sm whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-blue-500 text-white self-end ml-auto'
                      : 'bg-gray-200 text-gray-800 self-start mr-auto'
                  }`}
                >
                  <strong>{msg.role === 'user' ? 'You' : 'Assistant'}:</strong> {msg.content ?? '*Missing content*'}
                </div>
              ))}
               {loading && (
                <div className="self-start mr-auto px-4 py-2">
                    <p className="text-muted-foreground">Assistant is thinking...</p>
                </div>
               )}
            </div>
            <label htmlFor="campaign-input" className="sr-only">Describe your campaign</label>
            <Textarea
              id="campaign-input"
              name="campaign_input"
              placeholder="Type your message and hit Enter…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={3}
              disabled={loading}
            />
            <div className="flex space-x-2"> {/* Container for buttons */}
              <Button onClick={sendMessage} disabled={loading || !input.trim()} className="flex-grow">
                {loading ? 'Processing…' : 'Send'}
              </Button>
              {userMessageCount >= 5 && !loading && (
                <Button onClick={handleManualProceed} variant="outline" className="flex-shrink-0">
                  Proceed Manually
                </Button>
              )}
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
