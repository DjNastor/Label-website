export type Collaborator = {
  name: string;
  role: string;
  split: number;
};

export type Song = {
  id: string;
  title: string;
  artist: string;
  featuredArtists: string;
  genre: string;
  releaseDate: string;
  publisher: string;
  label: string;
  isrc: string;
  status: 'Draft' | 'Pending Submission' | 'Ready to Submit' | 'Registered';
  collaborators: Collaborator[];
  documents: string[];
  createdAt: string;
};

export const defaultSongs: Song[] = [
  {
    id: 'demo-1',
    title: 'Amapiano Dreams',
    artist: 'DJ Kasi',
    featuredArtists: 'Sarah J',
    genre: 'Amapiano',
    releaseDate: '2026-07-26',
    publisher: 'Kasi Publishing',
    label: 'Phusha Records',
    isrc: 'ZA-A1B-26-00123',
    status: 'Registered',
    collaborators: [
      { name: 'Thabo M.', role: 'Composer', split: 50 },
      { name: 'Sarah J.', role: 'Lyricist', split: 50 }
    ],
    documents: ['samro', 'capasso', 'split', 'metadata'],
    createdAt: '2026-07-10T09:00:00.000Z'
  },
  {
    id: 'demo-2',
    title: 'Ubuntu Vibes',
    artist: 'Thabo M.',
    featuredArtists: '',
    genre: 'Afrobeats',
    releaseDate: '2026-08-02',
    publisher: '',
    label: 'Independent',
    isrc: 'ZA-A1B-26-00124',
    status: 'Pending Submission',
    collaborators: [{ name: 'Thabo M.', role: 'Composer', split: 100 }],
    documents: ['samro', 'split'],
    createdAt: '2026-07-12T12:00:00.000Z'
  }
];

export const documentLabels: Record<string, string> = {
  samro: 'SAMRO Notification',
  capasso: 'CAPASSO Registration',
  sampra: 'SAMPRA Registration',
  risa: 'RISA Registration',
  split: 'Split Sheet',
  metadata: 'Distributor Metadata'
};

export function makeIsrc(sequence: number) {
  return `ZA-A1B-26-${String(sequence).padStart(5, '0')}`;
}

export function splitTotal(collaborators: Collaborator[]) {
  return collaborators.reduce((sum, person) => sum + Number(person.split || 0), 0);
}
