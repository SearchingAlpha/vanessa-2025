"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ButtonGame({ title, description, imageSrc, gameUrl, completed }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Link 
      href={gameUrl}
      className="block w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      <div className={`bg-gray-900/80 border border-pink-500/50 rounded-lg overflow-hidden h-full transition-all duration-300 ${
        isHovered ? 'transform -translate-y-2 shadow-[0_0_15px_rgba(219,39,119,0.4)]' : ''
      }`}>
        {/* Game title bar */}
        <div className="bg-gradient-to-r from-purple-800 to-pink-800 px-3 py-2 border-b border-pink-500/30 flex items-center justify-between">
          <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
          <h3 className="font-pixel text-sm text-pink-300">{title}</h3>
          <div className="w-2 h-2 rounded-full bg-pink-400"></div>
        </div>
        
        {/* Game image */}
        <div className="relative h-40 overflow-hidden bg-black/30 border-b border-pink-500/30">
          <Image 
            src={imageSrc} 
            alt={title}
            fill
            className={`object-contain p-4 transition-transform duration-300 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
            priority
            style={{ imageRendering: 'pixelated' }}
          />
          
          {/* Completion badge */}
          {completed && (
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
          
          {/* Hover effect overlay */}
          <div className={`absolute inset-0 bg-pink-500/10 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="bg-black/60 px-4 py-2 rounded font-pixel text-xs text-cyan-300 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              {completed ? 'Play Again' : 'Play Now'}
            </div>
          </div>
        </div>
        
        {/* Game info */}
        <div className="p-4 relative">
          {/* Subtle grid background */}
          <div className="absolute inset-0 pointer-events-none opacity-5" style={{
            backgroundImage: 'linear-gradient(to right, #ff80bf 1px, transparent 1px), linear-gradient(to bottom, #ff80bf 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}></div>
          
          <div className="relative">
            <p className="text-xs text-pink-200/80 mb-4 h-12 overflow-hidden">{description}</p>
            
            <div className="mt-2">
              <span className={`inline-block w-full py-2 px-3 font-pixel text-xs text-center text-white rounded ${
                completed 
                  ? 'bg-gradient-to-r from-green-600 to-teal-600 border border-green-500/50' 
                  : 'bg-gradient-to-r from-pink-600 to-purple-600 border border-pink-500/50'
              } hover:shadow-[0_0_10px_rgba(219,39,119,0.5)] transition-shadow`}>
                {completed ? 'Play Again' : 'Play Now'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}