'use client';

import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/app/context/auth-context";
import { PlusIcon, UserIcon, LogOutIcon, BellIcon, MessageSquareIcon } from "lucide-react";

export default function HeaderDashboard() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuth();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [floatingShapes, setFloatingShapes] = useState<Array<{
    type: 'dot' | 'circle' | 'square';
    size: number;
    top: number;
    left: number;
    opacity: number;
    color: string;
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
    { id: 1, title: "Programme mis à jour", message: "Votre programme d'entraînement a été mis à jour selon vos récentes performances.", time: "Il y a 5 min", read: false },
    { id: 2, title: "Nouveaux exercices", message: "10 nouveaux exercices ont été ajoutés à votre collection.", time: "Il y a 2h", read: false },
    { id: 3, title: "Conseils personnalisés", message: "Des conseils nutritionnels personnalisés sont disponibles dans votre espace.", time: "Hier", read: true },
  ];

  // Générer les formes flottantes
  useEffect(() => {
    const colors = ['#E2D9F3', '#D3E9DD', '#FBDDC8', '#D9EBFA'];
    const shapes = Array.from({ length: 12 }).map(() => ({
      type: ['dot', 'circle', 'square'][Math.floor(Math.random() * 3)] as 'dot' | 'circle' | 'square',
      size: Math.random() * 6 + 2,
      top: Math.random() * 100,
      left: Math.random() * 100,
      opacity: Math.random() * 0.5 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
      animationDuration: Math.random() * 15 + 10,
      animationDelay: Math.random() * 5
    }));
    
    setFloatingShapes(shapes);
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
    <header className="fixed top-0 right-0 left-0 lg:left-64 z-40 h-16 bg-white backdrop-blur-sm border-b border-[#E2D9F3] shadow-sm">
      {/* Bordure décorative en haut */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E2D9F3] via-[#A590DC] to-[#FBDDC8]"></div>
      
      <div className="h-full px-4 md:px-6 flex items-center justify-between relative">
        {/* Titre de la page actuelle */}
        <div className="hidden md:block">
          <h1 className="text-xl font-bold nrl-text-primary">
            {pathname === '/dashboard' && 'Tableau de bord'}
            {pathname === '/coach' && 'Coach IA'}
            {pathname === '/programs' && 'Programmes d\'entraînement'}
            {pathname === '/nutrition' && 'Plans nutritionnels'}
            {pathname === '/articles' && 'Articles de fitness'}
            {pathname === '/tokens' && 'Acheter des tokens'}
            {pathname === '/profile' && 'Profil'}
          </h1>
        </div>
        
        {/* Actions */}
        <div className="flex items-center space-x-4 ml-auto">
          {/* Bouton de notification */}
          <div className="relative">
            <button 
              onClick={() => {
                setIsNotificationsOpen(!isNotificationsOpen);
                setIsProfileOpen(false);
              }}
              className="p-2 rounded-full hover:bg-[#F5F2FC] text-[#2A303D] transition-colors duration-200"
            >
              <BellIcon className="h-5 w-5" />
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-[#F5BA8D] animate-pulse"></span>
              )}
            </button>

            {/* Dropdown des notifications */}
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 nrl-card border shadow-lg rounded-xl overflow-hidden z-50">
                <div className="p-3 border-b border-[#E2D9F3] flex items-center justify-between">
                  <h3 className="font-medium text-[#2A303D]">Notifications</h3>
                  <span className="text-xs px-1.5 py-0.5 rounded-full bg-[#F5F2FC] text-[#A590DC] border border-[#E2D9F3]">
                    {notifications.filter(n => !n.read).length} non lues
                  </span>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-3 hover:bg-[#F5F2FC]/50 transition-colors ${notification.read ? '' : 'bg-[#F5F2FC]/30'}`}
                    >
                      <div className="flex space-x-3">
                        <div className="flex-shrink-0 h-9 w-9 rounded-lg bg-white border border-[#E2D9F3] flex items-center justify-center">
                          <span className="text-[#A590DC]">
                            <BellIcon className="h-5 w-5" />
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-medium text-[#2A303D] truncate">
                              {notification.title}
                            </p>
                            <span className="text-xs text-[#6B7280] whitespace-nowrap ml-2">
                              {notification.time}
                            </span>
                          </div>
                          <p className="text-xs text-[#4B5563] line-clamp-2">
                            {notification.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-2 border-t border-[#E2D9F3] text-center">
                  <Link 
                    href="/dashboard/notifications" 
                    className="text-xs text-[#A590DC] hover:text-[#8A72CA] transition-colors"
                  >
                    Voir toutes les notifications
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Bouton de chat */}
          <Link 
            href="/dashboard/chat" 
            className="p-2 rounded-full hover:bg-[#F5F2FC] text-[#2A303D] transition-colors duration-200 hidden sm:flex"
          >
            <MessageSquareIcon className="h-5 w-5" />
          </Link>
          
          {/* Bouton de création rapide */}
          <Link href="/programs/create" className="hidden md:block">
            <Button className="nrl-btn-primary">
              <PlusIcon className="h-4 w-4 mr-2" />
              Nouveau programme
            </Button>
          </Link>
          
          {/* Profil utilisateur */}
          <div className="relative">
            <button 
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
                setIsNotificationsOpen(false);
              }}
              className="flex items-center space-x-2 p-1.5 rounded-full hover:bg-[#F5F2FC] transition-colors duration-200"
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#E2D9F3] to-[#A590DC]/70 flex items-center justify-center">
                <span className="text-white font-medium">{user?.firstName?.charAt(0) || 'U'}</span>
              </div>
              <span className="hidden md:block text-[#2A303D]">{user?.firstName || 'Utilisateur'}</span>
            </button>
            
            {/* Dropdown du profil */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-60 nrl-card border shadow-lg rounded-xl overflow-hidden z-50">
                <div className="p-4 border-b border-[#E2D9F3]">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#E2D9F3] to-[#A590DC]/70 flex items-center justify-center">
                      <span className="text-white font-medium">{user?.firstName?.charAt(0) || 'U'}</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-[#2A303D]">{user?.firstName ? `${user.firstName} ${user.lastName || ''}` : 'Utilisateur'}</h3>
                      <p className="text-sm text-[#6B7280]">{user?.email || 'utilisateur@exemple.com'}</p>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <Link href="/dashboard/profile" className="block px-4 py-2 text-[#2A303D] hover:bg-[#F5F2FC] rounded-lg transition-colors duration-200">
                    <div className="flex items-center space-x-3">
                      <UserIcon className="h-5 w-5 text-[#A590DC]" />
                      <span>Mon profil</span>
                    </div>
                  </Link>
                  <Link href="/unsubscribe" className="block px-4 py-2 text-[#2A303D] hover:bg-[#F5F2FC] rounded-lg transition-colors duration-200">
                    <div className="flex items-center space-x-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#F5BA8D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                      </svg>
                      <span>Désabonnement</span>
                    </div>
                  </Link>
                </div>
                <div className="border-t border-[#E2D9F3] p-2">
                  <button 
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-4 py-2 w-full text-left text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    <LogOutIcon className="h-5 w-5" />
                    <span>Déconnexion</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Motif décoratif pastel */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingShapes.map((shape, index) => {
          const ShapeComponent = () => {
            if (shape.type === 'dot') {
              return (
                <div
                  key={index}
                  className="absolute rounded-full animate-float"
                  style={{
                    width: `${shape.size}px`,
                    height: `${shape.size}px`,
                    top: `${shape.top}%`,
                    left: `${shape.left}%`,
                    backgroundColor: shape.color,
                    opacity: shape.opacity,
                    animationDuration: `${shape.animationDuration}s`,
                    animationDelay: `${shape.animationDelay}s`
                  }}
                />
              );
            } else if (shape.type === 'circle') {
              return (
                <div
                  key={index}
                  className="absolute rounded-full border animate-float"
                  style={{
                    width: `${shape.size * 1.5}px`,
                    height: `${shape.size * 1.5}px`,
                    top: `${shape.top}%`,
                    left: `${shape.left}%`,
                    borderColor: shape.color,
                    borderWidth: '1px',
                    opacity: shape.opacity,
                    animationDuration: `${shape.animationDuration}s`,
                    animationDelay: `${shape.animationDelay}s`
                  }}
                />
              );
            } else {
              return (
                <div
                  key={index}
                  className="absolute rounded-sm animate-float"
                  style={{
                    width: `${shape.size}px`,
                    height: `${shape.size}px`,
                    top: `${shape.top}%`,
                    left: `${shape.left}%`,
                    backgroundColor: shape.color,
                    opacity: shape.opacity,
                    animationDuration: `${shape.animationDuration}s`,
                    animationDelay: `${shape.animationDelay}s`,
                    transform: `rotate(${Math.random() * 45}deg)`
                  }}
                />
              );
            }
          };
          
          return <ShapeComponent key={index} />;
        })}
      </div>
    </header>
  );
} 