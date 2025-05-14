'use client';

import Link from "next/link";
import { useState, useEffect } from 'react';
import AuthStatus from "@/app/components/auth/auth-status";
import { cn } from "@/app/lib/utils";
import { Button } from "@/app/components/ui/button";
import { Menu, X, Sparkles } from "lucide-react";

// Navigation supprimée comme demandé
const navigation = [];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Surveiller le scroll pour appliquer un effet au header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Empêcher le défilement du body quand le menu mobile est ouvert
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled 
        ? "bg-white/95 backdrop-blur-sm shadow-sm h-16" 
        : "bg-white/80 backdrop-blur-sm h-20"
    )}>
      <div className="container mx-auto h-full flex items-center px-4 sm:px-6">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <Link href="/" className="relative group">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-200">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">
                <span className="text-secondary-800">SEOForge</span>
                <span className="text-primary-600">AI</span>
              </span>
            </div>
          </Link>
          
          {/* Boutons d'authentification - version desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <AuthStatus className="flex items-center space-x-4" />
          </div>
          
          {/* Bouton menu hamburger - version mobile */}
          <button 
            className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center rounded-lg hover:bg-primary-50 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu principal"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-secondary-800" />
            ) : (
              <Menu className="w-6 h-6 text-secondary-800" />
            )}
          </button>
        </div>
      </div>
      
      {/* Menu mobile */}
      <div 
        className={cn(
          "fixed inset-0 z-40 bg-white/95 backdrop-blur-sm transform transition-transform duration-300 md:hidden",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col pt-24 px-6 pb-8 h-full overflow-y-auto">
          <div className="mt-auto">
            <AuthStatus className="flex flex-col space-y-4 w-full" isMobile={true} />
          </div>
        </div>
      </div>
    </header>
  );
}

// Ajout de l'exportation par défaut
export default Header; 