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
    
    // Forcer l'affichage beaucoup plus rapidement
    setAppReady(true);
    setLoading(false);
    
    return () => {};
  }, [setAppReady, setLoading]);

  // Détecter les changements de route pour afficher/masquer le loader
  useEffect(() => {
    if (!isMounted) return;
    
    setLoading(true);
    
    // Transition très courte
    const timer = setTimeout(() => {
      setLoading(false);
      setAppReady(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [pathname, searchParams, setLoading, isMounted, setAppReady]);

  return <>{children}</>;
}

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setLoading] = useState(true);
  const [isAppReady, setAppReady] = useState(false);
  
  // Fonction pour forcer l'état prêt immédiatement
  const forceReady = () => {
    setAppReady(true);
    setLoading(false);
  };
  
  // Forcer l'état prêt après un délai très court
  useEffect(() => {
    const forceReadyTimer = setTimeout(() => {
      forceReady();
    }, 300);
    
    return () => clearTimeout(forceReadyTimer);
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, isAppReady, setLoading, forceReady }}>
      {/* Ajouter Suspense pour éviter l'erreur avec useSearchParams */}
      <Suspense fallback={<FullPageLoader />}>
        <LoadingHandler setLoading={setLoading} setAppReady={setAppReady}>
          {children}
        </LoadingHandler>
      </Suspense>
      {/* Ne montrer le loader que pendant un temps très court */}
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