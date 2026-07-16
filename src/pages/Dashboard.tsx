import { motion } from 'framer-motion';
import { MusicIcon, FileTextIcon, AlertTriangleIcon, CheckCircleIcon, PlusIcon, UploadIcon, BookOpenIcon, AwardIcon, BotIcon } from 'lucide-react';
import { Page } from '../components/Navbar';
import { documentLabels, Song } from '../lib/songs';

interface DashboardProps {
  setPage: (page: Page) => void;
  songs: Song[];
  selectSong: (id: string) => void;
}

export function Dashboard({ setPage, songs, selectSong }: DashboardProps) {
  const formsGenerated = songs.reduce((total, song) => total + song.documents.length, 0);
  const pendingCount = songs.filter((song) => song.status !== 'Registered').length;
  const royaltyEstimate = songs.length * 425;

  const stats = [
    { label: 'Total Songs', value: String(songs.length), icon: MusicIcon, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Forms Generated', value: String(formsGenerated), icon: FileTextIcon, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { label: 'Pending Submissions', value: String(pendingCount), icon: AlertTriangleIcon, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
    { label: 'Estimated Royalties', value: `R ${royaltyEstimate.toLocaleString('en-ZA')}`, icon: CheckCircleIcon, color: 'text-green-400', bg: 'bg-green-400/10' }
  ];

  return (
    <div className="min-h-screen bg-navy py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, Artist</h1>
            <p className="text-gray-400">Your catalog, documents, and rights tasks are synced on this device.</p>
          </div>
          <button onClick={() => setPage('song-form')} className="mt-4 md:mt-0 bg-gold hover:bg-gold-hover text-navy font-semibold px-6 py-3 rounded-xl flex items-center transition-colors shadow-lg">
            <PlusIcon className="w-5 h-5 mr-2" />
            Register New Song
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, index) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} className="bg-navy-light border border-navy-lighter rounded-2xl p-6">
              <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center mb-4`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <h3 className="text-3xl font-syne font-bold mb-1">{stat.value}</h3>
              <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { page: 'contract' as Page, icon: UploadIcon, title: 'Analyze Contract', copy: 'Upload a deal and get plain-language risk flags.' },
            { page: 'intelligence' as Page, icon: BotIcon, title: 'AI Intelligence', copy: 'Import catalogues, artist profiles, social feeds, and label news.' },
            { page: 'knowledge' as Page, icon: BookOpenIcon, title: 'Knowledge Hub', copy: 'Learn about SAMRO, CAPASSO, SAMPRA, and royalties.' },
            { page: 'quiz' as Page, icon: AwardIcon, title: 'Take the Quiz', copy: 'Test your knowledge on music rights in South Africa.' }
          ].map((action) => (
            <button key={action.title} onClick={() => setPage(action.page)} className="bg-gradient-to-br from-navy-light to-navy border border-navy-lighter hover:border-gold/50 rounded-2xl p-6 text-left transition-all group">
              <action.icon className="w-8 h-8 text-gold mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-lg mb-2">{action.title}</h3>
              <p className="text-sm text-gray-400">{action.copy}</p>
            </button>
          ))}
        </div>

        <div className="bg-navy-light border border-navy-lighter rounded-2xl overflow-hidden">
          <div className="px-6 py-5 border-b border-navy-lighter flex justify-between items-center">
            <h2 className="text-xl font-bold">Recent Songs</h2>
            <span className="text-gray-500 text-sm">{formsGenerated} generated files</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-navy/50 text-gray-400 text-sm uppercase tracking-wider">
                  <th className="px-6 py-4 font-medium">Title</th>
                  <th className="px-6 py-4 font-medium">Artist</th>
                  <th className="px-6 py-4 font-medium">ISRC</th>
                  <th className="px-6 py-4 font-medium">Documents</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-lighter">
                {songs.map((song) => (
                  <tr key={song.id} className="hover:bg-navy/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">{song.title}</td>
                    <td className="px-6 py-4 text-gray-300">{song.artist}</td>
                    <td className="px-6 py-4 text-gray-400 font-mono text-sm">{song.isrc}</td>
                    <td className="px-6 py-4 text-gray-400 text-sm">{song.documents.slice(0, 2).map((id) => documentLabels[id]).join(', ')}{song.documents.length > 2 ? ` +${song.documents.length - 2}` : ''}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${song.status === 'Registered' ? 'bg-green-400/10 text-green-400' : 'bg-yellow-400/10 text-yellow-400'}`}>
                        {song.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => { selectSong(song.id); setPage('generated-docs'); }} className="text-gray-400 hover:text-gold transition-colors text-sm font-medium">
                        View docs
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
