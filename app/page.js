// app/page.js
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LandingPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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
    <main className="min-h-screen bg-pink-100 flex flex-col items-center justify-center p-4 bg-[url('/images/pixel-bg.png')]">
      {/* Pixel art decorations */}
      <div className="absolute top-10 left-10 pixel-animate">
        <Image src="/images/pixel-heart.png" alt="Pixel heart" width={50} height={50} />
      </div>
      <div className="absolute bottom-10 right-10 pixel-animate-delay">
        <Image src="/images/pixel-flower.png" alt="Pixel flower" width={60} height={60} />
      </div>
      <div className="absolute top-20 right-20 pixel-animate">
        <Image src="/images/pixel-star.png" alt="Pixel star" width={40} height={40} />
      </div>

      <h1 className="pixel-text text-4xl md:text-5xl mb-8 text-center text-pink-600 animate-pulse">
        Retro Gaming Hub
      </h1>
      
      <div className="pixel-box bg-white p-8 md:p-10 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="pixel-text text-2xl text-center text-purple-600 mb-6">
          Enter Your Credentials
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="pixel-text block text-sm font-medium text-pink-500 mb-1">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="pixel-input w-full px-4 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Enter your name"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="pixel-text block text-sm font-medium text-pink-500 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pixel-input w-full px-4 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Enter our special date"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Hint: The day we met (MMDDYYYY)</p>
          </div>
          
          {error && (
            <div className="pixel-error-box p-3 bg-red-100 border border-red-300 rounded-md">
              <p className="pixel-text text-center text-red-500">{error}</p>
            </div>
          )}
          
          <button
            type="submit"
            disabled={isLoading}
            className="pixel-button w-full py-3 px-4 rounded-md bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium hover:from-pink-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all"
          >
            {isLoading ? (
              <span className="animate-pulse">Loading...</span>
            ) : (
              <span>Enter the Gaming Hub</span>
            )}
          </button>
        </form>
      </div>
      
      <footer className="mt-8 text-center text-pink-600">
        <p className="pixel-text text-sm">Made with ♥ for you</p>
      </footer>
    </main>
  );
}