'use client';

import { useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Clock, Languages, TimerOff, Coins } from 'lucide-react';

export default function Stats() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  // Fonction pour animer les compteurs
  const animateValue = (obj: HTMLElement, start: number, end: number, duration: number) => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      obj.innerHTML = value.toString();
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  // Référence aux compteurs
  const counters = useRef<(HTMLElement | null)[]>([]);

  // Démarrer l'animation lorsque la section est visible
  useEffect(() => {
    if (inView) {
      const counterElements = counters.current.filter(el => el !== null) as HTMLElement[];
      const values = [45, 25, 12, 30];
      
      counterElements.forEach((counter, index) => {
        animateValue(counter, 0, values[index], 2000);
      });
    }
  }, [inView]);

const stats = [
  {
      icon: <Clock className="w-6 h-6 text-ocrf-gold-400" />,
      value: 45,
      label: "secondes en moyenne",
      description: "Génération d'un article complet en quelques instants"
    },
    {
      icon: <Languages className="w-6 h-6 text-ocrf-copper-400" />,
      value: 25,
      label: "langues disponibles",
      description: "Créez du contenu dans de nombreuses langues"
    },
    {
      icon: <TimerOff className="w-6 h-6 text-ocrf-gold-400" />,
      value: 12,
      label: "heures économisées",
      description: "Par article généré par rapport à la rédaction manuelle"
    },
    {
      icon: <Coins className="w-6 h-6 text-ocrf-copper-400" />,
      value: 30,
      label: "fois moins cher",
      description: "Qu'un rédacteur (100€ pour 1500 mots en moyenne)"
    }
  ];
  
  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-ocrf-brown-900 to-ocrf-anthracite-900 overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto relative">
        {/* Particules décoratives */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 15 }).map((_, index) => (
            <div 
              key={index}
              className="absolute w-1 h-20 bg-gradient-to-b from-ocrf-gold-500/0 via-ocrf-gold-500/20 to-ocrf-gold-500/0"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 45}deg)`,
                opacity: Math.random() * 0.3 + 0.1
              }}
            />
          ))}
          
          {/* Cercles décoratifs */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full border border-ocrf-copper-500/10 opacity-30"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full border border-ocrf-gold-500/10 opacity-30"></div>
        </div>
        
        {/* En-tête de section */}
        <div className="text-center mb-16 relative z-10">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-ocrf-copper-500/10 text-ocrf-copper-500 text-sm font-medium mb-4">
            Performance
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-ocrf-gold-300 to-ocrf-copper-400 mb-4">
            Des statistiques impressionnantes
          </h2>
          
          <p className="text-ocrf-brown-100 max-w-2xl mx-auto">
            Notre outil de génération de contenu IA vous fait gagner du temps et réduire vos coûts tout en maintenant une qualité exceptionnelle.
          </p>
        </div>
        
        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {stats.map((stat, i) => (
            <div 
              key={i} 
              className={`relative bg-ocrf-anthracite-800/40 backdrop-blur-sm border border-ocrf-gold-500/10 rounded-xl p-6 transition-all duration-700 ease-out ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Effet de lueur au survol */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-ocrf-copper-500/5 to-ocrf-gold-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Cercle décoratif */}
              <div className="absolute -top-3 -right-3 w-20 h-20 bg-gradient-to-br from-ocrf-copper-500/5 to-ocrf-gold-500/5 rounded-full blur-xl"></div>
              
              <div className="flex flex-col items-center text-center space-y-4 relative z-10">
                {/* Icône */}
                <div className="rounded-full w-14 h-14 flex items-center justify-center bg-gradient-to-br from-ocrf-gold-500/20 to-ocrf-copper-500/20 border border-ocrf-gold-500/20 shadow-lg shadow-ocrf-copper-500/5">
                  {stat.icon}
                </div>
                
                {/* Valeur */}
                <div className="text-5xl font-bold text-white flex items-baseline">
                  <span 
                    ref={(el) => { counters.current[i] = el }}
                    className="counter"
                  >
                    0
                  </span>
                  {i !== 3 && <span className="text-ocrf-gold-400 ml-1">{i === 0 ? "s" : "+"}</span>}
                  {i === 3 && <span className="text-ocrf-gold-400 ml-1">x</span>}
                </div>
                
                {/* Label */}
                <h3 className="text-lg font-semibold text-ocrf-gold-300">
                  {stat.label}
                </h3>
                
                {/* Description */}
                <p className="text-sm text-ocrf-brown-200">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Élément décoratif horizontal */}
        <div className="mt-16 relative z-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-ocrf-gold-500/20 to-transparent"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-ocrf-brown-900 px-4">
              <span className="inline-block w-2 h-2 rounded-full bg-ocrf-gold-400"></span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}