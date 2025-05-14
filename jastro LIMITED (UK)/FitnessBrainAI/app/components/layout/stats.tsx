'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { DumbbellIcon, BarChart3Icon, HeartPulseIcon, UsersIcon } from 'lucide-react';
import CountUp from 'react-countup';

export default function Stats() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const statsData = [
    {
      icon: <DumbbellIcon className="h-6 w-6 text-[#A590DC]" />,
      number: 100,
      suffix: '%',
      title: "Personnalisation",
      description: "Programmes adaptés à vos objectifs"
    },
    {
      icon: <BarChart3Icon className="h-6 w-6 text-[#8ECCAA]" />,
      number: 24,
      suffix: '/7',
      title: "Support IA",
      description: "Coach IA disponible 24/7"
    },
    {
      icon: <HeartPulseIcon className="h-6 w-6 text-[#F5BA8D]" />,
      number: 3,
      suffix: ' en 1',
      title: "Solutions intégrées",
      description: "Programmes, nutrition et coaching"
    },
    {
      icon: <UsersIcon className="h-6 w-6 text-[#99CDEF]" />,
      number: 1000,
      suffix: '+',
      title: "Exercices",
      description: "Base de données d'exercices"
    }
  ];
  
  return (
    <section ref={ref} className="nrl-section relative overflow-hidden nrl-gradient-bg">
      {/* Décorations de fond */}
      <div className="absolute inset-0 nrl-pastel-dot-pattern"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#A590DC] to-transparent opacity-30"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#A590DC] to-transparent opacity-30"></div>
      
      {/* Éléments décoratifs */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-[#E2D9F3]/40 blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-[#D3E9DD]/40 blur-[80px] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 rounded-full bg-[#F5F2FC] shadow-sm border border-[#E2D9F3] mb-4"
          >
            <span className="text-[#A590DC] text-sm font-medium">
              Les chiffres qui parlent
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold nrl-heading mb-6"
          >
            La plateforme fitness <span className="nrl-text-primary">complète</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto text-[#2A303D]/80"
          >
            Des résultats concrets grâce à notre approche complète: programmes, articles et coach IA
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="nrl-card hover-lift"
            >
              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-xl border-gradient p-2.5 mb-6 flex items-center justify-center ${
                  index === 0 ? "bg-[#F5F2FC]" : 
                  index === 1 ? "bg-[#E9F5EE]" : 
                  index === 2 ? "bg-[#FFF0E6]" : 
                  "bg-[#EEF6FD]"
                }`}>
                  {stat.icon}
                </div>
                
                <div className="mb-4">
                  <div className="flex items-end">
                    <span className="text-4xl md:text-5xl font-bold nrl-heading tracking-tight leading-none">
                      {inView ? (
                        <CountUp 
                          end={stat.number} 
                          duration={2.5} 
                          decimals={stat.number % 1 !== 0 ? 1 : 0}
                          separator=" "
                        />
                      ) : '0'}
                    </span>
                    <span className={`text-2xl md:text-3xl font-bold ml-1 ${
                      index === 0 ? "text-[#A590DC]" : 
                      index === 1 ? "text-[#8ECCAA]" : 
                      index === 2 ? "text-[#F5BA8D]" : 
                      "text-[#99CDEF]"
                    }`}>{stat.suffix}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold nrl-heading mb-2">
                  {stat.title}
                </h3>
                
                <p className="text-[#2A303D]/70">
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
            className="inline-block px-6 py-4 rounded-xl glass-card"
          >
            <span className="text-[#2A303D] text-sm font-medium">
              La plateforme complète pour <span className="nrl-text-primary font-bold">transformer votre condition physique</span>
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}