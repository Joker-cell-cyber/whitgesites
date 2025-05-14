"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DASHBOARD_NAVIGATION, SITE_NAME } from "@/app/lib/constants";
import { cn } from "@/app/lib/utils";
import { useState, useEffect } from "react";

// Importation dynamique des icônes de Lucide React
import * as LucideIcons from "lucide-react";
import { Brain, ChevronRight, Dumbbell, Bell, Settings, LogOut, Crown, CreditCard, HelpCircle } from "lucide-react";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [stars, setStars] = useState<Array<{top: number, left: number, opacity: number, size: number}>>([]);

  // Générer des particules/étoiles pour l'effet futuriste
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const newStars = Array.from({ length: 20 }).map(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        opacity: Math.random() * 0.3 + 0.1,
        size: Math.random() * 1.5 + 0.5
      }));
      setStars(newStars);
    }
  }, []);

  // Navigation items personnalisés avec catégories
  const mainNavItems = [
    { name: "Tableau de bord", href: "/dashboard", icon: "LayoutDashboard" },
    { name: "Mes programmes", href: "/dashboard/programs", icon: "Dumbbell" },
    { name: "Suivi nutritionnel", href: "/dashboard/nutrition", icon: "Apple" },
    { name: "Analytiques", href: "/dashboard/analytics", icon: "BarChart2" },
    { name: "Calendrier", href: "/dashboard/calendar", icon: "Calendar" },
  ];

  const secondaryNavItems = [
    { name: "Objectifs", href: "/dashboard/goals", icon: "Target" },
    { name: "Progression", href: "/dashboard/progress", icon: "TrendingUp" },
    { name: "Historique", href: "/dashboard/history", icon: "History" },
  ];

  const accountNavItems = [
    { name: "Paramètres", href: "/dashboard/settings", icon: "Settings" },
    { name: "Abonnement", href: "/dashboard/subscription", icon: "CreditCard" },
    { name: "Support", href: "/dashboard/support", icon: "HelpCircle" },
  ];

  // Vérifier si un lien est actif
  const isActive = (href: string) => {
    return pathname === href || pathname?.startsWith(`${href}/`);
  };

  return (
    <div className="flex flex-col h-full border-r border-nrln-slate-800/50 bg-nrln-slate-900 relative overflow-hidden">
      {/* Effet de particules */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star, index) => (
          <div 
            key={index}
            className="absolute rounded-full bg-nrln-teal-400/20 animate-pulse"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              top: `${star.top}%`,
              left: `${star.left}%`,
              opacity: star.opacity,
              animationDuration: `${3 + Math.random() * 3}s`,
              filter: "blur(1px)"
            }}
          />
        ))}
      </div>
      
      {/* Ligne de lueur en haut */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-nrln-teal-500/30 to-transparent"></div>
      
      {/* Logo et nom du site */}
      <div className="p-6 border-b border-nrln-slate-800/50 relative">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-nrln-teal-500 to-nrln-blue-600 flex items-center justify-center shadow-lg shadow-nrln-teal-500/20 overflow-hidden relative">
            <div className="absolute inset-0 bg-black/20"></div>
            <Brain className="h-5 w-5 text-white relative z-10" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-lg font-bold text-white">{SITE_NAME}</span>
              <span className="text-xs text-nrln-teal-400 -mt-1">IA Fitness Coach</span>
            </div>
          )}
        </Link>
      </div>
      
      {/* Navigation principale */}
      <div className="flex-1 py-6 px-4 space-y-8 overflow-y-auto scrollbar-thin scrollbar-thumb-nrln-slate-700 scrollbar-track-transparent">
        {/* Navigation principale */}
        <div>
          <div className="flex items-center px-3 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-nrln-teal-500 mr-2"></div>
            <h3 className="text-xs font-medium text-nrln-teal-400 uppercase tracking-wider">Principal</h3>
          </div>
          <nav className="space-y-1">
            {mainNavItems.map((item) => {
              // Récupérer dynamiquement l'icône
              const Icon = (LucideIcons[item.icon as keyof typeof LucideIcons] || LucideIcons.Circle) as React.ComponentType<{ className?: string }>;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-all duration-200",
                    isActive(item.href)
                      ? "bg-nrln-slate-800/80 text-white border border-nrln-teal-500/30"
                      : "text-nrln-slate-300 hover:text-white hover:bg-nrln-slate-800/50"
                  )}
                >
                  <div className={`flex-shrink-0 ${isActive(item.href) ? "text-nrln-teal-400" : "text-nrln-slate-400"}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  {!collapsed && (
                    <span>{item.name}</span>
                  )}
                  {isActive(item.href) && !collapsed && (
                    <ChevronRight className="ml-auto h-4 w-4 text-nrln-teal-400" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
        
        {/* Navigation secondaire */}
        <div>
          <div className="flex items-center px-3 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-nrln-blue-500 mr-2"></div>
            <h3 className="text-xs font-medium text-nrln-blue-400 uppercase tracking-wider">Suivi</h3>
          </div>
          <nav className="space-y-1">
            {secondaryNavItems.map((item) => {
              // Récupérer dynamiquement l'icône
              const Icon = (LucideIcons[item.icon as keyof typeof LucideIcons] || LucideIcons.Circle) as React.ComponentType<{ className?: string }>;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-all duration-200",
                    isActive(item.href)
                      ? "bg-nrln-slate-800/80 text-white border border-nrln-blue-500/30"
                      : "text-nrln-slate-300 hover:text-white hover:bg-nrln-slate-800/50"
                  )}
                >
                  <div className={`flex-shrink-0 ${isActive(item.href) ? "text-nrln-blue-400" : "text-nrln-slate-400"}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  {!collapsed && (
                    <span>{item.name}</span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
        
        {/* Navigation du compte */}
        <div>
          <div className="flex items-center px-3 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-nrln-purple-500 mr-2"></div>
            <h3 className="text-xs font-medium text-nrln-purple-400 uppercase tracking-wider">Compte</h3>
          </div>
          <nav className="space-y-1">
            {accountNavItems.map((item) => {
              // Récupérer dynamiquement l'icône
              const Icon = (LucideIcons[item.icon as keyof typeof LucideIcons] || LucideIcons.Circle) as React.ComponentType<{ className?: string }>;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-all duration-200",
                    isActive(item.href)
                      ? "bg-nrln-slate-800/80 text-white border border-nrln-purple-500/30"
                      : "text-nrln-slate-300 hover:text-white hover:bg-nrln-slate-800/50"
                  )}
                >
                  <div className={`flex-shrink-0 ${isActive(item.href) ? "text-nrln-purple-400" : "text-nrln-slate-400"}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  {!collapsed && (
                    <span>{item.name}</span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
      
      {/* Upgrade banner */}
      {!collapsed && (
        <div className="p-4">
          <div className="rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-nrln-blue-900 to-nrln-purple-900 p-4 relative">
              <div className="absolute inset-0 nrln-grid-pattern opacity-10"></div>
              <div className="flex items-start space-x-3">
                <div className="p-1.5 rounded-lg bg-white/10 backdrop-blur-sm">
                  <Crown className="h-5 w-5 text-nrln-teal-400" />
                </div>
                <div>
                  <h4 className="font-medium text-white text-sm">Passez Premium</h4>
                  <p className="text-xs text-nrln-slate-300 mt-0.5 mb-2">Débloquez toutes les fonctionnalités</p>
                  <Link 
                    href="/dashboard/subscription/upgrade" 
                    className="text-xs bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white py-1.5 px-3 rounded-md inline-flex items-center transition-colors"
                  >
                    <span>Améliorer</span>
                    <ChevronRight className="h-3 w-3 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Profil utilisateur */}
      <div className="p-4 border-t border-nrln-slate-800/50">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-nrln-slate-800 border border-nrln-slate-700/50 flex items-center justify-center">
            <LucideIcons.User className="h-5 w-5 text-nrln-slate-300" />
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-white truncate">Utilisateur</p>
              <p className="text-xs text-nrln-slate-400 truncate">utilisateur@example.com</p>
            </div>
          )}
          {!collapsed && (
            <Link href="/dashboard/logout" className="p-1.5 rounded-lg hover:bg-nrln-slate-800/80 text-nrln-slate-400 hover:text-nrln-slate-300 transition-colors">
              <LogOut className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
      
      {/* Bouton pour réduire/agrandir le sidebar */}
      <button 
        className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2 h-6 w-6 rounded-full bg-nrln-slate-800 border border-nrln-slate-700/50 flex items-center justify-center text-nrln-slate-300 hover:text-white"
        onClick={() => setCollapsed(!collapsed)}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${collapsed ? 'rotate-180' : ''}`} />
      </button>
    </div>
  );
} 