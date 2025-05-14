import React, { createContext, useContext, useState } from 'react';

const CampaignContext = createContext();

export const useCampaign = () => useContext(CampaignContext);

export const CampaignProvider = ({ children }) => {
  const [summary, setSummary] = useState(null);
  const [classification, setClassification] = useState(null);
  const [goals, setGoals] = useState([]);

  const updateSummary = (data) => {
    setSummary(data);
    console.log('✅ Summary updated:', data);
  };

  const updateClassification = (data) => {
    setClassification(data);
    console.log('✅ Classification updated:', data);
  };

  const updateGoals = (newGoals) => {
    const ranked = newGoals.map((g, i) => ({ ...g, rank: i + 1 }));
    setGoals(ranked);
    console.log('✅ Goals updated:', ranked);
  };

  const saveCampaign = async () => {
    try {
      const body = { summary, classification, goals };
      const res = await fetch('/api/save-campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const result = await res.json();
      console.log('✅ Campaign saved:', result);
    } catch (err) {
      console.error('❌ Error saving campaign:', err);
    }
  };

  return (
    <CampaignContext.Provider
      value={{
        summary,
        classification,
        goals,
        updateSummary,
        updateClassification,
        updateGoals,
        saveCampaign,
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
};

// 🔁 This supports both default and named imports
export { CampaignContext };
export default CampaignContext;
