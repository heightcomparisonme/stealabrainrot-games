'use client';

import { useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import GameSection from '@/components/GameSection';
import GameRating from '@/components/GameRating';
import SocialShare from '@/components/SocialShare';
import Footer from '@/components/Footer';
import type { Game } from '@/lib/games';

interface GamePageClientProps {
  game: Game;
  gameUrl: string;
  relatedGames: Game[];
}

export default function GamePageClient({
  game,
  gameUrl,
  relatedGames,
}: GamePageClientProps) {
  const gameDescriptions: Record<
    string,
    {
      description: string;
      howToPlay: string[];
      controls: string[];
      tips: string[];
    }
  > = {
    'shell-shockers': {
      description:
        'Shell Shockers is a multiplayer FPS starring weapon-wielding eggs. Battle across modes like teams, free-for-all, and capture the spatula.',
      howToPlay: [
        'Choose your weapon and skin',
        'Join a server or create your own',
        'Fight other players in real time',
        'Collect upgrades and power-ups',
        'Aim for the head for maximum damage',
      ],
      controls: ['WASD - Move', 'Mouse - Aim & Shoot', 'R - Reload', 'Shift - Sprint', 'Space - Jump'],
      tips: [
        'Keep moving to avoid getting hit',
        'Use cover effectively',
        'Practice aim in training',
        'Learn maps for strategic advantage',
      ],
    },
    'smash-karts': {
      description:
        'Smash Karts is a 3D multiplayer kart battle game. Fight in chaotic arenas using a variety of power-ups and weapons!',
      howToPlay: [
        'Drive your kart around the arena',
        'Collect weapons and power-ups',
        'Attack opponents to eliminate them',
        'Be the last kart standing to win',
        'Use the environment to your advantage',
      ],
      controls: ['Arrow keys or WASD - Drive', 'Space - Use weapon/power-up', 'Mouse - Control camera', 'Enter - Chat'],
      tips: ['Grab power-ups quickly', 'Use boost pads for speed', 'Keep moving to avoid attacks', 'Learn weapon timing'],
    },
  };

  const gameInfo = gameDescriptions[game.id] || {
    description: `${game.title} is an exciting ${game.category} game featuring ${game.tags.join(', ')} gameplay. Experience thrilling action and fun in this popular online title.`,
    howToPlay: [
      'Follow on-screen instructions',
      'Use mouse and keyboard controls',
      'Complete objectives to progress',
      'Have fun!',
    ],
    controls: ['Mouse - Navigate and interact', 'Keyboard - Various controls', 'Follow in-game prompts'],
    tips: [
      'Take time to learn the game',
      'Practice makes perfect',
      'Try different strategies',
      'Enjoy the experience!',
    ],
  };

  const handleOpenInNewTab = useCallback(() => {
    window.open(gameUrl, '_blank', 'noopener,noreferrer');
  }, [gameUrl]);

  const handleFullscreen = useCallback(() => {
    const iframe = document.querySelector<HTMLIFrameElement>('iframe');
    if (iframe?.requestFullscreen) {
      iframe.requestFullscreen();
    } else {
      handleOpenInNewTab();
    }
  }, [handleOpenInNewTab]);

  const structuredData = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'VideoGame',
      name: game.title,
      description: gameInfo.description,
      genre: Array.from(new Set([game.category, ...game.tags])),
      image: game.image,
      url: gameUrl,
      operatingSystem: 'Web',
      applicationCategory: 'Game',
      aggregateRating: game.trending
        ? {
            '@type': 'AggregateRating',
            ratingValue: '4.6',
            reviewCount: '1200',
          }
        : undefined,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
      potentialAction: {
        '@type': 'PlayAction',
        target: gameUrl,
      },
    }),
    [game, gameInfo.description, gameUrl],
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="bg-card border-b border-border sticky top-16 z-40">
        <div className="container-custom py-4 px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="p-2 bg-muted hover:bg-primary/20 text-muted-foreground hover:text-primary rounded-lg transition-all duration-200 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Back to games</span>
              </Link>

              <div className="flex items-center space-x-3">
                <Image src={game.image} alt={game.title} width={48} height={48} className="rounded-lg object-cover" />
                <div>
                  <h1 className="text-xl font-bold text-foreground">{game.title}</h1>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span className="capitalize">{game.category}</span>
                    <span>•</span>
                    <span>{game.tags.slice(0, 2).join(', ')}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <SocialShare game={game} />
              <button
                onClick={handleOpenInNewTab}
                className="p-2 bg-muted hover:bg-secondary/20 text-muted-foreground hover:text-secondary rounded-lg transition-all duration-200"
                title="Open in a new tab"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-6 px-4 sm:px-6">
        <div className="mb-8">
          <div className="bg-card border border-border rounded-xl overflow-hidden cyber-glow">
            <div
              className="relative bg-black"
              style={{ aspectRatio: '16/9', minHeight: '500px', maxHeight: '70vh' }}
            >
              <iframe
                src={gameUrl}
                className="w-full h-full border-0"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                allowFullScreen
                title={`Play ${game.title}`}
              />

              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2">
                <div className="flex items-center space-x-2 text-white text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>Game loaded</span>
                </div>
              </div>

              <div className="absolute top-4 right-4 flex space-x-2">
                <button
                  onClick={handleFullscreen}
                  className="p-2 bg-black/70 hover:bg-black/90 text-white rounded-lg transition-all duration-200 cyber-glow"
                  title="Fullscreen"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </button>
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/70 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex gap-2 flex-wrap">
                      {game.popular && (
                        <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-md">
                          🔥 Popular
                        </span>
                      )}
                      {game.trending && (
                        <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-md">
                          📈 Trending
                        </span>
                      )}
                      {game.featured && (
                        <span className="px-2 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-md">
                          ⭐ Featured
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleFullscreen}
                        className="btn-primary text-sm px-4 py-2 flex items-center space-x-2"
                      >
                        <span>🔳</span>
                        <span>Fullscreen</span>
                      </button>
                      <button
                        onClick={handleOpenInNewTab}
                        className="btn-secondary text-sm px-4 py-2 flex items-center space-x-2"
                      >
                        <span>🚀</span>
                        <span>New Tab</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-xl p-6 mb-6">
              <h2 className="text-lg font-bold text-foreground mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {game.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-primary/15 text-primary border border-primary/30 rounded-md text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-bold text-foreground mb-4">Controls</h2>
              <div className="space-y-2">
                {gameInfo.controls.map((control, index) => (
                  <div key={`control-${index}-${control.slice(0, 10)}`} className="bg-muted/30 p-2 rounded-md">
                    <span className="text-xs text-muted-foreground">{control}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-bold text-foreground mb-4">About the Game</h2>
              <p className="text-muted-foreground leading-relaxed">{gameInfo.description}</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-bold text-foreground mb-4">How to Play</h2>
              <ul className="space-y-3">
                {gameInfo.howToPlay.map((step, index) => (
                  <li key={`step-${index}-${step.slice(0, 10)}`} className="flex items-start space-x-3">
                    <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-muted-foreground">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-bold text-foreground mb-4">Tips</h2>
              <div className="space-y-2">
                {gameInfo.tips.map((tip, index) => (
                  <div key={`tip-${index}-${tip.slice(0, 10)}`} className="flex items-start space-x-2">
                    <span className="text-secondary">-</span>
                    <span className="text-muted-foreground">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <GameRating game={game} />
        </div>

        {relatedGames.length > 0 && (
          <GameSection
            title={`🎮 More ${game.category} Games`}
            games={relatedGames}
            showViewMore={false}
            className="bg-background"
          />
        )}
      </div>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </div>
  );
}
