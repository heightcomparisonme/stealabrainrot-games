import { notFound } from 'next/navigation';
import GamePageClient from '@/components/GamePageClient';
import { games } from '@/lib/games';

interface GamePageProps {
  params: Promise<{
    id: string;
  }>;
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

  const gameUrl = gameUrls[game.id] ?? `https://www.gamepix.com${game.href}`;

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
