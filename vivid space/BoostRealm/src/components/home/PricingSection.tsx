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
    <section className="py-24 bg-gradient-to-b from-midnight-blue-900 to-midnight-blue-800 relative" id="pricing">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-500/20 to-transparent"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.2\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block mb-2 px-4 py-1 bg-teal-600/10 rounded-full text-teal-500 text-sm font-medium">
              Pricing Plans
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              POWER <span className="text-teal-500">BOOSTING</span> TIERS
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-teal-600 to-amber-500 mx-auto mb-6"></div>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Select your battle strategy. Pay once, dominate forever. No subscriptions, just pure gaming power.
            </p>
          </motion.div>
        </div>

        {/* Category Selector */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 bg-slate-800 rounded-lg border border-slate-700">
            <button
              className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
                selectedCategory === 'standard' 
                  ? 'bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-white'
              }`}
              onClick={() => setSelectedCategory('standard')}
            >
              Standard
            </button>
            <button
              className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
                selectedCategory === 'premium' 
                  ? 'bg-gradient-to-r from-teal-600 to-amber-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-white'
              }`}
              onClick={() => setSelectedCategory('premium')}
            >
              Premium
            </button>
            <button
              className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
                selectedCategory === 'elite' 
                  ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-white'
              }`}
              onClick={() => setSelectedCategory('elite')}
            >
              Elite
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {activePricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              {plan.popular && (
                <div className="absolute -top-4 inset-x-0 flex justify-center">
                  <div className="bg-gradient-to-r from-teal-600 to-amber-600 text-white text-xs font-bold py-1 px-4 rounded-full">
                    MOST POPULAR
                  </div>
                </div>
              )}
              
              <div className={`h-full rounded-2xl overflow-hidden bg-slate-800 border ${
                plan.popular 
                  ? 'border-teal-600/50 shadow-lg shadow-teal-900/20' 
                  : 'border-slate-700 group-hover:border-slate-600'
              } transition-all duration-300`}>
                <div className="p-6 border-b border-slate-700 bg-slate-900/50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                      <p className="text-slate-400 text-sm">{plan.complexity} • {plan.duration}</p>
                    </div>
                    <div className="bg-slate-800 px-2 py-1 rounded text-xs font-bold text-amber-500 border border-amber-500/30">
                      {plan.tier}
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold text-white">${plan.price}</span>
                      <span className="text-slate-400 ml-1 text-sm">one-time</span>
                    </div>
                    <p className="mt-2 text-sm text-slate-400 line-clamp-2 h-10">{plan.description}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-sm">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-teal-900/30 flex items-center justify-center mr-3 mt-0.5">
                          <svg className="h-3 w-3 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex items-center justify-between text-sm mb-6">
                    <div className="flex items-center text-slate-400">
                      <svg className="h-4 w-4 mr-1 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Delivery: {plan.delivery}
                    </div>
                  </div>
                  
                  <BuyButton 
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-teal-600 to-amber-600 text-white hover:shadow-lg hover:shadow-teal-900/20' 
                        : 'bg-slate-700 text-white hover:bg-slate-600'
                    }`}
                    packageData={plan}
                  >
                    Select Package
                  </BuyButton>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center max-w-3xl mx-auto"
        >
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-2">Need a custom boosting solution?</h3>
            <p className="text-slate-400 mb-4">Contact our elite agents for personalized boosting operations tailored to your exact specifications.</p>
            <a 
              href="/contact" 
              className="inline-flex items-center px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors font-medium"
            >
              <span>Contact Elite Squad</span>
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 