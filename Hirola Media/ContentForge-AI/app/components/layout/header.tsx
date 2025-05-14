'use client';

import Link from "next/link";
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, Sparkles } from 'lucide-react';
import AuthStatus from "@/app/components/auth/auth-status";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Effet de particules dorées
  const [particles, setParticles] = useState<Array<{
    size: number;
    posX: number;
    posY: number;
    opacity: number;
    rotation: number;
    animationDuration: number;
  }>>([]);

  // Générer les particules
  useEffect(() => {
    const newParticles = Array.from({ length: 15 }).map(() => ({
      size: Math.random() * 6 + 2,
      posX: Math.random() * 100,
      posY: Math.random() * 100,
      opacity: Math.random() * 0.4 + 0.1,
      rotation: Math.random() * 360,
      animationDuration: Math.random() * 15 + 10
    }));
    
    setParticles(newParticles);
  }, []);

  // Gérer le changement d'apparence lors du défilement
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-gradient-to-r from-ocrf-anthracite-900/90 to-ocrf-brown-900/90 backdrop-blur-md py-3 shadow-lg shadow-black/30' 
        : 'bg-transparent py-4'
    }`}>
      {/* Ligne décorative en haut */}
      <div className={`absolute top-0 left-0 right-0 h-px transition-opacity duration-300 ${
        scrolled 
          ? 'bg-gradient-to-r from-transparent via-ocrf-gold-500/40 to-transparent opacity-100' 
          : 'opacity-0'
      }`}></div>
      
      {/* Effet de particules */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle, index) => (
          <div 
            key={index}
            className="absolute"
            style={{
              top: `${particle.posY}%`,
              left: `${particle.posX}%`,
              opacity: particle.opacity,
              animation: `float ${particle.animationDuration}s ease-in-out infinite alternate`
            }}
          >
            <div 
              className="w-full h-full bg-ocrf-gold-300" 
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                transform: `rotate(${particle.rotation}deg)`,
              }}
            />
          </div>
        ))}
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative group">
            <div className="absolute inset-0 rounded-full bg-ocrf-gold-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex items-center space-x-3 relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ocrf-gold-400 to-ocrf-copper-500 flex items-center justify-center shadow-lg shadow-ocrf-gold-500/20 overflow-hidden">
                <Sparkles className="h-5 w-5 text-ocrf-anthracite-900" />
              </div>
              <div>
                <div className="flex items-center">
                  <span className="text-xl font-serif font-bold text-white">Content</span>
                  <span className="text-xl font-serif font-bold text-ocrf-gold-400">Forge AI</span>
                </div>
              </div>
            </div>
          </Link>
          
          {/* Boutons d'action - version desktop */}
          <div className="hidden md:flex items-center">
            <AuthStatus className="flex items-center space-x-2" />
          </div>
          
          {/* Bouton menu hamburger - version mobile */}
          <button 
            className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center bg-ocrf-anthracite-800/40 backdrop-blur-sm rounded-full border border-ocrf-gold-500/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu principal"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5 text-ocrf-gold-300" />
            ) : (
              <Menu className="h-5 w-5 text-ocrf-gold-300" />
            )}
          </button>
        </div>
      </div>
      
      {/* Menu mobile */}
      <div 
        className={`fixed inset-0 z-40 bg-gradient-to-b from-ocrf-anthracite-900/95 to-ocrf-brown-900/95 backdrop-blur-xl transform transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
        } md:hidden`}
      >
        <div className="flex flex-col h-full pt-20 px-6 pb-8">
          <div className="mt-auto pt-6 flex flex-col">
            <AuthStatus className="flex flex-col space-y-3 px-4" />
          </div>
        </div>
      </div>
    </header>
  );
} 