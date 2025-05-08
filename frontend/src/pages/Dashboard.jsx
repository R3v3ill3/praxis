
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCampaign } from '../contexts/CampaignContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Separator } from '../components/ui/Separator';

export default function Dashboard() {
  const { user } = useAuth();
  const { campaigns, fetchCampaigns } = useCampaign();
  const [error, setError] = useState(null);

  console.log('[Dashboard.jsx] Render start');
  console.log('[Dashboard.jsx] user:', user);
  console.log('[Dashboard.jsx] campaigns:', campaigns);
  console.log('[Dashboard.jsx] error:', error);

  useEffect(() => {
    console.log('📌 Auth State (Dashboard):', user);
    if (user) {
      fetchCampaigns()
        .catch((err) => {
          console.error('❌ Dashboard: Error fetching campaigns:', err);
          setError('Failed to load campaigns.');
        });
    }
  }, [user]);

  return (
    <div className="container py-10">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Welcome to Your Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <Separator className="my-4" />

          {!user ? (
            <p className="text-red-600">Not authenticated. Please log in.</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : (
            <>
              <p className="mb-4">Hello, {user.email}!</p>
              {campaigns && campaigns.length > 0 ? (
                <ul className="list-disc pl-6 space-y-2">
                  {campaigns.map((campaign) => (
                    <li key={campaign.id} className="text-gray-800">
                      <strong>{campaign.name}</strong> – {campaign.summary?.purpose || 'No summary yet'}
                    </li>
                  ))}
                </ul>
              ) : (
                <>
                  <p>No campaigns found yet.</p>
                  <div className="mt-4">
                    <a href="/campaign-builder" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                      Start a New Campaign
                    </a>
                  </div>
                </>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
