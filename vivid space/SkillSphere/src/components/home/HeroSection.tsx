"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden pt-16" id="home">
      {/* Background cosmos effect */}
      <div className="absolute inset-0 z-0">
        {/* Deep background with grid */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950/40"></div>
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
        
        {/* Orbital elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full border border-indigo-600/20 transform -translate-x-1/2 -translate-y-1/2 animate-spin-slow"></div>
          <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full border border-cyan-500/20 transform -translate-x-1/2 -translate-y-1/2 animate-spin-reverse"></div>
          <div className="absolute top-1/2 left-1/2 w-[200px] h-[200px] rounded-full border border-indigo-600/30 transform -translate-x-1/2 -translate-y-1/2 animate-spin-slow"></div>
        </div>
        
        {/* Glowing elements */}
        <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-cyan-500/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-indigo-600/5 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-cyan-500/5 to-indigo-600/5 rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        
        {/* Animated star-like particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={`star-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              opacity: Math.random() * 0.5 + 0.3,
              animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite ${Math.random() * 2}s`
            }}
          ></div>
        ))}
        
        {/* Code fragments */}
        <div className="absolute top-[15%] left-[5%] font-mono text-xs text-cyan-500/20">function initGameEngine() {'{'}</div>
        <div className="absolute top-[25%] left-[8%] font-mono text-xs text-cyan-500/20">renderHUD(player.status);</div>
        <div className="absolute top-[35%] left-[10%] font-mono text-xs text-indigo-500/20">if (player.rank {">"} 100) {'{'}</div>
        <div className="absolute top-[65%] right-[10%] font-mono text-xs text-cyan-500/20">setInterval(checkPlayerStatus, 1000);</div>
        <div className="absolute top-[75%] right-[5%] font-mono text-xs text-cyan-500/20">return player.calculateDPS();</div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center space-x-2">
              <div className="h-px w-12 bg-cyan-500"></div>
              <div className="px-4 py-1 bg-slate-800/80 border border-cyan-500/30 rounded-md backdrop-blur-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
                  <span className="text-cyan-500 font-['Space_Grotesk'] uppercase tracking-widest text-xs">Elite Gaming Coaching</span>
                </div>
              </div>
            </div>
            
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-['Montserrat'] leading-tight mb-4">
                <span className="relative inline-block mr-3">
                  DOMINATE
                  <div className="absolute h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent bottom-0"></div>
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-indigo-600">YOUR COMPETITION</span>
              </h1>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-['Montserrat'] text-white">
                CLIMB THE RANKS
              </h2>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-slate-800/0 via-cyan-500/5 to-slate-800/0 rounded-lg"></div>
              <p className="relative text-xl text-gray-300 font-['Space_Grotesk'] md:text-2xl leading-relaxed">
                Master the meta with our pro coaches.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/#pricing"
                className="relative overflow-hidden group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-md blur opacity-70 group-hover:opacity-100 transition duration-200"></div>
                <div className="relative px-6 py-3 bg-slate-900 rounded-md leading-none flex items-center justify-center">
                  <span className="text-cyan-500 group-hover:text-white transition duration-200 font-['Montserrat'] font-medium uppercase tracking-wider">
                    READY TO CARRY?
                  </span>
                </div>
              </Link>
             
            </div>
            
            {/* Game badges */}
            <div className="pt-6">
              <div className="flex items-center space-x-2 mb-3">
                <div className="h-px w-3 bg-indigo-600"></div>
                <span className="text-xs text-gray-400 uppercase tracking-wider font-['Space_Grotesk']">SUPPORTED TITLES</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['CS:GO', 'VALORANT', 'FORTNITE', 'LOL', 'COD', 'APEX'].map((game, index) => (
                  <span key={game} className={`px-3 py-1 rounded-md text-xs font-['Space_Grotesk'] border ${
                    index < 4 
                      ? 'border-cyan-500/30 text-cyan-500 bg-slate-800/80' 
                      : 'border-indigo-600/30 text-indigo-400 bg-slate-800/80'
                  }`}>
                    {game}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            {/* Hero visualization */}
            <div className="relative z-10 aspect-square max-w-lg mx-auto">
              {/* Border decoration */}
              <div className="absolute inset-0 border border-indigo-600/20 rounded-full"></div>
              <div className="absolute inset-[3px] border border-cyan-500/20 rounded-full"></div>
              
              {/* Orbit lines */}
              <div className="absolute inset-[8%] border border-indigo-600/10 rounded-full"></div>
              <div className="absolute inset-[16%] border border-cyan-500/10 rounded-full"></div>
              <div className="absolute inset-[24%] border border-indigo-600/10 rounded-full"></div>
              <div className="absolute inset-[32%] border border-cyan-500/10 rounded-full"></div>
              
              {/* Center platform */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[35%] h-[35%] rounded-full border border-cyan-500/40 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm flex items-center justify-center">
                <div className="w-[80%] h-[80%] rounded-full bg-gradient-to-br from-cyan-500/10 to-indigo-600/10 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-cyan-500 font-bold text-sm">ELITE</div>
                    <div className="text-xs text-indigo-400">COACH</div>
                  </div>
                </div>
              </div>
              
              {/* Orbiting elements */}
              {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                <div 
                  key={i}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    width: '100%',
                    height: '100%',
                    transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                  }}
                >
                  <div 
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 animate-pulse-glow"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  >
                    <div className="absolute inset-0 rounded-md border border-indigo-600/40 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center p-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mb-0.5"></div>
                      <div className="text-[5px] text-cyan-500 font-['Space_Grotesk'] uppercase leading-none">Player</div>
                      <div className="w-full h-[2px] mt-0.5 bg-indigo-600/20 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-600" 
                          style={{ width: `${Math.random() * 60 + 20}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Connecting lines */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                <path 
                  d="M50,50 L50,18" 
                  stroke="#06b6d460" 
                  strokeWidth="0.2" 
                  strokeDasharray="1,1"
                />
                <path 
                  d="M50,50 L68,25" 
                  stroke="#06b6d460" 
                  strokeWidth="0.2" 
                  strokeDasharray="1,1"
                />
                <path 
                  d="M50,50 L82,50" 
                  stroke="#4f46e560" 
                  strokeWidth="0.2" 
                  strokeDasharray="1,1"
                />
                <path 
                  d="M50,50 L68,75" 
                  stroke="#4f46e560" 
                  strokeWidth="0.2" 
                  strokeDasharray="1,1"
                />
                <path 
                  d="M50,50 L50,82" 
                  stroke="#06b6d460" 
                  strokeWidth="0.2" 
                  strokeDasharray="1,1"
                />
                <path 
                  d="M50,50 L32,75" 
                  stroke="#4f46e560" 
                  strokeWidth="0.2" 
                  strokeDasharray="1,1"
                />
                <path 
                  d="M50,50 L18,50" 
                  stroke="#06b6d460" 
                  strokeWidth="0.2" 
                  strokeDasharray="1,1"
                />
                <path 
                  d="M50,50 L32,25" 
                  stroke="#4f46e560" 
                  strokeWidth="0.2" 
                  strokeDasharray="1,1"
                />
              </svg>
              
              {/* Data points and interface elements */}
              <div className="absolute top-[5%] left-[10%] text-[8px] text-cyan-500 font-mono opacity-60">INIT:SESSION</div>
              <div className="absolute top-[10%] right-[15%] text-[8px] text-indigo-400 font-mono opacity-60">CLASS:COACH</div>
              <div className="absolute bottom-[8%] left-[12%] text-[8px] text-cyan-500 font-mono opacity-60">RANK:GLOBAL</div>
              <div className="absolute bottom-[5%] right-[10%] text-[8px] text-indigo-400 font-mono opacity-60">EXP:MAX</div>
            </div>
            
            {/* Circular stat indicators */}
            <div className="absolute -top-4 -right-4 w-28 h-28">
              <div className="absolute inset-0 rounded-full border border-cyan-500/30 backdrop-blur-sm"></div>
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <div className="w-20 h-20 rounded-full border border-indigo-600/20 flex flex-col items-center justify-center">
                  <span className="text-cyan-500 text-xs font-mono">WIN RATE</span>
                  <span className="text-lg font-bold text-white">98<span className="text-xs">%</span></span>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 w-28 h-28">
              <div className="absolute inset-0 rounded-full border border-indigo-600/30 backdrop-blur-sm"></div>
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <div className="w-20 h-20 rounded-full border border-cyan-500/20 flex flex-col items-center justify-center">
                  <span className="text-indigo-400 text-xs font-mono">MMR</span>
                  <span className="text-lg font-bold text-white">+500</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Animation styles */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        
        @keyframes ping-slow {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
} 