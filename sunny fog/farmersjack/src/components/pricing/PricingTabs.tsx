"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import BuyButton from "@/components/checkout/BuyButton";

export default function PricingTabs() {
  const [selectedCategory, setSelectedCategory] = useState<'standard' | 'premium' | 'elite'>('standard');

  // Define pricing tiers
  const pricingCategories = {
    standard: [
      {
        name: "Recruit",
        price: 9.99,
        duration: "1 hour",
        complexity: "Basic",
        description: "One-time basic farming task for casual players",
        features: [
          "1 hour total farming",
          "Basic resource collection",
          "Single character",
          "Progress report at completion"
        ],
        delivery: "1 day"
      },
      {
        name: "Battlemage",
        price: 19.50,
        duration: "3 hours",
        complexity: "Standard",
        description: "One-time standard farming package with more resources",
        features: [
          "3 hours total farming",
          "Enhanced resource collection",
          "Single character",
          "Detailed farming log"
        ],
        delivery: "1 day",
        popular: true
      },
      {
        name: "Mercenary",
        price: 29.90,
        duration: "5 hours",
        complexity: "Advanced",
        description: "One-time advanced farming with dedicated support",
        features: [
          "5 hours total farming",
          "Premium resource collection",
          "Single character",
          "Resource optimization"
        ],
        delivery: "2 days"
      },
      {
        name: "Warlord",
        price: 39.99,
        duration: "8 hours",
        complexity: "Professional",
        description: "One-time professional intensive farming service",
        features: [
          "8 hours total farming",
          "Elite resource collection",
          "Single character",
          "Advanced farming methods"
        ],
        delivery: "2 days"
      }
    ],
    premium: [
      {
        name: "Night Stalker",
        price: 49.90,
        duration: "10 hours",
        complexity: "Premium",
        description: "One-time premium farming with enhanced efficiency",
        features: [
          "10 hours total farming",
          "Premium resource acquisition",
          "Single character",
          "Specific target farming"
        ],
        delivery: "3 days"
      },
      {
        name: "Shadowblade",
        price: 59.50,
        duration: "15 hours",
        complexity: "Premium+",
        description: "One-time enhanced premium farming package",
        features: [
          "15 hours total farming",
          "Advanced resource optimization",
          "Single character",
          "High-value target focus"
        ],
        delivery: "4 days",
        popular: true
      },
      {
        name: "Archmage",
        price: 69.99,
        duration: "20 hours",
        complexity: "Expert",
        description: "One-time expert-level intensive farming service",
        features: [
          "20 hours total farming",
          "Elite resource acquisition",
          "Single character",
          "Rare item targeting"
        ],
        delivery: "5 days"
      },
      {
        name: "Battle Commander",
        price: 79.90,
        duration: "30 hours",
        complexity: "Expert+",
        description: "One-time professional-grade comprehensive farming",
        features: [
          "30 hours total farming",
          "Maximum resource acquisition",
          "Single character",
          "Strategic farming plan"
        ],
        delivery: "8 days"
      }
    ],
    elite: [
      {
        name: "Legendary Hunter",
        price: 89.50,
        duration: "35 hours",
        complexity: "Elite",
        description: "One-time elite farming service for demanding players",
        features: [
          "35 hours total farming",
          "Elite resource optimization",
          "Up to 2 characters",
          "Basic automation scripts"
        ],
        delivery: "9 days"
      },
      {
        name: "Supreme Commander",
        price: 99.99,
        duration: "40 hours",
        complexity: "Elite+",
        description: "One-time enhanced elite comprehensive service",
        features: [
          "40 hours total farming",
          "Maximum efficiency protocols",
          "Up to 3 characters",
          "Advanced automation scripts"
        ],
        delivery: "10 days",
        popular: true
      },
      {
        name: "Immortal Conqueror",
        price: 109.90,
        duration: "50 hours",
        complexity: "Pinnacle",
        description: "One-time advanced elite intensive service",
        features: [
          "50 hours total farming",
          "Custom farming strategies",
          "Up to 4 characters",
          "Premium automation scripts"
        ],
        delivery: "13 days"
      },
      {
        name: "Ascended Overlord",
        price: 119.50,
        duration: "60 hours",
        complexity: "Ultimate",
        description: "One-time ultimate comprehensive farming service",
        features: [
          "60 hours total farming",
          "Enterprise-grade efficiency",
          "Unlimited characters",
          "Custom automation scripts"
        ],
        delivery: "15 days"
      }
    ]
  };
  
  const activePricingPlans = pricingCategories[selectedCategory];

  return (
    <section className="py-20 bg-[#070a12]">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 mb-4 bg-black/30 border border-toxic-green-500/30 rounded text-toxic-green-500 text-xs font-mono"
          >
            LOADOUT_SELECTION
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
          >
            CHOOSE YOUR <span className="text-toxic-green-500">TACTICAL PACKAGE</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-400 mb-8"
          >
            Select the package that aligns with your mission parameters. 
            Our elite operators are standing by to deploy advanced resource acquisition protocols.
          </motion.p>
        </div>
        
        {/* Category Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-black/30 p-1 rounded-lg border border-gray-800">
            <button
              onClick={() => setSelectedCategory('standard')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                selectedCategory === 'standard'
                  ? 'bg-toxic-green-600/20 text-toxic-green-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Standard
            </button>
            <button
              onClick={() => setSelectedCategory('premium')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                selectedCategory === 'premium'
                  ? 'bg-neon-pink-600/20 text-neon-pink-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Premium
            </button>
            <button
              onClick={() => setSelectedCategory('elite')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                selectedCategory === 'elite'
                  ? 'bg-plasma-purple-600/20 text-plasma-purple-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Elite
            </button>
          </div>
        </div>
        
        {/* Pricing Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {activePricingPlans.map((plan, index) => (
            <div 
              key={index}
              className={`bg-[#0d1424] border rounded-xl overflow-hidden ${
                plan.popular 
                  ? selectedCategory === 'standard' 
                    ? 'border-toxic-green-500 shadow-lg shadow-toxic-green-500/10' 
                    : selectedCategory === 'premium'
                      ? 'border-neon-pink-500 shadow-lg shadow-neon-pink-500/10'
                      : 'border-plasma-purple-500 shadow-lg shadow-plasma-purple-500/10'
                  : 'border-gray-800'
              } pixel-corners-lg`}
            >
              {plan.popular && (
                <div className={`py-1 px-3 text-xs font-medium ${
                  selectedCategory === 'standard' 
                    ? 'bg-toxic-green-500 text-black' 
                    : selectedCategory === 'premium'
                      ? 'bg-neon-pink-500 text-black'
                      : 'bg-plasma-purple-500 text-black'
                } text-center font-mono`}>
                  MOST POPULAR
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 font-mono">{plan.name}</h3>
                
                <div className="mb-4">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-white">${plan.price.toFixed(2)}</span>
                    <span className="text-gray-400 ml-1">/one-time</span>
                  </div>
                  <div className="flex space-x-2 mt-2">
                    <div className="px-2 py-1 bg-black/40 rounded text-xs text-gray-400 font-mono">
                      {plan.duration}
                    </div>
                    <div className="px-2 py-1 bg-black/40 rounded text-xs text-gray-400 font-mono">
                      {plan.complexity}
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-400 text-sm mb-4">
                  {plan.description}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-300 flex items-start">
                      <span className={`w-4 h-4 rounded-full ${
                        selectedCategory === 'standard' 
                          ? 'bg-toxic-green-500/20' 
                          : selectedCategory === 'premium'
                            ? 'bg-neon-pink-500/20'
                            : 'bg-plasma-purple-500/20'
                      } flex-shrink-0 flex items-center justify-center mr-2 mt-0.5`}>
                        <span className={`block w-1.5 h-1.5 rounded-full ${
                          selectedCategory === 'standard' 
                            ? 'bg-toxic-green-500' 
                            : selectedCategory === 'premium'
                              ? 'bg-neon-pink-500'
                              : 'bg-plasma-purple-500'
                        }`}></span>
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="space-y-3">
                  <BuyButton
                    packageData={plan}
                    variant="game"
                    className="w-full justify-center"
                  />
                </div>
              </div>
            </div>
          ))}
        </motion.div>
        
        {/* Additional Info */}
        <div className="mt-16 bg-[#0d1424] border border-gray-800 rounded-xl p-6 pixel-corners">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Need a custom operation?</h3>
              <p className="text-gray-400">
                Contact our tactical team for bespoke farming solutions tailored to your specific requirements.
              </p>
            </div>
            <BuyButton
              packageData={{
                name: "Custom Package",
                price: 0,
                duration: "",
                complexity: "Custom",
                description: "Custom farming package",
                features: [],
                delivery: "TBD"
              }}
              variant="outline"
              className="whitespace-nowrap"
            >
              GET CUSTOM QUOTE
            </BuyButton>
          </div>
        </div>
      </div>
    </section>
  );
} 