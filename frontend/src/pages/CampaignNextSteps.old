
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCampaign } from '../contexts/CampaignContext';
import { useAuth } from '../contexts/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function CampaignNextSteps() {
  const { campaignData } = useCampaign();
  const { user } = useAuth();
  const navigate = useNavigate();

  const summary = campaignData?.summary || {};
  const classification = campaignData?.classification || {};

  const [rankedGoals, setRankedGoals] = useState(summary.goals || []);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleReorder = (fromIndex, toIndex) => {
    const updated = [...rankedGoals];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setRankedGoals(updated);
  };

  const saveRankedGoals = async () => {
    if (!user?.uid || !campaignData?.campaignId) return;
    setIsSaving(true);
    try {
      const campaignRef = doc(db, 'users', user.uid, 'campaigns', campaignData.campaignId);
      await updateDoc(campaignRef, { ranked_goals: rankedGoals });
      setSaveSuccess(true);
    } catch (err) {
      console.error('Error saving ranked goals:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Campaign Ready</h2>
      <p className="mb-6">Here’s your campaign summary. What would you like to do next?</p>

      <div className="bg-gray-100 p-4 rounded mb-6">
        <h3 className="text-lg font-bold mb-2">Campaign Summary</h3>
        <ul className="text-sm space-y-1">
          <li><strong>Purpose:</strong> {summary?.purpose}</li>
          <li><strong>Audience:</strong> {summary?.audience}</li>
          <li><strong>Target:</strong> {summary?.target}</li>
          <li><strong>Intent:</strong> {summary?.intent}</li>
          <li><strong>Location:</strong> {summary?.location}</li>
          <li><strong>Goals:</strong>
            <ol className="list-decimal ml-6">
              {summary?.goals?.map((goal, i) => <li key={i}>{goal}</li>)}
            </ol>
          </li>
        </ul>
      </div>

      <div className="bg-gray-50 p-4 rounded mb-6 text-sm">
        <h4 className="font-semibold mb-2">Classification</h4>
        <ul>
          <li><strong>Type:</strong> {classification?.primary_type}</li>
          <li><strong>Subtype:</strong> {classification?.secondary_type}</li>
          <li><strong>Use Case:</strong> {classification?.sub_type}</li>
          <li><strong>Confidence Score:</strong> {classification?.confidence}</li>
        </ul>
      </div>

      {summary.goals && summary.goals.length > 0 && (
        <div className="bg-white p-4 border rounded mb-6">
          <h4 className="text-md font-semibold mb-2">Rank these goals by importance</h4>
          <ul className="space-y-2">
            {rankedGoals.map((goal, index) => (
              <li key={index} className="bg-gray-100 p-2 rounded flex justify-between items-center">
                <span>{index + 1}. {goal}</span>
                <div className="space-x-1">
                  {index > 0 && (
                    <button className="text-sm px-2 py-1 bg-blue-100 rounded"
                      onClick={() => handleReorder(index, index - 1)}>↑</button>
                  )}
                  {index < rankedGoals.length - 1 && (
                    <button className="text-sm px-2 py-1 bg-blue-100 rounded"
                      onClick={() => handleReorder(index, index + 1)}>↓</button>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={saveRankedGoals}
            disabled={isSaving}
          >
            {isSaving ? 'Saving…' : 'Save Ranking'}
          </button>
          {saveSuccess && <p className="text-green-600 mt-2">✅ Ranking saved</p>}
        </div>
      )}

      <div className="space-y-2">
        <button onClick={() => handleNavigate('/app/campaign/message')} className="block w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
          Build Campaign Messaging
        </button>
        <button onClick={() => handleNavigate('/campaign/plan')} className="block w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Build Action Plan
        </button>
        <button onClick={() => handleNavigate('/campaign/classification-review')} className="block w-full px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
          Review Campaign Details
        </button>
      </div>
    </div>
  );
}
