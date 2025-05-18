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
        throw new Error("AI assistant returned no data or failed.");
      }
      console.log("CampaignBuilder sendMessage: Assistant API Response Data:", assistantData);

      const {
        aiMessage,
        done,
        structured: overallStructured,
        classification_guess,
        summary: assistantSummaryObject,
        processed_goals
      } = assistantData;

      if (aiMessage) {
        setHistory((prevHistory) => [...prevHistory, { role: 'assistant', content: aiMessage }]);
      }

      if (done && overallStructured && assistantSummaryObject) {
        console.log("CampaignBuilder: Assistant Done & Overall Structured.");

        const newSummary = assistantSummaryObject;
        const newClassificationGuess = classification_guess;
        const newGoals = processed_goals || [];

        updateCampaignData({
          summary: newSummary,
          classification_guess: newClassificationGuess,
          goals: newGoals
        });

        let finalClassificationForContext = null;
        if (newClassificationGuess && newClassificationGuess.primary_type) {
          finalClassificationForContext = {
            primary_type: newClassificationGuess.primary_type,
            secondary_type: newClassificationGuess.secondary_type,
            sub_type: newClassificationGuess.use_case,
            id: null, type_id: null, subtype_id: null,
            source: 'ai_guess'
          };
        } else {
          try {
            const cleanedSummaryForProgrammatic = {
              ...newSummary,
              goals: newSummary.goals?.map(g => {
                const match = g.match(/^(.*?)\s*→ Goal Type:/);
                return match ? match[1].trim() : g.trim();
              }).filter(g => g) || []
            };
            const programmaticResult = await classifyCampaign(cleanedSummaryForProgrammatic);
            if (programmaticResult) {
              finalClassificationForContext = { ...programmaticResult, source: 'programmatic' };
            } else {
              toast({ title: "Classification Note", description: "Could not programmatically classify campaign. No AI guess provided.", duration: 4000 });
            }
          } catch (classificationError) {
            console.error("CampaignBuilder: Programmatic classification error -", classificationError);
            toast({ variant: "destructive", title: "Classification Error", description: classificationError.message });
          }
        }

        if (finalClassificationForContext) {
          updateCampaignData({ classification: finalClassificationForContext });
          console.log("CampaignBuilder: Updated context with final classification:", finalClassificationForContext);
        } else {
          updateCampaignData({ classification: null });
          console.log("CampaignBuilder: No final classification determined for context. Setting classification to null.");
          // Consider a toast if no classification could be made at all
           toast({ title: "Classification", description: "No campaign classification could be determined. Please review manually in the next step.", duration: 5000 });
        }
                        
        console.log("CampaignBuilder: PRE-SAVE CHECK for 'Campaign Classification Complete'");
        console.log("CampaignBuilder: Data for override: newSummary:", newSummary);
        console.log("CampaignBuilder: Data for override: finalClassificationForContext:", finalClassificationForContext);
        console.log("CampaignBuilder: Data for override: newGoals:", newGoals);
        console.log("CampaignBuilder: Data for override: contextCampaignId (should be null):", contextCampaignId);

        // Check if essential data for saving is present
        // Note: finalClassificationForContext can be null if no classification was made, 
        // but the save payload structure expects a classification object.
        // If finalClassificationForContext is null, we should probably send a default/empty classification object
        // or the backend save-campaign.js needs to handle a null classification.
        // For now, let's ensure finalClassificationForContext is at least an object for the payload.
        const classificationToSave = finalClassificationForContext || { 
            primary_type: 'Unknown', secondary_type: 'Unknown', sub_type: 'Unknown', 
            id: null, type_id: null, subtype_id: null, source: 'unavailable' 
        };

        if (newSummary && newGoals.length > 0) { // classificationToSave will always be an object now
          const dataToSave = {
            summary: newSummary,
            classification: classificationToSave,
            goals: newGoals,
            campaignId: contextCampaignId || null
          };
          console.log("CampaignBuilder: Attempting initial save with direct data override:", dataToSave);
          
          const savedId = await saveCurrentCampaignState(
            "Campaign Classification Complete",
            dataToSave
          );

          if (!savedId) {
            console.warn("CampaignBuilder: Initial save FAILED or was skipped by context save function.");
            toast({
                variant: "destructive",
                title: "Save Failed",
                description: "Failed to save initial campaign details. Please try again.",
                duration: 5000,
            });
          }
        } else {
          console.warn("CampaignBuilder: Skipping initial save due to incomplete summary or goals.", { newSummary, finalClassificationForContext, newGoals });
          toast({ variant: "destructive", title: "Save Skipped", description: "Initial campaign data (summary/goals) incomplete. Progress not saved." });
        }
        
        navigate('/app/campaign/edit-classification');

      } else if (done && (!overallStructured || !assistantSummaryObject)) {
         setError("Assistant finished, but the summary was incomplete or not understood.");
         updateCampaignData({
            summary: assistantSummaryObject || null,
            classification_guess: classification_guess || null,
            goals: processed_goals || [],
            classification: null
         });
      }
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
