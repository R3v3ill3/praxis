// backend-node/firebase.js
import admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();

let db, auth; // Define auth here

if (!admin.apps.length) {
  try { // Add try...catch for better error handling
     admin.initializeApp({
        credential: admin.credential.cert({
           projectId: process.env.FIREBASE_PROJECT_ID,
           clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
           // Ensure private key newlines are handled correctly if necessary
           privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
     });
     console.log("✅ Firebase Admin SDK Initialized (using env vars).");
  } catch (error) {
      console.error("❌ Failed to initialize Firebase Admin SDK (using env vars):", error);
      // Handle error appropriately, maybe exit?
  }
} else {
   console.log("ℹ️ Firebase Admin SDK already initialized.");
}


// Get instances AFTER potential initialization
// Check if initialization was successful before getting instances
if (admin.apps.length > 0) {
    db = admin.firestore();
    auth = admin.auth(); // Get the auth instance
} else {
    console.error("❌ Cannot get Firestore DB or Auth instance - Admin SDK not initialized.");
}


export { admin, db, auth }; // <-- ADD 'auth' TO EXPORTS
