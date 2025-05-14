'use client';

import { motion } from 'framer-motion';
import { BarChart3, Users, TrendingUp, Percent } from 'lucide-react';

export default function Stats() {
  const stats = [
    {
      title: 'Croissance organique',
      value: '45-60%',
      description: 'Potentiel d\'amélioration des résultats de vos campagnes',
      icon: <TrendingUp className="h-6 w-6 text-[#5F7138]" />
    },
    {
      title: 'ROI potentiel',
      value: '2.5x',
      description: 'Objectif de retour sur investissement atteignable',
      icon: <BarChart3 className="h-6 w-6 text-[#C17A56]" />
    },
    {
      title: 'Engagement',
      value: '+70%',
      description: "Amélioration possible de l'engagement de votre audience",
      icon: <Users className="h-6 w-6 text-[#5F7138]" />
    },
    {
      title: 'Efficacité',
      value: '85%',
      description: 'Taux d\'optimisation cible pour vos campagnes',
      icon: <Percent className="h-6 w-6 text-[#C17A56]" />
    }
  ];
  
  return (
    <section className="adf-section relative overflow-hidden py-24 bg-[#F8F4E9]">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <span className="text-[#C17A56] font-medium">Impact potentiel</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#4F4639] sm:text-4xl adf-heading">
            Des opportunités d'amélioration pour votre croissance
          </h2>
          <p className="mt-4 text-lg text-[#7F7259]">
            Des stratégies basées sur l'analyse de données qui peuvent contribuer à des résultats mesurables et durables.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="adf-card relative group hover:scale-105 transition-all duration-300"
            >
              <div className="absolute -right-3 -bottom-3 w-20 h-20 bg-[#E8DFC7] rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-[#E8DFC7] rounded-full">
                    {stat.icon}
                  </div>
                  <h3 className="text-[#4F4639] text-3xl md:text-4xl font-bold">{stat.value}</h3>
                </div>
                
                <h4 className="text-[#5F7138] text-lg font-semibold mb-2">{stat.title}</h4>
                <p className="text-[#7F7259]">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8 max-w-3xl mx-auto">
          <p className="text-[#7F7259] text-sm text-center italic">
            *Ces chiffres représentent des objectifs à atteindre et non des résultats garantis. Les performances réelles peuvent varier selon le secteur, 
            la qualité des annonces, le budget alloué et d'autres facteurs propres à chaque entreprise.
          </p>
        </div>
      </div>
    </section>
  );
}