// frontend/src/pages/CampaignBuilder.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Textarea } from '../components/ui/Textarea.jsx';
import { Button } from '../components/ui/Button.jsx';
import { useToast } from '../components/ui/use-toast.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card.jsx';
import { useCampaign } from '../contexts/CampaignContext';
import { classifyCampaign } from '../api/classify.js'; // This calls /api/classify-campaign-type
import { sendQuery } from '../api/assistant.js'; // This calls /api/campaign-assistant

export default function CampaignBuilder() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { updateCampaignData, resetCampaignData, saveCurrentCampaignState, campaignId: contextCampaignId } = useCampaign();
  const chatBoxRef = useRef(null);

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
    const historyForApi = [...history]; // Pass current history
    setHistory(prevHistory => [...prevHistory, userMessage]);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const assistantData = await sendQuery(currentInput, historyForApi);

      if (!assistantData) {
        toast({ variant: "destructive", title: "Error", description: "AI assistant returned no data or failed." });
        setLoading(false); // Ensure loading is set to false
        throw new Error("AI assistant returned no data or failed.");
      }
      console.log("CampaignBuilder sendMessage: Assistant API Response Data:", assistantData);

      const {
        aiMessage,
        done, // boolean: AI indicates final summary turn
        structured: overallStructured, // boolean: AI response format is as expected for summary extraction
        summary: assistantSummaryObject // object: {purpose, audience, ..., goals_text: string[]} OR null
                                        // This 'summary' key is now expected due to backend change
      } = assistantData;

      if (aiMessage) {
        setHistory((prevHistory) => [...prevHistory, { role: 'assistant', content: aiMessage }]);
      }

      // Check if the AI is done AND the summary was successfully parsed AND is present
      if (done && overallStructured && assistantSummaryObject) {
        console.log("CampaignBuilder: Assistant Done & Overall Structured. Summary Object:", assistantSummaryObject);

        const newSummary = assistantSummaryObject; // Contains .goals_text (string array)
        let finalClassificationForContext = null;
        let goalsForContextAndSave = []; // Will hold [{id, label, rank}, ...]

        // Initial update to context with summary, clearing out old classification/goals
        updateCampaignData({
          summary: newSummary,
          classification_guess: null, // No direct classification_guess from campaign-assistant
          goals: [] // Goals will be updated after classification & processing
        });

        // Attempt programmatic classification & goal processing
        // The `goals_text` from the summary are the raw goal descriptions from the AI.
        const goalStringsForClassification = newSummary.goals_text || [];

        try {
          console.log("CampaignBuilder: Calling classifyCampaign with summary:", { ...newSummary, goals: goalStringsForClassification });
          const classificationApiResult = await classifyCampaign({
            ...newSummary, // Pass all summary fields (purpose, audience, target etc.)
            goals: goalStringsForClassification // Pass the raw goal strings under 'goals' key as expected by classify-campaign-type API
          });

          console.log("CampaignBuilder: classifyCampaign API Result:", classificationApiResult);

          if (classificationApiResult) {
            if (classificationApiResult.match) {
              finalClassificationForContext = { ...classificationApiResult.match, source: 'programmatic' };
            } else {
              toast({ title: "Classification Note", description: classificationApiResult.message || "Could not programmatically classify campaign.", duration: 4000 });
            }
            // Use processed_goals if returned by the API
            if (Array.isArray(classificationApiResult.processed_goals)) {
              goalsForContextAndSave = classificationApiResult.processed_goals;
            } else {
                console.warn("CampaignBuilder: classifyCampaign API did not return a valid 'processed_goals' array. Received:", classificationApiResult.processed_goals);
                toast({ title: "Goal Processing Issue", description: "Goals were not processed correctly by the classification service.", duration: 4000 });
            }
          } else {
            toast({ title: "Classification Error", description: "Classification service returned no result.", duration: 5000 });
          }
        } catch (classificationError) {
          console.error("CampaignBuilder: Programmatic classification or goal processing error -", classificationError);
          toast({ variant: "destructive", title: "Classification System Error", description: classificationError.message || "Failed to classify or process goals." });
        }

        // Update context with final classification and processed goals
        if (finalClassificationForContext) {
          updateCampaignData({
            classification: finalClassificationForContext,
            goals: goalsForContextAndSave // Update goals in context
          });
          console.log("CampaignBuilder: Updated context with final classification:", finalClassificationForContext, "and goals:", goalsForContextAndSave);
        } else {
          updateCampaignData({
            classification: null,
            // goals remain as initially set (empty or from previous update if any partial success)
            // if classification fails, goalsForContextAndSave might be empty or based on input.
            // It's probably safer to update goals only if classification is somewhat successful or goals are independently processed.
            // For now, if classification is null, goals in context will reflect what `goalsForContextAndSave` became.
             goals: goalsForContextAndSave
          });
          console.log("CampaignBuilder: No final classification. Context classification set to null. Goals from processing attempt:", goalsForContextAndSave);
           if (!finalClassificationForContext) { // Only show this if classification itself failed, not just goals.
                toast({ title: "Classification Failed", description: "No campaign classification could be determined. Review goals if any were processed.", duration: 5000 });
           }
        }

        const classificationToSave = finalClassificationForContext || {
            primary_type: 'Unknown', secondary_type: 'Unknown', sub_type: 'Unknown',
            id: null, type_id: null, subtype_id: null, source: 'unavailable'
        };

        // Save campaign state IF we have a summary AND processed goals
        if (newSummary && Object.keys(newSummary).length > 0 && goalsForContextAndSave.length > 0) {
          const dataToSave = {
            summary: newSummary,
            classification: classificationToSave,
            goals: goalsForContextAndSave, // Use the processed goals
            campaignId: contextCampaignId || null
          };
          console.log("CampaignBuilder: Attempting initial save with data:", dataToSave);

          const savedId = await saveCurrentCampaignState(
            "Campaign Classification Complete", // State description
            dataToSave // Payload
          );

          if (!savedId) {
            console.warn("CampaignBuilder: Initial save FAILED or was skipped by context save function.");
            toast({ variant: "destructive", title: "Save Failed", description: "Failed to save initial campaign details. Please try again.", duration: 5000 });
          } else {
             console.log("CampaignBuilder: Initial campaign details saved with ID:", savedId);
             // Navigate only on successful save.
             navigate('/app/campaign/edit-classification'); // Or to CampaignNextSteps if edit is part of flow
          }
        } else {
          console.warn("CampaignBuilder: Skipping initial save due to incomplete summary or no processed goals.", { newSummary, goalsForContextAndSave });
          toast({ variant: "warning", title: "Save Skipped", description: "Initial campaign data (summary/goals) was incomplete for saving. Please review.", duration: 6000 });
           // Decide if navigation should happen if save is skipped.
           // For now, let's assume we still want to go to edit classification to manually fix.
           navigate('/app/campaign/edit-classification');
        }
        // Removed navigation from here, placed it under successful save or decided skip
        // navigate('/app/campaign/edit-classification');

      } else if (done && (!overallStructured || !assistantSummaryObject)) {
         // This case means AI said it's done, but we couldn't get a usable structured summary
         setError("Assistant finished, but the summary was incomplete or not understood.");
         updateCampaignData({
            summary: assistantSummaryObject || null, // Will be null if parsing failed
            classification_guess: null, // Not provided by campaign-assistant
            goals: [], // No goals processed
            classification: null
         });
         console.warn("CampaignBuilder: AI done, but summary incomplete/unstructured. Raw assistantData:", assistantData);
      }
      // If !done, the AI is expected to send more messages, no final processing yet.

    } catch (err) {
      console.error('❌ Error in sendMessage (CampaignBuilder):', err);
      toast({ variant: 'destructive', title: 'Error', description: err.message || 'AI assistant interaction failed.' });
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    // ... JSX remains the same
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
            <Button onClick={sendMessage} disabled={loading || !input.trim()}>
              {loading ? 'Processing…' : 'Send'}
            </Button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
