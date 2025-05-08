import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Textarea } from '../components/ui/Textarea';
import { Button } from '../components/ui/Button';
import { useToast } from '../components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { useCampaign } from '../contexts/CampaignContext';

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
    resetCampaignData();
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [history]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newHistory = [...history, { role: 'user', content: input }];
    setHistory(newHistory);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/campaign-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input, history: newHistory }),
      });

      const data = await response.json();
      const { aiMessage, done, ...summary } = data;

      setHistory((prev) => [...prev, { role: 'assistant', content: aiMessage }]);

      if (done) {
        updateCampaignData({ summary });
        navigate('/app/campaign/plan');
      }
    } catch (err) {
      console.error('❌ Error in AI assistant:', err);
      toast({
        variant: 'destructive',
        title: 'Assistant error',
        description: 'Something went wrong while talking to the AI.',
      });
      setError('Failed to communicate with assistant.');
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
              className="max-h-[300px] overflow-y-auto border rounded p-4 bg-gray-50 flex flex-col gap-2"
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
                  <strong>{msg.role === 'user' ? 'You' : 'Assistant'}:</strong> {msg.content}
                </div>
              ))}
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
              {loading ? 'Thinking…' : 'Send'}
            </Button>

            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
