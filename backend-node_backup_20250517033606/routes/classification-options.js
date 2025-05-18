import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();
const DATA_DIR = path.resolve('data');

function loadJson(fileName) {
  return JSON.parse(fs.readFileSync(path.join(DATA_DIR, fileName), 'utf8'));
}

router.get('/', (req, res) => {
  try {
    const types = loadJson('campaign_types.json');         // full object
    const subtypes = loadJson('campaign_subtypes.json');   // includes type_id
    const useCases = loadJson('campaign_use_cases.json');  // includes subtype_id

    res.json({ types, subtypes, useCases });
  } catch (err) {
    console.error('[classification-options] Failed to load data:', err);
    res.status(500).json({ error: 'Failed to load classification options' });
  }
});

export default router;
