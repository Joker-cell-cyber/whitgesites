'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/app/components/ui/button';
import Image from 'next/image';
import { 
  ArrowRight,
  DumbbellIcon,
  LineChart,
  BarChart3,
  Utensils,
  Zap,
  SparklesIcon,
  ArrowUpRight,
  HeartIcon,
  TimerIcon,
  FlameIcon,
  Brain
} from 'lucide-react';
import Link from 'next/link';

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(0);
  
  const features = [
    {
      title: "Coach IA personnalisé",
      description: "Discutez avec votre coach IA personnel qui vous guide dans votre parcours fitness avec des conseils adaptés à vos objectifs.",
      icon: <Brain className="h-6 w-6 text-[#A590DC]" />,
    },
    {
      title: "Programmes d'entraînement sur mesure",
      description: "Obtenez des programmes d'entraînement personnalisés selon votre niveau, équipement disponible et objectifs spécifiques.",
      icon: <DumbbellIcon className="h-6 w-6 text-[#F5BA8D]" />,
    },
    {
      title: "Plans nutritionnels adaptés",
      description: "Créez des plans alimentaires personnalisés respectant vos préférences alimentaires, allergies et objectifs caloriques.",
      icon: <Utensils className="h-6 w-6 text-[#99CDEF]" />,
    },
  ];
  
  const benefitItems = [
    {
      title: "JAMBES",
      description: "Programmes spécifiques pour le développement et le renforcement des muscles des jambes.",
      color: "nrl-card-lavender",
      icon: <HeartIcon className="h-6 w-6 text-[#A590DC]" />,
    },
    {
      title: "BRAS",
      description: "Exercices ciblés pour sculpter et renforcer les biceps, triceps et avant-bras.",
      color: "nrl-card-mint",
      icon: <TimerIcon className="h-6 w-6 text-[#8ECCAA]" />,
    },
    {
      title: "DOS",
      description: "Séances adaptées pour développer un dos fort et équilibré.",
      color: "nrl-card-peach",
      icon: <FlameIcon className="h-6 w-6 text-[#F5BA8D]" />,
    },
  ];
  
  return (
    <section className="nrl-section relative overflow-hidden bg-white" id="features">
      {/* Éléments de décoration */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#FBFAF6] to-transparent"></div>
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#E2D9F3]/30 blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#D3E9DD]/30 blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative py-16">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-[#F5F2FC] text-[#A590DC] text-sm font-medium border border-[#E2D9F3] mb-4"
          >
            Fonctionnalités
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-[#2A303D] mb-6"
          >
            Une suite complète <span className="text-[#A590DC]">d'outils</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-[#2A303D]/70 text-lg"
          >
            Découvrez nos outils d'IA avancés pour votre transformation physique
          </motion.p>
        </div>
        
        {/* Section des fonctionnalités en grille */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * idx }}
              viewport={{ once: true }}
              className={`nrl-card hover-lift ${idx === activeFeature ? 'border-[#A590DC] border-2' : ''}`}
              onMouseEnter={() => setActiveFeature(idx)}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#F5F2FC] flex items-center justify-center">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#2A303D] mb-2">{feature.title}</h3>
                  <p className="text-[#2A303D]/70">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Section avec image et liste de bénéfices */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-[#2A303D] mb-6">
              Des programmes d'entraînement pour chaque partie du corps
            </h3>
            
            <p className="text-[#2A303D]/70 text-lg mb-8">
              Obtenez des programmes d'entraînement personnalisés selon votre niveau, équipement disponible et objectifs spécifiques.
            </p>
            
            <div className="space-y-6">
              {benefitItems.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 * idx }}
                  viewport={{ once: true }}
                  className={`${item.color} rounded-xl p-4 hover-lift`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#2A303D] mb-1">{item.title}</h4>
                      <p className="text-sm text-[#2A303D]/70">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-10">
              <Button className="nrl-btn-primary group" asChild>
                <Link href="/pricing">
                  <span className="flex items-center">
                    Découvrir nos programmes
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              <div className="border-gradient rounded-2xl overflow-hidden shadow-xl">
                <div className="bg-white p-1 rounded-2xl overflow-hidden">
                  <div className="relative h-[400px] w-full rounded-xl overflow-hidden bg-gradient-to-br from-[#F5F2FC] to-[#E2D9F3]">
                    {/* Illustration vectorielle */}
                    <div className="absolute inset-0 p-6">
                      {/* En-tête */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[#A590DC] flex items-center justify-center">
                            <DumbbellIcon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-[#2A303D]">Programme d'entraînement</h4>
                            <p className="text-sm text-[#2A303D]/60">Niveau intermédiaire</p>
                          </div>
                        </div>
                        <div className="px-3 py-1.5 bg-[#E2D9F3] rounded-full">
                          <span className="text-sm font-medium text-[#A590DC]">4 séances</span>
                        </div>
                      </div>

                      {/* Grille d'exercices */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="bg-white rounded-lg p-4 shadow-sm">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-8 h-8 rounded-md bg-[#F5F2FC] flex items-center justify-center">
                                <span className="text-sm font-medium text-[#A590DC]">{i}</span>
                              </div>
                              <div className="flex-1">
                                <div className="h-3 bg-[#F5F2FC] rounded w-3/4 mb-1"></div>
                                <div className="h-2 bg-[#F5F2FC] rounded w-1/2"></div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <div className="h-2 bg-[#F5F2FC] rounded flex-1"></div>
                              <div className="h-2 bg-[#F5F2FC] rounded w-8"></div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Barre de progression */}
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-[#2A303D]">Progression</span>
                          <span className="text-sm font-medium text-[#A590DC]">75%</span>
                        </div>
                        <div className="h-2 bg-[#F5F2FC] rounded-full overflow-hidden">
                          <div className="h-full bg-[#A590DC] rounded-full" style={{ width: '75%' }}></div>
                        </div>
                      </div>

                      {/* Statistiques */}
                      <div className="grid grid-cols-3 gap-4 mt-6">
                        <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                          <div className="text-2xl font-bold text-[#A590DC] mb-1">12</div>
                          <div className="text-sm text-[#2A303D]/60">Exercices</div>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                          <div className="text-2xl font-bold text-[#A590DC] mb-1">45</div>
                          <div className="text-sm text-[#2A303D]/60">Minutes</div>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                          <div className="text-2xl font-bold text-[#A590DC] mb-1">4</div>
                          <div className="text-sm text-[#2A303D]/60">Séries</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Éléments flottants décoratifs */}
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-[#F0EBF8] rounded-lg shadow-md transform rotate-12 z-0"></div>
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-[#EBF5F0] rounded-lg shadow-md transform -rotate-6 z-0"></div>
            </div>
          </motion.div>
        </div>
        
        {/* Appel à l'action final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="glass-card max-w-3xl mx-auto p-8 relative">
            <h3 className="text-2xl font-bold text-[#2A303D] mb-4">Prêt à transformer votre condition physique?</h3>
            <p className="text-[#2A303D]/70 mb-6">Rejoignez-nous dès aujourd'hui et découvrez comment nos programmes personnalisés peuvent vous aider à atteindre vos objectifs.</p>
            <Button className="nrl-btn-accent group" asChild>
              <Link href="/pricing">
                <span className="flex items-center">
                  Commencer maintenant
                  <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
              </Link>
            </Button>
            
            {/* Élément décoratif */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#EBF5F0] rounded-full shadow"></div>
            <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-[#F0EBF8] rounded-full shadow"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}