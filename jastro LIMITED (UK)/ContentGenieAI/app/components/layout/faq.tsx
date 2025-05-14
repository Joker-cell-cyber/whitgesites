'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MoonIcon, SparklesIcon } from "lucide-react";
import { useInView } from "react-intersection-observer";

const faqs = [
  {
    question: "Comment fonctionne l'interprétation de rêves ?",
    answer: "Notre service utilise l'intelligence artificielle avancée pour analyser et interpréter vos rêves. Vous décrivez simplement votre rêve en détail, et notre IA vous fournit une interprétation personnalisée basée sur la symbolique onirique et la psychologie des rêves.",
  },
  {
    question: "Les interprétations sont-elles fiables ?",
    answer: "Nos interprétations sont basées sur des recherches en psychologie et symbolisme des rêves. Cependant, l'interprétation des rêves n'est pas une science exacte. Considérez nos analyses comme des perspectives pour mieux comprendre votre subconscient, mais restez critique et utilisez votre propre jugement.",
  },
  {
    question: "Puis-je conserver l'historique de mes rêves ?",
    answer: "Absolument ! Notre plateforme vous permet de sauvegarder tous vos rêves et leurs interprétations dans un journal onirique personnel. Vous pouvez consulter cet historique à tout moment pour suivre l'évolution de vos rêves et identifier des motifs récurrents.",
  },
  {
    question: "Comment me désabonner ?",
    answer: "Si vous avez souscrit à un plan par abonnement, vous pouvez vous désabonner dans votre compte dans la page 'Abonnement', en contactant notre service client, ou directement via le bouton dans la barre de navigation quand vous êtes connecté. Transmettez simplement votre nom, prénom et email de commande pour que le désabonnement soit effectif.",
  },
  {
    question: "Mes données de rêves sont-elles confidentielles ?",
    answer: "Nous prenons la confidentialité très au sérieux. Vos rêves et leurs interprétations sont strictement privés et ne sont jamais partagés avec des tiers. Toutes vos données sont cryptées et sécurisées selon les normes les plus élevées de l'industrie.",
  },
  {
    question: "Puis-je recevoir des conseils sur la façon d'améliorer mon sommeil ?",
    answer: "Oui, notre plateforme propose également des conseils personnalisés pour améliorer la qualité de votre sommeil et favoriser des rêves plus lucides. Ces recommandations sont basées sur vos habitudes de sommeil et le contenu de vos rêves.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const toggleFAQ = (index: number) => {
    setActiveIndex(prevIndex => prevIndex === index ? null : index);
  };

  return (
    <section id="faq" ref={ref} className="py-20 md:py-32 relative overflow-hidden bg-gradient-to-b from-purple-50 to-white">
      {/* Effet de fond */}
      <div className="absolute inset-0 bg-[url('/dots-pattern.svg')] bg-repeat opacity-10"></div>
      
      {/* Séparateurs */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-300 to-transparent opacity-50"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-300 to-transparent opacity-50"></div>
      
      {/* Éléments décoratifs */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-violet-400/5 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-fuchsia-400/5 blur-[100px] pointer-events-none"></div>
      
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
          className="absolute top-20 right-[15%] w-16 h-16 rounded-full bg-gradient-to-r from-violet-100 to-fuchsia-200 border border-violet-200 shadow-lg opacity-60"
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
          className="absolute bottom-40 left-[10%] w-12 h-12 rounded-full bg-gradient-to-r from-fuchsia-100 to-violet-200 border border-fuchsia-200 shadow-lg opacity-60"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 md:mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 border border-violet-300 rounded-full bg-violet-50 shadow-sm"
          >
            <span className="text-violet-800 text-sm font-medium flex items-center">
              <span className="mr-2 inline-block w-2 h-2 rounded-full bg-violet-500 animate-pulse"></span>
              Questions fréquentes
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight max-w-3xl mx-auto"
          >
            Tout savoir sur l'<span className="text-violet-600">interprétation</span> de vos rêves
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base md:text-xl text-gray-700 max-w-2xl mx-auto"
          >
            Des réponses claires à vos questions les plus courantes sur notre service d'interprétation de rêves
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto bg-white rounded-3xl border border-violet-100 overflow-hidden shadow-xl"
        >
          <div className="divide-y divide-violet-100">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex items-center justify-between w-full text-left py-5 px-8 group hover:bg-violet-50/50 transition-colors duration-300"
                  aria-expanded={activeIndex === index}
                >
                  <h3 className="text-lg font-medium text-gray-900 pr-4 group-hover:text-violet-700 transition-colors">
                    {faq.question}
                  </h3>
                  <div className={`flex-shrink-0 h-8 w-8 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 transition-all duration-300 ${
                    activeIndex === index ? 'bg-violet-200 rotate-180' : ''
                  }`}>
                    <ChevronDown className="h-5 w-5" />
                  </div>
                </button>
                
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-6">
                        <div className="bg-gradient-to-r from-violet-50 to-fuchsia-50 rounded-xl p-6 border-l-4 border-violet-400 text-gray-700 leading-relaxed">
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
          <p className="text-gray-700 mb-4">
            Vous avez d'autres questions ?
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center bg-white text-violet-700 rounded-full px-6 py-3 text-sm border border-violet-200 shadow-md hover:shadow-lg hover:border-violet-300 transition-all duration-300"
          >
            <MoonIcon className="h-4 w-4 mr-2 text-violet-500" />
            Contactez notre équipe
          </a>
        </motion.div>
      </div>
    </section>
  );
} 