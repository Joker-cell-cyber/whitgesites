'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check } from 'lucide-react';

const features = [
  {
    title: "Analyse des créatifs Facebook",
    description: "Analysez en profondeur les performances de vos différents formats publicitaires et identifiez les éléments visuels les plus performants.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    benefits: [
      "Analyse des éléments visuels performants",
      "Comparaison des formats publicitaires",
      "Optimisation des créatifs"
    ],
    color: "from-orange-500 to-yellow-600",
    gradientBg: "bg-gradient-to-br from-orange-500 to-yellow-600",
  },
  {
    title: "Analyse des audiences",
    description: "Identifiez vos meilleures audiences, analysez leur comportement et optimisez vos ciblages pour maximiser vos performances.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    benefits: [
      "Segmentation avancée des audiences",
      "Analyse des comportements",
      "Identification des meilleures combinaisons"
    ],
    color: "from-orange-600 to-orange-400",
    gradientBg: "bg-gradient-to-br from-orange-600 to-orange-400",
  },
  {
    title: "Analyse prédictive",
    description: "Prédisez les performances futures de vos campagnes, identifiez les tendances et anticipez les opportunités d'optimisation.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    benefits: [
      "Prévision des performances",
      "Détection des tendances",
      "Anticipation des cycles d'audience"
    ],
    color: "from-yellow-500 to-orange-500",
    gradientBg: "bg-gradient-to-br from-yellow-500 to-orange-500",
  }
];

export default function Features() {
  const { ref: sectionRef, inView: sectionInView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  return (
    <section id="features" ref={sectionRef} className="py-32 relative overflow-hidden bg-white">
      {/* Fond avec motif hexagonal */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-5"></div>
      
      {/* Effet de dégradé circulaire */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] rounded-full bg-gradient-to-br from-orange-50 via-yellow-50 to-white opacity-60 blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4 max-w-6xl">
        {/* En-tête de section */}
        <div className="text-center mb-20 space-y-4 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-sm font-medium"
          >
            <span className="flex h-2 w-2 rounded-full bg-orange-500 mr-2 animate-pulse"></span>
            Fonctionnalités
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900"
          >
            Analyse <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-yellow-500">intelligente</span> pour Facebook Ads
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Découvrez comment notre suite d'outils d'IA peut transformer vos campagnes publicitaires et maximiser votre ROI.
          </motion.p>
        </div>

        {/* Fonctionnalités */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="w-full"
            >
              <div className="group relative h-[450px] cursor-pointer">
                {/* Carte avant */}
                <div className="absolute inset-0 z-10 flex flex-col p-8 bg-white rounded-2xl shadow-lg border border-orange-100 transition-all duration-500 group-hover:opacity-0 group-hover:invisible">
                  {/* Badge de l'icône */}
                  <div className="mb-6 inline-flex p-3 rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 shadow-sm">
                    <div className={`text-transparent bg-clip-text bg-gradient-to-br ${feature.color}`}>
                      {feature.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 flex-grow text-lg">{feature.description}</p>
                  
                  <p className="mt-6 text-center text-sm text-orange-500 font-medium">
                    Survolez pour plus d'informations
                  </p>
                </div>
                
                {/* Carte arrière */}
                <div className={`absolute inset-0 z-0 flex flex-col p-8 ${feature.gradientBg} text-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 opacity-0 invisible group-hover:opacity-100 group-hover:visible`}>
                  <h3 className="text-2xl font-bold mb-6 text-white">
                    {feature.title}
                  </h3>
                  
                  <div className="flex-grow">
                    <ul className="space-y-6 mt-4">
                      {feature.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start">
                          <div className="flex-shrink-0 h-6 w-6 bg-white/20 rounded-full flex items-center justify-center mr-3">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                          <p className="text-xl font-medium text-white">{benefit}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Bannière de mise en valeur */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-orange-600 to-yellow-500 p-1"
        >
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-10"></div>
          
          <div className="relative rounded-xl bg-white/[0.02] backdrop-blur-sm p-8 md:p-12 overflow-hidden">
            {/* Effet de reflet */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="md:max-w-xl text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Prêt à transformer vos campagnes Facebook Ads?
                </h3>
                <p className="text-orange-100">
                  Utilisez notre plateforme d'analyse IA pour maximiser les performances de vos campagnes publicitaires.
                </p>
              </div>
              
              <div className="flex justify-center">
                <a href="#pricing" className="inline-block px-8 py-4 bg-white text-orange-600 font-medium rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-200 text-center">
                  Commencer
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}