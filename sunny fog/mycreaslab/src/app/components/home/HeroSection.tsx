"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    // Set initial sizes
    handleResize();
    
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  
  const calculateTransform = (factor: number) => {
    if (!isMounted) return 'translate(0px, 0px)';
    
    const x = (mousePosition.x / windowSize.width - 0.5) * factor;
    const y = (mousePosition.y / windowSize.height - 0.5) * factor;
    return `translate(${x}px, ${y}px)`;
  };
  
  // Variants for framer-motion animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };
  
  const circleVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring", stiffness: 200, damping: 10 }
    }
  };
  
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Decorative shapes with subtle parallax */}
      <div 
        className="absolute -left-20 top-20 w-80 h-80 rounded-full bg-teal-400/10 dark:bg-teal-600/10 blur-3xl" 
        style={{ transform: calculateTransform(-15) }}
      />
      <div 
        className="absolute right-0 bottom-0 w-96 h-96 rounded-full bg-yellow-400/10 dark:bg-yellow-600/10 blur-3xl" 
        style={{ transform: calculateTransform(-10) }}
      />
      <div 
        className="absolute left-1/2 top-1/3 w-64 h-64 rounded-full bg-teal-400/5 dark:bg-teal-600/5 blur-3xl" 
        style={{ transform: calculateTransform(-5) }}
      />
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(14,165,233,0.05),transparent_60%)]"></div>
      
      {/* Decorative grid */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <div className="h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2U9IiM5OTkiIHN0cm9rZS13aWR0aD0iMS41IiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZS1vcGFjaXR5PSIwLjMiPjxwYXRoIGQ9Ik0wIDYwTDYwIDAiLz48L2c+PC9zdmc+')]"></div>
      </div>
      
      <motion.div 
        className="container mx-auto px-4 relative z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="w-full md:w-1/2 order-2 md:order-1 mt-16 md:mt-0">
            <motion.div className="max-w-xl" variants={containerVariants}>
              <motion.span 
                className="inline-block px-4 py-1.5 mb-6 rounded-full border border-teal-600 dark:border-teal-400 text-teal-600 dark:text-teal-400 text-sm font-medium"
                variants={itemVariants}
              >
                #CreativityWithoutBorders
              </motion.span>
              
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
                variants={itemVariants}
              >
                Bringing your <span className="relative">
                  <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-yellow-500">creative ideas</span>
                  <span className="absolute bottom-2 left-0 right-0 h-3 bg-yellow-300/20 dark:bg-yellow-300/30 -z-10 transform skew-x-12"></span>
                </span> to life
              </motion.h1>
              
              <motion.p 
                className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-lg"
                variants={itemVariants}
              >
                We design tailor-made digital experiences and visual identities to help your brand stand out with style and innovation.
              </motion.p>
              
              <motion.div className="flex flex-col sm:flex-row gap-4" variants={itemVariants}>
                <Link 
                  href="/packages" 
                  className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 text-white font-medium shadow-lg shadow-teal-600/20 hover:shadow-xl hover:shadow-teal-600/30 transform hover:-translate-y-1 transition-all duration-300"
                >
                  <span>Discover our packages</span>
                  <svg className="w-5 h-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
                
                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-white dark:bg-gray-800 border border-teal-600 dark:border-teal-500 text-teal-600 dark:text-teal-400 font-medium shadow-lg shadow-teal-600/10 hover:shadow-xl hover:shadow-teal-600/20 transform hover:-translate-y-1 transition-all duration-300"
                >
                  <span>Contact us</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
          
          <div className="w-full md:w-1/2 order-1 md:order-2 relative">
            <motion.div 
              className="relative z-10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.5 }}
            >
              <div className="relative h-[500px] w-full overflow-hidden">
                {/* Main block with shadow and border */}
                <div className="absolute inset-0 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-2xl overflow-hidden z-20">
                  <motion.div 
                    className="absolute -top-10 -left-10 w-60 h-60 rounded-full bg-teal-500/20 blur-3xl" 
                    animate={{ 
                      x: [0, 10, 0], 
                      y: [0, 15, 0] 
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 10,
                      ease: "easeInOut" 
                    }}
                  />
                  <motion.div 
                    className="absolute -bottom-20 -right-10 w-80 h-80 rounded-full bg-yellow-500/20 blur-3xl" 
                    animate={{ 
                      x: [0, -15, 0], 
                      y: [0, -10, 0] 
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 12,
                      ease: "easeInOut" 
                    }}
                  />
                  
                  {/* Grid */}
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2U9IiNlNWU3ZWIiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cmVjdCB4PSIwLjUiIHk9IjAuNSIgd2lkdGg9IjM5IiBoZWlnaHQ9IjM5Ii8+PC9nPjwvc3ZnPg==')]"></div>
                  
                  {/* Contenu créatif */}
                  <div className="absolute inset-0 p-6 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex space-x-1.5">
                        <div className="h-3 w-3 rounded-full bg-red-400"></div>
                        <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                        <div className="h-3 w-3 rounded-full bg-green-400"></div>
                      </div>
                      <div className="h-5 w-32 rounded-md bg-gray-100 dark:bg-gray-700"></div>
                    </div>
                    
                    <div className="flex-1 grid grid-cols-12 gap-4">
                      {/* Barre latérale outils */}
                      <div className="col-span-2 bg-gray-100 dark:bg-gray-700/50 rounded-lg p-2">
                        <div className="space-y-3">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <motion.div 
                              key={i} 
                              className="h-8 w-8 rounded-md bg-white dark:bg-gray-600 shadow-sm flex items-center justify-center"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <div className={`h-4 w-4 rounded-sm ${
                                i % 3 === 0 ? 'bg-teal-500' : 
                                i % 3 === 1 ? 'bg-yellow-500' : 'bg-gray-400'
                              }`}></div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Canvas principal */}
                      <div className="col-span-10 flex flex-col space-y-4">
                        {/* Barre de titre */}
                        <div className="h-10 flex justify-between items-center">
                          <div className="h-6 w-40 rounded-md bg-teal-500/20 flex items-center justify-center">
                            <div className="h-2 w-32 rounded-full bg-teal-500"></div>
                          </div>
                          <div className="flex space-x-2">
                            <div className="h-7 w-7 rounded-md bg-gray-200 dark:bg-gray-700"></div>
                            <div className="h-7 w-7 rounded-md bg-gray-200 dark:bg-gray-700"></div>
                            <div className="h-7 w-7 rounded-md bg-teal-500"></div>
                          </div>
                        </div>
                        
                        {/* Artboard de design */}
                        <div className="flex-1 bg-white dark:bg-gray-700 rounded-lg shadow-inner p-4 relative overflow-hidden">
                          {/* Éléments de design */}
                          <div className="absolute top-6 left-6 right-6 h-40 rounded-lg bg-gradient-to-r from-teal-600 to-yellow-500 shadow-lg">
                            <div className="absolute top-4 left-4">
                              <div className="h-4 w-20 rounded-full bg-white/80"></div>
                              <div className="mt-3 h-6 w-48 rounded-full bg-white/40"></div>
                              <div className="mt-3 h-3 w-32 rounded-full bg-white/30"></div>
                            </div>
                            <div className="absolute bottom-4 right-4">
                              <div className="h-8 w-20 rounded-full bg-white flex items-center justify-center">
                                <div className="h-2 w-12 rounded-full bg-teal-600"></div>
                              </div>
                            </div>
                            <motion.div 
                              className="absolute right-20 top-4 h-12 w-12 rounded-full bg-yellow-300/50"
                              animate={{ 
                                scale: [1, 1.2, 1],
                                rotate: [0, 180, 360],
                                opacity: [0.5, 0.8, 0.5]
                              }}
                              transition={{ 
                                repeat: Infinity, 
                                duration: 15 
                              }}
                            ></motion.div>
                          </div>
                          
                          <div className="absolute top-[180px] left-6 right-6 flex gap-4">
                            {[1, 2, 3].map((i) => (
                              <motion.div 
                                key={i} 
                                className="flex-1 h-24 rounded-lg bg-gray-100 dark:bg-gray-600 p-3 overflow-hidden"
                                whileHover={{ y: -5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                              >
                                <div className="h-2 w-12 rounded-full bg-teal-500"></div>
                                <div className="mt-2 h-2 w-20 rounded-full bg-gray-300 dark:bg-gray-500"></div>
                                <div className="mt-2 h-2 w-16 rounded-full bg-gray-300 dark:bg-gray-500"></div>
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-yellow-500"></div>
                              </motion.div>
                            ))}
                          </div>
                          
                          <motion.div 
                            className="absolute bottom-4 left-6 right-6 h-24 flex gap-4"
                            variants={containerVariants}
                          >
                            <motion.div 
                              className="w-1/3 h-full rounded-lg bg-yellow-100 dark:bg-yellow-900/20 p-3"
                              variants={itemVariants}
                            >
                              <div className="flex justify-between">
                                <div className="h-6 w-6 rounded-full bg-yellow-500"></div>
                                <div className="h-3 w-10 rounded-full bg-yellow-300/50"></div>
                              </div>
                              <div className="mt-3 h-2 w-28 rounded-full bg-yellow-300/70"></div>
                              <div className="mt-2 h-2 w-20 rounded-full bg-yellow-300/50"></div>
                            </motion.div>
                            <motion.div 
                              className="w-2/3 h-full rounded-lg bg-teal-100 dark:bg-teal-900/20 p-3"
                              variants={itemVariants}
                            >
                              <div className="flex items-center gap-2">
                                <div className="h-6 w-6 rounded-md bg-teal-500"></div>
                                <div className="h-3 w-20 rounded-full bg-teal-300/50"></div>
                              </div>
                              <div className="mt-3 flex gap-2">
                                <div className="h-8 w-2/3 rounded-md bg-teal-300/30"></div>
                                <div className="h-8 w-1/3 rounded-md bg-teal-500 flex items-center justify-center">
                                  <div className="h-1 w-12 rounded-full bg-white"></div>
                                </div>
                              </div>
                            </motion.div>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Formes décoratives */}
                <motion.div 
                  className="absolute -bottom-10 -left-10 h-40 w-40"
                  variants={circleVariants}
                >
                  <div className="relative h-full w-full">
                    <div className="absolute h-full w-full rounded-full bg-yellow-400/20 animate-ping" style={{ animationDuration: '4s' }}></div>
                    <div className="absolute h-full w-full rounded-full border-2 border-dashed border-yellow-400/60 animate-spin" style={{ animationDuration: '20s' }}></div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="absolute -top-10 -right-10 h-32 w-32"
                  variants={circleVariants}
                >
                  <div className="relative h-full w-full">
                    <div className="absolute h-full w-full rounded-full bg-teal-400/20 animate-ping" style={{ animationDuration: '5s' }}></div>
                    <div className="absolute h-full w-full rounded-full border-2 border-dashed border-teal-400/60 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
} 