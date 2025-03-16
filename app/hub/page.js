"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function GamingHub() {
  const [gameState, setGameState] = useState({
    flowerMatch: false,
    cupcakeCatch: false,
    heartJump: false
  });
  const [activeTab, setActiveTab] = useState('games');
  const [showGrid, setShowGrid] = useState(false);
  
  useEffect(() => {
    // Add grid effect with slight delay for a cool entrance
    const timer = setTimeout(() => setShowGrid(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Load game state on mount
  useEffect(() => {
    const savedState = localStorage.getItem('gameState');
    if (savedState) {
      setGameState(JSON.parse(savedState));
    }
  }, []);

  // Save game state when it changes
  useEffect(() => {
    localStorage.setItem('gameState', JSON.stringify(gameState));
  }, [gameState]);

  // Present content for each game
  const presents = [
    {
      id: 'flowerMatch',
      title: 'Flower Match Present',
      content: 'A coupon for one romantic dinner date!',
      imageSrc: '/presents/present1.png'
    },
    {
      id: 'cupcakeCatch',
      title: 'Cupcake Catch Present',
      content: 'A special photo of us styled as pixel art!',
      imageSrc: '/presents/present2.png'
    },
    {
      id: 'heartJump',
      title: 'Heart Jump Present',
      content: 'A love note just for you!',
      imageSrc: '/presents/present3.png'
    }
  ];

  const gameCards = [
    {
      id: 'flowerMatch',
      title: 'Flower Match',
      description: 'Match pairs of beautiful flowers in this memory game!',
      imageUrl: '/images/game-flower.png',
      gameUrl: '/games/flower-match',
      completed: gameState.flowerMatch
    },
    {
      id: 'cupcakeCatch',
      title: 'Cupcake Catch',
      description: 'Catch falling cupcakes and avoid the bombs!',
      imageUrl: '/images/game-cupcake.png',
      gameUrl: '/games/cupcake-catch',
      completed: gameState.cupcakeCatch
    },
    {
      id: 'heartJump',
      title: 'Heart Jump',
      description: 'Jump to collect hearts in this cute platformer!',
      imageUrl: '/images/game-hear2t.png',
      gameUrl: '/games/heart-jump',
      completed: gameState.heartJump
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 py-8 px-4 relative overflow-hidden">
      {/* Modern arcade grid background effect */}
      <div className={`absolute inset-0 ${showGrid ? 'opacity-30' : 'opacity-0'} transition-opacity duration-2000`}>
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(to right, rgba(255,120,240,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,120,240,0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          transform: 'perspective(500px) rotateX(60deg)',
          transformOrigin: 'center top',
          height: '200%',
          top: '-50%'
        }}></div>
      </div>
      
      {/* Neon light effect borders */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-pink-500/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-purple-500/20 to-transparent"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="font-pixel text-4xl md:text-5xl text-white mb-3 drop-shadow-[0_0_10px_rgba(255,0,240,0.7)]">
            <span className="relative inline-block">
              RETRO ARCADE
              <span className="absolute inset-0 blur-sm text-pink-400 animate-pulse" style={{ animationDuration: '3s' }}>RETRO ARCADE</span>
            </span>
          </h1>
          <div className="h-1 w-40 bg-gradient-to-r from-cyan-400 via-pink-500 to-cyan-400 mx-auto my-4 rounded-full animate-pulse" style={{ animationDuration: '4s' }}></div>
          <p className="font-pixel text-sm text-pink-300 mt-2">Play games and unlock presents!</p>
          
          {/* Progress indicator */}
          <div className="mt-6 flex justify-center">
            <div className="font-pixel text-xs bg-black/40 text-pink-300 px-6 py-2 rounded-full border border-pink-500/30 shadow-[0_0_10px_rgba(255,105,180,0.3)]">
              <span className="text-cyan-300 mr-2">Progress:</span>
              {Object.values(gameState).filter(Boolean).length} / 3 Games Completed
            </div>
          </div>
        </header>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-black/50 backdrop-blur-sm p-1 rounded-full border border-pink-500/30 shadow-[0_0_15px_rgba(255,105,180,0.2)]">
            <button 
              onClick={() => setActiveTab('games')}
              className={`font-pixel text-sm px-8 py-2 rounded-full transition-all ${
                activeTab === 'games' 
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-[0_0_10px_rgba(219,39,119,0.5)]' 
                  : 'text-pink-300 hover:text-white hover:bg-pink-900/30'
              }`}
            >
              Games
            </button>
            <button 
              onClick={() => setActiveTab('presents')}
              className={`font-pixel text-sm px-8 py-2 rounded-full transition-all ${
                activeTab === 'presents' 
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-[0_0_10px_rgba(219,39,119,0.5)]' 
                  : 'text-pink-300 hover:text-white hover:bg-pink-900/30'
              }`}
            >
              Presents 
              {Object.values(gameState).filter(Boolean).length > 0 && (
                <span className="ml-2 inline-block w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
              )}
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'games' ? (
          <div className="backdrop-blur-sm bg-black/50 border border-pink-500/50 rounded-lg overflow-hidden shadow-[0_0_20px_rgba(219,39,119,0.3)]">
            {/* Header panel with scanlines */}
            <div className="bg-gradient-to-r from-purple-900/80 to-pink-900/80 p-4 border-b border-pink-500/30 relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: 'repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05) 1px, transparent 1px, transparent 2px)',
                backgroundSize: '100% 2px',
              }}></div>
              
              <div className="flex items-center justify-between">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                <h2 className="font-pixel text-xl text-pink-400 text-center">Select Game</h2>
                <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              </div>
            </div>
            
            {/* Game cards grid */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {gameCards.map((game) => (
                  <Link 
                    key={game.id} 
                    href={game.gameUrl}
                    className="block transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 focus:outline-none"
                  >
                    <div className="bg-gray-900/80 border border-pink-500/50 rounded-lg overflow-hidden h-full">
                      {/* Game title bar */}
                      <div className="bg-gradient-to-r from-purple-800 to-pink-800 px-3 py-2 border-b border-pink-500/30 flex items-center justify-between">
                        <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                        <h3 className="font-pixel text-sm text-pink-300">{game.title}</h3>
                        <div className="w-2 h-2 rounded-full bg-pink-400"></div>
                      </div>
                      
                      {/* Game image */}
                      <div className="relative h-40 overflow-hidden bg-black/30 border-b border-pink-500/30">
                        <Image 
                          src={game.imageUrl} 
                          alt={game.title}
                          fill
                          className="object-contain p-4"
                          style={{ imageRendering: 'pixelated' }}
                        />
                        
                        {/* Completion overlay */}
                        {game.completed && (
                          <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center backdrop-blur-sm">
                            <div className="bg-gradient-to-r from-green-600 to-teal-600 px-3 py-1 font-pixel text-xs text-white shadow-[0_0_10px_rgba(16,185,129,0.5)] rotate-6">
                              COMPLETED!
                            </div>
                          </div>
                        )}
                        
                        {/* Scanlines overlay */}
                        <div className="absolute inset-0 pointer-events-none opacity-10" style={{
                          backgroundImage: 'repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1) 1px, transparent 1px, transparent 2px)',
                          backgroundSize: '100% 2px',
                        }}></div>
                      </div>
                      
                      {/* Game info */}
                      <div className="p-4">
                        <p className="text-xs text-pink-200/80 mb-4 h-12 overflow-hidden">{game.description}</p>
                        
                        <button className={`w-full py-2 px-3 rounded font-pixel text-xs ${
                          game.completed
                            ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white border border-green-500/50'
                            : 'bg-gradient-to-r from-pink-600 to-purple-600 text-white border border-pink-500/50'
                        } hover:shadow-[0_0_10px_rgba(219,39,119,0.5)] transition-shadow`}>
                          {game.completed ? 'Play Again' : 'Play Now'}
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="backdrop-blur-sm bg-black/50 border border-pink-500/50 rounded-lg overflow-hidden shadow-[0_0_20px_rgba(219,39,119,0.3)]">
            {/* Header panel with scanlines */}
            <div className="bg-gradient-to-r from-purple-900/80 to-pink-900/80 p-4 border-b border-pink-500/30 relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: 'repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05) 1px, transparent 1px, transparent 2px)',
                backgroundSize: '100% 2px',
              }}></div>
              
              <div className="flex items-center justify-between">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                <h2 className="font-pixel text-xl text-pink-400 text-center">Your Presents</h2>
                <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              </div>
            </div>
            
            {/* Presents content */}
            <div className="p-6">
              {Object.values(gameState).some(Boolean) ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {presents.map((present) => (
                    <div key={present.id} className="relative">
                      {/* Present container */}
                      <div className={`bg-gray-900/80 border ${
                        gameState[present.id] ? 'border-pink-500/70' : 'border-gray-700/50'
                      } rounded-lg p-5 flex flex-col items-center transition-all duration-300 ${
                        gameState[present.id] ? 'hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(219,39,119,0.4)] cursor-pointer' : 'opacity-50'
                      }`}>
                        {/* Present image */}
                        <div className="relative w-24 h-24 mb-3">
                          <Image
                            src={gameState[present.id] ? present.imageSrc : "/presents/present-locked.png"}
                            alt={present.title}
                            width={96}
                            height={96}
                            style={{ objectFit: 'contain', imageRendering: 'pixelated' }}
                          />
                          {gameState[present.id] && (
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                              <div className="w-full h-full bg-pink-500/20 backdrop-blur-sm flex items-center justify-center">
                                <span className="font-pixel text-xs text-white px-2 py-1 bg-pink-600/80 rounded">View</span>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <h3 className="font-pixel text-sm text-center text-pink-300 mb-2">{present.title}</h3>
                        
                        {gameState[present.id] ? (
                          <div className="mt-2 px-3 py-1 font-pixel text-xs text-white bg-gradient-to-r from-pink-600 to-purple-600 rounded">
                            Open Me!
                          </div>
                        ) : (
                          <div className="mt-2 px-3 py-1 font-pixel text-xs text-gray-400 bg-gray-800 rounded border border-gray-700">
                            Locked
                          </div>
                        )}
                      </div>
                      
                      {/* Status indicator */}
                      {gameState[present.id] && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-500 to-teal-500 rounded-full border border-green-400/50 flex items-center justify-center shadow-[0_0_8px_rgba(16,185,129,0.5)]">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <div className="mb-6 opacity-50 relative">
                    <Image 
                      src="/presents/present-locked.png" 
                      alt="Locked Present"
                      width={64}
                      height={64}
                      className="mx-auto"
                      style={{ imageRendering: 'pixelated' }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 border-2 border-pink-500/40 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
                    </div>
                  </div>
                  <p className="font-pixel text-sm text-pink-300">Complete games to unlock special presents!</p>
                  <p className="font-pixel text-xs text-pink-400/60 mt-2">Each game completed unlocks a gift just for you</p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-3 px-6 py-2 rounded-full bg-black/40 border border-pink-500/30">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
            <p className="font-pixel text-xs text-pink-300">Made with ♥ for you</p>
            <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}