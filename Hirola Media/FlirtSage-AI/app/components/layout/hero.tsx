'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Heart, ChevronRight, Star, ArrowRight, MessageCircle, User, Award, BookOpen, Zap, Clock, ShieldCheck, Brain } from 'lucide-react';
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const quotes = [
    "Je ne savais pas comment aborder les gens. FlirtSageAI m'a donné la confiance dont j'avais besoin.",
    "Après un mois d'utilisation, j'ai eu mon premier rendez-vous en 2 ans !",
    "Les conseils personnalisés ont complètement transformé ma façon d'interagir.",
    "Grâce à FlirtSageAI, j'ai enfin compris ce qui ne fonctionnait pas dans mes conversations."
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    const quoteInterval = setInterval(() => {
      setCurrentQuote(prev => (prev + 1) % quotes.length);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(quoteInterval);
    };
  }, [quotes.length]);

  return (
    <section 
      ref={heroRef}
      className="relative pt-28 pb-20 overflow-hidden bg-gradient-to-b from-white to-yfc-cream-50"
    >
      {/* Éléments décoratifs subtils */}
      <div className="absolute inset-0 bg-[url('/subtle-pattern.svg')] bg-repeat opacity-[0.03]"></div>
      <div className="absolute right-0 top-1/4 w-80 h-80 rounded-full bg-yfc-gold-100/30 blur-3xl -z-10"></div>
      <div className="absolute left-0 bottom-1/4 w-64 h-64 rounded-full bg-yfc-cream-200/40 blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section supérieure centrée */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className={`transform transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="inline-flex items-center space-x-2 bg-yfc-cream-100 text-yfc-gold-800 px-4 py-2 rounded-full mb-6">
                <span className="text-sm font-medium">Coaching de séduction intelligent</span>
              </div>
              
              <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl font-light text-gray-900 mb-6 leading-tight">
                Devenez <span className="yfc-elegant-text relative inline-block">
                  irrésistible
                  <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-yfc-gold-400"></span>
                </span> en amour
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Des conseils personnalisés pour cultiver votre confiance et transformer vos relations amoureuses en expériences épanouissantes.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                <Link href="#pricing" className="yfc-button-primary">
                  <span>Découvrir nos offres</span>
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Link>
                <Link href="#features" className="yfc-button-secondary">
                  <span>En savoir plus</span>
                </Link>
              </div>
              
              {/* Badges de confiance */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-gray-500 text-sm">
                <div className="flex items-center">
                  <MessageCircle className="h-4 w-4 text-yfc-gold-500 mr-2" />
                  <span>Conseils personnalisés</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-yfc-gold-500 mr-2" />
                  <span>Disponible 24/7</span>
                </div>
                <div className="flex items-center">
                  <ShieldCheck className="h-4 w-4 text-yfc-gold-500 mr-2" />
                  <span>Sécurisé et confidentiel</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Interface principale */}
          <div className={`grid md:grid-cols-2 gap-10 items-center transform transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Témoignages et téléphone */}
            <div className="relative order-2 md:order-1">
              {/* Carte témoignage */}
              <div className="absolute -right-4 top-12 w-60 bg-white shadow-lg rounded-xl p-4 z-10 animate-float">
                <div className="flex items-center mb-3">
                  <div className="h-10 w-10 rounded-full overflow-hidden mr-3 bg-yfc-gold-100 flex items-center justify-center">
                    <User className="h-6 w-6 text-yfc-gold-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Assistant IA</p>
                    <div className="text-xs text-gray-500">Votre coach virtuel</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 transition-opacity duration-300">
                  "Je suis là pour vous aider à améliorer vos compétences relationnelles et votre confiance en vous."
                </p>
              </div>
              
              {/* Interface mobile */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 max-w-md mx-auto">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yfc-gold-400 to-yfc-gold-600 flex items-center justify-center">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-900 font-medium">FlirtSageAI</p>
                      <p className="text-xs text-gray-500 flex items-center">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block mr-1"></span>
                        En ligne
                      </p>
                    </div>
                  </div>
                  <div className="text-gray-400">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="19" cy="12" r="1" />
                      <circle cx="5" cy="12" r="1" />
                    </svg>
                  </div>
                </div>
                
                <div className="space-y-4 p-2">
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-2xl rounded-tl-none py-3 px-4 max-w-[80%]">
                      <p className="text-gray-800 text-sm">Bonjour, je suis FlirtSageAI. Comment puis-je vous aider aujourd'hui ?</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <div className="bg-yfc-gold-100 text-yfc-gold-900 rounded-2xl rounded-tr-none py-3 px-4 max-w-[80%]">
                      <p className="text-sm">J'aimerais des conseils pour mon premier rendez-vous ce soir.</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-2xl rounded-tl-none py-3 px-4 max-w-[80%]">
                      <p className="text-gray-800 text-sm">Félicitations pour ce rendez-vous ! Voici quelques conseils personnalisés pour vous aider à réussir cette soirée...</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 border-t border-gray-100 pt-4">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Posez votre question..." 
                      className="w-full py-3 px-4 bg-gray-50 rounded-full border border-gray-200 focus:outline-none focus:ring-1 focus:ring-yfc-gold-300 focus:border-yfc-gold-300 text-sm"
                    />
                    <button className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full bg-yfc-gold-500 flex items-center justify-center">
                      <ArrowRight className="h-4 w-4 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Texte et avantages */}
            <div className="order-1 md:order-2">
              <div className="space-y-6">
                <h2 className="font-serif text-2xl md:text-3xl font-light text-gray-900 mb-2">
                  Votre coach personnel de séduction disponible à tout moment
                </h2>
                
                <p className="text-gray-600">
                  FlirtSageAI utilise l'intelligence artificielle pour vous offrir des conseils personnalisés et des stratégies efficaces adaptées à votre personnalité et à vos objectifs relationnels.
                </p>
                
                <div className="space-y-4">
                  {[
                    {
                      title: "Conseils personnalisés",
                      description: "Des recommandations sur mesure adaptées à votre personnalité et vos objectifs",
                      icon: <BookOpen className="h-5 w-5 text-yfc-gold-700" />
                    },
                    {
                      title: "Disponible 24/7",
                      description: "Obtenez des conseils à tout moment, où que vous soyez",
                      icon: <Clock className="h-5 w-5 text-yfc-gold-700" />
                    },
                    {
                      title: "Discret et confidentiel",
                      description: "Vos conversations restent privées et sécurisées",
                      icon: <ShieldCheck className="h-5 w-5 text-yfc-gold-700" />
                    }
                  ].map((item, i) => (
                    <div key={i} className="flex">
                      <div className="h-10 w-10 rounded-full bg-yfc-gold-100 flex-shrink-0 flex items-center justify-center mr-4">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Link href="#pricing" className="yfc-text-link inline-flex items-center text-yfc-gold-800 hover:text-yfc-gold-900">
                  <span>Découvrir nos offres</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 