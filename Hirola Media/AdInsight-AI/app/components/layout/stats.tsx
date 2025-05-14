'use client';

import { useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { TrendingUp, ArrowUpRight, Clock, ShieldAlert, Rocket, BarChart, LineChart, PieChart, Zap, Database, Target } from 'lucide-react';

// Composant pour animer les compteurs
interface AnimatedCounterProps {
  value: number;
  symbol?: string;
  decimals?: number;
  suffix?: string;
  inView?: boolean;
}

const AnimatedCounter = ({ value, symbol = '', decimals = 0, suffix = '', inView = false }: AnimatedCounterProps) => {
  const formatValue = (val: number): string | number => {
    if (decimals > 0) {
      return val.toFixed(decimals);
    }
    return Math.floor(val);
  };

  const startValue = 0;
  const endValue = value;
  const duration = 2000; // ms
  const frameRate = 1000 / 60; // 60fps
  const totalFrames = Math.round(duration / frameRate);
  const counterRef = useRef(startValue);
  const currentValueRef = useRef(startValue);

  // Animation disable for now as it causes typescript errors
  // Will use static values instead
  
  // Fonction d'easing pour une animation plus naturelle
  const easeOutQuart = (x: number): number => {
    return 1 - Math.pow(1 - x, 4);
  };

  return (
    <span>
      {value}
      {symbol}
      {suffix}
    </span>
  );
};

// Types for stats
interface StatItem {
  id: number;
  value: number;
  symbol?: string;
  suffix?: string;
  label: string;
  description: string;
  trend: 'up' | 'down' | 'neutral';
  color: 'blue' | 'emerald' | 'amber' | 'purple';
  icon: React.ElementType;
}

// Statistiques principales
const mainStats: StatItem[] = [
  {
    id: 1,
    value: 47,
    symbol: '%',
    label: "Potentiel d'optimisation",
    description: "Gain moyen possible identifié",
    trend: "up",
    color: "blue",
    icon: Target
  },
  {
    id: 2,
    value: 180,
    suffix: '+',
    label: "Métriques analysées",
    description: "Pour une vision complète",
    trend: "up",
    color: "emerald",
    icon: BarChart
  },
  {
    id: 3,
    value: 30,
    suffix: 's',
    label: "Analyse rapide",
    description: "Résultats en 30s à 3min",
    trend: "neutral",
    color: "amber",
    icon: Clock
  },
  {
    id: 4,
    value: 12,
    label: " facteurs",
    description: "D'amélioration identifiés",
    trend: "neutral",
    color: "purple",
    icon: Zap
  }
];

// Métriques détaillées
const detailedMetrics = [
  { label: "Optimisation du budget", value: "+38%", change: "Potentiel d'efficacité" },
  { label: "Précision de ciblage", value: "x2.4", change: "Affinité audience" },
  { label: "Intelligence automatique", value: "24/7", change: "Surveillance continue" },
  { label: "Formats publicitaires", value: "Tous", change: "Compatibilité complète" },
];

export default function Stats() {
  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [metricsRef, metricsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  type ColorType = 'blue' | 'emerald' | 'amber' | 'purple';
  type TrendType = 'up' | 'down' | 'neutral';

  const getColorClass = (color: ColorType): string => {
    switch (color) {
      case 'blue': return 'bg-adfi-blue-50 text-adfi-blue-600 border-adfi-blue-200';
      case 'emerald': return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      case 'amber': return 'bg-amber-50 text-amber-600 border-amber-200';
      case 'purple': return 'bg-purple-50 text-purple-600 border-purple-200';
      default: return 'bg-adfi-blue-50 text-adfi-blue-600 border-adfi-blue-200';
    }
  };

  const getTrendClass = (trend: TrendType): string => {
    switch (trend) {
      case 'up': return 'text-emerald-500';
      case 'down': return 'text-emerald-500'; // Pour CPA, baisser est bien
      case 'neutral': return 'text-adfi-slate-500';
      default: return 'text-adfi-slate-600';
    }
  };

  return (
    <section id="stats" className="py-24 bg-gradient-to-b from-white to-adfi-slate-50 relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 adfi-dot-pattern opacity-5"></div>
      
      {/* Cercles décoratifs */}
      <div className="absolute top-40 right-10 w-64 h-64 rounded-full bg-adfi-blue-100/20 blur-3xl"></div>
      <div className="absolute bottom-40 left-10 w-80 h-80 rounded-full bg-adfi-blue-100/30 blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* En-tête de section */}
          <div 
            ref={statsRef}
            className="text-center max-w-3xl mx-auto mb-16"
            style={{
              opacity: statsInView ? 1 : 0,
              transform: statsInView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.5s ease, transform 0.5s ease'
            }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-adfi-blue-50 text-adfi-blue-600 rounded-full mb-6">
              <span className="text-sm font-medium">Notre impact</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-adfi-slate-900 mb-6">
              Exploitez le <span className="text-adfi-blue-600">potentiel caché</span> de vos publicités
            </h2>
            
            <p className="text-xl text-adfi-slate-600 leading-relaxed">
              Notre solution d'analyse avancée vous aide à identifier les opportunités d'optimisation inexploitées de vos campagnes Facebook Ads en quelques minutes.
            </p>
          </div>
          
          {/* Grille de statistiques principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {mainStats.map((stat, index) => {
              const IconComponent = stat.icon;
              
              return (
                <div 
                  key={stat.id}
                  className="bg-white rounded-xl shadow-md border border-adfi-slate-100 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg overflow-hidden"
                  style={{
                    opacity: statsInView ? 1 : 0,
                    transform: statsInView ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'opacity 0.7s ease, transform 0.7s ease',
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  <div className="p-6">
                    <div className={`${getColorClass(stat.color)} w-12 h-12 rounded-lg flex items-center justify-center mb-5`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    
                    <div className="flex items-end space-x-1 mb-3">
                      <h3 className="text-4xl font-bold text-adfi-slate-900">
                        {statsInView && (
                          stat.value
                        )}
                      </h3>
                      {stat.symbol && (
                        <span className={`text-3xl font-bold ${getTrendClass(stat.trend)}`}>
                          {stat.symbol}
                        </span>
                      )}
                      {stat.suffix && (
                        <span className={`text-3xl font-bold ${getTrendClass(stat.trend)}`}>
                          {stat.suffix}
                        </span>
                      )}
                    </div>
                    
                    <h4 className="text-lg font-semibold text-adfi-slate-800 mb-2">
                      {stat.label}
                    </h4>
                    
                    <p className="text-adfi-slate-600 text-sm">
                      {stat.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Objectifs et disclaimer */}
          <div 
            ref={metricsRef}
            className="bg-white rounded-2xl shadow-xl border border-adfi-slate-100 overflow-hidden mb-12" 
            style={{
              opacity: metricsInView ? 1 : 0,
              transform: metricsInView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease'
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Objectifs - Illustration SVG au lieu de l'image */}
              <div className="bg-gradient-to-br from-adfi-blue-500 to-adfi-blue-600 p-8 lg:p-10 flex items-center justify-center relative overflow-hidden">
                {/* Motifs décoratifs */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 left-1/4 h-full w-px bg-white"></div>
                  <div className="absolute top-0 left-2/4 h-full w-px bg-white"></div>
                  <div className="absolute top-0 left-3/4 h-full w-px bg-white"></div>
                  <div className="absolute left-0 top-1/4 w-full h-px bg-white"></div>
                  <div className="absolute left-0 top-2/4 w-full h-px bg-white"></div>
                  <div className="absolute left-0 top-3/4 w-full h-px bg-white"></div>
                </div>
                
                <div className="relative z-10 w-full max-w-md">
                  <div className="mb-6 text-center">
                    <h3 className="text-xl font-semibold text-white mb-2">Simulation d'optimisation du ROAS</h3>
                    <p className="text-adfi-blue-100">Basé sur notre modèle d'analyse prédictive</p>
                  </div>
                  
                  {/* Illustration SVG dynamique */}
                  <div className="w-full bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <Rocket className="w-6 h-6 text-white mr-2" />
                        <span className="text-white font-medium">Amplification de l'impact</span>
                      </div>
                      <div className="text-white/80 text-sm">Campagne type</div>
                    </div>
                    
                    {/* Graphique */}
                    <div className="h-40 relative mb-5">
                      {/* Lignes de grille */}
                      {[0, 1, 2, 3, 4].map((i) => (
                        <div key={i} className="absolute w-full h-px bg-white/10" style={{top: `${i * 25}%`}}></div>
                      ))}
                      
                      {/* Labels d'axe */}
                      <div className="absolute -left-2 top-0 text-xs text-white/60">4.5x</div>
                      <div className="absolute -left-2 bottom-0 text-xs text-white/60">1.0x</div>
                      
                      {/* Points temporels */}
                      <div className="absolute bottom-0 w-full flex justify-between px-2 text-xs text-white/60">
                        <span>Initial</span>
                        <span>Étape 1</span>
                        <span>Étape 2</span>
                        <span>Étape 3</span>
                        <span>Optimisé</span>
                      </div>
                      
                      {/* Courbe actuelle et courbe optimisée */}
                      <svg className="absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                        {/* Aire sous courbe - Baseline */}
                        <path 
                          d="M0,80 C10,80 30,75 50,75 C70,75 90,75 100,75 L100,100 L0,100 Z" 
                          fill="rgba(255, 255, 255, 0.1)" 
                        />
                        {/* Ligne de base */}
                        <path 
                          d="M0,80 C10,80 30,75 50,75 C70,75 90,75 100,75" 
                          fill="none" 
                          stroke="rgba(255, 255, 255, 0.5)" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                        />
                        
                        {/* Aire sous courbe - Optimisée */}
                        <path 
                          d="M0,80 C10,70 30,50 50,35 C70,25 90,15 100,10 L100,100 L0,100 Z" 
                          fill="rgba(16, 185, 129, 0.2)" 
                        />
                        {/* Ligne optimisée */}
                        <path 
                          d="M0,80 C10,70 30,50 50,35 C70,25 90,15 100,10" 
                          fill="none" 
                          stroke="rgb(16, 185, 129)" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeDasharray="0"
                        />
                        
                        {/* Points de données */}
                        <circle cx="0" cy="80" r="2" fill="white" stroke="rgb(16, 185, 129)" strokeWidth="1" />
                        <circle cx="25" cy="60" r="2" fill="white" stroke="rgb(16, 185, 129)" strokeWidth="1" />
                        <circle cx="50" cy="35" r="2" fill="white" stroke="rgb(16, 185, 129)" strokeWidth="1" />
                        <circle cx="75" cy="22" r="2" fill="white" stroke="rgb(16, 185, 129)" strokeWidth="1" />
                        <circle cx="100" cy="10" r="2" fill="white" stroke="rgb(16, 185, 129)" strokeWidth="1" />
                      </svg>
                    </div>
                    
                    {/* Légende du graphique */}
                    <div className="flex justify-center space-x-6">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-white/50 rounded-full mr-2"></div>
                        <span className="text-white/80 text-xs">ROAS avant optimisation</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-emerald-400 rounded-full mr-2"></div>
                        <span className="text-white/80 text-xs">ROAS potentiel</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Métriques détaillées et disclaimer */}
              <div className="p-8 lg:p-10">
                <h3 className="text-2xl font-bold text-adfi-slate-900 mb-8">
                  Opportunités d'optimisation
                </h3>
                
                <div className="space-y-6">
                  {detailedMetrics.map((metric, index) => (
                    <div 
                      key={index}
                      className="border-b border-adfi-slate-100 pb-6 last:border-0 last:pb-0"
                      style={{
                        opacity: metricsInView ? 1 : 0,
                        transform: metricsInView ? 'translateX(0)' : 'translateX(20px)',
                        transition: 'opacity 0.7s ease, transform 0.7s ease',
                        transitionDelay: `${index * 100 + 200}ms`
                      }}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-adfi-slate-600 mb-1">{metric.label}</h4>
                          <div className="flex items-baseline">
                            <span className="text-2xl font-bold text-adfi-slate-900 mr-2">
                              {metric.value}
                            </span>
                            <span className="text-sm text-emerald-500 font-medium">
                              {metric.change}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start">
                  <ShieldAlert className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-sm text-amber-800">
                    <strong>Note importante :</strong> Les performances réelles peuvent varier selon vos campagnes, votre audience et de nombreux facteurs externes. Les résultats présentés sont des objectifs potentiels et non une garantie.
                  </p>
                </div>
                
                <div className="mt-8 flex justify-center">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}