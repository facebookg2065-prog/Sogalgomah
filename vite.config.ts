
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
// Explicitly import process to fix TypeScript error for cwd() method in Node environment
import process from 'node:process';

export default defineConfig(({ mode }) => {
  // Use process.cwd() to determine the current working directory for loading environment variables
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    base: './',
    define: {
      // Vercel يحقن المتغيرات في process.env مباشرة
      'process.env.API_KEY': JSON.stringify(env.API_KEY || env.GEMINI_API_KEY || ''),
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      emptyOutDir: true,
      sourcemap: false,
    },
    server: {
      historyApiFallback: true,
    }
  };
});
