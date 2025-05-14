"use client";

import { useState } from "react";

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const testimonials = [
    {
      quote: "Master SEO Writer a transformé notre présence en ligne. Nos articles de blog génèrent 3 fois plus de trafic organique qu'auparavant.",
      author: "Marie Dupont",
      position: "Directrice Marketing, TechSolutions",
      image: "/images/testimonial-1.jpg"
    },
    {
      quote: "La qualité de leur contenu est exceptionnelle. Nous avons vu une augmentation de 45% des conversions grâce à leurs descriptions de produits optimisées.",
      author: "Jean Martin",
      position: "E-commerce Manager, BoutiqueMode",
      image: "/images/testimonial-2.jpg"
    },
    {
      quote: "Leur expertise en SEO est inégalée. Non seulement notre site apparaît maintenant en première page pour nos mots-clés cibles, mais le contenu résonne vraiment avec notre audience.",
      author: "Sophie Leroux",
      position: "Fondatrice, Bien-Être Naturel",
      image: "/images/testimonial-3.jpg"
    }
  ];

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block py-1 px-3 rounded-full bg-turquoise-100 text-turquoise-800 text-sm font-medium mb-4">
            Témoignages
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Ce que nos clients <span className="text-turquoise-600">disent de nous</span>
          </h2>
          <p className="text-lg text-gray-600">
            Découvrez comment nos services de contenu SEO ont aidé ces entreprises à améliorer leur visibilité en ligne et à atteindre leurs objectifs.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-turquoise-100 flex-shrink-0">
                <div className="w-full h-full bg-turquoise-200 flex items-center justify-center text-turquoise-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <div className="mb-4 text-turquoise-600">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                </div>
                <blockquote className="text-xl md:text-2xl italic text-gray-800 mb-6">
                  {testimonials[activeIndex].quote}
                </blockquote>
                <div className="flex items-center">
                  <div>
                    <p className="font-bold text-gray-900">{testimonials[activeIndex].author}</p>
                    <p className="text-gray-600">{testimonials[activeIndex].position}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center mt-8 gap-3">
            <button 
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-turquoise-50 hover:border-turquoise-200 transition-colors"
              aria-label="Témoignage précédent"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            
            {testimonials.map((_, index) => (
              <button 
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full ${activeIndex === index ? 'bg-turquoise-500' : 'bg-gray-300'}`}
                aria-label={`Aller au témoignage ${index + 1}`}
              />
            ))}
            
            <button 
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-turquoise-50 hover:border-turquoise-200 transition-colors"
              aria-label="Témoignage suivant"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 