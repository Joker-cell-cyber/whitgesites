'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/app/lib/auth-hooks';

/**
 * Page intermédiaire après une connexion réussie
 * Redirige vers la page demandée ou le tableau de bord
 */
export default function LoginSuccessPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams?.get('redirect') || '/dashboard';

  useEffect(() => {
    // Si l'utilisateur est authentifié, nous le redirigeons
    if (isAuthenticated && !isLoading) {
      router.push(redirectPath);
    }
    // Si l'utilisateur n'est pas authentifié et que le chargement est terminé,
    // nous le redirigeons vers la page de connexion
    else if (!isAuthenticated && !isLoading) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, redirectPath, router]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-5"></div>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 right-0 w-96 h-96 bg-amber-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>
        <div className="absolute top-20 -left-20 w-72 h-72 bg-amber-500 rounded-full mix-blend-overlay filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-500 rounded-full mix-blend-overlay filter blur-3xl opacity-10"></div>
      </div>
      
      <div className="relative z-10 text-center">
        <div className="w-16 h-16 mx-auto border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mb-6"></div>
        <h1 className="text-2xl font-bold text-white mb-2">Connexion réussie!</h1>
        <p className="text-amber-200/80">Redirection en cours...</p>
      </div>
    </div>
  );
} 