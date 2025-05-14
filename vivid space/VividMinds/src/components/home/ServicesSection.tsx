"use client";

import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

export default function ServicesSection() {
  const features = [
    {
      id: 1,
      title: "Natural Language Processing",
      description: "Agents with advanced language comprehension and generation capabilities for seamless human-like interactions.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      ),
    },
    {
      id: 2,
      title: "Multi-Tool Integration",
      description: "Connect your agent to external services, databases, and APIs to extend functionality beyond conversation.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16.5 9.4 7.5 4.21"></path>
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="3.29 7 12 12 20.71 7"></polyline>
          <line x1="12" y1="22" x2="12" y2="12"></line>
        </svg>
      ),
    },
    {
      id: 3,
      title: "Custom Knowledge Base",
      description: "Train your AI on proprietary documents, guidelines, and data to create specialized domain experts.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
        </svg>
      ),
    },
    {
      id: 4,
      title: "Advanced Reasoning",
      description: "Leverage powerful reasoning capabilities to solve complex problems, analyze data, and provide insights.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a8 8 0 0 0-8 8c0 5.2 3.4 9.1 8 10 4.6-.9 8-4.8 8-10a8 8 0 0 0-8-8z"></path>
          <path d="m13.8 13.5-5.3-3.1"></path>
          <path d="m10.3 16.1 6.3-9.7"></path>
        </svg>
      ),
    },
    {
      id: 5,
      title: "Visual Analysis",
      description: "Process and understand images, charts, and visual data for comprehensive multimodal capabilities.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2"></rect>
          <circle cx="9" cy="9" r="2"></circle>
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
        </svg>
      ),
    },
    {
      id: 6,
      title: "Autonomous Actions",
      description: "Define custom functions and capabilities that allow your agent to perform tasks on your behalf.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="6" height="16" x="4" y="4" rx="1"></rect>
          <rect width="6" height="10" x="14" y="10" rx="1"></rect>
          <path d="M22 17h-6"></path>
          <path d="M16 17h-2"></path>
          <path d="M6 12v-2"></path>
        </svg>
      ),
    },
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
    <section ref={sectionRef} className="py-28 relative overflow-hidden bg-gradient-to-b from-[#050518] via-[#070721] to-[#050518]" id="features">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[url('/images/grid.svg')] bg-repeat"></div>
      </div>
      
      {/* Glowing gradients */}
      <div className="absolute top-1/3 -left-1/4 w-1/2 h-1/2 rounded-full bg-indigo-600/5 blur-[120px] animate-pulse-slow"></div>
      <div className="absolute bottom-1/3 -right-1/4 w-1/2 h-1/2 rounded-full bg-purple-600/5 blur-[120px] animate-pulse-slow" style={{animationDelay: '2s'}}></div>
      
      {/* Floating digital elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="serviceGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <path d="M0,100 L1000,100" stroke="url(#serviceGradient)" strokeWidth="0.5" strokeDasharray="5,5" />
          <path d="M0,300 L1000,300" stroke="url(#serviceGradient)" strokeWidth="0.5" strokeDasharray="5,5" />
          <path d="M0,500 L1000,500" stroke="url(#serviceGradient)" strokeWidth="0.5" strokeDasharray="5,5" />
          <path d="M200,0 L200,700" stroke="url(#serviceGradient)" strokeWidth="0.5" strokeDasharray="5,5" />
          <path d="M600,0 L600,700" stroke="url(#serviceGradient)" strokeWidth="0.5" strokeDasharray="5,5" />
        </svg>
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="text-center mb-3">
            <span className="text-xs tracking-wider text-indigo-400 uppercase bg-indigo-900/30 py-1 px-3 rounded-full">Features</span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-6 text-center"
          >
            Agent <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400">Capabilities</span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-gray-400 text-lg text-center max-w-3xl mx-auto"
          >
            Our platform enables you to create AI agents with a wide range of powerful capabilities
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={feature.id}
              variants={itemVariants}
              initial="hidden"
              animate={controls}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-[rgba(15,15,35,0.5)] backdrop-blur-sm border border-indigo-800/20 rounded-2xl p-8 overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-indigo-900/20 hover:-translate-y-1"
            >
              {/* Glowing background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/0 to-purple-600/0 group-hover:from-indigo-600/5 group-hover:to-purple-600/5 transition-colors duration-500"></div>
              
              {/* Feature number */}
              <div className="absolute top-4 right-4 text-4xl font-bold opacity-5 text-white">
                {String(feature.id).padStart(2, '0')}
              </div>
              
              {/* Icon with glow effect */}
              <div className="relative mb-6">
                <div className="absolute -inset-1 bg-indigo-500/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-4 bg-gradient-to-br from-indigo-900/50 to-purple-900/50 rounded-2xl border border-indigo-800/30 text-indigo-400">
                  {feature.icon}
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-100 to-white">{feature.title}</h3>
              
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{feature.description}</p>
              
              {/* Bottom decoration line */}
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-700"></div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          variants={itemVariants}
          className="mt-16 text-center"
        >
          <a
            href="#creation-process"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-indigo-900/20 hover:shadow-indigo-700/30"
          >
            How It Works
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </motion.div>
      </div>
      
      {/* Global CSS for animations */}
      <style jsx global>{`
        .animate-pulse-slow {
          animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
} 