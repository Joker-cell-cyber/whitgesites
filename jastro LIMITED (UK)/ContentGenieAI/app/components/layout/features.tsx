'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/app/components/ui/button';
import Image from 'next/image';
import { 
  Waves,
  Sparkles,
  Shell,
  Fish,
  Ship,
  Anchor,
  CheckSquare
} from 'lucide-react';

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(0);

  const featuresData = [
    {
      title: "Génération d'articles optimisés",
      description: "Notre IA crée des articles de blog uniques et parfaitement optimisés pour les moteurs de recherche, avec une structure SEO efficace.",
      icon: <Sparkles className="h-6 w-6 text-[#26A69A]" />,
      color: "bg-[#E6F4F9]",
      borderColor: "border-[#BBE5EF]",
      image: "/interpreting-dreams.jpg"
    },
    {
      title: "Descriptions de produits SEO",
      description: "Créez des descriptions de produits convaincantes et optimisées pour le référencement, avec les bons mots-clés et une structure persuasive.",
      icon: <Waves className="h-6 w-6 text-[#1A7BA4]" />,
      color: "bg-[#D3E9DD]/50",
      borderColor: "border-[#D3E9DD]",
      image: "/guided-creation.jpg"
    },
    {
      title: "Optimisation automatique",
      description: "Notre algorithme analyse et optimise automatiquement le contenu pour les moteurs de recherche selon les meilleures pratiques SEO actuelles.",
      icon: <Shell className="h-6 w-6 text-[#18BDD9]" />,
      color: "bg-[#F7F5EF]",
      borderColor: "border-[#BBE5EF]",
      image: "/traditional-techniques.jpg"
    },
    {
      title: "Export multi-formats",
      description: "Exportez facilement votre contenu dans différents formats (HTML, Markdown, Word) pour une intégration simple sur votre site web.",
      icon: <Fish className="h-6 w-6 text-[#1A7BA4]" />,
      color: "bg-[#BBE5EF]/50",
      borderColor: "border-[#1A7BA4]/20",
      image: "/community.jpg"
    }
  ];
  
  const processes = [
    {
      title: "Analyse des mots-clés",
      description: "Notre IA identifie et analyse les mots-clés les plus pertinents pour votre contenu",
      icon: <Anchor className="h-6 w-6 text-[#14304D]" />
    },
    {
      title: "Génération de contenu",
      description: "Création d'articles uniques et optimisés selon vos spécifications SEO",
      icon: <Sparkles className="h-6 w-6 text-[#1A7BA4]" />
    },
    {
      title: "Optimisation et export",
      description: "Finalisation du contenu avec structure SEO et export dans le format souhaité",
      icon: <Waves className="h-6 w-6 text-[#26A69A]" />
    }
  ];

  return (
    <section className="onc-section onc-section-wave relative overflow-hidden onc-gradient-bg py-24" id="features">
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 onc-water-pattern opacity-70"></div>
      <div className="absolute bottom-0 left-0 right-0 h-40 opacity-50">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="#BBE5EF"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="#BBE5EF"></path>
        </svg>
      </div>
      
      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-1.5 rounded-lg bg-[#BBE5EF] text-[#14304D] text-sm font-medium border border-[#1A7BA4]/20 mb-4"
          >
            <Waves className="mr-2 h-4 w-4" />
            Fonctionnalités avancées
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-[#14304D] mb-6 onc-heading"
          >
            Des outils puissants pour votre <span className="onc-heading-underline">stratégie</span> SEO
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-[#14304D]/80 text-lg"
          >
            Notre plateforme combine intelligence artificielle avancée et expertise SEO pour créer du contenu parfaitement optimisé pour les moteurs de recherche.
          </motion.p>
        </div>
        
        {/* Affichage des fonctionnalités */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center mb-24">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {featuresData.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * idx }}
                  viewport={{ once: true }}
                  className={`${feature.color} rounded-lg p-5 ${feature.borderColor} border hover-lift cursor-pointer transition-all duration-300 ${activeFeature === idx ? 'shadow-md' : 'shadow-sm'}`}
                  onClick={() => setActiveFeature(idx)}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 p-2 bg-white rounded-md shadow-sm">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#14304D] mb-2">{feature.title}</h3>
                      <p className="text-sm text-[#14304D]/70">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-8"
            >
              <Button className="onc-btn-primary group">
                <span className="flex items-center">
                  Découvrir toutes nos fonctionnalités
                  <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              <div className="onc-card-ocean p-1 rounded-lg overflow-hidden shadow-lg">
                <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
                  <Image
                    src={featuresData[activeFeature].image || "/dream-craft-illustration.jpg"}
                    alt={featuresData[activeFeature].title}
                    fill
                    className="object-cover transition-all duration-700 ease-in-out"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14304D]/60 to-transparent"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{featuresData[activeFeature].title}</h3>
                    <p className="text-white/80 text-sm">{featuresData[activeFeature].description}</p>
                  </div>
                </div>
              </div>
              
              {/* Éléments décoratifs */}
              <div className="absolute -top-5 -left-5 w-12 h-12 bg-[#BBE5EF] rounded-lg shadow-md transform rotate-12 z-0"></div>
              <div className="absolute -bottom-5 -right-5 w-16 h-16 bg-[#1A7BA4]/20 rounded-lg shadow-md transform -rotate-6 z-0"></div>
              
              {/* Bulles décoratives */}
              <div className="absolute -right-3 top-1/4 w-4 h-4 rounded-full bg-[#BBE5EF]/70 animate-float-slow"></div>
              <div className="absolute -left-2 top-1/3 w-3 h-3 rounded-full bg-[#BBE5EF]/70 animate-float-slower"></div>
              <div className="absolute right-10 -bottom-2 w-5 h-5 rounded-full bg-[#BBE5EF]/70 animate-float"></div>
            </div>
          </motion.div>
        </div>
        
        {/* Section processus */}
        <div className="onc-section-wave pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-lg bg-[#D3E9DD] text-[#14304D] text-sm font-medium border border-[#26A69A]/20">
              Notre processus simplifié
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-[#14304D] mt-4">
              Du mot-clé au contenu optimisé
            </h3>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {processes.map((process, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * idx }}
                viewport={{ once: true }}
                className="onc-card-glass hover-lift"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <div className="absolute inset-0 bg-[#BBE5EF] rounded-full opacity-30 blur-sm"></div>
                    <div className="relative w-16 h-16 flex items-center justify-center bg-white rounded-full shadow-md border border-[#BBE5EF]">
                      {process.icon}
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#26A69A] flex items-center justify-center text-white text-xs font-bold">
                      {idx + 1}
                    </div>
                  </div>
                  
                  <h4 className="text-xl font-semibold text-[#14304D] mb-3">{process.title}</h4>
                  <p className="text-[#14304D]/70">{process.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Footer décoratif */}
        <div className="absolute bottom-0 left-0 right-0 h-12">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-[#BBE5EF]/30"></path>
          </svg>
        </div>
      </div>
    </section>
  );
}