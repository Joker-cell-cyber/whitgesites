"use client";

import { motion } from "framer-motion";

export default function HowItWorksSection() {
  const steps = [
    {
      title: "Request a Quote",
      description: "Fill out our simple form with details about your content, source language, target language(s), and deadline requirements.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      )
    },
    {
      title: "Receive Your Proposal",
      description: "Within 24 hours, we'll provide you with a detailed quote, timeline, and assign specialized translators for your project.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Translation Process",
      description: "Our expert linguists translate your content with precision, while our quality assurance team ensures accuracy and cultural relevance.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
      )
    },
    {
      title: "Review & Delivery",
      description: "Receive your polished translations, review them, and request any adjustments if needed. Once approved, your files are ready to use.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-28 relative overflow-hidden" id="how-it-works">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900"></div>
      
      {/* Enhanced Abstract Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute w-full h-full opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="flow-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <path d="M0,0 Q30,25 60,15 T100,30 V100 H0 Z" fill="url(#flow-gradient)" />
        </svg>
      </div>
      
      {/* Enhanced floating particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`dot-${i}`}
            className="absolute rounded-full bg-indigo-400"
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.2 + 0.05,
              filter: "blur(1px)"
            }}
            animate={{
              y: [0, Math.random() * -40 - 10],
              opacity: [0.05, 0.2, 0.05],
            }}
            transition={{
              duration: Math.random() * 8 + 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex mb-3 items-center justify-center px-4 py-1.5 rounded-full bg-indigo-950/50 border border-indigo-500/30 backdrop-blur-sm">
            <span className="text-sm font-medium text-indigo-400">Simple 4-Step Process</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-blue-300 to-purple-300">
            How It Works
          </h2>
          
          <p className="text-lg text-slate-300">
            We've streamlined our translation process to make it easy and efficient, ensuring quality results for all your projects.
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          {/* Timeline steps */}
          <div className="relative">
            {/* Connecting line with enhanced gradient */}
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-indigo-500/50 via-blue-500/50 to-purple-500/50 transform -translate-x-1/2 hidden md:block"></div>
            
            <div className="space-y-24 md:space-y-32">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: index * 0.15 }}
                  className="relative"
                >
                  <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}>
                    {/* Content with enhanced card design */}
                    <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                      <div className="relative group">
                        {/* Card glow effect */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/30 to-blue-500/30 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                        
                        <div className="relative bg-slate-900/70 backdrop-blur-sm rounded-xl border border-slate-800/80 p-6 md:p-8 group-hover:border-indigo-500/30 transition duration-500 hover:bg-slate-900/80">
                          <div className="flex items-start gap-4">
                            <div className={`w-14 h-14 flex-shrink-0 rounded-lg flex items-center justify-center ${
                              index % 2 === 0 
                                ? 'bg-gradient-to-br from-indigo-500 to-blue-600' 
                                : 'bg-gradient-to-br from-blue-500 to-indigo-600'
                            } shadow-lg shadow-indigo-600/20 md:order-${index % 2 === 0 ? 'last' : 'first'}`}>
                              {step.icon}
                            </div>
                            
                            <div>
                              <div className="flex items-center">
                                <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-indigo-900/80 text-indigo-300 mb-2 border border-indigo-700/50">
                                  Step {index + 1}
                                </span>
                              </div>
                              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                                {step.title}
                              </h3>
                              <p className="text-slate-300 group-hover:text-slate-200 transition-colors">
                                {step.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Center circle marker with enhanced effects */}
                    <div className="flex items-center justify-center w-full md:w-2/12 my-8 md:my-0 relative">
                      <div className="relative">
                        {/* Pulsing circles with better visibility */}
                        <div className="absolute top-1/2 left-1/2 w-16 h-16 -mt-8 -ml-8 rounded-full bg-indigo-500/10 animate-ping-slow" style={{ animationDuration: '3s' }}></div>
                        <div className="absolute top-1/2 left-1/2 w-24 h-24 -mt-12 -ml-12 rounded-full bg-blue-500/5 animate-ping-slow" style={{ animationDuration: '4s', animationDelay: '0.5s' }}></div>
                        
                        {/* Enhanced number circle */}
                        <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg border-4 border-slate-900 shadow-lg shadow-indigo-500/30 z-10">
                          {index + 1}
                        </div>
                      </div>
                    </div>
                    
                    {/* Spacer for layout */}
                    <div className="w-full md:w-5/12"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Enhanced Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-24 text-center"
          >
            <div className="relative inline-block">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full opacity-70 blur-sm"></div>
              <a 
                href="/pricing" 
                className="relative inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-blue-700 text-white font-medium shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                <span>Start Your Translation Project</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
            <p className="mt-6 text-slate-400 max-w-md mx-auto">
              We'll help you through every step of the process to ensure your translation project is a success.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 