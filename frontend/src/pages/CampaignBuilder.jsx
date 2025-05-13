// frontend/src/pages/CampaignBuilder.jsx (Corrected for data passing)
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Textarea } from '../components/ui/Textarea.jsx';
import { Button } from '../components/ui/Button.jsx';
import { useToast } from '../components/ui/use-toast.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card.jsx';
import { useCampaign } from '../contexts/CampaignContext';
import { classifyCampaign } from '../api/classify.js'; // Ensure this path is correct

export default function CampaignBuilder() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { updateCampaignData, resetCampaignData } = useCampaign();
  const chatBoxRef = useRef(null);

  useEffect(() => {
    console.log("CampaignBuilder Effect: Resetting campaign data.");
    resetCampaignData();
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [history]);

  const sendMessage = async () => {
    console.log("sendMessage: Called.");
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const newHistory = [...history, userMessage];
    setHistory(newHistory);
    setInput('');
    setLoading(true);
    setError(null);
    console.log("sendMessage: Calling API /api/campaign-assistant");

    try {
      const assistantResponse = await fetch('/api/campaign-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: userMessage.content, history: newHistory }),
      });

      console.log("sendMessage (Assistant): API Response Status:", assistantResponse.status);
      if (!assistantResponse.ok) {
          const errorData = await assistantResponse.json().catch(() => ({ message: "Failed to parse assistant error response" }));
          console.error("sendMessage (Assistant): API Error Response Data:", errorData);
          throw new Error(errorData.message || `Assistant API request failed with status ${assistantResponse.status}`);
      }

      const assistantData = await assistantResponse.json();
      console.log("sendMessage (Assistant): API Response Data:", assistantData);

      // VVV CORRECTED DESTRUCTURING AND USAGE VVV
      const {
        aiMessage,
        done,
        structured: overallStructured, // Top-level 'structured' flag from assistant's response
        classification_guess,         // The AI's classification guess object
        summary: assistantSummaryObject // This IS the actual summary object {purpose, audience, ..., goals, structured (inner from parser)}
      } = assistantData;

      if (aiMessage) {
          setHistory((prev) => [...prev, { role: 'assistant', content: aiMessage }]);
      } else {
          console.warn("sendMessage (Assistant): Received response but no aiMessage content.");
      }

      if (done && overallStructured) { // Use the top-level 'overallStructured'
        console.log("sendMessage: Assistant Done & Overall Structured. Proceeding with workflow.");

        // assistantSummaryObject IS the inner summary: { purpose, audience, ..., goals, structured (inner one from parser) }
        // classification_guess is the AI's guess: { primary_type, secondary_type, use_case } or null

        // YOUR ADDED LOG - to see what's being sent to the helper
        console.log("CampaignBuilder: Object being sent to classifyCampaign helper (this is assistantSummaryObject):", JSON.stringify(assistantSummaryObject, null, 2));

        console.log("sendMessage: Updating context with summary:", assistantSummaryObject, "and AI's guess:", classification_guess);
        updateCampaignData({ summary: assistantSummaryObject, classification_guess: classification_guess });

        console.log("sendMessage: Calling classifyCampaign API with (this is assistantSummaryObject):", assistantSummaryObject);
        const programmaticClassificationResult = await classifyCampaign(assistantSummaryObject); // Pass only the core summary object
        console.log("sendMessage: Programmatic classification result received:", programmaticClassificationResult);

        if (programmaticClassificationResult) {
            console.log("sendMessage: Updating context with programmatic classification:", programmaticClassificationResult);
            updateCampaignData({ classification: programmaticClassificationResult });
        } else if (classification_guess) {
             console.log("sendMessage: Programmatic classification failed or null. AI guess was:", classification_guess, ". Consider if this guess should be used in context if no programmatic result.");
             // Optionally: updateCampaignData({ classification: some_transformed_version_of_classification_guess });
        } else {
            console.warn("sendMessage: No AI guess and programmatic classification failed/null.");
            // An error would have been thrown by classifyCampaign if the API call failed badly.
            // If classifyCampaign resolved to null/undefined (meaning backend said no match), handle here.
            toast({
                variant: "default", // Or 'warning' if you have one
                title: "Campaign Classification",
                description: "Could not programmatically classify the campaign based on summary. Please review manually.",
            });
        }

        console.log("sendMessage: Navigating to /campaign/review");
        navigate('/campaign/review');

      } else if (done && !overallStructured) {
         console.warn("sendMessage: Done, but summary structure parsing failed by assistant. Staying on page.");
         setError("Assistant finished, but the summary format was not understood. Please try rephrasing or review the chat.");
         setLoading(false);
      } else {
         // Not done yet
         setLoading(false);
      }
      // ^^^ END CORRECTED DESTRUCTURING AND USAGE ^^^

    } catch (err) {
      console.error('❌ Error in sendMessage or Classification step:', err);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: err.message || 'An unexpected error occurred.',
      });
      setError(err.message || 'An unexpected error occurred.');
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
              {history.length === 0 && (
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
                  <strong>{msg.role === 'user' ? 'You' : 'Assistant'}:</strong> {msg.content ?? '*Missing message content*'}
                </div>
              ))}
               {loading && <p className="text-muted-foreground self-start mr-auto px-4 py-2">Processing... (includes classification)</p>}
            </div>
            <Textarea
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
