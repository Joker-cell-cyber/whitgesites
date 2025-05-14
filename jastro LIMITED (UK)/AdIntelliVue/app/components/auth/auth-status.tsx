'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/context/auth-context';

interface AuthStatusProps {
  className?: string;
}

export default function AuthStatus({ className }: AuthStatusProps) {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return null; // Ne rien afficher pendant le chargement
  }

  return (
    <div className={className}>
      {isAuthenticated ? (
        <>
          <div className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base text-[#4F4639] bg-[#F8F4E9]/80 rounded-lg">
            {user?.tokenBalance || 0} tokens
          </div>
          
          <Link href="/tokens" className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base text-[#5F7138] hover:text-[#C17A56] transition-colors duration-300">
            Acheter des tokens
          </Link>
          
          <Link href="/unsubscribe" className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base text-[#5F7138] hover:text-[#C17A56] transition-colors duration-300">
            Désabonnement
          </Link>
          
          <Link href="/logout" className="relative group overflow-hidden rounded-lg cursor-pointer active:scale-95 w-full md:w-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-[#5F7138] to-[#7F8F55] rounded-lg"></div>
            <div className="absolute inset-0 bg-white/90 rounded-lg m-[1px] group-hover:m-[2px] transition-all duration-200"></div>
            <span className="relative z-10 px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base text-[#5F7138] rounded-lg bg-transparent transition-all duration-200 group-hover:text-[#C17A56] block text-center">
              Déconnexion
            </span>
          </Link>
        </>
      ) : (
        <>
          <Link href="/login" className="relative group overflow-hidden rounded-lg cursor-pointer active:scale-95 w-full md:w-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-[#5F7138] to-[#7F8F55] rounded-lg"></div>
            <div className="absolute inset-0 bg-white/90 rounded-lg m-[1px] group-hover:m-[2px] transition-all duration-200"></div>
            <span className="relative z-10 px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base text-[#5F7138] rounded-lg bg-transparent transition-all duration-200 group-hover:text-[#C17A56] block text-center">
              Connexion
            </span>
          </Link>
        </>
      )}
    </div>
  );
} 