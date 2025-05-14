"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function PricingSection() {
  const [selectedCategory, setSelectedCategory] = useState<'competitive' | 'moba' | 'sports'>('competitive');

  // Define pricing tiers
  const pricingCategories = {
    competitive: [
      {
        name: "Starter",
        price: 19.50,
        duration: "30 minutes",
        complexity: "Basic",
        description: "Introduction to competitive gaming fundamentals",
        features: [
          "Basic strategy overview",
          "Control settings optimization",
          "Introductory mechanics training",
          "1 Discord coaching session"
        ],
        delivery: "Discord"
      },
      {
        name: "Essentials",
        price: 29.90,
        duration: "1 hour",
        complexity: "Standard",
        description: "Core gameplay techniques and personalized guidance",
        features: [
          "In-depth strategy discussion",
          "Basic aiming techniques",
          "Game sense development",
          "1 Discord coaching session"
        ],
        delivery: "Discord",
        popular: true
      },
      {
        name: "Advanced",
        price: 39.99,
        duration: "1.5 hours",
        complexity: "Advanced",
        description: "Comprehensive coaching for serious players",
        features: [
          "Advanced movement techniques",
          "Precision aiming training",
          "Game awareness & positioning",
          "VOD review of your gameplay"
        ],
        delivery: "Discord"
      },
      {
        name: "Expert",
        price: 59.50,
        duration: "2 hours",
        complexity: "Pro",
        description: "Elite training for competitive players",
        features: [
          "Advanced aiming drills",
          "Pro-level movement techniques",
          "Strategic decision making",
          "2 Discord coaching sessions"
        ],
        delivery: "Discord"
      },
      {
        name: "Professional",
        price: 79.90,
        duration: "3 hours",
        complexity: "Elite",
        description: "Comprehensive training program for aspiring professionals",
        features: [
          "Extended coaching sessions",
          "Professional techniques",
          "Advanced VOD analysis",
          "Custom training routines"
        ],
        delivery: "Discord"
      }
    ],
    moba: [
      {
        name: "Lane Basics",
        price: 29.90,
        duration: "30 minutes",
        complexity: "Basic",
        description: "Learn fundamental lane mechanics and champion skills",
        features: [
          "Basic champion mechanics",
          "Lane fundamentals",
          "Item build paths",
          "1 Discord coaching session"
        ],
        delivery: "Discord"
      },
      {
        name: "Rank Climber",
        price: 39.99,
        duration: "1 hour",
        complexity: "Standard",
        description: "Focused coaching to help you climb the ranked ladder",
        features: [
          "Role-specific strategies",
          "Champion matchup analysis",
          "Map awareness training",
          "1 Discord coaching session"
        ],
        delivery: "Discord",
        popular: true
      },
      {
        name: "Diamond Path",
        price: 59.50,
        duration: "1.5 hours",
        complexity: "Advanced",
        description: "Advanced techniques to reach Diamond+ ranking",
        features: [
          "Advanced wave management",
          "Rotational play strategies",
          "Vision control mastery",
          "Full game VOD analysis"
        ],
        delivery: "Discord"
      },
      {
        name: "Master Tier",
        price: 89.50,
        duration: "2 hours",
        complexity: "Pro",
        description: "High-elo coaching from Master+ ranked coaches",
        features: [
          "High-elo macro strategies",
          "Advanced team fighting",
          "Meta champion mastery",
          "2 Discord coaching sessions"
        ],
        delivery: "Discord"
      },
      {
        name: "Challenger",
        price: 99.99,
        duration: "3 hours",
        complexity: "Elite",
        description: "Elite coaching package for Challenger/professional play",
        features: [
          "Extended coaching sessions",
          "Professional macro strategies",
          "Challenger-level mechanics",
          "Complete champion pool development"
        ],
        delivery: "Discord"
      }
    ],
    sports: [
      {
        name: "Rookie",
        price: 39.99,
        duration: "30 minutes",
        complexity: "Basic",
        description: "Learn the fundamentals of sports game mechanics",
        features: [
          "Basic control mastery",
          "Core gameplay mechanics",
          "Simple strategies",
          "1 Discord coaching session"
        ],
        delivery: "Discord"
      },
      {
        name: "Division Climber",
        price: 49.90,
        duration: "1 hour",
        complexity: "Standard",
        description: "Improve your ranking and win more matches online",
        features: [
          "Effective skill moves",
          "Defensive techniques",
          "Attacking strategies",
          "1 Discord coaching session"
        ],
        delivery: "Discord",
        popular: true
      },
      {
        name: "Elite Tactics",
        price: 69.99,
        duration: "1.5 hours",
        complexity: "Advanced",
        description: "Master advanced techniques used by top-tier players",
        features: [
          "Advanced skill move chains",
          "Counter-attack mastery",
          "Defensive positioning",
          "Custom tactical setups"
        ],
        delivery: "Discord"
      },
      {
        name: "Champion Class",
        price: 109.90,
        duration: "2 hours",
        complexity: "Pro",
        description: "Elite coaching for competitive tournament players",
        features: [
          "Tournament-level strategies",
          "Advanced mind games",
          "Pro movement techniques",
          "2 Discord coaching sessions"
        ],
        delivery: "Discord"
      },
      {
        name: "Legend",
        price: 119.50,
        duration: "3 hours",
        complexity: "Elite",
        description: "Comprehensive training program for esports competitors",
        features: [
          "Extended coaching sessions",
          "Professional-level mechanics",
          "Tournament preparation",
          "Mental fortitude training"
        ],
        delivery: "Discord"
      }
    ]
  };
  
  const activePricingPlans = pricingCategories[selectedCategory];

  return (
    <section className="py-20 relative overflow-hidden" id="pricing">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-game-blue-600/10 to-game-purple-500/5 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple, Transparent <span className="gradient-text">Pricing</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Choose the coaching package that best fits your needs and skill level. All sessions are conducted via Discord.
            </p>
          </motion.div>
        </div>
        
        <motion.div 
          className="flex justify-center flex-wrap gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="inline-flex p-1 bg-gray-800 rounded-lg">
            <button
              onClick={() => setSelectedCategory('competitive')}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
                selectedCategory === 'competitive'
                  ? 'bg-gradient-to-r from-game-blue-600 to-game-purple-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Competitive FPS
            </button>
            <button
              onClick={() => setSelectedCategory('moba')}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
                selectedCategory === 'moba'
                  ? 'bg-gradient-to-r from-game-blue-600 to-game-purple-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              MOBA Games
            </button>
            <button
              onClick={() => setSelectedCategory('sports')}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
                selectedCategory === 'sports'
                  ? 'bg-gradient-to-r from-game-blue-600 to-game-purple-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Sports Games
            </button>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {activePricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className={`relative rounded-xl overflow-hidden ${
                plan.popular
                  ? 'border-2 border-game-blue-500 shadow-lg shadow-game-blue-500/20'
                  : 'border border-gray-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-game-blue-600 to-game-purple-500 text-white text-xs font-bold text-center py-1">
                  MOST POPULAR
                </div>
              )}

              <div className="p-6 bg-[#14172c]">
                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
                  <span>{plan.complexity}</span>
                  <span>•</span>
                  <span>{plan.duration}</span>
                </div>
                
                <div className="mb-5">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-white">${plan.price}</span>
                    <span className="text-gray-500 font-medium">/session</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-gray-400 mb-4 text-sm min-h-[40px]">{plan.description}</p>
                  
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-start text-sm">
                        <svg className="h-5 w-5 text-game-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-auto pt-4">
                    <a 
                      href={`/checkout?packageId=${plan.name.toLowerCase().replace(/\s+/g, '')}&category=${selectedCategory}`}
                      className={`w-full rounded-lg py-2.5 px-4 text-center text-sm font-medium transition-colors ${
                        plan.popular
                          ? 'bg-gradient-to-r from-game-blue-600 to-game-purple-500 text-white button-glow'
                          : 'bg-gray-800 text-white hover:bg-gray-700'
                      }`}
                    >
                      Choose Plan
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a href="/pricing" className="inline-flex items-center text-game-blue-400 hover:text-game-blue-300 transition-colors font-medium">
            <span>View all plan details</span>
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
} 