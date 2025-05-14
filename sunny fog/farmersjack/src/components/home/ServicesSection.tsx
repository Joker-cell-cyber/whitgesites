"use client";

import { motion } from "framer-motion";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

export default function ServicesSection() {
  const services = [
    {
      title: "World of Warcraft",
      description: "Dominate Azeroth with our elite power leveling, raid carries, and mythic+ dungeon boosts.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      features: [
        "Mythic+ Dungeon Carries (All Keys)",
        "Raid Heroic/Mythic Boosts",
        "PvP Rating Push (2400+)",
        "Rare Mount/Transmog Farms"
      ],
      level: "S-TIER"
    },
    {
      title: "Diablo 4",
      description: "Crush the leaderboards with our pro boosting for season journeys, Helltide farming, and gear min-maxing.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      features: [
        "Top 1% Ladder Push",
        "Uber Boss Farming",
        "Perfect Roll Gear Farming",
        "Nightmare Dungeon Carries"
      ],
      level: "A-TIER"
    },
    {
      title: "Runescape",
      description: "Max your account with our pro OSRS and RS3 skill grinding, raid carries, and high-efficiency gold farming.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
      features: [
        "Inferno Cape Services",
        "TOB/COX Raid Carries",
        "Max Cape Efficiency Grind",
        "200M XP Skill Mastery"
      ],
      level: "S-TIER"
    },
    {
      title: "Genshin Impact",
      description: "Maximize your account with our expert Spiral Abyss carries, artifact optimization, and primogem farming.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      features: [
        "36-Star Spiral Abyss Clear",
        "Perfect Artifact Farming",
        "Character Material Speed-Runs",
        "Battle Pass/Event Quick-Complete"
      ],
      level: "A-TIER"
    },
    {
      title: "Dofus",
      description: "Demolish your opponents with our high-tier dungeon clears, Kamas farming, and PvP rank pushing.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
        </svg>
      ),
      features: [
        "1B+ Kamas Ultra Farming",
        "200 Level Speed Boosting",
        "Dofus Quest Completions",
        "PvP Rank Ladder Climbing"
      ],
      level: "B-TIER"
    },
    {
      title: "EVE Online",
      description: "Conquer the galaxy with our ISK ultra-farming, resource exploitation, and fleet warfare tactics.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      features: [
        "Trillion ISK Farming Methods",
        "Capital Ship Acquisition",
        "Nullsec Territory Control",
        "Alliance Warfare Support"
      ],
      level: "S-TIER"
    }
  ];

  return (
    <section className="py-20 bg-[#0a0e17] relative overflow-hidden" id="services">
      {/* Background grid pattern */}
      <div className="absolute inset-0 hexagon-pattern opacity-10"></div>
      
      {/* Animated particle effects */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#0a0e17] to-transparent z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#0a0e17] to-transparent z-10"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-60 h-1 bg-gradient-to-r from-transparent via-neon-pink-500 to-transparent"></div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              ELITE <span className="neon-text">GAMING</span> SERVICES
            </h2>
            
            <div className="gaming-divider mx-auto w-32 my-5"></div>
            
            <p className="text-gray-400 text-lg">
              Hardcore boosting for serious gamers. Skip the grind, maximize efficiency, dominate the competition.
            </p>
          </motion.div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className="card-hover rounded-xl p-6 relative overflow-hidden pixel-corners"
              variants={itemVariants}
            >
              <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-gradient-to-br from-neon-pink-500 to-plasma-purple-500 text-white text-xs font-bold py-1 px-3 rounded-bl-lg">
                {service.level}
              </div>
              
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-game-blue-600/10 to-toxic-green-500/10 rounded-full transform translate-x-10 -translate-y-10 blur-2xl"></div>
              
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-plasma-purple-500 to-neon-pink-500 flex items-center justify-center text-white mb-5 rgb-border">
                {service.icon}
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
              <p className="text-gray-400 mb-5">{service.description}</p>
              
              <div className="loading-bar mb-5"></div>
              
              <ul className="space-y-2">
                {service.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-start">
                    <svg className="h-5 w-5 text-toxic-green-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a href="#pricing" className="inline-flex items-center group">
            <span className="bg-gradient-to-r from-game-blue-500 to-neon-pink-500 py-3 px-6 rounded-lg text-white font-medium">
              VIEW EXCLUSIVE PACKAGES
            </span>
            <span className="ml-2 bg-black/50 p-3 rounded-full text-neon-pink-500 group-hover:translate-x-1 transition-transform">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
} 