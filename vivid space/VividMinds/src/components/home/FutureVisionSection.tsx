"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useAnimation, useInView } from 'framer-motion';

// SVG Components
const CircuitLine = ({ className }: { className?: string }) => (
  <svg className={className} width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M75 10V140M10 75H140M20 20L130 130M130 20L20 130M35 10H115M10 35V115M35 140H115M140 35V115" 
          stroke="url(#circuit-gradient)" strokeOpacity="0.5" strokeWidth="0.5"/>
    <defs>
      <linearGradient id="circuit-gradient" x1="10" y1="10" x2="140" y2="140" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#3b82f6" stopOpacity="0.1"/>
        <stop offset="0.5" stopColor="#8b5cf6" stopOpacity="0.6"/>
        <stop offset="1" stopColor="#3b82f6" stopOpacity="0.1"/>
      </linearGradient>
    </defs>
  </svg>
);

export default function FutureVisionSection() {
  // Define the future cases
  const futureCases = [
    {
      title: "Accelerated Innovation",
      description: "AI systems that identify patterns across vast datasets to generate novel solutions beyond human intuition, advancing fields like drug discovery, materials science, and sustainable energy.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6L7 17l-5-5"></path>
          <path d="M16 6h2v2"></path>
          <path d="M16 10l5-5m0 0v5m0-5h-5"></path>
        </svg>
      ),
    },
    {
      title: "Extreme Personalization",
      description: "Cognitive agents that adapt to individual preferences, learning styles, and behavioral patterns to deliver experiences that feel intuitively responsive to each user's unique needs.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
    },
    {
      title: "Autonomous Automation",
      description: "Self-governing systems that manage complex operations with minimal human oversight, continuously optimizing for efficiency while maintaining adaptive resilience to unexpected challenges.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
          <polyline points="17 2 12 7 7 2"></polyline>
          <line x1="12" y1="7" x2="12" y2="22"></line>
        </svg>
      ),
    }
  ];

  // Animation hooks
  const controls = useAnimation();
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, rootMargin: "0px 0px -10% 0px" });

  useEffect(() => {
    if(inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <section 
      id="future-vision" 
      ref={sectionRef}
      className="relative py-28 overflow-hidden bg-gradient-to-b from-[#030014] to-[#070024]"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/grid.svg')] bg-repeat opacity-5"></div>
        <div className="absolute top-1/3 -left-1/4 w-1/2 h-1/2 rounded-full bg-purple-700/10 blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/3 -right-1/4 w-1/2 h-1/2 rounded-full bg-blue-700/10 blur-[100px] animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      
      {/* Moving particles */}
      <div className="absolute inset-0 -z-10">
        {[...Array(20)].map((_, i) => (
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

      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="inline-block mb-4">
            <span className="text-xs tracking-wider text-indigo-400 uppercase bg-indigo-900/30 py-1 px-3 rounded-full">Vision</span>
          </motion.div>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
            variants={itemVariants}
          >
            The Future of <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400">Digital Interactions</span>
          </motion.h2>
          <motion.p 
            className="text-gray-400 text-lg max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Our advanced AI agents are pioneering the next evolution of human-computer symbiosis, creating intelligent systems that amplify human capabilities.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {futureCases.map((item, index) => (
            <motion.div 
              key={index} 
              className="relative group"
              variants={itemVariants}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur-sm group-hover:blur-md transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
              <div className="relative bg-[rgba(15,15,30,0.5)] backdrop-blur-sm border border-gray-800/50 p-8 rounded-2xl h-full overflow-hidden transition-all duration-300 group-hover:border-indigo-500/50 group-hover:translate-y-[-5px]">
                {/* Glowing corners */}
                <div className="absolute top-0 left-0 w-10 h-10 border-t border-l border-indigo-500/30 rounded-tl-2xl"></div>
                <div className="absolute bottom-0 right-0 w-10 h-10 border-b border-r border-purple-500/30 rounded-br-2xl"></div>
                
                <div className={`inline-flex items-center justify-center p-3 rounded-xl mb-5 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-gray-700/30`}>
                  {item.icon}
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
                
                {/* Animated line */}
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-700"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="order-2 lg:order-1">
            <h3 className="text-2xl font-bold mb-6 leading-tight">
              Beyond Current <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">Limitations</span>
            </h3>
            <p className="text-gray-400 mb-8">
              Traditional AI systems are constrained by rigid algorithms and limited contextual understanding. Our next-generation agents transcend these boundaries through:
            </p>
            <ul className="space-y-6">
              <li className="flex items-start">
                <div className="flex-shrink-0 relative">
                  <div className="absolute inset-0 bg-indigo-500/20 blur-md rounded-full"></div>
                  <div className="relative bg-indigo-900/50 p-3 rounded-full border border-indigo-500/30">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="font-medium text-white text-lg">Multimodal Understanding</h4>
                  <p className="text-gray-400 mt-1">Processing and synthesizing information across text, voice, images, and sensory data simultaneously</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 relative">
                  <div className="absolute inset-0 bg-purple-500/20 blur-md rounded-full"></div>
                  <div className="relative bg-purple-900/50 p-3 rounded-full border border-purple-500/30">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 11 12 14 22 4"></polyline>
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="font-medium text-white text-lg">Adaptive Learning</h4>
                  <p className="text-gray-400 mt-1">Continuously improving through interaction, refining responses based on contextual feedback</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 relative">
                  <div className="absolute inset-0 bg-blue-500/20 blur-md rounded-full"></div>
                  <div className="relative bg-blue-900/50 p-3 rounded-full border border-blue-500/30">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                      <path d="M2 17l10 5 10-5"></path>
                      <path d="M2 12l10 5 10-5"></path>
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="font-medium text-white text-lg">Cognitive Architecture</h4>
                  <p className="text-gray-400 mt-1">Structured frameworks that enable reasoning, memory, and goal-directed behavior</p>
                </div>
              </li>
            </ul>
            <div className="mt-10">
              <Link href="#creation-process" className="group inline-flex items-center text-white bg-gradient-to-r from-indigo-600 to-purple-600 py-3 px-6 rounded-full hover:from-indigo-500 hover:to-purple-500 transition-all duration-300">
                <span>Learn about our creation process</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            className="relative order-1 lg:order-2" 
            variants={itemVariants}
          >
            <div className="relative z-10 rounded-2xl overflow-hidden group perspective">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl opacity-30 blur-lg group-hover:opacity-100 transition duration-1000"></div>
              
              <div className="relative rounded-2xl overflow-hidden border border-gray-700/50 group-hover:border-indigo-500/50 transition duration-300 transform group-hover:rotate-y-6">
                <Image 
                  src="/images/future-vision.webp" 
                  alt="Future Vision" 
                  width={600} 
                  height={400} 
                  className="w-full h-auto"
                />
                
                {/* Overlay with animated gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/60 to-purple-900/60 mix-blend-overlay"></div>
                
                {/* Scanning line animation */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-0 -left-full w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-400 to-transparent animate-scan-horizontal"></div>
                  <div className="absolute -top-full left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-purple-400 to-transparent animate-scan-vertical" style={{animationDelay: '1s'}}></div>
                </div>
                
                {/* HUD elements */}
                <div className="absolute top-4 left-4 flex space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-indigo-400/70 animate-pulse" style={{animationDelay: `${i * 0.3}s`}}></div>
                  ))}
                </div>
                
                <div className="absolute bottom-4 right-4 w-12 h-12 border border-indigo-500/30 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border-2 border-indigo-400/50 border-t-indigo-400 animate-spin"></div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 border border-indigo-500/10 rounded-full -z-10"></div>
            <div className="absolute -top-10 -left-10 w-20 h-20 border border-purple-500/10 rounded-full -z-10"></div>
          </motion.div>
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
        
        @keyframes scan-horizontal {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        
        @keyframes scan-vertical {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        
        .perspective {
          perspective: 1000px;
        }
        
        .rotate-y-6 {
          transform: rotateY(6deg);
        }
      `}</style>
    </section>
  );
} 