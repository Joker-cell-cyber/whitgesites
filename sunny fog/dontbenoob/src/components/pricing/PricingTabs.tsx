"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type GameCategory = "competitive" | "moba" | "sports";

export default function PricingTabs() {
  const [selectedCategory, setSelectedCategory] = useState<GameCategory>("competitive");

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
          "Discord coaching session"
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
          "Discord coaching session"
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
          "Discord coaching session"
        ],
        delivery: "Discord"
      },
      {
        name: "Professional",
        price: 79.90,
        duration: "3 hours",
        complexity: "Elite",
        description: "Premium coaching for aspiring pro players",
        features: [
          "Pro-level strategy sessions",
          "Advanced gameplay analysis",
          "Personalized training plan",
          "Full gameplay breakdown"
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
          "Discord coaching session"
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
          "Discord coaching session"
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
          "Complete game analysis"
        ],
        delivery: "Discord"
      },
      {
        name: "Challenger",
        price: 99.99,
        duration: "3 hours",
        complexity: "Elite",
        description: "Top-tier coaching from Challenger ranked players",
        features: [
          "Pro-level macro strategies",
          "Advanced champion mechanics",
          "Team composition mastery",
          "Complete career guidance"
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
          "Discord coaching session"
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
          "Discord coaching session"
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
          "Complete match analysis"
        ],
        delivery: "Discord"
      },
      {
        name: "Legend",
        price: 119.50,
        duration: "3 hours",
        complexity: "Ultimate",
        description: "Ultimate coaching from professional esports athletes",
        features: [
          "Pro competition strategies",
          "Advanced technical mastery",
          "Complete playing style overhaul",
          "Personalized long-term development"
        ],
        delivery: "Discord"
      }
    ]
  };
  
  const activePricingPlans = pricingCategories[selectedCategory];

  return (
    <section className="py-20 relative overflow-hidden" id="pricing-tabs">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-vid-red-900/10 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-vid-red-600/5 to-vid-orange-500/5 rounded-full transform translate-x-1/4 translate-y-1/4 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="gradient-text">Pricing</span> Packages
            </h2>
            <p className="text-gray-400 text-lg">
              Choose the perfect package for your video editing needs with our transparent pricing model
            </p>
          </motion.div>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-10">
          <div className="bg-[#14172c] rounded-full p-1 border border-gray-800 inline-flex gap-1">
            {Object.keys(pricingCategories).map((category) => (
            <button
                key={category}
                onClick={() => setSelectedCategory(category as GameCategory)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-[#44D62C] text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
                {category.charAt(0).toUpperCase() + category.slice(1)} Games
            </button>
            ))}
          </div>
        </div>

        {/* Pricing Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          key={selectedCategory} // This forces a re-render when category changes
        >
          {activePricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`card-hover rounded-xl overflow-hidden relative ${
                plan.popular ? 'border-vid-red-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-[#44D62C] text-white text-center text-xs py-1 font-medium">
                  MOST POPULAR
                </div>
              )}
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm px-2 py-0.5 rounded bg-gray-800 text-gray-300">
                        {plan.duration}
                      </span>
                      <span className="text-sm px-2 py-0.5 rounded bg-gray-800 text-gray-300">
                        {plan.complexity}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white">${plan.price.toFixed(2)}</div>
                    <div className="text-sm text-gray-400">one-time</div>
                  </div>
                </div>
                
                <p className="text-gray-400 text-sm mb-4">
                  {plan.description}
                </p>

                <div className="border-b border-gray-800 mb-4 pb-1">
                  <div className="text-sm font-semibold text-gray-300 mb-2">What&apos;s included:</div>
                  <ul className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="text-gray-400 text-sm flex items-start">
                        <svg className="h-5 w-5 text-[#44D62C] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-400 mb-5">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-vid-red-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Delivery: {plan.delivery}</span>
                  </div>
                </div>
                
                <a 
                  href={`/checkout?packageId=${plan.name.toLowerCase().replace(/\s+/g, '')}&category=${selectedCategory}`}
                  onClick={() => console.log(`Selected package: ${plan.name}, ID: ${plan.name.toLowerCase().replace(/\s+/g, '')}, Category: ${selectedCategory}`)}
                  className={`block text-center py-3 rounded-lg font-medium transition-colors ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-vid-red-600 to-vid-orange-500 text-white button-glow' 
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                >
                  Select Package
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-6">
            Need a custom solution? Contact us for personalized video editing services.
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center text-vid-red-400 hover:text-vid-red-300 transition-colors"
          >
            <span>Get in touch</span>
            <svg className="ml-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
} 