// OnboardingSummary.jsx (updated to send isEditingSingleField flag)
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../firebase'; // Assuming you're using Firebase
import { doc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export default function OnboardingSummary() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();
  const answers = state?.answers ?? {}; // Default to empty object if answers are not in state

  // These keys should correspond to the 'key' property in your 'steps' array in OnboardingChat.jsx
  // and the order should match the desired question order if stepIndex is derived from this.
  const stepKeys = [
    'org_type',
    'scale',
    'membership_size',
    'campaign_budget',
    'staff_count',
    'volunteer_count',
    'tech_stack',
  ];

  const handleConfirm = async () => {
    const user = auth.currentUser;
    if (user && Object.keys(answers).length > 0) { // Check if there are answers to save
      try {
        await setDoc(doc(db, 'organisations', user.uid), answers, { merge: true }); // Using merge: true can be safer
        console.log('Organisation data saved/updated successfully.');
        navigate('/dashboard'); // Navigate to dashboard or next appropriate page
      } catch (error) {
        console.error('Error saving organisation data:', error);
        // Optionally, show an error message to the user
      }
    } else if (!user) {
      console.error('No user logged in to save data.');
      // Optionally, redirect to login or show an error
    } else {
      console.warn('No answers to save.');
      // Optionally, inform the user or allow proceeding if answers are optional
      navigate('/dashboard'); // Or handle as appropriate
    }
  };

  const handleEdit = (key) => {
    const targetStep = stepKeys.indexOf(key);
    // console.log(`[OnboardingSummary] Edit clicked for key: "${key}". Calculated targetStep: ${targetStep}`);
    if (targetStep >= 0) {
      // console.log('[OnboardingSummary] Navigating to /onboarding with state:', { answers, stepIndex: targetStep, isEditingSingleField: true });
      navigate('/onboarding', {
        state: {
          answers,
          stepIndex: targetStep,
          isEditingSingleField: true // <<< THIS IS THE ADDED FLAG
        }
      });
    } else {
      console.error(`[OnboardingSummary] Key "${key}" not found in stepKeys array. Ensure stepKeys are up to date.`);
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto bg-gray-50 min-h-screen">
      <div className="bg-white shadow-xl rounded-lg p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 text-center">
          Review Your Onboarding Answers
        </h2>
        {Object.keys(answers).length === 0 ? (
          <p className="text-center text-gray-600 py-8">
            No answers recorded yet. Please complete the onboarding process.
            <button
              onClick={() => navigate('/onboarding')}
              className="mt-4 block mx-auto px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-150 ease-in-out"
            >
              Start Onboarding
            </button>
          </p>
        ) : (
          <ul className="space-y-5">
            {stepKeys.map((key) => {
              // Only display if the answer exists, or provide a placeholder
              const value = answers[key];
              if (value === undefined && !Object.prototype.hasOwnProperty.call(answers, key)) {
                // Optionally skip or show as 'Not answered' if a key from stepKeys isn't in answers
                // For now, we'll only render keys present in the answers object by iterating Object.entries below.
                // This current loop using stepKeys ensures order, but might show undefined if not answered.
                // A better approach might be to filter stepKeys based on Object.keys(answers) or ensure all steps always populate an answer.
                return null;
              }
              const displayValue = Array.isArray(value) ? value.join(', ') : (value === '' || value === null || value === undefined ? <em className="text-gray-500">Not answered</em> : String(value));
              const displayName = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()); // Capitalize words

              return (
                <li key={key} className="border border-gray-200 p-4 rounded-md shadow-sm bg-gray-50 hover:shadow-md transition-shadow duration-150 ease-in-out">
                  <div className="flex justify-between items-center">
                    <div className="flex-grow pr-4">
                      <strong className="block text-sm font-medium text-gray-700">{displayName}:</strong>
                      <span className="text-gray-600 text-sm break-words">{displayValue}</span>
                    </div>
                    <button
                      onClick={() => handleEdit(key)}
                      className="flex-shrink-0 ml-4 px-3 py-1.5 text-xs font-medium bg-yellow-400 text-yellow-900 rounded-md shadow-sm hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-1 transition-colors duration-150 ease-in-out"
                    >
                      Edit
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {Object.keys(answers).length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
            <button
              onClick={() => navigate('/onboarding', { state: { answers } })} // Edit All does not send isEditingSingleField
              className="w-full sm:w-auto flex-1 px-6 py-2.5 bg-gray-200 text-gray-700 font-semibold rounded-md shadow hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors duration-150 ease-in-out"
            >
              Edit All Answers
            </button>
            <button
              onClick={handleConfirm}
              className="w-full sm:w-auto flex-1 px-6 py-2.5 bg-green-600 text-white font-semibold rounded-md shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-150 ease-in-out"
            >
              Confirm & Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
