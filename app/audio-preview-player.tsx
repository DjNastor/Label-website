"use client";

/* eslint-disable @next/next/no-img-element */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";

import {
  selectedSoundToPreviewTrack,
  type AudioPreviewTrack,
  type SelectedSound,
} from "./audio-preview";

type AudioPreviewContextValue = {
  currentTrack: AudioPreviewTrack | null;
  hasPreview: boolean;
  isPlaying: boolean;
  progress: number;
  registerTracks: (tracks: AudioPreviewTrack[]) => void;
  selectTrack: (track: AudioPreviewTrack) => void;
  togglePlayback: () => void;
  skipTrack: (direction: 1 | -1) => void;
  seekToRatio: (ratio: number) => void;
  dismissPlayer: () => void;
};

const AudioPreviewContext = createContext<AudioPreviewContextValue | null>(null);

export function AudioPreviewProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [tracks, setTracks] = useState<AudioPreviewTrack[]>([]);
  const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const currentTrack = useMemo(
    () => tracks.find((track) => track.id === currentTrackId) ?? null,
    [currentTrackId, tracks],
  );
  const hasPreview = Boolean(currentTrack?.previewUrl);

  const registerTracks = useCallback((nextTracks: AudioPreviewTrack[]) => {
    if (nextTracks.length === 0) return;

    setTracks((currentTracks) => {
      const merged = new Map(currentTracks.map((track) => [track.id, track]));
      nextTracks.forEach((track) => merged.set(track.id, track));
      return [...merged.values()];
    });

  }, []);

  const selectTrack = useCallback(
    (track: AudioPreviewTrack) => {
      registerTracks([track]);
      setCurrentTrackId(track.id);
      setProgress(0);
      setIsPlaying(Boolean(track.previewUrl));
    },
    [registerTracks],
  );

  const togglePlayback = useCallback(() => {
    if (!currentTrack?.previewUrl) return;
    setIsPlaying((playing) => !playing);
  }, [currentTrack?.previewUrl]);

  const skipTrack = useCallback(
    (direction: 1 | -1) => {
      if (tracks.length === 0) return;

      const currentIndex = Math.max(
        0,
        tracks.findIndex((track) => track.id === currentTrackId),
      );
      const nextIndex = (currentIndex + direction + tracks.length) % tracks.length;
      const nextTrack = tracks[nextIndex];

      setCurrentTrackId(nextTrack.id);
      setProgress(0);
      setIsPlaying(Boolean(nextTrack.previewUrl && isPlaying));
    },
    [currentTrackId, isPlaying, tracks],
  );

  const dismissPlayer = useCallback(() => { setIsPlaying(false); setProgress(0); setCurrentTrackId(null); }, []);

  const seekToRatio = useCallback(
    (ratio: number) => {
      const audio = audioRef.current;
      if (!audio || !currentTrack?.previewUrl || !Number.isFinite(audio.duration)) {
        return;
      }

      const safeRatio = Math.min(1, Math.max(0, ratio));
      audio.currentTime = audio.duration * safeRatio;
      setProgress(safeRatio);
    },
    [currentTrack?.previewUrl],
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!currentTrack?.previewUrl) {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      return;
    }

    if (audio.getAttribute("src") !== currentTrack.previewUrl) {
      audio.src = currentTrack.previewUrl;
      audio.load();
    }

    if (!isPlaying) {
      audio.pause();
      return;
    }

    void audio.play().catch(() => {
      setIsPlaying(false);
    });
  }, [currentTrack?.id, currentTrack?.previewUrl, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const audioElement = audio;

    function handleTimeUpdate() {
      if (!audioElement.duration || !Number.isFinite(audioElement.duration)) {
        setProgress(0);
        return;
      }

      setProgress(audioElement.currentTime / audioElement.duration);
    }

    function handleEnded() {
      setIsPlaying(false);
      setProgress(0);
      skipTrack(1);
    }

    audioElement.addEventListener("timeupdate", handleTimeUpdate);
    audioElement.addEventListener("ended", handleEnded);

    return () => {
      audioElement.removeEventListener("timeupdate", handleTimeUpdate);
      audioElement.removeEventListener("ended", handleEnded);
    };
  }, [skipTrack]);

  const value = useMemo(
    () => ({
      currentTrack,
      hasPreview,
      isPlaying,
      progress,
      registerTracks,
      selectTrack,
      togglePlayback,
      skipTrack,
      seekToRatio,
      dismissPlayer,
    }),
    [
      currentTrack,
      hasPreview,
      isPlaying,
      progress,
      registerTracks,
      selectTrack,
      togglePlayback,
      skipTrack,
      seekToRatio,
      dismissPlayer,
    ],
  );

  return (
    <AudioPreviewContext.Provider value={value}>
      {children}
      <audio ref={audioRef} preload="metadata" />
    </AudioPreviewContext.Provider>
  );
}

export function useAudioPreview() {
  const context = useContext(AudioPreviewContext);

  if (!context) {
    throw new Error("useAudioPreview must be used inside AudioPreviewProvider");
  }

  return context;
}

export function PreviewPlayer() {
  const { currentTrack, hasPreview, isPlaying, progress, togglePlayback, skipTrack, seekToRatio, dismissPlayer } = useAudioPreview();
  const [isExpanded, setIsExpanded] = useState(true);
  const bars = useMemo(() => makeWaveformBars(currentTrack?.id ?? "lukulu-preview"), [currentTrack?.id]);
  useEffect(() => { if (!currentTrack) return; setIsExpanded(true); const timer = window.setTimeout(() => setIsExpanded(false), 6500); return () => window.clearTimeout(timer); }, [currentTrack?.id]);
  function handleWaveformClick(event: MouseEvent<HTMLButtonElement>) { const rect = event.currentTarget.getBoundingClientRect(); seekToRatio((event.clientX - rect.left) / rect.width); }
  if (!currentTrack) return null;
  return <aside className={"audio-preview-player " + (isExpanded ? "is-expanded" : "is-compact")} aria-label="Audio preview player" data-playing={isPlaying ? "true" : "false"}>
    <button className="audio-player-toggle" type="button" onClick={() => setIsExpanded(v => !v)} aria-expanded={isExpanded} aria-label={isExpanded ? "Minimize audio player" : "Expand audio player"}>{isExpanded ? "Minimize" : "Now playing"}</button>
    <button className="audio-player-close" type="button" onClick={dismissPlayer} aria-label="Close audio player"><span aria-hidden="true">×</span></button>
    <div className="audio-preview-meta"><span className="audio-preview-label">{currentTrack.sourceLabel ?? "Preview player"}</span><strong>{currentTrack.title}</strong><p>{currentTrack.artist}</p></div>
    <div className="audio-preview-controls"><button className="audio-control audio-control-skip" type="button" onClick={() => skipTrack(-1)} aria-label="Previous track">←</button><button className="audio-control audio-control-main" type="button" onClick={togglePlayback} disabled={!hasPreview} aria-label={isPlaying ? "Pause preview" : "Play preview"}><span className="audio-control-icon" aria-hidden="true">{isPlaying ? "Ⅱ" : "▶"}</span><span className="audio-control-text">{isPlaying ? "Pause" : "Play"}</span></button><button className="audio-control audio-control-skip" type="button" onClick={() => skipTrack(1)} aria-label="Next track">→</button></div>
    <button className="audio-preview-waveform" type="button" onClick={handleWaveformClick} disabled={!hasPreview} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress*100)} aria-label={hasPreview ? "Seek through the current preview" : "Preview audio unavailable"}>{bars.map((height,index)=><span className={index/(bars.length-1)<=progress?"is-lit":""} key={index} style={{"--bar-height":height+"%"} as CSSProperties}/>)}</button>
    <div className="audio-preview-links"><span>{hasPreview?"Preview ready":"Preview unavailable"}</span>{currentTrack.purchaseUrl?<a href={currentTrack.purchaseUrl} target="_blank" rel="noreferrer">Buy full</a>:null}{currentTrack.streamUrl?<a href={currentTrack.streamUrl} target="_blank" rel="noreferrer">Stream</a>:null}</div>
  </aside>;
}

export function SelectedSoundsGrid({
  sounds,
  purchaseUrl,
  streamUrl,
}: {
  sounds: SelectedSound[];
  purchaseUrl: string;
  streamUrl: string;
}) {
  const { currentTrack, registerTracks, selectTrack } = useAudioPreview();
  const tracks = useMemo(
    () =>
      sounds.map((sound) =>
        selectedSoundToPreviewTrack(sound, purchaseUrl, streamUrl),
      ),
    [purchaseUrl, sounds, streamUrl],
  );

  useEffect(() => {
    registerTracks(tracks);
  }, [registerTracks, tracks]);

  return (
    <div className="cover-grid">
      {sounds.map((sound, index) => {
        const track = tracks[index];
        const active = currentTrack?.id === track.id;

        return (
          <button
            className="cover-card"
            type="button"
            key={track.id}
            onClick={() => selectTrack(track)}
            aria-pressed={active}
            aria-label={"Preview " + sound.title + " by " + sound.artist}
          >
            <div className="cover-image">
              <img
                src={sound.image}
                alt={sound.alt}
                width="1200"
                height="1200"
                loading="lazy"
                decoding="async"
              />
              <span className="cover-play" aria-hidden="true">
                &#9654;
              </span>
            </div>
            <div className="cover-copy">
              <p>{sound.type}</p>
              <h3>{sound.title}</h3>
              <span>{sound.artist}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function makeWaveformBars(seed: string) {
  let hash = 0;

  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + seed.charCodeAt(index)) % 9973;
  }

  return Array.from({ length: 34 }, (_, index) => {
    hash = (hash * 37 + index * 17 + 23) % 9973;
    return 28 + (hash % 58);
  });
}
