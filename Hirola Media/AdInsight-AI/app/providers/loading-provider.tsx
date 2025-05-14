'use client';

import React, { createContext, useContext, useState, useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { FullPageLoader } from '@/app/components/ui/loading-spinner';

interface LoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// Composant qui utilise useSearchParams
function LoadingHandler({ children, setLoading }: { children: React.ReactNode, setLoading: (loading: boolean) => void }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Détecter les changements de route pour afficher/masquer le loader
  useEffect(() => {
    setLoading(true);
    
    // Simuler un délai de chargement minimal pour une meilleure UX
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [pathname, searchParams, setLoading]);

  return <>{children}</>;
}

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      <Suspense fallback={<FullPageLoader />}>
        <LoadingHandler setLoading={setLoading}>
          {children}
        </LoadingHandler>
      </Suspense>
      {isLoading && <FullPageLoader />}
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