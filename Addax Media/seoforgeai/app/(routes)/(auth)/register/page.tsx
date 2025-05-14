'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';

function RegisterRedirectContent() {
  const router = useRouter();

  useEffect(() => {
    // Rediriger vers la page d'accueil
    router.push('/');
  }, [router]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Redirection</h1>
        <p className="text-gray-400 mb-8">L'inscription n'est pas disponible sur ce site.</p>
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin"></div>
        </div>
      </div>
    </div>
  );
}

export default function RegisterRedirectPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Chargement...</h1>
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin"></div>
          </div>
        </div>
      </div>
    }>
      <RegisterRedirectContent />
    </Suspense>
  );
} 