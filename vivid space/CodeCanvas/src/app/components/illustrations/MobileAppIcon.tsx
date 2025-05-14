import React from 'react';

interface MobileAppIconProps {
  className?: string;
  width?: number;
  height?: number;
}

export function MobileAppIcon({ className = "", width = 200, height = 200 }: MobileAppIconProps) {
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
        <linearGradient id="mobileGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF416C" />
          <stop offset="100%" stopColor="#FF4B2B" />
        </linearGradient>
      </defs>
      
      {/* Base Phone */}
      <rect x="65" y="15" width="70" height="170" rx="15" fill="#333333" />
      <rect x="70" y="25" width="60" height="140" rx="3" fill="#F5F5F5" />
      
      {/* Phone elements */}
      <circle cx="100" cy="175" r="8" fill="#222222" />
      <rect x="85" y="20" width="30" height="3" rx="1.5" fill="#222222" />
      
      {/* App UI Elements */}
      <rect x="75" y="30" width="50" height="10" rx="2" fill="#4A91FF" />
      
      <rect x="75" y="45" width="50" height="30" rx="3" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="1" />
      <rect x="80" y="50" width="25" height="4" rx="1" fill="#333333" />
      <rect x="80" y="58" width="40" height="3" rx="1" fill="#E0E0E0" />
      <rect x="80" y="65" width="30" height="3" rx="1" fill="#E0E0E0" />
      
      <rect x="75" y="80" width="50" height="30" rx="3" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="1" />
      <rect x="80" y="85" width="25" height="4" rx="1" fill="#333333" />
      <rect x="80" y="93" width="40" height="3" rx="1" fill="#E0E0E0" />
      <rect x="80" y="100" width="30" height="3" rx="1" fill="#E0E0E0" />
      
      <rect x="75" y="115" width="50" height="30" rx="3" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="1" />
      <circle cx="85" cy="125" r="5" fill="url(#mobileGradient)" />
      <rect x="95" y="122" width="25" height="3" rx="1" fill="#333333" />
      <rect x="95" y="129" width="20" height="3" rx="1" fill="#E0E0E0" />
      <rect x="95" y="136" width="15" height="3" rx="1" fill="#E0E0E0" />
      
      {/* Navigation Dots */}
      <circle cx="90" cy="155" r="2" fill="#333333" />
      <circle cx="100" cy="155" r="2" fill="#4A91FF" />
      <circle cx="110" cy="155" r="2" fill="#333333" />
      
      {/* Floating Elements */}
      <rect x="38" y="50" width="25" height="25" rx="3" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="1" filter="drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.1))">
        <animate attributeName="y" values="50;45;50" dur="4s" repeatCount="indefinite" />
      </rect>
      <circle cx="50" cy="60" r="8" fill="url(#mobileGradient)" opacity="0.9">
        <animate attributeName="cy" values="60;55;60" dur="4s" repeatCount="indefinite" />
      </circle>
      <path d="M50 55 L50 65 M45 60 L55 60" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round">
        <animate attributeName="transform" values="translate(0,0);translate(0,-5);translate(0,0)" dur="4s" repeatCount="indefinite" />
      </path>
      
      <rect x="138" y="100" width="25" height="25" rx="3" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="1" filter="drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.1))">
        <animate attributeName="y" values="100;105;100" dur="3.5s" repeatCount="indefinite" />
      </rect>
      <circle cx="150" cy="112" r="8" fill="url(#mobileGradient)" opacity="0.9">
        <animate attributeName="cy" values="112;117;112" dur="3.5s" repeatCount="indefinite" />
      </circle>
      <rect x="145" cy="112" width="10" height="2" rx="1" fill="#FFFFFF">
        <animate attributeName="cy" values="112;117;112" dur="3.5s" repeatCount="indefinite" />
      </rect>
      
      {/* Decoration */}
      <circle cx="40" cy="130" r="10" fill="url(#mobileGradient)" opacity="0.2">
        <animate attributeName="r" values="10;12;10" dur="5s" repeatCount="indefinite" />
      </circle>
      <circle cx="150" cy="50" r="12" fill="url(#mobileGradient)" opacity="0.2">
        <animate attributeName="r" values="12;14;12" dur="4s" repeatCount="indefinite" />
      </circle>
      
      {/* Connections */}
      <path d="M65 70 C55 70, 55 70, 50 65" stroke="#E0E0E0" strokeWidth="1" strokeDasharray="3,2">
        <animate attributeName="d" values="M65 70 C55 70, 55 70, 50 65;M65 70 C55 70, 55 70, 50 60;M65 70 C55 70, 55 70, 50 65" dur="4s" repeatCount="indefinite" />
      </path>
      
      <path d="M135 112 C140 112, 140 112, 145 112" stroke="#E0E0E0" strokeWidth="1" strokeDasharray="3,2">
        <animate attributeName="d" values="M135 112 C140 112, 140 112, 145 112;M135 112 C140 112, 140 112, 145 117;M135 112 C140 112, 140 112, 145 112" dur="3.5s" repeatCount="indefinite" />
      </path>
    </svg>
  );
} 