"use client";

import { motion } from "framer-motion";

export default function EducationalSection() {
  const infoBlocks = [
    {
      id: 1,
      title: "What is an AI Agent?",
      description: "An AI Agent is an autonomous artificial intelligence system designed to perform specific tasks for its user. Unlike simple chatbots, AI agents can reason, make decisions, and perform complex actions without constant human intervention.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 8v4"></path>
          <path d="M12 16h.01"></path>
        </svg>
      ),
    },
    {
      id: 2,
      title: "How Does It Work?",
      description: "AI agents use advanced language models (LLMs) as their foundation, enhanced by specific tools, custom knowledge bases, and reasoning capabilities. They can interact with other systems, analyze data, and execute automated actions.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      ),
    },
    {
      id: 3,
      title: "Why Is It Revolutionary?",
      description: "AI agents represent the natural evolution of conversational AI, enabling automation of complex tasks that previously required human intervention. They can work 24/7, execute business processes, and adapt to specific user needs.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6h.01"></path>
          <path d="M7 14a5 5 0 0 1 5-5 5 5 0 0 1 5 5v1a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1v-1Z"></path>
          <path d="M3 21h18"></path>
          <path d="M12 3v3"></path>
          <path d="m9 6 3-3 3 3"></path>
        </svg>
      ),
    }
  ];

  return (
    <section className="py-28 bg-gradient-to-b from-black to-[#080822] relative overflow-hidden isolate" id="education">
      {/* Futuristic background elements */}
      <div className="absolute inset-0 -z-10">
        {/* Digital circuit patterns */}
        <div className="absolute inset-0">
          <svg className="w-full h-full opacity-5" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="circuit-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 0,10 L 10,10 M 10,0 L 10,20 M 15,10 L 20,10" stroke="rgba(147, 197, 253, 0.3)" fill="none" />
                <circle cx="10" cy="10" r="1.5" fill="rgba(147, 197, 253, 0.4)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
          </svg>
        </div>
        
        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-teal-500/10 to-blue-500/10 blur-[80px] animate-pulse-slow opacity-30"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-[100px] animate-pulse-slow opacity-30" style={{ animationDelay: "2s" }}></div>
      </div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-blue-500/30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float-particle ${Math.random() * 15 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="inline-block py-1 px-3 rounded-full text-xs font-semibold tracking-wider bg-gradient-to-r from-teal-500/20 to-blue-500/20 border border-teal-500/10 mb-5">
            EDUCATIONAL
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Understanding <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400">AI Agents</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
            Discover how AI agents are transforming the way we interact with technology
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-700"></div>
              <div className="relative p-8 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-sm">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-1 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full mr-4"></div>
                  <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-blue-200">The New Frontier of AI</h3>
                </div>
                <p className="text-gray-300 mb-6 text-lg">
                  AI agents represent the next evolution of artificial intelligence, moving from simple reactive models to proactive systems that can:
                </p>
                <ul className="space-y-4">
                  {[
                    "Understand complex and nuanced instructions",
                    "Plan and execute sequences of actions",
                    "Adapt to specific preferences and needs",
                    "Interact with other services and systems",
                    "Learn and improve over time"
                  ].map((item, idx) => (
                    <motion.li 
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      className="flex items-start"
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-teal-500/20 to-blue-500/20 border border-teal-500/30 flex items-center justify-center mr-3">
                        <svg className="w-3.5 h-3.5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-300 text-lg">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative">
              {/* Glowing effect behind the visualization */}
              <div className="absolute -inset-4 bg-gradient-to-r from-teal-500/30 to-blue-500/30 rounded-full blur-2xl opacity-20 animate-pulse-slow"></div>
              
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/30 backdrop-blur-sm">
                <div className="h-80 flex items-center justify-center relative">
                  {/* Neural network visualization */}
                  <div className="relative w-64 h-64">
                    {/* Animated concentric circles */}
                    {Array.from({ length: 4 }).map((_, idx) => (
                      <div 
                        key={idx} 
                        className="absolute rounded-full border border-blue-500/30 animate-pulse-slow"
                        style={{ 
                          inset: `${idx * 15}%`, 
                          animationDelay: `${idx * 0.7}s`,
                          animationDuration: '4s'
                        }}
                      ></div>
                    ))}
                    
                    {/* Central icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-500/40 to-blue-500/40 blur-xl"></div>
                        <div className="relative w-24 h-24 rounded-full bg-gradient-to-r from-teal-500/20 to-blue-500/20 border border-white/20 backdrop-blur-sm flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-12 h-12 text-blue-300" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    {/* Connection nodes */}
                    {Array.from({ length: 8 }).map((_, idx) => (
                      <div 
                        key={`node-${idx}`}
                        className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-teal-400 to-blue-400"
                        style={{ 
                          top: `${20 + Math.sin(idx * Math.PI / 4) * 45}%`, 
                          left: `${20 + Math.cos(idx * Math.PI / 4) * 45}%`,
                          animation: `pulse ${2 + idx % 3}s infinite alternate`
                        }}
                      ></div>
                    ))}
                    
                    {/* Connection lines */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                      <defs>
                        <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="rgba(45, 212, 191, 0.5)" />
                          <stop offset="100%" stopColor="rgba(59, 130, 246, 0.5)" />
                        </linearGradient>
                      </defs>
                      <g stroke="url(#line-gradient)" strokeWidth="0.5" fill="none">
                        {Array.from({ length: 12 }).map((_, idx) => (
                          <path 
                            key={`path-${idx}`} 
                            d={`M50,50 L${30 + Math.cos((idx * Math.PI) / 6) * 35},${30 + Math.sin((idx * Math.PI) / 6) * 35}`}
                            strokeDasharray="15,5"
                            className="animate-dash-offset"
                            style={{ animationDelay: `${idx * 0.2}s` }}
                          />
                        ))}
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {infoBlocks.map((block, index) => (
            <motion.div
              key={block.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group hover:z-10"
            >
              <div className="relative h-full">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500/30 to-blue-500/30 rounded-2xl blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative h-full p-8 bg-black/50 backdrop-blur-sm rounded-2xl border border-white/10 transition-transform duration-300 group-hover:-translate-y-2">
                  <div className="absolute top-6 right-6 text-white/5 text-7xl font-black select-none">
                    {String(block.id).padStart(2, '0')}
                  </div>
                  <div className="relative">
                    <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-teal-500/10 to-blue-500/10 border border-teal-500/10 text-teal-300 inline-flex">
                      {block.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-blue-200">{block.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{block.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <a 
            href="#benefits" 
            className="inline-flex items-center px-6 py-3 rounded-full text-teal-300 bg-gradient-to-r from-teal-500/10 to-blue-500/10 border border-teal-500/20 hover:border-teal-400/40 transition-all duration-300 group"
          >
            <span>Discover the benefits</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-y-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6"></path>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
} 