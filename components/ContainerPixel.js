"use client";

import React from 'react';

export default function ContainerPixel({ children, className = "", onClick = null }) {
  return (
    <div 
      className={`relative p-6 border-4 border-black bg-white ${className}`} 
      style={{ 
        boxShadow: '6px 6px 0px rgba(0, 0, 0, 0.5)',
        imageRendering: 'pixelated'
      }}
      onClick={onClick}
    >
      {/* Pixel corners - outer */}
      <div className="absolute w-4 h-4 bg-black -top-4 -left-4"></div>
      <div className="absolute w-4 h-4 bg-black -top-4 -right-4"></div>
      <div className="absolute w-4 h-4 bg-black -bottom-4 -left-4"></div>
      <div className="absolute w-4 h-4 bg-black -bottom-4 -right-4"></div>
      
      {/* Pixel corners - inner */}
      <div className="absolute w-2 h-2 bg-black top-0 left-0"></div>
      <div className="absolute w-2 h-2 bg-black top-0 right-0"></div>
      <div className="absolute w-2 h-2 bg-black bottom-0 left-0"></div>
      <div className="absolute w-2 h-2 bg-black bottom-0 right-0"></div>
      
      {/* Decorative dots */}
      <div className="absolute w-1 h-1 bg-black top-[8px] left-[8px]"></div>
      <div className="absolute w-1 h-1 bg-black top-[8px] right-[8px]"></div>
      <div className="absolute w-1 h-1 bg-black bottom-[8px] left-[8px]"></div>
      <div className="absolute w-1 h-1 bg-black bottom-[8px] right-[8px]"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}