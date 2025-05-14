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
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-orange-50 pt-16">
      {/* Mesh gradient */}
      <div className="absolute inset-0 z-0 opacity-60">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-orange-500/10 blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] rounded-full bg-orange-300/10 blur-[80px]"></div>
        <div className="absolute top-2/3 left-1/2 w-[300px] h-[300px] rounded-full bg-yellow-500/10 blur-[60px]"></div>
      </div>
      
      {/* Pattern overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5 z-10"></div>
      
      {/* Animated geometric shapes */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-lg z-10"
          style={{
            width: 40 + Math.random() * 60,
            height: 40 + Math.random() * 60,
            border: `1px solid rgba(${i % 3 === 0 ? '249, 115, 22' : i % 3 === 1 ? '234, 88, 12' : '245, 158, 11'}, 0.2)`,
            background: `linear-gradient(135deg, rgba(${i % 3 === 0 ? '249, 115, 22' : i % 3 === 1 ? '234, 88, 12' : '245, 158, 11'}, 0.05) 0%, rgba(${i % 3 === 0 ? '249, 115, 22' : i % 3 === 1 ? '234, 88, 12' : '245, 158, 11'}, 0.01) 100%)`,
            backdropFilter: 'blur(4px)',
            left: `${Math.random() * 90}%`,
            top: `${Math.random() * 90}%`,
            transform: `translate(${mousePosition.x * (Math.random() * 30 - 15)}px, ${mousePosition.y * (Math.random() * 30 - 15)}px) rotate(${i * 45}deg)`,
          }}
          initial={{
            opacity: 0,
            scale: 0.5,
            rotate: i * 45,
          }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            y: [0, -20, 0],
            scale: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 8 + Math.random() * 10,
            delay: i * 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
      
      {/* Main 3D element */}
      <motion.div
        className="absolute hidden lg:block"
        style={{
          perspective: "1000px",
          top: "20%",
          right: "15%",
          width: "300px",
          height: "300px",
          transform: `rotateX(${mousePosition.y * 10}deg) rotateY(${mousePosition.x * 10}deg)`,
          transformStyle: "preserve-3d",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-40 h-40 rounded-full border border-orange-500/30 animate-spin-slow" style={{ animationDuration: '20s' }}></div>
          <div className="w-80 h-80 rounded-full border border-orange-400/20 animate-spin-slow animate-reverse" style={{ animationDuration: '25s' }}></div>
          <div className="w-60 h-60 rounded-full border border-orange-300/10 animate-spin-slow" style={{ animationDuration: '30s' }}></div>
          
          {/* Floating cubes */}
          <motion.div 
            className="absolute w-16 h-16 bg-gradient-to-br from-orange-500/5 to-orange-400/5 rounded-lg backdrop-blur-sm border border-orange-500/10"
            initial={{ y: 0, rotate: 0 }}
            animate={{ y: [-10, 10, -10], rotate: [0, 15, 0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 8 }}
          ></motion.div>
          
          <motion.div 
            className="absolute w-12 h-12 bg-gradient-to-br from-orange-400/5 to-yellow-500/5 rounded-lg backdrop-blur-sm border border-orange-400/10 transform translate-x-20 translate-y-10"
            initial={{ y: 0, rotate: 0 }}
            animate={{ y: [5, -10, 5], rotate: [15, 0, -15, 0, 15] }}
            transition={{ repeat: Infinity, duration: 7, delay: 1 }}
          ></motion.div>
          
          <motion.div 
            className="absolute w-14 h-14 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 rounded-lg backdrop-blur-sm border border-yellow-500/10 transform -translate-x-16 -translate-y-16"
            initial={{ y: 0, rotate: 0 }}
            animate={{ y: [0, 15, 0], rotate: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 9, delay: 2 }}
          ></motion.div>
        </div>
      </motion.div>
      
      {/* Main content */}
      <div className="container relative z-20 px-4 sm:px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left space-y-8"
          >
            <div className="inline-flex items-center rounded-full px-4 py-1.5 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 backdrop-blur-md border border-orange-500/30 text-sm font-medium text-orange-800">
              <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse mr-2"></span>
              Analyse de publicités Facebook propulsée par IA
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight">
              <span className="text-gray-800">Optimisez vos</span>
              <br/>
              <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent relative">
                Facebook Ads
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-500 rounded-full"
                  initial={{ width: 0, left: "50%", right: "50%" }}
                  animate={{ width: "100%", left: 0, right: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </span>
            </h1>
            
            <p className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
              {SITE_DESCRIPTION} Analysez et optimisez vos campagnes publicitaires Facebook avec notre plateforme d'intelligence artificielle avancée.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
              <Link href="/#pricing">
                <Button size="lg" className="relative overflow-hidden group bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-medium h-14 px-8 text-lg rounded-xl shadow-xl shadow-orange-500/30">
                  <span className="relative z-10">Commencer maintenant</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                </Button>
              </Link>
            
              <Link href="/#features">
                <Button size="lg" variant="outline" className="border-orange-500/50 text-orange-700 hover:bg-orange-100/20 h-14 px-8 text-lg font-medium rounded-xl">
                  Découvrir nos fonctionnalités
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-orange-500/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">+500</div>
                <div className="text-sm text-gray-600">Campagnes analysées</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">+25%</div>
                <div className="text-sm text-gray-600">ROI moyen</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">4.9/5</div>
                <div className="text-sm text-gray-600">Précision de l'IA</div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto max-w-md lg:max-w-none"
          >
            {/* UI Card */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-2xl blur-xl"></div>
              
              <div className="relative bg-white backdrop-blur-sm rounded-xl border border-orange-200 shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="h-14 bg-gradient-to-r from-orange-100 to-orange-50 border-b border-orange-200 flex items-center justify-between px-5">
                  <div className="flex items-center gap-3">
                    <div className="h-7 w-7 rounded-full bg-gradient-to-br from-orange-500 to-orange-400 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="text-orange-800 font-medium text-sm">AdPulseAI</div>
                  </div>
                  <div className="flex space-x-1">
                    <div className="h-3 w-3 rounded-full bg-orange-500/50"></div>
                    <div className="h-3 w-3 rounded-full bg-orange-400/50"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500/50"></div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-5">
                  <div className="space-y-5">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-gray-800 font-semibold">Performance des campagnes</h3>
                        <div className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-700 rounded-full">
                          En hausse
                        </div>
                      </div>
                      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 w-3/5 rounded-full"></div>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span className="text-gray-500">12 conversions aujourd'hui</span>
                        <span className="text-orange-600">+60% vs hier</span>
                      </div>
                    </div>
                    
                    <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                      <h4 className="text-gray-800 font-semibold mb-2">Recommandations IA</h4>
                      <p className="text-sm text-gray-600 mb-3">Optimisation du ciblage des audiences pour la campagne "Promotion d'été"</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-500/20 to-yellow-500/20 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-orange-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                          </div>
                          <div className="text-sm text-gray-600">Potentiel d'amélioration: +35%</div>
                        </div>
                        <div className="text-xs font-medium text-orange-600">
                          Appliquer
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-orange-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <div className="text-sm font-medium text-gray-700">Femmes 25-34 ans</div>
                        </div>
                        <div className="text-sm font-medium text-gray-700">3.4x ROI</div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-orange-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <div className="text-sm font-medium text-gray-700">Paris, Lyon, Marseille</div>
                        </div>
                        <div className="text-sm font-medium text-gray-700">5.2x ROI</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30">
        <ScrollDown />
      </div>
    </section>
  );
} 