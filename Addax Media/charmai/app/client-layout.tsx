'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/app/components/layout/header';
import { Footer } from '@/app/components/Footer';
import { useLoading } from '@/app/providers/loading-provider';
import { cn } from '@/app/lib/utils';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isLoading, isAppReady } = useLoading();
  const [isMounted, setIsMounted] = useState(false);
  
  // Vérifier si on est sur une page dashboard ou chat
  const isDashboardPage = pathname.startsWith('/dashboard');
  const isChatPage = pathname.startsWith('/chat');
  const hideHeaderFooter = isDashboardPage || isChatPage;

  // Effet pour gérer le montage du composant côté client
  useEffect(() => {
    // Marquer comme monté immédiatement
    setIsMounted(true);
  }, []);

  // Afficher un simple placeholder pendant le montage initial côté client
  if (!isMounted) {
    return <div className="min-h-screen bg-white"></div>;
  }

  return (
    <div className={cn(
      "min-h-screen flex flex-col",
      "bg-white"
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