'use client';

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircleIcon, HelpCircleIcon } from "lucide-react";
import { useInView } from "react-intersection-observer";

const faqs = [
  {
    question: "Comment fonctionne SeducIA ?",
    answer: "SeducIA est un coach virtuel de séduction propulsé par l'intelligence artificielle. Vous pouvez discuter avec le coach, lui poser des questions sur la séduction, les relations ou toute situation sociale, et recevoir des conseils personnalisés adaptés à votre situation."
  },
  {
    question: "Puis-je choisir entre un coach masculin ou féminin ?",
    answer: "Absolument ! SeducIA vous permet de choisir la perspective que vous préférez. Optez pour un coach masculin ou féminin selon vos besoins, et changez à tout moment pour obtenir différents points de vue sur votre situation."
  },
  {
    question: "Les conversations sont-elles confidentielles ?",
    answer: "Oui, votre vie privée est notre priorité. Toutes vos conversations sont strictement confidentielles et sécurisées. Nous n'utilisons vos données que pour améliorer votre expérience personnelle avec le coach et ne les partageons jamais avec des tiers."
  },
  {
    question: "Comment annuler mon abonnement ?",
    answer: "Vous pouvez facilement annuler votre abonnement depuis votre tableau de bord dans la section 'Abonnement'. L'annulation prendra effet à la fin de votre période de facturation actuelle. Vous conserverez l'accès au service jusqu'à cette date."
  },
  {
    question: "Les conseils sont-ils réellement personnalisés ?",
    answer: "Oui, SeducIA utilise l'intelligence artificielle avancée pour analyser votre situation spécifique et vous fournir des conseils personnalisés. Plus vous interagissez avec le coach, plus les conseils deviennent adaptés à votre personnalité et à vos besoins."
  }
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
    <section id="faq" ref={ref} className="py-20 md:py-32 relative overflow-hidden bg-gradient-to-b from-pink-50 to-white">
      {/* Effet de fond */}
      <div className="absolute inset-0 bg-[url('/dots-pattern.svg')] bg-repeat opacity-10"></div>
      
      {/* Séparateurs */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fuchsia-300 to-transparent opacity-50"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fuchsia-300 to-transparent opacity-50"></div>
      
      {/* Éléments décoratifs */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-fuchsia-400/5 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-pink-400/5 blur-[100px] pointer-events-none"></div>
      
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
          className="absolute top-20 right-[15%] w-16 h-16 rounded-full bg-gradient-to-r from-fuchsia-100 to-pink-200 border border-fuchsia-200 shadow-lg opacity-60"
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
          className="absolute bottom-40 left-[10%] w-12 h-12 rounded-full bg-gradient-to-r from-pink-100 to-fuchsia-200 border border-pink-200 shadow-lg opacity-60"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 md:mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 border border-fuchsia-300 rounded-full bg-fuchsia-50 shadow-sm"
          >
            <span className="text-fuchsia-800 text-sm font-medium">
              <span className="mr-2 inline-block w-2 h-2 rounded-full bg-fuchsia-500 animate-pulse"></span>
              Questions fréquentes
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight max-w-3xl mx-auto"
          >
            Tout ce que vous devez <span className="text-fuchsia-600">savoir</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base md:text-xl text-gray-700 max-w-2xl mx-auto"
          >
            Des réponses claires à vos questions les plus courantes sur notre service de coaching virtuel en séduction
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto bg-white rounded-3xl border border-fuchsia-100 overflow-hidden shadow-xl"
        >
          <div className="divide-y divide-fuchsia-100">
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
                  className="flex items-center justify-between w-full text-left py-5 px-8 group hover:bg-fuchsia-50/50 transition-colors duration-300"
                  aria-expanded={activeIndex === index}
                >
                  <h3 className="text-lg font-medium text-gray-900 pr-4 group-hover:text-fuchsia-700 transition-colors">
                    {faq.question}
                  </h3>
                  <div className={`flex-shrink-0 h-8 w-8 rounded-full bg-fuchsia-100 flex items-center justify-center text-fuchsia-600 transition-all duration-300 ${
                    activeIndex === index ? 'bg-fuchsia-200 rotate-180' : ''
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
                        <div className="bg-gradient-to-r from-fuchsia-50 to-pink-50 rounded-xl p-6 border-l-4 border-fuchsia-400 text-gray-700 leading-relaxed">
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
        
        {/* Bannière de questions supplémentaires */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-700 mb-4">
            Vous ne trouvez pas la réponse à votre question ?
          </p>
          <a 
            href="mailto:support@seducia.com"
            className="inline-flex items-center bg-white text-fuchsia-700 rounded-full px-6 py-3 text-sm border border-fuchsia-200 shadow-md hover:shadow-lg hover:border-fuchsia-300 transition-all duration-300"
          >
            <MessageCircleIcon className="h-4 w-4 mr-2 text-fuchsia-500" />
            Contactez-nous à <span className="text-fuchsia-700 font-medium ml-1">support@seducia.com</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
} 