import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCampaign } from '../contexts/CampaignContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Separator } from '../components/ui/Separator';
import { useToast } from '../components/ui/use-toast';

const CampaignPlan = () => {
  const { campaignData, updateCampaignData } = useCampaign();
  const [planText, setPlanText] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchPlan = async () => {
      if (!campaignData.summary) {
        toast({
          variant: 'destructive',
          title: 'Missing Summary',
          description: 'Please define your campaign first.',
        });
        navigate('/app/campaign/new');
        return;
      }

      setLoading(true);

      try {
        const response = await fetch('/api/campaign-plan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(campaignData.summary),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch campaign plan');
        }

        const data = await response.json();
        setPlanText(data.plan);
        updateCampaignData({ plan: data.plan });
      } catch (error) {
        console.error('Error fetching campaign plan:', error);
        toast({
          variant: 'destructive',
          title: 'Error generating plan',
          description: error.message,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [campaignData.summary]);

  const handleNext = () => {
    navigate('/app/campaign/message');
  };

  return (
    <div className="container py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Suggested Campaign Plan</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Generating plan...</p>
          ) : (
            <>
              <div className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded border mb-4 max-h-[500px] overflow-y-auto">
                {planText || 'No plan available.'}
              </div>
              <Separator />
              <Button onClick={handleNext} className="mt-4">
                Next: Develop Messaging
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignPlan;
