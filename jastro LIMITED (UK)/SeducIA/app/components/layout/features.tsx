'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { 
  ArrowRight, 
  Heart, 
  MessageCircle, 
  Users, 
  Sparkles, 
  Flame,
  Trophy,
  Zap,
  Coffee,
  Sun,
  Check
} from 'lucide-react';
import Link from 'next/link';

export default function Features() {
  const [activeTab, setActiveTab] = useState(0);
  
  const tabs = [
    {
      title: "Conseils personnalisés",
      description: "Recevez des conseils de séduction adaptés à votre profil et à vos situations spécifiques.",
      icon: <Sparkles className="h-5 w-5" />,
      color: "from-[#FF5C3E] to-[#FF8046]"
    },
    {
      title: "Conversations interactives",
      description: "Échangez directement avec notre coach IA qui vous aide à améliorer vos approches et techniques de séduction.",
      icon: <MessageCircle className="h-5 w-5" />,
      color: "from-[#FFA728] to-[#FF7E2E]"
    },
    {
      title: "Approches adaptées",
      description: "Des conseils spécifiques pour hommes et femmes, tenant compte des différentes dynamiques relationnelles.",
      icon: <Users className="h-5 w-5" />,
      color: "from-[#FF7E2E] to-[#E83A20]"
    }
  ];
  
  const features = [
    {
      title: "Conseils pour hommes",
      description: "Notre IA offre des stratégies de séduction adaptées aux hommes souhaitant développer leur confiance et leur attractivité.",
      icon: <Flame className="h-6 w-6 text-[#FF5C3E]" />
    },
    {
      title: "Conseils pour femmes",
      description: "Des recommandations personnalisées pour les femmes désirant améliorer leurs interactions amoureuses et leur approche relationnelle.",
      icon: <Heart className="h-6 w-6 text-[#FFA728]" />
    },
    {
      title: "Chat IA spécialisé",
      description: "Une interface de conversation simple et intuitive pour échanger avec notre coach virtuel expert en séduction.",
      icon: <MessageCircle className="h-6 w-6 text-[#FF8046]" />
    },
    {
      title: "Réponses immédiates",
      description: "Obtenez des conseils instantanés à vos questions, à tout moment, sans rendez-vous ni attente.",
      icon: <Zap className="h-6 w-6 text-[#E83A20]" />
    }
  ];
  
  return (
    <section className="relative overflow-hidden yfc-gradient-bg py-24" id="features">
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 yfc-pattern-bg opacity-50"></div>
      <div className="absolute -top-40 right-0 w-96 h-96 rounded-full bg-[#FFA728]/40 blur-3xl"></div>
      <div className="absolute -bottom-40 left-0 w-96 h-96 rounded-full bg-[#FF5C3E]/40 blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex px-4 py-1.5 rounded-full bg-[#FFF0E8] text-[#FF5C3E] text-sm font-medium border border-[#FF5C3E]/20 mb-4"
          >
            <Flame className="mr-2 h-4 w-4" />
            Notre passion
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-[#45301C] mb-6"
          >
            Des outils qui <span className="yfc-heading-accent">enflamment</span> vos relations
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-[#45301C]/80 text-lg"
          >
            Notre assistant conversationnel utilise l'intelligence artificielle pour vous offrir des conseils de séduction personnalisés, que vous soyez un homme ou une femme.
          </motion.p>
        </div>
        
        {/* Tabs section */}
        <div className="mb-16">
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {tabs.map((tab, idx) => (
              <motion.button
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * idx }}
                viewport={{ once: true }}
                className={`px-5 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === idx 
                  ? 'bg-[#FF5C3E] text-white shadow-lg scale-105' 
                  : 'bg-white text-[#45301C] hover:bg-[#FFF0E8] shadow-md'
                }`}
                onClick={() => setActiveTab(idx)}
              >
                <div className="flex items-center">
                  <div className={`mr-2 ${activeTab === idx ? 'text-white' : 'text-[#FF5C3E]'}`}>
                    {tab.icon}
                  </div>
                  {tab.title}
                </div>
              </motion.button>
            ))}
          </div>
          
          <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
            {tabs.map((tab, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: activeTab === idx ? 1 : 0,
                  display: activeTab === idx ? 'block' : 'none'
                }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="p-8 lg:p-12 order-2 lg:order-1 flex items-center">
                    <div className="max-w-lg">
                      <div className={`inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r ${tab.color} text-white text-sm font-medium mb-4`}>
                        {tab.icon}
                        <span className="ml-2">{tab.title}</span>
                      </div>
                      
                      <h3 className="text-2xl md:text-3xl font-bold text-[#45301C] mb-4">
                        {tab.title}
                      </h3>
                      
                      <p className="text-[#45301C]/80 text-lg mb-6">
                        {tab.description}
                      </p>
                      
                      <ul className="space-y-3 mb-8">
                        {idx === 0 && [
                          "Conseils adaptés à votre situation spécifique",
                          "Stratégies pour développer votre confiance",
                          "Techniques de conversation efficaces"
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-1 h-5 w-5 rounded-full bg-[#FF5C3E] flex items-center justify-center">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="text-[#45301C]/80">{item}</span>
                          </li>
                        ))}
                        
                        {idx === 1 && [
                          "Simulations de conversations réalistes",
                          "Retours constructifs sur vos approches",
                          "Idées pour engager et maintenir l'intérêt"
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-1 h-5 w-5 rounded-full bg-[#FF5C3E] flex items-center justify-center">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="text-[#45301C]/80">{item}</span>
                          </li>
                        ))}
                        
                        {idx === 2 && [
                          "Abordez différents sujets de séduction",
                          "Consultez plusieurs perspectives d'experts",
                          "Reprenez vos conversations précédentes"
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-1 h-5 w-5 rounded-full bg-[#FF5C3E] flex items-center justify-center">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="text-[#45301C]/80">{item}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <Link href="/#pricing">
                        <Button className="yfc-btn-primary group">
                          <span className="flex items-center">
                            Voir nos tarifs
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                  
                  <div className="relative h-64 lg:h-auto order-1 lg:order-2">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FF5C3E]/20 to-[#FFA728]/20 mix-blend-multiply z-10"></div>
                    {idx === 0 && (
                      <div className="w-full h-full flex items-center justify-center bg-[#FFF8F5] p-8">
                        <div className="relative w-full h-full">
                          {/* Illustration pour Conseils énergisants */}
                          <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-[#FFA728]/30 rounded-full"></div>
                          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-[#FF5C3E]/40 rounded-full transform -translate-y-1/2"></div>
                          <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-[#FFDECF] rounded-full"></div>
                          
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                            <div className="w-24 h-24 bg-gradient-to-r from-[#FF5C3E] to-[#FFA728] rounded-full flex items-center justify-center shadow-lg">
                              <Sparkles className="h-10 w-10 text-white" />
                            </div>
                            <div className="mt-4 bg-white p-3 rounded-lg shadow-md border border-[#FFDECF]">
                              <p className="text-[#2D1811] font-semibold text-center">Conseils personnalisés</p>
                            </div>
                            
                            {/* Lignes connectant les éléments */}
                            <svg width="300" height="300" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10">
                              <path d="M150,150 L100,100" stroke="#FF5C3E" strokeWidth="2" strokeDasharray="4" />
                              <path d="M150,150 L200,120" stroke="#FF5C3E" strokeWidth="2" strokeDasharray="4" />
                              <path d="M150,150 L90,140" stroke="#FF5C3E" strokeWidth="2" strokeDasharray="4" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {idx === 1 && (
                      <div className="w-full h-full flex items-center justify-center bg-[#FFF8F5] p-8">
                        <div className="relative w-full h-full">
                          {/* Illustration pour Conversations passionnées */}
                          <div className="absolute bottom-1/4 left-1/4 w-28 h-28 bg-[#FF5C3E]/20 rounded-full"></div>
                          <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-[#FFA728]/20 rounded-full"></div>
                          
                          <div className="absolute top-1/3 left-1/3 transform -translate-y-1/2">
                            <div className="w-16 h-16 bg-[#F7C8BA] rounded-full flex items-center justify-center">
                              <span className="text-[#FF5C3E] text-sm font-bold">Vous</span>
                            </div>
                          </div>
                          
                          <div className="absolute bottom-1/3 right-1/3 transform translate-y-1/2">
                            <div className="w-16 h-16 bg-[#FF5C3E] rounded-full flex items-center justify-center">
                              <Sparkles className="h-6 w-6 text-white" />
                            </div>
                          </div>
                          
                          {/* Bulles de conversation */}
                          <div className="absolute top-1/3 left-1/3 transform translate-x-8">
                            <div className="bg-white p-3 rounded-lg shadow-md border border-[#FFDECF] max-w-[120px] ml-8">
                              <p className="text-[#2D1811] text-xs">Comment puis-je engager la conversation?</p>
                            </div>
                          </div>
                          
                          <div className="absolute bottom-1/3 right-1/3 transform -translate-y-2 -translate-x-8">
                            <div className="bg-[#FF5C3E] p-3 rounded-lg shadow-md max-w-[120px] mr-8">
                              <p className="text-white text-xs">Voici 3 techniques pour briser la glace...</p>
                            </div>
                          </div>
                          
                          {/* Ligne connectant les bulles */}
                          <svg width="300" height="300" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10">
                            <path d="M120,120 L180,180" stroke="#FFDECF" strokeWidth="3" strokeDasharray="6" />
                          </svg>
                        </div>
                      </div>
                    )}
                    
                    {idx === 2 && (
                      <div className="w-full h-full flex items-center justify-center bg-[#FFF8F5] p-8">
                        <div className="relative w-full h-full">
                          {/* Illustration pour Conversations multiples */}
                          <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-[#FF5C3E]/20 rounded-lg transform rotate-12"></div>
                          <div className="absolute bottom-1/4 left-1/3 w-18 h-18 bg-[#FFA728]/20 rounded-lg transform -rotate-6"></div>
                          <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-[#FFDECF]/60 rounded-lg transform rotate-3"></div>
                          
                          {/* Bulle de conversation 1 */}
                          <div className="absolute top-1/4 left-1/3 bg-white p-3 rounded-lg shadow-md border border-[#FFDECF] max-w-[120px]">
                            <div className="flex items-center mb-2">
                              <div className="w-6 h-6 bg-[#FF5C3E] rounded-full flex items-center justify-center mr-2">
                                <span className="text-white text-xs font-bold">1</span>
                              </div>
                              <p className="text-[#2D1811] text-xs font-semibold">Coach Emma</p>
                            </div>
                            <p className="text-[#2D1811] text-xs">Parlons de votre approche...</p>
                          </div>
                          
                          {/* Bulle de conversation 2 */}
                          <div className="absolute bottom-1/3 left-1/4 bg-white p-3 rounded-lg shadow-md border border-[#FFDECF] max-w-[120px]">
                            <div className="flex items-center mb-2">
                              <div className="w-6 h-6 bg-[#FFA728] rounded-full flex items-center justify-center mr-2">
                                <span className="text-white text-xs font-bold">2</span>
                              </div>
                              <p className="text-[#2D1811] text-xs font-semibold">Coach Alex</p>
                            </div>
                            <p className="text-[#2D1811] text-xs">Voici un exercice à pratiquer...</p>
                          </div>
                          
                          {/* Bulle de conversation 3 */}
                          <div className="absolute top-1/3 right-1/3 bg-white p-3 rounded-lg shadow-md border border-[#FFDECF] max-w-[120px]">
                            <div className="flex items-center mb-2">
                              <div className="w-6 h-6 bg-[#FF8046] rounded-full flex items-center justify-center mr-2">
                                <span className="text-white text-xs font-bold">3</span>
                              </div>
                              <p className="text-[#2D1811] text-xs font-semibold">Coach Sam</p>
                            </div>
                            <p className="text-[#2D1811] text-xs">Analysons cette situation...</p>
                          </div>
                          
                          {/* Élément central utilisateur */}
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="w-20 h-20 bg-gradient-to-r from-[#FF5C3E] to-[#FFA728] rounded-full flex items-center justify-center shadow-lg">
                              <Users className="h-10 w-10 text-white" />
                            </div>
                          </div>
                          
                          {/* Lignes connectant les conversations */}
                          <svg width="300" height="300" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10">
                            <path d="M150,150 L100,100" stroke="#FF5C3E" strokeWidth="2" strokeDasharray="3,3" />
                            <path d="M150,150 L100,200" stroke="#FFA728" strokeWidth="2" strokeDasharray="3,3" />
                            <path d="M150,150 L200,120" stroke="#FF8046" strokeWidth="2" strokeDasharray="3,3" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-24">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * idx }}
              viewport={{ once: true }}
              className="yfc-card hover-lift"
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FFF0E8] flex items-center justify-center">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#45301C] mb-2">{feature.title}</h3>
                  <p className="text-[#45301C]/80">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="yfc-card-warm max-w-3xl mx-auto p-8 shadow-lg relative">
            <div className="absolute -top-5 -left-5 w-10 h-10 bg-[#FFA728] rounded-lg shadow-md transform rotate-12 z-0"></div>
            <div className="absolute -bottom-5 -right-5 w-10 h-10 bg-[#FF5C3E] rounded-lg shadow-md transform -rotate-6 z-0"></div>
            
            <h3 className="text-2xl font-bold text-[#45301C] mb-4">Prêt à transformer votre vie amoureuse?</h3>
            <p className="text-[#45301C]/80 mb-8">Soyez parmi les premiers à discuter avec notre coach IA spécialisé en séduction et découvrez comment améliorer vos interactions amoureuses.</p>
            
            <Link href="/#pricing">
              <Button className="yfc-btn-primary group">
                <span className="flex items-center">
                  Voir nos tarifs
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}