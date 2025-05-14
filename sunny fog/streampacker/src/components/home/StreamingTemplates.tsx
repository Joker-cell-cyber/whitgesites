"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import GlowText from "@/components/ui/GlowText";

// New visual-focused solution cards
const visualSolutions = [
  {
    id: "overlays",
    title: "Stream Overlays",
    description: "Premium cyberpunk-style graphics that elevate your stream's visual identity",
    illustration: "/images/solutions/overlay-illustration.svg", // Placeholder paths - would need real images
    color: "#00FFFF",
    gradient: "from-[#00FFFF]/10 to-[#6441A4]/10",
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 128 128" fill="none">
        <rect x="16" y="16" width="96" height="24" rx="4" stroke="currentColor" strokeWidth="4" strokeLinejoin="round"/>
        <rect x="16" y="48" width="40" height="64" rx="4" stroke="currentColor" strokeWidth="4" strokeLinejoin="round"/>
        <rect x="64" y="48" width="48" height="40" rx="4" stroke="currentColor" strokeWidth="4" strokeLinejoin="round"/>
        <rect x="64" y="96" width="48" height="16" rx="4" stroke="currentColor" strokeWidth="4" strokeLinejoin="round"/>
        <circle cx="32" cy="28" r="4" fill="currentColor"/>
      </svg>
    )
  },
  {
    id: "alerts",
    title: "Stream Alerts",
    description: "Eye-catching animated notifications that command viewer attention",
    illustration: "/images/solutions/alerts-illustration.svg",
    color: "#FF1493",
    gradient: "from-[#FF1493]/10 to-[#FFE100]/10",
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 128 128" fill="none">
        <path d="M64 16L16 80H56V112L112 48H64V16Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round"/>
        <circle cx="64" cy="64" r="48" stroke="currentColor" strokeWidth="4" strokeDasharray="8 12" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    id: "transitions",
    title: "Scene Transitions",
    description: "Fluid animations that make your scene changes look professional",
    illustration: "/images/solutions/transitions-illustration.svg",
    color: "#6441A4",
    gradient: "from-[#6441A4]/10 to-[#00FF66]/10",
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 128 128" fill="none">
        <path d="M40 104L16 64L40 24" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M88 24L112 64L88 104" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M72 16L56 112" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
      </svg>
    )
  }
];

export default function StreamingTemplates() {
  return (
    <section className="py-12 md:py-16 relative overflow-hidden" id="solutions">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#121212] via-[#080010] to-[#080010] pointer-events-none"></div>
      
      {/* Glowing Orbs */}
      <div className="absolute top-20 right-[10%] w-96 h-96 rounded-full bg-[#6441A4]/5 filter blur-[100px] animate-pulse-slow pointer-events-none"></div>
      <div className="absolute bottom-20 left-[5%] w-72 h-72 rounded-full bg-[#00FFFF]/5 filter blur-[80px] animate-pulse-slow animation-delay-2000 pointer-events-none"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzZiNzI4MCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40 pointer-events-none"></div>
      
      {/* Scan Line */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="w-full h-[2px] bg-[#00FFFF]/10 absolute animate-scanline"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white tracking-tight">
              Stream <GlowText color="blue" size="4xl" weight="bold">Visual</GlowText> Solutions
            </h2>
            <p className="text-gray-300 text-lg">
              Transform your broadcast with cutting-edge graphics designed for maximum viewer engagement
            </p>
          </motion.div>
        </div>

        {/* Visual Solution Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 mb-20">
          {visualSolutions.map((solution, index) => (
            <motion.div
              key={solution.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative group"
            >
              {/* Card */}
              <div className="relative h-full bg-[#0b0b1e]/80 backdrop-blur rounded-xl overflow-hidden border border-gray-800/50 p-6 hover:shadow-[0_0_30px_rgba(0,255,255,0.15)] transition-all duration-500 card-hover">
                {/* Glowing border effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#00FFFF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${solution.gradient} opacity-20`}></div>
                
                {/* Icon */}
                <div className="relative mb-6">
                  <div 
                    className="w-16 h-16 rounded-lg flex items-center justify-center"
                    style={{ 
                      color: solution.color,
                      background: `linear-gradient(135deg, ${solution.color}15, ${solution.color}05)`
                    }}
                  >
                    {solution.icon}
                  </div>
                </div>
                
                {/* Main visual - placeholder for real imagery */}
                <div className="relative h-48 mb-6 overflow-hidden rounded-lg cyberpunk-neon-border">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                    {/* Highly improved visual quality */}
                    {solution.id === "overlays" && (
                      <div className="relative w-full h-full overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b1e] to-[#1a1a3a]"></div>
                        <div className="absolute top-4 left-4 right-4 h-7 bg-[#00FFFF]/10 rounded-md border border-[#00FFFF]/30 flex items-center px-2">
                          <div className="w-2 h-2 rounded-full bg-[#00FFFF] mr-2"></div>
                          <div className="w-20 h-2 bg-white/30 rounded-full"></div>
                          <div className="ml-auto flex space-x-2">
                            <div className="w-5 h-2 bg-white/20 rounded-full"></div>
                            <div className="w-5 h-2 bg-white/20 rounded-full"></div>
                            <div className="w-5 h-2 bg-white/20 rounded-full"></div>
                          </div>
                        </div>
                        <div className="absolute bottom-3 left-3 right-3 top-14 bg-[#00FFFF]/5 rounded border border-[#00FFFF]/20 overflow-hidden">
                          <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#00FFFF]/10 border-t border-[#00FFFF]/20 p-2">
                            <div className="flex space-x-2 mb-2">
                              <div className="w-8 h-2 bg-white/30 rounded-full"></div>
                              <div className="w-12 h-2 bg-[#00FFFF]/40 rounded-full"></div>
                            </div>
                            <div className="w-full h-6 bg-black/20 rounded border border-[#00FFFF]/30 flex items-center px-2">
                              <div className="w-4 h-1 bg-[#00FFFF] mr-1 rounded-full"></div>
                              <div className="w-20 h-1 bg-white/20 rounded-full"></div>
                            </div>
                          </div>
                          <div className="absolute top-2 right-2 w-32 h-20 bg-black/40 border border-[#00FFFF]/30 rounded overflow-hidden">
                            <div className="w-full h-full bg-gradient-to-br from-[#00FFFF]/5 to-transparent"></div>
                          </div>
                        </div>
                        <div className="absolute bottom-5 left-5 w-16 h-4 bg-[#00FFFF]/20 rounded-full border border-[#00FFFF]/40 animate-pulse"></div>
                      </div>
                    )}
                    
                    {solution.id === "alerts" && (
                      <div className="relative w-full h-full overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#13051a] to-[#2a0a30]"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-24 bg-[#FF1493]/10 border border-[#FF1493]/30 rounded-lg overflow-hidden shadow-[0_0_15px_rgba(255,20,147,0.3)]">
                          <div className="absolute top-0 left-0 right-0 h-6 bg-[#FF1493]/20 border-b border-[#FF1493]/30 flex items-center justify-between px-2">
                            <div className="w-3 h-3 rounded-full bg-[#FF1493]/60"></div>
                            <div className="text-[#FF1493] text-[10px] font-bold tracking-wider">NEW FOLLOWER</div>
                            <div className="w-3 h-3 rounded-full bg-[#FF1493]/60"></div>
                          </div>
                          <div className="absolute top-6 left-0 right-0 bottom-0 flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF1493]/30 to-[#FFE100]/30 flex items-center justify-center animate-pulse">
                              <div className="w-10 h-10 rounded-full bg-[#FF1493]/20 border border-[#FF1493]/50 flex items-center justify-center">
                                <div className="w-8 h-8 text-[#FF1493]">
                                  {solution.icon}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="absolute top-5 right-5 w-5 h-5 rounded-full bg-[#FF1493]/30 animate-ping-slow"></div>
                        <div className="absolute bottom-6 left-5 w-5 h-5 rounded-full bg-[#FFE100]/30 animate-ping-slow animation-delay-700"></div>
                        <div className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-[#FF1493]/20 animate-ping-slow animation-delay-1500"></div>
                        <div className="absolute bottom-1/3 right-1/4 w-6 h-6 rounded-full bg-[#FFE100]/20 animate-ping-slow animation-delay-1000"></div>
                      </div>
                    )}
                    
                    {solution.id === "transitions" && (
                      <div className="relative w-full h-full overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a20] to-[#200a30]"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative w-40 h-28">
                            <div className="absolute left-0 top-0 w-32 h-20 bg-[#6441A4]/10 border border-[#6441A4]/30 rounded-md overflow-hidden transforming-element transition-all duration-500">
                              <div className="absolute inset-0 bg-gradient-to-br from-[#6441A4]/20 to-transparent"></div>
                              <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI1IiBoZWlnaHQ9IjUiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gMCAxIEwgNSAxIE0gMSAwIEwgMSA1IE0gMCAzIEwgNSAzIE0gMyAwIEwgMyA1IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjIiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]"></div>
                            </div>
                            <div className="absolute right-0 bottom-0 w-32 h-20 bg-[#00FF66]/10 border border-[#00FF66]/30 rounded-md overflow-hidden transition-all duration-500 transforming-element-to">
                              <div className="absolute inset-0 bg-gradient-to-br from-[#00FF66]/20 to-transparent"></div>
                              <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gMCAyIEwgOCAyIE0gMiAwIEwgMiA4IE0gMCA2IEwgOCA2IE0gNiAwIEwgNiA4IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjIiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]"></div>
                            </div>
                            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#6441A4]/10 border border-[#6441A4]/30 flex items-center justify-center z-10">
                              <div className="animate-spin-slow">
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#6441A4" strokeWidth="1.5">
                                  <path d="M12 4V2m0 20v-2m8-8h2M2 12h2m13.657-5.657L19.07 4.93M4.93 19.07l1.414-1.414m0-11.314L4.93 4.93m14.14 14.14l-1.414-1.414" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </div>
                            </div>
                            <div className="absolute left-14 top-1/3 w-12 h-1 bg-gradient-to-r from-[#6441A4] to-[#00FF66] animate-glow-pulse"></div>
                            <div className="absolute right-14 bottom-1/3 w-12 h-1 bg-gradient-to-r from-[#00FF66] to-[#6441A4] animate-glow-pulse animation-delay-1000"></div>
                          </div>
                        </div>
                      </div>
                    )}
              </div>
              
                  {/* Overlay with scanlines */}
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0ic2NhbmxpbmVzIiB3aWR0aD0iMyIgaGVpZ2h0PSIzIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoOTApIj48bGluZSB4MT0iMCIgeTE9IjAiIHgyPSIwIiB5Mj0iMyIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utb3BhY2l0eT0iMC4xIiBzdHJva2Utd2lkdGg9IjAuNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNzY2FubGluZXMpIi8+PC9zdmc+')] opacity-20 mix-blend-overlay pointer-events-none"></div>
                  {/* Glitch effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/[0.03] to-transparent opacity-40 mix-blend-overlay pointer-events-none"></div>
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="w-full h-[1px] bg-[#00FFFF]/10 absolute top-[25%] left-0 animate-scanline-fast"></div>
                    <div className="w-full h-[1px] bg-[#FF1493]/10 absolute top-[67%] left-0 animate-scanline-fast animation-delay-1000"></div>
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold mb-3">
                  <GlowText color={
                    index % 3 === 0 ? "blue" : 
                    index % 3 === 1 ? "pink" : "purple"
                  } size="2xl" weight="bold">{solution.title}</GlowText>
                </h3>
                <p className="text-gray-300 mb-6">{solution.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Feature Comparison Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto relative"
        >
          <div className="p-6 md:p-8 rounded-xl bg-gradient-to-b from-[#0b0b1e]/90 to-[#080010]/90 backdrop-blur-sm border border-gray-800/50 shadow-[0_0_30px_rgba(0,0,0,0.3)]">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Complete Visual Ecosystem</h3>
              <p className="text-gray-400">Everything you need to create a professional streaming experience</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div className="h-1 w-12 bg-[#00FFFF]"></div>
                <h4 className="text-lg font-semibold text-white">Stream Visuals</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#00FFFF] mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">Branded overlays</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#00FFFF] mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">Webcam frames</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#00FFFF] mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">Starting screens</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <div className="h-1 w-12 bg-[#FF1493]"></div>
                <h4 className="text-lg font-semibold text-white">Interactive Elements</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#FF1493] mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">Animated alerts</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#FF1493] mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">Chat integrations</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#FF1493] mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">Viewer events</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <div className="h-1 w-12 bg-[#6441A4]"></div>
                <h4 className="text-lg font-semibold text-white">Broadcast Tools</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#6441A4] mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">Scene transitions</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#6441A4] mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">Stream panels</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#6441A4] mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">Custom emotes</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br from-[#6441A4]/10 to-[#00FFFF]/10 blur-2xl pointer-events-none"></div>
          <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-gradient-to-tr from-[#FF1493]/10 to-transparent blur-xl pointer-events-none"></div>
        </motion.div>
        
        {/* CTA */}
        <div className="mt-12 md:mt-16 text-center pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/contact"
              className="px-8 py-3 bg-transparent border-2 border-[#00FFFF] text-white rounded-lg font-medium hover:bg-[#00FFFF]/10 transition-all duration-500 inline-flex items-center shadow-[0_0_20px_rgba(0,255,255,0.2)] arcade-button"
            >
              <span className="mr-2">Create Your Custom Package</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 