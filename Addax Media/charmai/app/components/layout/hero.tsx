'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from "@/app/components/ui/button";
import { ArrowRight, Heart, Sparkles } from "lucide-react";
import { motion, useAnimation, useInView } from "framer-motion";
import Typed from 'typed.js';

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const typedRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false });
  const controls = useAnimation();
  
  // Animation de l'entrée des éléments
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  // Animation de la position de la souris pour l'effet de dégradé interactif
  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      const { clientX, clientY } = e;
      if (!containerRef.current) return;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;
      setMousePosition({ x, y });
    }

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
      };
    }
    return () => {};
  }, []);

  // Effet de typing pour les questions
  useEffect(() => {
    const options = {
      strings: [
        'Comment trouver l\'amour ?',
        'Comment séduire avec confiance ?',
        'Comment améliorer sa communication ?',
        'Comment comprendre les signaux ?',
        'Comment surmonter les ruptures ?',
        'Comment créer une relation durable ?'
      ],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 2000,
      loop: true,
      cursorChar: '❤️',
    };
    
    const typed = new Typed(typedRef.current, options);
    
    return () => {
      typed.destroy();
    };
  }, []);

  const generateRandomStars = (count: number) => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    }));
  };

  const stars = generateRandomStars(30);

  return (
    <section 
      ref={containerRef}
      className="relative py-16 md:py-24 lg:py-32 overflow-hidden"
      style={{
        background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(244, 114, 182, 0.15) 0%, rgba(255, 255, 255, 1) 70%)`
      }}
    >
      {/* Formes géométriques décoratives */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Forme 1 - Cercle gradient */}
        <div className="absolute top-1/4 -left-16 w-64 h-64 rounded-full bg-gradient-to-br from-pink-200 to-red-100 opacity-20 blur-3xl"></div>
        
        {/* Forme 2 - Cercle gradient */}
        <div className="absolute bottom-1/4 -right-16 w-96 h-96 rounded-full bg-gradient-to-tl from-pink-200 to-red-100 opacity-20 blur-3xl"></div>
        
        {/* Forme 3 - Rectangle gradient */}
        <div className="absolute top-0 right-1/4 w-32 h-64 rounded-3xl bg-gradient-to-b from-pink-100 to-transparent opacity-20 blur-xl transform rotate-12"></div>
        
        {/* Forme 4 - Rectangle gradient */}
        <div className="absolute bottom-0 left-1/3 w-48 h-32 rounded-3xl bg-gradient-to-r from-red-100 to-transparent opacity-20 blur-xl transform -rotate-6"></div>

        {/* Étoiles scintillantes */}
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute bg-white rounded-full animate-twinkle"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: 0.6,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          ></div>
        ))}
        
        {/* Cœurs flottants */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: Math.random() * 100, opacity: 0.3 }}
            animate={{ 
              y: Math.random() * -100,
              opacity: [0.3, 0.7, 0.3], 
            }}
            transition={{ 
              repeat: Infinity, 
              duration: Math.random() * 10 + 15, 
              ease: "easeInOut",
              repeatType: "reverse",
              delay: Math.random() * 5,
            }}
            className="absolute text-pink-400"
            style={{
              left: `${10 + Math.random() * 80}%`,
              bottom: `${Math.random() * 40}%`,
              transform: `rotate(${Math.random() * 45}deg) scale(${0.5 + Math.random() * 1})`,
              opacity: 0.1 + Math.random() * 0.2,
            }}
          >
            <Heart fill="currentColor" size={24 + Math.random() * 16} />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
            }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-pink-100 to-red-100 text-pink-800 text-sm font-medium mb-6">
              <Sparkles size={16} className="mr-2 text-pink-500" />
              <span>L'expert de vos relations amoureuses</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-gray-900">Transformez votre vie</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-red-600">
                amoureuse avec l'IA
              </span>
            </h1>
            
            <div className="mb-10 h-14 md:h-12 flex items-center justify-center">
              <span ref={typedRef} className="text-xl md:text-2xl text-gray-700"></span>
            </div>
            
            <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
              Un coach virtuel intelligent qui vous guide pas à pas pour développer votre confiance, améliorer votre communication et créer des relations épanouissantes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white shadow-md hover:shadow-lg transition-all duration-300 rounded-lg px-8 py-6 text-lg">
                <Link href="#pricing" className="flex items-center gap-2">
                  <span>Voir les tarifs</span>
                  <ArrowRight size={16} />
                </Link>
              </Button>
              
              <Button variant="outline" className="border-pink-200 hover:border-pink-300 text-gray-700 hover:text-pink-700 rounded-lg px-8 py-6 text-lg">
                <Link href="#features" className="flex items-center gap-2">
                  <span>Découvrir les fonctionnalités</span>
                </Link>
              </Button>
            </div>
          </motion.div>
          
          {/* Section des messages scintillants */}
          <motion.div
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { 
                  staggerChildren: 0.2,
                  delayChildren: 0.3,
                }
              }
            }}
            className="relative max-w-3xl mx-auto"
          >
            {/* Boîtes de messages */}
            <div className="relative z-10 flex flex-col gap-4">
              {/* Message de droite */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: 40 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                }}
                className="self-end max-w-xs md:max-w-sm"
              >
                <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white p-4 rounded-t-xl rounded-bl-xl shadow-md">
                  <p className="text-sm md:text-base">J'ai du mal à exprimer mes sentiments à quelqu'un qui me plaît. Comment faire ?</p>
                </div>
                <div className="mt-1 text-right text-xs text-gray-500">20:05</div>
              </motion.div>
              
              {/* Message de gauche */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -40 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                }}
                className="self-start max-w-xs md:max-w-sm"
              >
                <div className="bg-white border border-pink-100 p-4 rounded-t-xl rounded-br-xl shadow-md">
                  <p className="text-sm md:text-base text-gray-700">Je comprends, c'est une situation courante ! Commencez par de petits gestes d'attention pour montrer votre intérêt. Puis, choisissez un moment détendu pour partager vos sentiments sincèrement, sans pression.</p>
                </div>
                <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                  <span>20:07</span>
                  <span>•</span>
                  <span className="flex items-center">
                    <Heart size={10} className="text-pink-500 mr-1" fill="currentColor" />
                    Coach Emma
                  </span>
                </div>
              </motion.div>
            </div>
            
            {/* Effet de lumière derrière les messages */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-md max-h-60 bg-gradient-to-r from-pink-300/30 to-red-300/30 rounded-full blur-3xl"></div>
          </motion.div>
        </div>
      </div>

      {/* Ajouter un effet de vague en bas */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-12 md:h-16 text-white">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C57.65,23,124.24,36.89,188.49,48.38,248.15,59.15,287.2,46.83,321.39,56.44Z" fill="currentColor"></path>
        </svg>
      </div>

      {/* Ajouter des styles CSS pour l'animation des étoiles */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
        .animate-twinkle {
          animation: twinkle ease-in-out infinite;
        }
      `}</style>
    </section>
  );
} 