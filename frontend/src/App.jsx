// frontend/src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import OnboardingChat from './pages/OnboardingChat';
import OnboardingSummary from './pages/OnboardingSummary';
import Dashboard from './pages/Dashboard';
// Use the MINIMAL CampaignBuilder for this test!
import CampaignBuilder from './pages/CampaignBuilder';
import CampaignPlan from './pages/CampaignPlan';
import CampaignMessagingGuide from './pages/CampaignMessagingGuide';
import CampaignReviewSave from './pages/CampaignReviewSave';
import {
  EditClassificationPage,
  ConfirmGoalsPage,
  RankGoalsPage
} from './pages/CampaignStepRoutes';
import ContentGenerator from './pages/ContentGenerator';

export default function App() {
  // Log when App component itself renders
  console.log("--- Rendering App Component (Router Setup) ---");

  return (
    <> {/* Using Fragment to allow logging */}
      {/* Log right before the Routes component */}
      {console.log("--- App.jsx: Before <Routes> ---")}
      <Routes>
        {/* Public access */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Onboarding */}
        <Route path="/onboarding" element={<OnboardingChat />} />
        <Route path="/onboarding/summary" element={<OnboardingSummary />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Campaign creation flow */}
        <Route
          path="/app/campaign/new"
          element={
            // Log when this specific route element is being evaluated
            <>
              {console.log("--- App.jsx: Matched /app/campaign/new, evaluating element... ---")}
              <CampaignBuilder /> {/* Still using the MINIMAL version */}
            </>
          }
        />
        <Route path="/app/campaign/plan" element={<CampaignPlan />} />
        <Route path="/app/campaign/message" element={<CampaignMessagingGuide />} />
        <Route path="/campaign/review" element={<CampaignReviewSave />} />
        <Route path="/campaign/content" element={<ContentGenerator />} />
              <Route path="/app/campaign/edit-classification" element={<EditClassificationPage />} />
        <Route path="/app/campaign/confirm-goals" element={<ConfirmGoalsPage />} />
        <Route path="/app/campaign/rank-goals" element={<RankGoalsPage />} />
        </Routes>
      {/* Log right after the Routes component */}
      {console.log("--- App.jsx: After <Routes> ---")}
    </>
  );
}
