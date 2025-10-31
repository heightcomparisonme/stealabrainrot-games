'use client';

import GamePlayer from './GamePlayer';
import Section from './Section';
import Features from './features';
import FAQ from './faq';

interface StealaBrainrotProps {
  className?: string;
}

export default function StealaBrainrot({ className = '' }: StealaBrainrotProps) {
  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${className}`}>
      {/* Game Player Section */}
      <div className="bg-white dark:bg-gray-900 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <GamePlayer />
        </div>
      </div>
      
      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent mx-auto max-w-6xl" />
      
      {/* Main Game Information Section */}
      <Section className="bg-white dark:bg-gray-900" />
      
      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent mx-auto max-w-6xl" />
      
      {/* Game Features Section */}
      <Features className="bg-gray-50 dark:bg-gray-800" />
      
      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent mx-auto max-w-6xl" />
      
      {/* FAQ Section */}
      <FAQ className="bg-white dark:bg-gray-900 py-16" />
    </div>
  );
}

// Export individual components for flexibility
export { GamePlayer, Section, Features, FAQ };
