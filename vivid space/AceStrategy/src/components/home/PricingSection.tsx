"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import PokerChip from "../ui/PokerChip";

export default function PricingSection() {
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
    <section className="py-24 bg-felt-900 felt-texture" id="pricing">
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

        {/* Pricing cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 mb-12">
          {filteredPackages.map((pkg) => {
            const isPopular = pkg.popular;
            
            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className={`relative flex flex-col rounded-xl overflow-hidden border ${
                  isPopular 
                    ? "border-chip-gold-500/40" 
                    : "border-gray-800"
                } backdrop-blur-sm`}
              >
                {/* Card background */}
                <div className="absolute inset-0 bg-felt-800/80"></div>
                
                {/* Popular badge */}
                {isPopular && (
                  <div className="absolute top-5 right-5">
                    <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-chip-gold-600 text-black">
                      Most Popular
                    </span>
                  </div>
                )}
                
                {/* Card content */}
                <div className="relative p-6 flex-1 flex flex-col">
                  {/* Package chip */}
                  <div className="flex justify-center mb-6">
                    <PokerChip color={pkg.chipColor} size="md" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-center mb-1">{pkg.name}</h3>
                  <div className="text-center mb-2">
                    <span className="text-sm text-gray-400">Suitable for: {pkg.suitableFor}</span>
                  </div>
                  
                  <div className="text-center mb-6">
                    <span className="text-3xl font-bold">${pkg.price}</span>
                  </div>
                  
                  <p className="text-gray-400 text-center mb-6 flex-1">
                    {pkg.description}
                  </p>
                  
                  {/* Feature list */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 text-sm text-gray-300 text-center">Includes:</h4>
                    <ul className="space-y-2">
                      {coachingFeatures.map((feature, index) => {
                        const isIncluded = feature.includedIn.includes(pkg.id);
                        if (!isIncluded) return null;
                        
                        return (
                          <li key={index} className="flex items-center text-sm">
                            <svg className="w-4 h-4 text-chip-gold-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                            </svg>
                            <span className="text-gray-300">{feature.name}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  
                  <Link 
                    href="/contact?package=book-coaching" 
                    className={`w-full py-3 rounded-lg font-medium text-center transition-all ${
                      isPopular
                        ? "bg-gradient-to-r from-chip-gold-500 to-chip-gold-600 text-black hover:shadow-glow-sm hover:shadow-chip-gold-500/20"
                        : "bg-gradient-to-r from-poker-royal-700 to-poker-royal-800 text-white hover:from-poker-royal-600 hover:to-poker-royal-700"
                    }`}
                  >
                    Book Session
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Additional information */}
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-4">
            Looking for something more specific? Contact us for custom coaching packages.
          </p>
          <Link 
            href="/contact" 
            className="text-chip-gold-500 hover:text-chip-gold-400 font-medium underline"
          >
            Contact for custom solutions
          </Link>
        </div>
      </div>
    </section>
  );
} 