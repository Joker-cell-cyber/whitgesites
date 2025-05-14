'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/app/context/auth-context";
import { Search, User, LogOut, Plus, Zap, ChevronDown, CreditCard } from "lucide-react";

export default function HeaderDashboard() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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

  // Fermer les menus lors d'un clic à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isProfileOpen) {
        const target = event.target as HTMLElement;
        if (!target.closest('[data-dropdown="profile"]')) {
          setIsProfileOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileOpen]);

  // Gérer la déconnexion
  const handleLogout = () => {
    logout();
  };

  // Gérer la recherche
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implémenter la logique de recherche
    console.log(`Recherche: ${searchQuery}`);
    setSearchQuery("");
  };

  // Si l'utilisateur n'est pas authentifié, ne pas afficher le header
  if (!isAuthenticated) {
    return null;
  }

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 z-40 h-16 bg-fs-slate-900/90 backdrop-blur-xl border-b border-fs-teal-500/20">
      {/* Ligne de lueur en haut */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fs-teal-500/60 to-transparent"></div>
      
      <div className="h-full px-4 md:px-6 flex items-center justify-between relative z-10">
        {/* Titre de la page actuelle */}
        <div className="flex items-center">
          <h1 className="text-xl font-bold fs-text-gradient hidden md:block">
            {pathname === '/dashboard' && 'Tableau de bord'}
            {pathname === '/dashboard/programs' && 'Programmes'}
            {pathname === '/dashboard/nutrition' && 'Nutrition'}
            {pathname === '/dashboard/analytics' && 'Analytiques'}
            {pathname === '/dashboard/progress' && 'Progression'}
            {pathname === '/dashboard/history' && 'Historique'}
            {pathname === '/dashboard/settings' && 'Paramètres'}
            {pathname.includes('/tokens') && 'Tokens'}
          </h1>
        </div>
        
        {/* Recherche */}
        <div className="hidden md:block flex-1 max-w-md mx-auto px-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full h-9 px-4 pl-9 pr-4 bg-fs-slate-800/80 backdrop-blur-sm border border-fs-teal-500/30 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-fs-teal-500/50 placeholder-fs-slate-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-fs-teal-400" />
          </form>
        </div>
        
        {/* Actions */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Tokens */}
          <div className="hidden md:flex items-center px-3 py-1.5 rounded-lg border border-fs-teal-500/40 bg-fs-teal-900/20 backdrop-blur-sm">
            <Zap className="h-4 w-4 text-fs-teal-400 mr-2" />
            <span className="text-white font-medium">{user?.tokensRemaining || 0}</span>
            <span className="text-fs-teal-300 text-xs ml-1">tokens</span>
          </div>

          {/* Nouveau programme */}
          <Link 
            href="/dashboard/programs/new" 
            className="hidden md:flex items-center px-3 py-1.5 rounded-lg fs-high-contrast-bg hover:bg-fs-teal-600 transition-colors"
          >
            <Plus className="h-4 w-4 text-white mr-2" />
            <span>Nouveau</span>
          </Link>
          
          {/* Profil utilisateur */}
          <div className="relative" data-dropdown="profile">
            <button 
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
              }}
              className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-fs-teal-900/30 text-fs-teal-300 hover:text-white transition-colors"
            >
              <div className="h-8 w-8 rounded-lg bg-fs-slate-800 border border-fs-teal-500/30 flex items-center justify-center overflow-hidden">
                <User className="h-5 w-5 text-white" />
              </div>
              <ChevronDown className="h-4 w-4 text-fs-teal-500 hidden md:block" />
            </button>
            
            {/* Dropdown du profil - simplifié */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-fs-slate-800/95 backdrop-blur-xl border border-fs-teal-500/30 rounded-xl shadow-lg shadow-black/30 overflow-hidden z-50">
                <div className="p-4 border-b border-fs-teal-500/20">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-lg bg-fs-slate-900 border border-fs-teal-500/30 flex items-center justify-center overflow-hidden">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{user?.firstName ? `${user.firstName} ${user.lastName || ''}` : 'Utilisateur'}</h3>
                      <p className="text-sm text-fs-teal-400">{user?.email || 'utilisateur@exemple.com'}</p>
                    </div>
                  </div>
                </div>
                <div className="py-2">
                  <Link 
                    href="/unsubscribe" 
                    className="flex items-center px-4 py-2 hover:bg-fs-teal-900/20 text-white transition-colors"
                  >
                    <CreditCard className="h-4 w-4 mr-3 text-fs-teal-400" />
                    Désabonnement
                  </Link>
                </div>
                <div className="p-2 border-t border-fs-teal-500/20">
                  <button 
                    onClick={handleLogout}
                    className="flex w-full items-center px-4 py-2 rounded-lg hover:bg-red-900/20 text-red-400 transition-colors"
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Déconnexion
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Effet de particules */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {stars.map((star, index) => (
          <div 
            key={index}
            className="absolute rounded-full bg-fs-teal-500/20 animate-float"
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