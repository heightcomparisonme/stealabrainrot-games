'use client';

import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({ onSearch, placeholder = "Search games...", className = "" }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    // Live search
    onSearch(value);
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full bg-card border border-border rounded-lg px-4 py-3 pl-12 text-foreground placeholder-muted-foreground transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          style={{
            boxShadow: '0 0 0 1px rgba(91, 88, 255, 0.1)'
          }}
        />

        {/* Search Icon */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <svg
            className="w-5 h-5 text-muted-foreground transition-colors duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Clear Button */}
        {searchQuery && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              onSearch("");
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-muted-foreground hover:text-primary transition-colors duration-200"
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

        {/* Search Results Count */
        }
      {searchQuery && (
        <div className="absolute top-full left-0 right-0 mt-2 text-sm text-muted-foreground">
          <div
            className="bg-card border border-border rounded-lg px-3 py-2"
            style={{
              boxShadow: '0 0 0 1px rgba(91, 88, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.3)'
            }}
          >
            Search: <span className="text-primary font-medium">"{searchQuery}"</span>
          </div>
        </div>
      )}
    </form>
  );
}
