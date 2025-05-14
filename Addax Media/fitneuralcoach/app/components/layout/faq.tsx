'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Qu'est-ce que NeuraLearns ?",
    answer: "NeuraLearns est une plateforme de coaching fitness et nutrition propulsée par l'intelligence artificielle. Notre coach IA personnel vous aide à atteindre vos objectifs en créant des programmes d'entraînement et des plans nutritionnels personnalisés adaptés à vos besoins spécifiques."
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
    answer: "Vous pouvez modifier votre abonnement à tout moment dans la section Profil de votre tableau de bord. La résiliation est possible sans frais et prendra effet à la fin de votre période de facturation en cours. Vous conserverez l'accès à toutes les fonctionnalités jusqu'à cette date."
  },
  {
    question: "Comment sont créés les plans nutritionnels ?",
    answer: "Nos plans nutritionnels sont générés par notre IA en fonction de vos objectifs (perte de poids, prise de masse, maintenance), vos préférences alimentaires, vos allergies et restrictions diététiques. Chaque plan comprend des repas équilibrés avec les macronutriments adaptés à vos besoins caloriques."
  },
  {
    question: "Peut-on utiliser NeuraLearns sans abonnement ?",
    answer: "Oui, avec notre option 'À la carte', vous pouvez acheter des tokens et les utiliser quand bon vous semble, sans engagement mensuel. C'est idéal si vous souhaitez essayer notre service ou si vos besoins sont occasionnels."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-neutral-darkest relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-5"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
      
      {/* Éléments décoratifs */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
      
      <div className="container relative z-10 px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16 space-y-4">
          <div className="inline-block px-4 sm:px-6 py-2 border border-primary/30 rounded-full backdrop-blur-sm glass-card text-primary text-sm font-medium mb-4 animate-fade-in">
            <span className="mr-2 inline-block w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Questions fréquentes
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient-primary drop-shadow-lg">
            Besoin d'aide?
          </h2>
          <p className="text-base sm:text-lg text-neutral-light max-w-2xl mx-auto">
            Nous avons rassemblé les questions les plus fréquentes sur notre plateforme de coaching IA
          </p>
          
          {/* Ligne décorative */}
          <div className="w-16 sm:w-24 h-1 bg-gradient-primary mx-auto mt-4 rounded-full"></div>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="rounded-xl border-gradient hover-lift"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="flex items-center justify-between w-full p-5 sm:p-6 text-left focus:outline-none focus:ring-0"
              >
                <h3 className="text-base sm:text-lg font-medium text-white pr-8">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 ml-2"
                >
                  <ChevronDown className="h-5 w-5 text-primary" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden px-5 sm:px-6 pb-5 sm:pb-6"
                  >
                    <div className="pt-2 border-t border-primary/20">
                      <p className="text-neutral-light text-sm sm:text-base">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        
        <div className="mt-12 sm:mt-16 text-center">
          <p className="text-base text-neutral-light">
            Vous avez d'autres questions? <a href="/contact" className="text-primary hover:text-primary-light underline transition-colors">Contactez-nous</a>
          </p>
        </div>
      </div>
    </section>
  );
} 