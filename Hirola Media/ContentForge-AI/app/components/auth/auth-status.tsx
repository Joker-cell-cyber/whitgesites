'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/context/auth-context';

interface AuthStatusProps {
  className?: string;
}

export default function AuthStatus({ className }: AuthStatusProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null; // Ne rien afficher pendant le chargement
  }

  return (
    <div className={className}>
      {isAuthenticated ? (
        <>
          <Link href="/dashboard" className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base text-ocrf-brown-100 hover:text-white transition-all duration-200 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-ocrf-gold-400 hover:to-ocrf-copper-500 relative group cursor-pointer active:scale-95 text-center">
            Mon espace
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-ocrf-gold-400 to-ocrf-copper-500 group-hover:w-full transition-all duration-200"></span>
          </Link>
          
          <Link href="/logout" className="relative group overflow-hidden rounded-xl cursor-pointer active:scale-95 w-full md:w-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-ocrf-copper-500 to-ocrf-gold-500 rounded-xl"></div>
            <div className="absolute inset-0 bg-ocrf-anthracite-900/90 rounded-xl m-[1px] group-hover:m-[2px] transition-all duration-200"></div>
            <span className="relative z-10 px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base text-white rounded-xl bg-transparent transition-all duration-200 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-ocrf-gold-400 group-hover:to-ocrf-copper-500 block text-center">
              Déconnexion
            </span>
            
            {/* Effet de brillance au survol */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
          </Link>
        </>
      ) : (
        <>
          <Link href="/unsubscribe" className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base text-white font-medium hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-ocrf-gold-400 hover:to-ocrf-copper-500 relative group cursor-pointer active:scale-95 text-center border border-ocrf-gold-400/30 rounded-lg">
            Désabonnement
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-ocrf-gold-400 to-ocrf-copper-500 group-hover:w-full transition-all duration-200"></span>
          </Link>
          
          <Link href="/login" className="relative group overflow-hidden rounded-xl cursor-pointer active:scale-95 w-full md:w-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-ocrf-gold-500 to-ocrf-copper-500 rounded-xl"></div>
            <div className="absolute inset-0 bg-ocrf-anthracite-900/90 rounded-xl m-[1px] group-hover:m-[2px] transition-all duration-200"></div>
            <span className="relative z-10 px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base text-white rounded-xl bg-transparent transition-all duration-200 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-ocrf-gold-400 group-hover:to-ocrf-copper-500 block text-center">
              Connexion
            </span>
            
            {/* Effet de brillance au survol */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
          </Link>
        </>
      )}
    </div>
  );
} 