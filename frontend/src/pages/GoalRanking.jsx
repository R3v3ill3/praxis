// Updated GoalRanking.jsx to work with Firestore-style goal objects

import React, { useState, useEffect } from 'react';

function GoalRanking({ initialGoals = [], onRankedGoalsChange }) {
  const [rankedGoals, setRankedGoals] = useState([]);

  useEffect(() => {
    // Sort by initial rank if available
    const sorted = [...initialGoals].sort((a, b) => (a.rank || 0) - (b.rank || 0));
    setRankedGoals(sorted);
  }, [initialGoals]);

  const moveGoal = (index, direction) => {
    const newRanked = [...rankedGoals];
    const newIndex = index + direction;
    if (newIndex >= 0 && newIndex < newRanked.length) {
      const temp = newRanked[index];
      newRanked[index] = newRanked[newIndex];
      newRanked[newIndex] = temp;

      // Update rank values to reflect new order
      const reRanked = newRanked.map((goal, i) => ({ ...goal, rank: i + 1 }));
      setRankedGoals(reRanked);
      onRankedGoalsChange && onRankedGoalsChange(reRanked);
    }
  };

  return (
    <div className="space-y-4">
      {rankedGoals.map((goal, index) => (
        <div key={goal.id} className="flex items-center justify-between border p-2 rounded-md shadow-sm bg-white">
          <span className="text-gray-800">{goal.label}</span>
          <div className="flex space-x-2">
            <button
              onClick={() => moveGoal(index, -1)}
              disabled={index === 0}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              ↑
            </button>
            <button
              onClick={() => moveGoal(index, 1)}
              disabled={index === rankedGoals.length - 1}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              ↓
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GoalRanking;
