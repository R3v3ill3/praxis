// backend-node/routes/goal-mapping.js

/**
 * Fallback function to map natural language goals to canonical goal IDs.
 * Intended to be used inside campaign-assistant.js or similar backend routes.
 */

const goalSynonyms = {
  membership: ["recruit", "members", "join", "sign up"],
  donation: ["contribute", "donation", "donate", "fundraise"],
  participation: ["attend", "involve", "turnout", "participate"],
  activism: ["mobilise", "protest", "campaign", "take action"],
  vote: ["vote", "elect", "election", "ballot"],
  corporate_decision: ["board", "divest", "investment", "corporate"],
  political_decision: ["government", "minister", "policy", "legislate"],
  issue_awareness: ["awareness", "explain", "inform", "visibility"],
  issue_support: ["support", "backing", "endorse", "solidarity"],
  sales: ["sell", "purchase", "buy", "order"]
};

/**
 * @param {string[]} goals - array of natural language goals
 * @returns {string[]} - array of canonical goal IDs
 */
function mapGoalsToCanonical(goals = []) {
  return goals.map(goal => {
    const goalLower = goal.toLowerCase();
    for (const [canonical, phrases] of Object.entries(goalSynonyms)) {
      if (phrases.some(p => goalLower.includes(p))) {
        return canonical;
      }
    }
    return "other";
  });
}

/**
 * Converts canonical goal IDs to Firestore-ready objects with label and rank
 * @param {string[]} canonicalGoals
 * @returns {Array<{ id: string, label: string, rank: number }>}
 */
function formatCanonicalGoalsForFirestore(canonicalGoals = []) {
  return canonicalGoals.map((id, idx) => ({
    id,
    label: id.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    rank: idx + 1
  }));
}

export { mapGoalsToCanonical, formatCanonicalGoalsForFirestore };
