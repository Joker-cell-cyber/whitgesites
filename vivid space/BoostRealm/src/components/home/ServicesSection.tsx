"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ServicesSection() {
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      id: "wow",
      title: "World of Warcraft",
      description: "Dominate Azeroth with our elite power leveling, raid carries, and mythic+ dungeon boosts.",
      icon: "🛡️",
      features: [
        "Mythic+ Dungeon Carries (All Keys)",
        "Raid Heroic/Mythic Boosts",
        "PvP Rating Push (2400+)",
        "Rare Mount/Transmog Farms"
      ],
      level: "A-TIER",
      color: "#9333ea"
    },
    {
      id: "diablo",
      title: "Diablo 4",
      description: "Crush the leaderboards with our pro boosting for season journeys, Helltide farming, and gear min-maxing.",
      icon: "🔥",
      features: [
        "Top 1% Ladder Push",
        "Uber Boss Farming",
        "Perfect Roll Gear Farming",
        "Nightmare Dungeon Carries"
      ],
      level: "A-TIER",
      color: "#dc2626"
    },
    {
      id: "runescape",
      title: "Runescape",
      description: "Max your account with our pro OSRS and RS3 skill grinding, raid carries, and high-efficiency gold farming.",
      icon: "⚔️",
      features: [
        "Inferno Cape Services",
        "TOB/COX Raid Carries",
        "Max Cape Efficiency Grind",
        "200M XP Skill Mastery"
      ],
      level: "S-TIER",
      color: "#f59e0b"
    },
    {
      id: "genshin",
      title: "Genshin Impact",
      description: "Maximize your account with our expert Spiral Abyss carries, artifact optimization, and primogem farming.",
      icon: "✨",
      features: [
        "36-Star Spiral Abyss Clear",
        "Perfect Artifact Farming",
        "Character Material Speed-Runs",
        "Battle Pass/Event Quick-Complete"
      ],
      level: "A-TIER",
      color: "#0ea5e9"
    },
    {
      id: "dofus",
      title: "Dofus",
      description: "Demolish your opponents with our high-tier dungeon clears, Kamas farming, and PvP rank pushing.",
      icon: "🌟",
      features: [
        "1B+ Kamas Ultra Farming",
        "200 Level Speed Boosting",
        "Dofus Quest Completions",
        "PvP Rank Ladder Climbing"
      ],
      level: "B-TIER",
      color: "#10b981"
    },
    {
      id: "eve",
      title: "EVE Online",
      description: "Conquer the galaxy with our ISK ultra-farming, resource exploitation, and fleet warfare tactics.",
      icon: "🚀",
      features: [
        "Trillion ISK Farming Methods",
        "Capital Ship Acquisition",
        "Nullsec Territory Control",
        "Alliance Warfare Support"
      ],
      level: "S-TIER",
      color: "#3b82f6"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.3 } }
  };

  return (
    <section className="py-24 bg-[#020308] relative overflow-hidden" id="services">
      {/* Background dot pattern */}
      <div className="absolute inset-0" 
        style={{
          backgroundImage: `radial-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}>
      </div>
      
      {/* Glowing background elements */}
      <div className="absolute -top-20 -left-20 w-1/3 h-1/3 bg-[#0ff] rounded-full filter blur-[170px] opacity-5"></div>
      <div className="absolute -bottom-20 -right-20 w-1/3 h-1/3 bg-[#0ff] rounded-full filter blur-[170px] opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        {/* Section header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block py-1 px-4 text-xs font-medium bg-[#0a1a1a] text-[#0ff] border border-[#0ff]/20 rounded-md mb-4">
            PREMIUM SERVICES
          </span>
          <h2 className="text-6xl font-bold mb-8 text-[#0ff]">
            ELITE GAMING SERVICES
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Hardcore boosting for serious gamers. Skip the grind, maximize efficiency, dominate the competition.
          </p>
        </motion.div>
        
        {/* Interactive Services UI */}
        <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Left side - Service details */}
          <div className="w-full lg:w-2/3 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="lg:min-h-[400px]"
              >
                <div className="p-8 rounded-xl bg-[#07111c]/80 border border-[#172233] backdrop-blur-sm relative overflow-hidden">
                  {/* Service level badge */}
                  {services[activeService].level === "A-TIER" && (
                    <div className="absolute top-0 right-0 py-1 px-4 text-xs font-bold bg-[#e22] text-white">
                      {services[activeService].level}
                    </div>
                  )}
                  {services[activeService].level === "S-TIER" && (
                    <div className="absolute top-0 right-0 py-1 px-4 text-xs font-bold bg-[#ffb700] text-black">
                      {services[activeService].level}
                    </div>
                  )}
                  {services[activeService].level === "B-TIER" && (
                    <div className="absolute top-0 right-0 py-1 px-4 text-xs font-bold bg-[#1e90ff] text-white">
                      {services[activeService].level}
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="flex items-start gap-4 mb-8">
                    <div 
                      className="flex-shrink-0 w-14 h-14 flex items-center justify-center text-2xl rounded-lg bg-[#0c1824]"
                    >
                      {services[activeService].icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {services[activeService].title}
                      </h3>
                      <p className="text-gray-400">
                        {services[activeService].description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Feature list */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    {services[activeService].features.map((feature, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 + 0.2 }}
                        className="flex items-start gap-3 p-3"
                      >
                        <div className="mt-1 w-4 h-4 flex-shrink-0 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-[#e22]"></div>
                        </div>
                        <p className="text-gray-300 text-sm">{feature}</p>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Service CTA */}
                  <div className="mt-10 flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-[#e22] animate-pulse mr-2"></span>
                      <span className="text-gray-500 text-xs">BOOSTERS ONLINE</span>
                    </div>
                    <a 
                      href="#pricing" 
                      className="py-2 px-6 rounded text-white font-medium transition-all duration-300 hover:opacity-80 bg-[#e22]"
                    >
                      View Pricing
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Right side - Service selection */}
          <div className="w-full lg:w-1/3">
            <motion.div 
              className="space-y-2"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {services.map((service, index) => (
                <motion.button
                  key={service.id}
                  variants={itemVariants}
                  onClick={() => setActiveService(index)}
                  className={`flex items-center w-full text-left p-4 rounded-lg transition-all duration-300 ${activeService === index ? 'bg-[#131f2f]' : 'bg-[#070b15]/50 hover:bg-[#0a1320]'}`}
                  style={{
                    borderLeft: activeService === index ? '4px solid #0ff' : '4px solid transparent',
                  }}
                >
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-xl rounded mr-4 bg-[#0c1824]">
                    {service.icon}
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-white font-medium">{service.title}</h4>
                    <p className="text-gray-500 text-sm text-ellipsis overflow-hidden whitespace-nowrap max-w-[200px]">{service.description.substring(0, 60)}...</p>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>
        
        {/* Main CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <a 
            href="#pricing" 
            className="inline-block px-10 py-4 font-semibold text-white rounded-lg bg-[#0ff] text-black hover:bg-[#00d8d8] transition-all duration-300"
          >
            VIEW ALL PACKAGES
          </a>
        </motion.div>
      </div>
    </section>
  );
} 