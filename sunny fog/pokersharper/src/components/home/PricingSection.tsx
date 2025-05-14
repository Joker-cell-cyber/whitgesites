"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PokerChip from "../ui/PokerChip";
import PlayingCard from "../ui/PlayingCard";

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
      chipColor: "red"
    },
    {
      id: "cash-standard",
      name: "Cash Standard",
      price: 29.90,
      description: "In-depth coaching session with pre-session preparation and post-session review (1-hour session)",
      type: "Cash Game",
      popular: true,
      suitableFor: "Intermediate",
      chipColor: "blue"
    },
    {
      id: "cash-premium",
      name: "Cash Premium",
      price: 59.50,
      description: "Premium coaching package with intensive hand analysis and personalized strategy development (2-hour session)",
      type: "Cash Game",
      popular: false,
      suitableFor: "Advanced",
      chipColor: "green"
    },
    {
      id: "cash-elite",
      name: "Cash Elite",
      price: 99.99,
      description: "Elite coaching experience for serious players looking to master advanced GTO concepts (2-hour session)",
      type: "Cash Game",
      popular: false,
      suitableFor: "Professional",
      chipColor: "black"
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
      chipColor: "red"
    },
    {
      id: "tournament-standard",
      name: "Tournament Standard",
      price: 39.99,
      description: "Comprehensive tournament coaching with final table strategy and ICM analysis (1-hour session)",
      type: "Tournament",
      popular: true,
      suitableFor: "Intermediate",
      chipColor: "blue"
    },
    {
      id: "tournament-premium",
      name: "Tournament Premium",
      price: 69.99,
      description: "Advanced tournament coaching focusing on complex decision-making and win-rate optimization (2-hour session)",
      type: "Tournament",
      popular: false,
      suitableFor: "Advanced",
      chipColor: "green"
    },
    {
      id: "tournament-elite",
      name: "Tournament Elite",
      price: 109.90,
      description: "Elite tournament coaching tailored for high-stakes players with personalized strategy development (2-hour session)",
      type: "Tournament",
      popular: false,
      suitableFor: "Professional",
      chipColor: "black"
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
      chipColor: "red"
    },
    {
      id: "spin-standard",
      name: "Spin & Go Standard",
      price: 49.90,
      description: "Detailed coaching on 3-max strategy with focus on short-stacked play (1-hour session)",
      type: "Spin & Go",
      popular: true,
      suitableFor: "Intermediate",
      chipColor: "blue"
    },
    {
      id: "spin-premium",
      name: "Spin & Go Premium",
      price: 79.90,
      description: "Advanced coaching on hyperturbo formats with emphasis on heads-up play and adaptability (2-hour session)",
      type: "Spin & Go",
      popular: false,
      suitableFor: "Advanced",
      chipColor: "green"
    },
    {
      id: "spin-elite",
      name: "Spin & Go Elite",
      price: 119.50,
      description: "Elite coaching for Spin & Go specialists looking to maximize ROI at all multiplier levels (2-hour session)",
      type: "Spin & Go",
      popular: false,
      suitableFor: "Professional",
      chipColor: "gold"
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
    <section className="py-24 bg-[#070a0c] felt-texture" id="pricing">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-montserrat">
              One-on-One <span className="gradient-text">Coaching</span> Sessions
            </h2>
            <p className="text-gray-400 text-lg">
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
          {filteredPackages.map((pkg, index) => (
        <motion.div
              key={pkg.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div 
                className={`relative rounded-xl overflow-hidden transition-all duration-300 ${
                  pkg.popular 
                    ? "border-2 border-chip-gold-500 shadow-lg shadow-chip-gold-500/10" 
                    : "border border-felt-700/50"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-chip-gold-500 text-felt-900 text-xs font-bold px-3 py-1 transform rotate-0 origin-top-right">
                      POPULAR
                    </div>
                  </div>
                )}
                
                <div className="bg-felt-900/80 backdrop-blur-sm p-6">
                  <div className="flex items-center mb-4">
                    <PokerChip 
                      color={pkg.chipColor as 'red' | 'blue' | 'green' | 'black' | 'gold'} 
                      size="md"
                      className="mr-4"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
                      <p className="text-gray-400 text-sm">{pkg.suitableFor}</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">${pkg.price.toFixed(2)}</span>
                    <span className="text-gray-400 ml-1">/session</span>
                  </div>
                  
                  <p className="text-gray-300 mb-6">{pkg.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    {coachingFeatures.map(feature => {
                      const isIncluded = feature.includedIn.includes(pkg.id);
                      return (
                        <div 
                          key={feature.name} 
                          className={`flex items-start ${isIncluded ? "text-gray-200" : "text-gray-500 line-through"}`}
                        >
                          <svg 
                            className={`h-5 w-5 ${isIncluded ? "text-chip-gold-500" : "text-gray-600"} mt-0.5 mr-2`} 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            {isIncluded ? (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            ) : (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            )}
                          </svg>
                          <span className="text-sm">{feature.name}</span>
                        </div>
                      );
                    })}
                  </div>
                  
                  <a 
                    href={`/checkout?product=${pkg.id}`}
                    className="block w-full py-2.5 px-4 text-center rounded-lg bg-gradient-to-r from-felt-700 to-felt-900 text-white font-medium hover:shadow-lg hover:from-felt-600 hover:to-felt-800 transition-all transform hover:-translate-y-0.5"
                  >
                    Book Now
                  </a>
                </div>
              </div>
        </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">
            Basic and Standard coaching sessions last 1 hour, while Premium and Elite sessions last 2 hours. All sessions are conducted via Discord or Skype. No subscriptions or recurring payments - pay only for the sessions you need.
          </p>
        </div>

        {/* Decorative cards */}
        <div className="relative overflow-hidden mt-20 h-24">
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-6">
            <PlayingCard suit="hearts" rank="A" size="lg" className="absolute -left-40 shadow-xl" />
            <PlayingCard suit="clubs" rank="K" size="lg" className="absolute -left-20 rotate-3 shadow-xl" />
            <PlayingCard suit="diamonds" rank="Q" size="lg" className="absolute left-0 rotate-6 shadow-xl" />
            <PlayingCard suit="spades" rank="J" size="lg" className="absolute left-20 rotate-9 shadow-xl" />
          </div>
        </div>
      </div>
    </section>
  );
} 