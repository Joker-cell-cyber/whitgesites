'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/lib/auth-hooks';

/**
 * Page de déconnexion
 * Déconnecte automatiquement l'utilisateur et redirige vers la page d'accueil
 */
export default function LogoutPage() {
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Déconnecter l'utilisateur et rediriger vers la page d'accueil
    const handleLogout = async () => {
      try {
        await logout();
        // La redirection est gérée dans la fonction logout
      } catch (error) {
        console.error('Erreur lors de la déconnexion:', error);
        router.push('/');
      }
    };

    handleLogout();
  }, [logout, router]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-950 to-amber-900 text-white">
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-5"></div>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 right-0 w-96 h-96 bg-amber-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>
        <div className="absolute top-20 -left-20 w-72 h-72 bg-amber-500 rounded-full mix-blend-overlay filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-500 rounded-full mix-blend-overlay filter blur-3xl opacity-10"></div>
      </div>
      
      <div className="relative z-10 text-center">
        <div className="w-16 h-16 mx-auto border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mb-6"></div>
        <h1 className="text-2xl font-bold text-white mb-2">Déconnexion en cours...</h1>
        <p className="text-amber-200/80">Vous allez être redirigé vers la page d'accueil.</p>
      </div>
    </div>
  );
} 