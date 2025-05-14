"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Sample portfolio items (replace with actual data when available)
const portfolioItems = [
  {
    id: 1,
    title: "Cinematic Gaming Montage",
    category: "Gaming",
    tags: ["Editing", "Color Grading", "Motion Graphics"],
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    accent: "#FF2D55"
  },
  {
    id: 2,
    title: "Product Launch Video",
    category: "Commercial",
    tags: ["VFX", "Sound Design", "4K"],
    thumbnail: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    accent: "#00E5FF"
  },
  {
    id: 3,
    title: "Travel Vlog Series",
    category: "Lifestyle",
    tags: ["Drone Footage", "Transitions", "Storytelling"],
    thumbnail: "https://images.unsplash.com/photo-1500835556837-99ac94a94552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    accent: "#FFD60A"
  }
];

export default function PortfolioSection() {
  const [activeItem, setActiveItem] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Parallax effect values
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -10]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  
  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveItem((prev) => (prev + 1) % portfolioItems.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="portfolio" className="relative bg-black py-24 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-black/50 to-transparent z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16">
          <div className="mb-8 md:mb-0">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-pink-500/30 rotate-12"></div>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase">
                Stream <span className="text-pink-400">Enhancement</span> <span className="text-white">Services</span>
              </h2>
            </div>
            <p className="text-gray-400 text-lg max-w-2xl mt-6">
              Transform your stream with our professional design services. While we don't offer video editing or montage services, we specialize in creating custom graphics and overlays that will take your stream to the next level.
            </p>
          </div>
          
          <div className="flex space-x-2">
            <a 
              href="#contact" 
              className="inline-flex px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-bold transition-colors"
            >
              Discuss Your Project
            </a>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Service 1 */}
          <div className="bg-zinc-900/80 backdrop-blur p-8 border border-zinc-800 group hover:border-pink-500/50 transition-colors">
            <div className="w-16 h-16 bg-pink-500/20 rounded-md flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Stream Overlay Design</h3>
            <p className="text-gray-400 mb-6">
              Custom overlays, frames, alerts and transitions designed specifically for your brand and content style. Create a cohesive visual experience for your viewers.
            </p>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-pink-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Scene transitions and frames
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-pink-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Alerts and notification animations
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-pink-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Starting soon and be right back screens
              </li>
            </ul>
          </div>
          
          {/* Service 2 */}
          <div className="bg-zinc-900/80 backdrop-blur p-8 border border-zinc-800 group hover:border-pink-500/50 transition-colors">
            <div className="w-16 h-16 bg-pink-500/20 rounded-md flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.172 2.172a2 2 0 010 2.828l-8.486 8.486a2 2 0 01-2.828 0l-2.172-2.172a2 2 0 010-2.828L7.343 11" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Stream Branding Package</h3>
            <p className="text-gray-400 mb-6">
              Comprehensive branding elements to give your channel a professional, cohesive look that stands out from the crowd.
            </p>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-pink-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Logo and identity design
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-pink-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Channel banners and panels
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-pink-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Social media assets
              </li>
            </ul>
          </div>
          
          {/* Service 3 */}
          <div className="bg-zinc-900/80 backdrop-blur p-8 border border-zinc-800 group hover:border-pink-500/50 transition-colors">
            <div className="w-16 h-16 bg-pink-500/20 rounded-md flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Animated Stream Elements</h3>
            <p className="text-gray-400 mb-6">
              Eye-catching animated elements that bring your stream to life with professional motion graphics.
            </p>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-pink-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Subscriber and follower animations
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-pink-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Animated backgrounds and scenes
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-pink-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Custom emotes and badges
              </li>
            </ul>
          </div>
          
          {/* Service 4 */}
          <div className="bg-zinc-900/80 backdrop-blur p-8 border border-zinc-800 group hover:border-pink-500/50 transition-colors">
            <div className="w-16 h-16 bg-pink-500/20 rounded-md flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Stream Integration Setup</h3>
            <p className="text-gray-400 mb-6">
              Technical assistance to set up your streaming software with all the visual elements and ensure everything works smoothly.
            </p>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-pink-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                OBS/Streamlabs setup assistance
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-pink-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Overlay and alert integration
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-pink-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Scene and transition configuration
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
} 