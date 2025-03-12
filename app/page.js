"use client";

import Image from "next/image";
import { useState } from "react";
import Button from "@/components/Button";

export default function BirthdayLanding() {
  const [showSurprise, setShowSurprise] = useState(false);

  return (
    <div className="min-h-screen bg-pink-200 flex flex-col md:flex-row items-center justify-center p-6">
      {/* Left Column */}
      <div className="md:w-1/2 flex flex-col items-center text-center md:text-left p-6">
        <h1 className="text-5xl font-bold text-pink-600 drop-shadow-lg">
          Happy Birthday, Vanessa!
        </h1>
        <p className="text-lg text-pink-700 mt-4 max-w-lg">
          Today is a special day for a special person! Enjoy your retro-themed surprise filled with love and nostalgia. 💖
        </p>
        <Button 
          className="mt-6"
          onClick={() => setShowSurprise(true)}
        >
          Click for a Surprise! 🎁
        </Button>
      </div>
      
      {/* Right Column */}
      <div className="md:w-1/2 flex flex-col items-center p-6">
        <Image 
          src="/retro-heart.png" 
          alt="Retro heart" 
          width={250} 
          height={250} 
          className="rounded-full shadow-lg"
        />
        {showSurprise && (
          <div className="mt-8 p-6 bg-white shadow-lg rounded-xl max-w-md text-pink-700 text-center">
            <h2 className="text-2xl font-bold">Surprise! 🎀</h2>
            <p className="mt-2">You're the most amazing person ever! This page is just a little something to make you smile. ❤️</p>
          </div>
        )}
      </div>
    </div>
  );
}