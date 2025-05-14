'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/app/lib/utils";
import { useAuth } from "@/app/context/auth-context";
import { useLoading } from "@/app/providers/loading-provider";
import { Heart, ChevronRight, Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();
  const { forceReady } = useLoading();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const [authTimeout, setAuthTimeout] = useState(false);

  // Marquer le client comme monté
  useEffect(() => {
    setIsClient(true);
    
    // Afficher les boutons de connexion/déconnexion par défaut après 2 secondes,
    // même si l'authentification n'est pas terminée
    const timer = setTimeout(() => {
      setAuthTimeout(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  // Détecter le défilement pour changer le style du header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Forcer un rafraîchissement de l'application
  const handleRefresh = () => {
    forceReady();
    window.location.reload();
  };

  const renderActionButtons = () => {
    if (isClient && (!isLoading || authTimeout)) {
      if (isAuthenticated) {
        return (
          <div className="flex items-center space-x-3">
            <Button asChild className="bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full px-6 hover:from-pink-600 hover:to-red-600 hover:shadow-lg transition-all duration-300">
              <Link href="/chat" className="flex items-center gap-2">
                <span>Chat</span>
                <ChevronRight size={16} />
              </Link>
            </Button>
          </div>
        );
      }

      return (
        <div className="flex items-center space-x-3">
          <Button asChild className="bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full px-6 hover:from-pink-600 hover:to-red-600 hover:shadow-lg transition-all duration-300">
            <Link href="/login" className="flex items-center gap-2">
              <span>Connexion</span>
              <ChevronRight size={16} />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-pink-500 text-pink-500 rounded-full px-6 hover:bg-pink-50 transition-all duration-300"
          >
            <Link href="/unsubscribe">Désabonnement</Link>
          </Button>
        </div>
      );
    }

    // Pendant le chargement initial, afficher un placeholder
    return (
      <div className="flex space-x-4 h-10">
        <div className="w-32 h-10 animate-pulse rounded-full bg-gradient-to-r from-pink-100 to-red-100"></div>
        <div className="w-32 h-10 animate-pulse rounded-full bg-pink-50 border border-pink-100"></div>
      </div>
    );
  };

  const renderMobileActionButtons = () => {
    if (isClient && (!isLoading || authTimeout)) {
      if (isAuthenticated) {
        return (
          <div className="flex flex-col items-center space-y-4 w-full px-6">
            <Button asChild className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full py-3 hover:from-pink-600 hover:to-red-600 hover:shadow-lg transition-all duration-300">
              <Link href="/dashboard" className="flex items-center justify-center gap-2">
                <span>Tableau de bord</span>
                <ChevronRight size={16} />
              </Link>
            </Button>
          </div>
        );
      }

      return (
        <div className="flex flex-col items-center space-y-4 w-full px-6">
          <Button asChild className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full py-3 hover:from-pink-600 hover:to-red-600 hover:shadow-lg transition-all duration-300">
            <Link href="/login" className="flex items-center justify-center gap-2">
              <span>Connexion</span>
              <ChevronRight size={16} />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full border-pink-500 text-pink-500 rounded-full py-3 hover:bg-pink-50 transition-all duration-300"
          >
            <Link href="/unsubscribe">Désabonnement</Link>
          </Button>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center space-y-4 w-full px-6">
        <div className="w-full h-12 animate-pulse rounded-full bg-gradient-to-r from-pink-100 to-red-100"></div>
        <div className="w-full h-12 animate-pulse rounded-full bg-pink-50 border border-pink-100"></div>
      </div>
    );
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "backdrop-blur-md bg-white/80 py-2"
          : "py-5 bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo avec effet décoratif */}
          <div className="flex items-center z-50 relative">
            <Link href="/" className="group flex items-center">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-red-500 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-1000"></div>
                <div className="relative flex items-center justify-center bg-white w-10 h-10 rounded-full shadow-md group-hover:shadow-lg transition duration-300">
                  <Heart size={20} className="text-pink-500 fill-pink-500 group-hover:scale-110 transition duration-300" />
                </div>
              </div>
              <div className="ml-3">
                <span className="font-bold text-xl tracking-tight relative">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-red-500">Charm</span>
                  <span className="text-gray-800">AI</span>
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-pink-500 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </span>
              </div>
            </Link>
          </div>

          {/* Boutons d'action à droite */}
          <div className="hidden md:block z-50">
            {renderActionButtons()}
          </div>
          
          {/* Bouton menu mobile avec animation */}
          <button 
            onClick={toggleMenu}
            className="md:hidden z-50 w-10 h-10 flex items-center justify-center bg-white shadow-md rounded-full focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? 
              <X size={20} className="text-pink-500" /> : 
              <Menu size={20} className="text-pink-500" />
            }
          </button>

          {/* Menu mobile avec animations et design moderne */}
          <div
            className={cn(
              "fixed inset-0 z-40 transition-all duration-500 md:hidden flex flex-col justify-center",
              isMenuOpen 
                ? "opacity-100 pointer-events-auto" 
                : "opacity-0 pointer-events-none"
            )}
          >
            {/* Overlay avec motif de coeurs subtil */}
            <div className="absolute inset-0 bg-white opacity-95"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyLjUgMjBDMTIuNSAyMy41IDEwIDI4IDUgMjhDMCAyOCAtMi41IDIzLjUgMi41IDE3LjVDNy41IDExLjUgMTIuNSAxNSAxMi41IDIwWiIgZmlsbD0iI0ZERUJFQiIvPgo8cGF0aCBkPSJNMTIuNSAyMEMxMi41IDIzLjUgMTUgMjggMjAgMjhDMjUgMjggMjcuNSAyMy41IDIyLjUgMTcuNUMxNy41IDExLjUgMTIuNSAxNSAxMi41IDIwWiIgZmlsbD0iI0ZERUJFQiIvPgo8L3N2Zz4K')] bg-repeat opacity-10"></div>
            
            {/* Contenu du menu */}
            <div className="relative container mx-auto px-8 py-12 flex flex-col items-center">              
              {renderMobileActionButtons()}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 