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
    <section id="pricing" className="py-20 bg-[#070e1b] relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-900/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-900/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Strategic <span className="gradient-text">Coaching</span> Plans
            </h2>
            <p className="text-gray-400 md:text-lg">
              Select the perfect training program to elevate your chess performance.
              Each plan is designed to target specific aspects of your game.
            </p>
          </motion.div>
          
          <div className="flex justify-center flex-wrap mt-8 mb-12 gap-2">
            <button
              onClick={() => setSelectedCategory('beginner')}
              className={`px-5 py-2.5 rounded-lg text-sm md:text-base font-medium transition-all flex items-center ${
                selectedCategory === 'beginner'
                  ? 'bg-gradient-to-r from-chess-blue-600 to-chess-gold-500 text-white'
                  : 'bg-[#0e2250] text-gray-300 hover:bg-[#14285c]'
              }`}
            >
              <PawnIcon size={18} className="mr-2" />
              Opening Phase
            </button>
            <button
              onClick={() => setSelectedCategory('intermediate')}
              className={`px-5 py-2.5 rounded-lg text-sm md:text-base font-medium transition-all flex items-center ${
                selectedCategory === 'intermediate'
                  ? 'bg-gradient-to-r from-chess-blue-600 to-chess-gold-500 text-white'
                  : 'bg-[#0e2250] text-gray-300 hover:bg-[#14285c]'
              }`}
            >
              <KnightIcon size={18} className="mr-2" />
              Middle Game
            </button>
            <button
              onClick={() => setSelectedCategory('advanced')}
              className={`px-5 py-2.5 rounded-lg text-sm md:text-base font-medium transition-all flex items-center ${
                selectedCategory === 'advanced'
                  ? 'bg-gradient-to-r from-chess-blue-600 to-chess-gold-500 text-white'
                  : 'bg-[#0e2250] text-gray-300 hover:bg-[#14285c]'
              }`}
            >
              <KingIcon size={18} className="mr-2" />
              Endgame Mastery
            </button>
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10"
          viewport={{ once: true }}
        >
          {pricingCategories[selectedCategory].map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative rounded-xl overflow-hidden ${
                tier.popular
                  ? 'bg-gradient-to-b from-[#122f60] to-[#0e2250] shadow-xl ring-1 ring-chess-gold-500/20'
                  : 'bg-[#0c1d3d] border border-[#1e365a]'
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 right-0">
                  <div className="h-16 w-16 bg-chess-gold-500 rotate-45 transform origin-bottom-right"></div>
                  <span className="absolute top-[14px] right-1 text-xs font-medium text-gray-900 rotate-45">Popular</span>
                </div>
              )}
              
              <div className="p-6">
                <div className="w-12 h-12 bg-[#1a2e4f] rounded-lg mb-4 flex items-center justify-center">
                  {tier.icon}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">{tier.name}</h3>
                
                <div className="flex items-baseline mb-4">
                  <span className="text-3xl font-bold text-white">${tier.price}</span>
                  <span className="ml-2 text-gray-400 text-sm">/ {tier.duration}</span>
                </div>
                
                <div className="text-sm text-gray-400 mb-5">{tier.description}</div>
                
                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="h-5 w-5 text-chess-gold-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="flex items-center text-sm text-gray-400 mb-6">
                  <svg className="h-5 w-5 text-chess-gold-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>For players: {tier.targetElo}</span>
                </div>
                
                <button 
                  onClick={() => handleBuyNow(tier)}
                  className={`w-full py-3 rounded-lg font-medium text-white ${
                    tier.popular
                    ? 'bg-gradient-to-r from-chess-blue-600 to-chess-gold-500 hover:from-chess-blue-700 hover:to-chess-gold-600'
                    : 'bg-[#1a2e4f] hover:bg-[#253a5e]'
                  } transition-colors`}>
                  Select This Strategy
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 