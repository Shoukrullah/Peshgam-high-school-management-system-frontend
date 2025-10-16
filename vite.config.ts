 /// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,               // so you can use describe/it without import
    environment: 'jsdom',        // browser-like environment
    setupFiles: './vitest.setup.ts', // optional setup file
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'html'],
    },
  },
});
