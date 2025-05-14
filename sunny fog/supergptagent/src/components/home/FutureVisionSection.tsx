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
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6L7 17l-5-5"></path>
          <path d="M16 6h2v2"></path>
          <path d="M16 10l5-5m0 0v5m0-5h-5"></path>
        </svg>
      ),
      gradientClass: "bg-gradient-to-r from-ai-blue-500 to-ai-purple-500"
    },
    {
      title: "Extreme Personalization",
      description: "Cognitive agents that adapt to individual preferences, learning styles, and behavioral patterns to deliver experiences that feel intuitively responsive to each user's unique needs.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
      gradientClass: "bg-gradient-to-r from-ai-green-500 to-ai-blue-500"
    },
    {
      title: "Autonomous Automation",
      description: "Self-governing systems that manage complex operations with minimal human oversight, continuously optimizing for efficiency while maintaining adaptive resilience to unexpected challenges.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
          <polyline points="17 2 12 7 7 2"></polyline>
          <line x1="12" y1="7" x2="12" y2="22"></line>
        </svg>
      ),
      gradientClass: "bg-gradient-to-r from-ai-purple-500 to-ai-red-500"
    }
  ];

  // Framer Motion animations
  const controls = useAnimation();
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if(inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
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
        ease: [0.165, 0.84, 0.44, 1]
      }
    }
  };

  return (
    <section 
      id="future-vision" 
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-[#050508]"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 code-background opacity-20"></div>
      
      {/* Futuristic grid overlay */}
      <div className="absolute inset-0 -z-10 grid-background opacity-10"></div>
      
      {/* Glowing orbs */}
      <div className="absolute top-1/4 -left-40 w-80 h-80 bg-ai-blue-600/20 rounded-full filter blur-[120px] animate-pulse" style={{animationDuration: '15s'}}></div>
      <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-ai-purple-600/20 rounded-full filter blur-[120px] animate-pulse" style={{animationDuration: '20s'}}></div>
      
      {/* Circuit Lines */}
      <CircuitLine className="absolute top-20 left-10 opacity-20 -z-10" />
      <CircuitLine className="absolute bottom-20 right-10 opacity-20 -z-10" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            variants={itemVariants}
          >
            The Future of <span className="gradient-text">Digital Interactions</span>
          </motion.h2>
          <motion.p 
            className="text-gray-400 text-lg max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Our advanced AI agents are pioneering the next evolution of human-computer symbiosis, creating intelligent systems that amplify human capabilities.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {futureCases.map((item, index) => (
            <motion.div 
              key={index} 
              className="bg-[#0c0c14] border border-gray-800 p-6 rounded-xl shadow-feature transition-transform hover:translate-y-[-5px]"
              variants={itemVariants}
            >
              <div className={`${item.gradientClass} inline-flex items-center justify-center p-4 rounded-xl mb-5`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-400">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold mb-4">
              Beyond Current <span className="gradient-text">Limitations</span>
            </h3>
            <p className="text-gray-400 mb-6">
              Traditional AI systems are constrained by rigid algorithms and limited contextual understanding. Our next-generation agents transcend these boundaries through:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="bg-ai-blue-500/20 p-1 rounded-md mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-ai-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-white">Multimodal Understanding</h4>
                  <p className="text-gray-400">Processing and synthesizing information across text, voice, images, and sensory data simultaneously</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-ai-purple-500/20 p-1 rounded-md mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-ai-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 11 12 14 22 4"></polyline>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-white">Adaptive Learning</h4>
                  <p className="text-gray-400">Continuously improving through interaction, refining responses based on contextual feedback</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-ai-green-500/20 p-1 rounded-md mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-ai-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                    <path d="M2 17l10 5 10-5"></path>
                    <path d="M2 12l10 5 10-5"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-white">Cognitive Architecture</h4>
                  <p className="text-gray-400">Structured frameworks that enable reasoning, memory, and goal-directed behavior</p>
                </div>
              </li>
            </ul>
            <div className="mt-8">
              <Link href="#creation-process" className="inline-flex items-center text-ai-blue-400 hover:text-ai-blue-300 transition-colors">
                <span>Learn about our creation process</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            className="relative" 
            variants={itemVariants}
          >
            <div className="rounded-xl overflow-hidden border border-gray-800 shadow-xl relative z-10">
              <Image 
                src="/images/future-vision.webp" 
                alt="Future Vision" 
                width={600} 
                height={400} 
                className="w-full h-auto"
              />
              
              {/* Overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-ai-blue-600/10 to-ai-purple-600/30 mix-blend-overlay"></div>
              
              {/* Digital lines effect */}
              <div className="absolute inset-0 grid-overlay opacity-30"></div>
              
              {/* Glow points */}
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-ai-blue-500 rounded-full shadow-glow-blue animate-pulse"></div>
              <div className="absolute top-3/4 left-2/3 w-2 h-2 bg-ai-purple-500 rounded-full shadow-glow-purple animate-pulse" style={{animationDuration: '3s'}}></div>
              <div className="absolute top-1/2 left-1/3 w-3 h-3 bg-ai-green-500 rounded-full shadow-glow-green animate-pulse" style={{animationDuration: '4s'}}></div>
            </div>
            
            {/* Background decoration */}
            <div className="absolute -bottom-6 -right-6 w-64 h-64 border border-gray-800 rounded-xl -z-10"></div>
            <div className="absolute -top-6 -left-6 w-40 h-40 border border-gray-800 rounded-xl -z-10"></div>
            
            {/* Circuit element */}
            <svg className="absolute -top-10 -right-10 w-40 h-40 text-gray-800 opacity-30 -z-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="49" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" />
              <path d="M50 10V90M10 50H90" stroke="currentColor" strokeWidth="0.5" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 