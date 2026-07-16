import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar, Page } from './components/Navbar';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { SongForm } from './pages/SongForm';
import { GeneratedDocs } from './pages/GeneratedDocs';
import { ContractAnalyzer } from './pages/ContractAnalyzer';
import { KnowledgeHub } from './pages/KnowledgeHub';
import { Quiz } from './pages/Quiz';
import { LabelIntelligence } from './pages/LabelIntelligence';
import { defaultWorkspace, LabelWorkspace, spotifyCatalogueSeed } from './lib/intelligence';
import { defaultSongs, Song } from './lib/songs';

const storageKey = 'phusha-songs';
const workspaceStorageKey = 'phusha-label-workspace';

export function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [songs, setSongs] = useState<Song[]>(() => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : defaultSongs;
    } catch {
      return defaultSongs;
    }
  });
  const [workspace, setWorkspace] = useState<LabelWorkspace>(() => {
    try {
      const stored = window.localStorage.getItem(workspaceStorageKey);
      return stored ? { ...defaultWorkspace, ...JSON.parse(stored) } : defaultWorkspace;
    } catch {
      return defaultWorkspace;
    }
  });
  const [activeSongId, setActiveSongId] = useState(songs[0]?.id ?? '');

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(songs));
  }, [songs]);

  useEffect(() => {
    window.localStorage.setItem(workspaceStorageKey, JSON.stringify(workspace));
  }, [workspace]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const spotifyState = params.get('spotify');
    if (spotifyState !== 'connected') return;

    setCurrentPage('intelligence');
    setWorkspace((current) => ({
      ...current,
      spotifyStatus: 'connected',
      spotifyAccount: params.get('account') ?? 'Spotify for Artists',
      lastApiSyncAt: new Date().toISOString(),
      lastApiError: ''
    }));

    params.delete('spotify');
    params.delete('account');
    const cleanQuery = params.toString();
    window.history.replaceState(
      null,
      '',
      `${window.location.pathname}${cleanQuery ? `?${cleanQuery}` : ''}${window.location.hash}`
    );
  }, []);

  const activeSong = songs.find((song) => song.id === activeSongId) ?? songs[0];

  const saveSong = (song: Song) => {
    setSongs((current) => [song, ...current.filter((item) => item.id !== song.id)]);
    setActiveSongId(song.id);
    setCurrentPage('generated-docs');
  };

  const importSpotifyCatalogue = (sourceSongs = spotifyCatalogueSeed) => {
    const existingIsrcs = new Set(songs.map((song) => song.isrc));
    const importedSongs = sourceSongs.filter((song) => !existingIsrcs.has(song.isrc));
    setSongs((current) => [...importedSongs, ...current]);
    if (importedSongs[0]) {
      setActiveSongId(importedSongs[0].id);
    }
    return {
      imported: importedSongs.length,
      skipped: sourceSongs.length - importedSongs.length
    };
  };

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 10
    },
    in: {
      opacity: 1,
      y: 0
    },
    out: {
      opacity: 0,
      y: -10
    }
  };
  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4
  };
  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage setPage={setCurrentPage} />;
      case 'dashboard':
        return <Dashboard setPage={setCurrentPage} songs={songs} selectSong={setActiveSongId} />;
      case 'song-form':
        return <SongForm songs={songs} saveSong={saveSong} />;
      case 'generated-docs':
        return <GeneratedDocs setPage={setCurrentPage} song={activeSong} />;
      case 'contract':
        return <ContractAnalyzer setPage={setCurrentPage} />;
      case 'knowledge':
        return <KnowledgeHub setPage={setCurrentPage} />;
      case 'quiz':
        return <Quiz setPage={setCurrentPage} />;
      case 'intelligence':
        return (
          <LabelIntelligence
            songs={songs}
            workspace={workspace}
            updateWorkspace={setWorkspace}
            importCatalogue={importSpotifyCatalogue}
          />
        );
      default:
        return <LandingPage setPage={setCurrentPage} />;
    }
  };
  return (
    <div className="min-h-screen bg-navy text-white font-inter selection:bg-gold/30 selection:text-gold">
      <Navbar currentPage={currentPage} setPage={setCurrentPage} />

      <AnimatePresence mode="wait">
        <motion.main
          key={currentPage}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="w-full">
          
          {renderPage()}
        </motion.main>
      </AnimatePresence>
    </div>);

}
