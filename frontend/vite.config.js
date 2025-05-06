import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Import the path module

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Add the alias mapping '@schemas' to the actual location
      // __dirname is the directory where vite.config.js resides (frontend/)
      // '../backend/schemas' is the relative path from frontend/ to backend/schemas
      '@schemas': path.resolve(__dirname, '../schemas'),
    },
  },
});
