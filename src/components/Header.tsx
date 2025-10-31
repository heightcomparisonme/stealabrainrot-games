'use client';

import { useState } from 'react';
import Link from 'next/link';
import { navigationItems, gameCategories } from '@/lib/games';
import { useTheme } from '@/contexts/ThemeContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50" style={{
      boxShadow: '0 1px 0 rgba(91, 88, 255, 0.1), 0 0 20px rgba(0, 0, 0, 0.3)'
    }}>
      {/* Top Navigation */}
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <img
                src="https://ext.same-assets.com/54244373/3952684937.png"
                alt="Steal a Brainrot"
                className="h-8 w-auto cyber-glow transition-all duration-300 hover:scale-105"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="nav-link text-sm font-semibold tracking-wide"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Language Selector & Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 bg-card border border-border rounded-md hover:border-primary/50 transition-all duration-200 hidden md:block"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              style={{
                boxShadow: '0 0 0 1px rgba(91, 88, 255, 0.1)'
              }}
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Language Selector */}
            <div className="hidden md:block">
              <select
                className="bg-card border border-border rounded-md px-3 py-1 text-sm text-foreground transition-all duration-200 hover:border-primary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                style={{
                  boxShadow: '0 0 0 1px rgba(91, 88, 255, 0.1)'
                }}
              >
                <option value="en">🇺🇸 English</option>
                <option value="es">🇪🇸 Español</option>
                <option value="fr">🇫🇷 Français</option>
                <option value="de">🇩🇪 Deutsch</option>
                <option value="it">🇮🇹 Italiano</option>
              </select>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md border border-border hover:border-primary/50 transition-all duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                background: 'rgba(91, 88, 255, 0.1)'
              }}
            >
              <svg
                className="h-6 w-6 text-foreground transition-colors duration-200"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Game Categories Bar */}
      <div
        className="border-t border-border"
        style={{
          background: 'linear-gradient(90deg, rgba(91, 88, 255, 0.05) 0%, rgba(255, 159, 28, 0.03) 50%, rgba(91, 88, 255, 0.05) 100%)'
        }}
      >
        <div className="container-custom">
          <div className="flex items-center space-x-1 py-3 overflow-x-auto scrollbar-hide">
            {gameCategories.map((category) => (
              <Link
                key={category.id}
                href={category.id === 'all' ? '/' : `/category/${category.id}`}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-200 whitespace-nowrap group"
                style={{
                  background: 'rgba(91, 88, 255, 0.05)',
                  border: '1px solid rgba(91, 88, 255, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(91, 88, 255, 0.15)';
                  e.currentTarget.style.borderColor = 'rgba(91, 88, 255, 0.3)';
                  e.currentTarget.style.boxShadow = '0 0 8px rgba(91, 88, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(91, 88, 255, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(91, 88, 255, 0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <span className="text-lg filter drop-shadow-sm">{category.icon}</span>
                <span className="font-medium tracking-wide">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div
          className="md:hidden border-t border-border"
          style={{
            background: 'rgba(20, 19, 26, 0.95)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)'
          }}
        >
          <div className="px-4 py-4 space-y-3">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block nav-link py-2 px-3 rounded-md transition-all duration-200 hover:bg-primary/10"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Theme Toggle and Language Selector */}
            <div className="pt-4 border-t border-border space-y-3">
              <button
                onClick={toggleTheme}
                className="w-full flex items-center justify-center space-x-2 p-2 bg-card border border-border rounded-md hover:border-primary/50 transition-all duration-200"
                style={{
                  boxShadow: '0 0 0 1px rgba(91, 88, 255, 0.1)'
                }}
              >
                {theme === 'dark' ? (
                  <>
                    <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span className="text-foreground">Switch to light mode</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                    <span className="text-foreground">Switch to dark mode</span>
                  </>
                )}
              </button>

              <select
                className="w-full bg-card border border-border rounded-md px-3 py-2 text-sm text-foreground transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                style={{
                  boxShadow: '0 0 0 1px rgba(91, 88, 255, 0.1)'
                }}
              >
                <option value="en">🇺🇸 English</option>
                <option value="es">🇪🇸 Español</option>
                <option value="fr">🇫🇷 Français</option>
                <option value="de">🇩🇪 Deutsch</option>
                <option value="it">🇮🇹 Italiano</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
