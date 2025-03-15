"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ButtonGame({ title, description, imageSrc, gameUrl, completed }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Link 
      href={gameUrl}
      className={`block w-full transition-all duration-300 ${
        isHovered ? 'transform -translate-y-2 rotate-1' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="pixel-box bg-white overflow-hidden h-full relative">
        {/* Game image */}
        <div className="relative h-48 bg-pink-100 overflow-hidden">
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
            <div className="absolute inset-0 bg-green-500 bg-opacity-20 flex items-center justify-center">
              <div className="bg-green-500 text-white font-pixel px-3 py-1 rotate-12 text-sm">
                COMPLETED!
              </div>
            </div>
          )}
          
          {/* Hover effect overlay */}
          <div className={`absolute inset-0 bg-purple-500 bg-opacity-30 transition-opacity duration-300 flex items-center justify-center ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="bg-white bg-opacity-90 px-4 py-2 rounded-lg font-pixel text-purple-700 text-sm">
              Play Now
            </div>
          </div>
        </div>
        
        {/* Game info */}
        <div className="p-4">
          <h3 className="font-pixel text-lg text-purple-700 mb-2">{title}</h3>
          {description && (
            <p className="text-sm text-purple-600 mb-4 line-clamp-2">{description}</p>
          )}
          
          <div className="mt-2">
            <span className={`inline-block w-full px-4 py-2 font-pixel text-sm text-center rounded-md ${
              completed 
                ? 'bg-green-500 text-white' 
                : 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
            }`}>
              {completed ? 'Play Again' : 'Play Now'}
            </span>
          </div>
        </div>
        
        {/* Pixel corners */}
        <div className="absolute top-0 left-0 w-3 h-3 bg-black"></div>
        <div className="absolute top-0 right-0 w-3 h-3 bg-black"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 bg-black"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-black"></div>
        
        {/* Decorative pixel elements */}
        {isHovered && (
          <>
            <div className="absolute top-0 left-1/4 w-1 h-1 bg-pink-500"></div>
            <div className="absolute top-0 right-1/4 w-1 h-1 bg-purple-500"></div>
            <div className="absolute bottom-0 left-1/3 w-1 h-1 bg-pink-500"></div>
            <div className="absolute bottom-0 right-1/3 w-1 h-1 bg-purple-500"></div>
          </>
        )}
      </div>
    </Link>
  );
}