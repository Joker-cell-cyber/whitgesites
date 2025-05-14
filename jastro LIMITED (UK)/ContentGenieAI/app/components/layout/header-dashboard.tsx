'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  UserCircle,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/auth-context';

// Définition du composant WaveIcon
const WaveIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
  </svg>
);

const HeaderDashboard = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuth();
  const [stars, setStars] = useState<Array<{
    size: number;
    top: number;
    left: number;
    opacity: number;
    animationDuration: number;
    animationDelay: number;
  }>>([]);

  // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // Fermer le menu lors d'un clic à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Générer les étoiles côté client uniquement pour éviter les erreurs d'hydratation
  useEffect(() => {
    const newStars = Array.from({ length: 20 }).map(() => ({
      size: Math.random() * 3 + 1,
      top: Math.random() * 100,
      left: Math.random() * 100,
      opacity: Math.random() * 0.5 + 0.2,
      animationDuration: Math.random() * 3 + 2,
      animationDelay: Math.random() * 5
    }));
    
    setStars(newStars);
  }, []);

  // Gérer la déconnexion
  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
  };

  // Si l'utilisateur n'est pas authentifié, ne pas afficher le header
  if (!isAuthenticated) {
    return null;
  }

  return (
    <header className="bg-white border-b border-[#BBE5EF] shadow-sm py-3 fixed top-0 left-0 right-0 z-40">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#1A7BA4] to-[#26A69A] flex items-center justify-center mr-3">
                <WaveIcon className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-[#0E2D3F]">
                Content<span className="text-[#1A7BA4]">GenieAI</span>
              </span>
            </Link>
          </div>
          
          {/* Actions */}
          <div className="flex items-center space-x-1">
            {/* User Menu */}
            <div className="relative" ref={menuRef}>
              <button
                className="flex items-center space-x-2 p-1.5 rounded-full hover:bg-[#E3F4F9] transition-colors duration-200"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#1A7BA4] to-[#26A69A] flex items-center justify-center text-white">
                  <UserCircle className="h-6 w-6" />
                </div>
                <ChevronDown className={`h-4 w-4 text-[#0E2D3F] transition-transform duration-200 hidden sm:block ${
                  userMenuOpen ? 'rotate-180' : ''
                }`} />
              </button>
              
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg overflow-hidden border border-[#BBE5EF] z-50">
                  <div className="p-4 border-b border-[#BBE5EF] bg-[#E3F4F9]">
                    <p className="font-medium text-[#0E2D3F]">{user?.firstName || 'Utilisateur'}</p>
                    <p className="text-sm text-[#667A8A]">{user?.email || 'utilisateur@example.com'}</p>
                  </div>
                  
                  <div className="py-2">
                    <Link href="/dashboard/unsubscribe" onClick={() => setUserMenuOpen(false)}>
                      <div className="flex items-center w-full px-4 py-2 text-amber-600 hover:bg-amber-50 transition-colors duration-200 text-left cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                        </svg>
                        <span>Désabonnement</span>
                      </div>
                    </Link>
                    <div 
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-200 text-left cursor-pointer"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      <span>Déconnexion</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Effet de particules */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {stars.map((star, index) => (
          <div 
            key={index}
            className="absolute rounded-full bg-gradient-to-r from-blue-400/30 to-purple-500/30 animate-float"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              top: `${star.top}%`,
              left: `${star.left}%`,
              opacity: star.opacity,
              animationDuration: `${star.animationDuration}s`,
              animationDelay: `${star.animationDelay}s`,
              filter: "blur(1px)"
            }}
          />
        ))}
      </div>
    </header>
  );
};

export default HeaderDashboard; 