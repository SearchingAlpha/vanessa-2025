"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LandingPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Grid line animation effect
  const [showGrid, setShowGrid] = useState(false);
  
  useEffect(() => {
    // Add grid effect with slight delay for a cool entrance
    const timer = setTimeout(() => setShowGrid(true), 300);
    return () => clearTimeout(timer);
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
        router.push('/hub');
      } else {
        setError(data.message || 'Oops! Try again, sweetie!');
      }
    } catch (err) {
      setError('Something went wrong! Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Modern arcade grid background effect */}
      <div className={`absolute inset-0 ${showGrid ? 'opacity-20' : 'opacity-0'} transition-opacity duration-2000`}>
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(to right, rgba(255,120,240,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,120,240,0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          transform: 'perspective(500px) rotateX(60deg)',
          transformOrigin: 'center top',
          height: '200%',
          top: '-50%'
        }}></div>
      </div>
      
      {/* Neon light glow effect */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-pink-500/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-purple-500/20 to-transparent"></div>

      {/* Title with modern neon effect */}
      <div className="mb-10 text-center z-10">
        <h1 className="font-pixel text-4xl md:text-5xl mb-3 text-white drop-shadow-[0_0_10px_rgba(255,0,240,0.7)] relative">
          <span className="relative inline-block">
            RETRO ARCADE
            <span className="absolute inset-0 blur-sm text-pink-400 animate-pulse" style={{ animationDuration: '3s' }}>RETRO ARCADE</span>
          </span>
        </h1>
        <div className="h-1 w-40 bg-gradient-to-r from-cyan-400 via-pink-500 to-cyan-400 mx-auto my-4 rounded-full animate-pulse" style={{ animationDuration: '4s' }}></div>
        <p className="font-pixel text-sm text-pink-300 mt-2">A special place just for you</p>
      </div>
      
      {/* Login terminal with modern arcade styling */}
      <div className="w-full max-w-md backdrop-blur-sm bg-black/50 border-2 border-pink-500/70 rounded-lg p-6 md:p-8 shadow-[0_0_20px_rgba(219,39,119,0.3)]">
        <div className="mb-4 border-b-2 border-pink-500/30 pb-3">
          <div className="flex items-center justify-between">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
            <h2 className="font-pixel text-base text-center text-pink-400">
              Access Terminal
            </h2>
            <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="font-pixel block text-xs text-cyan-300 mb-2 uppercase tracking-wider">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900/80 border-2 border-pink-500/50 rounded font-pixel text-sm text-white caret-pink-500 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400/50"
              placeholder="Enter your name"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="font-pixel block text-xs text-cyan-300 mb-2 uppercase tracking-wider">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900/80 border-2 border-pink-500/50 rounded font-pixel text-sm text-white caret-pink-500 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400/50"
              placeholder="Enter our special date"
              required
            />
            <p className="font-pixel text-xs text-pink-400/80 mt-2">Hint: The day we met (MM/DD/YYYY)</p>
          </div>
          
          {error && (
            <div className="p-3 bg-pink-900/50 border-l-4 border-pink-500 rounded-md">
              <p className="font-pixel text-xs text-center text-pink-300">{error}</p>
            </div>
          )}
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-pixel text-sm rounded border border-pink-400/50 transition-all transform hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(219,39,119,0.5)] focus:outline-none focus:ring-2 focus:ring-pink-400/50 disabled:opacity-70"
          >
            {isLoading ? (
              <span className="inline-flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing
              </span>
            ) : (
              <span className="inline-flex items-center justify-center">
                <span className="mr-2">Enter Arcade</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            )}
          </button>
        </form>
      </div>
      
      {/* Modern arcade footer */}
      <footer className="mt-12 text-center z-10">
        <div className="inline-flex items-center space-x-2 px-4 py-1 rounded-full bg-black/30 border border-pink-500/30">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
          <p className="font-pixel text-xs text-pink-300">Made with ♥ for you</p>
          <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse"></div>
        </div>
      </footer>
    </main>
  );
}