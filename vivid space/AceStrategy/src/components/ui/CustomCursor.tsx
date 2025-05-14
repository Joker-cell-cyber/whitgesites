"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

type CustomCursorProps = {
  enabled?: boolean;
};

export default function CustomCursor({ enabled = true }: CustomCursorProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  // Handle cursor position
  useEffect(() => {
    if (!enabled) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    
    const handleMouseDown = () => setClicking(true);
    const handleMouseUp = () => setClicking(false);
    
    const handleMouseEnter = () => setVisible(true);
    const handleMouseLeave = () => setVisible(false);
    
    // Track hover state over clickable elements
    const handleElementsHover = () => {
      const handleElementMouseEnter = () => setHovering(true);
      const handleElementMouseLeave = () => setHovering(false);
      
      const clickableElements = document.querySelectorAll('a, button, [role="button"], input, select, textarea');
      
      clickableElements.forEach(element => {
        element.addEventListener('mouseenter', handleElementMouseEnter);
        element.addEventListener('mouseleave', handleElementMouseLeave);
      });
      
      return () => {
        clickableElements.forEach(element => {
          element.removeEventListener('mouseenter', handleElementMouseEnter);
          element.removeEventListener('mouseleave', handleElementMouseLeave);
        });
      };
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    const cleanupHover = handleElementsHover();
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cleanupHover();
    };
  }, [enabled]);
  
  // Hide default cursor
  useEffect(() => {
    if (!enabled) return;
    
    document.documentElement.classList.add('cursor-none');
    
    return () => {
      document.documentElement.classList.remove('cursor-none');
    };
  }, [enabled]);
  
  if (!enabled) return null;
  
  return (
    <motion.div
      className="fixed top-0 left-0 z-[999] pointer-events-none"
      animate={{
        x: position.x,
        y: position.y,
        scale: clicking ? 0.8 : hovering ? 1.2 : 1,
        opacity: visible ? 1 : 0,
      }}
      transition={{
        type: "spring",
        damping: 25,
        stiffness: 250,
        mass: 0.2
      }}
    >
      <div className="relative -translate-x-1/2 -translate-y-1/2">
        {/* Poker chip cursor */}
        <div className={`w-8 h-8 rounded-full transition-all duration-150 ${
          hovering ? 'bg-chip-gold-500 border-chip-gold-700' : 'bg-felt-700 border-felt-800'
        } border-2 flex items-center justify-center shadow-md`}>
          {/* Inner circle */}
          <div className={`w-5 h-5 rounded-full ${
            hovering ? 'bg-chip-gold-400' : 'bg-felt-600'
          } flex items-center justify-center`}>
            {/* Center dot */}
            <div className={`w-1.5 h-1.5 rounded-full ${
              hovering ? 'bg-chip-gold-700' : 'bg-felt-900'
            }`}></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 