'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  User, 
  Flame, 
  ChevronDown, 
  LogOut, 
  Settings, 
  Bell, 
  MessageSquare, 
  Heart,
  UserCircle
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';

const HeaderDashboard = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Fermer les menus lors d'un clic à l'extérieur
  useEffect(() => {
    const handleClickOutside = () => {
      setNotificationsOpen(false);
      setUserMenuOpen(false);
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);
  
  // Fermer le menu mobile lors d'un changement de route
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);
  
  // Liens de navigation du dashboard
  const navigation = [
    { name: 'Tableau de bord', href: '/dashboard' },
    { name: 'Conversations', href: '/dashboard/conversations' },
    { name: 'Exercices', href: '/dashboard/exercises' },
    { name: 'Statistiques', href: '/dashboard/stats' },
    { name: 'Mon profil', href: '/dashboard/profile' },
  ];
  
  // Exemple de notifications
  const notifications = [
    {
      id: 1,
      title: 'Nouvelle conversation disponible',
      message: 'Votre coach a préparé un nouveau scénario de conversation',
      time: '2 minutes',
      read: false
    },
    {
      id: 2,
      title: 'Exercice terminé',
      message: 'Félicitations pour avoir terminé l\'exercice "Aborder avec confiance"',
      time: '3 heures',
      read: false
    },
    {
      id: 3,
      title: 'Votre progrès hebdomadaire',
      message: 'Votre rapport de progression de la semaine est disponible',
      time: '1 jour',
      read: true
    }
  ];

  return (
    <header className="bg-white border-b border-[#FFDECF] shadow-sm py-3 fixed top-0 left-0 right-0 z-40">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <button 
              className="lg:hidden mr-3 text-[#664D45] hover:text-[#FF5C3E] transition-colors duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            
            <Link href="/" className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FF5C3E] to-[#FFA728] flex items-center justify-center mr-3">
                <Flame className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-[#2D1811]">
                SeducIA
              </span>
            </Link>
          </div>
          
          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                  pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href))
                    ? 'bg-[#FFF0E8] text-[#FF5C3E] font-medium'
                    : 'text-[#664D45] hover:text-[#FF5C3E] hover:bg-[#FFF6E8]'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          {/* Actions */}
          <div className="flex items-center space-x-1">
            {/* Notifications */}
            <div className="relative">
              <button
                className="p-2 text-[#664D45] hover:text-[#FF5C3E] hover:bg-[#FFF6E8] rounded-full transition-colors duration-200 relative"
                onClick={(e) => {
                  e.stopPropagation();
                  setNotificationsOpen(!notificationsOpen);
                  setUserMenuOpen(false);
                }}
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#FF5C3E]"></span>
              </button>
              
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 border border-[#FFDECF]">
                  <div className="px-4 py-2 border-b border-[#FFDECF]">
                    <h3 className="font-bold text-[#2D1811]">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-[#FFF6E8] border-l-2 ${notification.read ? 'border-transparent' : 'border-[#FF5C3E]'}`}
                      >
                        <p className="font-medium text-[#2D1811]">{notification.title}</p>
                        <p className="text-sm text-[#664D45]">{notification.message}</p>
                        <p className="text-xs text-[#FF5C3E] mt-1">Il y a {notification.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-[#FFDECF]">
                    <Link href="/dashboard/notifications" className="text-sm text-[#FF5C3E] hover:underline">
                      Voir toutes les notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            {/* Messages */}
            <Link href="/dashboard/messages">
              <button className="p-2 text-[#664D45] hover:text-[#FF5C3E] hover:bg-[#FFF6E8] rounded-full transition-colors duration-200">
                <MessageSquare className="h-5 w-5" />
              </button>
            </Link>
            
            {/* User Menu */}
            <div className="relative">
              <button
                className="flex items-center space-x-2 p-1.5 rounded-full hover:bg-[#FFF6E8] transition-colors duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  setUserMenuOpen(!userMenuOpen);
                  setNotificationsOpen(false);
                }}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FF5C3E] to-[#FFA728] flex items-center justify-center text-white">
                  <UserCircle className="h-6 w-6" />
                </div>
                <ChevronDown className={`h-4 w-4 text-[#664D45] transition-transform duration-200 hidden sm:block ${
                  userMenuOpen ? 'rotate-180' : ''
                }`} />
              </button>
              
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg overflow-hidden border border-[#FFDECF]">
                  <div className="p-4 border-b border-[#FFDECF] bg-[#FFF6E8]">
                    <p className="font-medium text-[#2D1811]">Sophie Martin</p>
                    <p className="text-sm text-[#664D45]">sophie.martin@example.com</p>
                  </div>
                  
                  <div className="py-2">
                    <Link href="/dashboard/profile">
                      <button className="flex items-center w-full px-4 py-2 text-[#664D45] hover:bg-[#FFF6E8] hover:text-[#FF5C3E] transition-colors duration-200 text-left">
                        <User className="h-4 w-4 mr-3" />
                        <span>Mon profil</span>
                      </button>
                    </Link>
                    <Link href="/dashboard/favorites">
                      <button className="flex items-center w-full px-4 py-2 text-[#664D45] hover:bg-[#FFF6E8] hover:text-[#FF5C3E] transition-colors duration-200 text-left">
                        <Heart className="h-4 w-4 mr-3" />
                        <span>Favoris</span>
                      </button>
                    </Link>
                    <Link href="/dashboard/settings">
                      <button className="flex items-center w-full px-4 py-2 text-[#664D45] hover:bg-[#FFF6E8] hover:text-[#FF5C3E] transition-colors duration-200 text-left">
                        <Settings className="h-4 w-4 mr-3" />
                        <span>Paramètres</span>
                      </button>
                    </Link>
                  </div>
                  
                  <div className="py-2 border-t border-[#FFDECF]">
                    <Link href="/logout">
                      <button className="flex items-center w-full px-4 py-2 text-[#664D45] hover:bg-[#FFF6E8] hover:text-[#FF5C3E] transition-colors duration-200 text-left">
                        <LogOut className="h-4 w-4 mr-3" />
                        <span>Déconnexion</span>
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            <Link href="/upgrade" className="hidden sm:block ml-2">
              <Button size="sm" className="h-9">
                Premium
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Menu mobile */}
      <div 
        className={`fixed inset-0 z-30 bg-white transition-transform duration-300 transform lg:hidden ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ top: '61px' }}
      >
        <div className="p-4 overflow-y-auto h-full bg-[#FFF6E8]">
          <nav className="flex flex-col space-y-2 mb-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-3 rounded-lg flex items-center ${
                  pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href))
                    ? 'bg-white text-[#FF5C3E] font-medium shadow-sm'
                    : 'text-[#664D45]'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          <div className="pt-6 border-t border-[#FFDECF]">
            <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FF5C3E] to-[#FFA728] flex items-center justify-center text-white mr-3">
                  <UserCircle className="h-7 w-7" />
                </div>
                <div>
                  <p className="font-medium text-[#2D1811]">Sophie Martin</p>
                  <p className="text-sm text-[#664D45]">Plan Free</p>
                </div>
              </div>
              <Link href="/upgrade">
                <Button className="w-full">Passer à Premium</Button>
              </Link>
            </div>
            
            <div className="space-y-2">
              <Link href="/dashboard/settings">
                <button className="flex items-center w-full px-4 py-3 rounded-lg text-[#664D45] hover:bg-white transition-colors duration-200">
                  <Settings className="h-5 w-5 mr-3" />
                  <span>Paramètres</span>
                </button>
              </Link>
              <Link href="/logout">
                <button className="flex items-center w-full px-4 py-3 rounded-lg text-[#664D45] hover:bg-white transition-colors duration-200">
                  <LogOut className="h-5 w-5 mr-3" />
                  <span>Déconnexion</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderDashboard; 