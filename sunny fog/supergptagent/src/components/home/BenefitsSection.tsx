"use client";

import { motion } from "framer-motion";

export default function BenefitsSection() {
  const benefits = [
    {
      id: 1,
      title: "Intelligent Automation",
      description: "Automate complex and repetitive tasks to free up time for your teams and increase their productivity.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
          <line x1="3" x2="21" y1="9" y2="9"></line>
          <line x1="9" x2="9" y1="21" y2="9"></line>
        </svg>
      ),
    },
    {
      id: 2,
      title: "24/7 Availability",
      description: "Unlike humans, AI agents never sleep and can provide continuous assistance and services throughout the year.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      ),
    },
    {
      id: 3,
      title: "Cost Reduction",
      description: "Decrease operational costs by automating repetitive processes and optimizing the allocation of human resources.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23"></line>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      ),
    },
    {
      id: 4,
      title: "Advanced Personalization",
      description: "Create tailored experiences for your customers based on their preferences, history, and behaviors.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
    },
    {
      id: 5,
      title: "Instant Scalability",
      description: "Quickly adapt to your business growth without the traditional limitations of recruitment and training.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 9 6-6 6 6"></path>
          <path d="M6 12h12"></path>
          <path d="m6 15 6 6 6-6"></path>
        </svg>
      ),
    },
    {
      id: 6,
      title: "Multi-System Integration",
      description: "Connect your agents with your existing tools to create a coherent and efficient digital ecosystem.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 16 12 12 8 16"></polyline>
          <line x1="12" y1="12" x2="12" y2="21"></line>
          <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
          <polyline points="16 16 12 12 8 16"></polyline>
        </svg>
      ),
    },
  ];

  const metrics = [
    { id: 1, value: "68%", label: "of businesses report increased productivity" },
    { id: 2, value: "24/7", label: "availability of agents, without interruption" },
    { id: 3, value: "45%", label: "average reduction in operational costs" },
    { id: 4, value: "3.5×", label: "faster task processing" },
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-[#07070f]" id="benefits">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 code-background opacity-70"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-ai-purple-600/10 rounded-full filter blur-[100px]"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-ai-blue-600/10 rounded-full filter blur-[100px]"></div>
      
      {/* Digital circuit lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-ai-blue-500/20 to-transparent"></div>
        <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-ai-purple-500/20 to-transparent"></div>
        <div className="absolute bottom-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-ai-green-500/20 to-transparent"></div>
        <div className="absolute bottom-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-ai-blue-500/20 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Strategic <span className="tech-gradient-text">Advantages</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Discover how AI agents can transform your business and create a competitive advantage
            </p>
          </motion.div>
        </div>
        
        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6 rounded-xl cyber-border relative bg-[#0a0a12]/80 backdrop-blur"
            >
              <div className="text-4xl font-bold mb-2 gradient-text">{metric.value}</div>
              <div className="text-gray-400 text-sm">{metric.label}</div>
            </motion.div>
          ))}
        </div>
        
        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-hover p-6 rounded-xl cyber-border relative bg-[#0a0a12]/80 backdrop-blur"
            >
              <div className="absolute top-4 right-4 opacity-10 text-ai-blue-500 text-5xl font-bold">
                {String(benefit.id).padStart(2, '0')}
              </div>
              <div className="mb-4 text-ai-blue-500 bg-ai-blue-500/10 p-3 rounded-lg inline-block">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-gray-400">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
        
        {/* CTA */}
        <div className="mt-16 text-center max-w-2xl mx-auto">
          <div className="cyber-border p-6 rounded-xl bg-[#0a0a12]/80 backdrop-blur">
            <h3 className="text-2xl font-bold mb-3">Ready to transform your business?</h3>
            <p className="text-gray-400 mb-6">
              Our AI agents are designed to integrate seamlessly into your existing infrastructure
              while offering capabilities that exceed traditional solutions.
            </p>
            <div className="inline-block p-px rounded-lg cyber-border">
              <a
                href="#pricing"
                className="inline-block px-6 py-3 bg-gradient-to-r from-ai-blue-600 to-ai-purple-600 text-white rounded-lg font-medium button-glow"
              >
                View plans
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 