'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import HeaderDashboard from '@/app/components/layout/header-dashboard';
import { useAuth } from '@/app/context/auth-context';
import AuthGuard from '@/app/components/auth/auth-guard';
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  Coins, 
  ShoppingBag,
  PenLine,
  MessageCircle,
  Dumbbell,
  Apple
} from 'lucide-react';
import React from 'react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface Star {
  size: number;
  top: number;
  left: number;
  opacity: number;
  animationDuration: number;
  animationDelay: number;
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [stars, setStars] = useState<Star[]>([]);

  // Effet pour détecter le scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Générer les étoiles côté client uniquement pour éviter les erreurs d'hydratation
  useEffect(() => {
    const newStars = Array.from({ length: 50 }).map(() => ({
      size: Math.random() * 2 + 1,
      top: Math.random() * 100,
      left: Math.random() * 100,
      opacity: Math.random() * 0.5 + 0.2,
      animationDuration: Math.random() * 3 + 2,
      animationDelay: Math.random() * 5
    }));
    
    setStars(newStars);
  }, []);

  const mainNavItems = [
    {
      title: "Coach IA",
      href: "/coach",
      icon: MessageCircle,
    },
    {
      title: "Programmes",
      href: "/programs",
      icon: Dumbbell,
    },
    {
      title: "Nutrition",
      href: "/nutrition",
      icon: Apple,
    },
    {
      title: "Tokens",
      href: "/tokens",
      icon: Coins,
    },
  ];

  return (
    <AuthGuard>
      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-orange-900/20 to-black opacity-80 z-0"></div>
        
        {/* Animated particles */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
          
          {/* Étoiles scintillantes */}
          {stars.map((star, index) => (
            <div 
              key={index}
              className="absolute rounded-full bg-white animate-pulse"
              style={{
                width: `${star.size}px`,
                height: `${star.size}px`,
                top: `${star.top}%`,
                left: `${star.left}%`,
                opacity: star.opacity,
                animationDuration: `${star.animationDuration}s`,
                animationDelay: `${star.animationDelay}s`
              }}
            />
          ))}
        </div>

        {/* Header */}
        <HeaderDashboard />

        {/* Mobile menu button */}
        <div className="lg:hidden fixed top-4 left-4 z-50">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg bg-black/40 backdrop-blur-sm border border-red-500/20"
            aria-label="Menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-black/60 backdrop-blur-xl border-r border-red-500/20 transform transition-transform duration-300 lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="p-4 sm:p-6 border-b border-red-500/20">
              <Link href="/coach" className="flex items-center gap-2">
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-neutral-darkest" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <span className="text-xl sm:text-2xl font-bold text-gradient-primary">FitNeuralCoach</span>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-3 sm:p-4 space-y-1 sm:space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-red-500/20 scrollbar-track-transparent">
              {mainNavItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-red-500/10 text-white' 
                        : 'text-gray-400 hover:text-white hover:bg-black/20'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className={`${isActive ? 'text-red-400' : ''}`}>
                      {React.createElement(item.icon, { className: "h-4 w-4 sm:h-5 sm:w-5" })}
                    </span>
                    <span className="text-sm sm:text-base">{item.title}</span>
                    {isActive && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-red-400"></span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* User section */}
            <div className="p-3 sm:p-4 border-t border-red-500/20">
              <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20">
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-r from-red-400 to-orange-500 flex items-center justify-center">
                  <span className="text-white font-medium">U</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Utilisateur</p>
                  <p className="text-xs text-gray-400">Plan Pro</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:ml-64 min-h-screen pt-16 flex flex-col">
          <main className="relative z-10 flex-grow p-4 sm:p-6">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
} 