"use client";

import { motion } from "framer-motion";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, type: "spring", stiffness: 100 }
  }
};

export default function ServicesSection() {
  const services = [
    {
      title: "Short-Form Content",
      description: "Engage your audience with eye-catching TikTok, Instagram Reels, and YouTube Shorts videos that go viral.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      features: [
        "High-impact edits under 60 seconds",
        "Trendy transitions and effects",
        "Music synchronization",
        "Optimized for platform algorithms"
      ],
      accent: "from-blue-500 to-violet-500"
    },
    {
      title: "Long-Form Content",
      description: "Create professional YouTube videos, documentaries, and tutorials with cinematic quality and storytelling.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
        </svg>
      ),
      features: [
        "Professional color grading",
        "Advanced sound design",
        "B-roll integration",
        "Audience retention optimization"
      ],
      accent: "from-turquoise-500 to-blue-500"
    },
    {
      title: "Advertising Videos",
      description: "Convert viewers into customers with compelling product videos, explainers, and promotional content.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
      ),
      features: [
        "Clear call-to-action integration",
        "Brand voice alignment",
        "Persuasive storytelling",
        "Multi-platform optimization"
      ],
      accent: "from-violet-500 to-turquoise-400"
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden" id="services">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjAyQzVBIiBzdHJva2Utb3BhY2l0eT0iMC4xIiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIGQ9Ik0tNi45MjgyIDE1bDE1LTE1TTUzLjA3MiAxNWwxNS0xNU0tNi45MjgyIDE1bDE1IDE1TTMzLjA3MiA1NGwzMC0zME00My4wNzIgNDRsMTAgMTBNMy4wNzIgNTRsMTAgMTBNMTguMDcyIDI5bDUgNU0tMS45MjgyIDQwbDUgNU0yOC4wNzIgMjlsNSA1Ii8+PC9nPjwvc3ZnPg==')] opacity-5"></div>
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-900/10 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-96 bg-gradient-to-t from-turquoise-900/10 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block mb-4">
              <div className="h-1 w-10 bg-blue-500 inline-block mr-2"></div>
              <div className="h-1 w-5 bg-turquoise-500 inline-block"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display">
              Our <span className="gradient-text">Expert</span> Video Editing Services
            </h2>
            <p className="text-gray-300 text-lg">
              We specialize in creating high-quality videos that captivate audiences and deliver results for any platform or purpose.
            </p>
          </motion.div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
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
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-turquoise-500/10 rounded-xl transform transition-all duration-300 group-hover:scale-105 -z-10 opacity-0 group-hover:opacity-100 blur-xl"></div>
              
              <div className="relative overflow-hidden bg-[#22222c]/80 backdrop-blur-sm rounded-xl border border-gray-800 transition-all duration-300 group-hover:border-turquoise-800/50 h-full">
                {/* Glowing corner accent */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${service.accent} opacity-20 rounded-bl-full`}></div>
                
                <div className="p-8">
                  {/* Hexagonal icon container */}
                  <div className="relative mb-6">
                    <div className={`w-14 h-14 bg-gradient-to-r ${service.accent} flex items-center justify-center text-white clip-hex shadow-lg`}>
                      {service.icon}
                    </div>
                    <div className={`absolute -inset-1 bg-gradient-to-r ${service.accent} opacity-30 blur-md clip-hex -z-10`}></div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-white font-display">{service.title}</h3>
                  <p className="text-gray-300 mb-6">{service.description}</p>
                  
                  <ul className="space-y-3">
                    {service.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-start">
                        <span className="h-5 w-5 flex-shrink-0 text-turquoise-400 mr-3">
                          <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <span className="text-gray-200">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
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
          <a href="#pricing" className="inline-flex items-center text-turquoise-400 hover:text-turquoise-300 transition-colors font-medium font-accent">
            <span>View our pricing packages</span>
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>

      <style jsx global>{`
        .clip-hex {
          clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%);
        }
      `}</style>
    </section>
  );
} 