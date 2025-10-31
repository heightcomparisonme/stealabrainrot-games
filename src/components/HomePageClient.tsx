'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import GameFilter from '@/components/GameFilter';
import GameSection from '@/components/GameSection';
import Footer from '@/components/Footer';
import StealaBrainrot from '@/components/StealaBrainrot';
import type { Game } from '@/lib/games';

interface HomePageClientProps {
  games: Game[];
}

export default function HomePageClient({ games }: HomePageClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const availableTags = useMemo(() => {
    const allTags = games.flatMap((game) => game.tags);
    return Array.from(new Set(allTags)).sort();
  }, [games]);

  const filteredGames = useMemo(() => {
    let filtered = games;

    if (searchQuery) {
      filtered = filtered.filter(
        (game) =>
          game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          game.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
          game.category.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((game) => game.category === selectedCategory);
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter((game) =>
        selectedTags.every((tag) => game.tags.includes(tag)),
      );
    }

    return filtered;
  }, [games, searchQuery, selectedCategory, selectedTags]);

  const mostPlayedGames = filteredGames.filter((game) => game.popular).slice(0, 8);
  const recommendedGames = filteredGames.filter((game) => game.featured).slice(0, 8);
  const trendingGames = filteredGames.filter((game) => game.trending).slice(0, 8);
  const ioGames = filteredGames.filter((game) => game.category === 'io').slice(0, 8);
  const casualGames = filteredGames.filter((game) => game.category === 'casual').slice(0, 8);
  const actionGames = filteredGames.filter((game) => game.category === 'action').slice(0, 8);
  const carGames = filteredGames
    .filter((game) => game.category === 'car' || game.tags.includes('car'))
    .slice(0, 8);
  const puzzleGames = filteredGames.filter((game) => game.category === 'puzzle').slice(0, 8);
  const sportsGames = filteredGames.filter((game) => game.category === 'sports').slice(0, 8);
  const kidsGames = filteredGames.filter((game) => game.category === 'kids').slice(0, 8);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const hasActiveFilters =
    Boolean(searchQuery) || selectedCategory !== 'all' || selectedTags.length > 0;

  const structuredData = useMemo(() => {
    const topGames = filteredGames.slice(0, 6).map((game) => ({
      '@type': 'ListItem',
      position: filteredGames.indexOf(game) + 1,
      url: `https://stealabrainrot.games${game.href}`,
      name: game.title,
    }));

    return {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Play Free Online Games | StealABrainrot Games',
      description:
        'Instantly play free online games across action, puzzle, racing, IO, and casual genres on StealABrainrot Games.',
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: topGames,
      },
    };
  }, [filteredGames]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="hero-gradient py-16 px-4 sm:px-6">
          <div className="container-custom text-center">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-foreground mb-6">
              Steal a Brainrot Games
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Experience the ultimate Brainrot collection game! Step into a Roblox-style world full of absurd meme characters. Build your collection, generate income, and steal from others in this revolutionary strategy game. Play instantly - no downloads required!
            </p>

            <div className="max-w-2xl mx-auto mb-6">
              <SearchBar
                onSearch={handleSearch}
                placeholder="Search Brainrot games, characters, or features..."
                className="mb-4"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`btn-secondary flex items-center space-x-2 ${showFilters ? 'bg-secondary/20' : ''}`}
                aria-expanded={showFilters}
              >
                <span>🔍</span>
                <span>Filters</span>
                {hasActiveFilters && (
                  <span className="bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full text-xs">
                    !
                  </span>
                )}
              </button>
              <a href="#most-played" className="btn-primary">
                🎮 Play Steal a Brainrot
              </a>
            </div>
          </div>
        </section>

        {/* Featured Game Section */}
        <StealaBrainrot />

        {showFilters && (
          <section className="py-8 bg-muted/20 border-b border-border px-4 sm:px-6">
            <div className="container-custom">
              <div className="space-y-6">
                <GameFilter
                  selectedCategory={selectedCategory}
                  onCategoryChange={handleCategoryChange}
                  selectedTags={selectedTags}
                  onTagToggle={handleTagToggle}
                  availableTags={availableTags}
                />

                {hasActiveFilters && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                      <span className="text-accent mr-2">🔍</span>
                      Active Filters
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCategory !== 'all' && (
                        <div className="flex items-center bg-primary/20 border border-primary/30 text-primary px-3 py-1 rounded-md text-sm">
                          <span className="mr-2 capitalize">{selectedCategory}</span>
                          <button
                            onClick={() => setSelectedCategory('all')}
                            className="hover:text-primary-foreground transition-colors duration-200"
                            aria-label="Remove category filter"
                          >
                            ×
                          </button>
                        </div>
                      )}
                      {selectedTags.map((tag) => (
                        <div
                          key={tag}
                          className="flex items-center bg-secondary/20 border border-secondary/30 text-secondary px-3 py-1 rounded-md text-sm"
                        >
                          <span className="mr-2">{tag}</span>
                          <button
                            onClick={() => handleTagToggle(tag)}
                            className="hover:text-secondary-foreground transition-colors duration-200"
                            aria-label={`Remove ${tag} tag`}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedCategory('all');
                          setSelectedTags([]);
                        }}
                        className="px-3 py-1 text-sm bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-all duration-200"
                      >
                        Clear all
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        <section className="py-12 sm:py-16 bg-background px-4 sm:px-6">
          <div className="container-custom space-y-12">
            <div id="most-played">
              <GameSection
                title="🔥 Most Played"
                games={mostPlayedGames}
                showViewMore
                viewMoreHref="/most-played"
                className="bg-background"
              />
            </div>

            <GameSection
              title="⭐ Recommended"
              games={recommendedGames}
              showViewMore
              viewMoreHref="/recommended"
              className="bg-muted/20"
            />

            <GameSection
              title="📈 Trending"
              games={trendingGames}
              showViewMore
              viewMoreHref="/trending"
              className="bg-background"
            />

            <GameSection
              title="🌐 IO Games"
              games={ioGames}
              showViewMore
              viewMoreHref="/category/io"
              className="bg-muted/20"
            />

            <GameSection
              title="🎲 Casual Games"
              games={casualGames}
              showViewMore
              viewMoreHref="/category/casual"
              className="bg-background"
            />

            <GameSection
              title="⚔️ Action Games"
              games={actionGames}
              showViewMore
              viewMoreHref="/category/action"
              className="bg-muted/20"
            />

            <GameSection
              title="🚗 Car Games"
              games={carGames}
              showViewMore
              viewMoreHref="/category/car"
              className="bg-background"
            />

            <GameSection
              title="🧩 Puzzle Games"
              games={puzzleGames}
              showViewMore
              viewMoreHref="/category/puzzle"
              className="bg-muted/20"
            />

            <GameSection
              title="🏅 Sports Games"
              games={sportsGames}
              showViewMore
              viewMoreHref="/category/sports"
              className="bg-background"
            />

            <GameSection
              title="👶 Kids Games"
              games={kidsGames}
              showViewMore
              viewMoreHref="/category/kids"
              className="bg-muted/20"
            />

            <section className="py-16 bg-card rounded-2xl px-6 sm:px-10">
              <div className="max-w-4xl mx-auto text-center space-y-6">
                <h2 className="text-3xl font-bold text-foreground">Our Game Picks</h2>
                <div className="grid md:grid-cols-2 gap-8 text-left">
                  <div>
                    <p className="text-muted-foreground leading-relaxed">
                      New games from top developers around the world are added every day. Play
                      classics like{' '}
                      <Link href="/play/solitaire-gpx" className="text-primary hover:underline mx-1">
                        Solitaire
                      </Link>
                      ,{' '}
                      <Link href="/play/2048" className="text-primary hover:underline mx-1">
                        2048
                      </Link>{' '}
                      and{' '}
                      <Link href="/play/minesweeper" className="text-primary hover:underline mx-1">
                        Minesweeper
                      </Link>
                      , or explore hits like{' '}
                      <Link href="/play/shell-shockers" className="text-primary hover:underline mx-1">
                        Shell Shockers
                      </Link>
                      ,{' '}
                      <Link href="/play/smash-karts" className="text-primary hover:underline mx-1">
                        Smash Karts
                      </Link>{' '}
                      and{' '}
                      <Link
                        href="/play/flappy-bird-classic"
                        className="text-primary hover:underline mx-1"
                      >
                        Flappy Bird
                      </Link>
                      .
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground leading-relaxed">
                      Our collection spans genres from{' '}
                      <Link href="/category/puzzle" className="text-primary hover:underline mx-1">
                        Puzzle Games
                      </Link>{' '}
                      to{' '}
                      <Link href="/category/car" className="text-primary hover:underline mx-1">
                        Car Games
                      </Link>
                      , ensuring every player finds something they love.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </div>
  );
}
