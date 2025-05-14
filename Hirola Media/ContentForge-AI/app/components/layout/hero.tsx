'use client';

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SITE_DESCRIPTION } from "@/app/lib/constants";
import { ArrowDown, Sparkles, Star, Moon } from "lucide-react";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Animation d'entrée
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    // Effet de parallaxe au mouvement de la souris
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const rect = heroRef.current.getBoundingClientRect();
      
      setMousePosition({
        x: (clientX - rect.left) / rect.width,
        y: (clientY - rect.top) / rect.height
      });
    };
    
    const currentRef = heroRef.current;
    if (currentRef) {
      currentRef.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  // Calculer le déplacement parallaxe basé sur la position de la souris
  const getParallaxStyle = (factor: number) => {
    const x = (mousePosition.x - 0.5) * factor;
    const y = (mousePosition.y - 0.5) * factor;
    return {
      transform: `translate(${x}px, ${y}px)`
    };
  };
  
  // Particules décoratives
  const generateParticles = (count: number) => {
    return Array.from({ length: count }).map((_, index) => {
      const size = Math.random() * 3 + 2;
      const opacity = Math.random() * 0.5 + 0.3;
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const delay = Math.random() * 5;
      const duration = Math.random() * 3 + 3;
      
      return (
        <div
          key={index}
          className="absolute rounded-full bg-ocrf-gold-300 animate-pulse"
          style={{
            width: `${size}px`, 
            height: `${size}px`, 
            top: `${top}%`, 
            left: `${left}%`,
            opacity: opacity,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`
          }}
        />
      );
    });
  };

  return (
    <section 
      ref={heroRef}
      className="onr-hero relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-0"
    >
      {/* Fond corporate */}
      <div className="absolute inset-0 bg-gradient-to-b from-ocrf-anthracite-900 via-ocrf-brown-900 to-ocrf-anthracite-800 z-0" />
      
      {/* Texture de fond */}
      <div 
        className="absolute inset-0 opacity-20 mix-blend-overlay z-10"
        style={{ ...getParallaxStyle(10) }}
      >
        <Image 
          src="/texture-bg.jpg" 
          alt="Texture" 
          fill 
          className="object-cover"
          priority
        />
      </div>
      
      {/* Particules décoratives */}
      <div className="absolute inset-0 z-20">
        {generateParticles(80)}
      </div>
      
      {/* Cercles abstraits */}
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] border border-ocrf-copper-500/20 rounded-full z-20"
        style={{ ...getParallaxStyle(15) }}
      />
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[20rem] h-[20rem] border border-ocrf-gold-400/30 rounded-full z-20"
        style={{ ...getParallaxStyle(25) }}
      />
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[10rem] h-[10rem] border border-ocrf-copper-300/40 rounded-full z-20"
        style={{ ...getParallaxStyle(40) }}
      />
      
      {/* Élément décoratif */}
      <div 
        className="absolute top-[15%] right-[10%] z-30"
        style={{ ...getParallaxStyle(-20) }}
      >
        <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-ocrf-gold-300 to-ocrf-copper-400 shadow-[0_0_40px_rgba(223,194,85,0.3)]">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-ocrf-copper-500/20 to-transparent"></div>
        </div>
      </div>
      
      {/* Particules flottantes */}
      <div className="absolute inset-0 z-20">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className={`absolute w-[100px] h-[100px] opacity-20 rounded-full mix-blend-screen animate-float-slow`}
            style={{
              backgroundColor: index % 2 === 0 ? '#DFC255' : '#EC9763',
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
              animationDelay: `${index * 0.7}s`,
              ...getParallaxStyle(10 - index * 2)
            }}
          />
        ))}
      </div>
      
      {/* Contenu principal */}
      <div className="container relative z-30 px-6">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          <div 
            className="space-y-6"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease'
            }}
          >
            <div className="inline-flex items-center px-5 py-2.5 rounded-full backdrop-blur-lg bg-ocrf-anthracite-800/70 border border-ocrf-gold-500/30 text-ocrf-gold-100 text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-2 text-ocrf-gold-300" />
              <span>Excellence et créativité</span>
            </div>
            
            <h1 className="onr-hero-title text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-ocrf-gold-300 via-ocrf-copper-400 to-ocrf-gold-500">
                ContentForge AI
              </span>
              <span className="block text-white">Solutions créatives</span>
            </h1>
            
            <p className="text-xl text-ocrf-brown-100 max-w-2xl mx-auto leading-relaxed">
              {SITE_DESCRIPTION || "Des solutions innovantes et professionnelles adaptées à vos besoins. Notre expertise au service de votre entreprise pour des résultats exceptionnels."}
            </p>
          </div>
          
          <div 
            className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto max-w-md mx-auto"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
              transitionDelay: '200ms'
            }}
          >
            <Link 
              href="#pricing" 
              className="onr-button-primary w-full sm:w-auto bg-gradient-to-r from-ocrf-copper-500 to-ocrf-gold-500 hover:from-ocrf-copper-600 hover:to-ocrf-gold-600 text-white font-medium px-8 py-4 rounded-xl shadow-lg shadow-ocrf-copper-500/25 hover:shadow-ocrf-copper-500/40 transition-all duration-300 flex items-center justify-center group"
            >
              <span>Nos services</span>
              <span className="ml-2 rounded-full bg-white/20 p-1 group-hover:translate-x-1 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
            
            <Link 
              href="/contact" 
              className="onr-button-secondary w-full sm:w-auto border-2 border-ocrf-gold-400/30 bg-ocrf-anthracite-800/50 backdrop-blur-md text-ocrf-gold-100 font-medium px-8 py-4 rounded-xl hover:bg-ocrf-anthracite-700/50 hover:border-ocrf-gold-400/50 transition-all duration-300 flex items-center justify-center"
            >
              <span>Nous contacter</span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Indicateur de défilement */}
      <div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30 animate-bounce"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.7s ease',
          transitionDelay: '500ms'
        }}
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-ocrf-gold-200 text-xs">Découvrir</span>
          <ArrowDown className="h-5 w-5 text-ocrf-gold-300" />
        </div>
      </div>
    </section>
  );
} 