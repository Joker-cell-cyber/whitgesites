import React from 'react';

interface AngularIconProps {
  className?: string;
  width?: number;
  height?: number;
}

export function AngularIcon({ className = "", width = 200, height = 200 }: AngularIconProps) {
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
        <linearGradient id="angularGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DD0031" />
          <stop offset="100%" stopColor="#C3002F" />
        </linearGradient>
        <linearGradient id="angularGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B3B3B3" />
          <stop offset="100%" stopColor="#E6E6E6" />
        </linearGradient>
        <radialGradient id="angularGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="rgba(221, 0, 49, 0.3)" />
          <stop offset="100%" stopColor="rgba(221, 0, 49, 0)" />
        </radialGradient>
        <filter id="angularShadow" x="-20%" y="-20%" width="140%" height="140%">
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
      
      <circle cx="100" cy="100" r="80" fill="url(#angularGlow)">
        <animate attributeName="r" values="80;85;80" dur="6s" repeatCount="indefinite" />
      </circle>
      
      <g filter="url(#angularShadow)" transform="translate(65, 50) scale(0.7)">
        <path 
          d="M100,0 L200,35 L185,168 L100,215 L15,168 L0,35 L100,0z" 
          fill="url(#angularGradient)"
        />
        
        <path 
          d="M100,0 L100,215 L185,168 L200,35 L100,0z" 
          fill="#A6120D" 
          opacity="0.8"
        />
        
        <path 
          d="M100,25 L40,175 L60,175 L75,135 L125,135 L140,175 L160,175 L100,25z M100,70 L115,115 L85,115 L100,70z" 
          fill="url(#angularGradient2)"
        />
      </g>
      
      <g transform="translate(35, 30)">
        <rect width="70" height="15" rx="7.5" fill="rgba(221, 0, 49, 0.2)" stroke="#DD0031" strokeWidth="0.5" />
        <text x="35" y="11" fill="#DD0031" fontFamily="monospace" fontSize="8" textAnchor="middle">
          Angular
        </text>
      </g>
    </svg>
  );
} 