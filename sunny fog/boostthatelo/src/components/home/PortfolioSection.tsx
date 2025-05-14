"use client";

import { useState } from "react";
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

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" }
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
  popularity: number;
}

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState<GameCategory>("all");

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
      popularity: 95
    },
    {
      id: 102,
      title: "Valorant",
      description: "Rank up from Iron to Radiant with our expert Valorant players",
      thumbnail: "https://www.riotgames.com/darkroom/1440/d0807e131a84f2e42c7a303bda672789:3d02afa7e0bfb75f645d97467765b24c/valorant-offwhitelaunch-keyart.jpg",
      category: ["fps"],
      difficultyLevel: "Hard",
      deliveryTime: "4-18 days",
      popularity: 90
    },
    {
      id: 103,
      title: "Teamfight Tactics",
      description: "Reach the highest ranks in TFT with our strategic boosting",
      thumbnail: "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news_live/81ff08c322c2775f5810a15a3089f29c466a8f95-1920x1080.jpg?auto=format&fit=fill&q=80&w=1082",
      category: ["strategy"],
      difficultyLevel: "Medium",
      deliveryTime: "3-14 days",
      popularity: 75
    },
    {
      id: 104,
      title: "Overwatch 2",
      description: "Boost your SR with our highly skilled Overwatch 2 players",
      thumbnail: "https://assetsio.gnwcdn.com/Overwatch-2-review-header.jpg?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp",
      category: ["fps"],
      difficultyLevel: "Medium-Hard",
      deliveryTime: "5-16 days",
      popularity: 85
    },
    {
      id: 105,
      title: "Counter-Strike 2",
      description: "Rise through the ranks with our professional CS2 boosters",
      thumbnail: "https://cdn.akamai.steamstatic.com/steam/apps/730/ss_118cb022b9a43f70d2e5a2df7427f29088b6b191.jpg",
      category: ["fps"],
      difficultyLevel: "Very Hard",
      deliveryTime: "7-24 days",
      popularity: 88
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
  };

  return (
    <section className="py-20 bg-[#0a0a0a]" id="games">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="gradient-text">Supported</span> Games
            </h2>
            <p className="text-gray-400 text-lg">
              Professional boosting services available for these competitive games
            </p>
          </motion.div>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex flex-wrap justify-center gap-2 p-1 rounded-lg bg-gray-800/50 backdrop-blur-sm">
          <button
            onClick={() => handleCategoryChange("all")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeCategory === "all"
                  ? "bg-gradient-to-r from-blue-600 to-purple-500 text-white shadow-md"
                  : "text-gray-300 hover:text-white"
            }`}
          >
              All Games
          </button>
          <button
              onClick={() => handleCategoryChange("moba")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeCategory === "moba"
                  ? "bg-gradient-to-r from-blue-600 to-purple-500 text-white shadow-md"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              MOBA
          </button>
          <button
              onClick={() => handleCategoryChange("fps")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeCategory === "fps"
                  ? "bg-gradient-to-r from-blue-600 to-purple-500 text-white shadow-md"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              FPS
          </button>
          <button
              onClick={() => handleCategoryChange("strategy")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeCategory === "strategy"
                  ? "bg-gradient-to-r from-blue-600 to-purple-500 text-white shadow-md"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Strategy
          </button>
          </div>
        </div>

        {/* Games Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
            {getFilteredItems().map((game) => (
                <motion.div
                key={game.id} 
                  variants={itemVariants}
                className="group relative overflow-hidden rounded-xl"
              >
                <div className="relative aspect-video overflow-hidden rounded-xl">
                  <img 
                    src={game.thumbnail} 
                    alt={game.title} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-xl font-bold text-white mb-1">{game.title}</h3>
                    <p className="text-gray-300 text-sm mb-4">{game.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                      <div className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded-full">
                        Difficulty: {game.difficultyLevel}
                      </div>
                      
                      <div className="bg-purple-500/20 text-purple-400 text-xs px-2 py-1 rounded-full">
                        Delivery: {game.deliveryTime}
                      </div>
                    </div>
                    
                    <div className="absolute top-0 right-0 m-4">
                      <span className="bg-blue-500/80 text-white text-xs px-2 py-1 rounded-full flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                        {game.popularity}%
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        
        <div className="text-center mt-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a 
              href="#pricing" 
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
            >
              <span>View our boosting packages</span>
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 