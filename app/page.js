"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LandingPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const router = useRouter();

  // Create floating pixel decorations
  useEffect(() => {
    const interval = setInterval(() => {
      setSparklePos({
        x: Math.floor(Math.random() * 80) + 10, // 10-90% of viewport width
        y: Math.floor(Math.random() * 80) + 10, // 10-90% of viewport height
      });
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // If authentication successful, redirect to gaming hub
        router.push('/hub');
      } else {
        // If authentication failed, show error
        setError(data.message || 'Oops! Try again, sweetie!');
      }
    } catch (err) {
      setError('Something went wrong! Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-girly-gradient-animated flex flex-col items-center justify-center p-4 overflow-hidden relative">
      {/* SVG Filters */}
      <svg className="hidden">
        <filter id="pixelate-0">
          <feFlood x="4" y="4" height="2" width="2"/>
          <feComposite width="8" height="8"/>
          <feTile result="a"/>
          <feComposite in="SourceGraphic" in2="a" operator="in"/>
          <feMorphology operator="dilate" radius="1"/>
        </filter>
      </svg>

      {/* Background Pixel Art Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Fixed background decorations */}
        <div className="absolute top-1/4 left-1/4 pixel-animate-slow">
          <Image src="/images/pixel-heart.png" alt="Pixel heart" width={48} height={48} />
        </div>
        <div className="absolute bottom-1/4 right-1/4 pixel-animate">
          <Image src="/images/pixel-flower.png" alt="Pixel flower" width={64} height={64} />
        </div>
        <div className="absolute top-1/3 right-1/3 pixel-animate-delay">
          <Image src="/images/pixel-star.png" alt="Pixel star" width={40} height={40} />
        </div>
        <div className="absolute bottom-1/5 left-1/3 pixel-animate">
          <Image src="/images/pixel-heart.png" alt="Pixel heart" width={32} height={32} />
        </div>
        
        {/* Moving sparkle */}
        <div
          className="absolute pixel-sparkle"
          style={{ left: `${sparklePos.x}%`, top: `${sparklePos.y}%` }}
        >
          <Image src="/images/pixel-sparkle.png" alt="Sparkle" width={24} height={24} />
        </div>
      </div>

      {/* Cloud decorations */}
      <div className="absolute top-10 left-5 w-24 h-12 bg-white opacity-70 rounded-full"></div>
      <div className="absolute top-16 left-16 w-32 h-16 bg-white opacity-70 rounded-full"></div>
      <div className="absolute top-8 right-12 w-28 h-14 bg-white opacity-70 rounded-full"></div>

      {/* Title with pixel art styling */}
      <div className="mb-12 relative z-10">
        <h1 className="font-pixel text-4xl md:text-5xl text-center mb-2 text-primary text-shadow-pixel">
          Retro Gaming Hub
        </h1>
        
        {/* Pixel underline */}
        <div className="flex justify-center">
          <div className="h-1 w-64 bg-pink-400 mt-2"></div>
        </div>
        
        <p className="font-pixel text-secondary text-center mt-4 text-shadow-pixel-sm">A special place just for you!</p>
      </div>
      
      {/* Login box with pixel art styling */}
      <div className="pixel-box bg-white p-8 md:p-10 rounded-lg max-w-md w-full relative z-10">
        {/* Pixel corners */}
        <div className="pixel-corner pixel-corner-tl"></div>
        <div className="pixel-corner pixel-corner-tr"></div>
        <div className="pixel-corner pixel-corner-bl"></div>
        <div className="pixel-corner pixel-corner-br"></div>
        
        <h2 className="font-pixel text-xl text-center text-accent mb-8">
          Enter Your Credentials
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="font-pixel block text-sm text-primary mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="pixel-input w-full px-4 py-2 text-sm"
              placeholder="Enter your name"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="font-pixel block text-sm text-primary mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pixel-input w-full px-4 py-2 text-sm"
              placeholder="Enter our special date"
              required
            />
            <p className="font-pixel text-xs text-secondary mt-2">Hint: The day we met (DD/MM/YYYY)</p>
          </div>
          
          {error && (
            <div className="p-3 bg-pink-100 border-2 border-pink-400 rounded-md">
              <p className="font-pixel text-sm text-center text-accent">{error}</p>
            </div>
          )}
          
          <button
            type="submit"
            disabled={isLoading}
            className="pixel-button w-full py-3 px-4 rounded-md bg-gradient-to-r from-pink-300 to-purple-300 text-primary font-bold text-sm mt-4 hover:from-pink-400 hover:to-purple-400 transition-all"
          >
            {isLoading ? (
              <span className="animate-pulse">Loading...</span>
            ) : (
              <span>Enter the Gaming Hub</span>
            )}
          </button>
        </form>
      </div>
      
      {/* Heart animation at bottom */}
      <div className="mt-10 heart-pulse">
        <Image src="/images/pixel-heart.png" alt="Heart" width={32} height={32} />
      </div>
      
      <footer className="mt-4 text-center">
        <p className="font-pixel text-xs text-secondary text-shadow-pixel-sm">Made with ♥ for you</p>
      </footer>
    </main>
  );
}