'use client';

import Image from 'next/image';
import Link from 'next/link';

const games = [
  { id: 'memory-match', name: 'Memory Match', image: '/games/memory-match.jpg' },
  { id: 'quiz-time', name: 'Quiz Time', image: '/games/quiz-time.jpg' },
  { id: 'puzzle-mania', name: 'Puzzle Mania', image: '/games/puzzle-mania.jpg' },
  { id: 'love-quest', name: 'Love Quest', image: '/games/love-quest.jpg' }
];

export default function GameHub() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-200 p-6">
      <h1 className="text-4xl font-bold text-pink-600 mb-8">🎮 Choose a Game for Vanessa 🎀</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {games.map((game) => (
          <Link key={game.id} href={`/games/${game.id}`}>
            <div className="relative group cursor-pointer w-64 h-64 rounded-2xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
              <Image src={game.image} alt={game.name} width={256} height={256} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white text-xl font-semibold opacity-0 group-hover:opacity-100 transition duration-300">
                {game.name}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}