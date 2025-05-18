// frontend/src/pages/ConfirmGoals.jsx (or components if that's where it is)
import React, { useState, useEffect } from 'react';
import { canonicalGoalsList } from '../api/canonicalGoalsList'; // Assuming path is correct

function ConfirmGoals({ initialGoals = [], onConfirm }) {
  const [goals, setGoals] = useState([]); // Local state for managing goals in this component

  console.log("ConfirmGoals: Render. initialGoals (prop):", JSON.stringify(initialGoals));
  console.log("ConfirmGoals: Render. Local goals state:", JSON.stringify(goals));

  useEffect(() => {
    console.log("ConfirmGoals: useEffect triggered by initialGoals change. initialGoals:", JSON.stringify(initialGoals));
    // Ensure initialGoals are distinct and mapped correctly, then limit to 4
    const distinctInitialGoals = [];
    const seenIds = new Set();
    (initialGoals || []).forEach(g => {
      if (g && g.id && !seenIds.has(g.id)) {
        distinctInitialGoals.push({
          id: g.id,
          label: g.label || g.id.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          rank: g.rank // Keep original rank if present, will be re-ranked if items are removed/added
        });
        seenIds.add(g.id);
      }
    });

    // Take up to 4, then sort by rank and re-assign rank to ensure 1, 2, 3, 4
    const sortedAndLimitedGoals = distinctInitialGoals
      .sort((a, b) => (a.rank || Infinity) - (b.rank || Infinity)) // Sort by original rank first
      .slice(0, 4)
      .map((g, index) => ({ ...g, rank: index + 1 })); // Then re-assign rank

    console.log("ConfirmGoals: Setting local goals from prop initialGoals:", JSON.stringify(sortedAndLimitedGoals));
    setGoals(sortedAndLimitedGoals);
  }, [initialGoals]); // Only re-run if initialGoals prop reference changes

  const addGoal = (goalId) => {
    if (goals.length >= 4) {
      console.log("ConfirmGoals: Add denied - already 4 goals.");
      return;
    }
    if (goals.some(g => g.id === goalId)) {
      console.log(`ConfirmGoals: Add denied - goal ${goalId} already exists.`);
      return;
    }

    const goalFromList = canonicalGoalsList.find(g => g.id === goalId);
    if (goalFromList) {
      const newGoal = { ...goalFromList, rank: goals.length + 1 };
      console.log("ConfirmGoals: Adding goal:", JSON.stringify(newGoal));
      setGoals(prevGoals => [...prevGoals, newGoal].map((g, index) => ({ ...g, rank: index + 1 })));
    }
  };

  const removeGoal = (idToRemove) => {
    console.log("ConfirmGoals: Removing goal with id:", idToRemove);
    setGoals(prevGoals =>
      prevGoals
        .filter(g => g.id !== idToRemove)
        .map((g, index) => ({ ...g, rank: index + 1 })) // Re-rank after removal
    );
  };

  const handleSelectChange = (e) => {
    const selectedId = e.target.value;
    if (selectedId) {
      addGoal(selectedId);
      e.target.value = ""; // Reset select after adding
    }
  };

  const handleConfirmClick = () => {
    console.log("ConfirmGoals: Confirming goals:", JSON.stringify(goals));
    if (onConfirm) {
      onConfirm(goals); // Pass the current local state 'goals'
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 text-center">Confirm Your Campaign Goals</h2>
      <p className="text-sm text-gray-600 text-center">
        Confirm or select up to 4 goals.
      </p>

      {goals.length > 0 ? (
        <ul className="space-y-3">
          {goals.map((goal) => ( // Iterate over local 'goals' state
            <li key={goal.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-md bg-gray-50 shadow-sm">
              <span className="text-gray-700">{goal.label} (Rank: {goal.rank})</span>
              <button
                type="button"
                onClick={() => removeGoal(goal.id)}
                className="px-3 py-1 text-xs font-medium bg-red-100 text-red-600 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 py-4">No goals selected. Add using the dropdown.</p>
      )}

      {goals.length < 4 && (
        <div className="pt-2">
          <label htmlFor="add-goal-select" className="block text-sm font-medium text-gray-700 mb-1">
            Add another goal (up to {4 - goals.length} more):
          </label>
          <select
            id="add-goal-select"
            name="add_goal_select"
            onChange={handleSelectChange}
            value=""
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="" disabled>Select a goal...</option>
            {canonicalGoalsList
              .filter(canonicalGoal => !goals.some(selectedGoal => selectedGoal.id === canonicalGoal.id))
              .map(canonicalGoal => (
                <option key={canonicalGoal.id} value={canonicalGoal.id}>
                  {canonicalGoal.label}
                </option>
              ))}
          </select>
        </div>
      )}

      <div className="pt-6">
        <button
          type="button"
          onClick={handleConfirmClick}
          disabled={goals.length === 0}
          className="w-full px-4 py-2.5 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Confirm Goals and Continue
        </button>
      </div>
    </div>
  );
}

export default ConfirmGoals;
