'use client';

import Link from "next/link";
import { useAuth } from "@/app/context/auth-context";
import { Button } from "@/app/components/ui/button";
import { useState, useEffect } from "react";
import { Menu, X, BarChart2, LineChart } from "lucide-react";

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md py-2' : 'bg-white/90 backdrop-blur-sm py-4'
    }`}>
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mr-2 shadow-sm">
            <BarChart2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
              AdPulseAI
            </span>
          </div>
        </Link>
        
        {/* Actions utilisateur - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              {/* Affichage des analyses */}
              <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-orange-200 bg-orange-50 text-orange-700">
                <LineChart className="w-4 h-4" />
                <span className="font-medium">{user?.['analysisCredits'] || 0}</span>
                <span className="text-sm">crédits</span>
              </div>

              {/* Bouton Analyse Facebook */}
              <Link href="/facebook-analysis">
                <Button variant="outline" size="sm" className="border-orange-500 text-orange-700 hover:bg-orange-50">
                  Nouvelle analyse
                </Button>
              </Link>

              {/* Bouton Acheter des crédits */}
              <Link href="/tokens" prefetch={false}>
                <Button variant="outline" size="sm">
                  Acheter des crédits
                </Button>
              </Link>

              {/* Menu utilisateur */}
              <Button 
                variant="ghost" 
                onClick={logout}
                className="text-gray-700 hover:text-orange-600"
                size="sm"
              >
                Déconnexion
              </Button>
            </>
          ) : (
            <>
              {/* Bouton Connexion */}
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Connexion
                </Button>
              </Link>
            </>
          )}
        </div>
        
        {/* Bouton menu mobile */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>
      
      {/* Menu mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-orange-100 shadow-lg animate-fade-in-down">
          <div className="container mx-auto px-4 py-6 space-y-6">
            {isAuthenticated ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-orange-200 bg-orange-50 text-orange-700">
                  <LineChart className="w-4 h-4" />
                  <span className="font-medium">{user?.['analysisCredits'] || 0}</span>
                  <span className="text-sm">crédits</span>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/facebook-analysis" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full border-orange-500 text-orange-700 hover:bg-orange-50">
                      Nouvelle analyse
                    </Button>
                  </Link>
                  <Link href="/tokens" prefetch={false} onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Acheter des crédits
                    </Button>
                  </Link>
                </div>
                
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full justify-center text-gray-700 hover:text-orange-600"
                >
                  Déconnexion
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Connexion
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
} 