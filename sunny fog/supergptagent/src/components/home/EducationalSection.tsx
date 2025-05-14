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
    <section className="py-20 bg-gradient-to-b from-[#0a0a12] to-[#07070f] relative overflow-hidden" id="education">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ai-blue-500/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ai-purple-500/20 to-transparent"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Understanding <span className="tech-gradient-text">AI Agents</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Discover how AI agents are transforming the way we interact with technology
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="cyber-border p-6 rounded-xl bg-[#0a0a12]/80 backdrop-blur">
              <h3 className="text-2xl font-bold mb-4 tech-gradient-text">The New Frontier of AI</h3>
              <p className="text-gray-300 mb-4">
                AI agents represent the next evolution of artificial intelligence, moving from simple reactive models to proactive systems that can:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-ai-blue-500 mr-2">✓</span>
                  <span>Understand complex and nuanced instructions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-ai-blue-500 mr-2">✓</span>
                  <span>Plan and execute sequences of actions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-ai-blue-500 mr-2">✓</span>
                  <span>Adapt to specific preferences and needs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-ai-blue-500 mr-2">✓</span>
                  <span>Interact with other services and systems</span>
                </li>
                <li className="flex items-start">
                  <span className="text-ai-blue-500 mr-2">✓</span>
                  <span>Learn and improve over time</span>
                </li>
              </ul>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-xl overflow-hidden relative cyber-border">
              <div className="absolute inset-0 bg-gradient-to-br from-ai-blue-500/10 to-ai-purple-500/20 mix-blend-overlay"></div>
              <div className="h-64 bg-[#0a0a12] relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative h-40 w-40">
                    <div className="absolute inset-0 bg-ai-blue-500/20 rounded-full animate-pulse-slow"></div>
                    <div className="absolute inset-2 bg-ai-purple-500/20 rounded-full animate-pulse-slow" style={{ animationDelay: "0.5s" }}></div>
                    <div className="absolute inset-4 bg-ai-green-500/20 rounded-full animate-pulse-slow" style={{ animationDelay: "1s" }}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-16 h-16 text-white/80" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Animated neural connections */}
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="absolute bg-gradient-to-r from-ai-blue-500/40 to-ai-purple-500/40 h-px animate-pulse-slow"
                    style={{
                      top: `${20 + i * 15}%`,
                      left: 0,
                      right: 0,
                      animationDelay: `${i * 0.2}s`
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {infoBlocks.map((block, index) => (
            <motion.div
              key={block.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="cyber-border p-6 rounded-xl bg-[#0a0a12]/80 backdrop-blur relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 opacity-10 text-ai-blue-500 text-5xl font-bold">
                {String(block.id).padStart(2, '0')}
              </div>
              <div className="mb-4 text-ai-blue-500 bg-ai-blue-500/10 p-3 rounded-lg inline-block">
                {block.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{block.title}</h3>
              <p className="text-gray-400">{block.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="#benefits" className="inline-flex items-center text-ai-blue-500 hover:text-ai-blue-400">
            <span>Discover the benefits</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
} 