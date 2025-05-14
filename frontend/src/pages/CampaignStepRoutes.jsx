// CampaignStepRoutes.jsx - Route-driven step flow

import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CampaignContext from '../contexts/CampaignContext';
import EditCampaignClassification from './EditCampaignClassification';
import ConfirmGoals from './ConfirmGoals';
import GoalRanking from './GoalRanking';

function EditClassificationPage() {
  const navigate = useNavigate();
  const { summary, classification, updateClassification } = useContext(CampaignContext);

  const handleNext = (updatedClassification) => {
    updateClassification(updatedClassification);
    navigate('/app/campaign/confirm-goals');
  };

  return <EditCampaignClassification summary={summary} classification={classification} onNext={handleNext} />;
}

function ConfirmGoalsPage() {
  const navigate = useNavigate();
  const { goals, updateGoals } = useContext(CampaignContext);

  const handleConfirm = (confirmedGoals) => {
    updateGoals(confirmedGoals);
    navigate('/app/campaign/rank-goals');
  };

  return <ConfirmGoals initialGoals={goals} onConfirm={handleConfirm} />;
}

function RankGoalsPage() {
  const { goals, updateGoals, saveCampaign } = useContext(CampaignContext);

  const handleRanked = async (rankedGoals) => {
    updateGoals(rankedGoals);
    await saveCampaign();
    // Navigate to confirmation or dashboard
  };

  return <GoalRanking initialGoals={goals} onRankedGoalsChange={handleRanked} />;
}

export { EditClassificationPage, ConfirmGoalsPage, RankGoalsPage };
