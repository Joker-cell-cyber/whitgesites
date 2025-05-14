"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SelectPackageButton from "@/components/checkout/SelectPackageButton";

export default function PricingTabs() {
  const [selectedTier, setSelectedTier] = useState<'micro' | 'mid' | 'established'>('micro');

  // Define pricing packages for UGC creator sourcing
  const pricingPackages = {
    micro: [
      {
        name: "Starter",
        price: 9.99,
        description: "Basic UGC sourcing",
        features: [
          "1 UGC creator",
          "Basic vetting",
          "Single niche",
          "7-day delivery"
        ],
        recommended: false,
        tier: 'micro' as const
      },
      {
        name: "Basic",
        price: 19.50,
        description: "Standard UGC sourcing",
        features: [
          "2 UGC creators",
          "Basic vetting",
          "Single niche",
          "7-day delivery"
        ],
        recommended: false,
        tier: 'micro' as const
      },
      {
        name: "Standard",
        price: 29.90,
        description: "Enhanced UGC sourcing",
        features: [
          "3 UGC creators",
          "Enhanced vetting",
          "2 content niches",
          "5-day delivery"
        ],
        recommended: true,
        tier: 'micro' as const
      },
      {
        name: "Premium",
        price: 39.99,
        description: "Premium UGC sourcing",
        features: [
          "4 UGC creators",
          "Advanced vetting",
          "2 content niches",
          "5-day delivery"
        ],
        recommended: false,
        tier: 'micro' as const
      }
    ],
    mid: [
      {
        name: "Basic",
        price: 49.90,
        description: "Basic mid-tier sourcing",
        features: [
          "2 mid-tier creators",
          "Professional vetting",
          "2 content niches",
          "5-day delivery"
        ],
        recommended: false,
        tier: 'mid' as const
      },
      {
        name: "Standard",
        price: 59.50,
        description: "Standard mid-tier sourcing",
        features: [
          "3 mid-tier creators",
          "Advanced vetting",
          "2 content niches",
          "4-day delivery"
        ],
        recommended: false,
        tier: 'mid' as const
      },
      {
        name: "Premium",
        price: 69.99,
        description: "Premium mid-tier sourcing",
        features: [
          "4 mid-tier creators",
          "Advanced vetting",
          "3 content niches",
          "4-day delivery"
        ],
        recommended: true,
        tier: 'mid' as const
      },
      {
        name: "Advanced",
        price: 79.90,
        description: "Advanced mid-tier sourcing",
        features: [
          "5 mid-tier creators",
          "Advanced vetting",
          "3 content niches",
          "3-day delivery"
        ],
        recommended: false,
        tier: 'mid' as const
      }
    ],
    established: [
      {
        name: "Basic",
        price: 89.50,
        description: "Basic established sourcing",
        features: [
          "2 established creators",
          "Premium vetting",
          "Industry specialization",
          "5-day delivery"
        ],
        recommended: false,
        tier: 'established' as const
      },
      {
        name: "Standard",
        price: 99.99,
        description: "Standard established sourcing",
        features: [
          "3 established creators",
          "Premium vetting",
          "Industry specialization",
          "4-day delivery"
        ],
        recommended: false,
        tier: 'established' as const
      },
      {
        name: "Premium",
        price: 109.90,
        description: "Premium established sourcing",
        features: [
          "4 established creators",
          "Premium vetting",
          "Industry specialization",
          "3-day delivery"
        ],
        recommended: true,
        tier: 'established' as const
      },
      {
        name: "Enterprise",
        price: 119.50,
        description: "Enterprise established sourcing",
        features: [
          "5 established creators",
          "Premium vetting",
          "Multiple industries",
          "2-day delivery"
        ],
        recommended: false,
        tier: 'established' as const
      }
    ]
  };

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800" id="pricing">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-indigo-900/50 via-transparent to-indigo-900/50 opacity-40"></div>
        <div className="absolute -top-64 -right-64 w-[40rem] h-[40rem] rounded-full bg-pink-900/20 blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-[30rem] h-[30rem] rounded-full bg-indigo-900/20 blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-pink-500/5 filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full bg-indigo-500/5 filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-soft-light"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-lg blur opacity-20"></div>
              <h2 className="relative text-4xl md:text-5xl font-bold mb-6 z-10 text-white">
                Choose Your <span className="text-pink-400">Package</span>
              </h2>
            </div>
            <div className="h-1 w-20 bg-gradient-to-r from-pink-500 to-indigo-500 mx-auto mb-6"></div>
            <p className="text-indigo-200 text-lg mx-auto max-w-2xl">
              Select the tier that best fits your brand's needs and audience goals. Each package includes carefully vetted creators matched to your brand.
            </p>
          </motion.div>
        </div>
        
        <div className="max-w-md mx-auto mb-16">
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-xl blur opacity-30"></div>
            <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-1">
              <div className="flex">
                <button
                  className={`flex-1 py-3 px-4 rounded-lg text-center transition-all ${
                    selectedTier === 'micro'
                      ? 'bg-gradient-to-r from-pink-600/90 to-indigo-600/90 text-white font-medium shadow-lg shadow-pink-900/20'
                      : 'text-indigo-200 hover:text-white hover:bg-white/5'
                  }`}
                  onClick={() => setSelectedTier('micro')}
                >
                  Micro-Influencers
                </button>
                <button
                  className={`flex-1 py-3 px-4 rounded-lg text-center transition-all ${
                    selectedTier === 'mid'
                      ? 'bg-gradient-to-r from-pink-600/90 to-indigo-600/90 text-white font-medium shadow-lg shadow-pink-900/20'
                      : 'text-indigo-200 hover:text-white hover:bg-white/5'
                  }`}
                  onClick={() => setSelectedTier('mid')}
                >
                  Mid-Tier
                </button>
                <button
                  className={`flex-1 py-3 px-4 rounded-lg text-center transition-all ${
                    selectedTier === 'established'
                      ? 'bg-gradient-to-r from-pink-600/90 to-indigo-600/90 text-white font-medium shadow-lg shadow-pink-900/20'
                      : 'text-indigo-200 hover:text-white hover:bg-white/5'
                  }`}
                  onClick={() => setSelectedTier('established')}
                >
                  Established
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Price cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          key={selectedTier}
        >
          {pricingPackages[selectedTier].map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative h-full"
            >
              <div className={`relative group h-full rounded-xl overflow-hidden transition-all duration-300 ${
                pkg.recommended ? 'scale-105 z-10' : 'hover:scale-[1.03]'
              }`}>
                {/* Background gradient */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                
                {/* Border glow for recommended package */}
                {pkg.recommended && (
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-xl blur-sm opacity-70 group-hover:opacity-100 transition-opacity"></div>
                )}
                
                {/* Card content */}
                <div className="relative h-full flex flex-col backdrop-blur-sm p-6 rounded-xl border border-white/20">
                  {/* Recommended badge */}
                  {pkg.recommended && (
                    <div className="absolute -top-5 -right-5">
                      <div className="relative w-28 h-28 overflow-hidden">
                        <div className="absolute top-14 left-6 transform rotate-45 bg-pink-500 text-white text-xs font-bold py-1 px-10 text-center">
                          BEST VALUE
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                    <p className="text-indigo-200 text-sm min-h-[40px]">{pkg.description}</p>
                    <div className="mt-4 flex items-end">
                      <span className="text-3xl font-bold text-white">${pkg.price}</span>
                      <span className="text-indigo-300 ml-1 text-sm">/package</span>
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <ul className="space-y-3 mb-10">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-start text-sm">
                          <svg className="w-5 h-5 text-pink-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-indigo-200">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <SelectPackageButton pkg={pkg} recommended={pkg.recommended} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 
