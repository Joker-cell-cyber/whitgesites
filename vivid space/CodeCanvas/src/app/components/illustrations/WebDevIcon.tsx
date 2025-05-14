import React from 'react';

interface WebDevIconProps {
  className?: string;
  width?: number;
  height?: number;
}

export function WebDevIcon({ className = "", width = 200, height = 200 }: WebDevIconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height} 
      viewBox="0 0 200 200" 
      fill="none" 
      className={className}
    >
      {/* Background gradient */}
      <defs>
        <linearGradient id="webDevGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6A11CB" />
          <stop offset="100%" stopColor="#2575FC" />
        </linearGradient>
      </defs>
      
      {/* Main browser window */}
      <rect x="20" y="30" width="160" height="140" rx="8" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="2" />
      
      {/* Browser header */}
      <rect x="20" y="30" width="160" height="25" rx="8" fill="#F3F3F3" />
      <rect x="20" y="55" width="160" height="2" fill="#E0E0E0" />
      
      {/* Browser circles */}
      <circle cx="35" cy="42.5" r="5" fill="#FF5F56" />
      <circle cx="50" cy="42.5" r="5" fill="#FFBD2E" />
      <circle cx="65" cy="42.5" r="5" fill="#27C93F" />
      
      {/* Address bar */}
      <rect x="80" y="35" width="90" height="15" rx="3" fill="#E9E9E9" />
      <rect x="85" y="40" width="5" height="5" rx="1" fill="#B0B0B0" />
      <rect x="93" y="40" width="72" height="5" rx="1" fill="#B0B0B0" />
      
      {/* Content area */}
      {/* Header */}
      <rect x="35" y="70" width="90" height="10" rx="2" fill="#4A91FF" />
      <rect x="35" y="85" width="60" height="6" rx="1" fill="#E0E0E0" />
      <rect x="35" y="95" width="70" height="6" rx="1" fill="#E0E0E0" />
      
      {/* Navigation */}
      <rect x="140" y="70" width="25" height="8" rx="2" fill="#E0E0E0" />
      <rect x="140" y="82" width="25" height="8" rx="2" fill="#E0E0E0" />
      <rect x="140" y="94" width="25" height="8" rx="2" fill="#E0E0E0" />
      
      {/* Main content */}
      <rect x="35" y="115" width="65" height="40" rx="2" fill="#F5F5F5" />
      <rect x="40" y="120" width="55" height="5" rx="1" fill="#D0D0D0" />
      <rect x="40" y="130" width="45" height="5" rx="1" fill="#D0D0D0" />
      <rect x="40" y="140" width="50" height="5" rx="1" fill="#D0D0D0" />
      
      <rect x="110" y="115" width="55" height="40" rx="2" fill="#F5F5F5" />
      <rect x="115" y="120" width="45" height="5" rx="1" fill="#D0D0D0" />
      <rect x="115" y="130" width="40" height="5" rx="1" fill="#D0D0D0" />
      <rect x="115" y="140" width="35" height="5" rx="1" fill="#D0D0D0" />
      
      {/* Code brackets */}
      <path 
        d="M50 170 L40 160 L50 150" 
        stroke="#6A11CB" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        fill="none" 
      />
      
      <path 
        d="M70 170 L80 160 L70 150" 
        stroke="#2575FC" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        fill="none" 
      />
      
      {/* Design elements */}
      <circle cx="130" cy="160" r="15" fill="url(#webDevGradient)" opacity="0.8" />
      <rect x="120" cy="160" width="20" height="2" rx="1" fill="#FFFFFF" />
      <rect x="129" cy="151" width="2" height="20" rx="1" fill="#FFFFFF" />
      
      {/* Flying elements for animation */}
      <rect x="100" y="25" width="8" height="8" rx="2" fill="#6A11CB" opacity="0.8">
        <animate attributeName="y" values="25;20;25" dur="3s" repeatCount="indefinite" />
      </rect>
      
      <circle cx="90" cy="175" r="5" fill="#2575FC" opacity="0.8">
        <animate attributeName="cy" values="175;180;175" dur="4s" repeatCount="indefinite" />
      </circle>
      
      <rect x="160" y="150" width="6" height="6" rx="1" fill="#6A11CB" opacity="0.8" transform="rotate(45, 163, 153)">
        <animate attributeName="y" values="150;145;150" dur="3.5s" repeatCount="indefinite" />
      </rect>
    </svg>
  );
} 