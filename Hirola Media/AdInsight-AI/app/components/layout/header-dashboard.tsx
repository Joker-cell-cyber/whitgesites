'use client';

import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/app/context/auth-context";
import { Bell, Menu, X, MessageCircle, Search, Zap, ChevronDown, ShoppingBag, Settings, User, LogOut, CreditCard, BarChart3, FileText, Gift } from "lucide-react";

export default function HeaderDashboard() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Nouveaux tokens offerts",
      description: "Vous avez reçu 10 tokens gratuits pour votre fidélité.",
      time: "Il y a 5 min",
      read: false,
      icon: <Gift className="h-5 w-5 text-green-500" />
    },
    {
      id: 2,
      title: "Analyse complétée",
      description: "Votre analyse de campagne Facebook a été complétée.",
      time: "Il y a 1 heure",
      read: false,
      icon: <FileText className="h-5 w-5 text-adfi-blue-500" />
    },
    {
      id: 3,
      title: "Paiement confirmé",
      description: "Votre achat de 50 tokens a été confirmé.",
      time: "Hier",
      read: true,
      icon: <ShoppingBag className="h-5 w-5 text-purple-500" />
    }
  ]);
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

  // Fermer les menus lorsqu'on clique ailleurs
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (isUserMenuOpen || isNotificationsOpen) {
        const target = e.target as HTMLElement;
        if (!target.closest('[data-menu="user"]') && !target.closest('[data-menu="notifications"]')) {
          setIsUserMenuOpen(false);
          setIsNotificationsOpen(false);
        }
      }
    };

    document.addEventListener('click', handleOutsideClick);
    
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isUserMenuOpen, isNotificationsOpen]);

  // Marquer une notification comme lue
  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  // Supprimer une notification
  const removeNotification = (id: number) => {
    setNotifications(prev => 
      prev.filter(n => n.id !== id)
    );
  };

  // Nombre de notifications non lues
  const unreadCount = notifications.filter(n => !n.read).length;

  // Gérer la déconnexion
  const handleLogout = () => {
    logout();
  };

  // Si l'utilisateur n'est pas authentifié, ne pas afficher le header
  if (!isAuthenticated) {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-adfi-slate-200 h-16">
      <div className="h-full flex items-center justify-between px-4 sm:px-6">
        {/* Partie gauche: Logo et bouton menu mobile */}
        <div className="flex items-center lg:w-64">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-adfi-blue-600 to-adfi-blue-500 flex items-center justify-center shadow-sm shadow-adfi-blue-500/20">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-adfi-slate-900">
              AdInsight<span className="text-adfi-blue-600">AI</span>
            </span>
          </Link>
          
          <button 
            className="ml-4 lg:hidden p-2 rounded-lg text-adfi-slate-500 hover:bg-adfi-slate-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Partie centrale: Recherche */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-adfi-slate-400">
              <Search className="h-4 w-4" />
            </div>
            <input 
              type="text" 
              placeholder="Rechercher..." 
              className="w-full pl-10 pr-4 py-2 border border-adfi-slate-200 rounded-lg text-sm text-adfi-slate-900 placeholder-adfi-slate-400 focus:outline-none focus:ring-2 focus:ring-adfi-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Partie droite: Actions et profil */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Tokens */}
          <div className="hidden sm:flex items-center bg-adfi-blue-50 border border-adfi-blue-100 px-3 py-1.5 rounded-lg">
            <CreditCard className="h-4 w-4 text-adfi-blue-600 mr-2" />
            <span className="font-medium text-adfi-blue-800">
              {user?.tokenBalance || 0}
              <span className="text-xs text-adfi-blue-600 ml-1">tokens</span>
            </span>
          </div>

          {/* Support */}
          <Link 
            href="/help-center" 
            className="hidden sm:flex items-center justify-center p-2 rounded-lg text-adfi-slate-600 hover:bg-adfi-slate-100"
          >
            <MessageCircle className="h-5 w-5" />
          </Link>

          {/* Notifications */}
          <div className="relative" data-menu="notifications">
            <button 
              className="flex items-center justify-center p-2 rounded-lg text-adfi-slate-600 hover:bg-adfi-slate-100 relative"
              onClick={(e) => {
                e.stopPropagation();
                setIsNotificationsOpen(!isNotificationsOpen);
                setIsUserMenuOpen(false);
              }}
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Menu de notifications */}
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-adfi-slate-200 z-10 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-adfi-slate-200">
                  <h3 className="font-medium text-adfi-slate-900">Notifications</h3>
                  <button 
                    className="text-xs text-adfi-blue-600 hover:text-adfi-blue-700"
                    onClick={() => {
                      setNotifications(prev => 
                        prev.map(n => ({ ...n, read: true }))
                      );
                    }}
                  >
                    Tout marquer comme lu
                  </button>
                </div>

                <div className="max-h-[320px] overflow-y-auto">
                  {notifications.length > 0 ? (
                    <div>
                      {notifications.map((notification) => (
                        <div 
                          key={notification.id} 
                          className={`px-4 py-3 flex items-start hover:bg-adfi-slate-50 transition-colors relative ${notification.read ? 'bg-white' : 'bg-adfi-blue-50/30'}`}
                        >
                          <div className="flex-shrink-0 mt-0.5 mr-3 h-9 w-9 rounded-full bg-adfi-slate-100 flex items-center justify-center">
                            {notification.icon}
                          </div>
                          <div className="flex-grow min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-medium text-sm text-adfi-slate-900 truncate">
                                {notification.title}
                              </h4>
                              <span className="text-xs text-adfi-slate-500 whitespace-nowrap ml-2">
                                {notification.time}
                              </span>
                            </div>
                            <p className="text-xs text-adfi-slate-600 line-clamp-2">
                              {notification.description}
                            </p>
                            <div className="mt-1 flex space-x-2">
                              <button 
                                className="text-xs text-adfi-blue-600 hover:text-adfi-blue-700"
                                onClick={() => markAsRead(notification.id)}
                              >
                                {notification.read ? 'Marquer non lu' : 'Marquer lu'}
                              </button>
                              <button 
                                className="text-xs text-adfi-slate-500 hover:text-adfi-slate-700"
                                onClick={() => removeNotification(notification.id)}
                              >
                                Supprimer
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-6 text-center">
                      <p className="text-adfi-slate-500 text-sm">Aucune notification</p>
                    </div>
                  )}
                </div>

                <div className="px-4 py-2 bg-adfi-slate-50 border-t border-adfi-slate-200">
                  <Link 
                    href="/notifications" 
                    className="text-xs text-adfi-blue-600 hover:text-adfi-blue-700 block text-center"
                  >
                    Voir toutes les notifications
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Menu utilisateur */}
          <div className="relative" data-menu="user">
            <button 
              className="flex items-center space-x-1 p-2 rounded-lg hover:bg-adfi-slate-100"
              onClick={(e) => {
                e.stopPropagation();
                setIsUserMenuOpen(!isUserMenuOpen);
                setIsNotificationsOpen(false);
              }}
            >
              <div className="w-8 h-8 rounded-full bg-adfi-blue-100 flex items-center justify-center">
                <span className="text-adfi-blue-700 font-medium">
                  {user?.firstName?.charAt(0) || 'U'}
                </span>
              </div>
              <ChevronDown className="hidden sm:block h-4 w-4 text-adfi-slate-500" />
            </button>

            {/* Menu dropdown utilisateur */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-adfi-slate-200 z-10">
                <div className="px-4 py-3 border-b border-adfi-slate-200">
                  <p className="text-sm font-medium text-adfi-slate-900">{`${user?.firstName || ''} ${user?.lastName || ''}`  || 'Utilisateur'}</p>
                  <p className="text-xs text-adfi-slate-500 truncate">{user?.email || 'exemple@email.com'}</p>
                </div>

                <div className="py-1">
                  <Link 
                    href="/dashboard" 
                    className="flex items-center px-4 py-2 text-sm text-adfi-slate-700 hover:bg-adfi-slate-50"
                  >
                    <BarChart3 className="h-4 w-4 mr-3 text-adfi-slate-500" />
                    Tableau de bord
                  </Link>
                  <Link 
                    href="/account" 
                    className="flex items-center px-4 py-2 text-sm text-adfi-slate-700 hover:bg-adfi-slate-50"
                  >
                    <User className="h-4 w-4 mr-3 text-adfi-slate-500" />
                    Mon compte
                  </Link>
                  <Link 
                    href="/settings" 
                    className="flex items-center px-4 py-2 text-sm text-adfi-slate-700 hover:bg-adfi-slate-50"
                  >
                    <Settings className="h-4 w-4 mr-3 text-adfi-slate-500" />
                    Paramètres
                  </Link>
                </div>

                <div className="py-1 border-t border-adfi-slate-200">
                  <button 
                    onClick={logout} 
                    className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4 mr-3 text-red-500" />
                    Déconnexion
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-adfi-slate-200 shadow-lg">
          <div className="px-4 py-4">
            {/* Recherche mobile */}
            <div className="relative w-full mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-adfi-slate-400">
                <Search className="h-4 w-4" />
              </div>
              <input 
                type="text" 
                placeholder="Rechercher..." 
                className="w-full pl-10 pr-4 py-2 border border-adfi-slate-200 rounded-lg text-sm text-adfi-slate-900 placeholder-adfi-slate-400 focus:outline-none focus:ring-2 focus:ring-adfi-blue-500 focus:border-transparent"
              />
            </div>

            {/* Navigation mobile */}
            <nav className="space-y-1">
              <Link 
                href="/dashboard" 
                className="flex items-center px-3 py-2 rounded-lg text-adfi-slate-800 hover:bg-adfi-slate-100"
              >
                <BarChart3 className="h-5 w-5 mr-3 text-adfi-slate-500" />
                Tableau de bord
              </Link>
              <Link 
                href="/tokens/buy" 
                className="flex items-center px-3 py-2 rounded-lg text-adfi-slate-800 hover:bg-adfi-slate-100"
              >
                <CreditCard className="h-5 w-5 mr-3 text-adfi-slate-500" />
                Acheter des tokens
              </Link>
              <Link 
                href="/account" 
                className="flex items-center px-3 py-2 rounded-lg text-adfi-slate-800 hover:bg-adfi-slate-100"
              >
                <User className="h-5 w-5 mr-3 text-adfi-slate-500" />
                Mon compte
              </Link>
              <Link 
                href="/help-center" 
                className="flex items-center px-3 py-2 rounded-lg text-adfi-slate-800 hover:bg-adfi-slate-100"
              >
                <MessageCircle className="h-5 w-5 mr-3 text-adfi-slate-500" />
                Support
              </Link>
              <Link 
                href="/settings" 
                className="flex items-center px-3 py-2 rounded-lg text-adfi-slate-800 hover:bg-adfi-slate-100"
              >
                <Settings className="h-5 w-5 mr-3 text-adfi-slate-500" />
                Paramètres
              </Link>
            </nav>

            <div className="mt-4 pt-4 border-t border-adfi-slate-200">
              <button 
                onClick={logout} 
                className="flex w-full items-center justify-center px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
              >
                <LogOut className="h-5 w-5 mr-2 text-red-500" />
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      )}

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