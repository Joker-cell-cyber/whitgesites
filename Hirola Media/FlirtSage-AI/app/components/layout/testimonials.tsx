'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Heart, ShieldCheck, Sparkles, Zap, Lightbulb, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

const benefits = [
  {
    id: 1,
    title: "Conseils personnalisés",
    description: "Recevez des conseils adaptés à votre situation et à votre personnalité pour des interactions plus authentiques.",
    icon: MessageSquare,
    color: "from-pink-500 to-pink-600",
  },
  {
    id: 2,
    title: "Développez votre confiance",
    description: "Améliorez progressivement votre confiance en vous grâce à des conseils pratiques et bienveillants.",
    icon: Heart,
    color: "from-purple-500 to-purple-600",
  },
  {
    id: 3,
    title: "Confidentialité absolue",
    description: "Toutes vos conversations sont privées et sécurisées. Aucune donnée n'est partagée avec des tiers.",
    icon: ShieldCheck,
    color: "from-blue-500 to-blue-600",
  },
  {
    id: 4,
    title: "Disponible 24/7",
    description: "Votre coach virtuel est toujours prêt à vous aider, à n'importe quelle heure du jour ou de la nuit.",
    icon: Zap,
    color: "from-yellow-500 to-yellow-600",
  },
  {
    id: 5,
    title: "Approche ludique",
    description: "Apprenez à séduire de façon amusante et détendue, sans pression ni jugement.",
    icon: Sparkles,
    color: "from-green-500 to-green-600",
  },
  {
    id: 6,
    title: "Conseils concrets",
    description: "Des suggestions pratiques à mettre en œuvre immédiatement dans vos rencontres et conversations.",
    icon: Lightbulb,
    color: "from-orange-500 to-orange-600",
  },
];

const BenefitsSection = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <section id="benefits" className="py-20 relative overflow-hidden">
      {/* Fond décoratif */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
      <div className="absolute inset-0 bg-[url('/love-pattern.svg')] bg-repeat opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="inline-block px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 text-sm font-medium mb-4"
          >
            Avantages
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
          >
            Pourquoi choisir FlirtSageAI ?
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Découvrez comment notre coach virtuel peut vous aider à transformer votre approche de la séduction
          </motion.p>
        </div>
        
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.id}
              variants={item}
              className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-lg border border-slate-700 hover:border-pink-500/30 transition-all duration-300 relative group"
            >
              {/* Icône */}
              <div className={`absolute -top-3 -left-3 rounded-full bg-gradient-to-r ${benefit.color} p-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <benefit.icon className="h-5 w-5 text-white" />
                  </div>
                  
              <div className="pt-6">
                <h3 className="text-xl font-bold text-white mb-3 mt-2">{benefit.title}</h3>
                <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
              </div>
              
              {/* Effet de brillance au survol */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-pink-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-lg pointer-events-none"></div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Bannière d'objectifs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 bg-gradient-to-r from-slate-900 to-slate-800 p-8 rounded-xl border border-slate-700"
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">Notre mission</h3>
            <p className="text-gray-400 max-w-3xl mx-auto">
              FlirtSageAI vise à rendre la séduction plus accessible et moins intimidante pour tous. Nous croyons que chacun mérite de vivre des relations épanouissantes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <h4 className="text-xl font-semibold text-white">Simplicité</h4>
              <p className="text-gray-400">Des conseils clairs et faciles à appliquer</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-xl font-semibold text-white">Authenticité</h4>
              <p className="text-gray-400">Soyez vous-même, mais avec plus d'assurance</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-xl font-semibold text-white">Progression</h4>
              <p className="text-gray-400">Améliorez-vous à votre rythme, étape par étape</p>
          </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Exemples de fonctionnalités au lieu de témoignages
const features = [
  {
    id: 1,
    title: "Analyse de conversation",
    description: "Notre IA analyse les conversations pour vous fournir des conseils contextuels pertinents.",
    icon: "/icons/chat-analysis.svg",
  },
  {
    id: 2,
    title: "Suggestions en temps réel",
    description: "Recevez des suggestions adaptées pendant vos conversations pour maintenir l'intérêt.",
    icon: "/icons/suggestions.svg",
  },
  {
    id: 3,
    title: "Apprentissage personnalisé",
    description: "Plus vous utilisez FlirtSageAI, plus les conseils deviennent pertinents pour votre situation.",
    icon: "/icons/learning.svg",
  },
  {
    id: 4,
    title: "Exercices pratiques",
    description: "Améliorez vos compétences avec des exercices et des défis adaptés à votre niveau.",
    icon: "/icons/exercises.svg",
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Fonction pour passer à la fonctionnalité suivante
  const nextFeature = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % features.length);
  };

  // Fonction pour revenir à la fonctionnalité précédente
  const prevFeature = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + features.length) % features.length);
  };

  // Rotation automatique des fonctionnalités
  useEffect(() => {
    if (!inView) return;
    
    const interval = setInterval(() => {
      nextFeature();
    }, 8000);
    
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <section id="features-highlight" className="py-24 bg-gradient-to-b from-white to-yfc-cream-50">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* En-tête de section */}
          <div className="text-center mb-16 max-w-3xl mx-auto" ref={ref}>
            <div className="inline-flex items-center space-x-2 bg-yfc-cream-100 text-yfc-gold-800 px-4 py-2 rounded-full mb-6">
              <span className="text-sm font-medium">Fonctionnalités principales</span>
            </div>
            
            <h2 className="font-serif text-4xl font-light text-gray-900 mb-6">
              Des outils <span className="yfc-elegant-text relative inline-block">
                innovants 
                <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-yfc-gold-400"></span>
              </span> pour votre réussite
            </h2>
            
            <p className="text-gray-600">
              Découvrez comment FlirtSageAI peut transformer votre approche relationnelle grâce à l'intelligence artificielle
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-10 items-center mb-16">
            {/* Carousel de fonctionnalités */}
            <div className="order-2 lg:order-1">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 transition-all">
                {features.map((feature, idx) => (
                  <div 
                    key={feature.id}
                    className={`transition-opacity duration-500 ${idx === activeIndex ? 'block opacity-100' : 'hidden opacity-0'}`}
                  >
                    <div className="mb-6">
                      <div className="inline-block bg-yfc-gold-100 p-4 rounded-lg mb-4">
                        <Lightbulb className="w-8 h-8 text-yfc-gold-600" />
                      </div>
                      
                      <h3 className="text-2xl font-serif font-medium text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      
                      <p className="text-gray-600 text-lg">
                        {feature.description}
                      </p>
                    </div>
                    
                    <div className="bg-yfc-cream-50 rounded-xl p-6 border border-yfc-cream-200">
                      <div className="flex items-start space-x-4">
                        <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 border border-gray-200">
                          <MessageSquare className="w-6 h-6 text-yfc-gold-500" />
                        </div>
                        
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Exemple d'utilisation</div>
                          <p className="text-gray-800">
                            {idx === 0 && "\"J'analyse votre message et je détecte un ton hésitant. Essayez d'être plus affirmatif pour montrer votre confiance.\""}
                            {idx === 1 && "\"Voici trois suggestions de réponses adaptées au contexte actuel de votre conversation...\""}
                            {idx === 2 && "\"Basé sur vos interactions précédentes, je remarque que vous communiquez mieux avec un style décontracté et humoristique.\""}
                            {idx === 3 && "\"Pratiquez cet exercice: écrivez trois messages d'ouverture différents pour cette situation et je vous donnerai mon avis.\""}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="flex justify-between items-center mt-8">
                  <button 
                    onClick={prevFeature}
                    className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  
                  <div className="flex space-x-2">
                    {features.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveIndex(idx)}
                        className={`w-2.5 h-2.5 rounded-full transition-colors ${
                          idx === activeIndex ? 'bg-yfc-gold-500' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <button 
                    onClick={nextFeature}
                    className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Illustration */}
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-yfc-gold-100 rounded-full opacity-30 blur-2xl"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-yfc-cream-200 rounded-full opacity-30 blur-2xl"></div>
                
                <div className="relative bg-gradient-to-br from-yfc-gold-100 to-yfc-gold-50 rounded-2xl p-10 flex items-center justify-center">
                  <div className="w-56 h-56 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-full rounded-full bg-white/30 backdrop-blur-sm animate-pulse"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles className="w-24 h-24 text-yfc-gold-600" />
                    </div>
                    
                    {/* Orbites décoratives */}
                    <div className="absolute inset-0 animate-spin-slow">
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-yfc-gold-400"></div>
                    </div>
                    <div className="absolute inset-0 animate-spin-slow-reverse">
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-pink-400"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 