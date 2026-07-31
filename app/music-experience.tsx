"use client";

import { SelectedSoundsGrid } from "./audio-preview-player";
import type { SelectedSound } from "./audio-preview";

const selectedSounds: SelectedSound[] = [
  {
    title: "Reach Deep",
    artist: "DJ Nastor & Lukulu",
    type: "Afro House · Spotify",
    image: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e0230a82fd101abb0c326577400",
    alt: "Reach Deep official Spotify artwork",
    streamUrl: "https://open.spotify.com/track/6NjY89dRoiNiOLREYUyBtt",
    spotifyEmbedUrl: "https://open.spotify.com/embed/track/6NjY89dRoiNiOLREYUyBtt?utm_source=generator&theme=0",
  },
  {
    title: "Massive",
    artist: "DJ Nastor",
    type: "Afro House",
    image: "/assets/massive.jpg",
    alt: "Massive by DJ Nastor",
    previewUrl: "/audio/dj-nastor-massive.mp3",
  },
  {
    title: "Follow The Sign",
    artist: "DJ Nastor",
    type: "Afro-Tech · Spotify",
    image: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02e4b17ef578b19c526a88ea6b",
    alt: "Follow the sign official Spotify artwork",
    previewUrl: "/audio/dj-nastor-follow-the-sign.mp3",
    streamUrl: "https://open.spotify.com/track/2777RkB8t0ftbSxsxG1b7E",
    spotifyEmbedUrl: "https://open.spotify.com/embed/track/2777RkB8t0ftbSxsxG1b7E?utm_source=generator&theme=0",
  },
  {
    title: "Lukulu Winter GO2",
    artist: "Various Artists",
    type: "DJ Chart",
    image: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000d72c68a3e6e90039589352d3074b",
    alt: "Lukulu Recordings official Spotify playlist artwork",
    streamUrl: "https://open.spotify.com/playlist/6skrxjmzEL0trnVnysbDdW",
    spotifyEmbedUrl: "https://open.spotify.com/embed/playlist/6skrxjmzEL0trnVnysbDdW?utm_source=generator&theme=0",
  },
];

export default function MusicExperience({
  catalogUrl,
  spotifyUrl,
}: {
  catalogUrl: string;
  spotifyUrl: string;
}) {
  return (
    <SelectedSoundsGrid
      sounds={selectedSounds}
      purchaseUrl={catalogUrl}
      streamUrl={spotifyUrl}
    />
  );
}
