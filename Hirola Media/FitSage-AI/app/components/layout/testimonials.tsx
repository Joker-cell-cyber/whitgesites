'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { Quote, Star, ChevronLeft, ChevronRight, MessageSquare, ArrowUpRight } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
  platform: string;
  date: string;
  badges?: string[];
}

export default function Testimonials() {
  const testimonialsData: Testimonial[] = [
    {
      id: 1,
      name: "Thomas Laurent",
      role: "Coach sportif",
      avatar: "/images/avatars/user-1.jpg",
      content: "FitSage AI a révolutionné ma façon d'aborder l'entraînement de mes clients. L'IA adapte les programmes avec une précision que je n'avais jamais vue auparavant, prenant en compte chaque détail de leur progression.",
      rating: 5,
      platform: "Trustpilot",
      date: "Juin 2023",
      badges: ["Coach Certifié", "Utilisateur Premium"]
    },
    {
      id: 2,
      name: "Sophie Mercier",
      role: "Athlète amateur",
      avatar: "/images/avatars/user-2.jpg",
      content: "Après avoir essayé de nombreuses applications de fitness, FitSage AI est la seule qui s'est véritablement adaptée à mes objectifs. J'ai vu des résultats concrets en seulement 2 mois d'utilisation régulière.",
      rating: 5,
      platform: "Google",
      date: "Avril 2023"
    },
    {
      id: 3,
      name: "Marc Dubois",
      role: "Entrepreneur",
      avatar: "/images/avatars/user-3.jpg",
      content: "Avec mon emploi du temps chargé, je n'arrivais pas à maintenir une routine d'entraînement cohérente. FitSage AI a créé un programme qui s'intègre parfaitement à ma vie, avec des séances courtes mais efficaces.",
      rating: 4,
      platform: "Trustpilot",
      date: "Mai 2023",
      badges: ["Utilisateur depuis +1 an"]
    },
    {
      id: 4,
      name: "Émilie Rousseau",
      role: "Kinésithérapeute",
      avatar: "/images/avatars/user-4.jpg",
      content: "En tant que professionnelle de la santé, j'apprécie la rigueur scientifique derrière FitSage AI. Les programmes respectent parfaitement les contraintes physiques et les recommandations que je donne à mes patients.",
      rating: 5,
      platform: "Google",
      date: "Juillet 2023",
      badges: ["Professionnelle de Santé", "Utilisateur Vérifié"]
    },
    {
      id: 5,
      name: "Alexandre Martin",
      role: "Sportif en réadaptation",
      avatar: "/images/avatars/user-5.jpg",
      content: "Suite à une blessure au genou, j'avais peur de reprendre le sport. Le programme de réadaptation généré par FitSage AI m'a permis de reconstruire ma force progressivement, sans jamais ressentir de douleur.",
      rating: 5,
      platform: "Google",
      date: "Mars 2023"
    },
    {
      id: 6,
      name: "Julie Petit",
      role: "Coureuse",
      avatar: "/images/avatars/user-6.jpg",
      content: "Je me prépare pour mon premier marathon et les plans d'entraînement de FitSage AI sont parfaits. J'aime particulièrement les ajustements en temps réel basés sur mes performances et mon niveau de fatigue.",
      rating: 4,
      platform: "Trustpilot",
      date: "Août 2023",
      badges: ["Athlète Amateur"]
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  // Gestion des témoignages visibles en fonction de la largeur de l'écran
  const getVisibleCount = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1280) return 3;
      if (window.innerWidth >= 768) return 2;
    }
    return 1;
  };

  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount());
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Défilement automatique
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (autoplay && inView) {
      interval = setInterval(() => {
        next();
      }, 5000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoplay, currentIndex, inView]);

  // Gestion des événements tactiles
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      next();
    }
    
    if (touchStart - touchEnd < -50) {
      prev();
    }
  };

  const next = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonialsData.length - visibleCount ? 0 : prevIndex + 1
    );
  };

  const prev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonialsData.length - visibleCount : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Générer les étoiles pour l'évaluation
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-nrln-teal-400 fill-nrln-teal-400' : 'text-nrln-slate-600'}`}
      />
    ));
  };

  return (
    <section 
      id="testimonials" 
      ref={ref}
      className="py-24 relative overflow-hidden bg-nrln-slate-900"
    >
      {/* Grille de fond et effets décoratifs */}
      <div className="absolute inset-0 fs-grid-pattern opacity-5"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-nrln-blue-500/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-nrln-blue-500/30 to-transparent"></div>
      
      {/* Cercles lumineux */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 rounded-full bg-nrln-blue-500/5 blur-3xl"></div>
      <div className="absolute bottom-1/3 -right-24 w-72 h-72 rounded-full bg-nrln-teal-500/5 blur-3xl"></div>
      
      <div className="container px-6 mx-auto relative z-10">
        {/* En-tête de section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div 
            className="inline-flex items-center px-4 py-2 rounded-full bg-nrln-blue-900/60 border border-nrln-blue-500/30 backdrop-blur-sm mb-6"
            style={{ 
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease'
            }}
          >
            <MessageSquare className="w-4 h-4 mr-2 text-nrln-blue-400" />
            <span className="text-nrln-blue-100 text-sm">Témoignages Clients</span>
          </div>
          
          <h2 
            className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight"
            style={{ 
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
              transitionDelay: '0.1s'
            }}
          >
            Découvrez comment FitSage AI <span className="fs-gradient-text bg-gradient-to-r from-fs-blue-400 to-fs-teal-400 text-transparent bg-clip-text">transforme</span> votre entraînement
          </h2>
          
          <p 
            className="text-lg text-nrln-slate-300"
            style={{ 
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
              transitionDelay: '0.2s'
            }}
          >
            Voici ce que nos utilisateurs disent de leur expérience avec notre plateforme d'entraînement alimentée par l'IA.
          </p>
        </div>
        
        {/* Carousel de témoignages */}
        <div 
          className="relative"
          style={{ 
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
            transitionDelay: '0.3s'
          }}
        >
          <div
            ref={carouselRef}
            className="relative overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => setAutoplay(false)}
            onMouseLeave={() => setAutoplay(true)}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
                width: `${(testimonialsData.length / visibleCount) * 100}%`
              }}
            >
              {testimonialsData.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="p-3"
                  style={{ width: `${100 / testimonialsData.length * visibleCount}%` }}
                >
                  <div className="h-full rounded-2xl border border-nrln-slate-700/40 bg-nrln-slate-800/30 p-6 backdrop-blur-sm transition-transform duration-300 hover:transform hover:scale-[1.02] hover:shadow-xl hover:shadow-nrln-blue-900/20">
                    {/* En-tête du témoignage */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center">
                        <div className="relative mr-4">
                          <div className="w-14 h-14 rounded-full bg-nrln-slate-700 overflow-hidden border-2 border-nrln-blue-500/30">
                            {testimonial.avatar ? (
                              <Image 
                                src={testimonial.avatar} 
                                alt={testimonial.name} 
                                width={56} 
                                height={56}
                                className="object-cover w-full h-full"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-white font-bold text-xl">
                                {testimonial.name.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div className="absolute -bottom-1 -right-1 bg-nrln-slate-800 rounded-full p-0.5">
                            <div className="bg-gradient-to-r from-nrln-blue-500 to-nrln-teal-500 rounded-full text-white p-1">
                              <Quote className="w-3 h-3" />
                            </div>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-white font-medium">{testimonial.name}</h3>
                          <p className="text-nrln-slate-400 text-sm">{testimonial.role}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center">
                          {renderStars(testimonial.rating)}
                        </div>
                        <div className="flex items-center mt-1 text-xs text-nrln-slate-500">
                          <span>{testimonial.platform}</span>
                          <span className="mx-1.5">•</span>
                          <span>{testimonial.date}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Badges (si présents) */}
                    {testimonial.badges && testimonial.badges.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {testimonial.badges.map((badge, index) => (
                          <span 
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-nrln-blue-900/40 text-nrln-blue-300 border border-nrln-blue-700/30"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {/* Contenu du témoignage */}
                    <div className="mb-4">
                      <p className="text-nrln-slate-300 leading-relaxed">
                        "{testimonial.content}"
                      </p>
                    </div>
                    
                    {/* Lien vers le témoignage complet */}
                    <div className="text-right">
                      <button className="inline-flex items-center text-nrln-blue-400 hover:text-nrln-blue-300 text-sm font-medium transition-colors">
                        <span>Voir plus</span>
                        <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Contrôles de navigation */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={prev}
              className="p-2 rounded-full border border-nrln-slate-700 text-nrln-slate-400 hover:bg-nrln-slate-800 hover:text-white transition-colors focus:outline-none"
              aria-label="Précédent"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex space-x-2">
              {Array.from({ length: testimonialsData.length - visibleCount + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    currentIndex === index
                      ? 'bg-gradient-to-r from-nrln-blue-500 to-nrln-teal-500 w-8'
                      : 'bg-nrln-slate-700 hover:bg-nrln-slate-600'
                  }`}
                  aria-label={`Aller au témoignage ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={next}
              className="p-2 rounded-full border border-nrln-slate-700 text-nrln-slate-400 hover:bg-nrln-slate-800 hover:text-white transition-colors focus:outline-none"
              aria-label="Suivant"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Badge de confiance */}
        <div 
          className="max-w-lg mx-auto mt-16 flex items-center p-4 rounded-2xl border border-nrln-blue-500/20 bg-nrln-blue-900/10 backdrop-blur-sm"
          style={{ 
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
            transitionDelay: '0.4s'
          }}
        >
          <div className="flex-shrink-0 mr-4">
            <div className="w-12 h-12 rounded-full bg-nrln-blue-900/70 border border-nrln-blue-500/30 flex items-center justify-center">
              <Star className="w-6 h-6 text-nrln-teal-400" fill="currentColor" />
            </div>
          </div>
          <div>
            <div className="flex items-center mb-1">
              <div className="flex mr-2">
                {Array(5).fill(0).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-nrln-teal-400 fill-nrln-teal-400" />
                ))}
              </div>
              <span className="text-white font-medium">4.8/5</span>
            </div>
            <p className="text-nrln-slate-300 text-sm">
              Basé sur plus de <span className="text-white font-medium">1,200 avis</span> d'utilisateurs vérifiés
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 