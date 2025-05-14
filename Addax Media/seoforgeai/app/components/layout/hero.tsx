'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { ArrowRight, Zap, CheckCircle, Type, LineChart, Search, Sparkles, Clock } from "lucide-react";

export default function Hero() {
  const [activeIcon, setActiveIcon] = useState(0);
  const icons = [Type, LineChart, Search, Sparkles, Clock];
  const iconColors = ['#f59e0b', '#3b82f6', '#8b5cf6', '#10b981', '#ef4444'];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIcon((prev) => (prev + 1) % icons.length);
    }, 1500);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden">
      {/* Éléments de design de fond */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-10"></div>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute -top-40 right-0 w-96 h-96 bg-amber-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>
        <div className="absolute top-20 -left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-overlay filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500 rounded-full mix-blend-overlay filter blur-3xl opacity-10"></div>
      </div>

      <div className="container mx-auto px-4 py-20 lg:py-32 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left max-w-3xl mx-auto lg:mx-0">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-600/20 text-amber-400 text-sm font-medium mb-6">
              <Zap className="h-4 w-4 mr-2" />
              <span>Propulsé par l'IA avancée</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              Révolutionnez votre <span className="text-amber-500">contenu SEO</span> avec l'intelligence artificielle
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
              Générateur d'articles SEO et de descriptions produits optimisés pour les moteurs de recherche.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <Button size="lg" className="rounded-full px-8 bg-amber-500 hover:bg-amber-600 text-white font-medium">
                Découvrir la plateforme
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-8 border-gray-500 text-white hover:bg-white/10">
                Voir les tarifs
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-gray-300">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-amber-500" />
                <span>Contenu unique</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-amber-500" />
                <span>Optimisé pour le SEO</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-amber-500" />
                <span>Génération rapide</span>
              </div>
            </div>
          </div>
          
          <div className="flex-1 w-full max-w-xl relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl blur-xl opacity-20 transform rotate-3"></div>
            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8 shadow-2xl min-h-[400px] flex items-center justify-center">
              {/* Animation d'interface de dashboard */}
              <div className="relative w-full max-w-md mx-auto">
                {/* En-tête du dashboard */}
                <div className="bg-gray-800 rounded-t-lg p-4 border-b border-gray-700">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="h-6 bg-gray-700 rounded-md w-3/4 mb-2"></div>
                </div>
                
                {/* Contenu du dashboard */}
                <div className="bg-gray-900 p-6 rounded-b-lg border-x border-b border-gray-700">
                  <div className="flex justify-center mb-8">
                    {icons.map((Icon, index) => {
                      const CurrentIcon = Icon;
                      const isActive = index === activeIcon;
                      return (
                        <div 
                          key={index}
                          className={`relative p-4 mx-2 rounded-full transition-all duration-300 ease-in-out ${isActive ? 'transform scale-125' : 'opacity-40'}`}
                          style={{ 
                            backgroundColor: isActive ? `${iconColors[index]}20` : 'transparent',
                          }}
                        >
                          <CurrentIcon 
                            className="w-6 h-6 transition-all duration-300"
                            style={{ 
                              color: iconColors[index],
                              filter: isActive ? 'drop-shadow(0 0 8px ' + iconColors[index] + ')' : 'none'
                            }}
                          />
                          {isActive && (
                            <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium" style={{ color: iconColors[index] }}>
                              {['Contenu', 'Analyse', 'SEO', 'Originalité', 'Rapide'][index]}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="space-y-3 mt-8">
                    <div className="h-4 bg-gray-800 rounded-full w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-800 rounded-full w-5/6"></div>
                    <div className="h-4 bg-gray-800 rounded-full w-4/6"></div>
                    <div className="h-4 bg-gray-800 rounded-full w-full animate-pulse delay-75"></div>
                    <div className="h-4 bg-gray-800 rounded-full w-3/4"></div>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <div 
                      className="h-10 w-32 rounded-md bg-amber-500 animate-pulse"
                      style={{ animationDuration: '2s' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-amber-500 rounded-full opacity-20 blur-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
} 