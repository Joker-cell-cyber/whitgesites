'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Heart, MessageCircle, RefreshCw } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { NAVIGATION } from "@/app/lib/constants";
import { cn } from "@/app/lib/utils";
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

  // Rendu des boutons d'action basé sur l'état d'authentification
  const renderActionButtons = () => {
    // Toujours afficher les boutons après quelques secondes, indépendamment de l'état d'authentification
    if (isClient && (authTimeout || !isLoading)) {
      if (isAuthenticated) {
        return (
          <>
            <Button
              asChild
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
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
              className="bg-transparent text-yfc-gold-600 hover:text-yfc-gold-800 hover:bg-yfc-cream-100"
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
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
          >
            <Link href="/login">Connexion</Link>
          </Button>
          
          {/* Bouton de désabonnement en second (au milieu) */}
          <Button
            asChild
            variant="outline"
            className="border-red-500/30 text-yfc-gold-800 hover:border-red-500/60 hover:bg-red-500/10"
          >
            <Link href="/unsubscribe">Désabonnement</Link>
          </Button>
          
          {/* Bouton de rafraîchissement à droite */}
          <Button 
            onClick={handleRefresh}
            variant="ghost" 
            size="icon"
            className="bg-transparent text-yfc-gold-600 hover:text-yfc-gold-800 hover:bg-yfc-cream-100"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </>
      );
    }

    // Pendant le chargement initial, afficher un placeholder
    return (
      <div className="flex space-x-4 h-10">
        <div className="w-24 h-10 bg-yfc-cream-200/50 animate-pulse rounded-md"></div>
        <div className="w-32 h-10 bg-yfc-cream-200/50 animate-pulse rounded-md"></div>
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
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white w-full"
            >
              <Link href="/chat">
                <MessageCircle className="mr-2 h-4 w-4" />
                Chat
              </Link>
            </Button>
            <Button 
              onClick={handleRefresh}
              variant="outline" 
              className="w-full border-yfc-gold-300 text-yfc-gold-700 hover:text-yfc-gold-800 hover:bg-yfc-cream-100"
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
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white w-full"
          >
            <Link href="/login">Connexion</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-red-500/30 text-yfc-gold-800 hover:border-red-500/60 hover:bg-red-500/10 w-full"
          >
            <Link href="/unsubscribe">Désabonnement</Link>
          </Button>
          <Button 
            onClick={handleRefresh}
            variant="outline" 
            className="w-full border-yfc-gold-300 text-yfc-gold-700 hover:text-yfc-gold-800 hover:bg-yfc-cream-100"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Actualiser
          </Button>
        </div>
      );
    }

    return (
      <div className="flex flex-col space-y-4 mt-8">
        <div className="w-full h-12 bg-yfc-cream-200/50 animate-pulse rounded-md"></div>
      </div>
    );
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-yfc-cream-50/95 backdrop-blur-md shadow-lg py-3 border-b border-yfc-cream-200"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo à gauche */}
        <div className="flex items-center z-50">
          <Link href="/" className="flex items-center space-x-2 mr-6">
            <Heart className="h-7 w-7 text-pink-500 fill-pink-500" />
            <span className="font-italiana text-2xl tracking-wide text-yfc-gold-800">
              Flirt<span className="text-pink-500">Sage</span>AI
            </span>
          </Link>
        </div>

        {/* Navigation desktop */}
        <nav className="hidden md:flex items-center space-x-8">
          {NAVIGATION.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative text-sm font-medium transition-colors",
                pathname === item.href || pathname.startsWith(item.href + "/")
                  ? "text-pink-400"
                  : "text-yfc-gold-600 hover:text-yfc-gold-800"
              )}
            >
              {pathname === item.href || pathname.startsWith(item.href + "/") ? (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute left-0 top-full block h-[2px] w-full bg-gradient-to-r from-pink-500 to-purple-500"
                />
              ) : null}
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Boutons d'action à droite */}
        <div className="hidden md:flex items-center space-x-4 z-50">
          {renderActionButtons()}
        </div>
          
        {/* Bouton menu mobile */}
        <button 
          onClick={toggleMenu}
          className="md:hidden text-yfc-gold-800 focus:outline-none z-50"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      
        {/* Menu mobile */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-yfc-cream-50 flex flex-col items-center justify-center text-center p-8 z-40"
            >
              <div className="flex flex-col space-y-8 items-center">
                {NAVIGATION.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "text-lg font-medium transition-colors",
                      pathname === item.href
                        ? "text-pink-500"
                        : "text-yfc-gold-700 hover:text-pink-400"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                
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