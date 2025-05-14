"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart, Package } from "@/components/checkout/CartContext";

export default function PricingSection() {
  const [selectedTier, setSelectedTier] = useState<'micro' | 'mid' | 'established'>('micro');
  const { setSelectedPackage } = useCart();
  const router = useRouter();

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

  const handleSelectPackage = (pkg: Package) => {
    setSelectedPackage(pkg);
    router.push('/checkout');
  };

  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-gradient-to-b from-stone-950 to-amber-950 py-24"
    >
      {/* Decorative backgrounds */}
      <div className="absolute inset-0 opacity-15 mix-blend-soft-light bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNjAgMEgzMHYzMGgzMHpNMCAzMGgzMHYzMEgweiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDUiIGZpbGwtcnVsZT0ibm9uemVybyIvPjwvc3ZnPg==')]"></div>
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-amber-500/10 to-transparent"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1 rounded-full text-amber-400 text-sm font-medium bg-amber-950 border border-amber-800/40 mb-4">Pricing</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Simple, Transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-300">Pricing</span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-amber-500 to-amber-400 mx-auto mb-6"></div>
            <p className="text-amber-100/80 text-lg max-w-2xl mx-auto">
              Professional UGC creator sourcing for every brand
            </p>
          </motion.div>
        </div>
        
        <div className="max-w-md mx-auto mb-16">
          <div className="relative">
            <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 blur-md opacity-50"></div>
            <div className="relative bg-stone-900/80 backdrop-blur-sm rounded-xl p-1 border border-amber-800/20">
              <div className="flex">
                <button
                  className={`flex-1 py-3 px-4 rounded-lg text-center transition-all duration-300 ${
                    selectedTier === 'micro'
                      ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white font-medium shadow-lg shadow-amber-900/20'
                      : 'text-amber-200 hover:text-white hover:bg-white/5'
                  }`}
                  onClick={() => setSelectedTier('micro')}
                >
                  Micro-Influencers
                </button>
                <button
                  className={`flex-1 py-3 px-4 rounded-lg text-center transition-all duration-300 ${
                    selectedTier === 'mid'
                      ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white font-medium shadow-lg shadow-amber-900/20'
                      : 'text-amber-200 hover:text-white hover:bg-white/5'
                  }`}
                  onClick={() => setSelectedTier('mid')}
                >
                  Mid-Tier
                </button>
                <button
                  className={`flex-1 py-3 px-4 rounded-lg text-center transition-all duration-300 ${
                    selectedTier === 'established'
                      ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white font-medium shadow-lg shadow-amber-900/20'
                      : 'text-amber-200 hover:text-white hover:bg-white/5'
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
          className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto"
          key={selectedTier}
        >
          {pricingPackages[selectedTier].map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative ${pkg.recommended ? 'md:-mt-4 md:mb-4' : ''}`}
            >
              <div className={`h-full rounded-2xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02] ${
                pkg.recommended ? 'z-10' : ''
              }`}>
                {/* Background glow for recommended */}
                {pkg.recommended && (
                  <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-400 blur-sm opacity-70"></div>
                )}
                
                {/* Card content */}
                <div className="relative h-full flex flex-col bg-stone-900/60 backdrop-blur-sm p-8 rounded-2xl border border-amber-800/20">
                  {/* Recommended badge */}
                  {pkg.recommended && (
                    <div className="absolute -top-5 right-5">
                      <span className="bg-gradient-to-r from-amber-500 to-yellow-400 text-stone-900 text-xs font-bold py-1 px-4 rounded-full">
                        BEST VALUE
                      </span>
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                    <p className="text-amber-200/80">{pkg.description}</p>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-end">
                      <span className="text-4xl font-bold text-white">${pkg.price}</span>
                      <span className="text-amber-300 ml-1 mb-1">/package</span>
                    </div>
                  </div>
                  
                  <div className="flex-grow mb-8">
                    <ul className="space-y-3">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-amber-400 mr-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          <span className="text-amber-100">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <button 
                    onClick={() => handleSelectPackage(pkg)}
                    className={`w-full py-3 px-4 rounded-xl font-medium ${
                      pkg.recommended
                        ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-stone-900 hover:shadow-lg hover:shadow-amber-500/20'
                        : 'bg-stone-800 text-white hover:bg-stone-700'
                    } transition-all duration-300`}
                  >
                    Select Package
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <Link 
            href="/pricing" 
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-white rounded-full font-medium shadow-lg shadow-amber-900/30 hover:shadow-xl hover:shadow-amber-900/40 transition-all duration-300"
          >
            View Full Pricing Details
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 