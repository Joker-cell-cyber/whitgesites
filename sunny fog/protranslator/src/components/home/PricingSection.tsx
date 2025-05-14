"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import type { TranslationCategory, Package } from "@/types/pricing";

export default function PricingSection() {
  const [selectedCategory, setSelectedCategory] = useState<TranslationCategory>('text');

  // Forfaits simplifiés correspondant à ceux de la page pricing
  const pricingCategories: Record<TranslationCategory, Package[]> = {
    text: [
      {
        name: "Basic",
        price: 9.99,
        volume: "Up to 500 words",
        features: [
          "Simple documents",
          "1 target language",
          "Standard delivery"
        ]
      },
      {
        name: "Professional",
        price: 39.99,
        volume: "Up to 5000 words",
        features: [
          "Technical documents",
          "1 target language",
          "3-day delivery"
        ],
        popular: true
      },
      {
        name: "Enterprise",
        price: 99.99,
        volume: "15000+ words",
        features: [
          "All document types",
          "Up to 3 target languages",
          "Priority delivery"
        ]
      }
    ],
    video: [
      {
        name: "Basic",
        price: 19.50,
        volume: "Up to 5 minutes",
        features: [
          "Simple subtitles",
          "1 target language",
          "Standard delivery"
        ]
      },
      {
        name: "Professional",
        price: 79.90,
        volume: "Up to 60 minutes",
        features: [
          "Professional subtitles",
          "1 target language",
          "3-day delivery"
        ],
        popular: true
      },
      {
        name: "Enterprise",
        price: 119.50,
        volume: "120+ minutes",
        features: [
          "Subtitles + dubbing",
          "Up to 3 target languages",
          "Priority delivery"
        ]
      }
    ]
  };
  
  const activePricingPlans = pricingCategories[selectedCategory];

  return (
    <section className="py-20 relative overflow-hidden" id="pricing">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-40 right-[5%] w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 left-[10%] w-80 h-80 bg-indigo-500/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Translation Packages</h2>
          <p className="text-lg text-gray-300">Choose the perfect package for your needs with our all-inclusive pricing.</p>
        </div>
        
        {/* Pricing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 bg-[#1e293b] rounded-lg">
            <button
              onClick={() => setSelectedCategory('text')}
              className={`px-5 py-2 rounded-md transition-all font-medium ${
                selectedCategory === 'text'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
              }`}
            >
              Text Translation
            </button>
            <button
              onClick={() => setSelectedCategory('video')}
              className={`px-5 py-2 rounded-md transition-all font-medium ${
                selectedCategory === 'video'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
              }`}
            >
              Video Translation
            </button>
          </div>
        </div>
        
        {/* Simplified Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {activePricingPlans.map((plan: Package, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#1e293b] border border-gray-700 rounded-xl overflow-hidden shadow-lg"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  <span className="text-3xl font-bold text-white">${plan.price}</span>
                </div>
                
                <p className="text-sm text-gray-400 mb-4">{plan.volume}</p>
                
                <div className="border-t border-gray-700 pt-6 mb-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature: string, fidx: number) => (
                      <li key={fidx} className="flex items-start">
                        <svg className="h-5 w-5 text-blue-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Link href={`/checkout?type=${selectedCategory}&package=${plan.name}`} className="block w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:shadow-lg transition-all text-center">
                  Order Now
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Additional Info */}
        <div className="mt-16 text-center max-w-2xl mx-auto">
          <p className="text-gray-400">
            For more options, check our <Link href="/pricing" className="text-blue-400 hover:text-blue-300">complete pricing page</Link> or <Link href="/contact" className="text-blue-400 hover:text-blue-300">contact us</Link> for a custom solution.
          </p>
        </div>
      </div>
    </section>
  );
} 