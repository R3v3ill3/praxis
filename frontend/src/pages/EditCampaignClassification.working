import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function EditCampaignClassification() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [campaignData, setCampaignData] = useState(null);
  const [classification, setClassification] = useState(null);
  const [types, setTypes] = useState([]);
  const [subtypes, setSubtypes] = useState([]);
  const [useCases, setUseCases] = useState([]);

  const [primaryTypeId, setPrimaryTypeId] = useState('');
  const [secondaryTypeId, setSecondaryTypeId] = useState('');
  const [useCaseId, setUseCaseId] = useState('');

  useEffect(() => {
    const storedCampaign = localStorage.getItem('campaignData');
    if (storedCampaign) {
      const parsed = JSON.parse(storedCampaign);
      setCampaignData(parsed);
      setClassification(parsed.classification || {});
    }
  }, []);

  useEffect(() => {
    fetch('/api/classification-options')
      .then(res => res.json())
      .then(data => {
        setTypes(data.types || []);
        setSubtypes(data.subtypes || []);
        setUseCases(data.useCases || []);
      })
      .catch(err => console.error('❌ Failed to load classification options:', err));
  }, []);

  useEffect(() => {
    if (!classification || types.length === 0 || subtypes.length === 0 || useCases.length === 0) return;

    const typeMatch = types.find(t => t.name.toLowerCase() === classification.primary_type?.toLowerCase());
    const subtypeMatch = subtypes.find(s => s.name.toLowerCase() === classification.secondary_type?.toLowerCase());
    const useCaseMatch = useCases.find(u => u.name.toLowerCase() === classification.sub_type?.toLowerCase());

    if (typeMatch) setPrimaryTypeId(typeMatch.id);
    if (subtypeMatch) setSecondaryTypeId(subtypeMatch.id);
    if (useCaseMatch) setUseCaseId(useCaseMatch.id);
  }, [types, subtypes, useCases, classification]);

  const handleSave = async () => {
    if (!user?.uid || !campaignData?.campaignId) return;

    const typeName = types.find(t => t.id === primaryTypeId)?.name || '';
    const subtypeName = subtypes.find(s => s.id === secondaryTypeId)?.name || '';
    const useCaseName = useCases.find(u => u.id === useCaseId)?.name || '';

    try {
      const ref = doc(db, 'users', user.uid, 'campaigns', campaignData.campaignId);
      await updateDoc(ref, {
        classification: {
          primary_type: typeName,
          secondary_type: subtypeName,
          sub_type: useCaseName
        }
      });
      console.log('✅ Classification updated in Firestore');
      navigate('/campaign/next-steps');
    } catch (err) {
      console.error('❌ Error saving classification:', err);
    }
  };

  const filteredSubtypes = subtypes.filter(s => s.type_id === primaryTypeId);
  const subtypeCore = secondaryTypeId?.split('_').pop();
  const filteredUseCases = useCases.filter(u => u.subtype_id === subtypeCore);

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Review and Update Campaign Classification</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Primary Type</label>
        <select
          className="w-full border border-gray-300 rounded p-2"
          value={primaryTypeId}
          onChange={e => setPrimaryTypeId(e.target.value)}
        >
          <option value="">Select primary type</option>
          {types.map(t => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Secondary Type</label>
        <select
          className="w-full border border-gray-300 rounded p-2"
          value={secondaryTypeId}
          onChange={e => setSecondaryTypeId(e.target.value)}
        >
          <option value="">Select secondary type</option>
          {filteredSubtypes.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Use Case</label>
        <select
          className="w-full border border-gray-300 rounded p-2"
          value={useCaseId}
          onChange={e => setUseCaseId(e.target.value)}
        >
          <option value="">Select use case</option>
          {filteredUseCases.map(u => (
            <option key={u.id} value={u.id}>{u.name}</option>
          ))}
        </select>
      </div>

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Save Classification
      </button>
    </div>
  );
}
