"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  PawnIcon,
  KnightIcon,
  KingIcon,
  RookIcon,
  QueenIcon,
  BishopIcon,
  ChessboardIcon,
  EloIcon
} from "@/components/ui/ChessIcons";
import { useProduct } from "@/components/context/ProductContext";

interface PricingTier {
  name: string;
  price: number;
  duration: string;
  level: string;
  description: string;
  features: string[];
  popular?: boolean;
  targetElo?: string;
  icon: React.ReactNode;
}

export default function PricingSection() {
  const [selectedCategory, setSelectedCategory] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const { setSelectedProduct } = useProduct();
  const router = useRouter();

  const pricingCategories = {
    beginner: [
      {
        name: "Pawn Fundamentals",
        price: 9.99,
        duration: "1-hour session",
        level: "Basic Strategy",
        description: "Perfect for beginners looking to get started with chess fundamentals",
        features: [
          "Basic pawn structure",
          "Opening principles",
          "Simple tactics",
          "Beginner endgames"
        ],
        targetElo: "Under 1000 ELO",
        icon: <PawnIcon size={32} />
      },
      {
        name: "Knight Tactics",
        price: 19.50,
        duration: "1-hour session",
        level: "Beginner+",
        description: "Learn the unique movements and tactical patterns of knights",
        features: [
          "Knight forks",
          "Knight outposts",
          "Knight vs bishop battles",
          "Knight endgames"
        ],
        popular: true,
        targetElo: "800-1200 ELO",
        icon: <KnightIcon size={32} />
      },
      {
        name: "Bishop Control",
        price: 29.90,
        duration: "1-hour session",
        level: "Developing Player",
        description: "Master the power of bishops and their long-range influence",
        features: [
          "Bishop pair advantage",
          "Fianchetto techniques",
          "Color complex strategy",
          "Bishop vs knight dynamics"
        ],
        targetElo: "1000-1400 ELO",
        icon: <BishopIcon size={32} />
      },
      {
        name: "Rook Dominance",
        price: 39.99,
        duration: "1-hour session",
        level: "Intermediate Focus",
        description: "Unlock the full potential of rooks in all phases of the game",
        features: [
          "Rook placement",
          "Open file control",
          "Rook lifts",
          "Rook endgames mastery"
        ],
        targetElo: "1200-1600 ELO",
        icon: <RookIcon size={32} />
      }
    ],
    intermediate: [
      {
        name: "Queen Maneuvers",
        price: 49.90,
        duration: "2-hour session",
        level: "Advanced Piece Management",
        description: "Develop sophisticated queen strategies without exposing to attacks",
        features: [
          "Queen safety",
          "Central queen play",
          "Attack coordination",
          "Queen sacrifices"
        ],
        targetElo: "1400-1800 ELO",
        icon: <QueenIcon size={32} />
      },
      {
        name: "King Safety",
        price: 59.50,
        duration: "2-hour session",
        level: "Defensive Excellence",
        description: "Protect your king while creating counterattacking possibilities",
        features: [
          "Castling decisions",
          "Pawn shield management", 
          "Defending against attacks",
          "King activation in endgames"
        ],
        popular: true,
        targetElo: "1600-2000 ELO",
        icon: <KingIcon size={32} />
      },
      {
        name: "Positional Mastery",
        price: 69.99,
        duration: "2-hour session",
        level: "Strategic Thinking",
        description: "Learn to evaluate positions and make long-term strategic plans",
        features: [
          "Pawn structure analysis", 
          "Piece coordination",
          "Prophylactic thinking",
          "Strategic sacrifices"
        ],
        targetElo: "1800-2200 ELO",
        icon: <ChessboardIcon size={32} />
      },
      {
        name: "Calculation Power",
        price: 79.90,
        duration: "2-hour session",
        level: "Tactical Sharpness",
        description: "Enhance your ability to calculate variations accurately and efficiently",
        features: [
          "Visualization training",
          "Candidate moves selection",
          "Tactical patterns recognition",
          "Calculation exercises"
        ],
        targetElo: "2000-2300 ELO",
        icon: <EloIcon size={32} />
      }
    ],
    advanced: [
      {
        name: "Opening Repertoire",
        price: 89.50,
        duration: "2-hour session",
        level: "Professional Preparation",
        description: "Develop a personalized opening repertoire tailored to your style",
        features: [
          "Opening selection guidance",
          "Main line training",
          "Sideline preparation", 
          "Transposition awareness"
        ],
        targetElo: "2100-2400 ELO",
        icon: <PawnIcon size={32} />
      },
      {
        name: "Grandmaster Strategy",
        price: 99.99,
        duration: "2-hour session",
        level: "Elite Understanding",
        description: "Learn the strategic thinking methods used by top grandmasters",
        features: [
          "Long-range planning",
          "Dynamic piece play",
          "Pawn structure manipulation",
          "Intuitive sacrifices"
        ],
        popular: true,
        targetElo: "2200+ ELO",
        icon: <KingIcon size={32} />
      },
      {
        name: "Tournament Domination",
        price: 109.90,
        duration: "2-hour session",
        level: "Competitive Excellence",
        description: "Prepare for tournament success with advanced strategic and psychological training",
        features: [
          "Pre-tournament preparation",
          "Opponent-specific prep",
          "Time management mastery",
          "Between-game recovery"
        ],
        targetElo: "2200-2400 ELO",
        icon: <EloIcon size={32} />
      },
      {
        name: "Master's Path",
        price: 119.50,
        duration: "2-hour session",
        level: "Elite Performance",
        description: "Comprehensive training for serious players aiming for master-level performances",
        features: [
          "Complete chess mastery system",
          "Advanced endgame theory",
          "Universal strategic concepts",
          "Personalized improvement plan"
        ],
        targetElo: "2300+ ELO",
        icon: <QueenIcon size={32} />
      }
    ]
  };

  const handleBuyNow = (plan: PricingTier) => {
    // Store selected product in context
    setSelectedProduct({
      name: plan.name,
      price: plan.price,
      duration: plan.duration,
      level: plan.level
    });
    
    // Navigate to checkout
    router.push('/checkout');
  };

  return (
    <section id="pricing" className="py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#050914]"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-10" 
          style={{
            backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
            backgroundSize: "30px 30px"
          }}>
        </div>
        
        {/* Gradient spots */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-chess-gold-600/5 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-0 left-1/5 w-[400px] h-[400px] bg-chess-blue-600/5 rounded-full filter blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center mb-6 px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
            <span className="w-2 h-2 rounded-full bg-chess-gold-500 mr-2"></span>
            <span className="text-sm text-gray-300">Tailored for your skill level</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Strategic <span className="bg-clip-text text-transparent bg-gradient-to-r from-chess-gold-400 to-white">Coaching</span> Plans
          </h2>
          
          <p className="text-gray-400 md:text-lg">
            Select the perfect training program to elevate your chess performance.
            Each plan is designed to target specific aspects of your game.
          </p>
        </motion.div>
        
        <div className="relative max-w-xl mx-auto mb-16">
          <div className="absolute inset-y-0 w-full bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-full"></div>
          <div className="relative z-10 p-1.5 flex justify-between rounded-full bg-[#0a1220] shadow-inner">
            <button
              onClick={() => setSelectedCategory('beginner')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === 'beginner' 
                  ? 'bg-gradient-to-r from-chess-gold-600 to-chess-gold-500 text-gray-900 shadow-lg'
                  : 'text-gray-300 hover:bg-white/5'
              }`}
            >
              <PawnIcon size={16} className={selectedCategory === 'beginner' ? 'text-gray-900' : ''} />
              Opening Phase
            </button>
            
            <button
              onClick={() => setSelectedCategory('intermediate')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === 'intermediate' 
                  ? 'bg-gradient-to-r from-chess-gold-600 to-chess-gold-500 text-gray-900 shadow-lg'
                  : 'text-gray-300 hover:bg-white/5'
              }`}
            >
              <KnightIcon size={16} className={selectedCategory === 'intermediate' ? 'text-gray-900' : ''} />
              Middle Game
            </button>
            
            <button
              onClick={() => setSelectedCategory('advanced')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === 'advanced' 
                  ? 'bg-gradient-to-r from-chess-gold-600 to-chess-gold-500 text-gray-900 shadow-lg'
                  : 'text-gray-300 hover:bg-white/5'
              }`}
            >
              <KingIcon size={16} className={selectedCategory === 'advanced' ? 'text-gray-900' : ''} />
              Endgame Mastery
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {pricingCategories[selectedCategory].map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className={`h-full rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-300 relative ${
                tier.popular 
                  ? 'border-2 border-chess-gold-500/30' 
                  : 'border border-white/10 hover:border-white/20'
              }`}>
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent"></div>
                
                {/* Popular tag */}
                {tier.popular && (
                  <div className="absolute top-0 right-0">
                    <div className="relative overflow-hidden w-32 h-32">
                      <div className="absolute top-[22px] right-[-35px] transform rotate-45 bg-chess-gold-500 text-gray-900 text-xs uppercase tracking-wider font-semibold py-1 px-10">
                        Popular
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="p-6 md:p-8 flex flex-col h-full relative z-10">
                  <div className="mb-8">
                    <div className={`w-14 h-14 mb-6 rounded-xl flex items-center justify-center ${
                      tier.popular 
                        ? 'bg-chess-gold-500 text-gray-900' 
                        : 'bg-white/10 text-white'
                    }`}>
                      {tier.icon}
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{tier.description}</p>
                    
                    <div className="mb-4">
                      <span className="text-3xl font-bold tracking-tight text-white">${tier.price}</span>
                      <span className="text-gray-400 text-sm ml-1">/ {tier.duration}</span>
                    </div>
                    
                    <div className="flex items-center text-xs text-gray-400 mb-6">
                      <svg className="h-4 w-4 text-chess-gold-400 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>For players: {tier.targetElo}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-8 flex-grow">
                    {tier.features.map((feature, i) => (
                      <div key={i} className="flex items-start">
                        <svg className="h-5 w-5 text-chess-gold-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-auto">
                    <button 
                      onClick={() => handleBuyNow(tier)}
                      className={`w-full py-3 rounded-xl font-medium transition-all duration-300 ${
                        tier.popular
                          ? 'bg-chess-gold-500 hover:bg-chess-gold-400 text-gray-900'
                          : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                      }`}
                    >
                      Select This Strategy
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 