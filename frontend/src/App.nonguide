// frontend/src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// Common Pages
import LandingPage from './pages/LandingPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

// Onboarding Pages (ensure these components are correctly imported)
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
import CampaignMessagingGuide from './pages/CampaignMessagingGuide';
import CampaignReviewSave from './pages/CampaignReviewSave';
import ContentGenerator from './pages/ContentGenerator';
import MessagingDevelopmentChatPage from './pages/MessagingDevelopmentChatPage';

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

        {/* Onboarding - ADD THESE PROTECTED (or public if signup flow needs them before login) */}
        {/* If onboarding happens *after* signup but *before* full dashboard access,
            they might not need ProtectedRoute or a different kind of protection.
            Assuming for now they are protected like other app features: */}
        <Route path="/onboarding" element={<ProtectedRoute><OnboardingChat /></ProtectedRoute>} />
        <Route path="/onboarding/summary" element={<ProtectedRoute><OnboardingSummary /></ProtectedRoute>} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        
        <Route path="/app/campaign/new" element={<ProtectedRoute><CampaignBuilder /></ProtectedRoute>} />
        <Route path="/app/campaign/edit-classification" element={<ProtectedRoute><EditClassificationPage /></ProtectedRoute>} />
        <Route path="/app/campaign/confirm-goals" element={<ProtectedRoute><ConfirmGoalsPage /></ProtectedRoute>} />
        <Route path="/app/campaign/rank-goals" element={<ProtectedRoute><RankGoalsPage /></ProtectedRoute>} />
        
        <Route path="/app/campaign/next-steps-summary" element={<ProtectedRoute><CampaignNextStepsPage /></ProtectedRoute>} />
        
        <Route path="/app/campaign/develop-messaging" element={<ProtectedRoute><MessagingDevelopmentChatPage /></ProtectedRoute>} />
        
        <Route path="/app/campaign/plan" element={<ProtectedRoute><CampaignPlan /></ProtectedRoute>} />
        <Route path="/app/campaign/message" element={<ProtectedRoute><CampaignMessagingGuide /></ProtectedRoute>} /> 
        
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
