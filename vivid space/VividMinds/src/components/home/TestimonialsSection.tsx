"use client";

import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { COMPANY } from "../../app/constants/company";

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      quote: `Implémenter ${COMPANY.serviceName} a transformé notre service client. Nous avons réduit le temps de réponse de 75% tout en améliorant la satisfaction client de 40%.`,
      author: "Marie Dupont",
      role: "Directrice des Opérations",
      company: "TechSolutions Inc.",
      image: "/images/testimonials/avatar1.jpg",
    },
    {
      id: 2,
      quote: "Les agents AI ont automatisé nos processus de collecte et d&apos;analyse de données, permettant à nos équipes de se concentrer sur l&apos;innovation plutôt que sur les tâches répétitives.",
      author: "Thomas Lefort",
      role: "Responsable Recherche & Développement",
      company: "DataInsight Group",
      image: "/images/testimonials/avatar2.jpg",
    },
    {
      id: 3,
      quote: `Grâce à ${COMPANY.serviceName}, nous avons pu proposer une assistance à nos clients 24/7, ce qui a considérablement amélioré leur expérience et notre taux de conversion.`,
      author: "Sophie Martin",
      role: "Directrice Marketing",
      company: "E-Commerce Plus",
      image: "/images/testimonials/avatar3.jpg",
    },
  ];

  const logoClients = [
    { id: 1, name: "TechCorp", logo: "/images/clients/logo1.svg" },
    { id: 2, name: "Innovate Inc", logo: "/images/clients/logo2.svg" },
    { id: 3, name: "DataFlow", logo: "/images/clients/logo3.svg" },
    { id: 4, name: "FutureTech", logo: "/images/clients/logo4.svg" },
    { id: 5, name: "SmartSystems", logo: "/images/clients/logo5.svg" },
  ];
  
  // Animation controls
  const controls = useAnimation();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1]
      }
    }
  };

  return (
    <section ref={sectionRef} className="py-28 relative overflow-hidden bg-gradient-to-b from-[#050518] via-[#070721] to-[#050518]" id="testimonials">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[url('/images/grid.svg')] bg-repeat"></div>
      </div>
      
      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-indigo-600/5 blur-[150px] animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/3 w-[600px] h-[600px] rounded-full bg-purple-600/5 blur-[150px] animate-pulse-slow" style={{animationDelay: '2s'}}></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i} 
            className="absolute w-1 h-1 bg-white rounded-full opacity-20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `floatParticle ${10 + Math.random() * 20}s linear infinite`,
              animationDelay: `${Math.random() * 10}s`
            }}
          ></div>
        ))}
      </div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="text-center mb-3">
            <span className="text-xs tracking-wider text-indigo-400 uppercase bg-indigo-900/30 py-1 px-3 rounded-full">Témoignages</span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-6 text-center"
          >
            Ce Qu&apos;en Disent Nos <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400">Clients</span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-gray-400 text-lg text-center max-w-3xl mx-auto"
          >
            Découvrez comment {COMPANY.serviceName} aide les entreprises à transformer leurs opérations et à innover
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              initial="hidden"
              animate={controls}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-[rgba(15,15,35,0.5)] backdrop-blur-sm border border-indigo-800/20 rounded-2xl p-8 overflow-hidden h-full flex flex-col transition-all duration-500 hover:shadow-xl hover:shadow-indigo-900/20 hover:-translate-y-1"
            >
              {/* Glowing effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/0 to-purple-600/0 group-hover:from-indigo-600/5 group-hover:to-purple-600/5 transition-colors duration-500"></div>
              
              {/* Quote icon with glow effect */}
              <div className="relative mb-6">
                <div className="absolute -inset-1 bg-indigo-500/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-3 bg-gradient-to-br from-indigo-900/50 to-purple-900/50 rounded-full border border-indigo-800/30 text-indigo-400 inline-flex">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                  </svg>
                </div>
              </div>
              
              <div className="mb-6 text-gray-300 italic flex-grow text-lg leading-relaxed">
                &quot;{testimonial.quote}&quot;
              </div>
              
              <div className="pt-4 mt-auto flex items-center border-t border-indigo-900/30">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-600/30 to-purple-600/30 rounded-full flex items-center justify-center border border-indigo-500/30">
                  <span className="text-white font-bold">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>
                <div className="ml-4">
                  <div className="font-bold text-white">{testimonial.author}</div>
                  <div className="text-sm text-indigo-300">{testimonial.role}, <span className="text-gray-400">{testimonial.company}</span></div>
                </div>
              </div>
              
              {/* Bottom decoration line */}
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-700"></div>
            </motion.div>
          ))}
        </div>
        
        {/* Stats Section */}
        <motion.div
          variants={itemVariants}
          className="my-20 p-8 md:p-12 rounded-2xl bg-[rgba(15,15,35,0.5)] backdrop-blur-sm border border-indigo-800/20 shadow-lg shadow-indigo-900/10 relative overflow-hidden"
        >
          {/* Glowing corners */}
          <div className="absolute top-0 left-0 w-20 h-20 border-t border-l border-indigo-500/30 rounded-tl-2xl"></div>
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b border-r border-purple-500/30 rounded-br-2xl"></div>
          
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-white">Impact Mesurable</h3>
            <p className="text-gray-400 text-lg">Des résultats concrets pour nos clients</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
            {[
              { value: "95%", label: "Taux de satisfaction" },
              { value: "500+", label: "Entreprises équipées" },
              { value: "78%", label: "Gain de productivité" },
              { value: "24/7", label: "Support et disponibilité" }
            ].map((stat, index) => (
              <div key={index} className="group relative p-6 rounded-xl bg-[rgba(15,15,40,0.5)] border border-indigo-800/30 transition-transform duration-300 hover:transform hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/0 to-purple-600/0 group-hover:from-indigo-600/10 group-hover:to-purple-600/10 rounded-xl transition-colors duration-500"></div>
                <div className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400">{stat.value}</div>
                <div className="text-gray-400 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Trust logos */}
        <motion.div
          variants={itemVariants}
          className="mt-20 opacity-80"
        >
          <div className="text-center mb-10">
            <h3 className="text-xl font-medium text-indigo-300">Ils nous font confiance</h3>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
            {logoClients.map((client) => (
              <div 
                key={client.id} 
                className="w-24 h-12 flex items-center justify-center relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/0 to-purple-600/0 group-hover:from-indigo-600/10 group-hover:to-purple-600/10 rounded-md transition-colors duration-500"></div>
                <div className="w-full h-6 bg-gradient-to-r from-white/20 to-white/10 rounded-md animate-pulse-slow"></div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Global CSS for animations */}
      <style jsx global>{`
        @keyframes floatParticle {
          0% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(0) translateX(20px); }
          75% { transform: translateY(20px) translateX(10px); }
          100% { transform: translateY(0) translateX(0); }
        }
        
        .animate-pulse-slow {
          animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
} 