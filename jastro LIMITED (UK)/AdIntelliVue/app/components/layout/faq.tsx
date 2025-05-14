'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronDown, Leaf, Flower, TreePine, HelpCircle } from 'lucide-react';

const faqData = [
  {
    question: "Comment fonctionne votre plateforme d'analyse Facebook Ads ?",
    answer: "Notre plateforme utilise l'IA pour analyser en profondeur vos campagnes Facebook Ads. Elle analyse automatiquement vos créatifs, identifie les meilleures audiences, prédit les performances et optimise votre ROAS. Tout est automatisé et basé sur des données réelles de votre compte."
  },
  {
    question: "Quelles métriques Facebook Ads analysez-vous ?",
    answer: "Nous analysons toutes les métriques essentielles de Facebook Ads : impressions, clics, CTR, CPC, CPM, fréquence, reach, conversions, ROAS. Notre analyse IA se concentre particulièrement sur l'analyse des créatifs (images, vidéos, carrousels), l'analyse des audiences et leur comportement, ainsi que les prédictions de performance."
  },
  {
    question: "Comment l'IA analyse-t-elle mes créatifs Facebook ?",
    answer: "Notre IA analyse en profondeur vos créatifs publicitaires en identifiant les éléments visuels performants, les tendances de design, et les combinaisons de couleurs qui génèrent le meilleur engagement. Elle compare également les performances entre différents formats (images, vidéos, carrousels) pour optimiser vos futures créations."
  },
  {
    question: "Comment fonctionne l'analyse prédictive ?",
    answer: "Notre analyse prédictive utilise des modèles IA avancés pour prédire les performances futures de vos campagnes. Elle prend en compte vos données historiques, les tendances saisonnières, et les changements d'algorithme de Facebook pour générer des projections précises et des recommandations d'optimisation."
  },
  {
    question: "Comment optimisez-vous mon ROAS ?",
    answer: "Nous analysons le retour sur investissement de vos campagnes Facebook Ads. Notre IA identifie les meilleures audiences, optimise les budgets, et suggère des ajustements pour maximiser votre ROAS. Nous prenons en compte tous les coûts et revenus pour une analyse précise."
  },
  {
    question: "Les recommandations sont-elles personnalisées à mon compte ?",
    answer: "Oui, toutes nos recommandations sont générées spécifiquement pour votre compte Facebook Ads. Notre IA analyse vos données historiques, vos objectifs, votre secteur d'activité et vos contraintes pour fournir des recommandations sur mesure et actionnables."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const toggleFAQ = useCallback((index: number) => {
    setActiveIndex(prev => prev === index ? null : index);
  }, []);

  return (
    <section id="faq" ref={ref} className="adf-section py-20 md:py-32 relative overflow-hidden bg-[#F8F4E9]">
      {/* Effet de fond */}
      <div className="absolute inset-0 adf-pattern-bg opacity-10"></div>
      
      {/* Séparateurs */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#5F7138] to-transparent opacity-30"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#5F7138] to-transparent opacity-30"></div>
      
      {/* Éléments décoratifs */}
      <div className="absolute top-20 right-10 opacity-20">
        <TreePine className="h-24 w-24 text-[#5F7138]" />
      </div>
      <div className="absolute bottom-20 left-10 opacity-20">
        <Leaf className="h-16 w-16 text-[#C17A56] -rotate-12" />
      </div>
      
      {/* Éléments flottants */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute top-20 right-[15%] w-16 h-16 rounded-full bg-[#F0EBE1] border border-[#E8DFC7] shadow-lg opacity-60"
        />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
          className="absolute bottom-40 left-[10%] w-12 h-12 rounded-full bg-[#F7EFDE] border border-[#E8DFC7] shadow-lg opacity-60"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 md:mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 border border-[#C17A56]/30 rounded-full bg-[#F7EFDE] shadow-sm"
          >
            <span className="text-[#A35E3D] text-sm font-medium flex items-center">
              <HelpCircle className="h-4 w-4 mr-2 text-[#C17A56]" />
              Questions fréquentes
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold text-[#4F4639] leading-tight max-w-3xl mx-auto"
          >
            Tout ce que vous devez savoir sur notre <span className="text-[#5F7138]">analyse IA</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base md:text-xl text-[#7F7259] max-w-2xl mx-auto"
          >
            Des réponses claires à vos questions les plus courantes sur notre plateforme d'analyse publicitaire
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto bg-white rounded-2xl border border-[#E8DFC7] overflow-hidden shadow-md"
        >
          <div className="divide-y divide-[#E8DFC7]">
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex items-center justify-between w-full text-left py-5 px-8 group hover:bg-[#F7EFDE]/50 transition-colors duration-300"
                  aria-expanded={activeIndex === index}
                  aria-controls={`faq-content-${index}`}
                >
                  <h3 className="text-lg font-medium text-[#4F4639] pr-4 group-hover:text-[#5F7138] transition-colors">
                    {faq.question}
                  </h3>
                  <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    activeIndex === index ? 'bg-[#5F7138] text-white rotate-180' : 'bg-[#F0EBE1] text-[#5F7138]'
                  }`}>
                    <ChevronDown className="h-5 w-5" />
                  </div>
                </button>
                
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      id={`faq-content-${index}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-6">
                        <div className="bg-[#F7EFDE] rounded-xl p-6 border-l-4 border-[#C17A56] text-[#7F7259] leading-relaxed">
                          {faq.answer}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-[#7F7259] mb-4">
            Vous avez d'autres questions ?
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center bg-white text-[#5F7138] rounded-full px-6 py-3 text-sm border border-[#E8DFC7] shadow-md hover:shadow-lg hover:border-[#5F7138]/40 transition-all duration-300"
          >
            <Flower className="h-4 w-4 mr-2 text-[#C17A56]" />
            Contactez notre équipe d'experts
          </a>
        </motion.div>
      </div>
    </section>
  );
} 