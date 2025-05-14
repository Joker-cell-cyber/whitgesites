'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, QuestionMarkIcon, FlowerIcon, CircleIcon, StarIcon } from "lucide-react";
import { useInView } from "react-intersection-observer";

const faqs = [
  {
    question: "Qu'est-ce que FitnessBrainAI ?",
    answer: "FitnessBrainAI est une plateforme de coaching fitness et nutrition propulsée par l'intelligence artificielle. Notre coach IA personnel vous aide à atteindre vos objectifs en créant des programmes d'entraînement et des plans nutritionnels personnalisés adaptés à vos besoins spécifiques."
  },
  {
    question: "Comment fonctionne le système de tokens ?",
    answer: "Nos services fonctionnent avec un système de tokens. Chaque interaction avec le coach IA, la génération d'un programme d'entraînement ou d'un plan nutritionnel consomme un certain nombre de tokens. Ces tokens sont inclus dans votre abonnement mensuel ou peuvent être achetés séparément dans le plan à la carte."
  },
  {
    question: "Les programmes sont-ils vraiment personnalisés ?",
    answer: "Oui, absolument ! Notre IA prend en compte vos objectifs, votre niveau d'expérience, vos préférences, vos contraintes d'équipement, et toute limitation physique que vous pourriez avoir. Chaque programme est créé spécifiquement pour vous et peut être ajusté en fonction de vos retours."
  },
  {
    question: "Puis-je modifier mon abonnement ou le résilier ?",
    answer: "La résiliation de votre abonnement est possible sans frais et prendra effet à la fin de votre période de facturation en cours. Vous conserverez l'accès à toutes les fonctionnalités jusqu'à cette date."
  },
  {
    question: "Comment sont créés les plans nutritionnels ?",
    answer: "Nos plans nutritionnels sont générés par notre IA en fonction de vos objectifs (perte de poids, prise de masse, maintenance), vos préférences alimentaires, vos allergies et restrictions diététiques. Chaque plan comprend des repas équilibrés avec les macronutriments adaptés à vos besoins caloriques."
  },
  {
    question: "Peut-on utiliser FitnessBrainAI sans abonnement ?",
    answer: "Oui, avec notre option 'À la carte', vous pouvez acheter des tokens et les utiliser quand bon vous semble, sans engagement mensuel. C'est idéal si vous souhaitez essayer notre service ou si vos besoins sont occasionnels."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" ref={ref} className="nrl-section py-20 md:py-32 relative overflow-hidden bg-white">
      {/* Éléments de décoration */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#FBFAF6] to-transparent"></div>
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#E2D9F3]/30 blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#D3E9DD]/30 blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-[#F5F2FC] text-[#A590DC] text-sm font-medium border border-[#E2D9F3] mb-4"
          >
            Questions fréquentes
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-[#2A303D] mb-6"
          >
            Besoin <span className="text-[#A590DC]">d'aide</span>?
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-[#2A303D]/70 text-lg"
          >
            Nous avons rassemblé les questions les plus fréquentes sur notre plateforme de coaching IA
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto bg-white rounded-2xl border border-[#E2D9F3]/50 overflow-hidden shadow-md"
        >
          <div className="divide-y divide-[#E2D9F3]/30">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex items-center justify-between w-full text-left py-5 px-8 group hover:bg-[#F5F2FC]/20 transition-colors duration-300"
                  aria-expanded={activeIndex === index}
                >
                  <h3 className="text-lg font-medium text-[#2A303D] pr-4 group-hover:text-[#A590DC] transition-colors">
                    {faq.question}
                  </h3>
                  <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    activeIndex === index ? 'bg-[#A590DC] text-white rotate-180' : 'bg-[#F5F2FC] text-[#A590DC]'
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
                        <div className="bg-[#F8F7FC] rounded-xl p-6 text-[#2A303D]/80 leading-relaxed">
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
          <p className="text-[#2A303D]/70 mb-4">
            Vous avez d'autres questions?
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center bg-white text-[#A590DC] rounded-full px-6 py-3 text-sm border border-[#E2D9F3] shadow-sm hover:shadow-md hover:border-[#A590DC]/40 transition-all duration-300"
          >
            <FlowerIcon className="h-4 w-4 mr-2 text-[#8ECCAA]" />
            Contactez notre équipe
          </a>
        </motion.div>
      </div>
      
      {/* Éléments flottants décoratifs */}
      <div className="absolute -bottom-10 right-10 opacity-10">
        <CircleIcon className="h-32 w-32 text-[#8ECCAA]" />
      </div>
      <div className="absolute top-32 left-10 opacity-10">
        <StarIcon className="h-24 w-24 text-[#A590DC]" />
      </div>
    </section>
  );
} 