'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  color?: 'blue' | 'white' | 'slate';
}

export function LoadingSpinner({ 
  size = 'md', 
  className = '', 
  color = 'blue' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4',
  };

  const colorClasses = {
    blue: 'border-adfi-blue-600 border-t-transparent',
    white: 'border-white border-t-transparent',
    slate: 'border-adfi-slate-300 border-t-transparent',
  };

  return (
    <div
      className={cn(
        'animate-spin rounded-full',
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      role="status"
      aria-label="Chargement"
    >
      <span className="sr-only">Chargement...</span>
    </div>
  );
}

export function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-adfi-slate-50 to-blue-50">
      <div className="flex flex-col items-center p-8 rounded-2xl bg-white/80 backdrop-blur-sm shadow-xl">
        <div className="relative">
          <div className="absolute inset-0 rounded-full blur-md bg-adfi-blue-400/30 animate-pulse"></div>
          <LoadingSpinner size="lg" />
        </div>
        <p className="mt-4 text-adfi-slate-600 font-medium animate-pulse">Chargement...</p>
      </div>
    </div>
  );
}

export function FullPageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-300 animate-fadeIn">
      <div className="flex flex-col items-center bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl animate-scaleIn">
        <div className="relative">
          <div className="absolute inset-0 rounded-full blur-md bg-adfi-blue-400/30 animate-pulse"></div>
          <LoadingSpinner size="lg" />
        </div>
        <p className="mt-4 text-adfi-slate-600 font-medium animate-pulse">Chargement en cours...</p>
      </div>
    </div>
  );
} 