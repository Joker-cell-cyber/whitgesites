import React from 'react';

interface IconProps {
  className?: string;
  width?: number;
  height?: number;
}

export function DataIcon({ className = "", width = 32, height = 32 }: IconProps) {
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
        d="M32 16C42.1 16 50.3 13.5 50.3 10.5C50.3 7.5 42.1 5 32 5C21.9 5 13.7 7.5 13.7 10.5C13.7 13.5 21.9 16 32 16Z" 
        fill="#4285F4" 
        fillOpacity="0.2" 
      />
      <path 
        d="M50.3 10.5V19.5C50.3 22.5 42.1 25 32 25C21.9 25 13.7 22.5 13.7 19.5V10.5"
        stroke="#4285F4" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d="M50.3 19.5V28.5C50.3 31.5 42.1 34 32 34C21.9 34 13.7 31.5 13.7 28.5V19.5"
        stroke="#4285F4" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d="M50.3 28.5V37.5C50.3 40.5 42.1 43 32 43C21.9 43 13.7 40.5 13.7 37.5V28.5"
        stroke="#4285F4" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d="M50.3 37.5V46.5C50.3 49.5 42.1 52 32 52C21.9 52 13.7 49.5 13.7 46.5V37.5"
        stroke="#4285F4" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d="M43 25L39 30M25 32L20 38M36 41L42 46"
        stroke="#4285F4" 
        strokeWidth="2" 
        strokeLinecap="round" 
      />
      <circle cx="45" cy="22" r="3" fill="#4285F4" fillOpacity="0.4" />
      <circle cx="18" cy="40" r="3" fill="#4285F4" fillOpacity="0.4" />
      <circle cx="34" cy="44" r="3" fill="#4285F4" fillOpacity="0.4" />
    </svg>
  );
} 