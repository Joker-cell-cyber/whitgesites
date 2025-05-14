"use client";

import { motion } from "framer-motion";
import { OpeningIcon, StrategyIcon, EndgameIcon, TrainingIcon, KnightIcon } from "@/components/ui/ChessIcons";
import ChessPuzzle from "@/components/ui/ChessPuzzle";

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
      title: "The Opening Phase",
      description: "Develop a royal repertoire that gives you the advantage from move one with both white and black pieces.",
      icon: <OpeningIcon className="h-6 w-6" />,
      features: [
        "Strategic pawn deployment",
        "Development principles",
        "Control of center squares",
        "Castle positioning tactics"
      ]
    },
    {
      title: "The Middle Game Assault",
      description: "Turn tactical visions into crushing attacks with calculated strikes and positional dominance.",
      icon: <StrategyIcon className="h-6 w-6" />,
      features: [
        "Knight fork recognition",
        "Bishop diagonal dominance",
        "Rook infiltration tactics",
        "Queen-side expansion"
      ]
    },
    {
      title: "The Endgame Conversion",
      description: "Transform small advantages into victorious positions with precise technique and king activation.",
      icon: <EndgameIcon className="h-6 w-6" />,
      features: [
        "Pawn promotion paths",
        "King centralization technique",
        "Rook vs minor piece battles",
        "Opposition mastery tactics"
      ]
    },
    {
      title: "Tournament Domination",
      description: "Develop the grandmaster mindset required to maintain concentration and claim victory in competitive play.",
      icon: <TrainingIcon className="h-6 w-6" />,
      features: [
        "Opponent preparation strategy",
        "Clock management mastery",
        "Mental fortitude training",
        "Between-game recovery"
      ]
    }
  ];

  return (
    <section className="py-20 bg-[#0d1b30]" id="training-camp">
      <div className="divider-chess -mt-12 mb-8"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="gradient-text">Tactical</span> Chess Training Camp
            </h2>
            <p className="text-gray-400 text-lg">
              Master every phase of the royal game with specialized training designed to elevate your ELO rating and strengthen your strategic thinking.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="glass-effect p-6 rounded-xl"
          >
            <div className="flex items-center mb-4">
              <KnightIcon size={24} className="text-chess-gold-500 mr-3" />
              <h3 className="text-2xl font-bold text-white">Daily Tactics Challenge</h3>
            </div>
            <p className="text-gray-300 mb-6">
              Sharpen your tactical vision with our daily chess puzzles. Can you find the winning move?
            </p>
            <ChessPuzzle puzzleId="puzzle-1" difficulty="beginner" caption="Checkmate in one move. White to play." />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="glass-effect p-6 rounded-xl">
              <h3 className="text-xl font-bold text-white mb-3">Key Improvement Areas</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-chess-gold-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">+200 ELO rating improvement on average</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-chess-gold-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Personalized opening repertoire development</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-chess-gold-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Pattern recognition and calculation training</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-chess-gold-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Strategic planning and positional evaluation</span>
                </li>
              </ul>
            </div>
            
            <div className="glass-effect p-6 rounded-xl">
              <h3 className="text-xl font-bold text-white mb-3">ELO Growth Timeline</h3>
              <div className="h-8 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-chess-blue-600 to-chess-gold-500 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-400">
                <span>Starting Rating</span>
                <span>+200 ELO</span>
                <span>After 6 Months</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className="card-hover rounded-xl p-6 relative overflow-hidden"
              variants={itemVariants}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-chess-blue-600/10 to-chess-gold-500/10 rounded-full transform translate-x-10 -translate-y-10 blur-2xl"></div>
              
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-chess-blue-600 to-chess-gold-500 flex items-center justify-center text-white mb-5">
                {service.icon}
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
              <p className="text-gray-400 mb-5">{service.description}</p>
              
              <ul className="space-y-2">
                {service.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-start">
                    <svg className="h-5 w-5 text-chess-gold-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
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
          <a href="#grandmaster-strategy" className="inline-flex items-center text-chess-gold-400 hover:text-chess-gold-300 transition-colors font-medium">
            <span>Explore our grandmaster strategies</span>
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
} 