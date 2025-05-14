'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/app/components/ui/button';
import { Sprout, Menu, X, Leaf, ChevronDown, ChevronRight, TreePine } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Détecte le défilement pour modifier le style du header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ferme le menu mobile lors de la navigation
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-full">
              <TreePine className="h-8 w-8 text-[#5F7138]" />
              <Leaf className="absolute -right-1 bottom-0 h-5 w-5 text-[#C17A56]" />
            </div>
            <span className="font-bold text-[#4F4639] lg:text-lg">AdIntelliVue</span>
          </Link>

          {/* Actions desktop */}
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="outline" size="sm" className="font-medium">
                Connexion
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}