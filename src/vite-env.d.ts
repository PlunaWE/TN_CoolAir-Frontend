/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_PIWIK_PRO_SITE_ID?: string;
  readonly VITE_PIWIK_PRO_CONTAINER_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
