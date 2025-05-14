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
  const [hoveredLevel, setHoveredLevel] = useState<string | null>(null);
  
  return (
    <section className="py-20 relative overflow-hidden" id="player-levels">
      {/* Felt texture background */}
      <div className="absolute inset-0 bg-black z-0"></div>
      <div className="absolute inset-0 felt-texture opacity-80 z-0"></div>
      
      {/* Background patterns */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute top-20 left-20 text-8xl">♠</div>
        <div className="absolute bottom-20 right-20 text-8xl">♥</div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-montserrat text-white">
            Identify Your <span className="gradient-text">Skill</span> Level
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Discover where you stand in your poker journey and what skills to develop for faster progress
          </p>
        </motion.div>
        
        {/* Player levels grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {playerLevels.map((level, index) => (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredLevel(level.id)}
              onMouseLeave={() => setHoveredLevel(null)}
              className="relative"
            >
              {/* Playingcard-styled profile */}
              <div className="relative rounded-lg overflow-hidden transform transition-transform hover:scale-105">
                {/* Card frame */}
                <div className="absolute inset-0 bg-white rounded-lg border-8 border-white z-10"></div>
                
                {/* Card suit & rank markers */}
                <div className="absolute top-2 left-2 text-3xl font-special-elite z-20 flex flex-col items-center">
                  <span className={level.cardSuit === 'hearts' || level.cardSuit === 'diamonds' ? 'text-poker-red-700' : 'text-black'}>
                    {level.cardRank}
                  </span>
                  <span className={level.cardSuit === 'hearts' || level.cardSuit === 'diamonds' ? 'text-poker-red-700' : 'text-black'}>
                    {level.cardSuit === 'hearts' ? '♥' : level.cardSuit === 'diamonds' ? '♦' : level.cardSuit === 'clubs' ? '♣' : '♠'}
                  </span>
                </div>
                
                <div className="absolute bottom-2 right-2 text-3xl font-special-elite z-20 flex flex-col items-center transform rotate-180">
                  <span className={level.cardSuit === 'hearts' || level.cardSuit === 'diamonds' ? 'text-poker-red-700' : 'text-black'}>
                    {level.cardRank}
                  </span>
                  <span className={level.cardSuit === 'hearts' || level.cardSuit === 'diamonds' ? 'text-poker-red-700' : 'text-black'}>
                    {level.cardSuit === 'hearts' ? '♥' : level.cardSuit === 'diamonds' ? '♦' : level.cardSuit === 'clubs' ? '♣' : '♠'}
                  </span>
                </div>
                
                {/* Level image area with pattern */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-felt-900/70 to-transparent z-20 mix-blend-multiply"></div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-chip-gold-500/30 z-20 mix-blend-overlay"></div>
                  
                  {/* Card pattern background */}
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                    <span className={`text-9xl opacity-10 ${level.cardSuit === 'hearts' || level.cardSuit === 'diamonds' ? 'text-poker-red-700' : 'text-black'}`}>
                      {level.cardSuit === 'hearts' ? '♥' : level.cardSuit === 'diamonds' ? '♦' : level.cardSuit === 'clubs' ? '♣' : '♠'}
                    </span>
                  </div>
                </div>
                
                {/* Level info overlay */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 flex flex-col justify-end z-30"
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: hoveredLevel === level.id ? 1 : 0.7 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-bold text-white font-montserrat">{level.level}</h3>
                  <p className="text-chip-gold-500 text-sm mb-2">{level.title}</p>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">{level.description}</p>
                  
                  {/* Stats display */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-black/50 p-2 rounded">
                      <p className="text-gray-400">Hands Played</p>
                      <p className="text-white">{level.metrics.handsPlayed}</p>
                    </div>
                    <div className="bg-black/50 p-2 rounded">
                      <p className="text-gray-400">Bankroll</p>
                      <p className="text-white">{level.metrics.bankroll}</p>
                    </div>
                    <div className="bg-black/50 p-2 rounded">
                      <p className="text-gray-400">Limits</p>
                      <p className="text-white">{level.metrics.limits}</p>
                    </div>
                    <div className="bg-black/50 p-2 rounded">
                      <p className="text-gray-400">Key Skill</p>
                      <p className="text-white">{level.metrics.skillsMastered[0]}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Floating card behind the level card */}
              <div className="absolute -bottom-4 -right-4 -z-10 opacity-80 transform rotate-6">
                <PlayingCard 
                  suit={level.cardSuit} 
                  rank={level.cardRank} 
                  size="md" 
                  faceDown={true} 
                />
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-16"
        >
          <a 
            href="#pricing" 
            className="px-8 py-3 bg-gradient-to-r from-felt-700 to-felt-800 text-white rounded-lg shadow-lg hover:shadow-felt-700/30 transition-shadow inline-flex items-center group"
          >
            <span>Discover Our Training Programs</span>
            <svg 
              className="ml-2 w-5 h-5 transform transition-transform group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
} 