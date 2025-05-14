"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import BuyButton from "@/components/checkout/BuyButton";

export default function PricingSection() {
  const [selectedCategory, setSelectedCategory] = useState<'standard' | 'premium' | 'elite'>('standard');

  // Define pricing tiers
  const pricingCategories = {
    standard: [
      {
        name: "Recruit",
        price: 9.99,
        duration: "1 hour",
        complexity: "Basic",
        description: "Quick boost for casual warriors seeking basic resource gains",
        features: [
          "1 hour farming frenzy",
          "Basic loot acquisition",
          "Single character boost",
          "Post-operation debrief"
        ],
        delivery: "3 days",
        tier: "D-TIER"
      },
      {
        name: "Battlemage",
        price: 19.50,
        duration: "3 hours",
        complexity: "Standard",
        description: "Enhanced combat farming for dedicated adventurers",
        features: [
          "3 hours intensive farming",
          "Enhanced drop-rate focus",
          "Single character boost",
          "Tactical farming log"
        ],
        delivery: "5 days",
        popular: true,
        tier: "C-TIER"
      },
      {
        name: "Mercenary",
        price: 29.90,
        duration: "5 hours",
        complexity: "Advanced",
        description: "Professional combat resources with tactical approach",
        features: [
          "5 hours hardcore farming",
          "Premium drop optimization",
          "Single character boost",
          "Strategic resource planning"
        ],
        delivery: "7 days",
        tier: "B-TIER"
      },
      {
        name: "Warlord",
        price: 39.99,
        duration: "8 hours",
        complexity: "Professional",
        description: "Extreme resource acquisition for serious competitors",
        features: [
          "8 hours elite farming",
          "High-value target focus",
          "Single character boost",
          "Advanced tactical routes"
        ],
        delivery: "10 days",
        tier: "A-TIER"
      }
    ],
    premium: [
      {
        name: "Night Stalker",
        price: 49.90,
        duration: "10 hours",
        complexity: "Premium",
        description: "Specialized stealth farming for competitive edge",
        features: [
          "10 hours stealth operations",
          "Rare item targeting",
          "Single character boost",
          "Specialized tactical farming"
        ],
        delivery: "5 days",
        tier: "A-TIER"
      },
      {
        name: "Shadowblade",
        price: 59.50,
        duration: "15 hours",
        complexity: "Premium+",
        description: "Enhanced premium boosting with advanced techniques",
        features: [
          "15 hours elite operations",
          "Ultra-rare focus hunting",
          "Single character boost",
          "High-difficulty content clear"
        ],
        delivery: "7 days",
        popular: true,
        tier: "S-TIER"
      },
      {
        name: "Archmage",
        price: 69.99,
        duration: "20 hours",
        complexity: "Expert",
        description: "Expert-level intensive resource harvesting",
        features: [
          "20 hours power farming",
          "Legendary item targeting",
          "Single character boost",
          "Endgame content farming"
        ],
        delivery: "10 days",
        tier: "S-TIER"
      },
      {
        name: "Battle Commander",
        price: 79.90,
        duration: "30 hours",
        complexity: "Expert+",
        description: "Comprehensive military-grade resource acquisition",
        features: [
          "30 hours sustained warfare",
          "Ultimate loot optimization",
          "Single character boost",
          "Elite tactical deployment"
        ],
        delivery: "14 days",
        tier: "S+-TIER"
      }
    ],
    elite: [
      {
        name: "Legendary Hunter",
        price: 89.50,
        duration: "35 hours",
        complexity: "Elite",
        description: "Legendary farming service for the serious power-gamer",
        features: [
          "35 hours relentless farming",
          "Mythic drop optimization",
          "2 character multi-boost",
          "Automated farming scripts"
        ],
        delivery: "10 days",
        tier: "S+-TIER"
      },
      {
        name: "Supreme Commander",
        price: 99.99,
        duration: "40 hours",
        complexity: "Elite+",
        description: "Ultimate domination package for competitive players",
        features: [
          "40 hours warfare operations",
          "Maximum efficiency protocols",
          "3 character multi-boost",
          "Custom automation scripts"
        ],
        delivery: "14 days",
        popular: true,
        tier: "SS-TIER"
      },
      {
        name: "Immortal Conqueror",
        price: 109.90,
        duration: "50 hours",
        complexity: "Pinnacle",
        description: "Advanced elite boosting for total game domination",
        features: [
          "50 hours conquest operations",
          "God-tier farming strategies",
          "4 character multi-boost",
          "Server-side optimization scripts"
        ],
        delivery: "21 days",
        tier: "SS-TIER"
      },
      {
        name: "Ascended Overlord",
        price: 119.50,
        duration: "60 hours",
        complexity: "Ultimate",
        description: "The ultimate package for complete game mastery",
        features: [
          "60 hours godlike farming",
          "Server-first level efficiency",
          "Unlimited character boost",
          "Military-grade automation"
        ],
        delivery: "30 days",
        tier: "SSS-TIER"
      }
    ]
  };
  
  const activePricingPlans = pricingCategories[selectedCategory];

  return (
    <section className="py-20 relative overflow-hidden bg-[#0a0e17]" id="pricing">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-gradient-to-br from-neon-pink-500/20 to-plasma-purple-500/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-gradient-to-br from-game-blue-600/20 to-toxic-green-500/20 rounded-full filter blur-3xl"></div>
        
        {/* Gaming grid pattern */}
        <div className="absolute inset-0 hexagon-pattern opacity-10"></div>
        
        {/* Scan line effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          <div className="absolute inset-x-0 h-[2px] bg-plasma-purple-500/50 blur-[1px] animate-scan-line"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 relative">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-toxic-green-500/50 to-plasma-purple-500/50"></div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              POWER <span className="neon-text">BOOSTING</span> TIERS
            </h2>
            
            <div className="gaming-divider mx-auto w-32 my-4"></div>
            
            <p className="text-gray-400 text-lg">
              Select your battle strategy. Pay once, dominate forever. No subscriptions, just pure gaming power.
            </p>
          </motion.div>
        </div>

        {/* Category Selector */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 bg-[#141a2c] rounded-lg border border-gray-800 rgb-border">
            <button
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedCategory === 'standard' 
                  ? 'bg-gradient-to-r from-game-blue-600 to-toxic-green-600 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setSelectedCategory('standard')}
            >
              STANDARD
            </button>
            <button
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedCategory === 'premium' 
                  ? 'bg-gradient-to-r from-game-blue-600 to-toxic-green-600 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setSelectedCategory('premium')}
            >
              PREMIUM
            </button>
            <button
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedCategory === 'elite' 
                  ? 'bg-gradient-to-r from-game-blue-600 to-toxic-green-600 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setSelectedCategory('elite')}
            >
              ELITE
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ 
            duration: 0.5,
            staggerChildren: 0.1
          }}
        >
          {activePricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-xl overflow-hidden pixel-corners ${
                plan.popular ? 'border-2 border-neon-pink-500' : 'border border-gray-800'
              }`}
            >
              {/* Tier Badge */}
              <div className="absolute top-0 left-0 -mt-1 -ml-1 px-3 py-1 bg-black text-toxic-green-500 text-xs font-bold border-r border-b border-gray-800 z-10">
                {plan.tier}
              </div>
              
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-l from-neon-pink-500 to-plasma-purple-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  BEST VALUE
                </div>
              )}
              
              <div className="p-6 bg-[#101422]">
                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                
                <div className="loading-bar mb-4"></div>
                
                <div className="flex items-end mb-6">
                  <span className="text-4xl font-bold text-white">${plan.price.toFixed(2)}</span>
                  <span className="text-toxic-green-400 ml-2 font-mono">ONE-TIME</span>
                </div>
                
                <div className="mb-6 py-2 px-3 bg-gray-800/50 rounded-lg border border-gray-700/50">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-neon-pink-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-300 font-mono">[TIME]: {plan.duration}</span>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-start">
                      <svg className="h-5 w-5 text-toxic-green-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Button */}
                <div className="mt-4">
                  <BuyButton 
                    packageData={plan}
                    className="w-full text-sm"
                    variant="game"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Custom Request CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="mb-6 p-4 bg-[#141a2c] rounded-lg max-w-3xl mx-auto border border-gray-800 terminal-frame">
            <p className="text-toxic-green-500 text-sm font-mono">
              <span className="text-white">[INFO]:</span> All packages are one-time purchases. <span className="text-white">PAY ONCE. DOMINATE FOREVER.</span> No subscriptions required.
            </p>
          </div>
          
          <p className="text-gray-400 mb-4 font-medium">
            Need a custom battle plan for your gaming domination?
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center group bg-black/50 px-6 py-3 rounded-lg border border-game-blue-600/30 hover:border-game-blue-500"
          >
            <span className="text-game-blue-400 font-medium">DEPLOY TACTICAL SUPPORT TEAM</span>
            <span className="ml-2 bg-game-blue-900/50 p-2 rounded-full text-game-blue-400 group-hover:translate-x-1 transition-transform">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
} 