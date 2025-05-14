'use client';

import React, { useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, MessageCircle, BookOpen, ChevronRight, Clock, ShieldCheck, Sparkles, Crown, Brain } from 'lucide-react';

// Caractéristiques principales
const features = [
  {
    id: 1,
    title: "Conseils personnalisés",
    description: "Des recommandations adaptées à votre personnalité, votre situation et vos objectifs relationnels.",
    icon: <Brain className="w-5 h-5" />,
    color: "yfc-gold"
  },
  {
    id: 2,
    title: "Guide de conversation",
    description: "Des suggestions de sujets et de questions pour maintenir des conversations fluides et intéressantes.",
    icon: <BookOpen className="w-5 h-5" />,
    color: "yfc-gold"
  },
  {
    id: 3,
    title: "Analyse des messages",
    description: "Recevez des retours constructifs sur vos messages pour améliorer votre communication.",
    icon: <MessageCircle className="w-5 h-5" />,
    color: "yfc-gold"
  }
];

export default function Features() {
  const [mainRef, mainInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [highlightRef, highlightInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="features" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* En-tête de section */}
        <div className="text-center mb-16 max-w-3xl mx-auto" ref={mainRef}>
          <div className="inline-flex items-center space-x-2 bg-yfc-cream-100 text-yfc-gold-800 px-4 py-2 rounded-full mb-6">
            <span className="text-sm font-medium">Fonctionnalités principales</span>
          </div>
          
          <h2 className="font-serif text-3xl md:text-4xl font-light text-gray-900 mb-6 leading-tight">
            Des outils sophistiqués pour <span className="relative inline-block">
              réussir
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-yfc-gold-400"></span>
            </span> en séduction
          </h2>
          
          <p className="text-gray-600 mb-8">
            FlirtSageAI combine intelligence artificielle et expertise en psychologie relationnelle pour vous offrir une expérience personnalisée qui vous aide à atteindre vos objectifs.
          </p>
        </div>
        
        {/* Caractéristiques principales */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {features.map((feature, index) => (
            <div 
              key={feature.id}
              className={`transform transition-all duration-500 ${
                mainInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="yfc-feature-card h-full bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
                <div className="relative h-52 overflow-hidden rounded-t-lg bg-gradient-to-r from-yfc-gold-100 to-yfc-cream-100 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-yfc-gold-100 flex items-center justify-center text-yfc-gold-600 transform transition-all duration-300 hover:scale-110">
                      {React.cloneElement(feature.icon, { className: "w-8 h-8" })}
                    </div>
                  </div>
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-${feature.color}-500`}></div>
                </div>
                
                <div className="p-6">
                  <div className={`w-10 h-10 rounded-full bg-${feature.color}-100 flex items-center justify-center mb-4`}>
                    <div className={`text-${feature.color}-600`}>
                      {feature.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {feature.description}
                  </p>
                  
                  <Link 
                    href="#pricing"
                    className="yfc-text-link inline-flex items-center text-yfc-gold-700 hover:text-yfc-gold-800"
                  >
                    <span>Voir les offres</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Fonctionnalité mise en avant */}
        <div 
          className={`bg-gradient-to-r from-yfc-cream-50 to-white border border-yfc-cream-200 rounded-2xl overflow-hidden mb-20 transform transition-all duration-700 ${
            highlightInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          ref={highlightRef}
        >
          <div className="grid md:grid-cols-2 items-center">
            <div className="p-8 lg:p-12">
              <div className="inline-flex items-center space-x-2 bg-yfc-gold-100 text-yfc-gold-800 px-3 py-1 rounded-full mb-6">
                <span className="text-sm font-medium">Fonctionnalité exclusive</span>
              </div>
              
              <h3 className="font-serif text-2xl md:text-3xl font-light text-gray-900 mb-4">
                Assistant de messagerie en temps réel
              </h3>
              
              <p className="text-gray-600 mb-6">
                Notre fonctionnalité la plus populaire vous aide à rédiger des messages attrayants et à maintenir des conversations engageantes avec vos intérêts amoureux. L'assistant analyse le contexte et suggère des réponses personnalisées qui reflètent votre personnalité.
              </p>
              
              <ul className="space-y-3 mb-6">
                {[
                  "Suggestions de réponses en temps réel",
                  "Analyse du ton et des émotions",
                  "Conseils pour maintenir l'intérêt",
                  "Détection des signaux d'intérêt"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-yfc-gold-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-yfc-gold-500"></div>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              
              <Link href="#pricing" className="yfc-button-primary inline-flex">
                <span>Voir nos offres</span>
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
            
            <div className="relative h-full flex items-center justify-center p-8 bg-gradient-to-l from-yfc-gold-50 to-white">
              <div className="relative w-64 h-64">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-52 h-52 rounded-full bg-yfc-gold-100/50 animate-pulse"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Crown className="w-24 h-24 text-yfc-gold-400" />
                </div>
                <div className="absolute top-0 right-0">
                  <Sparkles className="w-12 h-12 text-yfc-gold-300 animate-pulse" />
                </div>
                <div className="absolute bottom-8 left-0">
                  <Heart className="w-10 h-10 text-pink-400 fill-pink-400/30" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}