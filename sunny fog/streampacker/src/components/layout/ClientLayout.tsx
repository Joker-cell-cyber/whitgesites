'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';

/**
 * Composants d'UI avec chargement dynamique pour optimiser les performances
 * - Chargés uniquement côté client (ssr: false)
 * - N'affichent rien pendant le chargement ou un placeholder minimal
 */
const ProgressBar = dynamic(() => import('@/components/ui/ProgressBar'), {
  ssr: false,
  loading: () => <div className="progress-bar" style={{ width: '0%' }}></div>,
});

const StreamParticles = dynamic(() => import('@/components/ui/StreamParticles'), {
  ssr: false,
  loading: () => null,
});

const StreamAlert = dynamic(() => import('@/components/ui/StreamAlert'), {
  ssr: false,
  loading: () => null,
});

import ClientEffects from '@/components/ui/ClientEffects';

/**
 * ClientLayout - Gère tous les éléments visuels et d'UI qui sont fixés et ne font pas partie
 * du flux normal de document. Cela inclut:
 * - Effets d'arrière-plan et grilles cyberpunk
 * - Particules flottantes
 * - Barres de progression
 * - Alertes temporaires
 * 
 * En séparant ces éléments du layout principal, nous obtenons:
 * 1. Une meilleure organisation du code
 * 2. Une séparation claire entre contenu défilant et éléments fixes
 * 3. Un contrôle plus précis des propriétés z-index et positioning
 */
export default function ClientLayout() {
  // Initialisation et nettoyage des effets côté client
  useEffect(() => {
    // Appliquer la classe de grille cyberpunk au body
    document.body.classList.add('cyber-grid-bg');
    
    // Supprimer les effets de défilement non désirés
    if (document.body.classList.contains('no-scroll')) {
      document.body.classList.remove('no-scroll');
    }
    
    // Nettoyer à la destruction du composant
    return () => {
      document.body.classList.remove('cyber-grid-bg');
    };
  }, []);
  
  return (
    <>
      <div className="fixed-elements">
        {/* Conteneur de particules */}
        <div id="particles-container" className="fixed inset-0 pointer-events-none z-0" />
        
        {/* Barre de progression en haut */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <ProgressBar />
        </div>
        
        {/* Éléments d'UI dynamiques */}
        <StreamParticles />
        <StreamAlert />
        <ClientEffects />
      </div>
    </>
  );
} 