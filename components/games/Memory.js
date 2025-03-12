'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const images = ['/games/card1.jpg', '/games/card2.jpg', '/games/card3.jpg', '/games/card4.jpg'];
const shuffledCards = [...images, ...images].sort(() => Math.random() - 0.5);

export default function MemoryMatch() {
  const [cards, setCards] = useState(shuffledCards.map((img, index) => ({ id: index, img, flipped: false, matched: false })));
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (selected.length === 2) {
      const [first, second] = selected;
      if (cards[first].img === cards[second].img) {
        setCards(prev => prev.map(card => (card.img === cards[first].img ? { ...card, matched: true } : card)));
      }
      setTimeout(() => setCards(prev => prev.map(card => (card.id === first || card.id === second ? { ...card, flipped: false } : card))), 1000);
      setSelected([]);
    }
  }, [selected, cards]);

  const handleClick = (index) => {
    if (!cards[index].flipped && selected.length < 2) {
      setCards(prev => prev.map((card, i) => (i === index ? { ...card, flipped: true } : card)));
      setSelected([...selected, index]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 p-6">
      <h1 className="text-4xl font-bold text-pink-600 mb-6">Memory Match 🎴</h1>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`w-24 h-32 bg-white rounded-lg shadow-lg flex items-center justify-center cursor-pointer transition-all duration-300 ${card.flipped ? 'border-4 border-pink-400' : 'bg-gray-300'}`}
            onClick={() => handleClick(index)}
          >
            {card.flipped || card.matched ? (
              <Image src={card.img} alt="Memory Card" width={90} height={120} className="rounded-lg" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-pink-500 text-2xl">❓</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}