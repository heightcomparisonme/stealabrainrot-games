'use client';

import { useState } from 'react';
import type { Game } from '@/lib/games';

interface SocialShareProps {
  game: Game;
  className?: string;
}

export default function SocialShare({ game, className = '' }: SocialShareProps) {
  const [showShareModal, setShowShareModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const currentUrl = typeof window !== 'undefined' ? `${window.location.origin}/game/${game.id}` : '';
  const shareText = `I found an awesome game on Steal a Brainrot: ${game.title}! Come play with me!`;
  const shareDescription = `${game.title} - A great ${game.category} game featuring ${game.tags.join(', ')}. Play for free now!`;

  const shareData = {
    title: game.title,
    text: shareText,
    url: currentUrl
  };

  const socialPlatforms = [
    {
      name: 'WeChat',
      icon: '💬',
      color: 'bg-green-500 hover:bg-green-600',
      action: () => {
        // WeChat sharing typically needs WeChat JS SDK; simulate by copying link
        copyToClipboard();
        alert('Link copied to clipboard. Paste it in WeChat to share!');
      }
    },
    {
      name: 'QQ',
      icon: '🐧',
      color: 'bg-blue-500 hover:bg-blue-600',
      action: () => {
        const url = `https://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(shareText)}&desc=${encodeURIComponent(shareDescription)}`;
        window.open(url, '_blank', 'width=600,height=400');
      }
    },
    {
      name: 'Weibo',
      icon: '📱',
      color: 'bg-red-500 hover:bg-red-600',
      action: () => {
        const url = `https://service.weibo.com/share/share.php?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(shareText)}&pic=${encodeURIComponent(game.image)}`;
        window.open(url, '_blank', 'width=600,height=400');
      }
    },
    {
      name: 'Twitter',
      icon: '🐦',
      color: 'bg-sky-500 hover:bg-sky-600',
      action: () => {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`;
        window.open(url, '_blank', 'width=600,height=400');
      }
    },
    {
      name: 'Facebook',
      icon: '📘',
      color: 'bg-blue-600 hover:bg-blue-700',
      action: () => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(shareText)}`;
        window.open(url, '_blank', 'width=600,height=400');
      }
    },
    {
      name: 'Telegram',
      icon: '✈️',
      color: 'bg-blue-400 hover:bg-blue-500',
      action: () => {
        const url = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`;
        window.open(url, '_blank', 'width=600,height=400');
      }
    }
  ];

  const copyToClipboard = async () => {
    try {
      if (typeof window !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(currentUrl);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } else {
        // Fallback handling
        const textArea = document.createElement('textarea');
        textArea.value = currentUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      }
    } catch (err) {
      console.error('Copy failed:', err);
      // Fallback handling
      const textArea = document.createElement('textarea');
      textArea.value = currentUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleNativeShare = async () => {
    if (typeof window !== 'undefined' && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setShowShareModal(true);
        }
      }
    } else {
      setShowShareModal(true);
    }
  };

  return (
    <div className={className}>
      {/* Quick share button */}
      <button
        onClick={handleNativeShare}
        className="btn-secondary flex items-center space-x-2"
        title="Share game"
      >
        <span>🔗</span>
        <span>Share</span>
      </button>

      {/* Share modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-foreground">Share Game</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="p-1 hover:bg-muted rounded-lg transition-colors duration-200"
              >
                <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Game preview */}
            <div className="flex items-center space-x-3 mb-6 p-3 bg-muted/20 rounded-lg">
              <img
                src={game.image}
                alt={game.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="font-medium text-foreground">{game.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {game.category} • {game.tags.slice(0, 2).join(', ')}
                </p>
              </div>
            </div>

            {/* Social platforms */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {socialPlatforms.map((platform) => (
                <button
                  key={platform.name}
                  onClick={platform.action}
                  className={`${platform.color} text-white p-3 rounded-lg transition-all duration-200 transform hover:scale-105 flex flex-col items-center space-y-1`}
                >
                  <span className="text-xl">{platform.icon}</span>
                  <span className="text-xs font-medium">{platform.name}</span>
                </button>
              ))}
            </div>

            {/* Copy link */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={currentUrl}
                  readOnly
                  className="flex-1 bg-muted border border-border rounded-md px-3 py-2 text-sm text-muted-foreground"
                />
                <button
                  onClick={copyToClipboard}
                  className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                    copySuccess
                      ? 'bg-green-500 text-white'
                      : 'bg-primary text-primary-foreground hover:bg-primary/90'
                  }`}
                >
                  {copySuccess ? '✅ Copied' : '📋 Copy'}
                </button>
              </div>

              {copySuccess && (
                <p className="text-sm text-green-500 text-center">
                  Link copied to clipboard!
                </p>
              )}
            </div>

            {/* QR sharing (placeholder) */}
            <div className="mt-6 text-center">
              <div className="bg-muted/20 border border-border rounded-lg p-4">
                <div className="w-32 h-32 bg-white mx-auto mb-3 rounded-lg flex items-center justify-center">
                  {/* 这里可以集成真实的二维码生成库，暂时用占位符 */}
                  <div className="grid grid-cols-8 gap-1">
                    {Array.from({ length: 64 }).map((_, i) => {
                      const isBlack = Math.random() > 0.5;
                      return (
                        <div
                          key={`qr-pixel-${i}-${isBlack ? 'black' : 'white'}`}
                          className={`w-1 h-1 ${isBlack ? 'bg-black' : 'bg-white'}`}
                        />
                      );
                    })}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Scan with your phone to share
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
