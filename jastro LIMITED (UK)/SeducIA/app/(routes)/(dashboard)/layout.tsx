'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/auth-context';
import { useStats } from '@/app/context/stats-context';
import AuthGuard from '@/app/components/auth/auth-guard';
import { 
  MessageCircle,
  Coins,
  LogOut,
  Sparkles,
  Flame
} from 'lucide-react';
import React from 'react';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { stats } = useStats();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // État local pour les tokens à afficher
  const [displayTokens, setDisplayTokens] = useState(0);
  
  // Mettre à jour les tokens affichés quand le solde change dans les stats ou user
  useEffect(() => {
    if (stats?.tokenBalance !== undefined) {
      setDisplayTokens(Math.floor(stats.tokenBalance * 1.7));
    } else if (user?.tokenBalance) {
      setDisplayTokens(Math.floor(user.tokenBalance * 1.7));
    } else {
      setDisplayTokens(0);
    }
  }, [stats?.tokenBalance, user?.tokenBalance]);

  const mainNavItems = [
    {
      title: "Coach de séduction",
      href: "/chat",
      icon: MessageCircle,
    },
    {
      title: "Acheter des tokens",
      href: "/tokens",
      icon: Coins,
    }
  ];

  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#FAF8F4] relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[url('/subtle-pattern.svg')] bg-repeat opacity-[0.03]"></div>
        
        {/* Formes décoratives dans le background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#F7C8BA]/40 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#F9EAC1]/40 blur-3xl"></div>
          <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-[#E16959]/20 blur-3xl"></div>
        </div>
        
        {/* Header simplifié */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#F1EDE8]">
          <div className="flex items-center justify-between px-4 h-16">
            {/* Logo */}
            <Link href="/chat" className="flex items-center gap-2">
              <span className="text-xl font-bold text-[#E46D4B]">SeducIA</span>
            </Link>

            {/* Tokens et Menu */}
            <div className="flex items-center gap-4">
              {/* Affichage des tokens */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F7C8BA]/30 border border-[#F1EDE8]">
                <Flame className="h-4 w-4 text-[#E46D4B]" />
                <span className="text-sm font-medium text-[#45301C]">{displayTokens}</span>
                <Sparkles className="h-3 w-3 text-[#E46D4B] opacity-80" />
              </div>

              {/* Menu mobile */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg bg-white border border-[#F1EDE8]"
                aria-label="Menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#45301C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Menu desktop */}
              <div className="hidden lg:flex items-center gap-2">
                {mainNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                      pathname === item.href
                        ? 'bg-[#F7C8BA]/30 text-[#45301C]'
                        : 'text-[#45301C]/70 hover:text-[#45301C] hover:bg-[#F7C8BA]/10'
                    }`}
                  >
                    {React.createElement(item.icon, { className: "h-4 w-4" })}
                    <span className="text-sm font-medium">{item.title}</span>
                  </Link>
                ))}
                <Link
                  href="/subscriptions"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[#45301C]/70 hover:text-[#45301C] hover:bg-[#F7C8BA]/10 transition-colors"
                >
                  <span className="text-sm font-medium">Désabonnement</span>
                </Link>
                <button
                  onClick={() => logout()}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[#45301C]/70 hover:text-[#45301C] hover:bg-[#F7C8BA]/10 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm font-medium">Déconnexion</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Menu mobile */}
        <div className={`fixed inset-0 z-40 bg-white/95 backdrop-blur-xl lg:hidden transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col h-full pt-16">
            <nav className="flex-1 p-4 space-y-2">
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    pathname === item.href
                      ? 'bg-[#F7C8BA]/30 text-[#45301C]'
                      : 'text-[#45301C]/70 hover:text-[#45301C] hover:bg-[#F7C8BA]/10'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {React.createElement(item.icon, { className: "h-5 w-5" })}
                  <span className="text-base font-medium">{item.title}</span>
                </Link>
              ))}
              <Link
                href="/subscriptions"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#45301C]/70 hover:text-[#45301C] hover:bg-[#F7C8BA]/10 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="text-base font-medium">Désabonnement</span>
              </Link>
              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#45301C]/70 hover:text-[#45301C] hover:bg-[#F7C8BA]/10 transition-colors w-full"
              >
                <LogOut className="h-5 w-5" />
                <span className="text-base font-medium">Déconnexion</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="min-h-screen pt-16">
          <main className="relative z-10">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
} 