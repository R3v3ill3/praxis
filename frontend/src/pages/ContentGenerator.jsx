// frontend/src/pages/ContentGenerator.jsx

import React, { useState } from 'react';
import { useCampaign } from '../contexts/CampaignContext';
import { Textarea } from '../components/ui/Textarea';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { useToast } from '../components/ui/use-toast';

export default function ContentGenerator() {
  const { campaignData } = useCampaign();
  const { messagingGuide, summary } = campaignData || {};
  const { toast } = useToast();

  const [format, setFormat] = useState('SMS');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const formats = ['SMS', 'Social Media Post', 'Email Intro', 'Poster Slogan', 'Speech Excerpt'];

  const generateContent = async () => {
    setLoading(true);
    setOutput('');
    try {
      const res = await fetch('/api/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ format, messagingGuide, summary })
      });
      const data = await res.json();
      if (data.content) {
        setOutput(data.content);
      } else {
        toast({ variant: 'destructive', title: 'No content returned' });
      }
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Error generating content',
        description: err.message
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Generate Campaign Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Select Content Format:</label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {formats.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>

          <Button onClick={generateContent} disabled={loading}>
            {loading ? 'Generating…' : 'Generate Content'}
          </Button>

          {output && (
            <div className="mt-6 whitespace-pre-wrap border rounded p-4 bg-gray-50">
              <h3 className="text-lg font-semibold mb-2">Generated Content:</h3>
              <div>{output}</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
