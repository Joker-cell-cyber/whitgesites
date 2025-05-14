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
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-black via-[#070719] to-[#040410]" id="benefits">
      {/* Abstract mesh background */}
      <div className="absolute inset-0 -z-10 bg-[url('/images/mesh-bg.svg')] bg-cover opacity-20"></div>
      
      {/* Glowing orbs with animation */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-purple-600/20 rounded-full filter blur-[120px] animate-pulse-slow"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-600/20 rounded-full filter blur-[120px] animate-pulse-slow delay-150"></div>
      
      {/* Animated circuit lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 w-full h-[1px] animate-glow-line-horizontal">
          <div className="h-full w-full bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"></div>
        </div>
        <div className="absolute bottom-1/3 w-full h-[1px] animate-glow-line-horizontal delay-700">
          <div className="h-full w-full bg-gradient-to-r from-transparent via-purple-500/40 to-transparent"></div>
        </div>
        <div className="absolute left-1/3 h-full w-[1px] animate-glow-line-vertical">
          <div className="h-full w-full bg-gradient-to-b from-transparent via-cyan-500/40 to-transparent"></div>
        </div>
        <div className="absolute right-1/3 h-full w-[1px] animate-glow-line-vertical delay-500">
          <div className="h-full w-full bg-gradient-to-b from-transparent via-blue-500/40 to-transparent"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="inline-block py-1 px-3 rounded-full text-xs font-semibold tracking-wider bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/10 mb-5">
            STRATEGIC ADVANTAGES
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Powerful <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400">Advantages</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
            Discover how AI agents can transform your business and create a competitive advantage
          </p>
        </motion.div>
        
        {/* Metrics with animated entrance */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-20">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl group-hover:blur-xl group-hover:from-blue-600/30 group-hover:to-purple-600/30 transition-all duration-700"></div>
              <div className="relative h-full p-6 rounded-2xl border border-white/10 bg-black/30 backdrop-blur-sm flex flex-col items-center justify-center transition-transform duration-300 hover:translate-y-[-5px]">
                <div className="text-5xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">{metric.value}</div>
                <div className="text-gray-400 text-sm">{metric.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Benefits Grid with hover effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-violet-600/5 to-purple-600/5 rounded-2xl blur-sm group-hover:blur-md group-hover:bg-gradient-to-br group-hover:from-blue-600/20 group-hover:via-violet-600/20 group-hover:to-purple-600/20 transition-all duration-700"></div>
              <div className="relative h-full p-8 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-md transition-all duration-300 group-hover:border-white/20 group-hover:translate-y-[-5px]">
                <div className="absolute top-4 right-4 text-white/5 text-7xl font-black select-none">
                  {String(benefit.id).padStart(2, '0')}
                </div>
                <div className="mb-6 text-white p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/5 inline-flex">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-white">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* CTA with glowing effect */}
        <div className="mt-20 mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-violet-600/30 to-purple-600/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-700"></div>
            <div className="relative p-8 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl">
              <h3 className="text-3xl font-bold mb-4 text-center">Ready to transform your business?</h3>
              <p className="text-gray-400 mb-8 text-center max-w-xl mx-auto">
                Our AI agents are designed to integrate seamlessly into your existing infrastructure
                while offering capabilities that exceed traditional solutions.
              </p>
              <div className="text-center">
                <a
                  href="#pricing"
                  className="inline-block px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(124,58,237,0.5)]"
                >
                  View plans
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 