'use client';

import React, { createContext, useContext, useState, useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { FullPageLoader } from '@/app/components/ui/loading-spinner';

interface LoadingContextType {
  isLoading: boolean;
  isAppReady: boolean;
  setLoading: (loading: boolean) => void;
  forceReady: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// Composant qui utilise useSearchParams
function LoadingHandler({ children, setLoading, setAppReady }: { 
  children: React.ReactNode, 
  setLoading: (loading: boolean) => void,
  setAppReady: (ready: boolean) => void 
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isMounted, setIsMounted] = useState(false);

  // Effet pour indiquer que le composant est monté côté client
  useEffect(() => {
    setIsMounted(true);
    
    // Forcer l'affichage immédiatement 
    setAppReady(true);
    setLoading(false);
    
    return () => {};
  }, [setAppReady, setLoading]);

  // Détecter les changements de route pour afficher/masquer le loader
  useEffect(() => {
    if (!isMounted) return;
    
    setLoading(true);
    
    // Transition immédiate
    requestAnimationFrame(() => {
      setLoading(false);
      setAppReady(true);
    });
    
    return () => {};
  }, [pathname, searchParams, setLoading, isMounted, setAppReady]);

  return <>{children}</>;
}

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setLoading] = useState(false); // Commence avec isLoading à false
  const [isAppReady, setAppReady] = useState(true); // Commence avec isAppReady à true
  
  // Fonction pour forcer l'état prêt immédiatement
  const forceReady = () => {
    setAppReady(true);
    setLoading(false);
  };
  
  // Forcer l'état prêt immédiatement
  useEffect(() => {
    // Force l'état prêt immédiatement
    forceReady();
    
    // Ajoute un gestionnaire pour forcer l'état prêt si la page est visible
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        forceReady();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('load', forceReady);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('load', forceReady);
    };
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, isAppReady, setLoading, forceReady }}>
      {/* Ajouter Suspense pour éviter l'erreur avec useSearchParams */}
      <Suspense fallback={null}>
        <LoadingHandler setLoading={setLoading} setAppReady={setAppReady}>
          {children}
        </LoadingHandler>
      </Suspense>
      {/* Ne montrer le loader que si isLoading est true ET isAppReady est false */}
      {isLoading && !isAppReady && <FullPageLoader />}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}