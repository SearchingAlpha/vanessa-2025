// lib/gameUtils.js
import Cookies from 'js-cookie';

// Game IDs
export const GAMES = {
  FLOWER_MATCH: 'flower-match',
  CUPCAKE_CATCH: 'cupcake-catch',
  HEART_JUMP: 'heart-jump',
};

// Present info corresponding to each game
export const PRESENTS = {
  [GAMES.FLOWER_MATCH]: {
    id: 'present1',
    title: 'Flower Match Present',
    description: 'A special present just for you!',
    imageSrc: '/presents/present1.png',
  },
  [GAMES.CUPCAKE_CATCH]: {
    id: 'present2',
    title: 'Cupcake Catch Present',
    description: 'Something sweet for someone sweet!',
    imageSrc: '/presents/present2.png',
  },
  [GAMES.HEART_JUMP]: {
    id: 'present3',
    title: 'Heart Jump Present',
    description: 'Jump for joy with this gift!',
    imageSrc: '/presents/present3.png',
  },
};

// Game info
export const GAME_INFO = {
  [GAMES.FLOWER_MATCH]: {
    title: 'Flower Match',
    description: 'Match pairs of beautiful flowers in this memory game!',
    imageSrc: '/images/game-flower.png',
    path: '/games/flower-match',
  },
  [GAMES.CUPCAKE_CATCH]: {
    title: 'Cupcake Catch',
    description: 'Catch falling cupcakes and avoid the bombs!',
    imageSrc: '/images/game-cupcake.png',
    path: '/games/cupcake-catch',
  },
  [GAMES.HEART_JUMP]: {
    title: 'Heart Jump',
    description: 'Jump to collect hearts in this cute platformer!',
    imageSrc: '/images/game-heart.png',
    path: '/games/heart-jump',
  },
};

// Client-side functions to get and set completed games
export function getCompletedGames() {
  try {
    const savedGames = Cookies.get('completedGames');
    return savedGames ? JSON.parse(savedGames) : [];
  } catch (error) {
    console.error('Error getting completed games:', error);
    return [];
  }
}

export function saveCompletedGame(gameId) {
  try {
    const completedGames = getCompletedGames();
    
    // Only add if not already completed
    if (!completedGames.includes(gameId)) {
      completedGames.push(gameId);
      Cookies.set('completedGames', JSON.stringify(completedGames), { expires: 365 });
    }
    
    return completedGames;
  } catch (error) {
    console.error('Error saving completed game:', error);
    return [];
  }
}

export function isGameCompleted(gameId) {
  const completedGames = getCompletedGames();
  return completedGames.includes(gameId);
}

export function getUnlockedPresents() {
  const completedGames = getCompletedGames();
  return Object.values(PRESENTS).filter(present => 
    completedGames.includes(
      Object.keys(PRESENTS).find(key => PRESENTS[key].id === present.id)
    )
  );
}