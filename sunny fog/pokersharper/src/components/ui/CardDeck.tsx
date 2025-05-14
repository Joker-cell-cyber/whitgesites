"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PlayingCard, { CardSuit, CardRank } from './PlayingCard';

export type CardDeckProps = {
  count?: number;
  fanned?: boolean;
  canDeal?: boolean;
  canShuffle?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onDeal?: (card: { suit: CardSuit; rank: CardRank }) => void;
  style?: React.CSSProperties;
};

// Card suits and ranks for randomly dealing cards
const suits: CardSuit[] = ['hearts', 'diamonds', 'clubs', 'spades'];
const ranks: CardRank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

export default function CardDeck({
  count = 52,
  fanned = false,
  canDeal = false,
  canShuffle = false,
  size = 'md',
  className = '',
  onDeal,
  style
}: CardDeckProps) {
  const [deckCount, setDeckCount] = useState(count);
  const [isShuffling, setIsShuffling] = useState(false);
  const [dealtCards, setDealtCards] = useState<Array<{suit: CardSuit; rank: CardRank}>>([]);
  
  const getRandomCard = () => {
    const randomSuit = suits[Math.floor(Math.random() * suits.length)];
    const randomRank = ranks[Math.floor(Math.random() * ranks.length)];
    return { suit: randomSuit, rank: randomRank };
  };
  
  const handleDeal = () => {
    if (deckCount > 0 && canDeal) {
      const card = getRandomCard();
      setDeckCount(deckCount - 1);
      setDealtCards([...dealtCards, card]);
      
      if (onDeal) {
        onDeal(card);
      }
    }
  };
  
  const handleShuffle = () => {
    if (canShuffle && !isShuffling) {
      setIsShuffling(true);
      
      // Simulate shuffle animation
      setTimeout(() => {
        setIsShuffling(false);
      }, 2000);
    }
  };
  
  return (
    <div className={`relative ${className}`} style={style}>
      {/* Cards stack */}
      <div 
        className={`relative ${isShuffling ? 'animate-shuffle-cards' : ''}`}
        onClick={canDeal ? handleDeal : undefined}
      >
        {/* Generate deck layers */}
        {Array.from({ length: Math.min(5, deckCount) }).map((_, index) => {
          const offset = index * 0.5;
          const zIndex = 50 - index;
          
          return (
            <div
              key={index}
              className={`absolute`}
              style={{
                top: fanned ? `${index * -1}px` : `${-offset}px`,
                left: fanned ? `${index * 2}px` : `${-offset}px`,
                zIndex,
                transform: fanned ? `rotate(${index * 2}deg)` : 'none'
              }}
            >
              <PlayingCard
                suit="spades"
                rank="A"
                faceDown={true}
                size={size}
              />
            </div>
          );
        })}
      </div>
      
      {/* Deal button */}
      {canDeal && deckCount > 0 && (
        <motion.button
          className="absolute bottom-0 -right-12 flex items-center justify-center w-10 h-10 rounded-full bg-chip-gold-500 text-black shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleDeal}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>
      )}
      
      {/* Shuffle button */}
      {canShuffle && (
        <motion.button
          className="absolute bottom-0 -left-12 flex items-center justify-center w-10 h-10 rounded-full bg-felt-800 text-white shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleShuffle}
          disabled={isShuffling}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 16V8M3 16V8M16 16C16 18.2091 14.2091 20 12 20C9.79086 20 8 18.2091 8 16V8C8 5.79086 9.79086 4 12 4C14.2091 4 16 5.79086 16 8V16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>
      )}
      
      {/* Dealt cards display */}
      <AnimatePresence>
        {dealtCards.length > 0 && (
          <div className="absolute top-24 left-0 flex flex-wrap gap-2">
            {dealtCards.map((card, index) => (
              <motion.div
                key={`${card.suit}-${card.rank}-${index}`}
                initial={{ opacity: 0, y: -50, rotate: -10 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="animate-deal-card"
                style={{ zIndex: 100 + index }}
              >
                <PlayingCard
                  suit={card.suit}
                  rank={card.rank}
                  size={size === 'lg' ? 'md' : 'sm'}
                />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
      
      {/* Deck count indicator */}
      {deckCount > 0 && (
        <div className="absolute -top-2 -right-2 bg-chip-gold-500 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
          {deckCount}
        </div>
      )}
    </div>
  );
} 