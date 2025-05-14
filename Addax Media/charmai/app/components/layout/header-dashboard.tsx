'use client';

import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/app/context/auth-context";
import { MessageCircle } from "lucide-react";

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
    { id: 1, title: "Nouveaux conseils disponibles", message: "Votre coach a préparé de nouveaux conseils de séduction pour vous.", time: "Il y a 5 min", read: false },
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
    <header className="fixed top-0 right-0 left-0 lg:left-64 z-40 h-16 bg-white/90 backdrop-blur-md border-b border-pink-100">
      {/* Ligne de lueur en haut */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent"></div>
      
      <div className="h-full px-4 md:px-6 flex items-center justify-between">
        {/* Titre de la page actuelle */}
        <div className="hidden md:block">
          <h1 className="text-xl font-bold text-gray-800">
            {pathname === '/dashboard' && 'Coach de séduction'}
            {pathname === '/chat' && 'Chat'}
            {pathname.startsWith('/chat') && 'Chat'}
            {pathname === '/tokens' && 'Acheter des tokens'}
            {pathname === '/subscriptions' && 'Désabonnement'}
          </h1>
        </div>
        
        {/* Recherche */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <input 
              type="text" 
              placeholder="Rechercher..." 
              className="w-full bg-gray-50 border border-pink-100 rounded-lg py-2 px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-200"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-pink-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Bouton de chat rapide */}
          <Link href="/chat" className="hidden md:block">
            <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white">
              <MessageCircle className="h-5 w-5 mr-2" />
              Chat
            </Button>
          </Link>
          
          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => {
                setIsNotificationsOpen(!isNotificationsOpen);
                setIsProfileOpen(false);
              }}
              className="relative p-2 rounded-full hover:bg-pink-50 transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {notifications.some(n => !n.read) && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>
            
            {/* Dropdown des notifications */}
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-pink-100 rounded-xl shadow-lg overflow-hidden z-50">
                <div className="p-4 border-b border-pink-100">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-800">Notifications</h3>
                    <button className="text-sm text-pink-500 hover:text-pink-700">
                      Tout marquer comme lu
                    </button>
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-pink-200 scrollbar-track-transparent">
                  {notifications.length > 0 ? (
                    <div>
                      {notifications.map((notification) => (
                        <div 
                          key={notification.id} 
                          className={`p-4 border-b border-pink-50 hover:bg-pink-50/50 transition-colors duration-200 ${notification.read ? '' : 'bg-pink-50'}`}
                        >
                          <div className="flex justify-between">
                            <h4 className="font-medium text-gray-800">{notification.title}</h4>
                            {!notification.read && (
                              <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      Aucune notification
                    </div>
                  )}
                </div>
                <div className="p-3 border-t border-pink-100 text-center">
                  <button className="text-sm text-pink-500 hover:text-pink-700">
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
              className="flex items-center space-x-2 p-1 rounded-full hover:bg-pink-50 transition-colors duration-200"
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-pink-400 to-rose-500 flex items-center justify-center">
                <span className="text-white font-medium">{user?.firstName?.charAt(0) || 'U'}</span>
              </div>
              <span className="hidden md:block text-gray-800">{user?.firstName || 'Utilisateur'}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="hidden md:block h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Dropdown du profil */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-60 bg-white border border-pink-100 rounded-xl shadow-lg overflow-hidden z-50">
                <div className="p-4 border-b border-pink-100">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-pink-400 to-rose-500 flex items-center justify-center">
                      <span className="text-white font-medium">{user?.firstName?.charAt(0) || 'U'}</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">{user?.firstName ? `${user.firstName} ${user.lastName || ''}` : 'Utilisateur'}</h3>
                      <p className="text-sm text-gray-500">{user?.email || 'utilisateur@example.com'}</p>
                    </div>
                  </div>
                </div>
                <div className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-pink-200 scrollbar-track-transparent">
                  <Link href="/chat" className="block p-3 hover:bg-pink-50 transition-colors duration-200">
                    <div className="flex items-center space-x-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      <span className="text-gray-800">Coach de séduction</span>
                    </div>
                  </Link>
                </div>
                <div className="border-t border-pink-100 p-3">
                  <button 
                    onClick={handleLogout}
                    className="flex items-center space-x-3 text-red-500 hover:text-red-700 transition-colors duration-200 w-full text-left"
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
            className="absolute rounded-full bg-gradient-to-r from-pink-200/30 to-rose-300/30 animate-float"
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