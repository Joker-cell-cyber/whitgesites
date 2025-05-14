'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { StarIcon, HeartIcon, FlameIcon, SparklesIcon } from 'lucide-react';
import Image from 'next/image';

// Données simulées pour les témoignages
const testimonials = [
  {
    name: "Sophie Martin",
    title: "Designer, Paris",
    testimonial: "SeducIA m'a aidée à comprendre pourquoi mes conversations s'essoufflaient rapidement. J'ai enfin réussi à créer des connexions authentiques qui rayonnent d'énergie!",
    avatar: "/avatars/avatar1.png",
    rating: 5
  },
  {
    name: "Thomas Dubois",
    title: "Ingénieur, Lyon",
    testimonial: "Avant SeducIA, j'étais totalement perdu face aux signaux. Maintenant, je comprends mieux les dynamiques relationnelles et ma confiance est à son maximum!",
    avatar: "/avatars/avatar2.png",
    rating: 5
  },
  {
    name: "Emma Lacroix",
    title: "Avocate, Marseille",
    testimonial: "J'aime l'approche chaleureuse et sans jugement de SeducIA. Les conseils sont vraiment adaptés à ma personnalité, pas des techniques de drague génériques.",
    avatar: "/avatars/avatar3.png",
    rating: 5
  },
  {
    name: "Alexandre Moreau",
    title: "Entrepreneur, Bordeaux",
    testimonial: "Après une rupture difficile, SeducIA m'a rallumé la flamme intérieure et m'a aidé à me reconnecter avec ma passion pour les rencontres authentiques.",
    avatar: "/avatars/avatar4.png",
    rating: 4
  },
  {
    name: "Julie Bernard",
    title: "Infirmière, Lille",
    testimonial: "Je n'arrivais pas à établir des connexions durables. SeducIA m'a aidée à créer une véritable étincelle dans mes conversations et mes relations!",
    avatar: "/avatars/avatar5.png",
    rating: 5
  },
  {
    name: "Nicolas Petit",
    title: "Professeur, Nantes",
    testimonial: "SeducIA m'a montré comment être attentif aux détails qui font toute la différence. Mes rendez-vous sont maintenant remplis de chaleur et de complicité!",
    avatar: "/avatars/avatar6.png",
    rating: 5
  }
];

export default function Testimonials() {
  const { ref: sectionRef, inView: sectionInView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });
  
  return (
    <section id="testimonials" ref={sectionRef} className="yfc-section relative overflow-hidden yfc-gradient-bg py-20 md:py-32">
      {/* Effet de fond */}
      <div className="absolute inset-0 yfc-pattern-bg opacity-10"></div>
      
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E46D4B] to-transparent opacity-30"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E46D4B] to-transparent opacity-30"></div>

      {/* Éléments décoratifs chaleureux */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-[#E46D4B]/20 blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-[#E8B93E]/20 blur-[80px] pointer-events-none"></div>

      {/* Éléments flottants */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute top-20 right-[5%] w-16 h-16 rounded-full bg-gradient-to-r from-[#F7C8BA] to-[#F9EAC1] border border-[#E46D4B]/20 shadow-lg opacity-70"
        />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
          className="absolute bottom-40 left-[10%] w-12 h-12 rounded-full bg-gradient-to-r from-[#F9EAC1] to-[#F7C8BA] border border-[#E8B93E]/20 shadow-lg opacity-70"
        />
      </div>

      <div className="container relative z-10 px-4 mx-auto">
        {/* En-tête de la section */}
        <div className="text-center mb-16 md:mb-24 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 border border-[#E46D4B]/30 rounded-full bg-[#F7C8BA] shadow-sm"
          >
            <span className="text-[#E46D4B] text-sm font-medium flex items-center justify-center">
              <FlameIcon className="h-4 w-4 mr-2 animate-pulse" />
              Témoignages chaleureux
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold yfc-heading-accent leading-tight max-w-3xl mx-auto"
          >
            Des histoires de <span className="text-[#E8B93E]">connexions</span> réussies
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base md:text-xl text-[#45301C]/80 max-w-2xl mx-auto"
          >
            Découvrez comment SeducIA enflamme la vie amoureuse de nos utilisateurs 
            et ravive leur confiance en eux jour après jour.
          </motion.p>
        </div>
        
        {/* Grille de témoignages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="yfc-card h-full flex flex-col relative group hover:-translate-y-1 transition-all duration-300"
            >
              {/* Effet de bordure sur hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#E46D4B] to-[#E8B93E] opacity-0 group-hover:opacity-100 -z-10 blur transition-opacity duration-300" style={{ margin: '-2px' }}></div>
              
              {/* Icône de flamme */}
              <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-gradient-to-r from-[#E46D4B] to-[#E16959] flex items-center justify-center shadow-md">
                <SparklesIcon className="h-4 w-4 text-white" />
              </div>
              
              {/* Note en étoiles */}
              <div className="flex space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon 
                    key={i} 
                    className={`h-5 w-5 ${i < testimonial.rating ? 'text-[#E8B93E] fill-[#E8B93E]' : 'text-[#F1EDE8]'}`} 
                  />
                ))}
              </div>
                  
              {/* Texte du témoignage */}
              <div className="relative mb-6 flex-1">
                <div className="text-[#45301C] leading-relaxed">
                  "{testimonial.testimonial}"
                </div>
              </div>
              
              {/* Informations de l'auteur */}
              <div className="flex items-center mt-4 pt-4 border-t border-[#F1EDE8]">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#F7C8BA] shadow-sm mr-4">
                  <div className="w-full h-full bg-gradient-to-br from-[#F7C8BA] to-[#F9EAC1] flex items-center justify-center text-[#E46D4B] font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-[#45301C]">{testimonial.name}</h4>
                  <p className="text-sm text-[#45301C]/70">{testimonial.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Indicateur de satisfaction */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16 bg-white p-6 rounded-xl shadow-lg border border-[#E46D4B]/10 max-w-xl mx-auto"
        >
          <div className="flex items-center justify-center gap-4 md:gap-8">
            <div className="flex flex-col items-center">
              <div className="text-3xl md:text-4xl font-bold text-[#E46D4B]">97%</div>
              <div className="text-sm text-[#45301C]/70">satisfaction client</div>
            </div>
            <div className="h-12 w-px bg-[#F1EDE8]"></div>
            <div className="flex flex-col items-center">
              <div className="text-3xl md:text-4xl font-bold text-[#E8B93E]">24k+</div>
              <div className="text-sm text-[#45301C]/70">utilisateurs actifs</div>
            </div>
            <div className="h-12 w-px bg-[#F1EDE8]"></div>
            <div className="flex flex-col items-center">
              <div className="text-3xl md:text-4xl font-bold text-[#E16959]">4.9</div>
              <div className="text-sm text-[#45301C]/70">note moyenne</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 