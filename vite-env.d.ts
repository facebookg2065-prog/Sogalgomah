/**
 * Fix: Removed problematic triple-slash reference to 'vite/client' which was not found in this environment.
 */

/**
 * Fix: Made 'aistudio' optional to ensure compatibility with existing global definitions 
 * and fix the "identical modifiers" error. This also aligns with the runtime checks 
 * performed in hooks/useGeminiLive.ts.
 */
interface Window {
  aistudio?: {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  };
}

declare namespace NodeJS {
  interface ProcessEnv {
    API_KEY: string | undefined;
    NODE_ENV: 'development' | 'production' | 'test';
    [key: string]: string | undefined;
  }
}
