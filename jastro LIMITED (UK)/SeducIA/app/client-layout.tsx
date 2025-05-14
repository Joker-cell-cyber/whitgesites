'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/app/components/layout/header';
import Footer from '@/app/components/Footer';
import { useLoading } from '@/app/providers/loading-provider';
import { cn } from '@/app/lib/utils';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isLoading, isAppReady } = useLoading();
  const [isMounted, setIsMounted] = useState(false);
  const [showContent, setShowContent] = useState(false);
  
  // Vérifier si on est sur une page dashboard ou chat
  const isDashboardPage = pathname.startsWith('/dashboard');
  const isChatPage = pathname.startsWith('/chat');
  const hideHeaderFooter = isDashboardPage || isChatPage;

  // Effet pour gérer le montage du composant côté client
  useEffect(() => {
    // Marquer comme monté immédiatement
    setIsMounted(true);
    
    // Afficher le contenu avec un léger délai pour une transition fluide
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 50);
    
    // Timeout de sécurité pour s'assurer que le contenu s'affiche même si d'autres 
    // parties de l'application sont bloquées
    const safetyTimer = setTimeout(() => {
      if (!showContent) {
        setShowContent(true);
      }
    }, 1500);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(safetyTimer);
    };
  }, [showContent]);

  // Afficher un simple placeholder pendant le montage initial côté client
  if (!isMounted) {
    return <div className="min-h-screen bg-slate-950"></div>;
  }

  return (
    <div className={cn(
      "min-h-screen flex flex-col",
      "bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950",
      "transition-opacity duration-300 ease-in-out",
      // Optimiser les transitions
      (isLoading && !isAppReady) ? "opacity-30" : "opacity-100"
    )}>
      {!hideHeaderFooter && <Header />}
      {!hideHeaderFooter && <div className="h-[72px]" aria-hidden="true"></div>} {/* Espace pour le header fixe */}
      <main className={cn(
        "flex-grow transition-opacity duration-300 ease-in-out",
        !showContent && "opacity-0"
      )}>
        {children}
      </main>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
} 