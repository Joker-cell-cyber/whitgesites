'use client';

import React from 'react';
import { motion } from 'framer-motion';

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

  const borderSizes = {
    sm: 'border-2',
    md: 'border-3',
    lg: 'border-4'
  };

  const dotSizes = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2',
    lg: 'w-3 h-3'
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Cercle extérieur */}
      <motion.div 
        className={`absolute inset-0 rounded-full border-t-${borderSizes[size]} border-r-${borderSizes[size]} border-transparent border-amber-600`}
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Cercle intérieur */}
      <motion.div 
        className={`absolute inset-1 rounded-full border-b-${borderSizes[size]} border-l-${borderSizes[size]} border-transparent border-orange-500`}
        animate={{ rotate: -360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Point central */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          className={`${dotSizes[size]} bg-gradient-to-r from-amber-600 to-orange-500 rounded-full`}
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      {/* Effet de lueur */}
      <motion.div 
        className="absolute inset-0 rounded-full bg-amber-600/20 blur-md"
        animate={{ 
          opacity: [0.3, 0.6, 0.3],
          scale: [0.8, 1.1, 0.8],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export function FullPageLoader() {
  return (
    <div className="fixed inset-0 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center z-50">
      {/* Éléments décoratifs de fond */}
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-amber-100/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-orange-100/30 rounded-full blur-3xl"></div>
      <div className="absolute inset-0 opacity-10 bg-[url('/grid.svg')] bg-repeat pointer-events-none"></div>
      
      <div className="flex flex-col items-center">
        <LoadingSpinner size="lg" />
        
        <div className="flex items-center mt-6">
          <span className="text-xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-500">
            Chargement
          </span>
          
          <div className="flex space-x-1 ml-2">
            {[0, 1, 2].map((dot, index) => (
              <motion.div
                key={index}
                className="w-1.5 h-1.5 rounded-full bg-amber-600"
                animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
                transition={{ 
                  duration: 1.2, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: index * 0.2
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 