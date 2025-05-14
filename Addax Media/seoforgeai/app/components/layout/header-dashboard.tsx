'use client';

import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/app/context/auth-context";
import { BellIcon, SearchIcon, PlusIcon, ChevronDownIcon } from "lucide-react";

export default function HeaderDashboard() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuth();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Effet pour détecter le scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Gérer la déconnexion
  const handleLogout = () => {
    logout();
  };

  // Si l'utilisateur n'est pas authentifié, ne pas afficher le header
  if (!isAuthenticated) {
    return null;
  }

  return (
    <header className={`fixed top-0 right-0 left-0 lg:left-72 z-40 h-16 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md' : 'bg-white/80 backdrop-blur-md'
    }`}>
      <div className="h-full px-6 flex items-center justify-between">
        {/* Titre de la page actuelle */}
        <div className="hidden md:block">
          <h1 className="text-xl font-semibold text-slate-800">
            {pathname === '/dashboard' && 'Tableau de bord'}
            {pathname === '/generate' && 'Générer un article'}
            {pathname === '/generate/product-description' && 'Générer une description'}
            {pathname === '/tokens' && 'Acheter des tokens'}
          </h1>
        </div>
        
        {/* Recherche */}
        <div className="hidden md:flex flex-1 max-w-md mx-6">
          <div className="relative w-full">
            <input 
              type="text" 
              placeholder="Rechercher..." 
              className="w-full bg-slate-100 border-none rounded-full py-2 px-5 text-slate-600 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-teal-600 transition-colors">
              <SearchIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center space-x-3">
          {/* Bouton de génération rapide */}
          <Link href="/generate" className="hidden md:block">
            <Button className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 rounded-full shadow-md">
              <PlusIcon className="h-5 w-5 mr-2" />
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
              className="relative p-2 rounded-full hover:bg-slate-100 transition-colors duration-200"
              aria-label="Notifications"
            >
              <BellIcon className="h-6 w-6 text-slate-500" />
              {notifications.some(n => !n.read) && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-teal-500 rounded-full"></span>
              )}
            </button>
            
            {/* Dropdown des notifications */}
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden z-50">
                <div className="p-4 border-b border-slate-100">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-slate-800">Notifications</h3>
                    <button className="text-sm text-teal-600 hover:text-teal-700 font-medium">
                      Tout marquer comme lu
                    </button>
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    <div>
                      {notifications.map((notification) => (
                        <div 
                          key={notification.id} 
                          className={`p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors duration-200 ${notification.read ? '' : 'bg-teal-50'}`}
                        >
                          <div className="flex justify-between">
                            <h4 className="font-medium text-slate-800">{notification.title}</h4>
                            {!notification.read && (
                              <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                            )}
                          </div>
                          <p className="text-sm text-slate-600 mt-1">{notification.message}</p>
                          <p className="text-xs text-slate-400 mt-2">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-slate-500">
                      Aucune notification
                    </div>
                  )}
                </div>
                <div className="p-3 border-t border-slate-100 text-center">
                  <button className="text-sm text-teal-600 hover:text-teal-700 font-medium">
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
              className="flex items-center space-x-2 p-1 rounded-full hover:bg-slate-100 transition-colors duration-200"
            >
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-teal-500 to-emerald-600 flex items-center justify-center shadow-sm">
                <span className="text-white font-medium">{user?.firstName?.charAt(0) || 'U'}</span>
              </div>
              <span className="hidden md:block text-slate-700 font-medium">{user?.firstName || 'Utilisateur'}</span>
              <ChevronDownIcon className="hidden md:block h-4 w-4 text-slate-400" />
            </button>
            
            {/* Dropdown du profil */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden z-50">
                <div className="p-4 border-b border-slate-100">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-teal-500 to-emerald-600 flex items-center justify-center shadow-sm">
                      <span className="text-white font-medium">{user?.firstName?.charAt(0) || 'U'}</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-800">{user?.firstName ? `${user.firstName} ${user.lastName || ''}` : 'Utilisateur'}</h3>
                      <p className="text-sm text-slate-500">{user?.email || 'utilisateur@example.com'}</p>
                    </div>
                  </div>
                </div>
                <div className="py-2">
                  <Link 
                    href="/dashboard" 
                    className="flex items-center px-4 py-2 text-slate-700 hover:bg-slate-50 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span>Tableau de bord</span>
                  </Link>
                  
                  <Link 
                    href="/settings" 
                    className="flex items-center px-4 py-2 text-slate-700 hover:bg-slate-50 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Paramètres</span>
                  </Link>
                </div>
                <div className="border-t border-slate-100 p-2">
                  <button 
                    onClick={handleLogout}
                    className="flex w-full items-center px-4 py-2 text-red-600 hover:bg-red-50 transition-colors rounded-md"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
    </header>
  );
} 