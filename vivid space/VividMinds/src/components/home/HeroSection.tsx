"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Link from "next/link";
import { COMPANY } from "../../app/constants/company";

export default function HeroSection() {
  const controls = useAnimation();
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

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
        duration: 0.8,
        ease: [0.2, 0.65, 0.3, 0.9]
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center pt-16 overflow-hidden bg-gradient-to-b from-[#030014] to-[#090038]" 
      id="home"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-50 pointer-events-none">
        <div className="stars absolute inset-0"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[url('/images/grid.svg')] bg-repeat opacity-5"></div>
        <div className="absolute top-20 left-0 w-full h-1/3 bg-gradient-to-r from-indigo-900/10 to-purple-900/10"></div>
      </div>
      
      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[120px] animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] rounded-full bg-purple-600/10 blur-[100px] animate-pulse-slow" style={{animationDelay: '2s'}}></div>
      
      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.5, 0], 
              scale: [0, 1, 0],
              y: [0, Math.random() * -100],
              x: [0, Math.random() * 100 - 50]
            }}
            transition={{ 
              duration: Math.random() * 5 + 8, 
              repeat: Infinity, 
              delay: Math.random() * 10,
              ease: "linear"
            }}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 relative z-10 py-16 md:py-20">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          <div className="space-y-8">
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm bg-indigo-950/60 text-indigo-200 backdrop-blur-md border border-indigo-800/40">
                <span className="flex h-2 w-2 rounded-full bg-indigo-400 mr-2 animate-pulse"></span>
                <code className="font-mono tracking-wider">NEXT_GEN_AI_PLATFORM</code>
              </div>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight"
            >
              Create <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400">Custom AI Agents</span> With <span className="relative inline-block">
                <span className="relative z-10">Advanced</span>
                <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
              </span> Capabilities
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-300 leading-relaxed opacity-80"
            >
              Build, customize, and deploy AI agents that match your exact requirements. For developers, businesses, and innovators.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-5 pt-4"
            >
              <Link 
                href="/#pricing" 
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full overflow-hidden shadow-xl shadow-indigo-900/20 transition-all duration-300 hover:shadow-indigo-700/30 hover:from-indigo-500 hover:to-purple-500"
              >
                <span className="relative z-10 flex items-center">
                  View Agent Plans
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-600/80 to-purple-600/80 blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-300"></span>
              </Link>
              <Link 
                href="/#features" 
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-transparent backdrop-blur-sm border border-indigo-500/30 hover:border-indigo-400 rounded-full overflow-hidden transition-colors duration-300"
              >
                Explore Capabilities
              </Link>
            </motion.div>
          </div>
          
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            {/* Terminal-style interface */}
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-indigo-800/20 bg-[rgba(13,12,34,0.85)] backdrop-blur-xl">
              {/* Animated glow effect */}
              <div className="absolute -inset-px bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl opacity-20"></div>
              
              <div className="bg-[rgba(15,14,45,0.8)] h-10 flex items-center px-4 border-b border-indigo-900/60">
                <div className="mr-2 h-3 w-3 rounded-full bg-red-400"></div>
                <div className="mr-2 h-3 w-3 rounded-full bg-amber-400"></div>
                <div className="mr-4 h-3 w-3 rounded-full bg-emerald-400"></div>
                <div className="flex-1 text-center text-xs text-gray-300 font-mono">vivid_minds.sh</div>
              </div>
              
              <div className="p-6 font-mono text-sm">
                <div className="flex items-center">
                  <span className="text-emerald-400 mr-2">$</span>
                  <span className="text-gray-300">initialize_agent<span className="text-indigo-400">.</span>py</span>
                  <span className="ml-2 h-4 w-px bg-indigo-500/30 animate-blink"></span>
                </div>
                
                <div className="mt-3 text-gray-300 opacity-90">
                  <span className="text-purple-400">Configuring</span> agent parameters...
                </div>
                
                <div className="mt-2 flex items-center space-x-2 text-gray-300 opacity-90">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-900/30 border border-indigo-700/30">
                    <svg className="w-3 h-3 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span>Base intelligence module loaded</span>
                </div>
                
                <div className="mt-2 flex items-center space-x-2 text-gray-300 opacity-90">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-900/30 border border-indigo-700/30">
                    <svg className="w-3 h-3 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span>Knowledge frameworks connected</span>
                </div>
                
                <div className="mt-2 flex items-center space-x-2 text-gray-300 opacity-90">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-900/30 border border-indigo-700/30">
                    <svg className="w-3 h-3 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span>Advanced reasoning activated</span>
                </div>
                
                <div className="mt-2 flex items-center space-x-2 text-gray-300 opacity-90">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-900/30 border border-indigo-700/30">
                    <svg className="w-3 h-3 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span>Custom instructions parsed</span>
                </div>
                
                <div className="mt-5 flex items-center">
                  <span className="text-emerald-400 mr-2">$</span>
                  <span className="text-white">deploy_agent<span className="text-indigo-400">.</span>sh --environment=production</span>
                </div>
                
                <div className="mt-3 flex items-center text-gray-300 opacity-90">
                  <span className="text-indigo-400">Initializing</span> {COMPANY.serviceName}<span className="text-indigo-400">...</span>
                  <div className="relative ml-3 h-5 w-20 bg-indigo-900/30 rounded-full overflow-hidden">
                    <div className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-progress"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -right-8 top-1/4 p-4 bg-[rgba(15,14,42,0.8)] rounded-xl shadow-xl border border-indigo-800/20 backdrop-blur-md rotate-3 transition-transform duration-700 hover:rotate-0 hover:scale-105">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-900/30">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                    <line x1="12" x2="12" y1="19" y2="22"></line>
                  </svg>
                </div>
                <div>
                  <div className="text-white font-medium">Voice Enabled</div>
                  <div className="text-indigo-200 text-sm opacity-80">Natural Interaction</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -left-8 bottom-1/4 p-4 bg-[rgba(15,14,42,0.8)] rounded-xl shadow-xl border border-indigo-800/20 backdrop-blur-md -rotate-3 transition-transform duration-700 hover:rotate-0 hover:scale-105">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-indigo-500 rounded-lg flex items-center justify-center text-white shadow-lg shadow-emerald-900/30">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
                    <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
                    <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                  </svg>
                </div>
                <div>
                  <div className="text-white font-medium">API Access</div>
                  <div className="text-indigo-200 text-sm opacity-80">For Developers</div>
                </div>
              </div>
            </div>
            
            {/* Network connection lines */}
            <div className="absolute inset-0 -z-10">
              <svg className="absolute top-0 left-0 w-full h-full opacity-20" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                <path d="M200,50 Q300,150 200,250 T200,350" fill="none" stroke="url(#gradient1)" strokeWidth="1" />
                <path d="M250,100 Q150,200 250,300" fill="none" stroke="url(#gradient2)" strokeWidth="1" />
                <path d="M150,100 Q250,200 150,300" fill="none" stroke="url(#gradient1)" strokeWidth="1" />
                <path d="M100,150 L300,150" fill="none" stroke="url(#gradient2)" strokeWidth="1" />
                <path d="M100,250 L300,250" fill="none" stroke="url(#gradient1)" strokeWidth="1" />
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0.3" />
                  </linearGradient>
                  <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Gradient overlay at bottom for smooth transition */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#090038] to-transparent"></div>
      
      {/* Global CSS for animations */}
      <style jsx global>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        .animate-blink {
          animation: blink 1s infinite;
        }
        
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        
        .animate-progress {
          animation: progress 2s infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .stars {
          background-image: radial-gradient(2px 2px at 20px 30px, #eee, rgba(0, 0, 0, 0)),
                            radial-gradient(2px 2px at 40px 70px, #fff, rgba(0, 0, 0, 0)),
                            radial-gradient(1px 1px at 90px 40px, #fff, rgba(0, 0, 0, 0)),
                            radial-gradient(1px 1px at 130px 80px, #fff, rgba(0, 0, 0, 0)),
                            radial-gradient(1px 1px at 160px 120px, #fff, rgba(0, 0, 0, 0));
          background-repeat: repeat;
          background-size: 200px 200px;
          opacity: 0.2;
        }
      `}</style>
    </section>
  );
} 