'use client';

import React, { useState } from 'react';
import { HeartHandshake, MessageCircle, Sparkles, Shield, Brain, UserCheck, ArrowRight, LayoutGrid, X } from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/app/components/ui/button";
import { cn } from "@/app/lib/utils";

const Features = () => {
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);
  const [isGridView, setIsGridView] = useState(true);
  
  const features = [
    {
      title: "Conseils personnalisés",
      description: "Obtenez des conseils adaptés à votre situation spécifique et à votre personnalité pour améliorer votre vie amoureuse.",
      longDescription: "Notre système d'intelligence artificielle analyse vos interactions et votre profil pour vous offrir des conseils sur mesure. Notre approche personnalisée prend en compte votre personnalité, vos objectifs relationnels et votre style de communication pour vous guider efficacement.",
      icon: HeartHandshake,
      color: "fuchsia",
      gradient: "from-fuchsia-500 to-pink-500"
    },
    {
      title: "Choix de coach",
      description: "Choisissez entre un coach masculin ou féminin pour obtenir des perspectives variées sur vos questions amoureuses.",
      longDescription: "La diversité des perspectives est essentielle en matière de relations. Grâce à notre option unique, vous pouvez alterner entre un coach virtuel masculin ou féminin pour obtenir des conseils équilibrés et complets sur vos situations relationnelles.",
      icon: UserCheck,
      color: "pink",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      title: "Conversations naturelles",
      description: "Discutez avec votre coach comme avec un.e ami.e, sans jugement et en toute simplicité.",
      longDescription: "Nos algorithmes avancés permettent des échanges fluides et naturels. Oubliez les conversations robotiques - notre coach virtuel s'adapte à votre style de communication pour créer une atmosphère détendue et chaleureuse, idéale pour aborder tous vos sujets amoureux.",
      icon: MessageCircle,
      color: "rose",
      gradient: "from-rose-500 to-red-500"
    },
    {
      title: "IA avancée",
      description: "Profitez d'une intelligence artificielle à la pointe pour des réponses pertinentes et adaptées à votre situation.",
      longDescription: "Notre plateforme utilise les dernières avancées en intelligence artificielle pour comprendre les nuances des relations humaines. Grâce à l'apprentissage continu, notre IA s'améliore constamment pour vous offrir un accompagnement toujours plus précis et efficace.",
      icon: Brain,
      color: "pink",
      gradient: "from-pink-600 to-purple-600"
    },
    {
      title: "Approche bienveillante",
      description: "Apprenez la séduction avec humour, légèreté et sans pression pour développer votre confiance naturellement.",
      longDescription: "L'anxiété et la pression n'ont pas leur place dans votre parcours amoureux. Notre coach virtuel favorise une approche positive et légère, utilisant l'humour et l'empathie pour vous aider à développer votre confiance et vos compétences relationnelles.",
      icon: Sparkles,
      color: "red",
      gradient: "from-red-500 to-orange-500"
    },
    {
      title: "Confidentialité absolue",
      description: "Vos conversations et informations personnelles restent strictement confidentielles et sécurisées.",
      longDescription: "Votre vie privée est notre priorité. Toutes vos interactions sont protégées par un chiffrement de bout en bout, et nous ne partageons jamais vos données avec des tiers. Vous pouvez vous confier en toute sérénité, sachant que vos informations restent privées.",
      icon: Shield,
      color: "fuchsia",
      gradient: "from-fuchsia-600 to-pink-600"
    }
  ];
  
  const handleFeatureClick = (index: number) => {
    if (selectedFeature === index) {
      setSelectedFeature(null);
    } else {
      setSelectedFeature(index);
      setIsGridView(false);
    }
  };
  
  const closeDetail = () => {
    setSelectedFeature(null);
    setIsGridView(true);
  };

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Arrière-plan stylisé */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-pink-50"></div>
      
      {/* Formes décoratives */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-5 w-72 h-72 rounded-full bg-pink-100 opacity-30 blur-3xl"></div>
        <div className="absolute bottom-20 right-5 w-80 h-80 rounded-full bg-red-100 opacity-30 blur-3xl"></div>
        
        {/* Lignes décoratives */}
        <div className="absolute top-40 left-0 w-32 h-px bg-gradient-to-r from-pink-200 to-transparent"></div>
        <div className="absolute top-40 right-0 w-32 h-px bg-gradient-to-l from-pink-200 to-transparent"></div>
        <div className="absolute bottom-40 left-0 w-32 h-px bg-gradient-to-r from-pink-200 to-transparent"></div>
        <div className="absolute bottom-40 right-0 w-32 h-px bg-gradient-to-l from-pink-200 to-transparent"></div>
        
        {/* Petits coeurs décoratifs */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div 
            key={i}
            className="absolute opacity-10"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              transform: `rotate(${Math.random() * 45}deg) scale(${0.5 + Math.random() * 0.5})`,
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor" className="text-pink-500" />
            </svg>
          </div>
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* En-tête de section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-pink-100 to-red-100 text-pink-800 text-sm font-medium mb-4">
            <Sparkles size={16} className="mr-2 text-pink-500" />
            <span>Fonctionnalités exclusives</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-red-600">
            Des outils innovants pour transformer votre vie amoureuse
          </h2>
          
          <p className="text-lg text-gray-600 mb-8">
            CharmAI combine technologie avancée et expertise en relations humaines pour vous offrir une expérience unique et personnalisée.
          </p>
          
          {/* Contrôle de vue */}
          <div className="inline-flex bg-white shadow-sm rounded-lg p-1 border border-pink-100">
            <button
              onClick={() => setIsGridView(true)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-md flex items-center",
                isGridView
                  ? "bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-sm"
                  : "text-gray-600 hover:text-pink-600"
              )}
            >
              <LayoutGrid size={16} className="mr-2" />
              Grille
            </button>
            <button
              onClick={() => setIsGridView(false)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-md flex items-center",
                !isGridView
                  ? "bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-sm"
                  : "text-gray-600 hover:text-pink-600"
              )}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                <rect x="3" y="3" width="18" height="6" rx="2" stroke="currentColor" strokeWidth="2" />
                <rect x="3" y="15" width="18" height="6" rx="2" stroke="currentColor" strokeWidth="2" />
              </svg>
              Liste
            </button>
          </div>
        </div>
        
        {isGridView ? (
          /* Vue en grille */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
                onClick={() => handleFeatureClick(index)}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-pink-500/5 to-red-500/5 transition-opacity duration-300"></div>
                
                <div className="p-6 border border-pink-100 rounded-2xl h-full flex flex-col">
                  {/* Icon with gradient background */}
                  <div className={`w-14 h-14 rounded-xl mb-6 bg-gradient-to-br ${feature.gradient} p-0.5`}>
                    <div className="w-full h-full bg-white rounded-[calc(0.75rem-1px)] flex items-center justify-center">
                      <feature.icon size={24} className={`text-${feature.color}-500`} style={{ color: feature.color === 'fuchsia' ? '#d946ef' : 
                                                                                                feature.color === 'pink' ? '#ec4899' : 
                                                                                                feature.color === 'rose' ? '#f43f5e' : 
                                                                                                feature.color === 'red' ? '#ef4444' : 
                                                                                                '#ec4899' }} />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 mb-6 flex-grow">{feature.description}</p>
                  
                  <div className="flex items-center text-pink-600 font-medium text-sm group-hover:translate-x-1 transition-transform duration-300">
                    <span>En savoir plus</span>
                    <ArrowRight size={16} className="ml-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Vue détaillée */
          <div className="mb-16">
            {selectedFeature !== null ? (
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-pink-100 transition-all duration-500">
                <div className="p-8 relative">
                  <button 
                    onClick={closeDetail} 
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center text-pink-600 hover:bg-pink-100 transition-colors duration-300"
                  >
                    <X size={16} />
                  </button>
                  
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3">
                      <div className={`w-16 h-16 rounded-xl mb-6 bg-gradient-to-br ${features[selectedFeature].gradient} p-0.5`}>
                        <div className="w-full h-full bg-white rounded-[calc(0.75rem-1px)] flex items-center justify-center">
                          {React.createElement(features[selectedFeature].icon, { 
                            size: 32, 
                            className: `text-${features[selectedFeature].color}-500`,
                            style: { color: features[selectedFeature].color === 'fuchsia' ? '#d946ef' : 
                                                                        features[selectedFeature].color === 'pink' ? '#ec4899' : 
                                                                        features[selectedFeature].color === 'rose' ? '#f43f5e' : 
                                                                        features[selectedFeature].color === 'red' ? '#ef4444' : 
                                                                        '#ec4899' }
                          })}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{features[selectedFeature].title}</h3>
                      <p className="text-gray-600">{features[selectedFeature].description}</p>
                    </div>
                    
                    <div className="md:w-2/3">
                      <div className="bg-gradient-to-br from-pink-50 to-red-50 rounded-xl p-6 mb-6">
                        <h4 className="text-lg font-medium text-gray-900 mb-3">En détail</h4>
                        <p className="text-gray-700">{features[selectedFeature].longDescription}</p>
                      </div>
                      
                      <div className="flex items-center justify-end">
                        <Button className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white shadow-md hover:shadow-lg transition-all duration-300 rounded-lg">
                          <Link href="#pricing" className="flex items-center gap-2">
                            <span>Voir les tarifs</span>
                            <ArrowRight size={16} />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-pink-100 p-6 cursor-pointer flex items-center"
                    onClick={() => handleFeatureClick(index)}
                  >
                    <div className={`w-12 h-12 rounded-lg mr-6 bg-gradient-to-br ${feature.gradient} p-0.5 flex-shrink-0`}>
                      <div className="w-full h-full bg-white rounded-[calc(0.5rem-1px)] flex items-center justify-center">
                        <feature.icon 
                          size={20} 
                          className={`text-${feature.color}-500`}
                          style={{ color: feature.color === 'fuchsia' ? '#d946ef' : 
                                                                      feature.color === 'pink' ? '#ec4899' : 
                                                                      feature.color === 'rose' ? '#f43f5e' : 
                                                                      feature.color === 'red' ? '#ef4444' : 
                                                                      '#ec4899' }}
                        />
                      </div>
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{feature.title}</h3>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                    
                    <ArrowRight size={16} className="text-pink-600 flex-shrink-0" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* Section coach masculin/féminin */}
        <div className="mt-16 relative">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-pink-500 to-red-500 transform rotate-1 opacity-10 blur-lg"></div>
          
          <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-pink-100">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-pink-100 to-red-100 rounded-full -mr-32 -mt-32 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-pink-100 to-red-100 rounded-full -ml-32 -mb-32 opacity-50"></div>
            
            <div className="relative p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="md:w-1/2">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-pink-100 to-red-100 text-pink-800 text-sm font-medium mb-4">
                    <span>Fonctionnalité exclusive</span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
                    <span className="relative">
                      Coach
                      <span className="absolute bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-red-500 transform"></span>
                    </span>
                    {" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-red-600">personnalisé</span>
                  </h3>
                  
                  <p className="text-gray-700 mb-8 leading-relaxed">
                    Choisissez la perspective qui vous convient le mieux. Notre coach peut adopter une approche masculine ou féminine pour vous offrir des conseils adaptés à vos préférences et à votre situation.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <div className="flex-1 relative group cursor-pointer">
                      <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-300"></div>
                      <div className="relative bg-white px-6 py-5 rounded-xl border border-pink-100 shadow-sm group-hover:shadow-md transition-all duration-300">
                        <div className="flex items-center mb-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center text-white font-semibold mr-3 text-sm">M</div>
                          <span className="text-lg font-medium text-gray-900">Approche masculine</span>
                        </div>
                        <p className="text-gray-600 text-sm">Conseils directs et stratégiques, focalisation sur les actions et solutions concrètes.</p>
                      </div>
                    </div>
                    
                    <div className="flex-1 relative group cursor-pointer">
                      <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-300"></div>
                      <div className="relative bg-white px-6 py-5 rounded-xl border border-pink-100 shadow-sm group-hover:shadow-md transition-all duration-300">
                        <div className="flex items-center mb-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center text-white font-semibold mr-3 text-sm">F</div>
                          <span className="text-lg font-medium text-gray-900">Approche féminine</span>
                        </div>
                        <p className="text-gray-600 text-sm">Conseils axés sur l'écoute et l'empathie, avec une attention aux aspects émotionnels des relations.</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white shadow-md hover:shadow-lg transition-all duration-300 rounded-lg">
                    <Link href="#pricing" className="flex items-center gap-2">
                      <span>Voir les tarifs</span>
                      <ArrowRight size={16} />
                    </Link>
                  </Button>
                </div>
                
                <div className="md:w-1/2 relative">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-tr from-pink-50 to-red-50 flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <div className="absolute -inset-10 bg-gradient-to-r from-pink-500/30 to-red-500/30 rounded-full blur-xl opacity-70"></div>
                        <HeartHandshake size={120} className="relative text-pink-600" />
                      </div>
                    </div>
                    
                    {/* Bulles décoratives */}
                    <div className="absolute top-5 right-5 w-16 h-16 rounded-full bg-gradient-to-br from-pink-200 to-pink-100 opacity-60"></div>
                    <div className="absolute bottom-5 left-5 w-12 h-12 rounded-full bg-gradient-to-r from-red-200 to-red-100 opacity-60"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;