"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16 code-background" id="home">
      {/* Matrix-like falling characters effect */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i} 
            className="absolute text-ai-green-500 text-xl font-mono animate-matrix opacity-50"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `-20px`, 
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${Math.random() * 3 + 2}s` 
            }}
          >
            {String.fromCharCode(33 + Math.floor(Math.random() * 94))}
          </div>
        ))}
      </div>
      
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 right-[10%] w-72 h-72 bg-ai-blue-600/20 rounded-full filter blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 left-[5%] w-80 h-80 bg-ai-purple-500/15 rounded-full filter blur-3xl"></div>
        <div className="absolute top-40 left-[30%] w-64 h-64 bg-gradient-to-r from-ai-blue-600/10 to-ai-purple-600/10 rounded-full filter blur-2xl animate-float"></div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-gray-800/80 text-gray-300 backdrop-blur-sm border border-gray-700">
              <span className="flex h-2 w-2 rounded-full bg-ai-blue-500 mr-2"></span>
              <code className="font-mono">NEXT_GEN_AI_PLATFORM</code>
            </div>
            
            <h1 className="responsive-heading text-4xl md:text-5xl font-bold">
              Create <span className="gradient-text">Custom AI Agents</span> With <span className="relative">
                <span className="relative z-10">Advanced</span>
                <svg className="absolute bottom-0 left-0 w-full h-[0.2em] text-ai-blue-600/30" viewBox="0 0 200 8" preserveAspectRatio="none">
                  <path d="M0,0 C50,5 80,5 200,0" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
              </span> Capabilities
            </h1>
            
            <p className="text-xl text-gray-300 md:text-2xl leading-relaxed">
              Build, customize, and deploy AI agents that match your exact requirements. For developers, businesses, and innovators.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                href="/#pricing" 
                className="px-6 py-3 bg-gradient-to-r from-ai-blue-600 to-ai-purple-600 text-white rounded-lg font-medium button-glow text-center cyber-border"
              >
                View Agent Plans
              </Link>
              <Link 
                href="/#features" 
                className="px-6 py-3 bg-transparent border border-ai-blue-500/30 hover:border-ai-blue-500/60 text-white rounded-lg font-medium text-center transition-colors"
              >
                Explore Capabilities
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            {/* Terminal-style interface */}
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-gray-800 bg-[#0a0a12] cyber-border">
              <div className="bg-[#14141e] h-8 flex items-center px-4 border-b border-gray-800">
                <div className="mr-2 h-3 w-3 rounded-full bg-ai-red-500"></div>
                <div className="mr-2 h-3 w-3 rounded-full bg-ai-yellow-500"></div>
                <div className="mr-4 h-3 w-3 rounded-full bg-ai-green-500"></div>
                <div className="flex-1 text-center text-xs text-gray-400 font-mono">super_gpt_agent.sh</div>
              </div>
              
              <div className="p-4 font-mono text-sm">
                <div className="flex">
                  <span className="text-ai-green-500 mr-2">$</span>
                  <span className="text-gray-300">initialize_agent<span className="text-ai-blue-500">.</span>py</span>
                </div>
                
                <div className="mt-2 text-gray-400">
                  <span className="text-ai-purple-500">Configuring</span> agent parameters...
                </div>
                
                <div className="mt-1 text-gray-400">
                  <span className="text-ai-blue-400">[</span><span className="text-ai-green-500">✓</span><span className="text-ai-blue-400">]</span> Base intelligence module loaded
                </div>
                
                <div className="mt-1 text-gray-400">
                  <span className="text-ai-blue-400">[</span><span className="text-ai-green-500">✓</span><span className="text-ai-blue-400">]</span> Knowledge frameworks connected
                </div>
                
                <div className="mt-1 text-gray-400">
                  <span className="text-ai-blue-400">[</span><span className="text-ai-green-500">✓</span><span className="text-ai-blue-400">]</span> Advanced reasoning activated
                </div>
                
                <div className="mt-1 text-gray-400">
                  <span className="text-ai-blue-400">[</span><span className="text-ai-green-500">✓</span><span className="text-ai-blue-400">]</span> Custom instructions parsed
                </div>
                
                <div className="mt-3 flex">
                  <span className="text-ai-green-500 mr-2">$</span>
                  <span className="text-white">deploy_agent<span className="text-ai-blue-500">.</span>sh --environment=production</span>
                  </div>
                
                <div className="mt-2 text-gray-400">
                  <span className="text-ai-blue-500">Initializing</span> SuperGPTAgent<span className="text-ai-blue-500">...</span>
                  <span className="ml-2 inline-block w-2 h-4 bg-ai-blue-500 animate-pulse"></span>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -right-6 top-1/4 p-3 bg-[#14141e] rounded-lg shadow-lg border border-gray-800 rotate-3 animate-float glass-effect">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-ai-blue-500 to-ai-purple-500 rounded-lg flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                    <line x1="12" x2="12" y1="19" y2="22"></line>
                  </svg>
                </div>
                <div>
                  <div className="text-white font-medium">Voice Enabled</div>
                  <div className="text-gray-400 text-sm">Natural Interaction</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -left-6 bottom-1/4 p-3 bg-[#14141e] rounded-lg shadow-lg border border-gray-800 -rotate-6 animate-float glass-effect" style={{ animationDelay: "1s" }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-ai-green-500 to-ai-blue-500 rounded-lg flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
                    <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
                    <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                  </svg>
                </div>
                <div>
                  <div className="text-white font-medium">API Access</div>
                  <div className="text-gray-400 text-sm">For Developers</div>
                </div>
              </div>
            </div>
            
            {/* Neural network visualization in background */}
            <div className="absolute -z-10 inset-0 opacity-20">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="absolute bg-gradient-to-r from-ai-blue-500 to-ai-purple-500 rounded-full animate-pulse-glow"
                  style={{
                    width: `${Math.random() * 10 + 5}px`,
                    height: `${Math.random() * 10 + 5}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 4}s`,
                    animationDuration: `${Math.random() * 4 + 4}s`
                  }}
                ></div>
              ))}
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i + 8} className="absolute bg-ai-blue-500/20"
                  style={{
                    width: `${Math.random() * 100 + 50}px`,
                    height: '1px',
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    transform: `rotate(${Math.random() * 360}deg)`
                  }}
                ></div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 