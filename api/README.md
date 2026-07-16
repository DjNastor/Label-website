# Lukulu Label Intelligence API

Minimal FastAPI-compatible service for the frontend intelligence workspace.

## Local Run

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
fastapi dev main.py
```

Then set the frontend env values:

```ini
VITE_SPOTIFY_API_URL=http://localhost:8000
VITE_SOCIAL_FEEDS_API_URL=http://localhost:8000
VITE_AI_INTELLIGENCE_API_URL=http://localhost:8000
```

## Production Notes

The current service exposes the correct endpoint shapes and deterministic fallback data. To complete the live goal, replace the stub internals with:

- Spotify Authorization Code with PKCE and catalogue/profile calls.
- Social provider connectors or approved feed ingestion.
- OpenAI-backed news generation after `OPENAI_API_KEY` is securely provisioned.

`uvx fastapi-new` is not installed in this environment, so this service was added manually instead of scaffolded with FastAPI Cloud tooling.
