// frontend/src/contexts/CampaignContext.jsx
import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { useToast } from '../components/ui/use-toast'; // Adjust path as needed
import { saveCampaignProgress } from '../api/saveCampaignApi'; // Ensure this path is correct
import { useAuth } from './AuthContext'; // Ensure this path is correct

const CampaignContext = createContext();

export const useCampaign = () => {
  const ctx = useContext(CampaignContext);
  if (!ctx) {
    throw new Error("useCampaign must be used within a CampaignProvider");
  }
  return ctx;
};

// This should be the single source of truth for the initial structure
const initialMessagingInputsState = {
  issueName: '',
  proposedChange: '',
  geographicContext: '',
  desiredOutcome: '',
  primaryAudience: '',
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
};

export const CampaignProvider = ({ children }) => {
  // --- START TEMPORARY MOCK DATA FOR DIRECT TESTING ---
  // TODO: Remove/comment out these initializations for production/full app flow
  const [campaignId, setCampaignId] = useState("test-campaign-id-direct-messaging");
  const [summary, setSummary] = useState({
    purpose: "Direct Test: Fight for Fair Wages",
    location: "Direct Test: NSW Health",
    audience: "Direct Test: Nurses and Hospital Staff",
    intent: "Direct Test: Negotiate a better enterprise agreement",
    target: "Direct Test: NSW Labor Government",
    problem: "Direct Test: Stagnant wages and poor conditions",
    proposedChange: "Direct Test: Implement a 15% pay rise and improved staffing ratios" // Added for pre-filling
  });
  const [classification, setClassification] = useState({
    primary_type: "Workplace & Union",
    secondary_type: "Industrial Action",
    use_case: "Enterprise Bargaining",
    type_id: "workplace_union",
    subtype_id: "workplace_union_industrial_action",
    id: "wu_ia_eb"
  });
  const [goals, setGoals] = useState([
    { id: "goal1_direct", label: "Achieve a 15% pay rise", rank: 1 },
    { id: "goal2_direct", label: "Improve staffing ratios", rank: 2 },
    { id: "goal3_direct", label: "secure government funding", rank: 3 },
  ]);
  // Initialize messagingInputs with the structured default, not null
  const [messagingInputs, setMessagingInputs] = useState(JSON.parse(JSON.stringify(initialMessagingInputsState)));
  // --- END TEMPORARY MOCK DATA ---

  // Original state initializations (commented out if mocks are active)
  // const [campaignId, setCampaignId] = useState(null);
  // const [summary, setSummary] = useState(null);
  // const [classification, setClassification] = useState(null);
  // const [goals, setGoals] = useState([]);
  // const [messagingInputs, setMessagingInputs] = useState(JSON.parse(JSON.stringify(initialMessagingInputsState)));


  const [classificationGuess, setClassificationGuess] = useState(null);
  const { toast } = useToast();
  const { user } = useAuth(); // Assuming user is for auth, not directly for campaign data loading here

  const updateCampaignData = useCallback((data) => {
    console.log("✅ CTX UPDATE: updateCampaignData called with:", data);
    if (data.campaignId !== undefined) setCampaignId(prev => data.campaignId !== prev ? data.campaignId : prev);
    if (data.summary !== undefined) setSummary(prev => JSON.stringify(data.summary) !== JSON.stringify(prev) ? data.summary : prev);
    if (data.classification !== undefined) setClassification(prev => JSON.stringify(data.classification) !== JSON.stringify(prev) ? data.classification : prev);
    if (data.classification_guess !== undefined) setClassificationGuess(prev => data.classification_guess !== prev ? data.classification_guess : prev);
    if (data.goals !== undefined) {
      const formatted = (data.goals || []).map((g, index) => ({
        id: g.id || `temp-goal-${Date.now()}-${index}`,
        label: g.label || (typeof g.id === 'string' ? g.id.replace(/_/g, ' ') : `Goal ${index + 1}`),
        rank: typeof g.rank === 'number' ? g.rank : index + 1,
      }));
      setGoals(prevGoals => JSON.stringify(prevGoals) !== JSON.stringify(formatted) ? formatted : prevGoals);
    }
    // messagingInputs is updated separately by updateMessagingInputs
  }, []);

  const resetCampaignData = useCallback(() => {
    console.log("✅ CTX RESET: resetCampaignData called");
    // Re-apply mocks if in test mode, otherwise clear
    if (process.env.NODE_ENV === 'development' && campaignId === "test-campaign-id-direct-messaging") {
        setCampaignId("test-campaign-id-direct-messaging");
        setSummary({
            purpose: "Direct Test: Fight for Fair Wages", location: "Direct Test: City Hospital",
            audience: "Direct Test: Nurses and Hospital Staff", intent: "Direct Test: Negotiate a better enterprise agreement",
            target: "Direct Test: Hospital Management/Board", problem: "Direct Test: Stagnant wages and poor conditions",
            proposedChange: "Direct Test: Implement a 15% pay rise and improved staffing ratios"
        });
        setClassification({
            primary_type: "Workplace & Union", secondary_type: "Industrial Action", use_case: "Enterprise Bargaining",
            type_id: "workplace_union", subtype_id: "workplace_union_industrial_action", id: "wu_ia_eb"
        });
        setGoals([
            { id: "goal1_direct", label: "Achieve a 6% pay rise", rank: 1 },
            { id: "goal2_direct", label: "Improve staffing ratios", rank: 2 },
            { id: "goal3_direct", label: "Increase union membership", rank: 3 },
        ]);
        setMessagingInputs(JSON.parse(JSON.stringify(initialMessagingInputsState)));
    } else {
        setCampaignId(null);
        setSummary(null);
        setClassification(null);
        setClassificationGuess(null);
        setGoals([]);
        setMessagingInputs(JSON.parse(JSON.stringify(initialMessagingInputsState)));
    }
  }, [campaignId]); // Include campaignId to check if it's in mock mode

  // This function will be called by MessagingDevelopmentChatPage to update the context
  const updateMessagingInputs = useCallback((newInputsFromChat) => {
    console.log("CTX: updateMessagingInputs called with:", newInputsFromChat);
    // newInputsFromChat should be the complete, updated knownInputs object from the chat
    setMessagingInputs(prev => {
      // Perform a deep merge to be safe, ensuring all nested structures are preserved
      // This simple spread might not be deep enough if newInputsFromChat is partial,
      // but if it's the full object from the backend, it should be okay.
      // For safety, a deep merge function would be better if newInputsFromChat could be partial.
      const updated = { ...prev, ...newInputsFromChat };
      // Ensure nested objects are also spread if newInputsFromChat has them
      if (newInputsFromChat.audienceProfile) {
        updated.audienceProfile = { ...prev.audienceProfile, ...newInputsFromChat.audienceProfile };
      }
      if (newInputsFromChat.deliveryContext) {
        updated.deliveryContext = { ...prev.deliveryContext, ...newInputsFromChat.deliveryContext };
      }
      console.log("CTX: messagingInputs state after update:", updated);
      return updated;
    });
  }, []);

  // Adapted to include messaging_inputs
  // `dataOverride` allows passing the most current data directly, e.g., from chat completion
  const saveCurrentCampaignState = useCallback(async (currentStepDescription, dataOverride = null) => {
    const currentCampaignId = dataOverride?.campaignId ?? campaignId;
    const currentSummary = dataOverride?.summary ?? summary;
    const currentClassification = dataOverride?.classification ?? classification;
    const currentGoals = dataOverride?.goals ?? goals;
    // Use messagingInputs from dataOverride if provided (e.g. final state from chat), else from context state
    const currentMessagingInputs = dataOverride?.messaging_inputs ?? messagingInputs;

    if (!currentCampaignId || !currentSummary || !currentClassification || !currentGoals) {
      toast({ variant: "destructive", title: "Save Error", description: `Cannot save: core data (ID, summary, classification, or goals) missing for step: ${currentStepDescription}.` });
      console.error("Save Error: Missing core data", {currentCampaignId, currentSummary, currentClassification, currentGoals});
      return null;
    }
     // Ensure messaging_inputs is always an object, even if empty (though it should be populated by chat)
     const finalMessagingInputs = typeof currentMessagingInputs === 'object' && currentMessagingInputs !== null
                                   ? currentMessagingInputs
                                   : initialMessagingInputsState;


    const campaignDataPayload = {
      summary: currentSummary,
      classification: currentClassification, // Ensure this is the complete classification object
      goals: currentGoals,
      messaging_inputs: finalMessagingInputs, // Include messaging_inputs
    };
    console.log("CTX: Saving campaign state with payload:", campaignDataPayload, "for step:", currentStepDescription);

    try {
      const responseData = await saveCampaignProgress(currentCampaignId, campaignDataPayload);
      toast({ title: "Campaign Progress Saved", description: `${currentStepDescription}. ID: ${responseData.id}` });
      if (responseData.id && (!campaignId || campaignId !== responseData.id)) {
        // Only update campaignId from context if it was null before or changed.
        // This prevents overwriting a mock ID if saveCampaignProgress generates a new one
        // unless that's the desired behavior (e.g., first real save).
        // updateCampaignData({ campaignId: responseData.id });
      }
      return responseData.id; // Return the ID that was saved/confirmed
    } catch (error) {
      toast({ variant: "destructive", title: "Save Error", description: error.message || `Failed to save ${currentStepDescription}.`});
      console.error("CTX: Save Error:", error);
      return null;
    }
  }, [campaignId, summary, classification, goals, messagingInputs, user, toast, updateCampaignData]); // Added messagingInputs

  // Memoize initialMessagingInputs to prevent unnecessary re-renders if CampaignProvider re-renders
  const initialMessagingInputsForContext = useMemo(() => JSON.parse(JSON.stringify(initialMessagingInputsState)), []);


  return (
    <CampaignContext.Provider
      value={{
        campaignId,
        summary,
        classification,
        classificationGuess,
        goals,
        messagingInputs, // Provide current messagingInputs
        initialMessagingInputs: initialMessagingInputsForContext, // Provide the static initial structure
        updateCampaignData,
        resetCampaignData,
        updateClassificationContext: (newClassification) => updateCampaignData({ classification: newClassification }), // Simplified
        updateGoalsContext: (newGoals) => updateCampaignData({ goals: newGoals }), // Simplified
        saveCurrentCampaignState, // This now includes messaging_inputs logic
        updateMessagingInputs, // Expose this for the chat page
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
};

export default CampaignContext;
