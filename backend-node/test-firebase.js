import admin from 'firebase-admin';

console.log("GOOGLE_APPLICATION_CREDENTIALS:", process.env.GOOGLE_APPLICATION_CREDENTIALS);

try {
  if (admin.apps.length === 0) {
    admin.initializeApp();
    console.log("Initialized Firebase Admin SDK");
  }
  const db = admin.firestore();
  await db.collection("test-collection").add({foo: "bar", date: new Date()});
  console.log("Successfully wrote to Firestore!");
} catch (e) {
  console.error("Firestore test error:", e);
}
