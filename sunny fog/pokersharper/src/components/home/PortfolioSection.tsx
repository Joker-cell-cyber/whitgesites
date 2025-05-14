"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
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

  return (
    <section className="py-20 bg-[#0a0e10] felt-texture" id="poker-formats">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-montserrat">
              Popular Poker <span className="gradient-text">Formats</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Discover different poker formats and their strategic specificities
            </p>
          </motion.div>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? "bg-chip-gold-500 text-felt-900"
                  : "bg-felt-800 text-gray-300 hover:bg-felt-700"
              }`}
              onClick={() => setActiveCategory(category.id as PokerCategory)}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Results grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFormats.map((pokerFormat) => (
            <div key={pokerFormat.id} className="flex flex-col gap-6">
              <InfoCard
                name={pokerFormat.format}
                image={pokerFormat.image}
                info={pokerFormat.info}
                format={pokerFormat.format}
                metrics={pokerFormat.metrics}
                isFlipped={flippedCards.includes(pokerFormat.id)}
                onFlip={() => handleCardFlip(pokerFormat.id)}
                className="h-full"
              />
              
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ 
                  opacity: expandedFormat === pokerFormat.id ? 1 : 0,
                  height: expandedFormat === pokerFormat.id ? "auto" : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                {expandedFormat === pokerFormat.id && (
                  <div className="bg-felt-900/30 p-4 rounded-lg">
                    <h3 className="text-lg font-medium mb-2 font-montserrat">Theoretical Performance Curve</h3>
                    <p className="text-sm text-gray-400 mb-3">This graph illustrates a theoretical learning curve for this game format, not actual player results.</p>
                    <PokerGraph
                      data={pokerFormat.graphData}
                      height={200}
                      width={400}
                      title=""
                      formatValue={(value) => 
                        pokerFormat.category === "cash" 
                          ? `${value > 0 ? '+' : ''}${value.toFixed(1)}bb/100` 
                          : `${value > 0 ? '+' : ''}${value.toFixed(1)}% ROI`
                      }
                      className=""
                    />
                  </div>
                )}
              </motion.div>
              
              <button
                onClick={() => handleExpandFormat(pokerFormat.id)}
                className="text-sm text-center text-chip-gold-400 hover:text-chip-gold-300 transition-colors mt-2"
              >
                {expandedFormat === pokerFormat.id ? "Hide Graph" : "View Graph"}
              </button>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <a
            href="#pricing"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-felt-700 to-felt-900 hover:from-felt-600 hover:to-felt-800 text-white rounded-lg font-medium button-glow"
          >
            <span>Explore our Training Programs</span>
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
} 