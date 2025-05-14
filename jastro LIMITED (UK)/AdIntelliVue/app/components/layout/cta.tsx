'use client';

import { motion } from 'framer-motion';
import { ArrowRight, BarChart2, TrendingUp, Target, Leaf, Sprout } from 'lucide-react';
import Link from 'next/link';

export default function CTA() {
  return (
    <section id="cta" className="relative overflow-hidden bg-[#F8F4E9] py-24">
      {/* Éléments décoratifs */}
      <div className="absolute right-0 top-0 opacity-20">
        <Leaf className="h-64 w-64 text-[#5F7138] rotate-45 animate-float" />
      </div>
      
      <div className="absolute left-0 bottom-0 opacity-20">
        <Sprout className="h-48 w-48 text-[#5F7138] -rotate-12 animate-float" />
      </div>
      
      <div className="absolute right-1/4 bottom-1/4 w-64 h-64 rounded-full bg-[#5F7138]/5 blur-3xl"></div>
      <div className="absolute left-1/4 top-1/4 w-64 h-64 rounded-full bg-[#C17A56]/5 blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#F0EBE1] rounded-2xl border border-[#E8DFC7] shadow-lg overflow-hidden">
            <div className="px-6 py-12 md:p-16 relative">
              <div className="grid md:grid-cols-5 gap-8 items-center">
                <div className="md:col-span-3 space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="inline-block px-4 py-2 border border-[#C17A56] rounded-lg bg-[#F8F4E9] shadow-sm mb-4"
                  >
                    <span className="text-[#C17A56] text-sm font-medium flex items-center">
                      <span className="mr-2 inline-block w-2 h-2 rounded-full bg-[#C17A56] animate-pulse"></span>
                      Offre spéciale
                    </span>
                  </motion.div>
                  
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold text-[#4F4639] leading-tight adf-heading"
                  >
                    Cultivez votre présence <span className="text-[#5F7138]">digitale</span> avec nous
                  </motion.h2>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="text-base md:text-lg text-[#7F7259]"
                  >
                    Bénéficiez de notre offre de lancement et transformez votre marketing digital avec notre approche naturelle et durable.
                  </motion.p>
                  
                  <div className="pt-2">
                    <ul className="space-y-4">
                      {[
                        {
                          text: "Analyse organique du marché",
                          icon: BarChart2
                        },
                        {
                          text: "Stratégies de croissance durable",
                          icon: TrendingUp
                        },
                        {
                          text: "Communauté engagée et fidèle",
                          icon: Target
                        }
                      ].map((item, i) => (
                        <motion.li 
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-center"
                        >
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#E8DFC7] flex items-center justify-center mr-3 border border-[#5F7138] shadow-sm">
                            <item.icon className="w-4 h-4 text-[#5F7138]" />
                          </div>
                          <span className="text-[#7F7259]">{item.text}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="bg-[#F8F4E9] p-6 rounded-xl border border-[#E8DFC7] shadow-md"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold text-[#4F4639]">Plan Croissance</h3>
                      <div className="bg-[#5F7138] text-white text-xs font-medium px-2.5 py-1 rounded-lg">-25%</div>
                    </div>
                    
                    <div className="flex items-baseline mb-6">
                      <span className="text-3xl font-bold text-[#4F4639]">74€</span>
                      <span className="text-lg text-[#7F7259] line-through ml-2">99€</span>
                      <span className="text-sm text-[#7F7259] ml-2">/mois</span>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      {[
                        'Analyses et recommandations illimitées', 
                        'Support prioritaire par email', 
                        'Accès aux modules premium', 
                        'Rapports de performance mensuelle'
                      ].map((feature, i) => (
                        <div key={i} className="flex items-center">
                          <svg className="h-5 w-5 text-[#5F7138] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-[#7F7259]">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="space-y-3">
                      <Link href="/register" className="block">
                        <button className="adf-btn-primary w-full flex items-center justify-center">
                          Commencer maintenant
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </button>
                      </Link>
                      
                      <Link href="/contact" className="block">
                        <button className="adf-btn-secondary w-full">
                          Parler à un expert
                        </button>
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-8 text-[#7F7259] text-sm"
          >
            <p>Notre engagement: 100% satisfaction garantie ou remboursé pendant 14 jours</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 