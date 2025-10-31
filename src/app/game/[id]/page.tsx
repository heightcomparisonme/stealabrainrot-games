import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import GamePageClient from '@/components/GamePageClient';
import { games } from '@/lib/games';

interface GamePageProps {
  params: Promise<{
    id: string;
  }>;
}

const SITE_URL = 'https://stealabrainrot.games';

export async function generateMetadata(
  { params }: GamePageProps,
): Promise<Metadata> {
  const { id } = await params;
  const game = games.find((g) => g.id === id);

  if (!game) {
    return {
      title: 'Game Not Found | StealABrainrot Games',
      description: 'The game you are looking for could not be found.',
    };
  }

  const description = `${game.title}: play this free ${game.category} game with ${game.tags.join(', ')} gameplay.`;
  const url = `${SITE_URL}/game/${game.id}`;

  return {
    title: `${game.title} | Play Free Online`,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      url,
      title: `${game.title} | StealABrainrot Games`,
      description,
      type: 'website',
      siteName: 'StealABrainrot Games',
      images: game.image
        ? [
            {
              url: game.image,
              alt: game.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${game.title} | Play Free Online`,
      description,
      images: game.image ? [game.image] : undefined,
    },
  };
}

export default async function GamePage({ params }: GamePageProps) {
  const { id } = await params;

  const game = games.find((g) => g.id === id);
  if (!game) {
    notFound();
  }

  const gameUrls: Record<string, string> = {
    'shell-shockers': 'https://shellshock.io/',
    'smash-karts': 'https://smashkarts.io/',
    'dogeminer': 'https://dogeminer.se/',
    'drift-boss': 'https://driftboss.net/',
    'hole-io': 'https://hole-io.com/',
    'paper-io-2': 'https://paper-io.com/',
    'krunker': 'https://krunker.io/',
    '10x10': 'https://10x10.plus/',
  };

  const gameUrl = gameUrls[game.id] ?? `https://www.Steal a Brainrot.com${game.href}`;

  const relatedGames = games
    .filter(
      (g) =>
        g.id !== game.id &&
        (g.category === game.category ||
          g.tags.some((tag) => game.tags.includes(tag))),
    )
    .slice(0, 8);

  return (
    <GamePageClient
      game={game}
      gameUrl={gameUrl}
      relatedGames={relatedGames}
    />
  );
}
