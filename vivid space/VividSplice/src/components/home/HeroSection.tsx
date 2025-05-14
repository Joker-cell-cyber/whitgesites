"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  
  // Simulating video timeline progression
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentFrame((prev) => (prev < 100 ? prev + 1 : 0));
      }, 100);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying]);
  
  return (
    <section className="relative min-h-screen overflow-hidden pt-20 pb-12" id="home">
      {/* Dark overlay background with noise texture */}
      <div className="absolute inset-0 z-0 bg-black/50">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-80"></div>
      </div>
      
      {/* Video background with color overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="absolute w-full h-full object-cover opacity-20"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-editing-a-video-in-a-studio-22886-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 via-[#121218]/80 to-[#121218]/90"></div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 relative z-10 flex flex-col h-full justify-center pt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-5xl mx-auto mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-900/30 backdrop-blur-sm border border-blue-500/30 mb-6">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 mr-2 animate-pulse"></div>
            <span className="text-sm font-medium text-gray-200 mr-2">RECORDING</span>
            <span className="text-sm text-gray-400">Your Vision, Our Expertise</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 font-display tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-turquoise-300 to-turquoise-200">
              Video Editing
            </span>
            <br />
            <span className="relative inline-block mt-2">
              Redefined<span className="absolute -bottom-1 left-0 w-full h-1 bg-turquoise-500"></span>
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            Professional post-production that amplifies your message and <br className="hidden md:block" />
            captures your audience's attention from frame one.
          </p>
        </motion.div>
        
        {/* Video editor UI elements */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative max-w-6xl mx-auto w-full mb-12"
        >
          {/* Simulated editor preview */}
          <div className="relative rounded-xl overflow-hidden border border-gray-700/50 shadow-2xl">
            {/* Video preview area */}
            <div className="aspect-video relative bg-[#0c0c10] overflow-hidden">
              {/* Overlay grid pattern */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCI+PGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjIyIiBzdHJva2Utb3BhY2l0eT0iMC4xIiBzdHJva2Utd2lkdGg9IjEiPjxwYXRoIGQ9Ik0wIDBINTBWNTAiLz48L2c+PC9zdmc+')]"></div>
              
              {/* Video content */}
              <div className="relative w-full h-full">
                <Image
                  src="https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                  alt="Video editing workspace"
                  className="opacity-90 object-cover"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                />
              </div>
              
              {/* Editor overlay elements */}
              <div className="absolute inset-0">
                {/* Safe area markers */}
                <div className="absolute inset-x-8 inset-y-8 border-2 border-dashed border-white/20 pointer-events-none"></div>
                
                {/* Corner time counter */}
                <div className="absolute top-4 right-4 bg-black/80 text-red-500 font-mono text-sm px-2 py-1 rounded">
                  00:02:34:15
                </div>
                
                {/* Editing indicators */}
                <div className="absolute bottom-6 left-6 flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-turquoise-500/20 backdrop-blur-sm flex items-center justify-center border border-turquoise-500/50">
                    <svg className="w-6 h-6 text-turquoise-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.5 12L9.5 16.3301V7.66987L15.5 12Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <div className="text-sm bg-black/40 px-3 py-1.5 rounded-full text-gray-300 backdrop-blur-sm">
                    Effects Applied
                  </div>
                </div>
              </div>
            </div>
            
            {/* Timeline UI */}
            <div className="bg-[#1a1a24] p-4 border-t border-gray-700/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-turquoise-500 text-white hover:bg-turquoise-600 transition-colors"
                  >
                    {isPlaying ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12H3" />
                    </svg>
                  </button>
                  <div className="text-gray-400 text-sm font-mono">
                    00:02:34.15 / 00:07:15.00
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 text-xs border border-turquoise-500/40 text-turquoise-400 rounded-md hover:bg-turquoise-500/10 transition-colors">
                    Color Grade
                  </button>
                  <button className="px-3 py-1 text-xs border border-blue-500/40 text-blue-400 rounded-md hover:bg-blue-500/10 transition-colors">
                    Sound FX
                  </button>
                  <button className="px-3 py-1 text-xs border border-violet-500/40 text-violet-400 rounded-md hover:bg-violet-500/10 transition-colors">
                    Motion
                  </button>
                </div>
              </div>
              
              {/* Timeline tracks */}
              <div className="relative h-12 bg-[#0c0c10] rounded-md overflow-hidden">
                <div className="absolute inset-0 flex flex-col">
                  {/* Video track */}
                  <div className="flex-1 border-b border-gray-700/50 p-1">
                    <div className="relative h-full w-full">
                      <div className="absolute top-0 left-0 h-full w-[70%] bg-gradient-to-r from-blue-500/20 to-turquoise-500/20 rounded-sm">
                        <div className="absolute inset-y-0 left-[20%] w-[30%] bg-turquoise-500/30 rounded-sm"></div>
                        <div className="absolute inset-y-0 left-[60%] w-[15%] bg-blue-500/30 rounded-sm"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Audio track */}
                  <div className="flex-1 p-1">
                    <div className="relative h-full w-full">
                      <div className="absolute top-0 left-0 h-full w-[90%] bg-gradient-to-r from-violet-500/20 via-violet-500/40 to-violet-500/20 rounded-sm">
                        <div className="absolute inset-0">
                          {Array.from({ length: 50 }).map((_, i) => (
                            <div 
                              key={i} 
                              className="absolute bg-violet-400/70" 
                              style={{
                                height: `${Math.random() * 100}%`,
                                width: '1.5px',
                                left: `${i * 2}%`,
                                top: '50%',
                                transform: 'translateY(-50%)'
                              }}
                            ></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Playhead */}
                <div 
                  className="absolute top-0 h-full w-0.5 bg-red-500 z-10"
                  style={{ left: `${currentFrame}%` }}
                >
                  <div className="absolute -top-1 -translate-x-1/2 w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="absolute -bottom-1 -translate-x-1/2 w-3 h-3 bg-red-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Call to action */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-8"
        >
          <div className="flex justify-center">
            <Link
              href="/#pricing"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-turquoise-500 text-white rounded-lg font-medium shadow-lg shadow-turquoise-500/20 hover:shadow-turquoise-500/30 hover:-translate-y-0.5 transition-all duration-300 text-lg font-accent"
            >
              See Our Packages
            </Link>
          </div>
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-blue-600/20 rounded-full filter blur-[120px] opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-turquoise-600/20 rounded-full filter blur-[100px] opacity-50"></div>
    </section>
  );
} 