'use client';

import React from 'react';

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
      <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-pink-500 animate-spin"></div>
      
      {/* Cercle intérieur */}
      <div className="absolute inset-1 rounded-full border-b-2 border-l-2 border-rose-400 animate-spin-reverse"></div>
      
      {/* Point central */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
      </div>
      
      {/* Effet de lueur */}
      <div className="absolute inset-0 rounded-full bg-pink-500/20 blur-sm animate-pulse"></div>
    </div>
  );
}

export function FullPageLoader() {
  return (
    <div className="fixed inset-0 bg-white/90 backdrop-blur-md flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="absolute -inset-5 bg-gradient-to-r from-pink-500/20 to-red-500/20 rounded-full blur-lg animate-pulse"></div>
          <LoadingSpinner size="lg" />
        </div>
        <p className="mt-4 text-gray-800 text-lg font-medium animate-pulse">Chargement...</p>
      </div>
    </div>
  );
} 