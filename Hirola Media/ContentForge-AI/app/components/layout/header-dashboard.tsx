'use client';

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/app/context/auth-context";

export default function HeaderDashboard() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
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

  // Fermer le menu lorsqu'on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
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
    setIsProfileOpen(false);
  };

  // Si l'utilisateur n'est pas authentifié, ne pas afficher le header
  if (!isAuthenticated) {
    return null;
  }

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 z-40 h-16 bg-[#403D39]/80 backdrop-blur-xl border-b border-[#BF9B30]/20">
      {/* Ligne de lueur en haut */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#BF9B30] to-transparent"></div>
      
      <div className="h-full px-4 md:px-6 flex items-center justify-between">
        {/* Titre - Logo */}
        <div className="flex items-center">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#BF9B30] to-[#C87137] flex items-center justify-center">
              <span className="text-white font-bold">CF</span>
            </div>
            <span className="text-xl font-bold text-white">Content<span className="text-[#BF9B30]">Forge</span> AI</span>
          </Link>
        </div>
        
        {/* Profil utilisateur */}
        <div className="relative" ref={menuRef}>
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center space-x-2 p-1 rounded-full hover:bg-[#BF9B30]/10 transition-colors duration-200"
          >
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#BF9B30] to-[#C87137] flex items-center justify-center">
              <span className="text-white font-medium">{user?.firstName?.charAt(0) || 'U'}</span>
            </div>
            <span className="hidden md:block text-white">{user?.firstName || 'Utilisateur'}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="hidden md:block h-5 w-5 text-[#BF9B30]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {/* Dropdown du profil */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-60 bg-[#403D39]/90 backdrop-blur-xl border border-[#BF9B30]/20 rounded-xl shadow-lg overflow-hidden z-50">
              <div className="p-4 border-b border-[#BF9B30]/20">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#BF9B30] to-[#C87137] flex items-center justify-center">
                    <span className="text-white font-medium">{user?.firstName?.charAt(0) || 'U'}</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{user?.firstName ? `${user.firstName} ${user.lastName || ''}` : 'Utilisateur'}</h3>
                    <p className="text-sm text-gray-400">{user?.email || 'utilisateur@example.com'}</p>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <Link href="/unsubscribe" onClick={() => setIsProfileOpen(false)}>
                  <div className="flex items-center space-x-3 text-[#C87137] hover:text-[#D4B254] transition-colors duration-200 w-full text-left mb-3 cursor-pointer p-2 hover:bg-[#BF9B30]/10 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                    <span>Désabonnement</span>
                  </div>
                </Link>
                
                <div 
                  onClick={handleLogout}
                  className="flex items-center space-x-3 text-red-400 hover:text-red-300 transition-colors duration-200 w-full text-left cursor-pointer p-2 hover:bg-[#BF9B30]/10 rounded-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Déconnexion</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Effet de particules */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {stars.map((star, index) => (
          <div 
            key={index}
            className="absolute rounded-full bg-gradient-to-r from-[#BF9B30]/30 to-[#C87137]/30 animate-float"
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
} 