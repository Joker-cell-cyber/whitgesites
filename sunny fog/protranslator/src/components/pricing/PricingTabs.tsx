"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { TranslationCategory, Package } from "@/types/pricing";

export default function PricingTabs() {
  const [selectedCategory, setSelectedCategory] = useState<TranslationCategory>("text");

  // Définition simplifiée des forfaits de prix
  const pricingCategories: Record<TranslationCategory, Package[]> = {
    text: [
      {
        name: "Basic",
        price: 9.99,
        volume: "Up to 500 words",
        features: ["Simple documents", "1 target language", "Standard delivery"]
      },
      {
        name: "Standard",
        price: 19.50,
        volume: "Up to 1000 words",
        features: ["Simple documents", "1 target language", "Standard delivery"]
      },
      {
        name: "Advanced",
        price: 29.90,
        volume: "Up to 2000 words",
        features: ["Business documents", "1 target language", "3-day delivery"]
      },
      {
        name: "Professional",
        price: 39.99,
        volume: "Up to 5000 words",
        features: ["Technical documents", "1 target language", "3-day delivery"],
        popular: true
      },
      {
        name: "Premium",
        price: 49.90,
        volume: "Up to 10000 words",
        features: ["All document types", "2 target languages", "48-hour delivery"]
      },
      {
        name: "Enterprise",
        price: 99.99,
        volume: "15000+ words",
        features: ["All document types", "Up to 3 target languages", "Priority delivery"]
      }
    ],
    video: [
      {
        name: "Basic",
        price: 19.50,
        volume: "Up to 5 minutes",
        features: ["Simple subtitles", "1 target language", "Standard delivery"]
      },
      {
        name: "Standard",
        price: 39.99,
        volume: "Up to 15 minutes",
        features: ["Standard subtitles", "1 target language", "Standard delivery"]
      },
      {
        name: "Advanced",
        price: 59.50,
        volume: "Up to 30 minutes",
        features: ["Advanced subtitles", "1 target language", "5-day delivery"]
      },
      {
        name: "Professional",
        price: 79.90,
        volume: "Up to 60 minutes",
        features: ["Professional subtitles", "1 target language", "3-day delivery"],
        popular: true
      },
      {
        name: "Premium",
        price: 109.90,
        volume: "Up to 90 minutes",
        features: ["Premium subtitles", "2 target languages", "48-hour delivery"]
      },
      {
        name: "Enterprise",
        price: 119.50,
        volume: "120+ minutes",
        features: ["Subtitles + dubbing", "Up to 3 target languages", "Priority delivery"]
      }
    ]
  };
  
  const activePricingPlans = pricingCategories[selectedCategory];

  return (
    <section className="py-20 pt-32 relative overflow-hidden" id="pricing-tabs">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-900/10 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-600/5 to-indigo-500/5 rounded-full transform translate-x-1/4 translate-y-1/4 blur-3xl"></div>
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
              Translation <span className="text-gradient-blue">Pricing</span> Packages
            </h2>
            <p className="text-gray-400 text-lg">
              Professional translation services available in 102 languages
            </p>
          </motion.div>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex space-x-2 p-1 bg-[#1e293b] rounded-xl shadow-lg">
            <button
              onClick={() => setSelectedCategory("text")}
              className={`px-6 py-3 rounded-lg transition-all ${
                selectedCategory === "text"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Text Translation
            </button>
            <button
              onClick={() => setSelectedCategory("video")}
              className={`px-6 py-3 rounded-lg transition-all ${
                selectedCategory === "video"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Video Translation
            </button>
          </div>
        </div>
        
        {/* Pricing Cards Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {activePricingPlans.map((plan: Package, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`rounded-xl overflow-hidden bg-[#1e293b] border ${
                plan.popular
                  ? "border-blue-500/50 shadow-lg shadow-blue-500/10"
                  : "border-gray-700"
              } transition-transform hover:-translate-y-1`}
            >
              {plan.popular && (
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-2 text-center">
                  <p className="text-sm font-medium text-white">Most Popular</p>
                </div>
              )}
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-8">
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white">${plan.price}</div>
                    <div className="text-sm text-gray-400">one-time package</div>
                  </div>
                </div>
                
                <div className="py-4 px-5 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-lg mb-6">
                  <div className="text-center text-lg font-medium text-white">{plan.volume}</div>
                </div>
                
                <div className="mb-6">
                  <ul className="space-y-2">
                    {plan.features.map((feature: string, idx: number) => (
                      <li key={idx} className="text-gray-400 text-sm flex items-start">
                        <svg className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <a 
                  href={`/checkout?type=${selectedCategory}&package=${plan.name}`}
                  className={`block text-center py-3 rounded-lg font-medium transition-colors ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-500 text-white button-glow' 
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                >
                  Order Now
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 