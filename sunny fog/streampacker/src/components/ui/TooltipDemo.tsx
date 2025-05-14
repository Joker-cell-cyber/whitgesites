"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

// Lazy-load the Tooltip component
const Tooltip = dynamic(() => import('./Tooltip'), {
  ssr: false,
  loading: () => <span className="inline-block p-2 bg-zinc-800 text-white rounded">Loading...</span>
});

// Placeholder component for when tooltips are not yet loaded
function PlaceholderButton({children, className = ''}: {children: React.ReactNode, className?: string}) {
  return (
    <button className={`px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded ${className}`}>
      {children}
    </button>
  );
}

export default function TooltipDemo() {
  // State to delay loading tooltips until component is mounted
  const [shouldLoadTooltips, setShouldLoadTooltips] = useState(false);
  
  // Load tooltips after component mounts
  React.useEffect(() => {
    // Small delay to reduce initial page load impact
    const timer = setTimeout(() => {
      setShouldLoadTooltips(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!shouldLoadTooltips) {
    // Return a placeholder version with reduced interactivity
    return (
      <div className="flex flex-col gap-10 items-center justify-center min-h-[40vh] p-8">
        <h2 className="text-2xl font-bold mb-6">Tooltip Components</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Simplified grid of placeholders */}
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-sm font-semibold mb-2">Positions</h3>
            {['Top', 'Bottom', 'Left', 'Right'].map(pos => (
              <PlaceholderButton key={pos}>{pos}</PlaceholderButton>
            ))}
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-sm font-semibold mb-2">Colors</h3>
            {['Blue', 'Purple', 'Green', 'Orange'].map((color, i) => (
              <PlaceholderButton 
                key={color}
                className={i === 0 ? 'bg-cyan-900' : i === 1 ? 'bg-purple-900' : i === 2 ? 'bg-emerald-900' : 'bg-orange-900'}
              >
                {color}
              </PlaceholderButton>
            ))}
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-sm font-semibold mb-2">Delays</h3>
            {['0ms', '100ms', '300ms', '1000ms'].map(delay => (
              <PlaceholderButton key={delay}>{delay}</PlaceholderButton>
            ))}
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-sm font-semibold mb-2">Custom Styling</h3>
            {['Wide', 'Multiline', 'Glitchy'].map(style => (
              <PlaceholderButton key={style}>{style}</PlaceholderButton>
            ))}
            <div className="w-8 h-8 bg-emerald-600 rounded-full cursor-help flex items-center justify-center text-white">
              ?
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Full component with tooltips loaded
  return (
    <div className="flex flex-col gap-10 items-center justify-center min-h-[40vh] p-8">
      <h2 className="text-2xl font-bold mb-6">Tooltip Components</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {/* Position variations */}
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-sm font-semibold mb-2">Positions</h3>
          <Tooltip text="Top tooltip (default)" position="top">
            <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded">
              Top
            </button>
          </Tooltip>
          
          <Tooltip text="Bottom tooltip" position="bottom">
            <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded">
              Bottom
            </button>
          </Tooltip>
          
          <Tooltip text="Left tooltip" position="left">
            <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded">
              Left
            </button>
          </Tooltip>
          
          <Tooltip text="Right tooltip" position="right">
            <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded">
              Right
            </button>
          </Tooltip>
        </div>
        
        {/* Color variations */}
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-sm font-semibold mb-2">Colors</h3>
          <Tooltip text="Blue tooltip (default)" color="blue">
            <button className="px-4 py-2 bg-cyan-900 hover:bg-cyan-800 text-white rounded">
              Blue
            </button>
          </Tooltip>
          
          <Tooltip text="Purple tooltip" color="purple">
            <button className="px-4 py-2 bg-purple-900 hover:bg-purple-800 text-white rounded">
              Purple
            </button>
          </Tooltip>
          
          <Tooltip text="Green tooltip" color="green">
            <button className="px-4 py-2 bg-emerald-900 hover:bg-emerald-800 text-white rounded">
              Green
            </button>
          </Tooltip>
          
          <Tooltip text="Orange tooltip" color="orange">
            <button className="px-4 py-2 bg-orange-900 hover:bg-orange-800 text-white rounded">
              Orange
            </button>
          </Tooltip>
        </div>
        
        {/* Delay variations */}
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-sm font-semibold mb-2">Delays</h3>
          <Tooltip text="No delay" delay={0}>
            <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded">
              0ms
            </button>
          </Tooltip>
          
          <Tooltip text="Short delay" delay={100}>
            <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded">
              100ms
            </button>
          </Tooltip>
          
          <Tooltip text="Default delay" delay={300}>
            <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded">
              300ms
            </button>
          </Tooltip>
          
          <Tooltip text="Long delay" delay={1000}>
            <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded">
              1000ms
            </button>
          </Tooltip>
        </div>
        
        {/* Custom styling */}
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-sm font-semibold mb-2">Custom Styling</h3>
          <Tooltip 
            text="Custom styling with extended width" 
            className="max-w-[200px] bg-gradient-to-r from-black/90 to-zinc-900/90 border-2"
          >
            <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded">
              Wide
            </button>
          </Tooltip>
          
          <Tooltip 
            text="Multiple lines tooltip content example that wraps to next line" 
            className="max-w-[150px] whitespace-normal"
          >
            <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded">
              Multiline
            </button>
          </Tooltip>
          
          <Tooltip 
            text="Glitchy cyberpunk effect" 
            className="animate-pulse border-dashed"
            color="purple"
          >
            <button className="px-4 py-2 bg-purple-900 hover:bg-purple-800 text-white rounded">
              Glitchy
            </button>
          </Tooltip>
          
          <Tooltip 
            text="Tooltip on any element" 
            color="green"
          >
            <div className="w-8 h-8 bg-emerald-600 rounded-full cursor-help flex items-center justify-center text-white">
              ?
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  );
} 