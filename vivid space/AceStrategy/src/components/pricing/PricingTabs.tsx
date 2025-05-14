"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import PokerChip from "../ui/PokerChip";

export default function PricingTabs() {
  // Define coaching packages
  const coachingPackages = [
    // Cash Game Coaching
    {
      id: "cash-basic",
      name: "Cash Basic Session",
      price: 9.99,
      description: "One-on-one coaching focused on fundamental cash game concepts (1-hour session)",
      type: "Cash Game",
      popular: false,
      suitableFor: "Beginners",
      chipColor: "red" as const
    },
    {
      id: "cash-standard",
      name: "Cash Standard",
      price: 29.90,
      description: "In-depth coaching session with pre-session preparation and post-session review (1-hour session)",
      type: "Cash Game",
        popular: true,
      suitableFor: "Intermediate",
      chipColor: "blue" as const
    },
    {
      id: "cash-premium",
      name: "Cash Premium",
      price: 59.50,
      description: "Premium coaching package with intensive hand analysis and personalized strategy development (2-hour session)",
      type: "Cash Game",
      popular: false,
      suitableFor: "Advanced",
      chipColor: "green" as const
    },
    {
      id: "cash-elite",
      name: "Cash Elite",
      price: 99.99,
      description: "Elite coaching experience for serious players looking to master advanced GTO concepts (2-hour session)",
      type: "Cash Game",
      popular: false,
      suitableFor: "Professional",
      chipColor: "black" as const
    },
    
    // Tournament Coaching
    {
      id: "tournament-basic",
      name: "Tournament Basic",
      price: 19.50,
      description: "One-on-one coaching focused on tournament fundamentals and early stage play (1-hour session)",
      type: "Tournament",
      popular: false,
      suitableFor: "Beginners",
      chipColor: "red" as const
    },
    {
      id: "tournament-standard",
        price: 39.99,
      description: "Comprehensive tournament coaching with final table strategy and ICM analysis (1-hour session)",
      type: "Tournament",
      popular: true,
      suitableFor: "Intermediate",
      chipColor: "blue" as const
    },
    {
      id: "tournament-premium",
      name: "Tournament Premium",
      price: 69.99,
      description: "Advanced tournament coaching focusing on complex decision-making and win-rate optimization (2-hour session)",
      type: "Tournament",
      popular: false,
      suitableFor: "Advanced",
      chipColor: "green" as const
    },
    {
      id: "tournament-elite",
      name: "Tournament Elite",
      price: 109.90,
      description: "Elite tournament coaching tailored for high-stakes players with personalized strategy development (2-hour session)",
      type: "Tournament",
      popular: false,
      suitableFor: "Professional",
      chipColor: "black" as const
    },
    
    // Spin & Go Coaching
    {
      id: "spin-basic",
      name: "Spin & Go Basic",
      price: 19.50,
      description: "Introduction to fast-format tournaments and basic 3-max strategy (1-hour session)",
      type: "Spin & Go",
      popular: false,
      suitableFor: "Beginners",
      chipColor: "red" as const
    },
    {
      id: "spin-standard",
      name: "Spin & Go Standard",
      price: 49.90,
      description: "Detailed coaching on 3-max strategy with focus on short-stacked play (1-hour session)",
      type: "Spin & Go",
        popular: true,
      suitableFor: "Intermediate",
      chipColor: "blue" as const
    },
    {
      id: "spin-premium",
      name: "Spin & Go Premium",
      price: 79.90,
      description: "Advanced coaching on hyperturbo formats with emphasis on heads-up play and adaptability (2-hour session)",
      type: "Spin & Go",
      popular: false,
      suitableFor: "Advanced",
      chipColor: "green" as const
    },
    {
      id: "spin-elite",
      name: "Spin & Go Elite",
      price: 119.50,
      description: "Elite coaching for Spin & Go specialists looking to maximize ROI at all multiplier levels (2-hour session)",
      type: "Spin & Go",
      popular: false,
      suitableFor: "Professional",
      chipColor: "gold" as const
    }
  ];
  
  const coachingFeatures = [
    {
      name: "Live one-on-one coaching session",
      includedIn: [
        "cash-basic", "cash-standard", "cash-premium", "cash-elite",
        "tournament-basic", "tournament-standard", "tournament-premium", "tournament-elite",
        "spin-basic", "spin-standard", "spin-premium", "spin-elite"
      ]
    },
    {
      name: "Session recording for review",
      includedIn: [
        "cash-standard", "cash-premium", "cash-elite",
        "tournament-standard", "tournament-premium", "tournament-elite",
        "spin-standard", "spin-premium", "spin-elite"
      ]
    },
    {
      name: "Hand history review",
      includedIn: [
        "cash-basic", "cash-standard", "cash-premium", "cash-elite",
        "tournament-basic", "tournament-standard", "tournament-premium", "tournament-elite",
        "spin-basic", "spin-standard", "spin-premium", "spin-elite"
      ]
    },
    {
      name: "Database analysis",
      includedIn: [
        "cash-premium", "cash-elite",
        "tournament-premium", "tournament-elite",
        "spin-premium", "spin-elite"
      ]
    },
    {
      name: "Preflop range optimization",
      includedIn: [
        "cash-standard", "cash-premium", "cash-elite",
        "tournament-standard", "tournament-premium", "tournament-elite",
        "spin-standard", "spin-premium", "spin-elite"
      ]
    },
    {
      name: "Custom HUD setup assistance",
      includedIn: [
        "cash-premium", "cash-elite",
        "tournament-premium", "tournament-elite",
        "spin-premium", "spin-elite"
      ]
    },
    {
      name: "GTO analysis with solvers",
      includedIn: [
        "cash-elite",
        "tournament-elite",
        "spin-elite"
      ]
    },
    {
      name: "ICM coaching",
      includedIn: [
        "tournament-standard", "tournament-premium", "tournament-elite"
      ]
    },
    {
      name: "30-day email support",
      includedIn: [
        "cash-standard", "cash-premium", "cash-elite",
        "tournament-standard", "tournament-premium", "tournament-elite",
        "spin-standard", "spin-premium", "spin-elite"
      ]
    }
  ];

  // State for active package type filter
  const [activePackageType, setActivePackageType] = useState<string>("Cash Game");
  
  // Filter packages based on active type
  const filteredPackages = coachingPackages.filter(pkg => pkg.type === activePackageType);
  
  // All possible package types
  const packageTypes = ["Cash Game", "Tournament", "Spin & Go"];

  return (
    <section className="py-24 bg-felt-900 felt-texture" id="pricing-tabs">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">
              One-on-One <span className="gradient-text">Coaching</span> Sessions
            </h2>
            <p className="text-gray-400 text-lg font-raleway">
              Personalized coaching to take your poker game to the next level
            </p>
          </motion.div>
        </div>

        {/* Package type selector */}
        <div className="flex justify-center flex-wrap gap-3 mb-12">
          {packageTypes.map(type => (
            <button
              key={type}
              onClick={() => setActivePackageType(type)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                activePackageType === type
                  ? "bg-chip-gold-500 text-felt-900"
                  : "bg-felt-800/80 text-gray-300 hover:bg-felt-700"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Packages grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPackages.map((pkg) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className={`relative overflow-hidden rounded-xl backdrop-blur-sm border ${
                pkg.popular
                  ? "border-chip-gold-500/50 bg-black/60"
                  : "border-gray-800/30 bg-black/40"
              }`}
            >
              {pkg.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-chip-gold-500 text-black text-xs font-bold uppercase py-1 px-3 rounded-bl-lg tracking-wider">
                    Popular
                  </div>
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <PokerChip 
                    color={pkg.chipColor} 
                    size="sm" 
                    className="mr-3"
                  />
                  <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
                </div>

                <div className="mb-4">
                  <span className="text-3xl font-bold text-white">${pkg.price.toFixed(2)}</span>
                  <span className="text-gray-400 ml-1">/ session</span>
                </div>
                
                <div className="mb-4 text-sm text-gray-300">
                  {pkg.description}
                </div>

                <div className="mb-6 pb-6 border-b border-gray-800/30">
                  <div className="flex items-center mb-2">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-chip-gold-500/20 text-chip-gold-500 text-xs mr-2">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </span>
                    <span className="text-gray-300">Suitable for: {pkg.suitableFor}</span>
                </div>

                  {coachingFeatures.slice(0, 4).map((feature) => (
                    feature.includedIn.includes(pkg.id) && (
                      <div key={feature.name} className="flex items-center mb-2">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-chip-gold-500/20 text-chip-gold-500 text-xs mr-2">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                        </span>
                        <span className="text-gray-300">{feature.name}</span>
                  </div>
                    )
                  ))}
                </div>
                
                <Link 
                  href={`/checkout?package=${pkg.id}`}
                  className={`block w-full py-2 rounded-lg text-center font-medium ${
                    pkg.popular
                      ? "bg-gradient-to-r from-poker-red-700 to-poker-red-800 text-white button-glow"
                      : "bg-felt-800 text-white hover:bg-felt-700 transition-colors"
                  }`}
                >
                  Select Package
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Features section */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold mb-8 text-center font-playfair">
            All Coaching Packages Include
          </h3>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-black/40 border border-gray-800/30 rounded-xl p-6 backdrop-blur-sm">
              <div className="w-12 h-12 bg-poker-red-700/20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-poker-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold mb-2 text-white font-playfair">Video Conference Coaching</h4>
              <p className="text-gray-400 font-raleway">Live one-on-one video sessions with screen sharing for effective learning</p>
            </div>
            
            <div className="bg-black/40 border border-gray-800/30 rounded-xl p-6 backdrop-blur-sm">
              <div className="w-12 h-12 bg-poker-red-700/20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-poker-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold mb-2 text-white font-playfair">Hand Review</h4>
              <p className="text-gray-400 font-raleway">In-depth analysis of your hands to identify and fix leaks in your gameplay</p>
            </div>
            
            <div className="bg-black/40 border border-gray-800/30 rounded-xl p-6 backdrop-blur-sm">
              <div className="w-12 h-12 bg-poker-red-700/20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-poker-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
              </div>
              <h4 className="text-lg font-bold mb-2 text-white font-playfair">Strategic Framework</h4>
              <p className="text-gray-400 font-raleway">Customized strategic framework based on your playing style and goals</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 