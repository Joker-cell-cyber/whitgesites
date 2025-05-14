import React from 'react';

export function MissionIllustration() {
  return (
    <svg
      viewBox="0 0 600 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
    >
      <rect width="600" height="400" fill="#111" />
      
      {/* Gradient background */}
      <rect width="600" height="400" fill="url(#gradient)" />
      
      {/* Grid */}
      <g opacity="0.2" stroke="#8B5CF6" strokeWidth="0.5">
        {Array.from({ length: 20 }).map((_, i) => (
          <line key={`h-${i}`} x1="0" y1={i * 20} x2="600" y2={i * 20} />
        ))}
        {Array.from({ length: 30 }).map((_, i) => (
          <line key={`v-${i}`} x1={i * 20} y1="0" x2={i * 20} y2="400" />
        ))}
      </g>
      
      {/* Rocket */}
      <g transform="translate(250, 160) scale(1.2)">
        {/* Rocket body */}
        <path d="M0 100 L25 0 L50 100 Z" fill="#8B5CF6" />
        <path d="M0 100 L25 70 L50 100 Z" fill="#4C1D95" />
        
        {/* Windows */}
        <circle cx="25" cy="40" r="8" fill="#E0E7FF" />
        <circle cx="25" cy="65" r="5" fill="#E0E7FF" />
        
        {/* Fins */}
        <path d="M0 100 L-15 120 L-5 100 Z" fill="#4C1D95" />
        <path d="M50 100 L65 120 L55 100 Z" fill="#4C1D95" />
        
        {/* Flames */}
        <g>
          <path d="M15 100 L25 130 L35 100 Z" fill="#F97316" />
          <path d="M20 100 L25 145 L30 100 Z" fill="#FBBF24" />
        </g>
      </g>
      
      {/* Code brackets */}
      <g transform="translate(120, 180) scale(1.5)">
        <path d="M0 0 L-20 25 L0 50" stroke="#EC4899" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      
      <g transform="translate(480, 180) scale(1.5)">
        <path d="M0 0 L20 25 L0 50" stroke="#EC4899" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      
      {/* Planets/circles */}
      <circle cx="100" cy="80" r="30" fill="url(#planetGradient1)" />
      <circle cx="500" cy="320" r="40" fill="url(#planetGradient2)" />
      <circle cx="450" cy="100" r="20" fill="url(#planetGradient3)" />
      
      {/* Stars */}
      {Array.from({ length: 50 }).map((_, i) => {
        const x = Math.floor(Math.random() * 600);
        const y = Math.floor(Math.random() * 400);
        const size = Math.random() * 2 + 1;
        return <circle key={i} cx={x} cy={y} r={size} fill="white" opacity={Math.random() * 0.8 + 0.2} />;
      })}
      
      {/* Definitions */}
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="600" y2="400" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#312E81" />
          <stop offset="1" stopColor="#111111" />
        </linearGradient>
        <radialGradient id="planetGradient1" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#4C1D95" />
        </radialGradient>
        <radialGradient id="planetGradient2" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#EC4899" />
          <stop offset="1" stopColor="#831843" />
        </radialGradient>
        <radialGradient id="planetGradient3" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#3B82F6" />
          <stop offset="1" stopColor="#1E3A8A" />
        </radialGradient>
      </defs>
    </svg>
  );
} 