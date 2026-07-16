"use client";

import { SelectedSoundsGrid } from "./audio-preview-player";
import type { SelectedSound } from "./audio-preview";

const selectedSounds: SelectedSound[] = [
  {
    title: "Reach Deep",
    artist: "DJ Nastor",
    type: "Afro House",
    image: "/assets/reach-deep.jpg",
    alt: "Reach Deep by DJ Nastor",
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
    type: "Afro-Tech",
    image: "/assets/dj-nastor.jpg",
    alt: "Follow The Sign by DJ Nastor",
    previewUrl: "/audio/dj-nastor-follow-the-sign.mp3",
  },
  {
    title: "Lukulu Winter GO2",
    artist: "Various Artists",
    type: "DJ Chart",
    image: "/assets/winter-go2.jpg",
    alt: "Lukulu Winter GO2 by Various Artists",
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
