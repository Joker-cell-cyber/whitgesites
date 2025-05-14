'use client';

import { useEffect } from 'react';
import { useAuth } from '@/app/context/auth-context';
import { Suspense } from 'react';

/**
 * Composant de contenu de la page de déconnexion
 */
function LogoutContent() {
  const { logout } = useAuth();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout();
      } catch (error) {
        // En cas d'erreur, forcer la redirection vers la page d'accueil
        window.location.href = '/';
      }
    };

    performLogout();
  }, [logout]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-900 to-black">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-xl shadow-2xl text-center">
        <div className="animate-pulse">
          <h1 className="text-2xl font-bold text-white">Déconnexion en cours...</h1>
          <p className="mt-2 text-gray-400">Vous allez être redirigé vers la page d'accueil</p>
        </div>
      </div>
    </div>
  );
}

/**
 * Page de déconnexion avec Suspense
 */
export default function LogoutPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <LogoutContent />
    </Suspense>
  );
} 