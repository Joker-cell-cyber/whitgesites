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
    <section className="relative py-20 lg:py-24 bg-black min-h-screen flex items-center">
      {/* Background styling with vertical lines */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(252,211,77,0.1)_0%,transparent_70%)]"></div>
        
        {/* Vertical lines */}
        <div className="absolute inset-0 flex justify-between">
          {[...Array(10)].map((_, i) => (
            <div 
              key={i} 
              className="h-full w-px bg-gradient-to-b from-transparent via-yellow-500/10 to-transparent"
              style={{ left: `${i * 10}%` }}
            ></div>
          ))}
        </div>
      </div>
      
      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Text content in a distinctive layout */}
          <div className="md:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <span className="text-yellow-500 text-sm uppercase tracking-[0.3em] font-mono">
                Web Development Experts
              </span>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mt-6 mb-6 leading-tight">
                Innovative Solutions for Your Digital Success
              </h1>
              
              <div className="h-px w-36 bg-yellow-500/50"></div>
              
              <p className="mt-8 text-lg md:text-xl text-zinc-400 max-w-xl">
                Turn your ideas into exceptional digital solutions with our team of passionate experts.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 mt-10">
                <Link href="/services#pricing">
                  <MagneticButton 
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4" 
                    strength={30}
                  >
                    Discover our services
                  </MagneticButton>
                </Link>
                
                <Link href="/services#pricing">
                  <Button 
                    variant="outline"
                    className="border-yellow-500/30 hover:border-yellow-500 text-yellow-500 hover:text-yellow-400 px-8 py-4"
                  >
                    <span className="mr-2">View our packages</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            {/* Technology tags */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-2 pt-4"
            >
              {["React", "Next.js", "Node.js", "TypeScript", "Tailwind CSS"].map((tech, index) => (
                <div 
                  key={index} 
                  className="px-3 py-1 border border-yellow-500/20 text-yellow-500/80 text-xs font-mono"
                >
                  {tech}
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Visual content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="md:col-span-5 relative"
          >
            <div className="relative">
              {/* Code editor with highlighted frame */}
              <div className="absolute inset-0 border-2 border-yellow-500/20 translate-x-4 translate-y-4"></div>
              <div className="relative border border-zinc-800 bg-zinc-900/80 p-2">
                <div className="flex items-center gap-1 mb-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
                </div>
                <CodeEditor width={500} height={400} className="rounded-none" />
              </div>
              
              {/* Floating elements */}
              <motion.div
                className="absolute right-0 top-[30%] bg-yellow-500 text-black text-sm font-bold px-3 py-1"
                animate={{ x: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                In 24 hours
              </motion.div>
              
              <motion.div
                className="absolute -left-8 bottom-[20%] bg-black border border-yellow-500/50 px-4 py-2"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
              >
                <div className="text-yellow-500 text-sm font-mono">
                  100% satisfaction guaranteed
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
} 