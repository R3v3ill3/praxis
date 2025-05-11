
import React, { useEffect, useState } from 'react';
import { useCampaign } from '../contexts/CampaignContext';
import { useNavigate } from 'react-router-dom';

export default function MessagingForm() {
  const { campaignData, updateCampaignData } = useCampaign();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    issueName: campaignData.summary?.purpose || '',
    proposedChange: campaignData.summary?.proposedChange || '',
    geographicContext: campaignData.summary?.context || '',
    desiredOutcome: campaignData.summary?.goal || '',
    primaryAudience: campaignData.summary?.audience || '',
    audienceProfile: {
      demographics: '',
      psychographics: '',
      priorBeliefs: '',
      mediaHabits: ''
    },
    campaignObjective: '',
    deliveryContext: {
      format: '',
      messenger: '',
      timing: ''
    },
    knownComparisons: '',
    benchmarkData: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [guideOutput, setGuideOutput] = useState('');

  const handleChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setInputs(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setInputs(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/messaging-guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputs)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Unknown error');

      updateCampaignData({ messagingGuide: data.messagingGuide });
      setGuideOutput(data.messagingGuide);
    } catch (err) {
      console.error('❌ Messaging Form Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Manual Messaging Form (for testing)</h2>
      <p className="text-sm mb-2 text-gray-600">Fill in the data directly to generate a messaging guide.</p>

      {[
        { label: 'Issue Name', field: 'issueName' },
        { label: 'Proposed Change (Goal)', field: 'proposedChange' },
        { label: 'Geographic Context', field: 'geographicContext' },
        { label: 'Desired Outcome', field: 'desiredOutcome' },
        { label: 'Primary Audience', field: 'primaryAudience' },
        { label: 'Demographics', field: 'audienceProfile.demographics' },
        { label: 'Psychographics', field: 'audienceProfile.psychographics' },
        { label: 'Prior Beliefs', field: 'audienceProfile.priorBeliefs' },
        { label: 'Media Habits', field: 'audienceProfile.mediaHabits' },
        { label: 'Campaign Objective', field: 'campaignObjective' },
        { label: 'Delivery Format', field: 'deliveryContext.format' },
        { label: 'Delivery Messenger', field: 'deliveryContext.messenger' },
        { label: 'Delivery Timing', field: 'deliveryContext.timing' },
        { label: 'Known Comparisons', field: 'knownComparisons' },
        { label: 'Benchmark Data', field: 'benchmarkData' }
      ].map(({ label, field }) => (
        <div key={field} className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
          <input
            type="text"
            value={field.includes('.') ? inputs[field.split('.')[0]][field.split('.')[1]] : inputs[field]}
            onChange={(e) => handleChange(field, e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded shadow-sm"
          />
        </div>
      ))}

      {error && <p className="text-red-600 mt-2">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Generating...' : 'Generate Messaging Guide'}
      </button>

      {guideOutput && (
        <div className="mt-6 p-4 border rounded bg-gray-50 whitespace-pre-wrap text-sm">
          <h3 className="font-bold mb-2">Generated Messaging Guide</h3>
          {guideOutput}
        </div>
      )}
    </div>
  );
}
