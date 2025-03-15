"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ButtonGame from '@/components/ButtonGame';
import CardPresent from '@/components/CardPresent';
import ContainerPixel from '@/components/ContainerPixel';

export default function GamingHub() {
  const [gameState, setGameState] = useState({
    flowerMatch: false,
    cupcakeCatch: false,
    heartJump: false
  });
  const [sparklePosition, setSparklePosition] = useState([]);
  const [activeTab, setActiveTab] = useState('games');

  // Load game state on mount
  useEffect(() => {
    const savedState = localStorage.getItem('gameState');
    if (savedState) {
      setGameState(JSON.parse(savedState));
    }
    
    // Initialize random sparkles
    const sparkles = [];
    for (let i = 0; i < 10; i++) {
      sparkles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 16 + 8,
        delay: Math.random() * 2
      });
    }
    setSparklePosition(sparkles);
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
      imageUrl: '/images/game-heart.png',
      gameUrl: '/games/heart-jump',
      completed: gameState.heartJump
    }
  ];

  return (
    <div className="min-h-screen bg-girly-gradient-animated py-8 px-4 relative overflow-hidden">
      {/* Background sparkles */}
      {sparklePosition.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute pixel-sparkle z-0"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            animationDelay: `${sparkle.delay}s`
          }}
        >
          <Image
            src="/images/pixel-sparkle.png"
            alt="Sparkle"
            width={sparkle.size}
            height={sparkle.size}
            style={{ opacity: 0.7 }}
          />
        </div>
      ))}

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="font-pixel text-4xl mb-2 text-shadow-pixel">
            <span className="pixel-rainbow-text">Retro Gaming Hub</span>
          </h1>
          <div className="h-1 w-64 bg-pink-400 mx-auto mb-4"></div>
          <p className="font-pixel text-lg text-primary text-shadow-pixel-sm">Play games and unlock presents!</p>
          
          {/* Progress indicator */}
          <div className="mt-4 flex justify-center">
            <div className="font-pixel text-sm text-primary bg-white px-4 py-2 rounded-full border-2 border-purple-400">
              {Object.values(gameState).filter(Boolean).length} / 3 Games Completed
            </div>
          </div>
        </header>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="grid grid-cols-2 gap-2 bg-white p-1 rounded-full border-2 border-purple-300">
            <button 
              onClick={() => setActiveTab('games')}
              className={`font-pixel text-sm px-6 py-2 rounded-full transition-all ${
                activeTab === 'games' 
                  ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white' 
                  : 'text-primary hover:bg-pink-100'
              }`}
            >
              Games
            </button>
            <button 
              onClick={() => setActiveTab('presents')}
              className={`font-pixel text-sm px-6 py-2 rounded-full transition-all ${
                activeTab === 'presents' 
                  ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white' 
                  : 'text-primary hover:bg-pink-100'
              }`}
            >
              Presents 
              <span className="ml-1">
                {Object.values(gameState).filter(Boolean).length > 0 && '✨'}
              </span>
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'games' ? (
          <ContainerPixel className="bg-purple-100 p-6 relative">
            <h2 className="font-pixel text-2xl text-primary mb-6 text-center text-shadow-pixel-sm">Choose a Game</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {gameCards.map((game) => (
                <Link 
                  key={game.id} 
                  href={game.gameUrl}
                  className="transform transition-transform hover:scale-105 hover:-rotate-1"
                >
                  <div className="pixel-box bg-white overflow-hidden h-full">
                    <div className="relative h-48 overflow-hidden bg-pink-100">
                      <Image 
                        src={game.imageUrl} 
                        alt={game.title}
                        fill
                        className="object-contain p-4"
                        style={{ imageRendering: 'pixelated' }}
                      />
                      {game.completed && (
                        <div className="absolute inset-0 bg-green-500 bg-opacity-30 flex items-center justify-center">
                          <div className="bg-green-600 text-white font-pixel px-3 py-1 rotate-12">
                            COMPLETED!
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-pixel text-lg text-primary mb-2">{game.title}</h3>
                      <p className="text-sm text-secondary mb-4">{game.description}</p>
                      
                      <button className={`w-full pixel-button py-2 rounded-md text-center ${
                        game.completed
                          ? 'bg-green-500 text-white'
                          : 'bg-gradient-to-r from-pink-300 to-purple-300 text-primary font-bold'
                      }`}>
                        {game.completed ? 'Play Again' : 'Play Now'}
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </ContainerPixel>
        ) : (
          <ContainerPixel className="bg-pink-100 p-6 relative min-h-[300px]">
            <h2 className="font-pixel text-2xl text-primary mb-6 text-center text-shadow-pixel-sm">Your Presents</h2>
            
            {Object.values(gameState).some(Boolean) ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {presents.map((present) => (
                  <CardPresent
                    key={present.id}
                    title={present.title}
                    isUnlocked={gameState[present.id]}
                    presentContent={present.content}
                    presentImageSrc={present.imageSrc}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <div className="mb-4 opacity-50">
                  <Image 
                    src="/presents/present-locked.png" 
                    alt="Locked Present"
                    width={80}
                    height={80}
                    className="mx-auto"
                  />
                </div>
                <p className="font-pixel text-secondary">Complete games to unlock special presents!</p>
              </div>
            )}
          </ContainerPixel>
        )}
        
        {/* Additional message */}
        <div className="mt-8 text-center">
          <p className="font-pixel text-sm text-primary text-shadow-pixel-sm">Each game unlocks a special present!</p>
        </div>

        {/* Floating decorations */}
        <div className="fixed bottom-0 left-0 w-16 h-16 opacity-70 pixel-animate">
          <Image 
            src="/images/pixel-flower.png" 
            alt="Decoration" 
            width={64} 
            height={64}
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
        <div className="fixed top-0 right-0 w-16 h-16 opacity-70 pixel-animate-delay">
          <Image 
            src="/images/pixel-heart.png" 
            alt="Decoration" 
            width={64} 
            height={64}
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
        <div className="fixed bottom-0 right-0 w-16 h-16 opacity-70 pixel-animate-slow">
          <Image 
            src="/images/pixel-star.png" 
            alt="Decoration" 
            width={64} 
            height={64}
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
      </div>
    </div>
  );
}