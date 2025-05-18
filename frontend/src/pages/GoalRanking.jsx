// frontend/src/pages/GoalRanking.jsx (or components if that's where it is)
import React, { useState, useEffect } from 'react';

function GoalRanking({ initialGoals = [], onRankedGoalsChange }) { // onRankedGoalsChange is now for final confirmation
  const [rankedGoals, setRankedGoals] = useState([]);

  useEffect(() => {
    console.log("GoalRanking: useEffect triggered by initialGoals. initialGoals:", JSON.stringify(initialGoals));
    const processedGoals = (initialGoals || [])
        .map((goal, index) => ({
            id: goal.id || `goal-temp-${Date.now()}-${index}`,
            label: goal.label || 'Unnamed Goal',
            rank: goal.rank || index + 1
        }))
        .sort((a, b) => a.rank - b.rank);
    setRankedGoals(processedGoals);
    console.log("GoalRanking: Local rankedGoals set to:", JSON.stringify(processedGoals));
  }, [initialGoals]);

  const moveGoal = (currentIndex, direction) => {
    const newGoalsArray = [...rankedGoals];
    const targetIndex = currentIndex + direction;

    if (targetIndex >= 0 && targetIndex < newGoalsArray.length) {
      const itemToMove = newGoalsArray[currentIndex];
      newGoalsArray[currentIndex] = newGoalsArray[targetIndex];
      newGoalsArray[targetIndex] = itemToMove;

      const reRankedGoals = newGoalsArray.map((goal, index) => ({
        ...goal,
        rank: index + 1,
      }));
      setRankedGoals(reRankedGoals);
      // DO NOT call onRankedGoalsChange here anymore for every move
      console.log("GoalRanking: Goal moved locally. New local order:", JSON.stringify(reRankedGoals));
    }
  };

  const handleConfirmRanks = () => {
    console.log("GoalRanking: 'Confirm Ranks' clicked. Final goals:", JSON.stringify(rankedGoals));
    if (onRankedGoalsChange) {
      onRankedGoalsChange(rankedGoals); // Send the final ranked list to parent
    }
  };

  if (!rankedGoals || rankedGoals.length === 0) {
    return (
        <div className="max-w-md mx-auto p-4 text-center">
            <p className="text-gray-500">No goals available to rank. Please add goals in the previous step.</p>
        </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 text-center">Rank Your Campaign Goals</h2>
      <p className="text-sm text-gray-600 text-center">
        Order your goals by priority. The top goal is the most important.
      </p>
      <ul className="space-y-3">
        {rankedGoals.map((goal, index) => (
          <li
            key={goal.id}
            className="flex items-center justify-between p-3 border border-gray-200 rounded-md bg-gray-50 shadow-sm"
          >
            <span className="text-gray-700 font-medium">
              <span className="text-blue-600 mr-2">{goal.rank}.</span>
              {goal.label}
            </span>
            <div className="space-x-2">
              <button
                type="button"
                onClick={() => moveGoal(index, -1)}
                disabled={index === 0}
                aria-label={`Move ${goal.label} up`}
                className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
              >
                ↑ Up
              </button>
              <button
                type="button"
                onClick={() => moveGoal(index, 1)}
                disabled={index === rankedGoals.length - 1}
                aria-label={`Move ${goal.label} down`}
                className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
              >
                ↓ Down
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <button
          type="button"
          onClick={handleConfirmRanks}
          disabled={rankedGoals.length === 0}
          className="w-full px-4 py-2.5 bg-green-600 text-white font-semibold rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
        >
          Confirm Ranks and Continue
        </button>
      </div>
    </div>
  );
}

export default GoalRanking;
