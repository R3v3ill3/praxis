// frontend/src/pages/EditCampaignClassification.jsx
import React, { useEffect, useState } from 'react';
// Removed: useAuth, doc, updateDoc, db, useNavigate as this component
// will now primarily be a display/form component driven by props and callbacks.
// Navigation and data saving to context/backend will be handled by its parent in CampaignStepRoutes.

export default function EditCampaignClassification({
  initialSummary,         // Prop: Raw summary object from context
  initialClassification,  // Prop: classificationGuess or final classification from context
  onNext                  // Prop: Callback to CampaignStepRoutes.EditClassificationPage's handleNext
}) {
  // State for fetched classification options (types, subtypes, useCases)
  const [types, setTypes] = useState([]);
  const [subtypes, setSubtypes] = useState([]);
  const [useCases, setUseCases] = useState([]);

  // Local state for dropdowns, initialized from initialClassification prop
  const [primaryTypeId, setPrimaryTypeId] = useState('');
  const [secondaryTypeId, setSecondaryTypeId] = useState('');
  const [useCaseId, setUseCaseId] = useState(''); // This will be the 'sub_type' id

  // Fetch dropdown options (types, subtypes, use cases)
  useEffect(() => {
    // Assuming you have an API endpoint that provides these options
    fetch('/api/classification-options')
      .then(res => {
        if (!res.ok) {
          throw new Error(`Failed to fetch classification options: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setTypes(data.types || []);
        setSubtypes(data.subtypes || []);
        setUseCases(data.useCases || []);
        console.log("EditCampaignClassification: Classification options loaded", data);
      })
      .catch(err => console.error('❌ EditCampaignClassification: Failed to load classification options:', err));
  }, []);

  // Effect to pre-fill dropdowns when initialClassification (from props) or options are available
  useEffect(() => {
    console.log("EditCampaignClassification: initialClassification prop:", initialClassification);
    if (!initialClassification || types.length === 0) {
        // Don't clear if options are still loading but initialClassification is present
        if (types.length > 0 || subtypes.length > 0 || useCases.length > 0) {
            setPrimaryTypeId('');
            setSecondaryTypeId('');
            setUseCaseId('');
        }
        return;
    }

    // initialClassification might have 'primary_type', 'secondary_type'
    // and 'use_case' (from AI guess) or 'sub_type' (from programmatic classification)
    const primaryTypeName = initialClassification.primary_type;
    const secondaryTypeName = initialClassification.secondary_type;
    const useCaseNameFromProp = initialClassification.sub_type || initialClassification.use_case;

    const typeMatch = types.find(t => t.name?.toLowerCase() === primaryTypeName?.toLowerCase());
    const subtypeMatch = subtypes.find(s => s.name?.toLowerCase() === secondaryTypeName?.toLowerCase() && s.type_id === typeMatch?.id);
    const useCaseMatch = useCases.find(u => {
        const subtypeCore = subtypeMatch?.id?.split('_').pop(); // e.g., 'industrial' from 'union_industrial'
        return u.name?.toLowerCase() === useCaseNameFromProp?.toLowerCase() && u.subtype_id === subtypeCore;
    });

    console.log("EditCampaignClassification: Matches found - Type:", typeMatch, "Subtype:", subtypeMatch, "UseCase:", useCaseMatch);

    setPrimaryTypeId(typeMatch ? typeMatch.id : '');
    setSecondaryTypeId(subtypeMatch ? subtypeMatch.id : '');
    setUseCaseId(useCaseMatch ? useCaseMatch.id : '');

  }, [types, subtypes, useCases, initialClassification]);


  const handleConfirmAndContinue = () => {
    const selectedType = types.find(t => t.id === primaryTypeId);
    const selectedSubtype = subtypes.find(s => s.id === secondaryTypeId);
    const selectedUseCase = useCases.find(u => u.id === useCaseId);

    const updatedClassificationPayload = {
      primary_type: selectedType?.name || null,
      secondary_type: selectedSubtype?.name || null,
      sub_type: selectedUseCase?.name || null, // Standardize to sub_type for context
      // Include IDs if your context or subsequent steps need them for saving/linking
      type_id: selectedType?.id || null,
      subtype_id: selectedSubtype?.id || null,
      id: selectedUseCase?.id || null, // This 'id' is the use_case_id
      // Preserve source if it was from AI, otherwise mark as manual/edited
      source: initialClassification?.source === 'ai_guess' ? 'ai_guess_edited' : 'manual_edit'
    };

    if (onNext) {
      onNext(updatedClassificationPayload); // Pass the selected data to the parent
    } else {
      console.warn("EditCampaignClassification: onNext prop is not defined. Cannot proceed.");
    }
  };

  // Filter subtypes based on selected primary type
  const filteredSubtypes = primaryTypeId ? subtypes.filter(s => s.type_id === primaryTypeId) : [];

  // Filter use cases based on selected secondary type's core ID part
  const subtypeCoreForUseCaseFilter = secondaryTypeId ? secondaryTypeId.split('_').pop() : null;
  const filteredUseCases = subtypeCoreForUseCaseFilter
    ? useCases.filter(u => u.subtype_id === subtypeCoreForUseCaseFilter)
    : [];


  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Review and Update Campaign Classification</h2>

      {initialSummary && (
        <div className="mb-6 p-4 bg-slate-50 rounded border border-slate-200">
          <h3 className="text-lg font-semibold mb-2 text-slate-700">Campaign Summary Overview:</h3>
          {initialSummary.purpose && <p className="text-sm text-slate-600"><strong>Purpose:</strong> {initialSummary.purpose}</p>}
          {initialSummary.audience && <p className="text-sm text-slate-600"><strong>Audience:</strong> {initialSummary.audience}</p>}
          {initialSummary.target && <p className="text-sm text-slate-600"><strong>Target:</strong> {initialSummary.target}</p>}
          {/* You can add more summary fields here if needed */}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="primary_type_select" className="block text-sm font-medium text-gray-700 mb-1">Primary Type</label>
          <select
            id="primary_type_select"
            name="primary_type_select"
            className="w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={primaryTypeId}
            onChange={e => {
              setPrimaryTypeId(e.target.value);
              setSecondaryTypeId(''); // Reset dependent dropdown
              setUseCaseId('');     // Reset dependent dropdown
            }}
          >
            <option value="">Select primary type...</option>
            {types.map(t => (
              <option key={t.id} value={t.id}>{t.name || t.id}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="secondary_type_select" className="block text-sm font-medium text-gray-700 mb-1">Secondary Type</label>
          <select
            id="secondary_type_select"
            name="secondary_type_select"
            className="w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={secondaryTypeId}
            onChange={e => {
              setSecondaryTypeId(e.target.value);
              setUseCaseId(''); // Reset dependent dropdown
            }}
            disabled={!primaryTypeId || filteredSubtypes.length === 0}
          >
            <option value="">Select secondary type...</option>
            {filteredSubtypes.map(s => (
              <option key={s.id} value={s.id}>{s.name || s.id}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="use_case_select" className="block text-sm font-medium text-gray-700 mb-1">Use Case</label>
          <select
            id="use_case_select"
            name="use_case_select"
            className="w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={useCaseId}
            onChange={e => setUseCaseId(e.target.value)}
            disabled={!secondaryTypeId || filteredUseCases.length === 0}
          >
            <option value="">Select use case...</option>
            {filteredUseCases.map(u => (
              <option key={u.id} value={u.id}>{u.name || u.id}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-8">
        <button
          type="button"
          onClick={handleConfirmAndContinue}
          className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          disabled={!primaryTypeId || !secondaryTypeId || !useCaseId}
        >
          Confirm Classification and Continue
        </button>
      </div>
    </div>
  );
}
