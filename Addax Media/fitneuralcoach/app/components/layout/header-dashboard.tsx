'use client';

import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/app/context/auth-context";

export default function HeaderDashboard() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuth();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
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

  // Notifications fictives pour la démo
  const notifications = [
    { id: 1, title: "Nouveau programme", message: "Votre programme de musculation a été généré avec succès.", time: "Il y a 5 min", read: false },
    { id: 2, title: "Tokens ajoutés", message: "100 tokens ont été ajoutés à votre compte.", time: "Il y a 2h", read: false },
    { id: 3, title: "Nouvel article disponible", message: "Un nouvel article sur la nutrition et la prise de masse est disponible.", time: "Hier", read: true },
  ];

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
  };

  // Si l'utilisateur n'est pas authentifié, ne pas afficher le header
  if (!isAuthenticated) {
    return null;
  }

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 z-40 h-16 bg-black/60 backdrop-blur-xl border-b border-red-500/20">
      {/* Ligne de lueur en haut */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
      
      <div className="h-full px-4 md:px-6 flex items-center justify-between">
        {/* Titre de la page actuelle */}
        <div className="hidden md:block">
          <h1 className="text-xl font-bold text-white">
            {pathname === '/dashboard' && 'Tableau de bord'}
            {pathname === '/coach' && 'Coach IA'}
            {pathname === '/programs' && 'Programmes d\'entraînement'}
            {pathname === '/nutrition' && 'Plans nutritionnels'}
            {pathname === '/articles' && 'Articles de musculation'}
            {pathname === '/tokens' && 'Acheter des tokens'}
            {pathname === '/profile' && 'Profil'}
          </h1>
        </div>
        
        {/* Actions */}
        <div className="flex items-center space-x-4 ml-auto">
          {/* Bouton de génération rapide */}
          <Link href="/programs" className="hidden md:block">
            <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Créer Programme
            </Button>
          </Link>
          
          {/* Profil utilisateur */}
          <div className="relative">
            <button 
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
                setIsNotificationsOpen(false);
              }}
              className="flex items-center space-x-2 p-1 rounded-full hover:bg-white/5 transition-colors duration-200"
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-red-500 to-orange-400 flex items-center justify-center">
                <span className="text-white font-medium">{user?.firstName?.charAt(0) || 'U'}</span>
              </div>
              <span className="hidden md:block text-white">{user?.firstName || 'Utilisateur'}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="hidden md:block h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Dropdown du profil */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-60 bg-black/80 backdrop-blur-xl border border-red-500/20 rounded-xl shadow-lg overflow-hidden z-50">
                <div className="p-4 border-b border-red-500/20">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-red-500 to-orange-400 flex items-center justify-center">
                      <span className="text-white font-medium">{user?.firstName?.charAt(0) || 'U'}</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{user?.firstName ? `${user.firstName} ${user.lastName || ''}` : 'Utilisateur'}</h3>
                      <p className="text-sm text-gray-400">{user?.email || 'utilisateur@example.com'}</p>
                    </div>
                  </div>
                </div>
                <div className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-red-500/20 scrollbar-track-transparent">
                  <Link href="/unsubscribe" className="block p-3 hover:bg-white/5 transition-colors duration-200">
                    <div className="flex items-center space-x-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                      </svg>
                      <span className="text-white">Désabonnement</span>
                    </div>
                  </Link>
                </div>
                <div className="border-t border-red-500/20 p-3">
                  <button 
                    onClick={handleLogout}
                    className="flex items-center space-x-3 text-red-400 hover:text-red-300 transition-colors duration-200 w-full text-left"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Déconnexion</span>
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
            className="absolute rounded-full bg-gradient-to-r from-red-400/30 to-orange-500/30 animate-float"
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