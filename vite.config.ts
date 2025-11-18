import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    base: './', // Essential for GitHub Pages relative path routing
    define: {
      // Map the GEMINI_API_KEY from .env.local to process.env.API_KEY used in the app
      // Using JSON.stringify to ensure it's treated as a string literal in the build
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY || process.env.GEMINI_API_KEY),
      // We define process.env as an object to prevent "process is not defined" error, 
      // but we must be careful not to overwrite the specific key above.
      // However, 'define' does string replacement.
      // If code accesses process.env.NODE_ENV, we can polyfill it:
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      emptyOutDir: true,
      sourcemap: false,
    }
  };
});