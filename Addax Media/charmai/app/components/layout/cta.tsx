'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/app/components/ui/button';
import { MessageCircleHeart, Sparkles, ArrowRight, Heart, Shield, Zap, CreditCard } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Fond décoratif */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950"></div>
      <div className="absolute inset-0 bg-[url('/love-pattern.svg')] bg-repeat opacity-5"></div>
      
      {/* Éléments décoratifs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-pink-500/10 rounded-full filter blur-[100px]"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full filter blur-[100px]"></div>
      
      {/* Particules */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-pink-300/30"
          style={{ 
            left: `${Math.random() * 100}%`, 
            top: `${Math.random() * 100}%` 
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
        />
      ))}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-md p-1 rounded-3xl border border-pink-500/20 shadow-2xl shadow-pink-500/5 overflow-hidden">
            <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 rounded-3xl p-10 md:p-16 relative">
              {/* Effet de halo */}
              <div className="absolute -top-32 left-1/2 transform -translate-x-1/2 w-2/3 h-64 bg-gradient-to-r from-pink-500/10 via-purple-500/20 to-blue-500/10 blur-3xl rounded-full"></div>
              
              <div className="relative text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col items-center"
                >
                  <div className="inline-flex items-center gap-1 bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-white text-sm font-medium rounded-full px-4 py-1.5 mb-6 border border-pink-500/20">
                    <Heart className="h-4 w-4 text-pink-400 mr-1" fill="currentColor" />
                    Commencez votre transformation
                  </div>
                  
                  <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-pink-200 to-white max-w-3xl">
                    Prêt à transformer votre vie amoureuse ?
            </h2>
                  
                  <p className="text-xl text-gray-300 mb-10 max-w-2xl">
                    Commencez dès aujourd'hui avec votre coach virtuel personnel et découvrez une nouvelle confiance en séduction.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row justify-center gap-5 mb-14">
                    <Button 
                      asChild
                      size="lg"
                      className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white border-0 h-14 text-lg shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40 transition-all duration-300 hover:translate-y-[-2px]"
                    >
                      <Link href="/#pricing">
                        <CreditCard className="mr-2 h-5 w-5" />
                        Voir les tarifs
                      </Link>
                    </Button>
                    
                    <Button 
                      asChild
                      size="lg"
                      variant="outline"
                      className="border-pink-200 text-white hover:border-pink-300 hover:bg-pink-500/10 h-14 text-lg"
                    >
                      <Link href="/#features">
                        <Sparkles className="mr-2 h-5 w-5" />
                        Découvrir les fonctionnalités
                      </Link>
                    </Button>
                  </div>
                  
                  {/* Points clés */}
                  <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500/20 to-pink-600/20 border border-pink-500/30 mr-3">
                        <Zap className="h-5 w-5 text-pink-400" />
                      </div>
                      <span className="text-white">Réponses instantanées</span>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 mr-3">
                        <Shield className="h-5 w-5 text-purple-400" />
                      </div>
                      <span className="text-white">Confidentialité garantie</span>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 mr-3">
                        <ArrowRight className="h-5 w-5 text-blue-400" />
                      </div>
                      <span className="text-white">Progression continue</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA; 