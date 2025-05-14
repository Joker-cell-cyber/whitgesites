'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HeartHandshakeIcon, MessagesSquareIcon, FlameIcon, UserIcon } from 'lucide-react';
import CountUp from 'react-countup';

export default function Stats() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const statsData = [
    {
      icon: <HeartHandshakeIcon className="h-6 w-6 text-[#E46D4B]" />,
      number: 78,
      suffix: '%',
      title: "Plus de confiance",
      description: "en séduction après 1 mois"
    },
    {
      icon: <MessagesSquareIcon className="h-6 w-6 text-[#E16959]" />,
      number: 18300,
      suffix: '+',
      title: "Conversations générées",
      description: "par notre IA chaque jour"
    },
    {
      icon: <FlameIcon className="h-6 w-6 text-[#E8B93E]" />,
      number: 85,
      suffix: '%',
      title: "Taux de réponse",
      description: "aux messages suggérés"
    },
    {
      icon: <UserIcon className="h-6 w-6 text-[#E16959]" />,
      number: 97,
      suffix: '%',
      title: "Taux de satisfaction",
      description: "parmi nos abonnés"
    }
  ];
  
  return (
    <section ref={ref} className="yfc-section relative overflow-hidden yfc-gradient-bg">
      {/* Décorations de fond */}
      <div className="absolute inset-0 yfc-pattern-bg"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E46D4B] to-transparent opacity-30"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E46D4B] to-transparent opacity-30"></div>
      
      {/* Éléments décoratifs */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-[#F7C8BA]/40 blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-[#F9EAC1]/40 blur-[80px] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 rounded-full bg-[#F7C8BA] shadow-sm border border-[#E46D4B]/20 mb-4"
          >
            <span className="text-[#E46D4B] text-sm font-medium">
              Résultats prouvés
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold yfc-heading-accent mb-6"
          >
            Des résultats <span className="text-[#E8B93E]">passionnants</span> pour votre vie amoureuse
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto text-[#45301C]/80"
          >
            Notre assistant de séduction basé sur l'IA a déjà aidé des milliers d'utilisateurs à transformer leur vie sentimentale et à créer des connexions authentiques.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="yfc-card group"
            >
              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-sm
                  ${index === 0 ? "bg-[#F7C8BA] border border-[#E46D4B]/20" : 
                    index === 1 ? "bg-[#F9D8D4] border border-[#E16959]/20" : 
                    index === 2 ? "bg-[#F9EAC1] border border-[#E8B93E]/20" : 
                    "bg-[#F7C8BA] border border-[#E16959]/20"}`
                }>
                  {stat.icon}
                </div>
                
                <div className="mb-4">
                  <div className="flex items-end">
                    <span className="text-4xl md:text-5xl font-bold yfc-heading tracking-tight leading-none">
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
                      index === 0 ? "text-[#E46D4B]" : 
                      index === 1 ? "text-[#E16959]" : 
                      index === 2 ? "text-[#E8B93E]" : 
                      "text-[#E16959]"
                    }`}>{stat.suffix}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold yfc-heading mb-2">
                  {stat.title}
                </h3>
                
                <p className="text-[#45301C]/70">
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
            className="inline-block px-6 py-4 rounded-xl bg-white border border-[#E46D4B]/20 shadow-lg"
          >
            <span className="text-[#45301C] text-sm font-medium">
              Basé sur les données de plus de <span className="yfc-text-primary font-bold">28 000 utilisateurs</span> en 2024
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}