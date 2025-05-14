"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import { MagneticButton } from "../ui/MagneticButton";
import Link from "next/link";
import TeamWorking from "../illustrations/TeamWorking";

export function AboutSection() {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-2/3 h-px bg-gradient-to-l from-amber-500/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-2/3 h-px bg-gradient-to-r from-amber-500/40 to-transparent" />
        <div className="absolute -left-[200px] top-1/3 w-[400px] h-[400px] rounded-full bg-amber-900/10 blur-3xl opacity-40" />
      </div>
      
      <Container className="relative z-10">
        <div className="flex flex-col items-center">
          {/* Section header with decorative lines */}
          <div className="relative mb-16 text-center">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="h-px bg-amber-600/30 absolute top-0 left-0"
            />
            
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block mt-6 text-sm tracking-wider uppercase font-bold text-amber-500 border-b border-amber-500/20 pb-1"
            >
              About Us
            </motion.span>
            
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white mt-4 mb-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              CodeCanvas Solutions
            </motion.h2>
            
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-px bg-amber-600/30 absolute bottom-0 right-0"
            />
          </div>
          
          {/* Content in a different layout */}
          <div className="grid grid-cols-1 gap-16">
            {/* Main content area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Company description */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-2 bg-zinc-900/50 border-l-4 border-amber-500 p-8 rounded-r-lg"
              >
                <p className="text-lg text-zinc-300 italic border-b border-zinc-800 pb-6 mb-6">
                  At CodeCanvas, we specialize in creating dynamic and responsive web solutions tailored to each client&apos;s unique needs. With years of experience and a passion for innovation, our team is dedicated to transforming your ideas into reality.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-white flex items-center">
                      <div className="w-3 h-3 bg-amber-500 mr-3"></div>
                      Our Mission
                    </h3>
                    <p className="text-zinc-400 pl-6">
                      Give businesses the means to succeed through innovative digital solutions that foster growth and success.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-white flex items-center">
                      <div className="w-3 h-3 bg-amber-500 mr-3"></div>
                      Our Vision
                    </h3>
                    <p className="text-zinc-400 pl-6">
                      Become a leading provider of exceptional web development services, recognized for our creativity, technical expertise, and client-centered approach.
                    </p>
                  </div>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="mt-8"
                >
                  <Link href="/about">
                    <MagneticButton 
                      className="bg-amber-500 hover:bg-amber-600 text-black font-bold tracking-wider text-sm uppercase py-3"
                      strength={20}
                    >
                      Learn more about us
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </MagneticButton>
                  </Link>
                </motion.div>
              </motion.div>
              
              {/* Stats and illustration */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative"
              >
                <div className="relative h-full">
                  <div className="absolute inset-0 overflow-hidden rounded-lg border-2 border-amber-500/30 p-1">
                    <TeamWorking className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
                  </div>
                  
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/80 backdrop-blur-sm p-4 rounded-lg border border-amber-500/30">
                      <h4 className="text-amber-500 font-bold text-sm uppercase tracking-wider mb-3">Technological Expertise</h4>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-center border-r border-zinc-800 pr-2">
                          <div className="text-2xl font-bold text-white">20+</div>
                          <div className="text-xs text-zinc-500 mt-1">Technologies</div>
                        </div>
                        <div className="text-center border-r border-zinc-800 pr-2">
                          <div className="text-2xl font-bold text-white">7+</div>
                          <div className="text-xs text-zinc-500 mt-1">Dev Frameworks</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white">10+</div>
                          <div className="text-xs text-zinc-500 mt-1">Years of Exp.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* CTA button */}
          <div className="mt-16 text-center">
            <Link href="/services#pricing">
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View our pricing options
              </motion.button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
} 