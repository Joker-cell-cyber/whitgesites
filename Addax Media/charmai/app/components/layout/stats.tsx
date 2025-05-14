'use client';

import { useRef, useEffect, useState } from "react";

// Interface pour les props de AnimatedCounter
interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

// Fonction pour animer le compteur
const AnimatedCounter = ({ end, duration = 2000, prefix = "", suffix = "" }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [end, duration, isVisible]);

  return (
    <span ref={countRef} className="tabular-nums">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

const stats = [
  {
    id: 1,
    value: 95,
    suffix: "%",
    label: "Précision SEO",
    description: "Taux de conformité aux meilleures pratiques SEO",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    id: 2,
    value: 1500,
    suffix: "+",
    label: "Mots par article",
    description: "Longueur moyenne des articles générés",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    gradient: "from-blue-400 to-indigo-500",
  },
  {
    id: 3,
    value: 65,
    suffix: "%",
    label: "Gain de temps",
    description: "Réduction du temps de création de contenu",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    gradient: "from-purple-400 to-pink-500",
  },
  {
    id: 4,
    value: 45,
    suffix: "s",
    label: "Temps de génération",
    description: "Durée moyenne pour générer un article complet",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    gradient: "from-amber-400 to-orange-500",
  },
];

export default function Stats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
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
  
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-black relative overflow-hidden" ref={containerRef}>
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-5"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
      
      {/* Éléments décoratifs */}
      <div className="absolute top-1/3 left-1/4 w-36 sm:w-48 md:w-72 h-36 sm:h-48 md:h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/4 w-36 sm:w-48 md:w-72 h-36 sm:h-48 md:h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      
      <div className="container relative z-10 px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16 space-y-2 sm:space-y-3 md:space-y-4">
          <div className="inline-block px-3 sm:px-4 md:px-6 py-1 sm:py-1.5 md:py-2 border border-blue-500/30 rounded-full backdrop-blur-sm bg-black/10 text-blue-300 text-xs sm:text-sm font-medium mb-2 sm:mb-3 md:mb-4 animate-fade-in">
            <span className="mr-1.5 sm:mr-2 inline-block w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-blue-400 animate-pulse"></span>
            Performance de notre IA
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 drop-shadow-lg">
            La puissance de notre générateur
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto">
            Découvrez les performances exceptionnelles de notre technologie d'IA pour la génération d'articles SEO
          </p>
          
          {/* Ligne décorative */}
          <div className="w-12 sm:w-16 md:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-3 sm:mt-4 md:mt-6 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div 
              key={stat.id}
              className={`relative rounded-lg sm:rounded-xl md:rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-4 sm:p-5 md:p-6 lg:p-8 shadow-2xl transition-all duration-700 transform ${
                isInView 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-12"
              } hover:scale-105 hover:shadow-lg hover:shadow-${stat.gradient.split(' ')[1]}/20 group`}
              style={{ 
                transitionDelay: `${index * 150}ms`,
                willChange: "transform, opacity"
              }}
            >
              {/* Effet de lueur sur les bords */}
              <div className="absolute inset-0 rounded-lg sm:rounded-xl md:rounded-2xl bg-gradient-to-r p-0.5 opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                   style={{ backgroundImage: `linear-gradient(to right, ${stat.gradient.split(' ')[1]}, ${stat.gradient.split(' ')[3]})` }}>
              </div>
              
              {/* Particules animées */}
              <div className="absolute -top-1.5 sm:-top-2 -right-1.5 sm:-right-2 w-2 sm:w-3 md:w-4 h-2 sm:h-3 md:h-4 rounded-full bg-gradient-to-r opacity-0 group-hover:opacity-70 transition-all duration-500 animate-ping"
                   style={{ backgroundImage: `linear-gradient(to right, ${stat.gradient.split(' ')[1]}, ${stat.gradient.split(' ')[3]})` }}></div>
              <div className="absolute -bottom-1.5 sm:-bottom-2 -left-1.5 sm:-left-2 w-2 sm:w-3 md:w-4 h-2 sm:h-3 md:h-4 rounded-full bg-gradient-to-r opacity-0 group-hover:opacity-70 transition-all duration-500 animate-ping"
                   style={{ backgroundImage: `linear-gradient(to right, ${stat.gradient.split(' ')[1]}, ${stat.gradient.split(' ')[3]})` }}></div>
              
              <div className="relative z-10">
                <div className={`inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-md sm:rounded-lg md:rounded-xl mb-3 sm:mb-4 md:mb-6 bg-gradient-to-br ${stat.gradient} text-white group-hover:animate-pulse`}>
                  <span className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6">{stat.icon}</span>
                </div>
                
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300"
                    style={{ backgroundImage: `linear-gradient(to right, ${stat.gradient.split(' ')[1]}, ${stat.gradient.split(' ')[3]})` }}>
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </h3>
                
                <p className="text-base sm:text-lg md:text-xl font-semibold text-white mb-1 sm:mb-2">{stat.label}</p>
                
                <p className="text-xs sm:text-sm md:text-base text-gray-400">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}