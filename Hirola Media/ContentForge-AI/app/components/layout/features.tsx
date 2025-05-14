'use client';

import { useRef, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { FileDown, Search, WandSparkles } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';

export default function Features() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const iconMap = {
    ai: <WandSparkles className="h-8 w-8 text-ocrf-gold-400" />,
    seo: <Search className="h-8 w-8 text-ocrf-gold-400" />,
    export: <FileDown className="h-8 w-8 text-ocrf-gold-400" />
  };

  const features = [
    {
      icon: 'ai',
      title: 'Génération d\'articles IA',
      description: 'Créez du contenu unique et optimisé SEO en quelques clics grâce à notre technologie d\'intelligence artificielle avancée.',
      visualElement: '/images/ai-generation.svg'
    },
    {
      icon: 'seo',
      title: 'Optimisation SEO automatique',
      description: 'Nos algorithmes optimisent automatiquement vos articles pour les moteurs de recherche avec les meilleures pratiques SEO.',
      visualElement: '/images/seo-optimization.svg'
    },
    {
      icon: 'export',
      title: 'Export multi-formats',
      description: 'Exportez vos articles dans différents formats (Markdown, HTML, Word) pour une intégration facile sur votre site.',
      visualElement: '/images/export-formats.svg'
    }
  ];
          
  return (
    <section id="features" ref={ref} className="py-24 bg-gradient-to-b from-ocrf-anthracite-900 to-ocrf-brown-900">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium bg-ocrf-copper-500/10 text-ocrf-copper-500 mb-4">
            <span>Fonctionnalités</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-ocrf-gold-300 to-ocrf-copper-400">
            Une suite complète d'outils
          </h2>
          
          <p className="text-ocrf-brown-100 text-lg max-w-3xl mx-auto">
            Découvrez nos fonctionnalités innovantes pour créer du contenu unique
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
          {features.map((feature, i) => (
            <div 
              key={i}
              className={`group h-full bg-gradient-to-br from-ocrf-gold-500/5 to-ocrf-copper-500/5 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl shadow-ocrf-gold-500/5 transition-all duration-500 ease-out ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Fond décoratif avec dégradé */}
              <div className="absolute inset-0 bg-gradient-to-br from-ocrf-anthracite-900 via-ocrf-anthracite-800 to-ocrf-anthracite-900 opacity-90"></div>
              
              {/* Effet de lumière */}
              <div className="absolute inset-0">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ocrf-gold-500/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ocrf-copper-500/40 to-transparent"></div>
                <div className="absolute -left-24 top-1/2 w-40 h-40 bg-ocrf-gold-500/10 rounded-full blur-3xl"></div>
                <div className="absolute -right-24 top-1/2 w-40 h-40 bg-ocrf-copper-500/10 rounded-full blur-3xl"></div>
              </div>
              
              <div className="relative z-10 p-8 flex flex-col h-full">
                {/* En-tête avec icône */}
                <div className="flex items-center mb-6">
                  <div className="flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center bg-ocrf-anthracite-800 shadow-inner shadow-black/50 border border-ocrf-gold-500/20">
                  {iconMap[feature.icon as keyof typeof iconMap]}
                  </div>
                  <h3 className="ml-5 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-ocrf-gold-300 to-ocrf-copper-400">
                    {feature.title}
                  </h3>
                </div>
                
                {/* Description */}
                <p className="text-ocrf-brown-200 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* Visualisation */}
                <div className="mt-auto pt-4 flex justify-center items-center">
                  <div className="w-full h-24 relative flex items-center justify-center">
                    {feature.icon === 'ai' && (
                      <div className="flex space-x-1">
                        {[...Array(3)].map((_, index) => (
                          <div 
                            key={index}
                            className="w-2 h-12 bg-gradient-to-t from-ocrf-gold-500 to-ocrf-copper-400 rounded-full animate-pulse"
                            style={{ 
                              animationDuration: `${1 + index * 0.2}s`,
                              opacity: 0.6 + index * 0.1,
                              height: `${(index+1) * 8}px` 
                            }}
                          ></div>
                        ))}
                        <div className="ml-2 w-28 h-8 relative overflow-hidden rounded-md bg-ocrf-anthracite-800 border border-ocrf-gold-500/20">
                          <div className="absolute inset-0 flex items-center justify-center text-xs text-ocrf-gold-300 font-mono">Génération IA</div>
                          <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-ocrf-gold-500 to-ocrf-copper-500 animate-progress"></div>
                        </div>
                      </div>
                    )}
                    
                    {feature.icon === 'seo' && (
                      <div className="flex items-end space-x-2">
                        {[20, 45, 65, 85, 75, 90].map((height, index) => (
                          <div 
                            key={index}
                            style={{ height: `${height}%` }}
                            className="w-3 bg-gradient-to-t from-ocrf-copper-500 to-ocrf-gold-500 rounded-t-sm opacity-80"
                          ></div>
                        ))}
                        <div className="ml-2 flex flex-col">
                          <div className="text-xs text-ocrf-gold-300 mb-1">Performance</div>
                          <div className="w-16 h-2 bg-ocrf-anthracite-800 rounded-full overflow-hidden">
                            <div className="h-full w-4/5 bg-ocrf-gold-500 animate-pulse"></div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {feature.icon === 'export' && (
                      <div className="flex items-center space-x-3">
                        {['MD', 'HTML', 'PDF'].map((format, index) => (
                          <div 
                            key={index}
                            className="w-14 h-16 relative bg-ocrf-anthracite-800 rounded-md border border-ocrf-gold-500/20 flex flex-col items-center justify-center"
                          >
                            <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-ocrf-gold-500 to-ocrf-copper-500"></div>
                            <div className="text-xs text-ocrf-gold-300 font-mono">{format}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}