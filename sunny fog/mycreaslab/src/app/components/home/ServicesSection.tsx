"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function ServicesSection() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  const services = [
    {
      id: 1,
      title: "Graphic Design",
      description: "Brand identities, logos, graphic guidelines and visual materials that captivate your target audience.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"></path>
          <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"></path>
          <path d="M12 3v6"></path>
        </svg>
      )
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-gray-100 to-transparent dark:from-gray-800 dark:to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-gray-100 to-transparent dark:from-gray-800 dark:to-transparent"></div>
      
      <div className="absolute -left-40 top-40 w-80 h-80 bg-emerald-300/20 dark:bg-emerald-800/20 rounded-full blur-3xl"></div>
      <div className="absolute -right-40 bottom-40 w-80 h-80 bg-yellow-300/10 dark:bg-yellow-800/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="inline-block px-4 py-1.5 mb-6 rounded-full border border-teal-600 dark:border-teal-400 text-teal-600 dark:text-teal-400 text-sm font-medium"
          >
            Unique expertise
          </motion.span>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Our creative <span className="relative">
              <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-yellow-500">services</span>
              <span className="absolute bottom-1 left-0 right-0 h-3 bg-yellow-300/20 dark:bg-yellow-300/30 -z-10 transform skew-x-12"></span>
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover our tailored creative solutions to meet all your design and communication needs.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className="relative bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow group"
            >
              {/* Élément décoratif en arrière-plan */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-300/10 to-yellow-300/10 dark:from-emerald-800/10 dark:to-yellow-800/10 rounded-full -m-4 blur-xl group-hover:w-32 group-hover:h-32 transition-all duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 mb-6 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800/40 transition-colors">
                  {service.icon}
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300">
                  {service.description}
                </p>
                
                <div className="mt-6 flex items-center text-emerald-600 dark:text-emerald-400 font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <span>Learn more</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-lg mx-auto mt-20 p-6 rounded-xl bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 shadow-lg text-center"
        >
          <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Have a creative project in mind?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Contact us to discuss your needs and find out how we can help bring your vision to life.
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            Let&apos;s discuss your project
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
} 