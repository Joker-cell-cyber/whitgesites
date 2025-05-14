'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Heart, MessageCircle, RefreshCw, Flame } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { useAuth } from "@/app/context/auth-context";
import { useLoading } from "@/app/providers/loading-provider";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();
  const { forceReady } = useLoading();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const [authTimeout, setAuthTimeout] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  useEffect(() => {
    // Fermer le menu mobile lors du changement de route
    setMobileMenuOpen(false);
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Forcer un rafraîchissement de l'application
  const handleRefresh = () => {
    forceReady();
    window.location.reload();
  };

  // Rendu des boutons d'action basé sur l'état d'authentification
  const renderActionButtons = () => {
    // Toujours afficher les boutons après quelques secondes, indépendamment de l'état d'authentification
    if (isClient && (authTimeout || !isLoading)) {
      if (isAuthenticated) {
        return (
          <>
            <Button
              asChild
              className="bg-gradient-to-r from-[#FF5C3E] to-[#FFA728] hover:from-[#F05538] hover:to-[#F5961F] text-white"
            >
              <Link href="/chat">
                <MessageCircle className="mr-2 h-4 w-4" />
                Chat
              </Link>
            </Button>
            <Button 
              onClick={handleRefresh}
              variant="ghost" 
              size="icon"
              className="bg-transparent text-[#664D45] hover:text-[#FF5C3E]"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </>
        );
      }

      return (
        <>
          {/* Bouton de connexion en premier (à gauche) */}
          <Button
            asChild
            className="bg-gradient-to-r from-[#FF5C3E] to-[#FFA728] hover:from-[#F05538] hover:to-[#F5961F] text-white"
          >
            <Link href="/login">Connexion</Link>
          </Button>
          
          {/* Bouton de désabonnement en second (au milieu) */}
          <Button
            asChild
            variant="outline"
            className="border-[#FFDECF] text-[#664D45] hover:border-[#FF5C3E] hover:text-[#FF5C3E]"
          >
            <Link href="/unsubscribe">Désabonnement</Link>
          </Button>
          
          {/* Bouton de rafraîchissement à droite */}
          <Button 
            onClick={handleRefresh}
            variant="ghost" 
            size="icon"
            className="bg-transparent text-[#664D45] hover:text-[#FF5C3E]"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </>
      );
    }

    // Pendant le chargement initial, afficher un placeholder
    return (
      <div className="flex space-x-4 h-10">
        <div className="w-24 h-10 bg-[#FFF8F5]/50 animate-pulse rounded-md"></div>
        <div className="w-32 h-10 bg-[#FFF8F5]/50 animate-pulse rounded-md"></div>
      </div>
    );
  };

  // Rendu des boutons d'action pour le menu mobile
  const renderMobileActionButtons = () => {
    if (isClient && (authTimeout || !isLoading)) {
      if (isAuthenticated) {
        return (
          <div className="flex flex-col space-y-4 mt-8">
            <Button
              asChild
              className="bg-gradient-to-r from-[#FF5C3E] to-[#FFA728] hover:from-[#F05538] hover:to-[#F5961F] text-white w-full"
            >
              <Link href="/chat">
                <MessageCircle className="mr-2 h-4 w-4" />
                Chat
              </Link>
            </Button>
            <Button 
              onClick={handleRefresh}
              variant="outline" 
              className="w-full border-[#FFDECF] text-[#664D45] hover:text-[#FF5C3E]"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Actualiser
            </Button>
          </div>
        );
      }

      return (
        <div className="flex flex-col space-y-4 mt-8">
          {/* Garder le même ordre dans la version mobile */}
          <Button
            asChild
            className="bg-gradient-to-r from-[#FF5C3E] to-[#FFA728] hover:from-[#F05538] hover:to-[#F5961F] text-white w-full"
          >
            <Link href="/login">Connexion</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-[#FFDECF] text-[#664D45] hover:border-[#FF5C3E] hover:text-[#FF5C3E] w-full"
          >
            <Link href="/unsubscribe">Désabonnement</Link>
          </Button>
          <Button 
            onClick={handleRefresh}
            variant="outline" 
            className="w-full border-[#FFDECF] text-[#664D45] hover:text-[#FF5C3E]"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Actualiser
          </Button>
        </div>
      );
    }

    return (
      <div className="flex flex-col space-y-4 mt-8">
        <div className="w-full h-12 bg-[#FFF8F5]/50 animate-pulse rounded-md"></div>
      </div>
    );
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-[#FFDECF] py-3"
          : "bg-gradient-to-br from-[#FFEFE8] to-[#FFF6E8] py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo à gauche */}
        <div className="flex items-center z-50">
          <Link href="/" className="flex items-center space-x-2 mr-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FF5C3E] to-[#FFA728] flex items-center justify-center mr-3 transition-colors duration-300">
              <Flame className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-[#2D1811] transition-colors duration-300">
              SeducIA
            </span>
          </Link>
        </div>

        {/* Boutons d'action à droite */}
        <div className="hidden md:flex items-center space-x-4 z-50">
          {renderActionButtons()}
        </div>
          
        {/* Bouton menu mobile */}
        <div className="flex md:hidden items-center space-x-4">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md text-[#664D45] hover:text-[#FF5C3E] transition-colors duration-200"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      
        {/* Menu mobile */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 h-screen bg-gradient-to-br from-[#FFEFE8] to-[#FFF6E8] flex flex-col"
            >
              <div className="container mx-auto px-4 pt-24 pb-8 flex flex-col flex-grow">
                {renderMobileActionButtons()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header; 