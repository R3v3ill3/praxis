// server.js - Updated with dynamic import for initial critical setup

// This first log MUST appear. If it doesn't, the problem is more fundamental than Node.js code execution order.
console.log("--- SERVER.JS EXECUTION STARTED (TOP OF FILE) ---");

let envLoadedSuccessfully = false;
let initialConfigError = null;

// Asynchronous IIFE (Immediately Invoked Function Expression) to handle top-level awaits
(async () => {
  try {
    console.log("[SERVER.JS] Initializing environment using dynamic imports...");
    const path = await import('path');
    const { fileURLToPath } = await import('url');
    const dotenv = await import('dotenv');

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.default.dirname(__filename); // .default for CJS modules imported dynamically
    const envPath = path.default.resolve(__dirname, '.env');
    console.log(`[SERVER.JS] .env path determined: ${envPath}`);

    const dotenvResult = dotenv.default.config({ path: envPath }); // .default for CJS modules

    if (dotenvResult.error) {
      console.error("[SERVER.JS] Error loading .env file:", dotenvResult.error);
      initialConfigError = dotenvResult.error;
    } else {
      if (dotenvResult.parsed) {
        console.log("[SERVER.JS] .env file parsed successfully. Variables loaded:", Object.keys(dotenvResult.parsed));
      } else {
        console.warn("[SERVER.JS] .env file was found and parsed, but it might be empty or only contain comments.");
      }
    }

    const googleAppCreds = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    console.log(`[SERVER.JS] GOOGLE_APPLICATION_CREDENTIALS after dotenv attempt: ${googleAppCreds ? `"${googleAppCreds}"` : 'NOT Loaded or Empty'}`);

    if (googleAppCreds) {
      envLoadedSuccessfully = true;
    } else {
      console.error("[SERVER.JS] CRITICAL: GOOGLE_APPLICATION_CREDENTIALS was not set after dotenv.config(). Firebase will likely fail if imported.");
      // Not exiting here, to allow observation of further imports if any.
      // The firebase.js module itself will throw an error if this is not set.
    }
    console.log("[SERVER.JS] Initial environment setup complete.");

  } catch (e) {
    console.error("[SERVER.JS] CRITICAL ERROR IN ASYNC ENV SETUP BLOCK:", e);
    initialConfigError = e; // Store error
    // To prevent the app from continuing in a broken state:
    // process.exit(1); // Consider exiting if this core setup fails catastrophically
  }

  // Proceed with importing and setting up the rest of the application
  // only if the critical environment setup didn't have a catastrophic error
  // Note: firebase.js will still throw its own error if GOOGLE_APPLICATION_CREDENTIALS isn't set.
  if (initialConfigError && !process.env.GOOGLE_APPLICATION_CREDENTIALS) { // Check if a critical setup step failed that would prevent Firebase
      console.error("[SERVER.JS] Aborting full application startup due to critical error in initial config or missing GOOGLE_APPLICATION_CREDENTIALS.");
      process.exit(1); // Exit if initial config failed badly AND Google creds are missing.
  }


  // Dynamically import Express and other main dependencies AFTER env setup
  console.log("[SERVER.JS] Importing main application modules (Express, routes, etc.)...");
  const express = (await import('express')).default;
  const cors = (await import('cors')).default;
  const swaggerUi = (await import('swagger-ui-express')).default;
  const swaggerJsdoc = (await import('swagger-jsdoc')).default;
  // firebase.js is imported via routes, so we don't need to import it directly here
  // unless server.js itself uses db, auth, or firebaseAdmin directly.
  // For now, assuming it's only used within routes/sub-modules:
  const routes = (await import('./routes/index.js')).default;
  const path = (await import('path')).default; // Re-import for use in this scope if needed after IIFE
  const { fileURLToPath } = await import('url'); // Re-import for use in this scope if needed after IIFE
  const __filename_iife = fileURLToPath(import.meta.url); // Redefine for this scope if used outside IIFE
  const __dirname_iife = path.dirname(__filename_iife);   // Redefine for this scope

  console.log("[SERVER.JS] Main application modules imported.");

  const app = express();
  const PORT = process.env.PORT || 4100;

  app.use(cors());
  app.use(express.json());

  const frontendDistPath = path.join(__dirname_iife, '../frontend/dist');
  console.log(`[SERVER.JS] Serving static files from: ${frontendDistPath}`);
  app.use(express.static(frontendDistPath));

  const swaggerSpec = swaggerJsdoc({
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Digital Ad Co-Op API',
        version: '1.0.0',
      },
      servers: [{ url: '/api' }],
    },
    apis: ['./routes/*.js'],
  });
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("[SERVER.JS] Swagger UI setup complete.");

  app.get('/', (req, res) => {
    res.send('Digital Ad Co-Op Backend');
  });

  app.post('/api/test-post', (req, res) => {
    console.log(`--- ${new Date().toISOString()} /api/test-post HIT! ---`);
    res.status(200).json({ message: "POST test successful" });
  });

  app.use('/api', routes);
  console.log("[SERVER.JS] API routes mounted.");

  app.get('*', (req, res) => {
    if (frontendDistPath) {
      res.sendFile(path.join(frontendDistPath, 'index.html'), (err) => {
        if (err) {
          console.error("[SERVER.JS] Error sending index.html:", err);
          res.status(500).send("Error serving frontend.");
        }
      });
    } else {
      console.error("[SERVER.JS] frontendDistPath is not defined for catch-all route");
      res.status(404).send("Frontend not found.");
    }
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[SERVER.JS] Server running on port ${PORT}`);
    console.log(`[SERVER.JS] NODE_ENV: ${process.env.NODE_ENV}`);
    if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      console.warn("[SERVER.JS] Warning: GOOGLE_APPLICATION_CREDENTIALS is still not set by the time listen starts (this should not happen if env setup was successful).");
    } else {
      console.log("[SERVER.JS] GOOGLE_APPLICATION_CREDENTIALS path appears to be set by the time listen starts.");
    }
  });

})().catch(err => {
  // This catch block is for unhandled promise rejections from the IIFE itself
  console.error("[SERVER.JS] Unhandled error during async IIFE execution (outermost catch):", err);
  process.exit(1); // Exit if the IIFE itself fails catastrophically
});
