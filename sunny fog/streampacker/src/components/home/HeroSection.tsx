"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [glitchActive, setGlitchActive] = useState(false);

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

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-visible pt-16 pb-16" id="home">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-20 right-[10%] w-72 h-72 bg-[#6441A4]/20 rounded-full filter blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 left-[5%] w-80 h-80 bg-[#00FFFF]/15 rounded-full filter blur-3xl"></div>
        <div className="absolute top-40 left-[30%] w-64 h-64 bg-gradient-to-r from-[#6441A4]/10 to-[#00FFFF]/10 rounded-full filter blur-2xl animate-float"></div>
        <div className="absolute bottom-40 right-[20%] w-48 h-48 bg-[#FF1493]/10 rounded-full filter blur-xl"></div>
        
        {/* Digital grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzZiNzI4MCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDgiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        
        {/* Horizontal scan line effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FFFF]/5 to-transparent h-20 animate-scanline"></div>
      </div>
      
      {/* Video Background */}
      <div className="absolute inset-0 z-1 opacity-20 pointer-events-none">
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          loop 
          playsInline
          className={`absolute inset-0 w-full h-full object-cover ${glitchActive ? 'animate-glitch' : ''}`}
        >
          <source src="/video/stream_background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-transparent to-[#121212] z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#6441A4]/10 to-[#00FFFF]/10"></div>
      </div>
      
      {/* Digital noise overlay */}
      <div className="absolute inset-0 z-1 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1IiBkPSJNMCAwaDMwMHYzMDBIMHoiLz48L3N2Zz4=')] opacity-20 mix-blend-overlay pointer-events-none"></div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-gray-800/80 text-gray-300 backdrop-blur-sm border border-[#6441A4]/30">
              <span className="flex h-2 w-2 rounded-full bg-[#00FFFF] mr-2 animate-pulse"></span>
              Premium Stream Graphics & Overlays
            </div>
            
            <h1 className={`responsive-heading text-4xl md:text-5xl font-bold text-white ${glitchActive ? 'glitch' : ''}`}>
              LEVEL UP YOUR <span className="gradient-text animate-text-flicker">STREAM</span> WITH <span className="relative">
                <span className="relative z-10">PROFESSIONAL</span>
                <svg className="absolute bottom-0 left-0 w-full h-[0.2em] text-[#00FFFF]/30" viewBox="0 0 200 8" preserveAspectRatio="none">
                  <path d="M0,0 C50,5 80,5 200,0" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
              </span> OVERLAYS
            </h1>
            
            <p className="text-xl text-gray-300 md:text-2xl leading-relaxed">
              Stand out on Twitch, Kick, and DLive with custom animated overlays, alerts, and stream packages.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                href="/#pricing" 
                className="px-6 py-3 bg-gradient-to-r from-[#6441A4] to-[#00FFFF] text-white rounded-lg font-medium button-glow text-center arcade-button"
              >
                Boost Your Channel Today
              </Link>
            </div>
            
            {/* Platform Compatibility */}
            <div className="flex items-center space-x-3 pt-4">
              <span className="text-sm text-gray-400">Compatible with:</span>
              <div className="flex items-center space-x-3">
                <div className="text-[#6441A4] hover:text-[#6441A4]/80 transition-all transform hover:scale-110">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.64 5.93h1.43v4.28h-1.43m3.93-4.28H17v4.28h-1.43M7 2L3.43 5.57v12.86h4.28V22l3.58-3.57h2.85L20.57 12V2m-1.43 9.29l-2.85 2.85h-2.86l-2.5 2.5v-2.5H7.71V3.43h11.43z"/>
                  </svg>
                </div>
                <div className="text-[#00FFFF]">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-9.4l6 3.4-6 3.4v-6.8z"/>
                  </svg>
                </div>
                <div className="text-[#FFE100]">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <div className="text-gray-400">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                  </svg>
                </div>
                <div className="text-gray-400">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-4.312 10.526c0-1.974 1.599-3.574 3.573-3.574s3.573 1.599 3.573 3.574-1.599 3.574-3.573 3.574-3.573-1.6-3.573-3.574zm11.102 4.425c.241-1.989-.017-3.025-1.258-4.543 1.093-.711 1.722-1.897 1.722-3.172 0-2.189-1.772-3.967-3.956-3.967-.101 0-.202.004-.301.011l-.057-2.275c-.018-.739-.96-1.007-1.269-.354l-1.195 2.5c-.104.217-.159.46-.159.708 0 .969.784 1.755 1.752 1.756.21 0 .41-.039.6-.109l1.279 1.276c-.183.313-.285.675-.285 1.054 0 1.151.932 2.084 2.082 2.084.407 0 .785-.119 1.104-.323l.325 1.504c.36.166.179.233.317.233.306 0 .516-.318.434-.623l-.797-2.758c.892-.902 1.481-2.279 1.481-3.676 0-1.239-.496-2.569-1.549-3.301-1.79-1.249-4.621-1.036-6.237.627-2.111 2.167-2.039 5.85-.173 7.899h-4.6c-.276 0-.5.224-.5.5s.224.5.5.5h9.462c.13 0 .26-.03.379-.08.119.05.249.08.379.08h.171c.276 0 .5-.224.5-.5s-.224-.5-.5-.5z"/>
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-[#6441A4]/30 bg-[#1a1a1a] neon-border">
              <div className="aspect-video relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#6441A4]/30 to-[#00FFFF]/30">
                  {/* Play button removed */}
                </div>
                <img
                  src="https://images.unsplash.com/photo-1598550476439-6847785fcea6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                  alt="Streaming setup with overlays"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-gradient-to-br from-[#6441A4] to-[#00FFFF] rounded-full filter blur-xl opacity-50"></div>
            </div>
            
            {/* Floating overlay elements */}
            <div className="absolute -right-6 top-1/4 p-3 bg-[#1e1e1e] rounded-lg shadow-lg border border-[#00FFFF]/30 rotate-3 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-[#6441A4] to-[#00FFFF] rounded-lg flex items-center justify-center text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-medium">Animated Alerts</div>
                  <div className="text-gray-400 text-sm">Grab Attention</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -left-6 bottom-1/4 p-3 bg-[#1e1e1e] rounded-lg shadow-lg border border-[#FF1493]/30 -rotate-6 animate-float-delay">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-[#FF1493] to-[#00FFFF] rounded-lg flex items-center justify-center text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-medium">Screen Transitions</div>
                  <div className="text-gray-400 text-sm">Professional Flow</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 