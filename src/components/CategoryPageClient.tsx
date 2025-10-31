'use client';

import { useMemo, useState } from 'react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import GameCard from '@/components/GameCard';
import Footer from '@/components/Footer';
import type { Game } from '@/lib/games';

interface CategoryInfo {
  id: string;
  name: string;
  icon: string;
}

interface CategoryPageClientProps {
  category: string;
  categoryInfo: CategoryInfo;
  categoryGames: Game[];
}

export default function CategoryPageClient({
  category,
  categoryInfo,
  categoryGames,
}: CategoryPageClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const availableTags = useMemo(() => {
    const allTags = categoryGames.flatMap(game => game.tags);
    return Array.from(new Set(allTags)).sort();
  }, [categoryGames]);

  const filteredGames = useMemo(() => {
    let filtered = categoryGames;

    if (searchQuery) {
      filtered = filtered.filter(game =>
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter(game =>
        selectedTags.every(tag => game.tags.includes(tag))
      );
    }

    return filtered;
  }, [categoryGames, searchQuery, selectedTags]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const hasActiveFilters = searchQuery.length > 0 || selectedTags.length > 0;

  const structuredData = useMemo(() => {
    const topGames = categoryGames.slice(0, 8).map((game, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `https://stealabrainrot.games${game.href}`,
      name: game.title,
    }));

    return {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `${categoryInfo.name} Games`,
      description: `Play free ${categoryInfo.name.toLowerCase()} games online.`,
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: topGames,
      },
    };
  }, [categoryGames, categoryInfo]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="hero-gradient py-16 px-4 sm:px-6">
          <div className="container-custom text-center">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-foreground mb-6 flex items-center justify-center">
              <span className="text-5xl sm:text-6xl mr-4">{categoryInfo.icon}</span>
              {categoryInfo.name} Games
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Explore our curated selection of {categoryInfo.name} games with {categoryGames.length}{' '}
              exciting titles. Start playing now and enjoy endless fun!
            </p>

            <div className="max-w-2xl mx-auto mb-6">
              <SearchBar
                onSearch={handleSearch}
                placeholder={`Search ${categoryInfo.name} games...`}
                className="mb-4"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`btn-secondary flex items-center space-x-2 ${showFilters ? 'bg-secondary/20' : ''}`}
              >
                <span>🔍</span>
                <span>Filters</span>
                {hasActiveFilters && <span className="bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full text-xs">!</span>}
              </button>
            </div>
          </div>
        </section>

        {showFilters && (
          <section className="py-8 bg-muted/20 border-b border-border px-4 sm:px-6">
            <div className="container-custom">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                    <span className="text-secondary mr-2">🏷️</span>
                    Game Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {availableTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleTagToggle(tag)}
                        className={`px-3 py-1 text-sm rounded-md font-medium transition-all duration-200 ${
                          selectedTags.includes(tag)
                            ? 'bg-secondary text-secondary-foreground'
                            : 'bg-card border border-border text-muted-foreground hover:text-secondary hover:border-secondary/50'
                        }`}
                        style={{
                          ...(selectedTags.includes(tag)
                            ? {
                                boxShadow: '0 0 0 1px rgba(255, 159, 28, 0.3), 0 2px 8px rgba(255, 159, 28, 0.2)',
                              }
                            : {
                                boxShadow: '0 0 0 1px rgba(91, 88, 255, 0.1)',
                              }
                          ),
                        }}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {hasActiveFilters && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                      <span className="text-accent mr-2">🔍</span>
                      Active Filters
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedTags.map((tag) => (
                        <div key={tag} className="flex items-center bg-secondary/20 border border-secondary/30 text-secondary px-3 py-1 rounded-md text-sm">
                          <span className="mr-2">{tag}</span>
                          <button
                            onClick={() => handleTagToggle(tag)}
                            className="hover:text-secondary-foreground transition-colors duration-200"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          setSearchQuery('');
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

        <section className="py-8 bg-background px-4 sm:px-6">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-6">
              <h2 className="section-title">
                {hasActiveFilters ? '🔍 Filtered Results' : `🎮 All ${categoryInfo.name} Games`}
                <span className="text-lg text-muted-foreground ml-2">
                  (Found {filteredGames.length} games)
                </span>
              </h2>
              {hasActiveFilters && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedTags([]);
                  }}
                  className="btn-secondary text-sm px-4 py-2"
                >
                  Clear filters
                </button>
              )}
            </div>

            {filteredGames.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredGames.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                  No games found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search terms or filters
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedTags([]);
                  }}
                  className="btn-primary"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="py-16 bg-card px-4 sm:px-6">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                About {categoryInfo.name} Games
              </h2>
              <div className="text-muted-foreground mb-8">
                {getCategoryDescription(category)}
              </div>
              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Features</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    {getCategoryFeatures(category).map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-primary">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Why We Recommend</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    {getCategoryReasons(category).map((reason, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-secondary">•</span>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
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

function getCategoryDescription(category: string): string {
  const descriptions: Record<string, string> = {
    io: 'IO games are known for simple pick-up-and-play mechanics and real-time multiplayer battles. Minimalist visuals with highly competitive and strategic gameplay.',
    action: 'Action games deliver fast-paced experiences that test reflexes and skill. From fighting and shooters to platforming and adventure, enjoy thrilling gameplay.',
    puzzle: 'Puzzle games train your logic and problem-solving skills. From classic number games to innovative brainteasers, have fun while sharpening your mind.',
    racing: 'Racing games combine speed and excitement. From karts to supercars, street tracks to pro circuits—satisfy your need for speed.',
    casual: 'Casual games are easy to pick up and relaxing for all ages. Simple controls and fun mechanics let you enjoy quick sessions anywhere.',
    sports: 'Sports games bring real-world athletics into virtual arenas—soccer, basketball, and more—experience the spirit of competition.',
    kids: 'Kids games are designed for young players with educational value and fun. Safe environments and age-appropriate content encourage learning and growth.',
  };
  return descriptions[category] || 'Explore this exciting category and discover your new favorite games!';
}

function getCategoryFeatures(category: string): string[] {
  const features: Record<string, string[]> = {
    io: ['Online multiplayer battles', 'Easy-to-learn controls', 'Real-time matchmaking', 'Leaderboards'],
    action: ['Fast-paced combat', 'Striking visuals', 'Varied weapons systems', 'Challenging levels'],
    puzzle: ['Boosts logical thinking', 'Progressive difficulty', 'Innovative mechanics', 'Achievements'],
    racing: ['Realistic physics', 'Varied tracks', 'Vehicle customization', 'Multiplayer races'],
    casual: ['Easy to pick up', 'Short play sessions', 'Charming art style', 'Relaxing gameplay'],
    sports: ['Authentic sports feel', 'Official-style rules', 'Team-based modes', 'Skill progression'],
    kids: ['Educational value', 'Safe content', 'Interactive learning', 'Fosters creativity'],
  };
  return features[category] || ['Great gameplay', 'High-quality content', 'Smooth controls', 'Fun mechanics'];
}

function getCategoryReasons(category: string): string[] {
  const reasons: Record<string, string[]> = {
    io: ['Build competitiveness', 'Improve reactions', 'Enjoy social play', 'Feel progression'],
    action: ['Relieve stress', 'Improve hand-eye coordination', 'Challenge your limits', 'Enjoy thrilling action'],
    puzzle: ['Develop intelligence', 'Improve focus', 'Build patience', 'Earn achievements'],
    racing: ['Feel the speed', 'Learn driving skills', 'Enjoy competition', 'Relax and unwind'],
    casual: ['Play anywhere', 'Reduce work stress', 'Easy to understand', 'Fun for everyone'],
    sports: ['Tactical thinking', 'Teamwork experience', 'Learn sports rules', 'Sportsmanship'],
    kids: ['Edutainment', 'Spark creativity', 'Encourage learning interest', 'Safe and healthy'],
  };
  return reasons[category] || ['Great entertainment', 'For all players', 'Fresh content updates', 'Community interaction'];
}
