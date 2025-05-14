'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, Users } from 'lucide-react';

const testimonials = [
  {
    name: 'Thomas D.',
    text: 'CharmAI a complètement transformé ma vie amoureuse. Les conseils sont pertinents et la possibilité de choisir entre un coach masculin ou féminin est révolutionnaire !',
    image: '/avatar-1.jpg',
    stars: 5
  },
  {
    name: 'Sophie M.',
    text: "Grâce à CharmAI, j'ai enfin compris pourquoi mes relations précédentes n'avaient pas fonctionné. Les conseils sont personnalisés et vraiment efficaces.",
    image: '/avatar-2.jpg',
    stars: 5
  },
  {
    name: 'Jean-Philippe L.',
    text: "J'étais très sceptique au début, mais CharmAI m'a aidé à gagner en confiance et à améliorer ma communication. Je recommande à 100% !",
    image: '/avatar-3.jpg',
    stars: 4
  },
  {
    name: 'Marie G.',
    text: "L'approche sans jugement et les analyses personnalisées m'ont permis de faire de vrais progrès. CharmAI est un coach virtuel incroyablement efficace.",
    image: '/avatar-4.jpg',
    stars: 5
  },
];

const Testimonials = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Arrière-plan et décorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950 via-rose-950 to-purple-950"></div>
      <div className="absolute inset-0 bg-[url('/love-pattern.svg')] bg-repeat opacity-5"></div>
      <div className="absolute top-1/3 -left-64 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 -right-64 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium mb-4"
          >
            <Star className="h-3.5 w-3.5" />
            Témoignages
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-rose-100 to-white"
          >
            Pourquoi choisir CharmAI ?
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            Découvrez comment CharmAI a aidé des milliers de personnes à transformer leur vie amoureuse et à construire des relations épanouissantes.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-md p-6 rounded-3xl border border-gray-800/50 group hover:border-rose-500/30 transition-all duration-300 flex flex-col h-full"
            >
              {/* Gradient hover */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-rose-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Stars */}
              <div className="flex mb-4 z-10 relative">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < testimonial.stars ? 'text-rose-400' : 'text-gray-600'} ${i > 0 ? '-ml-0.5' : ''}`}
                    fill={i < testimonial.stars ? 'currentColor' : 'none'}
                  />
                ))}
                  </div>
                  
              {/* Quote */}
              <div className="relative mb-4 z-10">
                <Quote className="h-8 w-8 text-purple-500/30 absolute -top-1 -left-2" />
                <p className="text-gray-300 relative z-10 pl-5 italic leading-relaxed">{testimonial.text}</p>
              </div>
              
              {/* Author */}
              <div className="mt-auto pt-4 flex items-center z-10 relative">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-rose-500 to-purple-600 flex items-center justify-center overflow-hidden">
                  {testimonial.image ? (
                    <img src={testimonial.image} alt={testimonial.name} className="h-full w-full object-cover" />
                  ) : (
                    <Users className="h-5 w-5 text-white" />
                  )}
                </div>
                <div className="ml-3">
                  <h4 className="text-white font-medium">{testimonial.name}</h4>
                  <p className="text-xs text-rose-400">Utilisateur</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Global statistics */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20 bg-gradient-to-br from-gray-900/90 to-gray-950/90 backdrop-blur-md p-1 rounded-3xl border border-gray-800/50 overflow-hidden"
        >
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-950/50 rounded-3xl p-8 md:p-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
              <div className="text-center space-y-2">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-400 to-purple-400 bg-clip-text text-transparent">98%</div>
                <p className="text-gray-400 text-sm">Taux de satisfaction</p>
              </div>
              <div className="text-center space-y-2">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-400 to-purple-400 bg-clip-text text-transparent">50k+</div>
                <p className="text-gray-400 text-sm">Utilisateurs actifs</p>
              </div>
              <div className="text-center space-y-2">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-400 to-purple-400 bg-clip-text text-transparent">1M+</div>
                <p className="text-gray-400 text-sm">Conseils fournis</p>
          </div>
              <div className="text-center space-y-2">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-400 to-purple-400 bg-clip-text text-transparent">24/7</div>
                <p className="text-gray-400 text-sm">Disponibilité</p>
            </div>
          </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials; 