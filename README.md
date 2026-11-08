# Lukulu Recordings — Website

A clean full-stack starter running on
[vinext](https://github.com/cloudflare/vinext), with optional Cloudflare D1 and
Drizzle support.

## Prerequisites

- Node.js `>=22.13.0`

## Quick Start

```bash
npm install
npm run dev
npm run build
```

This starter does not use `wrangler.jsonc`.

## Included Shape

- edit site code under `app/`
- `.openai/hosting.json` declares optional Sites D1 and R2 bindings
- `vite.config.ts` simulates declared bindings for local development
- `db/schema.ts` starts intentionally empty
- `examples/d1/` contains an optional D1 example surface
- `drizzle.config.ts` supports local migration generation when needed

## Lukulu Recordings Integrations

- `/api/catalog-sync` is the platform catalog refresh contract. It tries the
  configured Traxsource and Beatport label URLs, returns normalized release
  rows, and falls back to the curated catalog when a source blocks or times out.
- `/api/news` automatically aggregates short headlines from MusicTech and
  Attack Magazine RSS feeds. Set comma-separated `SOCIAL_FEED_URLS` to override
  those defaults with your own RSS, Atom or JSON Feed sources. Sources are requested in parallel, and Atom article links are supported. The homepage
  rotates linked stories every eight seconds and refreshes its feed every five
  minutes; if feeds fail, it displays clearly labelled curated label updates.
- `/api/store` loads digital products from `STORE_CATALOG_URL` (an HTTPS URL
  serving JSON). Until a catalog is connected, all product concepts are marked
  `coming_soon` and no checkout links are active.
- Demo submissions route through the Lukulu Recordings LabelRadar portal:
  `https://www.labelradar.com/labels/LukuluRecordings/portal`.
- The persistent preview player supports `previewUrl` fields in catalog data.
  Until platform preview URLs are available, it keeps track metadata, Buy links,
  and Stream links active while disabling playback honestly.

Optional production env vars:

```ini
TRAXSOURCE_LABEL_URL=https://www.traxsource.com/label/53294/lukulu-recordings
BEATPORT_LABEL_URL=https://www.beatport.com/label/lukulu-recordings/53294
SOCIAL_FEED_URLS=
STORE_CATALOG_URL=
```

## Homepage, Store and Auto News (November 2026)

The simplified public navigation is **Music / Store / Updates / Submit / About**.
The old artists listing has been replaced with a production-first Lukulu Store;
the releases, selected sounds, demo portal, company story and contact details
remain. The long sound-values and founder spotlight sections were removed to
reduce homepage scrolling.

**Store:** `/store` lets visitors filter VST Plugins, FL Studio Scripts,
Production Apps and Studio Tech. It accepts a remotely maintained catalog via
`STORE_CATALOG_URL`. Serve JSON with either a top-level array or
`{"products": [...]}`, where each row has:

```json
{
  "id": "your-unique-id",
  "name": "Your actual product",
  "category": "VST Plugins",
  "description": "A clear description of your published product.",
  "status": "available",
  "priceZar": 249,
  "checkoutUrl": "https://your-payment-provider.example/your-checkout-link",
  "compatibility": "Your confirmed OS, DAW and plugin-format requirements"
}
```

The object above is an **illustrative configuration example**, not a real
Lukulu product or payment link. Product titles, descriptions, and release
requirements must be approved before publishing. For a product to become
purchasable, `status` must be `available`, the ZAR price must be positive,
and `checkoutUrl` must be HTTPS. Otherwise it remains labelled Coming soon
with an email enquiry link. The site does **not** process payments itself,
provide protected downloads, issue licences or collect card details. Those
need a connected commerce provider and a tested fulfilment flow.

**News:** `/api/news` now defaults to syndicated headlines from MusicTech
(`https://musictech.com/feed/`) and Attack Magazine
(`https://www.attackmagazine.com/feed/`). Headlines link to the publisher;
brief excerpts are capped at 200 characters. Override `SOCIAL_FEED_URLS`
with a comma-separated feed list if desired. The page indicates whether
stories come from connected feeds or curated fallbacks. Auto-rotation pauses
for visitors who prefer reduced motion, and also offers manual controls.

To validate the branch before production:

```bash
npm ci
npm run lint
npm test
```

Review products, verify feed sources and links, and visually inspect mobile
and desktop previews before merging. The existing catalogue and demo endpoints
remain as before.

## Workspace Auth Headers

OpenAI workspace sites can read the current user's email from
`oai-authenticated-user-email`.

SIWC-authenticated workspace sites may also receive
`oai-authenticated-user-full-name` when the user's SIWC profile has a non-empty
`name` claim. The full-name value is percent-encoded UTF-8 and is accompanied by
`oai-authenticated-user-full-name-encoding: percent-encoded-utf-8`.

Treat the full name as optional and fall back to email when it is absent:

```tsx
import { headers } from "next/headers";

export default async function Home() {
  const requestHeaders = await headers();
  const email = requestHeaders.get("oai-authenticated-user-email");
  const encodedFullName = requestHeaders.get("oai-authenticated-user-full-name");
  const fullName =
    encodedFullName &&
    requestHeaders.get("oai-authenticated-user-full-name-encoding") ===
      "percent-encoded-utf-8"
      ? decodeURIComponent(encodedFullName)
      : null;

  const displayName = fullName ?? email;
  // ...
}
```

## Optional Dispatch-Owned ChatGPT Sign-In

Import the ready-to-use helpers from `app/chatgpt-auth.ts` when the site needs
optional or required ChatGPT sign-in:

- Use `getChatGPTUser()` for optional signed-in UI.
- Use `requireChatGPTUser(returnTo)` for server-rendered pages that should send
  anonymous visitors through Sign in with ChatGPT.
- Use `chatGPTSignInPath(returnTo)` and `chatGPTSignOutPath(returnTo)` for
  browser links or actions.
- Pass a same-origin relative `returnTo` path for the destination after sign-in
  or sign-out. The helper validates and safely encodes it.
- Mark protected pages with `export const dynamic = "force-dynamic"` because
  they depend on per-request identity headers.

Dispatch owns `/signin-with-chatgpt`, `/signout-with-chatgpt`, `/callback`, the
OAuth cookies, and identity header injection. Do not implement app routes for
those reserved paths. Routes that do not import and call the helper remain
anonymous-compatible.

SIWC establishes identity only; it does not prove workspace membership. Use the
Sites hosting platform's access policy controls for workspace-wide restrictions,
or enforce explicit server-side membership or allowlist checks.

Use SIWC for account pages, user-specific dashboards, saved records, and write
actions tied to the current ChatGPT user. Leave public content anonymous.

## Useful Commands

- `npm run dev`: start local development
- `npm run build`: verify the vinext build output
- `npm test`: build the site and run rendered-page, store checkout-safety and RSS/Atom news tests
- `npm run db:generate`: generate Drizzle migrations after schema changes

## Learn More

- [vinext Documentation](https://github.com/cloudflare/vinext)
- [Drizzle D1 Guide](https://orm.drizzle.team/docs/get-started/d1-new)
