"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// Define showcase designs (replacing streamers)
const showcaseDesigns = [
  {
    name: "Gaming Stream",
    style: "Cyberpunk",
    styleColor: "#00FFFF",
    elements: "15+ elements",
    image: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    description: "A complete package with futuristic cyberpunk overlays, perfect for gaming streams.",
    features: "Overlays, Alerts, Transitions"
  },
  {
    name: "Esports Team",
    style: "Minimalist",
    styleColor: "#6441A4",
    elements: "12+ elements",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    description: "Elegant and professional designs for esports teams that want a clean, branded look.",
    features: "Team Branding, Scoreboard, Transitions"
  },
  {
    name: "Creative Stream",
    style: "Colorful",
    styleColor: "#FF1493",
    elements: "18+ elements",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    description: "Vibrant graphics for artists, musicians and creative streamers to enhance their broadcasts.",
    features: "Art Overlays, Music Visualizer, Scenes"
  },
  {
    name: "IRL Streaming",
    style: "Modern",
    styleColor: "#FFE100",
    elements: "10+ elements",
    image: "https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    description: "Lightweight graphic elements optimized for outdoor and mobile streaming sessions.",
    features: "Location Tags, Mobile Optimized, Alerts"
  },
  {
    name: "Retro Gaming",
    style: "Retro 8-bit",
    styleColor: "#00FF66",
    elements: "14+ elements",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    description: "Nostalgic 8-bit and 16-bit inspired graphics for retro gaming enthusiasts.",
    features: "Pixel Frames, Game Overlays, Retro Effects"
  }
];

// Rename back to FeaturedStreamers for compatibility with imports
export default function FeaturedStreamers() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Mouse drag scrolling functionality
  const startDragging = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  const move = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scrolling speed
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  // Listen for touch events as well for mobile
  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const handleTouchStart = (e: TouchEvent) => {
      setIsDragging(true);
      setStartX(e.touches[0].pageX - scrollElement.offsetLeft);
      setScrollLeft(scrollElement.scrollLeft);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      const x = e.touches[0].pageX - scrollElement.offsetLeft;
      const walk = (x - startX) * 2;
      scrollElement.scrollLeft = scrollLeft - walk;
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    scrollElement.addEventListener('touchstart', handleTouchStart);
    scrollElement.addEventListener('touchmove', handleTouchMove);
    scrollElement.addEventListener('touchend', handleTouchEnd);

    return () => {
      scrollElement.removeEventListener('touchstart', handleTouchStart);
      scrollElement.removeEventListener('touchmove', handleTouchMove);
      scrollElement.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, startX, scrollLeft]);

  // Get visible cards based on scroll position
  useEffect(() => {
    if (!scrollRef.current) return;
    
    const handleScroll = () => {
      if (!scrollRef.current) return;
      const scrollPosition = scrollRef.current.scrollLeft;
      const cardWidth = scrollRef.current.offsetWidth;
      const newActiveIndex = Math.round(scrollPosition / cardWidth);
      setActiveIndex(Math.min(newActiveIndex, showcaseDesigns.length - 1));
    };
    
    scrollRef.current.addEventListener('scroll', handleScroll);
    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <section className="py-20 relative overflow-hidden" id="featured-streamers">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-black"></div>
      <div className="absolute inset-0 opacity-5 bg-noise-pattern"></div>
      
      {/* Brutalist shapes */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-cyan-500/20 -translate-y-1/3"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 translate-x-1/4 translate-y-1/4"></div>
      <div className="absolute top-1/3 right-10 w-32 h-32 rounded-full bg-pink-500/20"></div>
      
      {/* Grid lines */}
      <div className="absolute inset-0 grid-lines opacity-10"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 relative"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
            <div className="relative mb-6 md:mb-0">
              {/* Geometric accent */}
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-cyan-500/30 rotate-12"></div>
              <div className="absolute -bottom-3 -right-3 w-20 h-1 bg-pink-500"></div>
              
              <h2 className="text-4xl md:text-6xl font-black mb-3 text-white tracking-tight uppercase">
                Stream <span className="text-cyan-400">Overlay we can do</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl">
                Explore the types of streaming overlays and graphics we can create for your channel
              </p>
            </div>
            
            {/* Controls with pills design */}
            <div className="flex items-center space-x-2 bg-white/5 p-2 rounded-full backdrop-blur-sm">
              {showcaseDesigns.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => {
                    if (scrollRef.current) {
                      const cardWidth = scrollRef.current.offsetWidth;
                      scrollRef.current.scrollTo({
                        left: cardWidth * index,
                        behavior: 'smooth'
                      });
                    }
                  }}
                  className={`w-3 h-3 rounded-full transition-all ${
                    activeIndex === index 
                      ? 'bg-cyan-400 w-6' 
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`View ${showcaseDesigns[index].name}`}
                ></button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Large design cards in horizontal carousel */}
        <div 
          ref={scrollRef}
          className={`flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-12 pt-4 cursor-grab ${isDragging ? 'cursor-grabbing' : ''}`}
          onMouseDown={startDragging}
          onMouseLeave={stopDragging}
          onMouseUp={stopDragging}
          onMouseMove={move}
        >
          {showcaseDesigns.map((design, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 0.5 }}
              className="min-w-full w-full flex-shrink-0 snap-center px-4 md:px-12"
            >
              <div className="bg-[#111] relative overflow-hidden">
                {/* Brutal border */}
                <div className="absolute inset-0 border-[8px] border-white/10"></div>
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r" style={{ 
                  backgroundImage: `linear-gradient(to right, ${design.styleColor}, transparent)`
                }}></div>
                
                <div className="md:flex relative">
                  {/* Image section with geometric overlays */}
                  <div className="relative w-full md:w-1/2 aspect-video md:aspect-auto">
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="w-20 h-20 md:w-32 md:h-32 border-8 border-white/10 rounded-full flex items-center justify-center">
                        <div className="w-10 h-10 md:w-16 md:h-16 rounded-full" style={{ backgroundColor: design.styleColor }}></div>
                      </div>
                    </div>
                    
                    <img 
                      src={design.image} 
                      alt={design.name} 
                      className="w-full h-full object-cover object-center contrast-125 brightness-75 grayscale-[30%] mix-blend-luminosity"
                    />
                    
                    {/* Brutalist overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tr" style={{ 
                      backgroundImage: `linear-gradient(to top right, ${design.styleColor}40, transparent)`
                    }}></div>
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGgyMHYyMEgwVjB6IiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48cGF0aCBkPSJNMCAwdjRoNFYwSDB6bTAgMTZ2NGg0di00SDB6TTE2IDB2NGg0di00SDB6TTE2IDE2djRoNHYtNGgtNHoiIGZpbGw9IiNGRkYiIGZpbGwtb3BhY2l0eT0iLjEiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==')] opacity-20"></div>
                  </div>
                  
                  {/* Content with brutalist typography */}
                  <div className="w-full md:w-1/2 p-6 md:p-10 relative">
                    {/* Angle decorations */}
                    <div className="absolute top-0 right-0 border-t-[20px] border-r-[20px] border-white/10"></div>
                    
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">
                          {design.name}
                        </h3>
                        
                        <div 
                          className="text-xs font-mono bg-black/40 px-2 py-1 border border-white/20 uppercase tracking-wider"
                          style={{ color: design.styleColor }}
                        >
                          {design.style}
                        </div>
                      </div>
                      
                      <div className="w-16 h-1 mb-4" style={{ backgroundColor: design.styleColor }}></div>
                      
                      <p className="text-gray-300 text-lg mb-6">{design.description}</p>
                      
                      <div className="flex flex-wrap items-center gap-4 mb-6">
                        <div className="text-sm md:text-base uppercase font-bold text-white/70 tracking-wide flex items-center">
                          <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: design.styleColor }}></span>
                          {design.elements}
                        </div>
                        
                        <div className="text-sm md:text-base uppercase font-bold text-white/70 tracking-wide flex items-center">
                          <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: design.styleColor }}></span>
                          {design.features}
                        </div>
                      </div>
                    </div>
                    
                    {/* Brutal container for features */}
                    <div className="border-2 border-white/10 p-4 relative">
                      <div className="absolute -top-3 left-4 px-2 bg-[#111] uppercase text-xs tracking-widest text-white/60">
                        Includes
                      </div>
                      
                      <div className="flex flex-wrap gap-3">
                        {design.features.split(', ').map((feature, i) => (
                          <div 
                            key={i} 
                            className="px-3 py-1.5 text-white text-sm font-medium border relative overflow-hidden group"
                            style={{ borderColor: `${design.styleColor}60` }}
                          >
                            <div className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-10 transition-opacity duration-300" style={{ backgroundColor: design.styleColor }}></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Bottom information bar */}
                <div className="flex items-center justify-between px-6 py-4 bg-black/40 border-t border-white/10">
                  <div className="text-white/70 text-sm uppercase tracking-wider font-mono">
                    #{index + 1} / {showcaseDesigns.length}
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-white/30 mr-2"></div>
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: design.styleColor }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mt-12"
        >
          <a 
            href="#pricing" 
            className="group relative inline-flex items-center"
          >
            {/* Offset shape */}
            <div className="absolute inset-0 bg-cyan-500 translate-x-2 translate-y-2"></div>
            
            <div className="px-6 py-3 bg-black border-2 border-white relative flex items-center space-x-2 font-bold group-hover:bg-cyan-500/10 transition-colors">
              <span className="text-white">Get a custom design for your streaming channel</span>
              <svg className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </a>
        </motion.div>
      </div>
      
      {/* Custom styles */}
      <style jsx>{`
        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        .bg-noise-pattern {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
        
        .grid-lines {
          background-image: 
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </section>
  );
} 