// frontend/src/lib/mock-data.js

export const mockScenarios = {
  defaultGigWorkers: {
    // This is the detailed "Gig Economy Workers" mock we created
    id: 'mock-gig-workers', // You can give it a specific ID or let campaignId override
    summary: {
      purpose: "Gig Economy Workers' Rights Initiative",
      location: "National (Australia), with initial focus on Sydney & Melbourne",
      audience: "Federal and State Politicians, Gig Economy App Users",
      intent: "Drive legislative change for fair work conditions",
      target: "Relevant Government Ministers and Regulatory Bodies",
      problem: "Gig economy delivery riders face low pay, no benefits, and unsafe conditions.",
      proposedChange: "Introduce legislation for minimum pay rates, accident insurance, and collective bargaining rights for gig riders."
    },
    classification: {
      primary_type: "Advocacy & Social Cause",
      secondary_type: "Legislative Reform",
      use_case: "Worker Rights Protection"
    },
    goals: [
      {id: "goal1", label: "Achieve passage of new protective legislation within 2 years.", rank: 1},
      {id: "goal2", label: "Increase public support score for reforms from 40% to 65%.", rank: 2},
      {id: "goal3", label: "Secure endorsements from 5 key crossbench politicians.", rank: 3}
    ],
    messaging_inputs: {
      issueName: 'Fair Pay & Safe Conditions for Gig Economy Delivery Riders',
      proposedChange: 'Legislation establishing minimum pay rates per delivery, accident insurance coverage, and rights to collective bargaining for gig economy delivery riders.',
      geographicContext: 'Major urban centers across Australia (e.g., Sydney, Melbourne, Brisbane), where gig economy food and parcel delivery is prevalent.',
      desiredOutcome: 'Improved financial security and workplace safety for delivery riders, and a fairer, more regulated gig economy sector nationwide.',
      primaryAudience: 'Federal and State politicians (Labor, Greens, and key crossbenchers), and secondarily, consumers who regularly use food/parcel delivery apps.',
      audienceProfile: {
        demographics: 'Politicians: Varied political affiliations, age 40+, typically well-educated. Consumers: Primarily 18-45, urban dwellers, tech-savvy, often students or young professionals, convenience-focused.',
        psychographics: 'Politicians: Concerned with public image, re-election, worker rights (for some), innovation, economic impact. Consumers: Value convenience and cost-effectiveness, but an increasing segment is ethically conscious and responsive to fairness arguments.',
        priorBeliefs: 'Politicians: Some may view gig work as purely flexible entrepreneurship benefiting innovation, others as potentially exploitative. Consumers: May not fully consider rider conditions due to focus on service convenience, or may feel powerless to influence change.',
        mediaHabits: 'Politicians: Major national news outlets (ABC, Guardian, AFR), social media (Twitter/X for political discourse, LinkedIn), policy briefings, direct stakeholder meetings. Consumers: Instagram, TikTok, Facebook, YouTube, news aggregators, recommendations from peers.'
      },
      campaignObjective: 'To build widespread public and political support that pressures legislators to introduce and pass protective laws for gig workers within the next 12-18 months, creating a public mandate for change.',
      deliveryContext: {
        format: 'Media releases & op-eds in major newspapers, targeted digital advertising campaigns (Facebook, Instagram, LinkedIn), short video testimonials from riders for social media, direct lobbying materials for politicians, public petitions and email-your-MP tools.',
        messenger: 'Current and former delivery riders sharing personal, verifiable stories of hardship and the need for change; union representatives advocating for worker rights; respected economists or legal experts on labor rights and the future of work.',
        timing: 'Align with parliamentary sitting periods when legislation can be debated, news cycles focusing on worker exploitation or cost of living pressures, and potentially around major holidays when delivery demand (and thus rider visibility) is high.'
      },
      knownComparisons: 'Similar legislative pushes for gig workers in other countries (e.g., parts of Europe, California) – noting successes (e.g., Spain riders law) and challenges. Previous successful Australian campaigns on casual worker rights or for other essential service worker groups.',
      benchmarkData: 'Recent surveys indicate 35% of consumers are "very concerned" about gig worker conditions if made explicitly aware. Current estimated average hourly earnings for riders are $X after vehicle expenses, which is below the statutory minimum wage. Only Y% of the public are aware of any active campaigns for gig worker rights.'
    }
  },
  nursePayRise: {
    // A second mock scenario - e.g., for nurses' pay
    id: 'mock-nurse-pay',
    summary: {
      purpose: "Fair Pay for NSW Nurses",
      location: "New South Wales Hospitals",
      audience: "NSW Government, General Public",
      intent: "Secure a significant pay increase and improved conditions",
      target: "NSW Health Minister and Treasury",
      problem: "Nurses are overworked, underpaid, and leaving the profession.",
      proposedChange: "A 15% pay rise and mandated nurse-to-patient ratios."
    },
    classification: {
      primary_type: "Workplace & Union",
      secondary_type: "Public Sector Bargaining",
      use_case: "Enterprise Agreement Negotiation"
    },
    goals: [
      {id: "goal1", label: "Achieve 15% pay rise in the next EBA.", rank: 1},
      {id: "goal2", label: "Implement safe staffing ratios statewide.", rank: 2}
    ],
    messaging_inputs: {
      issueName: 'Critical Overload: NSW Nurses Need Fair Pay and Safe Staffing Now',
      proposedChange: 'An immediate 15% pay increase for all public health nurses in NSW, and the urgent implementation of legally mandated nurse-to-patient ratios across all hospital wards.',
      geographicContext: 'New South Wales, Australia, specifically targeting public hospitals and health facilities statewide.',
      desiredOutcome: 'A health system where nurses feel valued, are fairly compensated, and can provide safe, high-quality care to all patients, leading to reduced burnout and improved staff retention.',
      primaryAudience: 'The NSW Premier and Health Minister, with secondary pressure from concerned citizens, particularly in marginal electorates.',
      audienceProfile: {
        demographics: 'Politicians: Key decision-makers. Citizens: Broad demographic, but especially those who have recently interacted with the health system or have family working in it. Ages 25-70.',
        psychographics: 'Value public healthcare, respect frontline workers, concerned about health system strain. Can be moved by stories of personal struggle and impact on patient care.',
        priorBeliefs: 'High existing respect for nurses. May be unaware of the full extent of pay stagnation or staffing issues. May be somewhat desensitized to "crisis" narratives unless new angles are presented.',
        mediaHabits: 'Politicians: Major Sydney newspapers, ABC news, Sky News, internal briefings. Citizens: Commercial TV news (Seven, Nine), Facebook, local community newspapers, word-of-mouth.'
      },
      campaignObjective: 'To create overwhelming public and political pressure on the NSW Government to include the pay rise and staffing ratios in the upcoming state budget and EBA negotiations.',
      deliveryContext: {
        format: 'Rallies and public demonstrations, personal letters/emails to MPs, paid media (TV, radio, digital), earned media (human interest stories, expert commentary), social media sharing of nurse stories.',
        messenger: 'Frontline nurses (diverse backgrounds and experiences), patient advocates who have experienced understaffing, union leaders, potentially supportive medical professionals.',
        timing: 'Build momentum in the months leading up to budget announcements and EBA negotiation periods. Intensify activities around key dates.'
      },
      knownComparisons: 'Previous industrial action by teachers or paramedics in NSW; similar nurse campaigns in other states or countries (e.g., Victoria, Queensland, UK).',
      benchmarkData: 'Current NSW nurse wages are X% behind comparable roles in [Other State/Profession]. Patient incident reports related to understaffing have increased by Y% in the last Z years.'
    }
  },
  // Add more scenarios here as needed:
  // scenarioKey: { ...full campaign object... }
};
