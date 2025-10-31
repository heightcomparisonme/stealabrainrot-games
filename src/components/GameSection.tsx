import Link from 'next/link';
import type { Game } from '@/lib/games';
import GameCard from './GameCard';

interface GameSectionProps {
  title: string;
  games: Game[];
  showViewMore?: boolean;
  viewMoreHref?: string;
  className?: string;
  onGameClick?: (game: Game) => void;
}

export default function GameSection({
  title,
  games,
  showViewMore = false,
  viewMoreHref = '#',
  className = '',
  onGameClick
}: GameSectionProps) {
  return (
    <section className={`py-8 ${className}`}>
      <div className="container-custom">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title">{title}</h2>
          {showViewMore && (
            <Link
              href={viewMoreHref}
              className="text-primary hover:text-primary/80 font-medium flex items-center space-x-1 transition-colors duration-200"
            >
              <span>View more</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {games.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              className="animate-fade-in"
              onGameClick={onGameClick}
            />
          ))}
        </div>

        {games.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎮</div>
            <h3 className="text-xl font-semibold text-muted-foreground mb-2">
              No games found
            </h3>
            <p className="text-muted-foreground">
              Try browsing other categories or check back later for new games!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
