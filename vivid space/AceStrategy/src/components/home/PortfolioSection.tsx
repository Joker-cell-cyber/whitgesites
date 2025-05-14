"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InfoCard from '../ui/ResultCard';
import PokerGraph from '../ui/PokerGraph';

type PokerCategory = 'all' | 'cash' | 'tournament' | 'spin';

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState<PokerCategory>('all');
  const [expandedFormat, setExpandedFormat] = useState<number | null>(null);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  // Theoretical data on different poker formats
  const pokerFormats = [
    {
      id: 1,
      format: "NL Hold'em Cash Games",
      category: "cash",
      image: "/images/results/cash-game-results.jpg",
      metrics: [
        { 
          label: "Win Rate", 
          value: "3-9bb/100", 
          isPositive: true 
        },
        { 
          label: "Average ROI", 
          value: "5-20%", 
          isPositive: true 
        }
      ],
      info: "No-Limit Hold'em cash game is the most played format worldwide. It requires a good understanding of mathematics, game theory, and precise reading of opponents.",
      graphData: [
        { sessionIndex: 1, winRate: 2.5 },
        { sessionIndex: 2, winRate: 3.2 },
        { sessionIndex: 3, winRate: 4.0 },
        { sessionIndex: 4, winRate: 4.8 },
        { sessionIndex: 5, winRate: 5.5 },
        { sessionIndex: 6, winRate: 6.2 },
        { sessionIndex: 7, winRate: 6.8 },
        { sessionIndex: 8, winRate: 7.3 },
        { sessionIndex: 9, winRate: 7.7 },
        { sessionIndex: 10, winRate: 8.1 }
      ]
    },
    {
      id: 2,
      format: "Multi-Table Tournaments",
      category: "tournament",
      image: "/images/results/tournament-results.jpg",
      metrics: [
        { 
          label: "ROI", 
          value: "15-40%", 
          isPositive: true 
        },
        { 
          label: "ITM", 
          value: "15-25%", 
          isPositive: true 
        }
      ],
      info: "Multi-table tournaments require a different strategic approach depending on the game phase. Understanding ICM (Independent Chip Model) is essential to maximize profits.",
      graphData: [
        { sessionIndex: 1, winRate: 12 },
        { sessionIndex: 2, winRate: 15 },
        { sessionIndex: 3, winRate: 18 },
        { sessionIndex: 4, winRate: 21 },
        { sessionIndex: 5, winRate: 24 },
        { sessionIndex: 6, winRate: 27 },
        { sessionIndex: 7, winRate: 30 },
        { sessionIndex: 8, winRate: 32 },
        { sessionIndex: 9, winRate: 34 },
        { sessionIndex: 10, winRate: 35 }
      ]
    },
    {
      id: 3,
      format: "Sit & Go / MTT Hybrids",
      category: "tournament",
      image: "/images/results/sit-and-go-results.jpg",
      metrics: [
        { 
          label: "ROI", 
          value: "10-30%", 
          isPositive: true 
        },
        { 
          label: "Volume", 
          value: "20-60/day", 
          isPositive: true 
        }
      ],
      info: "Sit & Go and hybrid formats are characterized by their fast blind structures and reduced number of players per table. An optimal push/fold strategy is crucial in the final stages.",
      graphData: [
        { sessionIndex: 1, winRate: 11 },
        { sessionIndex: 2, winRate: 13 },
        { sessionIndex: 3, winRate: 16 },
        { sessionIndex: 4, winRate: 18 },
        { sessionIndex: 5, winRate: 20 },
        { sessionIndex: 6, winRate: 22 },
        { sessionIndex: 7, winRate: 24 },
        { sessionIndex: 8, winRate: 25 },
        { sessionIndex: 9, winRate: 26 },
        { sessionIndex: 10, winRate: 27 }
      ]
    },
    {
      id: 4,
      format: "NL Hold'em 6-Max",
      category: "cash",
      image: "/images/results/6max-results.jpg",
      metrics: [
        { 
          label: "Win Rate", 
          value: "2-8bb/100",
          isPositive: true 
        },
        { 
          label: "VPIP", 
          value: "22-28%", 
          isPositive: true 
        }
      ],
      info: "The 6-max format offers more action with fewer players at the table. This format requires a more aggressive approach, wider ranges, and a good understanding of post-flop play.",
      graphData: [
        { sessionIndex: 1, winRate: 1.8 },
        { sessionIndex: 2, winRate: 2.7 },
        { sessionIndex: 3, winRate: 3.5 },
        { sessionIndex: 4, winRate: 4.2 },
        { sessionIndex: 5, winRate: 4.9 },
        { sessionIndex: 6, winRate: 5.5 },
        { sessionIndex: 7, winRate: 6.2 },
        { sessionIndex: 8, winRate: 6.7 },
        { sessionIndex: 9, winRate: 7.1 },
        { sessionIndex: 10, winRate: 7.5 }
      ]
    },
    {
      id: 5,
      format: "PLO Cash Games",
      category: "cash",
      image: "/images/results/plo-results.jpg",
      metrics: [
        { 
          label: "Win Rate", 
          value: "2-6bb/100", 
          isPositive: true 
        },
        { 
          label: "Variance", 
          value: "High", 
          isPositive: false 
        }
      ],
      info: "Pot-Limit Omaha is known for its high action and variance. Equity understanding is more complex than in Hold'em, with four cards in hand and more possible combinations.",
      graphData: [
        { sessionIndex: 1, winRate: 0.5 },
        { sessionIndex: 2, winRate: 1.2 },
        { sessionIndex: 3, winRate: 2.0 },
        { sessionIndex: 4, winRate: 2.7 },
        { sessionIndex: 5, winRate: 3.4 },
        { sessionIndex: 6, winRate: 4.0 },
        { sessionIndex: 7, winRate: 4.6 },
        { sessionIndex: 8, winRate: 5.1 },
        { sessionIndex: 9, winRate: 5.5 },
        { sessionIndex: 10, winRate: 5.8 }
      ]
    },
    {
      id: 6,
      format: "Spin & Go",
      category: "spin",
      image: "/images/results/spin-go-results.jpg",
      metrics: [
        { 
          label: "ROI", 
          value: "5-20%", 
          isPositive: true 
        },
        { 
          label: "Duration", 
          value: "5-10 min", 
          isPositive: true 
        }
      ],
      info: "Spin & Go are short 3-player tournaments with random prizes. This high-variance format requires excellent heads-up mastery and a strategy adapted to different prize pool sizes.",
      graphData: [
        { sessionIndex: 1, winRate: 2 },
        { sessionIndex: 2, winRate: 4 },
        { sessionIndex: 3, winRate: 7 },
        { sessionIndex: 4, winRate: 9 },
        { sessionIndex: 5, winRate: 11 },
        { sessionIndex: 6, winRate: 13 },
        { sessionIndex: 7, winRate: 14 },
        { sessionIndex: 8, winRate: 15 },
        { sessionIndex: 9, winRate: 17 },
        { sessionIndex: 10, winRate: 18 }
      ]
    }
  ];

  // Filter formats based on active category
  const filteredFormats = activeCategory === 'all' 
    ? pokerFormats 
    : pokerFormats.filter(format => format.category === activeCategory);

  const categories = [
    { id: "all", label: "All Formats" },
    { id: "cash", label: "Cash Games" },
    { id: "tournament", label: "Tournaments" },
    { id: "spin", label: "Spin & Go" }
  ];

  const handleCardFlip = (id: number) => {
    if (flippedCards.includes(id)) {
      setFlippedCards(flippedCards.filter(cardId => cardId !== id));
    } else {
      setFlippedCards([...flippedCards, id]);
    }
  };

  const handleExpandFormat = (id: number) => {
    setExpandedFormat(expandedFormat === id ? null : id);
  };

  // Function to get background color for categories
  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'cash': return 'from-poker-royal-700/80 to-poker-royal-900/80';
      case 'tournament': return 'from-chip-gold-600/80 to-amber-800/80';
      case 'spin': return 'from-emerald-600/80 to-emerald-800/80';
      default: return 'from-gray-700/80 to-gray-900/80';
    }
  };

  return (
    <section className="relative py-28" id="poker-formats">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#070a0c] to-[#040608]"></div>
      
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20"></div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-poker-royal-800/10 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-chip-gold-500/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-1.5 bg-gradient-to-r from-poker-royal-700/30 to-poker-royal-900/30 rounded-full mb-4 backdrop-blur-sm">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-chip-gold-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-chip-gold-500"></span>
            </span>
            <span className="text-sm text-gray-300">Game variety</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-montserrat text-white">
            Popular Poker <span className="text-transparent bg-clip-text bg-gradient-to-r from-chip-gold-400 to-chip-gold-600">Formats</span>
          </h2>
          
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover different poker formats and their strategic specificities
          </p>
        </motion.div>

        {/* Category tabs */}
        <div className="relative mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id as PokerCategory)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.05 * index }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  relative px-5 py-3 rounded-xl text-base font-medium transition-all
                  ${activeCategory === category.id 
                    ? 'text-white shadow-lg' 
                    : 'text-gray-400 hover:text-gray-200 bg-gradient-to-br from-gray-900/50 to-black/50 hover:from-gray-800/50 hover:to-black/50 backdrop-blur-sm border border-gray-800/30'
                  }
                `}
              >
                {activeCategory === category.id && (
                  <motion.div 
                    layoutId="activeFormatTab"
                    className={`absolute inset-0 bg-gradient-to-br ${
                      category.id === 'cash' 
                        ? 'from-poker-royal-700 to-poker-royal-900' 
                        : category.id === 'tournament' 
                          ? 'from-chip-gold-600 to-amber-800' 
                          : category.id === 'spin' 
                            ? 'from-emerald-600 to-emerald-800'
                            : 'from-gray-700 to-gray-900'
                    } rounded-xl z-0`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{category.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Format cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFormats.map((format, index) => (
            <motion.div
              key={format.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="relative group"
            >
              <div className={`
                absolute inset-0 bg-gradient-to-br ${getCategoryColor(format.category)} 
                rounded-2xl p-px overflow-hidden transition-all duration-300 z-0
                backdrop-blur-sm group-hover:scale-[1.02] group-hover:shadow-lg
              `}>
                {/* Inner card content with glass morphism */}
                <div className="absolute inset-0 m-[1px] rounded-2xl bg-gradient-to-br from-black/90 to-gray-900/90 z-0"></div>
              </div>
              
              {/* Card content */}
              <div className="relative p-6 z-10">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 font-montserrat">{format.format}</h3>
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-gray-800/50 to-gray-900/50 text-gray-300 border border-gray-800/30">
                      {format.category === 'cash' 
                        ? 'Cash Game' 
                        : format.category === 'tournament' 
                          ? 'Tournament'
                          : 'Spin & Go'
                      }
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleCardFlip(format.id)}
                    className={`
                      w-8 h-8 flex items-center justify-center rounded-full 
                      ${flippedCards.includes(format.id) 
                        ? 'bg-chip-gold-500 text-black' 
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                      }
                      transition-colors
                    `}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
                
                <AnimatePresence initial={false} mode="wait">
                  {flippedCards.includes(format.id) ? (
                    <motion.div
                      key="back"
                      initial={{ opacity: 0, rotateY: -90 }}
                      animate={{ opacity: 1, rotateY: 0 }}
                      exit={{ opacity: 0, rotateY: 90 }}
                      transition={{ duration: 0.4 }}
                      className="min-h-[200px] flex flex-col justify-between"
                    >
                      <p className="text-gray-300 italic mb-4">{format.info}</p>
                      
                      <div className="mt-auto">
                        <div className="h-[120px] mb-4">
                          <PokerGraph 
                            data={format.graphData} 
                            lineColor={
                              format.category === 'cash' 
                                ? '#3b82f6' 
                                : format.category === 'tournament' 
                                  ? '#f59e0b'
                                  : '#10b981'
                            } 
                          />
                        </div>
                        
                        <button
                          onClick={() => handleCardFlip(format.id)}
                          className="w-full py-2 px-4 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white text-sm rounded-lg flex items-center justify-center transition-colors"
                        >
                          <span>Show Metrics</span>
                          <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="front"
                      initial={{ opacity: 0, rotateY: 90 }}
                      animate={{ opacity: 1, rotateY: 0 }}
                      exit={{ opacity: 0, rotateY: -90 }}
                      transition={{ duration: 0.4 }}
                      className="min-h-[200px] flex flex-col justify-between"
                    >
                      <div className="relative overflow-hidden rounded-xl mb-4 aspect-video">
                        <div className="absolute inset-0 bg-gray-900/50 z-10 flex items-center justify-center">
                          <div className={`
                            text-4xl font-playfair font-bold
                            ${format.category === 'cash' 
                              ? 'text-poker-royal-500' 
                              : format.category === 'tournament' 
                                ? 'text-chip-gold-500'
                                : 'text-emerald-500'
                            }
                          `}>
                            {format.category === 'cash' 
                              ? '♠' 
                              : format.category === 'tournament' 
                                ? '♥'
                                : '♣'
                            }
                          </div>
                        </div>
                        <img 
                          src={format.image} 
                          alt={format.format} 
                          className="absolute inset-0 w-full h-full object-cover opacity-60"
                        />
                      </div>
                      
                      <div className="space-y-4 mt-auto">
                        <div className="grid grid-cols-2 gap-4">
                          {format.metrics.map((metric, idx) => (
                            <div 
                              key={idx} 
                              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-3 rounded-lg border border-gray-800/30"
                            >
                              <div className="text-gray-400 text-xs mb-1">{metric.label}</div>
                              <div className={`text-lg font-medium ${metric.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                                {metric.value}
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <button
                          onClick={() => handleCardFlip(format.id)}
                          className="w-full py-2 px-4 bg-gradient-to-r from-felt-800 to-felt-900 hover:from-felt-700 hover:to-felt-800 text-white text-sm rounded-lg flex items-center justify-center transition-colors"
                        >
                          <span>Learn More</span>
                          <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <a 
            href="#pricing" 
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-chip-gold-500 to-chip-gold-600 rounded-xl text-black font-medium shadow-lg hover:shadow-chip-gold-500/20 transform hover:-translate-y-1 transition-all group"
          >
            <span>Find a Coach for Your Format</span>
            <svg 
              className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
      
      {/* Bottom decorative edge */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>
    </section>
  );
} 