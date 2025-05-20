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
  const [campaignId, setCampaignIdInternal] = useState("test-campaign-id-direct-messaging"); // Renamed to avoid conflict in saveCurrentCampaignState
  const [summary, setSummary] = useState({
    purpose: "Direct Test: Fight for Fair Wages",
    location: "Direct Test: NSW Health",
    audience: "Direct Test: Nurses and Hospital Staff",
    intent: "Direct Test: Negotiate a better enterprise agreement",
    target: "Direct Test: NSW Labor Government",
    problem: "Direct Test: Stagnant wages and poor conditions",
    proposedChange: "Direct Test: Implement a 15% pay rise and improved staffing ratios"
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
  const [messagingInputs, setMessagingInputs] = useState(JSON.parse(JSON.stringify(initialMessagingInputsState)));
  // --- END TEMPORARY MOCK DATA ---

  const [classificationGuess, setClassificationGuess] = useState(null);
  const { toast } = useToast();
  const { user } = useAuth();

  const updateCampaignData = useCallback((data) => {
    console.log("✅ CTX UPDATE: updateCampaignData called with:", data);
    if (data.campaignId !== undefined) setCampaignIdInternal(prev => data.campaignId !== prev ? data.campaignId : prev);
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
  }, []);

  const resetCampaignData = useCallback(() => {
    console.log("✅ CTX RESET: resetCampaignData called");
    if (process.env.NODE_ENV === 'development' && campaignId === "test-campaign-id-direct-messaging") {
        setCampaignIdInternal("test-campaign-id-direct-messaging");
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
        setCampaignIdInternal(null);
        setSummary(null);
        setClassification(null);
        setClassificationGuess(null);
        setGoals([]);
        setMessagingInputs(JSON.parse(JSON.stringify(initialMessagingInputsState)));
    }
  }, [campaignId]);

  const updateMessagingInputs = useCallback((newInputsFromChat) => {
    console.log("CTX: updateMessagingInputs called with:", newInputsFromChat);
    setMessagingInputs(prev => {
      const updated = { ...prev, ...newInputsFromChat };
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

  const saveCurrentCampaignState = useCallback(async (currentStepDescription, dataOverride = null) => {
    // Get current state values from context for preparing the data
    const idFromContext = campaignId; // This is the 'campaignId' from context's useState
    const summaryFromContext = summary;
    const classificationFromContext = classification;
    const goalsFromContext = goals;
    const messagingInputsFromContext = messagingInputs;

    // Determine the values to use for saving, preferring dataOverride if provided
    const idForPayload = dataOverride?.campaignId ?? idFromContext;
    const summaryForPayload = dataOverride?.summary ?? summaryFromContext;
    const classificationForPayload = dataOverride?.classification ?? classificationFromContext;
    const goalsForPayload = dataOverride?.goals ?? goalsFromContext;
    const messagingInputsForPayload = dataOverride?.messaging_inputs ?? messagingInputsFromContext;

//    if (!idForPayload || !summaryForPayload || !classificationForPayload || !goalsForPayload) {
//      toast({ variant: "destructive", title: "Save Error", description: `Cannot save: core data (ID, summary, classification, or goals) missing for step: ${currentStepDescription}.` });
//      console.error("CTX: Save Error - Missing core data", {idForPayload, summaryForPayload, classificationForPayload, goalsForPayload});
    if (!summaryForPayload || !classificationForPayload || !goalsForPayload || goalsForPayload.length === 0) {
      toast({ variant: "destructive", title: "Save Error", description: `Cannot save: core data (summary, classification, or goals) missing or goals are empty for step: ${currentStepDescription}.` });
      console.error("CTX: Save Error - Missing summary, classification, or non-empty goals:", {idForPayload, summaryForPayload, classificationForPayload, goalsForPayload});
      return null;
    }
    
    const finalMessagingInputsForPayload = typeof messagingInputsForPayload === 'object' && messagingInputsForPayload !== null
                                   ? messagingInputsForPayload
                                   : initialMessagingInputsState;

    const campaignDataForApi = { // This is the 'data' argument for saveCampaignProgress
      summary: summaryForPayload,
      classification: classificationForPayload,
      goals: goalsForPayload,
      messaging_inputs: finalMessagingInputsForPayload,
    };
    
    console.log("CTX: Calling saveCampaignProgress with ID:", idForPayload, "and data:", campaignDataForApi, "for step:", currentStepDescription);

    try {
      // saveCampaignProgress now correctly sends 'campaignId: idForPayload' in its body
      const responseData = await saveCampaignProgress(idForPayload, campaignDataForApi); 
      
      const confirmedCampaignId = responseData.id; // ID confirmed by the backend

      toast({ title: "Campaign Progress Saved", description: `${currentStepDescription}. ID: ${confirmedCampaignId}` });

      // --- START OF MODIFIED/ADDED SECTION ---

      // 1. Update CampaignContext's internal 'campaignId' state if the confirmed ID is different
      //    or if the context's campaignId was initially null.
      if (confirmedCampaignId && (idFromContext !== confirmedCampaignId || idFromContext === null)) {
        console.log(`CTX: Updating campaignId in context state from ${idFromContext} to ${confirmedCampaignId}`);
        setCampaignIdInternal(confirmedCampaignId); // Use the internal setter for campaignId state
      }
      
      // 2. Prepare the complete data object to store in localStorage
      const fullCampaignDataForLocalStorage = {
        id: confirmedCampaignId, // CRITICAL: Use the ID confirmed by the backend
        summary: summaryForPayload,
        classification: classificationForPayload,
        goals: goalsForPayload,
        messaging_inputs: finalMessagingInputsForPayload,
        // Include any other parts of the campaign state that MessagingGuidePage might need
        // For instance, if 'classificationGuess' is also managed by context and needed later:
        // classificationGuess: classificationGuess, // (Make sure classificationGuess is in scope or fetched similarly)
      };

      // 3. Save to localStorage using the confirmedCampaignId
      const localStorageKey = `campaign-${confirmedCampaignId}`;
      localStorage.setItem(localStorageKey, JSON.stringify(fullCampaignDataForLocalStorage));
      console.log(`CTX: Successfully saved campaign data to localStorage with key: ${localStorageKey}`, fullCampaignDataForLocalStorage);

      // --- END OF MODIFIED/ADDED SECTION ---

      return confirmedCampaignId; // Return the ID that was saved/confirmed
    } catch (error) {
      toast({ variant: "destructive", title: "Save Error", description: error.message || `Failed to save ${currentStepDescription}.`});
      console.error("CTX: Save Error:", error);
      return null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    campaignId, // This is the 'campaignId' from context state (now set by setCampaignIdInternal)
    summary, 
    classification, 
    goals, 
    messagingInputs, 
    user, // Make sure 'user' is actually used or remove if not a dependency for this specific callback
    toast, 
    // updateCampaignData is removed as setCampaignIdInternal is used directly
    // initialMessagingInputsState (if it were used directly for defaults within the callback)
  ]);

  const initialMessagingInputsForContext = useMemo(() => JSON.parse(JSON.stringify(initialMessagingInputsState)), []);

  return (
    <CampaignContext.Provider
      value={{
        campaignId, // Expose the campaignId state
        summary,
        classification,
        classificationGuess,
        goals,
        messagingInputs,
        initialMessagingInputs: initialMessagingInputsForContext,
        updateCampaignData,
        resetCampaignData,
        updateClassificationContext: (newClassification) => updateCampaignData({ classification: newClassification }),
        updateGoalsContext: (newGoals) => updateCampaignData({ goals: newGoals }),
        saveCurrentCampaignState,
        updateMessagingInputs,
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
};

export default CampaignContext;
