'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { ChevronDownIcon, ArrowRightIcon, BarChart4Icon, TrendingUpIcon, DollarSignIcon } from 'lucide-react';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <section
      ref={heroRef}
      className="relative py-20 lg:py-32 adf-gradient-bg overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        {/* Motif organique */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,0 Q25,25 50,0 T100,0 V100 H0 Z" fill="#5F7138" />
          </svg>
        </div>

        {/* Éléments décoratifs en arrière-plan */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <svg className="absolute top-20 left-[15%] w-64 h-64 text-[#5F7138] opacity-5" viewBox="0 0 200 200">
            <path fill="currentColor" d="M44.6,-76.2C58.9,-69.2,72.3,-59.6,79.5,-46.4C86.7,-33.2,87.8,-16.6,85.6,-1.3C83.4,14.1,78,28.1,70.5,41.5C63,54.9,53.3,67.6,40.3,75.4C27.3,83.2,10.9,86,-3.9,82.1C-18.7,78.2,-31.8,67.5,-44.4,57.2C-57,46.8,-69.1,36.8,-74.1,23.4C-79.1,10,-77,-6.7,-72.7,-22.4C-68.4,-38.1,-62,-52.9,-50.9,-61.3C-39.8,-69.7,-24.1,-71.8,-8.9,-72.2C6.3,-72.6,30.3,-83.3,44.6,-76.2Z" transform="translate(100 100)" />
          </svg>
          <svg className="absolute bottom-20 right-[10%] w-72 h-72 text-[#C17A56] opacity-5" viewBox="0 0 200 200">
            <path fill="currentColor" d="M37.7,-62.2C50.9,-56.3,65.2,-49.7,72.7,-38.4C80.2,-27.1,81,-11,77.8,3.2C74.6,17.5,67.4,30,58.6,41.1C49.8,52.2,39.4,62,27,67.8C14.6,73.7,0.3,75.7,-15.2,74.2C-30.7,72.8,-47.5,67.8,-59.9,57.2C-72.2,46.5,-80.2,30.1,-83.4,12.6C-86.6,-4.9,-85,-23.5,-77.1,-38.6C-69.2,-53.7,-54.9,-65.3,-40,-68.8C-25.1,-72.3,-9.6,-67.8,1.2,-69.9C11.9,-72,24.5,-68.1,37.7,-62.2Z" transform="translate(100 100)" />
          </svg>
        </div>
        
        {/* Éléments flottants */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#E8DFC7]/50 blur-[60px]"></div>
        <div className="absolute bottom-20 left-10 w-60 h-60 rounded-full bg-[#C17A56]/20 blur-[80px]"></div>
      </div>
      
      {/* Éléments décoratifs organiques */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-16 h-16 bg-[#E8DFC7]/80 border border-[#C17A56]/30 rounded-full shadow-lg opacity-70 animate-float-slow"></div>
        <div className="absolute top-40 right-1/4 w-10 h-10 bg-[#D9DEC9]/80 border border-[#5F7138]/30 rounded-full shadow-lg opacity-70 animate-float"></div>
        <div className="absolute bottom-40 left-1/3 w-14 h-14 bg-[#C17A56]/20 border border-[#C17A56]/20 rounded-full shadow-lg opacity-60 animate-float-slow"></div>
        
        {/* Élément feuille */}
        <svg className="absolute top-1/3 right-[15%] w-24 h-24 text-[#5F7138] opacity-20 animate-float" viewBox="0 0 24 24">
          <path fill="currentColor" d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
        </svg>
      </div>
      
      {/* Contenu principal */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Colonne de texte */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col space-y-8"
          >
            <div className="inline-flex">
              <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#D9DEC9] text-[#5F7138] text-sm font-medium border border-[#5F7138]/30">
                <span className="mr-2 h-2 w-2 rounded-full bg-[#5F7138] animate-pulse"></span>
                Analyse avancée de Facebook Ads
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#4F4639]">
              Maximisez votre <span className="text-[#5F7138]">retour sur investissement</span> publicitaire
            </h1>
            
            <p className="text-lg text-[#7F7259] max-w-2xl">
              Notre plateforme d'intelligence artificielle analyse vos campagnes Facebook Ads en profondeur pour identifier les opportunités d'optimisation et augmenter votre ROAS.
            </p>
          
            <div className="flex flex-col sm:flex-row gap-5 pt-4">
              <Link href="/#pricing" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto adf-btn-primary">
                  <span className="flex items-center">
                    Démarrer mon analyse
                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </span>
                </Button>
              </Link>
            
              <Link href="/#features" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto adf-btn-secondary">
                  <span className="flex items-center">
                    Explorer les fonctionnalités
                    <ChevronDownIcon className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform duration-300" />
                  </span>
                </Button>
              </Link>
            </div>
          </motion.div>
          
          {/* Colonne de visualisation de données */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.95 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative rounded-xl overflow-hidden border border-[#E8DFC7] bg-white shadow-lg">
              <div className="relative px-6 py-5 bg-[#F0EBE1] border-b border-[#E8DFC7]">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-[#4F4639]">Performance des campagnes</h3>
                  <div className="flex space-x-1">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#D9DEC9] text-[#5F7138]">
                      7 jours
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-6 space-y-5">
                {/* Métriques clés */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'ROAS', value: '3.7x', icon: TrendingUpIcon, change: '+12%', color: 'text-[#5F7138]' },
                    { label: 'CPA', value: '19.4€', icon: DollarSignIcon, change: '-8%', color: 'text-[#5F7138]' },
                    { label: 'CTR', value: '2.1%', icon: BarChart4Icon, change: '+5%', color: 'text-[#5F7138]' },
                  ].map((metric, i) => (
                    <div key={i} className="bg-[#F8F4E9] p-4 rounded-lg border border-[#E8DFC7]">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-xs text-[#7F7259]">{metric.label}</p>
                          <p className="text-xl font-bold text-[#4F4639] mt-1">{metric.value}</p>
                        </div>
                        <div className="h-8 w-8 rounded-md bg-[#D9DEC9] flex items-center justify-center text-[#5F7138]">
                          <metric.icon className="h-4 w-4" />
                        </div>
                      </div>
                      <div className={`mt-2 text-xs font-medium ${metric.color}`}>
                        {metric.change}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Graphique */}
                <div className="h-52 relative">
                  <div className="absolute inset-0 grid grid-cols-7 gap-2">
                    {[35, 42, 38, 54, 48, 62, 60].map((height, i) => (
                      <div key={i} className="flex items-end">
                        <div 
                          className="w-full bg-gradient-to-t from-[#5F7138] to-[#C17A56]/70 rounded-t-md"
                          style={{ height: `${height}%` }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Étiquettes de l'axe X */}
                  <div className="absolute bottom-0 left-0 right-0 h-6 grid grid-cols-7 gap-2 border-t border-[#E8DFC7] pt-1">
                    {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day, i) => (
                      <div key={i} className="text-center text-xs text-[#7F7259]">
                        {day}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Performance des campagnes */}
                <div className="border-t border-[#E8DFC7] pt-4">
                  <h4 className="text-sm font-medium text-[#4F4639] mb-3">Meilleures campagnes</h4>
                  <div className="space-y-2">
                    {[
                      { name: 'Acquisition été 2023', performance: '4.2x ROAS' },
                      { name: 'Remarketing clients', performance: '5.8x ROAS' }
                    ].map((campaign, i) => (
                      <div key={i} className="flex justify-between items-center p-2 rounded-md hover:bg-[#F0EBE1]">
                        <span className="text-sm text-[#4F4639]">{campaign.name}</span>
                        <span className="text-sm font-medium text-[#5F7138]">{campaign.performance}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 