"use client";

import React from 'react';

export default function ContainerPixel({ children, className = "" }) {
  return (
    <div className={`p-4 border-4 border-black bg-white relative ${className}`} 
         style={{ 
           boxShadow: '4px 4px 0px rgba(0, 0, 0, 0.5)',
           imageRendering: 'pixelated'
         }}>
      {/* Pixel corners */}
      <div className="absolute w-2 h-2 bg-black top-0 left-0"></div>
      <div className="absolute w-2 h-2 bg-black top-0 right-0"></div>
      <div className="absolute w-2 h-2 bg-black bottom-0 left-0"></div>
      <div className="absolute w-2 h-2 bg-black bottom-0 right-0"></div>
      {children}
    </div>
  );
}