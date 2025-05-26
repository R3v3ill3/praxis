// frontend/src/contexts/CampaignContext.jsx
import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { useToast } from '../components/ui/use-toast';
import { saveCampaignProgress } from '../api/saveCampaignApi';
import { useAuth } from './AuthContext'; // Stays the same

const CampaignContext = createContext();

export const useCampaign = () => {
  const ctx = useContext(CampaignContext);
  if (!ctx) {
    throw new Error("useCampaign must be used within a CampaignProvider");
  }
  return ctx;
};

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
  // --- TEMPORARY MOCK DATA ---
  const [campaignId, setCampaignIdInternal] = useState(null); // MODIFIED: Start with null, no mock
  const [summary, setSummary] = useState(null); // MODIFIED: Start with null
  const [classification, setClassification] = useState(null); // MODIFIED: Start with null
  const [goals, setGoals] = useState([]); // MODIFIED: Start with empty
  const [messagingInputs, setMessagingInputs] = useState(JSON.parse(JSON.stringify(initialMessagingInputsState)));
  // --- END TEMPORARY MOCK DATA ---

  const [classificationGuess, setClassificationGuess] = useState(null);
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth(); // MODIFIED: Get 'loading' as 'authLoading'

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
    // MODIFIED: Simplified reset, remove dev-specific mock data re-population here
    // Let it reset to true initial empty/null states
    setCampaignIdInternal(null);
    setSummary(null);
    setClassification(null);
    setClassificationGuess(null);
    setGoals([]);
    setMessagingInputs(JSON.parse(JSON.stringify(initialMessagingInputsState)));
  }, []);

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
    // MODIFIED: Add checks for authLoading and user
    if (authLoading) {
      console.warn("CampaignContext: Auth state still loading. Save operation aborted for step:", currentStepDescription);
      toast({ variant: "destructive", title: "Save Error", description: "Authentication pending, please try again shortly." });
      return null;
    }

    if (!user) {
      console.error("CampaignContext: No authenticated user. Save operation aborted for step:", currentStepDescription);
      toast({ variant: "destructive", title: "Save Error", description: "You must be logged in to save." });
      return null;
    }
    // END MODIFIED CHECKS

    const idFromContext = campaignId;
    const summaryFromContext = summary;
    const classificationFromContext = classification;
    const goalsFromContext = goals;
    const messagingInputsFromContext = messagingInputs;

    const idForPayload = dataOverride?.campaignId ?? idFromContext;
    const summaryForPayload = dataOverride?.summary ?? summaryFromContext;
    const classificationForPayload = dataOverride?.classification ?? classificationFromContext;
    const goalsForPayload = dataOverride?.goals ?? goalsFromContext;
    const messagingInputsForPayload = dataOverride?.messaging_inputs ?? messagingInputsFromContext;

    if (!summaryForPayload || !classificationForPayload || !goalsForPayload || goalsForPayload.length === 0) {
      toast({ variant: "destructive", title: "Save Error", description: `Cannot save: core data (summary, classification, or goals) missing or goals are empty for step: ${currentStepDescription}.` });
      console.error("CTX: Save Error - Missing summary, classification, or non-empty goals:", {idForPayload, summaryForPayload, classificationForPayload, goalsForPayload});
      return null;
    }
    
    const finalMessagingInputsForPayload = typeof messagingInputsForPayload === 'object' && messagingInputsForPayload !== null
                                   ? messagingInputsForPayload
                                   : initialMessagingInputsState;

    const campaignDataForApi = {
      summary: summaryForPayload,
      classification: classificationForPayload,
      goals: goalsForPayload,
      messaging_inputs: finalMessagingInputsForPayload,
    };
    
    console.log(`CTX: Calling saveCampaignProgress for user ${user.uid} with ID:`, idForPayload, "and data:", campaignDataForApi, "for step:", currentStepDescription);

    try {
      const responseData = await saveCampaignProgress(idForPayload, campaignDataForApi); 
      const confirmedCampaignId = responseData.id;

      toast({ title: "Campaign Progress Saved", description: `${currentStepDescription}. ID: ${confirmedCampaignId}` });

      if (confirmedCampaignId && (idFromContext !== confirmedCampaignId || idFromContext === null)) {
        console.log(`CTX: Updating campaignId in context state from ${idFromContext} to ${confirmedCampaignId}`);
        setCampaignIdInternal(confirmedCampaignId);
      }
      
      const fullCampaignDataForLocalStorage = {
        id: confirmedCampaignId,
        summary: summaryForPayload,
        classification: classificationForPayload,
        goals: goalsForPayload,
        messaging_inputs: finalMessagingInputsForPayload,
      };

      const localStorageKey = `campaign-${confirmedCampaignId}`;
      localStorage.setItem(localStorageKey, JSON.stringify(fullCampaignDataForLocalStorage));
      console.log(`CTX: Successfully saved campaign data to localStorage with key: ${localStorageKey}`, fullCampaignDataForLocalStorage);

      return confirmedCampaignId;
    } catch (error) {
      toast({ variant: "destructive", title: "Save Error", description: error.message || `Failed to save ${currentStepDescription}.`});
      console.error("CTX: Save Error:", error);
      return null;
    }
  }, [
    campaignId, 
    summary, 
    classification, 
    goals, 
    messagingInputs, 
    user, // user is now explicitly checked
    authLoading, // MODIFIED: Add authLoading as a dependency
    toast,
  ]);

  const initialMessagingInputsForContext = useMemo(() => JSON.parse(JSON.stringify(initialMessagingInputsState)), []);

  return (
    <CampaignContext.Provider
      value={{
        campaignId,
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
