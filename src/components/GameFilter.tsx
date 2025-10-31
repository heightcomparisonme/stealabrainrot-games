'use client';

import { gameCategories } from '@/lib/games';

interface GameFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  availableTags: string[];
  className?: string;
}

export default function GameFilter({
  selectedCategory,
  onCategoryChange,
  selectedTags,
  onTagToggle,
  availableTags,
  className = ""
}: GameFilterProps) {
  const popularTags = ['io', 'action', 'puzzle', 'racing', 'casual', 'kids', 'sports', 'shooter', 'adventure'];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Category Filter */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <span className="text-primary mr-2">🎮</span>
          Categories
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {gameCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-card border border-border text-muted-foreground hover:text-primary hover:border-primary/50'
              }`}
              style={{
                ...(selectedCategory === category.id
                  ? {
                      boxShadow: '0 0 0 1px rgba(91, 88, 255, 0.3), 0 4px 12px rgba(91, 88, 255, 0.2)'
                    }
                  : {
                      boxShadow: '0 0 0 1px rgba(91, 88, 255, 0.1)'
                    }
                )
              }}
            >
              <span className="text-lg">{category.icon}</span>
              <span className="font-medium">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tags Filter */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <span className="text-secondary mr-2">🏷️</span>
          Popular Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {popularTags.filter(tag => availableTags.includes(tag)).map((tag) => (
            <button
              key={tag}
              onClick={() => onTagToggle(tag)}
              className={`px-3 py-1 text-sm rounded-md font-medium transition-all duration-200 ${
                selectedTags.includes(tag)
                  ? 'bg-secondary text-secondary-foreground'
                  : 'bg-card border border-border text-muted-foreground hover:text-secondary hover:border-secondary/50'
              }`}
              style={{
                ...(selectedTags.includes(tag)
                  ? {
                      boxShadow: '0 0 0 1px rgba(255, 159, 28, 0.3), 0 2px 8px rgba(255, 159, 28, 0.2)'
                    }
                  : {
                      boxShadow: '0 0 0 1px rgba(91, 88, 255, 0.1)'
                    }
                )
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Additional Tags */}
        {availableTags.filter(tag => !popularTags.includes(tag)).length > 0 && (
          <details className="mt-4">
            <summary className="text-sm text-muted-foreground cursor-pointer hover:text-primary transition-colors duration-200 flex items-center">
              <span className="mr-2">More tags</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </summary>
            <div className="flex flex-wrap gap-2 mt-3">
              {availableTags.filter(tag => !popularTags.includes(tag)).map((tag) => (
                <button
                  key={tag}
                  onClick={() => onTagToggle(tag)}
                  className={`px-3 py-1 text-sm rounded-md font-medium transition-all duration-200 ${
                    selectedTags.includes(tag)
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-card border border-border text-muted-foreground hover:text-accent hover:border-accent/50'
                  }`}
                  style={{
                    boxShadow: '0 0 0 1px rgba(91, 88, 255, 0.1)'
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </details>
        )}
      </div>

      {/* Active Filters */}
      {(selectedCategory !== 'all' || selectedTags.length > 0) && (
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <span className="text-accent mr-2">🔍</span>
            Active Filters
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedCategory !== 'all' && (
              <div className="flex items-center bg-primary/20 border border-primary/30 text-primary px-3 py-1 rounded-md text-sm">
                <span className="mr-2">
                  {gameCategories.find(c => c.id === selectedCategory)?.name}
                </span>
                <button
                  onClick={() => onCategoryChange('all')}
                  className="hover:text-primary-foreground transition-colors duration-200"
                >
                  ✕
                </button>
              </div>
            )}
            {selectedTags.map((tag) => (
              <div key={tag} className="flex items-center bg-secondary/20 border border-secondary/30 text-secondary px-3 py-1 rounded-md text-sm">
                <span className="mr-2">{tag}</span>
                <button
                  onClick={() => onTagToggle(tag)}
                  className="hover:text-secondary-foreground transition-colors duration-200"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                onCategoryChange('all');
                for (const tag of selectedTags) {
                  onTagToggle(tag);
                }
              }}
              className="px-3 py-1 text-sm bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-all duration-200"
            >
              Clear all
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
