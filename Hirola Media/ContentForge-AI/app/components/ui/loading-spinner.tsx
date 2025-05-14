'use client';

import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function LoadingSpinner({ 
  size = 'md', 
  className = '' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Cercle extérieur */}
      <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-ocrf-gold-500 animate-spin"></div>
      
      {/* Cercle intérieur */}
      <div className="absolute inset-1 rounded-full border-b-2 border-l-2 border-ocrf-copper-500 animate-spin-reverse"></div>
      
      {/* Point central */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-1.5 h-1.5 bg-ocrf-gold-300 rounded-full animate-pulse"></div>
      </div>
      
      {/* Effet de lueur */}
      <div className="absolute inset-0 rounded-full bg-ocrf-gold-500/20 blur-sm animate-pulse"></div>
    </div>
  );
}

export function FullPageLoader() {
  // Animation des particules
  const [particles, setParticles] = useState<Array<{
    size: number;
    posX: number;
    posY: number;
    opacity: number;
    rotation: number;
    animationDuration: number;
  }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }).map(() => ({
      size: Math.random() * 6 + 2,
      posX: Math.random() * 100,
      posY: Math.random() * 100,
      opacity: Math.random() * 0.4 + 0.1,
      rotation: Math.random() * 360,
      animationDuration: Math.random() * 15 + 10
    }));
    
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-ocrf-anthracite-900/95 to-ocrf-brown-900/95 backdrop-blur-xl flex items-center justify-center z-50 overflow-hidden">
      {/* Particules décoratives */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle, index) => (
          <div 
            key={index}
            className="absolute"
            style={{
              top: `${particle.posY}%`,
              left: `${particle.posX}%`,
              opacity: particle.opacity,
              animation: `float ${particle.animationDuration}s ease-in-out infinite alternate`
            }}
          >
            <div 
              className="w-full h-full bg-ocrf-gold-300" 
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                transform: `rotate(${particle.rotation}deg)`,
              }}
            />
          </div>
        ))}
      </div>
      
      {/* Effet de lumière radiale */}
      <div className="absolute inset-0 bg-gradient-radial from-ocrf-gold-500/5 to-transparent" style={{ mixBlendMode: 'overlay' }}></div>
      
      <div className="flex flex-col items-center relative z-10">
        <div className="w-24 h-24 relative mb-6">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-ocrf-gold-400/20 to-ocrf-copper-500/20 animate-pulse"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="h-8 w-8 text-ocrf-gold-400 animate-pulse" />
          </div>
          <LoadingSpinner size="lg" className="absolute inset-0" />
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-r from-ocrf-gold-300 to-ocrf-copper-500 mb-2">ContentForge AI</h3>
          <p className="text-ocrf-brown-200 text-lg font-medium">Chargement en cours...</p>
        </div>
      </div>
      
      {/* Animations CSS */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
          100% { transform: translateY(10px) rotate(-5deg); }
        }
        
        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
      `}</style>
    </div>
  );
} 