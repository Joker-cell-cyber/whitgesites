'use client';

import React from 'react';
// Suppression de l'importation problématique
// import { WaveIcon } from '@/app/components/layout/icons';

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
      <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-[#26A69A] animate-spin"></div>
      
      {/* Cercle intérieur */}
      <div className="absolute inset-1 rounded-full border-b-2 border-l-2 border-[#1A7BA4] animate-spin-reverse"></div>
      
      {/* Point central */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-1.5 h-1.5 bg-[#BBE5EF] rounded-full animate-pulse"></div>
      </div>
      
      {/* Effet de lueur */}
      <div className="absolute inset-0 rounded-full bg-[#1A7BA4]/20 blur-sm animate-pulse"></div>
    </div>
  );
}

export function FullPageLoader() {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-[#0D2F3F]/90 to-[#1A3A4A]/90 backdrop-blur-md flex items-center justify-center z-50">
      <div className="relative flex flex-col items-center">
        {/* Éléments décoratifs */}
        <div className="absolute -top-20 -left-20 opacity-10">
          <div className="w-40 h-40 rounded-full bg-[#26A69A]/20 blur-xl animate-pulse"></div>
        </div>
        <div className="absolute -bottom-20 -right-20 opacity-10">
          <div className="w-40 h-40 rounded-full bg-[#1A7BA4]/20 blur-xl animate-pulse"></div>
        </div>
        
        {/* Conteneur du loader avec effet de vague */}
        <div className="relative bg-white/5 backdrop-blur-sm p-10 rounded-2xl border border-white/10">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-[#BBE5EF] text-lg font-medium animate-pulse text-center">
            Chargement<span className="animate-pulse">.</span><span className="animate-pulse delay-100">.</span><span className="animate-pulse delay-200">.</span>
          </p>
          
          {/* Icône de vague sous le texte */}
          <div className="mt-4 flex justify-center opacity-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-[#26A69A] animate-pulse"
            >
              <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
              <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
              <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
} 