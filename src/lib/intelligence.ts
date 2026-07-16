import { Song } from './songs';

export type IntegrationStatus = 'connected' | 'needs_config' | 'ready_to_connect';

export type ArtistProfile = {
  id: string;
  name: string;
  spotifyId: string;
  monthlyListeners: number;
  followers: number;
  topCity: string;
  genres: string[];
  imageUrl: string;
  lastImportedAt: string;
};

export type SocialFeedItem = {
  id: string;
  platform: 'Instagram' | 'Facebook' | 'TikTok' | 'YouTube' | 'X';
  handle: string;
  text: string;
  engagement: number;
  sentiment: 'positive' | 'neutral' | 'watch';
  publishedAt: string;
};

export type NewsItem = {
  id: string;
  headline: string;
  summary: string;
  priority: 'high' | 'medium' | 'low';
  source: string;
  createdAt: string;
};

export type LabelWorkspace = {
  spotifyStatus: IntegrationStatus;
  spotifyAccount: string;
  lastCatalogueImportAt: string;
  lastApiSyncAt: string;
  lastApiError: string;
  artists: ArtistProfile[];
  socialFeeds: SocialFeedItem[];
  newsFeed: NewsItem[];
};

export const defaultWorkspace: LabelWorkspace = {
  spotifyStatus: 'needs_config',
  spotifyAccount: '',
  lastCatalogueImportAt: '',
  lastApiSyncAt: '',
  lastApiError: '',
  artists: [],
  socialFeeds: [],
  newsFeed: []
};

export const spotifyCatalogueSeed: Song[] = [
  {
    id: 'spotify-001',
    title: 'Midnight Over Mamelodi',
    artist: 'Lukulu Sound System',
    featuredArtists: 'Nia Keys',
    genre: 'Amapiano',
    releaseDate: '2026-06-14',
    publisher: 'Lukulu Publishing',
    label: 'Lukulu Recordings',
    isrc: 'ZA-LKR-26-00001',
    status: 'Pending Submission',
    collaborators: [
      { name: 'Lukulu Sound System', role: 'Composer', split: 60 },
      { name: 'Nia Keys', role: 'Lyricist', split: 40 }
    ],
    documents: ['samro', 'capasso', 'sampra', 'metadata'],
    createdAt: '2026-07-16T07:00:00.000Z'
  },
  {
    id: 'spotify-002',
    title: 'Royalty Run',
    artist: 'Kasi Wave',
    featuredArtists: '',
    genre: 'Hip Hop',
    releaseDate: '2026-05-03',
    publisher: 'Phusha Works',
    label: 'Lukulu Recordings',
    isrc: 'ZA-LKR-26-00002',
    status: 'Ready to Submit',
    collaborators: [{ name: 'Kasi Wave', role: 'Composer', split: 100 }],
    documents: ['samro', 'split', 'metadata'],
    createdAt: '2026-07-16T07:05:00.000Z'
  },
  {
    id: 'spotify-003',
    title: 'Jozi Sunrise',
    artist: 'Naledi M',
    featuredArtists: 'DJ Kasi',
    genre: 'Afrobeats',
    releaseDate: '2026-04-19',
    publisher: 'Naledi Music',
    label: 'Lukulu Recordings',
    isrc: 'ZA-LKR-26-00003',
    status: 'Draft',
    collaborators: [
      { name: 'Naledi M', role: 'Composer', split: 70 },
      { name: 'DJ Kasi', role: 'Producer', split: 30 }
    ],
    documents: ['samro', 'capasso', 'split', 'metadata'],
    createdAt: '2026-07-16T07:10:00.000Z'
  }
];

export const artistProfileSeed: ArtistProfile[] = [
  {
    id: 'artist-lukulu-sound-system',
    name: 'Lukulu Sound System',
    spotifyId: 'spotify:artist:lukulu-sound-system',
    monthlyListeners: 184200,
    followers: 48200,
    topCity: 'Johannesburg',
    genres: ['Amapiano', 'Afro House'],
    imageUrl: '',
    lastImportedAt: '2026-07-16T07:00:00.000Z'
  },
  {
    id: 'artist-kasi-wave',
    name: 'Kasi Wave',
    spotifyId: 'spotify:artist:kasi-wave',
    monthlyListeners: 73900,
    followers: 21100,
    topCity: 'Pretoria',
    genres: ['Hip Hop', 'Kwaito'],
    imageUrl: '',
    lastImportedAt: '2026-07-16T07:00:00.000Z'
  },
  {
    id: 'artist-naledi-m',
    name: 'Naledi M',
    spotifyId: 'spotify:artist:naledi-m',
    monthlyListeners: 121500,
    followers: 34400,
    topCity: 'Cape Town',
    genres: ['Afrobeats', 'R&B'],
    imageUrl: '',
    lastImportedAt: '2026-07-16T07:00:00.000Z'
  }
];

export const socialFeedSeed: SocialFeedItem[] = [
  {
    id: 'social-001',
    platform: 'Instagram',
    handle: '@lukulurecordings',
    text: 'Studio clips from the Midnight Over Mamelodi session are getting saves from DJs and playlist curators.',
    engagement: 842,
    sentiment: 'positive',
    publishedAt: '2026-07-16T06:30:00.000Z'
  },
  {
    id: 'social-002',
    platform: 'TikTok',
    handle: '@kasiwave',
    text: 'Royalty Run hook challenge is being reused by dance creators, but comments keep asking for the official release link.',
    engagement: 1260,
    sentiment: 'watch',
    publishedAt: '2026-07-16T05:45:00.000Z'
  },
  {
    id: 'social-003',
    platform: 'YouTube',
    handle: 'Lukulu Recordings',
    text: 'Jozi Sunrise visualizer has steady watch time and strong South African discovery traffic.',
    engagement: 615,
    sentiment: 'positive',
    publishedAt: '2026-07-15T20:20:00.000Z'
  }
];

export function buildNewsFeed(songs: Song[], feeds: SocialFeedItem[], artists: ArtistProfile[]): NewsItem[] {
  const newestSong = songs[0];
  const hottestPost = [...feeds].sort((a, b) => b.engagement - a.engagement)[0];
  const biggestArtist = [...artists].sort((a, b) => b.monthlyListeners - a.monthlyListeners)[0];
  const now = new Date().toISOString();

  return [
    {
      id: `news-catalogue-${Date.now()}`,
      headline: `${newestSong?.title ?? 'New catalogue'} is ready for rights follow-up`,
      summary: newestSong
        ? `${newestSong.artist} has ${newestSong.documents.length} document types prepared. Prioritize unfinished CMO submissions while the release is still fresh.`
        : 'Import the Spotify catalogue to unlock release-level news and rights recommendations.',
      priority: newestSong?.status === 'Registered' ? 'medium' : 'high',
      source: 'Catalogue intelligence',
      createdAt: now
    },
    {
      id: `news-social-${Date.now()}`,
      headline: hottestPost ? `${hottestPost.platform} momentum needs routing` : 'Social feeds need import',
      summary: hottestPost
        ? `${hottestPost.handle} is showing ${hottestPost.engagement.toLocaleString('en-ZA')} engagement. Convert that attention into a release link, playlist pitch, or creator follow-up.`
        : 'Import social feeds so the AI news desk can detect audience signals.',
      priority: hottestPost?.sentiment === 'watch' ? 'high' : 'medium',
      source: 'Social feed intelligence',
      createdAt: now
    },
    {
      id: `news-artist-${Date.now()}`,
      headline: biggestArtist ? `${biggestArtist.name} leads artist profile reach` : 'Artist profiles are not imported yet',
      summary: biggestArtist
        ? `${biggestArtist.name} has ${biggestArtist.monthlyListeners.toLocaleString('en-ZA')} monthly listeners, with ${biggestArtist.topCity} as the strongest city. Build label news around that market first.`
        : 'Connect Spotify and import artist profiles to generate audience-led label news.',
      priority: 'medium',
      source: 'Artist profile intelligence',
      createdAt: now
    }
  ];
}

export function hasSpotifyConfig() {
  return Boolean(import.meta.env.VITE_SPOTIFY_API_URL || import.meta.env.VITE_SPOTIFY_CLIENT_ID);
}

export function hasSpotifyApi() {
  return Boolean(import.meta.env.VITE_SPOTIFY_API_URL);
}
