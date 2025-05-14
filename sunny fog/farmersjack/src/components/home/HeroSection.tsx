"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16" id="home">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 right-[10%] w-72 h-72 bg-game-blue-600/20 rounded-full filter blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 left-[5%] w-80 h-80 bg-neon-pink-500/15 rounded-full filter blur-3xl"></div>
        <div className="absolute top-40 left-[30%] w-64 h-64 bg-gradient-to-r from-game-blue-600/10 to-toxic-green-500/10 rounded-full filter blur-2xl animate-float"></div>
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-cyber-grid bg-[length:50px_50px] opacity-20"></div>
        
        {/* Animated scan line */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-x-0 h-[2px] bg-plasma-purple-500/50 blur-[1px] animate-scan-line"></div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-gray-800/80 text-gray-300 backdrop-blur-sm border border-game-blue-600/50 pixel-corners">
              <span className="flex h-2 w-2 rounded-full bg-toxic-green-500 mr-2 animate-pulse"></span>
              <span className="animate-neon-flicker">ELITE BOOSTING SERVICES</span>
            </div>
            
            <h1 className="responsive-heading text-4xl md:text-5xl font-bold text-white">
              We <span className="neon-text">DOMINATE</span> While You <span className="cyber-text animate-glitch">CONQUER</span>
            </h1>
            
            <div className="relative">
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-game-blue-500 to-transparent my-6"></div>
              <div className="absolute -top-4 left-1/3 transform -translate-x-1/2 bg-black/80 px-2 text-xs text-game-blue-400">SYSTEM STATUS: ONLINE</div>
            </div>
            
            <p className="text-xl text-gray-300 md:text-2xl leading-relaxed border-l-4 border-toxic-green-500 pl-4">
              Elite power leveling and farming services for hardcore gamers: WoW, Diablo 4, Runescape, Dofus, Genshin Impact, and EVE Online.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                href="/#pricing" 
                className="px-6 py-3 bg-gradient-to-r from-plasma-purple-600 to-neon-pink-600 text-white rounded-lg font-medium button-glow text-center rgb-border"
              >
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  UNLOCK PRO SERVICES
                </span>
              </Link>
            </div>
            
            <div className="terminal-frame mt-6">
              <div className="text-toxic-green-500 font-mono text-sm">
                <span className="text-game-blue-400">$</span> <span className="text-plasma-purple-400">FarmersJack</span> <span className="text-white">--status</span><br/>
                <span className="typing-animation">[ ONLINE ] Serving hardcore gamers since 2019</span><br/>
                <span className="typing-animation">[ SECURE ] 100% account protection guaranteed</span><br/>
                <span className="typing-animation">[ ACTIVE ] 24/7 operations across all time zones</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-game-blue-600/50 bg-[#101422] pixel-corners">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-game-blue-500 to-toxic-green-500"></div>
              <div className="aspect-video relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-game-blue-900/30 to-neon-pink-500/20 z-10"></div>
                <Image
                  src="https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Professional gaming setup"
                  className="w-full h-full object-cover animate-rgb-shift"
                  width={1000}
                  height={563}
                  priority
                />
                
                {/* Gaming HUD overlay */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                  <div className="absolute top-4 left-4 px-3 py-1 bg-black/70 border border-game-blue-500/50 text-game-blue-400 text-sm rounded">
                    <span className="animate-pulse">🔴 LIVE</span>
                  </div>
                  <div className="absolute top-4 right-4 px-3 py-1 bg-black/70 border border-game-blue-500/50 text-toxic-green-500 text-sm rounded">
                    EXP: +500%
                  </div>
                  <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/70 border border-neon-pink-500/50 text-neon-pink-400 text-sm rounded">
                    PRESTIGE: MAX
                  </div>
                </div>
              </div>
              
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-gradient-to-br from-game-blue-500 to-toxic-green-500 rounded-full filter blur-xl opacity-50"></div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -right-6 top-1/4 p-3 bg-[#101422] rounded-lg shadow-lg border border-plasma-purple-500/50 rotate-3 animate-float rgb-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-plasma-purple-500 to-neon-pink-500 rounded-lg flex items-center justify-center text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-medium">24/7 BOOST</div>
                  <div className="text-neon-pink-400 text-sm">Ultra Fast Leveling</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -left-6 bottom-1/4 p-3 bg-[#101422] rounded-lg shadow-lg border border-toxic-green-500/50 -rotate-6 animate-float-delay rgb-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-game-blue-500 to-toxic-green-500 rounded-lg flex items-center justify-center text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-medium">STEALTH MODE</div>
                  <div className="text-toxic-green-400 text-sm">Maximum Security</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 