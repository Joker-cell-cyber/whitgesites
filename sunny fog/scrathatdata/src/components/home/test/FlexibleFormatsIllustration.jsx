import React from 'react';

export function FlexibleFormatsIllustration() {
  return (
    <svg viewBox="0 0 400 250" className="w-full h-full">
      <defs>
        <linearGradient id="flexible-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.05" />
        </linearGradient>
        <filter id="shadow-format" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#8b5cf6" floodOpacity="0.2" />
        </filter>
        <linearGradient id="format-fill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      
      {/* Background */}
      <rect x="0" y="0" width="400" height="250" fill="url(#flexible-gradient)" rx="10" />
      
      {/* Central data processor */}
      <g transform="translate(200, 125)" filter="url(#shadow-format)">
        <circle cx="0" cy="0" r="45" fill="white" stroke="#8b5cf6" strokeWidth="1" />
        
        {/* Hexagon center design */}
        <polygon 
          points="0,-25 21.65,-12.5 21.65,12.5 0,25 -21.65,12.5 -21.65,-12.5" 
          fill="url(#format-fill)" 
          stroke="#8b5cf6" 
          strokeWidth="1"
        />
        
        {/* Central conversion icon */}
        <path 
          d="M-8,-8 L8,8 M-8,8 L8,-8" 
          stroke="#8b5cf6" 
          strokeWidth="2" 
          strokeLinecap="round"
        />
        
        {/* Rotating inner circle */}
        <circle cx="0" cy="0" r="15" fill="none" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="2,2">
          <animateTransform 
            attributeName="transform" 
            type="rotate" 
            from="0 0 0" 
            to="360 0 0" 
            dur="30s" 
            repeatCount="indefinite" 
          />
        </circle>
        
        {/* Pulsing glow */}
        <circle cx="0" cy="0" r="30" fill="#8b5cf6" opacity="0">
          <animate 
            attributeName="opacity" 
            values="0;0.1;0" 
            dur="3s" 
            repeatCount="indefinite" 
          />
          <animate 
            attributeName="r" 
            values="30;35;30" 
            dur="3s" 
            repeatCount="indefinite" 
          />
        </circle>
      </g>
      
      {/* Format nodes around the circle */}
      <g>
        {/* CSV format */}
        <g transform="translate(200, 45)" filter="url(#shadow-format)">
          <circle cx="0" cy="0" r="30" fill="white" stroke="#8b5cf6" strokeWidth="1" />
          <rect x="-15" y="-15" width="30" height="30" rx="3" fill="url(#format-fill)" />
          <text x="0" y="5" fontSize="12" fontWeight="bold" fill="#8b5cf6" textAnchor="middle">CSV</text>
          
          {/* Connection to center with animated particles */}
          <line x1="0" y1="30" x2="0" y2="70" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3,3" />
          <circle cx="0" cy="40" r="3" fill="#8b5cf6">
            <animate attributeName="cy" values="35;65;35" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>
        
        {/* JSON format */}
        <g transform="translate(320, 125)" filter="url(#shadow-format)">
          <circle cx="0" cy="0" r="30" fill="white" stroke="#8b5cf6" strokeWidth="1" />
          <rect x="-15" y="-15" width="30" height="30" rx="3" fill="url(#format-fill)" />
          <text x="0" y="5" fontSize="12" fontWeight="bold" fill="#8b5cf6" textAnchor="middle">JSON</text>
          
          {/* Connection to center with animated particles */}
          <line x1="-30" y1="0" x2="-75" y2="0" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3,3" />
          <circle cx="-45" cy="0" r="3" fill="#8b5cf6">
            <animate attributeName="cx" values="-35;-70;-35" dur="2s" begin="0.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;0" dur="2s" begin="0.5s" repeatCount="indefinite" />
          </circle>
        </g>
        
        {/* XML format */}
        <g transform="translate(200, 205)" filter="url(#shadow-format)">
          <circle cx="0" cy="0" r="30" fill="white" stroke="#8b5cf6" strokeWidth="1" />
          <rect x="-15" y="-15" width="30" height="30" rx="3" fill="url(#format-fill)" />
          <text x="0" y="5" fontSize="12" fontWeight="bold" fill="#8b5cf6" textAnchor="middle">XML</text>
          
          {/* Connection to center with animated particles */}
          <line x1="0" y1="-30" x2="0" y2="-50" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3,3" />
          <circle cx="0" cy="-40" r="3" fill="#8b5cf6">
            <animate attributeName="cy" values="-35;-45;-35" dur="2s" begin="1s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;0" dur="2s" begin="1s" repeatCount="indefinite" />
          </circle>
        </g>
        
        {/* Excel format */}
        <g transform="translate(80, 125)" filter="url(#shadow-format)">
          <circle cx="0" cy="0" r="30" fill="white" stroke="#8b5cf6" strokeWidth="1" />
          <rect x="-15" y="-15" width="30" height="30" rx="3" fill="url(#format-fill)" />
          <text x="0" y="5" fontSize="12" fontWeight="bold" fill="#8b5cf6" textAnchor="middle">XLS</text>
          
          {/* Connection to center with animated particles */}
          <line x1="30" y1="0" x2="75" y2="0" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3,3" />
          <circle cx="45" cy="0" r="3" fill="#8b5cf6">
            <animate attributeName="cx" values="35;70;35" dur="2s" begin="1.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;0" dur="2s" begin="1.5s" repeatCount="indefinite" />
          </circle>
        </g>
      </g>
      
      {/* Detailed format previews in corners */}
      <g>
        {/* CSV preview */}
        <g transform="translate(50, 30)">
          <rect width="60" height="45" rx="3" fill="white" stroke="#8b5cf6" strokeWidth="1" filter="url(#shadow-format)" />
          <line x1="0" y1="15" x2="60" y2="15" stroke="#8b5cf6" strokeWidth="0.5" />
          <line x1="20" y1="0" x2="20" y2="45" stroke="#8b5cf6" strokeWidth="0.5" />
          <line x1="40" y1="0" x2="40" y2="45" stroke="#8b5cf6" strokeWidth="0.5" />
          <line x1="0" y1="30" x2="60" y2="30" stroke="#8b5cf6" strokeWidth="0.5" />
          <rect width="60" height="10" rx="3" fill="#8b5cf6" opacity="0.1" />
        </g>
        
        {/* JSON preview */}
        <g transform="translate(350, 30)">
          <rect width="60" height="45" rx="3" fill="white" stroke="#8b5cf6" strokeWidth="1" filter="url(#shadow-format)" />
          <g transform="translate(5, 12)">
            <text fontSize="6" fill="#8b5cf6">
              <tspan x="0" y="0">{"{"}</tspan>
              <tspan x="5" y="8">{`"id": "001",`}</tspan>
              <tspan x="5" y="16">{`"name": "item",`}</tspan>
              <tspan x="5" y="24">{`"price": "$99.99"`}</tspan>
              <tspan x="0" y="32">{"}"}</tspan>
            </text>
          </g>
        </g>
        
        {/* Excel preview */}
        <g transform="translate(50, 180)">
          <rect width="60" height="45" rx="3" fill="white" stroke="#8b5cf6" strokeWidth="1" filter="url(#shadow-format)" />
          <rect width="60" height="10" rx="3" fill="#8b5cf6" opacity="0.1" />
          <line x1="0" y1="10" x2="60" y2="10" stroke="#8b5cf6" strokeWidth="0.5" />
          <line x1="0" y1="20" x2="60" y2="20" stroke="#8b5cf6" strokeWidth="0.5" />
          <line x1="0" y1="30" x2="60" y2="30" stroke="#8b5cf6" strokeWidth="0.5" />
          <line x1="15" y1="0" x2="15" y2="45" stroke="#8b5cf6" strokeWidth="0.5" />
          <line x1="30" y1="0" x2="30" y2="45" stroke="#8b5cf6" strokeWidth="0.5" />
          <line x1="45" y1="0" x2="45" y2="45" stroke="#8b5cf6" strokeWidth="0.5" />
        </g>
        
        {/* XML preview */}
        <g transform="translate(350, 180)">
          <rect width="60" height="45" rx="3" fill="white" stroke="#8b5cf6" strokeWidth="1" filter="url(#shadow-format)" />
          <g transform="translate(5, 8)">
            <text fontSize="6" fill="#8b5cf6">
              <tspan x="0" y="0">{"<product>"}</tspan>
              <tspan x="5" y="8">{"<id>001</id>"}</tspan>
              <tspan x="5" y="16">{"<name>item</name>"}</tspan>
              <tspan x="5" y="24">{"<price>$99.99</price>"}</tspan>
              <tspan x="0" y="32">{"</product>"}</tspan>
            </text>
          </g>
        </g>
      </g>
      
      {/* Additional animated particles */}
      <g>
        <circle cx="200" cy="125" r="2" fill="#8b5cf6">
          <animate attributeName="cx" values="200;230;200;170;200" dur="10s" repeatCount="indefinite" />
          <animate attributeName="cy" values="125;140;160;140;125" dur="10s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0.4;0.8" dur="4s" repeatCount="indefinite" />
        </circle>
        
        <circle cx="200" cy="125" r="3" fill="#8b5cf6">
          <animate attributeName="cx" values="200;180;200;220;200" dur="12s" begin="1s" repeatCount="indefinite" />
          <animate attributeName="cy" values="125;100;80;100;125" dur="12s" begin="1s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0.4;0.8" dur="5s" begin="1s" repeatCount="indefinite" />
        </circle>
        
        <circle cx="200" cy="125" r="2" fill="#8b5cf6">
          <animate attributeName="cx" values="200;170;150;170;200" dur="9s" begin="2s" repeatCount="indefinite" />
          <animate attributeName="cy" values="125;150;125;100;125" dur="9s" begin="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0.4;0.8" dur="4.5s" begin="2s" repeatCount="indefinite" />
        </circle>
      </g>
      
      {/* Main title */}
      <text x="200" y="230" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#8b5cf6">Formats de données flexibles</text>
    </svg>
  );
}

export default FlexibleFormatsIllustration; 