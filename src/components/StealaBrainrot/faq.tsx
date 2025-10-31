'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: 'what-is-steal-a-brainrot',
    question: "What is Steal a Brainrot?",
    answer: "Steal a Brainrot is a groundbreaking online strategy game that revolutionizes the gaming experience through unique brainrot mechanics. This free browser game combines real-time strategy elements with multiplayer competition, creating an addictive gameplay loop that keeps players engaged for hours.",
  },
  {
    id: 'how-to-play',
    question: "How do I play Steal a Brainrot?",
    answer: "Simply open the game in your browser - no downloads required! Use your mouse to select units and buildings, right-click to issue movement and attack commands. The game supports cross-platform play, so you can enjoy it on any device.",
  },
  {
    id: 'special-features',
    question: "What special features does the game have?",
    answer: "The game features innovative resource stealing mechanics, real-time strategic combat systems, multiplayer competitive modes, and a dynamic brain corruption system that adds layers of complexity to every decision.",
  },
  {
    id: 'is-free',
    question: "Is the game completely free?",
    answer: "Yes! Steal a Brainrot is completely free to play with no downloads required. All features are accessible directly in your browser without any cost.",
  },
  {
    id: 'improve-skills',
    question: "How can I improve my gameplay skills?",
    answer: "Mastering Steal a Brainrot requires understanding its unique brainrot mechanics and strategic depth. Start with basic controls, learn resource management, unit positioning, and timing windows, then gradually advance to more complex tactics.",
  },
  {
    id: 'what-makes-unique',
    question: "What makes Steal a Brainrot unique?",
    answer: "The game introduces a dynamic brain corruption system that traditional strategy games lack. This system adds complexity to every decision, encouraging creative approaches and adaptive thinking.",
  },
];

interface FAQProps {
  className?: string;
}

export default function FAQ({ className = '' }: FAQProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const toggleAll = () => {
    if (openItems.size === faqs.length) {
      setOpenItems(new Set());
    } else {
      setOpenItems(new Set(faqs.map(faq => faq.id)));
    }
  };

  return (
    <section className={`w-full max-w-4xl mx-auto ${className}`}>
      <div className="mb-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Everything you need to know about Steal a Brainrot
        </p>
        <button
          onClick={toggleAll}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          aria-label={openItems.size === faqs.length ? "Collapse all questions" : "Expand all questions"}
        >
          {openItems.size === faqs.length ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Collapse All
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Expand All
            </>
          )}
        </button>
      </div>

      <div className="space-y-4">
        {faqs.map((faq) => {
          const isOpen = openItems.has(faq.id);
          
          return (
            <div
              key={faq.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  )}
                </div>
              </button>
              
              {isOpen && (
                <div
                  id={`faq-answer-${faq.id}`}
                  className="px-6 py-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
                >
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}