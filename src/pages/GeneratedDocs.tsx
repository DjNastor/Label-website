import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { DownloadIcon, ShareIcon, FileTextIcon, CheckCircleIcon } from 'lucide-react';
import { Page } from '../components/Navbar';
import { documentLabels, Song } from '../lib/songs';

interface GeneratedDocsProps {
  setPage: (page: Page) => void;
  song?: Song;
}

export function GeneratedDocs({ setPage, song }: GeneratedDocsProps) {
  const tabs = useMemo(() => {
    const ids = song?.documents.length ? song.documents : ['samro', 'split', 'metadata'];
    return ids.map((id) => ({ id, label: documentLabels[id] ?? id.toUpperCase() }));
  }, [song]);
  const [activeTab, setActiveTab] = useState(tabs[0]?.id ?? 'samro');
  const currentTab = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];

  if (!song) {
    return (
      <div className="min-h-screen bg-navy py-12 flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <FileTextIcon className="w-12 h-12 text-gold mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-3">No song selected</h1>
          <p className="text-gray-400 mb-6">Register a song first, then PHUSHA will prepare the forms from your catalog data.</p>
          <button onClick={() => setPage('song-form')} className="bg-gold hover:bg-gold-hover text-navy px-6 py-3 rounded-xl font-bold">Register Song</button>
        </div>
      </div>
    );
  }

  const fileName = `${sanitizeFilePart(currentTab?.label ?? 'Document')}_${sanitizeFilePart(song.title)}.${activeTab === 'metadata' ? 'csv' : 'pdf'}`;

  return (
    <div className="min-h-screen bg-navy py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircleIcon className="w-10 h-10 text-green-400" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Documents Ready</h1>
          <p className="text-gray-400 text-lg">{song.title} now has {song.documents.length} generated document{song.documents.length === 1 ? '' : 's'} ready for review.</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex space-x-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeTab === tab.id ? 'bg-gold text-navy' : 'bg-navy-light text-gray-400 hover:text-white border border-navy-lighter'}`}>
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none flex items-center justify-center px-4 py-2.5 bg-navy-light border border-navy-lighter hover:border-gold/50 rounded-xl text-sm font-medium transition-colors">
              <ShareIcon className="w-4 h-4 mr-2" /> Share Pack
            </button>
            <button className="flex-1 sm:flex-none flex items-center justify-center px-4 py-2.5 bg-gold hover:bg-gold-hover text-navy rounded-xl text-sm font-bold transition-colors shadow-lg">
              <DownloadIcon className="w-4 h-4 mr-2" /> Download Pack
            </button>
          </div>
        </div>

        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-lg shadow-2xl overflow-hidden min-h-[600px] relative">
          <div className="bg-gray-100 border-b border-gray-200 px-6 py-4 flex flex-col md:flex-row gap-3 justify-between md:items-center text-navy">
            <div className="flex items-center min-w-0">
              <FileTextIcon className="w-5 h-5 text-gray-500 mr-2 shrink-0" />
              <span className="font-medium truncate">{fileName}</span>
            </div>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
              <DownloadIcon className="w-4 h-4 mr-1" /> Download
            </button>
          </div>

          <div className="p-8 md:p-16 text-gray-800 font-serif max-w-3xl mx-auto">
            {activeTab === 'metadata' ? (
              <pre className="bg-gray-950 text-green-300 rounded-lg p-5 overflow-x-auto text-sm font-mono">{`title,artist,featured_artists,genre,release_date,isrc,label,publisher
"${song.title}","${song.artist}","${song.featuredArtists}","${song.genre}","${song.releaseDate}","${song.isrc}","${song.label}","${song.publisher}"`}</pre>
            ) : (
              <div className="space-y-8">
                <div className="text-center border-b-2 border-black pb-6 mb-8">
                  <h2 className="text-2xl font-bold tracking-widest uppercase">{currentTab?.label}</h2>
                  <p className="text-sm uppercase tracking-wider mt-2">Generated by PHUSHA Music Rights Assistant</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div className="border border-gray-300 p-4">
                    <span className="text-gray-500 text-xs uppercase block mb-1">Title of Work</span>
                    <span className="font-bold text-lg">{song.title}</span>
                  </div>
                  <div className="border border-gray-300 p-4">
                    <span className="text-gray-500 text-xs uppercase block mb-1">Primary Artist</span>
                    <span className="font-bold text-lg">{song.artist}</span>
                  </div>
                  <div className="border border-gray-300 p-4">
                    <span className="text-gray-500 text-xs uppercase block mb-1">ISRC Code</span>
                    <span className="font-mono text-lg">{song.isrc}</span>
                  </div>
                  <div className="border border-gray-300 p-4">
                    <span className="text-gray-500 text-xs uppercase block mb-1">Release Date</span>
                    <span className="font-bold text-lg">{song.releaseDate || 'To be confirmed'}</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold border-b border-gray-300 pb-2 mb-4">Interested Parties</h3>
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-2 text-left">Name</th>
                        <th className="border border-gray-300 p-2 text-left">Role</th>
                        <th className="border border-gray-300 p-2 text-center">Share %</th>
                        <th className="border border-gray-300 p-2 text-center">Signature</th>
                      </tr>
                    </thead>
                    <tbody>
                      {song.collaborators.map((person) => (
                        <tr key={`${person.name}-${person.role}`}>
                          <td className="border border-gray-300 p-3 font-medium">{person.name}</td>
                          <td className="border border-gray-300 p-3">{person.role}</td>
                          <td className="border border-gray-300 p-3 text-center">{person.split}%</td>
                          <td className="border border-gray-300 p-3" />
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        <div className="mt-8 text-center">
          <button onClick={() => setPage('dashboard')} className="text-gray-400 hover:text-white transition-colors underline">Return to Dashboard</button>
        </div>
      </div>
    </div>
  );
}

function sanitizeFilePart(value: string) {
  return value.trim().replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '');
}
