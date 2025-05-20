// frontend/src/pages/MockScenarioGeneratorPage.jsx (New File)
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { useToast } from '../components/ui/use-toast';

// Define the structure for easier form management
const initialScenarioState = {
  id: `mock-${Date.now()}`,
  summary: { purpose: "", location: "", audience: "", intent: "", target: "", problem: "", proposedChange: "" },
  classification: { primary_type: "", secondary_type: "", use_case: "" },
  goals: [{ id: "g1", label: "", rank: 1 }],
  messaging_inputs: {
    issueName: '',
    proposedChange: '', // REQUIRED
    geographicContext: '',
    desiredOutcome: '',
    primaryAudience: '', // REQUIRED
    audienceProfile: { demographics: '', psychographics: '', priorBeliefs: '', mediaHabits: '' },
    campaignObjective: '',
    deliveryContext: { format: '', messenger: '', timing: '' },
    knownComparisons: '',
    benchmarkData: ''
  }
};

export default function MockScenarioGeneratorPage() {
  const [scenario, setScenario] = useState(JSON.parse(JSON.stringify(initialScenarioState)));
  const [customCampaignId, setCustomCampaignId] = useState(scenario.id);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e, section, field, subField = null, subSubField = null) => {
    const { value } = e.target;
    setScenario(prev => {
      const updated = JSON.parse(JSON.stringify(prev)); // Deep copy to ensure nested updates work

      if (subSubField && section && updated[section] && updated[section][field] && updated[section][field][subField]) {
        updated[section][field][subField] = { ...updated[section][field][subField], [subSubField]: value };
      } else if (subField && section && updated[section] && updated[section][field]) {
        updated[section][field] = { ...updated[section][field], [subField]: value };
      } else if (section && updated[section]) {
        updated[section] = { ...updated[section], [field]: value };
      } else {
        updated[field] = value;
      }
      return updated;
    });
  };
  
  const handleGoalChange = (e, index, field) => {
    const { value } = e.target;
    setScenario(prev => {
        const updated = { ...prev };
        const updatedGoals = [...updated.goals];
        updatedGoals[index] = { ...updatedGoals[index], [field]: field === 'rank' ? parseInt(value,10) || 0 : value };
        updated.goals = updatedGoals;
        return updated;
    });
  };


  const handleCampaignIdChange = (e) => {
    setCustomCampaignId(e.target.value.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalCampaignId = customCampaignId || scenario.id;
    const finalScenario = { ...scenario, id: finalCampaignId };

    // Basic validation before saving (mirroring MessagingGuidePage)
    if (!finalScenario.messaging_inputs.issueName ||
        !finalScenario.messaging_inputs.proposedChange ||
        !finalScenario.messaging_inputs.primaryAudience) {
      toast({
        variant: "destructive",
        title: "Missing Required Fields",
        description: "Please fill in at least 'Issue Name', 'Proposed Change', and 'Primary Audience' in Messaging Inputs.",
      });
      return;
    }

    try {
      localStorage.setItem(`campaign-${finalCampaignId}`, JSON.stringify(finalScenario));
      toast({ title: "Mock Scenario Saved!", description: `ID: ${finalCampaignId}. You can now test it.` });
      navigate(`/app/campaign/${finalCampaignId}/messaging-guide`);
    } catch (error) {
      console.error("Error saving mock scenario to localStorage:", error);
      toast({ variant: "destructive", title: "Save Error", description: "Could not save mock scenario." });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Create Custom Mock Scenario</CardTitle>
          <CardDescription>Fill in the details for your test campaign. This will be saved to localStorage.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Campaign ID */}
            <div className="space-y-2">
              <h3 className="text-xl font-semibold border-b pb-2">Campaign Identifier</h3>
              <div>
                <label htmlFor="customCampaignId" className="block text-sm font-medium">Mock Campaign ID (for URL and localStorage key)</label>
                <Input id="customCampaignId" value={customCampaignId} onChange={handleCampaignIdChange} placeholder="e.g., my-test-scenario-1" />
              </div>
            </div>

            {/* Summary Section */}
            <div className="space-y-2">
              <h3 className="text-xl font-semibold border-b pb-2">Summary</h3>
              <div>
                <label htmlFor="summaryPurpose" className="block text-sm font-medium">Purpose / Campaign Name (summary.purpose)</label>
                <Input id="summaryPurpose" value={scenario.summary.purpose} onChange={(e) => handleChange(e, 'summary', 'purpose')} />
              </div>
              <div>
                <label htmlFor="summaryProblem" className="block text-sm font-medium">Problem (summary.problem)</label>
                <Textarea id="summaryProblem" value={scenario.summary.problem} onChange={(e) => handleChange(e, 'summary', 'problem')} />
              </div>
              <div>
                <label htmlFor="summaryProposedChange" className="block text-sm font-medium">Proposed Change (summary.proposedChange)</label>
                <Textarea id="summaryProposedChange" value={scenario.summary.proposedChange} onChange={(e) => handleChange(e, 'summary', 'proposedChange')} />
              </div>
              {/* Add other summary fields: location, audience, intent, target */}
            </div>

            {/* Classification Section */}
            <div className="space-y-2">
                <h3 className="text-xl font-semibold border-b pb-2">Classification</h3>
                <div>
                    <label htmlFor="classificationPrimary" className="block text-sm font-medium">Primary Type (classification.primary_type)</label>
                    <Input id="classificationPrimary" value={scenario.classification.primary_type} onChange={(e) => handleChange(e, 'classification', 'primary_type')} />
                </div>
                {/* Add secondary_type, use_case */}
            </div>

            {/* Goals Section (Simplified to one goal for this example) */}
            <div className="space-y-2">
                <h3 className="text-xl font-semibold border-b pb-2">Goals</h3>
                {scenario.goals.map((goal, index) => (
                    <div key={index} className="p-2 border rounded space-y-1">
                        <label className="text-xs">Goal {index + 1}</label>
                        <Input placeholder="Goal Label" value={goal.label} onChange={(e) => handleGoalChange(e, index, 'label')} />
                        <Input type="number" placeholder="Rank" value={goal.rank} onChange={(e) => handleGoalChange(e, index, 'rank')} />
                    </div>
                ))}
                {/* Add button to add more goals if needed */}
            </div>


            {/* Messaging Inputs Section - CRITICAL */}
            <div className="space-y-2">
              <h3 className="text-xl font-semibold border-b pb-2">Messaging Inputs (Core for Guide)</h3>
              <div>
                <label htmlFor="issueName" className="block text-sm font-medium text-red-600">* Issue Name (messaging_inputs.issueName)</label>
                <Textarea id="issueName" value={scenario.messaging_inputs.issueName} onChange={(e) => handleChange(e, 'messaging_inputs', 'issueName')} required />
              </div>
              <div>
                <label htmlFor="proposedChange" className="block text-sm font-medium text-red-600">* Proposed Change (messaging_inputs.proposedChange)</label>
                <Textarea id="proposedChange" value={scenario.messaging_inputs.proposedChange} onChange={(e) => handleChange(e, 'messaging_inputs', 'proposedChange')} required />
              </div>
              <div>
                <label htmlFor="geographicContext" className="block text-sm font-medium">Geographic Context (messaging_inputs.geographicContext)</label>
                <Textarea id="geographicContext" value={scenario.messaging_inputs.geographicContext} onChange={(e) => handleChange(e, 'messaging_inputs', 'geographicContext')} />
              </div>
              <div>
                <label htmlFor="desiredOutcome" className="block text-sm font-medium">Desired Outcome (messaging_inputs.desiredOutcome)</label>
                <Textarea id="desiredOutcome" value={scenario.messaging_inputs.desiredOutcome} onChange={(e) => handleChange(e, 'messaging_inputs', 'desiredOutcome')} />
              </div>
              <div>
                <label htmlFor="primaryAudience" className="block text-sm font-medium text-red-600">* Primary Audience (messaging_inputs.primaryAudience)</label>
                <Textarea id="primaryAudience" value={scenario.messaging_inputs.primaryAudience} onChange={(e) => handleChange(e, 'messaging_inputs', 'primaryAudience')} required />
              </div>

              <h4 className="text-md font-semibold pt-2">Audience Profile (messaging_inputs.audienceProfile)</h4>
              <div>
                <label htmlFor="audienceDemographics" className="block text-sm font-medium">Demographics</label>
                <Textarea id="audienceDemographics" value={scenario.messaging_inputs.audienceProfile.demographics} onChange={(e) => handleChange(e, 'messaging_inputs', 'audienceProfile', 'demographics')} />
              </div>
              <div>
                <label htmlFor="audiencePsychographics" className="block text-sm font-medium">Psychographics</label>
                <Textarea id="audiencePsychographics" value={scenario.messaging_inputs.audienceProfile.psychographics} onChange={(e) => handleChange(e, 'messaging_inputs', 'audienceProfile', 'psychographics')} />
              </div>
              {/* Add priorBeliefs, mediaHabits */}

              <div>
                <label htmlFor="campaignObjective" className="block text-sm font-medium">Campaign Objective (messaging_inputs.campaignObjective)</label>
                <Textarea id="campaignObjective" value={scenario.messaging_inputs.campaignObjective} onChange={(e) => handleChange(e, 'messaging_inputs', 'campaignObjective')} />
              </div>

              <h4 className="text-md font-semibold pt-2">Delivery Context (messaging_inputs.deliveryContext)</h4>
              <div>
                <label htmlFor="deliveryFormat" className="block text-sm font-medium">Format</label>
                <Textarea id="deliveryFormat" value={scenario.messaging_inputs.deliveryContext.format} onChange={(e) => handleChange(e, 'messaging_inputs', 'deliveryContext', 'format')} />
              </div>
              {/* Add messenger, timing */}

              <div>
                <label htmlFor="knownComparisons" className="block text-sm font-medium">Known Comparisons (messaging_inputs.knownComparisons)</label>
                <Textarea id="knownComparisons" value={scenario.messaging_inputs.knownComparisons} onChange={(e) => handleChange(e, 'messaging_inputs', 'knownComparisons')} />
              </div>
              <div>
                <label htmlFor="benchmarkData" className="block text-sm font-medium">Benchmark Data (messaging_inputs.benchmarkData)</label>
                <Textarea id="benchmarkData" value={scenario.messaging_inputs.benchmarkData} onChange={(e) => handleChange(e, 'messaging_inputs', 'benchmarkData')} />
              </div>
            </div>

            <Button type="submit" className="w-full">Save Mock Scenario & View Guide</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
