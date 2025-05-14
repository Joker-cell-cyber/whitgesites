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
    gradient: "from-orange-500 to-orange-600",
  },
  {
    id: 2,
    name: "Thomas Dubois",
    role: "Fondateur, GrowthHackers",
    avatar: "/avatars/avatar-2.jpg",
    content: "J'étais sceptique au début, mais les résultats parlent d'eux-mêmes. La qualité des articles générés est impressionnante et le temps gagné est inestimable pour notre équipe.",
    rating: 5,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: 3,
    name: "Émilie Rousseau",
    role: "Consultante SEO indépendante",
    avatar: "/avatars/avatar-3.jpg",
    content: "En tant que consultante SEO, j'ai testé de nombreux outils, mais celui-ci est de loin le meilleur. La personnalisation du ton et l'optimisation des mots-clés sont parfaitement intégrées.",
    rating: 4,
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    id: 4,
    name: "Alexandre Chen",
    role: "Directeur Digital, MediaGroup",
    avatar: "/avatars/avatar-4.jpg",
    content: "Notre équipe éditoriale utilise cet outil quotidiennement. Il nous permet de produire du contenu de qualité à grande échelle tout en maintenant notre identité de marque.",
    rating: 5,
    gradient: "from-orange-500 to-yellow-500",
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
    <section className="py-32 bg-gradient-to-b from-gray-950 to-blue-950 relative overflow-hidden" ref={containerRef}>
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/circuit-board.svg')] bg-repeat opacity-5"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
      
      {/* Éléments décoratifs */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      
      {/* Grid lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <div className="absolute left-0 right-0 top-1/4 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent"></div>
        <div className="absolute left-0 right-0 top-2/4 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
        <div className="absolute left-0 right-0 top-3/4 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent"></div>
        
        <div className="absolute top-0 bottom-0 left-1/4 w-px bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"></div>
        <div className="absolute top-0 bottom-0 left-2/4 w-px bg-gradient-to-b from-transparent via-orange-500/20 to-transparent"></div>
        <div className="absolute top-0 bottom-0 left-3/4 w-px bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"></div>
      </div>
      
      <div className="container relative z-20 px-4 sm:px-6 mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block px-4 py-2 border border-orange-500/30 rounded-full backdrop-blur-sm bg-black/10 text-orange-300 text-sm font-medium mb-4 animate-fade-in">
            <span className="mr-2 inline-block w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span>
            Témoignages clients
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-orange-300 to-yellow-200 drop-shadow-lg">
            Ce que disent nos clients
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Découvrez comment SEOForgeAI transforme l'optimisation de contenu pour nos utilisateurs
          </p>
          
          {/* Ligne décorative */}
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-blue-500 mx-auto mt-6 rounded-full"></div>
        </div>
        
        <div className="max-w-4xl mx-auto relative">
          {/* Glitch effect decorative elements */}
          <div className="absolute -top-4 -right-4 w-8 h-8 rounded-md border border-orange-500/50 bg-orange-500/10 transform rotate-12"></div>
          <div className="absolute -bottom-4 -left-4 w-8 h-8 rounded-md border border-blue-500/50 bg-blue-500/10 transform -rotate-12"></div>
          
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
                <div className="relative rounded-xl border border-blue-500/20 bg-gray-900/40 backdrop-blur-xl p-6 shadow-2xl shadow-blue-500/5 h-full">
                  {/* Effet de lueur sur les bords */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r p-0.5 opacity-30"
                       style={{ backgroundImage: `linear-gradient(to right, ${testimonial.gradient.split(' ')[1]}, ${testimonial.gradient.split(' ')[3]})` }}>
                  </div>
                  
                  {/* Circuit pattern overlay */}
                  <div className="absolute inset-0 rounded-xl bg-[url('/circuit-board.svg')] bg-repeat opacity-5"></div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-orange-400 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>
                    
                    <p className="text-gray-300 text-lg leading-relaxed mb-8 flex-grow">
                      {testimonial.content}
                    </p>
                    
                    <div className="flex items-center">
                      <div className="relative w-12 h-12 rounded-md overflow-hidden mr-4 border-2 border-blue-500/30 transform rotate-3">
                        {testimonial.avatar ? (
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-orange-500 to-blue-600 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">{testimonial.name.charAt(0)}</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white">{testimonial.name}</h4>
                        <p className="text-sm text-blue-400">{testimonial.role}</p>
                      </div>
                      <div className="ml-auto flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-5 w-5 ${
                              i < testimonial.rating ? "text-orange-400" : "text-gray-600"
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
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "bg-orange-500 w-6"
                    : "bg-gray-600 hover:bg-gray-500 w-3"
                }`}
                aria-label={`Voir le témoignage ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* Statistiques */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent rounded-xl blur-sm"></div>
            <div className="relative p-6 border border-orange-500/20 rounded-xl bg-gray-900/40 backdrop-blur-md text-center">
              <div className="text-4xl font-bold text-white mb-2">98%</div>
              <div className="text-sm text-gray-400">Satisfaction client</div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-xl blur-sm"></div>
            <div className="relative p-6 border border-blue-500/20 rounded-xl bg-gray-900/40 backdrop-blur-md text-center">
              <div className="text-4xl font-bold text-white mb-2">+75%</div>
              <div className="text-sm text-gray-400">Traffic SEO</div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent rounded-xl blur-sm"></div>
            <div className="relative p-6 border border-orange-500/20 rounded-xl bg-gray-900/40 backdrop-blur-md text-center">
              <div className="text-4xl font-bold text-white mb-2">10k+</div>
              <div className="text-sm text-gray-400">Utilisateurs</div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-xl blur-sm"></div>
            <div className="relative p-6 border border-blue-500/20 rounded-xl bg-gray-900/40 backdrop-blur-md text-center">
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-sm text-gray-400">Support</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Glitch effect */}
      <style jsx global>{`
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
        
        .glitch-text {
          position: relative;
          animation: glitch 5s infinite;
        }
        
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        .animate-fade-in {
          animation: fade-in 1s forwards;
        }
      `}</style>
    </section>
  );
} 