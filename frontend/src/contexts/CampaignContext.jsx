// frontend/src/contexts/CampaignContext.jsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import { useToast } from '../components/ui/use-toast';
import { saveCampaignProgress } from '../api/saveCampaignApi';
import { useAuth } from './AuthContext';

const CampaignContext = createContext();

export const useCampaign = () => {
  const ctx = useContext(CampaignContext);
  if (!ctx) {
    throw new Error("useCampaign must be used within a CampaignProvider");
  }
  return ctx;
};

// Define initialMessagingInputs (can be outside the component or imported)
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
  const [campaignId, setCampaignId] = useState(null);
  const [summary, setSummary] = useState(null);
  const [classification, setClassification] = useState(null);
  const [classificationGuess, setClassificationGuess] = useState(null);
  const [goals, setGoals] = useState([]);
  const [messagingInputs, setMessagingInputs] = useState(null); // Initialize as null

  const { toast } = useToast();
  const { user } = useAuth();

  const updateCampaignData = useCallback((data) => {
    console.log("✅ CTX UPDATE: updateCampaignData called with:", data);
    if (data.campaignId !== undefined) setCampaignId(prev => data.campaignId !== prev ? data.campaignId : prev);
    if (data.summary !== undefined) setSummary(prev => data.summary !== prev ? data.summary : prev);
    if (data.classification !== undefined) setClassification(prev => data.classification !== prev ? data.classification : prev);
    if (data.classification_guess !== undefined) setClassificationGuess(prev => data.classification_guess !== prev ? data.classification_guess : prev);
    if (data.goals !== undefined) {
      const formatted = (data.goals || []).map((g, index) => ({
        id: g.id || `temp-goal-${Date.now()}-${index}`,
        label: g.label || (typeof g.id === 'string' ? g.id.replace(/_/g, ' ') : `Goal ${index + 1}`),
        rank: typeof g.rank === 'number' ? g.rank : index + 1,
      }));
      setGoals(prevGoals => JSON.stringify(prevGoals) !== JSON.stringify(formatted) ? formatted : prevGoals);
    }
    // Note: messagingInputs is handled by its own updater
  }, []);

  const resetCampaignData = useCallback(() => {
    console.log("✅ CTX RESET: resetCampaignData called");
    setCampaignId(null);
    setSummary(null);
    setClassification(null);
    setClassificationGuess(null);
    setGoals([]);
    setMessagingInputs(null); // Reset messaging inputs
  }, []);

  const updateMessagingInputs = useCallback((newInputs) => {
    console.log("✅ CTX UPDATE: updateMessagingInputs called with:", newInputs);
    setMessagingInputs(prevInputs => {
      const baseInputs = prevInputs || { ...initialMessagingInputsState, audienceProfile: {...initialMessagingInputsState.audienceProfile}, deliveryContext: {...initialMessagingInputsState.deliveryContext} };
      
      // Deep merge for nested objects
      const updated = {
        ...baseInputs,
        ...newInputs,
        audienceProfile: {
          ...baseInputs.audienceProfile,
          ...(newInputs.audienceProfile || {}),
        },
        deliveryContext: {
          ...baseInputs.deliveryContext,
          ...(newInputs.deliveryContext || {}),
        },
      };
      console.log("✅ CTX UPDATE: messagingInputs updated to:", updated);
      return updated;
    });
  }, []);


  const saveCurrentCampaignState = useCallback(async (currentStepDescription, dataOverride = null) => {
    const currentSummary = dataOverride?.summary ?? summary;
    const currentClassification = dataOverride?.classification ?? classification;
    const currentGoals = dataOverride?.goals ?? goals;
    const currentCampaignId = dataOverride?.campaignId ?? campaignId;
    // We might add messagingInputs to this save logic later if it makes sense
    // For now, it's focused on core campaign definition.

    console.log(`[Save Campaign - ${currentStepDescription}] Attempting to save with:`, {
        summary: currentSummary,
        classification: currentClassification,
        goals: currentGoals,
        campaignId: currentCampaignId
    });

    if (!currentSummary || !currentClassification || !currentGoals) {
      console.warn(`[Save Campaign - ${currentStepDescription}] Essential data missing for save. Summary:`, currentSummary, "Classification:", currentClassification, "Goals:", currentGoals);
      toast({
        variant: "destructive",
        title: "Save Error",
        description: `Cannot save: core data missing for step: ${currentStepDescription}.`,
      });
      return null;
    }
    if (!user) {
      console.warn(`[Save Campaign - ${currentStepDescription}] User not authenticated.`);
    }

    const campaignDataPayload = {
      summary: currentSummary,
      classification: {
        primary_type: currentClassification.primary_type,
        secondary_type: currentClassification.secondary_type,
        use_case: currentClassification.sub_type || currentClassification.use_case,
        type_id: currentClassification.type_id,
        subtype_id: currentClassification.subtype_id,
        id: currentClassification.id
      },
      goals: currentGoals,
      // messaging_inputs: messagingInputs, // Potentially add this later
    };

    try {
      const responseData = await saveCampaignProgress(currentCampaignId, campaignDataPayload);
      console.log(`[Save Campaign - ${currentStepDescription}] Save Response:`, responseData);
      toast({
        title: "Campaign Progress Saved",
        description: `Progress at "${currentStepDescription}" saved. ID: ${responseData.id}`,
      });

      if (responseData.id && (!campaignId || campaignId !== responseData.id)) {
        setCampaignId(responseData.id);
      }
      return responseData.id;
    } catch (error) {
      console.error(`[Save Campaign - ${currentStepDescription}] Error via saveCampaignProgress:`, error);
      toast({
        variant: "destructive",
        title: "Save Error",
        description: error.message || `Failed to save at ${currentStepDescription}.`,
      });
      return null;
    }
  }, [summary, classification, goals, campaignId, user, toast, setCampaignId /* removed messagingInputs from deps for now */]);


  const updateClassificationContext = useCallback((newClassification) => {
    updateCampaignData({ classification: newClassification });
  }, [updateCampaignData]);

  const updateGoalsContext = useCallback((newGoals) => {
    const formattedGoals = (newGoals || []).map((g, index) => ({
      id: g.id || `context-goal-${Date.now()}-${index}`,
      label: g.label || (typeof g.id === 'string' ? g.id.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : `Goal ${index + 1}`),
      rank: typeof g.rank === 'number' ? g.rank : index + 1,
    }));
    updateCampaignData({ goals: formattedGoals });
  }, [updateCampaignData]);

  return (
    <CampaignContext.Provider
      value={{
        campaignId,
        summary,
        classification,
        classificationGuess,
        goals,
        messagingInputs, // ADDED
        initialMessagingInputs: initialMessagingInputsState, // EXPORT initial state for components
        updateCampaignData,
        resetCampaignData,
        updateClassification: updateClassificationContext,
        updateGoals: updateGoalsContext,
        saveCurrentCampaignState,
        updateMessagingInputs, // ADDED
        // resetMessagingInputs, // We can use resetCampaignData which now includes it
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
};

export default CampaignContext;
