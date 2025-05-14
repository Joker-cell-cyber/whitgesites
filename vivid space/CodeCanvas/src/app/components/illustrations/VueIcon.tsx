import React from 'react';

interface VueIconProps {
  className?: string;
  width?: number;
  height?: number;
}

export function VueIcon({ className = "", width = 200, height = 200 }: VueIconProps) {
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
        <linearGradient id="vueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#41B883" />
          <stop offset="100%" stopColor="#34495E" />
        </linearGradient>
        <radialGradient id="vueGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="rgba(65, 184, 131, 0.3)" />
          <stop offset="100%" stopColor="rgba(65, 184, 131, 0)" />
        </radialGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
          <feOffset dx="0" dy="2" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      <circle cx="100" cy="100" r="80" fill="url(#vueGlow)">
        <animate attributeName="r" values="80;85;80" dur="6s" repeatCount="indefinite" />
      </circle>
      
      <g filter="url(#shadow)" transform="translate(50, 70) scale(1)">
        <path d="M100 34.55L84.09 8.45H65.91L100 65.45L134.09 8.45H115.91L100 34.55Z" fill="#41B883" transform="translate(-50, 0)" />
        <path d="M84.09 8.45L100 34.55L115.91 8.45H134.09L100 65.45L65.91 8.45H84.09Z" fill="#35495E" transform="translate(-50, 0)" />
      </g>
      
      <g transform="translate(70, 30)">
        <rect width="60" height="15" rx="7.5" fill="rgba(65, 184, 131, 0.2)" stroke="#41B883" strokeWidth="0.5" />
        <text x="30" y="11" fill="#41B883" fontFamily="monospace" fontSize="8" textAnchor="middle">
          Vue.js
        </text>
      </g>
    </svg>
  );
} 