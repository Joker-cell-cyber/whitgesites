'use client';

import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { SITE_DESCRIPTION } from "@/app/lib/constants";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ScrollDown from "@/app/components/ui/scroll-down";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
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
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-red-950 via-red-900 to-orange-950 pt-16 sm:pt-0">
      {/* Motifs d'arrière-plan */}
      <div className="absolute inset-0 bg-[url('/fitness-pattern.svg')] bg-repeat opacity-5 z-0"></div>
      
      {/* Cercles lumineux */}
      <div 
        className="absolute top-1/4 right-1/3 w-[300px] h-[300px] rounded-full bg-red-500/10 blur-3xl z-10"
        style={{
          transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`,
        }}
      ></div>
      <div 
        className="absolute bottom-1/4 left-1/3 w-[250px] h-[250px] rounded-full bg-orange-500/10 blur-3xl z-10"
        style={{
          transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`,
        }}
      ></div>
      
      {/* Particules dynamiques */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: i % 3 === 0 ? 'rgba(239, 68, 68, 0.3)' : i % 3 === 1 ? 'rgba(249, 115, 22, 0.3)' : 'rgba(234, 179, 8, 0.3)'
            }}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%", 
              opacity: 0 
            }}
            animate={{ 
              y: [
                Math.random() * 100 + "%", 
                Math.random() * 100 + "%", 
                Math.random() * 100 + "%"
              ],
              opacity: [0, 0.7, 0],
              scale: [0, 1, 0]
            }}
            transition={{ 
              duration: 8 + Math.random() * 10, 
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      {/* Éléments 3D */}
      <motion.div
        className="absolute -top-16 right-10 md:right-32 w-40 h-40 md:w-64 md:h-64 lg:w-80 lg:h-80 z-20 opacity-70 hidden md:block"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        style={{
          transform: `rotateX(${mousePosition.y * 10}deg) rotateY(${mousePosition.x * 10}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="absolute w-full h-full rounded-full border-4 border-dashed border-red-500/30 animate-spin-slow" style={{ animationDuration: '15s' }}></div>
        <div className="absolute w-full h-full rounded-full border-4 border-dashed border-orange-500/30 animate-spin-slow animate-reverse" style={{ animationDuration: '20s' }}></div>
        <div className="absolute inset-8 rounded-full border-4 border-dashed border-yellow-500/30 animate-spin-slow" style={{ animationDuration: '25s' }}></div>
      </motion.div>
      
      <motion.div
        className="absolute bottom-20 left-10 md:left-20 w-32 h-32 md:w-48 md:h-48 hidden md:block"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        style={{
          transform: `translate3d(${mousePosition.x * 15}px, ${mousePosition.y * 15}px, 0)`,
        }}
      >
        <div className="absolute h-full w-full bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-xl shadow-lg shadow-red-500/5 backdrop-blur-sm border border-red-500/10 rotate-12"></div>
        <div className="absolute h-full w-full bg-gradient-to-br from-orange-500/10 to-yellow-500/10 rounded-xl shadow-lg shadow-orange-500/5 backdrop-blur-sm border border-orange-500/10 rotate-6 translate-x-4 translate-y-4"></div>
      </motion.div>
      
      {/* Contenu principal */}
      <div className="container relative z-30 px-4 sm:px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16 items-center">
          {/* Texte et CTA */}
          <div className="lg:col-span-3 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center rounded-full px-4 py-1.5 bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-md border border-red-500/30 text-sm text-white">
                <span className="flex h-2.5 w-2.5 mr-2 rounded-full bg-red-500 animate-pulse"></span>
                IA de Fitness & Nutrition Personnalisée
      </div>
      
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight">
                <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  Transformez votre
                </span>
                <br />
                <span className="relative">
                  <span className="bg-gradient-to-r from-red-500 via-orange-400 to-yellow-500 bg-clip-text text-transparent">
                    condition physique
                  </span>
                  <motion.div 
                    className="absolute -bottom-2 inset-x-0 h-2 bg-gradient-to-r from-red-500 via-orange-400 to-yellow-500 rounded-full"
                    initial={{ width: 0, left: "50%", right: "50%" }}
                    animate={{ width: "100%", left: 0, right: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  />
                </span>
            </h1>
            
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
                Programmes personnalisés, suivi nutritionnel avancé et coach IA disponible 24/7 pour des résultats exceptionnels
            </p>
          
              <div className="flex flex-col sm:flex-row gap-5">
              <Link href="/#pricing">
                  <Button size="lg" className="relative group bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white border-0 h-14 px-8 text-lg font-semibold rounded-xl shadow-xl shadow-red-700/20 overflow-hidden">
                    <span className="relative z-10">Commencer maintenant</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </Button>
            </Link>
              
              <Link href="/#features">
                  <Button size="lg" variant="outline" className="border-orange-500/50 text-orange-300 hover:bg-orange-900/20 h-14 px-8 text-lg font-semibold rounded-xl">
                    Découvrir les fonctionnalités
              </Button>
            </Link>
            </div>
            </motion.div>
          </div>
          
          {/* Interface d'application */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative mx-auto max-w-md">
              {/* Effet de profondeur */}
              <div className="absolute -inset-3 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-3xl blur-xl"></div>
              
              {/* Interface de l'application */}
              <div className="relative bg-gradient-to-b from-gray-900 to-gray-950 rounded-3xl overflow-hidden border border-red-500/20 shadow-2xl">
                {/* Barre d'état */}
                <div className="h-14 bg-black/30 border-b border-red-500/20 flex items-center justify-between px-5">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <div className="text-white font-medium">FitNeuralCoach</div>
                  </div>
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </div>
                </div>
                
                {/* Contenu principal */}
                <div className="p-5">
                  <div className="mb-5">
                    <h3 className="text-white font-bold text-lg mb-2">Programme d'entraînement personnalisé</h3>
                    <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-red-500 to-orange-500 w-4/5 rounded-full"></div>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span className="text-gray-400">Progression: 80%</span>
                      <span className="text-orange-400">Jour 16/20</span>
                    </div>
                  </div>
                  
                  {/* Session d'aujourd'hui */}
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 mb-5 border border-red-500/10">
                    <h4 className="text-white font-semibold mb-3">Séance d'aujourd'hui: Haut du corps</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center text-red-400 mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div className="text-gray-300">Développé couché</div>
                        </div>
                        <div className="text-gray-400 text-sm">4 × 12</div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center text-red-400 mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div className="text-gray-300">Traction assistée</div>
                        </div>
                        <div className="text-gray-400 text-sm">3 × 10</div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500/20 to-yellow-500/20 flex items-center justify-center text-orange-400 mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div className="text-gray-300">Élévations latérales</div>
                        </div>
                        <div className="text-gray-400 text-sm">3 × 15</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Boutons d'action */}
                  <div className="flex gap-3">
                    <button className="flex-1 bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-xl py-3 font-medium">
                      Commencer
                    </button>
                    <button className="flex-1 border border-red-500/30 text-red-400 rounded-xl py-3 font-medium">
                      Consulter le coach
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Badge 3D */}
              <div className="absolute -top-6 -right-6 h-16 w-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl shadow-lg shadow-red-700/20 flex items-center justify-center transform rotate-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
          </div>
          </motion.div>
        </div>
      </div>
      
      {/* Composant ScrollDown */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <ScrollDown targetId="features" className="text-orange-400" />
      </div>
    </section>
  );
} 