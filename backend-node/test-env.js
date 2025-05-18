console.log("=== PM2 ENV TEST ===");
console.log({
  PORT: process.env.PORT,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.slice(0, 8),
  GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});
try {
  const creds = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);
  console.log("Service account project_id:", creds.project_id);
} catch (e) {
  console.error("❌ Failed to load service account JSON:", e);
}
