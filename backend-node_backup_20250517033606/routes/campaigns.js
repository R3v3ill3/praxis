// backend-node/routes/campaigns.js
// NOTE: All OpenAPI comments removed for troubleshooting swagger-jsdoc errors.

import express from 'express';
import { db } from '../firebase.js'; // Ensure db is initialized and exported from firebase.js
import { FieldValue } from 'firebase-admin/firestore';
import authMiddleware from '../middleware/authMiddleware.js'; // Import the middleware

const router = express.Router();

// Apply auth middleware to all routes in this file
router.use(authMiddleware);

// Create a new campaign (associating with user)
router.post('/create', async (req, res) => {
    try {
        if (!db) {
             console.error('❌ /campaigns/create: Firestore DB not initialized.');
             // Return explicit error if DB isn't ready
             return res.status(500).json({ error: 'Database service not available' });
        }
        const userId = req.user.uid; // Get user ID from middleware
        const campaignData = req.body;

        // Basic validation (add more as needed)
        if (!campaignData.summary || !campaignData.name) {
            return res.status(400).json({ error: 'Missing required campaign data (name, summary).' });
        }

        const docRef = await db.collection('campaigns').add({
            ...campaignData,
            userId: userId, // Associate with user
            createdAt: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp()
        });
        console.log(`✅ Campaign created for user ${userId} with ID: ${docRef.id}`);
        res.status(201).json({ id: docRef.id });
    } catch (error) {
        console.error(`❌ Error creating campaign for user ${req.user?.uid}:`, error);
        res.status(500).json({ error: "Failed to create campaign: " + error.message });
    }
});

// Get all campaigns for the authenticated user
router.get('/', async (req, res) => {
    try {
        if (!db) {
            console.error('❌ /campaigns GET: Firestore DB not initialized.');
            throw new Error('Database service not available.');
        }
        const userId = req.user.uid;
        const campaignsRef = db.collection('campaigns');
        // Order by creation time, newest first
        const snapshot = await campaignsRef.where('userId', '==', userId).orderBy('createdAt', 'desc').get();

        if (snapshot.empty) {
            console.log(`ℹ️ No campaigns found for user ${userId}.`);
            return res.status(200).json([]); // Return empty array is success
        }

        const campaigns = snapshot.docs.map(doc => {
            const data = doc.data();
            // Convert Timestamps to ISO strings for JSON compatibility
            return {
                id: doc.id,
                ...data,
                createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : null, // Handle potential null
                updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : null, // Handle potential null
            };
        });
        console.log(`✅ Fetched ${campaigns.length} campaigns for user ${userId}.`);
        res.status(200).json(campaigns);
    } catch (error) {
        console.error(`❌ Error fetching campaigns for user ${req.user?.uid}:`, error);
        res.status(500).json({ error: "Failed to fetch campaigns: " + error.message });
    }
});

// Get a specific campaign by ID
router.get('/:id', async (req, res) => {
    try {
        if (!db) {
            console.error('❌ /campaigns/:id GET: Firestore DB not initialized.');
            throw new Error('Database service not available.');
        }
        const userId = req.user.uid;
        const campaignId = req.params.id;
        const campaignRef = db.collection('campaigns').doc(campaignId);
        const doc = await campaignRef.get();

        if (!doc.exists) {
            console.log(`ℹ️ Campaign ${campaignId} not found.`);
            return res.status(404).json({ error: 'Campaign not found' });
        }

        const campaignData = doc.data();
        // Verify ownership
        if (campaignData.userId !== userId) {
             console.warn(`⚠️ User ${userId} attempted to access campaign ${campaignId} owned by ${campaignData.userId}.`);
            return res.status(403).json({ error: 'Forbidden: You do not own this campaign' });
        }

        console.log(`✅ Fetched campaign ${campaignId} for user ${userId}.`);
        // Convert Timestamps
        const responseData = {
             id: doc.id,
             ...campaignData,
             createdAt: campaignData.createdAt?.toDate ? campaignData.createdAt.toDate().toISOString() : null,
             updatedAt: campaignData.updatedAt?.toDate ? campaignData.updatedAt.toDate().toISOString() : null,
         };
        res.status(200).json(responseData);
    } catch (error) {
        console.error(`❌ Error fetching campaign ${req.params.id} for user ${req.user?.uid}:`, error);
        res.status(500).json({ error: "Failed to fetch campaign: " + error.message });
    }
});

// Update an existing campaign
router.put('/update/:id', async (req, res) => {
    try {
        if (!db) {
            console.error('❌ /campaigns/update/:id PUT: Firestore DB not initialized.');
            throw new Error('Database service not available.');
        }
        const userId = req.user.uid;
        const campaignId = req.params.id;
        const campaignRef = db.collection('campaigns').doc(campaignId);
        const updateData = req.body;

        // Prevent critical fields from being updated directly
        delete updateData.userId;
        delete updateData.createdAt;
        delete updateData.id; // Prevent changing the ID via body

        // Verify ownership before updating
        const doc = await campaignRef.get();
        if (!doc.exists) {
             console.log(`ℹ️ Campaign ${campaignId} not found for update attempt by user ${userId}.`);
            return res.status(404).json({ error: 'Campaign not found' });
        }
        if (doc.data().userId !== userId) {
            console.warn(`⚠️ User ${userId} attempted to update campaign ${campaignId} owned by ${doc.data().userId}.`);
            return res.status(403).json({ error: 'Forbidden: You do not own this campaign' });
        }

        // Perform the update
        await campaignRef.update({
            ...updateData,
            updatedAt: FieldValue.serverTimestamp() // Update timestamp
         });
        console.log(`✅ Campaign ${campaignId} updated by user ${userId}.`);
        res.status(200).json({ success: true, message: 'Campaign updated successfully.' });
    } catch (error) {
        console.error(`❌ Error updating campaign ${req.params.id} for user ${req.user?.uid}:`, error);
        res.status(500).json({ error: "Failed to update campaign: " + error.message });
    }
});

// Delete a campaign
router.delete('/:id', async (req, res) => {
    try {
         if (!db) {
            console.error('❌ /campaigns/:id DELETE: Firestore DB not initialized.');
            throw new Error('Database service not available.');
         }
        const userId = req.user.uid;
        const campaignId = req.params.id;
        const campaignRef = db.collection('campaigns').doc(campaignId);

        // Verify ownership before deleting
        const doc = await campaignRef.get();
        if (!doc.exists) {
            console.log(`ℹ️ Campaign ${campaignId} not found for delete attempt by user ${userId}.`);
            return res.status(404).json({ error: 'Campaign not found' });
        }
        if (doc.data().userId !== userId) {
             console.warn(`⚠️ User ${userId} attempted to delete campaign ${campaignId} owned by ${doc.data().userId}.`);
            return res.status(403).json({ error: 'Forbidden: You do not own this campaign' });
        }

        // Perform the delete
        await campaignRef.delete();
        console.log(`✅ Campaign ${campaignId} deleted by user ${userId}.`);
        res.status(200).json({ success: true, message: 'Campaign deleted successfully.' });
    } catch (error) {
        console.error(`❌ Error deleting campaign ${req.params.id} for user ${req.user?.uid}:`, error);
        res.status(500).json({ error: "Failed to delete campaign: " + error.message });
    }
});

export default router;
