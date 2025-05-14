import React from 'react';

export function WhyUsIllustration() {
  return (
    <svg
      viewBox="0 0 600 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
    >
      <rect width="600" height="400" fill="#111" />
      
      {/* Gradient background */}
      <rect width="600" height="400" fill="url(#whyusGradient)" />
      
      {/* Grid */}
      <g opacity="0.15" stroke="#EC4899" strokeWidth="0.5">
        {Array.from({ length: 20 }).map((_, i) => (
          <line key={`h-${i}`} x1="0" y1={i * 20} x2="600" y2={i * 20} />
        ))}
        {Array.from({ length: 30 }).map((_, i) => (
          <line key={`v-${i}`} x1={i * 20} y1="0" x2={i * 20} y2="400" />
        ))}
      </g>
      
      {/* Central puzzle piece */}
      <g transform="translate(300, 200) scale(0.8)">
        <g transform="translate(-100, -100)">
          {/* Base puzzle piece */}
          <path
            d="M0 50 C0 22.4 22.4 0 50 0 L150 0 C177.6 0 200 22.4 200 50 L200 150 C200 177.6 177.6 200 150 200 L50 200 C22.4 200 0 177.6 0 150 L0 50 Z"
            fill="#4C1D95"
          />
          
          {/* Top connector */}
          <path
            d="M80 0 L80 -20 C80 -30 120 -30 120 -20 L120 0 Z"
            fill="#8B5CF6"
          />
          
          {/* Right connector */}
          <path
            d="M200 80 L220 80 C230 80 230 120 220 120 L200 120 Z"
            fill="#8B5CF6"
          />
          
          {/* Bottom connector */}
          <path
            d="M80 200 L80 220 C80 230 120 230 120 220 L120 200 Z"
            fill="#8B5CF6"
          />
          
          {/* Left connector */}
          <path
            d="M0 80 L-20 80 C-30 80 -30 120 -20 120 L0 120 Z"
            fill="#8B5CF6"
          />
          
          {/* Inner detail */}
          <circle cx="100" cy="100" r="50" fill="#6D28D9" />
          <circle cx="100" cy="100" r="30" fill="#5B21B6" />
          
          {/* Checkmark */}
          <path
            d="M75 100 L90 115 L125 80"
            stroke="white"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
      
      {/* Connected pieces */}
      <g transform="translate(400, 200) scale(0.5)">
        <g transform="translate(-100, -100)">
          <path
            d="M0 50 C0 22.4 22.4 0 50 0 L150 0 C177.6 0 200 22.4 200 50 L200 150 C200 177.6 177.6 200 150 200 L50 200 C22.4 200 0 177.6 0 150 L0 50 Z"
            fill="#A21CAF"
          />
          <circle cx="100" cy="100" r="50" fill="#86198F" />
        </g>
      </g>
      
      <g transform="translate(300, 100) scale(0.5)">
        <g transform="translate(-100, -100)">
          <path
            d="M0 50 C0 22.4 22.4 0 50 0 L150 0 C177.6 0 200 22.4 200 50 L200 150 C200 177.6 177.6 200 150 200 L50 200 C22.4 200 0 177.6 0 150 L0 50 Z"
            fill="#2563EB"
          />
          <circle cx="100" cy="100" r="50" fill="#1D4ED8" />
        </g>
      </g>
      
      <g transform="translate(300, 300) scale(0.5)">
        <g transform="translate(-100, -100)">
          <path
            d="M0 50 C0 22.4 22.4 0 50 0 L150 0 C177.6 0 200 22.4 200 50 L200 150 C200 177.6 177.6 200 150 200 L50 200 C22.4 200 0 177.6 0 150 L0 50 Z"
            fill="#059669"
          />
          <circle cx="100" cy="100" r="50" fill="#047857" />
        </g>
      </g>
      
      <g transform="translate(200, 200) scale(0.5)">
        <g transform="translate(-100, -100)">
          <path
            d="M0 50 C0 22.4 22.4 0 50 0 L150 0 C177.6 0 200 22.4 200 50 L200 150 C200 177.6 177.6 200 150 200 L50 200 C22.4 200 0 177.6 0 150 L0 50 Z"
            fill="#DC2626"
          />
          <circle cx="100" cy="100" r="50" fill="#B91C1C" />
        </g>
      </g>
      
      {/* Glowing circles in the background */}
      <circle cx="100" cy="100" r="60" fill="url(#glow1)" opacity="0.4" />
      <circle cx="500" cy="300" r="80" fill="url(#glow2)" opacity="0.4" />
      <circle cx="450" cy="80" r="40" fill="url(#glow3)" opacity="0.3" />
      
      {/* Small decorative dots */}
      {Array.from({ length: 30 }).map((_, i) => {
        const x = Math.floor(Math.random() * 600);
        const y = Math.floor(Math.random() * 400);
        const size = Math.random() * 3 + 1;
        return <circle key={i} cx={x} cy={y} r={size} fill="white" opacity={Math.random() * 0.3 + 0.1} />;
      })}
      
      {/* Definitions */}
      <defs>
        <linearGradient id="whyusGradient" x1="0" y1="0" x2="600" y2="400" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#111827" />
          <stop offset="1" stopColor="#1F1937" />
        </linearGradient>
        <radialGradient id="glow1" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#4C1D95" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="glow2" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#EC4899" />
          <stop offset="1" stopColor="#831843" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="glow3" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#3B82F6" />
          <stop offset="1" stopColor="#1E3A8A" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
} 