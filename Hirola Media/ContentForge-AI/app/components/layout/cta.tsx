'use client';

import Link from "next/link";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Sparkles, ArrowRight } from "lucide-react";

export default function CTA() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section ref={ref} className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-b from-ocrf-brown-950 to-ocrf-anthracite-950">
      {/* Effet de fond */}
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.02) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.02) 2%, transparent 0%)`,
        backgroundSize: '100px 100px'
      }}></div>
      
      {/* Ligne dorée en haut */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ocrf-gold-500/40 to-transparent"></div>
      
      {/* Éléments décoratifs */}
      <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-ocrf-gold-900/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-ocrf-copper-900/10 rounded-full blur-3xl"></div>
      
      {/* Particules décoratives */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, index) => {
          const size = Math.random() * 6 + 2;
          const duration = Math.random() * 15 + 10;
          const delay = Math.random() * 5;
          const top = Math.random() * 100;
          const left = Math.random() * 100;
          const rotation = Math.random() * 360;
          
          return (
            <div 
              key={index}
              className="absolute"
              style={{
                top: `${top}%`,
                left: `${left}%`,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
                animation: `float ${duration}s ease-in-out infinite alternate`
              }}
            >
              <div 
                className="w-full h-full bg-ocrf-gold-300" 
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                  transform: `rotate(${rotation}deg)`,
                  opacity: 0.2
                }}
              />
            </div>
          );
        })}
      </div>

      <div className="container px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            {/* Texte et boutons */}
            <motion.div 
              className="flex-1 text-center lg:text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center px-4 py-2 border border-ocrf-gold-500/30 rounded-full backdrop-blur-sm bg-ocrf-anthracite-800/30 text-ocrf-gold-300 text-sm font-serif mb-6">
                <Sparkles className="w-4 h-4 mr-2 text-ocrf-gold-400" />
                Libérez votre vision artistique
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-6">
                Rejoignez notre <span className="text-transparent bg-clip-text bg-gradient-to-r from-ocrf-gold-400 to-ocrf-copper-500">communauté</span> d'artistes et collectionneurs
              </h2>
              
              <p className="text-ocrf-brown-200 mb-8 text-lg">
                Exposez vos œuvres, connectez-vous avec des amateurs d'art du monde entier et faites partie d'un mouvement artistique unique qui célèbre l'imaginaire et le rêve.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link 
                  href="/register" 
                  className="inline-flex items-center px-6 py-3.5 rounded-full bg-gradient-to-r from-ocrf-gold-600 to-ocrf-copper-500 hover:from-ocrf-gold-500 hover:to-ocrf-copper-400 text-ocrf-anthracite-900 font-medium transition-colors group"
                >
                  Commencer l'aventure
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                
                <Link 
                  href="/gallery" 
                  className="inline-flex items-center px-6 py-3.5 rounded-full border border-ocrf-gold-500/30 hover:border-ocrf-gold-500/60 text-ocrf-gold-300 hover:text-ocrf-gold-200 font-medium transition-colors"
                >
                  Explorer la galerie
                </Link>
              </div>
            </motion.div>
            
            {/* Image décorative */}
            <motion.div 
              className="flex-1 hidden lg:block"
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="relative h-80 w-full max-w-md mx-auto">
                {/* Frame doré */}
                <div className="absolute inset-4 border-2 border-ocrf-gold-500/30 rounded-lg"></div>
                
                {/* Cadre artistique */}
                <div className="absolute inset-0 rounded-lg overflow-hidden border border-ocrf-gold-500/50 bg-gradient-to-br from-ocrf-anthracite-800/70 to-ocrf-brown-900/70 backdrop-blur-sm p-8 flex items-center justify-center">
                  {/* Effet de vignette */}
                  <div className="absolute inset-0 bg-radial-gradient pointer-events-none"></div>
                  
                  {/* Symbole central */}
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-ocrf-gold-500/20 to-ocrf-copper-500/20 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-ocrf-gold-500/40 to-ocrf-copper-500/40 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-ocrf-gold-400/60 to-ocrf-copper-400/60 flex items-center justify-center">
                          <Sparkles className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Orbites décoratives */}
                    <div className="absolute inset-0 -m-10 border border-ocrf-gold-500/20 rounded-full animate-spin-slow"></div>
                    <div className="absolute inset-0 -m-16 border border-ocrf-copper-500/20 rounded-full animate-spin-slow-reverse"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
          100% { transform: translateY(5px) rotate(-5deg); }
        }
        
        .bg-radial-gradient {
          background: radial-gradient(circle, transparent 30%, rgba(0, 0, 0, 0.7) 100%);
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-slow-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 30s linear infinite;
        }
      `}</style>
    </section>
  );
} 