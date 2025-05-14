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
  PenLine
} from 'lucide-react';
import React from 'react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface Bubble {
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
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  // Effet pour détecter le scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Générer les bulles côté client uniquement pour éviter les erreurs d'hydratation
  useEffect(() => {
    const newBubbles = Array.from({ length: 15 }).map(() => ({
      size: Math.random() * 100 + 40,
      top: Math.random() * 100,
      left: Math.random() * 100,
      opacity: Math.random() * 0.08 + 0.02,
      animationDuration: Math.random() * 20 + 15,
      animationDelay: Math.random() * 10
    }));
    
    setBubbles(newBubbles);
  }, []);

  const mainNavItems = [
    {
      title: "Tableau de bord",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Générer un article",
      href: "/generate",
      icon: PenLine,
    },
    {
      title: "Description produit",
      href: "/generate/product-description",
      icon: ShoppingBag,
    },
    {
      title: "Tokens",
      href: "/tokens",
      icon: Coins,
    },
  ];

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[url('/noise-pattern.png')] bg-repeat opacity-5"></div>
        
        {/* Animated bubbles */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {bubbles.map((bubble, index) => (
            <div 
              key={index}
              className="absolute rounded-full bg-gradient-to-r from-teal-300 to-emerald-400 animate-float"
              style={{
                width: `${bubble.size}px`,
                height: `${bubble.size}px`,
                top: `${bubble.top}%`,
                left: `${bubble.left}%`,
                opacity: bubble.opacity,
                animationDuration: `${bubble.animationDuration}s`,
                animationDelay: `${bubble.animationDelay}s`,
                filter: "blur(60px)"
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
            className="p-2 rounded-md bg-white shadow-lg border border-slate-200"
            aria-label="Menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-40 w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="p-6 border-b border-slate-100">
              <Link href="/dashboard" className="flex items-center gap-3">
                <div className="h-10 w-10 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-2xl font-bold text-slate-800">SEOForgeAI</span>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
              {mainNavItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive 
                        ? 'bg-gradient-to-r from-teal-50 to-emerald-50 text-teal-700 border-l-4 border-teal-500' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className={`${isActive ? 'text-teal-600' : ''}`}>
                      {React.createElement(item.icon, { className: "h-5 w-5" })}
                    </span>
                    <span className="text-base font-medium">{item.title}</span>
                    {isActive && (
                      <span className="ml-auto w-2 h-2 rounded-full bg-teal-500"></span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* User section */}
            <div className="p-6 border-t border-slate-100">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100 shadow-sm">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-md">
                  <span className="text-white font-medium text-lg">{user?.firstName?.charAt(0) || 'U'}</span>
                </div>
                <div>
                  <p className="text-base font-medium text-slate-800">{user?.firstName || 'Utilisateur'}</p>
                  <p className="text-sm text-slate-500">{user?.subscriptionPlan || 'Plan Pro'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:ml-72 min-h-screen pt-16 flex flex-col">
          <main className="relative z-10 flex-grow p-6 sm:p-8">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
} 