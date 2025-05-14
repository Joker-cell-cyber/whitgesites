"use client";

import { motion } from "framer-motion";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

export default function ServicesSection() {
  const services = [
    {
      title: "Creator Discovery",
      description: "Find creators that match your brand voice and resonate with your target audience.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      features: [
        "Brand-aligned creator matching",
        "Niche & industry specialization",
        "Audience demographic analysis",
        "Engagement rate assessment"
      ]
    },
    {
      title: "Talent Vetting",
      description: "Evaluate creator quality, engagement metrics, and content authenticity before you commit.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      features: [
        "Content quality analysis",
        "Engagement authenticity check",
        "Previous brand work review",
        "Communication style assessment"
      ]
    },
    {
      title: "Connection Service",
      description: "We facilitate the initial contact and help establish clear expectations between you and creators.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      ),
      features: [
        "Initial introduction",
        "Project scope clarification",
        "Expectation alignment",
        "Basic agreement facilitation"
      ]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-rose-950 to-orange-950 relative overflow-hidden" id="services">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-30 mix-blend-soft-light bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1Ij48cGF0aCBkPSJNMCAwaDYwdjYwSDB6Ii8+PHBhdGggZD0iTTMwIDBoMzB2NjBIMzB6Ii8+PHBhdGggZD0iTTE1IDBoMzB2NjBIMTV6Ii8+PHBhdGggZD0iTTQ1IDBoMTB2NjBoLTEweiIvPjwvZz48L2c+PC9zdmc+')]"></div>
      
      <div className="absolute top-0 right-0 -mt-40 -mr-40 w-96 h-96 rounded-full bg-gradient-radial from-rose-500/20 to-orange-500/0 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -mb-40 -ml-40 w-96 h-96 rounded-full bg-gradient-radial from-orange-500/20 to-rose-500/0 blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1 rounded-full text-rose-300 text-sm font-medium bg-rose-900/50 backdrop-blur-sm border border-rose-700/40 mb-4">Our Services</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">Creator</span> Sourcing Services
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-rose-500 to-orange-500 mx-auto mb-6"></div>
            <p className="text-rose-100/80 text-lg">
              We handle the entire process of finding perfect UGC creators for your brand, so you can focus on your business growth.
            </p>
          </motion.div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className="relative group"
              variants={itemVariants}
            >
              {/* Card glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 to-orange-500 opacity-30 group-hover:opacity-60 blur-md rounded-2xl transition-all duration-500"></div>
              
              <div className="relative h-full backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-8 transition-all duration-300 group-hover:translate-y-[-5px]">
                {/* Decoration */}
                <div className="absolute top-0 right-0 h-20 w-20 bg-gradient-to-br from-rose-500/20 to-orange-500/0 rounded-bl-3xl"></div>
                
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-rose-500 to-orange-600 flex items-center justify-center text-white mb-8 shadow-xl shadow-rose-900/30">
                  {service.icon}
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
                <p className="text-rose-100/80 mb-8">{service.description}</p>
                
                <ul className="space-y-3 border-t border-white/10 pt-6">
                  {service.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-rose-500/20 to-orange-500/20 flex items-center justify-center mt-0.5 mr-3">
                        <svg className="h-3 w-3 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-rose-100/90">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a 
            href="/pricing" 
            className="inline-flex items-center px-6 py-3 rounded-full text-white bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 transition-all duration-300 shadow-lg shadow-rose-900/30 hover:shadow-xl hover:shadow-rose-900/40 transform hover:-translate-y-1 font-medium"
          >
            <span>View our pricing packages</span>
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
} 