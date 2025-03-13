"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ButtonGame from '@/components/ButtonGame';
import CardPresent from '@/components/CardPresent';
import ContainerPixel from '@/components/ContainerPixel';

export default function GamingHub() {
  const [gameState, setGameState] = useState({
    flowerMatch: false,
    cupcakeCatch: false,
    heartJump: false
  });

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-200 to-purple-300 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="font-pixel text-4xl text-purple-800 mb-2">Retro Gaming Hub</h1>
          <p className="font-pixel text-xl text-purple-600">Play games and unlock presents!</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Games Section */}
          <ContainerPixel className="bg-purple-100 p-6">
            <h2 className="font-pixel text-2xl text-purple-800 mb-4">Games</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <ButtonGame 
                title="Flower Match" 
                gameUrl="/games/flower-match" 
                imageSrc="/images/game-flower.png"
                completed={gameState.flowerMatch}
              />
              
              <ButtonGame 
                title="Cupcake Catch" 
                gameUrl="/games/cupcake-catch" 
                imageSrc="/images/game-cupcake.png"
                completed={gameState.cupcakeCatch}
              />
              
              <ButtonGame 
                title="Heart Jump" 
                gameUrl="/games/heart-jump" 
                imageSrc="/images/game-heart.png"
                completed={gameState.heartJump}
              />
            </div>
          </ContainerPixel>

          {/* Presents Section */}
          <ContainerPixel className="bg-pink-100 p-6">
            <h2 className="font-pixel text-2xl text-purple-800 mb-4">Presents</h2>
            <div className="flex flex-wrap justify-center gap-4">
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
          </ContainerPixel>
        </div>

        {/* Pixel Art Decorations */}
        <div className="fixed bottom-0 left-0 w-16 h-16 opacity-70">
          <Image 
            src="/images/pixel-flower.png" 
            alt="Decoration" 
            width={64} 
            height={64}
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
        <div className="fixed top-0 right-0 w-16 h-16 opacity-70">
          <Image 
            src="/images/pixel-heart.png" 
            alt="Decoration" 
            width={64} 
            height={64}
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
        <div className="fixed bottom-0 right-0 w-16 h-16 opacity-70">
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