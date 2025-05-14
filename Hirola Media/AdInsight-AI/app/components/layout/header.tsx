'use client';

import Link from "next/link";
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from "@/app/context/auth-context";
import { Button } from "@/app/components/ui/button";
import { ChevronDown, Menu, X, Zap, CreditCard, LogOut, BarChart3, PlusCircle, User, Lock } from "lucide-react";

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Effet de changement de style au scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Fermer le menu mobile lors d'un changement de route
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled
        ? 'bg-white/95 backdrop-blur-md border-b border-adfi-slate-200 py-3'
        : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative flex items-center space-x-2 transition-transform duration-200 hover:scale-105">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-adfi-blue-600 to-adfi-blue-500 flex items-center justify-center shadow-lg shadow-adfi-blue-500/20">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className={`text-xl font-bold transition-colors duration-300 ${
                isScrolled ? 'text-adfi-slate-900' : 'text-adfi-slate-900'
              }`}>
                AdInsight<span className="text-adfi-blue-600">AI</span>
              </span>
            </div>
          </Link>
          
          {/* Espace vide pour remplacer la navigation */}
          <div className="flex-1"></div>
          
          {/* Actions utilisateur - Version desktop */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                {/* Indicateur de tokens */}
                <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border transition-colors duration-300 ${
                  isScrolled 
                    ? 'bg-adfi-blue-50 border-adfi-blue-100 text-adfi-blue-800' 
                    : 'bg-adfi-blue-600/80 border-adfi-blue-700 text-white backdrop-blur-sm'
                }`}>
                  <CreditCard className="h-4 w-4" />
                  <span className="font-medium">{user?.tokenBalance || 0}</span>
                  <span className={`text-sm ${isScrolled ? 'text-adfi-blue-600' : 'text-adfi-blue-100'}`}>tokens</span>
                </div>
                
                {/* Menu utilisateur */}
                <div className="relative">
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                      isScrolled 
                        ? 'text-adfi-slate-700 hover:text-adfi-slate-900 hover:bg-adfi-slate-100' 
                        : 'text-adfi-slate-100 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-adfi-blue-100 flex items-center justify-center">
                      <span className="text-adfi-blue-600 font-medium">
                        {user?.firstName?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white shadow-lg border border-adfi-slate-200 py-2 z-50">
                      <div className="px-4 py-2 border-b border-adfi-slate-100">
                        <p className="text-sm font-medium text-adfi-slate-900">{`${user?.firstName || ''} ${user?.lastName || ''}`  || 'Utilisateur'}</p>
                        <p className="text-xs text-adfi-slate-500">{user?.email || 'email@exemple.com'}</p>
                      </div>
                      
                      <div className="py-1">
                        <Link 
                          href="/tokens" 
                          className="flex items-center px-4 py-2 text-sm text-adfi-slate-700 hover:bg-adfi-slate-50 hover:text-adfi-slate-900"
                        >
                          <PlusCircle className="w-4 h-4 mr-3 text-adfi-slate-400" />
                          <span>Acheter des tokens</span>
                        </Link>
                        
                        <Link 
                          href="/unsubscribe" 
                          className="flex items-center px-4 py-2 text-sm text-adfi-slate-700 hover:bg-adfi-slate-50 hover:text-adfi-slate-900"
                        >
                          <LogOut className="w-4 h-4 mr-3 text-adfi-slate-400" />
                          <span>Désabonnement</span>
                        </Link>
                      </div>
                      
                      <div className="py-1 border-t border-adfi-slate-100">
                        <button 
                          onClick={logout}
                          className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <LogOut className="w-4 h-4 mr-3 text-red-500" />
                          <span>Déconnexion</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button 
                    variant="secondary" 
                    size="sm"
                    className={`transition-colors duration-300 ${
                      isScrolled ? '' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                    }`}
                  >
                    Connexion
                  </Button>
                </Link>
                
                <Link href="/unsubscribe">
                  <Button 
                    variant={isScrolled ? "destructive" : "secondary"}
                    size="sm"
                    className={isScrolled ? "" : "border-red-300 text-red-500 hover:bg-red-50/20"}
                  >
                    Désabonnement
                  </Button>
                </Link>
              </>
            )}
          </div>
          
          {/* Bouton menu mobile */}
          <button 
            className="md:hidden flex items-center justify-center p-2 rounded-lg text-adfi-slate-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      
      {/* Menu mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-adfi-slate-200 shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="mt-4 pt-0 flex flex-col space-y-3">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-adfi-blue-100 flex items-center justify-center">
                        <span className="text-adfi-blue-600 font-medium">
                          {user?.firstName?.charAt(0) || 'U'}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-adfi-slate-900">{`${user?.firstName || ''} ${user?.lastName || ''}`  || 'Utilisateur'}</p>
                        <p className="text-sm text-adfi-slate-500">{user?.email || 'email@exemple.com'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center bg-adfi-blue-50 px-3 py-1.5 rounded-lg border border-adfi-blue-100">
                      <CreditCard className="h-4 w-4 text-adfi-blue-600 mr-2" />
                      <span className="font-medium text-adfi-blue-800">{user?.tokenBalance || 0}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <Link href="/tokens" className="flex items-center p-3 rounded-lg border border-adfi-slate-200 hover:bg-adfi-slate-50">
                      <PlusCircle className="w-5 h-5 mr-2 text-adfi-blue-600" />
                      <span className="text-adfi-slate-800">Acheter des tokens</span>
                    </Link>
                    
                    <Link href="/unsubscribe" className="flex items-center p-3 rounded-lg border border-adfi-slate-200 hover:bg-adfi-slate-50">
                      <LogOut className="w-5 h-5 mr-2 text-adfi-blue-600" />
                      <span className="text-adfi-slate-800">Désabonnement</span>
                    </Link>
                    
                    <button 
                      onClick={logout}
                      className="flex items-center p-3 rounded-lg border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 col-span-2"
                    >
                      <LogOut className="w-5 h-5 mr-2 text-red-600" />
                      <span>Déconnexion</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/login" className="flex items-center justify-center p-3 rounded-lg border border-adfi-slate-200 text-adfi-slate-800 hover:bg-adfi-slate-50">
                    <Lock className="w-5 h-5 mr-2 text-adfi-blue-600" />
                    <span>Connexion</span>
                  </Link>
                  
                  <Link href="/unsubscribe" className="flex items-center justify-center p-3 rounded-lg bg-red-500 text-white hover:bg-red-600">
                    <LogOut className="w-5 h-5 mr-2" />
                    <span>Désabonnement</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Overlay pour fermer le dropdown quand on clique ailleurs */}
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsDropdownOpen(false)}
        ></div>
      )}
    </header>
  );
} 