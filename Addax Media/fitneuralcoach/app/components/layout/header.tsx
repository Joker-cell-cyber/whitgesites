'use client';

import Link from "next/link";
import { useState, useEffect } from 'react';
import AuthStatus from "@/app/components/auth/auth-status";
import { SITE_NAME } from "@/app/lib/constants";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Gérer le défilement et l'état du menu mobile
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-neutral-darker/90 backdrop-blur-lg shadow-lg shadow-primary/5 py-3' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto h-full flex items-center px-4 sm:px-6">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <Link href="/" className="relative">
            <span className="text-xl font-bold text-gradient-primary transition-colors duration-300">
              {SITE_NAME}
            </span>
          </Link>
          
          {/* Boutons d'authentification - version desktop */}
          <div className="hidden md:block">
            <AuthStatus className="flex items-center space-x-4 text-white" />
          </div>
          
          {/* Bouton menu hamburger - version mobile */}
          <button 
            className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu principal"
          >
            <div className="relative w-6 h-5 flex flex-col justify-between">
              <span 
                className={`w-full h-0.5 transition-all duration-300 bg-primary ${
                  mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span 
                className={`w-full h-0.5 transition-all duration-300 bg-primary ${
                  mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span 
                className={`w-full h-0.5 transition-all duration-300 bg-primary ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </div>
      
      {/* Menu mobile */}
      <div 
        className={`fixed inset-0 z-40 bg-neutral-darkest/95 backdrop-blur-xl transform transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden pt-24 px-6 border-l border-primary/20`}
      >
        <div className="flex flex-col items-center space-y-6">
          <Link 
            href="/" 
            className="text-xl font-bold text-gradient-primary"
            onClick={() => setMobileMenuOpen(false)}
          >
            Accueil
          </Link>
          
          <div className="w-full pt-6 mt-6 border-t border-primary/20">
            <AuthStatus className="flex flex-col items-center space-y-4 w-full" />
          </div>
        </div>
      </div>
    </header>
  );
}

// Composant de lien de navigation
function NavLink({ href, label, scrolled }: { href: string; label: string; scrolled: boolean }) {
  return (
    <Link 
      href={href} 
      className="font-medium text-white hover:text-primary transition-colors duration-300"
    >
      {label}
    </Link>
  );
} 