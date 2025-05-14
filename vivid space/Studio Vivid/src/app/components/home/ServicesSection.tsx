"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ServicesSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  
  const services = [
    {
      id: 1,
      title: "Graphic Design",
      description: "Brand identities, logos, graphic guidelines and visual materials that captivate your target audience.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
          <path d="M2 2l7.586 7.586"></path>
          <circle cx="11" cy="11" r="2"></circle>
        </svg>
      )
    },
    {
      id: 2,
      title: "Web & UI/UX Design",
      description: "Responsive websites, intuitive user interfaces and immersive digital experiences for all devices.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      )
    },
    {
      id: 3,
      title: "Print Advertising",
      description: "Brochures, flyers, posters and printed marketing materials designed to maximize impact and recall.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2v6h.01M6 8h12"></path>
          <path d="M18 2v6h.01M12.5 17.5v-1a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1z"></path>
          <rect x="8" y="12" width="12" height="8" rx="1"></rect>
          <path d="M4 22h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v11H3a1 1 0 0 1-1-1V9a2 2 0 0 1 2-2h3"></path>
        </svg>
      )
    },
    {
      id: 4,
      title: "Digital Campaigns",
      description: "Visual content strategies for social media, newsletters and online advertising to generate engagement and conversions.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 19.111c0-2.413 1.697-4.468 4.004-4.97l.208-.035a17.134 17.134 0 0 1 5.576 0l.208.035c2.307.502 4.004 2.557 4.004 4.97 0 .491-.398.889-.889.889H5.89A.889.889 0 0 1 5 19.111Z"></path>
          <path d="M12 2a4 4 0 0 0-4 4v6a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4Z"></path>
          <path d="M10 10a2 2 0 1 0 4 0"></path>
          <path d="M15 2c0 1.657-1.343 2-3 2s-3-.343-3-2"></path>
          <path d="M18 6.2v1.77"></path>
          <path d="M18 12.849v2"></path>
          <path d="M6 12.85v2"></path>
          <path d="M6 6.2v1.77"></path>
        </svg>
      )
    },
    {
      id: 5,
      title: "Audiovisual Content",
      description: "Motion design, animations and short promotional videos to energize your communications across all channels.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m22 8-6 4 6 4V8Z"></path>
          <rect width="14" height="12" x="2" y="6" rx="2" ry="2"></rect>
        </svg>
      )
    },
    {
      id: 6,
      title: "Packaging & POS Materials",
      description: "Creative packaging design and point-of-sale advertising materials for a consistent brand experience.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"></path>
          <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"></path>
          <path d="M12 3v6"></path>
        </svg>
      )
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-black via-purple-950/70 to-black">
      <div className="container mx-auto px-4 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg width="100%" height="100%" className="absolute top-0 left-0 opacity-10">
            <defs>
              <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 40V0H40M40 0V40H0M0 20H40M20 0V40" stroke="white" strokeWidth="0.5" fill="none" stroke-opacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
        </div>
        
        <motion.div 
          className="text-center mb-16 relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-block px-6 py-2 mb-6 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 font-medium text-sm backdrop-blur-sm">
            Unique expertise
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            Our creative <span className="relative inline-block">
              <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">services</span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 5.53928C47.4388 1.40122 87.1596 0.904328 199 5.53928" stroke="url(#paint0_linear)" strokeWidth="6" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="paint0_linear" x1="1" y1="3.77964" x2="199" y2="3.77964" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#9333EA"/>
                    <stop offset="1" stopColor="#EC4899"/>
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover our tailored creative solutions to meet all your design and communication needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: service.id * 0.1 }}
              className="group relative"
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 backdrop-blur-sm bg-white/5 border border-white/10 h-full rounded-xl p-8 overflow-hidden">
                {/* Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl opacity-20 blur-xl group-hover:opacity-30 group-hover:blur-2xl transition-all duration-500"></div>
                </div>
                
                {/* Hover Animation Lines */}
                <div className="absolute inset-0 overflow-hidden">
                  <AnimatePresence>
                    {hoveredId === service.id && (
                      <>
                        <motion.div
                          initial={{ left: '-100%' }}
                          animate={{ left: '100%' }}
                          exit={{ left: '100%' }}
                          transition={{ duration: 0.7, ease: "easeInOut" }}
                          className="absolute top-0 h-px w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent"
                        />
                        <motion.div
                          initial={{ left: '-100%' }}
                          animate={{ left: '100%' }}
                          exit={{ left: '100%' }}
                          transition={{ duration: 0.7, ease: "easeInOut", delay: 0.1 }}
                          className="absolute bottom-0 h-px w-full bg-gradient-to-r from-transparent via-pink-500 to-transparent"
                        />
                        <motion.div
                          initial={{ top: '-100%' }}
                          animate={{ top: '100%' }}
                          exit={{ top: '100%' }}
                          transition={{ duration: 0.7, ease: "easeInOut", delay: 0.2 }}
                          className="absolute left-0 w-px h-full bg-gradient-to-b from-transparent via-purple-500 to-transparent"
                        />
                        <motion.div
                          initial={{ top: '-100%' }}
                          animate={{ top: '100%' }}
                          exit={{ top: '100%' }}
                          transition={{ duration: 0.7, ease: "easeInOut", delay: 0.3 }}
                          className="absolute right-0 w-px h-full bg-gradient-to-b from-transparent via-pink-500 to-transparent"
                        />
                      </>
                    )}
                  </AnimatePresence>
                </div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold ml-4 text-white">
                      {service.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-300 flex-grow mb-6">
                    {service.description}
                  </p>
                  
                  <div className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-500/20 rounded-2xl backdrop-blur-sm -z-10"></div>
          <div className="max-w-4xl mx-auto p-10 rounded-2xl border border-white/10 text-center relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent"></div>
              <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-purple-500/50 to-transparent"></div>
              <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-pink-500/50 to-transparent"></div>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white relative z-10">
              Have a creative project in mind?
            </h3>
            <p className="text-gray-300 mb-8 relative z-10">
              Contact us to discuss your needs and find out how we can help bring your vision to life.
            </p>
            <a 
              href="/contact" 
              className="group relative inline-flex overflow-hidden rounded-full p-[2px]"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E879F9_0%,#C026D3_50%,#E879F9_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-black px-8 py-3 text-sm font-medium text-white backdrop-blur-3xl">
                Let&apos;s discuss your project
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 