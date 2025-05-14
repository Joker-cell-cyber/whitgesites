"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function PricingSection() {
  const [selectedCategory, setSelectedCategory] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');

  // Define pricing tiers
  const pricingCategories = {
    beginner: [
      {
        name: "Single Session",
        price: 9.99,
        duration: "1 hour",
        level: "Beginner",
        description: "Quick guidance for beginner beatmakers",
        features: [
          "1-hour video call session",
          "Basic beat analysis",
          "Introductory mixing tips",
          "Core production fundamentals"
        ],
        delivery: "Scheduling within 5 days"
      },
      {
        name: "Beginner Package",
        price: 19.50,
        duration: "1.5 hours",
        level: "Beginner+",
        description: "Personalized session for basic improvement",
        features: [
          "90-minute coaching call",
          "Analysis of one track",
          "Basic technique instruction",
          "DAW workflow optimization"
        ],
        delivery: "Scheduling within 5 days",
        popular: true
      },
      {
        name: "Starter Growth",
        price: 29.90,
        duration: "2 hours",
        level: "Beginner-to-Intermediate",
        description: "Extended session for beginners ready to level up",
        features: [
          "2-hour in-depth coaching",
          "Analysis of two tracks",
          "Personalized technique tutorials",
          "Beat structure fundamentals"
        ],
        delivery: "Scheduling within 3 days"
      },
      {
        name: "Beginner Intensive",
        price: 119.50,
        duration: "6 hours",
        level: "Beginner Immersion",
        description: "Comprehensive multi-session program for beginners",
        features: [
          "6 hours total coaching time",
          "Multiple track analysis",
          "Complete production workflow",
          "Beat creation from scratch",
          "Sound selection masterclass"
        ],
        delivery: "Scheduling within 7 days"
      }
    ],
    intermediate: [
      {
        name: "Composition Focus",
        price: 39.99,
        duration: "2 hours",
        level: "Intermediate",
        description: "Specialized guidance on beat composition",
        features: [
          "2-hour focused coaching",
          "Composition technique review",
          "Structure optimization",
          "Rhythm and melody development"
        ],
        delivery: "Scheduling within 5 days"
      },
      {
        name: "Sound Design Package",
        price: 49.90,
        duration: "2.5 hours",
        level: "Intermediate",
        description: "Master the art of creating unique sounds",
        features: [
          "2.5-hour specialized coaching",
          "Sound design techniques",
          "Synthesis fundamentals",
          "Effect processing chains",
          "Sample manipulation"
        ],
        delivery: "Scheduling within 5 days",
        popular: true
      },
      {
        name: "Mix Enhancement",
        price: 59.50,
        duration: "3 hours",
        level: "Intermediate",
        description: "Transform your mixing approach for better results",
        features: [
          "3-hour mix-focused session",
          "Complete mix analysis",
          "EQ & compression techniques",
          "Spatial processing guidance",
          "Mix workflow optimization"
        ],
        delivery: "Scheduling within 4 days"
      },
      {
        name: "Producer Growth Plan",
        price: 69.99,
        duration: "3 hours",
        level: "Intermediate-to-Advanced",
        description: "Comprehensive skill development for serious producers",
        features: [
          "3-hour comprehensive session",
          "Three-track detailed review",
          "Advanced technique instruction",
          "Plugin efficiency training",
          "Genre-specific production tips"
        ],
        delivery: "Scheduling within 3 days"
      }
    ],
    advanced: [
      {
        name: "Professional Mix",
        price: 79.90,
        duration: "3 hours",
        level: "Advanced",
        description: "Master-level mixing techniques for professionals",
        features: [
          "3-hour expert-level session",
          "Pro mixing workflow review",
          "Advanced signal processing",
          "Dynamic mixing techniques",
          "Commercial standard guidance"
        ],
        delivery: "Scheduling within 7 days"
      },
      {
        name: "Advanced Production",
        price: 89.50,
        duration: "4 hours",
        level: "Advanced",
        description: "Elevate your production to professional quality",
        features: [
          "4-hour production masterclass",
          "Full arrangement analysis",
          "Advanced sound design review",
          "Production workflow optimization",
          "Specific genre techniques"
        ],
        delivery: "Scheduling within 7 days",
        popular: true
      },
      {
        name: "Industry Ready",
        price: 99.99,
        duration: "4 hours",
        level: "Professional",
        description: "Prepare your work for industry submission",
        features: [
          "4-hour industry preparation",
          "Commercial viability assessment",
          "Genre-specific enhancements",
          "Industry standard comparison",
          "Release preparation guidance"
        ],
        delivery: "Scheduling within 5 days"
      },
      {
        name: "Artist Development",
        price: 109.90,
        duration: "5 hours",
        level: "Professional",
        description: "Comprehensive career-focused production development",
        features: [
          "5-hour elite coaching package",
          "Complete artist sound development",
          "Multiple track portfolio review",
          "Personal brand sound definition",
          "Long-term development planning"
        ],
        delivery: "Scheduling within 10 days"
      }
    ]
  };
  
  const activePricingPlans = pricingCategories[selectedCategory];

  return (
    <section className="py-24 bg-[#080818]" id="pricing">
      {/* 3D Angled background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div 
          className="absolute w-full h-full bg-gradient-to-br from-beat-purple-900/10 to-beat-gold-900/5"
          style={{ transform: 'skewY(-6deg)', transformOrigin: 'top left' }}
        ></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <div className="inline-flex items-center justify-center p-1 px-3 rounded-full bg-beat-gold-500/10 border border-beat-gold-500/20 text-beat-gold-400 text-sm font-medium mb-6">
              Flexible Options
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Choose Your <span className="text-beat-purple-400">Coaching</span> Package
            </h2>
            <p className="text-lg text-gray-400">
              Personalized coaching sessions tailored to your specific production goals and skill level.
            </p>
          </motion.div>
          
          {/* Category Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:self-end"
          >
            <div className="bg-black/30 backdrop-blur-sm p-1.5 rounded-xl border border-gray-800/60 inline-flex">
              <button
                onClick={() => setSelectedCategory('beginner')}
                className={`relative px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedCategory === 'beginner'
                    ? 'text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {selectedCategory === 'beginner' && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-beat-purple-600 to-beat-gold-500 rounded-lg -z-10"
                    transition={{ type: 'spring', duration: 0.5 }}
                  />
                )}
                Beginner
              </button>
              <button
                onClick={() => setSelectedCategory('intermediate')}
                className={`relative px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedCategory === 'intermediate'
                    ? 'text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {selectedCategory === 'intermediate' && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-beat-purple-600 to-beat-gold-500 rounded-lg -z-10"
                    transition={{ type: 'spring', duration: 0.5 }}
                  />
                )}
                Intermediate
              </button>
              <button
                onClick={() => setSelectedCategory('advanced')}
                className={`relative px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedCategory === 'advanced'
                    ? 'text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {selectedCategory === 'advanced' && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-beat-purple-600 to-beat-gold-500 rounded-lg -z-10"
                    transition={{ type: 'spring', duration: 0.5 }}
                  />
                )}
                Advanced
              </button>
            </div>
          </motion.div>
        </div>

        {/* Featured plan */}
        {activePricingPlans.map((plan, index) => plan.popular && (
          <motion.div
            key={`featured-${plan.name}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16 relative z-10"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-beat-purple-600/20 to-beat-gold-500/20 rounded-2xl blur-xl opacity-70 transform scale-105"></div>
            <div className="relative overflow-hidden backdrop-blur-sm rounded-2xl border border-beat-purple-500/20 bg-gradient-to-b from-gray-900/80 to-black/80">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-beat-purple-500 to-beat-gold-500"></div>
              <div className="p-8 grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
                <div className="lg:col-span-2">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-beat-purple-500/20 border border-beat-purple-500/30 text-beat-purple-400 text-sm font-medium mb-4">
                    Most Popular
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 mb-4 text-lg">{plan.description}</p>
                  
                  <div className="flex items-baseline mb-6">
                    <span className="text-4xl font-bold text-white">${plan.price}</span>
                    <span className="text-gray-400 ml-2">/ session</span>
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-beat-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span className="text-gray-300">{plan.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-beat-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                      <span className="text-gray-300">{plan.level}</span>
                    </div>
                  </div>
                  
                  <a 
                    href={`/checkout?name=${encodeURIComponent(plan.name)}&price=${plan.price}&level=${encodeURIComponent(plan.level)}&duration=${encodeURIComponent(plan.duration)}`}
                    className="inline-flex items-center px-6 py-3 bg-beat-purple-500 hover:bg-beat-purple-600 text-white rounded-lg shadow-lg shadow-beat-purple-500/20 font-medium transition-all"
                  >
                    Book Now
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
                
                <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-beat-purple-500/20 text-beat-purple-400 flex items-center justify-center mr-3">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                  <div className="md:col-span-2 flex items-center mt-4 bg-gray-800/30 rounded-lg p-3">
                    <svg className="w-5 h-5 text-beat-gold-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span className="text-gray-400">{plan.delivery}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Other plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activePricingPlans.map((plan) => !plan.popular && (
            <motion.div
              key={`other-${plan.name}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-b from-[#121220] to-[#0a0a14] border border-gray-800/50 rounded-xl p-6 flex flex-col h-full hover:border-beat-purple-500/20 transition-all duration-300 group"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                <div className="px-2 py-1 bg-gray-800 rounded text-xs font-medium text-gray-400">
                  {plan.level}
                </div>
              </div>
              
              <p className="text-gray-400 mb-4">{plan.description}</p>
              
              <div className="flex items-center mb-6">
                <span className="text-3xl font-bold text-white">${plan.price}</span>
                <span className="text-gray-500 ml-2">/ session</span>
                <span className="ml-auto text-sm text-gray-400">{plan.duration}</span>
              </div>
              
              <div className="space-y-3 mb-8 flex-grow">
                {plan.features.slice(0, 3).map((feature, i) => (
                  <div key={i} className="flex items-center">
                    <svg className="w-5 h-5 text-beat-purple-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
                
                {plan.features.length > 3 && (
                  <details className="pt-2">
                    <summary className="text-beat-purple-400 hover:text-beat-purple-300 transition-colors cursor-pointer text-sm">
                      + {plan.features.length - 3} more features
                    </summary>
                    <div className="pt-3 space-y-3">
                      {plan.features.slice(3).map((feature, i) => (
                        <div key={i} className="flex items-center">
                          <svg className="w-5 h-5 text-beat-purple-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </details>
                )}
              </div>
              
              <div className="text-xs text-gray-500 mb-6">
                {plan.delivery}
              </div>
              
              <div className="mt-auto">
                <a 
                  href={`/checkout?name=${encodeURIComponent(plan.name)}&price=${plan.price}&level=${encodeURIComponent(plan.level)}&duration=${encodeURIComponent(plan.duration)}`}
                  className="w-full px-4 py-3 border border-beat-purple-500/30 text-beat-purple-400 hover:bg-beat-purple-500/10 group-hover:border-beat-purple-500/50 transition-colors rounded-lg flex items-center justify-center font-medium"
                >
                  Book Session
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 