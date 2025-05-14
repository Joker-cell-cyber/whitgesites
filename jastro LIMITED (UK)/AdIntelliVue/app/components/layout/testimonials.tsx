'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star, Quote, Leaf } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      content: "Depuis que j'utilise AdIntelliVue, nos résultats marketing ont connu une croissance organique remarquable. Notre présence en ligne s'est développée naturellement, comme un arbre qui étend ses racines.",
      name: "Sarah Martin",
      title: "Directrice marketing, EcoSolutions",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      rating: 5
    },
    {
      id: 2,
      content: "L'approche naturelle d'AdFinity a complètement transformé notre stratégie digitale. Nous avons cultivé une communauté fidèle et engagée qui partage nos valeurs environnementales.",
      name: "Thomas Dubois",
      title: "Responsable Communication, Terra Vita",
      avatar: "/avatars/testimonial-2.jpg",
      rating: 5
    },
    {
      id: 3,
      content: "Grâce aux analyses organiques d'AdFinity, nous avons identifié les opportunités durables pour notre marque. Nos campagnes sont maintenant en parfaite harmonie avec notre écosystème commercial.",
      name: "Marie Levant",
      title: "Responsable Marketing Digital, NatureFusion",
      avatar: "/avatars/testimonial-3.jpg",
      rating: 5
    }
  ];
  
  return (
    <section id="testimonials" className="adf-section relative overflow-hidden bg-[#F0EBE1] py-24">
      {/* Éléments décoratifs organiques */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#F8F4E9] to-transparent"></div>
      
      <div className="absolute -right-20 top-1/3 opacity-5">
        <Leaf className="h-80 w-80 text-[#5F7138] rotate-45 animate-float" />
      </div>
      
      <div className="absolute -left-20 bottom-1/3 opacity-5">
        <Leaf className="h-64 w-64 text-[#C17A56] -rotate-12 animate-float" />
      </div>
      
      <div className="container relative mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <span className="text-[#C17A56] font-medium">Témoignages</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#4F4639] sm:text-4xl adf-heading">
            Ce que notre communauté raconte
          </h2>
          <p className="mt-4 text-lg text-[#7F7259]">
            Découvrez comment nos clients s'épanouissent grâce à notre approche marketing inspirée par la nature.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
              className="adf-card relative group transition-all duration-300 hover:shadow-lg border-t-4 border-[#5F7138]"
            >
              {/* Élément décoratif */}
              <div className="absolute top-4 right-4 text-[#C17A56]/20">
                <Quote className="h-10 w-10" />
              </div>
              
              <div className="relative z-10">
                {/* Étoiles de notation */}
                <div className="flex mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-[#C17A56] fill-current" />
                  ))}
                </div>
                
                {/* Texte du témoignage */}
                <p className="text-[#7F7259] mb-6 relative">
                  "{testimonial.content}"
                </p>
                
                {/* Informations sur l'auteur */}
                <div className="flex items-center pt-4 border-t border-[#E8DFC7]">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#E8DFC7] mr-4">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#4F4639]">{testimonial.name}</h4>
                    <p className="text-sm text-[#7F7259]">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            className="inline-block px-6 py-4 rounded-xl bg-[#F8F4E9] border border-[#E8DFC7] shadow-md"
          >
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-[#C17A56] fill-current" />
                ))}
              </div>
              <span className="text-[#7F7259] text-sm font-medium">
                Note moyenne de <span className="text-[#5F7138] font-bold">4.9/5</span> basée sur plus de 500 avis clients
              </span>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Élément décoratif bas de page */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#F8F4E9] to-transparent"></div>
    </section>
  );
} 