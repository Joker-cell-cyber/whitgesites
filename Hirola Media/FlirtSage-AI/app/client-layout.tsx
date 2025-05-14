'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/app/components/layout/header';
import Footer from '@/app/components/Footer';
import { useLoading } from '@/app/providers/loading-provider';
import { cn } from '@/app/lib/utils';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isLoading, isAppReady, forceReady } = useLoading();
  const [isMounted, setIsMounted] = useState(false);
  
  // Vérifier si on est sur une page dashboard ou chat
  const isDashboardPage = pathname.startsWith('/dashboard');
  const isChatPage = pathname.startsWith('/chat');
  const hideHeaderFooter = isDashboardPage || isChatPage;

  // Effet pour gérer le montage du composant côté client
  useEffect(() => {
    // Marquer comme monté immédiatement
    setIsMounted(true);
    
    // Force l'application à être prête immédiatement
    forceReady();
    
    // Gestionnaire de chargement de la page
    const handleLoad = () => forceReady();
    
    // Écouter l'événement de chargement complet de la page
    if (typeof window !== 'undefined') {
      window.addEventListener('load', handleLoad);
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('load', handleLoad);
      }
    };
  }, [forceReady]);

  // Afficher un simple placeholder pendant le montage initial côté client
  if (!isMounted) {
    return null;
  }

  return (
    <div className={cn(
      "min-h-screen flex flex-col",
      "bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950",
      "transition-opacity duration-300 ease-in-out",
      // S'assurer que la page est toujours visible
      "opacity-100"
    )}>
      {!hideHeaderFooter && <Header />}
      {!hideHeaderFooter && <div className="h-[72px]" aria-hidden="true"></div>} {/* Espace pour le header fixe */}
      <main className="flex-grow">
        {children}
      </main>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
} 