// frontend/src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// Common Pages
import LandingPage from './pages/LandingPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

// Onboarding Pages
import OnboardingChat from './pages/OnboardingChat';
import OnboardingSummary from './pages/OnboardingSummary';

// Campaign Creation Flow Pages
import CampaignBuilder from './pages/CampaignBuilder';
import {
  EditClassificationPage,
  ConfirmGoalsPage,
  RankGoalsPage
} from './pages/CampaignStepRoutes';
import CampaignNextStepsPage from './pages/CampaignNextSteps';

// Other Campaign Related Pages
import CampaignPlan from './pages/CampaignPlan';
// import CampaignMessagingGuide from './pages/CampaignMessagingGuide'; // Old one, if different
import ContentGenerator from './pages/ContentGenerator';
import MessagingDevelopmentChatPage from './pages/MessagingDevelopmentChatPage';
import MessagingGuidePage from './pages/MessagingGuidePage'; // <<< IMPORT THE NEW PAGE
import CampaignReviewSave from './pages/CampaignReviewSave';
import MockScenarioGeneratorPage from './pages/MockScenarioGeneratorPage';
import ActionPlanPage from './pages/ActionPlanPage';

// Simple ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <div>Loading authentication state...</div>;
  }
  if (!user) {
    console.log("ProtectedRoute: User not authenticated, redirecting to login.");
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default function App() {
  console.log("--- Rendering App Component (Router Setup) ---");
  return (
    <>
      {console.log("--- App.jsx: Before <Routes> ---")}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Onboarding */}
        <Route path="/onboarding" element={<ProtectedRoute><OnboardingChat /></ProtectedRoute>} />
        <Route path="/onboarding/summary" element={<ProtectedRoute><OnboardingSummary /></ProtectedRoute>} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        
        {/* Campaign Creation & Development Flow */}
        <Route path="/app/campaign/new" element={<ProtectedRoute><CampaignBuilder /></ProtectedRoute>} />
        <Route path="/app/campaign/edit-classification" element={<ProtectedRoute><EditClassificationPage /></ProtectedRoute>} />
        <Route path="/app/campaign/confirm-goals" element={<ProtectedRoute><ConfirmGoalsPage /></ProtectedRoute>} />
        <Route path="/app/campaign/rank-goals" element={<ProtectedRoute><RankGoalsPage /></ProtectedRoute>} />
        <Route path="/app/campaign/next-steps-summary" element={<ProtectedRoute><CampaignNextStepsPage /></ProtectedRoute>} />
        <Route path="/app/campaign/:campaignId/action-plan" element={<ActionPlanPage />} />

        {/* Messaging Development */}
        <Route path="/app/campaign/develop-messaging" element={<ProtectedRoute><MessagingDevelopmentChatPage /></ProtectedRoute>} />
        {/* The route from MessagingDevelopmentChatPage button:
          onClick={() => navigate(`/app/campaign/${campaignId}/messaging-guide`)}
          This needs to match the path below, including the campaignId parameter.
        */}
        <Route 
          path="/app/campaign/:campaignId/messaging-guide" // <<< ADDED THIS ROUTE
          element={<ProtectedRoute><MessagingGuidePage /></ProtectedRoute>} 
        />
        
        <Route
          path="/app/dev/scenario" // Or any path you prefer
          element={<ProtectedRoute><MockScenarioGeneratorPage /></ProtectedRoute>}
        />
        {/* Other existing campaign routes */}
        <Route path="/app/campaign/plan" element={<ProtectedRoute><CampaignPlan /></ProtectedRoute>} />
        {/* <Route path="/app/campaign/message" element={<ProtectedRoute><CampaignMessagingGuide /></ProtectedRoute>} /> */}
        {/* The above /app/campaign/message route might be an old one.
            If CampaignMessagingGuide is the same as MessagingGuidePage, you might remove one.
            For now, I've added the new specific one. Your navigation from the chat page
            uses /app/campaign/:campaignId/messaging-guide, so that's the one we've added.
        */}
        
        <Route path="/campaign/review" element={<ProtectedRoute><CampaignReviewSave /></ProtectedRoute>} /> 
        <Route path="/campaign/content" element={<ProtectedRoute><ContentGenerator /></ProtectedRoute>} />

        <Route path="*" element={
          <div>
            <h2>404 - Page Not Found (React Router)</h2>
            <p>The page you are looking for does not exist within the React application.</p>
          </div>
        } />
      </Routes>
      {console.log("--- App.jsx: After <Routes> ---")}
    </>
  );
}
