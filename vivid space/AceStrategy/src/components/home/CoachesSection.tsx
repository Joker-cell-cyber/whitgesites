"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PlayingCard from "../ui/PlayingCard";

// Define player levels data
const playerLevels = [
  {
    id: "ace-player",
    level: "Expert",
    title: "Professional",
    description: "Complete mastery of GTO and exploitative adjustments with a deep understanding of poker theory.",
    metrics: {
      handsPlayed: "500K+",
      bankroll: "100+ buy-ins",
      limits: "NL200+/High Stakes",
      skillsMastered: ["GTO", "Advanced exploits", "Emotional control"]
    },
    cardSuit: "spades" as const,
    cardRank: "A" as const
  },
  {
    id: "king-player",
    level: "Advanced",
    title: "Winning Regular",
    description: "Solid player with balanced strategy and strong understanding of adjustments against different opponent types.",
    metrics: {
      handsPlayed: "200K+",
      bankroll: "50+ buy-ins",
      limits: "NL50-NL100/Mid Stakes",
      skillsMastered: ["Range balance", "Adjustments", "Player reading"]
    },
    cardSuit: "diamonds" as const,
    cardRank: "K" as const
  },
  {
    id: "queen-player",
    level: "Intermediate",
    title: "Breakeven/Small Winner",
    description: "Competent player who has begun developing a solid strategy but still lacks consistency in certain spots.",
    metrics: {
      handsPlayed: "100K+",
      bankroll: "30+ buy-ins",
      limits: "NL25-NL50/Low Stakes",
      skillsMastered: ["Fundamentals", "Basic ranges", "Statistics"]
    },
    cardSuit: "hearts" as const,
    cardRank: "Q" as const
  },
  {
    id: "jack-player",
    level: "Beginner",
    title: "Motivated Rookie",
    description: "Beginning player learning the basics but still making fundamental errors that need correction to progress.",
    metrics: {
      handsPlayed: "<50K",
      bankroll: "20+ buy-ins",
      limits: "NL2-NL10/Micro Stakes",
      skillsMastered: ["Game rules", "Preflop basics", "Elementary concepts"]
    },
    cardSuit: "clubs" as const,
    cardRank: "J" as const
  }
];

export default function PlayerLevelsSection() {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  
  return (
    <section className="relative py-28 overflow-hidden" id="player-levels">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#040608] to-[#070a0c]"></div>
      
      {/* Pattern background */}
      <div className="absolute inset-0 bg-[url('/images/table-felt-pattern.png')] opacity-10"></div>
      
      {/* Decorative card suits in background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-[10%] text-[300px] opacity-5 text-white">♠</div>
        <div className="absolute bottom-20 right-[10%] text-[300px] opacity-5 text-poker-red-700">♥</div>
        <div className="absolute top-[40%] left-[20%] text-[200px] opacity-5 text-white transform rotate-12">♣</div>
        <div className="absolute bottom-[40%] right-[20%] text-[200px] opacity-5 text-poker-red-700 transform -rotate-12">♦</div>
      </div>
      
      {/* Radial glow effects */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/2 h-1/2 bg-gradient-to-b from-poker-royal-900/30 to-transparent rounded-full filter blur-[100px]"></div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-1/2 bg-gradient-to-t from-chip-gold-900/20 to-transparent rounded-full filter blur-[100px]"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-1.5 bg-black/40 rounded-full mb-4 backdrop-blur-sm border border-gray-800/50">
            <span className="text-sm text-gray-400">Skill progression</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-montserrat text-white">
            Identify Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-chip-gold-400 to-chip-gold-600">Skill</span> Level
          </h2>
          
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Discover where you stand in your poker journey and what skills to develop for faster progress
          </p>
          
          {/* Level selection "playing cards" */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {playerLevels.map((level, index) => (
              <motion.button
                key={level.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                whileHover={{ y: -10, rotate: level.cardSuit === "hearts" ? 5 : level.cardSuit === "clubs" ? -5 : level.cardSuit === "diamonds" ? 3 : -3 }}
                className={`relative outline-none focus:outline-none group`}
                onClick={() => setSelectedLevel(selectedLevel === level.id ? null : level.id)}
              >
                <div className="relative w-24 h-32 md:w-28 md:h-40 rounded-lg overflow-hidden transition-all bg-white shadow-xl">
                  {/* Card rank and suit */}
                  <div className="absolute top-2 left-2 text-3xl font-bold font-special-elite text-center">
                    <div className={level.cardSuit === "hearts" || level.cardSuit === "diamonds" ? "text-poker-red-700" : "text-black"}>
                      {level.cardRank}
                    </div>
                    <div className={level.cardSuit === "hearts" || level.cardSuit === "diamonds" ? "text-poker-red-700" : "text-black"}>
                      {level.cardSuit === "hearts" ? "♥" : level.cardSuit === "diamonds" ? "♦" : level.cardSuit === "clubs" ? "♣" : "♠"}
                    </div>
                  </div>
                  
                  <div className="absolute bottom-2 right-2 text-3xl font-bold font-special-elite text-center transform rotate-180">
                    <div className={level.cardSuit === "hearts" || level.cardSuit === "diamonds" ? "text-poker-red-700" : "text-black"}>
                      {level.cardRank}
                    </div>
                    <div className={level.cardSuit === "hearts" || level.cardSuit === "diamonds" ? "text-poker-red-700" : "text-black"}>
                      {level.cardSuit === "hearts" ? "♥" : level.cardSuit === "diamonds" ? "♦" : level.cardSuit === "clubs" ? "♣" : "♠"}
                    </div>
                  </div>
                  
                  {/* Center card design */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`text-6xl ${level.cardSuit === "hearts" || level.cardSuit === "diamonds" ? "text-poker-red-700" : "text-black"}`}>
                      {level.cardSuit === "hearts" ? "♥" : level.cardSuit === "diamonds" ? "♦" : level.cardSuit === "clubs" ? "♣" : "♠"}
                    </div>
                  </div>
                  
                  {/* Selected indicator */}
                  {selectedLevel === level.id && (
                    <div className="absolute inset-0 bg-chip-gold-500/20 border-4 border-chip-gold-500 rounded-lg"></div>
                  )}
                </div>
                
                {/* Card label */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-white text-sm font-medium">
                  {level.level}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
        
        {/* Detailed player level information */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {playerLevels.map((level, index) => (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 * index }}
                className={`
                  relative overflow-hidden transition-all duration-500 transform
                  ${selectedLevel === null || selectedLevel === level.id ? 'opacity-100 scale-100' : 'opacity-30 scale-95'}
                `}
              >
                {/* Card styled container */}
                <div className="relative">
                  {/* Card border and gradient */}
                  <div className="absolute inset-0 p-px rounded-2xl overflow-hidden">
                    <div className={`
                      absolute inset-0 bg-gradient-to-br
                      ${level.cardSuit === "hearts" 
                        ? "from-poker-red-500/80 to-poker-red-900/80" 
                        : level.cardSuit === "diamonds" 
                          ? "from-poker-red-600/80 to-red-900/80" 
                          : level.cardSuit === "clubs" 
                            ? "from-gray-700/80 to-gray-900/80" 
                            : "from-poker-royal-700/80 to-poker-royal-900/80"
                      }
                    `}></div>
                  </div>
                  
                  {/* Inner card content */}
                  <div className="relative bg-gradient-to-br from-black/95 to-gray-900/95 p-8 rounded-2xl border border-gray-800/50">
                    <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
                      {/* Card representation */}
                      <div className="flex-shrink-0 perspective w-28 h-40">
                        <div className="absolute transform">
                          <PlayingCard 
                            suit={level.cardSuit} 
                            rank={level.cardRank} 
                            size="lg" 
                          />
                        </div>
                      </div>
                      
                      {/* Level info */}
                      <div>
                        <h3 className="text-2xl font-bold font-montserrat text-white mb-1">{level.level} Player</h3>
                        <p className={`
                          text-lg font-medium mb-3
                          ${level.cardSuit === "hearts" || level.cardSuit === "diamonds" 
                            ? "text-poker-red-500" 
                            : level.cardSuit === "clubs" 
                              ? "text-gray-400"
                              : "text-poker-royal-500"
                          }
                        `}>
                          {level.title}
                        </p>
                        <p className="text-gray-300">{level.description}</p>
                      </div>
                    </div>
                    
                    {/* Stats grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-gray-800/30">
                        <div className="text-gray-400 text-sm mb-1">Hands Played</div>
                        <div className="text-white font-bold">{level.metrics.handsPlayed}</div>
                      </div>
                      <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-gray-800/30">
                        <div className="text-gray-400 text-sm mb-1">Bankroll Size</div>
                        <div className="text-white font-bold">{level.metrics.bankroll}</div>
                      </div>
                      <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-gray-800/30">
                        <div className="text-gray-400 text-sm mb-1">Stakes Level</div>
                        <div className="text-white font-bold">{level.metrics.limits}</div>
                      </div>
                      <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-gray-800/30">
                        <div className="text-gray-400 text-sm mb-1">Key Skills</div>
                        <div className="text-white font-bold">{level.metrics.skillsMastered[0]}</div>
                      </div>
                    </div>
                    
                    {/* Skill mastery list */}
                    <div className="mt-6">
                      <div className="text-gray-300 font-medium mb-3">Skills mastered:</div>
                      <div className="flex flex-wrap gap-2">
                        {level.metrics.skillsMastered.map((skill, idx) => (
                          <span 
                            key={idx} 
                            className={`
                              inline-flex px-3 py-1 rounded-full text-sm
                              ${level.cardSuit === "hearts" 
                                ? "bg-poker-red-700/20 text-poker-red-400" 
                                : level.cardSuit === "diamonds" 
                                  ? "bg-poker-red-800/20 text-poker-red-400" 
                                  : level.cardSuit === "clubs" 
                                    ? "bg-gray-800/50 text-gray-300" 
                                    : "bg-poker-royal-800/20 text-poker-royal-400"
                              }
                              border border-gray-800/30
                            `}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* CTA section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <div className="relative inline-block">
              <a 
                href="#pricing" 
                className="relative z-10 inline-flex items-center px-8 py-4 bg-gradient-to-r from-poker-royal-700 to-poker-royal-800 text-white rounded-lg shadow-lg transition-all group hover:shadow-poker-royal-700/30 hover:-translate-y-1"
              >
                <span>Discover Our Training Programs</span>
                <svg 
                  className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              <div className="absolute -inset-1 bg-gradient-to-r from-chip-gold-400 to-chip-gold-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom decorative edge */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>
    </section>
  );
} 