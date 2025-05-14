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
    <section className="py-20 relative overflow-hidden" id="pricing">
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
              Transparent <span className="gradient-text">Pricing</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Choose the perfect package for your video editing needs
            </p>
          </motion.div>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 bg-gray-800 rounded-lg">
            <button
              onClick={() => setSelectedCategory('short')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedCategory === 'short'
                  ? 'bg-gradient-to-r from-vid-red-600 to-vid-orange-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Short-Form
            </button>
            <button
              onClick={() => setSelectedCategory('long')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedCategory === 'long'
                  ? 'bg-gradient-to-r from-vid-red-600 to-vid-orange-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Long-Form
            </button>
            <button
              onClick={() => setSelectedCategory('advertising')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedCategory === 'advertising'
                  ? 'bg-gradient-to-r from-vid-red-600 to-vid-orange-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Advertising
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activePricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`card-hover rounded-xl overflow-hidden relative ${
                plan.popular ? 'border-vid-red-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-vid-red-600 to-vid-orange-500 text-white text-center text-xs py-1 font-medium">
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
                    <div className="text-3xl font-bold text-white">USD {plan.price.toFixed(2)}</div>
                    <div className="text-sm text-gray-400">one-time</div>
                  </div>
                </div>
                
                <p className="text-gray-400 text-sm mb-5">
                  {plan.description}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-start text-sm">
                      <svg className="h-5 w-5 text-vid-red-500 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="text-sm flex items-center justify-between mb-6 pb-6 border-t border-gray-800 pt-4">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-vid-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-300">Delivery in {plan.delivery}</span>
                  </div>
                </div>
                
                <Link 
                  href={`/checkout?package=${encodeURIComponent(plan.name)}&price=${plan.price}&category=${encodeURIComponent(selectedCategory)}`}
                  className={`block text-center py-2.5 rounded-lg font-medium transition-colors ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-vid-red-600 to-vid-orange-500 text-white button-glow' 
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                >
                  Select Package
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link 
            href="/pricing" 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-vid-red-600 to-vid-orange-500 text-white rounded-lg font-medium button-glow"
          >
            View All Packages
          </Link>
        </div>
      </div>
    </section>
  );
} 