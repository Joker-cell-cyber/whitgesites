'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { useState } from 'react';

export default function HowItWorks() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const steps = [
    {
      title: "Importez vos données",
      description: "Importez facilement votre fichier CSV de Facebook Ads suivant notre modèle standardisé pour commencer l'analyse.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      ),
      details: [
        "Téléchargez le modèle de CSV",
        "Complétez-le avec vos données",
        "Envoyez-le sur notre plateforme"
      ]
    },
    {
      title: "Calcul automatique des métriques",
      description: "Notre algorithme analyse automatiquement vos données pour calculer les principales métriques de performance de vos campagnes.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      details: [
        "ROI, ROAS et CPA",
        "CTR et taux de conversion",
        "Segmentation par audience"
      ]
    },
    {
      title: "Choisissez votre analyse",
      description: "Sélectionnez le type d'analyse spécifique qui répond à vos besoins pour obtenir des insights pertinents.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
      details: [
        "Analyse des créatifs",
        "Analyse des audiences",
        "Analyse prédictive"
      ]
    },
    {
      title: "Obtenez un plan d'action",
      description: "Pour chaque type d'analyse effectuée, notre IA génère des recommandations concrètes et un plan d'action détaillé.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      details: [
        "Recommandations personnalisées",
        "Actions prioritaires à mettre en œuvre",
        "Estimation des résultats potentiels"
      ]
    },
  ];

  // État pour le suivi de l'étape active dans la visualisation
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  // Fonction pour avancer à l'étape suivante
  const nextStep = () => {
    setActiveStepIndex((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
  };

  // Fonction pour revenir à l'étape précédente
  const prevStep = () => {
    setActiveStepIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <section
      ref={ref}
      id="how-it-works"
      className="py-24 relative overflow-hidden bg-gradient-to-b from-orange-50 to-white"
    >
      {/* Décoration d'arrière-plan */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5"></div>
      
      {/* Éléments de décoration */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl"></div>
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-sm font-medium mb-4"
          >
            <span className="flex h-2 w-2 rounded-full bg-orange-500 mr-2 animate-pulse"></span>
            Processus simple
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent"
          >
            Comment ça marche
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto text-lg"
          >
            Notre plateforme d'analyse Facebook Ads propulsée par IA vous offre un processus en 4 étapes simples pour optimiser vos campagnes.
          </motion.p>
        </div>

        {/* Frise chronologique - Indicateurs d'étape */}
            <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <div className="relative">
            {/* Ligne de progression */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 transform -translate-y-1/2"></div>
            <div 
              className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-orange-500 to-orange-400 transform -translate-y-1/2 transition-all duration-500 ease-in-out"
              style={{ width: `${(activeStepIndex + 1) * (100 / steps.length)}%` }}
            ></div>
            
            {/* Points de progression */}
            <div className="flex justify-between relative">
              {steps.map((step, index) => (
                <div 
              key={index}
                  className="flex flex-col items-center relative z-10"
                  onClick={() => setActiveStepIndex(index)}
                >
                  <div 
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mb-2
                      ${index <= activeStepIndex 
                        ? 'bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-lg' 
                        : 'bg-white border-2 border-gray-200 text-gray-400'}
                      transition-all duration-300 cursor-pointer hover:scale-110
                    `}
                  >
                    {index + 1}
                  </div>
                  <p className={`text-sm font-medium text-center ${index <= activeStepIndex ? 'text-orange-600' : 'text-gray-500'}`}>
                    {step.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contenu détaillé de l'étape active */}
        <motion.div
          key={activeStepIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-orange-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Partie gauche - Informations textuelles */}
            <div className="p-8 md:p-10 flex flex-col">
              <div className="p-3 rounded-lg bg-orange-50 w-fit mb-6">
                <div className="text-orange-500">
                  {steps[activeStepIndex].icon}
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-400">
                  Étape {activeStepIndex + 1}:
                </span> {steps[activeStepIndex].title}
              </h3>
              
              <p className="text-gray-600 mb-8 text-lg">
                {steps[activeStepIndex].description}
              </p>
              
              <div className="mb-8 flex-grow">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Détails clés:</h4>
                <ul className="space-y-3">
                  {steps[activeStepIndex].details.map((detail, i) => (
                    <li key={i} className="flex items-start text-gray-700">
                      <div className="p-1 rounded-full bg-orange-100 mr-3 flex-shrink-0">
                        <svg className="h-4 w-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-base">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Navigation des étapes */}
              <div className="flex justify-between mt-auto">
                <button
                  onClick={prevStep}
                  disabled={activeStepIndex === 0}
                  className={`flex items-center px-4 py-2 rounded-lg ${
                    activeStepIndex === 0 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-orange-100 text-orange-600 hover:bg-orange-200'
                  } transition-colors`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Précédent
                </button>
                
                <button
                  onClick={nextStep}
                  disabled={activeStepIndex === steps.length - 1}
                  className={`flex items-center px-4 py-2 rounded-lg ${
                    activeStepIndex === steps.length - 1 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-orange-100 text-orange-600 hover:bg-orange-200'
                  } transition-colors`}
                >
                  Suivant
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Partie droite - Illustration */}
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-8 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 overflow-hidden">
                <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-orange-500/30 rounded-full"></div>
                <div className="absolute -left-16 -top-16 w-64 h-64 bg-yellow-500/30 rounded-full"></div>
              </div>
              
              <div className="relative">
                {/* Illustrations spécifiques pour chaque étape */}
                <div className="w-full max-w-md rounded-xl border-2 border-orange-100 bg-white p-6 shadow-lg">
                  {activeStepIndex === 0 && (
                    <div className="w-full aspect-[4/3] bg-orange-50 rounded-lg p-5 flex flex-col justify-center items-center">
                      <div className="relative w-full h-full flex flex-col justify-center items-center">
                        {/* Illustration pour l'importation des données */}
                        <div className="mb-6 p-3 bg-white shadow-md rounded-lg border border-orange-200 max-w-xs w-full">
                          <div className="flex items-center mb-2">
                            <div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
                            <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
                            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                            <div className="ml-auto text-xs text-gray-500">facebook_ads.csv</div>
                          </div>
                          <div className="h-px bg-gray-200 mb-2"></div>
                          <div className="grid grid-cols-4 gap-1 text-xs text-gray-500">
                            <div className="bg-orange-100 p-1 rounded">Campaign</div>
                            <div className="bg-orange-100 p-1 rounded">Cost</div>
                            <div className="bg-orange-100 p-1 rounded">Clicks</div>
                            <div className="bg-orange-100 p-1 rounded">Conv</div>
                          </div>
                          <div className="grid grid-cols-4 gap-1 text-xs mt-1">
                            <div className="p-1">Camp1</div>
                            <div className="p-1">€100</div>
                            <div className="p-1">530</div>
                            <div className="p-1">12</div>
                          </div>
                          <div className="grid grid-cols-4 gap-1 text-xs">
                            <div className="p-1">Camp2</div>
                            <div className="p-1">€150</div>
                            <div className="p-1">720</div>
                            <div className="p-1">24</div>
                          </div>
                        </div>
                        <div className="relative">
                          <svg className="h-10 w-10 text-orange-400 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-orange-500/10 rounded-full animate-ping"></div>
                        </div>
                        <div className="mt-6 p-3 bg-white shadow-md rounded-lg border border-orange-200 flex items-center justify-center">
                          <span className="font-medium text-orange-600">Importation en cours...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeStepIndex === 1 && (
                    <div className="w-full aspect-[4/3] bg-orange-50 rounded-lg p-5 flex flex-col justify-center items-center">
                      <div className="relative w-full h-full flex flex-col justify-center items-center">
                        {/* Illustration pour le calcul des métriques */}
                        <div className="grid grid-cols-2 gap-3 w-full">
                          <div className="bg-white p-3 rounded-lg shadow-md border border-orange-200">
                            <div className="text-xs text-gray-500 mb-1">ROAS</div>
                            <div className="text-xl font-bold text-green-500">3.2x</div>
                            <div className="h-2 bg-gray-100 rounded-full mt-2">
                              <div className="h-2 bg-green-400 rounded-full" style={{ width: '64%' }}></div>
                            </div>
                          </div>
                          <div className="bg-white p-3 rounded-lg shadow-md border border-orange-200">
                            <div className="text-xs text-gray-500 mb-1">CTR</div>
                            <div className="text-xl font-bold text-orange-500">2.8%</div>
                            <div className="h-2 bg-gray-100 rounded-full mt-2">
                              <div className="h-2 bg-orange-400 rounded-full" style={{ width: '56%' }}></div>
                            </div>
                          </div>
                          <div className="bg-white p-3 rounded-lg shadow-md border border-orange-200">
                            <div className="text-xs text-gray-500 mb-1">CPA</div>
                            <div className="text-xl font-bold text-blue-500">€23.4</div>
                            <div className="h-2 bg-gray-100 rounded-full mt-2">
                              <div className="h-2 bg-blue-400 rounded-full" style={{ width: '72%' }}></div>
                            </div>
                          </div>
                          <div className="bg-white p-3 rounded-lg shadow-md border border-orange-200">
                            <div className="text-xs text-gray-500 mb-1">ROI</div>
                            <div className="text-xl font-bold text-purple-500">42%</div>
                            <div className="h-2 bg-gray-100 rounded-full mt-2">
                              <div className="h-2 bg-purple-400 rounded-full" style={{ width: '42%' }}></div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-5 w-full bg-white p-3 rounded-lg shadow-md border border-orange-200">
                          <div className="flex justify-between items-center mb-2">
                            <div className="text-xs text-gray-500">Évolution des conversions</div>
                            <div className="text-xs font-medium text-green-500">+18%</div>
                          </div>
                          <div className="flex items-end space-x-1 h-10">
                            <div className="bg-orange-200 w-full h-3 rounded-sm"></div>
                            <div className="bg-orange-300 w-full h-4 rounded-sm"></div>
                            <div className="bg-orange-400 w-full h-5 rounded-sm"></div>
                            <div className="bg-orange-500 w-full h-6 rounded-sm"></div>
                            <div className="bg-orange-400 w-full h-7 rounded-sm"></div>
                            <div className="bg-orange-300 w-full h-8 rounded-sm"></div>
                            <div className="bg-orange-500 w-full h-10 rounded-sm relative">
                              <div className="absolute -top-4 right-0 text-xs font-medium text-orange-600">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeStepIndex === 2 && (
                    <div className="w-full aspect-[4/3] bg-orange-50 rounded-lg p-5 flex flex-col justify-center items-center">
                      <div className="relative w-full h-full flex flex-col justify-center items-center">
                        {/* Illustration pour le choix d'analyses */}
                        <div className="grid grid-cols-3 gap-3 w-full">
                          <div className="col-span-3 text-center text-sm font-medium text-gray-600 mb-2">Choisissez votre analyse</div>
                          <div className="bg-white p-3 rounded-lg shadow-md border-2 border-orange-400 flex flex-col items-center">
                            <div className="p-2 bg-orange-100 rounded-full mb-2">
                              <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <div className="text-xs text-gray-600 text-center">Analyse des créatifs</div>
                            <div className="mt-2 w-full h-1 bg-green-400 rounded-full"></div>
                          </div>
                          <div className="bg-white p-3 rounded-lg shadow-md border border-gray-200 flex flex-col items-center opacity-70">
                            <div className="p-2 bg-gray-100 rounded-full mb-2">
                              <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                            </div>
                            <div className="text-xs text-gray-600 text-center">Analyse des audiences</div>
                          </div>
                          <div className="bg-white p-3 rounded-lg shadow-md border border-gray-200 flex flex-col items-center opacity-70">
                            <div className="p-2 bg-gray-100 rounded-full mb-2">
                              <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                              </svg>
                            </div>
                            <div className="text-xs text-gray-600 text-center">Analyse prédictive</div>
                          </div>
                        </div>
                        <div className="mt-5 w-full bg-white p-3 rounded-lg shadow-md border border-orange-200">
                          <div className="text-xs text-gray-600 mb-2">Résultats de l'analyse des créatifs</div>
                          <div className="flex items-center space-x-2">
                            <div className="w-12 h-12 bg-orange-100 rounded flex items-center justify-center">
                              <span className="text-orange-500 font-medium">A</span>
                            </div>
                            <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-green-500" style={{ width: '75%' }}></div>
                            </div>
                            <div className="text-sm font-medium text-green-600">75%</div>
                          </div>
                          <div className="flex items-center space-x-2 mt-2">
                            <div className="w-12 h-12 bg-orange-100 rounded flex items-center justify-center">
                              <span className="text-orange-500 font-medium">B</span>
                            </div>
                            <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-orange-500" style={{ width: '52%' }}></div>
                            </div>
                            <div className="text-sm font-medium text-orange-600">52%</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeStepIndex === 3 && (
                    <div className="w-full aspect-[4/3] bg-orange-50 rounded-lg p-5 flex flex-col justify-center items-center">
                      <div className="relative w-full h-full flex flex-col justify-center items-center">
                        {/* Illustration pour le plan d'action */}
                        <div className="flex flex-col space-y-3 max-h-full overflow-y-auto py-1 w-full">
                          <div className="bg-white p-3 rounded-lg shadow-md border border-orange-200 w-full">
                            <div className="flex items-center mb-2">
                              <div className="p-1.5 bg-red-100 rounded-full mr-2 flex-shrink-0">
                                <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                              </div>
                              <div className="flex-1">
                                <div className="text-sm font-semibold text-gray-800">Alerte performance</div>
                                <div className="text-xs text-gray-600">Coût par acquisition élevé</div>
                              </div>
                              <div className="text-xs font-medium text-red-600">Urgent</div>
                            </div>
                            <div className="bg-gray-50 p-2 rounded border border-gray-200 text-xs">
                              <span className="font-medium">Action :</span> Réduire le budget de 20%
                            </div>
                          </div>
                          
                          <div className="bg-white p-3 rounded-lg shadow-md border border-orange-200 w-full">
                            <div className="flex items-center mb-2">
                              <div className="p-1.5 bg-yellow-100 rounded-full mr-2 flex-shrink-0">
                                <svg className="w-4 h-4 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </div>
                              <div className="flex-1">
                                <div className="text-sm font-semibold text-gray-800">Opportunité</div>
                                <div className="text-xs text-gray-600">Bon résultat du créatif B</div>
                              </div>
                              <div className="text-xs font-medium text-yellow-600">Important</div>
                            </div>
                            <div className="bg-gray-50 p-2 rounded border border-gray-200 text-xs">
                              <span className="font-medium">Action :</span> Augmenter l'exposition de 40%
                            </div>
                          </div>
                          
                          <div className="bg-white p-3 rounded-lg shadow-md border border-orange-200 w-full">
                            <div className="flex items-center mb-2">
                              <div className="p-1.5 bg-green-100 rounded-full mr-2 flex-shrink-0">
                                <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </div>
                              <div className="flex-1">
                                <div className="text-sm font-semibold text-gray-800">Optimisation</div>
                                <div className="text-xs text-gray-600">Ajustement des enchères</div>
                              </div>
                              <div className="text-xs font-medium text-green-600">Optimisation</div>
                            </div>
                            <div className="text-center w-full bg-orange-50 p-2 rounded text-xs text-orange-600 border border-orange-100">
                              <svg className="inline-block w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                              Complétez les 3 analyses pour un plan complet
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-6 p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-medium text-orange-700 mb-2">
                      Astuce
                    </h4>
                    <p className="text-orange-600 text-sm">
                      {activeStepIndex === 0 && "Utilisez notre modèle de CSV pour faciliter l'importation de vos données."}
                      {activeStepIndex === 1 && "Les métriques sont calculées automatiquement dès que votre fichier est importé."}
                      {activeStepIndex === 2 && "Complétez les 3 types d'analyses pour obtenir un plan d'action complet et détaillé."}
                      {activeStepIndex === 3 && "Vous devez compléter les 3 analyses (créatifs, audiences, prédictive) pour débloquer le plan d'action complet."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Appel à l'action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-12 text-center"
        >
          <a
            href="#pricing"
            className="inline-flex items-center bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-lg px-8 py-4 shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/30 transition-all"
          >
            <span>Commencer maintenant</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
          </motion.div>
      </div>
    </section>
  );
}