"use client";

import React, { useRef, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

type ProcessStep = {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
};

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(1);
  const processContainerRef = useRef<HTMLDivElement>(null);
  
  // Utiliser des valeurs de seuil plus élevées et des marges pour améliorer la détection
  // rootMargin ajoute une marge autour de la zone de détection pour déclencher plus tôt
  const { ref: ref1, inView: inView1 } = useInView({ 
    threshold: 0.6, 
    triggerOnce: false,
    rootMargin: "-10% 0px -10% 0px" 
  });
  const { ref: ref2, inView: inView2 } = useInView({ 
    threshold: 0.6, 
    triggerOnce: false,
    rootMargin: "-10% 0px -10% 0px"
  });
  const { ref: ref3, inView: inView3 } = useInView({ 
    threshold: 0.6, 
    triggerOnce: false,
    rootMargin: "-10% 0px -10% 0px"
  });
  const { ref: ref4, inView: inView4 } = useInView({ 
    threshold: 0.6, 
    triggerOnce: false,
    rootMargin: "-10% 0px -10% 0px"
  });
  
  // Utiliser une approche plus simple pour la timeline
  const [timelineProgress, setTimelineProgress] = useState(0);
  
  // Mettre à jour l'étape active basée sur la visibilité
  useEffect(() => {
    if (inView1) {
      setActiveStep(1);
      setTimelineProgress(25);
    } else if (inView2) {
      setActiveStep(2);
      setTimelineProgress(50);
    } else if (inView3) {
      setActiveStep(3);
      setTimelineProgress(75);
    } else if (inView4) {
      setActiveStep(4);
      setTimelineProgress(100);
    }
  }, [inView1, inView2, inView3, inView4]);
  
  // Observer pour le conteneur principal - seulement pour détecter l'entrée/sortie
  const { ref: processRef } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });
  
  // Combiner les références
  const setProcessContainerRefs = (el: HTMLDivElement | null) => {
    processRef(el);
    if (el) {
      processContainerRef.current = el;
    }
  };
  
  const processSteps: ProcessStep[] = [
    {
      number: "01",
      title: "Discovery",
      description: "We explore your objectives, identity and needs to define the creative vision.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      color: "bg-teal-500"
    },
    {
      number: "02",
      title: "Design",
      description: "We create mockups and prototypes that translate your ideas into coherent design.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      ),
      color: "bg-yellow-500"
    },
    {
      number: "03",
      title: "Creation",
      description: "We meticulously develop every aspect of the design for a perfect result.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      color: "bg-teal-600"
    },
    {
      number: "04",
      title: "Launch",
      description: "We finalize and deliver your project with support and follow-up to ensure your success.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      color: "bg-yellow-600"
    }
  ];
  
  // Variants pour les animations Framer Motion
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    active: { scale: 1, opacity: 1 },
    inactive: { scale: 0.98, opacity: 0.7 }
  };
  
  return (
    <section className="py-24 relative overflow-hidden" ref={setProcessContainerRefs}>
      {/* Background avec motif */}
      <div className="absolute inset-0 bg-white dark:bg-gray-900 opacity-50 pattern-grid"></div>
      
      <div className="container mx-auto px-4 relative">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <span className="inline-block px-3 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-full text-sm font-medium mb-4">OUR PROCESS</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How we <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-yellow-500">transform</span> your ideas
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Our proven method ensures exceptional results at every stage of the creative process.
          </p>
        </motion.div>
        
        <div className="relative">
          {/* Timeline verticale simplifiée */}
          <div className="absolute left-[50%] top-0 bottom-0 w-1 bg-gray-200 dark:bg-gray-700 transform -translate-x-1/2 hidden md:block">
            <motion.div 
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-teal-500 to-yellow-500"
              initial={{ height: "0%" }}
              animate={{ height: `${timelineProgress}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            ></motion.div>
          </div>
          
          <div className="space-y-24 relative">
            {processSteps.map((step, index) => {
              const isEven = index % 2 === 0;
              const refs = [ref1, ref2, ref3, ref4];
              const currentRef = refs[index];
              const isActive = activeStep === index + 1;
              
              return (
                <div 
                  key={index}
                  ref={currentRef}
                  className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}
                >
                  <motion.div 
                    className={`w-full md:w-1/2 mb-8 md:mb-0 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}
                    variants={cardVariants}
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    animate={isActive ? "active" : "inactive"}
                    viewport={{ once: false, amount: 0.4 }}
                  >
                    <motion.div 
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 md:p-10 relative overflow-hidden group"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className={`absolute top-0 left-0 w-2 h-full ${step.color}`}></div>
                      <div className="relative">
                        <div className="flex items-center mb-6">
                          <motion.div 
                            className={`${step.color} text-white w-14 h-14 rounded-full flex items-center justify-center mr-4`}
                            initial={{ scale: 0.8 }}
                            animate={{ scale: isActive ? 1.1 : 1 }}
                            transition={{ duration: 0.4 }}
                          >
                            {step.icon}
                          </motion.div>
                          <div>
                            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">{step.number}</span>
                            <h3 className="text-2xl font-bold">{step.title}</h3>
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-lg">
                          {step.description}
                        </p>
                        
                        <motion.div 
                          className="mt-8 h-1 bg-gradient-to-r from-teal-500 to-yellow-500 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: "100%" }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          viewport={{ once: false, amount: 0.8 }}
                        ></motion.div>
                      </div>
                    </motion.div>
                  </motion.div>
                  
                  {/* Point de la timeline simplifié */}
                  <div className="hidden md:block relative w-8 h-8 z-10">
                    <motion.div 
                      className={`absolute top-0 left-0 w-8 h-8 rounded-full ${isActive ? 'bg-gradient-to-r from-teal-500 to-yellow-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                      animate={{ scale: isActive ? 1.2 : 1 }}
                      transition={{ duration: 0.4 }}
                    />
                    <motion.div 
                      className="absolute top-1 left-1 w-6 h-6 rounded-full bg-white dark:bg-gray-800"
                    />
                    <motion.div 
                      className={`absolute top-2 left-2 w-4 h-4 rounded-full ${isActive ? 'bg-gradient-to-r from-teal-500 to-yellow-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                    />
                  </div>
                  
                  {/* Espace vide pour le côté opposé */}
                  <div className="hidden md:block w-1/2"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .pattern-grid {
          background-image: radial-gradient(rgba(0, 128, 128, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </section>
  );
} 