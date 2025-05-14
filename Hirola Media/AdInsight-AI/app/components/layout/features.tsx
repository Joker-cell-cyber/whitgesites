'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { BarChart, PieChart, Share2, Lightbulb, TrendingUp, Zap, LineChart, ArrowUpRight, Activity, Database, ArrowRight } from 'lucide-react';

// Caractéristiques avec icônes
const features = [
  {
    id: 1,
    title: "Analyse détaillée des audiences",
    description: "Explorez et comprenez le comportement de vos audiences grâce à notre analyse basée sur l'IA.",
    icon: BarChart,
    color: "bg-adfi-blue-50 text-adfi-blue-600"
  },
  {
    id: 2,
    title: "Analyse des créatifs",
    description: "Évaluez les performances de vos visuels et recevez des suggestions pour améliorer l'engagement.",
    icon: Lightbulb,
    color: "bg-amber-50 text-amber-600"
  },
  {
    id: 3,
    title: "Analyse des tendances",
    description: "Identifiez les tendances de vos campagnes pour ajuster votre stratégie en fonction des données historiques.",
    icon: TrendingUp,
    color: "bg-emerald-50 text-emerald-600"
  }
];

export default function Features() {
  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [spotlightRef, spotlightInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  
  const [illustrationRef, illustrationInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section id="features" className="py-24 bg-gradient-to-b from-white to-adfi-slate-50 relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 adfi-dot-pattern opacity-5"></div>
      
      {/* Pattern de lignes */}
      <div className="absolute right-0 top-0 h-full w-1/4 opacity-10">
        <div className="absolute top-0 left-1/2 h-full w-px bg-gradient-to-b from-adfi-blue-200/0 via-adfi-blue-500/30 to-adfi-blue-200/0"></div>
      </div>
      
      <div className="absolute left-0 top-0 h-full w-1/4 opacity-10">
        <div className="absolute top-0 left-1/2 h-full w-px bg-gradient-to-b from-adfi-blue-200/0 via-adfi-blue-500/30 to-adfi-blue-200/0"></div>
      </div>
      
      <div className="container max-w-6xl mx-auto px-6 relative z-10">
        {/* En-tête de section */}
        <div 
          ref={featuresRef}
          className="text-center max-w-3xl mx-auto mb-20"
          style={{
            opacity: featuresInView ? 1 : 0,
            transform: featuresInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease'
          }}
        >
          <div className="inline-flex items-center px-4 py-2 bg-adfi-blue-50 text-adfi-blue-600 rounded-full mb-6">
            <span className="text-sm font-medium">Puissant & Intuitif</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-adfi-slate-900 mb-6">
            Des outils pour <span className="text-adfi-blue-600">comprendre</span> vos performances
          </h2>
          
          <p className="text-xl text-adfi-slate-600 leading-relaxed">
            Notre suite d'outils d'analyse vous aide à mieux comprendre et optimiser vos campagnes Facebook Ads grâce à des données détaillées.
          </p>
        </div>

        {/* Grille de fonctionnalités */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            
            return (
              <div 
                key={feature.id}
                className="bg-white rounded-xl p-6 border border-adfi-slate-200 shadow-sm hover:shadow-lg hover:border-adfi-blue-200 transition-all duration-300 transform hover:-translate-y-1"
                style={{
                  opacity: featuresInView ? 1 : 0,
                  transform: featuresInView ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 0.7s ease, transform 0.7s ease',
                  transitionDelay: `${index * 100}ms`
                }}
              >
                <div className="flex flex-col h-full">
                  <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-5`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-adfi-slate-900 mb-3">
                    {feature.title}
                  </h3>
                  
                  <p className="text-adfi-slate-600 flex-grow mb-4">
                    {feature.description}
                  </p>
                  
                  <div className="h-1 w-12 bg-gradient-to-r from-adfi-blue-400 to-adfi-blue-600 rounded-full"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Fonctionnalité phare */}
        <div 
          ref={spotlightRef}
          className="mb-24"
          style={{
            opacity: spotlightInView ? 1 : 0,
            transform: spotlightInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease'
          }}
        >
          <div className="bg-white rounded-2xl overflow-hidden border border-adfi-slate-200 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-10 lg:p-12 flex flex-col justify-center">
                <div className="inline-flex items-center space-x-2 bg-adfi-blue-50 text-adfi-blue-600 px-4 py-2 rounded-full w-fit mb-6">
                  <span className="text-sm font-medium">Fonctionnalité phare</span>
                </div>
                
                <h3 className="text-2xl lg:text-3xl font-bold text-adfi-slate-900 mb-6">
                  Analyse avancée des données
                </h3>
                
                <p className="text-adfi-slate-600 mb-8 text-lg">
                  Notre système analyse vos données historiques pour vous aider à identifier les tendances et les opportunités d'amélioration. Prenez des décisions éclairées basées sur des données concrètes.
                </p>
                
                <ul className="space-y-4">
                  {[
                    "Analyse détaillée des performances par segment",
                    "Identification des tendances significatives",
                    "Suggestions d'optimisation basées sur vos données",
                    "Suivi des indicateurs clés de performance"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-adfi-blue-50 border border-adfi-blue-100 flex items-center justify-center text-adfi-blue-600 mr-3 flex-shrink-0">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-adfi-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-gradient-to-r from-adfi-blue-500 to-adfi-blue-600 lg:rounded-l-3xl p-8 lg:p-10 flex items-center justify-center relative overflow-hidden">
                {/* Motifs décoratifs */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 left-1/4 h-full w-px bg-white"></div>
                  <div className="absolute top-0 left-2/4 h-full w-px bg-white"></div>
                  <div className="absolute top-0 left-3/4 h-full w-px bg-white"></div>
                  <div className="absolute left-0 top-1/4 w-full h-px bg-white"></div>
                  <div className="absolute left-0 top-2/4 w-full h-px bg-white"></div>
                  <div className="absolute left-0 top-3/4 w-full h-px bg-white"></div>
                </div>
                
                {/* Illustration SVG interactive au lieu de l'image */}
                <div className="relative z-10 w-full max-w-lg bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-2xl">
                  <div className="mb-5 flex justify-between items-center">
                    <div className="bg-white/20 rounded-lg px-3 py-1.5 backdrop-blur-sm">
                      <h4 className="text-white text-sm font-medium">Dashboard d'IA prédictive</h4>
                    </div>
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-white/30"></div>
                      <div className="w-2 h-2 rounded-full bg-white/30"></div>
                      <div className="w-2 h-2 rounded-full bg-white/30"></div>
                    </div>
                  </div>
                  
                  {/* Section des KPIs */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {[
                      { label: "ROAS", value: "2.8x", icon: Activity, change: "+15%" },
                      { label: "CTR", value: "3.2%", icon: ArrowUpRight, change: "+8%" },
                      { label: "Conv.", value: "12.5%", icon: ArrowRight, change: "+5%" },
                    ].map((kpi, i) => {
                      const IconComponent = kpi.icon;
                      return (
                        <div key={i} className="bg-white/10 rounded-lg p-3 border border-white/10">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-white/70 text-xs">{kpi.label}</span>
                            <IconComponent className="w-3 h-3 text-white/70" />
                          </div>
                          <div className="text-white font-bold text-xl mb-1">{kpi.value}</div>
                          <div className="text-emerald-300 text-xs">{kpi.change}</div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Graphique principal */}
                  <div className="bg-white/10 rounded-lg p-4 border border-white/10 mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-white text-sm">Performance prédictive</span>
                      <div className="flex space-x-2">
                        <div className="flex items-center text-xs">
                          <div className="w-2 h-2 bg-sky-400 rounded-full mr-1"></div>
                          <span className="text-white/70">Actuel</span>
                        </div>
                        <div className="flex items-center text-xs">
                          <div className="w-2 h-2 bg-emerald-400 rounded-full mr-1"></div>
                          <span className="text-white/70">Prédiction</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Graphique en SVG */}
                    <div className="h-20 relative">
                      {/* Lignes de grille */}
                      {[0, 1, 2, 3].map((i) => (
                        <div key={i} className="absolute w-full h-px bg-white/10" style={{top: `${i * 33}%`}}></div>
                      ))}
                      
                      {/* Courbe actuelle */}
                      <svg className="absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path 
                          d="M0,60 C10,50 20,80 30,70 C40,60 50,50 60,40 C70,30 80,45 90,35 L90,100 L0,100 Z" 
                          fill="rgba(56, 189, 248, 0.2)" 
                        />
                        <path 
                          d="M0,60 C10,50 20,80 30,70 C40,60 50,50 60,40 C70,30 80,45 90,35" 
                          fill="none" 
                          stroke="rgb(56, 189, 248)" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                        />
                      </svg>
                      
                      {/* Courbe prédictive */}
                      <svg className="absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path 
                          d="M90,35 C95,30 97,25 100,20" 
                          fill="none" 
                          stroke="rgb(52, 211, 153)" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeDasharray="3 3" 
                        />
                      </svg>
                      
                      {/* Points de données */}
                      <div className="absolute w-3 h-3 rounded-full bg-white border-2 border-sky-400"
                        style={{left: `90%`, top: `35%`, transform: 'translate(-50%, -50%)'}}></div>
                      <div className="absolute w-3 h-3 rounded-full bg-white border-2 border-emerald-400"
                        style={{left: `100%`, top: `20%`, transform: 'translate(-50%, -50%)'}}></div>
                    </div>
                  </div>
                  
                  {/* Carte AI et données */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/10 rounded-lg p-3 border border-white/10">
                      <div className="flex items-center mb-2">
                        <Database className="w-4 h-4 text-white/70 mr-2" />
                        <span className="text-white text-sm">Données analysées</span>
                      </div>
                      <div className="grid grid-cols-4 gap-1">
                        {[...Array(12)].map((_, i) => (
                          <div key={i} 
                            className="h-1.5 rounded-full" 
                            style={{
                              backgroundColor: `rgba(255, 255, 255, ${0.1 + (i % 4) * 0.2})`,
                              width: '100%'
                            }}></div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 border border-white/10">
                      <div className="flex items-center mb-2">
                        <Zap className="w-4 h-4 text-white/70 mr-2" />
                        <span className="text-white text-sm">Prédiction IA</span>
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full w-3/4 bg-gradient-to-r from-emerald-400 to-sky-400 rounded-full"></div>
                        </div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full w-5/6 bg-gradient-to-r from-emerald-400 to-sky-400 rounded-full"></div>
                        </div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full w-2/3 bg-gradient-to-r from-emerald-400 to-sky-400 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Illustration du processus */}
        <div 
          ref={illustrationRef}
          className="max-w-5xl mx-auto text-center"
          style={{
            opacity: illustrationInView ? 1 : 0,
            transform: illustrationInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease'
          }}
        >
          <h3 className="text-2xl font-bold text-adfi-slate-900 mb-6">
            Comment notre plateforme optimise vos campagnes
          </h3>
          
          <p className="text-adfi-slate-600 max-w-3xl mx-auto mb-12">
            Un processus simple en trois étapes qui transforme vos données brutes en insights actionnables pour maximiser votre retour sur investissement publicitaire.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connecteur */}
            <div className="hidden md:block absolute top-1/3 left-0 right-0 h-0.5 bg-adfi-blue-200"></div>
            
            {["Connexion & Importation", "Analyse & Prédiction", "Optimisation & Scaling"].map((step, index) => (
              <div 
                key={index} 
                className="relative bg-white rounded-xl p-6 border border-adfi-slate-200 shadow-sm z-10"
                style={{
                  transitionDelay: `${index * 100 + 300}ms`
                }}
              >
                <div className="w-12 h-12 rounded-full bg-adfi-blue-500 flex items-center justify-center text-white mx-auto -mt-10 mb-6 border-4 border-white">
                  <span className="font-bold">{index + 1}</span>
                </div>
                
                <h4 className="text-lg font-semibold text-adfi-slate-900 mb-3">
                  {step}
                </h4>
                
                <p className="text-adfi-slate-600 text-sm">
                  {index === 0 && "Importez vos données Facebook Ads depuis un fichier CSV pour commencer l'analyse."}
                  {index === 1 && "Notre IA analyse vos données et génère des modèles prédictifs personnalisés pour vos campagnes."}
                  {index === 2 && "Appliquez nos recommandations pour optimiser vos performances et scaling vos meilleures campagnes."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}