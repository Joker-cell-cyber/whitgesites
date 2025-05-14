"use client";

import { motion } from "framer-motion";

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      quote: "Implémenter SuperGPTAgent a transformé notre service client. Nous avons réduit le temps de réponse de 75% tout en améliorant la satisfaction client de 40%.",
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
      quote: "Grâce à SuperGPTAgent, nous avons pu proposer une assistance à nos clients 24/7, ce qui a considérablement amélioré leur expérience et notre taux de conversion.",
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

  return (
    <section className="py-20 relative overflow-hidden" id="testimonials">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c14] to-[#08080f] -z-10"></div>
      <div className="absolute inset-0 code-background opacity-60 -z-5"></div>
      
      {/* Stylized circuit patterns */}
      <div className="absolute left-0 top-1/4 w-64 h-64 bg-ai-blue-600/10 rounded-full filter blur-[80px]"></div>
      <div className="absolute right-0 bottom-1/3 w-64 h-64 bg-ai-purple-600/10 rounded-full filter blur-[80px]"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Ce Qu&apos;en Disent Nos <span className="tech-gradient-text">Clients</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Découvrez comment SuperGPTAgent aide les entreprises à transformer leurs opérations et à innover
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-xl cyber-border relative bg-[#0a0a12]/80 backdrop-blur h-full flex flex-col"
            >
              <div className="absolute -top-3 -left-3 text-ai-blue-500 bg-[#0a0a12] p-1 rounded-full z-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                </svg>
              </div>
              
              <div className="mb-4 text-gray-300 italic flex-grow">
                &quot;{testimonial.quote}&quot;
              </div>
              
              <div className="mt-4 flex items-center">
                <div className="w-10 h-10 bg-ai-blue-500/20 rounded-full flex items-center justify-center">
                  <span className="text-ai-blue-500 font-bold">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>
                <div className="ml-3">
                  <div className="font-bold text-white">{testimonial.author}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}, {testimonial.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="my-16 p-8 rounded-xl cyber-border bg-[#0a0a12]/80 backdrop-blur"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold">Impact Mesurable</h3>
            <p className="text-gray-400">Des résultats concrets pour nos clients</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">95%</div>
              <div className="text-gray-400 text-sm">Taux de satisfaction</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">500+</div>
              <div className="text-gray-400 text-sm">Entreprises équipées</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">78%</div>
              <div className="text-gray-400 text-sm">Gain de productivité</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">24/7</div>
              <div className="text-gray-400 text-sm">Support et disponibilité</div>
            </div>
          </div>
        </motion.div>
        
        {/* Trust logos */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h3 className="text-xl font-medium text-gray-400">Ils nous font confiance</h3>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
            {logoClients.map((client) => (
              <div key={client.id} className="w-24 h-12 flex items-center justify-center">
                <div className="w-full h-6 bg-white/20 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 