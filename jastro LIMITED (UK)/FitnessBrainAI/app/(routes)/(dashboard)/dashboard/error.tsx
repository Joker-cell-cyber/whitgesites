'use client';

import { useEffect } from 'react';
import { Button } from "@/app/components/ui/button";
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Journaliser l'erreur
    console.error('Erreur dans le tableau de bord:', error);
  }, [error]);

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto text-center"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Oups ! Un problème est survenu</h1>
          <p className="text-gray-400 mb-6">
            Nous avons rencontré une erreur lors du chargement de votre tableau de bord. Veuillez réessayer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={reset}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Réessayer
            </Button>
            <Link href="/">
              <Button variant="outline" className="border-purple-500/50 hover:bg-purple-500/10">
                Retour à l'accueil
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="bg-black/40 backdrop-blur-xl rounded-xl p-6 border border-red-500/20">
          <h2 className="text-xl font-bold text-white mb-4">Que pouvez-vous faire ?</h2>
          <ul className="text-left text-gray-400 space-y-2">
            <li>• Rafraîchir la page</li>
            <li>• Vérifier votre connexion Internet</li>
            <li>• Vous déconnecter puis vous reconnecter</li>
            <li>• Effacer le cache de votre navigateur</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
} 