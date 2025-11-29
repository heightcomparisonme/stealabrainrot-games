import type { ReactNode } from 'react';
import type { Metadata } from 'next';

const SITE_URL = 'https://stealabrainrot.games';
const PAGE_URL = `${SITE_URL}/brainrot-link-scanner`;

export const metadata: Metadata = {
  title: 'Brainrot Link Scanner | Check Game Links Safely | StealABrainrot',
  description:
    'Run a quick Brainrot link scan to spot phishing, fake login pages, and unsafe redirects before you click. Instant heuristics, no downloads, privacy-friendly.',
  keywords: [
    'brainrot link scanner',
    'safe game links',
    'url safety checker',
    'phishing detector',
    'roblox style game security',
    'stealabrainrot safety',
    'link reputation check'
  ],
  alternates: {
    canonical: PAGE_URL
  },
  openGraph: {
    url: PAGE_URL,
    title: 'Brainrot Link Scanner | StealABrainrot Games',
    description:
      'Paste any Brainrot or game-related link and get an instant risk score with clear guidance on whether it is safe to open.',
    siteName: 'StealABrainrot Games',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brainrot Link Scanner | Check Before You Click',
    description: 'Free, instant link safety checks built for Brainrot players and creators.'
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function BrainrotLinkScannerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-background text-foreground">
      {children}
    </div>
  );
}

