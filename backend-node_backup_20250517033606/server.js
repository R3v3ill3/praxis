// server.js FOR TESTING - RENAME YOUR ORIGINAL to server.full.js or server.js.bak

import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
// import swaggerUi from 'swagger-ui-express'; // Commented out for test
// import swaggerJsdoc from 'swagger-jsdoc';   // Commented out for test
import routes from './routes/index.js'; // This will import your "bare bones" index.js
import path from 'path';
import { fileURLToPath } from 'url';

console.log('--- [server.js] RUNNING MINIMAL TEST VERSION ---');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '.env') }); // Keep .env loading

const app = express();
const PORT = process.env.PORT || 4100;

// Standard middleware - these are unlikely to cause the path-to-regexp error
app.use(cors());
app.use(express.json());

// Static file serving - also unlikely for this error, but keep for structure
const frontendDistPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendDistPath));
console.log(`--- [server.js] Static files configured for: ${frontendDistPath} ---`);


// --- Swagger Completely Disabled ---
console.log('--- [server.js] SWAGGER IS DISABLED FOR THIS TEST ---');
// const swaggerSpec = swaggerJsdoc({
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Digital Ad Co-Op API',
//       version: '1.0.0',
//     },
//     servers: [
//       {
//         url: '/api',
//       },
//     ],
//   },
//   apis: ['./routes/*.js'], // This scanning is what we want to avoid for the test
// });
// app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// --- End Swagger Disabled ---


// Basic root route - keep for testing basic app functionality
app.get('/', (req, res) => {
  console.log(`--- ${new Date().toISOString()} / (root) HIT! ---`);
  res.send('Digital Ad Co-Op Backend (Minimal Test Version)');
});

// Test POST route - keep for testing
app.post('/api/test-post', (req, res) => {
  console.log(`--- ${new Date().toISOString()} /api/test-post HIT! ---`);
  res.status(200).json({ message: "POST test successful (Minimal Test Version)" });
});

// API Routes - This will use your "bare bones" routes/index.js
console.log('--- [server.js] Mounting /api routes (should be empty from minimal routes/index.js) ---');
app.use('/api', routes);

// SPA Fallback - keep for structure
app.get('*', (req, res) => {
  console.log(`--- ${new Date().toISOString()} SPA Fallback (*) HIT! Path: ${req.path} ---`);
  res.sendFile(path.join(frontendDistPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`--- [server.js] Minimal test server running on port ${PORT} ---`);
});
