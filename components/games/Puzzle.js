'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const imageSrc = '/games/puzzle-image.jpg';
const gridSize = 3; // 3x3 grid

const shuffleArray = (array) => {
  let shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const generatePuzzle = () => {
  let tiles = Array.from({ length: gridSize * gridSize }, (_, index) => index);
  tiles = shuffleArray(tiles);
  return tiles;
};

export default function PuzzleGame() {
  const [tiles, setTiles] = useState(generatePuzzle());
  const [emptyIndex, setEmptyIndex] = useState(tiles.indexOf(gridSize * gridSize - 1));

  useEffect(() => {
    if (tiles.every((tile, index) => tile === index)) {
      alert('🎉 You solved the puzzle!');
    }
  }, [tiles]);

  const swapTiles = (index) => {
    const isAdjacent = [
      emptyIndex - 1 === index && emptyIndex % gridSize !== 0, // Left
      emptyIndex + 1 === index && index % gridSize !== 0, // Right
      emptyIndex - gridSize === index, // Above
      emptyIndex + gridSize === index, // Below
    ].some(Boolean);

    if (isAdjacent) {
      let newTiles = [...tiles];
      [newTiles[emptyIndex], newTiles[index]] = [newTiles[index], newTiles[emptyIndex]];
      setTiles(newTiles);
      setEmptyIndex(index);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 p-6">
      <h1 className="text-4xl font-bold text-pink-600 mb-6">Puzzle Mania 🧩</h1>
      <div className="grid grid-cols-3 gap-1 border border-pink-400 p-2 bg-white rounded-lg">
        {tiles.map((tile, index) => (
          <div
            key={index}
            className={`w-24 h-24 flex items-center justify-center cursor-pointer transition-all duration-300 shadow-md ${tile === gridSize * gridSize - 1 ? 'bg-gray-300' : 'bg-pink-200'}`}
            onClick={() => swapTiles(index)}
          >
            {tile !== gridSize * gridSize - 1 && (
              <Image
                src={imageSrc}
                alt="Puzzle Piece"
                width={72}
                height={72}
                className="object-cover"
                style={{
                  backgroundPosition: `${(tile % gridSize) * -100}% ${(Math.floor(tile / gridSize)) * -100}%`,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}