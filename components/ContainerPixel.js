"use client";

import React from 'react';

export default function ContainerPixel({ children, className = "", onClick = null }) {
  return (
    <div 
      className={`relative backdrop-blur-sm bg-black/50 border border-pink-500/50 rounded-lg overflow-hidden shadow-[0_0_20px_rgba(219,39,119,0.3)] ${className}`} 
      onClick={onClick}
    >
      {/* Header panel with scanlines */}
      <div className="bg-gradient-to-r from-purple-900/80 to-pink-900/80 p-4 border-b border-pink-500/30 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05) 1px, transparent 1px, transparent 2px)',
          backgroundSize: '100% 2px',
        }}></div>
        
        <div className="flex items-center justify-between">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 relative">
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-5" style={{
          backgroundImage: 'linear-gradient(to right, #ff80bf 1px, transparent 1px), linear-gradient(to bottom, #ff80bf 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}></div>
        
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}