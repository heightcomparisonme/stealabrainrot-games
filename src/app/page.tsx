import type { Metadata } from 'next';
import HomePageClient from '@/components/HomePageClient';
import { games } from '@/lib/games';

const SITE_URL = 'https://stealabrainrot.games';

export const metadata: Metadata = {
  title: 'Steal Brainrot | Play Free Steal Brainrot Games Instantly | Steal Brainrot Games',
  description:
    'Play Steal A Brainrot, a fun, chaotic 3D Roblox-style heist game that features many Brainrot meme characters. Buy and steal to fill your base with the best Brainrots! No installs needed—play instantly on any device with StealABrainrot Games.',
  keywords: [
    'free online games',
    'browser games',
    'IO games',
    'casual games',
    'action games',
    'puzzle games',
    'play instantly',
    'steal brainrot',
    'steal brainrot games',
    'steal brainrot online',
    'steal brainrot free',
    'steal brainrot online games',
    'steal brainrot free games',
    'steal brainrot online free',
    'steal brainrot free online',
    'steal brainrot free online games',
    'steal brainrot free online free',
    'steal brainrot free online free games',
    'steal brainrot free online free free',
    'steal brainrot free online free free games',
    'steal brainrot free online free free free',
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    url: SITE_URL,
    title: 'Play Free Online Games Instantly | StealABrainrot Games',
    description:
      'Discover and play thousands of free browser games without downloads. Filter by genre, tags, and popularity to find your next favorite game.',
    siteName: 'StealABrainrot Games',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Play Free Online Games Instantly | StealABrainrot Games',
    description:
      'Discover and play thousands of free browser games without downloads. Filter by genre, tags, and popularity to find your next favorite game.',
  },
};

export default function HomePage() {
  return <HomePageClient games={games} />;
}
