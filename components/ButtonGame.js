// components/ButtonGame.jsx
"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { isGameCompleted } from '@/lib/gameUtils';

export default function ButtonGame({ gameId, title, description, imageSrc, path }) {
  const [isHovered, setIsHovered] = useState(false);
  const completed = isGameCompleted(gameId);
  
  // Provide a fallback path if none is provided
  const gamePath = path || `/games/${gameId}`;
  
  return (
    <Link 
      href={gamePath}
      className={`block w-full transition-transform duration-200 ${isHovered ? 'transform translate-y-[-4px]' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="pixel-box bg-white rounded-lg overflow-hidden border-4 border-pink-400 h-full">
        <div className="relative h-40 overflow-hidden">
          <Image 
            src={imageSrc} 
            alt={title}
            fill
            className="object-cover transform hover:scale-110 transition-transform duration-300"
            priority
          />
          {completed && (
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/70 to-green-300/70 flex items-center justify-center">
              <span className="pixel-text text-white text-lg font-bold rotate-[-5deg]">COMPLETED!</span>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="pixel-text text-xl text-purple-600 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
          
          <div className="mt-4">
            <span className={`inline-block px-4 py-2 pixel-button rounded-full text-white text-center w-full ${
              completed ? 'bg-gradient-to-r from-green-500 to-green-400' : 'bg-gradient-to-r from-pink-500 to-purple-500'
            }`}>
              {completed ? 'Play Again' : 'Play Now'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}