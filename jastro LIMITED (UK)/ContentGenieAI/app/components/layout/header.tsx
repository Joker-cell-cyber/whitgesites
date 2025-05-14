'use client';

import Link from "next/link";
import { useState, useEffect } from 'react';
import AuthStatus from "@/app/components/auth/auth-status";
import { Button } from "@/app/components/ui/button";
import { Menu, X, Shell, Anchor, ShoppingBag, Search, Ship, Fish, Waves, Droplet, ChevronDown, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

// Définition du composant WaveIcon
const WaveIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
  </svg>
);

export default function Header() {
  const [bubbles, setBubbles] = useState<Array<{
    size: number;
    top: number;
    left: number;
    opacity: number;
    animationDuration: number;
    animationDelay: number;
  }>>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  // Détecter le défilement pour ajuster l'apparence du header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Générer les bulles côté client uniquement pour éviter les erreurs d'hydratation
  useEffect(() => {
    const newBubbles = Array.from({ length: 15 }).map(() => ({
      size: Math.random() * 5 + 2,
      top: Math.random() * 100,
      left: Math.random() * 100,
      opacity: Math.random() * 0.2 + 0.1,
      animationDuration: Math.random() * 8 + 8,
      animationDelay: Math.random() * 5
    }));
    
    setBubbles(newBubbles);
  }, []);

  // Empêcher le défilement du body quand le menu mobile est ouvert
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    // Fermer le menu mobile lors du changement de route
    setMobileMenuOpen(false);
  }, [pathname]);

  const toggleDropdown = (dropdown: string) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  // Fermer les dropdowns lorsqu'on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Navigation principale avec options de dropdown
  const navigation = [
    {
      name: 'Fonctionnalités',
      dropdown: true,
      items: [
        { name: 'Génération d\'articles', href: '/features/articles', description: 'Créez des articles de blog optimisés pour le SEO' },
        { name: 'Descriptions produits', href: '/features/products', description: 'Rédigez des descriptions produits convaincantes' },
        { name: 'Méta-descriptions', href: '/features/meta', description: 'Optimisez vos balises meta pour un meilleur référencement' },
        { name: 'Formats de contenu', href: '/features/formats', description: 'Explorez tous nos modèles de contenu disponibles' },
      ]
    },
    {
      name: 'Solutions',
      dropdown: true,
      items: [
        { name: 'E-commerce', href: '/solutions/ecommerce', description: 'Solutions pour les boutiques en ligne' },
        { name: 'Blogs & Médias', href: '/solutions/blogs', description: 'Idéal pour les créateurs de contenu' },
        { name: 'Agences SEO', href: '/solutions/agencies', description: 'Outils pour les professionnels du référencement' },
        { name: 'Entreprises', href: '/solutions/enterprise', description: 'Solutions sur mesure pour grandes organisations' },
      ]
    },
    {
      name: 'Ressources',
      dropdown: true,
      items: [
        { name: 'Guide SEO', href: '/resources/seo-guide', description: 'Conseils pour optimiser votre référencement' },
        { name: 'Bibliothèque de modèles', href: '/resources/templates', description: 'Modèles prêts à l\'emploi' },
        { name: 'Études de cas', href: '/resources/case-studies', description: 'Découvrez nos réussites client' },
        { name: 'Blog', href: '/blog', description: 'Articles et actualités sur le SEO' },
      ]
    },
    {
      name: 'Tarifs',
      href: '/pricing',
      dropdown: false
    },
    { name: 'Blog', href: '/blog', dropdown: false },
    { name: 'À propos', href: '/about', dropdown: false },
  ];

  // Déterminer si le lien est actif
  const isActive = (pathname: string, href: string) => {
    if (href === '/') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-white shadow-sm h-16 sm:h-16" 
        : "bg-transparent h-20 sm:h-20"
    }`}>
      {/* Effet de vague en bas du header */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg className="w-full h-2 fill-[#EBF6FA] opacity-70" viewBox="0 0 1200 30" preserveAspectRatio="none">
          <path d="M0,0 C150,20 350,0 500,15 C650,30 800,10 1000,20 L1200,0 L1200,30 L0,30 Z"></path>
        </svg>
      </div>
      
      {/* Bulles décoratives */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {bubbles.map((bubble, index) => (
          <motion.div 
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: -20, opacity: bubble.opacity }}
            transition={{
              y: {
                duration: bubble.animationDuration,
                repeat: Infinity,
                repeatType: "reverse",
                delay: bubble.animationDelay
              },
              opacity: { duration: 1, delay: bubble.animationDelay }
            }}
            className="absolute rounded-full bg-[#BBE5EF]"
            style={{
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              top: `${bubble.top}%`,
              left: `${bubble.left}%`,
              filter: "blur(0.5px)"
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto h-full flex items-center px-4 sm:px-6">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <Link href="/" className="relative group">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-[#EBF6FA] border border-[#BBE5EF] flex items-center justify-center shadow-sm mr-2 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                <Shell className="h-6 w-6 text-[#1A7BA4]" />
              </div>
              <span className="text-xl font-semibold text-[#14304D] group-hover:text-[#1A7BA4] transition-colors duration-300">
                Content<span className="text-[#1A7BA4]">GenieAI</span>
              </span>
            </div>
          </Link>
          
          {/* Boutons d'authentification - version desktop */}
          <div className="hidden md:block">
            <AuthStatus className="flex items-center space-x-4" />
          </div>
          
          {/* Bouton menu hamburger - version mobile */}
          <button 
            className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#EBF6FA] text-[#1A7BA4]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu principal"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      
      {/* Menu mobile */}
      <div 
        className={`fixed inset-0 z-40 bg-white/95 onc-gradient-bg backdrop-blur-sm transform transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        } md:hidden pt-20`}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none onc-water-pattern opacity-5"></div>
        
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col space-y-6">
            <div className="pt-4 border-t border-[#BBE5EF]/30">
              <AuthStatus className="flex flex-col space-y-3 w-full" />
            </div>
          </div>
        </div>
        
        {/* Élément décoratif au bas du menu mobile */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg className="w-full h-24 fill-[#1A7BA4] opacity-10" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 L1200,0 L1200,120 C1000,80 800,100 600,70 C400,40 200,60 0,30 L0,0 Z"></path>
          </svg>
          <div className="absolute bottom-6 right-6 opacity-20">
            <Fish className="h-12 w-12 text-[#1A7BA4]" />
          </div>
        </div>
      </div>
    </header>
  );
} 