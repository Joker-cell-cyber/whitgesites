"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import FloatingAce from "../ui/FloatingAce";
import PokerChip from "../ui/PokerChip";
import PlayingCard from "../ui/PlayingCard";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16" id="home">
      {/* Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <video 
          className="absolute w-full h-full object-cover"
          autoPlay 
          muted 
          loop 
          playsInline
          poster="/images/cards-bg-poster.jpg"
        >
          <source src="/videos/cards-shuffling.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/80 z-20"></div>
      </div>
      
      {/* Felt texture overlay */}
      <div className="absolute inset-0 z-10 felt-texture opacity-40"></div>
      
      {/* Ambiance elements */}
      <div className="absolute inset-0 z-20">
        <div className="absolute top-20 right-[10%] w-72 h-72 bg-felt-800/20 rounded-full filter blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 left-[5%] w-80 h-80 bg-chip-gold-500/15 rounded-full filter blur-3xl"></div>
        <div className="absolute top-40 left-[30%] w-64 h-64 bg-gradient-to-r from-felt-800/10 to-poker-red-700/10 rounded-full filter blur-2xl animate-float"></div>
        <div className="absolute bottom-40 right-[30%] w-48 h-48 bg-neon-blue-500/10 rounded-full filter blur-2xl animate-pulse-glow"></div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 md:px-6 relative z-30 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-black/80 text-gray-300 backdrop-blur-sm border border-gray-800">
              <span className="flex h-2 w-2 rounded-full bg-chip-gold-500 mr-2"></span>
              Premium Poker Coaching
            </div>
            
            <h1 className="responsive-heading text-4xl md:text-5xl lg:text-6xl font-bold font-playfair text-white">
              Transform Your <span className="gradient-text">Poker Game</span> Into <span className="relative">
                <span className="relative z-10">Consistent</span>
                <svg className="absolute bottom-0 left-0 w-full h-[0.2em] text-chip-gold-500/40" viewBox="0 0 200 8" preserveAspectRatio="none">
                  <path d="M0,0 C50,5 80,5 200,0" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
              </span> Profit
            </h1>
            
            <p className="text-xl text-gray-300 md:text-2xl leading-relaxed font-raleway">
              From grinding microstakes to crushing high-stakes games - we build winners at any level
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                href="/#pricing" 
                className="px-6 py-3 bg-gradient-to-r from-poker-red-700 to-poker-red-800 text-white rounded-lg font-medium button-glow text-center relative overflow-hidden group"
              >
                <span className="relative z-10">View Coaching Packages</span>
                <span className="absolute inset-0 bg-gradient-to-r from-chip-gold-500 to-chip-gold-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </Link>
              
              <Link 
                href="/about" 
                className="px-6 py-3 bg-transparent text-white border border-gray-700 hover:border-gray-500 rounded-lg font-medium text-center transition-colors duration-300"
              >
                Learn More
              </Link>
            </div>

            {/* Floating chip elements */}
            <div className="relative h-20 mt-8 hidden md:block">
              {['red', 'blue', 'black', 'gold', 'green'].map((color, index) => (
                <div 
                  key={color} 
                  className="absolute"
                  style={{ 
                    left: `${index * 15}%`, 
                    bottom: index % 2 === 0 ? '0px' : '10px'
                  }}
                >
                  <PokerChip 
                    color={color as 'red' | 'blue' | 'green' | 'black' | 'gold'} 
                    size="md" 
                    stacked={index % 2 === 0}
                    floating={true}
                  />
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative flex justify-center items-center"
          >
            <div className="relative w-full h-[500px]">
              {/* Floating Ace of Spades */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
                <FloatingAce size="xl" showParticles={true} />
              </div>
              
              {/* Background cards */}
              <div className="absolute top-0 left-0 transform -rotate-12 z-10">
                <PlayingCard suit="hearts" rank="K" size="lg" />
              </div>
              
              <div className="absolute bottom-10 right-10 transform rotate-15 z-10">
                <PlayingCard suit="diamonds" rank="Q" size="lg" />
              </div>
              
              <div className="absolute top-1/4 right-0 transform rotate-6 z-20">
                <PlayingCard suit="clubs" rank="J" size="lg" />
              </div>
              
              {/* Floating text elements */}
              <motion.div 
                className="absolute -left-6 top-1/3 p-3 bg-black/80 backdrop-blur-sm rounded-lg shadow-lg border border-felt-800 z-40"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-neon-blue-500 to-neon-blue-600 rounded-lg flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                  </div>
                  <div>
                    <div className="text-white font-medium font-playfair">GTO & Exploitative</div>
                    <div className="text-gray-400 text-sm font-raleway">Balanced Training</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -right-6 bottom-1/3 p-3 bg-black/80 backdrop-blur-sm rounded-lg shadow-lg border border-felt-800 z-40"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-chip-gold-500 to-chip-gold-600 rounded-lg flex items-center justify-center text-black">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 6c1.4 0 2.8 1.1 2.8 2.5V11c.6 0 1.2.6 1.2 1.3v3.5c0 .6-.6 1.2-1.3 1.2H9.2c-.6 0-1.2-.6-1.2-1.3v-3.5c0-.6.6-1.2 1.2-1.2V9.5C9.2 8.1 10.3 7 12 7zm0 1.2c-.8 0-1.5.5-1.5 1.3V11h3V9.5c0-.8-.7-1.3-1.5-1.3z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white font-medium font-playfair">Average ROI</div>
                    <div className="text-chip-gold-500 text-sm font-special-elite">+32%</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 