"use client";

import { useState } from 'react';
import Image from 'next/image';
import ContainerPixel from './ContainerPixel';

export default function CardPresent({ title, isUnlocked, presentContent, presentImageSrc }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    if (isUnlocked) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="mb-4">
      <ContainerPixel 
        className={`w-48 h-48 flex flex-col items-center justify-center cursor-pointer ${
          isUnlocked ? 'bg-pink-100 hover:bg-pink-200' : 'bg-gray-200'
        }`}
        onClick={toggleOpen}
      >
        {isOpen && isUnlocked ? (
          <div className="flex flex-col items-center">
            {presentImageSrc && (
              <div className="relative w-24 h-24 mb-2">
                <Image
                  src={presentImageSrc}
                  alt="Present"
                  fill
                  style={{ objectFit: 'contain', imageRendering: 'pixelated' }}
                />
              </div>
            )}
            <p className="text-center text-sm font-pixel text-purple-900">{presentContent}</p>
          </div>
        ) : (
          <>
            <div className="relative w-24 h-24 mb-2">
              <Image
                src="/presents/present-locked.png"
                alt="Present"
                fill
                priority
                style={{ objectFit: 'contain', imageRendering: 'pixelated' }}
              />
            </div>
            <h3 className="font-pixel text-lg text-center">{title}</h3>
            <div className="mt-2 px-3 py-1 bg-purple-500 text-white rounded-md">
              {isUnlocked ? "Open" : "Locked"}
            </div>
          </>
        )}
      </ContainerPixel>
    </div>
  );
}