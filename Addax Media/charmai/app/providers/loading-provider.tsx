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

  // Effet pour indiquer que le composant est monté côté client
  useEffect(() => {
    // Forcer l'application à être prête immédiatement
    setAppReady(true);
    setLoading(false);
  }, [setAppReady, setLoading]);

  // Détecter les changements de route
  useEffect(() => {
    // Transition minimale lors des changements de route
    setLoading(true);
    setAppReady(true); // Gardons l'app prête même pendant les transitions
    
    // Désactiver le loading immédiatement
    setLoading(false);
  }, [pathname, searchParams, setLoading, setAppReady]);

  return <>{children}</>;
}

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setLoading] = useState(false); // Commencer avec loading désactivé
  const [isAppReady, setAppReady] = useState(true); // Commencer avec app prête
  
  // Fonction pour forcer l'état prêt immédiatement
  const forceReady = () => {
    setAppReady(true);
    setLoading(false);
  };
  
  return (
    <LoadingContext.Provider value={{ isLoading, isAppReady, setLoading, forceReady }}>
      {/* Ajouter Suspense pour éviter l'erreur avec useSearchParams */}
      <Suspense fallback={null}>
        <LoadingHandler setLoading={setLoading} setAppReady={setAppReady}>
          {children}
        </LoadingHandler>
      </Suspense>
      {/* Ne montrer le loader que si explicitement demandé */}
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