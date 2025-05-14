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
        name: "Standard",
        price: 19.50,
        volume: "Up to 1000 words",
        features: [
          "Simple documents",
          "1 target language",
          "Standard delivery"
        ]
      },
      {
        name: "Advanced",
        price: 29.90,
        volume: "Up to 2000 words",
        features: [
          "Business documents",
          "1 target language",
          "3-day delivery"
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
        name: "Premium",
        price: 49.90,
        volume: "Up to 10000 words",
        features: [
          "All document types",
          "2 target languages",
          "48-hour delivery"
        ]
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
        name: "Standard",
        price: 39.99,
        volume: "Up to 15 minutes",
        features: [
          "Standard subtitles",
          "1 target language",
          "Standard delivery"
        ]
      },
      {
        name: "Advanced",
        price: 59.50,
        volume: "Up to 30 minutes",
        features: [
          "Advanced subtitles",
          "1 target language",
          "5-day delivery"
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
        name: "Premium",
        price: 109.90,
        volume: "Up to 90 minutes",
        features: [
          "Premium subtitles",
          "2 target languages",
          "48-hour delivery"
        ]
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
    <section className="py-28 relative overflow-hidden" id="pricing">
      {/* Background elements */}
      <div className="absolute inset-0 bg-slate-950">
        <div className="absolute w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(56,189,248,0.1),transparent_50%)]"></div>
        <div className="absolute w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,rgba(139,92,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-slate-950/30 backdrop-blur-sm"></div>
      </div>
      
      {/* Animated patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full opacity-10"
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a5b4fc' fill-opacity='0.1'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
             }}
        ></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-indigo-950 border border-indigo-800/50 text-indigo-300 text-sm font-medium mb-4">
            Affordable Options
          </span>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-sky-300 via-indigo-300 to-purple-300">
            Translation Packages
          </h2>
          
          <p className="text-lg text-slate-300">
            Choose the perfect package for your needs with our all-inclusive pricing.
          </p>
        </motion.div>
        
        {/* Pricing Toggle */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-16"
        >
          <div className="p-1.5 rounded-full bg-slate-900/80 backdrop-blur-sm border border-slate-800 shadow-inner shadow-black/20">
            <div className="relative flex">
              <button
                onClick={() => setSelectedCategory('text')}
                className={`relative z-10 px-6 py-3 rounded-full font-medium text-base transition-colors duration-200 ${
                  selectedCategory === 'text' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Text Translation
              </button>
              
              <button
                onClick={() => setSelectedCategory('video')}
                className={`relative z-10 px-6 py-3 rounded-full font-medium text-base transition-colors duration-200 ${
                  selectedCategory === 'video' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Video Translation
              </button>
              
              {/* Animated selection pill */}
              <div 
                className="absolute inset-y-0 w-1/2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 shadow-lg transition-transform duration-300 ease-out"
                style={{ 
                  transform: selectedCategory === 'text' ? 'translateX(0)' : 'translateX(100%)',
                }}
              ></div>
            </div>
          </div>
        </motion.div>
        
        {/* Pricing Cards */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activePricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className={`relative group ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
              >
                {/* Card glow effect */}
                <div className={`absolute -inset-0.5 rounded-2xl 
                  ${plan.popular 
                    ? 'bg-gradient-to-r from-sky-500 to-indigo-600 opacity-70 group-hover:opacity-100' 
                    : 'bg-gradient-to-r from-slate-700 to-slate-600 opacity-50 group-hover:opacity-80'} 
                  blur-sm transition duration-300`}
                ></div>
                
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-5 inset-x-0 flex justify-center">
                    <div className="bg-gradient-to-r from-sky-500 to-indigo-600 text-white text-sm font-medium px-4 py-1.5 rounded-full shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className={`relative h-full rounded-2xl p-8 
                  ${plan.popular 
                    ? 'bg-slate-900/90 border-indigo-500/30' 
                    : 'bg-slate-900/70 border-slate-700/50'} 
                  backdrop-blur-sm border flex flex-col`}
                >
                  <div className="mb-5">
                    <h3 className={`text-2xl font-bold 
                      ${plan.popular 
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400' 
                        : 'text-white'}`}
                    >
                      {plan.name}
                    </h3>
                    
                    <div className="mt-2 flex items-baseline">
                      <span className="text-4xl font-extrabold text-white">${plan.price}</span>
                      <span className="ml-2 text-slate-400">
                        {selectedCategory === 'text' ? '/project' : '/video'}
                      </span>
                    </div>
                    
                    <p className="mt-2 text-slate-400">{plan.volume}</p>
                  </div>
                  
                  <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent my-5"></div>
                  
                  <ul className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center">
                        <div className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center 
                          ${plan.popular 
                            ? 'bg-sky-500/20 text-sky-400' 
                            : 'bg-slate-800 text-indigo-400'}`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="ml-3 text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link 
                    href={`/checkout?type=${selectedCategory}&package=${plan.name}`} 
                    className={`w-full py-3 px-6 rounded-xl font-medium text-center
                      ${plan.popular 
                        ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40' 
                        : 'bg-slate-800 text-white border border-slate-700 hover:bg-slate-700'} 
                      transition-all duration-200 hover:-translate-y-0.5`}
                  >
                    Order Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-slate-400 max-w-2xl mx-auto">
            For more options, check our <Link href="/pricing" className="text-indigo-400 hover:text-indigo-300 underline decoration-indigo-700/30 hover:decoration-indigo-500/50 transition-colors">complete pricing page</Link> or <Link href="/contact" className="text-indigo-400 hover:text-indigo-300 underline decoration-indigo-700/30 hover:decoration-indigo-500/50 transition-colors">contact us</Link> for a custom solution.
          </p>
        </motion.div>
      </div>
    </section>
  );
} 