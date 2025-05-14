// frontend/components/ConfirmGoals.jsx

import React, { useState } from 'react';
import { canonicalGoalsList } from '../api/canonicalGoalsList';

function ConfirmGoals({ initialGoals = [], onConfirm }) {
  const [goals, setGoals] = useState(initialGoals.slice(0, 4));

  const addGoal = (goal) => {
    if (goals.length >= 4 || goals.find(g => g.id === goal.id)) return;
    setGoals([...goals, { ...goal, rank: goals.length + 1 }]);
  };

  const removeGoal = (id) => {
    const updated = goals.filter(g => g.id !== id).map((g, i) => ({ ...g, rank: i + 1 }));
    setGoals(updated);
  };

  const handleChange = (e) => {
    const selectedId = e.target.value;
    const goal = canonicalGoalsList.find(g => g.id === selectedId);
    if (goal) addGoal(goal);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Confirm Your Campaign Goals</h2>

      <ul className="space-y-2">
        {goals.map((goal) => (
          <li key={goal.id} className="flex items-center justify-between p-2 border rounded bg-white">
            <span>{goal.label}</span>
            <button
              onClick={() => removeGoal(goal.id)}
              className="px-2 py-1 text-sm bg-red-100 text-red-700 rounded"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      {goals.length < 4 && (
        <div className="pt-4">
          <label className="block text-sm font-medium">Add another goal:</label>
          <select onChange={handleChange} defaultValue="" className="mt-1 p-2 border rounded w-full">
            <option value="" disabled>Select a goal</option>
            {canonicalGoalsList
              .filter(g => !goals.some(goal => goal.id === g.id))
              .map(goal => (
                <option key={goal.id} value={goal.id}>{goal.label}</option>
              ))}
          </select>
        </div>
      )}

      <div className="pt-4">
        <button
          onClick={() => onConfirm(goals)}
          disabled={goals.length === 0}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Confirm Goals and Continue
        </button>
      </div>
    </div>
  );
}

export default ConfirmGoals;
