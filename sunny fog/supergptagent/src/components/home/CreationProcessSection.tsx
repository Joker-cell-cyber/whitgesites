"use client";

import { motion } from "framer-motion";

export default function CreationProcessSection() {
  const steps = [
    {
      id: 1,
      title: "Define Objectives",
      description: "Identify the specific tasks and expected outcomes for your custom AI agent.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      ),
    },
    {
      id: 2,
      title: "Select Capabilities",
      description: "Choose the advanced skill modules your agent needs to accomplish its tasks.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
        </svg>
      ),
    },
    {
      id: 3,
      title: "Add Knowledge",
      description: "Integrate your proprietary data and documents to create a specialized knowledge base.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
        </svg>
      ),
    },
    {
      id: 4,
      title: "Configure Interactions",
      description: "Define how your agent communicates, its action permissions, and interfaces.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      ),
    },
    {
      id: 5,
      title: "Deploy and Test",
      description: "Launch your agent in a controlled environment and refine its operation with real-world testing.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      ),
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden" id="creation-process">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[#080810] -z-10"></div>
      <div className="absolute inset-0 opacity-20 -z-5 code-background"></div>
      
      {/* Glowing orbs */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-ai-blue-600/10 rounded-full filter blur-[80px]"></div>
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-ai-purple-600/10 rounded-full filter blur-[80px]"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Creation <span className="tech-gradient-text">Process</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Discover how to create and deploy your custom AI agent in a few simple steps
            </p>
          </motion.div>
        </div>

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start mb-12 relative"
            >
              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className="absolute left-8 top-14 bottom-0 w-px bg-gradient-to-b from-ai-blue-500/50 to-ai-blue-500/10 h-[calc(100%_-_30px)]"></div>
              )}
              
              {/* Step number */}
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-ai-blue-500 to-ai-purple-500 flex items-center justify-center mr-6 relative">
                <span className="text-xl font-bold text-white">{step.id}</span>
              </div>
              
              {/* Step content */}
              <div className="flex-1 cyber-border p-6 rounded-xl bg-[#0a0a12]/80 backdrop-blur">
                <div className="flex items-start">
                  <div className="text-ai-blue-500 mr-4">
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* CTA */}
        <div className="text-center mt-12">
          <a 
            href="#pricing" 
            className="inline-block px-6 py-3 bg-gradient-to-r from-ai-blue-600 to-ai-purple-600 text-white rounded-lg font-medium button-glow cyber-border"
          >
            Create my agent
          </a>
        </div>
      </div>
    </section>
  );
} 