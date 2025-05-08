// frontend/src/pages/MessagingAssistant.jsx

import React, { useState } from 'react';
import { Textarea } from '../components/ui/Textarea';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { useCampaign } from '../contexts/CampaignContext';
import { useToast } from '../components/ui/use-toast';

export default function MessagingAssistant() {
  const { campaignData } = useCampaign();
  const { summary } = campaignData || {};
  const { toast } = useToast();

  const [form, setForm] = useState({
    issueName: '',
    proposedChange: '',
    primaryAudience: '',
    geographicContext: summary?.location || ''
  });
  const [loading, setLoading] = useState(false);
  const [guide, setGuide] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setGuide('');
    try {
      const res = await fetch('/api/messaging-guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          summary // also send full summary for fallback
        })
      });
      const data = await res.json();
      if (data.messagingGuide) {
        setGuide(data.messagingGuide);
      } else {
        toast({ variant: 'destructive', title: 'No guide returned' });
      }
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Error generating messaging guide',
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
          <CardTitle>Messaging Guide Builder</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-sm">
            We'll use this information to generate a persuasive messaging framework using cognitive linguistics and political narrative strategy.
          </p>

          <Textarea
            name="issueName"
            label="What is the issue called?"
            placeholder="e.g. Wage theft, Housing crisis, Abortion rights"
            value={form.issueName}
            onChange={handleChange}
          />

          <Textarea
            name="proposedChange"
            label="What is the change you're trying to win?"
            placeholder="e.g. Raise the minimum wage by 5% for hospitality workers"
            value={form.proposedChange}
            onChange={handleChange}
          />

          <Textarea
            name="primaryAudience"
            label="Who are you trying to persuade or mobilize?"
            placeholder="e.g. Club board members, local councillors, general public"
            value={form.primaryAudience}
            onChange={handleChange}
          />

          <Textarea
            name="geographicContext"
            label="Where is this happening?"
            placeholder="e.g. Western Sydney, Queensland, Australia"
            value={form.geographicContext}
            onChange={handleChange}
          />

          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Generating…' : 'Generate Messaging Guide'}
          </Button>

          {guide && (
            <div className="mt-6 whitespace-pre-wrap border rounded p-4 bg-gray-50">
              <h3 className="text-lg font-semibold mb-2">Messaging Guide:</h3>
              <div>{guide}</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
