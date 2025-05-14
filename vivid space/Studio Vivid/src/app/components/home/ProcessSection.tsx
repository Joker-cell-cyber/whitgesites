"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

type ProcessStep = {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(1);
  
  const processSteps: ProcessStep[] = [
    {
      number: "01",
      title: "Discovery",
      description: "We explore your objectives, identity and needs to define the creative vision.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    {
      number: "02",
      title: "Design",
      description: "We create mockups and prototypes that translate your ideas into coherent design.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      )
    },
    {
      number: "03",
      title: "Creation",
      description: "We meticulously develop every aspect of the design for a perfect result.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      number: "04",
      title: "Launch",
      description: "We finalize and deliver your project with support and follow-up to ensure your success.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    }
  ];

  return (
    <div className="relative py-24 overflow-hidden bg-black">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute -left-48 -top-48 w-96 h-96 rounded-full bg-purple-900/20 mix-blend-screen blur-3xl"></div>
      <div className="absolute -right-48 -bottom-48 w-96 h-96 rounded-full bg-pink-900/20 mix-blend-screen blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block mb-4 px-4 py-1.5 text-xs font-medium tracking-widest text-purple-300 uppercase rounded-full bg-purple-950/50 border border-purple-500/20">Our Process</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            How we <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">transform</span> your ideas
          </h2>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
            Our proven method ensures exceptional results at every stage of the creative process.
          </p>
        </motion.div>
        
        {/* Process Steps - Fixed Navigation at top */}
        <div className="relative">
          {/* Steps Navigation */}
          <div className="hidden md:flex justify-between items-center mb-10 sticky top-10 z-20 max-w-5xl mx-auto">
            {processSteps.map((step, index) => (
              <motion.button
                key={`nav-${index}`}
                onClick={() => setActiveStep(index + 1)}
                className={`relative flex flex-col items-center group transition-all duration-300 ${activeStep === index + 1 ? 'scale-110' : 'opacity-50 hover:opacity-80'}`}
                whileHover={{ scale: activeStep === index + 1 ? 1.1 : 1.05 }}
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                  activeStep === index + 1 
                    ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20' 
                    : 'bg-gray-800 text-gray-400'
                }`}>
                  <span className="text-lg font-bold">{step.number}</span>
                </div>
                <span className={`text-sm font-medium transition-all duration-300 ${
                  activeStep === index + 1 ? 'text-white' : 'text-gray-400'
                }`}>{step.title}</span>
                
                {/* Progress Line */}
                {index < processSteps.length - 1 && (
                  <div className="absolute left-[4rem] right-0 top-8 -z-10">
                    <div className="h-0.5 w-full bg-gray-800">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
                        initial={{ width: "0%" }}
                        animate={{ 
                          width: activeStep > index + 1 ? "100%" : activeStep === index + 1 ? "50%" : "0%" 
                        }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                )}
              </motion.button>
            ))}
          </div>
          
          {/* Active Step Content - Horizontal Layout */}
          <div className="max-w-6xl mx-auto space-y-20 md:space-y-0">
            {processSteps.map((step, index) => (
              <div 
                key={`content-${index}`}
                className={activeStep === index + 1 ? 'block' : 'hidden'}
              >
                <motion.div
                  className="flex flex-col md:flex-row items-center gap-8 md:gap-16"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ 
                    opacity: 1,
                    y: 0
                  }}
                  transition={{ duration: 0.7 }}
                >
                  {/* Left Column - Illustration/Animation */}
                  <div className="w-full md:w-1/2">
                    <div className="relative">
                      <div className="aspect-square rounded-2xl border border-purple-500/20 overflow-hidden backdrop-blur-sm bg-purple-950/10">
                        {/* Animated Gradients */}
                        <div className="absolute inset-0 overflow-hidden">
                          <motion.div
                            className="absolute -inset-[10%] rounded-full bg-gradient-to-r from-purple-600/20 to-pink-500/20 blur-2xl"
                            animate={{
                              x: [0, 10, 0],
                              y: [0, 15, 0],
                              rotate: [0, 5, 0]
                            }}
                            transition={{
                              duration: 8,
                              repeat: Infinity,
                              repeatType: "reverse"
                            }}
                          />
                          <motion.div
                            className="absolute -inset-[20%] rounded-full bg-gradient-to-r from-pink-500/10 to-purple-600/10 blur-2xl"
                            animate={{
                              x: [0, -15, 0],
                              y: [0, -10, 0],
                              rotate: [0, -5, 0]
                            }}
                            transition={{
                              duration: 10,
                              repeat: Infinity,
                              repeatType: "reverse"
                            }}
                          />
                        </div>
                        
                        {/* Center Icon with Animation */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div
                            className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/20"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                          >
                            <div className="text-white w-12 h-12">
                              {step.icon}
                            </div>
                          </motion.div>
                        </div>
                        
                        {/* Animated Orbiting Elements */}
                        {[...Array(6)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full bg-white/80"
                            style={{
                              x: -6,
                              y: -6,
                            }}
                            animate={{
                              x: [0, Math.cos(i * 60 * Math.PI / 180) * 120 - 6],
                              y: [0, Math.sin(i * 60 * Math.PI / 180) * 120 - 6],
                            }}
                            transition={{
                              duration: 0.5,
                              delay: 0.5
                            }}
                          >
                            <motion.div
                              className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                              animate={{
                                scale: [1, 1.2, 1],
                                opacity: [1, 0.8, 1]
                              }}
                              transition={{
                                duration: 2 + i * 0.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            />
                          </motion.div>
                        ))}
                        
                        {/* Rotating Circular Path */}
                        <motion.div
                          className="absolute top-1/2 left-1/2 w-[240px] h-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/20"
                          animate={{
                            rotate: 360
                          }}
                          transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        />
                      </div>
                      
                      {/* Step Number Decoration */}
                      <div className="absolute -bottom-10 -right-10 text-9xl font-bold text-white opacity-5">
                        {step.number}
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Column - Step Content */}
                  <div className="w-full md:w-1/2">
                    <div className="text-center md:text-left">
                      <div className="mb-4 inline-block px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-sm font-medium">
                        Step {step.number}
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                        {step.title}
                      </h3>
                      <p className="text-xl text-gray-300 mb-8">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
            
            {/* Mobile Only Navigation */}
            <div className="md:hidden flex justify-between items-center mt-10">
              <button 
                onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
                className="px-4 py-2 rounded-lg border border-purple-500/20 text-purple-300 disabled:opacity-50"
                disabled={activeStep === 1}
              >
                Previous
              </button>
              <div className="text-gray-400">
                {activeStep} / {processSteps.length}
              </div>
              <button 
                onClick={() => setActiveStep(Math.min(processSteps.length, activeStep + 1))}
                className="px-4 py-2 rounded-lg border border-purple-500/20 text-purple-300 disabled:opacity-50"
                disabled={activeStep === processSteps.length}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .bg-grid-pattern {
          background-size: 50px 50px;
          background-image:
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
        }
      `}</style>
    </div>
  );
} 