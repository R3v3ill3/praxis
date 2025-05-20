// OnboardingChat.jsx (Revised - steps array moved outside component)
import React, { useEffect, useRef, useState } from 'react';
// import { getAuth } from 'firebase/auth'; // Assuming auth might be used for other purposes later
import { useNavigate, useLocation } from 'react-router-dom';

// Define steps array outside the component so it's a stable reference
const steps = [
  {
    key: 'org_type',
    question: 'What type of organisation are you?',
    required: true,
    options: ['Union', 'NGO', 'Political Party', 'Community Group', 'Social Enterprise', 'Other'],
  },
  {
    key: 'scale',
    question: 'What is your operational scale?',
    required: true,
    options: ['Local', 'Statewide', 'National', 'International', 'Federation with Local Branches', 'Other'],
  },
  {
    key: 'membership_size',
    question: 'How many members/supporters do you have?',
    required: false,
    options: ['<100', '100–1000', '1000–5000', '5000–10,000', '10,000+'],
  },
  {
    key: 'campaign_budget',
    question: 'Typical campaign budget range?',
    required: false,
    options: ['Under $5,000', '$5,000–$20,000', '$20,000–$100,000', 'Over $100,000'],
  },
  {
    key: 'staff_count',
    question: 'How many paid staff?',
    required: false,
    options: ['0', '1–5', '6–20', '21–100', '100+'],
  },
  {
    key: 'volunteer_count',
    question: 'How many active volunteers?',
    required: false,
    options: ['0', '1–10', '11–50', '51–200', '200+'],
  },
  {
    key: 'tech_stack',
    question: 'Which campaign tools do you use? (Select all that apply, then press Submit)',
    required: false,
    multi: true,
    options: [
      'Action Network', 'Yabbr', 'NationBuilder', 'Mailchimp', 'Hootsuite',
      'Canva', 'HubSpot', 'Zoho Campaigns', 'Other',
    ],
  },
];

export default function OnboardingChat() {
  const location = useLocation();
  const navigate = useNavigate();

  // Initialize state from navigation or defaults
  const [stepIndex, setStepIndex] = useState(location.state?.stepIndex ?? 0);
  const [answers, setAnswers] = useState(location.state?.answers ?? {});
  const [isEditingSingleField] = useState(location.state?.isEditingSingleField === true);

  const [multiSelect, setMultiSelect] = useState([]);
  const [awaitingOtherInput, setAwaitingOtherInput] = useState(false);
  const [otherInput, setOtherInput] = useState('');
  const scrollRef = useRef(null);

  // currentStep will now be more stable as `steps` is a stable reference
  const currentStep = steps[stepIndex] || steps[0];

  useEffect(() => {
    // **IMPORTANT**: Uncomment logs below for debugging if issues persist
    // console.log(`[EFFECT OnboardingChat] Step: ${currentStep?.key}, Editing: ${isEditingSingleField}`);
    // console.log(`[EFFECT OnboardingChat] Answers for this step from 'answers' state:`, JSON.stringify(answers[currentStep?.key]));

    const answerForThisStep = answers[currentStep?.key];

    if (currentStep?.multi) {
      const currentAnswersForStep = Array.isArray(answerForThisStep) ? answerForThisStep : [];
      const newMultiSelect = [];
      let newOtherInput = '';
      let newAwaitingOtherInput = false;

      currentAnswersForStep.forEach(ans => {
        if (currentStep.options.includes(ans)) {
          newMultiSelect.push(ans);
        } else if (currentStep.options.includes('Other')) {
          newOtherInput = ans;
          if (!newMultiSelect.includes('Other')) {
            newMultiSelect.push('Other');
          }
          newAwaitingOtherInput = true;
        }
      });
      setMultiSelect(newMultiSelect);
      setOtherInput(newOtherInput);
      setAwaitingOtherInput(newAwaitingOtherInput);
      // console.log(`[EFFECT OnboardingChat] Initialized multiSelect:`, JSON.stringify(newMultiSelect), `otherInput:`, newOtherInput, `awaitingOtherInput:`, newAwaitingOtherInput);
    } else { // Single select step
      setMultiSelect([]);
      if (answerForThisStep && currentStep?.options && currentStep.options.includes('Other') && !currentStep.options.includes(String(answerForThisStep))) {
        setOtherInput(String(answerForThisStep));
        setAwaitingOtherInput(true);
      } else {
        setOtherInput('');
        setAwaitingOtherInput(false);
      }
    }
    // Using currentStep.key makes the dependency more specific if currentStep object identity was an issue.
    // However, with `steps` moved outside, `currentStep` itself should be stable between renders if `stepIndex` hasn't changed.
  }, [currentStep, answers, isEditingSingleField]); // Dependencies

  const updateAnswer = (key, value) => {
    const updatedAnswers = { ...answers, [key]: value };
    setAnswers(updatedAnswers);

    if (isEditingSingleField) {
      navigate('/onboarding/summary', { state: { answers: updatedAnswers } });
    } else {
      if (stepIndex + 1 < steps.length) {
        setStepIndex(stepIndex + 1);
      } else {
        navigate('/onboarding/summary', { state: { answers: updatedAnswers } });
      }
    }
  };

  const handleSingleSelect = (value) => {
    if (value === 'Other' && currentStep.options.includes('Other')) {
      setAwaitingOtherInput(true);
    } else {
      setAwaitingOtherInput(false);
      setOtherInput('');
      updateAnswer(currentStep.key, value);
    }
  };

  const handleOtherSubmit = () => {
    if (otherInput.trim()) {
      updateAnswer(currentStep.key, otherInput.trim());
    } else {
      console.warn("Please specify your 'Other' answer.");
    }
  };

  const handleMultiToggle = (value) => {
    // console.log('[Chat] handleMultiToggle, value:', value, 'Current multiSelect:', JSON.stringify(multiSelect));
    const isCurrentlySelected = multiSelect.includes(value);
    let newMultiSelectState;

    if (isCurrentlySelected) {
        newMultiSelectState = multiSelect.filter(v => v !== value);
        if (value === 'Other') {
            setOtherInput('');
            setAwaitingOtherInput(false);
        }
    } else {
        newMultiSelectState = [...multiSelect, value];
        if (value === 'Other') {
            setAwaitingOtherInput(true); // Show other input if "Other" is selected
        }
    }
    setMultiSelect(newMultiSelectState);
    // console.log('[Chat] handleMultiToggle, newMultiSelectState:', JSON.stringify(newMultiSelectState));
  };

  const handleMultiSubmit = () => {
    let finalSelection = [...multiSelect];
    if (multiSelect.includes('Other') && otherInput.trim()) {
      finalSelection = finalSelection.filter(v => v !== 'Other').concat(otherInput.trim());
    } else if (multiSelect.includes('Other') && !otherInput.trim()) {
      finalSelection = finalSelection.filter(v => v !== 'Other');
    }
    updateAnswer(currentStep.key, finalSelection.length > 0 ? finalSelection : []);
  };

  if (!currentStep) {
    return <div className="p-4">Loading step or step not found...</div>;
  }

  // **IMPORTANT**: Uncomment logs below for debugging if issues persist
  // console.log('[Chat RENDER] currentStep.key:', currentStep?.key, 'isEditingSingleField:', isEditingSingleField);
  // console.log('[Chat RENDER] multiSelect:', JSON.stringify(multiSelect));
  // console.log('[Chat RENDER] otherInput:', otherInput, 'awaitingOtherInput:', awaitingOtherInput);
  
  const isSubmitDisabled = currentStep.multi && (
    multiSelect.length === 0 ||
    (multiSelect.includes('Other') && multiSelect.length === 1 && !otherInput.trim())
  );
  // console.log('[Chat RENDER] Submit button disabled calc:', isSubmitDisabled);

  return (
    <div className="p-4 max-w-xl mx-auto" ref={scrollRef}>
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        {isEditingSingleField ? `Editing: ${currentStep.key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}` : 'Onboarding'}
      </h2>
      <p className="mb-4 text-gray-700">{currentStep.question}</p>

      <div className="space-y-3 bg-white shadow-md rounded-lg p-6">
        {currentStep.multi ? (
          <>
            {currentStep.options.map(opt => (
              <button
                key={opt}
                type="button"
                className={`block w-full text-left px-4 py-3 border rounded-md transition-colors duration-150 ease-in-out
                  ${multiSelect.includes(opt)
                    ? 'bg-blue-600 text-white border-blue-700 shadow-sm ring-2 ring-blue-300'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-800 border-gray-300'
                  }`}
                onClick={() => handleMultiToggle(opt)}
              >
                {opt}
              </button>
            ))}
            {awaitingOtherInput && currentStep.options.includes('Other') && (
              <div className="mt-3">
                <label htmlFor="otherInputMulti" className="block text-sm font-medium text-gray-700 mb-1">
                  Please specify 'Other':
                </label>
                <input
                  id="otherInputMulti"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={otherInput}
                  onChange={e => setOtherInput(e.target.value)}
                  placeholder="Your specific choice"
                  autoFocus
                />
              </div>
            )}
            <button
              type="button"
              className="mt-6 w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-md shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleMultiSubmit}
              disabled={isSubmitDisabled}
            >
              Submit Selection
            </button>
          </>
        ) : awaitingOtherInput ? (
          <>
            <label htmlFor="otherInputSingle" className="block text-sm font-medium text-gray-700 mb-1">
              Please specify for '{currentStep.options.find(opt => opt === "Other") || "Other"}':
            </label>
            <input
              id="otherInputSingle"
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={otherInput}
              onChange={e => setOtherInput(e.target.value)}
              placeholder="Your specific choice"
              autoFocus
            />
            <button
              type="button"
              className="mt-4 w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-md shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleOtherSubmit}
              disabled={!otherInput.trim()}
            >
              Continue
            </button>
          </>
        ) : (
          currentStep.options.map(opt => (
            <button
              key={opt}
              type="button"
              className="block w-full text-left px-4 py-3 border border-gray-300 rounded-md bg-gray-50 hover:bg-gray-100 text-gray-800 shadow-sm transition-colors duration-150 ease-in-out"
              onClick={() => handleSingleSelect(opt)}
            >
              {opt}
            </button>
          ))
        )}
      </div>

      {isEditingSingleField && (
        <button
            type="button"
            onClick={() => navigate('/onboarding/summary', { state: { answers } })}
            className="mt-6 w-full px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md shadow hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors duration-150 ease-in-out"
        >
            Cancel Edit & Return to Summary
        </button>
      )}
    </div>
  );
}
