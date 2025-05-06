// frontend/src/context/CampaignContext.js
import React, { createContext, useState, useContext } from 'react';

const CampaignContext = createContext();

export const useCampaign = () => useContext(CampaignContext);

export const CampaignProvider = ({ children }) => {
    const [campaignData, setCampaignData] = useState({
        summary: null,
        classification: null,
        plan: null,
        messagingGuide: null,
        name: '',
    });

    const updateCampaignData = (newData) => {
        setCampaignData(prevData => ({ ...prevData, ...newData }));
        console.log("Campaign Context Updated:", { ...campaignData, ...newData });
    };

    const resetCampaignData = () => {
         setCampaignData({
            summary: null,
            classification: null,
            plan: null,
            messagingGuide: null,
            name: '',
        });
        console.log("Campaign Context Reset");
    };

    const value = {
        campaignData,
        updateCampaignData, // <-- updateCampaignData is defined here
        resetCampaignData, // <-- resetCampaignData is defined here
    };

    return (
        <CampaignContext.Provider value={value}>
            {children}
        </CampaignContext.Provider>
    );
};

// The file only exports useCampaign and CampaignProvider
// export { useCampaign, CampaignProvider }; // Implicitly exported due to `export const` above
