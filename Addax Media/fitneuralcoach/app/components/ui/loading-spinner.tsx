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

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Cercle extérieur */}
      <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-red-500 animate-spin"></div>
      
      {/* Cercle intérieur */}
      <div className="absolute inset-1 rounded-full border-b-2 border-l-2 border-orange-500 animate-spin-reverse"></div>
      
      {/* Point central */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
      </div>
      
      {/* Effet de lueur */}
      <div className="absolute inset-0 rounded-full bg-red-500/20 blur-sm animate-pulse"></div>
    </div>
  );
}

export function FullPageLoader() {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex flex-col items-center justify-center z-50">
      {/* Logo animé */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="mb-8"
      >
        <div className="h-16 w-16 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center shadow-xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
      </motion.div>
      
      {/* Barre de chargement avec dégradé */}
      <div className="w-64 h-1.5 bg-gray-800 rounded-full overflow-hidden mb-4">
        <motion.div 
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="h-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400"
        />
      </div>
      
      {/* Texte de chargement */}
      <motion.p
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ 
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="text-white text-lg font-medium"
      >
        Chargement...
      </motion.p>
    </div>
  );
} 