"use client";

import { motion } from "framer-motion";
import { BrainIcon, FocusIcon, MemoryIcon, PlanningIcon, AnalysisIcon, PatienceIcon } from "@/components/ui/ChessIcons";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export default function PortfolioSection() {
  const cognitiveSkills = [
    {
      id: 1,
      title: "Strategic Thinking",
      description: "Chess sharpens your ability to formulate long-term plans, think several moves ahead, and adapt your strategy based on changing circumstances.",
      icon: <PlanningIcon size={40} className="text-chess-gold-500" />,
      stats: "43% improvement",
      color: "from-blue-500 to-cyan-400"
    },
    {
      id: 2,
      title: "Critical Analysis",
      description: "Learn to evaluate positions, calculate variations, and make informed decisions based on concrete analysis rather than impulse.",
      icon: <AnalysisIcon size={40} className="text-chess-gold-500" />,
      stats: "37% enhancement",
      color: "from-purple-500 to-indigo-500"
    },
    {
      id: 3, 
      title: "Pattern Recognition",
      description: "Develop the ability to recognize tactical and positional patterns, which transfers to problem-solving in academic and professional contexts.",
      icon: <MemoryIcon size={40} className="text-chess-gold-500" />,
      stats: "56% better recall",
      color: "from-red-500 to-orange-400"
    },
    {
      id: 4,
      title: "Concentration",
      description: "Chess builds your ability to maintain focus for extended periods, filtering out distractions to remain immersed in complex tasks.",
      icon: <FocusIcon size={40} className="text-chess-gold-500" />,
      stats: "49% longer focus",
      color: "from-emerald-500 to-teal-400"
    },
    {
      id: 5,
      title: "Emotional Regulation",
      description: "Master the art of keeping your emotions in check under pressure, learning from mistakes, and maintaining composure in challenging situations.",
      icon: <PatienceIcon size={40} className="text-chess-gold-500" />,
      stats: "31% better control",
      color: "from-pink-500 to-rose-400"
    },
    {
      id: 6,
      title: "Neural Development",
      description: "Regular chess practice creates new neural pathways, improving problem-solving capabilities and cognitive flexibility across disciplines.",
      icon: <BrainIcon size={40} className="text-chess-gold-500" />,
      stats: "28% brain activity",
      color: "from-amber-500 to-yellow-400"
    }
  ];

  return (
    <section className="py-24 bg-[#0d1b30]" id="chess-benefits">
      <div className="divider-chess -mt-16 mb-12"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The <span className="gradient-text">Cognitive Edge</span> of Chess
            </h2>
            <p className="text-gray-400 text-lg">
              Beyond the 64 squares lies a world of mental transformation — discover how chess rewires your brain for excellence
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cognitiveSkills.map((skill, index) => (
            <motion.div
              key={skill.id}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              className="relative overflow-hidden rounded-xl bg-gradient-to-b from-[#0c1d3d] to-[#0a1628] border border-[#1e365a] group hover:border-chess-gold-500/50 transition-colors"
            >
              {/* Top corner effect */}
              <div className="absolute top-0 right-0 w-24 h-24 -translate-y-1/2 translate-x-1/2 bg-gradient-to-r from-chess-blue-600/10 to-chess-gold-500/10 rounded-full blur-xl transform group-hover:scale-110 transition-transform"></div>
              
              <div className="p-6 md:p-8 relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg glass-effect mb-6">
                  {skill.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3">{skill.title}</h3>
                <p className="text-gray-300 mb-6">{skill.description}</p>
                
                <div className="mt-auto">
                  <div className="h-1 w-full bg-[#1a2e4f] rounded-full mb-2">
                    <div className={`h-full rounded-full bg-gradient-to-r ${skill.color}`} style={{ width: skill.stats.split('%')[0] + '%' }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">Research-based effect</span>
                    <span className="text-sm font-semibold text-chess-gold-400">{skill.stats}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 