"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CtaSection() {
  return (
    <section className="py-20 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-make-purple-900 to-make-blue-900 opacity-95 -z-10"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-10 w-72 h-72 bg-make-purple-500 rounded-full blur-[100px] opacity-20"></div>
        <div className="absolute top-40 right-10 w-80 h-80 bg-make-blue-500 rounded-full blur-[100px] opacity-20"></div>
        <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-indigo-500 rounded-full blur-[100px] opacity-20"></div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i}
            className={`absolute w-2 h-2 md:w-3 md:h-3 bg-white rounded-full opacity-${20 + (i * 10)} animate-float-${i % 3 === 0 ? '' : i % 2 === 0 ? 'delay' : 'slow'}`}
            style={{
              top: `${10 + Math.random() * 80}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl relative overflow-hidden"
          >
            {/* Gradient line at top */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-500 via-make-purple-500 to-make-blue-500"></div>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="md:max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Prêt à automatiser vos processus d'entreprise ?
                </h2>
                <p className="text-lg text-white/80 mb-8 md:mb-0 leading-relaxed">
                  Bénéficiez d'une consultation gratuite pour découvrir comment nos solutions d'automatisation personnalisées peuvent transformer votre entreprise.
                </p>
              </div>
              
              <div className="md:flex-shrink-0 flex flex-col sm:flex-row md:flex-col gap-4">
                <Link
                  href="/contact"
                  className="group relative overflow-hidden px-8 py-4 rounded-xl bg-white text-make-purple-700 font-medium text-center hover:text-white transition-colors duration-300 shadow-lg shadow-make-purple-600/10"
                >
                  <span className="relative z-10">Démarrer Gratuitement</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-make-purple-600 to-make-blue-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                </Link>
                
                <Link 
                  href="/pricing"
                  className="px-8 py-4 rounded-xl bg-white/5 border border-white/20 text-white font-medium text-center hover:bg-white/10 transition-colors"
                >
                  Voir les Tarifs
                </Link>
              </div>
            </div>
            
            {/* Features list */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  text: "Automatisations sur mesure"
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  text: "Équipe de spécialistes certifiés"
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  text: "Support technique permanent"
                }
              ].map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-green-400">
                    {feature.icon}
                  </div>
                  <span className="text-white/90">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 