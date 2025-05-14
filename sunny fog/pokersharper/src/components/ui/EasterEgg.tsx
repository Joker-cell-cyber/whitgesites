"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PlayingCard from './PlayingCard';
import PokerChip from './PokerChip';
import { CardSuit, CardRank } from './PlayingCard';

type Card = {
  suit: CardSuit;
  rank: CardRank;
};

type GameState = 'waiting' | 'playing' | 'evaluating' | 'result';

export default function EasterEgg() {
  const [isOpen, setIsOpen] = useState(false);
  const [playerCards, setPlayerCards] = useState<Card[]>([]);
  const [dealerCards, setDealerCards] = useState<Card[]>([]);
  const [communityCards, setCommunityCards] = useState<Card[]>([]);
  const [chipCount, setChipCount] = useState(100);
  const [bet, setBet] = useState(10);
  const [gameState, setGameState] = useState<GameState>('waiting');
  const [result, setResult] = useState<'win' | 'lose' | 'tie' | null>(null);
  
  const suits: CardSuit[] = ['hearts', 'diamonds', 'clubs', 'spades'];
  const ranks: CardRank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  
  // Listen for the key combination: POKER (P, O, K, E, R pressed in sequence)
  useEffect(() => {
    const targetSequence = ['p', 'o', 'k', 'e', 'r'];
    let currentPosition = 0;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      
      if (key === targetSequence[currentPosition]) {
        currentPosition++;
        
        if (currentPosition === targetSequence.length) {
          setIsOpen(prev => !prev);
          currentPosition = 0;
        }
      } else {
        currentPosition = key === targetSequence[0] ? 1 : 0;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  // Reset game when closed
  useEffect(() => {
    if (!isOpen) {
      setGameState('waiting');
      setPlayerCards([]);
      setDealerCards([]);
      setCommunityCards([]);
      setResult(null);
      setBet(10);
      setChipCount(100);
    }
  }, [isOpen]);
  
  // Get a random card
  const getRandomCard = (usedCards: Card[]): Card => {
    let card: Card;
    do {
      const randomSuit = suits[Math.floor(Math.random() * suits.length)];
      const randomRank = ranks[Math.floor(Math.random() * ranks.length)];
      card = { suit: randomSuit, rank: randomRank };
    } while (usedCards.some(c => c.suit === card.suit && c.rank === card.rank));
    
    return card;
  };
  
  // Deal cards
  const dealCards = () => {
    if (chipCount < bet) {
      alert("Not enough chips!");
      return;
    }
    
    setChipCount(chipCount - bet);
    setGameState('playing');
    
    const allCards: Card[] = [];
    
    // Deal player cards
    const newPlayerCards = [getRandomCard(allCards), getRandomCard([...allCards])];
    allCards.push(...newPlayerCards);
    setPlayerCards(newPlayerCards);
    
    // Deal dealer cards
    const newDealerCards = [getRandomCard(allCards), getRandomCard([...allCards])];
    allCards.push(...newDealerCards);
    setDealerCards(newDealerCards);
    
    // Deal community cards (flop, turn, river)
    const flop = [
      getRandomCard(allCards),
      getRandomCard([...allCards]),
      getRandomCard([...allCards, ...allCards])
    ];
    allCards.push(...flop);
    
    const turn = getRandomCard(allCards);
    allCards.push(turn);
    
    const river = getRandomCard(allCards);
    allCards.push(river);
    
    setCommunityCards([...flop, turn, river]);
    
    // Reveal cards with delay
    setTimeout(() => {
      setGameState('evaluating');
      
      // Evaluate winner after a delay
      setTimeout(() => {
        evaluateWinner();
      }, 1500);
    }, 1000);
  };
  
  // Basic hand evaluator (simplified for the Easter egg)
  const evaluateWinner = () => {
    // For simplicity, we'll just use a random outcome
    // In a real implementation, you'd compare the actual poker hands
    const outcome = Math.random();
    
    if (outcome < 0.45) {
      // Player wins
      setResult('win');
      setChipCount(chipCount + bet * 2);
    } else if (outcome < 0.9) {
      // Dealer wins
      setResult('lose');
    } else {
      // Tie
      setResult('tie');
      setChipCount(chipCount + bet);
    }
    
    setGameState('result');
  };
  
  // Reset hand
  const resetHand = () => {
    setGameState('waiting');
    setPlayerCards([]);
    setDealerCards([]);
    setCommunityCards([]);
    setResult(null);
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            className="felt-texture bg-felt-800 rounded-xl p-6 md:p-8 shadow-2xl border border-gray-700 max-w-3xl w-full mx-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 20 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white font-playfair mb-2">
                Secret Poker Table
              </h2>
              <p className="text-gray-300 text-sm">You&apos;ve found the hidden mini-game! Press &apos;POKER&apos; keys again to exit.</p>
            </div>
            
            {/* Chip count and bet controls */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <PokerChip color="gold" size="sm" />
                <span className="ml-2 text-white font-special-elite text-lg">{chipCount}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setBet(Math.max(5, bet - 5))}
                  disabled={gameState !== 'waiting'}
                  className="w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center disabled:opacity-50"
                >
                  -
                </button>
                <div className="px-3 py-1 bg-black/50 rounded-lg text-white">
                  Bet: <span className="text-chip-gold-500 font-special-elite">{bet}</span>
                </div>
                <button 
                  onClick={() => setBet(Math.min(50, bet + 5))}
                  disabled={gameState !== 'waiting'}
                  className="w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center disabled:opacity-50"
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Game table */}
            <div className="relative min-h-[400px]">
              {/* Dealer area */}
              <div className="absolute top-0 left-0 right-0 flex justify-center">
                <div className="text-center">
                  <p className="text-gray-400 mb-2 text-sm">Dealer</p>
                  <div className="flex justify-center space-x-2">
                    {dealerCards.map((card, index) => (
                      <div key={`dealer-${index}`} className="transform hover:translate-y-[-10px] transition-transform">
                        <PlayingCard 
                          suit={card.suit} 
                          rank={card.rank} 
                          size="sm" 
                          faceDown={gameState !== 'result'} 
                        />
                      </div>
                    ))}
                    {dealerCards.length === 0 && gameState === 'waiting' && (
                      <div className="bg-black/30 rounded-lg w-16 h-24 flex items-center justify-center border border-gray-700">
                        <span className="text-gray-500 text-3xl">?</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Community cards */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="flex justify-center space-x-1 md:space-x-2">
                  {communityCards.slice(0, 3).map((card, index) => (
                    <div key={`community-${index}`} className={`transition-all duration-300 ${
                      gameState === 'waiting' ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                    }`}>
                      <PlayingCard suit={card.suit} rank={card.rank} size="sm" />
                    </div>
                  ))}
                  
                  {communityCards.length > 3 && (
                    <div className={`transition-all duration-300 delay-100 ${
                      gameState === 'waiting' || gameState === 'playing' ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                    }`}>
                      <PlayingCard suit={communityCards[3].suit} rank={communityCards[3].rank} size="sm" />
                    </div>
                  )}
                  
                  {communityCards.length > 4 && (
                    <div className={`transition-all duration-300 delay-200 ${
                      gameState === 'waiting' || gameState === 'playing' || gameState === 'evaluating' ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                    }`}>
                      <PlayingCard suit={communityCards[4].suit} rank={communityCards[4].rank} size="sm" />
                    </div>
                  )}
                  
                  {communityCards.length === 0 && (
                    <div className="bg-black/20 rounded-lg px-4 py-2 border border-gray-700/30">
                      <span className="text-gray-400 text-sm">Community Cards</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Player area */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-center">
                <div className="text-center">
                  <div className="flex justify-center space-x-2 mb-2">
                    {playerCards.map((card, index) => (
                      <div key={`player-${index}`} className="transform hover:translate-y-[-10px] transition-transform">
                        <PlayingCard suit={card.suit} rank={card.rank} size="sm" />
                      </div>
                    ))}
                    {playerCards.length === 0 && gameState === 'waiting' && (
                      <div className="bg-black/30 rounded-lg w-16 h-24 flex items-center justify-center border border-gray-700">
                        <span className="text-gray-500 text-3xl">?</span>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-200 text-sm">Your Hand</p>
                </div>
              </div>
              
              {/* Game result overlay */}
              {gameState === 'result' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    className={`px-8 py-4 rounded-lg text-white text-2xl font-bold ${
                      result === 'win' ? 'bg-chip-gold-600/80' : 
                      result === 'lose' ? 'bg-poker-red-700/80' : 
                      'bg-felt-800/80'
                    }`}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', damping: 12 }}
                  >
                    {result === 'win' && 'You Win!'}
                    {result === 'lose' && 'Dealer Wins'}
                    {result === 'tie' && 'Push'}
                  </motion.div>
                </div>
              )}
            </div>
            
            {/* Action buttons */}
            <div className="mt-6 flex justify-center">
              {gameState === 'waiting' && (
                <button 
                  onClick={dealCards}
                  className="px-6 py-3 bg-gradient-to-r from-chip-gold-500 to-chip-gold-600 text-black rounded-lg font-bold shadow-lg transform transition-transform hover:scale-105"
                >
                  Deal Cards
                </button>
              )}
              
              {gameState === 'result' && (
                <button 
                  onClick={resetHand}
                  className="px-6 py-3 bg-gradient-to-r from-felt-700 to-felt-800 text-white rounded-lg font-bold shadow-lg transform transition-transform hover:scale-105"
                >
                  New Hand
                </button>
              )}
            </div>
            
            {/* Mini help text */}
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-xs">
                This is a simplified poker game. In a real game, hands would be properly evaluated.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 