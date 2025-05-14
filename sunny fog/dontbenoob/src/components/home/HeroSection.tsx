"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden pt-16" id="home">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        {/* Razer green glow */}
        <div className="absolute top-20 right-[10%] w-72 h-72 bg-[#44D62C]/10 rounded-full filter blur-3xl animate-pulse-glow"></div>
        {/* Purple glow */}
        <div className="absolute bottom-20 left-[5%] w-80 h-80 bg-[#9147FF]/10 rounded-full filter blur-3xl"></div>
        {/* Electric blue glow */}
        <div className="absolute top-40 left-[30%] w-64 h-64 bg-gradient-to-r from-[#00FFFF]/10 to-[#9147FF]/10 rounded-full filter blur-2xl animate-float"></div>
        
        {/* Circuit pattern overlay */}
        <div className="absolute inset-0 opacity-20 circuit-pattern"></div>
        
        {/* Hexagon grid */}
        <div className="absolute inset-0 opacity-10 hexagon-pattern"></div>
      </div>
      
      {/* Code lines effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Horizontal lines - simulating code */}
        {Array.from({length: 10}).map((_, i) => (
          <div 
            key={`h-line-${i}`} 
            className="absolute h-[1px] bg-[#44D62C]/10"
            style={{ 
              left: 0,
              right: 0,
              top: `${(i + 1) * 10}%`,
              width: `${Math.random() * 30 + 70}%`,
              transform: `translateX(${i % 2 === 0 ? '-' : ''}${Math.random() * 5}%)` 
            }}
          ></div>
        ))}
        
        {/* Simulated code elements */}
        <div className="absolute top-[15%] left-[5%] font-mono text-xs text-[#44D62C]/20">function initGameEngine() {'{'}</div>
        <div className="absolute top-[25%] left-[8%] font-mono text-xs text-[#00FFFF]/20">renderHUD(player.status);</div>
        <div className="absolute top-[35%] left-[10%] font-mono text-xs text-[#9147FF]/20">if (player.rank {">"} 100) {'{'}</div>
        <div className="absolute top-[65%] right-[10%] font-mono text-xs text-[#44D62C]/20">setInterval(checkPlayerStatus, 1000);</div>
        <div className="absolute top-[75%] right-[5%] font-mono text-xs text-[#00FFFF]/20">return player.calculateDPS();</div>
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
            <div className="inline-flex items-center rounded-sm px-3 py-1 text-sm bg-[#0A0A0A]/80 text-[#00FFFF] backdrop-blur-sm border border-[#44D62C]/50 uppercase font-['Chakra_Petch'] tracking-wider">
              <span className="flex h-2 w-2 rounded-full bg-[#44D62C] mr-2 animate-pulse"></span>
              Elite Gaming Coaching
            </div>
            
            <h1 className="responsive-heading text-4xl md:text-5xl font-bold">
              DOMINATE YOUR <br />
              <div className="relative inline-block">
                <span className="relative z-10 gradient-text">COMPETITION</span>
                <div className="absolute -bottom-2 left-0 w-full h-[3px] bg-[#44D62C]/60"></div>
              </div>
              <br />
              CLIMB THE RANKS
            </h1>
            
            <div 
              data-text="Master the meta with our pro coaches." 
              className="glitch-text text-xl text-gray-300 font-['Chakra_Petch'] md:text-2xl leading-relaxed"
            >
              Master the meta with our pro coaches.
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                href="/#pricing" 
                className="px-6 py-3 bg-[#44D62C] text-black font-['Saira_Condensed'] uppercase tracking-wider text-center font-bold button-glow transition-transform duration-300 hover:translate-y-[-3px] hover:shadow-[0_0_15px_rgba(68,214,44,0.6)]"
              >
                READY TO CARRY?
              </Link>
              
              <Link 
                href="/contact" 
                className="px-6 py-3 bg-transparent border border-[#9147FF] text-white font-['Saira_Condensed'] uppercase tracking-wider text-center transition-colors duration-300 hover:bg-[#9147FF]/10"
              >
                PRO TEAM INQUIRY
              </Link>
            </div>
            
            {/* Game badges */}
            <div className="pt-8">
              <p className="text-sm text-gray-400 uppercase tracking-wider mb-3 font-['Chakra_Petch']">SUPPORTED TITLES:</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-2 py-1 rounded-sm bg-[#0A0A0A] border border-[#44D62C]/30 text-white text-xs font-['Chakra_Petch']">CS:GO</span>
                <span className="px-2 py-1 rounded-sm bg-[#0A0A0A] border border-[#44D62C]/30 text-white text-xs font-['Chakra_Petch']">VALORANT</span>
                <span className="px-2 py-1 rounded-sm bg-[#0A0A0A] border border-[#00FFFF]/30 text-white text-xs font-['Chakra_Petch']">FORTNITE</span>
                <span className="px-2 py-1 rounded-sm bg-[#0A0A0A] border border-[#00FFFF]/30 text-white text-xs font-['Chakra_Petch']">LOL</span>
                <span className="px-2 py-1 rounded-sm bg-[#0A0A0A] border border-[#9147FF]/30 text-white text-xs font-['Chakra_Petch']">COD</span>
                <span className="px-2 py-1 rounded-sm bg-[#0A0A0A] border border-[#9147FF]/30 text-white text-xs font-['Chakra_Petch']">APEX</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#44D62C] via-[#00FFFF] to-[#9147FF] rounded-md blur opacity-20 animate-pulse"></div>
            <div className="relative z-10 rounded-md overflow-hidden border border-gray-800 hud-container">
              {/* HUD-like header */}
              <div className="absolute top-0 left-0 right-0 h-8 flex items-center justify-between px-3 border-b border-[#44D62C]/30 bg-[#0A0A0A]/80">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-[#44D62C] mr-1 animate-pulse"></div>
                  <span className="text-xs text-[#44D62C] font-['Chakra_Petch'] uppercase">LIVE SESSION</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-gray-400 font-['Chakra_Petch']">SERVER: PRO-TRAINING</span>
                </div>
              </div>
              
              <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-[#0A0A0A] to-[#131313] pt-8">
                {/* Game Arena Visualization */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* 3D Grid floor - simulation */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden perspective-effect">
                    {Array.from({length: 12}).map((_, i) => (
                      <div key={`grid-${i}`} className="w-full h-[1px] bg-[#44D62C]/10 transform" style={{ 
                        transform: `rotateX(80deg) translateZ(${i * 15}px)`,
                        opacity: 1 - (i * 0.05)
                      }}></div>
                    ))}
                    
                    {Array.from({length: 12}).map((_, i) => (
                      <div key={`grid-v-${i}`} className="absolute h-full w-[1px] bg-[#44D62C]/10" style={{ 
                        left: `${(i + 1) * 8}%`,
                        transform: 'rotateX(80deg)'
                      }}></div>
                    ))}
                  </div>
                  
                  {/* Coach Avatar */}
                  <div className="relative z-10 w-32 h-32 bg-[#121212] rounded-lg border border-[#44D62C] overflow-hidden mt-12">
                    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#44D62C]/20 to-transparent"></div>
                    
                    {/* Coach silhouette */}
                    <div className="absolute inset-x-[25%] bottom-[5%] h-[75%]">
                      <div className="absolute bottom-0 w-full h-[40%] bg-[#44D62C]/30 rounded-t-lg"></div>
                      <div className="absolute bottom-[35%] inset-x-[15%] h-[25%] rounded-full bg-[#44D62C]/30"></div>
                    </div>
                    
                    {/* Coach stats */}
                    <div className="absolute top-2 left-2 right-2 flex flex-col">
                      <div className="text-[8px] text-[#44D62C] font-['Chakra_Petch'] uppercase">GLOBAL ELITE</div>
                      <div className="w-full h-[3px] mt-1 bg-[#44D62C]/50 rounded-full overflow-hidden">
                        <div className="h-full w-[85%] bg-[#44D62C] rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Connecting lines to player boxes */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="absolute w-full h-full" viewBox="0 0 400 225" xmlns="http://www.w3.org/2000/svg">
                      <line x1="200" y1="120" x2="100" y2="180" stroke="#44D62C" strokeWidth="1" strokeOpacity="0.3" />
                      <line x1="200" y1="120" x2="300" y2="180" stroke="#44D62C" strokeWidth="1" strokeOpacity="0.3" />
                      <line x1="200" y1="120" x2="70" y2="150" stroke="#44D62C" strokeWidth="1" strokeOpacity="0.3" />
                      <line x1="200" y1="120" x2="330" y2="150" stroke="#44D62C" strokeWidth="1" strokeOpacity="0.3" />
                      <line x1="200" y1="120" x2="150" y2="200" stroke="#44D62C" strokeWidth="1" strokeOpacity="0.3" />
                      <line x1="200" y1="120" x2="250" y2="200" stroke="#44D62C" strokeWidth="1" strokeOpacity="0.3" />
                    </svg>
                  </div>
                  
                  {/* Player boxes */}
                  <div className="absolute bottom-5 left-5 w-20 h-10 bg-[#0A0A0A]/90 border border-[#00FFFF]/50 flex flex-col justify-center px-2">
                    <div className="text-[8px] text-[#00FFFF] font-['Chakra_Petch'] uppercase">ROOKIE I</div>
                    <div className="w-full h-[2px] mt-1 bg-[#00FFFF]/20 rounded-full overflow-hidden">
                      <div className="h-full w-[35%] bg-[#00FFFF]"></div>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-5 right-5 w-20 h-10 bg-[#0A0A0A]/90 border border-[#9147FF]/50 flex flex-col justify-center px-2">
                    <div className="text-[8px] text-[#9147FF] font-['Chakra_Petch'] uppercase">SILVER III</div>
                    <div className="w-full h-[2px] mt-1 bg-[#9147FF]/20 rounded-full overflow-hidden">
                      <div className="h-full w-[55%] bg-[#9147FF]"></div>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-16 left-12 w-20 h-10 bg-[#0A0A0A]/90 border border-[#00FFFF]/50 flex flex-col justify-center px-2">
                    <div className="text-[8px] text-[#00FFFF] font-['Chakra_Petch'] uppercase">BRONZE II</div>
                    <div className="w-full h-[2px] mt-1 bg-[#00FFFF]/20 rounded-full overflow-hidden">
                      <div className="h-full w-[45%] bg-[#00FFFF]"></div>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-16 right-12 w-20 h-10 bg-[#0A0A0A]/90 border border-[#9147FF]/50 flex flex-col justify-center px-2">
                    <div className="text-[8px] text-[#9147FF] font-['Chakra_Petch'] uppercase">GOLD IV</div>
                    <div className="w-full h-[2px] mt-1 bg-[#9147FF]/20 rounded-full overflow-hidden">
                      <div className="h-full w-[65%] bg-[#9147FF]"></div>
                    </div>
                  </div>
                </div>
                
                {/* HUD Overlay - Top */}
                <div className="absolute top-3 inset-x-0 flex justify-between items-center px-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-[#44D62C] animate-pulse"></div>
                    <span className="text-[10px] text-white font-['Chakra_Petch'] uppercase">SPECTATING</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] text-white font-['Chakra_Petch'] uppercase">FPS: 240</span>
                    <span className="text-[10px] text-[#44D62C] font-['Chakra_Petch'] uppercase">PING: 12MS</span>
                  </div>
                </div>
                
                {/* HUD Overlay - Bottom */}
                <div className="absolute bottom-3 inset-x-0 flex justify-between items-center px-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-[#44D62C] animate-pulse"></div>
                    <span className="text-[10px] text-white font-['Chakra_Petch'] uppercase">LIVE COACHING</span>
                  </div>
                  
                  <div className="px-2 py-0.5 bg-[#0A0A0A]/80 border border-[#44D62C]/50 flex items-center">
                    <span className="text-[10px] text-[#44D62C] font-['Chakra_Petch'] uppercase">SKILL BOOST: +45%</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decoration elements */}
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-gradient-to-br from-[#44D62C]/30 to-[#9147FF]/30 rounded-full filter blur-xl"></div>
            <div className="absolute -left-5 -top-5 w-20 h-20 bg-[#00FFFF]/20 rounded-full filter blur-lg"></div>
          </motion.div>
        </div>
      </div>
      
      {/* Animation styles */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
        
        @keyframes ping-slow {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
        
        @keyframes float-particle {
          0% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-10px) translateX(5px); }
          50% { transform: translateY(-5px) translateX(10px); }
          75% { transform: translateY(5px) translateX(5px); }
          100% { transform: translateY(0) translateX(0); }
        }
        
        .perspective-effect {
          transform-style: preserve-3d;
          perspective: 500px;
        }
      `}</style>
    </div>
  );
} 