"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function CardPresent({ title, isUnlocked, presentContent, presentImageSrc }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (isAnimating) {
      // Create particles for opening animation
      const newParticles = [];
      for (let i = 0; i < 20; i++) {
        newParticles.push({
          id: i,
          x: 50 + (Math.random() * 60 - 30), // Center ± 30%
          y: 50 + (Math.random() * 60 - 30),
          size: Math.random() * 8 + 4,
          speedX: (Math.random() - 0.5) * 10,
          speedY: (Math.random() - 0.5) * 10,
          color: ['#ff89b6', '#b69aff', '#ffcc99', '#99ccff'][Math.floor(Math.random() * 4)]
        });
      }
      setParticles(newParticles);
      setShowParticles(true);
      
      // Hide particles after animation
      setTimeout(() => {
        setShowParticles(false);
      }, 1500);
      
      // End animation state
      setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
    }
  }, [isAnimating]);

  const toggleOpen = () => {
    if (isUnlocked && !isAnimating) {
      if (!isOpen) {
        setIsAnimating(true);
        setTimeout(() => {
          setIsOpen(true);
        }, 500);
      } else {
        setIsOpen(false);
      }
    }
  };

  return (
    <div className="relative">
      {/* Present container */}
      <div 
        className={`w-full aspect-square pixel-box bg-white transition-all duration-300 ${
          isUnlocked ? 'cursor-pointer hover:shadow-lg hover:-translate-y-1' 
                     : 'opacity-70 grayscale'
        } ${isAnimating ? 'animate-wiggle' : ''}`}
        onClick={toggleOpen}
      >
        {/* Particle effects when opening */}
        {showParticles && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map(particle => (
              <div
                key={particle.id}
                className="absolute rounded-full animate-float-away"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  backgroundColor: particle.color,
                  transform: `translate(${particle.speedX}px, ${particle.speedY}px)`,
                  opacity: 0
                }}
              />
            ))}
          </div>
        )}

        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 transition-opacity duration-500">
          {/* When present is open */}
          {isOpen && isUnlocked ? (
            <div className="flex flex-col items-center animate-fade-in">
              {presentImageSrc && (
                <div className="relative w-24 h-24 mb-4">
                  <Image
                    src={presentImageSrc}
                    alt="Present"
                    fill
                    style={{ objectFit: 'contain', imageRendering: 'pixelated' }}
                  />
                </div>
              )}
              <div className="px-4 py-2 bg-pink-100 border-2 border-pink-400 rounded-lg">
                <p className="text-center font-pixel text-sm text-primary">{presentContent}</p>
              </div>
              <button 
                className="mt-4 px-3 py-1 font-pixel text-xs text-white bg-pink-500 rounded-md hover:bg-pink-600"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
              >
                Close
              </button>
            </div>
          ) : (
            <>
              {/* When present is closed */}
              <div className={`transition-transform duration-500 ${isAnimating ? 'scale-0' : 'scale-100'}`}>
                <div className="relative w-32 h-32 mb-3">
                  <Image
                    src={isUnlocked ? "/presents/present.png" : "/presents/present-locked.png"}
                    alt="Present"
                    fill
                    priority
                    style={{ objectFit: 'contain', imageRendering: 'pixelated' }}
                  />
                </div>
                <h3 className="font-pixel text-sm text-center text-primary mb-2">{title}</h3>
                <div className={`mt-2 px-3 py-1 font-pixel text-xs text-center rounded-md ${
                  isUnlocked 
                    ? "bg-pink-500 text-white" 
                    : "bg-gray-400 text-white"
                }`}>
                  {isUnlocked ? "Open Me!" : "Locked"}
                </div>
              </div>
            </>
          )}
        </div>
        
        {/* Pixel corners */}
        <div className="absolute top-0 left-0 w-3 h-3 bg-purple-500"></div>
        <div className="absolute top-0 right-0 w-3 h-3 bg-purple-500"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 bg-purple-500"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-purple-500"></div>
      </div>
      
      {/* Status indicator */}
      {isUnlocked && !isOpen && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
          <span className="text-white text-xs">✓</span>
        </div>
      )}
    </div>
  );
}