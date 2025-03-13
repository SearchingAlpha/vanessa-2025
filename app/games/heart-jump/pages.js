"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import ContainerPixel from '@/components/ContainerPixel';
import { useRouter } from 'next/navigation';

export default function HeartJump() {
  const router = useRouter();
  const gameRef = useRef(null);
  const requestRef = useRef(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [player, setPlayer] = useState({
    x: 20,
    y: 80,
    velocityY: 0,
    isJumping: false
  });
  const [platforms, setPlatforms] = useState([]);
  const [hearts, setHearts] = useState([]);

  const WINNING_SCORE = 15;
  const GRAVITY = 0.25;
  const JUMP_STRENGTH = -7;
  
  // Initialize game on start
  useEffect(() => {
    if (gameStarted && !gameOver) {
      // Initialize platforms
      const initialPlatforms = [
        { id: 1, x: 10, y: 90, width: 30 },
        { id: 2, x: 50, y: 75, width: 25 },
        { id: 3, x: 20, y: 60, width: 20 },
        { id: 4, x: 60, y: 45, width: 25 },
        { id: 5, x: 30, y: 30, width: 20 }
      ];
      setPlatforms(initialPlatforms);
      
      // Initialize hearts
      const initialHearts = [
        { id: 1, x: 15, y: 82, collected: false },
        { id: 2, x: 60, y: 67, collected: false },
        { id: 3, x: 25, y: 52, collected: false },
        { id: 4, x: 65, y: 37, collected: false },
        { id: 5, x: 35, y: 22, collected: false }
      ];
      setHearts(initialHearts);
      
      // Reset player
      setPlayer({
        x: 20,
        y: 80,
        velocityY: 0,
        isJumping: false
      });
      
      // Reset score
      setScore(0);
    }
  }, [gameStarted, gameOver]);
  
  // Game loop
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
  }, [gameStarted, gameOver, player, platforms, hearts]);
  
  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameStarted || gameOver) return;
      
      if (e.key === 'ArrowLeft') {
        setPlayer(prev => ({
          ...prev,
          x: Math.max(0, prev.x - 2)
        }));
      } else if (e.key === 'ArrowRight') {
        setPlayer(prev => ({
          ...prev,
          x: Math.min(95, prev.x + 2)
        }));
      } else if (e.key === 'ArrowUp' || e.key === ' ') {
        handleJump();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameStarted, gameOver, player]);
  
  // Touch controls
  const handleTouchStart = () => {
    if (!gameStarted || gameOver) return;
    handleJump();
  };
  
  const handlePointerMove = (e) => {
    if (!gameStarted || gameOver || !gameRef.current) return;
    
    const gameWidth = gameRef.current.offsetWidth;
    const gameRect = gameRef.current.getBoundingClientRect();
    const pointerX = e.clientX - gameRect.left;
    
    // Convert pointer position to percentage
    const newPosition = (pointerX / gameWidth) * 100;
    
    setPlayer(prev => ({
      ...prev,
      x: Math.max(0, Math.min(95, newPosition))
    }));
  };
  
  const handleJump = () => {
    if (!player.isJumping) {
      setPlayer(prev => ({
        ...prev,
        velocityY: JUMP_STRENGTH,
        isJumping: true
      }));
    }
  };
  
  const updateGameState = () => {
    // Update player position and apply gravity
    setPlayer(prev => {
      let updatedPlayer = {
        ...prev,
        velocityY: prev.velocityY + GRAVITY,
        y: prev.y + prev.velocityY,
        isJumping: true
      };
      
      // Check if player is on a platform
      let onPlatform = false;
      platforms.forEach(platform => {
        if (
          updatedPlayer.y >= platform.y - 2 && 
          updatedPlayer.y <= platform.y + 2 &&
          updatedPlayer.x >= platform.x - 5 &&
          updatedPlayer.x <= platform.x + platform.width + 5 &&
          updatedPlayer.velocityY >= 0
        ) {
          updatedPlayer = {
            ...updatedPlayer,
            y: platform.y,
            velocityY: 0,
            isJumping: false
          };
          onPlatform = true;
        }
      });
      
      // Check if player fell off the bottom
      if (updatedPlayer.y > 100) {
        handleGameOver();
      }
      
      return updatedPlayer;
    });
    
    // Check for heart collection
    setHearts(prev => {
      let updatedHearts = prev.map(heart => {
        if (
          !heart.collected &&
          Math.abs(player.x - heart.x) < 5 &&
          Math.abs(player.y - heart.y) < 5
        ) {
          // Collect heart
          setScore(prevScore => {
            // Check win condition
            if (prevScore + 1 >= WINNING_SCORE) {
              handleWin();
            }
            return prevScore + 1;
          });
          
          return { ...heart, collected: true };
        }
        return heart;
      });
      
      return updatedHearts;
    });
  };
  
  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
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
      heartJump: true
    }));
    
    // Redirect after short delay
    setTimeout(() => {
      router.push('/hub');
    }, 3000);
  };
  
  return (
    <ContainerPixel className="bg-purple-100 p-6 mx-auto max-w-2xl">
      <h1 className="font-pixel text-2xl text-purple-800 text-center mb-4">Heart Jump</h1>
      
      {!gameStarted ? (
        <div className="text-center py-8">
          <p className="font-pixel text-lg text-purple-700 mb-6">
            Jump from platform to platform to collect hearts!
          </p>
          <p className="font-pixel text-md text-purple-700 mb-6">
            Use arrow keys to move and jump, or touch for mobile.
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
            <div className="font-pixel text-purple-800">Hearts: {score}/{WINNING_SCORE}</div>
            <div className="font-pixel text-purple-800">Don't fall off!</div>
          </div>
          
          <div 
            ref={gameRef}
            className="relative bg-pink-100 border-4 border-purple-400 h-96 overflow-hidden"
            onMouseMove={handlePointerMove}
            onTouchMove={(e) => handlePointerMove(e.touches[0])}
            onTouchStart={handleTouchStart}
          >
            {/* Player */}
            <div 
              className="absolute w-8 h-8"
              style={{ 
                left: `calc(${player.x}% - 16px)`,
                top: `calc(${player.y}% - 16px)`
              }}
            >
              <Image
                src="/images/character.png"
                alt="Character"
                width={32}
                height={32}
                style={{ imageRendering: 'pixelated' }}
              />
            </div>
            
            {/* Platforms */}
            {platforms.map(platform => (
              <div 
                key={platform.id}
                className="absolute h-2 bg-purple-600"
                style={{ 
                  left: `${platform.x}%`,
                  top: `${platform.y}%`,
                  width: `${platform.width}%`
                }}
              ></div>
            ))}
            
            {/* Hearts */}
            {hearts.map(heart => (
              !heart.collected && (
                <div 
                  key={heart.id}
                  className="absolute w-6 h-6"
                  style={{ 
                    left: `calc(${heart.x}% - 12px)`,
                    top: `calc(${heart.y}% - 12px)`
                  }}
                >
                  <Image
                    src="/images/pixel-heart.png"
                    alt="Heart"
                    width={24}
                    height={24}
                    style={{ imageRendering: 'pixelated' }}
                  />
                </div>
              )
            ))}
          </div>
          
          {/* Mobile controls */}
          <div className="md:hidden mt-4 flex justify-center">
            <button 
              className="px-8 py-4 bg-purple-500 text-white rounded-full font-pixel"
              onTouchStart={handleTouchStart}
            >
              JUMP
            </button>
          </div>
        </>
      )}
      
      {gameOver && score >= WINNING_SCORE && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <ContainerPixel className="bg-pink-100 p-8 max-w-md text-center">
            <h2 className="font-pixel text-3xl text-purple-800 mb-4">You Win!</h2>
            <p className="font-pixel text-xl text-purple-700 mb-6">
              You collected all {score} hearts!
            </p>
            <p className="font-pixel text-lg text-pink-700 mb-6">
              A special present has been unlocked!
            </p>
            <div className="animate-bounce">
              <Image 
                src="/presents/present3.png" 
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
              You collected {score} hearts!
            </p>
            <p className="font-pixel text-lg text-pink-700 mb-6">
              Try again to collect all {WINNING_SCORE} hearts!
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