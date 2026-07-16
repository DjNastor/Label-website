# Label Intelligence API Contract

The Vite app calls these optional backend endpoints when the matching env vars are set. If an endpoint is missing or fails, the app falls back to local sample data and displays the fallback reason in the Intelligence tab.

## Environment

```ini
VITE_SPOTIFY_API_URL=https://your-fastapi-service.example
VITE_SOCIAL_FEEDS_API_URL=https://your-fastapi-service.example
VITE_AI_INTELLIGENCE_API_URL=https://your-fastapi-service.example
VITE_PUBLIC_APP_URL=https://lukulu-recordings.vercel.app
```

## Spotify

`GET /spotify/authorize?return_to=<frontend-url>`

Starts Spotify OAuth. The backend should own token exchange and redirect back to the frontend when connected.

`GET /spotify/catalogue`

Returns:

```json
{
  "account": "Lukulu Recordings Spotify for Artists",
  "songs": [],
  "artists": []
}
```

`songs` must match the frontend `Song` shape in `src/lib/songs.ts`. `artists` must match `ArtistProfile` in `src/lib/intelligence.ts`.

## Social Feeds

`GET /social/feeds`

Returns:

```json
{
  "feeds": []
}
```

`feeds` must match `SocialFeedItem` in `src/lib/intelligence.ts`.

## AI News

`POST /news/generate`

Request:

```json
{
  "songs": [],
  "artists": [],
  "socialFeeds": []
}
```

Response:

```json
{
  "newsFeed": []
}
```

`newsFeed` must match `NewsItem` in `src/lib/intelligence.ts`.
