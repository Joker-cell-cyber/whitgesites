'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BrainIcon, MoonIcon, SparklesIcon, UsersIcon } from 'lucide-react';
import CountUp from 'react-countup';

export default function Stats() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const statsData = [
    {
      icon: <BrainIcon className="h-6 w-6 text-violet-500" />,
      number: 95,
      suffix: '%',
      title: "Précision SEO",
      description: "Taux de conformité aux bonnes pratiques"
    },
    {
      icon: <MoonIcon className="h-6 w-6 text-violet-500" />,
      number: 1500,
      suffix: '+',
      title: "Mots par article",
      description: "Longueur moyenne des articles générés"
    },
    {
      icon: <SparklesIcon className="h-6 w-6 text-violet-500" />,
      number: 65,
      suffix: '%',
      title: "Gain de temps",
      description: "Réduction du temps de création de contenu"
    },
    {
      icon: <UsersIcon className="h-6 w-6 text-violet-500" />,
      number: 45,
      suffix: 's',
      title: "Génération rapide",
      description: "Temps moyen pour générer un article"
    }
  ];
  
  return (
    <section ref={ref} className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-br from-violet-50 to-white">
      {/* Décorations de fond */}
      <div className="absolute inset-0 bg-[url('/dots-pattern.svg')] bg-repeat opacity-5"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-300 to-transparent opacity-30"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-300 to-transparent opacity-30"></div>
      
      {/* Éléments décoratifs */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-violet-400/10 blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-fuchsia-400/10 blur-[80px] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 rounded-full bg-violet-100 shadow-sm border border-violet-200 mb-4"
          >
            <span className="text-violet-800 text-sm font-medium">
              Performance et efficacité
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
          >
            La puissance de notre <span className="text-violet-600">générateur de contenu</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto text-gray-600"
          >
            Notre générateur de contenu utilise des algorithmes d'intelligence artificielle avancés pour créer rapidement des articles et descriptions optimisés pour les moteurs de recherche.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="bg-white rounded-xl border border-violet-100 shadow-lg p-6 md:p-8 relative overflow-hidden"
            >
              {/* Fond décoratif */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-50 to-fuchsia-50 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Cercle décoratif */}
              <div className="absolute -right-5 -bottom-5 w-24 h-24 rounded-full bg-gradient-to-br from-violet-100/30 to-fuchsia-100/30 blur-lg"></div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-100 to-fuchsia-100 flex items-center justify-center mb-6 border border-violet-200 shadow-sm">
                  {stat.icon}
                </div>
                
                <div className="mb-4">
                  <div className="flex items-end">
                    <span className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-none">
                      {inView ? (
                        <CountUp 
                          end={stat.number} 
                          duration={2.5} 
                          decimals={stat.number % 1 !== 0 ? 1 : 0}
                          separator=" "
                        />
                      ) : '0'}
                    </span>
                    <span className="text-2xl md:text-3xl font-bold text-violet-600 ml-1">{stat.suffix}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {stat.title}
                </h3>
                
                <p className="text-gray-600">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="inline-block px-6 py-4 rounded-xl bg-gradient-to-r from-violet-50 to-fuchsia-50 border border-violet-200 shadow-lg"
          >
            <span className="text-violet-800 text-sm font-medium">
              Basé sur les <span className="text-violet-600 font-bold">performances techniques</span> de notre moteur de génération
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}