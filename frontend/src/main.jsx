// frontend/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';      // Import Auth Provider
import { CampaignProvider } from './context/CampaignContext.jsx';// Import Campaign Provider
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
