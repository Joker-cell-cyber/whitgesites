'use client';

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";

const faqs = [
  {
    question: "Quels types de contenu peut-on générer avec ContentForge AI?",
    answer:
      "ContentForge AI vous permet de générer une variété de contenus textuels tels que des articles, descriptions de produits, posts pour réseaux sociaux et bien plus encore. Notre technologie IA s'adapte à vos besoins spécifiques pour créer du contenu pertinent et engageant.",
  },
  {
    question: "Comment fonctionne le système de tokens de ContentForge AI?",
    answer:
      "Notre système de tokens est simple et transparent. Chaque génération de contenu consomme un certain nombre de tokens selon sa complexité et sa longueur. Vous pouvez acheter des packs de tokens selon vos besoins ou souscrire à un abonnement pour un usage régulier.",
  },
  {
    question: "ContentForge AI offre-t-il des formats de contenu personnalisés?",
    answer:
      "Absolument ! ContentForge AI peut s'adapter à vos besoins spécifiques en termes de ton, style et format. Que vous ayez besoin d'un contenu formel pour votre entreprise ou d'un ton plus décontracté pour les réseaux sociaux, notre plateforme vous accompagne.",
  },
  {
    question: "Puis-je modifier le contenu généré par ContentForge AI?",
    answer:
      "Oui, tout le contenu généré par notre plateforme vous appartient et peut être modifié selon vos besoins. Vous pouvez ajuster, reformuler ou enrichir le contenu pour qu'il corresponde parfaitement à vos attentes.",
  },
  {
    question: "ContentForge AI propose-t-il des services pour les entreprises?",
    answer:
      "Oui, nous proposons des solutions adaptées aux besoins des entreprises, avec des tarifs personnalisés et des fonctionnalités avancées. Contactez notre équipe commerciale pour découvrir comment ContentForge AI peut soutenir votre stratégie de contenu.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const faqRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Fonction pour basculer l'état
  const toggleFAQ = (index: number) => {
    setActiveIndex(prevIndex => prevIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 sm:py-24 bg-gradient-to-b from-ocrf-anthracite-900 to-ocrf-brown-950 relative overflow-hidden">
      {/* Effet de fond */}
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.02) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.02) 2%, transparent 0%)`,
        backgroundSize: '100px 100px'
      }}></div>
      
      {/* Ligne dorée en haut */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ocrf-gold-500/40 to-transparent"></div>
      
      {/* Ligne dorée en bas */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ocrf-gold-500/40 to-transparent"></div>
      
      {/* Éléments décoratifs */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-ocrf-gold-900/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-ocrf-copper-900/10 rounded-full blur-3xl"></div>
      
      {/* Particules décoratives */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, index) => {
          const size = Math.random() * 6 + 2;
          const duration = Math.random() * 15 + 10;
          const delay = Math.random() * 5;
          const top = Math.random() * 100;
          const left = Math.random() * 100;
          const rotation = Math.random() * 360;
          
          return (
            <div 
              key={index}
              className="absolute"
              style={{
                top: `${top}%`,
                left: `${left}%`,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
                animation: `float ${duration}s ease-in-out infinite alternate`
              }}
            >
              <div 
                className="w-full h-full bg-ocrf-gold-300" 
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                  transform: `rotate(${rotation}deg)`,
                  opacity: 0.2
                }}
              />
            </div>
          );
        })}
      </div>
      
      <div className="container relative z-10 px-6">
        <motion.div 
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block">
            <div className="inline-flex items-center px-4 py-2 border border-ocrf-gold-500/30 rounded-full backdrop-blur-sm bg-ocrf-anthracite-800/30 text-ocrf-gold-300 text-sm font-serif mb-4">
              <Sparkles className="w-4 h-4 mr-2 text-ocrf-gold-400" />
              Questions fréquentes
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white">
            Vos interrogations, <span className="text-transparent bg-clip-text bg-gradient-to-r from-ocrf-gold-400 to-ocrf-copper-500">nos réponses</span>
          </h2>
          
          <p className="text-ocrf-brown-300 max-w-2xl mx-auto">
            Découvrez les informations essentielles sur notre plateforme, le processus d'acquisition de tokens et les services que nous proposons pour la génération de contenu IA.
          </p>
          
          {/* Élément décoratif */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-ocrf-gold-500/60"></div>
            <div className="w-2 h-2 rounded-full bg-ocrf-gold-500"></div>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-ocrf-gold-500/60"></div>
          </div>
        </motion.div>
        
        <div className="max-w-3xl mx-auto space-y-5">
          {faqs.map((faq, index) => (
            <motion.div 
              ref={(el) => { faqRefs.current[index] = el }}
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onHoverStart={() => setHoverIndex(index)}
              onHoverEnd={() => setHoverIndex(null)}
              className={`relative rounded-xl border overflow-hidden transition-all duration-300 ${
                activeIndex === index 
                  ? 'border-ocrf-gold-500/40 bg-gradient-to-br from-ocrf-anthracite-800/90 to-ocrf-brown-900/90' 
                  : hoverIndex === index 
                    ? 'border-ocrf-gold-500/20 bg-ocrf-anthracite-800/40' 
                    : 'border-ocrf-gold-500/10 bg-ocrf-anthracite-800/20'
              }`}
            >
              {/* Effet lumineux sur les bords */}
              <div className={`absolute inset-0 opacity-0 transition-opacity duration-500 ${
                (activeIndex === index || hoverIndex === index) ? 'opacity-100' : ''
              }`}>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-ocrf-gold-500/5 via-ocrf-copper-500/10 to-ocrf-gold-500/5"></div>
              </div>
              
              <button
                onClick={() => toggleFAQ(index)}
                className="flex items-center justify-between w-full text-left p-5 relative z-10"
                aria-expanded={activeIndex === index}
              >
                <h3 className={`text-lg font-serif pr-8 ${
                  activeIndex === index || hoverIndex === index
                    ? 'text-ocrf-gold-300'
                    : 'text-white'
                }`}>
                  {faq.question}
                </h3>
                
                <div className={`absolute right-5 top-1/2 -translate-y-1/2 transition-transform duration-300 ${
                  activeIndex === index ? 'rotate-180' : ''
                }`}>
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    activeIndex === index
                      ? 'bg-ocrf-gold-500/20 text-ocrf-gold-400' 
                      : hoverIndex === index
                        ? 'bg-ocrf-anthracite-700 text-ocrf-gold-300'
                        : 'bg-ocrf-anthracite-700 text-ocrf-brown-300'
                  }`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </div>
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 pt-0 text-ocrf-brown-200 leading-relaxed border-t border-ocrf-gold-500/10">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        
        {/* Section d'aide supplémentaire */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <p className="text-ocrf-brown-200 mb-4">Vous n'avez pas trouvé la réponse à votre question ?</p>
          <div className="inline-block">
            <a 
              href="/contact" 
              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-ocrf-gold-600 to-ocrf-copper-500 hover:from-ocrf-gold-500 hover:to-ocrf-copper-400 text-ocrf-anthracite-900 font-medium transition-colors"
            >
              Contactez-nous
            </a>
          </div>
        </motion.div>
      </div>
      
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
          100% { transform: translateY(5px) rotate(-5deg); }
        }
      `}</style>
    </section>
  );
} 