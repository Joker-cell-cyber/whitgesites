'use client';

import Link from "next/link";
import { useState, useEffect } from 'react';
import AuthStatus from "@/app/components/auth/auth-status";
import { Button } from "@/app/components/ui/button";
import { DumbbellIcon, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Détecter le défilement pour ajuster l'apparence du header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
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

  useEffect(() => {
    // Fermer le menu mobile lors du changement de route
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-white/95 shadow-sm backdrop-blur-md h-16 sm:h-16" 
        : "bg-transparent h-20 sm:h-20"
    }`}>
      {/* Bordure subtile en bas */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#A590DC]/50 to-transparent"></div>
      
      <div className="container mx-auto h-full flex items-center px-4 sm:px-6">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <Link href="/" className="relative group">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-xl nrl-card-lavender flex items-center justify-center mr-2 shadow-sm group-hover:scale-105 transition-transform duration-300">
                <DumbbellIcon className="h-6 w-6 text-[#A590DC]" />
              </div>
              <span className="text-xl font-medium text-[#2A303D] group-hover:nrl-text-primary transition-colors duration-300">
                Fitness<span className="nrl-text-primary">BrainAI</span>
              </span>
            </div>
          </Link>
          
          {/* Boutons d'authentification et désabonnement - version desktop */}
          <div className="hidden md:flex items-center space-x-4 ml-auto">
            <Link 
              href="/cancel-subscription" 
              className="relative group overflow-hidden rounded-xl cursor-pointer active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 rounded-xl"></div>
              <div className="absolute inset-0 bg-white rounded-xl m-[1px] group-hover:m-[2px] transition-all duration-200"></div>
              <span className="relative z-10 px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base text-red-600 rounded-xl bg-transparent transition-all duration-200 block text-center font-medium">
                Désabonnement
              </span>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
            </Link>
            <AuthStatus className="flex items-center space-x-4" />
          </div>
          
          {/* Bouton menu hamburger - version mobile */}
          <button 
            className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#F5F2FC] text-[#2A303D]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu principal"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      
      {/* Menu mobile */}
      <div 
        className={`fixed inset-0 z-40 bg-white/98 backdrop-blur-md transform transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        } md:hidden pt-20`}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col space-y-6">
            {/* Version mobile du bouton de désabonnement */}
            <Link 
              href="/cancel-subscription" 
              className="relative group overflow-hidden rounded-xl cursor-pointer active:scale-95 w-full"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 rounded-xl"></div>
              <div className="absolute inset-0 bg-white rounded-xl m-[1px] group-hover:m-[2px] transition-all duration-200"></div>
              <span className="relative z-10 px-4 py-3 text-base text-red-600 rounded-xl bg-transparent transition-all duration-200 block text-center font-medium">
                Désabonnement
              </span>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
            </Link>
            
            {/* Version mobile des boutons d'authentification */}
            <div className="py-4 border-t border-[#E2D9F3]">
              <AuthStatus className="flex flex-col space-y-3" isMobile={true} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 