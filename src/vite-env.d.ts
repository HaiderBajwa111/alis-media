/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SCRIPT_ID: string;
  // Add other environment variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}