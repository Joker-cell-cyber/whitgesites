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
    description: "A complete package with futuristic cyberpunk overlays, perfect for games like Cyberpunk 2077.",
    features: "Webcam, Alerts, Transitions"
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
    description: "Perfect for artists, musicians, and content creators who want to showcase their creativity.",
    features: "Art Overlays, Music Visualizer, Scenes"
  },
  {
    name: "IRL Streaming",
    style: "Modern",
    styleColor: "#FFE100",
    elements: "10+ elements",
    image: "https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    description: "Optimized for outdoor and mobile streaming, with lightweight elements adapted to different conditions.",
    features: "Location Tags, Mobile Optimized, Alerts"
  },
  {
    name: "Retro Gaming",
    style: "Retro 8-bit",
    styleColor: "#00FF66",
    elements: "14+ elements",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    description: "Designed for retro gaming fans, with 8-bit and 16-bit graphics and animations inspired by classics.",
    features: "Pixel Frames, Game Overlays, Retro Effects"
  }
];

// Rename back to FeaturedStreamers for compatibility with imports
export default function FeaturedStreamers() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

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

  return (
    <section className="py-20 bg-[#121212]" id="featured-streamers">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Discover Our <span className="gradient-text">Designs</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Explore our collection of themes and overlays ready to transform your streaming experience
          </p>
        </motion.div>

        {/* Scroll Instructions */}
        <div className="hidden md:flex items-center justify-center mb-8 text-gray-500 text-sm">
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
          <span>Drag to explore more designs</span>
        </div>

        {/* Designs Carousel */}
        <div 
          ref={scrollRef}
          className={`flex overflow-x-auto pb-8 space-x-6 no-scrollbar cursor-grab ${isDragging ? 'cursor-grabbing' : ''}`}
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
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex-shrink-0 w-full md:w-[350px] bg-[#1a1a1a] rounded-xl overflow-hidden shadow-lg"
              style={{ maxWidth: "min(350px, 80vw)" }}
            >
              <div className="relative h-48">
                <img 
                  src={design.image} 
                  alt={design.name} 
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent"></div>
                
                {/* Style Badge */}
                <div 
                  className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium flex items-center" 
                  style={{ backgroundColor: `${design.styleColor}30`, color: design.styleColor }}
                >
                  <span className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: design.styleColor }}></span>
                  {design.style}
                </div>
                
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center">
                    <h3 className="text-xl font-bold text-white">{design.name}</h3>
                    <div className="ml-auto text-sm text-gray-300 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      {design.elements}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-5">
                <p className="text-gray-300 mb-4">{design.description}</p>
                
                <div className="flex items-center mt-4 pt-4 border-t border-gray-800">
                  <div className="text-xs text-gray-500">Includes:</div>
                  <div 
                    className="ml-2 px-2 py-1 rounded text-xs" 
                    style={{ 
                      background: `linear-gradient(to right, ${design.styleColor}30, #00FFFF20)`,
                      color: '#ffffff' 
                    }}
                  >
                    {design.features}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-8"
        >
          <a href="#pricing" className="inline-flex items-center text-[#00FFFF] hover:text-white transition-colors font-medium">
            <span>Customize these designs to fit your needs</span>
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
} 