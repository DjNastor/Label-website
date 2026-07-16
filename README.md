# Lukulu Recordings Label Intelligence

Vite app for music-rights registration, catalogue import, artist profile intelligence, social feed monitoring, and AI-assisted label news.

## Getting Started

1. Run `npm install`
2. Copy `.env.example` to `.env.local` and fill the public URL/API endpoints you want to use.
3. Run `npm run dev`

## Label Intelligence APIs

The Intelligence tab can call live services when these values are configured:

```ini
VITE_PUBLIC_APP_URL=https://lukulu-recordings.vercel.app
VITE_SPOTIFY_API_URL=http://localhost:8000
VITE_SOCIAL_FEEDS_API_URL=http://localhost:8000
VITE_AI_INTELLIGENCE_API_URL=http://localhost:8000
```

The local API contract and FastAPI-compatible stub live in `api/`. See `docs/intelligence-api.md` for endpoint shapes.

## Verification

```powershell
npm run lint
npx tsc --noEmit
npm run build
```
