// frontend/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';      // Import Auth Provider
import { CampaignProvider } from './contexts/CampaignContext.jsx';// Import Campaign Provider
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>        {/* Wrap with AuthProvider */}
        <CampaignProvider>    {/* Wrap with CampaignProvider */}
      <App />
        </CampaignProvider>   {/* Close CampaignProvider */}
      </AuthProvider>       {/* Close AuthProvider */}
    </BrowserRouter>
  </React.StrictMode>
);
