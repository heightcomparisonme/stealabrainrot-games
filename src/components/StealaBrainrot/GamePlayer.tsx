"use client";

import { useState } from "react";
import { Maximize2, Minimize2, X } from "lucide-react";

interface GamePlayerProps {
  gameUrl?: string;
  gameName?: string;
  thumbnail?: string;
}

export default function GamePlayer({
  gameUrl = "https://st.8games.net/9/8g/igra-ukradi-brejnrot-original-3d/",
  gameName = "Steal a Brainrot",
  thumbnail = "https://ext.same-assets.com/3187520992/3746487869.png"
}: GamePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  const handleClose = () => {
    setIsPlaying(false);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (!isPlaying) {
    return (
      <div className="relative aspect-video bg-muted rounded-lg overflow-hidden group">
        {/* Background Image with Blur */}
        <div
          className="absolute inset-0 bg-cover bg-center blur-sm scale-110"
          style={{ backgroundImage: `url(${thumbnail})` }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
          {/* Game Logo/Thumbnail */}
          <div className="mb-6">
            <img
              src={thumbnail}
              alt={gameName}
              className="w-32 h-32 md:w-40 md:h-40 object-contain rounded-lg shadow-2xl"
            />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{gameName}</h2>
          <p className="text-white/90 mb-2">Revolutionary Brainrot Strategy Game</p>
          <p className="text-sm text-white/80 mb-8">Real-time Multiplayer • No Download • Instant Play</p>

          <button
            onClick={handlePlayClick}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 py-6 text-lg rounded-lg shadow-xl hover:scale-105 transition-all duration-300"
          >
            ▶ Start Game
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-background' : 'aspect-video rounded-lg overflow-hidden'}`}>
      {/* Control Bar */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-black/80 backdrop-blur-sm p-2 flex items-center justify-between">
        <span className="text-white text-sm font-medium px-2">{gameName}</span>
        <div className="flex gap-2">
          <button
            onClick={toggleFullscreen}
            className="text-white hover:text-blue-400 p-2 transition-colors"
            aria-label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
          </button>
          <button
            onClick={handleClose}
            className="text-white hover:text-red-500 p-2 transition-colors"
            aria-label="Close Game"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Game Iframe */}
      <iframe
        src={gameUrl}
        className="w-full h-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={gameName}
      />
    </div>
  );
}
