"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

type ContentCategory = "all" | "shortform" | "longform" | "commercial";

interface ContentType {
  id: string;
  title: string;
  category: ContentCategory[];
  thumbnail: string;
  description: string;
  highlight?: boolean;
}

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState<ContentCategory>("all");
  const [selectedContent, setSelectedContent] = useState<ContentType | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  // Content types data
  const contentTypes: ContentType[] = [
    {
      id: "c1",
      title: "Social Media Shorts",
      category: ["shortform"],
      thumbnail: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80",
      description: "Eye-catching short-form videos optimized for TikTok, Instagram Reels, and YouTube Shorts.",
      highlight: true
    },
    {
      id: "c2",
      title: "Brand Stories",
      category: ["shortform", "commercial"],
      thumbnail: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80",
      description: "Compelling brand narratives that connect with your audience on an emotional level."
    },
    {
      id: "c3",
      title: "Product Showcases",
      category: ["commercial"],
      thumbnail: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80",
      description: "Highlight your products' features and benefits with professional product videos."
    },
    {
      id: "c4",
      title: "Interview Productions",
      category: ["longform"],
      thumbnail: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80",
      description: "Professional interview setups with expert editing to create compelling testimonials."
    },
    {
      id: "c5",
      title: "Documentary Style",
      category: ["longform"],
      thumbnail: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80",
      description: "Cinematic documentary-style videos that tell deeper stories with emotional impact.",
      highlight: true
    },
    {
      id: "c6",
      title: "Fitness & Lifestyle",
      category: ["shortform", "commercial"],
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80",
      description: "Dynamic fitness and lifestyle content that inspires and motivates viewers."
    },
    {
      id: "c7",
      title: "Corporate Videos",
      category: ["commercial", "longform"],
      thumbnail: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80",
      description: "Professional corporate videos for training, internal communications, and presentations."
    },
    {
      id: "c8",
      title: "Music Videos",
      category: ["shortform"],
      thumbnail: "https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80",
      description: "Creative music videos with professional editing, effects, and color grading.",
      highlight: true
    }
  ];

  // Filter content based on active category
  const filteredContent = contentTypes.filter(
    content => activeCategory === "all" || content.category.includes(activeCategory)
  );

  // Function to open content details
  const openContentDetails = (content: ContentType) => {
    setSelectedContent(content);
  };

  // Function to scroll the carousel
  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    
    const scrollAmount = carouselRef.current.clientWidth * 0.75;
    const newScrollLeft = direction === 'left' 
      ? carouselRef.current.scrollLeft - scrollAmount
      : carouselRef.current.scrollLeft + scrollAmount;
    
    carouselRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  };

  return (
    <section 
      ref={sectionRef}
      className="relative overflow-hidden py-24 lg:py-32" 
      id="portfolio"
    >
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjAyQzVBIiBzdHJva2Utb3BhY2l0eT0iMC4wMyIgc3Ryb2tlLXdpZHRoPSIyIj48cGF0aCBkPSJNLTYuOTI4MiAxNWwxNS0xNU01My4wNzIgMTVsMTUtMTVNLTYuOTI4MiAxNWwxNSAxNU0zMy4wNzIgNTRsMzAtMzBNNDMuMDcyIDQ0bDEwIDEwTTMuMDcyIDU0bDEwIDEwTTE4LjA3MiAyOWw1IDVNLTEuOTI4MiA0MGw1IDVNMjguMDcyIDI5bDUgNSIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[#1a1a22]/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#1a1a22]/80 to-transparent"></div>
        <div className="absolute right-0 bottom-1/4 w-96 h-96 bg-turquoise-500/5 rounded-full filter blur-3xl"></div>
        <div className="absolute left-0 top-1/3 w-96 h-96 bg-blue-600/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-4">
            <div className="h-1 w-10 bg-blue-500 inline-block mr-2"></div>
            <div className="h-1 w-5 bg-turquoise-500 inline-block"></div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 font-display">
            Content <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-turquoise-400">Categories</span>
            </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore the different types of videos we can create for your brand or personal project
            </p>
          </motion.div>

        {/* Category filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center flex-wrap gap-2 mb-16"
        >
          {[
            { id: "all", label: "All Content" },
            { id: "shortform", label: "Short-Form" },
            { id: "longform", label: "Long-Form" },
            { id: "commercial", label: "Commercial" }
          ].map((category) => (
          <button
              key={category.id}
              onClick={() => setActiveCategory(category.id as ContentCategory)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-blue-600 to-turquoise-500 text-white shadow-lg"
                  : "bg-[#1a1a24] text-gray-300 hover:bg-gray-800 border border-gray-800"
              }`}
            >
              {category.label}
          </button>
          ))}
        </motion.div>

        {/* 3D Carousel */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-between absolute -left-4 -right-4 top-1/2 z-10 transform -translate-y-1/2 pointer-events-none"
          >
          <button
              onClick={() => scrollCarousel('left')}
              className="w-12 h-12 rounded-full bg-[#1a1a24]/80 border border-gray-700/50 text-white backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-blue-600/80 transition-colors pointer-events-auto"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
          </button>
          <button
              onClick={() => scrollCarousel('right')}
              className="w-12 h-12 rounded-full bg-[#1a1a24]/80 border border-gray-700/50 text-white backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-blue-600/80 transition-colors pointer-events-auto"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
          </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative mb-16"
          >
            <div 
              ref={carouselRef}
              className="flex overflow-x-auto hide-scrollbar gap-5 pb-8 pt-8 px-6 perspective-1000"
            >
              {filteredContent.map((content, index) => (
                <motion.div
                  key={content.id}
                  initial={{ opacity: 0, rotateY: 8, scale: 0.9 }}
                  animate={{ 
                    opacity: 1, 
                    rotateY: 0, 
                    scale: 1,
                    transition: { 
                      delay: 0.1 * index,
                      duration: 0.6 
                    }
                  }}
                  className={`group relative flex-shrink-0 w-[320px] md:w-[380px] transform transition-transform duration-300
                    ${content.highlight ? 'scale-105 z-10' : 'scale-100 hover:scale-[1.03]'}`}
                >
                  {/* Card with cinematic aspect ratio */}
                  <div 
                    className={`relative overflow-hidden rounded-xl shadow-2xl bg-[#0c0c10] preserve-3d
                      ${content.highlight ? 'border-2 border-turquoise-500/30' : 'border border-gray-800/50'}`}
                  >
                    {/* Thumbnail with overlay */}
                  <div className="aspect-video relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300 z-10"></div>
                      
                      <div className="absolute inset-0 bg-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                      
                      <img 
                        src={content.thumbnail} 
                        alt={content.title}
                        className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-5000 ease-in-out"
                      />
                    </div>
                    
                    {/* View Details UI */}
                    <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button 
                        onClick={() => openContentDetails(content)}
                        className="w-16 h-16 bg-gradient-to-r from-blue-600 to-turquoise-500 rounded-full flex items-center justify-center text-white transform transition-transform duration-300 hover:scale-110"
                      >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                    </div>
                    
                    {/* Overlay meta information */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                      <div className="flex justify-between items-end">
                        <div>
                          <h3 className="text-xl font-bold text-white font-display mb-2 group-hover:text-turquoise-300 transition-colors">
                            {content.title}
                          </h3>
                          <div className="flex items-center">
                            <span className="w-2 h-2 rounded-full bg-turquoise-500 mr-2"></span>
                            <span className="text-xs text-gray-400 font-mono">
                              {content.category[0].charAt(0).toUpperCase() + content.category[0].slice(1)}
                        </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Reflection effect */}
                  <div className="h-12 mt-1 bg-gradient-to-b from-gray-900/20 to-transparent transform scale-y-[-1] rounded-b-lg opacity-30 blur-[1px]"></div>
                </motion.div>
              ))}
            </div>
            </motion.div>
        </div>
        
        {/* CTA section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="inline-block mb-4">
            <div className="h-1 w-5 bg-blue-500 inline-block mr-2"></div>
            <div className="h-1 w-10 bg-turquoise-500 inline-block"></div>
          </div>
          <h3 className="text-2xl font-bold mb-6 font-display">
            Ready to Create Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-turquoise-400">Perfect Video</span>?
          </h3>
          <div className="flex justify-center">
            <Link
              href="/pricing"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-turquoise-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-turquoise-500/20 transition-all duration-300 hover:-translate-y-0.5 font-accent"
            >
              View Our Packages
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Content Details Modal */}
      <AnimatePresence>
        {selectedContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedContent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-5xl bg-[#0c0c10] rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedContent(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="aspect-video relative">
                <img 
                  src={selectedContent.thumbnail}
                  alt={selectedContent.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c10] via-transparent to-transparent"></div>
              </div>
              
              <div className="p-6 -mt-20 relative z-10">
                <h3 className="text-3xl font-bold text-white mb-4 font-display">{selectedContent.title}</h3>
                <div className="flex flex-wrap gap-y-2 gap-x-4 mb-6">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-turquoise-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <span className="text-gray-300 text-sm">
                      {selectedContent.category.map(cat => 
                        cat.charAt(0).toUpperCase() + cat.slice(1)
                      ).join(", ")}
                    </span>
                  </div>
                </div>
                <p className="text-gray-300 text-lg mb-8">
                  {selectedContent.description}
                </p>
                <div className="flex justify-center">
                  <Link
                    href="/pricing"
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-turquoise-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-turquoise-500/20 transition-all duration-300 hover:-translate-y-0.5 font-accent"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
} 