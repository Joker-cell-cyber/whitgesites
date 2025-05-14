'use client';

import { useRef, useState, useEffect } from "react";
import Image from "next/image";

const featureShowcases = [
  {
    id: 1,
    title: "Analyse des créatifs",
    description: "Analysez en profondeur les performances de vos créatifs publicitaires. Identifiez les éléments visuels qui génèrent le plus d'engagement et obtenez des recommandations pour optimiser vos futures campagnes.",
    icon: "/avatars/feature-creative.jpg",
    metrics: "Optimisation du CTR • Amélioration des visuels • Identification des tendances",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    id: 2,
    title: "Analyse des audiences",
    description: "Découvrez quelles audiences répondent le mieux à vos publicités. Notre plateforme vous aide à comprendre les segments démographiques, les centres d'intérêt et les comportements qui génèrent les meilleures performances.",
    icon: "/avatars/feature-audience.jpg",
    metrics: "Segmentation avancée • Comportements utilisateurs • Ciblage précis",
    gradient: "from-purple-500 to-indigo-500",
  },
  {
    id: 3,
    title: "Prédictions basées sur l'IA",
    description: "Anticipez les performances futures de vos campagnes grâce à nos modèles prédictifs. Notre algorithme analyse vos données historiques pour vous aider à prendre de meilleures décisions stratégiques.",
    icon: "/avatars/feature-ai.jpg",
    metrics: "Prévisions de performance • Analyse de tendances • Recommandations d'optimisation",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    id: 4,
    title: "Optimisation du ROAS",
    description: "Maximisez votre retour sur investissement publicitaire. Notre plateforme analyse vos dépenses et résultats pour vous aider à allouer votre budget de la manière la plus efficace possible.",
    icon: "/avatars/feature-roas.jpg",
    metrics: "Suivi du ROAS • Allocation budgétaire • Optimisation des coûts",
    gradient: "from-amber-500 to-orange-500",
  },
];

export default function FeatureShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  
  // Animation au défilement
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);
  
  // Rotation automatique des présentations
  useEffect(() => {
    if (!isInView) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % featureShowcases.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isInView]);
  
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-black relative overflow-hidden" ref={containerRef}>
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-5"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
      
      {/* Éléments décoratifs */}
      <div className="absolute top-1/4 right-1/4 w-36 sm:w-48 md:w-64 h-36 sm:h-48 md:h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-36 sm:w-48 md:w-64 h-36 sm:h-48 md:h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      <div className="container relative z-10 px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 space-y-3 sm:space-y-4">
          <div className="inline-block px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 border border-purple-500/30 rounded-full backdrop-blur-sm bg-black/10 text-purple-300 text-xs sm:text-sm font-medium mb-3 sm:mb-4 animate-fade-in">
            <span className="mr-1.5 sm:mr-2 inline-block w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-purple-400 animate-pulse"></span>
            Découvrez nos fonctionnalités
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 drop-shadow-lg">
            Analyse avancée
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto">
            Explorez les capacités de notre plateforme d'analyse Facebook Ads
          </p>
          
          {/* Ligne décorative */}
          <div className="w-12 sm:w-16 md:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-3 sm:mt-4 md:mt-6 rounded-full"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Présentation principale */}
          <div className="relative perspective-1000 min-h-[300px] sm:min-h-[250px] md:min-h-[220px]">
            {featureShowcases.map((feature, index) => (
              <div
                key={feature.id}
                className={`absolute inset-0 transition-all duration-700 ease-out ${
                  index === activeIndex
                    ? "opacity-100 translate-x-0 rotate-0 scale-100"
                    : index < activeIndex
                    ? "opacity-0 -translate-x-full rotate-12 scale-90"
                    : "opacity-0 translate-x-full -rotate-12 scale-90"
                }`}
                style={{ 
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  willChange: "transform, opacity"
                }}
              >
                <div className="relative rounded-lg sm:rounded-xl md:rounded-2xl border border-purple-500/20 bg-black/40 backdrop-blur-xl p-4 sm:p-6 md:p-8 shadow-2xl shadow-purple-500/10 h-full">
                  {/* Effet de lueur sur les bords */}
                  <div className="absolute inset-0 rounded-lg sm:rounded-xl md:rounded-2xl bg-gradient-to-r p-0.5 opacity-30"
                       style={{ backgroundImage: `linear-gradient(to right, ${feature.gradient.split(' ')[1]}, ${feature.gradient.split(' ')[3]})` }}>
                  </div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="mb-3 sm:mb-4 md:mb-6">
                      <div className={`inline-flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 items-center justify-center rounded-lg bg-gradient-to-br ${feature.gradient}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          {index === 0 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />}
                          {index === 1 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />}
                          {index === 2 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />}
                          {index === 3 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />}
                        </svg>
                      </div>
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">{feature.title}</h3>
                    
                    <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6 md:mb-8 flex-grow">
                      {feature.description}
                    </p>
                    
                    <div className="flex items-center border-t border-purple-500/20 pt-4">
                      <p className="text-xs sm:text-sm text-gray-400">{feature.metrics}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Indicateurs */}
          <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
            {featureShowcases.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "bg-purple-500 w-4 sm:w-5 md:w-6"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
                aria-label={`Voir la fonctionnalité ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Navigation */}
          <div className="flex justify-center mt-6 sm:mt-8 space-x-4">
            <button
              onClick={() => setActiveIndex((prev) => (prev - 1 + featureShowcases.length) % featureShowcases.length)}
              className="p-2 sm:p-2.5 md:p-3 rounded-full bg-black/40 backdrop-blur-sm border border-purple-500/20 text-white hover:bg-black/60 transition-colors duration-200"
              aria-label="Fonctionnalité précédente"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setActiveIndex((prev) => (prev + 1) % featureShowcases.length)}
              className="p-2 sm:p-2.5 md:p-3 rounded-full bg-black/40 backdrop-blur-sm border border-purple-500/20 text-white hover:bg-black/60 transition-colors duration-200"
              aria-label="Fonctionnalité suivante"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 