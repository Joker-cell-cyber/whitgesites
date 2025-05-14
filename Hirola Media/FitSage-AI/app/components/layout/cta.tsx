'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section 
      ref={ref}
      className="py-24 relative overflow-hidden bg-gradient-to-b from-fs-slate-900 to-fs-slate-800"
    >
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 fs-grid-pattern opacity-5"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fs-teal-500/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fs-teal-500/30 to-transparent"></div>
      
      {/* Cercle lumineux */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-fs-teal-500/10 blur-3xl"></div>
      
      <div className="container relative z-10 px-6 mx-auto">
        <div 
          className="max-w-5xl mx-auto"
          style={{ 
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease'
          }}
        >
          {/* Carte principale */}
          <div className="bg-fs-slate-800/70 backdrop-blur-sm border border-fs-teal-500/20 rounded-2xl overflow-hidden shadow-xl shadow-fs-teal-900/20">
            <div className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Contenu textuel */}
                <div className="space-y-6">
                  <h2 
                    className="text-3xl md:text-4xl font-bold text-white leading-tight"
                    style={{ 
                      opacity: inView ? 1 : 0,
                      transform: inView ? 'translateY(0)' : 'translateY(20px)',
                      transition: 'opacity 0.7s ease, transform 0.7s ease',
                      transitionDelay: '0.3s'
                    }}
                  >
                    Prêt à <span className="fs-gradient-text bg-gradient-to-r from-fs-teal-400 to-fs-blue-400 text-transparent bg-clip-text">transformer</span> votre condition physique?
                  </h2>
                  
                  <p 
                    className="text-lg text-fs-slate-200"
                    style={{ 
                      opacity: inView ? 1 : 0,
                      transform: inView ? 'translateY(0)' : 'translateY(20px)',
                      transition: 'opacity 0.7s ease, transform 0.7s ease',
                      transitionDelay: '0.4s'
                    }}
                  >
                    Découvrez notre technologie d'IA avancée et commencez à utiliser des programmes d'entraînement et nutritionnels générés par intelligence artificielle, adaptés à vos objectifs.
                  </p>
                  
                  <ul 
                    className="space-y-4 pt-2"
                    style={{ 
                      opacity: inView ? 1 : 0,
                      transform: inView ? 'translateY(0)' : 'translateY(20px)',
                      transition: 'opacity 0.7s ease, transform 0.7s ease',
                      transitionDelay: '0.5s'
                    }}
                  >
                    {[
                      "Coach IA personnel 24/7",
                      "Programmes d'entraînement personnalisés",
                      "Conseils nutritionnels adaptés"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-fs-teal-900/60 border border-fs-teal-500/30 flex items-center justify-center mr-3 flex-shrink-0">
                          <svg className="w-3 h-3 text-fs-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-white">{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div 
                    className="pt-6"
                    style={{ 
                      opacity: inView ? 1 : 0,
                      transform: inView ? 'translateY(0)' : 'translateY(20px)',
                      transition: 'opacity 0.7s ease, transform 0.7s ease',
                      transitionDelay: '0.7s'
                    }}
                  >
                    <Link 
                      href="/#pricing" 
                      className="inline-flex items-center px-8 py-4 rounded-lg bg-gradient-to-r from-fs-teal-600 to-fs-blue-600 text-white font-medium text-lg transition-all duration-300 hover:shadow-lg hover:shadow-fs-teal-900/50 transform hover:-translate-y-1"
                    >
                      <span>Commencer maintenant</span>
                      <ArrowRight className="ml-2 size-4" />
                    </Link>
                  </div>
                </div>
                
                {/* Image/Illustration */}
                <div 
                  className="relative"
                  style={{ 
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'opacity 0.7s ease, transform 0.7s ease',
                    transitionDelay: '0.4s'
                  }}
                >
                  {/* Effet lumineux */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-fs-teal-500/20 via-fs-blue-500/10 to-transparent rounded-xl opacity-60 blur-xl"></div>
                  
                  {/* Image du moniteur */}
                  <div className="relative z-10 border-8 border-fs-slate-800 bg-fs-slate-900 rounded-2xl shadow-xl overflow-hidden">
                    <div className="aspect-[4/3] relative">
                      <Image 
                        src="/dashboard-analytics.jpg" 
                        alt="Dashboard FitSage AI" 
                        width={600} 
                        height={450}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      
                      {/* Overlay avec effet de lueur */}
                      <div className="absolute inset-0 bg-gradient-to-t from-fs-slate-900/80 via-transparent to-fs-slate-900/30"></div>
                      
                      {/* Interface superposée */}
                      <div className="absolute inset-0 flex flex-col justify-center items-center p-6">
                        <div className="text-center mb-6">
                          <div className="text-fs-teal-400 text-sm font-medium mb-2">Assistant IA</div>
                          <div className="text-white text-3xl font-bold">24/7</div>
                        </div>
                        
                        <div className="w-full max-w-xs bg-fs-slate-800/90 backdrop-blur-sm border border-fs-teal-500/20 rounded-lg p-3">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-white text-sm">Disponibilité IA</span>
                            <span className="text-fs-teal-400 font-medium">100%</span>
                          </div>
                          <div className="w-full h-2 bg-fs-slate-700 rounded-full overflow-hidden">
                            <div className="h-full w-full bg-gradient-to-r from-fs-teal-500 to-fs-blue-500 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Badge flottant */}
                  <div className="absolute -top-6 -right-6 px-4 py-2 bg-fs-slate-800/90 backdrop-blur-sm border border-fs-teal-500/30 rounded-full shadow-lg z-20 animate-pulse-slow">
                    <div className="text-white text-sm font-bold">IA Avancée</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Barre de fonctionnalités */}
          <div 
            className="mt-12 bg-fs-slate-800/50 backdrop-blur-sm border border-fs-slate-700 rounded-xl p-4 flex flex-wrap justify-center items-center gap-6"
            style={{ 
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
              transitionDelay: '0.8s'
            }}
          >
            <div className="flex items-center">
              <div className="flex -space-x-2 mr-3">
                {[
                  { icon: "🤖", label: "Coach IA" },
                  { icon: "💪", label: "Programmes" },
                  { icon: "🥗", label: "Nutrition" },
                  { icon: "📊", label: "Analyse" }
                ].map((item, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-fs-slate-800 bg-fs-slate-900 flex items-center justify-center text-lg">
                    {item.icon}
                  </div>
                ))}
              </div>
              <span className="text-white text-sm">Fonctionnalités IA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 