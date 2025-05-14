'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle, ArrowDown, LineChart, BarChart, PieChart, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const parallaxRef = useRef<HTMLDivElement>(null);

  // Effet de parallaxe au mouvement de la souris
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (parallaxRef.current) {
        const rect = parallaxRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        });
      }
    };

    const currentRef = parallaxRef.current;
    if (currentRef) {
      currentRef.addEventListener('mousemove', handleMouseMove);
    }

    // Animation d'entrée
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('mousemove', handleMouseMove);
      }
      clearTimeout(timer);
    };
  }, []);

  // Calculer le déplacement parallaxe basé sur la position de la souris
  const getParallaxTransform = (factor: number) => {
    return {
      transform: `translate(${(mousePosition.x - 0.5) * factor * -1}px, ${(mousePosition.y - 0.5) * factor * -1}px)`
    };
  };

  return (
    <section 
      ref={parallaxRef}
      className="relative pt-28 pb-32 overflow-hidden bg-gradient-to-b from-adfi-slate-50 to-white"
    >
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 adfi-dot-pattern opacity-5"></div>
      
      {/* Cercles décoratifs */}
      <div
        className="absolute right-0 top-1/4 w-[600px] h-[600px] rounded-full bg-adfi-blue-100/30 blur-3xl"
        style={{...getParallaxTransform(15)}}
      ></div>
      <div
        className="absolute left-0 bottom-1/4 w-[500px] h-[500px] rounded-full bg-adfi-blue-100/20 blur-3xl"
        style={{...getParallaxTransform(20)}}
      ></div>
      
      {/* Pattern de lignes */}
      <div className="absolute right-0 top-0 h-full w-1/2 opacity-10">
        <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-adfi-blue-200/0 via-adfi-blue-500/50 to-adfi-blue-200/0"></div>
        <div className="absolute top-0 left-1/4 h-full w-px bg-gradient-to-b from-adfi-blue-200/0 via-adfi-blue-500/30 to-adfi-blue-200/0"></div>
        <div className="absolute top-0 left-2/4 h-full w-px bg-gradient-to-b from-adfi-blue-200/0 via-adfi-blue-500/50 to-adfi-blue-200/0"></div>
        <div className="absolute top-0 left-3/4 h-full w-px bg-gradient-to-b from-adfi-blue-200/0 via-adfi-blue-500/30 to-adfi-blue-200/0"></div>
      </div>

      {/* Grille animée subtile */}
      <div className="absolute inset-0 z-0">
        {[...Array(10)].map((_, rowIndex) => (
          [...Array(10)].map((_, colIndex) => (
            <div 
              key={`${rowIndex}-${colIndex}`}
              className="absolute w-1 h-1 rounded-full bg-adfi-blue-400/20"
              style={{
                top: `${5 + rowIndex * 10}%`,
                left: `${5 + colIndex * 10}%`,
                ...getParallaxTransform(10 + (rowIndex + colIndex))
              }}
            ></div>
          ))
        ))}
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Contenu texte */}
            <div className={`transition-all duration-1000 delay-100 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="space-y-8">
                <div className="inline-flex items-center space-x-2 bg-adfi-blue-50 text-adfi-blue-600 px-4 py-2 rounded-full backdrop-blur-sm border border-adfi-blue-200">
                  <span className="inline-block w-2 h-2 rounded-full bg-adfi-blue-500 animate-pulse"></span>
                  <span className="text-sm font-medium">IA pour Facebook Ads</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-adfi-slate-900 leading-tight">
                  Optimisez vos <span className="text-adfi-blue-600">Facebook Ads</span> <br />avec l'intelligence artificielle
                </h1>
                
                <p className="text-xl text-adfi-slate-600 max-w-xl leading-relaxed">
                  Améliorez vos performances publicitaires grâce à notre plateforme d'analyse avancée qui vous aide à prendre de meilleures décisions pour vos campagnes Facebook Ads.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Button size="lg" className="bg-adfi-blue-600 hover:bg-adfi-blue-700">
                    <span>Commencer maintenant</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Link 
                    href="#features" 
                    className="adfi-button-secondary bg-white hover:bg-adfi-slate-50 text-adfi-slate-800 px-8 py-3.5 rounded-xl font-semibold transition-all border border-adfi-slate-200 hover:border-adfi-slate-300 shadow-sm flex items-center justify-center"
                  >
                    <span>Découvrir les fonctionnalités</span>
                  </Link>
                </div>
                
                {/* Points forts */}
                <div className="pt-8 space-y-3">
                  {[
                    "Analyse détaillée de vos données publicitaires",
                    "Recommandations personnalisées basées sur vos performances",
                    "Import facile de vos données via CSV"
                  ].map((point, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-adfi-blue-500 mr-2 flex-shrink-0" />
                      <span className="text-adfi-slate-700">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Illustration SVG du dashboard au lieu de l'image */}
            <div className={`relative transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <div className="absolute inset-0 bg-gradient-to-r from-adfi-blue-500/30 via-adfi-blue-400/30 to-adfi-blue-500/30 blur-3xl opacity-30 rounded-full"></div>
              
              {/* Dashboard SVG */}
              <div 
                className="relative z-10 bg-white p-3 rounded-2xl border border-adfi-slate-200 shadow-2xl shadow-adfi-blue-500/10"
                style={{...getParallaxTransform(15)}}
              >
                <div className="adfi-dashboard-window rounded-xl overflow-hidden border border-adfi-slate-200">
                  {/* Barre de titre du navigateur */}
                  <div className="bg-adfi-slate-100 px-4 py-2 flex items-center border-b border-adfi-slate-200">
                    <div className="flex space-x-2 mr-4">
                      <div className="w-3 h-3 rounded-full bg-adfi-slate-300"></div>
                      <div className="w-3 h-3 rounded-full bg-adfi-slate-300"></div>
                      <div className="w-3 h-3 rounded-full bg-adfi-slate-300"></div>
                    </div>
                    <div className="flex-1 bg-white rounded-md h-6 flex items-center justify-center">
                      <span className="text-adfi-slate-400 text-xs">app.adinsight-ai.com</span>
                    </div>
                  </div>
                  
                  {/* Dashboard interactif SVG */}
                  <div className="relative bg-adfi-slate-50 p-6">
                    {/* Section supérieure du tableau de bord */}
                    <div className="flex justify-between mb-6">
                      <div className="flex space-x-4">
                        <div className="bg-white px-4 py-2 rounded-lg border border-adfi-slate-200 shadow-sm flex items-center">
                          <div className="w-3 h-3 bg-adfi-blue-500 rounded-full mr-2"></div>
                          <span className="text-adfi-slate-700 text-sm">Rapport journalier</span>
                        </div>
                        <div className="bg-white px-4 py-2 rounded-lg border border-adfi-slate-200 shadow-sm flex items-center">
                          <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
                          <span className="text-adfi-slate-700 text-sm">Performance</span>
                        </div>
                      </div>
                      <div className="bg-adfi-blue-600 text-white px-4 py-2 rounded-lg shadow-sm flex items-center text-sm">
                        <span>Export</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </div>

                    {/* Graphiques et statistiques */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {/* Statistique 1 */}
                      <div className="bg-white p-4 rounded-xl border border-adfi-slate-200 shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="text-adfi-slate-500 text-xs mb-1">CPC moyen</p>
                            <p className="text-adfi-slate-900 text-xl font-bold">0.42 €</p>
                          </div>
                          <div className="bg-adfi-blue-50 p-1.5 rounded-lg">
                            <LineChart className="h-4 w-4 text-adfi-blue-600" />
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="text-emerald-500 text-xs flex items-center">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            <span>-12.5%</span>
                          </div>
                          <span className="text-adfi-slate-400 text-xs ml-2">vs dernière période</span>
                        </div>
                      </div>

                      {/* Statistique 2 */}
                      <div className="bg-white p-4 rounded-xl border border-adfi-slate-200 shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="text-adfi-slate-500 text-xs mb-1">CTR</p>
                            <p className="text-adfi-slate-900 text-xl font-bold">3.28 %</p>
                          </div>
                          <div className="bg-amber-50 p-1.5 rounded-lg">
                            <BarChart className="h-4 w-4 text-amber-600" />
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="text-emerald-500 text-xs flex items-center">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            <span>+8.7%</span>
                          </div>
                          <span className="text-adfi-slate-400 text-xs ml-2">vs dernière période</span>
                        </div>
                      </div>

                      {/* Statistique 3 */}
                      <div className="bg-white p-4 rounded-xl border border-adfi-slate-200 shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="text-adfi-slate-500 text-xs mb-1">ROAS</p>
                            <p className="text-adfi-slate-900 text-xl font-bold">2.7x</p>
                          </div>
                          <div className="bg-emerald-50 p-1.5 rounded-lg">
                            <PieChart className="h-4 w-4 text-emerald-600" />
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="text-emerald-500 text-xs flex items-center">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            <span>+21.4%</span>
                          </div>
                          <span className="text-adfi-slate-400 text-xs ml-2">vs dernière période</span>
                        </div>
                      </div>
                    </div>

                    {/* Graphique principal */}
                    <div className="bg-white p-5 rounded-xl border border-adfi-slate-200 shadow-sm mb-6">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <p className="text-adfi-slate-900 font-semibold">Performance des campagnes</p>
                          <p className="text-adfi-slate-500 text-xs">Comparaison sur 30 jours</p>
                        </div>
                        <div className="flex space-x-2">
                          <div className="bg-adfi-slate-100 px-3 py-1 rounded text-xs text-adfi-slate-600">CPC</div>
                          <div className="bg-adfi-blue-100 px-3 py-1 rounded text-xs text-adfi-blue-600">Conversions</div>
                        </div>
                      </div>
                      
                      {/* Graphe SVG */}
                      <div className="h-28 relative">
                        {/* Lignes de grille horizontales */}
                        <div className="absolute inset-0">
                          {[0, 1, 2, 3].map((i) => (
                            <div key={i} className="absolute w-full h-px bg-adfi-slate-100" style={{top: `${i * 33}%`}}></div>
                          ))}
                        </div>
                        
                        {/* Courbe CPC */}
                        <svg className="absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                          <path 
                            d="M0,70 C10,60 20,65 30,55 C40,45 50,50 60,40 C70,30 80,35 90,25 L90,100 L0,100 Z" 
                            fill="rgba(59, 130, 246, 0.1)" 
                          />
                          <path 
                            d="M0,70 C10,60 20,65 30,55 C40,45 50,50 60,40 C70,30 80,35 90,25" 
                            fill="none" 
                            stroke="#3B82F6" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                          />
                        </svg>
                        
                        {/* Courbe Conversions */}
                        <svg className="absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                          <path 
                            d="M0,80 C15,75 25,85 40,75 C55,65 65,70 75,55 C85,40 90,45 100,30" 
                            fill="none" 
                            stroke="#10B981" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeDasharray="2 2" 
                          />
                        </svg>
                        
                        {/* Points de données */}
                        {[25, 55, 85].map((x, i) => (
                          <div 
                            key={i} 
                            className="absolute w-3 h-3 bg-white border-2 border-adfi-blue-500 rounded-full"
                            style={{left: `${x}%`, top: `${30 + (i * 10)}%`, transform: 'translate(-50%, -50%)'}}
                          ></div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Tableau de données */}
                    <div className="bg-white rounded-xl border border-adfi-slate-200 shadow-sm overflow-hidden">
                      <div className="px-5 py-3 border-b border-adfi-slate-200 bg-adfi-slate-50">
                        <p className="text-adfi-slate-700 font-semibold">Campagnes actives</p>
                      </div>
                      <div className="px-5 py-2 border-b border-adfi-slate-100">
                        <div className="flex justify-between items-center">
                          <p className="text-adfi-slate-900 text-sm">Campagne Automne</p>
                          <div className="flex items-center">
                            <div className="w-16 h-1.5 bg-adfi-slate-100 rounded-full overflow-hidden mr-3">
                              <div className="h-full w-3/4 bg-adfi-blue-500 rounded-full"></div>
                            </div>
                            <p className="text-adfi-slate-700 text-sm">75%</p>
                          </div>
                        </div>
                      </div>
                      <div className="px-5 py-2 border-b border-adfi-slate-100">
                        <div className="flex justify-between items-center">
                          <p className="text-adfi-slate-900 text-sm">Promotion Hiver</p>
                          <div className="flex items-center">
                            <div className="w-16 h-1.5 bg-adfi-slate-100 rounded-full overflow-hidden mr-3">
                              <div className="h-full w-1/2 bg-amber-500 rounded-full"></div>
                            </div>
                            <p className="text-adfi-slate-700 text-sm">50%</p>
                          </div>
                        </div>
                      </div>
                      <div className="px-5 py-2">
                        <div className="flex justify-between items-center">
                          <p className="text-adfi-slate-900 text-sm">Lancement Produit</p>
                          <div className="flex items-center">
                            <div className="w-16 h-1.5 bg-adfi-slate-100 rounded-full overflow-hidden mr-3">
                              <div className="h-full w-5/6 bg-emerald-500 rounded-full"></div>
                            </div>
                            <p className="text-adfi-slate-700 text-sm">83%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Stats flottantes */}
              <div 
                className="absolute top-5 -right-12 bg-white shadow-xl rounded-xl p-4 z-20 w-64 border border-adfi-slate-200"
                style={{...getParallaxTransform(25)}}
              >
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-lg bg-adfi-blue-100 flex items-center justify-center text-adfi-blue-600 mr-3 flex-shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-adfi-slate-900 font-semibold text-sm">ROAS amélioré</h4>
                    <p className="text-adfi-slate-600 text-xs mb-1">Augmentation significative</p>
                    <div className="w-full h-1.5 bg-adfi-slate-100 rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-gradient-to-r from-adfi-blue-500 to-adfi-blue-600 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Métriques flottantes */}
              <div 
                className="absolute -bottom-8 -left-12 bg-white shadow-xl rounded-xl p-4 z-20 w-64 border border-adfi-slate-200"
                style={{...getParallaxTransform(20)}}
              >
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-lg bg-adfi-blue-100 flex items-center justify-center text-adfi-blue-600 mr-3 flex-shrink-0">
                    <BarChart className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-adfi-slate-900 font-semibold text-sm">Prédictions IA</h4>
                    <p className="text-adfi-slate-600 text-xs">93% de précision</p>
                    <div className="flex justify-between mt-1.5">
                      <span className="text-adfi-blue-600 text-xs font-semibold">+27.5%</span>
                      <span className="text-adfi-slate-500 text-xs">vs prévisions</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Indicateur de scroll */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
            <span className="text-adfi-slate-500 text-sm mb-2">Découvrez nos fonctionnalités</span>
            <ArrowDown className="h-5 w-5 text-adfi-blue-500" />
          </div>
        </div>
      </div>
    </section>
  );
}