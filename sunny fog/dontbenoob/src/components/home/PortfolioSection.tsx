"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from "next/image";

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.5
    }
  }
};

type GameCoaching = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  category: string[];
  game: string;
  skillLevel: string;
}

export default function PortfolioSection() {
  // Categories for filter tabs
  const categories = {
    all: 'All Games',
    competitive: 'Competitive Games',
    strategy: 'Strategy Games',
    rpg: 'Role-Playing Games',
    fps: 'FPS Games'
  };

  const [categoryFilter, setCategoryFilter] = useState('all');

  // Competitive games coaching
  const competitiveCoaching: GameCoaching[] = [
    {
      id: 101,
      title: "League of Legends",
      description: "Master lane control and team fights",
      thumbnail: "https://cdn1.epicgames.com/offer/24b9b5e323bc40eea252a10cdd3b2f10/LOL_2560x1440-98749e0d718e82d27a084941939bc9d3",
      category: ["competitive"],
      game: "League of Legends",
      skillLevel: "All levels"
    },
    {
      id: 102,
      title: "Dota 2",
      description: "Advanced hero management strategies",
      thumbnail: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota2_social.jpg",
      category: ["competitive"],
      game: "Dota 2",
      skillLevel: "Intermediate to Pro"
    },
    {
      id: 103,
      title: "Rocket League",
      description: "Aerial control and team coordination",
      thumbnail: "https://cdn.akamai.steamstatic.com/steam/apps/252950/header.jpg",
      category: ["competitive"],
      game: "Rocket League",
      skillLevel: "Beginner to Advanced"
    },
    {
      id: 105,
      title: "Counter-Strike 2",
      description: "Pro strategies and team communication",
      thumbnail: "https://cdn.akamai.steamstatic.com/steam/apps/730/capsule_616x353.jpg",
      category: ["competitive", "fps"],
      game: "Counter-Strike 2",
      skillLevel: "Intermediate to Pro"
    }
  ];

  // Strategy games coaching
  const strategyCoaching: GameCoaching[] = [
    {
      id: 202,
      title: "Age of Empires 4",
      description: "Civilization tactics and resource management",
      thumbnail: "https://cdn.akamai.steamstatic.com/steam/apps/1466860/capsule_616x353.jpg",
      category: ["strategy"],
      game: "Age of Empires 4",
      skillLevel: "Beginner to Advanced"
    },
    {
      id: 203,
      title: "Civilization VI",
      description: "Victory path strategies and diplomacy",
      thumbnail: "https://cdn.akamai.steamstatic.com/steam/apps/289070/capsule_616x353.jpg",
      category: ["strategy"],
      game: "Civilization VI",
      skillLevel: "All levels"
    },
    {
      id: 204,
      title: "Total War: Warhammer 3",
      description: "Battle tactics and campaign management",
      thumbnail: "https://cdn.akamai.steamstatic.com/steam/apps/1142710/header.jpg",
      category: ["strategy"],
      game: "Total War: Warhammer 3",
      skillLevel: "Intermediate to Pro"
    }
  ];

  // RPG games coaching
  const rpgCoaching: GameCoaching[] = [
    {
      id: 302,
      title: "Final Fantasy XIV",
      description: "Dungeon mastery and rotation optimization",
      thumbnail: "https://cdn.akamai.steamstatic.com/steam/apps/39210/header.jpg",
      category: ["rpg"],
      game: "Final Fantasy XIV",
      skillLevel: "Beginner to Advanced"
    },
    {
      id: 303,
      title: "Elden Ring",
      description: "Boss strategies and build optimization",
      thumbnail: "https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg",
      category: ["rpg"],
      game: "Elden Ring",
      skillLevel: "All levels"
    }
  ];

  // FPS games coaching
  const fpsCoaching: GameCoaching[] = [
    {
      id: 401,
      title: "Call of Duty: Warzone",
      description: "Winning strategies and weapon mastery",
      thumbnail: "https://www.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/hero/mw-wz/WZ-Season-Three-Announce-TOUT.jpg",
      category: ["fps"],
      game: "Call of Duty: Warzone",
      skillLevel: "All levels"
    },
    {
      id: 402,
      title: "Apex Legends",
      description: "Movement techniques and legend mastery",
      thumbnail: "https://media.contentapi.ea.com/content/dam/apex-legends/images/2019/01/apex-featured-image-16x9.jpg.adapt.crop16x9.1023w.jpg",
      category: ["fps"],
      game: "Apex Legends",
      skillLevel: "Beginner to Pro"
    },
    {
      id: 403,
      title: "Rainbow Six Siege",
      description: "Tactical coordination and map knowledge",
      thumbnail: "https://cdn.akamai.steamstatic.com/steam/apps/359550/header.jpg",
      category: ["fps"],
      game: "Rainbow Six Siege",
      skillLevel: "Intermediate to Pro"
    },
    {
      id: 404,
      title: "Overwatch 2",
      description: "Hero matchups and team composition",
      thumbnail: "https://cdn.akamai.steamstatic.com/steam/apps/2357570/header.jpg",
      category: ["fps"],
      game: "Overwatch 2",
      skillLevel: "All levels"
    }
  ];

  // Combine all examples for "all" category
  const allCoaching = [
    ...competitiveCoaching,
    ...strategyCoaching,
    ...rpgCoaching,
    ...fpsCoaching
  ];

  const filteredItems = allCoaching.filter(item => 
    categoryFilter === 'all' ? true : item.category.includes(categoryFilter)
  );

  return (
    <section className="py-20" id="services">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Gaming Coaching</span> For Every Skill Level
            </h2>
            <p className="text-gray-400 text-lg">
              Discover our coaching styles tailored to different games and skill levels to help you reach your gaming goals
            </p>
          </motion.div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {Object.entries(categories).map(([key, label]) => (
          <button
              key={key}
              onClick={() => setCategoryFilter(key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                categoryFilter === key
                  ? 'bg-primary text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {label}
          </button>
          ))}
        </div>

        {/* Examples Grid */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={categoryFilter}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  className="card-hover rounded-xl overflow-hidden relative group"
                  variants={itemVariants}
                  layout
                >
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="eager"
                      width={640}
                      height={360}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70"></div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-bold">{item.title}</h3>
                      <p className="text-gray-300 text-sm mt-1">{item.description}</p>
                      <div className="flex items-center text-xs text-gray-300 mt-2">
                        <span className="bg-vid-red-500/30 text-vid-red-300 px-2 py-0.5 rounded">
                          {item.game}
                        </span>
                        <span className="inline-block h-1 w-1 rounded-full bg-gray-500 mx-2"></span>
                        <span className="text-gray-400">
                          {item.skillLevel}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-300 mb-4">
            All our coaching services are one-time purchases with guaranteed deliverables, no subscription or commitment required.
          </p>
          <a
            href="/pricing"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#44D62C] to-[#00FFFF] text-white rounded-lg font-medium button-glow"
          >
            <span>Book A Session</span>
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
} 