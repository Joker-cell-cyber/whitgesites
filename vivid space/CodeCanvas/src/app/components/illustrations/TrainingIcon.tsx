import React from 'react';

interface IconProps {
  className?: string;
  width?: number;
  height?: number;
}

export function TrainingIcon({ className = "", width = 32, height = 32 }: IconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height} 
      viewBox="0 0 64 64" 
      fill="none" 
      className={className}
    >
      <path 
        d="M7 25L32 12L57 25L32 38L7 25Z" 
        fill="#4CAF50" 
        fillOpacity="0.2" 
      />
      <path 
        d="M7 25L32 12L57 25L32 38L7 25Z" 
        stroke="#4CAF50" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d="M17 30V44" 
        stroke="#4CAF50" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d="M48 31V42C48 42 41 49 32 49C23 49 16 42 16 42V31" 
        stroke="#4CAF50" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d="M32 38V49" 
        stroke="#4CAF50" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d="M26 16L32 12L38 16" 
        stroke="#4CAF50" 
        strokeWidth="2" 
        strokeLinecap="round" 
      />
      <circle cx="17" cy="44" r="3" fill="#4CAF50" fillOpacity="0.4" />
      <path 
        d="M40 33L44 30M24 33L20 30" 
        stroke="#4CAF50" 
        strokeWidth="2" 
        strokeLinecap="round" 
      />
      <path 
        d="M32 20L32 26" 
        stroke="#4CAF50" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeDasharray="1 2" 
      />
    </svg>
  );
} 