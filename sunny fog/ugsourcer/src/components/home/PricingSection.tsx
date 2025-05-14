"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart, Package } from "@/components/checkout/CartContext";

export default function PricingSection() {
  const [selectedTier, setSelectedTier] = useState<'short' | 'long' | 'advertising'>('short');
  const { setSelectedPackage } = useCart();
  const router = useRouter();

  // Define pricing packages for video editing
  const pricingPackages = {
    short: [
      {
        name: "Basic",
        price: 19.90,
        description: "Simple short-form content",
        features: [
          "Up to 60 seconds video",
          "Basic cuts & transitions",
          "Simple text overlay",
          "2-day delivery"
        ],
        recommended: false,
        tier: 'micro' as const
      },
      {
        name: "Standard",
        price: 29.90,
        description: "Enhanced short-form videos",
        features: [
          "Up to 60 seconds video",
          "Advanced transitions",
          "Custom text effects",
          "2-day delivery"
        ],
        recommended: true,
        tier: 'micro' as const
      },
      {
        name: "Premium",
        price: 49.90,
        description: "Pro short-form with effects",
        features: [
          "Up to 90 seconds video",
          "Pro editing suite",
          "Motion graphics",
          "1-day delivery"
        ],
        recommended: false,
        tier: 'micro' as const
      }
    ],
    long: [
      {
        name: "Basic",
        price: 59.90,
        description: "Standard long-form editing",
        features: [
          "Up to 10 minutes",
          "Professional cuts",
          "Basic text overlay",
          "5-day delivery"
        ],
        recommended: false,
        tier: 'mid' as const
      },
      {
        name: "Standard",
        price: 89.90,
        description: "Enhanced long-form videos",
        features: [
          "Up to 15 minutes",
          "Advanced transitions",
          "Animated graphics",
          "5-day delivery"
        ],
        recommended: true,
        tier: 'mid' as const
      },
      {
        name: "Premium",
        price: 119.90,
        description: "Complete video production",
        features: [
          "Up to 30 minutes",
          "Cinematic editing",
          "Premium graphics",
          "7-day delivery"
        ],
        recommended: false,
        tier: 'mid' as const
      }
    ],
    advertising: [
      {
        name: "Basic",
        price: 39.90,
        description: "Essential ad content",
        features: [
          "15-30 second spot",
          "Basic showcase",
          "Simple call-to-action",
          "3-day delivery"
        ],
        recommended: false,
        tier: 'established' as const
      },
      {
        name: "Standard",
        price: 69.90,
        description: "Professional ad content",
        features: [
          "15-45 second spot",
          "Advanced presentation",
          "Logo integration",
          "4-day delivery"
        ],
        recommended: true,
        tier: 'established' as const
      },
      {
        name: "Premium",
        price: 99.90,
        description: "Premium commercial editing",
        features: [
          "Up to 60 second spot",
          "Cinematic showcase",
          "Advanced CTA",
          "5-day delivery"
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
      className="relative overflow-hidden bg-gradient-to-b from-black to-gray-900 py-20"
    >
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-center opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Choose the right package for your content needs, with no hidden fees or surprises
          </p>
        </div>
        
        <div className="max-w-md mx-auto mb-16">
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-vid-red-500 to-vid-orange-500 rounded-xl blur opacity-30"></div>
            <div className="relative bg-gradient-to-b from-gray-900/90 to-gray-800/90 rounded-xl p-1 backdrop-blur-xl">
              <div className="flex">
                <button
                  className={`flex-1 py-3 px-4 rounded-lg text-center transition-all ${
                    selectedTier === 'short'
                      ? 'bg-gradient-to-r from-vid-red-600/90 to-vid-orange-500/90 text-white font-medium shadow-lg shadow-vid-red-900/20'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                  onClick={() => setSelectedTier('short')}
                >
                  Short-Form
                </button>
                <button
                  className={`flex-1 py-3 px-4 rounded-lg text-center transition-all ${
                    selectedTier === 'long'
                      ? 'bg-gradient-to-r from-vid-red-600/90 to-vid-orange-500/90 text-white font-medium shadow-lg shadow-vid-red-900/20'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                  onClick={() => setSelectedTier('long')}
                >
                  Long-Form
                </button>
                <button
                  className={`flex-1 py-3 px-4 rounded-lg text-center transition-all ${
                    selectedTier === 'advertising'
                      ? 'bg-gradient-to-r from-vid-red-600/90 to-vid-orange-500/90 text-white font-medium shadow-lg shadow-vid-red-900/20'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                  onClick={() => setSelectedTier('advertising')}
                >
                  Advertising
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
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
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
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-800/90 to-black/90"></div>
                
                {/* Border glow for recommended package */}
                {pkg.recommended && (
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-vid-red-500 to-vid-orange-500 rounded-xl blur-sm opacity-70 group-hover:opacity-100 transition-opacity"></div>
                )}
                
                {/* Card content */}
                <div className="relative h-full flex flex-col bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-white/5">
                  {/* Recommended badge */}
                  {pkg.recommended && (
                    <div className="absolute -top-5 -right-5">
                      <div className="relative w-28 h-28 overflow-hidden">
                        <div className="absolute top-14 left-6 transform rotate-45 bg-vid-red-500 text-white text-xs font-bold py-1 px-10 text-center">
                          BEST VALUE
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                    <p className="text-gray-400 text-sm min-h-[40px]">{pkg.description}</p>
                    <div className="mt-4 flex items-end">
                      <span className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">${pkg.price}</span>
                      <span className="text-gray-500 ml-1 text-sm">/video</span>
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <ul className="space-y-3 mb-10">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-start text-sm">
                          <svg className="w-5 h-5 text-vid-red-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <button 
                    onClick={() => handleSelectPackage(pkg)}
                    className={`w-full py-3 px-4 rounded-lg text-center font-medium transition-all duration-300 ${
                      pkg.recommended
                        ? 'bg-gradient-to-r from-vid-red-500 to-vid-orange-500 text-white shadow-lg shadow-vid-red-500/20 hover:shadow-xl hover:shadow-vid-red-500/30'
                        : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                    }`}
                  >
                    Select Package
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* CTA button */}
        <div className="text-center mt-16">
          <Link 
            href="/pricing" 
            className="inline-flex items-center px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
          >
            <span>View all packages</span>
            <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
} 