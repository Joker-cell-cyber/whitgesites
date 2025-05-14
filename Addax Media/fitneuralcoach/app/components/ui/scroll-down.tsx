'use client';

import React from 'react';

interface ScrollDownProps {
  targetId?: string;
  className?: string;
}

export default function ScrollDown({ targetId, className = '' }: ScrollDownProps) {
  const handleClick = () => {
    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Si aucun ID cible n'est fourni, défilez simplement vers le bas
      window.scrollBy({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors duration-300 ${className}`}
      aria-label="Défiler vers le bas"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-6 w-6 text-primary animate-bounce" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M19 14l-7 7m0 0l-7-7m7 7V3" 
        />
      </svg>
    </button>
  );
} 