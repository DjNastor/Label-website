/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUBLIC_APP_URL?: string;
  readonly VITE_SPOTIFY_API_URL?: string;
  readonly VITE_SPOTIFY_CLIENT_ID?: string;
  readonly VITE_SPOTIFY_REDIRECT_URI?: string;
  readonly VITE_SOCIAL_FEEDS_API_URL?: string;
  readonly VITE_AI_INTELLIGENCE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
