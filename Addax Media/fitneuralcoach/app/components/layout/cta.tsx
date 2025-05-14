'use client';

import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function CTA() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  return (
    <section className="py-20 bg-gray-50 relative" ref={ref}>
      <div className="container px-4 sm:px-6 mx-auto">
          <motion.div
          initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden"
          >
          <div className="relative">
            {/* Accent de couleur en haut */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-500 to-orange-500"></div>
            
            <div className="p-8 sm:p-12">
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="md:w-3/5">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Commencez votre transformation dès aujourd'hui
                  </h2>
                  
                  <p className="text-lg text-gray-600 mb-6">
                    Découvrez notre plateforme de coaching IA personnalisée conçue pour vous aider à atteindre vos objectifs fitness.
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {[
                      "Programmes d'entraînement personnalisés",
                      "Assistant IA disponible 24/7",
                      "Conseils nutritionnels adaptés",
                      "Recommandations basées sur la science"
                      ].map((item, i) => (
                        <motion.li 
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                          className="flex items-start"
                        >
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center mr-3 mt-1">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                        <span className="text-gray-700">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  
                  <Link href="/#pricing">
                    <Button className="h-12 px-8 font-medium rounded-lg bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white shadow-lg shadow-orange-500/20 transition-all hover:shadow-xl">
                      Voir nos formules
                    </Button>
                  </Link>
                </div>
                
                <div className="md:w-2/5">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-gray-50 p-6 rounded-lg border border-gray-100"
                  >
                    <div className="text-center mb-8">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Technologie innovante</h3>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-gray-100 mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Ce que notre plateforme vous propose :</h4>
                      <ul className="text-gray-700 text-sm space-y-2">
                        <li className="flex items-start">
                          <span className="text-red-500 mr-2">•</span>
                          Intelligence artificielle de pointe
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-500 mr-2">•</span>
                          Constructeur de programmes sportifs
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-500 mr-2">•</span>
                          Constructeur de plans alimentaires
                        </li>
                      </ul>
                    </div>
                    
                    <p className="text-center text-sm text-gray-600">
                      Soyez parmi les premiers à essayer notre technologie
                    </p>
                  </motion.div>
                </div>
                </div>
              </div>
            </div>
          </motion.div>
      </div>
    </section>
  );
} 