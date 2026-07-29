# Lukulu Recordings

The official website for **Lukulu Recordings**, an independent South African label releasing Afro House, Afro-Tech and 3-Step music from Ladysmith to the world.

## Requirements

- Node.js 24.x
- npm

## Development

```bash
npm ci
npm run dev
npm run build
npm test
npm run lint
```

## Integrations

- `/api/catalog-sync` refreshes releases from configured Traxsource and Beatport label pages, with a curated fallback.
- `/api/news` aggregates RSS, Atom, JSON Feed, or simple JSON endpoints.
- Demo submissions use the [Lukulu Recordings LabelRadar portal](https://www.labelradar.com/labels/LukuluRecordings/portal).
- Audio previews are stored in `public/audio/`.

Optional variables:

```ini
TRAXSOURCE_LABEL_URL=https://www.traxsource.com/label/53294/lukulu-recordings
BEATPORT_LABEL_URL=https://www.beatport.com/label/lukulu-recordings/53294
SOCIAL_FEED_URLS=
```

## Deployment

Vercel uses Node.js 24, `npm ci`, and `npm run build`. GitHub Actions validates lint, build, and tests on pushes to `main` and pull requests.
