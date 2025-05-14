import React from 'react';

interface CodeSnippetProps {
  className?: string;
  width?: number;
  height?: number;
}

export function CodeSnippet({ className = "", width = 500, height = 400 }: CodeSnippetProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height} 
      viewBox="0 0 500 400" 
      fill="none" 
      className={className}
    >
      {/* Background of the code editor */}
      <rect width="500" height="400" rx="12" fill="#1E1E1E" />
      
      {/* Code editor header */}
      <rect width="500" height="30" rx="8" fill="#2D2D2D" />
      
      {/* Traffic lights */}
      <circle cx="15" cy="15" r="6" fill="#FF5F56" />
      <circle cx="35" cy="15" r="6" fill="#FFBD2E" />
      <circle cx="55" cy="15" r="6" fill="#27C93F" />
      
      {/* Editor content area */}
      <rect x="10" y="40" width="480" height="350" rx="4" fill="#2D2D2D" />
      
      {/* Line numbers */}
      <rect x="10" y="40" width="30" height="350" fill="#1E1E1E" />
      
      {/* Line numbers text */}
      <text x="25" y="65" fontSize="12" fontFamily="monospace" fill="#6D6D6D" textAnchor="middle">1</text>
      <text x="25" y="85" fontSize="12" fontFamily="monospace" fill="#6D6D6D" textAnchor="middle">2</text>
      <text x="25" y="105" fontSize="12" fontFamily="monospace" fill="#6D6D6D" textAnchor="middle">3</text>
      <text x="25" y="125" fontSize="12" fontFamily="monospace" fill="#6D6D6D" textAnchor="middle">4</text>
      <text x="25" y="145" fontSize="12" fontFamily="monospace" fill="#6D6D6D" textAnchor="middle">5</text>
      <text x="25" y="165" fontSize="12" fontFamily="monospace" fill="#6D6D6D" textAnchor="middle">6</text>
      <text x="25" y="185" fontSize="12" fontFamily="monospace" fill="#6D6D6D" textAnchor="middle">7</text>
      <text x="25" y="205" fontSize="12" fontFamily="monospace" fill="#6D6D6D" textAnchor="middle">8</text>
      <text x="25" y="225" fontSize="12" fontFamily="monospace" fill="#6D6D6D" textAnchor="middle">9</text>
      <text x="25" y="245" fontSize="12" fontFamily="monospace" fill="#6D6D6D" textAnchor="middle">10</text>
      <text x="25" y="265" fontSize="12" fontFamily="monospace" fill="#6D6D6D" textAnchor="middle">11</text>
      <text x="25" y="285" fontSize="12" fontFamily="monospace" fill="#6D6D6D" textAnchor="middle">12</text>
      <text x="25" y="305" fontSize="12" fontFamily="monospace" fill="#6D6D6D" textAnchor="middle">13</text>
      <text x="25" y="325" fontSize="12" fontFamily="monospace" fill="#6D6D6D" textAnchor="middle">14</text>
      <text x="25" y="345" fontSize="12" fontFamily="monospace" fill="#6D6D6D" textAnchor="middle">15</text>
      
      {/* Code snippet */}
      {/* Line 1 */}
      <text x="50" y="65" fontSize="12" fontFamily="monospace" fill="#569CD6">import</text>
      <text x="92" y="65" fontSize="12" fontFamily="monospace" fill="#C8C8C8">{" React, { useState, useEffect }"}</text>
      <text x="300" y="65" fontSize="12" fontFamily="monospace" fill="#569CD6">from</text>
      <text x="330" y="65" fontSize="12" fontFamily="monospace" fill="#CE9178">'react'</text>
      <text x="370" y="65" fontSize="12" fontFamily="monospace" fill="#C8C8C8">;</text>
      
      {/* Line 2 */}
      <text x="50" y="85" fontSize="12" fontFamily="monospace" fill="#C8C8C8"></text>
      
      {/* Line 3 */}
      <text x="50" y="105" fontSize="12" fontFamily="monospace" fill="#569CD6">const</text>
      <text x="85" y="105" fontSize="12" fontFamily="monospace" fill="#4EC9B0"> App </text>
      <text x="110" y="105" fontSize="12" fontFamily="monospace" fill="#C8C8C8">= () </text>
      <text x="135" y="105" fontSize="12" fontFamily="monospace" fill="#569CD6">=&gt;</text>
      <text x="150" y="105" fontSize="12" fontFamily="monospace" fill="#C8C8C8">{"{"}</text>
      
      {/* Line 4 */}
      <text x="50" y="125" fontSize="12" fontFamily="monospace" fill="#C8C8C8">  </text>
      <text x="65" y="125" fontSize="12" fontFamily="monospace" fill="#569CD6">const</text>
      <text x="100" y="125" fontSize="12" fontFamily="monospace" fill="#C8C8C8"> [</text>
      <text x="108" y="125" fontSize="12" fontFamily="monospace" fill="#9CDCFE">data</text>
      <text x="133" y="125" fontSize="12" fontFamily="monospace" fill="#C8C8C8">, </text>
      <text x="140" y="125" fontSize="12" fontFamily="monospace" fill="#9CDCFE">setData</text>
      <text x="182" y="125" fontSize="12" fontFamily="monospace" fill="#C8C8C8">] = </text>
      <text x="198" y="125" fontSize="12" fontFamily="monospace" fill="#4FC1FF">useState</text>
      <text x="245" y="125" fontSize="12" fontFamily="monospace" fill="#C8C8C8">([]);</text>
      
      {/* Line 5 */}
      <text x="50" y="145" fontSize="12" fontFamily="monospace" fill="#C8C8C8"></text>
      
      {/* Line 6 */}
      <text x="50" y="165" fontSize="12" fontFamily="monospace" fill="#C8C8C8">  </text>
      <text x="65" y="165" fontSize="12" fontFamily="monospace" fill="#4FC1FF">useEffect</text>
      <text x="123" y="165" fontSize="12" fontFamily="monospace" fill="#C8C8C8">(() </text>
      <text x="145" y="165" fontSize="12" fontFamily="monospace" fill="#569CD6">=&gt;</text>
      <text x="160" y="165" fontSize="12" fontFamily="monospace" fill="#C8C8C8">{"{"}</text>
      
      {/* Line 7 */}
      <text x="50" y="185" fontSize="12" fontFamily="monospace" fill="#C8C8C8">    </text>
      <text x="80" y="185" fontSize="12" fontFamily="monospace" fill="#569CD6">const</text>
      <text x="115" y="185" fontSize="12" fontFamily="monospace" fill="#9CDCFE"> fetchData </text>
      <text x="175" y="185" fontSize="12" fontFamily="monospace" fill="#C8C8C8">= </text>
      <text x="185" y="185" fontSize="12" fontFamily="monospace" fill="#569CD6">async</text>
      <text x="220" y="185" fontSize="12" fontFamily="monospace" fill="#C8C8C8"> () </text>
      <text x="235" y="185" fontSize="12" fontFamily="monospace" fill="#569CD6">=&gt;</text>
      <text x="250" y="185" fontSize="12" fontFamily="monospace" fill="#C8C8C8">{"{"}</text>
      
      {/* Line 8 */}
      <text x="50" y="205" fontSize="12" fontFamily="monospace" fill="#C8C8C8">      </text>
      <text x="95" y="205" fontSize="12" fontFamily="monospace" fill="#569CD6">try</text>
      <text x="115" y="205" fontSize="12" fontFamily="monospace" fill="#C8C8C8">{"{"}</text>
      
      {/* Line 9 */}
      <text x="50" y="225" fontSize="12" fontFamily="monospace" fill="#C8C8C8">        </text>
      <text x="110" y="225" fontSize="12" fontFamily="monospace" fill="#569CD6">const</text>
      <text x="145" y="225" fontSize="12" fontFamily="monospace" fill="#9CDCFE"> response </text>
      <text x="205" y="225" fontSize="12" fontFamily="monospace" fill="#C8C8C8">= </text>
      <text x="215" y="225" fontSize="12" fontFamily="monospace" fill="#569CD6">await</text>
      <text x="250" y="225" fontSize="12" fontFamily="monospace" fill="#4FC1FF"> fetch</text>
      <text x="285" y="225" fontSize="12" fontFamily="monospace" fill="#C8C8C8">(</text>
      <text x="290" y="225" fontSize="12" fontFamily="monospace" fill="#CE9178">'https://api.example.com/data'</text>
      <text x="468" y="225" fontSize="12" fontFamily="monospace" fill="#C8C8C8">);</text>
      
      {/* Line 10 */}
      <text x="50" y="245" fontSize="12" fontFamily="monospace" fill="#C8C8C8">        </text>
      <text x="110" y="245" fontSize="12" fontFamily="monospace" fill="#569CD6">const</text>
      <text x="145" y="245" fontSize="12" fontFamily="monospace" fill="#9CDCFE"> result </text>
      <text x="190" y="245" fontSize="12" fontFamily="monospace" fill="#C8C8C8">= </text>
      <text x="200" y="245" fontSize="12" fontFamily="monospace" fill="#569CD6">await</text>
      <text x="235" y="245" fontSize="12" fontFamily="monospace" fill="#9CDCFE"> response</text>
      <text x="290" y="245" fontSize="12" fontFamily="monospace" fill="#C8C8C8">.</text>
      <text x="295" y="245" fontSize="12" fontFamily="monospace" fill="#4FC1FF">json</text>
      <text x="319" y="245" fontSize="12" fontFamily="monospace" fill="#C8C8C8">();</text>
      
      {/* Line 11 */}
      <text x="50" y="265" fontSize="12" fontFamily="monospace" fill="#C8C8C8">        </text>
      <text x="110" y="265" fontSize="12" fontFamily="monospace" fill="#4FC1FF">setData</text>
      <text x="155" y="265" fontSize="12" fontFamily="monospace" fill="#C8C8C8">(</text>
      <text x="160" y="265" fontSize="12" fontFamily="monospace" fill="#9CDCFE">result</text>
      <text x="195" y="265" fontSize="12" fontFamily="monospace" fill="#C8C8C8">);</text>
      
      {/* Line 12 */}
      <text x="50" y="285" fontSize="12" fontFamily="monospace" fill="#C8C8C8">      {"}"} </text>
      <text x="117" y="285" fontSize="12" fontFamily="monospace" fill="#569CD6">catch</text>
      <text x="150" y="285" fontSize="12" fontFamily="monospace" fill="#C8C8C8">(</text>
      <text x="157" y="285" fontSize="12" fontFamily="monospace" fill="#9CDCFE">error</text>
      <text x="187" y="285" fontSize="12" fontFamily="monospace" fill="#C8C8C8">) {"{"}</text>
      
      {/* Line 13 */}
      <text x="50" y="305" fontSize="12" fontFamily="monospace" fill="#C8C8C8">        </text>
      <text x="110" y="305" fontSize="12" fontFamily="monospace" fill="#4FC1FF">console</text>
      <text x="155" y="305" fontSize="12" fontFamily="monospace" fill="#C8C8C8">.</text>
      <text x="160" y="305" fontSize="12" fontFamily="monospace" fill="#4FC1FF">error</text>
      <text x="190" y="305" fontSize="12" fontFamily="monospace" fill="#C8C8C8">(</text>
      <text x="195" y="305" fontSize="12" fontFamily="monospace" fill="#CE9178">'Error fetching data:'</text>
      <text x="330" y="305" fontSize="12" fontFamily="monospace" fill="#C8C8C8">, </text>
      <text x="337" y="305" fontSize="12" fontFamily="monospace" fill="#9CDCFE">error</text>
      <text x="367" y="305" fontSize="12" fontFamily="monospace" fill="#C8C8C8">);</text>
      
      {/* Line 14-15 closing brackets */}
      <text x="50" y="325" fontSize="12" fontFamily="monospace" fill="#C8C8C8">      {"}"}</text>
      <text x="50" y="345" fontSize="12" fontFamily="monospace" fill="#C8C8C8">    {"}"};</text>
      
      {/* Cursor blinking animation */}
      <rect id="cursor" x="200" y="257" width="2" height="14" fill="#FFFFFF">
        <animate attributeName="opacity" values="1;0;1" dur="1.5s" repeatCount="indefinite" />
      </rect>
      
      {/* Highlight rectangle */}
      <rect x="110" y="260" width="85" height="15" rx="2" fill="#264F78" opacity="0.3" />
      
      {/* Flow lines for animation effect */}
      <path 
        d="M40 50 L480 50" 
        stroke="#7B61FF" 
        strokeWidth="0.5" 
        strokeDasharray="2,3" 
        opacity="0.3"
      >
        <animate attributeName="strokeDashoffset" values="0;100" dur="20s" repeatCount="indefinite" />
      </path>
      
      <path 
        d="M40 350 L480 350" 
        stroke="#7B61FF" 
        strokeWidth="0.5" 
        strokeDasharray="2,3" 
        opacity="0.3"
      >
        <animate attributeName="strokeDashoffset" values="0;-100" dur="25s" repeatCount="indefinite" />
      </path>
    </svg>
  );
} 