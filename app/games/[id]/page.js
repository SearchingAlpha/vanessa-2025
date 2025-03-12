import { notFound } from 'next/navigation';
import Image from 'next/image';

// Game data (you could fetch this from a database or API later)
const games = {
  'memory-match': {
    name: 'Memory Match',
    description: 'Find all the matching pairs to win!',
    image: '/games/memory-match.jpg',
    component: () => <p>Memory Match Game Coming Soon! 🎴</p>,
  },
  'quiz-time': {
    name: 'Quiz Time',
    description: 'Answer all the questions correctly!',
    image: '/games/quiz-time.jpg',
    component: () => <p>Quiz Time Game Loading... 📝</p>,
  },
  'puzzle-mania': {
    name: 'Puzzle Mania',
    description: 'Solve the puzzle as fast as you can!',
    image: '/games/puzzle-mania.jpg',
    component: () => <p>Puzzle Mania in Progress... 🧩</p>,
  },
  'love-quest': {
    name: 'Love Quest',
    description: 'Complete romantic challenges for a surprise!',
    image: '/games/love-quest.jpg',
    component: () => <p>Love Quest Starting Soon... 💕</p>,
  },
};

export default function GamePage({ params }) {
  const game = games[params.id];

  if (!game) return notFound(); // Show 404 if game ID doesn't exist

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 p-6">
      <h1 className="text-4xl font-bold text-pink-600 mb-4">{game.name}</h1>
      <Image src={game.image} alt={game.name} width={300} height={300} className="rounded-lg shadow-md" />
      <p className="text-lg text-gray-700 mt-4">{game.description}</p>
      <div className="mt-6 p-4 border border-pink-400 bg-white rounded-lg shadow-md">
        {game.component()}
      </div>
    </div>
  );
}
