'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { TreePine, Sprout, Leaf, Mountain, Wind, Cloud } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const features = [
  {
    icon: <Leaf className="w-6 h-6 text-[#4D7C3E]" />,
    title: 'Analyse des créatifs Facebook',
    description: "Analysez en profondeur les performances de vos différents formats publicitaires (images, carrousels, vidéos) et identifiez les éléments visuels les plus performants."
  },
  {
    icon: <Mountain className="w-6 h-6 text-[#4D7C3E]" />,
    title: 'Analyse des audiences',
    description: 'Identifiez vos meilleures audiences, analysez leur comportement et optimisez vos ciblages pour maximiser vos performances.'
  },
  {
    icon: <Sprout className="w-6 h-6 text-[#4D7C3E]" />,
    title: 'Analyse prédictive',
    description: 'Prédisez les performances futures de vos campagnes, identifiez les tendances et anticipez les opportunités d\'optimisation.'
  },
  {
    icon: <Wind className="w-6 h-6 text-[#4D7C3E]" />,
    title: 'Analyse ROAS',
    description: 'Mesurez précisément le retour sur investissement de vos campagnes Facebook et optimisez vos budgets pour maximiser votre ROAS.'
  },
  {
    icon: <Cloud className="w-6 h-6 text-[#4D7C3E]" />,
    title: 'Recommandations IA',
    description: 'Recevez des recommandations personnalisées basées sur l\'IA pour optimiser vos campagnes et améliorer vos performances.'
  }
];

export default function Features() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <section ref={ref} className="ada-section ada-section-earth py-20 md:py-32 relative overflow-hidden">
      {/* Éléments décoratifs de fond */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#E8F4E4]/40 rounded-bl-[100px] blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#DFE9C8]/50 rounded-tr-[100px] blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full bg-[#E8F4E4] text-[#4D7C3E] text-sm font-medium border border-[#4D7C3E]/20 mb-4 shadow-sm"
          >
            <span className="flex items-center">
              <TreePine className="w-4 h-4 mr-2" />
              Analyse IA pour Facebook Ads
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-[#E8DFC7] mb-8 leading-tight"
          >
            Optimisez vos campagnes avec <span className="text-[#E8DFC7]">l'intelligence artificielle</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[#E8DFC7] text-xl leading-relaxed max-w-3xl mx-auto font-medium"
          >
            Découvrez notre suite d'outils d'analyse IA spécialisée pour optimiser vos campagnes Facebook Ads, de l'analyse des créatifs à l'optimisation du ROAS.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="bg-white/80 backdrop-blur-sm border border-[#4D7C3E]/10 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[#4D7C3E]/30 transition-all duration-300 group"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-[#E8F4E4] p-3 rounded-xl mr-4 group-hover:bg-[#4D7C3E]/10 transition-colors duration-300">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#2F3A25] mb-2">{feature.title}</h3>
                  <p className="text-[#2F3A25]/70">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Section illustration */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 max-w-4xl mx-auto bg-[#F4F8F0] rounded-2xl p-6 md:p-8 border border-[#4D7C3E]/20 shadow-lg overflow-hidden"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-[#2F3A25] mb-4">
                Analyse complète de vos campagnes
              </h3>
              <p className="text-[#2F3A25]/70 mb-6">
                Notre plateforme utilise l'intelligence artificielle pour analyser en profondeur vos campagnes Facebook Ads et vous fournir des insights actionnables.
              </p>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-[#4D7C3E] flex items-center justify-center text-white mr-3">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 6L4.5 9.5L11 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-[#2F3A25]">Analyse des performances par format</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-[#4D7C3E] flex items-center justify-center text-white mr-3">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 6L4.5 9.5L11 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-[#2F3A25]">Identification des meilleures audiences</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-[#4D7C3E] flex items-center justify-center text-white mr-3">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 6L4.5 9.5L11 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-[#2F3A25]">Optimisation des budgets</span>
                </div>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="w-full h-72 rounded-xl overflow-hidden relative shadow-lg">
                <Image 
                  src="/images/learning-ecosystem.jpg" 
                  alt="Écosystème d'apprentissage naturel" 
                  fill 
                  className="object-cover"
                />
              </div>
              
              {/* Éléments décoratifs */}
              <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-[#4D7C3E]/10 rounded-xl rotate-12"></div>
              <div className="absolute -top-3 -left-3 w-12 h-12 bg-[#DFE9C8] rounded-xl -rotate-6"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}