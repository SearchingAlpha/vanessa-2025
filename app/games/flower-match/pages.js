"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ContainerPixel from '@/components/ContainerPixel';
import { useRouter } from 'next/navigation';

// Flower types for matching
const flowerTypes = [
  '/images/flowers/flower1.png',
  '/images/flowers/flower2.png',
  '/images/flowers/flower3.png',
  '/images/flowers/flower4.png',
  '/images/flowers/flower5.png',
  '/images/flowers/flower6.png',
  '/images/flowers/flower7.png',
  '/images/flowers/flower8.png',
];

export default function FlowerMatch() {
  const router = useRouter();
  const [cards, setCards] = useState([]);
  const [flippedIndexes, setFlippedIndexes] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [moves, setMoves] = useState(0);
  const [isWinAnimating, setIsWinAnimating] = useState(false);
  
  // Initialize the game
  useEffect(() => {
    initializeGame();
  }, []);
  
  // Check for win condition
  useEffect(() => {
    if (matchedPairs === 8 && !gameCompleted) {
      handleGameWin();
    }
  }, [matchedPairs, gameCompleted]);
  
  // Handle flipped cards logic
  useEffect(() => {
    if (flippedIndexes.length === 2) {
      const firstIndex = flippedIndexes[0];
      const secondIndex = flippedIndexes[1];
      
      if (cards[firstIndex].type === cards[secondIndex].type) {
        // Match found!
        setMatchedPairs(prev => prev + 1);
        
        // Reset flipped indexes after a short delay
        setTimeout(() => {
          setFlippedIndexes([]);
        }, 500);
      } else {
        // No match, flip back after delay
        setTimeout(() => {
          setFlippedIndexes([]);
        }, 1000);
      }
      
      setMoves(prev => prev + 1);
    }
  }, [flippedIndexes, cards]);
  
  const initializeGame = () => {
    // Create pairs of flower cards
    const gameCards = [];
    
    // Create two of each flower type
    flowerTypes.forEach((type) => {
      for (let i = 0; i < 2; i++) {
        gameCards.push({
          type: type,
          flipped: false,
          matched: false
        });
      }
    });
    
    // Shuffle cards
    for (let i = gameCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [gameCards[i], gameCards[j]] = [gameCards[j], gameCards[i]];
    }
    
    setCards(gameCards);
    setFlippedIndexes([]);
    setMatchedPairs(0);
    setMoves(0);
    setGameCompleted(false);
    setIsWinAnimating(false);
  };
  
  const handleCardClick = (index) => {
    // Prevent clicking during win animation
    if (isWinAnimating) return;
    
    // Don't allow flipping more than 2 cards at once
    if (flippedIndexes.length >= 2) return;
    
    // Don't allow flipping already flipped or matched cards
    if (flippedIndexes.includes(index) || cards[index].matched) return;
    
    // Add this card to flipped indexes
    setFlippedIndexes(prev => [...prev, index]);
  };
  
  const handleGameWin = () => {
    setGameCompleted(true);
    setIsWinAnimating(true);
    
    // Save game completion to localStorage
    const gameState = JSON.parse(localStorage.getItem('gameState') || '{}');
    localStorage.setItem('gameState', JSON.stringify({
      ...gameState,
      flowerMatch: true
    }));
    
    // Show win animation for a while then redirect
    setTimeout(() => {
      router.push('/hub');
    }, 3000);
  };
  
  const isCardFlipped = (index) => {
    return flippedIndexes.includes(index) || cards[index]?.matched;
  };
  
  return (
    <ContainerPixel className="bg-purple-100 p-6 mx-auto max-w-2xl">
      <h1 className="font-pixel text-2xl text-purple-800 text-center mb-4">Flower Match</h1>
      
      <div className="mb-4 flex justify-between items-center">
        <div className="font-pixel text-purple-800">Moves: {moves}</div>
        <div className="font-pixel text-purple-800">Pairs: {matchedPairs}/8</div>
        <button 
          onClick={initializeGame}
          className="px-3 py-1 bg-purple-500 text-white rounded-md font-pixel"
        >
          Restart
        </button>
      </div>
      
      <div className="grid grid-cols-4 gap-2 md:gap-4">
        {cards.map((card, index) => (
          <div 
            key={index}
            className={`aspect-square cursor-pointer transition-all duration-300 transform ${
              isCardFlipped(index) ? 'rotate-y-180' : ''
            } ${isWinAnimating ? 'animate-bounce' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            <div className="relative w-full h-full">
              {isCardFlipped(index) ? (
                // Front of card (flower)
                <div className="absolute inset-0 bg-pink-200 rounded-md border-2 border-purple-400 flex items-center justify-center">
                  <div className="relative w-3/4 h-3/4">
                    <Image
                      src={card.type}
                      alt="Flower"
                      fill
                      style={{ objectFit: 'contain', imageRendering: 'pixelated' }}
                    />
                  </div>
                </div>
              ) : (
                // Back of card
                <div className="absolute inset-0 bg-purple-400 rounded-md border-2 border-purple-600 flex items-center justify-center">
                  <div className="text-2xl font-bold text-white">?</div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {gameCompleted && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <ContainerPixel className="bg-pink-100 p-8 max-w-md text-center">
            <h2 className="font-pixel text-3xl text-purple-800 mb-4">You Win!</h2>
            <p className="font-pixel text-xl text-purple-700 mb-6">
              You matched all the flowers in {moves} moves!
            </p>
            <p className="font-pixel text-lg text-pink-700 mb-6">
              A special present has been unlocked!
            </p>
            <div className="animate-bounce">
              <Image 
                src="/presents/present1.png" 
                alt="Present" 
                width={100} 
                height={100} 
                className="mx-auto"
                style={{ imageRendering: 'pixelated' }}
              />
            </div>
            <p className="mt-4 font-pixel text-purple-800">
              Returning to hub...
            </p>
          </ContainerPixel>
        </div>
      )}
    </ContainerPixel>
  );
}