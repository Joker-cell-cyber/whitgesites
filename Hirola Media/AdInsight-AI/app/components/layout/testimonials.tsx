'use client';

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sophie Martin",
    role: "Responsable Marketing, TechVision",
    avatar: "/avatars/avatar-1.jpg",
    content: "AdInsight AI nous aide à mieux comprendre nos données publicitaires. L'outil nous permet d'identifier les tendances et d'ajuster nos stratégies en fonction des analyses. L'interface est vraiment intuitive et simple à utiliser.",
    rating: 5,
    logo: "/logos/techvision.svg",
    highlight: "Analyse claire et intuitive",
    color: "bg-adfi-blue-50 border-adfi-blue-200",
    iconColor: "text-adfi-blue-500"
  },
  {
    id: 2,
    name: "Thomas Dubois",
    role: "Fondateur, GrowthHackers",
    avatar: "/avatars/avatar-2.jpg",
    content: "Les insights fournis par AdInsight AI nous aident à mieux comprendre nos audiences. L'outil nous permet d'analyser nos campagnes en profondeur et d'identifier les opportunités d'amélioration basées sur des données concrètes.",
    rating: 5,
    logo: "/logos/growthhackers.svg",
    highlight: "Analyse approfondie des données",
    color: "bg-emerald-50 border-emerald-200",
    iconColor: "text-emerald-500"
  },
  {
    id: 3,
    name: "Émilie Rousseau",
    role: "Consultante Performance Média",
    avatar: "/avatars/avatar-3.jpg",
    content: "En tant que consultante, j'apprécie particulièrement la clarté des analyses fournies par AdInsight AI. L'interface intuitive me fait gagner un temps précieux que je peux consacrer à la stratégie.",
    rating: 5,
    logo: "/logos/emilie-consulting.svg",
    highlight: "Interface claire et efficace",
    color: "bg-amber-50 border-amber-200",
    iconColor: "text-amber-500"
  },
  {
    id: 4,
    name: "Alexandre Chen",
    role: "Directeur Digital, MediaGroup",
    avatar: "/avatars/avatar-4.jpg",
    content: "AdInsight AI nous aide à mieux analyser les performances de nos campagnes Facebook pour nos clients. Les visualisations et les rapports détaillés nous permettent de prendre des décisions plus éclairées sur l'allocation des budgets publicitaires.",
    rating: 5,
    logo: "/logos/mediagroup.svg",
    highlight: "Analyse détaillée des performances",
    color: "bg-purple-50 border-purple-200",
    iconColor: "text-purple-500"
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2
  });
  
  // Rotation automatique des témoignages
  useEffect(() => {
    if (!inView) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [inView]);
  
  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-adfi-slate-50 to-white relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 adfi-dot-pattern opacity-5"></div>
      <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-adfi-blue-200 to-transparent"></div>
      
      {/* Cercles décoratifs */}
      <div className="absolute top-1/3 right-10 w-64 h-64 rounded-full bg-adfi-blue-100/20 blur-3xl"></div>
      <div className="absolute bottom-1/4 left-10 w-80 h-80 rounded-full bg-adfi-blue-100/30 blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* En-tête de section */}
        <div className="text-center max-w-3xl mx-auto mb-16" 
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.5s ease, transform 0.5s ease'
          }}
        >
          <div className="inline-flex items-center px-4 py-2 bg-adfi-blue-50 text-adfi-blue-600 rounded-full mb-6">
            <span className="text-sm font-medium">Témoignages clients</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-adfi-slate-900 mb-6">
            Ils utilisent <span className="text-adfi-blue-600">AdInsight AI</span> au quotidien
          </h2>
          
          <p className="text-xl text-adfi-slate-600 leading-relaxed max-w-2xl mx-auto">
            Découvrez comment notre plateforme aide les entreprises à mieux comprendre et analyser leurs campagnes Facebook Ads.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          {/* Témoignage principal */}
          <div className="relative min-h-[300px] md:min-h-[250px]">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`absolute inset-0 transition-all duration-700 ease-out ${
                  index === activeIndex
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: index === activeIndex ? '0ms' : '0ms'
                }}
              >
                <div className="bg-white rounded-2xl shadow-xl border border-adfi-slate-100 overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-5">
                    {/* Partie gauche - Image et informations */}
                    <div className="lg:col-span-2 p-8 lg:p-10 bg-gradient-to-br from-adfi-slate-50 to-white flex flex-col justify-between border-r border-adfi-slate-100">
                      <div>
                        {testimonial.logo && (
                          <div className="mb-6 h-8">
                            <Image
                              src={testimonial.logo}
                              alt={`Logo ${testimonial.name}`}
                              width={120}
                              height={32}
                              className="object-contain"
                            />
                          </div>
                        )}
                        
                        <div className={`inline-flex items-center px-4 py-2 rounded-full mb-4 ${testimonial.color}`}>
                          <span className={`text-sm font-medium ${testimonial.iconColor}`}>{testimonial.highlight}</span>
                        </div>
                        
                        <div className="flex mb-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-6 flex items-center">
                        <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md mr-4">
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-adfi-slate-900">{testimonial.name}</h4>
                          <p className="text-sm text-adfi-slate-600">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Partie droite - Contenu du témoignage */}
                    <div className="lg:col-span-3 p-8 lg:p-10 flex flex-col justify-center">
                      <div className="mb-6">
                        <svg width="42" height="30" viewBox="0 0 42 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-adfi-blue-200">
                          <path d="M11.7984 0.768C10.7376 1.296 9.69231 2.016 8.66154 2.928C7.63077 3.84 6.74102 4.944 5.9923 6.24C5.2436 7.536 4.65949 9.024 4.24 10.704C3.82051 12.384 3.61076 14.256 3.61076 16.32C3.61076 19.2 4.05128 21.552 4.9323 23.376C5.81333 25.2 7.06154 26.64 8.6769 27.696C10.2923 28.752 12.2051 29.28 14.4153 29.28C16.0307 29.28 17.5374 28.896 18.9355 28.128C20.3335 27.36 21.4871 26.256 22.3963 24.816C23.3055 23.376 23.76 21.6 23.76 19.488C23.76 17.904 23.4323 16.464 22.7769 15.168C22.1215 13.872 21.211 12.816 20.0455 12C18.88 11.184 17.5209 10.776 15.968 10.776C14.3682 10.776 13.0067 11.232 11.8834 12.144C10.7602 13.056 10.1984 14.352 10.1984 16.032C10.1984 16.896 10.3759 17.664 10.7307 18.336C11.0856 19.008 11.5261 19.536 12.0523 19.92C11.2615 19.92 10.5354 19.632 9.8739 19.056C9.21231 18.48 8.69641 17.712 8.3262 16.752C7.95599 15.792 7.77092 14.736 7.77092 13.584C7.77092 11.424 8.25846 9.504 9.23359 7.824C10.2087 6.144 11.5097 4.8 13.1363 3.792C14.763 2.784 16.5046 2.28 18.3611 2.28C20.5713 2.28 22.4897 2.808 24.1163 3.864C25.743 4.92 27.0056 6.36 27.9044 8.184C28.8031 10.008 29.2525 12.12 29.2525 14.52C29.2525 17.112 28.7169 19.344 27.6456 21.216C26.5744 23.088 25.103 24.528 23.2312 25.536C21.3595 26.544 19.2133 27.048 16.7927 27.048C15.5159 27.048 14.3682 26.856 13.3494 26.472C12.3307 26.088 11.4461 25.536 10.6954 24.816C9.9446 24.096 9.34508 23.232 8.89539 22.224L11.6518 20.352C12.1436 21.744 12.8697 22.8 13.8302 23.52C14.7907 24.24 15.9087 24.6 17.1841 24.6C18.6026 24.6 19.8779 24.12 21.0102 23.16C22.1425 22.2 23.0518 20.88 23.738 19.2C24.4241 17.52 24.7672 15.6 24.7672 13.44C24.7672 11.472 24.4138 9.768 23.7071 8.328C23.0004 6.888 22.0338 5.784 20.8072 5.016C19.5805 4.248 18.1825 3.864 16.613 3.864C14.8508 3.864 13.3174 4.368 12.0128 5.376C10.7082 6.384 9.8379 7.872 9.4019 9.84H8.3262C8.0769 8.352 7.5302 7.032 6.68618 5.88C5.84216 4.728 4.77539 3.816 3.48584 3.144C2.19631 2.472 0.757444 2.136 -0.83 2.136V0.552C1.09303 0.552 2.88554 0.24 4.54769 -0.384L11.7984 0.768ZM40.9441 0.768C39.8834 1.296 38.8381 2.016 37.8073 2.928C36.7765 3.84 35.8868 4.944 35.1381 6.24C34.3894 7.536 33.8052 9.024 33.3858 10.704C32.9663 12.384 32.7565 14.256 32.7565 16.32C32.7565 19.2 33.1971 21.552 34.0781 23.376C34.9591 25.2 36.2073 26.64 37.8227 27.696C39.4381 28.752 41.3509 29.28 43.5611 29.28C45.1765 29.28 46.6832 28.896 48.0813 28.128C49.4793 27.36 50.6329 26.256 51.5421 24.816C52.4513 23.376 52.9058 21.6 52.9058 19.488C52.9058 17.904 52.5781 16.464 51.9227 15.168C51.2673 13.872 50.3568 12.816 49.1913 12C48.0258 11.184 46.6667 10.776 45.1138 10.776C43.514 10.776 42.1525 11.232 41.0292 12.144C39.906 13.056 39.3441 14.352 39.3441 16.032C39.3441 16.896 39.5216 17.664 39.8765 18.336C40.2314 19.008 40.6718 19.536 41.198 19.92C40.4073 19.92 39.6811 19.632 39.0196 19.056C38.358 18.48 37.8421 17.712 37.4719 16.752C37.1017 15.792 36.9166 14.736 36.9166 13.584C36.9166 11.424 37.4042 9.504 38.3793 7.824C39.3544 6.144 40.6554 4.8 42.282 3.792C43.9087 2.784 45.6503 2.28 47.5068 2.28C49.717 2.28 51.6354 2.808 53.262 3.864C54.8887 4.92 56.1513 6.36 57.0501 8.184C57.9489 10.008 58.3982 12.12 58.3982 14.52C58.3982 17.112 57.8626 19.344 56.7913 21.216C55.7201 23.088 54.2487 24.528 52.3769 25.536C50.5052 26.544 48.359 27.048 45.9384 27.048C44.6616 27.048 43.514 26.856 42.4952 26.472C41.4765 26.088 40.5918 25.536 39.8411 24.816C39.0903 24.096 38.4908 23.232 38.0411 22.224L40.7975 20.352C41.2893 21.744 42.0154 22.8 42.9759 23.52C43.9364 24.24 45.0544 24.6 46.3298 24.6C47.7484 24.6 49.0236 24.12 50.1559 23.16C51.2882 22.2 52.1975 20.88 52.8837 19.2C53.5698 17.52 53.9129 15.6 53.9129 13.44C53.9129 11.472 53.5595 9.768 52.8528 8.328C52.1461 6.888 51.1795 5.784 49.9529 5.016C48.7262 4.248 47.3282 3.864 45.7587 3.864C43.9965 3.864 42.4631 4.368 41.1585 5.376C39.8539 6.384 38.9836 7.872 38.5476 9.84H37.4719C37.2226 8.352 36.6759 7.032 35.8319 5.88C34.9879 4.728 33.9211 3.816 32.6316 3.144C31.342 2.472 29.9032 2.136 28.3157 2.136V0.552C30.2387 0.552 32.0312 0.24 33.6934 -0.384L40.9441 0.768Z" fill="currentColor"/>
                        </svg>
                      </div>
                      
                      <p className="text-lg leading-relaxed text-adfi-slate-700 mb-6">
                        {testimonial.content}
                      </p>
                      
                      <div className="h-1 w-20 bg-gradient-to-r from-adfi-blue-400 to-adfi-blue-600 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Indicateurs et navigation */}
          <div className="flex justify-center mt-10 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "bg-adfi-blue-500 w-10"
                    : "bg-adfi-slate-300 hover:bg-adfi-slate-400"
                }`}
                aria-label={`Voir le témoignage ${index + 1}`}
              />
            ))}
          </div>
          
          <div className="mt-10 flex justify-center space-x-4">
            <button
              onClick={() => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="p-3 rounded-full bg-white shadow-md border border-adfi-slate-200 text-adfi-slate-700 hover:bg-adfi-blue-50 hover:border-adfi-blue-200 transition-colors duration-200"
              aria-label="Témoignage précédent"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setActiveIndex((prev) => (prev + 1) % testimonials.length)}
              className="p-3 rounded-full bg-white shadow-md border border-adfi-slate-200 text-adfi-slate-700 hover:bg-adfi-blue-50 hover:border-adfi-blue-200 transition-colors duration-200"
              aria-label="Témoignage suivant"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 