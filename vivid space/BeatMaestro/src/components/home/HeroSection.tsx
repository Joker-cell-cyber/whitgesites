"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#111121] py-20" id="home">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 h-[80vh] w-[80vh] opacity-20">
          <svg viewBox="0 0 100 100" className="h-full w-full">
            <defs>
              <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e87f0" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#ff9d00" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="40" strokeWidth="0.5" stroke="url(#circleGradient)" fill="none" className="animate-spin-slow" style={{ animationDuration: '30s' }} />
            <circle cx="50" cy="50" r="30" strokeWidth="0.5" stroke="url(#circleGradient)" fill="none" className="animate-spin-slow" style={{ animationDuration: '20s', animationDirection: 'reverse' }} />
            <circle cx="50" cy="50" r="20" strokeWidth="0.5" stroke="url(#circleGradient)" fill="none" className="animate-spin-slow" style={{ animationDuration: '15s' }} />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-beat-purple-600/10 transform -translate-x-1/2 translate-y-1/3 rounded-full filter blur-3xl"></div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-beat-purple-500/10 border border-beat-purple-500/20 text-beat-purple-400 text-sm font-medium mb-6">
            Professional Music Production Coaching
          </span>
          
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            Transform Your <span className="text-beat-gold-500">Music</span> With <br />
            <span className="text-beat-purple-400">Expert</span> Coaching
          </h1>
          
          <p className="text-xl text-gray-300 leading-relaxed">
            From beat composition to professional mixing techniques - elevate your production skills with personalized one-on-one coaching.
          </p>
        </motion.div>
        
        <div className="flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative w-full max-w-4xl"
          >
            <div className="aspect-[16/9] overflow-hidden rounded-xl border border-gray-800/50 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-beat-purple-500/20 to-beat-gold-500/20 z-10 mix-blend-overlay"></div>
              <Image
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                alt="Music production studio"
                width={1000}
                height={563}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            
            {/* Feature badges over the image */}
            <div className="absolute -top-5 -right-5 bg-[#111121] p-4 rounded-lg shadow-xl border border-beat-gold-500/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-beat-gold-500/20 text-beat-gold-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-medium">Personalized</div>
                  <div className="text-gray-400 text-sm">1:1 Coaching</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-5 -left-5 bg-[#111121] p-4 rounded-lg shadow-xl border border-beat-purple-500/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-beat-purple-500/20 text-beat-purple-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 017.072 0m-9.9-2.828a9 9 0 0112.728 0" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-medium">Pro Quality</div>
                  <div className="text-gray-400 text-sm">Expert Producers</div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-12"
          >
            <Link 
              href="/#pricing" 
              className="px-8 py-4 bg-beat-purple-500 hover:bg-beat-purple-600 text-white font-medium rounded-full shadow-lg shadow-beat-purple-500/20 transition-all hover:translate-y-[-2px]"
            >
              View Pricing
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 