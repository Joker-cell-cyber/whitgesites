"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DASHBOARD_NAVIGATION, SITE_NAME } from "@/app/lib/constants";
import { cn } from "@/app/lib/utils";
import { useState, useEffect } from "react";
import { 
  User, Palette, Image, ShoppingCart, Calendar, Settings, 
  MessageSquare, Users, Heart, PieChart, LogOut, Sparkles
} from "lucide-react";

// Définir les éléments de navigation
const mainNavItems = [
  {
    name: "Tableau de bord",
    href: "/dashboard",
    icon: PieChart,
    description: "Vue d'ensemble de vos activités"
  },
  {
    name: "Mes œuvres",
    href: "/dashboard/artworks",
    icon: Palette,
    description: "Gérer votre collection"
  },
  {
    name: "Galerie",
    href: "/dashboard/gallery",
    icon: Image,
    description: "Vos œuvres exposées"
  },
  {
    name: "Commandes",
    href: "/dashboard/orders",
    icon: ShoppingCart,
    description: "Historique d'achats et ventes"
  },
  {
    name: "Événements",
    href: "/dashboard/events",
    icon: Calendar,
    description: "Expositions à venir"
  },
  {
    name: "Messages",
    href: "/dashboard/messages",
    icon: MessageSquare,
    description: "Communications avec clients et artistes",
    badge: "3"
  },
];

const secondaryNavItems = [
  {
    name: "Favoris",
    href: "/dashboard/favorites",
    icon: Heart,
    description: "Œuvres marquées"
  },
  {
    name: "Communauté",
    href: "/dashboard/community",
    icon: Users,
    description: "Réseau d'artistes"
  },
  {
    name: "Paramètres",
    href: "/dashboard/settings",
    icon: Settings,
    description: "Configurer votre compte"
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, rotation: number}>>([]);

  // Vérifier si un élément est actif
  const isActive = (href: string) => {
    return pathname === href || pathname?.startsWith(`${href}/`);
  };

  // Générer des particules pour l'effet visuel
  useEffect(() => {
    const particleCount = 10;
    const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      rotation: Math.random() * 360
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="flex flex-col h-full border-r border-ocrf-gold-500/10 bg-gradient-to-b from-ocrf-anthracite-950 to-ocrf-anthracite-900 relative overflow-hidden">
      {/* Particules décoratives */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((particle) => (
          <div 
            key={particle.id}
            className="absolute"
            style={{
              top: `${particle.y}%`,
              left: `${particle.x}%`,
              animation: `float ${15 + Math.random() * 15}s ease-in-out infinite alternate`,
              opacity: 0.15
            }}
          >
            <div 
              className="w-full h-full bg-ocrf-gold-300" 
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                transform: `rotate(${particle.rotation}deg)`
              }}
            />
          </div>
        ))}
      </div>

      {/* Pattern de fond */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.2) 2%, transparent 0%)`,
        backgroundSize: '50px 50px'
      }}></div>

      {/* En-tête du sidebar */}
      <div className="p-6 border-b border-ocrf-gold-500/10 relative z-10">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ocrf-gold-400 to-ocrf-copper-500 flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-ocrf-anthracite-900" />
          </div>
          <div className="flex items-center">
            <span className="text-lg font-serif font-bold text-white">Oneiri</span>
            <span className="text-lg font-serif font-bold text-ocrf-gold-400">Crafts</span>
          </div>
        </Link>
      </div>

      {/* Navigation principale */}
      <div className="flex-1 py-6 px-4 overflow-y-auto hide-scrollbar relative z-10">
        <div className="space-y-1 mb-6">
          <p className="text-xs font-medium text-ocrf-gold-400/70 px-3 mb-2 uppercase tracking-wider">
            Navigation principale
          </p>
          
          {mainNavItems.map((item) => {
            const isItemActive = isActive(item.href);
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-md transition-all relative group overflow-hidden",
                  isItemActive
                    ? "bg-gradient-to-r from-ocrf-gold-600/20 to-ocrf-gold-400/5 text-white"
                    : "text-ocrf-brown-200 hover:bg-ocrf-anthracite-800/50"
                )}
              >
                {/* Indication visuelle pour l'élément actif */}
                {isItemActive && (
                  <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-ocrf-gold-500"></span>
                )}
                
                <div className={cn(
                  "w-8 h-8 rounded-md flex items-center justify-center",
                  isItemActive 
                    ? "bg-ocrf-gold-500/20 text-ocrf-gold-400" 
                    : "bg-ocrf-anthracite-800/80 text-ocrf-brown-300 group-hover:text-ocrf-gold-400"
                )}>
                  <item.icon className="h-4 w-4" />
                </div>
                
                <div className="flex flex-col">
                  <span className={cn(
                    "text-sm font-medium",
                    isItemActive ? "text-white" : "group-hover:text-white"
                  )}>
                    {item.name}
                  </span>
                  <span className="text-xs text-ocrf-brown-400 hidden group-hover:block transition-all">
                    {item.description}
                  </span>
                </div>
                
                {item.badge && (
                  <div className="ml-auto bg-ocrf-copper-500/20 text-ocrf-copper-400 text-xs rounded-full px-2 py-0.5">
                    {item.badge}
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        <div className="space-y-1">
          <p className="text-xs font-medium text-ocrf-gold-400/70 px-3 mb-2 uppercase tracking-wider">
            Paramètres
          </p>
          
          {secondaryNavItems.map((item) => {
            const isItemActive = isActive(item.href);
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-all relative group",
                  isItemActive
                    ? "bg-gradient-to-r from-ocrf-gold-600/20 to-ocrf-gold-400/5 text-white"
                    : "text-ocrf-brown-200 hover:bg-ocrf-anthracite-800/50"
                )}
              >
                {isItemActive && (
                  <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-ocrf-gold-500"></span>
                )}
                
                <div className={cn(
                  "w-7 h-7 rounded-md flex items-center justify-center",
                  isItemActive 
                    ? "bg-ocrf-gold-500/20 text-ocrf-gold-400" 
                    : "bg-ocrf-anthracite-800/80 text-ocrf-brown-300 group-hover:text-ocrf-gold-400"
                )}>
                  <item.icon className="h-3.5 w-3.5" />
                </div>
                
                <span className={cn(
                  "text-sm",
                  isItemActive ? "text-white" : "group-hover:text-white"
                )}>
                  {item.name}
                </span>
              </Link>
            );
          })}
          
          <Link
            href="/logout"
            className="flex items-center gap-3 px-3 py-2 mt-4 text-ocrf-brown-300 hover:text-ocrf-gold-300 transition-colors rounded-md hover:bg-ocrf-anthracite-800/50"
          >
            <div className="w-7 h-7 rounded-md flex items-center justify-center bg-ocrf-anthracite-800/80">
              <LogOut className="h-3.5 w-3.5" />
            </div>
            <span className="text-sm">Déconnexion</span>
          </Link>
        </div>
      </div>

      {/* Premium banner */}
      <div className="p-4 mx-4 mb-4 relative z-10">
        <div className="rounded-md bg-gradient-to-br from-ocrf-gold-900/50 to-ocrf-copper-900/50 border border-ocrf-gold-500/20 p-4">
          <p className="text-ocrf-gold-300 text-sm font-medium mb-2">Premium disponible</p>
          <p className="text-ocrf-brown-300 text-xs mb-3">Passez à l'offre Premium pour exposer davantage d'œuvres.</p>
          <button className="w-full bg-gradient-to-r from-ocrf-gold-600 to-ocrf-copper-500 hover:from-ocrf-gold-500 hover:to-ocrf-copper-400 text-ocrf-anthracite-900 text-xs font-medium py-1.5 rounded-md transition-colors">
            Explorer Premium
          </button>
        </div>
      </div>

      {/* Profil utilisateur */}
      <div className="p-4 border-t border-ocrf-gold-500/10 relative z-10">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-ocrf-copper-500/30 to-ocrf-gold-500/30 flex items-center justify-center p-0.5">
            <div className="h-full w-full rounded-full bg-ocrf-anthracite-900 flex items-center justify-center">
              <User className="h-4 w-4 text-ocrf-gold-400" />
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-white">Arthur Rimbaud</p>
            <p className="text-xs text-ocrf-brown-400">artiste@contentforgeai.com</p>
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
          100% { transform: translateY(5px) rotate(-5deg); }
        }
      `}</style>
    </div>
  );
} 