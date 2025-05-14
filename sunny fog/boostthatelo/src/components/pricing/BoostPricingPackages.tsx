"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type GameType = 'lol' | 'valorant' | 'tft' | 'overwatch' | 'cs2';

interface PricingPlan {
  name: string;
  price: number;
  description: string;
  features: string[];
  delivery: string;
  popular?: boolean;
  complexity?: string;
}

export default function BoostPricingPackages() {
  const [selectedGame, setSelectedGame] = useState<GameType>('lol');

  const handleGameChange = (game: GameType) => {
    setSelectedGame(game);
  };

  const AnimatedPricingCard = ({ plan, index }: { plan: PricingPlan, index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className={`bg-[#1a1a1a] rounded-2xl overflow-hidden border border-gray-800 transition-all hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-900/20 ${plan.popular ? 'ring-2 ring-blue-500 relative' : ''}`}
    >
      {plan.popular && (
        <div className="absolute top-3 right-3">
          <span className="bg-blue-600 text-white text-xs font-bold py-1 px-2 rounded-full">
            POPULAR
          </span>
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
        <div className="flex items-end mb-4">
          <span className="text-3xl font-bold">${plan.price.toFixed(2)}</span>
        </div>
        <p className="text-gray-400 mb-4">{plan.description}</p>
        
        <div className="space-y-3 mb-6">
          {plan.features.map((feature: string, i: number) => (
            <div key={i} className="flex items-start">
              <svg className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-300">{feature}</span>
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-between mb-4 text-sm">
          <span className="text-gray-400">Estimated delivery:</span>
          <span className="font-medium">{plan.delivery}</span>
        </div>
        
        <Link 
          href={`/checkout?package=${encodeURIComponent(plan.name)}&price=${plan.price}&game=${encodeURIComponent(selectedGame)}`}
          className="block w-full py-3 px-4 text-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all transform hover:scale-[1.02]"
        >
          Get Started
        </Link>
      </div>
    </motion.div>
  );

  // Game selector tabs
  const GameTabs = () => (
    <div className="flex justify-center mb-10 overflow-x-auto pb-2">
      <div className="flex bg-[#111827]/50 rounded-lg p-1 border border-gray-800">
        <button
          onClick={() => handleGameChange('lol')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${selectedGame === 'lol' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
        >
          League of Legends
        </button>
        <button
          onClick={() => handleGameChange('valorant')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${selectedGame === 'valorant' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
        >
          Valorant
        </button>
        <button
          onClick={() => handleGameChange('cs2')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${selectedGame === 'cs2' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
        >
          CS2
        </button>
        <button
          onClick={() => handleGameChange('overwatch')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${selectedGame === 'overwatch' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
        >
          Overwatch 2
        </button>
        <button
          onClick={() => handleGameChange('tft')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${selectedGame === 'tft' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
        >
          TFT
        </button>
      </div>
    </div>
  );

  const getGameSpecificPlans = () => {
    if (selectedGame === 'lol') {
      return [
        {
          name: "Starter Boost",
          price: 9.99,
          complexity: "Basic",
          description: "Perfect for beginners looking to escape low ELO",
          features: [
            "Iron to Bronze boosting",
            "Average completion: 1-3 days",
            "Played by Diamond players",
            "Regular updates"
          ],
          delivery: "1-3 days"
        },
        {
          name: "Bronze Pack",
          price: 19.50,
          complexity: "Basic+",
          description: "Break out of Bronze and progress to Silver",
          features: [
            "Bronze to Silver boosting",
            "Average completion: 3-5 days",
            "Played by Master players",
            "24/7 support"
          ],
          delivery: "3-5 days"
        },
        {
          name: "Silver Pack",
          price: 29.90,
          complexity: "Intermediate",
          description: "Level up from Silver to Gold with ease",
          features: [
            "Silver to Gold boosting",
            "Average completion: 4-6 days",
            "Played by Grandmaster players",
            "Secure account handling"
          ],
          delivery: "4-6 days"
        },
        {
          name: "Gold Pack",
          price: 39.99,
          complexity: "Standard+",
          description: "Achieve Platinum rank with our expert players",
          features: [
            "Gold to Platinum boosting",
            "Average completion: 5-7 days",
            "Played by Grandmaster players",
            "Role & champion preference"
          ],
          delivery: "5-7 days"
        },
        {
          name: "Platinum Pack",
          price: 49.90,
          complexity: "Advanced",
          description: "Break into Emerald with expert gameplay",
          features: [
            "Platinum to Emerald boosting",
            "Average completion: 6-9 days",
            "Played by Challenger players",
            "Live progress updates"
          ],
          delivery: "6-9 days"
        },
        {
          name: "Diamond Pack",
          price: 59.50,
          complexity: "Premium",
          description: "Reach Diamond with our elite players",
          features: [
            "Emerald to Diamond boosting",
            "Average completion: 7-10 days",
            "Played by Pro players",
            "Game-specific strategies"
          ],
          delivery: "7-10 days"
        },
        {
          name: "Elite Pack",
          price: 69.99,
          complexity: "Premium+",
          description: "Elite boosting to Master tier",
          features: [
            "Diamond to Master boosting",
            "Average completion: 8-12 days",
            "Played by Pro players",
            "Priority service"
          ],
          delivery: "8-12 days"
        },
        {
          name: "Champion Pack",
          price: 79.90,
          complexity: "Expert",
          description: "Grandmaster-level boosting for dedicated gamers",
          features: [
            "Master to Grandmaster boosting",
            "Average completion: 9-13 days",
            "Played by Championship players",
            "Specialized coaching included"
          ],
          delivery: "9-13 days"
        },
        {
          name: "Pro Pack",
          price: 89.50,
          complexity: "Expert+",
          description: "Reach the very top ranks with our best boosters",
          features: [
            "Grandmaster to Challenger boosting",
            "Average completion: 10-14 days",
            "Played by Professional players",
            "Custom boosting plan"
          ],
          delivery: "10-14 days"
        },
        {
          name: "Master Pack",
          price: 99.99,
          complexity: "Ultimate",
          description: "Ultimate boosting package for serious players",
          features: [
            "Any rank to Challenger boosting",
            "Average completion: 14-21 days",
            "Played by Professional players",
            "VIP support & coaching"
          ],
          delivery: "14-21 days"
        },
        {
          name: "Grandmaster Pack",
          price: 109.90,
          complexity: "Legendary",
          description: "Comprehensive boosting for maximum rank gains",
          features: [
            "Complete rank transformation",
            "Average completion: 14-28 days",
            "Played by Top 100 players",
            "Custom strategies & coaching"
          ],
          delivery: "14-28 days"
        },
        {
          name: "Ultimate Pack",
          price: 119.50,
          complexity: "Mythic",
          description: "Our ultimate boosting solution for elite gamers",
          features: [
            "Full account optimization",
            "Average completion: 21-30 days",
            "Played by Top 50 players",
            "Full account transformation"
          ],
          delivery: "21-30 days",
          popular: true
        }
      ];
    } else if (selectedGame === 'valorant') {
      return [
        {
          name: "Starter Boost",
          price: 9.99,
          complexity: "Basic",
          description: "Escape Iron and reach Bronze",
          features: [
            "Iron to Bronze boosting", 
            "Average completion: 1-2 days",
            "Played by Diamond players",
            "Regular updates"
          ],
          delivery: "1-2 days"
        },
        {
          name: "Bronze Pack",
          price: 19.50,
          complexity: "Basic+",
          description: "Get out of Bronze and into Silver",
          features: [
            "Bronze to Silver boosting", 
            "Average completion: 2-4 days",
            "Played by Ascendant players",
            "24/7 support"
          ],
          delivery: "2-4 days"
        },
        {
          name: "Silver Pack",
          price: 29.90,
          complexity: "Standard",
          description: "Rank up from Silver to Gold with ease",
          features: [
            "Silver to Gold boosting",
            "Average completion: 3-5 days", 
            "Played by Immortal players",
            "Secure account handling"
          ],
          delivery: "3-5 days"
        },
        {
          name: "Gold Pack",
          price: 39.99,
          complexity: "Standard+",
          description: "Boost from Gold to Platinum rank",
          features: [
            "Gold to Platinum boosting",
            "Average completion: 4-7 days", 
            "Played by Immortal players",
            "Agent preference"
          ],
          delivery: "4-7 days"
        },
        {
          name: "Platinum Pack",
          price: 49.90,
          complexity: "Advanced",
          description: "Reach Diamond with professional players",
          features: [
            "Platinum to Diamond boosting",
            "Average completion: 5-8 days", 
            "Played by Radiant players",
            "Live progress updates"
          ],
          delivery: "5-8 days",
          popular: true
        },
        {
          name: "Diamond Pack",
          price: 59.50,
          complexity: "Premium",
          description: "Break into Ascendant with our elite boosters",
          features: [
            "Diamond to Ascendant boosting",
            "Average completion: 6-10 days", 
            "Played by Pro players",
            "Game-specific strategies"
          ],
          delivery: "6-10 days"
        },
        {
          name: "Elite Pack",
          price: 69.99,
          complexity: "Premium+",
          description: "Reach Immortal with our professional team",
          features: [
            "Ascendant to Immortal boosting",
            "Average completion: 7-12 days", 
            "Played by Pro players",
            "Priority service"
          ],
          delivery: "7-12 days"
        },
        {
          name: "Radiant Pack",
          price: 99.99,
          complexity: "Ultimate",
          description: "Ultimate boosting to Radiant rank",
          features: [
            "Immortal to Radiant boosting",
            "Customized timeline", 
            "Played by Top Radiant players",
            "VIP support & coaching"
          ],
          delivery: "10-15 days"
        }
      ];
    } else if (selectedGame === 'cs2') {
      return [
        {
          name: "Starter Boost",
          price: 9.99,
          description: "Silver boosting for beginners",
          features: [
            "Silver 1-4 boosting",
            "Average completion: 1-2 days",
            "Played by Gold Nova Masters",
            "Regular updates"
          ],
          delivery: "1-2 days"
        },
        {
          name: "Nova Pack",
          price: 19.50,
          description: "Reach Gold Nova ranks",
          features: [
            "Silver Elite to Gold Nova 3",
            "Average completion: 2-4 days",
            "Played by MG2 players",
            "24/7 support"
          ],
          delivery: "2-4 days"
        },
        {
          name: "Master Pack",
          price: 39.99,
          description: "Boost to Master Guardian ranks",
          features: [
            "Gold Nova Master to MG2",
            "Average completion: 4-6 days",
            "Played by DMG players",
            "Secure account handling"
          ],
          delivery: "4-6 days",
          popular: true
        },
        {
          name: "Eagle Pack",
          price: 59.50,
          description: "Reach the prestigious Eagle ranks",
          features: [
            "DMG to LE/LEM",
            "Average completion: 5-8 days",
            "Played by Supreme players",
            "Weapon preference"
          ],
          delivery: "5-8 days"
        },
        {
          name: "Global Pack",
          price: 89.50,
          description: "Reach Global Elite with our pros",
          features: [
            "Supreme to Global Elite",
            "Average completion: 7-10 days",
            "Played by professional players",
            "VIP support"
          ],
          delivery: "7-10 days"
        }
      ];
    } else if (selectedGame === 'overwatch') {
      return [
        {
          name: "Bronze Boost",
          price: 9.99,
          description: "Escape Bronze and reach Silver",
          features: [
            "Bronze to Silver boosting",
            "Average completion: 1-3 days",
            "Played by Platinum players",
            "Regular updates"
          ],
          delivery: "1-3 days"
        },
        {
          name: "Silver Pack",
          price: 19.50,
          description: "Climb from Silver to Gold",
          features: [
            "Silver to Gold boosting",
            "Average completion: 2-4 days",
            "Played by Diamond players",
            "24/7 support"
          ],
          delivery: "2-4 days"
        },
        {
          name: "Gold Pack",
          price: 29.90,
          description: "Reach Platinum with our boosters",
          features: [
            "Gold to Platinum boosting",
            "Average completion: 3-5 days",
            "Played by Master players",
            "Hero preference"
          ],
          delivery: "3-5 days"
        },
        {
          name: "Platinum Pack",
          price: 49.90,
          description: "Break into Diamond ranks",
          features: [
            "Platinum to Diamond boosting",
            "Average completion: 4-7 days",
            "Played by Grandmaster players",
            "Role preference"
          ],
          delivery: "4-7 days",
          popular: true
        },
        {
          name: "Diamond Pack",
          price: 69.99,
          description: "Reach Master with our elite team",
          features: [
            "Diamond to Master boosting",
            "Average completion: 5-9 days",
            "Played by Top 500 players",
            "Priority service"
          ],
          delivery: "5-9 days"
        },
        {
          name: "Master Pack",
          price: 99.99,
          description: "Reach Grandmaster and beyond",
          features: [
            "Master to Grandmaster boosting",
            "Average completion: 7-12 days",
            "Played by professional players",
            "VIP coaching included"
          ],
          delivery: "7-12 days"
        }
      ];
    } else {
      // TFT
      return [
        {
          name: "Iron Boost",
          price: 9.99,
          description: "Climb from Iron to Bronze",
          features: [
            "Iron to Bronze boosting",
            "Average completion: 1-2 days",
            "Played by Gold players",
            "Regular updates"
          ],
          delivery: "1-2 days"
        },
        {
          name: "Bronze Pack",
          price: 19.50,
          description: "Get out of Bronze into Silver",
          features: [
            "Bronze to Silver boosting",
            "Average completion: 2-3 days",
            "Played by Platinum players",
            "24/7 support"
          ],
          delivery: "2-3 days"
        },
        {
          name: "Silver Pack",
          price: 29.90,
          description: "Climb to Gold with our team",
          features: [
            "Silver to Gold boosting",
            "Average completion: 2-4 days",
            "Played by Diamond players",
            "Comp preference"
          ],
          delivery: "2-4 days"
        },
        {
          name: "Gold Pack",
          price: 39.99,
          description: "Reach Platinum ranks",
          features: [
            "Gold to Platinum boosting",
            "Average completion: 3-5 days",
            "Played by Master players",
            "Secure account handling"
          ],
          delivery: "3-5 days"
        },
        {
          name: "Platinum Pack",
          price: 59.50,
          description: "Break into Diamond with our experts",
          features: [
            "Platinum to Diamond boosting",
            "Average completion: 4-6 days",
            "Played by Grandmaster players",
            "Priority service"
          ],
          delivery: "4-6 days",
          popular: true
        },
        {
          name: "Master Pack",
          price: 89.50,
          description: "Reach the highest TFT ranks",
          features: [
            "Diamond to Master+ boosting",
            "Average completion: 5-8 days",
            "Played by Challenger players",
            "VIP support & coaching"
          ],
          delivery: "5-8 days"
        }
      ];
    }
  };

  const plans = getGameSpecificPlans();

  return (
    <div>
      <GameTabs />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {plans.map((plan, index) => (
          <AnimatedPricingCard 
            key={plan.name} 
            plan={plan}
            index={index}
          />
        ))}
      </div>
    </div>
  );
} 