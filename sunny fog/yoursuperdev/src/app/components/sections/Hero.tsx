"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import { ParticleCanvas } from "../animations/ParticleCanvas";
import { MagneticButton } from "../ui/MagneticButton";
import { Button } from "../ui/Button";
import Link from "next/link";
import CodeEditor from "../illustrations/CodeEditor";

export function Hero() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-black via-zinc-950 to-zinc-900">
      {/* Fond avec particules et effet de lumière */}
      <div className="absolute inset-0 z-0">
        <ParticleCanvas 
          particleCount={100} 
          particleColor="rgba(124, 58, 237, 0.8)" 
        />
        <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 via-transparent to-transparent opacity-80" />
      </div>
      
      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Texte et appel à l'action */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              <motion.span 
                className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-gradient-to-r from-purple-600/20 to-pink-500/20 text-purple-300 border border-purple-500/20"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Web Development Experts
              </motion.span>
              
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
                  Innovative Solutions for Your Digital Success
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-zinc-400 text-lg md:text-xl lg:text-2xl max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Turn your ideas into exceptional digital solutions with our team of passionate experts.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <MagneticButton strength={30} size="lg">
                  Discover our services
                </MagneticButton>
                
                <Link href="/services">
                  <Button variant="outline" size="lg">
                    <span className="mr-2">View our packages</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </Button>
                </Link>
              </motion.div>
              
              {/* Badges de technologies */}
              <motion.div 
                className="flex flex-wrap gap-4 pt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div className="px-3 py-1 bg-zinc-800/50 rounded-full text-xs text-zinc-400 border border-zinc-700/50">React</div>
                <div className="px-3 py-1 bg-zinc-800/50 rounded-full text-xs text-zinc-400 border border-zinc-700/50">Next.js</div>
                <div className="px-3 py-1 bg-zinc-800/50 rounded-full text-xs text-zinc-400 border border-zinc-700/50">Node.js</div>
                <div className="px-3 py-1 bg-zinc-800/50 rounded-full text-xs text-zinc-400 border border-zinc-700/50">TypeScript</div>
                <div className="px-3 py-1 bg-zinc-800/50 rounded-full text-xs text-zinc-400 border border-zinc-700/50">Tailwind CSS</div>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Éditeur de code animé */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex-1"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/30 to-pink-600/30 rounded-full blur-3xl opacity-30" />
              <div className="relative bg-gradient-to-tr from-zinc-800 to-zinc-900 rounded-3xl border border-zinc-700/50 p-4 shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                <div className="flex items-center gap-1 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <CodeEditor width={500} height={500} className="rounded-lg" />
              </div>
              
              {/* Éléments flottants */}
              <motion.div 
                className="absolute -right-8 top-1/4 bg-zinc-800/80 backdrop-blur-md border border-zinc-700/50 px-4 py-2 rounded-lg shadow-xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-400">Deployed</div>
                    <div className="text-sm font-medium text-white">In 24 hours</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -left-8 bottom-1/4 bg-zinc-800/80 backdrop-blur-md border border-zinc-700/50 px-4 py-2 rounded-lg shadow-xl"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-400">Satisfaction</div>
                    <div className="text-sm font-medium text-white">100% guaranteed</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
} 