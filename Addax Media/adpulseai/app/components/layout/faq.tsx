'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

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
    answer: "Nous analysons en temps réel le retour sur investissement de vos campagnes Facebook Ads. Notre IA identifie les meilleures audiences, optimise les budgets, et suggère des ajustements pour maximiser votre ROAS. Nous prenons en compte tous les coûts et revenus pour une analyse précise."
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
    triggerOnce: true
  });

  const toggleFAQ = useCallback((index: number) => {
    setActiveIndex(prev => prev === index ? null : index);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, delay: 0.6 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.7 + i * 0.1 }
    })
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } }
  };

  const descriptionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.4 } }
  };

  const contactVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.8 } }
  };

  return (
    <section id="faq" ref={ref} className="py-24 relative overflow-hidden bg-gradient-to-b from-orange-50 to-white">
      {/* Effet de fond */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-5"></div>
      
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-30"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent opacity-30"></div>
      
      {/* Éléments décoratifs */}
      <div className="absolute top-1/4 right-1/3 w-64 h-64 rounded-full bg-orange-500/10 filter blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-yellow-500/10 filter blur-3xl pointer-events-none"></div>
      
      {/* Particules décoratives */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 rounded-full bg-orange-400/30 animate-float-slow"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${10 + Math.random() * 20}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
          </div>

      <div className="container relative z-10 px-4 mx-auto">
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={titleVariants}
            className="inline-block px-4 py-2 border border-orange-500/30 rounded-full backdrop-blur-sm bg-white/80"
          >
            <span className="text-orange-700 text-sm font-medium">
              <span className="mr-2 inline-block w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              FAQ
            </span>
          </motion.div>
          
          <motion.h2
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={subtitleVariants}
            className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-500 leading-tight max-w-3xl mx-auto"
          >
            Questions fréquemment posées
          </motion.h2>
          
          <motion.p
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={descriptionVariants}
            className="text-base md:text-xl text-gray-700 max-w-3xl mx-auto"
          >
            Vous avez des questions sur notre plateforme d'analyse publicitaire ? 
            Consultez les réponses à nos questions les plus fréquentes.
          </motion.p>
        </div>
        
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-3xl mx-auto"
        >
          <div className="space-y-6">
          {faqData.map((faq, index) => (
              <motion.div
              key={index}
                custom={index}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={itemVariants}
                className="rounded-2xl overflow-hidden bg-white backdrop-blur-sm border border-orange-200 shadow-sm group hover:shadow-md transition-shadow"
              >
              <button
                onClick={() => toggleFAQ(index)}
                  className="flex items-center justify-between w-full px-6 py-5 text-left transition-colors"
                aria-expanded={activeIndex === index}
                  aria-controls={`faq-content-${index}`}
              >
                  <span className="text-lg md:text-xl font-medium text-gray-800 group-hover:text-orange-600 transition-colors">
                  {faq.question}
                  </span>
                  <div className={`ml-4 flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center border border-orange-300 bg-orange-50 group-hover:bg-orange-100 transition-all ${activeIndex === index ? 'rotate-45' : ''}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4 text-orange-500 transition-transform duration-300 ease-out ${activeIndex === index ? 'rotate-45' : ''}`} 
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
              </button>
              
                <AnimatePresence>
              {activeIndex === index && (
                    <motion.div
                      id={`faq-content-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-0">
                        <div className="h-px w-full bg-gradient-to-r from-orange-300 via-orange-200 to-orange-300 mb-4"></div>
                        <p className="text-gray-600">
                  {faq.answer}
                        </p>
                </div>
                    </motion.div>
              )}
                </AnimatePresence>
              </motion.div>
          ))}
        </div>
        </motion.div>
        
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={contactVariants}
          className="mt-16 text-center"
        >
          <p className="text-gray-700 mb-4">Vous avez d'autres questions ?</p>
          <a
            href="/contact"
            className="inline-flex items-center text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 px-6 py-3 rounded-lg transition-colors shadow-lg shadow-orange-500/20"
          >
            <span>Contactez-nous</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
} 