"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import ContainerPixel from '@/components/ContainerPixel';
import { useRouter } from 'next/navigation';

export default function CupcakeCatch() {
  const router = useRouter();
  const gameRef = useRef(null);
  const requestRef = useRef(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [basketPosition, setBasketPosition] = useState(50);
  const [fallingItems, setFallingItems] = useState([]);

  const WINNING_SCORE = 20;
  
  // Game state and animation frame
  useEffect(() => {
    if (gameStarted && !gameOver) {
      const gameLoop = () => {
        updateGameState();
        requestRef.current = requestAnimationFrame(gameLoop);
      };
      
      requestRef.current = requestAnimationFrame(gameLoop);
      
      return () => {
        cancelAnimationFrame(requestRef.current);
      };
    }
  }, [gameStarted, gameOver]);
  
  // Timer effect
  useEffect(() => {
    let timer;
    if (gameStarted && !gameOver && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !gameOver) {
      handleGameOver();
    }
    
    return () => {
      clearInterval(timer);
    };
  }, [gameStarted, gameOver, timeLeft]);

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameStarted || gameOver) return;
      
      if (e.key === 'ArrowLeft') {
        setBasketPosition(prev => Math.max(5, prev - 5));
      } else if (e.key === 'ArrowRight') {
        setBasketPosition(prev => Math.min(95, prev + 5));
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameStarted, gameOver]);
  
  // Handle touch/mouse controls
  const handlePointerMove = (e) => {
    if (!gameStarted || gameOver || !gameRef.current) return;
    
    const gameWidth = gameRef.current.offsetWidth;
    const gameRect = gameRef.current.getBoundingClientRect();
    const pointerX = e.clientX - gameRect.left;
    
    // Convert pointer position to percentage
    const newPosition = (pointerX / gameWidth) * 100;
    setBasketPosition(Math.max(5, Math.min(95, newPosition)));
  };
  
  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setTimeLeft(30);
    setFallingItems([]);
  };
  
  const updateGameState = () => {
    // Create new falling items
    if (Math.random() < 0.03) {
      const isCupcake = Math.random() < 0.8; // 80% chance for cupcake, 20% for bomb
      
      setFallingItems(prev => [...prev, {
        id: Date.now(),
        type: isCupcake ? 'cupcake' : 'bomb',
        x: Math.random() * 90 + 5, // Random position from 5% to 95%
        y: 0,
        speed: (Math.random() * 1) + 1 // Random speed
      }]);
    }
    
    // Update positions of falling items and check for collisions
    setFallingItems(prev => {
      const updatedItems = prev.map(item => {
        // Update position
        const updatedItem = { 
          ...item, 
          y: item.y + item.speed 
        };
        
        // Check for basket collision (if item is near the bottom and x positions overlap)
        if (updatedItem.y > 85 && updatedItem.y < 95) {
          const basketLeft = basketPosition - 5;
          const basketRight = basketPosition + 5;
          const itemX = updatedItem.x;
          
          if (itemX >= basketLeft && itemX <= basketRight) {
            // Collision detected!
            if (updatedItem.type === 'cupcake') {
              setScore(prev => prev + 1);
              
              // Check win condition
              if (score + 1 >= WINNING_SCORE) {
                handleWin();
              }
            } else {
              // Hit a bomb
              handleGameOver();
            }
            
            // Remove this item
            return null;
          }
        }
        
        // Remove items that have fallen off the screen
        if (updatedItem.y > 100) {
          return null;
        }
        
        return updatedItem;
      });
      
      // Filter out null items (removed due to collision or falling off screen)
      return updatedItems.filter(Boolean);
    });
  };
  
  const handleGameOver = () => {
    setGameOver(true);
    cancelAnimationFrame(requestRef.current);
  };
  
  const handleWin = () => {
    setGameOver(true);
    
    // Save game completion to localStorage
    const gameState = JSON.parse(localStorage.getItem('gameState') || '{}');
    localStorage.setItem('gameState', JSON.stringify({
      ...gameState,
      cupcakeCatch: true
    }));
    
    // Redirect after short delay
    setTimeout(() => {
      router.push('/hub');
    }, 3000);
  };
  
  return (
    <ContainerPixel className="bg-purple-100 p-6 mx-auto max-w-2xl">
      <h1 className="font-pixel text-2xl text-purple-800 text-center mb-4">Cupcake Catch</h1>
      
      {!gameStarted ? (
        <div className="text-center py-8">
          <p className="font-pixel text-lg text-purple-700 mb-6">
            Catch cupcakes in your basket, but avoid the bombs!
          </p>
          <p className="font-pixel text-md text-purple-700 mb-6">
            Use left/right arrow keys or touch/mouse to move.
          </p>
          <button 
            onClick={startGame}
            className="px-6 py-2 bg-purple-500 text-white rounded-md font-pixel text-lg"
          >
            Start Game
          </button>
        </div>
      ) : (
        <>
          <div className="mb-4 flex justify-between items-center">
            <div className="font-pixel text-purple-800">Score: {score}/{WINNING_SCORE}</div>
            <div className="font-pixel text-purple-800">Time: {timeLeft}s</div>
          </div>
          
          <div 
            ref={gameRef}
            className="relative bg-pink-100 border-4 border-purple-400 h-96 overflow-hidden touch-none"
            onMouseMove={handlePointerMove}
            onTouchMove={(e) => handlePointerMove(e.touches[0])}
          >
            {/* Basket */}
            <div 
              className="absolute bottom-0 w-10 h-10"
              style={{ left: `calc(${basketPosition}% - 20px)` }}
            >
              <Image
                src="/images/basket.png"
                alt="Basket"
                width={40}
                height={40}
                style={{ imageRendering: 'pixelated' }}
              />
            </div>
            
            {/* Falling Items */}
            {fallingItems.map(item => (
              <div 
                key={item.id}
                className="absolute w-8 h-8"
                style={{ 
                  left: `calc(${item.x}% - 16px)`,
                  top: `calc(${item.y}% - 16px)`
                }}
              >
                <Image
                  src={item.type === 'cupcake' ? '/images/cupcake.png' : '/images/bomb.png'}
                  alt={item.type}
                  width={32}
                  height={32}
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>
            ))}
          </div>
        </>
      )}
      
      {gameOver && score >= WINNING_SCORE && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <ContainerPixel className="bg-pink-100 p-8 max-w-md text-center">
            <h2 className="font-pixel text-3xl text-purple-800 mb-4">You Win!</h2>
            <p className="font-pixel text-xl text-purple-700 mb-6">
              You caught {score} cupcakes!
            </p>
            <p className="font-pixel text-lg text-pink-700 mb-6">
              A special present has been unlocked!
            </p>
            <div className="animate-bounce">
              <Image 
                src="/presents/present2.png" 
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
      
      {gameOver && score < WINNING_SCORE && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <ContainerPixel className="bg-pink-100 p-8 max-w-md text-center">
            <h2 className="font-pixel text-3xl text-purple-800 mb-4">Game Over</h2>
            <p className="font-pixel text-xl text-purple-700 mb-6">
              You caught {score} cupcakes!
            </p>
            <p className="font-pixel text-lg text-pink-700 mb-6">
              Try again to catch {WINNING_SCORE} cupcakes!
            </p>
            <button 
              onClick={startGame}
              className="px-6 py-2 bg-purple-500 text-white rounded-md font-pixel text-lg"
            >
              Play Again
            </button>
          </ContainerPixel>
        </div>
      )}
    </ContainerPixel>
  );
}