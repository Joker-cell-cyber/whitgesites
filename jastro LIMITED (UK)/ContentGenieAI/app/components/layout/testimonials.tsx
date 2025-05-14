'use client';

import { useRef, useState, useEffect } from "react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Sophie Martin",
    role: "Responsable Marketing, TechVision",
    avatar: "/avatars/avatar-1.jpg",
    content: "Cette plateforme a révolutionné notre stratégie de contenu. Nous générons maintenant des articles SEO de qualité en quelques minutes, ce qui nous a permis d'augmenter notre trafic organique de 78% en seulement 3 mois.",
    rating: 5,
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    id: 2,
    name: "Thomas Dubois",
    role: "Fondateur, GrowthHackers",
    avatar: "/avatars/avatar-2.jpg",
    content: "J'étais sceptique au début, mais les résultats parlent d'eux-mêmes. La qualité des articles générés est impressionnante et le temps gagné est inestimable pour notre équipe.",
    rating: 5,
    gradient: "from-purple-500 to-indigo-500",
  },
  {
    id: 3,
    name: "Émilie Rousseau",
    role: "Consultante SEO indépendante",
    avatar: "/avatars/avatar-3.jpg",
    content: "En tant que consultante SEO, j'ai testé de nombreux outils, mais celui-ci est de loin le meilleur. La personnalisation du ton et l'optimisation des mots-clés sont parfaitement intégrées.",
    rating: 4,
    gradient: "from-pink-500 to-rose-500",
  },
  {
    id: 4,
    name: "Alexandre Chen",
    role: "Directeur Digital, MediaGroup",
    avatar: "/avatars/avatar-4.jpg",
    content: "Notre équipe éditoriale utilise cet outil quotidiennement. Il nous permet de produire du contenu de qualité à grande échelle tout en maintenant notre identité de marque.",
    rating: 5,
    gradient: "from-amber-500 to-orange-500",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  
  // Animation au défilement
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);
  
  // Rotation automatique des témoignages
  useEffect(() => {
    if (!isInView) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isInView]);
  
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-black relative overflow-hidden" ref={containerRef}>
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-5"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
      
      {/* Éléments décoratifs */}
      <div className="absolute top-1/4 right-1/4 w-36 sm:w-48 md:w-64 h-36 sm:h-48 md:h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-36 sm:w-48 md:w-64 h-36 sm:h-48 md:h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      <div className="container relative z-10 px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 space-y-3 sm:space-y-4">
          <div className="inline-block px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 border border-purple-500/30 rounded-full backdrop-blur-sm bg-black/10 text-purple-300 text-xs sm:text-sm font-medium mb-3 sm:mb-4 animate-fade-in">
            <span className="mr-1.5 sm:mr-2 inline-block w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-purple-400 animate-pulse"></span>
            Ce que disent nos clients
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 drop-shadow-lg">
            Témoignages
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto">
            Découvrez comment notre solution transforme la création de contenu pour nos clients
          </p>
          
          {/* Ligne décorative */}
          <div className="w-12 sm:w-16 md:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-3 sm:mt-4 md:mt-6 rounded-full"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Témoignage principal */}
          <div className="relative perspective-1000 min-h-[300px] sm:min-h-[250px] md:min-h-[220px]">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`absolute inset-0 transition-all duration-700 ease-out ${
                  index === activeIndex
                    ? "opacity-100 translate-x-0 rotate-0 scale-100"
                    : index < activeIndex
                    ? "opacity-0 -translate-x-full rotate-12 scale-90"
                    : "opacity-0 translate-x-full -rotate-12 scale-90"
                }`}
                style={{ 
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  willChange: "transform, opacity"
                }}
              >
                <div className="relative rounded-lg sm:rounded-xl md:rounded-2xl border border-purple-500/20 bg-black/40 backdrop-blur-xl p-4 sm:p-6 md:p-8 shadow-2xl shadow-purple-500/10 h-full">
                  {/* Effet de lueur sur les bords */}
                  <div className="absolute inset-0 rounded-lg sm:rounded-xl md:rounded-2xl bg-gradient-to-r p-0.5 opacity-30"
                       style={{ backgroundImage: `linear-gradient(to right, ${testimonial.gradient.split(' ')[1]}, ${testimonial.gradient.split(' ')[3]})` }}>
                  </div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="mb-3 sm:mb-4 md:mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-purple-400 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>
                    
                    <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6 md:mb-8 flex-grow">
                      {testimonial.content}
                    </p>
                    
                    <div className="flex items-center">
                      <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full overflow-hidden mr-3 sm:mr-4 border-2 border-purple-500/30">
                        {testimonial.avatar ? (
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">{testimonial.name.charAt(0)}</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base md:text-lg font-semibold text-white">{testimonial.name}</h4>
                        <p className="text-xs sm:text-sm text-gray-400">{testimonial.role}</p>
                      </div>
                      <div className="ml-auto flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 ${
                              i < testimonial.rating ? "text-yellow-400" : "text-gray-600"
                            }`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Indicateurs */}
          <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "bg-purple-500 w-4 sm:w-5 md:w-6"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
                aria-label={`Voir le témoignage ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Navigation */}
          <div className="flex justify-center mt-6 sm:mt-8 space-x-4">
            <button
              onClick={() => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="p-2 sm:p-2.5 md:p-3 rounded-full bg-black/40 backdrop-blur-sm border border-purple-500/20 text-white hover:bg-black/60 transition-colors duration-200"
              aria-label="Témoignage précédent"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setActiveIndex((prev) => (prev + 1) % testimonials.length)}
              className="p-2 sm:p-2.5 md:p-3 rounded-full bg-black/40 backdrop-blur-sm border border-purple-500/20 text-white hover:bg-black/60 transition-colors duration-200"
              aria-label="Témoignage suivant"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 