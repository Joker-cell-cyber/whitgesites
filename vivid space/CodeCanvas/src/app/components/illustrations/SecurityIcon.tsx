import React from 'react';

interface IconProps {
  className?: string;
  width?: number;
  height?: number;
}

export function SecurityIcon({ className = "", width = 32, height = 32 }: IconProps) {
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
        d="M32 58C32 58 53 50 53 32V14L32 6L11 14V32C11 50 32 58 32 58Z" 
        fill="#E53935" 
        fillOpacity="0.2" 
      />
      <path 
        d="M32 58C32 58 53 50 53 32V14L32 6L11 14V32C11 50 32 58 32 58Z" 
        stroke="#E53935" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d="M24 32L30 38L40 28" 
        stroke="#E53935" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d="M32 6V14M11 14L32 23L53 14M21.5 18.5L42.5 9.5" 
        stroke="#E53935" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d="M17 24V36M47 24V36" 
        stroke="#E53935" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeDasharray="1 4" 
      />
      <circle cx="32" cy="23" r="3" fill="#E53935" fillOpacity="0.4" />
    </svg>
  );
} 