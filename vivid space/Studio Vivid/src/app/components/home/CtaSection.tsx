"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CtaSection() {
  return (
    <section className="relative py-28 overflow-hidden">
      {/* Background with multiple layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-950/50 to-black z-0">
        {/* Animated stars */}
        <div className="absolute inset-0">
          {[...Array(80)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
              }}
              animate={{
                opacity: [0.1, 0.8, 0.1],
                scale: [1, Math.random() * 1.5 + 1, 1],
              }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>
        
        {/* Glowing orbs */}
        <motion.div
          className="absolute -top-60 -left-60 w-[500px] h-[500px] rounded-full bg-purple-600/20 blur-[100px]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        
        <motion.div
          className="absolute -bottom-60 -right-60 w-[500px] h-[500px] rounded-full bg-pink-600/20 blur-[100px]"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 10,
            delay: 1,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>
      
      {/* Content with glassmorphism card */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-5xl mx-auto backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative">
            {/* Animated gradient borders */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent" />
            <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-purple-500 to-transparent" />
            <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-pink-500 to-transparent" />
            
            <div className="p-12 md:p-16">
              <div className="flex flex-col md:flex-row items-center">
                <div className="w-full md:w-2/3 mb-10 md:mb-0 md:pr-12">
                  <motion.h2
                    className="text-4xl md:text-5xl font-bold mb-8 text-white"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    Ready to <span className="relative inline-block">
                      <span className="absolute -inset-1 -skew-y-3 bg-gradient-to-r from-purple-600 to-pink-500 opacity-30 rounded-lg"></span>
                      <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">elevate</span>
                    </span> your creative projects?
                  </motion.h2>

                  <motion.p
                    className="text-xl text-gray-300 mb-6"
                    initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    Let's collaborate to bring your vision to life with design that captivates and connects with your audience.
                  </motion.p>
          
          <motion.div
                    className="flex flex-col sm:flex-row gap-4"
                    initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <Link href="/contact" className="group">
                      <div className="relative inline-flex">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full blur-lg group-hover:blur-xl opacity-70 transition-all duration-300 group-hover:opacity-100"></div>
                        <button className="relative bg-black hover:bg-black/80 py-4 px-8 rounded-full text-white font-bold z-10 transition-all duration-300 border border-white/10 flex items-center">
                          Get started now
                          <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 5L21 12M21 12L15 19M21 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
                        </button>
                      </div>
                    </Link>
                    
                    <Link href="/packages" className="group">
                      <div className="relative inline-flex">
                        <div className="absolute inset-0 bg-white/5 rounded-full blur-sm group-hover:blur opacity-70 transition-all duration-300"></div>
                        <button className="relative bg-transparent py-4 px-8 rounded-full text-white font-bold z-10 transition-all duration-300 border border-white/20 group-hover:border-white/40 flex items-center">
                          View packages
                        </button>
            </div>
                    </Link>
          </motion.div>
                </div>
          
                <div className="w-full md:w-1/3">
          <motion.div
                    className="relative"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5 }}
                  >
                    {/* 3D Rotating Element */}
                    <div className="aspect-square w-full max-w-[280px] mx-auto perspective-1000">
                      <motion.div
                        className="relative w-full h-full"
                        animate={{ 
                          rotateY: [0, 360],
                        }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        {/* Cube Faces */}
                        {[...Array(6)].map((_, index) => (
                          <div 
                            key={index}
                            className="absolute inset-0 flex items-center justify-center rounded-2xl border border-white/10 backdrop-blur-md bg-white/5"
                            style={{
                              transform: 
                                index === 0 ? 'translateZ(140px)' : 
                                index === 1 ? 'rotateY(180deg) translateZ(140px)' : 
                                index === 2 ? 'rotateY(90deg) translateZ(140px)' : 
                                index === 3 ? 'rotateY(-90deg) translateZ(140px)' : 
                                index === 4 ? 'rotateX(90deg) translateZ(140px)' : 
                                'rotateX(-90deg) translateZ(140px)',
                            }}
                          >
                            <div className="text-center p-6">
                              {index === 0 && (
                                <div className="flex flex-col items-center">
                                  <svg className="w-16 h-16 text-purple-500 mb-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 11.5L11 13.5L15 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                  <p className="text-white font-medium">Quality Guaranteed</p>
                                </div>
                              )}
                              
                              {index === 1 && (
                                <div className="flex flex-col items-center">
                                  <svg className="w-16 h-16 text-pink-500 mb-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 15C15.866 15 19 12.3137 19 9C19 5.68629 15.866 3 12 3C8.13401 3 5 5.68629 5 9C5 12.3137 8.13401 15 12 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M12 15V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M9 18H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                  <p className="text-white font-medium">Unlimited Revisions</p>
                                </div>
                              )}
                              
                              {index === 2 && (
                                <div className="flex flex-col items-center">
                                  <svg className="w-16 h-16 text-purple-500 mb-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M15 9L9 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M9 9L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                  <p className="text-white font-medium">24/7 Support</p>
                                </div>
                              )}
                              
                              {index === 3 && (
                                <div className="flex flex-col items-center">
                                  <svg className="w-16 h-16 text-pink-500 mb-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 12V22H4V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M22 7H2V12H22V7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M12 22V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M12 7H16.5C17.3284 7 18 6.32843 18 5.5C18 4.67157 17.3284 4 16.5 4C15.6716 4 15 4.67157 15 5.5V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M12 7H7.5C6.67157 7 6 6.32843 6 5.5C6 4.67157 6.67157 4 7.5 4C8.32843 4 9 4.67157 9 5.5V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                  <p className="text-white font-medium">Fast Delivery</p>
                                </div>
                              )}
                              
                              {index === 4 && (
                                <div className="flex flex-col items-center">
                                  <svg className="w-16 h-16 text-purple-500 mb-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 22H19C20.1046 22 21 21.1046 21 20V4C21 2.89543 20.1046 2 19 2H5C3.89543 2 3 2.89543 3 4V20C3 21.1046 3.89543 22 5 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M7 7H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M7 12H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M7 17H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                  <p className="text-white font-medium">Custom Projects</p>
                                </div>
                              )}
                              
                              {index === 5 && (
                                <div className="flex flex-col items-center">
                                  <svg className="w-16 h-16 text-pink-500 mb-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M19 7L13 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M21 20L16 14V17H8C6.93913 17 5.92172 16.5786 5.17157 15.8284C4.42143 15.0783 4 14.0609 4 13C4 11.9391 4.42143 10.9217 5.17157 10.1716C5.92172 9.42143 6.93913 9 8 9H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
                                  <p className="text-white font-medium">Affordable Prices</p>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
          </motion.div>
      </div>
    </section>
  );
} 