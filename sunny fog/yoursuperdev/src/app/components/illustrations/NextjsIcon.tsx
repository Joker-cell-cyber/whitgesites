import React from 'react';

interface NextjsIconProps {
  className?: string;
  width?: number;
  height?: number;
}

export function NextjsIcon({ className = "", width = 200, height = 200 }: NextjsIconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height} 
      viewBox="0 0 200 200" 
      fill="none" 
      className={className}
    >
      <defs>
        <linearGradient id="nextjsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#000000" />
          <stop offset="100%" stopColor="#333333" />
        </linearGradient>
        <radialGradient id="nextjsGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="rgba(80, 80, 80, 0.3)" />
          <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
        </radialGradient>
      </defs>
      
      <circle cx="100" cy="100" r="75" fill="url(#nextjsGlow)" />
      
      <g transform="translate(65, 65) scale(0.7)">
        <path 
          d="M50,10 L50,90 L10,90 L10,10 L50,10 Z" 
          fill="url(#nextjsGradient)"
          strokeWidth="2"
          stroke="#ffffff"
        />
        
        <path 
          d="M10,10 L50,90" 
          strokeWidth="3"
          stroke="#ffffff"
          fill="none"
        />
      </g>
      
      <g transform="translate(125, 175)">
        <rect width="60" height="15" rx="7.5" fill="#000000" stroke="#ffffff" strokeWidth="0.5" />
        <text x="5" y="11" fill="#ffffff" fontFamily="monospace" fontSize="10">
          Next.js
        </text>
      </g>
    </svg>
  );
} 