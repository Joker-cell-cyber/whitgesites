"use client";

import { motion } from "framer-motion";
import NeonButton from "@/components/ui/NeonButton";
import Tooltip from "@/components/ui/Tooltip";

export function PricingSection() {
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              <span className="text-[#FF1493] drop-shadow-[0_0_5px_rgba(255,20,147,0.5)]">Transparent</span> <span className="text-white">Pricing</span>
            </h2>
            <p className="text-gray-300 text-lg">
              Choose the perfect overlay package for your streaming channel
            </p>
          </motion.div>
        </div>

        {/* Pricing Cards - Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {pricingPackages.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`card-hover rounded-xl overflow-hidden relative bg-[--cyber-deep]/90 backdrop-blur border ${
                plan.popular ? 'border-[--neon-blue] shadow-[0_0_10px_rgba(0,255,255,0.2)]' : 'border-gray-800/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-[--neon-purple] to-[--neon-blue] text-white text-center text-xs py-1 font-medium">
                  MOST POPULAR
                </div>
              )}
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white drop-shadow-[0_0_2px_rgba(255,255,255,0.5)]">{plan.name}</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white drop-shadow-[0_0_2px_rgba(255,255,255,0.5)]">${plan.price.toFixed(2)}</div>
                    <div className="text-sm text-gray-300">one-time</div>
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm mb-5">
                  {plan.description}
                </p>
                
                <ul className="space-y-2 mb-6 min-h-[160px]">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-start text-sm">
                      <svg className="h-5 w-5 text-[--neon-blue] mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-200">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="text-sm flex items-center justify-between mb-6 pb-6 border-t border-gray-800 pt-4">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-[--neon-blue] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-200">Delivery in {plan.delivery}</span>
                  </div>
                </div>
                
                <a 
                  href={`/checkout?package=${plan.name}`}
                >
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
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <NeonButton 
            onClick={() => window.location.href = '/contact'}
            variant="outline"
            color="pink"
          >
            Need a Custom Package?
          </NeonButton>
        </div>
      </div>
    </section>
  );
} 