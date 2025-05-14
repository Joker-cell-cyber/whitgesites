"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function PricingSection() {
  const [selectedCategory, setSelectedCategory] = useState<'short' | 'long' | 'advertising'>('short');

  // Define pricing tiers
  const pricingCategories = {
    short: [
      {
        name: "Basic Short",
        price: 9.99,
        duration: "Up to 30 sec",
        complexity: "Basic",
        description: "Simple edits, perfect for beginners on social media",
        features: [
          "Basic cuts and transitions",
          "Text overlays",
          "Background music",
          "1 revision round"
        ],
        delivery: "48 hours"
      },
      {
        name: "Standard Short",
        price: 19.50,
        duration: "Up to 30 sec",
        complexity: "Standard",
        description: "Enhanced edits with effects for better engagement",
        features: [
          "Dynamic transitions",
          "Basic motion graphics",
          "Sound effects",
          "2 revision rounds"
        ],
        delivery: "48 hours",
        popular: true
      },
      {
        name: "Premium Short",
        price: 29.90,
        duration: "Up to 45 sec",
        complexity: "Advanced",
        description: "Professional edits with advanced effects",
        features: [
          "Premium effects & transitions",
          "Advanced motion graphics",
          "Audio mixing & enhancement",
          "3 revision rounds"
        ],
        delivery: "72 hours"
      },
      {
        name: "Enhanced Short",
        price: 39.99,
        duration: "Up to 60 sec",
        complexity: "Advanced+",
        description: "Professional short videos with premium features",
        features: [
          "Custom text animations",
          "Professional color grading",
          "Music & sound design",
          "1 stock footage clip included"
        ],
        delivery: "72 hours"
      },
      {
        name: "Ultra Short",
        price: 49.90,
        duration: "Up to 60 sec",
        complexity: "Complex",
        description: "Highest quality short-form content that stands out",
        features: [
          "Custom visual effects",
          "Advanced color grading",
          "Professional sound design",
          "Unlimited revisions"
        ],
        delivery: "96 hours"
      }
    ],
    long: [
      {
        name: "Basic Long",
        price: 59.50,
        duration: "Up to 5 min",
        complexity: "Basic",
        description: "Simple long-form video editing for YouTube",
        features: [
          "Basic cuts and transitions",
          "Simple intro/outro",
          "Background music",
          "1 revision round"
        ],
        delivery: "4 days"
      },
      {
        name: "Standard Long",
        price: 69.99,
        duration: "Up to 10 min",
        complexity: "Standard",
        description: "Professional editing for engaging YouTube content",
        features: [
          "Dynamic transitions",
          "Branded intro/outro",
          "Sound design",
          "2 revision rounds"
        ],
        delivery: "5 days",
        popular: true
      },
      {
        name: "Enhanced Long",
        price: 79.90,
        duration: "Up to 12 min",
        complexity: "Advanced",
        description: "Enhanced editing for professional YouTube content",
        features: [
          "Professional transitions",
          "Custom intro/outro",
          "Complete audio enhancement",
          "Animated lower thirds"
        ],
        delivery: "6 days"
      },
      {
        name: "Premium Long",
        price: 99.99,
        duration: "Up to 15 min",
        complexity: "Advanced+",
        description: "High-quality editing for professional content creators",
        features: [
          "Advanced visual effects",
          "Color correction & grading",
          "Custom motion graphics",
          "3 revision rounds"
        ],
        delivery: "7 days"
      },
      {
        name: "Expert Long",
        price: 109.90,
        duration: "Up to 15 min",
        complexity: "Professional",
        description: "Expert-level editing for high-end content creators",
        features: [
          "Professional color grading",
          "Custom animated titles",
          "Professional sound design",
          "4 revision rounds"
        ],
        delivery: "8 days"
      },
      {
        name: "Ultra Long",
        price: 119.50,
        duration: "Up to 20 min",
        complexity: "Complex",
        description: "Cinematic editing for premium content",
        features: [
          "Cinematic style editing",
          "Advanced motion graphics",
          "Professional color grading",
          "Unlimited revisions"
        ],
        delivery: "10 days"
      }
    ],
    advertising: [
      {
        name: "Basic Ad",
        price: 29.90,
        duration: "Up to 30 sec",
        complexity: "Basic",
        description: "Simple promotional videos for products/services",
        features: [
          "Clean, professional cuts",
          "Text overlays",
          "Background music",
          "1 revision round"
        ],
        delivery: "3 days"
      },
      {
        name: "Standard Ad",
        price: 49.90,
        duration: "Up to 45 sec",
        complexity: "Standard",
        description: "Engaging ads that convert viewers into customers",
        features: [
          "Animated logo",
          "Motion graphics elements",
          "Voice-over integration",
          "2 revision rounds"
        ],
        delivery: "4 days",
        popular: true
      },
      {
        name: "Enhanced Ad",
        price: 59.50,
        duration: "Up to 60 sec",
        complexity: "Standard+",
        description: "Superior advertising content with enhanced features",
        features: [
          "Advanced motion graphics",
          "Professional voice-over",
          "Sound effects package",
          "3 stock footage clips"
        ],
        delivery: "5 days"
      },
      {
        name: "Professional Ad",
        price: 89.50,
        duration: "Up to 90 sec",
        complexity: "Advanced",
        description: "High-impact ads with professional production value",
        features: [
          "Storytelling structure",
          "Custom animations",
          "Professional sound design",
          "3 revision rounds"
        ],
        delivery: "7 days"
      },
      {
        name: "Premium Ad",
        price: 119.50,
        duration: "Up to 2 min",
        complexity: "Complex",
        description: "Broadcast-quality commercial production",
        features: [
          "Cinematic production quality",
          "Advanced visual effects",
          "Complete sound design",
          "Unlimited revisions"
        ],
        delivery: "10 days"
      }
    ]
  };
  
  const activePricingPlans = pricingCategories[selectedCategory];

  return (
    <section className="py-24 relative overflow-hidden" id="pricing">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utb3BhY2l0eT0iMC4wMiIgc3Ryb2tlLXdpZHRoPSIyIj48cGF0aCBkPSJNLTYgMTVoNjBNLTYgMzVoNjBNLTYgNTVoNjBNMTUgLTZoMHY2MG0yMC0rMGgwdi02MCIvPjwvZz48L3N2Zz4=')] opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-900/10 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-64 bg-gradient-to-t from-turquoise-900/10 to-transparent"></div>
        <div className="absolute left-0 top-1/2 w-48 h-48 bg-blue-500/20 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute right-0 top-1/3 w-64 h-64 bg-turquoise-500/20 rounded-full filter blur-3xl opacity-30"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block mb-4">
              <div className="h-1 w-10 bg-blue-500 inline-block mr-2"></div>
              <div className="h-1 w-5 bg-turquoise-500 inline-block"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display">
              Transparent <span className="gradient-text">Pricing</span>
            </h2>
            <p className="text-gray-300 text-lg">
              Choose the perfect package for your video editing needs
            </p>
          </motion.div>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-12">
          <div className="p-1.5 bg-[#22222c] rounded-xl shadow-lg border border-gray-800/50">
            <div className="flex space-x-1">
              <button
                onClick={() => setSelectedCategory('short')}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 font-accent ${
                  selectedCategory === 'short'
                    ? 'bg-gradient-to-r from-blue-600 to-turquoise-500 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                Short-Form
              </button>
              <button
                onClick={() => setSelectedCategory('long')}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 font-accent ${
                  selectedCategory === 'long'
                    ? 'bg-gradient-to-r from-blue-600 to-turquoise-500 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                Long-Form
              </button>
              <button
                onClick={() => setSelectedCategory('advertising')}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 font-accent ${
                  selectedCategory === 'advertising'
                    ? 'bg-gradient-to-r from-blue-600 to-turquoise-500 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                Advertising
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {activePricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className={`relative h-full bg-[#1a1a24] border border-gray-800 rounded-2xl overflow-hidden transition-all duration-300 group-hover:translate-y-[-8px] group-hover:shadow-[0_20px_50px_rgba(32,189,190,0.15)] ${
                plan.popular ? 'border-turquoise-500/50' : ''
              }`}>
                {/* 3D Perspective elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/3 to-turquoise-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute top-0 right-0 pointer-events-none">
                    <div className="w-28 h-28 overflow-hidden">
                      <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-r from-blue-600 to-turquoise-500 shadow-lg transform rotate-45 translate-y-[-40px] translate-x-[40px]">
                        <div className="absolute bottom-[16px] right-[34px] transform rotate-[-45deg] text-white text-xs font-bold font-accent">POPULAR</div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="p-7 relative z-10">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-white font-display group-hover:text-turquoise-300 transition-colors">{plan.name}</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#22222c] text-gray-300 border border-gray-800/50">
                          {plan.duration}
                        </span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#22222c] text-gray-300 border border-gray-800/50">
                          {plan.complexity}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-white font-display">${plan.price.toFixed(2)}</div>
                      <div className="text-xs text-gray-400 font-accent">one-time</div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-5 min-h-[40px]">
                    {plan.description}
                  </p>
                  
                  <div className="mb-6 pt-5 border-t border-gray-800/50">
                    <div className="text-sm font-medium text-white font-accent mb-3">Features</div>
                    <ul className="space-y-3">
                      {plan.features.map((feature, fidx) => (
                        <li key={fidx} className="flex items-start text-sm">
                          <span className="h-5 w-5 flex-shrink-0 text-turquoise-400 mr-3">
                            <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </span>
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between mb-6 pb-6 border-t border-gray-800/50 pt-5">
                    <div className="flex items-center">
                      <span className="h-5 w-5 flex-shrink-0 text-turquoise-400 mr-2">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                      <span className="text-gray-300 text-sm font-accent">Delivery in {plan.delivery}</span>
                    </div>
                  </div>
                  
                  <Link 
                    href={`/checkout?package=${encodeURIComponent(plan.name)}&price=${plan.price}&category=${encodeURIComponent(selectedCategory)}`}
                    className={`block text-center py-3 rounded-lg font-medium transition-all duration-300 font-accent relative z-10 ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-blue-600 to-turquoise-500 text-white hover:shadow-lg hover:shadow-turquoise-500/25' 
                        : 'bg-[#22222c] text-white hover:bg-gradient-to-r hover:from-blue-700 hover:to-turquoise-600'
                    }`}
                  >
                    Select Package
                  </Link>
                </div>
                
                {/* Bottom glass effect */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-blue-500/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link 
            href="/pricing" 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-turquoise-500 text-white rounded-lg font-medium button-glow font-accent"
          >
            View All Packages
          </Link>
        </div>
      </div>
    </section>
  );
} 