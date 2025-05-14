"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type ExperienceLevel = "beginner" | "intermediate" | "advanced";

export default function PricingTabs() {
  const [selectedCategory, setSelectedCategory] = useState<ExperienceLevel>("beginner");

  // Define pricing tiers matching the homepage
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
    <section className="py-20 relative overflow-hidden" id="pricing-tabs">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/3 right-[15%] w-64 h-64 bg-beat-purple-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 left-[10%] w-72 h-72 bg-beat-gold-500/10 rounded-full filter blur-3xl"></div>
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
              Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-beat-purple-500 to-beat-gold-500">Coaching Package</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Personalized coaching sessions tailored to your specific production goals and skill level.
            </p>
          </motion.div>
        </div>

        {/* Category Selection */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
            onClick={() => setSelectedCategory('beginner')}
            className={`px-6 py-3 rounded-lg transition-all ${
              selectedCategory === 'beginner'
                ? 'bg-gradient-to-r from-beat-purple-600 to-beat-gold-500 text-white font-medium'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Beginner
            </button>
            <button
            onClick={() => setSelectedCategory('intermediate')}
            className={`px-6 py-3 rounded-lg transition-all ${
              selectedCategory === 'intermediate'
                ? 'bg-gradient-to-r from-beat-purple-600 to-beat-gold-500 text-white font-medium'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Intermediate
            </button>
            <button
            onClick={() => setSelectedCategory('advanced')}
            className={`px-6 py-3 rounded-lg transition-all ${
              selectedCategory === 'advanced'
                ? 'bg-gradient-to-r from-beat-purple-600 to-beat-gold-500 text-white font-medium'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Advanced
            </button>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {activePricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`card-hover rounded-xl p-6 flex flex-col h-full ${
                plan.popular ? 'border-beat-purple-500/30 ring-1 ring-beat-purple-500/20' : ''
              }`}
            >
              {plan.popular && (
                <div className="bg-gradient-to-r from-beat-purple-600 to-beat-gold-500 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full inline-block self-start mb-4">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>

                <div className="mb-4">
                <span className="text-3xl font-bold">${plan.price}</span>
                <span className="text-gray-400"> / session</span>
                </div>
                
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-beat-purple-500/20 text-beat-purple-400 text-xs font-medium py-1 px-2 rounded">
                  {plan.level}
                </div>
                <div className="bg-gray-800 text-gray-300 text-xs font-medium py-1 px-2 rounded">
                  {plan.duration}
                </div>
              </div>
              
              <p className="text-gray-400 mb-6">{plan.description}</p>
              
              <div className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start">
                    <svg className="w-5 h-5 text-beat-purple-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
                </div>
                
              <div className="mt-auto">
                <a 
                  href={`/checkout?name=${encodeURIComponent(plan.name)}&price=${plan.price}&level=${encodeURIComponent(plan.level)}&duration=${encodeURIComponent(plan.duration)}`}
                  className="w-full px-4 py-3 bg-gradient-to-r from-beat-purple-600 to-beat-gold-500 hover:from-beat-purple-700 hover:to-beat-gold-600 text-white font-medium rounded-lg transition-colors button-glow flex items-center justify-center"
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