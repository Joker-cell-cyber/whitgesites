'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Brain } from 'lucide-react';
import AuthStatus from '../auth/auth-status';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [stars, setStars] = useState<Array<{top: number, left: number, opacity: number, size: number, animationDuration: number}>>([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Générer des étoiles aléatoires
    const newStars = Array.from({ length: 20 }, () => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      opacity: Math.random() * 0.5 + 0.2,
      size: Math.random() * 2 + 1,
      animationDuration: Math.random() * 3 + 2
    }));
    setStars(newStars);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-fs-slate-900/90 backdrop-blur-md py-3 shadow-lg shadow-fs-slate-900/50' 
        : 'bg-transparent py-5'
    }`}>
      {/* Ligne de lueur en haut */}
      <div className={`absolute top-0 left-0 right-0 h-px transition-opacity duration-300 ${
        scrolled 
          ? 'bg-gradient-to-r from-transparent via-fs-teal-500/40 to-transparent opacity-100' 
          : 'opacity-0'
      }`}></div>

      {/* Effet de particules */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {stars.map((star, index) => (
          <div 
            key={index}
            className="absolute rounded-full bg-fs-teal-400/30 animate-float"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              top: `${star.top}%`,
              left: `${star.left}%`,
              opacity: star.opacity,
              animationDuration: `${star.animationDuration}s`,
              filter: "blur(1px)"
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative group">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fs-teal-500 to-fs-blue-600 flex items-center justify-center shadow-lg shadow-fs-teal-500/20 overflow-hidden relative">
                <div className="absolute inset-0 bg-black/20"></div>
                <Brain className="h-5 w-5 text-white relative z-10" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white">FitSage AI</span>
                <span className="text-xs text-fs-teal-400 -mt-1">IA Fitness Coach</span>
              </div>
            </div>
          </Link>
          
          {/* Boutons d'authentification - version desktop */}
          <div className="hidden md:block">
            <AuthStatus className="flex items-center space-x-4" />
          </div>
          
          {/* Bouton menu hamburger - version mobile */}
          <button 
            className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center bg-fs-slate-800/80 backdrop-blur-sm rounded-lg border border-fs-slate-700/50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu principal"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5 text-white" />
            ) : (
              <Menu className="h-5 w-5 text-white" />
            )}
          </button>
        </div>
      </div>
      
      {/* Menu mobile */}
      <div 
        className={`fixed inset-0 z-40 bg-fs-slate-900/98 backdrop-blur-xl transform transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
        } md:hidden`}
      >
        <div className="flex flex-col h-full pt-20 px-6 pb-8">
          <div className="mt-auto pt-6">
            <AuthStatus className="flex flex-col space-y-3" />
          </div>
        </div>
      </div>
    </header>
  );
} 