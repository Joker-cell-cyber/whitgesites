"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ServicesSection() {
  const services = [
    {
      title: "Cash Game Strategies",
      description: "Develop a solid strategy for cash games at all levels with our resources and hand analysis.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      features: [
        "Preflop range construction",
        "Post-flop decision making",
        "Bankroll management",
        "Exploitative adjustments"
      ],
      color: "blue"
    },
    {
      title: "MTT/Tournament Mastery",
      description: "Master MTT concepts that will help you navigate from early stages to final tables with confidence.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      features: [
        "ICM pressure calculations",
        "Final table strategies",
        "Stack size adjustments",
        "Satellite qualification techniques"
      ],
      color: "gold"
    },
    {
      title: "Expresso/Spin & Go",
      description: "Discover the fast-paced world of 3-max hyperturbos with specialized strategies for these high-variance formats.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      features: [
        "Push/fold equilibrium strategies",
        "Short-stack play optimization",
        "Heads-up mastery",
        "Prize pool adjustments"
      ],
      color: "red"
    },
    {
      title: "Bankroll Management",
      description: "Learn the appropriate bankroll management techniques to ensure long-term success and minimize downswings.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      features: [
        "Ruin risk calculations",
        "Moving up/down stake rules",
        "Stop-loss strategies",
        "Variance simulation tools"
      ],
      color: "green"
    },
    {
      title: "Mental Preparation",
      description: "Develop the mindset needed to make optimal decisions under pressure and maintain focus during difficult periods.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      features: [
        "Tilt control techniques",
        "Decision confidence building",
        "Concentration exercises",
        "Downswing management"
      ],
      color: "purple"
    },
    {
      title: "HUD Optimization",
      description: "Maximize your data-driven edge with HUD setups tailored to your playing style and poker format.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      features: [
        "Custom statistics setup",
        "Player type identification",
        "Real-time decision support",
        "Database management training"
      ],
      color: "cyan"
    },
    {
      title: "Hyperturbo Specialist",
      description: "Discover the fast-paced world of 3-max hyperturbos with specialized strategies for these high-variance formats.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: "orange",
      features: [
        "Push/fold equilibrium strategies",
        "Short-stack play optimization",
        "Heads-up mastery",
        "Prize pool adjustments"
      ]
    },
    {
      title: "Database Management Training",
      description: "Track your progress and identify leaks in your game with proper database management and analysis techniques.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      features: [
        "Custom statistics setup",
        "Player type identification",
        "Real-time decision support",
        "Database management training"
      ],
      color: "slate"
    }
  ];

  // Active hover state
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Color mapping for service modules
  const getColorClasses = (color: string, isActive: boolean) => {
    const baseClasses = isActive ? 'shadow-lg scale-105 ' : '';
    
    switch(color) {
      case 'blue':
        return `${baseClasses}from-poker-royal-800 to-poker-royal-950 border-poker-royal-600 ${isActive ? 'shadow-poker-royal-700/30' : ''}`;
      case 'gold':
        return `${baseClasses}from-chip-gold-800 to-amber-950 border-chip-gold-600 ${isActive ? 'shadow-chip-gold-600/30' : ''}`;
      case 'red':
        return `${baseClasses}from-poker-red-800 to-poker-red-950 border-poker-red-600 ${isActive ? 'shadow-poker-red-500/30' : ''}`;
      case 'green':
        return `${baseClasses}from-emerald-800 to-emerald-950 border-emerald-600 ${isActive ? 'shadow-emerald-500/30' : ''}`;
      case 'purple':
        return `${baseClasses}from-purple-800 to-purple-950 border-purple-600 ${isActive ? 'shadow-purple-500/30' : ''}`;
      case 'cyan':
        return `${baseClasses}from-cyan-800 to-cyan-950 border-cyan-600 ${isActive ? 'shadow-cyan-500/30' : ''}`;
      case 'orange':
        return `${baseClasses}from-orange-800 to-orange-950 border-orange-600 ${isActive ? 'shadow-orange-500/30' : ''}`;
      default:
        return `${baseClasses}from-slate-800 to-slate-950 border-slate-600 ${isActive ? 'shadow-slate-500/30' : ''}`;
    }
  };

  return (
    <section className="relative py-32 overflow-hidden" id="services">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#060a0e] to-[#0c1014]"></div>
      
      {/* Particle dots background */}
      <div className="absolute inset-0">
        {Array.from({ length: 100 }).map((_, i) => (
          <div 
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-white/10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1,
              animation: `pulse ${Math.random() * 4 + 2}s infinite ease-in-out`
            }}
          ></div>
        ))}
      </div>
      
      {/* Glow effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-poker-royal-900/20 blur-[100px]"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-chip-gold-800/20 blur-[120px]"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-black/80 to-felt-900/80 backdrop-blur-lg border border-felt-800/50 mb-4">
            <span className="text-sm text-gray-400 font-medium">Complete poker curriculum</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-montserrat text-white">
            Our Training <span className="relative inline-block">
              <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-chip-gold-400 to-chip-gold-600">Modules</span>
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-chip-gold-500/40 rounded-full"></span>
            </span>
          </h2>
          
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Complete poker training designed to transform your game and maximize your edge at all levels.
          </p>
        </motion.div>

        {/* 3D Training Path - Vertical Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Central vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-poker-royal-700/50 via-chip-gold-500/50 to-poker-royal-700/50 rounded-full z-0"></div>
          
          {/* Module cards along timeline */}
          <div className="relative z-10">
            {services.map((service, index) => {
              const isEven = index % 2 === 0;
              const isActive = activeIndex === index;
              
              return (
                <div 
                  key={index} 
                  className={`relative mb-16 last:mb-0 flex ${isEven ? 'justify-end' : 'justify-start'}`}
                >
                  {/* Timeline node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                    <div className={`w-5 h-5 rounded-full bg-gradient-to-r 
                      ${service.color === 'blue' ? 'from-poker-royal-500 to-poker-royal-700' : 
                        service.color === 'gold' ? 'from-chip-gold-400 to-chip-gold-600' :
                        service.color === 'red' ? 'from-poker-red-500 to-poker-red-700' :
                        service.color === 'green' ? 'from-emerald-500 to-emerald-700' :
                        service.color === 'purple' ? 'from-purple-500 to-purple-700' :
                        service.color === 'cyan' ? 'from-cyan-500 to-cyan-700' :
                        service.color === 'orange' ? 'from-orange-500 to-orange-700' :
                        'from-slate-500 to-slate-700'
                      } z-20`}
                    ></div>
                    <div className={`absolute w-9 h-9 rounded-full bg-gradient-to-r 
                      ${service.color === 'blue' ? 'from-poker-royal-500/30 to-poker-royal-700/30' : 
                        service.color === 'gold' ? 'from-chip-gold-400/30 to-chip-gold-600/30' :
                        service.color === 'red' ? 'from-poker-red-500/30 to-poker-red-700/30' :
                        service.color === 'green' ? 'from-emerald-500/30 to-emerald-700/30' :
                        service.color === 'purple' ? 'from-purple-500/30 to-purple-700/30' :
                        service.color === 'cyan' ? 'from-cyan-500/30 to-cyan-700/30' :
                        service.color === 'orange' ? 'from-orange-500/30 to-orange-700/30' :
                        'from-slate-500/30 to-slate-700/30'
                      } animate-ping`}
                    ></div>
                  </div>
                  
                  {/* Module card */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 50 : -50, y: 30 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    onHoverStart={() => setActiveIndex(index)}
                    onHoverEnd={() => setActiveIndex(null)}
                    className={`w-full md:w-[calc(50%-40px)] perspective-1000`}
                  >
                    <div className={`
                      relative group transition-all duration-500 transform 
                      ${isActive ? 'rotate-y-[-5deg]' : ''}
                    `}>
                      {/* Card background with 3D effect */}
                      <div className={`
                        relative p-px rounded-2xl overflow-hidden
                        transform transition-all duration-500 bg-gradient-to-br
                        ${getColorClasses(service.color, isActive)}
                      `}>
                        {/* Card inner */}
                        <div className="relative bg-gradient-to-br from-black/90 to-gray-900/90 p-6 rounded-2xl backdrop-blur-sm z-10">
                          {/* Card content */}
                          <div className="flex items-start gap-4">
                            <div className={`
                              flex-shrink-0 w-14 h-14 rounded-lg flex items-center justify-center
                              bg-gradient-to-br
                              ${service.color === 'blue' ? 'from-poker-royal-600 to-poker-royal-800' : 
                                service.color === 'gold' ? 'from-chip-gold-500 to-chip-gold-700' :
                                service.color === 'red' ? 'from-poker-red-600 to-poker-red-800' :
                                service.color === 'green' ? 'from-emerald-500 to-emerald-700' :
                                service.color === 'purple' ? 'from-purple-500 to-purple-700' :
                                service.color === 'cyan' ? 'from-cyan-500 to-cyan-700' :
                                service.color === 'orange' ? 'from-orange-500 to-orange-700' :
                                'from-slate-500 to-slate-700'
                              } text-white shadow-inner text-xl p-2
                            `}>
                              {service.icon}
                            </div>
                            
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-white mb-2 font-montserrat">{service.title}</h3>
                              <p className="text-gray-400 mb-5">{service.description}</p>
                              
                              {/* Feature list */}
                              <div className="space-y-2">
                                {service.features.map((feature, fidx) => (
                                  <div key={fidx} className="flex items-center">
                                    <div className={`
                                      w-1.5 h-1.5 rounded-full mr-2
                                      ${service.color === 'blue' ? 'bg-poker-royal-500' : 
                                        service.color === 'gold' ? 'bg-chip-gold-500' :
                                        service.color === 'red' ? 'bg-poker-red-500' :
                                        service.color === 'green' ? 'bg-emerald-500' :
                                        service.color === 'purple' ? 'bg-purple-500' :
                                        service.color === 'cyan' ? 'bg-cyan-500' :
                                        service.color === 'orange' ? 'bg-orange-500' :
                                        'bg-slate-500'
                                      }
                                    `}></div>
                                    <span className="text-gray-300 text-sm">{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          {/* Visual flourish: Card corner decoration */}
                          <div className="absolute bottom-5 right-5 opacity-10 transform rotate-12 text-6xl">
                            {service.color === 'blue' ? '♠' : 
                             service.color === 'gold' ? '♦' :
                             service.color === 'red' ? '♥' :
                             service.color === 'green' ? '♣' :
                             service.color === 'purple' ? '♠' :
                             service.color === 'cyan' ? '♦' :
                             service.color === 'orange' ? '♥' :
                             '♣'}
                          </div>
                        </div>
                      </div>
                      
                      {/* 3D shadow effect */}
                      <div className={`
                        absolute inset-0 rounded-2xl bg-black/50 transform translate-y-1 
                        blur-sm transition-all duration-500 -z-10 rotate-y-[-5deg]
                        ${isActive ? 'translate-y-2 blur-md' : ''}
                      `}></div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
        
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <a 
            href="#pricing" 
            className="inline-flex items-center px-8 py-4 rounded-xl bg-gradient-to-r from-poker-royal-700 to-poker-royal-900 text-white shadow-xl hover:shadow-poker-royal-700/30 transform hover:-translate-y-1 transition-all duration-300 group"
          >
            <span className="text-lg">View our packages</span>
            <svg className="ml-3 w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
      
      {/* Bottom decorative element */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-chip-gold-500/30 to-transparent"></div>
    </section>
  );
} 