"use client";

import { motion } from "framer-motion";

export default function ServicesSection() {
  const features = [
    {
      id: 1,
      title: "Natural Language Processing",
      description: "Agents with advanced language comprehension and generation capabilities for seamless human-like interactions.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      ),
    },
    {
      id: 2,
      title: "Multi-Tool Integration",
      description: "Connect your agent to external services, databases, and APIs to extend functionality beyond conversation.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16.5 9.4 7.5 4.21"></path>
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="3.29 7 12 12 20.71 7"></polyline>
          <line x1="12" y1="22" x2="12" y2="12"></line>
        </svg>
      ),
    },
    {
      id: 3,
      title: "Custom Knowledge Base",
      description: "Train your AI on proprietary documents, guidelines, and data to create specialized domain experts.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
        </svg>
      ),
    },
    {
      id: 4,
      title: "Advanced Reasoning",
      description: "Leverage powerful reasoning capabilities to solve complex problems, analyze data, and provide insights.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a8 8 0 0 0-8 8c0 5.2 3.4 9.1 8 10 4.6-.9 8-4.8 8-10a8 8 0 0 0-8-8z"></path>
          <path d="m13.8 13.5-5.3-3.1"></path>
          <path d="m10.3 16.1 6.3-9.7"></path>
        </svg>
      ),
    },
    {
      id: 5,
      title: "Visual Analysis",
      description: "Process and understand images, charts, and visual data for comprehensive multimodal capabilities.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2"></rect>
          <circle cx="9" cy="9" r="2"></circle>
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
        </svg>
      ),
    },
    {
      id: 6,
      title: "Autonomous Actions",
      description: "Define custom functions and capabilities that allow your agent to perform tasks on your behalf.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="6" height="16" x="4" y="4" rx="1"></rect>
          <rect width="6" height="10" x="14" y="10" rx="1"></rect>
          <path d="M22 17h-6"></path>
          <path d="M16 17h-2"></path>
          <path d="M6 12v-2"></path>
        </svg>
      ),
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden" id="features">
      <div className="absolute inset-0 -z-10 code-background opacity-60"></div>
      
      {/* Glowing orb effects */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-ai-blue-500/20 rounded-full filter blur-[80px] animate-pulse" style={{ animationDuration: "8s" }}></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-ai-purple-600/20 rounded-full filter blur-[80px] animate-pulse" style={{ animationDuration: "12s" }}></div>
      
      {/* Circuit-like lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-ai-blue-500/20 to-transparent"></div>
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-ai-purple-500/20 to-transparent"></div>
        <div className="absolute bottom-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-ai-green-500/20 to-transparent"></div>
        <div className="absolute bottom-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-ai-blue-500/20 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Agent <span className="tech-gradient-text">Capabilities</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Our platform enables you to create AI agents with a wide range of powerful capabilities
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
        <motion.div 
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-hover p-6 rounded-xl cyber-border relative"
            >
              <div className="absolute top-4 right-4 opacity-10 text-ai-blue-500 text-5xl font-bold">
                {String(feature.id).padStart(2, '0')}
              </div>
              <div className="mb-4 text-ai-blue-500 bg-ai-blue-500/10 p-3 rounded-lg inline-block">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block p-px rounded-lg cyber-border">
            <a
              href="#creation-process"
              className="inline-block px-6 py-3 bg-[#14141e] hover:bg-[#1a1a24] transition-colors text-white rounded-lg font-medium"
            >
              How It Works
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 