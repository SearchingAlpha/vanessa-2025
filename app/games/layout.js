import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function GamesLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-200 to-purple-300 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <Link href="/hub" className="font-pixel text-xl text-purple-800 hover:text-purple-600 flex items-center">
            <span className="mr-2">←</span> Back to Hub
          </Link>
        </header>
        
        <Suspense fallback={
          <div className="w-full h-64 flex items-center justify-center">
            <div className="animate-pulse font-pixel text-2xl text-purple-800">Loading...</div>
          </div>
        }>
          {children}
        </Suspense>
        
        {/* Pixel Art Decorations */}
        <div className="fixed bottom-0 left-0 w-16 h-16 opacity-70">
          <Image 
            src="/images/pixel-flower.png" 
            alt="Decoration" 
            width={64} 
            height={64}
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
        <div className="fixed top-0 right-0 w-16 h-16 opacity-70">
          <Image 
            src="/images/pixel-heart.png" 
            alt="Decoration" 
            width={64} 
            height={64}
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
      </div>
    </div>
  );
}