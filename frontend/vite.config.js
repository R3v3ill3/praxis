import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true, // 👈 This enables .map files for better debugging
  },
  resolve: {
    alias: {
      '@schemas': path.resolve(__dirname, '../schemas'),
    },
  },
});
