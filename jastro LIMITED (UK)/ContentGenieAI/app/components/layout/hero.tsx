'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/app/components/ui/button';
import Link from 'next/link';
import { ChevronRightIcon, Sparkles, Waves } from 'lucide-react';

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

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <section
      ref={heroRef}
      className="relative py-24 lg:py-32 onc-gradient-bg overflow-hidden"
    >
      {/* Background water pattern */}
      <div className="absolute inset-0 onc-water-pattern opacity-70"></div>
      
      {/* Ocean-like wave overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-40 opacity-30">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="#BBE5EF"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="#BBE5EF"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#BBE5EF"></path>
        </svg>
      </div>
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#BBE5EF]/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-[#D3E9DD]/20 rounded-full blur-2xl"></div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 0.6 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute top-40 left-[15%] w-16 h-16 bg-[#BBE5EF]/70 border border-[#1A7BA4]/20 rounded-lg shadow-lg animate-float"
        />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 0.6 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="absolute top-60 right-[20%] w-12 h-12 bg-[#26A69A]/30 border border-[#26A69A]/20 rounded-full shadow-lg animate-float"
          style={{ animationDelay: '1s' }}
        />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 0.5 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="absolute bottom-40 left-[30%] w-20 h-20 bg-[#18BDD9]/20 border border-[#18BDD9]/20 rounded-lg shadow-lg animate-float"
          style={{ animationDelay: '2s' }}
        />
        
        {/* Wave animation */}
        <div className="absolute -bottom-2 inset-x-0 h-12 flex overflow-hidden">
          <div className="flex justify-around min-w-full animate-wave">
            {Array.from({ length: 10 }).map((_, i) => (
              <WaveIcon key={i} className="w-24 h-24 text-[#BBE5EF]/40" />
            ))}
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col space-y-8"
          >
            <div className="inline-flex self-start">
              <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-[#BBE5EF] text-[#14304D] text-sm font-medium border border-[#1A7BA4]/20">
                <WaveIcon className="mr-2 h-4 w-4" />
                Propulsé par l'IA
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold onc-heading">
              <span className="onc-heading-underline">Générez</span> du contenu SEO <span className="text-[#1A7BA4]">optimisé</span>
            </h1>
            
            <p className="text-lg text-[#14304D]/80 max-w-2xl">
              Notre plateforme utilise l'intelligence artificielle avancée pour créer des articles de blog, descriptions de produits et contenus web optimisés pour le référencement naturel.
            </p>
          
            <div className="flex flex-col sm:flex-row gap-5 pt-4">
              <Link href="/signup" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto onc-btn-primary">
                  <span className="flex items-center">
                    Commencer maintenant
                    <ChevronRightIcon className="ml-2 h-5 w-5" />
                  </span>
                </Button>
              </Link>
            
              <Link href="/#features" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto onc-btn-secondary">
                  <span className="flex items-center">
                    Explorer les fonctionnalités
                  </span>
                </Button>
              </Link>
            </div>
          
            {/* Feature highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
              {[
                { title: 'Contenu unique', icon: '✨', description: 'Articles originaux et optimisés' },
                { title: 'SEO intégré', icon: '📈', description: 'Mots-clés et structure optimisés' },
                { title: 'Multiformat', icon: '📄', description: 'Exports HTML, Markdown et Word' },
              ].map((feature, i) => (
                <div key={i} className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-[#BBE5EF] hover-lift">
                  <div className="text-2xl mb-2">{feature.icon}</div>
                  <h3 className="text-[#14304D] font-semibold">{feature.title}</h3>
                  <p className="text-sm text-[#14304D]/70">{feature.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Image column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.95 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Main image */}
              <div className="onc-card-ocean p-1 rounded-lg shadow-lg overflow-hidden">
                <img 
                  src="/images/dream-craft-illustration.jpg" 
                  alt="Génération de contenu SEO par IA" 
                  className="w-full h-auto rounded-lg object-cover"
                  style={{ minHeight: '500px', backgroundColor: '#EBF6FA' }} // Placeholder style
                />
                
                {/* Floating callouts */}
                <div className="absolute top-6 right-6 onc-card-glass px-4 py-3 max-w-[200px] shadow-md">
                  <div className="flex items-center mb-1">
                    <div className="w-6 h-6 rounded-full bg-[#26A69A] flex items-center justify-center text-white text-xs mr-2">1</div>
                    <h4 className="text-sm font-semibold text-[#14304D]">Entrez vos mots-clés</h4>
                  </div>
                  <p className="text-xs text-[#14304D]/70">Spécifiez votre thématique et vos mots-clés cibles</p>
                </div>
                
                <div className="absolute bottom-6 left-6 onc-card-glass px-4 py-3 max-w-[200px] shadow-md">
                  <div className="flex items-center mb-1">
                    <div className="w-6 h-6 rounded-full bg-[#1A7BA4] flex items-center justify-center text-white text-xs mr-2">2</div>
                    <h4 className="text-sm font-semibold text-[#14304D]">Obtenez du contenu SEO</h4>
                  </div>
                  <p className="text-xs text-[#14304D]/70">Notre IA génère un contenu optimisé en quelques secondes</p>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-5 -left-5 w-16 h-16 bg-[#D3E9DD] rounded-lg shadow-md transform rotate-12 z-0"></div>
              <div className="absolute -bottom-5 -right-5 w-20 h-20 bg-[#BBE5EF] rounded-lg shadow-md transform -rotate-6 z-0"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 