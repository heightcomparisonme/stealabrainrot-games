'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Game } from '@/lib/games';

interface GameCardProps {
  game: Game;
  className?: string;
  onGameClick?: (game: Game) => void;
}

export default function GameCard({ game, className = '', onGameClick }: GameCardProps) {
  const handleClick = () => {
    if (onGameClick) {
      onGameClick(game);
    }
  };

  return (
    <Link href={`/game/${game.id}`} onClick={handleClick}>
      <div className={`game-card group cursor-pointer ${className}`}>
        <div className="relative overflow-hidden">
          <Image
            src={game.image}
            alt={game.title}
            width={300}
            height={200}
            className="game-card-image"
            priority={false}
          />
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-semibold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 cyber-glow">
              Play Now
            </div>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200">
            {game.title}
          </h3>

          <div className="flex flex-wrap gap-1 mb-3">
            {game.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="game-tag">
                {tag}
              </span>
            ))}
            {game.tags.length > 3 && (
              <span className="game-tag">
                +{game.tags.length - 3}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {game.popular && (
                <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-md transition-all duration-200"
                      style={{
                        background: 'rgba(255, 159, 28, 0.15)',
                        color: 'hsl(35, 100%, 55%)',
                        border: '1px solid rgba(255, 159, 28, 0.3)'
                      }}>
                  🔥 Popular
                </span>
              )}
              {game.trending && (
                <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-md transition-all duration-200"
                      style={{
                        background: 'rgba(91, 88, 255, 0.15)',
                        color: 'hsl(242, 100%, 67%)',
                        border: '1px solid rgba(91, 88, 255, 0.3)'
                      }}>
                  📈 Trending
                </span>
              )}
              {game.featured && (
                <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-md transition-all duration-200"
                      style={{
                        background: 'rgba(200, 100, 255, 0.15)',
                        color: 'hsl(290, 100%, 70%)',
                        border: '1px solid rgba(200, 100, 255, 0.3)'
                      }}>
                  ⭐ Featured
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
