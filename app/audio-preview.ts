import { catalogUrl, type CatalogRelease } from "./catalog";

export type AudioPreviewTrack = {
  id: string;
  title: string;
  artist: string;
  subtitle?: string;
  code?: string;
  artworkUrl?: string;
  previewUrl?: string;
  purchaseUrl: string;
  streamUrl?: string;
  spotifyEmbedUrl?: string;
  sourceLabel?: string;
};

export type SelectedSound = {
  title: string;
  artist: string;
  type: string;
  image: string;
  alt: string;
  previewUrl?: string;
  purchaseUrl?: string;
  streamUrl?: string;
  spotifyEmbedUrl?: string;
};

export function releaseToPreviewTrack(
  release: CatalogRelease,
  streamUrl?: string,
): AudioPreviewTrack {
  return {
    id: "release-" + release.id,
    title: release.title,
    artist: release.artist,
    subtitle: release.date,
    code: release.code,
    previewUrl: release.previewUrl,
    purchaseUrl: release.href || catalogUrl,
    streamUrl,
    sourceLabel: "Latest release",
  };
}

export function selectedSoundToPreviewTrack(
  sound: SelectedSound,
  fallbackPurchaseUrl: string,
  fallbackStreamUrl?: string,
): AudioPreviewTrack {
  return {
    id: "sound-" + slugify(sound.artist + "-" + sound.title),
    title: sound.title,
    artist: sound.artist,
    subtitle: sound.type,
    artworkUrl: sound.image,
    previewUrl: sound.previewUrl,
    purchaseUrl: sound.purchaseUrl || fallbackPurchaseUrl,
    streamUrl: sound.streamUrl || fallbackStreamUrl,
    spotifyEmbedUrl: sound.spotifyEmbedUrl,
    sourceLabel: "Selected sound",
  };
}

function slugify(value: string) {
  return value.toLocaleLowerCase("en-ZA").replace(/[^a-z0-9]+/g, "-");
}
