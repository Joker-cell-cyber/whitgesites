'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

type FAQItem = {
  question: string;
  answer: React.ReactNode;
};

const faqs: FAQItem[] = [
  {
    question: "Comment fonctionne CharmAI ?",
    answer: (
      <>
        CharmAI est un coach virtuel de séduction qui utilise l'intelligence artificielle pour vous aider à améliorer votre vie amoureuse. Posez simplement vos questions, et notre IA vous répondra avec des conseils personnalisés et des stratégies efficaces pour vos relations.
      </>
    ),
  },
  {
    question: "Puis-je choisir entre un coach masculin et féminin ?",
    answer: (
      <>
        Oui ! C'est l'une des fonctionnalités uniques de CharmAI. Vous pouvez choisir la perspective qui vous convient le mieux : masculine ou féminine. Vous pouvez également changer de coach à tout moment.
      </>
    ),
  },
  {
    question: "Les conseils sont-ils vraiment personnalisés ?",
    answer: (
      <>
        Absolument. CharmAI utilise une intelligence artificielle avancée qui analyse votre situation spécifique. Plus vous interagissez avec votre coach, plus les conseils deviennent précis et personnalisés.
      </>
    ),
  },
  {
    question: "Comment CharmAI protège-t-il ma vie privée ?",
    answer: (
      <>
        Nous prenons votre confidentialité très au sérieux. Toutes vos conversations sont cryptées et sécurisées. Nous ne partageons jamais vos données personnelles avec des tiers, et vous pouvez supprimer définitivement votre historique à tout moment.
      </>
    ),
  },
  {
    question: "Y a-t-il un nombre limité de questions ?",
    answer: (
      <>
        Cela dépend de votre abonnement. Le plan gratuit vous donne un nombre limité de questions par jour, tandis que les plans premium offrent un accès illimité à votre coach AI. Consultez notre page de tarification pour plus de détails.
      </>
    ),
  },
  {
    question: "Comment puis-je contacter le support ?",
    answer: (
      <>
        Pour toute question ou problème, vous pouvez nous contacter à support@charmai.com. Notre équipe est disponible 7j/7 pour vous aider.
      </>
    ),
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-32 relative overflow-hidden">
      {/* Arrière-plan et décorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-950 via-rose-950 to-purple-950"></div>
      <div className="absolute inset-0 bg-[url('/love-pattern.svg')] bg-repeat opacity-5"></div>
      <div className="absolute -top-64 right-0 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-64 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl"></div>
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 text-sm font-medium mb-4"
          >
            <HelpCircle className="h-3.5 w-3.5" />
            FAQ
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-rose-100 to-white"
          >
            Questions fréquentes
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            Vous avez des questions ? Nous avons les réponses pour vous aider à découvrir comment CharmAI peut transformer votre vie amoureuse.
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="space-y-4">
          {faqs.map((faq, index) => (
              <div 
              key={index}
                className="bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-md rounded-2xl border border-gray-800/50 overflow-hidden"
              >
              <button
                onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center p-6 text-left"
                >
                  <span className="text-lg font-medium text-white">{faq.question}</span>
                  <ChevronDown 
                    className={`h-5 w-5 text-pink-400 transition-transform duration-300 ${openIndex === index ? 'transform rotate-180' : ''}`} 
                  />
              </button>
              
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-gray-300 border-t border-gray-800/50">
                  {faq.answer}
                      </div>
                    </motion.div>
              )}
                </AnimatePresence>
              </div>
          ))}
        </div>
        </motion.div>
        
        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400">
            Vous ne trouvez pas ce que vous cherchez ? <a href="mailto:support@charmai.com" className="text-rose-400 hover:underline font-medium">Contactez notre support</a>
          </p>
        </motion.div>
      </div>
      
      {/* Effet décoratif en bas */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-purple-950 to-transparent pointer-events-none"></div>
    </section>
  );
} 