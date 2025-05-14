"use client";

import React from 'react';
import { motion } from 'framer-motion';

export type ChipColor = 'red' | 'blue' | 'green' | 'black' | 'gold';
export type ChipSize = 'sm' | 'md' | 'lg';

export type PokerChipProps = {
  color?: ChipColor;
  size?: ChipSize;
  value?: string | number;
  stacked?: boolean;
  spinning?: boolean;
  floating?: boolean;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
};

const chipColors = {
  red: {
    outer: 'bg-poker-royal-700',
    inner: 'bg-poker-royal-500',
    border: 'border-poker-royal-800',
    text: 'text-white'
  },
  blue: {
    outer: 'bg-neon-blue-600',
    inner: 'bg-neon-blue-500',
    border: 'border-neon-blue-600',
    text: 'text-white'
  },
  green: {
    outer: 'bg-felt-700',
    inner: 'bg-felt-600',
    border: 'border-felt-800',
    text: 'text-white'
  },
  black: {
    outer: 'bg-black',
    inner: 'bg-gray-800',
    border: 'border-gray-900',
    text: 'text-white'
  },
  gold: {
    outer: 'bg-chip-gold-600',
    inner: 'bg-chip-gold-500',
    border: 'border-chip-gold-700',
    text: 'text-black'
  }
};

const chipSizes = {
  sm: {
    container: 'w-12 h-12',
    inner: 'w-8 h-8',
    text: 'text-xs'
  },
  md: {
    container: 'w-16 h-16',
    inner: 'w-10 h-10',
    text: 'text-sm'
  },
  lg: {
    container: 'w-20 h-20',
    inner: 'w-14 h-14',
    text: 'text-base'
  }
};

export default function PokerChip({
  color = 'red',
  size = 'md',
  value,
  stacked = false,
  spinning = false,
  floating = false,
  className = '',
  onClick,
  style
}: PokerChipProps) {
  const chipColor = chipColors[color];
  const chipSize = chipSizes[size];
  
  const animations = [
    stacked && 'animate-chip-stack',
    spinning && 'animate-chip-spin',
    floating && 'animate-float'
  ].filter(Boolean).join(' ');

  return (
    <motion.div
      className={`relative ${chipSize.container} ${animations} ${className}`}
      style={style}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {/* Stacked chips effect */}
      {stacked && (
        <>
          <div className={`absolute -bottom-1 -right-1 rounded-full ${chipSize.container} ${chipColor.outer} ${chipColor.border} border-2 opacity-60`}></div>
          <div className={`absolute -bottom-0.5 -right-0.5 rounded-full ${chipSize.container} ${chipColor.outer} ${chipColor.border} border-2 opacity-80`}></div>
        </>
      )}
      
      {/* Main chip */}
      <div className={`relative rounded-full ${chipSize.container} ${chipColor.outer} border-2 ${chipColor.border} shadow-lg`}>
        {/* Inner ring pattern */}
        <div className="absolute inset-0 rounded-full border-4 border-dashed border-opacity-20 border-white"></div>
        
        {/* Center circle */}
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full ${chipSize.inner} ${chipColor.inner} flex items-center justify-center`}>
          {value && (
            <span className={`${chipSize.text} font-bold ${chipColor.text} font-special-elite`}>
              {value}
            </span>
          )}
        </div>
        
        {/* Decorative dots around the edge */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div 
            key={i}
            className={`absolute w-2 h-2 rounded-full bg-white bg-opacity-60`}
            style={{
              transform: `rotate(${i * 45}deg) translateY(-50%) translateX(-50%)`,
              top: '50%',
              left: '50%',
              transformOrigin: `${size === 'sm' ? '150%' : '180%'} 0`
            }}
          ></div>
        ))}
      </div>
    </motion.div>
  );
} 