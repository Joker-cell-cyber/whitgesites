"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="relative pt-20 pb-32 overflow-hidden bg-[#0a0a0a]">
      {/* Interactive background elements that follow mouse movement */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-0 left-1/3 w-96 h-96 bg-[rgba(37,99,235,0.03)] rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * 0.02,
            y: mousePosition.y * 0.02,
          }}
          transition={{ type: "spring", damping: 50, stiffness: 100 }}
        />
        <motion.div 
          className="absolute bottom-0 right-1/3 w-96 h-96 bg-[rgba(124,58,237,0.03)] rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * -0.02,
            y: mousePosition.y * -0.02,
          }}
          transition={{ type: "spring", damping: 50, stiffness: 100 }}
        />
        <motion.div 
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-[rgba(37,99,235,0.02)] rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * 0.01,
            y: mousePosition.y * -0.01,
          }}
          transition={{ type: "spring", damping: 50, stiffness: 100 }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-[rgba(124,58,237,0.02)] rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * -0.01,
            y: mousePosition.y * 0.01,
          }}
          transition={{ type: "spring", damping: 50, stiffness: 100 }}
        />
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[rgba(124,58,237,0.1)] to-transparent"></div>
      </div>

      {/* Interactive grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <motion.div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
          }}
          animate={{
            x: mousePosition.x * 0.005,
            y: mousePosition.y * 0.005,
          }}
          transition={{ type: "spring", damping: 100, stiffness: 200 }}
        />
      </div>

      {/* Interactive light particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div 
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: Math.random() > 0.5 ? 'rgba(37,99,235,0.3)' : 'rgba(124,58,237,0.3)',
              filter: 'blur(1px)',
            }}
            animate={{
              x: mousePosition.x * (Math.random() * 0.02 - 0.01),
              y: mousePosition.y * (Math.random() * 0.02 - 0.01),
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center mb-6 px-3 py-1 rounded-full text-sm bg-[rgba(124,58,237,0.1)] text-[rgb(124,58,237)]"
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 16L4 8L6 6L12 12L18 6L20 8L12 16Z" fill="currentColor"/>
                </svg>
            Professional Landing Page Design Service
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight max-w-5xl"
          >
            Custom 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[rgb(37,99,235)] to-[rgb(124,58,237)]"> Landing Pages </span>
            That Convert
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-400 mb-10 max-w-2xl"
          >
            We design high-converting landing pages tailored to your business needs.
            Expert design, quick turnaround, no monthly subscriptions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <Link 
              href="/pricing" 
              className="px-8 py-4 rounded-lg bg-gradient-to-r from-[rgb(37,99,235)] to-[rgb(124,58,237)] text-white font-medium hover:shadow-lg hover:shadow-[rgba(124,58,237,0.3)] transition-all duration-300"
            >
              View Our Packages
            </Link>
          </motion.div>

          {/* Service highlights */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[rgb(37,99,235)] to-[rgb(124,58,237)]">100%</h3>
              <p className="text-gray-400 mt-2">Custom Design</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[rgb(37,99,235)] to-[rgb(124,58,237)]">1-15</h3>
              <p className="text-gray-400 mt-2">Day Delivery</p>
                </div>
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[rgb(37,99,235)] to-[rgb(124,58,237)]">3</h3>
              <p className="text-gray-400 mt-2">Revision Rounds</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[rgb(37,99,235)] to-[rgb(124,58,237)]">1</h3>
              <p className="text-gray-400 mt-2">Flat-Rate Fee</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 