import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRightIcon, ChevronLeftIcon, PlusIcon, TrashIcon, CheckCircleIcon, AlertCircleIcon } from 'lucide-react';
import { Collaborator, makeIsrc, Song, splitTotal } from '../lib/songs';

interface SongFormProps {
  songs: Song[];
  saveSong: (song: Song) => void;
}

const documentOptions = [
  { id: 'samro', title: 'SAMRO Notification', desc: 'For composer and publisher performance royalties' },
  { id: 'capasso', title: 'CAPASSO Registration', desc: 'For mechanical royalties and digital usage' },
  { id: 'sampra', title: 'SAMPRA Registration', desc: 'For neighbouring rights and master ownership' },
  { id: 'risa', title: 'RISA Registration', desc: 'For official South African chart tracking' },
  { id: 'split', title: 'Split Sheet PDF', desc: 'Agreement for all writers, producers, and collaborators' },
  { id: 'metadata', title: 'Distributor Metadata', desc: 'CSV-ready release data for DSP distribution' }
];

export function SongForm({ songs, saveSong }: SongFormProps) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    title: '',
    artist: '',
    featuredArtists: '',
    genre: 'Amapiano',
    releaseDate: '',
    publisher: '',
    label: '',
    isrc: '',
    documents: documentOptions.map((doc) => doc.id)
  });
  const [collaborators, setCollaborators] = useState<Collaborator[]>([
    { name: '', role: 'Composer', split: 100 }
  ]);

  const totalSplit = useMemo(() => splitTotal(collaborators), [collaborators]);
  const canContinue = step !== 2 || totalSplit === 100;

  const updateField = (field: keyof typeof form, value: string | string[]) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const updateCollaborator = (index: number, field: keyof Collaborator, value: string) => {
    setCollaborators((current) =>
      current.map((person, personIndex) =>
        personIndex === index
          ? { ...person, [field]: field === 'split' ? Number(value) : value }
          : person
      )
    );
  };

  const addCollaborator = () => {
    setCollaborators((current) => [...current, { name: '', role: 'Composer', split: 0 }]);
  };

  const removeCollaborator = (index: number) => {
    setCollaborators((current) => current.filter((_, personIndex) => personIndex !== index));
  };

  const generateIsrc = () => {
    updateField('isrc', makeIsrc(songs.length + 123));
  };

  const toggleDocument = (id: string) => {
    setForm((current) => ({
      ...current,
      documents: current.documents.includes(id)
        ? current.documents.filter((docId) => docId !== id)
        : [...current.documents, id]
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (totalSplit !== 100) return;

    saveSong({
      id: crypto.randomUUID(),
      title: form.title.trim(),
      artist: form.artist.trim(),
      featuredArtists: form.featuredArtists.trim(),
      genre: form.genre,
      releaseDate: form.releaseDate,
      publisher: form.publisher.trim(),
      label: form.label.trim(),
      isrc: form.isrc || makeIsrc(songs.length + 123),
      status: 'Ready to Submit',
      collaborators: collaborators.map((person) => ({
        ...person,
        name: person.name.trim() || 'Unnamed collaborator'
      })),
      documents: form.documents,
      createdAt: new Date().toISOString()
    });
  };

  return (
    <div className="min-h-screen bg-navy py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-6">Register New Song</h1>
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 w-full h-1 bg-navy-lighter -z-10 rounded-full" />
            <div className="absolute left-0 top-1/2 h-1 bg-gold -z-10 rounded-full transition-all duration-500" style={{ width: `${((step - 1) / 2) * 100}%` }} />
            {[1, 2, 3].map((item) => (
              <div key={item} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= item ? 'bg-gold text-navy' : 'bg-navy-light border-2 border-navy-lighter text-gray-500'}`}>
                {step > item ? <CheckCircleIcon className="w-6 h-6" /> : item}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-3 text-sm font-medium text-gray-400">
            <span>Song Details</span>
            <span>Rights & Credits</span>
            <span>Generate Forms</span>
          </div>
        </div>

        <div className="bg-navy-light border border-navy-lighter rounded-3xl p-6 md:p-10 shadow-xl">
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h2 className="text-2xl font-syne font-bold mb-6">Song Details</h2>
                  <input className="w-full bg-navy border border-navy-lighter rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold" placeholder="Song title" value={form.title} onChange={(e) => updateField('title', e.target.value)} required />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input className="w-full bg-navy border border-navy-lighter rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold" placeholder="Primary artist" value={form.artist} onChange={(e) => updateField('artist', e.target.value)} required />
                    <input className="w-full bg-navy border border-navy-lighter rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold" placeholder="Featured artists" value={form.featuredArtists} onChange={(e) => updateField('featuredArtists', e.target.value)} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select className="w-full bg-navy border border-navy-lighter rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold" value={form.genre} onChange={(e) => updateField('genre', e.target.value)}>
                      {['Amapiano', 'Afrobeats', 'Kwaito', 'Gospel', 'Hip Hop', 'R&B', 'Jazz', 'Other'].map((genre) => <option key={genre}>{genre}</option>)}
                    </select>
                    <input type="date" className="w-full bg-navy border border-navy-lighter rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold" value={form.releaseDate} onChange={(e) => updateField('releaseDate', e.target.value)} />
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-syne font-bold">Rights & Credits</h2>
                    <span className={`text-sm font-bold ${totalSplit === 100 ? 'text-green-400' : 'text-yellow-400'}`}>{totalSplit}% allocated</span>
                  </div>
                  <div className="space-y-3">
                    {collaborators.map((person, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-[1fr_140px_100px_44px] gap-3">
                        <input className="bg-navy border border-navy-lighter rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold" placeholder="Full legal name" value={person.name} onChange={(e) => updateCollaborator(index, 'name', e.target.value)} />
                        <select className="bg-navy border border-navy-lighter rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold" value={person.role} onChange={(e) => updateCollaborator(index, 'role', e.target.value)}>
                          {['Composer', 'Lyricist', 'Producer', 'Publisher'].map((role) => <option key={role}>{role}</option>)}
                        </select>
                        <input type="number" min="0" max="100" className="bg-navy border border-navy-lighter rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold" value={person.split} onChange={(e) => updateCollaborator(index, 'split', e.target.value)} />
                        <button type="button" onClick={() => removeCollaborator(index)} disabled={collaborators.length === 1} className="h-12 rounded-xl text-gray-500 hover:text-red-400 disabled:opacity-30">
                          <TrashIcon className="w-5 h-5 mx-auto" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={addCollaborator} className="text-gold text-sm font-medium flex items-center hover:underline">
                    <PlusIcon className="w-4 h-4 mr-1" /> Add collaborator
                  </button>
                  {totalSplit !== 100 && (
                    <div className="flex items-center rounded-xl border border-yellow-400/40 bg-yellow-400/10 px-4 py-3 text-sm text-yellow-100">
                      <AlertCircleIcon className="w-5 h-5 mr-2 text-yellow-400" />
                      Splits must equal exactly 100% before documents can be generated.
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-navy-lighter">
                    <input className="w-full bg-navy border border-navy-lighter rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold" placeholder="Publisher" value={form.publisher} onChange={(e) => updateField('publisher', e.target.value)} />
                    <input className="w-full bg-navy border border-navy-lighter rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold" placeholder="Record label" value={form.label} onChange={(e) => updateField('label', e.target.value)} />
                  </div>
                  <div className="flex gap-3">
                    <input className="flex-1 bg-navy border border-navy-lighter rounded-xl px-4 py-3 text-white font-mono focus:outline-none focus:border-gold" placeholder="ISRC" value={form.isrc} onChange={(e) => updateField('isrc', e.target.value)} />
                    <button type="button" onClick={generateIsrc} className="bg-navy-lighter hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-medium">Generate</button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h2 className="text-2xl font-syne font-bold">Select Documents</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {documentOptions.map((doc) => (
                      <label key={doc.id} className="flex items-start p-4 bg-navy border border-navy-lighter rounded-xl cursor-pointer hover:border-gold/50">
                        <input type="checkbox" checked={form.documents.includes(doc.id)} onChange={() => toggleDocument(doc.id)} className="w-5 h-5 mt-1 accent-gold" />
                        <span className="ml-3">
                          <span className="block text-white font-medium">{doc.title}</span>
                          <span className="block text-sm text-gray-400 mt-1">{doc.desc}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between mt-10 pt-6 border-t border-navy-lighter">
              <button type="button" onClick={() => setStep(step - 1)} className={`px-6 py-3 rounded-xl font-medium flex items-center ${step === 1 ? 'invisible' : 'bg-navy hover:bg-navy-lighter text-white border border-navy-lighter'}`}>
                <ChevronLeftIcon className="w-5 h-5 mr-1" /> Back
              </button>
              {step < 3 ? (
                <button type="button" disabled={!canContinue} onClick={() => setStep(step + 1)} className="bg-gold hover:bg-gold-hover disabled:opacity-40 text-navy px-8 py-3 rounded-xl font-bold flex items-center">
                  Next Step <ChevronRightIcon className="w-5 h-5 ml-1" />
                </button>
              ) : (
                <button type="submit" className="bg-gold hover:bg-gold-hover text-navy px-8 py-3 rounded-xl font-bold flex items-center shadow-[0_0_15px_rgba(245,166,35,0.4)]">
                  Generate Documents <CheckCircleIcon className="w-5 h-5 ml-2" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
