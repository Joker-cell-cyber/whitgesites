'use client';

import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { DumbbellIcon, UtensilsIcon, Brain } from "lucide-react";

export default function CTA() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  return (
    <section id="cta" ref={ref} className="nrl-section relative overflow-hidden nrl-gradient-bg">
      {/* Effet de fond */}
      <div className="absolute inset-0 nrl-pastel-dot-pattern"></div>
      
      {/* Séparateurs */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#A590DC] to-transparent opacity-50"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#A590DC] to-transparent opacity-50"></div>
      
      {/* Éléments décoratifs */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-[#E2D9F3]/40 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-[#D3E9DD]/40 blur-[100px] pointer-events-none"></div>
      
      {/* Éléments flottants */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute top-40 right-[15%] w-20 h-20 rounded-full bg-gradient-to-r from-[#E2D9F3] to-[#D3E9DD] border border-[#A590DC]/30 shadow-lg opacity-70"
        />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
          className="absolute bottom-40 left-[10%] w-12 h-12 rounded-full bg-gradient-to-r from-[#FBDDC8] to-[#F5BA8D] border border-[#F5BA8D]/30 shadow-lg opacity-70"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="glass-card border-gradient">
            <div className="px-6 py-12 md:p-16 relative">
              <div className="grid md:grid-cols-5 gap-8 items-center">
                <div className="md:col-span-3 space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="inline-block px-4 py-2 border border-[#A590DC]/30 rounded-full bg-[#F5F2FC] shadow-sm mb-4"
                  >
                    <span className="text-[#A590DC] text-sm font-medium flex items-center">
                      <span className="mr-2 inline-block w-2 h-2 rounded-full bg-[#A590DC] animate-pulse"></span>
                      Prêt à démarrer
                    </span>
                  </motion.div>
                  
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-3xl md:text-4xl font-bold nrl-heading leading-tight"
                  >
                    Prêt à transformer votre <span className="nrl-text-primary">condition physique</span> ?
                  </motion.h2>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-base md:text-lg text-[#2A303D]/80"
                  >
                    Commencez dès aujourd'hui avec votre coach IA personnel et découvrez comment nos programmes personnalisés peuvent vous aider à atteindre vos objectifs de fitness.
                  </motion.p>
                  
                  <div className="pt-2">
                    <ul className="space-y-4">
                      {[
                        {
                          text: "Programmes d'entraînement sur mesure",
                          icon: DumbbellIcon,
                          color: "bg-[#F5F2FC]",
                          iconColor: "text-[#A590DC]",
                          borderColor: "border-[#E2D9F3]"
                        },
                        {
                          text: "Plans nutritionnels personnalisés",
                          icon: UtensilsIcon,
                          color: "bg-[#FFF0E6]",
                          iconColor: "text-[#F5BA8D]",
                          borderColor: "border-[#FBDDC8]"
                        },
                        {
                          text: "Coach IA disponible 24/7",
                          icon: Brain,
                          color: "bg-[#E9F5EE]",
                          iconColor: "text-[#8ECCAA]",
                          borderColor: "border-[#D3E9DD]"
                        }
                      ].map((item, i) => (
                        <motion.li 
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                          className="flex items-center"
                        >
                          <div className={`flex-shrink-0 w-8 h-8 rounded-full ${item.color} flex items-center justify-center mr-3 ${item.borderColor} border shadow-sm`}>
                            <item.icon className={`w-4 h-4 ${item.iconColor}`} />
                          </div>
                          <span className="text-[#2A303D]/80">{item.text}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="md:col-span-2 flex flex-col items-center text-center space-y-6">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="w-32 h-32 rounded-full bg-gradient-to-r from-[#A590DC] to-[#8ECCAA] flex items-center justify-center shadow-lg shadow-[#A590DC]/20"
                  >
                    <div className="text-white text-4xl font-bold">FB</div>
                  </motion.div>                  
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={inView ? { y: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="w-full space-y-3"
                  >
                    <Link href="/register" className="block">
                      <Button variant="default" className="w-full h-12 text-base font-medium">
                        <span className="flex items-center">
                          Commencer maintenant
                          <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </span>
                      </Button>
                    </Link>
                    <Link href="/pricing" className="block">
                      <Button variant="outline" className="w-full h-12 text-base font-medium">
                        Voir les plans
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 