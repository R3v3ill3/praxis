
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

// Fallback error display
function ErrorFallback({ error }) {
  return (
    <div role="alert" className="p-4 bg-red-100 text-red-800 rounded">
      <p><strong>⚠️ Something went wrong rendering this page:</strong></p>
      <pre className="text-xs whitespace-pre-wrap">{error.message}</pre>
    </div>
  );
}

// Lazy-load key pages
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'));
const OnboardingChat = lazy(() => import('./pages/OnboardingChat.jsx'));
const CampaignBuilder = lazy(() => import('./pages/CampaignBuilder.jsx'));
// Add other pages below as needed
// const CampaignSummary = lazy(() => import('./pages/CampaignSummary.jsx'));

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<div className="p-4 text-gray-600">Loading…</div>}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/onboarding" element={<OnboardingChat />} />
          <Route path="/campaign-builder" element={<CampaignBuilder />} />
          {/* Add additional routes here */}
          {/* <Route path="/campaign-summary" element={<CampaignSummary />} /> */}
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}
