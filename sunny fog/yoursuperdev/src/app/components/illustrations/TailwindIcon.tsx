import React from 'react';

interface TailwindIconProps {
  className?: string;
  width?: number;
  height?: number;
}

export function TailwindIcon({ className = "", width = 200, height = 200 }: TailwindIconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height} 
      viewBox="0 0 200 200" 
      fill="none" 
      className={className}
    >
      {/* Définition des dégradés */}
      <defs>
        <linearGradient id="tailwindGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>
        <radialGradient id="tailwindGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="rgba(14, 165, 233, 0.3)" />
          <stop offset="100%" stopColor="rgba(14, 165, 233, 0)" />
        </radialGradient>
      </defs>
      
      {/* Fond avec effet de lueur */}
      <circle cx="100" cy="100" r="75" fill="url(#tailwindGlow)">
        <animate attributeName="r" values="75;80;75" dur="5s" repeatCount="indefinite" />
      </circle>
      
      {/* Nuage Tailwind stylisé */}
      <g transform="translate(50, 80) scale(1)">
        <path 
          d="M25,15 
           C21,15 18.5,16.5 17.5,19.5 
           C15.5,19.5 14,20.5 13,22.5 
           C11,25 13,27.5 15,28.5 
           L32.5,28.5 
           C35.5,28.5 37.5,26 37.5,23.5 
           C37.5,21 35.5,18.5 32.5,18.5 
           C32.5,16 30,15 25,15 Z" 
          fill="url(#tailwindGradient)"
        >
          <animate 
            attributeName="d" 
            values="
              M25,15 C21,15 18.5,16.5 17.5,19.5 C15.5,19.5 14,20.5 13,22.5 C11,25 13,27.5 15,28.5 L32.5,28.5 C35.5,28.5 37.5,26 37.5,23.5 C37.5,21 35.5,18.5 32.5,18.5 C32.5,16 30,15 25,15 Z;
              M25,16 C21,16 18.5,17.5 17.5,20.5 C15.5,20.5 14,21.5 13,23.5 C11,26 13,28.5 15,29.5 L32.5,29.5 C35.5,29.5 37.5,27 37.5,24.5 C37.5,22 35.5,19.5 32.5,19.5 C32.5,17 30,16 25,16 Z;
              M25,15 C21,15 18.5,16.5 17.5,19.5 C15.5,19.5 14,20.5 13,22.5 C11,25 13,27.5 15,28.5 L32.5,28.5 C35.5,28.5 37.5,26 37.5,23.5 C37.5,21 35.5,18.5 32.5,18.5 C32.5,16 30,15 25,15 Z"
            dur="8s"
            repeatCount="indefinite"
          />
        </path>
        
        <path 
          d="M75,15 
           C79,15 81.5,16.5 82.5,19.5 
           C84.5,19.5 86,20.5 87,22.5 
           C89,25 87,27.5 85,28.5 
           L67.5,28.5 
           C64.5,28.5 62.5,26 62.5,23.5 
           C62.5,21 64.5,18.5 67.5,18.5 
           C67.5,16 70,15 75,15 Z" 
          fill="url(#tailwindGradient)"
          opacity="0.7"
        >
          <animate 
            attributeName="d" 
            values="
              M75,15 C79,15 81.5,16.5 82.5,19.5 C84.5,19.5 86,20.5 87,22.5 C89,25 87,27.5 85,28.5 L67.5,28.5 C64.5,28.5 62.5,26 62.5,23.5 C62.5,21 64.5,18.5 67.5,18.5 C67.5,16 70,15 75,15 Z;
              M75,16 C79,16 81.5,17.5 82.5,20.5 C84.5,20.5 86,21.5 87,23.5 C89,26 87,28.5 85,29.5 L67.5,29.5 C64.5,29.5 62.5,27 62.5,24.5 C62.5,22 64.5,19.5 67.5,19.5 C67.5,17 70,16 75,16 Z;
              M75,15 C79,15 81.5,16.5 82.5,19.5 C84.5,19.5 86,20.5 87,22.5 C89,25 87,27.5 85,28.5 L67.5,28.5 C64.5,28.5 62.5,26 62.5,23.5 C62.5,21 64.5,18.5 67.5,18.5 C67.5,16 70,15 75,15 Z"
            dur="10s"
            repeatCount="indefinite"
          />
        </path>
      </g>
      
      {/* Éléments de classe CSS */}
      <g>
        <rect x="55" y="125" width="90" height="12" rx="6" fill="url(#tailwindGradient)" opacity="0.9">
          <animate attributeName="width" values="90;95;90" dur="6s" repeatCount="indefinite" />
        </rect>
        
        <g opacity="0.7">
          <rect x="62" y="130" width="20" height="2" rx="1" fill="white" />
          <rect x="86" y="130" width="15" height="2" rx="1" fill="white" />
          <rect x="105" y="130" width="18" height="2" rx="1" fill="white" />
          <rect x="127" y="130" width="10" height="2" rx="1" fill="white" />
        </g>
      </g>
      
      {/* Éléments de code qui flottent */}
      <g>
        <rect x="45" y="70" width="18" height="3" rx="1.5" fill="#0EA5E9" opacity="0.6">
          <animate attributeName="x" values="45;42;45" dur="4s" repeatCount="indefinite" />
        </rect>
        <rect x="45" y="76" width="12" height="3" rx="1.5" fill="#0EA5E9" opacity="0.6">
          <animate attributeName="x" values="45;42;45" dur="4s" repeatCount="indefinite" />
        </rect>
        
        <rect x="135" y="50" width="18" height="3" rx="1.5" fill="#38BDF8" opacity="0.6">
          <animate attributeName="x" values="135;138;135" dur="3.5s" repeatCount="indefinite" />
        </rect>
        <rect x="135" y="56" width="22" height="3" rx="1.5" fill="#38BDF8" opacity="0.6">
          <animate attributeName="x" values="135;138;135" dur="3.5s" repeatCount="indefinite" />
        </rect>
      </g>
      
      {/* Petits éléments flottants */}
      <g opacity="0.7">
        <path d="M40,150 L55,150 L47.5,160 Z" fill="#0EA5E9">
          <animate attributeName="transform" type="translate" values="0,0; 0,-3; 0,0" dur="5s" repeatCount="indefinite" />
        </path>
        
        <path d="M150,50 L165,50 L157.5,40 Z" fill="#38BDF8">
          <animate attributeName="transform" type="translate" values="0,0; 0,3; 0,0" dur="6s" repeatCount="indefinite" />
        </path>
        
        <circle cx="50" cy="40" r="5" fill="#0EA5E9" opacity="0.4">
          <animate attributeName="cy" values="40;37;40" dur="4s" repeatCount="indefinite" />
        </circle>
        
        <circle cx="150" cy="160" r="6" fill="#38BDF8" opacity="0.4">
          <animate attributeName="cy" values="160;163;160" dur="5s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
} 