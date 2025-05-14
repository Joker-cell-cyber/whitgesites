"use client";

import { motion } from "framer-motion";

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
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function ServicesSection() {
  const services = [
    {
      title: "Battle Royale Games",
      description: "Master the art of survival and dominate the battlefield in competitive battle royale games.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      games: [
        "Fortnite",
        "Call of Duty: Warzone",
        "Apex Legends",
        "PUBG"
      ]
    },
    {
      title: "MOBA Games",
      description: "Improve your strategy, map awareness, and team coordination to climb the ranked ladder.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      games: [
        "League of Legends",
        "Teamfight Tactics",
        "Dota 2",
        "Heroes of the Storm"
      ]
    },
    {
      title: "Tactical Shooters",
      description: "Perfect your aim, learn advanced tactics, and master game sense to outplay your opponents.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      games: [
        "CS:GO",
        "Valorant",
        "Rainbow Six Siege",
        "Overwatch"
      ]
    },
    {
      title: "Sports Games",
      description: "Learn professional strategies, skill moves, and game mechanics to become a top competitor.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      games: [
        "FIFA",
        "Rocket League",
        "NBA 2K",
        "Madden NFL"
      ]
    }
  ];

  return (
    <section className="py-24 relative" id="services">
      {/* Orbital background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full border-4 border-indigo-700/20 animate-spin-slow"></div>
        <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 rounded-full border-2 border-cyan-500/20 animate-spin-reverse"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-indigo-900/10 to-cyan-900/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-5">
            <div className="h-0.5 w-6 bg-cyan-500"></div>
            <span className="text-cyan-500 font-['Montserrat'] uppercase tracking-widest text-sm font-medium">Expertise</span>
            <div className="h-0.5 w-6 bg-cyan-500"></div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat'] mb-5">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-indigo-600">Game</span> Coaching Services
          </h2>
          
          <p className="text-gray-300 text-lg font-['Space_Grotesk']">
            We offer expert coaching across multiple game genres to help you improve your skills and rank up faster.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl hover:shadow-indigo-900/20 transition-all duration-300"
            >
              <div className="h-2 bg-gradient-to-r from-cyan-500 to-indigo-600"></div>
              <div className="p-8">
                <div className="flex flex-col gap-6">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-indigo-600/20 to-cyan-500/20 flex items-center justify-center text-cyan-500 transform rotate-6">
                    <div className="transform -rotate-6">
                      {service.icon}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-3 font-['Montserrat'] text-white">
                      {service.title}
                    </h3>
                    <p className="text-gray-300 mb-6 font-['Space_Grotesk']">{service.description}</p>
                  </div>
                  
                  <div className="bg-slate-800/50 p-4 rounded-lg">
                    <span className="uppercase text-xs tracking-wider font-medium text-cyan-500 font-['Space_Grotesk'] block mb-3">Popular Games</span>
                    <div className="grid grid-cols-2 gap-y-2">
                      {service.games.map((game, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-sm bg-indigo-600"></div>
                          <span className="text-gray-300 text-sm">{game}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a 
            href="#pricing" 
            className="inline-block font-['Space_Grotesk'] text-white px-8 py-3.5 rounded-lg relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-lg"></span>
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative flex items-center gap-2">
              View our coaching packages
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
} 