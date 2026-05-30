/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_PIWIK_CONTAINER_ID?: string;
  readonly VITE_PIWIK_CONTAINER_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
