import { Suspense, lazy } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

// Fallback component
function ErrorFallback({ error }) {
  return (
    <div role="alert">
      <p className="text-red-500">⚠️ Something went wrong rendering this page:</p>
      <pre className="text-xs">{error.message}</pre>
    </div>
  );
}

// Lazy imports
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'));
const OnboardingChat = lazy(() => import('./pages/OnboardingChat.jsx'));

<Route
  path="/dashboard"
  element={
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<div>Loading Dashboard…</div>}>
        <Dashboard />
      </Suspense>
    </ErrorBoundary>
  }
/>

<Route
  path="/onboarding"
  element={
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<div>Loading Onboarding…</div>}>
        <OnboardingChat />
      </Suspense>
    </ErrorBoundary>
  }
/>
