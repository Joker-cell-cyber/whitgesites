"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type Testimonial = {
  name: string;
  game: string;
  image: string;
  rating: number;
  text: string;
};

export default function ServicesTestimonials() {
  const testimonials: Testimonial[] = [
    {
      name: "Thomas D.",
      game: "World of Warcraft",
      image: "/avatar1.jpg",
      rating: 5,
      text: "Un service exceptionnel ! J'ai reçu 500k d'or en seulement 2 jours, avec une discrétion parfaite. Vraiment impressionnant."
    },
    {
      name: "Sophie L.",
      game: "Diablo 4",
      image: "/avatar2.jpg",
      rating: 5,
      text: "J'ai commandé un service de leveling pour mon Barbare et il est passé du niveau 50 au niveau 100 en un temps record. Les objets légendaires obtenus sont parfaits !"
    },
    {
      name: "Marc T.",
      game: "Final Fantasy XIV",
      image: "/avatar3.jpg",
      rating: 4,
      text: "J'ai utilisé leurs services pour le farming de Gil et le leveling de mes jobs d'artisanat. Résultats très satisfaisants et équipe réactive."
    },
    {
      name: "Emma R.",
      game: "GTA Online",
      image: "/avatar4.jpg",
      rating: 5,
      text: "Après avoir utilisé leur service de farming d'argent sur GTA Online, j'ai pu acheter tout ce que je voulais sans passer des heures à grinder. Merci !"
    },
    {
      name: "Lucas B.",
      game: "Elder Scrolls Online",
      image: "/avatar5.jpg",
      rating: 5,
      text: "Service rapide et efficace pour le farming de gold et le leveling. Mon personnage est devenu une vraie machine de guerre !"
    }
  ];
  
  const [activeIndex, setActiveIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-20 bg-[#070a12]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Ce Que Disent <span className="text-transparent bg-clip-text bg-gradient-to-r from-game-blue-500 to-game-green-500">Nos Clients</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Plus de 10,000 joueurs nous ont fait confiance pour leurs besoins de farming et de leveling.
            </p>
          </motion.div>
        </div>
        
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute -top-6 -left-6 w-20 h-20 text-5xl text-game-blue-500 opacity-20">&ldquo;</div>
          
          <div className="relative bg-[#141a2c] rounded-xl p-8 md:p-10 border border-gray-800">
            <div className="min-h-[200px]">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ 
                    opacity: activeIndex === index ? 1 : 0,
                    x: activeIndex === index ? 0 : 20,
                    position: activeIndex === index ? 'relative' : 'absolute'
                  }}
                  transition={{ duration: 0.5 }}
                  className={`${activeIndex === index ? 'block' : 'hidden'}`}
                >
                  <p className="text-gray-300 text-lg mb-6 italic">&ldquo;{testimonial.text}&rdquo;</p>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-game-blue-600 to-game-green-600 flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <h4 className="text-white font-medium">{testimonial.name}</h4>
                      <p className="text-game-blue-400 text-sm">{testimonial.game}</p>
                    </div>
                    <div className="ml-auto flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${activeIndex === index ? 'bg-game-blue-500' : 'bg-gray-700'}`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-gray-400 mb-4">Rejoignez nos clients satisfaits dès aujourd&apos;hui</p>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-game-blue-600 to-game-green-600 text-white font-medium button-glow transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              Commencer Maintenant
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 