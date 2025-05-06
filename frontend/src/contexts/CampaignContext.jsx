// frontend/src/context/CampaignContext.js
import React, { createContext, useState, useContext } from 'react';

const CampaignContext = createContext();

export const useCampaign = () => useContext(CampaignContext);

export const CampaignProvider = ({ children }) => {
  const [campaignData, setCampaignData] = useState({
    summary: null,           // structured OpenAI summary (purpose, audience, etc.)
    classification: null,    // type/subtype/use case
    plan: null,              // campaign plan steps
    messagingGuide: null,    // generated messaging framework
    name: '',                // campaign name
  });

  const updateCampaignData = (newData) => {
    setCampaignData(prev => {
      const updated = { ...prev, ...newData };
      console.log('✅ Campaign Context Updated:', updated);
      return updated;
    });
  };

  const resetCampaignData = () => {
    const reset = {
      summary: null,
      classification: null,
      plan: null,
      messagingGuide: null,
      name: '',
    };
    setCampaignData(reset);
    console.log('🔄 Campaign Context Reset');
  };

  const value = {
    campaignData,
    updateCampaignData,
    resetCampaignData,
  };

  return (
    <CampaignContext.Provider value={value}>
      {children}
    </CampaignContext.Provider>
  );
};
