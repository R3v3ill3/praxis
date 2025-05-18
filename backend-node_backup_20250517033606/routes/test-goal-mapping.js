// backend-node/routes/test-goal-mapping.js

import express from 'express';
import { mapGoalsToCanonical, formatCanonicalGoalsForFirestore } from './goal-mapping.js';

const router = express.Router();

router.post('/test-goal-mapping', (req, res) => {
  const { goals = [] } = req.body;

  if (!Array.isArray(goals)) {
    return res.status(400).json({ error: "Expected 'goals' to be an array of strings." });
  }

  const canonical = mapGoalsToCanonical(goals);
  const formatted = formatCanonicalGoalsForFirestore(canonical);

  res.json({ original: goals, canonical, firestore_ready: formatted });
});

export default router;
