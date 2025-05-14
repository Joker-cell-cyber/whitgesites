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
    <section className="py-20 bg-midnight-blue-900">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4" id="pricing-tabs">
              SELECT YOUR <span className="text-teal-500">OPERATIONAL</span> TIER
            </h2>
            <p className="text-slate-400 mb-8">
              Choose from our tiered service packages, tailored to your specific gaming needs and objectives.
            </p>
          </motion.div>
        </div>

        {/* Package Type Selector */}
        <div className="flex flex-wrap justify-center mb-12 gap-2">
          <button 
            onClick={() => setSelectedCategory('standard')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors duration-300 ${
              selectedCategory === 'standard' 
                ? 'bg-teal-600 text-white shadow-lg shadow-teal-900/30' 
                : 'bg-midnight-blue-800 text-slate-300 border border-slate-700 hover:bg-midnight-blue-700'
            }`}
          >
            STANDARD OPERATIONS
          </button>
          <button 
            onClick={() => setSelectedCategory('premium')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors duration-300 ${
              selectedCategory === 'premium' 
                ? 'bg-teal-600 text-white shadow-lg shadow-teal-900/30' 
                : 'bg-midnight-blue-800 text-slate-300 border border-slate-700 hover:bg-midnight-blue-700'
            }`}
          >
            PREMIUM OPERATIONS
          </button>
          <button 
            onClick={() => setSelectedCategory('elite')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors duration-300 ${
              selectedCategory === 'elite' 
                ? 'bg-teal-600 text-white shadow-lg shadow-teal-900/30' 
                : 'bg-midnight-blue-800 text-slate-300 border border-slate-700 hover:bg-midnight-blue-700'
            }`}
          >
            ELITE OPERATIONS
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activePricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-3 inset-x-0 flex justify-center">
                  <div className="px-3 py-1 bg-amber-500 text-midnight-blue-900 text-xs font-bold rounded-full shadow-lg">
                    POPULAR CHOICE
                  </div>
                </div>
              )}

              <div className={`h-full bg-midnight-blue-800 rounded-xl overflow-hidden border ${
                plan.popular ? 'border-amber-500/50 shadow-xl shadow-amber-900/10' : 'border-slate-700 shadow-lg'
              }`}>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                      <div className="text-slate-400 text-sm">{plan.complexity} Level</div>
                    </div>
                    <div className="bg-teal-900/30 px-2 py-1 rounded text-teal-500 text-xs font-mono">
                      {plan.duration}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold text-white">${plan.price}</span>
                      <span className="text-slate-400 ml-1">/ one-time</span>
                    </div>
                    <p className="text-sm text-slate-400 mt-2">{plan.description}</p>
                  </div>

                  <div className="mb-6">
                    <div className="text-xs uppercase text-slate-500 font-medium mb-2">Includes:</div>
                    <ul className="space-y-2">
                      {plan.features.map((feature, fidx) => (
                        <li key={fidx} className="flex items-center text-slate-300 text-sm">
                          <svg className="h-4 w-4 text-teal-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-slate-700 flex justify-between items-center text-sm">
                    <div className="text-slate-400">
                      <span className="text-teal-500">⚡</span> {plan.delivery} delivery
                    </div>
                    <div>
                      <BuyButton 
                        packageData={plan}
                        className={`px-4 py-2 rounded ${
                          plan.popular 
                            ? 'bg-amber-500 hover:bg-amber-600 text-midnight-blue-900 font-bold' 
                            : 'bg-teal-600 hover:bg-teal-700 text-white'
                        } transition-colors`}
                      >
                        Select
                      </BuyButton>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enterprise Option */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 max-w-3xl mx-auto"
        >
          <div className="bg-gradient-to-r from-teal-900/20 to-amber-900/20 p-8 rounded-xl border border-slate-700 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Need a Custom Operation?</h3>
            <p className="text-slate-400 mb-6">
              Our elite team can handle custom missions for any game with tailored strategies and resource allocation.
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center px-6 py-3 bg-midnight-blue-800 hover:bg-midnight-blue-700 text-white rounded-lg border border-slate-600 transition-colors"
            >
              <span>Contact Special Operations</span>
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 