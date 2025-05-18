// frontend/src/pages/CampaignStepRoutes.jsx
import React, { useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import CampaignContext from '../contexts/CampaignContext'; // Ensure path is correct
import EditCampaignClassificationComponent from './EditCampaignClassification'; // The actual UI component
import ConfirmGoalsComponent from './ConfirmGoals'; // The actual UI component
import GoalRankingComponent from './GoalRanking';   // The actual UI component
import { useToast } from '../components/ui/use-toast'; // Ensure path is correct

// Helper to check if core context functions are available
const checkContextFunctions = (ctx, functionsNeeded = []) => {
    if (!ctx) {
        console.error("Context check failed: Context itself is null/undefined.");
        return false;
    }
    for (const funcName of functionsNeeded) {
        if (typeof ctx[funcName] !== 'function') {
            console.error(`Context Error: Function '${funcName}' is missing or not a function in CampaignContext.`);
            return false;
        }
    }
    return true;
};

export function EditClassificationPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const campaignCtx = useContext(CampaignContext);

  useEffect(() => {
    if(campaignCtx) {
      console.log("EditClassificationPage Mounted/Ctx Updated - Context State:", {
        summary: campaignCtx.summary, classification: campaignCtx.classification, campaignId: campaignCtx.campaignId, goalsLength: campaignCtx.goals?.length
      });
       if (!campaignCtx.summary) {
           console.warn("EditClassificationPage: Context 'summary' is missing on mount. User may need to restart flow.");
           // Consider redirecting if summary is absolutely essential to render this page
           // if (!campaignCtx.summary && window.location.pathname !== '/app/campaign/new') {
           //   toast({ variant: "destructive", title: "State Error", description: "Campaign summary is missing. Redirecting to start.", duration: 4000 });
           //   navigate('/app/campaign/new');
           // }
       }
    } else { console.error("EditClassificationPage: campaignCtx is NULL on mount/update."); }
  }, [campaignCtx, toast, navigate]);

  if (!campaignCtx) {
      console.error("EditClassificationPage: CampaignContext is critically unavailable at render.");
      return <p>Error: Campaign context loading or unavailable. Please try refreshing or starting over.</p>;
  }
  
  const { summary, classification, classificationGuess, updateClassification, saveCurrentCampaignState, campaignId, goals: contextGoals } = campaignCtx;

  const handleNext = useCallback(async (updatedClassificationFromForm) => {
    console.log("EditClassificationPage: handleNext called with form data:", updatedClassificationFromForm);
    if (!checkContextFunctions(campaignCtx, ['updateClassification', 'saveCurrentCampaignState'])) {
      toast({ variant: "destructive", title: "Context Error", description: "Critical context functions are missing." }); return;
    }
    
    updateClassification(updatedClassificationFromForm); // Update context state for classification

    if (!summary || !contextGoals) { // Ensure summary and goals (from context) are present for the save payload
      console.error("EditClassificationPage: Attempting to save, but summary or contextGoals are missing from context.", { summary, contextGoals });
      toast({ variant: "destructive", title: "Save Error", description: "Missing campaign summary or goals for saving." });
      return;
    }
    const dataToSave = { summary, classification: updatedClassificationFromForm, goals: contextGoals, campaignId };
    console.log("EditClassificationPage: Data for save:", dataToSave);

    const savedId = await saveCurrentCampaignState("Edit Classification Confirmed", dataToSave);
    if (!savedId) { 
        toast({ variant: "destructive", title: "Save Failed", description: "Could not save classification changes." }); 
        return; 
    }
    console.log("EditClassificationPage: Save successful, navigating to confirm-goals.");
    navigate('/app/campaign/confirm-goals');
  }, [campaignCtx, summary, updateClassification, saveCurrentCampaignState, campaignId, contextGoals, navigate, toast]);

  const classificationForEditor = classification || classificationGuess || null;
  return <EditCampaignClassificationComponent initialSummary={summary} initialClassification={classificationForEditor} onNext={handleNext} />;
}

export function ConfirmGoalsPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const campaignCtx = useContext(CampaignContext);

  useEffect(() => {
    if(campaignCtx) {
      console.log("ConfirmGoalsPage Mounted/Ctx Updated - Context State:", {
        summary: campaignCtx.summary, classification: campaignCtx.classification, goalsLen: campaignCtx.goals?.length, campaignId: campaignCtx.campaignId
      });
      if (!campaignCtx.summary || !campaignCtx.classification) {
           console.warn("ConfirmGoalsPage: Context 'summary' or 'classification' is missing on mount.");
           // Consider redirecting
       }
    } else { console.error("ConfirmGoalsPage: campaignCtx is NULL on mount/update."); }
  }, [campaignCtx, toast, navigate]);

  if (!campaignCtx) {
    console.error("ConfirmGoalsPage: CampaignContext is critically unavailable at render.");
    return <p>Error: Campaign context loading or unavailable.</p>;
  }
  const { summary, classification, goals: contextGoalsFromCtx, updateGoals, saveCurrentCampaignState, campaignId } = campaignCtx;

  const handleConfirm = useCallback(async (confirmedGoalsFromForm) => {
    console.log("ConfirmGoalsPage: handleConfirm called with form data:", confirmedGoalsFromForm);
    if (!checkContextFunctions(campaignCtx, ['updateGoals', 'saveCurrentCampaignState'])) {
      toast({ variant: "destructive", title: "Context Error", description: "Critical context functions missing." }); return;
    }
    updateGoals(confirmedGoalsFromForm); // This updates context.goals

    if (!summary || !classification) { // Ensure summary and classification (from context) are present
      console.error("ConfirmGoalsPage: Attempting to save, but summary or classification are missing from context.", { summary, classification });
      toast({ variant: "destructive", title: "Save Error", description: "Missing campaign summary or classification for saving goals." });
      return;
    }
    const dataToSave = { summary, classification, goals: confirmedGoalsFromForm, campaignId };
    console.log("ConfirmGoalsPage: Data for save:", dataToSave);

    const savedId = await saveCurrentCampaignState("Goal Selection Confirmed", dataToSave);
    if (!savedId) { 
        toast({ variant: "destructive", title: "Save Failed", description: "Could not save goal selection." }); 
        return; 
    }
    console.log("ConfirmGoalsPage: Save successful, navigating to rank-goals.");
    navigate('/app/campaign/rank-goals');
  }, [campaignCtx, summary, classification, updateGoals, saveCurrentCampaignState, campaignId, navigate, toast]);

  return <ConfirmGoalsComponent initialGoals={contextGoalsFromCtx || []} onConfirm={handleConfirm} />;
}

export function RankGoalsPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const campaignCtx = useContext(CampaignContext);

  useEffect(() => {
    if (campaignCtx) {
      console.log("RankGoalsPage Mounted/Ctx Updated - Context State:", {
        summary: campaignCtx.summary, classification: campaignCtx.classification, goalsLength: campaignCtx.goals?.length, campaignId: campaignCtx.campaignId
      });
      if (!campaignCtx.summary) {
        console.error("RankGoalsPage: CRITICAL - Summary is missing from context on mount!");
        // toast({ variant: "destructive", title: "State Error", description: "Campaign summary is missing. Cannot proceed.", duration: 7000 });
        // navigate('/app/campaign/new'); 
      }
    } else {
      console.error("RankGoalsPage: campaignCtx is NULL on mount/update.");
    }
  }, [campaignCtx, toast, navigate]);

  if (!campaignCtx) {
    console.error("RankGoalsPage: CampaignContext is critically unavailable at render.");
    return <p>Error: Campaign context loading or unavailable.</p>;
  }

  const { summary, classification, goals: contextGoalsFromCtx, updateGoals, saveCurrentCampaignState, campaignId } = campaignCtx;

  const handleRankedAndSave = useCallback(async (finalRankedGoalsFromComponent) => {
    console.log("RankGoalsPage: handleRankedAndSave triggered with finalRankedGoals:", finalRankedGoalsFromComponent);
    if (!checkContextFunctions(campaignCtx, ['updateGoals', 'saveCurrentCampaignState'])) {
      toast({ variant: "destructive", title: "Context Error", description: "Critical context functions missing for ranking save." });
      return;
    }
    updateGoals(finalRankedGoalsFromComponent);

    if (!summary || !classification) {
      console.error("RankGoalsPage: Critical data (summary or classification) missing from context for save.", { summary, classification });
      toast({ variant: "destructive", title: "Save Error", description: "Missing summary or classification for saving ranked goals." });
      return;
    }
    const dataToSave = { summary, classification, goals: finalRankedGoalsFromComponent, campaignId };
    console.log("RankGoalsPage: Data being passed to saveCurrentCampaignState:", dataToSave);

    const savedId = await saveCurrentCampaignState("Goal Reordering Confirmed", dataToSave);

    if (savedId) {
      toast({ title: "Campaign Goals Ranked!", description: "Goal ranking has been saved successfully." });
      console.log("RankGoalsPage: Save successful. campaignCtx.summary JUST BEFORE navigating:", campaignCtx.summary);
      console.log("RankGoalsPage: campaignCtx.campaignId JUST BEFORE navigating:", campaignCtx.campaignId);

      if (!campaignCtx.summary || !campaignCtx.campaignId) {
          console.error("RankGoalsPage: CRITICAL ERROR - Summary or Campaign ID in context became null/undefined AFTER save but BEFORE navigating!");
          toast({variant: "destructive", title: "State Error", description: "Critical campaign data was lost unexpectedly. Please try again.", duration: 7000});
          return; 
      }
      navigate(`/app/campaign/next-steps-summary`);
    } else {
       toast({ variant: "destructive", title: "Save Failed", description: "Could not save final goal ranking. Please try again." });
    }
  }, [campaignCtx, summary, classification, updateGoals, saveCurrentCampaignState, campaignId, navigate, toast]);
  
  if (!contextGoalsFromCtx || contextGoalsFromCtx.length === 0) {
      console.warn("RankGoalsPage: No goals in context to rank. User might have jumped here or an error occurred previously.");
  }

  return <GoalRankingComponent initialGoals={contextGoalsFromCtx || []} onRankedGoalsChange={handleRankedAndSave} />;
}
