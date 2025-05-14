'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

function RegisterRedirectContent() {
  const router = useRouter();

  useEffect(() => {
    // Rediriger vers la page d'accueil après un court délai
    const timeout = setTimeout(() => {
      router.push('/');
    }, 2500);
    
    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 space-y-8 bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl rounded-2xl shadow-2xl border border-pink-500/20 text-center"
      >
        <div className="flex flex-col items-center gap-4">
          <Heart className="h-12 w-12 text-pink-500" />
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-100 to-white">Inscription non disponible</h1>
          <p className="text-gray-400">L'inscription n'est pas disponible sur cette plateforme.</p>
          <p className="text-pink-400 text-sm">Vous allez être redirigé vers la page d'accueil...</p>
          
          <div className="flex items-center justify-center mt-6">
            <div className="w-12 h-12 border-4 border-pink-500/20 border-t-pink-500 rounded-full animate-spin"></div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function RegisterRedirectPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-16 h-16 border-4 border-pink-500/20 border-t-pink-500 rounded-full animate-spin"></div>
      </div>
    }>
      <RegisterRedirectContent />
    </Suspense>
  );
} 