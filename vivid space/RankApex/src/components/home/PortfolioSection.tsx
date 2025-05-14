"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

type GameCategory = "all" | "moba" | "fps" | "strategy";

interface Game {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  category: GameCategory[];
  difficultyLevel: string;
  deliveryTime: string;
}

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState<GameCategory>("all");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Game information
  const games: Game[] = [
    {
      id: 101,
      title: "League of Legends",
      description: "Climb from Iron to Challenger with our professional LoL boosters",
      thumbnail: "https://cdn1.epicgames.com/offer/24b9b5e323bc40eea252a10cdd3b2f10/EGS_LeagueofLegends_RiotGames_S1_2560x1440-80471666c140f790f28dff68d72c384b",
      category: ["moba"],
      difficultyLevel: "Medium",
      deliveryTime: "3-21 days",
    },
    {
      id: 102,
      title: "Valorant",
      description: "Rank up from Iron to Radiant with our expert Valorant players",
      thumbnail: "https://www.riotgames.com/darkroom/1440/d0807e131a84f2e42c7a303bda672789:3d02afa7e0bfb75f645d97467765b24c/valorant-offwhitelaunch-keyart.jpg",
      category: ["fps"],
      difficultyLevel: "Hard",
      deliveryTime: "4-18 days",
    },
    {
      id: 103,
      title: "Teamfight Tactics",
      description: "Reach the highest ranks in TFT with our strategic boosting",
      thumbnail: "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news_live/81ff08c322c2775f5810a15a3089f29c466a8f95-1920x1080.jpg?auto=format&fit=fill&q=80&w=1082",
      category: ["strategy"],
      difficultyLevel: "Medium",
      deliveryTime: "3-14 days",
    },
    {
      id: 104,
      title: "Overwatch 2",
      description: "Boost your SR with our highly skilled Overwatch 2 players",
      thumbnail: "https://assetsio.gnwcdn.com/Overwatch-2-review-header.jpg?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp",
      category: ["fps"],
      difficultyLevel: "Medium-Hard",
      deliveryTime: "5-16 days",
    },
    {
      id: 105,
      title: "Counter-Strike 2",
      description: "Rise through the ranks with our professional CS2 boosters",
      thumbnail: "https://cdn.akamai.steamstatic.com/steam/apps/730/ss_118cb022b9a43f70d2e5a2df7427f29088b6b191.jpg",
      category: ["fps"],
      difficultyLevel: "Very Hard",
      deliveryTime: "7-24 days",
    }
  ];

  // Filter games based on active category
  const getFilteredItems = () => {
    if (activeCategory === "all") {
      return games;
    } else {
      return games.filter(game => game.category.includes(activeCategory));
    }
  };

  const handleCategoryChange = (category: GameCategory) => {
    setActiveCategory(category);
    // Scroll to the game showcase after filter change
    setTimeout(() => {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  // Get background gradient based on game's popularity
  const getPopularityGradient = (popularity: number) => {
    if (popularity >= 90) {
      return "from-rank-emerald-500 to-rank-emerald-400";
    } else if (popularity >= 80) {
      return "from-rank-emerald-500 to-rank-orange-500";
    } else {
      return "from-rank-orange-500 to-rank-orange-400";
    }
  };

  return (
    <section className="py-20 relative overflow-hidden" id="games">
      {/* Completely redesigned background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#070c0a]"></div>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2316a34a' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 5v1H5z'/%3E%3Cpath d='M6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "6px 6px"
        }}></div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-rank-emerald-900/30 to-transparent"></div>
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-rank-emerald-900/30 to-transparent"></div>
        <div className="absolute left-1/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-rank-emerald-900/30 to-transparent"></div>
        <div className="absolute left-3/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-rank-emerald-900/30 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Heading with split design */}
        <div className="mb-20 max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
          >
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-rank-emerald-900/30 text-rank-emerald-400 text-sm mb-4">
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.5 9L11 6.5M11 6.5L13.5 9M11 6.5V17.5M16 11.5L13.5 14M13.5 14L11 11.5M13.5 14V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 20L18 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span>Multiple Games Available</span>
              </div>
              <h2 className="text-4xl font-bold mb-4 leading-tight">
                Our <span className="gradient-text">Supported</span> 
                <span className="relative ml-3 inline-flex">
                  <span className="relative z-10">Games</span>
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-rank-emerald-500/10 rounded-sm -z-10"></span>
                </span>
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Professional boosting services available for these competitive games, delivered by top-tier players who understand the mechanics and meta of each specific game.
              </p>
            </div>
            
            <div className="flex flex-col items-start md:items-end">
              <div className="bg-[#0c1410] p-6 rounded-lg border border-rank-emerald-900/30 shadow-lg max-w-sm">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-rank-emerald-900/40 flex items-center justify-center text-rank-emerald-400 mr-3">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Pro-Level Boosting</h3>
                    <p className="text-xs text-gray-400">Fastest rank climbing guaranteed</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs with completely different style */}
        <div className="mb-12">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-px bg-rank-emerald-900/30"></div>
              </div>
              <div className="relative flex justify-center">
                <div className="bg-[#080f0d] px-4">
                  <div className="inline-flex items-center gap-2 p-1 rounded-full bg-[#0c1410] backdrop-blur-sm border border-rank-emerald-900/30">
                    <button
                      onClick={() => handleCategoryChange("all")}
                      className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        activeCategory === "all"
                          ? "bg-rank-emerald-600 text-white shadow-lg shadow-rank-emerald-900/30"
                          : "text-gray-300 hover:text-white"
                      }`}
                    >
                      All Games
                    </button>
                    <button
                      onClick={() => handleCategoryChange("moba")}
                      className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        activeCategory === "moba"
                          ? "bg-rank-emerald-600 text-white shadow-lg shadow-rank-emerald-900/30"
                          : "text-gray-300 hover:text-white"
                      }`}
                    >
                      MOBA
                    </button>
                    <button
                      onClick={() => handleCategoryChange("fps")}
                      className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        activeCategory === "fps"
                          ? "bg-rank-emerald-600 text-white shadow-lg shadow-rank-emerald-900/30"
                          : "text-gray-300 hover:text-white"
                      }`}
                    >
                      FPS
                    </button>
                    <button
                      onClick={() => handleCategoryChange("strategy")}
                      className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        activeCategory === "strategy"
                          ? "bg-rank-emerald-600 text-white shadow-lg shadow-rank-emerald-900/30"
                          : "text-gray-300 hover:text-white"
                      }`}
                    >
                      Strategy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Games showcase with completely new layout */}
        <div ref={scrollRef}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: 20 }}
              className="grid gap-16"
            >
              {getFilteredItems().map((game, index) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative ${index % 2 === 0 ? '' : 'md:flex-row-reverse'} overflow-hidden`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center relative">
                    {/* Game banner - completely new style */}
                    <div className="md:col-span-3 relative">
                      <div className="absolute inset-0 bg-gradient-to-tl from-[#0c1410] via-transparent to-transparent z-10"></div>
                      
                      <div className="aspect-[16/9] overflow-hidden rounded-2xl relative">
                        <img 
                          src={game.thumbnail} 
                          alt={game.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
                        
                        {/* Overlay game info for mobile */}
                        <div className="absolute inset-0 flex items-end p-6 md:hidden z-20">
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-2">{game.title}</h3>
                            <p className="text-gray-200 mb-4">{game.description}</p>
                            
                            <div className="flex space-x-3 mb-4">
                              <div className="bg-rank-emerald-900/60 backdrop-blur-sm text-rank-emerald-400 text-xs px-3 py-1 rounded-full border border-rank-emerald-700/30">
                                {game.difficultyLevel}
                              </div>
                              <div className="bg-rank-orange-900/60 backdrop-blur-sm text-rank-orange-400 text-xs px-3 py-1 rounded-full border border-rank-orange-700/30">
                                {game.deliveryTime}
                              </div>
                            </div>
                            
                            <button className="button-apex py-2 px-5 text-sm">
                              View Boost Options
                            </button>
                          </div>
                        </div>
                        
                        {/* Game rank indicator */}
                        <div className="absolute top-6 right-6 flex items-center gap-2 py-1 px-3 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 z-20">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                          <span className="text-white text-xs font-medium">Active Service</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Game details with completely new layout */}
                    <div className="md:col-span-2 hidden md:block">
                      <div className="bg-[#0c1410] rounded-2xl border border-rank-emerald-900/30 shadow-xl overflow-hidden">
                        <div className="p-6">
                          <h3 className="text-2xl font-bold text-white mb-3">{game.title}</h3>
                          <p className="text-gray-300 mb-6">{game.description}</p>
                          
                          <div className="space-y-5 mb-6">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-400">Difficulty</span>
                              <span className="text-rank-emerald-400 font-medium">{game.difficultyLevel}</span>
                            </div>
                            <div className="h-px w-full bg-rank-emerald-900/30"></div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-400">Delivery Time</span>
                              <span className="text-rank-orange-400 font-medium">{game.deliveryTime}</span>
                            </div>
                            <div className="h-px w-full bg-rank-emerald-900/30"></div>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <div className="w-full bg-rank-emerald-900/30 h-2 rounded-full overflow-hidden">
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <button className="w-full py-3 px-6 bg-gradient-to-r from-rank-emerald-600 to-rank-emerald-500 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-rank-emerald-600/20 transition-all duration-300 transform hover:-translate-y-1">
                            View Boost Options
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Bottom CTA section completely redesigned */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-20 text-center"
        >
          <div className="max-w-4xl mx-auto px-6 py-12 relative">
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-rank-emerald-900/30 to-rank-orange-900/30"></div>
              <div className="absolute inset-0 bg-[url('/images/circuit-pattern.svg')] opacity-10"></div>
            </div>
            
            <div className="relative z-10">
              <span className="inline-block px-4 py-1 rounded-full bg-rank-emerald-900/60 text-rank-emerald-400 text-sm mb-4 backdrop-blur-sm">
                Ready to Rank Up?
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Start Your Boosting Journey Today
              </h3>
              <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                Browse our comprehensive boosting packages designed to help you reach your desired rank efficiently and securely.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href="#pricing" 
                  className="py-3 px-6 rounded-lg bg-gradient-to-r from-rank-emerald-600 to-rank-emerald-500 text-white font-medium hover:shadow-lg transition-all duration-300"
                >
                  View Pricing
                </a>
                <a 
                  href="/contact" 
                  className="py-3 px-6 rounded-lg bg-transparent border border-rank-emerald-500/50 text-rank-emerald-400 font-medium hover:bg-rank-emerald-900/20 transition-all duration-300"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 