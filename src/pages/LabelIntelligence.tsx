import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ActivityIcon,
  AlertTriangleIcon,
  BotIcon,
  CheckCircleIcon,
  GlobeIcon,
  ImportIcon,
  NewspaperIcon,
  RadioIcon,
  RefreshCwIcon,
  Share2Icon,
  SparklesIcon,
  UsersIcon
} from 'lucide-react';
import {
  artistProfileSeed,
  buildNewsFeed,
  defaultWorkspace,
  hasSpotifyConfig,
  hasSpotifyApi,
  LabelWorkspace,
  socialFeedSeed
} from '../lib/intelligence';
import { fetchSocialFeeds, fetchSpotifyCatalogue, generateAiNewsFeed, getSpotifyAuthorizeUrl } from '../lib/intelligenceApi';
import { Song } from '../lib/songs';

type Tab = 'overview' | 'spotify' | 'social' | 'news';

interface LabelIntelligenceProps {
  songs: Song[];
  workspace: LabelWorkspace;
  updateWorkspace: (workspace: LabelWorkspace) => void;
  importCatalogue: (songs?: Song[]) => { imported: number; skipped: number };
}

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'overview', label: 'Overview', icon: ActivityIcon },
  { id: 'spotify', label: 'Spotify Import', icon: RadioIcon },
  { id: 'social', label: 'Social Feeds', icon: Share2Icon },
  { id: 'news', label: 'AI News Feed', icon: NewspaperIcon }
];

export function LabelIntelligence({ songs, workspace, updateWorkspace, importCatalogue }: LabelIntelligenceProps) {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [importResult, setImportResult] = useState('');
  const publicUrl = import.meta.env.VITE_PUBLIC_APP_URL || window.location.origin;
  const spotifyConfigured = hasSpotifyConfig();
  const spotifyApiConfigured = hasSpotifyApi();
  const connected = workspace.spotifyStatus === 'connected';
  const [isImportingCatalogue, setIsImportingCatalogue] = useState(false);
  const [isImportingSocial, setIsImportingSocial] = useState(false);
  const [isGeneratingNews, setIsGeneratingNews] = useState(false);

  const intelligenceScore = useMemo(() => {
    const catalogScore = Math.min(songs.length * 8, 40);
    const artistScore = Math.min(workspace.artists.length * 12, 30);
    const socialScore = Math.min(workspace.socialFeeds.length * 10, 30);
    return catalogScore + artistScore + socialScore;
  }, [songs.length, workspace.artists.length, workspace.socialFeeds.length]);

  const connectSpotify = () => {
    const authorizeUrl = getSpotifyAuthorizeUrl(window.location.href);
    if (authorizeUrl) {
      window.location.href = authorizeUrl;
      return;
    }

    updateWorkspace({
      ...workspace,
      spotifyStatus: spotifyConfigured ? 'ready_to_connect' : 'needs_config',
      spotifyAccount: spotifyConfigured ? 'Spotify app configured, backend OAuth still needed' : ''
    });
    setImportResult(
      spotifyConfigured
        ? 'Spotify client config exists. Add VITE_SPOTIFY_API_URL to start the backend OAuth connection.'
        : 'Spotify needs VITE_SPOTIFY_API_URL or VITE_SPOTIFY_CLIENT_ID plus an OAuth callback before live import can run.'
    );
  };

  const runCatalogueImport = async () => {
    setIsImportingCatalogue(true);
    const apiResult = await fetchSpotifyCatalogue();
    const result = importCatalogue(apiResult.ok ? apiResult.data.songs : undefined);
    const now = new Date().toISOString();
    updateWorkspace({
      ...workspace,
      spotifyStatus: apiResult.ok || connected ? 'connected' : spotifyConfigured ? 'ready_to_connect' : 'needs_config',
      spotifyAccount: apiResult.ok ? apiResult.data.account : connected ? workspace.spotifyAccount : workspace.spotifyAccount,
      artists: mergeById(workspace.artists, apiResult.ok ? apiResult.data.artists : artistProfileSeed),
      lastCatalogueImportAt: now,
      lastApiSyncAt: now,
      lastApiError: apiResult.ok ? '' : apiResult.error
    });
    setImportResult(
      apiResult.ok
        ? `Live Spotify import complete: ${result.imported} tracks imported, ${result.skipped} duplicates skipped.`
        : `${apiResult.error} Used local catalogue fallback: ${result.imported} tracks imported, ${result.skipped} duplicates skipped.`
    );
    setIsImportingCatalogue(false);
  };

  const importSocialFeeds = async () => {
    setIsImportingSocial(true);
    const apiResult = await fetchSocialFeeds();
    const now = new Date().toISOString();
    updateWorkspace({
      ...workspace,
      socialFeeds: mergeById(workspace.socialFeeds, apiResult.ok ? apiResult.data.feeds : socialFeedSeed),
      lastApiSyncAt: now,
      lastApiError: apiResult.ok ? '' : apiResult.error
    });
    setImportResult(apiResult.ok ? 'Live social feeds imported.' : `${apiResult.error} Used local social feed fallback.`);
    setIsImportingSocial(false);
  };

  const generateNews = async () => {
    setIsGeneratingNews(true);
    const apiResult = await generateAiNewsFeed({
      songs,
      artists: workspace.artists,
      socialFeeds: workspace.socialFeeds
    });
    const now = new Date().toISOString();
    updateWorkspace({
      ...workspace,
      newsFeed: apiResult.ok ? apiResult.data.newsFeed : buildNewsFeed(songs, workspace.socialFeeds, workspace.artists),
      lastApiSyncAt: now,
      lastApiError: apiResult.ok ? '' : apiResult.error
    });
    setImportResult(apiResult.ok ? 'AI news feed generated from live service.' : `${apiResult.error} Used local AI news fallback.`);
    setIsGeneratingNews(false);
  };

  const resetWorkspace = () => {
    updateWorkspace(defaultWorkspace);
    setImportResult('Workspace intelligence reset.');
  };

  return (
    <div className="min-h-screen bg-navy py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between gap-6 mb-8">
          <div>
            <p className="text-gold text-sm font-bold uppercase tracking-wider mb-2">Label operations</p>
            <h1 className="text-3xl md:text-5xl font-bold mb-3">AI Intelligence</h1>
            <p className="text-gray-400 max-w-3xl text-lg">
              Connect Spotify, import the full catalogue and artist profiles, pull social signals, and turn them into label news priorities.
            </p>
          </div>
          <div className="bg-navy-light border border-navy-lighter rounded-2xl p-5 min-w-[260px]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-sm">Intelligence score</span>
              <SparklesIcon className="w-5 h-5 text-gold" />
            </div>
            <div className="text-4xl font-syne font-bold">{intelligenceScore}%</div>
            <div className="h-2 bg-navy rounded-full mt-4 overflow-hidden">
              <div className="h-full bg-gold" style={{ width: `${Math.min(intelligenceScore, 100)}%` }} />
            </div>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-3 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center px-4 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${activeTab === tab.id ? 'bg-gold text-navy' : 'bg-navy-light text-gray-300 border border-navy-lighter hover:text-white'}`}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <StatusPanel title="Public URL" icon={GlobeIcon} status={publicUrl} tone="blue" copy="Use VITE_PUBLIC_APP_URL for the intended production URL, then add the matching Vercel/domain alias outside the client build." />
            <StatusPanel title="Spotify Connection" icon={RadioIcon} status={connected ? 'Connected' : spotifyApiConfigured ? 'Ready to authorize' : 'Needs OAuth API'} tone={connected ? 'green' : 'yellow'} copy={connected ? workspace.spotifyAccount : 'Set VITE_SPOTIFY_API_URL to the backend that owns Spotify OAuth and catalogue import.'} />
            <StatusPanel title="AI News Desk" icon={BotIcon} status={`${workspace.newsFeed.length} briefs`} tone="gold" copy="News briefs are generated from catalogue, artist, and social signals already imported into the app." />
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                ['Songs tracked', songs.length],
                ['Artist profiles', workspace.artists.length],
                ['Social posts', workspace.socialFeeds.length],
                ['News briefs', workspace.newsFeed.length]
              ].map(([label, value]) => (
                <div key={label} className="bg-navy-light border border-navy-lighter rounded-2xl p-5">
                  <div className="text-3xl font-syne font-bold mb-1">{value}</div>
                  <div className="text-gray-400 text-sm">{label}</div>
                </div>
              ))}
            </div>
            <button onClick={resetWorkspace} className="lg:col-span-3 justify-self-start inline-flex items-center px-5 py-3 rounded-xl border border-navy-lighter text-gray-300 hover:text-white hover:bg-navy-light">
              <RefreshCwIcon className="w-4 h-4 mr-2" />
              Reset intelligence workspace
            </button>
            {workspace.lastApiError && (
              <div className="lg:col-span-3 rounded-2xl border border-yellow-400/30 bg-yellow-400/10 p-4 text-sm text-yellow-100">
                Last API fallback: {workspace.lastApiError}
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'spotify' && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6">
            <div className="bg-navy-light border border-navy-lighter rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4">Connection repair</h2>
              <div className="space-y-3 mb-6">
                <CheckRow ok={spotifyApiConfigured} label="Spotify OAuth API configured" />
                <CheckRow ok={connected} label="Label account connected" />
                <CheckRow ok={workspace.lastCatalogueImportAt !== ''} label="Catalogue import completed" />
              </div>
              <div className="space-y-3">
                <button onClick={connectSpotify} className="w-full bg-gold hover:bg-gold-hover text-navy font-bold px-5 py-3 rounded-xl">
                  {spotifyApiConfigured ? 'Connect Spotify' : 'Check Spotify Config'}
                </button>
                <button onClick={runCatalogueImport} disabled={isImportingCatalogue} className="w-full bg-navy border border-navy-lighter hover:border-gold/50 disabled:opacity-50 text-white font-semibold px-5 py-3 rounded-xl">
                  {isImportingCatalogue ? 'Importing Catalogue...' : 'Auto Import Full Catalogue'}
                </button>
              </div>
              {importResult && <p className="text-sm text-gray-300 mt-4">{importResult}</p>}
            </div>
            <div className="bg-navy-light border border-navy-lighter rounded-2xl overflow-hidden">
              <div className="px-6 py-5 border-b border-navy-lighter flex items-center justify-between">
                <h2 className="text-xl font-bold">Imported artist profiles</h2>
                <UsersIcon className="w-5 h-5 text-gold" />
              </div>
              <div className="divide-y divide-navy-lighter">
                {(workspace.artists.length ? workspace.artists : artistProfileSeed).map((artist) => (
                  <div key={artist.id} className="p-6 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4">
                    <div>
                      <h3 className="font-bold text-lg">{artist.name}</h3>
                      <p className="text-gray-400 text-sm">{artist.genres.join(', ')} - Top city: {artist.topCity}</p>
                    </div>
                    <div className="text-left md:text-right">
                      <div className="font-bold">{artist.monthlyListeners.toLocaleString('en-ZA')}</div>
                      <div className="text-gray-500 text-sm">monthly listeners</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'social' && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">Imported social media feeds</h2>
                <p className="text-gray-400">Feeds are staged internally first so OAuth gaps do not block label routing.</p>
              </div>
              <button onClick={importSocialFeeds} disabled={isImportingSocial} className="inline-flex items-center bg-gold hover:bg-gold-hover disabled:opacity-50 text-navy font-bold px-5 py-3 rounded-xl">
                <ImportIcon className="w-4 h-4 mr-2" />
                {isImportingSocial ? 'Importing Feeds...' : 'Import Feeds'}
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {(workspace.socialFeeds.length ? workspace.socialFeeds : socialFeedSeed).map((item) => (
                <div key={item.id} className="bg-navy-light border border-navy-lighter rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gold font-bold">{item.platform}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${item.sentiment === 'positive' ? 'bg-green-400/10 text-green-400' : item.sentiment === 'watch' ? 'bg-yellow-400/10 text-yellow-400' : 'bg-gray-400/10 text-gray-400'}`}>{item.sentiment}</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-5">{item.text}</p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{item.handle}</span>
                    <span>{item.engagement.toLocaleString('en-ZA')} engagements</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'news' && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">AI label news feed</h2>
                <p className="text-gray-400">Generated from catalogue status, artist reach, and social momentum.</p>
              </div>
              <button onClick={generateNews} disabled={isGeneratingNews} className="inline-flex items-center bg-gold hover:bg-gold-hover disabled:opacity-50 text-navy font-bold px-5 py-3 rounded-xl">
                <SparklesIcon className="w-4 h-4 mr-2" />
                {isGeneratingNews ? 'Generating News...' : 'Generate News Feed'}
              </button>
            </div>
            <div className="space-y-4">
              {(workspace.newsFeed.length ? workspace.newsFeed : buildNewsFeed(songs, workspace.socialFeeds, workspace.artists)).map((item) => (
                <div key={item.id} className="bg-navy-light border border-navy-lighter rounded-2xl p-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-3">
                    <h3 className="text-xl font-bold">{item.headline}</h3>
                    <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${item.priority === 'high' ? 'bg-red-500/10 text-red-400' : item.priority === 'medium' ? 'bg-yellow-400/10 text-yellow-400' : 'bg-green-400/10 text-green-400'}`}>{item.priority}</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-4">{item.summary}</p>
                  <div className="text-sm text-gray-500">{item.source}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function StatusPanel({ title, icon: Icon, status, tone, copy }: { title: string; icon: React.ElementType; status: string; tone: 'green' | 'yellow' | 'blue' | 'gold'; copy: string }) {
  const toneClass = {
    green: 'text-green-400 bg-green-400/10',
    yellow: 'text-yellow-400 bg-yellow-400/10',
    blue: 'text-blue-400 bg-blue-400/10',
    gold: 'text-gold bg-gold/10'
  }[tone];

  return (
    <div className="bg-navy-light border border-navy-lighter rounded-2xl p-6">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${toneClass}`}>
        <Icon className="w-5 h-5" />
      </div>
      <h2 className="font-bold text-lg mb-1">{title}</h2>
      <p className="text-white font-semibold break-all mb-3">{status}</p>
      <p className="text-gray-400 text-sm leading-relaxed">{copy}</p>
    </div>
  );
}

function CheckRow({ ok, label }: { ok: boolean; label: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-navy px-4 py-3">
      <span className="text-sm text-gray-300">{label}</span>
      {ok ? <CheckCircleIcon className="w-5 h-5 text-green-400" /> : <AlertTriangleIcon className="w-5 h-5 text-yellow-400" />}
    </div>
  );
}

function mergeById<T extends { id: string }>(current: T[], incoming: T[]) {
  const seen = new Set(current.map((item) => item.id));
  return [...current, ...incoming.filter((item) => !seen.has(item.id))];
}
