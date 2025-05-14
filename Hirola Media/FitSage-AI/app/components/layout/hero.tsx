'use client';

import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    setIsLoaded(true);
    
    // Effet de suivi du curseur pour parallaxe légère
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      setMousePosition({
        x: (clientX - centerX) / centerX,
        y: (clientY - centerY) / centerY
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <section 
      ref={heroRef} 
      className="fs-hero relative min-h-[90vh] overflow-hidden bg-gradient-to-b from-fs-slate-900 via-fs-slate-800 to-fs-slate-900"
    >
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 fs-grid-pattern opacity-10"></div>
      <div 
        className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-fs-teal-500/20 via-transparent to-transparent opacity-40"
        style={{
          transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`,
        }}
      ></div>
      <div 
        className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-fs-blue-500/20 via-transparent to-transparent opacity-40"
        style={{
          transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`,
        }}
      ></div>

      {/* Éléments flottants animés */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute bg-white/5 backdrop-blur-sm border border-fs-teal-500/20 rounded-lg transform fs-floating-element`}
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
              animationDuration: `${Math.random() * 10 + 15}s`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.5 + Math.random() * 0.3,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}
      </div>

      {/* Points lumineux */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-fs-teal-400 fs-glow-point"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.3 + Math.random() * 0.7,
              animation: `fs-pulse ${Math.random() * 5 + 2}s infinite alternate`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
      
      {/* Contenu principal */}
      <div className="container relative z-30 px-4 mx-auto min-h-[90vh] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16 lg:py-0">
          {/* Contenu textuel */}
          <div 
            className={`space-y-8 transition-all duration-1000 transform ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="fs-pill-badge inline-flex items-center px-4 py-2 rounded-full bg-fs-teal-900/60 border border-fs-teal-500/30 backdrop-blur-sm">
              <span className="mr-2 inline-block w-2 h-2 rounded-full bg-fs-teal-400 animate-pulse"></span>
              <span className="text-fs-teal-100 text-sm">IA · Fitness · Nutrition · Coaching personnalisé</span>
            </div>
            
            <h1 className="fs-hero-title text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              <span className="block">Transformez votre corps</span>
              <span className="relative">
                <span className="fs-gradient-text bg-gradient-to-r from-fs-teal-400 to-fs-blue-400 text-transparent bg-clip-text">
                  avec l'intelligence artificielle
                </span>
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-fs-teal-400 to-fs-blue-400 opacity-70 rounded-full"></span>
              </span>
            </h1>
            
            <p className="fs-hero-subtitle text-lg md:text-xl text-fs-slate-100 max-w-xl">
              FitSage AI crée pour vous des programmes d'entraînement et des plans nutritionnels personnalisés grâce à l'IA, disponible 24/7 pour vous accompagner vers vos objectifs.
            </p>
          
            <div 
              className={`flex flex-col sm:flex-row gap-5 transition-all duration-1000 delay-300 transform ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <Link href="/#pricing" className="fs-button-primary">
                <span className="flex items-center">
                  Commencer mon coaching
                  <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              
              <Link href="/#features" className="fs-button-secondary">
                <span className="flex items-center">
                  Explorer les fonctionnalités
                  <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </Link>
            </div>
            
            {/* Métriques */}
            <div 
              className={`transition-all duration-1000 delay-500 transform ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              {/* Les métriques ont été retirées comme demandé */}
            </div>
          </div>
          
          {/* Visuel de l'application */}
          <div 
            className={`relative transition-all duration-1000 delay-200 transform ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="relative z-10 mx-auto max-w-md lg:mr-0">
              {/* Cercle décoratif */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] rounded-full bg-gradient-to-tr from-fs-teal-500/30 via-fs-blue-500/20 to-transparent blur-xl"></div>
              
              {/* Interface affichée */}
              <div className="relative border-8 border-fs-slate-800 bg-fs-slate-950 rounded-3xl shadow-2xl overflow-hidden">
                <Image
                  src="/dashboard-preview.png"
                  alt="Interface FitSage AI"
                  width={600}
                  height={1200}
                  className="w-full object-cover rounded-2xl"
                />
                
                {/* Reflet sur l'écran */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-50"></div>
              </div>
              
              {/* Éléments UI flottants */}
              <div 
                className="absolute -top-6 -left-6 w-48 bg-fs-slate-800/90 backdrop-blur-sm border border-fs-teal-500/30 rounded-lg p-3 shadow-lg fs-floating-card"
                style={{
                  transform: `translate(${mousePosition.x * -10}px, ${mousePosition.y * -10}px)`,
                }}
              >
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-fs-teal-500/20 flex items-center justify-center mr-2">
                    <svg className="w-4 h-4 text-fs-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="text-white text-sm font-medium">Progression +12%</div>
                </div>
                <div className="w-full h-2 bg-fs-slate-700 rounded-full overflow-hidden">
                  <div className="h-full w-[62%] bg-gradient-to-r from-fs-teal-500 to-fs-blue-500 rounded-full"></div>
                </div>
              </div>
              
              <div 
                className="absolute -bottom-4 -right-4 w-40 bg-fs-slate-800/90 backdrop-blur-sm border border-fs-blue-500/30 rounded-lg p-3 shadow-lg fs-floating-card"
                style={{
                  transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
                }}
              >
                <div className="text-white text-xs mb-1">Aujourd'hui</div>
                <div className="text-fs-blue-400 text-lg font-bold mb-1">Programme HIIT</div>
                <div className="flex justify-between items-center">
                  <span className="text-white text-xs">30 min</span>
                  <div className="px-2 py-0.5 rounded bg-fs-blue-500/20 text-fs-blue-300 text-xs">20:00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Indicateur de défilement */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <svg className="w-6 h-6 text-fs-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
} 