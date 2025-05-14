'use client';

import { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { TrendingUp, Activity, Clock, ZapIcon, BarChart2, Award } from "lucide-react";

// Interface pour les props de AnimatedCounter
interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

// Fonction pour animer le compteur
const AnimatedCounter = ({ end, duration = 2000, prefix = "", suffix = "", decimals = 0 }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  useEffect(() => {
    if (!isVisible) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(progress * end);
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [end, duration, isVisible]);

  const formatValue = (value: number) => {
    return decimals > 0 
      ? value.toFixed(decimals) 
      : Math.floor(value).toLocaleString();
  };

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{formatValue(count)}{suffix}
    </span>
  );
};

// Données des statistiques principales
const mainStats: any[] = [
  // Ces statistiques ont été retirées comme demandé
];

// Données du graphique simplifié
const progressData = [
  { label: "Sem 1", value: 20 },
  { label: "Sem 2", value: 35 },
  { label: "Sem 3", value: 48 },
  { label: "Sem 4", value: 62 },
  { label: "Sem 5", value: 78 },
  { label: "Sem 6", value: 90 }
];

export default function Stats() {
  const [sectionRef, sectionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [graphRef, graphInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section 
      ref={sectionRef}
      className="py-24 relative overflow-hidden bg-gradient-to-b from-fs-slate-900 to-fs-slate-800"
    >
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 fs-grid-pattern opacity-5"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fs-teal-500/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fs-teal-500/30 to-transparent"></div>
      
      {/* Cercles lumineux */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-fs-teal-500/10 blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-fs-blue-500/10 blur-3xl"></div>
      
      <div className="container px-6 mx-auto relative z-10">
        {/* En-tête de section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div 
            className="inline-flex items-center px-4 py-2 rounded-full bg-fs-teal-900/60 border border-fs-teal-500/30 backdrop-blur-sm mb-6"
            style={{ 
              opacity: sectionInView ? 1 : 0,
              transform: sectionInView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease'
            }}
          >
            <span className="mr-2 inline-block w-2 h-2 rounded-full bg-fs-teal-400 animate-pulse"></span>
            <span className="text-fs-teal-100 text-sm">Métriques et résultats</span>
          </div>
          
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
            style={{ 
              opacity: sectionInView ? 1 : 0,
              transform: sectionInView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
              transitionDelay: '0.1s'
            }}
          >
            Des <span className="fs-gradient-text bg-gradient-to-r from-fs-teal-400 to-fs-blue-400 text-transparent bg-clip-text">résultats</span> mesurables
          </h2>
          
          <p 
            className="text-lg text-fs-slate-200"
            style={{ 
              opacity: sectionInView ? 1 : 0,
              transform: sectionInView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
              transitionDelay: '0.2s'
            }}
          >
            Notre technologie d'IA avancée utilise des algorithmes sophistiqués pour créer des programmes d'entraînement et de nutrition optimisés.
          </p>
        </div>
        
        {/* Graphique de progression simplifié */}
        <div 
          className="max-w-4xl mx-auto bg-fs-slate-800/70 backdrop-blur-sm border border-fs-slate-700 rounded-xl p-6 md:p-8"
          ref={graphRef}
          style={{ 
            opacity: graphInView ? 1 : 0,
            transform: graphInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
            transitionDelay: '0.4s'
          }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Regardez-vous progresser</h3>
            <p className="text-fs-slate-300">Votre progression personnelle sur 6 semaines</p>
          </div>
          
          {/* Graphique de progression amélioré */}
          <div className="h-72 relative">
            {/* Lignes de grille */}
            <div className="absolute inset-0 flex flex-col justify-between">
              {[0, 20, 40, 60, 80, 100].reverse().map((value, i) => (
                <div key={i} className="w-full flex items-center">
                  <div className="w-12 text-right text-xs text-fs-slate-400 pr-3">{value}%</div>
                  <div className="flex-1 h-px bg-fs-slate-700/50"></div>
                </div>
              ))}
            </div>
            
            {/* Courbe de progression */}
            <svg className="absolute inset-0 pl-12" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Définition du dégradé */}
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(45, 212, 191, 0.5)" />
                  <stop offset="100%" stopColor="rgba(45, 212, 191, 0.05)" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              
              {/* Lignes de guide verticales */}
              {progressData.map((item, i) => {
                let xPos;
                if (i === 0) xPos = 0;
                else if (i === progressData.length - 1) xPos = 83;
                else xPos = i * 16.6;
                
                return (
                  <line 
                    key={i}
                    x1={xPos} 
                    y1="0" 
                    x2={xPos} 
                    y2="100" 
                    stroke="rgba(148, 163, 184, 0.1)" 
                    strokeDasharray="4 4"
                  />
                );
              })}
              
              {/* Lignes de guide horizontales */}
              {[20, 40, 60, 80].map((value, i) => (
                <line 
                  key={i}
                  x1="0" 
                  y1={100 - value} 
                  x2="100" 
                  y2={100 - value} 
                  stroke="rgba(148, 163, 184, 0.1)" 
                  strokeDasharray="4 4"
                />
              ))}
            </svg>
            
            {/* Points de données */}
            <div className="absolute inset-0 pt-5 pb-7 pl-12">
              <div className="relative h-full">
                {progressData.map((item, i) => {
                  // Ajustement des positions pour correspondre à la courbe de Bézier
                  let xPos;
                  if (i === 0) xPos = 0;
                  else if (i === progressData.length - 1) xPos = 83;
                  else xPos = i * 16.6;
                  
                  const yPos = 100 - item.value; // Position verticale inversée
                  
                  return (
                    <div 
                      key={i} 
                      className="group absolute transition-all duration-300"
                      style={{ 
                        left: `${xPos}%`, 
                        top: `${yPos}%`,
                        transform: 'translate(-50%, -50%)',
                        opacity: graphInView ? 1 : 0,
                        transition: 'opacity 0.5s ease, transform 0.3s ease',
                        transitionDelay: `${0.7 + i * 0.15}s`
                      }}
                    >
                      <div className="w-6 h-6 rounded-full bg-fs-teal-400/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-125">
                        <div className="w-3 h-3 rounded-full bg-fs-teal-400 border-2 border-white shadow-lg"></div>
                      </div>
                      
                      {/* Info-bulle modernisée */}
                      <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 p-2 px-3 bg-fs-slate-900 backdrop-blur-sm border border-fs-teal-500/40 rounded-md text-white text-xs min-w-[60px] shadow-lg">
                        <div className="font-bold text-center">{item.value}% <span className="text-fs-teal-400 text-[10px]">performance</span></div>
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-fs-slate-900 border-t border-l border-fs-teal-500/40 rotate-45"></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Étiquettes des semaines */}
            <div className="absolute bottom-0 left-0 right-0 flex pl-12">
              {progressData.map((item, i) => {
                // Ajustement des positions pour correspondre à la courbe de Bézier
                let xPos;
                if (i === 0) xPos = 0;
                else if (i === progressData.length - 1) xPos = 83;
                else xPos = i * 16.6;
                
                return (
                  <div 
                    key={i} 
                    className="absolute text-center"
                    style={{ 
                      left: `${xPos}%`,
                      transform: 'translateX(-50%)',
                      opacity: graphInView ? 1 : 0,
                      transition: 'opacity 0.5s ease, transform 0.5s ease',
                      transitionDelay: `${0.4 + i * 0.1}s`
                    }}
                  >
                    <div className="text-xs font-medium text-fs-slate-400 bg-fs-slate-800/50 px-2 py-1 rounded-sm">{item.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}