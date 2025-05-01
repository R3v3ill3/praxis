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
        // Add other relevant fields as needed, e.g., campaignName
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
        updateCampaignData,
        resetCampaignData,
    };

    return (
        <CampaignContext.Provider value={value}>
            {children}
        </CampaignContext.Provider>
    );
};
