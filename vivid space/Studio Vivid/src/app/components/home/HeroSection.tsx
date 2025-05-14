"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!scrollRef.current) return;
      
      const { clientX, clientY } = e;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      // Calculate rotation based on mouse position
      const rotateY = (clientX / windowWidth - 0.5) * 10;
      const rotateX = (clientY / windowHeight - 0.5) * -10;
      
      scrollRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };
    
    const handleMouseLeave = () => {
      if (!scrollRef.current) return;
      scrollRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 opacity-20 bg-grid-pattern"></div>
        <div className="absolute inset-0 bg-gradient-radial from-purple-900/30 to-black/80"></div>
      </div>
      
      {/* Animated Lines */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent w-full"
            style={{ top: `${index * 10 + 5}%` }}
            animate={{
              x: ["-100%", "100%"],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: (index % 5) + 5,
              repeat: Infinity,
              ease: "linear",
              delay: index * 0.5
            }}
          />
        ))}
        {[...Array(15)].map((_, index) => (
          <motion.div
            key={`v-${index}`}
            className="absolute w-px bg-gradient-to-b from-transparent via-pink-400/30 to-transparent h-full"
            style={{ left: `${index * 7}%` }}
            animate={{
              y: ["-100%", "100%"],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: (index % 5) + 6,
              repeat: Infinity,
              ease: "linear",
              delay: index * 0.3
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-center lg:text-left"
            >
              <div className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500 font-mono rounded-full mb-5 backdrop-blur-md bg-white/5 p-3 border border-white/10">
                #CreativityWithoutBorders
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-none">
                Bring your {" "}
                <span className="relative">
                  <span className="absolute -inset-1 -skew-y-3 bg-gradient-to-r from-purple-600 to-pink-500 opacity-30 rounded-lg"></span>
                  <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">creative ideas</span>
                </span> {" "} to life
              </h1>
              
              <p className="text-white/70 text-xl mb-10 max-w-xl mx-auto lg:mx-0">
                We design tailor-made digital experiences and visual identities to help your brand stand out with style and innovation.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                <Link href="/packages" className="group">
                  <div className="relative inline-flex">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full blur-lg group-hover:blur-xl opacity-70 transition-all duration-300 group-hover:opacity-100"></div>
                    <button className="relative bg-black hover:bg-black/80 py-5 px-10 rounded-full text-white font-bold z-10 transition-all duration-300 border border-white/10 flex items-center">
                      Discover our packages
                      <svg className="w-6 h-6 ml-2 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 5L21 12M21 12L15 19M21 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </Link>
                
                <Link href="/contact" className="group">
                  <div className="relative inline-flex">
                    <div className="absolute inset-0 bg-white/5 rounded-full blur-sm group-hover:blur opacity-70 transition-all duration-300"></div>
                    <button className="relative bg-transparent py-5 px-10 rounded-full text-white font-bold z-10 transition-all duration-300 border border-white/20 group-hover:border-white/40 flex items-center">
                      Contact us
                    </button>
                  </div>
                </Link>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 mt-16 lg:mt-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div ref={scrollRef} className="transition-all duration-300 ease-out" style={{ transformStyle: 'preserve-3d' }}>
              <div className="relative">
                {/* Creative Design Canvas */}
                <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black/50 backdrop-blur-md" style={{ transform: 'translateZ(20px)' }}>
                  {/* Canvas Header */}
                  <div className="p-4 border-b border-white/10 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                      <div className="text-white/70 text-xs font-medium">CREATIVE PROCESS</div>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white/70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white/70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15 15L21 21M10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 13.866 13.866 17 10 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Canvas Content */}
                  <div className="p-6 aspect-video relative">
                    {/* Background Grid */}
                    <div className="absolute inset-0 bg-grid-fine opacity-30"></div>
                    
                    {/* Design Elements */}
                    <div className="relative z-10 w-full h-full">
                      {/* Creative Elements */}
                      <motion.div 
                        className="absolute top-0 left-0 w-24 h-24 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg"
                        animate={{ 
                          rotate: [0, 5, 0],
                          y: [0, -5, 0],
                          scale: [1, 1.02, 1] 
                        }}
                        transition={{ 
                          duration: 5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        style={{ transform: 'translateZ(40px)' }}
                      />
                      
                      <motion.div 
                        className="absolute top-20 left-32 w-40 h-28 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg overflow-hidden"
                        animate={{ 
                          rotate: [-2, 0, -2],
                          y: [0, 5, 0]
                        }}
                        transition={{ 
                          duration: 6,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.5
                        }}
                        style={{ transform: 'translateZ(30px)' }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-pink-500/20"></div>
                        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-purple-500/30 to-transparent"></div>
                        <div className="p-3">
                          <div className="w-12 h-1 bg-white/50 rounded-full mb-2"></div>
                          <div className="flex flex-col gap-1.5">
                            <div className="w-20 h-1 bg-white/40 rounded-full"></div>
                            <div className="w-16 h-1 bg-white/40 rounded-full"></div>
                            <div className="w-24 h-1 bg-white/40 rounded-full"></div>
                          </div>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="absolute bottom-12 left-10 w-32 h-32 rounded-full border-8 border-pink-500/30 flex items-center justify-center"
                        animate={{ 
                          rotate: [0, 360],
                          scale: [1, 0.95, 1]
                        }}
                        transition={{ 
                          rotate: {
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                          },
                          scale: {
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }
                        }}
                        style={{ transform: 'translateZ(20px)' }}
                      >
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500/80 to-purple-500/80 blur-sm"></div>
                      </motion.div>
                      
                      <motion.div 
                        className="absolute bottom-6 right-10 w-48 h-36 rounded-lg overflow-hidden"
                        animate={{ 
                          rotate: [2, 0, 2],
                          y: [0, -3, 0],
                          x: [0, 3, 0]
                        }}
                        transition={{ 
                          duration: 7,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1
                        }}
                        style={{ transform: 'translateZ(50px)' }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-sm border border-white/10"></div>
                        <div className="absolute top-0 right-0 bottom-0 w-1/3 bg-gradient-to-l from-white/10 to-transparent"></div>
                        <div className="p-4 relative z-10">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"></div>
                            <div className="flex flex-col gap-1">
                              <div className="w-16 h-1.5 bg-white/70 rounded-full"></div>
                              <div className="w-12 h-1.5 bg-white/40 rounded-full"></div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-1.5 mb-3">
                            <div className="w-full h-1 bg-white/30 rounded-full"></div>
                            <div className="w-full h-1 bg-white/30 rounded-full"></div>
                            <div className="w-3/4 h-1 bg-white/30 rounded-full"></div>
                          </div>
                          
                          <div className="flex gap-2">
                            <div className="w-6 h-6 rounded-full bg-purple-500/70"></div>
                            <div className="w-6 h-6 rounded-full bg-pink-500/70"></div>
                          </div>
                        </div>
                      </motion.div>
                      
                      <motion.svg 
                        className="absolute top-1/2 right-1/3 w-16 h-16 text-white/70"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        animate={{
                          rotate: [0, 10, 0, -10, 0],
                          scale: [1, 1.1, 1, 1.1, 1]
                        }}
                        transition={{
                          duration: 10,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        style={{ transform: 'translateZ(35px)' }}
                      >
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M8 13.5L10.5 16L16 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </motion.svg>
                    </div>
                    
                    {/* Interactive Cursor */}
                    <motion.div
                      className="absolute w-12 h-12 pointer-events-none"
                      animate={{
                        x: [null, 50, 200, 300, 180, 100],
                        y: [null, 20, 150, 80, 30, 120]
                      }}
                      transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <div className="relative">
                        <div className="absolute -inset-1 rounded-full border border-white/30 animate-ping"></div>
                        <div className="w-3 h-3 rounded-full bg-white"></div>
                        <div className="absolute top-4 left-4 text-xs text-white/70 whitespace-nowrap">Select element</div>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Canvas Footer */}
                  <div className="border-t border-white/10 p-3 flex justify-between">
                    <div className="flex gap-3">
                      <div className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-white/70 text-xs">Layers</div>
                      <div className="px-3 py-1 rounded-md bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs">Design</div>
                      <div className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-white/70 text-xs">Effects</div>
                    </div>
                    <div className="flex items-center gap-2 text-white/50 text-xs">
                      <span>100%</span>
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 3H21V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 21H3V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M21 3L14 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3 21L10 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <motion.div 
                  className="absolute -top-5 -right-5 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg blur-xl opacity-50"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                    opacity: [0.5, 0.8, 0.5] 
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                  style={{ transform: 'translateZ(40px)' }}
                />
                
                <motion.div 
                  className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-pink-500 to-purple-500 rounded-full blur-xl opacity-30"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.6, 0.3] 
                  }}
                  transition={{ duration: 10, repeat: Infinity }}
                  style={{ transform: 'translateZ(30px)' }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <style jsx>{`
        .bg-grid-pattern {
          background-image: radial-gradient(rgb(255 255 255 / 0.1) 1px, transparent 1px);
          background-size: 30px 30px;
        }
        
        .bg-grid-fine {
          background-image: linear-gradient(to right, rgb(255 255 255 / 0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgb(255 255 255 / 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle at center, var(--tw-gradient-from), var(--tw-gradient-to));
        }
      `}</style>
    </section>
  );
} 