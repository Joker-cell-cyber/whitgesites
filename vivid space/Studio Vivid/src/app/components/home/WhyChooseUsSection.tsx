"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function WhyChooseUsSection() {
  const reasons = [
    {
      id: 1,
      title: "Strategic Approach",
      description: "We design with purpose, focusing on your goals and brand identity for maximum impact.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
        </svg>
      )
    },
    {
      id: 2,
      title: "Creative Excellence",
      description: "Our innovative team pushes creative boundaries to deliver memorable, attention-grabbing designs.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
        </svg>
      )
    },
    {
      id: 3,
      title: "Personalized Service",
      description: "Attentive to your specific needs, we create customized solutions with a collaborative approach.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
        </svg>
      )
    }
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-black to-purple-950/40">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-full">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-br from-purple-600/10 to-pink-500/10 blur-3xl"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 30 + 10}rem`,
                height: `${Math.random() * 30 + 10}rem`,
              }}
              animate={{
                x: [0, Math.random() * 40 - 20],
                y: [0, Math.random() * 40 - 20],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Column - Text */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="max-w-xl">
              <div className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-sm font-medium mb-6">
                Why work with us
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-8">
                Creative expertise <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">driving your success</span>
              </h2>
              
              <p className="text-xl text-gray-300 mb-8">
                Our results-focused approach combines design excellence with strategic thinking to help your brand stand out in today's competitive landscape.
              </p>
              
              <motion.div 
                className="mt-10"
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <a href="/packages" className="group relative overflow-hidden">
                  <div className="relative z-10 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium rounded-full py-3 px-8 inline-flex items-center shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300">
                    <span>Start your project</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 bg-white/10 rounded-full transform origin-left transition-transform duration-500"></div>
                </a>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Right Column - Cards */}
          <motion.div
            className="lg:w-1/2 grid grid-cols-1 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.id}
                className="group relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + (index * 0.2) }}
                whileHover={{ y: -5 }}
              >
                <div className="relative z-10 backdrop-blur-md bg-white/5 border border-white/10 p-8 rounded-xl overflow-hidden">
                  {/* Animated Glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl opacity-30 blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  </div>
                  
                  <div className="flex gap-6 items-start relative z-10">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 p-3 text-white">
                      {reason.icon}
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">{reason.title}</h3>
                      <p className="text-gray-300">{reason.description}</p>
                    </div>
                  </div>
                  
                  {/* Animated Corner Shape */}
                  <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-gradient-to-br from-purple-600/30 to-pink-500/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
} 