'use client';

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { isProtectedRoute, isPublicRoute } from "./lib/routes";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import { useAuth } from "./context/auth-context";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  
  // Vérifier si nous sommes dans l'espace membre (dashboard)
  const isDashboardRoute = isProtectedRoute(pathname);

  // Effet pour gérer les redirections basées sur l'authentification
  useEffect(() => {
    // Ne rien faire pendant le chargement
    if (isLoading) return;
    
    // Si l'utilisateur n'est pas authentifié et tente d'accéder à une route protégée
    if (!isAuthenticated && isDashboardRoute) {
      console.log('Redirection vers la connexion depuis ClientLayout');
      router.push('/login');
      return;
    }
  }, [isAuthenticated, isLoading, pathname, router, isDashboardRoute]);

  return (
    <>
      {!isDashboardRoute && <Header />}
      <div className={!isDashboardRoute ? "h-[72px]" : ""} aria-hidden="true"></div>
      <main className="flex-grow relative z-10">{children}</main>
      {!isDashboardRoute && <Footer />}
    </>
  );
} 