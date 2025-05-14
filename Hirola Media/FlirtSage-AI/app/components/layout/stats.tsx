'use client';

import { useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { Heart, MessageCircle, Users, Calendar, Clock, Target, Book, Lightbulb, Shield } from 'lucide-react';
import CountUp from 'react-countup';

// Caractéristiques de l'application
const features = [
  {
    icon: <MessageCircle className="h-6 w-6" />,
    title: "Conversations intelligentes",
    description: "Analyse contextuelle de vos messages pour des conseils personnalisés"
  },
  {
    icon: <Book className="h-6 w-6" />,
    title: "Base de connaissances",
    description: "Conseils fondés sur la psychologie relationnelle moderne"
  },
  {
    icon: <Lightbulb className="h-6 w-6" />,
    title: "Exercices pratiques",
    description: "Développez vos compétences relationnelles progressivement"
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Confidentialité totale",
    description: "Vos données restent privées et sécurisées"
  }
];

// Objectifs de l'application
const objectives = [
  { month: 'Étape 1', description: 'Évaluation personnalisée' },
  { month: 'Étape 2', description: 'Conseils fondamentaux' },
  { month: 'Étape 3', description: 'Exercices pratiques' },
  { month: 'Étape 4', description: 'Analyse des conversations' },
  { month: 'Étape 5', description: 'Feedback constructif' },
  { month: 'Étape 6', description: 'Application en situation réelle' }
];

export default function Stats() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [timelineRef, timelineInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  return (
    <section id="features" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* En-tête de section */}
          <div className="text-center mb-16 max-w-3xl mx-auto" ref={ref}>
            <div className="inline-flex items-center space-x-2 bg-yfc-cream-100 text-yfc-gold-800 px-4 py-2 rounded-full mb-6">
              <span className="text-sm font-medium">Notre approche</span>
            </div>
            
            <h2 className="font-serif text-3xl md:text-4xl font-light text-gray-900 mb-6 leading-tight">
              Une <span className="relative inline-block">
                méthodologie
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-yfc-gold-400"></span>
              </span> éprouvée
            </h2>
            
            <p className="text-gray-600">
              Découvrez comment FlirtSageAI vous accompagne pas à pas pour développer vos compétences relationnelles.
            </p>
          </div>
          
          {/* Caractéristiques principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`bg-white rounded-xl border border-gray-100 shadow-sm p-6 transform transition-all duration-500 hover:shadow-md hover:border-yfc-gold-200 ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-yfc-gold-50 flex items-center justify-center text-yfc-gold-600 mr-4">
                    {feature.icon}
                  </div>
                </div>
                
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {feature.title}
                </h3>
                
                <p className="text-gray-500 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
          
          {/* Parcours utilisateur */}
          <div className="max-w-4xl mx-auto" ref={timelineRef}>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
              <h3 className="text-xl font-medium text-gray-900 mb-8 text-center">
                Votre parcours d'apprentissage avec FlirtSageAI
              </h3>
              
              <div className="relative">
                {/* Timeline */}
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2"></div>
                
                {/* Étapes */}
                <div className="space-y-12 relative">
                  {objectives.map((objective, i) => (
                    <div 
                      key={i}
                      className={`flex transition-all duration-700 ${
                        timelineInView ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{ transitionDelay: `${i * 200}ms` }}
                    >
                      <div className={`w-1/2 pr-8 text-right ${i % 2 === 1 ? 'order-1' : 'order-none'}`}>
                        <div className="font-medium text-yfc-gold-800">
                          {objective.month}
                        </div>
                        <p className="text-gray-600 mt-1">
                          {objective.description}
                        </p>
                      </div>
                      
                      <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-white border-2 border-yfc-gold-500"></div>
                      </div>
                      
                      <div className={`w-1/2 pl-8 ${i % 2 === 0 ? 'order-1' : 'order-none'}`}>
                        {i % 2 === 0 && (
                          <>
                            <div className="font-medium text-yfc-gold-800">
                              {objective.month}
                            </div>
                            <p className="text-gray-600 mt-1">
                              {objective.description}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Objectifs */}
              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-gray-100 pt-8">
                {[
                  {
                    title: "Objectif",
                    description: "Développer votre confiance en vous",
                    icon: <Target className="h-5 w-5 text-yfc-gold-600" />
                  },
                  {
                    title: "Approche",
                    description: "Conseils personnalisés et pratiques",
                    icon: <Lightbulb className="h-5 w-5 text-yfc-gold-600" />
                  },
                  {
                    title: "Engagement",
                    description: "Accompagnement continu et adaptatif",
                    icon: <Heart className="h-5 w-5 text-yfc-gold-600" />
                  }
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center transform transition-all duration-700 ${
                      timelineInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                    style={{ transitionDelay: `${i * 150 + 1000}ms` }}
                  >
                    <div className="mr-4">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">
                        {item.title}
                      </div>
                      <div className="text-base text-gray-900">
                        {item.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}