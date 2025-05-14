'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from "@/app/components/ui/button";
import { DumbbellIcon, ArrowRightIcon, SparklesIcon } from "lucide-react";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <section className="relative py-24 lg:py-32 nrl-gradient-bg overflow-hidden">
      {/* Arrière-plan à motifs pastel */}
      <div className="absolute inset-0 nrl-pastel-dot-pattern opacity-30"></div>
      
      {/* Formes décoratives */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-20 left-[10%] w-48 h-48 rounded-full bg-[#E2D9F3]/40 blur-xl"
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="absolute bottom-20 right-[10%] w-56 h-56 rounded-full bg-[#D3E9DD]/40 blur-xl"
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="absolute top-1/3 right-[20%] w-40 h-40 rounded-full bg-[#FBDDC8]/40 blur-xl"
        />
      </div>
      
      {/* Éléments flottants */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-24 left-[20%] w-5 h-5 rounded-full bg-[#A590DC]/60 animate-float"></div>
        <div className="absolute top-48 right-[30%] w-3 h-3 rounded-full bg-[#8ECCAA]/60 animate-float animation-delay-2000"></div>
        <div className="absolute bottom-32 left-[35%] w-4 h-4 rounded-full bg-[#F5BA8D]/60 animate-float animation-delay-4000"></div>
        <div className="absolute bottom-40 right-[25%] w-6 h-6 rounded-full bg-[#99CDEF]/60 animate-float"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5 }}
              className="inline-flex mb-6"
            >
              <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#F5F2FC] text-[#A590DC] text-sm font-medium border border-[#E2D9F3]">
                <SparklesIcon className="mr-2 h-4 w-4" />
                Musculation · Nutrition · Coach IA
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2A303D] leading-tight mb-6"
            >
              Plateforme complète de<br /> 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#A590DC] to-[#8ECCAA]">
                musculation
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-[#2A303D]/70 max-w-3xl mx-auto mb-10"
            >
              Des programmes personnalisés et un coach IA disponible 24/7 pour transformer votre condition physique
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link href="/pricing">
                <Button size="lg" className="nrl-btn-primary">
                  <span className="flex items-center">
                    Commencer
                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </span>
                </Button>
              </Link>
              <Link href="/#features">
                <Button size="lg" variant="outline" className="nrl-btn-secondary">
                  <span className="flex items-center">
                    Explorer les fonctionnalités
                  </span>
                </Button>
              </Link>
            </motion.div>
          </div>
          
          {/* Interface graphique */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 40 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative max-w-4xl mx-auto mt-10"
          >
            <div className="nrl-card-lavender p-6 md:p-8 rounded-2xl shadow-lg">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-start gap-6 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#A590DC] rounded-lg flex items-center justify-center text-white">
                    <DumbbellIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#2A303D] mb-2">Votre programme de musculation</h3>
                    <p className="text-[#2A303D]/70">Programme personnalisé selon vos objectifs et niveau.</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="nrl-card-mint p-4 rounded-xl">
                    <h4 className="text-sm font-medium text-[#2A303D]/60 mb-1">Exercices</h4>
                    <p className="text-2xl font-bold text-[#2A303D]">12 / 16</p>
                    <div className="mt-2 h-2 bg-[#E9F5EE] rounded-full overflow-hidden">
                      <div className="h-full bg-[#8ECCAA] rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  
                  <div className="nrl-card-peach p-4 rounded-xl">
                    <h4 className="text-sm font-medium text-[#2A303D]/60 mb-1">Séances</h4>
                    <p className="text-2xl font-bold text-[#2A303D]">4</p>
                    <p className="text-xs text-[#2A303D]/60 mt-2">Cette semaine</p>
                  </div>
                  
                  <div className="nrl-card-sky p-4 rounded-xl">
                    <h4 className="text-sm font-medium text-[#2A303D]/60 mb-1">Prochaine séance</h4>
                    <p className="text-2xl font-bold text-[#2A303D]">Jambes</p>
                    <p className="text-xs text-[#2A303D]/60 mt-2">Recommandé par l'IA</p>
                  </div>
                </div>
                
                <div className="border-t border-[#EEEBE7] pt-6">
                  <h4 className="text-sm font-medium text-[#2A303D] mb-3">Répartition de votre programme</h4>
                  <div className="flex items-center gap-2">
                    <div className="flex-grow h-8 bg-[#EEF6FD] rounded-md overflow-hidden">
                      <div className="h-full bg-[#99CDEF]" style={{ width: '35%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-[#2A303D]/60 w-10">35%</span>
                    <span className="text-sm font-medium text-[#2A303D]/80">Jambes</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-grow h-8 bg-[#F5F2FC] rounded-md overflow-hidden">
                      <div className="h-full bg-[#A590DC]" style={{ width: '42%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-[#2A303D]/60 w-10">42%</span>
                    <span className="text-sm font-medium text-[#2A303D]/80">Haut du corps</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-grow h-8 bg-[#E9F5EE] rounded-md overflow-hidden">
                      <div className="h-full bg-[#8ECCAA]" style={{ width: '23%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-[#2A303D]/60 w-10">23%</span>
                    <span className="text-sm font-medium text-[#2A303D]/80">Core</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Éléments décoratifs */}
            <div className="absolute -top-6 -left-6 w-12 h-12 bg-[#FBDDC8] rounded-lg shadow transform rotate-12 opacity-70"></div>
            <div className="absolute -bottom-4 -right-4 w-10 h-10 bg-[#E2D9F3] rounded-lg shadow transform -rotate-6 opacity-70"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 