"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { OpeningIcon, StrategyIcon, EndgameIcon, TrainingIcon, KnightIcon } from "@/components/ui/ChessIcons";
import ChessPuzzle from "@/components/ui/ChessPuzzle";

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState(0);

  const services = [
    {
      title: "The Opening Phase",
      description: "Develop a royal repertoire that gives you the advantage from move one with both white and black pieces.",
      icon: <OpeningIcon className="h-7 w-7" />,
      features: [
        "Strategic pawn deployment",
        "Development principles",
        "Control of center squares",
        "Castle positioning tactics"
      ],
      color: "bg-blue-600"
    },
    {
      title: "The Middle Game Assault",
      description: "Turn tactical visions into crushing attacks with calculated strikes and positional dominance.",
      icon: <StrategyIcon className="h-7 w-7" />,
      features: [
        "Knight fork recognition",
        "Bishop diagonal dominance",
        "Rook infiltration tactics",
        "Queen-side expansion"
      ],
      color: "bg-purple-600"
    },
    {
      title: "The Endgame Conversion",
      description: "Transform small advantages into victorious positions with precise technique and king activation.",
      icon: <EndgameIcon className="h-7 w-7" />,
      features: [
        "Pawn promotion paths",
        "King centralization technique",
        "Rook vs minor piece battles",
        "Opposition mastery tactics"
      ],
      color: "bg-emerald-600"
    },
    {
      title: "Tournament Domination",
      description: "Develop the grandmaster mindset required to maintain concentration and claim victory in competitive play.",
      icon: <TrainingIcon className="h-7 w-7" />,
      features: [
        "Opponent preparation strategy",
        "Clock management mastery",
        "Mental fortitude training",
        "Between-game recovery"
      ],
      color: "bg-amber-600"
    }
  ];

  const improvementAreas = [
    {
      title: "Rating Growth",
      description: "+200 ELO rating improvement on average",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      title: "Custom Opening Repertoire",
      description: "Personalized opening repertoire development",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    {
      title: "Pattern Recognition",
      description: "Pattern recognition and calculation training",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      title: "Strategic Planning",
      description: "Strategic planning and positional evaluation",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  return (
    <section className="relative py-32 overflow-hidden" id="training-camp">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[#030812]">
        {/* Chess board pattern in background */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              repeating-conic-gradient(#ffffff 0%, #ffffff 25%, transparent 0%, transparent 50%),
              repeating-conic-gradient(#ffffff 0%, #ffffff 25%, transparent 0%, transparent 50%)
            `,
            backgroundPosition: "0 0, 30px 30px",
            backgroundSize: "60px 60px"
          }}>
        </div>
        
        {/* Bottom wave */}
        <div className="absolute left-0 right-0 bottom-0 h-48 bg-gradient-to-t from-[#07101e] to-transparent"></div>
        
        {/* Diagonal line */}
        <div className="absolute left-0 right-0 top-0 bottom-0 overflow-hidden">
          <div className="absolute top-0 right-[45%] w-[1px] h-[200%] origin-top-right -rotate-45 bg-gradient-to-b from-chess-gold-500/10 via-chess-gold-500/40 to-transparent"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Title Section - Asymmetrical design */}
        <div className="flex flex-col md:flex-row mb-20 md:items-end">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2 mb-10 md:mb-0"
          >
            <div className="relative inline-block mb-4">
              <span className="inline-block py-1 px-4 border-l-2 border-chess-gold-500 text-sm font-medium text-chess-gold-500">
                TRAINING METHODOLOGY
              </span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold mb-6 relative">
              <span className="inline-block">Our</span>
              <span className="inline-block ml-4 text-gray-800 bg-chess-gold-500 px-4 transform -skew-x-12">Tactical</span>
              <span className="block mt-4">Chess Training Camp</span>
            </h2>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:w-1/2 md:pl-12"
          >
            <p className="text-xl text-gray-400 max-w-xl">
              Master every phase of the royal game with specialized training designed to elevate your ELO rating and strengthen your strategic thinking.
            </p>
          </motion.div>
        </div>
        
        {/* Main content with vertical layout */}
        <div className="md:flex gap-16">
          {/* Left vertical section with tabs */}
          <div className="md:w-1/2 mb-12 md:mb-0">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative mb-8"
            >
              <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
                {services.map((service, index) => (
                  <button 
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`whitespace-nowrap px-5 py-3 rounded-t-lg text-sm font-medium transition-all duration-300 ${
                      activeTab === index 
                        ? `${service.color} text-white` 
                        : 'bg-white/5 text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    {service.title.split(' ').pop()}
                  </button>
                ))}
              </div>
              
              <div className="h-[1px] w-full bg-white/10"></div>
            </motion.div>
            
            {/* Vertical timeline with services */}
            <div className="relative pl-8 before:absolute before:top-0 before:bottom-0 before:left-[9px] before:w-[1px] before:bg-white/10">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: activeTab === index ? 1 : 0.5,
                    x: 0,
                    height: activeTab === index ? 'auto' : '70px',
                    overflow: 'hidden' 
                  }}
                  transition={{ duration: 0.4 }}
                  className={`relative mb-12 transition-all duration-300 ${
                    activeTab === index ? '' : 'cursor-pointer'
                  }`}
                  onClick={() => setActiveTab(index)}
                >
                  {/* Timeline node */}
                  <div className={`absolute -left-8 top-0 w-4 h-4 rounded-full ${service.color} border-2 border-[#030812] z-10`}></div>
                  
                  {/* Header */}
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 rounded-lg ${service.color} flex items-center justify-center text-white mr-4`}>
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white">{service.title}</h3>
                  </div>
                  
                  {/* Content - Only fully visible when active */}
                  <div className={`transition-opacity duration-500 ${activeTab === index ? 'opacity-100' : 'opacity-0'}`}>
                    <p className="text-gray-400 mb-6">{service.description}</p>
                    
                    <ul className="space-y-3">
                      {service.features.map((feature, fidx) => (
                        <li key={fidx} className="flex items-center gap-3">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/5">
                            <span className={`w-2 h-2 rounded-full ${service.color}`}></span>
                          </span>
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Right vertical section with floating elements */}
          <div className="md:w-1/2">
            <div className="relative">
              {/* Decorative element */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-chess-gold-500/10 blur-xl"
              />
              
              {/* Challenge card */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-12 relative bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden"
              >
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-chess-gold-500/10 flex items-center justify-center text-chess-gold-500 mr-4">
                      <KnightIcon size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Daily Tactics Challenge</h3>
                  </div>
                  
                  <p className="text-gray-400 mb-6">
                    Sharpen your tactical vision with our daily chess puzzles. Can you find the winning move?
                  </p>
                  
                  <div className="aspect-square relative rounded-lg overflow-hidden">
                    <ChessPuzzle puzzleId="puzzle-1" difficulty="beginner" caption="A classic chess position featuring queen and king." />
                  </div>
                </div>
              </motion.div>
              
              {/* Key improvement areas - Diagonal card layout */}
              <div className="relative space-y-6">
                <motion.h3
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-2xl font-bold text-white mb-6"
                >
                  Key Improvement Areas
                </motion.h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {improvementAreas.map((area, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`transform ${index % 2 === 0 ? 'md:-translate-y-4' : 'md:translate-y-4'} bg-white/[0.03] border border-white/10 p-6 rounded-xl hover:bg-white/[0.05] transition-colors duration-300`}
                    >
                      <div className="flex">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-chess-gold-500/10 flex items-center justify-center text-chess-gold-500 mr-4">
                          {area.icon}
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-white mb-1">{area.title}</h4>
                          <p className="text-gray-400 text-sm">{area.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* ELO Timeline */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mt-12 pt-12 border-t border-white/10"
                >
                  <h4 className="text-lg font-medium text-white mb-3">ELO Growth Timeline</h4>
                  
                  <div className="relative">
                    <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/10 transform -translate-y-1/2"></div>
                    
                    <div className="relative h-20">
                      {/* Start point */}
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 flex flex-col items-center">
                        <div className="w-4 h-4 rounded-full bg-white/20 mb-2"></div>
                        <span className="text-xs text-gray-400">Start</span>
                      </div>
                      
                      {/* 3 month point */}
                      <div className="absolute left-1/3 top-1/2 transform -translate-y-1/2 flex flex-col items-center">
                        <div className="w-4 h-4 rounded-full bg-chess-gold-500/50 mb-2"></div>
                        <span className="text-xs text-gray-400">+100 ELO</span>
                      </div>
                      
                      {/* 6 month point */}
                      <div className="absolute left-2/3 top-1/2 transform -translate-y-1/2 flex flex-col items-center">
                        <div className="w-4 h-4 rounded-full bg-chess-gold-500/70 mb-2"></div>
                        <span className="text-xs text-gray-400">+150 ELO</span>
                      </div>
                      
                      {/* End point */}
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex flex-col items-center">
                        <div className="w-4 h-4 rounded-full bg-chess-gold-500 mb-2"></div>
                        <span className="text-xs text-gray-400">+200 ELO</span>
                      </div>
                      
                      {/* Progress bar */}
                      <div className="absolute top-1/2 left-0 h-[3px] w-3/4 bg-gradient-to-r from-white/20 via-chess-gold-500/70 to-chess-gold-500 transform -translate-y-1/2 rounded-full"></div>
                    </div>
                    
                    <div className="flex justify-between mt-4 text-xs text-gray-400">
                      <span>Starting Rating</span>
                      <span>6 Months</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 