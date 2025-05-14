"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

export default function ServicesSection() {
  const [activeService, setActiveService] = useState(1);
  
  const services = [
    {
      id: 1,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Ranked Boosting",
      description: "Our pro boosters will take control of your account and rank it up efficiently in any competitive game.",
      badges: ["Fast", "Secure", "Guaranteed"],
      color: "emerald"
    },
    {
      id: 2,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: "Duo Boosting",
      description: "Play alongside our professional boosters and learn while climbing to your desired rank.",
      badges: ["Educational", "Faster Wins", "Skill Building"],
      color: "orange"
    },
    {
      id: 3,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "Placement Matches",
      description: "Maximize your placement results with our expert players handling your initial qualification matches.",
      badges: ["Optimal Start", "Better MMR", "Time Saving"],
      color: "emerald"
    },
    {
      id: 4,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      ),
      title: "Premium Support",
      description: "Direct communication with your booster via Discord for updates, strategy discussions, and real-time coordination.",
      badges: ["Discord Chat", "Real-time", "Screen Sharing"],
      color: "orange"
    }
  ];

  const gameSpecificServices = [
    {
      game: "League of Legends",
      icon: (
        <svg viewBox="0 0 32 32" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 3L4 9V23L16 29L28 23V9L16 3Z" fill="#C79E57" />
          <path d="M16 6L7 10.5V21.5L16 26L25 21.5V10.5L16 6Z" fill="#0A1428" />
          <path d="M16 9L10 12.5V19.5L16 23L22 19.5V12.5L16 9Z" fill="#C79E57" />
          <path d="M16 12L13 13.5V18.5L16 20L19 18.5V13.5L16 12Z" fill="#0A1428" />
        </svg>
      ),
      services: ["Ranked Solo/Duo", "Flex Queue", "Clash Team", "Champion Mastery"]
    },
    {
      game: "Valorant",
      icon: (
        <svg viewBox="0 0 32 32" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M27 5H17L5 27H15L27 5Z" fill="#FD4556" />
          <path d="M20 5H17L5 27H8L20 5Z" fill="#FD4556" />
        </svg>
      ),
      services: ["Ranked Competitive", "Premium Agents", "Placements", "Act Rank"]
    },
    {
      game: "CS2",
      icon: (
        <svg viewBox="0 0 32 32" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 3C8.8 3 3 8.8 3 16C3 23.2 8.8 29 16 29C23.2 29 29 23.2 29 16C29 8.8 23.2 3 16 3Z" fill="#F7A800" />
          <path d="M16 7C11.03 7 7 11.03 7 16C7 20.97 11.03 25 16 25C20.97 25 25 20.97 25 16C25 11.03 20.97 7 16 7ZM12 19V13L19 16L12 19Z" fill="#000000" />
        </svg>
      ),
      services: ["Competitive MM", "Faceit Levels", "Premier Mode", "Specific Maps"]
    },
    {
      game: "Overwatch 2",
      icon: (
        <svg viewBox="0 0 32 32" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="13" fill="#F57D25" />
          <path d="M16 6C10.48 6 6 10.48 6 16C6 21.52 10.48 26 16 26C21.52 26 26 21.52 26 16C26 10.48 21.52 6 16 6ZM12 21L8 16L12 11H20L24 16L20 21H12Z" fill="white" />
          <path d="M20 11H12L8 16L12 21H20L24 16L20 11ZM16 19C14.34 19 13 17.66 13 16C13 14.34 14.34 13 16 13C17.66 13 19 14.34 19 16C19 17.66 17.66 19 16 19Z" fill="#43484C" />
        </svg>
      ),
      services: ["Role Queue", "Open Queue", "Specific Heroes", "Placement Matches"]
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden" id="services">
      {/* Background elements - completely redesigned */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#070c0a]"></div>
        <div className="absolute top-0 w-full h-24 bg-gradient-to-b from-rank-emerald-800/20 to-transparent"></div>
        <div className="absolute right-0 h-full w-1/4 bg-gradient-to-l from-rank-orange-800/10 to-transparent"></div>
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-rank-emerald-900/30 to-transparent"></div>
        
        {/* Hexagonal pattern */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='104' viewBox='0 0 60 104' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 52-30 52L0 52 30 0zm0 16L10 52l20 36 20-36-20-36z' fill='%2316a34a' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E\")",
          backgroundSize: "60px 104px"
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Heading with a different style */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-24 h-2 bg-gradient-to-r from-rank-emerald-500 to-rank-orange-500 mx-auto mb-6 rounded-full"></div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              <span className="text-white">Elite</span>
              <span className="relative mx-4 inline-block">
                <span className="gradient-text">Boosting</span>
                <svg className="absolute -bottom-3 left-0 w-full" viewBox="0 0 100 15" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0,5 Q25,0 50,5 T100,5" fill="none" stroke="url(#grad)" strokeWidth="2" />
                  <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#f97316" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              <span className="text-white">Services</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-xl mx-auto">
              Our professional boosters provide a variety of services to help you reach your gaming goals
            </p>
          </motion.div>
        </div>

        {/* Completely redesigned layout with interactive tabs instead of cards */}
        <div className="flex flex-col lg:flex-row gap-10 mb-20">
          {/* Left side service navigation */}
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="sticky top-24"
            >
              <h3 className="text-xl font-bold text-white mb-6 font-poppins">Our Services</h3>
              <div className="space-y-3">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setActiveService(service.id)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 flex items-center gap-4 ${
                      activeService === service.id
                        ? `bg-rank-${service.color}-900/30 border-l-4 border-rank-${service.color}-500`
                        : "bg-card-accent/60 hover:bg-card-accent border-l-4 border-transparent"
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      activeService === service.id
                        ? `bg-rank-${service.color}-500 text-white`
                        : "bg-[#0c1410] text-gray-400"
                    }`}>
                      {service.icon}
                    </div>
                    <div>
                      <h4 className={`font-bold ${
                        activeService === service.id ? "text-white" : "text-gray-300"
                      }`}>
                        {service.title}
                      </h4>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                        {service.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right side service details */}
          <div className="lg:w-2/3">
            {services.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: activeService === service.id ? 1 : 0,
                  y: activeService === service.id ? 0 : 20,
                  display: activeService === service.id ? "block" : "none"
                }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-[#0c1410] to-[#0f1a16] rounded-2xl overflow-hidden border border-rank-emerald-900/30 shadow-xl"
              >
                {/* Service header with visual flair */}
                <div className={`h-24 relative overflow-hidden bg-rank-${service.color}-900/20`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute inset-0 flex">
                      {[...Array(10)].map((_, i) => (
                        <div 
                          key={i} 
                          className={`flex-1 skew-x-12 bg-rank-${service.color}-500/5`}
                          style={{ marginLeft: `${i * 3}px` }}
                        ></div>
                      ))}
                    </div>
                    <div className={`w-20 h-20 rounded-full bg-rank-${service.color}-500/20 flex items-center justify-center backdrop-blur-sm z-10`}>
                      <div className={`w-16 h-16 rounded-full bg-rank-${service.color}-500/80 flex items-center justify-center text-white`}>
                        {service.icon}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Service content */}
                <div className="p-8">
                  <h3 className={`text-2xl font-bold mb-4 text-rank-${service.color}-400`}>{service.title}</h3>
                  <p className="text-gray-300 leading-relaxed text-lg mb-6">{service.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {service.badges.map((badge, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full bg-rank-${service.color}-900/30 flex items-center justify-center text-rank-${service.color}-400`}>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-white">{badge}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className={`text-sm text-rank-${service.color}-400 font-medium`}>
                      Satisfaction rate: 99%
                    </div>
                    <Link 
                      href="/pricing"
                      className={`px-6 py-3 rounded-lg bg-gradient-to-r from-rank-${service.color}-600 to-rank-${service.color}-500 text-white font-medium hover:shadow-lg hover:shadow-rank-${service.color}-600/20 transition-all duration-300 transform hover:-translate-y-1`}
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Game-specific services in a completely new layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-24 relative"
        >
          <div className="text-center mb-16">
            <h3 className="text-2xl md:text-3xl font-bold font-poppins inline-block relative">
              <span className="text-white">Game-Specific</span>
              <span className="gradient-text ml-3">Boost Options</span>
              <div className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-rank-emerald-500 to-transparent"></div>
            </h3>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-10">
            {gameSpecificServices.map((game, index) => (
              <motion.div
                key={game.game}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative overflow-hidden">
                  {/* Background shape */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-rank-emerald-500/5 rounded-full -mr-20 -mt-20 transition-transform duration-500 group-hover:scale-150"></div>
                  
                  {/* Game card with hover effects */}
                  <div className="relative z-10 backdrop-blur-sm border border-rank-emerald-900/30 rounded-xl overflow-hidden">
                    {/* Header with large game icon */}
                    <div className="h-36 relative bg-gradient-to-br from-rank-emerald-900/40 to-rank-orange-900/40 flex items-center justify-center">
                      <div className="absolute inset-0 bg-[#0c1410]/80"></div>
                      <div className="w-20 h-20 relative z-10 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
                        {game.icon}
                      </div>
                    </div>
                    
                    {/* Game content */}
                    <div className="p-6 bg-[#0c1410]">
                      <h4 className="text-xl font-bold text-white mb-4 text-center">{game.game}</h4>
                      
                      <div className="space-y-3">
                        {game.services.map((service, i) => (
                          <div 
                            key={i} 
                            className="flex items-center justify-between border-b border-rank-emerald-900/20 pb-2"
                          >
                            <span className="text-gray-300">{service}</span>
                            <svg className="w-5 h-5 text-rank-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Trophy/Achievement Section with a completely different design */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 overflow-hidden relative rounded-2xl"
        >
          <div className="absolute inset-0 bg-[url('/images/dark-topography.svg')] opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-rank-emerald-900/60 to-rank-orange-900/60"></div>
          
          {/* Content with a completely different layout */}
          <div className="relative z-10 p-16">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-block relative">
                  <span className="absolute -top-8 -left-8 text-6xl text-rank-emerald-500/20 font-bold">"</span>
                  <h3 className="text-3xl md:text-4xl font-bold text-white">Why Choose Our Boosting Service?</h3>
                  <span className="absolute -bottom-14 -right-8 text-6xl text-rank-emerald-500/20 font-bold">"</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div className="border-l-4 border-rank-emerald-500 pl-5">
                  <h4 className="text-xl font-medium text-white mb-3">Highest Security</h4>
                  <p className="text-gray-300">All boosters use VPN matching your location and implement robust security practices to keep your account safe.</p>
                </div>
                
                <div className="border-l-4 border-rank-orange-500 pl-5">
                  <h4 className="text-xl font-medium text-white mb-3">Lightning-Fast</h4>
                  <p className="text-gray-300">Our elite boosters complete orders 2-3x faster than average services without sacrificing win rates.</p>
                </div>
                
                <div className="border-l-4 border-rank-emerald-500 pl-5">
                  <h4 className="text-xl font-medium text-white mb-3">Money-Back Guarantee</h4>
                  <p className="text-gray-300">If we can't meet our promised rank improvement, you get a full refund—no questions asked.</p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center justify-between border-t border-rank-emerald-500/20 pt-10">
                <div className="md:w-full flex justify-center">
                  <div className="flex items-center">
                    <span className="text-6xl font-bold gradient-text">99.8%</span>
                    <div className="ml-4 text-left">
                      <span className="block text-white font-medium text-xl">Success Rate</span>
                      <span className="block text-sm text-gray-400">Completed Orders</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 