from datetime import datetime, timezone
import os
from typing import Any

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


app = FastAPI(title="Lukulu Label Intelligence API")

frontend_origins = [
    origin.strip()
    for origin in os.getenv("LABEL_FRONTEND_ORIGINS", "http://localhost:5173").split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=frontend_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class NewsRequest(BaseModel):
    songs: list[dict[str, Any]] = []
    artists: list[dict[str, Any]] = []
    socialFeeds: list[dict[str, Any]] = []


CATALOGUE = [
    {
        "id": "spotify-live-001",
        "title": "Midnight Over Mamelodi",
        "artist": "Lukulu Sound System",
        "featuredArtists": "Nia Keys",
        "genre": "Amapiano",
        "releaseDate": "2026-06-14",
        "publisher": "Lukulu Publishing",
        "label": "Lukulu Recordings",
        "isrc": "ZA-LKR-26-00001",
        "status": "Pending Submission",
        "collaborators": [
            {"name": "Lukulu Sound System", "role": "Composer", "split": 60},
            {"name": "Nia Keys", "role": "Lyricist", "split": 40},
        ],
        "documents": ["samro", "capasso", "sampra", "metadata"],
        "createdAt": "2026-07-16T07:00:00.000Z",
    },
    {
        "id": "spotify-live-002",
        "title": "Royalty Run",
        "artist": "Kasi Wave",
        "featuredArtists": "",
        "genre": "Hip Hop",
        "releaseDate": "2026-05-03",
        "publisher": "Phusha Works",
        "label": "Lukulu Recordings",
        "isrc": "ZA-LKR-26-00002",
        "status": "Ready to Submit",
        "collaborators": [{"name": "Kasi Wave", "role": "Composer", "split": 100}],
        "documents": ["samro", "split", "metadata"],
        "createdAt": "2026-07-16T07:05:00.000Z",
    },
]

ARTISTS = [
    {
        "id": "artist-lukulu-sound-system",
        "name": "Lukulu Sound System",
        "spotifyId": "spotify:artist:lukulu-sound-system",
        "monthlyListeners": 184200,
        "followers": 48200,
        "topCity": "Johannesburg",
        "genres": ["Amapiano", "Afro House"],
        "imageUrl": "",
        "lastImportedAt": "2026-07-16T07:00:00.000Z",
    },
    {
        "id": "artist-kasi-wave",
        "name": "Kasi Wave",
        "spotifyId": "spotify:artist:kasi-wave",
        "monthlyListeners": 73900,
        "followers": 21100,
        "topCity": "Pretoria",
        "genres": ["Hip Hop", "Kwaito"],
        "imageUrl": "",
        "lastImportedAt": "2026-07-16T07:00:00.000Z",
    },
]

SOCIAL_FEEDS = [
    {
        "id": "social-live-001",
        "platform": "Instagram",
        "handle": "@lukulurecordings",
        "text": "Studio clips from the Midnight Over Mamelodi session are getting saves from DJs and playlist curators.",
        "engagement": 842,
        "sentiment": "positive",
        "publishedAt": "2026-07-16T06:30:00.000Z",
    },
    {
        "id": "social-live-002",
        "platform": "TikTok",
        "handle": "@kasiwave",
        "text": "Royalty Run hook challenge is spreading, but comments keep asking for the official release link.",
        "engagement": 1260,
        "sentiment": "watch",
        "publishedAt": "2026-07-16T05:45:00.000Z",
    },
]


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "label-intelligence-api"}


@app.get("/spotify/authorize")
def spotify_authorize(return_to: str = "http://localhost:5173") -> dict[str, str]:
    if not os.getenv("SPOTIFY_CLIENT_ID"):
        return {
            "status": "needs_config",
            "message": "Set SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, and SPOTIFY_REDIRECT_URI to enable OAuth.",
            "return_to": return_to,
        }

    return {
        "status": "ready",
        "message": "Wire this endpoint to Spotify Authorization Code with PKCE before production use.",
        "return_to": return_to,
    }


@app.get("/spotify/catalogue")
def spotify_catalogue() -> dict[str, Any]:
    return {
        "account": os.getenv("SPOTIFY_ACCOUNT_NAME", "Lukulu Recordings Spotify for Artists"),
        "songs": CATALOGUE,
        "artists": ARTISTS,
    }


@app.get("/social/feeds")
def social_feeds() -> dict[str, Any]:
    return {"feeds": SOCIAL_FEEDS}


@app.post("/news/generate")
def generate_news(payload: NewsRequest) -> dict[str, Any]:
    newest_song = payload.songs[0] if payload.songs else None
    hottest_post = max(payload.socialFeeds, key=lambda item: item.get("engagement", 0), default=None)
    biggest_artist = max(payload.artists, key=lambda item: item.get("monthlyListeners", 0), default=None)

    return {
        "newsFeed": [
            {
                "id": f"news-catalogue-{int(datetime.now().timestamp())}",
                "headline": f"{newest_song.get('title', 'Catalogue')} needs rights follow-up" if newest_song else "Import catalogue to unlock release news",
                "summary": f"{newest_song.get('artist')} has documents ready. Prioritize CMO submission and DSP metadata cleanup." if newest_song else "No catalogue was supplied to the intelligence service.",
                "priority": "high",
                "source": "FastAPI label intelligence",
                "createdAt": now_iso(),
            },
            {
                "id": f"news-social-{int(datetime.now().timestamp())}",
                "headline": f"{hottest_post.get('platform')} engagement is ready to route" if hottest_post else "Import social feeds to generate momentum briefs",
                "summary": f"{hottest_post.get('handle')} has {hottest_post.get('engagement')} engagements. Route a follow-up post or playlist CTA." if hottest_post else "No social feed items were supplied to the intelligence service.",
                "priority": "medium",
                "source": "FastAPI label intelligence",
                "createdAt": now_iso(),
            },
            {
                "id": f"news-artist-{int(datetime.now().timestamp())}",
                "headline": f"{biggest_artist.get('name')} leads artist reach" if biggest_artist else "Import artist profiles to generate market briefs",
                "summary": f"{biggest_artist.get('name')} is strongest in {biggest_artist.get('topCity')}. Use that city as the first campaign lane." if biggest_artist else "No artist profile data was supplied to the intelligence service.",
                "priority": "medium",
                "source": "FastAPI label intelligence",
                "createdAt": now_iso(),
            },
        ]
    }
