"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export type CardSuit = 'hearts' | 'diamonds' | 'clubs' | 'spades';
export type CardRank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

export type PlayingCardProps = {
  suit: CardSuit;
  rank: CardRank;
  faceDown?: boolean;
  flippable?: boolean;
  floating?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  frontContent?: React.ReactNode;
  backContent?: React.ReactNode;
  style?: React.CSSProperties;
};

const suitSymbols = {
  hearts: '♥',
  diamonds: '♦',
  clubs: '♣',
  spades: '♠',
};

const suitColors = {
  hearts: 'text-poker-red-700',
  diamonds: 'text-poker-red-700',
  clubs: 'text-black',
  spades: 'text-black',
};

const sizesMap = {
  sm: 'w-16 h-24',
  md: 'w-24 h-36',
  lg: 'w-32 h-48',
  xl: 'w-48 h-72',
};

export default function PlayingCard({
  suit,
  rank,
  faceDown = false,
  flippable = false,
  floating = false,
  size = 'md',
  className = '',
  onClick,
  children,
  frontContent,
  backContent,
  style,
}: PlayingCardProps) {
  const [isFlipped, setIsFlipped] = useState(faceDown);
  
  const handleClick = () => {
    if (flippable) {
      setIsFlipped(!isFlipped);
    }
    if (onClick) {
      onClick();
    }
  };

  const cardSize = sizesMap[size];
  const suitColor = suitColors[suit];
  const suitSymbol = suitSymbols[suit];

  return (
    <motion.div
      className={`relative ${cardSize} ${floating ? 'animate-float' : ''} ${className}`}
      style={style}
      whileHover={flippable ? { scale: 1.05 } : undefined}
      onClick={handleClick}
    >
      <div
        className={`poker-card relative w-full h-full rounded-lg overflow-hidden transform-gpu transition-transform duration-500 ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Card Front */}
        <div
          className="absolute inset-0 flex flex-col justify-between p-2 bg-white rounded-lg shadow-lg backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {frontContent ? (
            frontContent
          ) : (
            <>
              <div className={`flex justify-between items-start ${suitColor}`}>
                <div className="flex flex-col items-center">
                  <span className="card-number font-bold text-lg">{rank}</span>
                  <span className="text-lg">{suitSymbol}</span>
                </div>
                <div className="opacity-0">
                  <span className="card-number font-bold text-lg">{rank}</span>
                  <span className="text-lg">{suitSymbol}</span>
                </div>
              </div>
              
              <div className="flex-1 flex items-center justify-center">
                <span className={`text-4xl ${suitColor}`}>{suitSymbol}</span>
              </div>
              
              <div className={`flex justify-between items-end ${suitColor}`}>
                <div className="opacity-0">
                  <span className="card-number font-bold text-lg">{rank}</span>
                  <span className="text-lg">{suitSymbol}</span>
                </div>
                <div className="flex flex-col items-center rotate-180">
                  <span className="card-number font-bold text-lg">{rank}</span>
                  <span className="text-lg">{suitSymbol}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Card Back */}
        <div
          className="absolute inset-0 bg-felt-800 rounded-lg shadow-lg backface-hidden rotate-y-180"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {backContent ? (
            backContent
          ) : (
            <div className="w-full h-full p-3">
              <div className="w-full h-full border-2 border-chip-gold-500 rounded flex items-center justify-center">
                <div className="bg-chip-gold-500 w-3/4 h-3/4 rounded flex items-center justify-center">
                  <div className="bg-felt-800 w-1/2 h-1/2 rounded-full flex items-center justify-center">
                    <span className="text-chip-gold-500 text-2xl">PS</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {children}
    </motion.div>
  );
} 