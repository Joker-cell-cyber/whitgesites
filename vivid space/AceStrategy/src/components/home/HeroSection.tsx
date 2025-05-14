"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import PokerChip from "../ui/PokerChip";
import PlayingCard from "../ui/PlayingCard";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden" id="home">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        {/* Dark gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0c1016] to-[#161a24] z-10"></div>
        
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay z-20">
          <Image 
            src="/images/noise-pattern.png" 
            alt="" 
            fill 
            className="object-cover"
            quality={100}
          />
        </div>
        
        {/* Accent lighting */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-poker-royal-600/10 blur-[120px] z-20"></div>
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-chip-gold-600/10 blur-[100px] z-20"></div>
      </div>

      {/* Card Suit Pattern */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        <div className="absolute top-1/4 right-[5%] text-[180px] text-white opacity-[0.03] font-serif">♠</div>
        <div className="absolute bottom-1/4 left-[5%] text-[180px] text-poker-red-600 opacity-[0.03] font-serif">♥</div>
      </div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 z-10 opacity-[0.05]">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]" 
          style={{backgroundSize: '40px 40px'}}></div>
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto relative z-30 h-screen px-6">
        <div className="h-full grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content - Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-start space-y-6 pt-16 md:pt-0"
          >
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-chip-gold-500/10 border border-chip-gold-500/20 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-chip-gold-500 mr-2"></span>
              <span className="text-chip-gold-400 text-sm font-medium">Expert Poker Training</span>
            </div>
            
            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Master The Tables<br />
              <span className="relative inline-block mt-2">
                <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-chip-gold-400 to-chip-gold-500">Elevate Your Game</span>
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-chip-gold-500/40 rounded-full"></span>
              </span>
            </h1>
            
            {/* Description */}
            <p className="text-gray-300 text-lg max-w-lg">
              Professional poker coaching to transform your strategy, 
              mindset, and results. From cash games to tournaments, 
              we'll help you achieve consistent profitability.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8 w-full sm:w-auto">
              <Link 
                href="/pricing" 
                className="group relative px-6 py-3 rounded-lg font-medium text-center overflow-hidden"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-chip-gold-500 to-chip-gold-600 group-hover:scale-105 transition-transform duration-300"></span>
                <span className="relative z-10 flex items-center justify-center text-black text-lg font-medium">
                  View Pricing
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </Link>
              
              <Link 
                href="/contact" 
                className="px-6 py-3 rounded-lg font-medium border border-gray-700 hover:border-gray-500 text-white text-center transition-colors duration-300"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
          
          {/* Right Content - Visual */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative h-[500px] hidden md:block"
          >
            {/* 3D Cards Scene */}
            <div className="absolute inset-0 perspective-[1200px]">
              {/* Centered Poker Table */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.6 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full"
              >
                <div className="relative w-full h-full">
                  {/* Simulated poker table felt */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#0f2c4a] to-[#0a1c30] border-8 border-[#2a2622] shadow-2xl"></div>
                  
                  {/* Table rim highlight */}
                  <div className="absolute inset-2 rounded-full border border-blue-400/10"></div>
                </div>
              </motion.div>
              
              {/* Cards & Chips Arrangement */}
              {/* Premium Ace */}
              <motion.div
                initial={{ y: 80, opacity: 0, rotateY: 25 }}
                animate={{ y: 0, opacity: 1, rotateY: 0 }}
                transition={{ duration: 1.2, delay: 0.8 }}
                className="absolute top-1/2 left-1/2 transform -translate-y-[30%] -translate-x-[10%] z-30 origin-bottom"
              >
                <div className="relative transform rotate-12 scale-[1.5]">
                  <div className="absolute -inset-4 bg-chip-gold-500/30 rounded-xl blur-xl"></div>
                  <PlayingCard suit="spades" rank="A" size="lg" />
                </div>
              </motion.div>
              
              {/* Secondary Cards */}
              <motion.div
                initial={{ opacity: 0, x: -40, rotateZ: -10 }}
                animate={{ opacity: 1, x: 0, rotateZ: -5 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="absolute top-[30%] left-[20%] transform z-20"
              >
                <PlayingCard suit="hearts" rank="K" size="lg" />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 40, rotateZ: 10 }}
                animate={{ opacity: 1, x: 0, rotateZ: 5 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="absolute top-[35%] right-[20%] transform z-20"
              >
                <PlayingCard suit="diamonds" rank="Q" size="lg" />
              </motion.div>
              
              {/* Poker Chips */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="absolute bottom-[30%] left-[30%] transform"
              >
                <PokerChip color="gold" size="lg" stacked={true} />
              </motion.div>
              
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.6 }}
                className="absolute bottom-[25%] right-[30%] transform"
              >
                <PokerChip color="blue" size="lg" stacked={true} />
              </motion.div>
              
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.8 }}
                className="absolute bottom-[35%] left-[45%] transform"
              >
                <PokerChip color="red" size="lg" stacked={true} />
              </motion.div>

              {/* Feature Cards */}
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 2.0 }}
                className="absolute top-[15%] right-[5%] bg-black/60 backdrop-blur-xl rounded-xl border border-gray-800 p-4 shadow-xl max-w-[200px]"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-poker-royal-600 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Proven Results</h3>
                    <p className="text-gray-400 text-xs">Documented success</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 2.2 }}
                className="absolute bottom-[15%] left-[5%] bg-black/60 backdrop-blur-xl rounded-xl border border-gray-800 p-4 shadow-xl max-w-[200px]"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-chip-gold-500 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-medium">GTO Training</h3>
                    <p className="text-gray-400 text-xs">Optimize decisions</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
      >
        <div className="flex flex-col items-center">
          <span className="text-gray-400 text-sm mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-gray-500 rounded-full relative flex justify-center">
            <span className="absolute top-2 w-1.5 h-1.5 bg-chip-gold-500 rounded-full animate-scroll-down"></span>
          </div>
        </div>
      </motion.div>
      
      {/* Decorative Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-chip-gold-500 to-transparent z-30"></div>
    </section>
  );
} 