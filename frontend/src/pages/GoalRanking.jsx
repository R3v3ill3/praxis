import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

export default function GoalRanking() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;
    const fetchGoals = async () => {
      try {
        const campaignsRef = doc(db, 'users', user.uid, 'campaigns', 'active');
        const campaignSnap = await getDoc(campaignsRef);
        if (campaignSnap.exists()) {
          const data = campaignSnap.data();
          if (data.goals) {
            setGoals(data.goals.map((g, i) => ({ id: i, text: g })));
          } else {
            setError('No goals found to rank.');
          }
        } else {
          setError('No active campaign found.');
        }
      } catch (err) {
        console.error('Error fetching campaign goals:', err);
        setError('Failed to load campaign goals.');
      } finally {
        setLoading(false);
      }
    };
    fetchGoals();
  }, [user]);

  const handleRankChange = (index, direction) => {
    const newGoals = [...goals];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= goals.length) return;
    [newGoals[index], newGoals[targetIndex]] = [newGoals[targetIndex], newGoals[index]];
    setGoals(newGoals);
  };

  const handleSave = async () => {
    try {
      const campaignsRef = doc(db, 'users', user.uid, 'campaigns', 'active');
      await updateDoc(campaignsRef, {
        goals_ranked: goals.map(g => g.text)
      });
      navigate('/campaign/next-steps');
    } catch (err) {
      console.error('Error saving ranked goals:', err);
      setError('Failed to save your rankings.');
    }
  };

  if (loading) return <div className="p-4">Loading goals...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Rank Your Campaign Goals</h2>
      <p className="text-sm text-gray-600 mb-4">Use the arrows to reorder your goals from most to least important.</p>
      <ul>
        {goals.map((goal, index) => (
          <li key={goal.id} className="mb-2 flex items-center justify-between p-2 bg-white shadow rounded">
            <span>{index + 1}. {goal.text}</span>
            <div className="space-x-2">
              <button
                onClick={() => handleRankChange(index, -1)}
                disabled={index === 0}
                className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
              >↑</button>
              <button
                onClick={() => handleRankChange(index, 1)}
                disabled={index === goals.length - 1}
                className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
              >↓</button>
            </div>
          </li>
        ))}
      </ul>
      <button
        onClick={handleSave}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >Save and Continue</button>
    </div>
  );
}
