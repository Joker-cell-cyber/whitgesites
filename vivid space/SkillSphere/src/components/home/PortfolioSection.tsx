"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation, useMotionValue } from 'framer-motion';
import Image from "next/image";
import Link from "next/link";

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
  const categories = [
    { id: 'all', name: 'All Games' },
    { id: 'competitive', name: 'Competitive Games' },
    { id: 'strategy', name: 'Strategy Games' },
    { id: 'rpg', name: 'Role-Playing Games' },
    { id: 'fps', name: 'FPS Games' }
  ];

  const [categoryFilter, setCategoryFilter] = useState('all');
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const carouselRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  
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

  useEffect(() => {
    setActiveIndex(0);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [categoryFilter]);
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (autoplay && filteredItems.length > 1) {
      interval = setInterval(() => {
        setActiveIndex(prev => (prev + 1) % filteredItems.length);
      }, 5000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoplay, filteredItems.length, activeIndex]);

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    setAutoplay(false);
  };
  
  const handleNext = () => {
    setActiveIndex((activeIndex + 1) % filteredItems.length);
    setAutoplay(false);
  };
  
  const handlePrev = () => {
    setActiveIndex((activeIndex - 1 + filteredItems.length) % filteredItems.length);
    setAutoplay(false);
  };
  
  const currentItem = filteredItems[activeIndex];

  return (
    <section className="py-24 relative" id="services">
      {/* Ambient background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-indigo-950/20 to-slate-950"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full bg-cyan-500/30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
              animation: 'float-particle infinite linear'
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-indigo-600/20 rounded-full mb-4 backdrop-blur-sm border border-cyan-500/30">
                <span className="text-cyan-400 font-['Space_Grotesk'] uppercase tracking-widest text-xs font-medium">Game Showcase</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-['Montserrat'] text-white">
                <span className="relative inline-block">
                  Elite Coaching
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-indigo-600"></span>
                </span>{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-indigo-600">Library</span>
              </h2>
              
              <p className="text-gray-300 max-w-2xl mx-auto mb-8 font-['Space_Grotesk'] text-lg">
                Explore our specialized coaching programs across multiple game genres and skill levels
              </p>
            </motion.div>
          </div>
          
          {/* Category Selection - Styled as arcade buttons */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex flex-wrap items-center justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setCategoryFilter(category.id)}
                  className={`group relative overflow-hidden ${
                    categoryFilter === category.id ? 'ring-2 ring-cyan-500 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-900 rounded-lg border border-cyan-500/30"></div>
                  <div className={`absolute inset-0 ${
                    categoryFilter === category.id ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-600/20' : 'bg-transparent group-hover:bg-slate-800/50'
                  } transition-colors duration-300 rounded-lg`}></div>
                  
                  <div className={`relative px-6 py-3 rounded-lg font-['Space_Grotesk'] uppercase text-sm flex items-center justify-center transition-all duration-300 ${
                    categoryFilter === category.id ? 'shadow-[0_0_10px_rgba(8,145,178,0.5)]' : ''
                  }`}>
                    {categoryFilter === category.id && (
                      <div className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
                    )}
                    <span>{category.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
          
          {/* 3D Arcade-Style Display Case */}
          <motion.div
            className="relative h-[600px] perspective-1000 mb-16 overflow-visible"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{
              transform: `rotateX(${mousePosition.y * -5}deg) rotateY(${mousePosition.x * 5}deg)`
            }}
          >
            {/* Virtual display platform */}
            <div className="absolute bottom-0 w-full h-[100px] bg-gradient-to-t from-slate-900 to-transparent"></div>
            
            {/* 3D Platform */}
            <div 
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[2px] bg-cyan-500/50 blur-sm"
              style={{ 
                boxShadow: '0 0 40px 5px rgba(8, 145, 178, 0.4)',
                transform: 'rotateX(60deg) translateZ(-50px)'
              }}
            ></div>
            
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full z-10">
              {/* Featured game display */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentItem?.id}
                  initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.9, rotateY: 10 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  <div className="relative w-full max-w-4xl aspect-[16/9] rounded-lg overflow-hidden group transform hover:scale-[1.01] transition-transform duration-500">
                    {/* Game image */}
                    <div className="absolute inset-0">
                      <Image
                        src={currentItem?.thumbnail}
                        alt={currentItem?.title}
                        fill
                        className="object-cover"
                        style={{ filter: 'brightness(0.7)' }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent"></div>
                    </div>
                    
                    {/* Glowing frame */}
                    <div className="absolute inset-0 border-2 border-cyan-500/20 rounded-lg"></div>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-[1px] border border-cyan-500/50 rounded-lg"></div>
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute top-4 left-4 w-20 h-20">
                      <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-500/50"></div>
                      <div className="absolute top-0 left-0 h-full w-[2px] bg-cyan-500/50"></div>
                    </div>
                    <div className="absolute top-4 right-4 w-20 h-20">
                      <div className="absolute top-0 right-0 w-full h-[2px] bg-indigo-600/50"></div>
                      <div className="absolute top-0 right-0 h-full w-[2px] bg-indigo-600/50"></div>
                    </div>
                    <div className="absolute bottom-4 left-4 w-20 h-20">
                      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-indigo-600/50"></div>
                      <div className="absolute bottom-0 left-0 h-full w-[2px] bg-indigo-600/50"></div>
                    </div>
                    <div className="absolute bottom-4 right-4 w-20 h-20">
                      <div className="absolute bottom-0 right-0 w-full h-[2px] bg-cyan-500/50"></div>
                      <div className="absolute bottom-0 right-0 h-full w-[2px] bg-cyan-500/50"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="absolute bottom-0 inset-x-0 p-8 lg:p-10">
                      <div className="space-y-4">
                        {/* Game badges */}
                        <div className="flex flex-wrap gap-2">
                          <div className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/40 rounded-md backdrop-blur-sm text-cyan-400 text-xs font-['Space_Grotesk'] uppercase tracking-widest">
                            {currentItem?.skillLevel}
                          </div>
                          {currentItem?.category.map(cat => (
                            <div key={cat} className="px-3 py-1 bg-indigo-600/20 border border-indigo-600/40 rounded-md backdrop-blur-sm text-indigo-400 text-xs font-['Space_Grotesk'] uppercase tracking-widest">
                              {cat}
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-2 font-['Montserrat'] tracking-tight group-hover:text-cyan-400 transition-colors duration-300">
                              {currentItem?.title}
                            </h3>
                            <p className="text-gray-300 text-xl font-['Space_Grotesk']">
                              {currentItem?.description}
                            </p>
                          </div>
                          
                          <Link 
                            href="/pricing" 
                            className="shrink-0 w-16 h-16 rounded-full bg-gradient-to-b from-cyan-500 to-indigo-600 p-[2px] group/btn"
                          >
                            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center group-hover/btn:bg-slate-800 transition-colors">
                              <svg className="w-6 h-6 text-cyan-500 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Navigation controls */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20">
                <button 
                  onClick={handlePrev}
                  className="w-14 h-14 rounded-full bg-slate-900/80 border border-cyan-500/30 backdrop-blur-sm flex items-center justify-center text-cyan-500 hover:bg-slate-800 transition-colors relative group"
                >
                  <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
              </div>
              
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20">
                <button 
                  onClick={handleNext}
                  className="w-14 h-14 rounded-full bg-slate-900/80 border border-cyan-500/30 backdrop-blur-sm flex items-center justify-center text-cyan-500 hover:bg-slate-800 transition-colors relative group"
                >
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
              </div>
            </div>
          </motion.div>
          
          {/* Thumbnail navigation */}
          <div className="relative flex justify-center mb-16">
            <div className="inline-flex gap-2 bg-slate-900/80 backdrop-blur-sm p-2 rounded-full border border-cyan-500/20">
              {filteredItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => handleDotClick(index)}
                  className={`w-12 h-12 rounded-full overflow-hidden relative ${
                    index === activeIndex ? 'ring-2 ring-cyan-500 scale-110' : 'opacity-60 hover:opacity-100'
                  } transition-all duration-300`}
                >
                  <Image 
                    src={item.thumbnail} 
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Bottom grid preview */}
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
                className="relative aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer"
                onClick={() => setActiveIndex(filteredItems.findIndex(i => i.id === item.id))}
              >
                <Image 
                  src={item.thumbnail} 
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                
                <div className="absolute inset-0 flex items-end p-3">
                  <div className="text-xs font-medium text-white font-['Space_Grotesk'] truncate">
                    {item.title}
                  </div>
                </div>
                
                <div className="absolute top-2 right-2">
                  <div className={`w-2 h-2 rounded-full ${activeIndex === filteredItems.findIndex(i => i.id === item.id) ? 'bg-cyan-500 animate-pulse' : 'bg-gray-500'}`}></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* CTA Section */}
          <div className="mt-16 text-center">
            <Link
              href="/pricing"
              className="relative inline-flex group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
              <button className="relative flex items-center gap-2 px-8 py-4 bg-slate-900 rounded-lg text-white leading-snug font-['Montserrat'] font-medium">
                <span>Find Your Coach</span>
                <svg className="w-5 h-5 text-cyan-500 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Animation styles */}
      <style jsx>{`
        @keyframes float-particle {
          0% { transform: translateY(0) translateX(0); opacity: 0.2; }
          25% { opacity: 0.8; }
          50% { transform: translateY(-30vh) translateX(20px); opacity: 0.2; }
          75% { opacity: 0.6; }
          100% { transform: translateY(-100vh) translateX(-20px); opacity: 0; }
        }
        
        .bg-grid-pattern {
          background-image:
            linear-gradient(to right, rgba(8, 145, 178, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(8, 145, 178, 0.1) 1px, transparent 1px);
          background-size: 30px 30px;
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
} 