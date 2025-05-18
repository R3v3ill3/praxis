// backend-node/firebase.js
import admin from 'firebase-admin';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

let db, auth, firebaseAdminInitialized = false;

// Always load the service account from the env variable
const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

if (!serviceAccountPath) {
  throw new Error("GOOGLE_APPLICATION_CREDENTIALS env var is not set");
}

let serviceAccount;
try {
  serviceAccount = require(serviceAccountPath);
  if (!serviceAccount.project_id) {
    throw new Error('Service account object must contain a string "project_id" property.');
  }
} catch (error) {
  console.error("❌ [firebase.js] Could not load service account JSON:", error);
}

try {
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log("✅ [firebase.js] Firebase Admin SDK initialized successfully (via service account JSON).");
    firebaseAdminInitialized = true;
  } else {
    console.log("ℹ️ [firebase.js] Firebase Admin SDK already initialized.");
    firebaseAdminInitialized = true;
  }
} catch (error) {
  console.error("❌ [firebase.js] Failed to initialize Firebase Admin SDK:", error.message);
  if (error.errorInfo) {
    console.error("[firebase.js] Firebase Error Code:", error.errorInfo.code);
    console.error("[firebase.js] Firebase Error Message:", error.errorInfo.message);
  }
}

if (firebaseAdminInitialized) {
  db = admin.firestore();
  auth = admin.auth();
} else {
  console.error("❌ [firebase.js] Cannot get Firestore DB or Auth instance - SDK not initialized.");
  db = null;
  auth = null;
}

export { admin as firebaseAdmin, db, auth };
