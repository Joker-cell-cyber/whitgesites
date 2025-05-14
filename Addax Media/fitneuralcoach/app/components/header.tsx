'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, Brain } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Accueil", href: "#" },
  { name: "Fonctionnalités", href: "#" },
  { name: "Modules", href: "#" },
  { name: "Témoignages", href: "#" },
  { name: "Tarifs", href: "#" },
];

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
          <a href="/" className="relative group">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center shadow-lg shadow-rose-200">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">
                <span className="text-gray-800">Neura</span>
                <span className="text-rose-600">learns</span>
              </span>
            </div>
          </a>
          
          {/* Navigation principale - desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <a 
                key={item.name}
                href={item.href} 
                className="text-gray-700 hover:text-rose-600 font-medium transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>
          
          {/* Boutons d'authentification - version desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="/login" className="text-gray-700 hover:text-rose-600 font-medium">
              Connexion
            </a>
            <Button className="bg-rose-600 hover:bg-rose-500">
              Essai gratuit
            </Button>
          </div>
          
          {/* Bouton menu hamburger - version mobile */}
          <button 
            className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center rounded-lg hover:bg-rose-50 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu principal"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-800" />
            ) : (
              <Menu className="w-6 h-6 text-gray-800" />
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
          <nav className="flex flex-col space-y-6 mb-8">
            {navigation.map((item) => (
              <a 
                key={item.name}
                href={item.href} 
                className="text-xl text-gray-800 hover:text-rose-600 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </nav>
          
          <div className="mt-auto space-y-4">
            <a 
              href="/login" 
              className="block w-full text-center py-3 text-gray-700 hover:text-rose-600 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Connexion
            </a>
            <a 
              href="/register" 
              className="block w-full text-center py-3 px-4 rounded-md bg-rose-600 text-white font-medium hover:bg-rose-500 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Essai gratuit
            </a>
          </div>
        </div>
      </div>
    </header>
  );
} 