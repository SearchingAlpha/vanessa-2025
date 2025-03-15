"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

// Floating pixel art decoration that animates
export function PixelDecoration({ imageSrc, size = 48, className = "", animationDelay = 0 }) {
  return (
    <div 
      className={`pixel-animate ${className}`} 
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <Image 
        src={imageSrc} 
        alt="Pixel decoration" 
        width={size} 
        height={size}
        style={{ imageRendering: 'pixelated' }}
      />
    </div>
  );
}

// Animated sparkle effect
export function PixelSparkle({ className = "" }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    // Random initial position
    setPosition({
      x: Math.floor(Math.random() * 100),
      y: Math.floor(Math.random() * 100)
    });
    
    // Move to new random position every few seconds
    const interval = setInterval(() => {
      setPosition({
        x: Math.floor(Math.random() * 100),
        y: Math.floor(Math.random() * 100)
      });
    }, 3000 + Math.random() * 2000); // Random interval between 3-5 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div 
      className={`absolute pixel-sparkle pointer-events-none ${className}`}
      style={{ 
        left: `${position.x}%`, 
        top: `${position.y}%`,
        transition: 'left 2s ease-in-out, top 2s ease-in-out'
      }}
    >
      <Image 
        src="/images/pixel-sparkle.png" 
        alt="Sparkle" 
        width={24} 
        height={24}
        style={{ imageRendering: 'pixelated' }}
      />
    </div>
  );
}

// Hearts that float up and fade out
export function PixelHeartBurst({ x, y, count = 5 }) {
  const [hearts, setHearts] = useState([]);
  
  useEffect(() => {
    const newHearts = [];
    for (let i = 0; i < count; i++) {
      newHearts.push({
        id: i,
        x: x + (Math.random() * 40 - 20), // ±20px from center
        y: y,
        size: Math.floor(Math.random() * 16) + 8, // 8-24px
        speed: (Math.random() * 2) + 1,
        opacity: 1
      });
    }
    setHearts(newHearts);
    
    // Clean up hearts after animation
    const timeout = setTimeout(() => {
      setHearts([]);
    }, 2000);
    
    return () => clearTimeout(timeout);
  }, [x, y, count]);
  
  // Animate hearts rising and fading
  useEffect(() => {
    if (hearts.length === 0) return;
    
    const interval = setInterval(() => {
      setHearts(prevHearts => 
        prevHearts.map(heart => ({
          ...heart,
          y: heart.y - heart.speed,
          opacity: Math.max(0, heart.opacity - 0.02)
        }))
      );
    }, 16);
    
    return () => clearInterval(interval);
  }, [hearts]);
  
  return (
    <div className="fixed pointer-events-none z-50">
      {hearts.map(heart => (
        <div 
          key={heart.id}
          className="absolute"
          style={{ 
            left: heart.x, 
            top: heart.y,
            opacity: heart.opacity,
            transform: `rotate(${Math.random() * 40 - 20}deg)`
          }}
        >
          <Image 
            src="/images/pixel-heart.png" 
            alt="Heart" 
            width={heart.size} 
            height={heart.size}
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
      ))}
    </div>
  );
}

// Rainbow pixel title
export function PixelTitle({ children, className = "" }) {
  return (
    <h1 className={`font-pixel text-4xl pixel-rainbow-text text-shadow-pixel ${className}`}>
      {children}
    </h1>
  );
}

// Pixel art divider
export function PixelDivider({ color = "pink", className = "" }) {
  const colors = {
    pink: "bg-pink-400",
    purple: "bg-purple-500",
    rainbow: "bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400"
  };
  
  const bgColor = colors[color] || colors.pink;
  
  return (
    <div className={`flex items-center justify-center my-4 ${className}`}>
      <div className={`h-1 w-4 ${bgColor} rounded-full mr-1`}></div>
      <div className={`h-1 w-8 ${bgColor} rounded-full mr-1`}></div>
      <div className={`h-1 w-16 ${bgColor} rounded-full mr-1`}></div>
      <div className={`h-1 w-32 ${bgColor} rounded-full mr-1`}></div>
      <div className={`h-1 w-16 ${bgColor} rounded-full mr-1`}></div>
      <div className={`h-1 w-8 ${bgColor} rounded-full mr-1`}></div>
      <div className={`h-1 w-4 ${bgColor} rounded-full`}></div>
    </div>
  );
}

// Pixel button with hover effect
export function PixelButton({ children, onClick, color = "pink", className = "" }) {
  const [isPressed, setIsPressed] = useState(false);
  
  const colors = {
    pink: "from-pink-400 to-pink-500",
    purple: "from-purple-400 to-purple-500",
    green: "from-green-500 to-green-600",
    blue: "from-blue-400 to-blue-500"
  };
  
  const textColors = {
    pink: "text-white",
    purple: "text-white",
    green: "text-white",
    blue: "text-white"
  };
  
  const gradient = colors[color] || colors.pink;
  const textColor = textColors[color] || textColors.pink;
  
  return (
    <button
      className={`font-pixel px-6 py-2 ${textColor} rounded-md bg-gradient-to-b ${gradient} border-2 border-black relative ${className} ${
        isPressed ? "transform translate-y-1 shadow-none" : "shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]"
      }`}
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
    >
      {/* Pixel corners */}
      <div className="absolute w-2 h-2 bg-black -top-2 -left-2"></div>
      <div className="absolute w-2 h-2 bg-black -top-2 -right-2"></div>
      <div className="absolute w-2 h-2 bg-black -bottom-2 -left-2"></div>
      <div className="absolute w-2 h-2 bg-black -bottom-2 -right-2"></div>
      
      <span className="relative z-10">{children}</span>
    </button>
  );
}

// Pastel themed section title
export function SectionTitle({ children, className = "" }) {
  return (
    <div className={`text-center mb-6 ${className}`}>
      <h2 className="font-pixel text-2xl text-primary text-shadow-pixel-sm inline-block relative">
        {children}
        <div className="absolute -bottom-2 left-0 right-0 h-1 bg-pink-400"></div>
      </h2>
    </div>
  );
}

// Pixel art frame for images
export function PixelFrame({ children, className = "" }) {
  return (
    <div className={`relative p-1 border-4 border-purple-400 bg-white ${className}`}>
      {/* Pixel corners */}
      <div className="absolute w-3 h-3 bg-purple-500 top-0 left-0"></div>
      <div className="absolute w-3 h-3 bg-purple-500 top-0 right-0"></div>
      <div className="absolute w-3 h-3 bg-purple-500 bottom-0 left-0"></div>
      <div className="absolute w-3 h-3 bg-purple-500 bottom-0 right-0"></div>
      
      {/* Content */}
      <div className="border-2 border-pink-300">
        {children}
      </div>
    </div>
  );
}

// Pixel styled badge
export function PixelBadge({ children, color = "pink", className = "" }) {
  const colors = {
    pink: "bg-pink-400 text-white",
    purple: "bg-purple-400 text-white",
    green: "bg-green-500 text-white",
    blue: "bg-blue-400 text-white",
    yellow: "bg-yellow-400 text-purple-700",
  };
  
  const bgColor = colors[color] || colors.pink;
  
  return (
    <span className={`inline-block font-pixel text-xs px-2 py-1 ${bgColor} rounded-md ${className}`}>
      {children}
    </span>
  );
}

// Animated text that appears character by character
export function PixelTypingText({ text, delay = 100, className = "" }) {
  const [visibleText, setVisibleText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setVisibleText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [currentIndex, delay, text]);
  
  return (
    <div className={`font-pixel ${className}`}>
      {visibleText}
      {currentIndex < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </div>
  );
}

// Message bubble with pixel styling
export function PixelMessageBubble({ children, position = "left", className = "" }) {
  return (
    <div className={`relative my-2 max-w-xs ${position === 'right' ? 'ml-auto' : 'mr-auto'} ${className}`}>
      <div className={`pixel-box p-3 bg-${position === 'right' ? 'pink' : 'purple'}-200`}>
        <div className="font-pixel text-sm text-primary">
          {children}
        </div>
      </div>
      
      {/* Bubble pointer */}
      <div 
        className={`absolute ${position === 'right' ? 'right-[-8px]' : 'left-[-8px]'} bottom-[8px] w-4 h-4 
        bg-${position === 'right' ? 'pink' : 'purple'}-200 border-${position === 'right' ? 'r' : 'l'}-4 
        border-y-4 border-${position === 'right' ? 'r' : 'l'}-0 border-y-transparent`}
      ></div>
    </div>
  );
}

// Star rating with pixel stars
export function PixelStarRating({ rating = 5, maxRating = 5, className = "" }) {
  return (
    <div className={`flex ${className}`}>
      {[...Array(maxRating)].map((_, index) => (
        <div key={index} className="w-5 h-5 mr-1">
          <Image 
            src={index < rating ? "/images/pixel-star-filled.png" : "/images/pixel-star-empty.png"}
            alt={index < rating ? "Filled star" : "Empty star"}
            width={20}
            height={20}
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
      ))}
    </div>
  );
}