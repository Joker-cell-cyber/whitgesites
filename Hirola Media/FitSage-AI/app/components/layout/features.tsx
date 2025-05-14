'use client';

import { useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';

// Caractéristiques principales
const features = [
  {
    id: 1,
    title: "Coach IA personnalisé",
    description: "Discutez avec votre coach IA personnel disponible 24/7 qui adapte vos entraînements à votre morphologie et vos objectifs.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
    illustration: (
      <svg className="w-full h-full" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="300" rx="10" fill="#1A2A36" />
        <circle cx="200" cy="110" r="60" fill="#0F1922" stroke="#00B8A9" strokeWidth="2" />
        <path d="M200 80C183.431 80 170 93.4315 170 110C170 126.569 183.431 140 200 140C216.569 140 230 126.569 230 110C230 93.4315 216.569 80 200 80Z" fill="#1E293B" stroke="#00B8A9" strokeWidth="2" />
        <path d="M180 110C180 113.314 177.314 116 174 116C170.686 116 168 113.314 168 110C168 106.686 170.686 104 174 104C177.314 104 180 106.686 180 110Z" fill="#00B8A9" />
        <path d="M212 110C212 113.314 209.314 116 206 116C202.686 116 200 113.314 200 110C200 106.686 202.686 104 206 104C209.314 104 212 106.686 212 110Z" fill="#00B8A9" />
        <path d="M190 126C193.5 130 206.5 130 210 126" stroke="#00B8A9" strokeWidth="2" strokeLinecap="round" />
        <rect x="120" y="190" width="160" height="60" rx="10" fill="#1E293B" stroke="#00848E" strokeWidth="2" />
        <path d="M140 210H260" stroke="#00848E" strokeWidth="2" strokeLinecap="round" />
        <path d="M140 230H220" stroke="#00848E" strokeWidth="2" strokeLinecap="round" />
        <path d="M250 190L280 160" stroke="#00B8A9" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 4" />
        <circle cx="290" cy="150" r="20" fill="#1E293B" stroke="#00B8A9" strokeWidth="2" />
        <path d="M285 150L290 155L295 145" stroke="#00B8A9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: 2,
    title: "Programmes sur mesure",
    description: "Des programmes d'entraînement entièrement personnalisés selon votre niveau, objectifs et équipement disponible.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 002-2V8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2h8zm-9-3h6v1h-6v-1zm0-3h6v1h-6v-1z" />
      </svg>
    ),
    illustration: (
      <svg className="w-full h-full" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="300" rx="10" fill="#1A2A36" />
        <rect x="80" y="60" width="240" height="180" rx="8" fill="#1E293B" stroke="#00848E" strokeWidth="2" />
        <rect x="100" y="90" width="70" height="20" rx="4" fill="#00B8A9" fillOpacity="0.2" stroke="#00B8A9" strokeWidth="2" />
        <rect x="100" y="120" width="200" height="10" rx="2" fill="#1F2937" />
        <rect x="100" y="140" width="180" height="10" rx="2" fill="#1F2937" />
        <rect x="100" y="160" width="160" height="10" rx="2" fill="#1F2937" />
        <rect x="100" y="180" width="140" height="10" rx="2" fill="#1F2937" />
        <rect x="100" y="200" width="120" height="10" rx="2" fill="#00B8A9" fillOpacity="0.3" />
        <circle cx="320" cy="85" r="20" fill="#1E293B" stroke="#00B8A9" strokeWidth="2" />
        <circle cx="320" cy="85" r="15" fill="#1E293B" stroke="#00B8A9" strokeDasharray="2 4" strokeWidth="2" />
        <path d="M315 85L320 90L325 80" stroke="#00B8A9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M200 200L220 180L240 220" stroke="#00848E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: 3,
    title: "Nutrition intelligente",
    description: "Plans nutritionnels précis calculés selon vos besoins caloriques, préférences alimentaires et allergies.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    illustration: (
      <svg className="w-full h-full" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="300" rx="10" fill="#1A2A36" />
        <circle cx="200" cy="150" r="100" fill="#1E293B" stroke="#00848E" strokeWidth="2" />
        <path d="M200 80V150" stroke="#00B8A9" strokeWidth="4" strokeLinecap="round" />
        <path d="M200 150L260 180" stroke="#00B8A9" strokeWidth="4" strokeLinecap="round" />
        <path fillRule="evenodd" clipRule="evenodd" d="M200 190C222.091 190 240 172.091 240 150C240 127.909 222.091 110 200 110C177.909 110 160 127.909 160 150C160 172.091 177.909 190 200 190Z" fill="#00848E" fillOpacity="0.2" />
        <circle cx="200" cy="150" r="15" fill="#00B8A9" fillOpacity="0.4" stroke="#00B8A9" strokeWidth="2" />
        <circle cx="120" cy="100" r="20" fill="#1E293B" stroke="#00B8A9" strokeWidth="2" />
        <path d="M120 90V100H130" stroke="#00B8A9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M260 110C280 110 290 90 290 90" stroke="#00848E" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 4" />
        <circle cx="300" cy="80" r="20" fill="#1E293B" stroke="#00848E" strokeWidth="2" />
        <path d="M290 80H300V90" stroke="#00848E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M140 200C120 210 110 240 110 240" stroke="#00B8A9" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 4" />
        <circle cx="100" cy="250" r="20" fill="#1E293B" stroke="#00B8A9" strokeWidth="2" />
        <path d="M95 250L100 255L105 245" stroke="#00B8A9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: 4,
    title: "Analyse IA",
    description: "Votre assistant IA analyse vos performances et vos progrès pour vous donner des conseils personnalisés.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    illustration: (
      <svg className="w-full h-full" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="300" rx="10" fill="#1A2A36" />
        <rect x="80" y="60" width="240" height="180" rx="8" fill="#1E293B" stroke="#00848E" strokeWidth="2" />
        <path d="M120 200L160 150L200 180L240 120L280 160" stroke="#00B8A9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="160" cy="150" r="6" fill="#00B8A9" />
        <circle cx="200" cy="180" r="6" fill="#00B8A9" />
        <circle cx="240" cy="120" r="6" fill="#00B8A9" />
        <circle cx="280" cy="160" r="6" fill="#00B8A9" />
        <path d="M120 120L280 120" stroke="#2C3E50" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 4" />
        <path d="M120 150L280 150" stroke="#2C3E50" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 4" />
        <path d="M120 180L280 180" stroke="#2C3E50" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 4" />
        <rect x="100" y="80" width="60" height="20" rx="4" fill="#00848E" fillOpacity="0.2" stroke="#00848E" strokeWidth="1" />
        <rect x="170" y="80" width="60" height="20" rx="4" fill="#00848E" fillOpacity="0.1" stroke="#00848E" strokeWidth="1" />
        <rect x="240" y="80" width="60" height="20" rx="4" fill="#00848E" fillOpacity="0.1" stroke="#00848E" strokeWidth="1" />
        <path d="M120 220L280 220" stroke="#00848E" strokeWidth="2" strokeLinecap="round" />
        <circle cx="240" cy="220" r="5" fill="#00B8A9" />
        <circle cx="320" cy="60" r="20" fill="#1E293B" stroke="#00B8A9" strokeWidth="2" />
        <path d="M313 60L318 65L328 55" stroke="#00B8A9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
];

// Fonctionnalités secondaires
const secondaryFeatures = [
  {
    title: "Programmes personnalisés",
    description: "Création de programmes adaptés à vos objectifs et votre niveau."
  },
  {
    title: "Conseils nutritionnels",
    description: "Recommandations alimentaires basées sur vos besoins et préférences."
  },
  {
    title: "Suivi des progrès",
    description: "Analyse de vos performances par l'assistant IA pour des conseils adaptés."
  },
  {
    title: "Support IA 24/7",
    description: "Accès à votre coach IA personnel à tout moment pour des conseils."
  }
];

export default function Features() {
  const [activeTab, setActiveTab] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [tabsRef, tabsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [secondaryRef, secondaryInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section 
      id="features" 
      className="py-24 relative overflow-hidden bg-gradient-to-b from-fs-slate-900 to-fs-slate-800"
      ref={ref}
    >
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 fs-grid-pattern opacity-5"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fs-teal-500/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fs-teal-500/30 to-transparent"></div>
      
      <div className="container px-6 mx-auto relative z-10">
        {/* En-tête de section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div 
            className="inline-flex items-center px-4 py-2 rounded-full bg-fs-teal-900/60 border border-fs-teal-500/30 backdrop-blur-sm mb-6 transition-all duration-700 transform"
            style={{ 
              opacity: inView ? 1 : 0, 
              transform: inView ? 'translateY(0)' : 'translateY(20px)' 
            }}
          >
            <span className="mr-2 inline-block w-2 h-2 rounded-full bg-fs-teal-400 animate-pulse"></span>
            <span className="text-fs-teal-100 text-sm">Fonctionnalités intelligentes</span>
          </div>
          
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight transition-all duration-700 delay-100 transform"
            style={{ 
              opacity: inView ? 1 : 0, 
              transform: inView ? 'translateY(0)' : 'translateY(20px)' 
            }}
          >
            Des outils <span className="fs-gradient-text bg-gradient-to-r from-fs-teal-400 to-fs-blue-400 text-transparent bg-clip-text">révolutionnaires</span> pour votre transformation
          </h2>
          
          <p 
            className="text-lg text-fs-slate-200 transition-all duration-700 delay-200 transform"
            style={{ 
              opacity: inView ? 1 : 0, 
              transform: inView ? 'translateY(0)' : 'translateY(20px)' 
            }}
          >
            Notre technologie d'intelligence artificielle utilise des algorithmes avancés pour créer des programmes personnalisés optimisés pour vos objectifs.
          </p>
        </div>
        
        {/* Fonctionnalités principales avec tabs */}
        <div 
          className="mb-24" 
          ref={tabsRef}
        >
          {/* Navigation par onglets */}
          <div 
            className="flex flex-wrap justify-center gap-4 mb-12 transition-all duration-700 delay-300 transform"
            style={{ 
              opacity: tabsInView ? 1 : 0, 
              transform: tabsInView ? 'translateY(0)' : 'translateY(20px)' 
            }}
          >
            {features.map((feature, index) => (
              <button
                key={feature.id}
                onClick={() => setActiveTab(index)}
                className={`px-5 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === index 
                    ? 'bg-gradient-to-r from-fs-teal-600 to-fs-blue-600 text-white shadow-lg shadow-fs-teal-900/50' 
                    : 'bg-fs-slate-800 hover:bg-fs-slate-700 text-fs-slate-300 hover:text-white border border-fs-slate-700'
                }`}
              >
                <span className="flex items-center">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                    activeTab === index 
                      ? 'bg-white/10' 
                      : 'bg-fs-teal-900/60'
                  }`}>
                    <span className={activeTab === index ? 'text-white' : 'text-fs-teal-400'}>
                      {feature.icon}
                    </span>
                  </span>
                  {feature.title}
                </span>
              </button>
            ))}
          </div>
          
          {/* Contenu de l'onglet actif */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Illustration de la fonctionnalité */}
            <div 
              className="relative order-2 md:order-1 transition-all duration-700 delay-400 transform"
              style={{ 
                opacity: tabsInView ? 1 : 0, 
                transform: tabsInView ? 'translateY(0)' : 'translateY(20px)' 
              }}
            >
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden mx-auto max-w-lg bg-fs-slate-950 border border-fs-slate-800 shadow-xl">
                <div className="fs-glow absolute inset-0 bg-gradient-to-tr from-fs-teal-500/20 via-fs-blue-500/10 to-transparent rounded-xl opacity-60 blur-xl"></div>
                
                {/* Illustration SVG au lieu de l'image */}
                <div className="relative z-10 w-full h-full p-4">
                  {features[activeTab].illustration}
                </div>
                
                {/* Overlay de l'interface */}
                <div className="absolute inset-0 bg-gradient-to-t from-fs-slate-900/80 via-transparent to-transparent"></div>
                
                {/* Interface de données */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="p-3 bg-fs-slate-900/80 backdrop-blur-sm border border-fs-teal-500/20 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-white font-medium">{features[activeTab].title}</div>
                      <div className="flex gap-1">
                        {[1, 2, 3].map((dot) => (
                          <div key={dot} className="w-1 h-1 rounded-full bg-fs-teal-400"></div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      {[
                        { label: "Précision", value: "98%" },
                        { label: "Efficacité", value: "+45%" },
                        { label: "Adaptation", value: "24/7" }
                      ].map((stat, i) => (
                        <div key={i} className="p-2 bg-fs-slate-800/60 rounded-md">
                          <div className="text-fs-teal-400 font-bold">{stat.value}</div>
                          <div className="text-fs-slate-300">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Badge dans le coin */}
                <div className="absolute top-3 right-3 px-2 py-1 bg-fs-teal-900/80 backdrop-blur-sm rounded-md border border-fs-teal-500/30 text-xs text-fs-teal-300 font-medium">
                  Technologie NeuraCore™
                </div>
              </div>
              
              {/* Élément flottant */}
              <div className="absolute -bottom-6 -left-6 w-40 p-3 bg-fs-slate-900/90 backdrop-blur-sm border border-fs-blue-500/30 rounded-lg shadow-lg animate-float">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-full bg-fs-blue-900/80 flex items-center justify-center">
                    <svg className="w-4 h-4 text-fs-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="text-white text-xs font-medium">IA active</div>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-fs-slate-300">Analyse en cours</span>
                  <span className="text-fs-blue-400">86%</span>
                </div>
                <div className="mt-1.5 h-1 bg-fs-slate-700 rounded-full overflow-hidden">
                  <div className="h-full w-[86%] bg-gradient-to-r from-fs-teal-500 to-fs-blue-500 rounded-full"></div>
                </div>
              </div>
            </div>
            
            {/* Description de la fonctionnalité */}
            <div 
              className="order-1 md:order-2 transition-all duration-700 delay-500 transform"
              style={{ 
                opacity: tabsInView ? 1 : 0, 
                transform: tabsInView ? 'translateY(0)' : 'translateY(20px)' 
              }}
            >
              <div className="space-y-6 fs-feature-content">
                <h3 className="text-3xl font-bold text-white">
                  {features[activeTab].title}
                </h3>
                
                <p className="text-lg text-fs-slate-200">
                  {features[activeTab].description}
                </p>
                
                <div className="space-y-4">
                  {[
                    {
                      title: "Intelligence prédictive",
                      description: "Notre IA analyse vos performances pour anticiper vos besoins et ajuster vos programmes en temps réel."
                    },
                    {
                      title: "Recommandations personnalisées",
                      description: "Des conseils uniques basés sur votre profil, historique d'entraînement et objectifs personnels."
                    },
                    {
                      title: "Adaptation continue",
                      description: "Votre programme évolue avec vous pour assurer une progression constante et optimale."
                    }
                  ].map((item, i) => (
                    <div key={i} className="flex">
                      <div className="h-10 w-10 rounded-full bg-fs-teal-900/60 flex items-center justify-center mr-4 flex-shrink-0 border border-fs-teal-500/30">
                        <span className="text-fs-teal-400">{i + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-white mb-1">{item.title}</h4>
                        <p className="text-fs-slate-300 text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="pt-6">
                  <Link 
                    href="/#pricing" 
                    className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-fs-teal-600 to-fs-blue-600 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-fs-teal-900/50 transform hover:-translate-y-1"
                  >
                    <span>Essayer maintenant</span>
                    <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Fonctionnalités secondaires */}
        <div 
          ref={secondaryRef}
          className="max-w-6xl mx-auto transition-all duration-700 transform"
          style={{ 
            opacity: secondaryInView ? 1 : 0, 
            transform: secondaryInView ? 'translateY(0)' : 'translateY(20px)' 
          }}
        >
          <h3 className="text-2xl font-bold text-white text-center mb-12">
            Et bien plus encore
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {secondaryFeatures.map((feature, index) => (
              <div 
                key={index}
                className="bg-fs-slate-800/60 backdrop-blur-sm border border-fs-slate-700 hover:border-fs-teal-500/30 rounded-xl p-6 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg hover:shadow-fs-teal-900/20"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-10 h-10 mb-4 rounded-full bg-fs-teal-900/60 flex items-center justify-center border border-fs-teal-500/30">
                  <svg className="h-5 w-5 text-fs-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <h4 className="text-lg font-medium text-white mb-2">
                  {feature.title}
                </h4>
                
                <p className="text-fs-slate-300 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
          
          {/* Appel à l'action */}
          <div className="text-center mt-12">
            <Link 
              href="/features" 
              className="inline-flex items-center px-5 py-2.5 rounded-lg bg-fs-slate-800 hover:bg-fs-slate-700 text-fs-teal-300 hover:text-white border border-fs-slate-700 transition-all duration-300"
            >
              <span>Découvrir toutes les fonctionnalités</span>
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}