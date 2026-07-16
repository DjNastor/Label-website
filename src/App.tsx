import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar, Page } from './components/Navbar';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { SongForm } from './pages/SongForm';
import { GeneratedDocs } from './pages/GeneratedDocs';
import { ContractAnalyzer } from './pages/ContractAnalyzer';
import { KnowledgeHub } from './pages/KnowledgeHub';
import { Quiz } from './pages/Quiz';
import { defaultSongs, Song } from './lib/songs';

const storageKey = 'phusha-songs';

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
  const [activeSongId, setActiveSongId] = useState(songs[0]?.id ?? '');

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(songs));
  }, [songs]);

  const activeSong = songs.find((song) => song.id === activeSongId) ?? songs[0];

  const saveSong = (song: Song) => {
    setSongs((current) => [song, ...current.filter((item) => item.id !== song.id)]);
    setActiveSongId(song.id);
    setCurrentPage('generated-docs');
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
