'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Flame, Heart, SparklesIcon, HeartPulse, Zap } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

export default function CTA() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section ref={ref} className="yfc-gradient-bg py-20 md:py-32 relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Éléments circulaires */}
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-gradient-to-r from-[#FFA728]/20 to-[#FF5C3E]/20 blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-gradient-to-r from-[#FF5C3E]/20 to-[#FFA728]/20 blur-2xl"></div>
        
        {/* Éléments flottants */}
        <motion.div 
          initial={{ y: 0 }}
          animate={{ y: [-10, 10, -10] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          className="absolute top-[15%] right-[20%]"
        >
          <Heart className="w-16 h-16 text-[#FF5C3E]/20" />
        </motion.div>
        
        <motion.div 
          initial={{ y: 0 }}
          animate={{ y: [10, -10, 10] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute bottom-[15%] left-[10%]"
        >
          <Flame className="w-20 h-20 text-[#FFA728]/20" />
        </motion.div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-5xl mx-auto text-center"
        >
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#FF5C3E]/20 to-[#FFA728]/20 rounded-full mb-6 backdrop-blur-sm border border-[#FF5C3E]/30"
          >
            <SparklesIcon className="w-4 h-4 mr-2 text-[#FF5C3E]" />
            <span className="text-white text-sm font-medium">Transformez votre vie amoureuse</span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Enflammez votre <span className="text-gradient-warm">vie amoureuse</span> avec SeducIA
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Prêt à transformer votre vie relationnelle ? Notre coach IA personnalisé vous guide pas à pas pour développer confiance, compétences et authenticité dans vos relations.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/#pricing">
              <Button size="xl" className="group bg-gradient-to-r from-[#FF5C3E] to-[#FFA728] hover:from-[#FF5C3E]/90 hover:to-[#FFA728]/90 text-white border-0 shadow-xl hover:shadow-2xl hover:shadow-[#FF5C3E]/20 transition-all duration-300">
                Découvrir nos offres
                <Zap className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <Link href="/about">
              <Button variant="ghost" size="xl" className="text-white hover:bg-white/10 border border-white/20 hover:border-white/40">
                En savoir plus
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
        
        {/* Carte de présentation de l'IA */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 max-w-md mx-auto bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl overflow-hidden"
        >
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FFA728] to-[#FF5C3E] flex items-center justify-center mr-4 shadow-lg">
                <SparklesIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-white font-medium">Coach IA intelligent</h4>
                <p className="text-white/70 text-sm">Disponible 24h/24, 7j/7</p>
              </div>
            </div>
            <div className="flex gap-1 mb-4">
              <div className="px-2 py-1 bg-[#FF5C3E]/20 rounded-full">
                <span className="text-xs text-white">Confidentialité</span>
              </div>
              <div className="px-2 py-1 bg-[#FFA728]/20 rounded-full">
                <span className="text-xs text-white">IA avancée</span>
              </div>
              <div className="px-2 py-1 bg-[#FF8046]/20 rounded-full">
                <span className="text-xs text-white">Personnalisé</span>
              </div>
            </div>
            <p className="text-white/80">
              Notre coach IA utilise des technologies de pointe pour vous offrir des conseils de séduction personnalisés et adaptés à votre situation. Posez n'importe quelle question sur vos interactions amoureuses et obtenez des réponses pertinentes en temps réel.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 