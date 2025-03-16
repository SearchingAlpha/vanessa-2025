"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function CardPresent({ title, isUnlocked, presentContent, presentImageSrc }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [glowIntensity, setGlowIntensity] = useState(0);

  // Add pulsing glow effect for unlocked presents
  useEffect(() => {
    if (!isUnlocked || isOpen) return;
    
    const interval = setInterval(() => {
      setGlowIntensity(prev => {
        const newValue = prev + 0.05;
        return newValue > 1 ? 0 : newValue;
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, [isUnlocked, isOpen]);

  const toggleOpen = () => {
    if (isUnlocked && !isAnimating) {
      if (!isOpen) {
        setIsAnimating(true);
        setTimeout(() => {
          setIsOpen(true);
          setIsAnimating(false);
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
        className={`bg-gray-900/80 border ${
          isUnlocked ? 'border-pink-500/70' : 'border-gray-700/50'
        } rounded-lg p-5 flex flex-col items-center transition-all duration-300 ${
          isUnlocked ? (isOpen ? '' : 'hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(219,39,119,0.4)] cursor-pointer') : 'opacity-50 grayscale'
        } ${isAnimating ? 'animate-bounce' : ''}`}
        onClick={toggleOpen}
        style={{
          boxShadow: isUnlocked && !isOpen ? `0 0 ${10 + glowIntensity * 10}px rgba(219,39,119,${0.2 + glowIntensity * 0.3})` : ''
        }}
      >
        {/* Present content */}
        <div className="w-full flex flex-col items-center">
          {isOpen && isUnlocked ? (
            // Open present content with arcade styling
            <div className="w-full animate-fade-in flex flex-col items-center">
              <div className="relative w-24 h-24 mb-4">
                <Image
                  src={presentImageSrc}
                  alt="Present"
                  width={96}
                  height={96}
                  style={{ objectFit: 'contain', imageRendering: 'pixelated' }}
                />
                
                {/* Glow effect */}
                <div className="absolute inset-0 blur-md -z-10 opacity-50 bg-pink-500 rounded-full"></div>
              </div>
              
              <div className="bg-black/40 border border-pink-500/50 rounded-lg p-4 w-full relative overflow-hidden">
                {/* Scanlines */}
                <div className="absolute inset-0 pointer-events-none opacity-10" style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1) 1px, transparent 1px, transparent 2px)',
                  backgroundSize: '100% 2px',
                }}></div>
                
                <p className="text-center font-pixel text-xs text-pink-300">{presentContent}</p>
              </div>
              
              <button 
                className="mt-4 px-4 py-2 font-pixel text-xs text-white bg-gradient-to-r from-pink-600 to-purple-600 rounded border border-pink-500/50 hover:shadow-[0_0_10px_rgba(219,39,119,0.5)] transition-shadow"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
              >
                Close
              </button>
            </div>
          ) : (
            // Closed present with arcade styling
            <>
              <div className={`transition-transform duration-300 ${isAnimating ? 'scale-0' : 'scale-100'} flex flex-col items-center`}>
                <div className="relative w-24 h-24 mb-3">
                  <Image
                    src={isUnlocked ? "/presents/present.png" : "/presents/present-locked.png"}
                    alt="Present"
                    width={96}
                    height={96}
                    style={{ objectFit: 'contain', imageRendering: 'pixelated' }}
                  />
                  
                  {/* Glow effect for unlocked presents */}
                  {isUnlocked && (
                    <div className="absolute inset-0 blur-md -z-10 opacity-30 bg-pink-500 rounded-full"></div>
                  )}
                </div>
                
                <h3 className="font-pixel text-sm text-center text-pink-300 mb-2">{title}</h3>
                
                <div className={`mt-2 px-4 py-2 font-pixel text-xs rounded ${
                  isUnlocked 
                    ? "text-white bg-gradient-to-r from-pink-600 to-purple-600 border border-pink-500/50" 
                    : "text-gray-400 bg-gray-800 border border-gray-700"
                }`}>
                  {isUnlocked ? "Open Me!" : "Locked"}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Status indicator */}
      {isUnlocked && !isOpen && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-500 to-teal-500 rounded-full border border-green-400/50 flex items-center justify-center shadow-[0_0_8px_rgba(16,185,129,0.5)]">
          <span className="text-white text-xs">✓</span>
        </div>
      )}
    </div>
  );
}