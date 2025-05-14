"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BrainIcon, FocusIcon, MemoryIcon, PlanningIcon, AnalysisIcon, PatienceIcon } from "@/components/ui/ChessIcons";

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const cognitiveSkills = [
    {
      id: 1,
      title: "Strategic Thinking",
      description: "Chess sharpens your ability to formulate long-term plans, think several moves ahead, and adapt your strategy based on changing circumstances.",
      icon: <PlanningIcon size={30} className="text-white" />,
      stats: "43% improvement",
      color: "from-blue-600 to-blue-400"
    },
    {
      id: 2,
      title: "Critical Analysis",
      description: "Learn to evaluate positions, calculate variations, and make informed decisions based on concrete analysis rather than impulse.",
      icon: <AnalysisIcon size={30} className="text-white" />,
      stats: "37% enhancement",
      color: "from-purple-600 to-purple-400"
    },
    {
      id: 3, 
      title: "Pattern Recognition",
      description: "Develop the ability to recognize tactical and positional patterns, which transfers to problem-solving in academic and professional contexts.",
      icon: <MemoryIcon size={30} className="text-white" />,
      stats: "56% better recall",
      color: "from-red-600 to-orange-400"
    },
    {
      id: 4,
      title: "Concentration",
      description: "Chess builds your ability to maintain focus for extended periods, filtering out distractions to remain immersed in complex tasks.",
      icon: <FocusIcon size={30} className="text-white" />,
      stats: "49% longer focus",
      color: "from-emerald-600 to-teal-400"
    },
    {
      id: 5,
      title: "Emotional Regulation",
      description: "Master the art of keeping your emotions in check under pressure, learning from mistakes, and maintaining composure in challenging situations.",
      icon: <PatienceIcon size={30} className="text-white" />,
      stats: "31% better control",
      color: "from-pink-600 to-rose-400"
    },
    {
      id: 6,
      title: "Neural Development",
      description: "Regular chess practice creates new neural pathways, improving problem-solving capabilities and cognitive flexibility across disciplines.",
      icon: <BrainIcon size={30} className="text-white" />,
      stats: "28% brain activity",
      color: "from-amber-600 to-yellow-400"
    }
  ];

  return (
    <section ref={sectionRef} className="pt-24 pb-40 relative overflow-hidden" id="chess-benefits">
      {/* Background */}
      <div className="absolute inset-0 bg-[#030712]">
        {/* Hexagon grid pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M17.3 20h25.4L30 5zM42.7 20L30 35 17.3 20zM17.3 40h25.4L30 55zM42.7 40L30 25 17.3 40z' stroke='%23FFFFFF' stroke-width='1' fill='none' /%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px"
          }}>
        </div>
      </div>
      
      {/* Content container */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="relative mb-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="absolute -left-24 top-1/2 transform -translate-y-1/2 w-16 h-[1px] bg-gradient-to-r from-chess-gold-500 to-transparent"
          />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl relative"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              <span className="block">The</span>
              <div className="inline-block relative z-10 px-4 py-2 my-2 bg-chess-gold-500 text-gray-900 transform -skew-x-3">Cognitive Edge</div>
              <span className="block">of Chess</span>
            </h2>
            
            <p className="text-xl text-gray-400 md:text-2xl max-w-xl leading-relaxed">
              Beyond the 64 squares lies a world of mental transformation — discover how chess rewires your brain for excellence
            </p>
          </motion.div>
        </div>
        
        {/* Card layout - Fixed visibility issues */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {cognitiveSkills.map((skill, index) => (
            <motion.div
              key={skill.id}
              style={{ y: index % 3 === 0 ? y1 : index % 3 === 1 ? y2 : y3 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full relative rounded-2xl overflow-hidden p-1">
                <div className={`relative h-full w-full rounded-xl p-8 bg-gradient-to-br ${skill.color} bg-opacity-5 flex flex-col justify-between backdrop-blur-sm bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all duration-300`}>
                  {/* Top content */}
                  <div>
                    <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-xl bg-black/30 mb-6 backdrop-blur-lg border border-white/10">
                      {skill.icon}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-3">{skill.title}</h3>
                    <p className="text-black">{skill.description}</p>
                  </div>
                  
                  {/* Bottom content */}
                  <div className="mt-6 pt-6 border-t border-white/5">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-chess-gold-500/50 mr-2"></div>
                        <span className="text-sm text-gray-500">Research-based</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-chess-gold-400 to-white">{skill.stats}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 h-1 w-full bg-black/30 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${parseInt(skill.stats)}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.2 }}
                        className="h-full rounded-full bg-gradient-to-r from-chess-gold-600 via-chess-gold-400 to-white"
                      />
                    </div>
                  </div>
                  
                  {/* Simple decorative element */}
                  <div className="absolute top-0 right-0 -mr-2 -mt-2 w-12 h-12 rounded-full bg-chess-gold-500/10 blur-lg"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 