'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const features = [
  {
    title: "Assistant IA basé sur la science",
    description: "Discutez avec votre assistant IA personnel qui vous guide avec des conseils adaptés à vos objectifs, s'appuyant sur des connaissances scientifiques à jour.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
    color: "from-red-500 to-orange-500"
  },
  {
    title: "Constructeur de programme sportif",
    description: "Générez facilement des programmes d'entraînement sur mesure selon votre niveau, équipement disponible et objectifs spécifiques.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 002-2V8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2h8zm-9-3h6v1h-6v-1zm0-3h6v1h-6v-1z" />
      </svg>
    ),
    color: "from-red-500 to-orange-500"
  },
  {
    title: "Constructeur de programme alimentaire",
    description: "Créez des plans alimentaires personnalisés respectant vos préférences, allergies et objectifs caloriques pour soutenir votre transformation.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    color: "from-red-500 to-orange-500"
  },
  {
    title: "Conseils personnalisés contextuels",
    description: "Obtenez des recommandations adaptées à votre profil, qui prennent en compte vos contraintes et objectifs spécifiques pour maximiser vos résultats.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    color: "from-red-500 to-orange-500"
  },
];

export default function Features() {
  const { ref: sectionRef, inView: sectionInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section id="features" ref={sectionRef} className="py-24 relative overflow-hidden bg-white">
      {/* Ligne séparatrice subtile */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gray-200"></div>

      <div className="container relative z-10 px-4 mx-auto">
        {/* En-tête de la section */}
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 rounded-full bg-orange-50 border border-orange-100"
          >
            <span className="text-orange-600 text-sm font-medium">
              Fonctionnalités
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-gray-900"
          >
            Tout ce dont vous avez besoin pour atteindre vos objectifs
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Des outils avancés, mais simples à utiliser, pour transformer votre condition physique
          </motion.p>
        </div>

        {/* Liste des fonctionnalités en grille */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className={`w-14 h-14 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-sm`}>
                          <div className="text-white w-8 h-8">
                            {feature.icon}
                          </div>
                  </div>
                </div>

                                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}