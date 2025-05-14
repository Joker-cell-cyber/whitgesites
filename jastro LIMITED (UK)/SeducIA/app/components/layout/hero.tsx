'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ChevronRightIcon, HeartIcon, SparklesIcon } from "lucide-react";

const MessageIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    setIsVisible(true);
    
    // Autoplay video when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Video autoplay was prevented:', error);
      });
    }
  }, []);
  
  return (
    <section className="relative py-20 lg:py-32 yfc-gradient-bg overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 yfc-pattern-bg opacity-50"></div>
      
      {/* Background warm shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#F7C8BA]/40 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#F9EAC1]/40 blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-[#E16959]/20 blur-3xl"></div>
      </div>
      
      {/* Main content */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 flex flex-col space-y-8"
          >
            <div className="inline-flex">
              <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#F9D8D4] text-[#E16959] text-sm font-medium border border-[#E16959]/20">
                <HeartIcon className="mr-2 h-4 w-4" />
                Coach relationnel en ligne
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#45301C]">
              Améliorez vos <span className="yfc-heading-accent">compétences relationnelles</span> avec l'IA
            </h1>
            
            <p className="text-lg text-[#45301C]/80 max-w-2xl">
              Notre coach virtuel vous aide à développer votre confiance, améliorer votre communication et créer des relations authentiques et épanouissantes.
            </p>
          
            <div className="flex flex-col sm:flex-row gap-5 pt-4">
              <Link href="/#pricing" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto yfc-btn-primary">
                  <span className="flex items-center">
                    Voir nos offres
                    <ChevronRightIcon className="ml-2 h-5 w-5" />
                  </span>
                </Button>
              </Link>
            
              <Link href="/#features" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto yfc-btn-secondary">
                  <span className="flex items-center">
                    Découvrir les fonctionnalités
                  </span>
                </Button>
              </Link>
            </div>
          
            {/* Trust indicators */}
            <div className="pt-8 border-t border-[#F1EDE8]">
              <div className="flex flex-wrap gap-6 items-center">
                <div>
                  <p className="text-sm text-[#45301C]/60 mb-1">Technologie IA</p>
                  <p className="text-sm font-medium text-[#45301C]">Conseils personnalisés en temps réel</p>
                </div>
                
                <div>
                  <p className="text-sm text-[#45301C]/60 mb-1">Disponibilité</p>
                  <p className="text-sm font-medium text-[#45301C]">Accessible 24h/24, 7j/7</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Chat visualization column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.95 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6"
          >
            <div className="relative max-w-md mx-auto lg:ml-auto">
              {/* Chat interface */}
              <div className="yfc-card overflow-hidden p-0 shadow-lg">
                {/* Chat header */}
                <div className="bg-[#E46D4B] text-white p-4 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <SparklesIcon className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium">Coach Emma</h3>
                    <p className="text-xs text-white/70">Conseillère relationnelle IA</p>
                  </div>
                </div>
                
                {/* Chat messages */}
                <div className="p-4 bg-[#FAF8F4]">
                  <div className="space-y-4">
                    {/* Coach message */}
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-[#E46D4B] flex items-center justify-center text-white flex-shrink-0">
                        <SparklesIcon className="h-4 w-4" />
                      </div>
                      <div className="ml-2 bg-white p-3 rounded-lg rounded-tl-none max-w-[80%] shadow-sm">
                        <p className="text-[#45301C] text-sm">Bonjour! Je suis Emma, votre coach relationnelle. Comment puis-je vous aider aujourd'hui?</p>
                      </div>
                    </div>
                    
                    {/* User message */}
                    <div className="flex items-start justify-end">
                      <div className="mr-2 bg-[#E46D4B] p-3 rounded-lg rounded-tr-none max-w-[80%] shadow-sm">
                        <p className="text-white text-sm">J'ai du mal à engager la conversation lors d'un premier rendez-vous. Quels conseils pouvez-vous me donner?</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-[#F7C8BA] flex items-center justify-center text-[#E46D4B] flex-shrink-0">
                        <span className="text-sm font-medium">Vous</span>
                      </div>
                    </div>
                    
                    {/* Coach response */}
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-[#E46D4B] flex items-center justify-center text-white flex-shrink-0">
                        <SparklesIcon className="h-4 w-4" />
                      </div>
                      <div className="ml-2 bg-white p-3 rounded-lg rounded-tl-none max-w-[80%] shadow-sm">
                        <p className="text-[#45301C] text-sm">C'est une excellente question! Voici trois conseils simples pour un premier rendez-vous réussi:</p>
                        <ul className="text-[#45301C] text-sm mt-2 space-y-1 list-disc list-inside">
                          <li>Posez des questions ouvertes qui commencent par "comment" ou "pourquoi"</li>
                          <li>Écoutez activement et rebondissez sur ce que l'autre personne partage</li>
                          <li>Partagez des anecdotes légères qui montrent votre personnalité</li>
                        </ul>
                        <p className="text-[#45301C] text-sm mt-2">Voudriez-vous un exemple concret de question pour démarrer?</p>
                      </div>
                    </div>
                    
                    {/* Typing indicator */}
                    <div className="flex items-start justify-end opacity-60">
                      <div className="mr-2 bg-[#F1EDE8] p-3 rounded-lg rounded-tr-none shadow-sm">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-[#E46D4B] rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-[#E46D4B] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 bg-[#E46D4B] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-[#F7C8BA] flex items-center justify-center text-[#E46D4B] flex-shrink-0">
                        <span className="text-sm font-medium">Vous</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Chat input */}
                <div className="p-3 border-t border-[#F1EDE8] bg-white">
                  <div className="flex items-center">
                    <input 
                      type="text" 
                      placeholder="Tapez votre message..." 
                      className="flex-1 border-none bg-transparent text-[#45301C] text-sm focus:outline-none focus:ring-0" 
                    />
                    <button className="ml-2 w-8 h-8 rounded-full bg-[#E46D4B] flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#F9EAC1] rounded-lg shadow-md transform rotate-12 z-0"></div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-[#F7C8BA] rounded-lg shadow-md transform -rotate-6 z-0"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 