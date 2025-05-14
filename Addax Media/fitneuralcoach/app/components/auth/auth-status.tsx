'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/context/auth-context';
import { useStats } from '@/app/context/stats-context';

interface AuthStatusProps {
  className?: string;
}

export default function AuthStatus({ className }: AuthStatusProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const { stats } = useStats();

  if (isLoading) {
    return null; // Ne rien afficher pendant le chargement
  }

  return (
    <div className={className}>
      {isAuthenticated ? (
        <>
          {/* Affichage des tokens restants */}
          <div className="px-3 sm:px-4 py-1.5 sm:py-2 flex items-center gap-2">
            <span className="text-sm sm:text-base font-medium text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
              {stats?.tokensRemaining || 0} Tokens
            </span>
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-red-500 to-orange-500 animate-pulse"></span>
          </div>
          
          <Link href="/coach" className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base text-gray-300 hover:text-white transition-all duration-200 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-500 hover:to-orange-500 relative group cursor-pointer active:scale-95 text-center">
            Coach IA
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 group-hover:w-full transition-all duration-200"></span>
          </Link>
          
          <Link href="/logout" className="relative group overflow-hidden rounded-xl cursor-pointer active:scale-95 w-full md:w-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl"></div>
            <div className="absolute inset-0 bg-black/80 rounded-xl m-[1px] group-hover:m-[2px] transition-all duration-200"></div>
            <span className="relative z-10 px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base text-white rounded-xl bg-transparent transition-all duration-200 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-red-400 group-hover:to-orange-500 block text-center">
              Déconnexion
            </span>
            
            {/* Effet de brillance au survol */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
          </Link>
        </>
      ) : (
        <>
          <Link href="/unsubscribe" className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base text-gray-300 hover:text-white transition-all duration-200 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-500 hover:to-orange-500 relative group cursor-pointer active:scale-95 text-center">
            Désabonnement
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 group-hover:w-full transition-all duration-200"></span>
          </Link>
          
          <Link href="/login" className="relative group overflow-hidden rounded-xl cursor-pointer active:scale-95 w-full md:w-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl"></div>
            <div className="absolute inset-0 bg-black/80 rounded-xl m-[1px] group-hover:m-[2px] transition-all duration-200"></div>
            <span className="relative z-10 px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base text-white rounded-xl bg-transparent transition-all duration-200 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-red-400 group-hover:to-orange-500 block text-center">
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