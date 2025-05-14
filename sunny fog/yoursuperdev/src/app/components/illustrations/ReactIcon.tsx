import React from 'react';

interface ReactIconProps {
  className?: string;
  width?: number;
  height?: number;
}

export function ReactIcon({ className = "", width = 200, height = 200 }: ReactIconProps) {
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
        <linearGradient id="reactGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#61DAFB" />
          <stop offset="100%" stopColor="#00B5E2" />
        </linearGradient>
        <radialGradient id="reactGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="rgba(97, 218, 251, 0.3)" />
          <stop offset="100%" stopColor="rgba(97, 218, 251, 0)" />
        </radialGradient>
      </defs>
      
      <circle cx="100" cy="100" r="80" fill="url(#reactGlow)" />
      
      <g transform="translate(100, 100)">
        <ellipse 
          cx="0" cy="0" rx="50" ry="20" 
          fill="none" 
          stroke="url(#reactGradient)" 
          strokeWidth="2"
          transform="rotate(0)"
        />
        
        <ellipse 
          cx="0" cy="0" rx="50" ry="20" 
          fill="none" 
          stroke="url(#reactGradient)" 
          strokeWidth="2"
          transform="rotate(60)"
        />
        
        <ellipse 
          cx="0" cy="0" rx="50" ry="20" 
          fill="none" 
          stroke="url(#reactGradient)" 
          strokeWidth="2"
          transform="rotate(120)"
        />
      </g>
      
      <circle cx="100" cy="100" r="12" fill="url(#reactGradient)" />
      
      <g transform="translate(40, 55)">
        <rect width="60" height="35" rx="4" fill="rgba(15, 23, 42, 0.7)" stroke="#61DAFB" strokeWidth="0.5" />
        <text x="5" y="15" fill="#61DAFB" fontFamily="monospace" fontSize="7">
          const [state,
        </text>
        <text x="5" y="25" fill="#61DAFB" fontFamily="monospace" fontSize="7">
          setState] = 
        </text>
        <text x="5" y="35" fill="#61DAFB" fontFamily="monospace" fontSize="7">
          useState();
        </text>
      </g>
    </svg>
  );
} 