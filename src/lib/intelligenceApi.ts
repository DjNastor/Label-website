import { ArtistProfile, NewsItem, SocialFeedItem } from './intelligence';
import { Song } from './songs';

export type ApiResult<T> =
  | { ok: true; data: T; source: 'live' }
  | { ok: false; error: string; source: 'fallback' };

export type SpotifyImportPayload = {
  account: string;
  songs: Song[];
  artists: ArtistProfile[];
};

export type SocialFeedsPayload = {
  feeds: SocialFeedItem[];
};

export type NewsPayload = {
  newsFeed: NewsItem[];
};

export function getSpotifyAuthorizeUrl(returnTo: string) {
  const baseUrl = import.meta.env.VITE_SPOTIFY_API_URL;
  if (!baseUrl) return '';

  const url = new URL(joinUrl(baseUrl, '/spotify/authorize'));
  url.searchParams.set('return_to', returnTo);
  return url.toString();
}

export async function fetchSpotifyCatalogue(): Promise<ApiResult<SpotifyImportPayload>> {
  const baseUrl = import.meta.env.VITE_SPOTIFY_API_URL;
  if (!baseUrl) {
    return { ok: false, error: 'Spotify API URL is not configured.', source: 'fallback' };
  }

  return getJson<SpotifyImportPayload>(joinUrl(baseUrl, '/spotify/catalogue'));
}

export async function fetchSocialFeeds(): Promise<ApiResult<SocialFeedsPayload>> {
  const baseUrl = import.meta.env.VITE_SOCIAL_FEEDS_API_URL;
  if (!baseUrl) {
    return { ok: false, error: 'Social feeds API URL is not configured.', source: 'fallback' };
  }

  return getJson<SocialFeedsPayload>(joinUrl(baseUrl, '/social/feeds'));
}

export async function generateAiNewsFeed(input: {
  songs: Song[];
  artists: ArtistProfile[];
  socialFeeds: SocialFeedItem[];
}): Promise<ApiResult<NewsPayload>> {
  const baseUrl = import.meta.env.VITE_AI_INTELLIGENCE_API_URL;
  if (!baseUrl) {
    return { ok: false, error: 'AI intelligence API URL is not configured.', source: 'fallback' };
  }

  return postJson<NewsPayload>(joinUrl(baseUrl, '/news/generate'), input);
}

async function getJson<T>(url: string): Promise<ApiResult<T>> {
  try {
    const response = await fetch(url, {
      headers: { Accept: 'application/json' },
      credentials: 'include'
    });

    return parseResponse<T>(response);
  } catch (error) {
    return { ok: false, error: getErrorMessage(error), source: 'fallback' };
  }
}

async function postJson<T>(url: string, body: unknown): Promise<ApiResult<T>> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(body)
    });

    return parseResponse<T>(response);
  } catch (error) {
    return { ok: false, error: getErrorMessage(error), source: 'fallback' };
  }
}

async function parseResponse<T>(response: Response): Promise<ApiResult<T>> {
  if (!response.ok) {
    return {
      ok: false,
      error: `API returned ${response.status} ${response.statusText}`,
      source: 'fallback'
    };
  }

  return { ok: true, data: await response.json() as T, source: 'live' };
}

function joinUrl(baseUrl: string, path: string) {
  return `${baseUrl.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'API request failed.';
}
