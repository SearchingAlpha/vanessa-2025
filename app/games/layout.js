import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function GamesLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 py-8 px-4 relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(to right, rgba(255,120,240,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,120,240,0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          transform: 'perspective(500px) rotateX(60deg)',
          transformOrigin: 'center top',
          height: '200%',
          top: '-50%'
        }}></div>
      </div>
      
      {/* Neon light effect borders */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-pink-500/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-purple-500/20 to-transparent"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <header className="flex justify-between items-center mb-8">
          <Link 
            href="/hub" 
            className="font-pixel text-sm text-pink-300 hover:text-white flex items-center transition-colors py-2 px-6 bg-black/40 backdrop-blur-sm rounded-full border border-pink-500/30 shadow-[0_0_10px_rgba(219,39,119,0.2)] hover:shadow-[0_0_15px_rgba(219,39,119,0.4)]"
          >
            <span className="mr-2 text-cyan-400">←</span> Back to Hub
          </Link>
        </header>
        
        <Suspense fallback={
          <div className="w-full h-64 flex flex-col items-center justify-center">
            <div className="w-16 h-16 mb-4 relative">
              <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-pink-500 animate-spin"></div>
              <div className="absolute inset-2 rounded-full border-2 border-t-transparent border-cyan-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
            </div>
            <div className="font-pixel text-lg text-pink-400">Loading...</div>
          </div>
        }>
          {children}
        </Suspense>
        
        {/* Minimal arcade decorations */}
        <div className="fixed bottom-6 left-6 opacity-60">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
        </div>
        <div className="fixed bottom-6 left-12 opacity-60">
          <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>
        <div className="fixed bottom-6 left-18 opacity-60">
          <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>
    </div>
  );
}