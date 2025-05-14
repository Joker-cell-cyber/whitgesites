"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [glitchActive, setGlitchActive] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
    }

    // Random glitch effect
    const glitchInterval = setInterval(() => {
      const shouldGlitch = Math.random() > 0.7;
      if (shouldGlitch) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 200 + Math.random() * 400);
      }
    }, 3000);

    // Track mouse movement for 3D effect
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 25,
        y: (e.clientY - window.innerHeight / 2) / 25,
      });
    };

    // Track scroll for parallax effect
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(glitchInterval);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Text animation variants
  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  // Split text for letter animation
  const titleWords = "LEVEL UP YOUR STREAM WITH PROFESSIONAL OVERLAYS".split(" ");

  return (
    <section className="relative min-h-screen flex items-center overflow-visible pt-20 pb-20" id="home">
      {/* Fixed position background - noise texture */}
      <div className="absolute inset-0 bg-black noise-bg"></div>
      
      {/* Grain overlay */}
      <div className="absolute inset-0 bg-grain mix-blend-overlay opacity-20"></div>
      
      {/* 3D grid floor effect */}
      <div className="absolute inset-x-0 bottom-0 h-[40vh] perspective-grid">
        <div 
          className="grid-floor"
          style={{ 
            transform: `rotateX(60deg) rotateZ(${mousePosition.x * 0.05}deg) translateZ(0px) translateY(${scrollY * 0.1}px)` 
          }}
        ></div>
      </div>
      
      {/* Geometric accent shapes */}
      <motion.div 
        className="absolute top-1/4 left-10 md:left-20 w-64 h-64 bg-gradient-to-r from-red-700/20 to-red-500/5 rounded-full blur-3xl"
        style={{ 
          x: mousePosition.x * -0.5,
          y: mousePosition.y * -0.5,
        }}
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          repeatType: "reverse"
        }}
      ></motion.div>
      
      <motion.div 
        className="absolute bottom-1/4 right-10 md:right-20 w-80 h-80 bg-gradient-to-r from-amber-700/10 to-red-500/10 rounded-full blur-3xl"
        style={{ 
          x: mousePosition.x * 0.5,
          y: mousePosition.y * 0.5,
        }}
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1
        }}
      ></motion.div>
      
      {/* Video Background container with custom styling */}
      <div className="absolute inset-0 z-1 opacity-20 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-black/80"></div>
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          loop 
          playsInline
          className={`absolute inset-0 w-full h-full object-cover scale-110 ${glitchActive ? 'animate-glitch' : ''}`}
        >
          <source src="/video/stream_background.mp4" type="video/mp4" />
        </video>
        
        {/* Video overlay effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(237,33,58,0.1),transparent_70%)]"></div>
        
        {/* Scan lines */}
        <div className="absolute inset-0 scanlines pointer-events-none"></div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 pt-10 md:pt-20">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left Column - Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full lg:w-1/2 space-y-8"
            style={{ 
              perspective: "1000px",
              transformStyle: "preserve-3d",
              transform: `rotateY(${mousePosition.x * 0.02}deg) rotateX(${mousePosition.y * -0.02}deg)` 
            }}
          >
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center rounded-full px-4 py-1.5 text-sm backdrop-blur-sm bg-white/5 border border-white/10 text-gray-300 shadow-inner"
            >
              <span className="flex h-2 w-2 rounded-full bg-red-500 mr-2 animate-pulse"></span>
              Premium Stream Graphics & Overlays
            </motion.div>
            
            {/* Main heading with animated letters */}
            <div className="relative">
              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter">
                {titleWords.map((word, wordIndex) => (
                  <span key={wordIndex} className="inline-block mr-[0.25em] relative">
                    {word.split("").map((letter, letterIndex) => (
                      <motion.span
                        key={letterIndex}
                        className={`inline-block ${word === "STREAM" ? "text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-amber-600" : "text-white"}`}
                        initial="hidden"
                        animate="visible"
                        variants={letterVariants}
                        transition={{ 
                          duration: 0.5, 
                          delay: 0.1 + wordIndex * 0.05 + letterIndex * 0.02
                        }}
                      >
                        {letter}
                      </motion.span>
                    ))}
                    {wordIndex < titleWords.length - 1 ? " " : ""}
                  </span>
                ))}
              </h1>
              
              {/* Decorative elements */}
              <motion.div 
                className="absolute -top-6 -left-6 w-12 h-12 border-t-2 border-l-2 border-red-500"
                initial={{ opacity: 0, x: -10, y: -10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              ></motion.div>
              <motion.div 
                className="absolute -bottom-6 -right-6 w-12 h-12 border-b-2 border-r-2 border-red-500"
                initial={{ opacity: 0, x: 10, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              ></motion.div>
            </div>
            
            <motion.p 
              className="text-xl text-gray-300 md:text-2xl leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              Stand out on Twitch, Kick, and DLive with custom animated overlays, alerts, and stream packages.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              <Link 
                href="/#pricing" 
                className="relative group"
              >
                <div className="absolute inset-0 bg-red-600 translate-x-2 translate-y-2 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform duration-300"></div>
                <div className="relative px-8 py-4 bg-black border-2 border-white text-white font-bold text-lg uppercase tracking-widest">
                  Boost Your Channel Today
                </div>
              </Link>
            </motion.div>
            
            {/* Platform Compatibility */}
            <motion.div 
              className="flex items-center space-x-6 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.5 }}
            >
              <span className="text-sm text-gray-400 uppercase tracking-wider font-mono">Compatible with:</span>
              <div className="flex items-center space-x-5">
                <div className="text-red-500 hover:text-red-400 transition-all transform hover:scale-110">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.64 5.93h1.43v4.28h-1.43m3.93-4.28H17v4.28h-1.43M7 2L3.43 5.57v12.86h4.28V22l3.58-3.57h2.85L20.57 12V2m-1.43 9.29l-2.85 2.85h-2.86l-2.5 2.5v-2.5H7.71V3.43h11.43z"/>
                  </svg>
                </div>
                <div className="text-red-500">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-9.4l6 3.4-6 3.4v-6.8z"/>
                  </svg>
                </div>
                <div className="text-amber-500">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <div className="text-gray-400">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                  </svg>
                </div>
                <div className="text-gray-400">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-4.312 10.526c0-1.974 1.599-3.574 3.573-3.574s3.573 1.599 3.573 3.574-1.599 3.574-3.573 3.574-3.573-1.6-3.573-3.574zm11.102 4.425c.241-1.989-.017-3.025-1.258-4.543 1.093-.711 1.722-1.897 1.722-3.172 0-2.189-1.772-3.967-3.956-3.967-.101 0-.202.004-.301.011l-.057-2.275c-.018-.739-.96-1.007-1.269-.354l-1.195 2.5c-.104.217-.159.46-.159.708 0 .969.784 1.755 1.752 1.756.21 0 .41-.039.6-.109l1.279 1.276c-.183.313-.285.675-.285 1.054 0 1.151.932 2.084 2.082 2.084.407 0 .785-.119 1.104-.323l.325 1.504c.36.166.179.233.317.233.306 0 .516-.318.434-.623l-.797-2.758c.892-.902 1.481-2.279 1.481-3.676 0-1.239-.496-2.569-1.549-3.301-1.79-1.249-4.621-1.036-6.237.627-2.111 2.167-2.039 5.85-.173 7.899h-4.6c-.276 0-.5.224-.5.5s.224.5.5.5h9.462c.13 0 .26-.03.379-.08.119.05.249.08.379.08h.171c.276 0 .5-.224.5-.5s-.224-.5-.5-.5z"/>
                  </svg>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative z-20">
              {/* Fragmented image container with 3D perspective */}
              <div className="relative aspect-video overflow-visible">
                {/* Main image with 3D effect */}
                <div className="fragment-container" style={{ 
                  transform: `rotateY(${mousePosition.x * 0.03}deg) rotateX(${mousePosition.y * -0.03}deg)` 
                }}>
                  <div className="w-full h-full transform-gpu transition-transform duration-300 ease-out">
                    <img
                      src="https://images.unsplash.com/photo-1598550476439-6847785fcea6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                      alt="Streaming setup with overlays"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>
                
                {/* Decorative frame */}
                <div className="absolute inset-0 border-2 border-white/30 z-30 pointer-events-none"></div>
                
                {/* Decorative elements */}
                <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-red-500 z-30"></div>
                <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-red-500 z-30"></div>
                
                {/* Highlight effects */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-500/10 to-amber-500/10 z-20 mix-blend-overlay"></div>
              </div>
              
              {/* Glitch overlay */}
              <div className={`absolute inset-0 glitch-overlay ${glitchActive ? 'opacity-70' : 'opacity-0'}`}></div>
              
              {/* Floating ui elements */}
              <motion.div 
                className="absolute -right-6 top-1/4 p-4 bg-black/80 backdrop-blur-sm border border-white/20 shadow-xl z-30"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                style={{ transform: `translateZ(50px) rotateX(${mousePosition.y * -0.05}deg) rotateY(${mousePosition.x * 0.05}deg)` }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-500 flex items-center justify-center text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white font-bold">Animated Alerts</div>
                    <div className="text-gray-400 text-sm">Grab Attention</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -left-6 bottom-1/4 p-4 bg-black/80 backdrop-blur-sm border border-white/20 shadow-xl z-30"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.5 }}
                style={{ transform: `translateZ(30px) rotateX(${mousePosition.y * -0.05}deg) rotateY(${mousePosition.x * 0.05}deg)` }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-amber-500 flex items-center justify-center text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white font-bold">Screen Transitions</div>
                    <div className="text-gray-400 text-sm">Professional Flow</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Custom styles */}
      <style jsx>{`
        .noise-bg {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          background-color: black;
        }
        
        .bg-grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
        
        .perspective-grid {
          perspective: 1000px;
          overflow: hidden;
        }
        
        .grid-floor {
          position: absolute;
          top: 0;
          left: -50%;
          width: 200%;
          height: 200%;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 50px 50px;
          transform-origin: center top;
        }
        
        .scanlines {
          background: linear-gradient(
            to bottom,
            transparent 50%,
            rgba(0, 0, 0, 0.5) 51%
          );
          background-size: 100% 4px;
          background-repeat: repeat;
          mix-blend-mode: difference;
        }
        
        .fragment-container {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          perspective: 1000px;
          transform-origin: center center;
          transition: transform 0.1s ease-out;
          box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.5);
        }
        
        .fragment-slice {
          position: absolute;
          top: 0;
          height: 100%;
          overflow: hidden;
          transform-style: preserve-3d;
          transition: transform 0.2s ease-out;
        }
        
        .fragment-slice img {
          position: absolute;
          top: 0;
          width: 500%;
          height: 100%;
          object-fit: cover;
          left: calc(-100% * var(--index, 0));
          transform: none;
        }
        
        .glitch-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(
              to bottom, 
              transparent, 
              rgba(255,0,0,0.2) 20%, 
              transparent 21%, 
              transparent 40%, 
              rgba(0,255,255,0.2) 41%, 
              transparent 42%, 
              transparent 60%, 
              rgba(255,0,0,0.2) 61%, 
              transparent
            );
          background-size: 100% 8px;
          mix-blend-mode: color-dodge;
          transition: opacity 0.2s ease;
        }
      `}</style>
    </section>
  );
} 