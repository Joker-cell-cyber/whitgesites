"use client";

import { motion } from "framer-motion";
import NeonButton from "@/components/ui/NeonButton";
import Tooltip from "@/components/ui/Tooltip";
import { useState } from "react";

export function PricingSection() {
  const [focusedCard, setFocusedCard] = useState<number | null>(null);
  const [selectedTier, setSelectedTier] = useState<string>("all");
  
  // Define 12 simple pricing packages going from 9.9 to 119.9
  const pricingPackages = [
    {
      name: "Starter",
      price: 9.99,
      description: "Basic stream overlay package for beginners",
      features: [
        "1 simple overlay",
        "1 webcam frame",
        "Basic color scheme",
        "1 revision round"
      ],
      delivery: "3 days"
    },
    {
      name: "Essential",
      price: 19.50,
      description: "Essential stream overlays with improved design",
      features: [
        "2 scene overlays",
        "Matching webcam frame",
        "Stream starting soon screen",
        "2 revision rounds"
      ],
      delivery: "4 days"
    },
    {
      name: "Standard",
      price: 29.90,
      description: "Standard streaming package with custom elements",
      features: [
        "3 scene overlays",
        "Animated webcam frame",
        "Starting & ending screens",
        "Basic alerts package"
      ],
      delivery: "5 days",
      popular: true
    },
    {
      name: "Enhanced",
      price: 39.99,
      description: "Enhanced package with professional design elements",
      features: [
        "3 themed overlays",
        "Animated panels",
        "Custom webcam frame",
        "Social media elements"
      ],
      delivery: "5 days"
    },
    {
      name: "Pro",
      price: 49.90,
      description: "Professional overlays for serious streamers",
      features: [
        "4 scene overlays",
        "Animated transitions",
        "Custom alerts package",
        "Stream panels & banners"
      ],
      delivery: "6 days"
    },
    {
      name: "Elite",
      price: 59.50,
      description: "Elite package with premium animations",
      features: [
        "Full scene package",
        "Custom animated alerts",
        "Transition screens",
        "Chat overlay & bot commands"
      ],
      delivery: "7 days"
    },
    {
      name: "Premium",
      price: 69.99,
      description: "Premium solutions for growing channels",
      features: [
        "Complete scene collection",
        "Animated logo integration",
        "Custom emotes (x3)",
        "Subscriber badges"
      ],
      delivery: "8 days"
    },
    {
      name: "Advanced",
      price: 79.90,
      description: "Advanced solutions with unique visual identity",
      features: [
        "Complete branded package",
        "Dynamic scene transitions",
        "Custom emotes (x5)",
        "Animated info panels"
      ],
      delivery: "9 days"
    },
    {
      name: "Expert",
      price: 89.50,
      description: "Expert-level streaming visuals with animations",
      features: [
        "Complete rebranding package",
        "Advanced animations",
        "Loyalty badges set",
        "Custom sound effects"
      ],
      delivery: "10 days"
    },
    {
      name: "Master",
      price: 99.99,
      description: "Master package for serious content creators",
      features: [
        "Full channel rebranding",
        "Complex animations",
        "Emote package (x8)",
        "Custom alert sounds"
      ],
      delivery: "12 days"
    },
    {
      name: "Ultimate",
      price: 109.90,
      description: "Ultimate streaming package with premium features",
      features: [
        "Complete brand identity",
        "Multi-scene transitions",
        "Full emote package (x10)",
        "Custom streaming tools"
      ],
      delivery: "14 days",
      popular: true
    },
    {
      name: "Legendary",
      price: 119.50,
      description: "Legendary package for professional streamers",
      features: [
        "Premium brand identity kit",
        "Cinematic animations",
        "Custom emotes & badges (x12)",
        "Full moderation tools pack"
      ],
      delivery: "15 days"
    }
  ];

  // Group packages into tiers for display
  const basicTier = pricingPackages.slice(0, 4);
  const proTier = pricingPackages.slice(4, 8);
  const premiumTier = pricingPackages.slice(8, 12);

  return (
    <section className="py-32 relative overflow-hidden" id="pricing">
      {/* Background elements */}
      <div className="absolute inset-0 bg-black"></div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-5"></div>
      
      {/* Accent shapes */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-purple-900/10 to-pink-900/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gradient-to-tr from-blue-900/10 to-cyan-900/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-screen-xl mx-auto">
          {/* Section header */}
          <div className="mb-20 relative">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              {/* Asymmetric design element */}
              <div className="absolute -top-20 left-[10%] w-20 h-40 border-l-2 border-t-2 border-white/20"></div>
              <div className="absolute -bottom-10 right-[10%] w-40 h-20 border-r-2 border-b-2 border-white/20"></div>
              
              <div className="relative flex flex-col md:flex-row justify-between items-start md:items-end">
                <div className="mb-8 md:mb-0">
                  <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-500">Transparent</span>
                    <br className="hidden md:block" /> Pricing
                  </h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-rose-500 to-purple-500 mt-4"></div>
                  <p className="text-gray-400 text-lg mt-6 max-w-xl">
                    Choose the perfect overlay package for your streaming channel
                  </p>
                </div>
                
                <div className="flex gap-3 self-start">
                  <div className="px-4 py-1 rounded-full border border-white/20 text-white text-sm font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    Simple
                  </div>
                  <div className="px-4 py-1 rounded-full border border-white/20 text-white text-sm font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    Advanced
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Tier selector tabs */}
          <div className="flex justify-center mb-16">
            <div className="inline-flex p-1 bg-white/5 backdrop-blur-sm rounded-full">
              <button 
                onClick={() => setSelectedTier("all")}
                className={`px-6 py-2 rounded-full ${
                  selectedTier === "all" ? "bg-gradient-to-r from-rose-500 to-purple-500 text-white font-bold" : "text-gray-400 hover:text-white transition-colors"
                }`}
              >
                All Packages
              </button>
              <button 
                onClick={() => setSelectedTier("basic")}
                className={`px-6 py-2 rounded-full ${
                  selectedTier === "basic" ? "bg-gradient-to-r from-rose-500 to-purple-500 text-white font-bold" : "text-gray-400 hover:text-white transition-colors"
                }`}
              >
                Basic
              </button>
              <button 
                onClick={() => setSelectedTier("professional")}
                className={`px-6 py-2 rounded-full ${
                  selectedTier === "professional" ? "bg-gradient-to-r from-rose-500 to-purple-500 text-white font-bold" : "text-gray-400 hover:text-white transition-colors"
                }`}
              >
                Professional
              </button>
              <button 
                onClick={() => setSelectedTier("premium")}
                className={`px-6 py-2 rounded-full ${
                  selectedTier === "premium" ? "bg-gradient-to-r from-rose-500 to-purple-500 text-white font-bold" : "text-gray-400 hover:text-white transition-colors"
                }`}
              >
                Premium
              </button>
            </div>
          </div>

          {/* Basic Tier */}
          <div className={`relative mb-32 ${selectedTier !== "all" && selectedTier !== "basic" ? "hidden" : ""}`}>
            <div className="absolute left-0 top-14 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            
            <div className="text-xl text-white font-bold mb-16 flex items-center">
              <span className="w-3 h-3 rounded-full bg-purple-500 mr-3"></span>
              Basic Tier
              <div className="ml-4 text-sm font-normal text-gray-500 px-3 py-1 border border-gray-800 rounded-full">
                $9.99 - $39.99
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {basicTier.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                  onMouseEnter={() => setFocusedCard(index)}
                  onMouseLeave={() => setFocusedCard(null)}
                >
                  <div 
                    className={`pricing-card relative overflow-hidden border-2 ${
                      plan.popular ? 'border-purple-500' : 'border-white/10'
                    } bg-black backdrop-filter backdrop-blur-sm p-6 transition-all duration-300 ${
                      focusedCard === index ? 'transform -translate-y-2' : ''
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-6 -right-6 w-16 h-16 rotate-45">
                        <div className="absolute bottom-0 w-16 h-8 bg-purple-500 flex items-end justify-center text-white text-xs font-bold pb-1">
                          POPULAR
                        </div>
                      </div>
                    )}
                    
                    <div className="mb-6">
                      <div className="uppercase text-xs font-bold tracking-wider text-gray-400 mb-2">Package</div>
                      <h3 className="text-2xl font-black text-white">{plan.name}</h3>
                    </div>
                    
                    <div className="flex items-baseline mb-6">
                      <span className="text-4xl font-black text-white">${plan.price.toFixed(2)}</span>
                      <span className="text-gray-400 ml-2">one-time</span>
                    </div>
                    
                    <div className="text-sm text-gray-300 mb-5">{plan.description}</div>
                    
                    <div className="space-y-3 min-h-[160px]">
                      {plan.features.map((feature, fidx) => (
                        <div key={fidx} className="flex items-start">
                          <div className="text-purple-500 mr-2 mt-0.5">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="pt-6 mt-6 border-t border-white/10 text-sm">
                      <div className="flex items-center text-gray-300">
                        <svg className="h-4 w-4 text-purple-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Delivery in {plan.delivery}
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <a href={`/checkout?package=${plan.name}`}>
                        {plan.popular ? (
                          <Tooltip text="Notre choix le plus populaire avec tout ce dont vous avez besoin!" color="purple">
                            <NeonButton 
                              color="purple" 
                              variant="solid" 
                              size="md"
                              fullWidth
                            >
                              Select Package
                            </NeonButton>
                          </Tooltip>
                        ) : (
                          <NeonButton 
                            color="blue" 
                            variant="outline" 
                            size="md"
                            fullWidth
                          >
                            Select Package
                          </NeonButton>
                        )}
                      </a>
                    </div>
                    
                    {/* Hover effect */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Pro Tier */}
          <div className={`relative mb-32 ${selectedTier !== "all" && selectedTier !== "professional" ? "hidden" : ""}`}>
            <div className="absolute left-0 top-14 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            
            <div className="text-xl text-white font-bold mb-16 flex items-center">
              <span className="w-3 h-3 rounded-full bg-rose-500 mr-3"></span>
              Professional Tier
              <div className="ml-4 text-sm font-normal text-gray-500 px-3 py-1 border border-gray-800 rounded-full">
                $49.90 - $79.90
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {proTier.map((plan, index) => (
                <motion.div
                  key={index + 4}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                  onMouseEnter={() => setFocusedCard(index + 4)}
                  onMouseLeave={() => setFocusedCard(null)}
                >
                  <div 
                    className={`pricing-card relative overflow-hidden border-2 ${
                      plan.popular ? 'border-rose-500' : 'border-white/10'
                    } bg-black backdrop-filter backdrop-blur-sm p-6 transition-all duration-300 ${
                      focusedCard === index + 4 ? 'transform -translate-y-2' : ''
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-6 -right-6 w-16 h-16 rotate-45">
                        <div className="absolute bottom-0 w-16 h-8 bg-rose-500 flex items-end justify-center text-white text-xs font-bold pb-1">
                          POPULAR
                        </div>
                      </div>
                    )}
                    
                    <div className="mb-6">
                      <div className="uppercase text-xs font-bold tracking-wider text-gray-400 mb-2">Package</div>
                      <h3 className="text-2xl font-black text-white">{plan.name}</h3>
                    </div>
                    
                    <div className="flex items-baseline mb-6">
                      <span className="text-4xl font-black text-white">${plan.price.toFixed(2)}</span>
                      <span className="text-gray-400 ml-2">one-time</span>
                    </div>
                    
                    <div className="text-sm text-gray-300 mb-5">{plan.description}</div>
                    
                    <div className="space-y-3 min-h-[160px]">
                      {plan.features.map((feature, fidx) => (
                        <div key={fidx} className="flex items-start">
                          <div className="text-rose-500 mr-2 mt-0.5">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="pt-6 mt-6 border-t border-white/10 text-sm">
                      <div className="flex items-center text-gray-300">
                        <svg className="h-4 w-4 text-rose-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Delivery in {plan.delivery}
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <a href={`/checkout?package=${plan.name}`}>
                        <NeonButton 
                          color="pink" 
                          variant="outline" 
                          size="md"
                          fullWidth
                        >
                          Select Package
                        </NeonButton>
                      </a>
                    </div>
                    
                    {/* Hover effect */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Premium Tier */}
          <div className={`relative mb-32 ${selectedTier !== "all" && selectedTier !== "premium" ? "hidden" : ""}`}>
            <div className="absolute left-0 top-14 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            
            <div className="text-xl text-white font-bold mb-16 flex items-center">
              <span className="w-3 h-3 rounded-full bg-amber-500 mr-3"></span>
              Premium Tier
              <div className="ml-4 text-sm font-normal text-gray-500 px-3 py-1 border border-gray-800 rounded-full">
                $89.50 - $119.50
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {premiumTier.map((plan, index) => (
                <motion.div
                  key={index + 8}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                  onMouseEnter={() => setFocusedCard(index + 8)}
                  onMouseLeave={() => setFocusedCard(null)}
                >
                  <div 
                    className={`pricing-card relative overflow-hidden border-2 ${
                      plan.popular ? 'border-amber-500' : 'border-white/10'
                    } bg-black backdrop-filter backdrop-blur-sm p-6 transition-all duration-300 ${
                      focusedCard === index + 8 ? 'transform -translate-y-2' : ''
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-6 -right-6 w-16 h-16 rotate-45">
                        <div className="absolute bottom-0 w-16 h-8 bg-amber-500 flex items-end justify-center text-white text-xs font-bold pb-1">
                          POPULAR
                        </div>
                      </div>
                    )}
                    
                    <div className="mb-6">
                      <div className="uppercase text-xs font-bold tracking-wider text-gray-400 mb-2">Package</div>
                      <h3 className="text-2xl font-black text-white">{plan.name}</h3>
                    </div>
                    
                    <div className="flex items-baseline mb-6">
                      <span className="text-4xl font-black text-white">${plan.price.toFixed(2)}</span>
                      <span className="text-gray-400 ml-2">one-time</span>
                    </div>
                    
                    <div className="text-sm text-gray-300 mb-5">{plan.description}</div>
                    
                    <div className="space-y-3 min-h-[160px]">
                      {plan.features.map((feature, fidx) => (
                        <div key={fidx} className="flex items-start">
                          <div className="text-amber-500 mr-2 mt-0.5">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="pt-6 mt-6 border-t border-white/10 text-sm">
                      <div className="flex items-center text-gray-300">
                        <svg className="h-4 w-4 text-amber-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Delivery in {plan.delivery}
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <a href={`/checkout?package=${plan.name}`}>
                        <NeonButton 
                          color="green" 
                          variant="outline" 
                          size="md"
                          fullWidth
                        >
                          Select Package
                        </NeonButton>
                      </a>
                    </div>
                    
                    {/* Hover effect */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        
          {/* Custom CTA */}
          <motion.div 
            className="text-center mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-rose-500 blur-xl opacity-30 rounded-xl"></div>
              <div className="relative py-8 px-12 border border-white/20 rounded-xl">
                <h3 className="text-2xl font-bold text-white mb-4">Need a Custom Package?</h3>
                <p className="text-gray-400 mb-6">We can tailor a solution specifically for your unique requirements</p>
                <NeonButton 
                  onClick={() => window.location.href = '/contact'}
                  variant="outline"
                  color="pink"
                  size="lg"
                >
                  Contact Us for Custom Quote
                </NeonButton>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Custom styles */}
      <style jsx>{`
        .grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        .pricing-card {
          transform-style: preserve-3d;
          backface-visibility: hidden;
          transform: perspective(1000px) translateZ(0);
        }
        
        .pricing-card:hover {
          box-shadow: 0 10px 30px -10px rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </section>
  );
} 