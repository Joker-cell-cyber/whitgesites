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
    { id: 1, title: "Nouvel article généré", message: "Votre article sur le marketing a été généré avec succès.", time: "Il y a 5 min", read: false },
    { id: 2, title: "Tokens ajoutés", message: "100 tokens ont été ajoutés à votre compte.", time: "Il y a 2h", read: false },
    { id: 3, title: "Mise à jour système", message: "Le système a été mis à jour avec de nouvelles fonctionnalités.", time: "Hier", read: true },
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
    <header className="fixed top-0 right-0 left-0 lg:left-64 z-40 h-16 bg-black/60 backdrop-blur-xl border-b border-purple-500/20">
      {/* Ligne de lueur en haut */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
      
      <div className="h-full px-4 md:px-6 flex items-center justify-between">
        {/* Titre de la page actuelle */}
        <div className="hidden md:block">
          <h1 className="text-xl font-bold text-white">
            {pathname === '/dashboard' && 'Tableau de bord'}
            {pathname === '/generate' && 'Générer un article'}
            {pathname === '/generate/product-description' && 'Générer une description'}
            {pathname === '/tokens' && 'Acheter des tokens'}
          </h1>
        </div>
        
        {/* Recherche */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <input 
              type="text" 
              placeholder="Rechercher..." 
              className="w-full bg-black/40 border border-purple-500/20 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Affichage des tokens */}
          <Link href="/tokens" className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/20 hover:from-blue-600/30 hover:to-purple-600/30 transition-all duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-white font-medium">{user?.tokenBalance || 0}</span>
            <span className="text-gray-400 text-sm">tokens</span>
          </Link>
          
          {/* Bouton de génération rapide */}
          <Link href="/generate" className="hidden md:block">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Générer
            </Button>
          </Link>
          
          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => {
                setIsNotificationsOpen(!isNotificationsOpen);
                setIsProfileOpen(false);
              }}
              className="relative p-2 rounded-full hover:bg-white/5 transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {notifications.some(n => !n.read) && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>
            
            {/* Dropdown des notifications */}
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-black/80 backdrop-blur-xl border border-purple-500/20 rounded-xl shadow-lg overflow-hidden z-50">
                <div className="p-4 border-b border-purple-500/20">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-white">Notifications</h3>
                    <button className="text-sm text-purple-400 hover:text-purple-300">
                      Tout marquer comme lu
                    </button>
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500/20 scrollbar-track-transparent">
                  {notifications.length > 0 ? (
                    <div>
                      {notifications.map((notification) => (
                        <div 
                          key={notification.id} 
                          className={`p-4 border-b border-purple-500/10 hover:bg-white/5 transition-colors duration-200 ${notification.read ? '' : 'bg-purple-500/5'}`}
                        >
                          <div className="flex justify-between">
                            <h4 className="font-medium text-white">{notification.title}</h4>
                            {!notification.read && (
                              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                            )}
                          </div>
                          <p className="text-sm text-gray-400 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-400">
                      Aucune notification
                    </div>
                  )}
                </div>
                <div className="p-3 border-t border-purple-500/20 text-center">
                  <button className="text-sm text-purple-400 hover:text-purple-300">
                    Voir toutes les notifications
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Profil utilisateur */}
          <div className="relative">
            <button 
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
                setIsNotificationsOpen(false);
              }}
              className="flex items-center space-x-2 p-1 rounded-full hover:bg-white/5 transition-colors duration-200"
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                <span className="text-white font-medium">{user?.firstName?.charAt(0) || 'U'}</span>
              </div>
              <span className="hidden md:block text-white">{user?.firstName || 'Utilisateur'}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="hidden md:block h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Dropdown du profil */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-60 bg-black/80 backdrop-blur-xl border border-purple-500/20 rounded-xl shadow-lg overflow-hidden z-50">
                <div className="p-4 border-b border-purple-500/20">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                      <span className="text-white font-medium">{user?.firstName?.charAt(0) || 'U'}</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{user?.firstName ? `${user.firstName} ${user.lastName || ''}` : 'Utilisateur'}</h3>
                      <p className="text-sm text-gray-400">{user?.email || 'utilisateur@example.com'}</p>
                    </div>
                  </div>
                </div>
                <div className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500/20 scrollbar-track-transparent">
                  <Link href="/dashboard" className="block p-3 hover:bg-white/5 transition-colors duration-200">
                    <div className="flex items-center space-x-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      <span className="text-white">Tableau de bord</span>
                    </div>
                  </Link>
                </div>
                <div className="border-t border-purple-500/20 p-3">
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
} 