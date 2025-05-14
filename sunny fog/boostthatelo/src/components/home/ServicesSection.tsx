"use client";

import { motion } from "framer-motion";

export default function ServicesSection() {
  const services = [
    {
      id: 1,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Ranked Boosting",
      description: "Our pro boosters will take control of your account and rank it up efficiently in any competitive game.",
      badges: ["Fast", "Secure", "Guaranteed"],
      color: "blue"
    },
    {
      id: 2,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: "Duo Boosting",
      description: "Play alongside our professional boosters and learn while climbing to your desired rank.",
      badges: ["Educational", "Faster Wins", "Skill Building"],
      color: "purple"
    },
    {
      id: 3,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "Placement Matches",
      description: "Maximize your placement results with our expert players handling your initial qualification matches.",
      badges: ["Optimal Start", "Better MMR", "Time Saving"],
      color: "cyan"
    },
    {
      id: 4,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      ),
      title: "Premium Support",
      description: "Direct communication with your booster via Discord for updates, strategy discussions, and real-time coordination.",
      badges: ["Discord Chat", "Real-time", "Screen Sharing"],
      color: "pink"
    }
  ];

  const gameSpecificServices = [
    {
      game: "League of Legends",
      icon: (
        <svg viewBox="0 0 32 32" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 3L4 9V23L16 29L28 23V9L16 3Z" fill="#C79E57" />
          <path d="M16 6L7 10.5V21.5L16 26L25 21.5V10.5L16 6Z" fill="#0A1428" />
          <path d="M16 9L10 12.5V19.5L16 23L22 19.5V12.5L16 9Z" fill="#C79E57" />
          <path d="M16 12L13 13.5V18.5L16 20L19 18.5V13.5L16 12Z" fill="#0A1428" />
        </svg>
      ),
      services: ["Ranked Solo/Duo", "Flex Queue", "Clash Team", "Champion Mastery"]
    },
    {
      game: "Valorant",
      icon: (
        <svg viewBox="0 0 32 32" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M27 5H17L5 27H15L27 5Z" fill="#FD4556" />
          <path d="M20 5H17L5 27H8L20 5Z" fill="#FD4556" />
        </svg>
      ),
      services: ["Ranked Competitive", "Premium Agents", "Placements", "Act Rank"]
    },
    {
      game: "CS2",
      icon: (
        <svg viewBox="0 0 32 32" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 3C8.8 3 3 8.8 3 16C3 23.2 8.8 29 16 29C23.2 29 29 23.2 29 16C29 8.8 23.2 3 16 3Z" fill="#F7A800" />
          <path d="M16 7C11.03 7 7 11.03 7 16C7 20.97 11.03 25 16 25C20.97 25 25 20.97 25 16C25 11.03 20.97 7 16 7ZM12 19V13L19 16L12 19Z" fill="#000000" />
        </svg>
      ),
      services: ["Competitive MM", "Faceit Levels", "Premier Mode", "Specific Maps"]
    },
    {
      game: "Overwatch 2",
      icon: (
        <svg viewBox="0 0 32 32" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="13" fill="#F57D25" />
          <path d="M16 6C10.48 6 6 10.48 6 16C6 21.52 10.48 26 16 26C21.52 26 26 21.52 26 16C26 10.48 21.52 6 16 6ZM12 21L8 16L12 11H20L24 16L20 21H12Z" fill="white" />
          <path d="M20 11H12L8 16L12 21H20L24 16L20 11ZM16 19C14.34 19 13 17.66 13 16C13 14.34 14.34 13 16 13C17.66 13 19 14.34 19 16C19 17.66 17.66 19 16 19Z" fill="#43484C" />
        </svg>
      ),
      services: ["Role Queue", "Open Queue", "Specific Heroes", "Placement Matches"]
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden" id="services">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-b from-blue-600/5 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-t from-purple-600/5 to-transparent"></div>
        
        {/* Game-inspired polygon shapes */}
        <div className="absolute top-[20%] right-[5%] w-64 h-64 border border-blue-500/10 rotate-45 opacity-40"></div>
        <div className="absolute bottom-[10%] left-[5%] w-48 h-48 border border-purple-500/10 rotate-12 opacity-40"></div>
        
        {/* Circuit-like patterns */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" viewBox="0 0 100 100">
          <pattern id="circuit-pattern" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="scale(2) rotate(0)">
            <path d="M10-5-5 10M15 0 0 15M0-5-5 0" stroke="#4F46E5" strokeWidth="0.5"></path>
          </pattern>
          <rect width="100%" height="100%" fill="url(#circuit-pattern)"></rect>
        </svg>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Elite <span className="gradient-text">Boosting</span> Services
            </h2>
            <p className="text-gray-300 text-lg">
              Our professional boosters provide a variety of services to help you reach your gaming goals
            </p>
          </motion.div>
        </div>

        {/* Main Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-[#0D0D14] rounded-xl border border-gray-800 p-6 h-full transition-all duration-300
                             hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 relative overflow-hidden">
                
                {/* Service background glow */}
                <div className={`absolute -top-20 -right-20 w-40 h-40 bg-${service.color}-500/10 rounded-full filter blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                {/* Rank emblem/icon */}
                <div className={`w-14 h-14 rounded-lg bg-gradient-to-br from-${service.color}-500/20 to-${service.color}-500/10 flex items-center justify-center mb-5 border border-${service.color}-500/30 group-hover:scale-110 transition-transform duration-300`}>
                  <div className={`text-${service.color}-400`}>
                {service.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
                <p className="text-gray-400 mb-5 leading-relaxed">{service.description}</p>
                
                {/* Service badges */}
                <div className="flex flex-wrap gap-2 mb-2">
                  {service.badges.map((badge, i) => (
                    <span 
                      key={i} 
                      className={`inline-block px-2 py-1 rounded-md text-xs font-medium bg-${service.color}-500/10 text-${service.color}-400 border border-${service.color}-500/20`}
                    >
                      {badge}
                    </span>
                  ))}
                </div>
                
                {/* Rank progression/experience bar */}
                <div className="mt-5 pt-4 border-t border-gray-800">
                  <div className={`h-1.5 w-full rounded-full bg-gray-800 overflow-hidden`}>
                    <div 
                      className={`h-full rounded-full bg-gradient-to-r from-${service.color}-500 to-${service.color}-400 w-[85%] group-hover:w-full transition-all duration-1000`}
                    ></div>
                  </div>
                  <div className="mt-2 text-right text-xs text-gray-500">Booster Expertise</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Game-Specific Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-24"
        >
          <h3 className="text-2xl font-bold text-center mb-10">
            Game-Specific <span className="gradient-text">Boost Options</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gameSpecificServices.map((game, index) => (
              <motion.div
                key={game.game}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-[#0D0D14] rounded-xl border border-gray-800 p-6 hover:border-purple-500/30 transition-colors duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-800/80 flex items-center justify-center">
                    {game.icon}
                  </div>
                  <h4 className="text-lg font-bold">{game.game}</h4>
                </div>
              
              <ul className="space-y-2">
                  {game.services.map((service, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-300">
                      <svg className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                      <span>{service}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
          </div>
        </motion.div>
        
        {/* Trophy/Achievement Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl overflow-hidden border border-gray-800"
        >
          <div className="grid grid-cols-1 lg:grid-cols-5">
            <div className="lg:col-span-3 p-8 lg:p-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">Elite Player Network</h3>
              </div>
              
              <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                Our network consists of verified top-tier players with at least 5,000+ hours in their respective games. We carefully select our boosters based on their skill level, consistency, and professional approach to ensure exceptional results.
              </p>
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">5,000+</div>
                  <div className="text-gray-400 text-sm">Hours Per Booster</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">Top 1%</div>
                  <div className="text-gray-400 text-sm">Player Skill Level</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">150+</div>
                  <div className="text-gray-400 text-sm">Expert Players</div>
                </div>
              </div>
              
              <a 
                href="#pricing" 
                className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
              >
                <span>View pricing details</span>
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
            </div>
            
            <div className="lg:col-span-2 hidden lg:block relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
              <img 
                src="https://images.unsplash.com/photo-1560253023-3ec5d502959f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="Elite Gaming Team" 
                className="w-full h-full object-cover object-center opacity-90"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 