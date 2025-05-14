"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const [currentRank, setCurrentRank] = useState(0);
  const ranks = ["Iron", "Bronze", "Silver", "Gold", "Platinum", "Diamond", "Master", "Grandmaster", "Challenger"];
  const rankColors = ["#4D4D4D", "#CD7F32", "#C0C0C0", "#FFD700", "#36FFBA", "#B9F2FF", "#9D4CFF", "#FF4E50", "#00CCFF"];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRank((prev) => (prev + 1) % ranks.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [ranks.length]);

  const gradientVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.8,
        ease: "easeOut" 
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16" id="home">
      {/* Enhanced Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-20 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full filter blur-[150px] animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-purple-600/10 rounded-full filter blur-[120px] animate-pulse-slow"></div>
        
        {/* Game-themed particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-[10%] w-1 h-1 bg-blue-500 rounded-full animate-float-particle"></div>
          <div className="absolute top-1/3 left-[30%] w-2 h-2 bg-purple-500 rounded-full animate-float-particle-delay"></div>
          <div className="absolute top-2/3 left-[70%] w-1 h-1 bg-cyan-500 rounded-full animate-float-particle"></div>
          <div className="absolute top-1/2 left-[85%] w-2 h-2 bg-indigo-500 rounded-full animate-float-particle-slow"></div>
          <div className="absolute top-[20%] left-[60%] w-1 h-1 bg-pink-500 rounded-full animate-float-particle-delay"></div>
        </div>

        {/* Mesh grid effect */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-6 md:space-y-8"
          >
            <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm bg-gray-800/80 text-gray-200 backdrop-blur-sm border border-gray-700 shadow-glow">
              <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
              <span className="font-medium">Professional Boosters Online Now</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
              Boost Your <span className="gradient-text bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600">Rank</span><br />
              <div className="h-36 md:h-40 lg:h-44 overflow-visible relative">
                <div className="animate-typing inline-block">
                  <div className="whitespace-nowrap">Dominate In</div>
                  <div className="mt-2 md:mt-4">
                    <span className="font-bold relative inline-block transition-colors duration-300" style={{ color: rankColors[currentRank] }}>
                      {ranks[currentRank]}
                      <div className="absolute -bottom-1 h-[3px] w-full" style={{ backgroundColor: rankColors[currentRank] }}></div>
                    </span>
                  </div>
                </div>
              </div>
            </h1>
            
            <p className="text-xl text-gray-300 md:text-2xl leading-relaxed max-w-lg">
              Our elite team of pro players can boost your account to any rank with <span className="font-semibold text-blue-400">100% safety</span> and <span className="font-semibold text-purple-400">guaranteed results</span>.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Link 
                href="/#pricing" 
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium text-lg button-glow transition-transform hover:translate-y-[-2px] shadow-lg shadow-blue-700/20"
              >
                View Boosting Plans
              </Link>
              <Link 
                href="/contact" 
                className="px-8 py-4 bg-gray-800 text-white rounded-lg font-medium text-lg border border-gray-700 hover:bg-gray-700 transition-colors"
              >
                Talk to a Booster
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 mt-8 border-t border-gray-800">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">100%</div>
                <div className="text-gray-400 text-sm">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">24/7</div>
                <div className="text-gray-400 text-sm">Support</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">100+</div>
                <div className="text-gray-400 text-sm">Pro Boosters</div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            variants={gradientVariants}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            {/* Game UI-inspired frame */}
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-gray-800/80 bg-[#0D0D14]">
              {/* Header bar that looks like a game UI */}
              <div className="bg-gradient-to-r from-blue-900/90 to-purple-900/90 px-4 py-2 flex justify-between items-center border-b border-gray-800/60">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-gray-300 text-sm font-medium">BoostThatELO Stream</div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-green-400 text-xs">LIVE</span>
                </div>
              </div>
              
              <div className="aspect-video relative overflow-hidden">
                {/* The video overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-purple-900/40 z-10">
                </div>
                <img
                  src="https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                  alt="Professional gaming setup"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Floating game rank badges */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -right-8 top-1/4 p-3 bg-[#0D0D14] rounded-lg shadow-lg border border-blue-500/30 rotate-3 animate-float-slow z-20"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-amber-600 flex items-center justify-center text-white text-sm font-bold">
                  G1
                </div>
                <div>
                  <div className="text-white font-medium">Gold → Platinum</div>
                  <div className="text-amber-400 text-xs">48 hours</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="absolute -left-8 bottom-1/4 p-3 bg-[#0D0D14] rounded-lg shadow-lg border border-purple-500/30 -rotate-6 animate-float-medium z-20"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                  D2
                </div>
                <div>
                  <div className="text-white font-medium">Diamond → Master</div>
                  <div className="text-purple-400 text-xs">1 week</div>
                </div>
              </div>
            </motion.div>

            {/* Game UI notifications */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="absolute -right-4 -bottom-4 max-w-[200px] p-3 bg-[#0D0D14]/90 backdrop-blur-sm rounded-lg shadow-lg border-l-4 border-green-500 z-20"
            >
              <div className="flex flex-col">
                <div className="text-green-400 text-xs font-medium">ACHIEVEMENT UNLOCKED</div>
                <div className="text-white text-sm font-medium">Rank Up Master</div>
                <div className="text-gray-400 text-xs mt-1">+3 divisions in 24 hours</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 