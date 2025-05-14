"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function ServicesSection() {
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      title: "Beat Composition",
      description: "Master the art of creating captivating beats with personalized guidance on structure, rhythm, and arrangement techniques.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      ),
      features: [
        "Melody and chord progression techniques",
        "Drum pattern development",
        "Song structure optimization",
        "Genre-specific composition approaches"
      ]
    },
    {
      title: "Sound Design",
      description: "Develop your unique sonic signature with expert coaching on synthesis, sampling, and processing techniques.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 017.072 0m-9.9-2.828a9 9 0 0112.728 0" />
        </svg>
      ),
      features: [
        "Advanced synthesis techniques",
        "Sample manipulation mastery",
        "Effect chain development",
        "Creating signature sounds"
      ]
    },
    {
      title: "Mixing & Mastering",
      description: "Elevate your tracks with professional-quality mixing techniques that achieve clarity, depth, and impact.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11l7-7 7 7M5 19l7-7 7 7" />
        </svg>
      ),
      features: [
        "EQ and compression techniques",
        "Spatial processing mastery",
        "Dynamics and balance control",
        "Mastering for streaming platforms"
      ]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-[#0c1528] to-[#0a0e14]" id="services">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 inline-block relative">
            Our <span className="text-beat-gold-500">Coaching</span> Specialties
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-beat-purple-500/0 via-beat-purple-500 to-beat-purple-500/0"></div>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-6">
            Personalized coaching sessions focused on developing your skills in key areas of music production, from beat-making to professional mixes.
          </p>
        </motion.div>

        {/* Services tabs navigation */}
        <div className="flex justify-center mb-12 overflow-x-auto pb-2">
          <div className="inline-flex bg-gray-900/50 backdrop-blur-sm p-1 rounded-full border border-gray-800">
            {services.map((service, idx) => (
              <button
                key={idx}
                onClick={() => setActiveService(idx)}
                className={`px-5 py-2 rounded-full transition-all duration-300 min-w-[160px] ${
                  activeService === idx 
                    ? 'bg-gradient-to-r from-beat-purple-500 to-beat-gold-500 text-white font-medium shadow-lg' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {service.title}
              </button>
            ))}
          </div>
        </div>

        {/* Service content */}
        <div className="relative max-w-5xl mx-auto">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ 
                opacity: activeService === idx ? 1 : 0,
                x: activeService === idx ? 0 : 20,
                position: activeService === idx ? 'relative' : 'absolute'
              }}
              transition={{ duration: 0.4 }}
              className={`${activeService !== idx ? 'pointer-events-none hidden' : ''}`}
            >
              {/* Service display area */}
              <div className="flex flex-col md:flex-row gap-10 items-center backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 bg-gradient-to-br from-gray-900/60 to-gray-800/30">
                <div className="md:w-1/2">
                  <div className="w-20 h-20 mb-6 rounded-2xl bg-beat-purple-500/20 border border-beat-purple-500/30 flex items-center justify-center text-beat-purple-400">
                    <div className="w-12 h-12">{service.icon}</div>
                  </div>
                  
                  <h3 className="text-3xl font-bold mb-4 text-white">{service.title}</h3>
                  <p className="text-gray-300 text-lg mb-6">{service.description}</p>
                  
                  <a href="#pricing" className="inline-flex items-center text-beat-gold-400 hover:text-beat-gold-300 transition-colors group font-medium">
                    <span>Explore coaching options</span>
                    <svg className="ml-2 w-5 h-5 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
                
                <div className="md:w-1/2 bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6">
                  <div className="text-xl font-semibold text-beat-purple-400 mb-4">What you'll learn:</div>
                  <ul className="space-y-4">
                    {service.features.map((feature, fidx) => (
                      <li key={fidx} className="flex">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-beat-purple-500/20 text-beat-purple-400 flex items-center justify-center mr-3">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-200 pt-1">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="flex justify-center mt-16">
          <a href="#pricing" className="px-6 py-3 text-center border border-beat-purple-500/30 text-beat-purple-400 hover:bg-beat-purple-500/10 transition-colors rounded-lg">
            View our coaching packages
          </a>
        </div>
      </div>
    </section>
  );
} 