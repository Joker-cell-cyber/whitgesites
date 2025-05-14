"use client";

import { motion } from "framer-motion";

export default function ServicesHero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-24">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[#070a12] opacity-95"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-game-blue-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-game-green-500/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="block text-white">Nos Services</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-game-blue-500 to-game-green-500">
                de Farming Professionnel
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
              Des services de farming et de leveling de haute qualité pour tous vos jeux préférés. Notre équipe de joueurs professionnels est disponible 24/7 pour répondre à vos besoins.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#pricing"
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-game-blue-600 to-game-green-600 text-white font-medium button-glow transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                Voir les Tarifs
              </a>
              <a
                href="/contact"
                className="px-8 py-3 rounded-lg bg-[#141a2c] border border-gray-700 text-white font-medium hover:bg-[#1c2438] transition-all"
              >
                Nous Contacter
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-14 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#070a12] to-transparent z-10 h-14 bottom-0 top-auto"></div>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
              {['World of Warcraft', 'Diablo 4', 'GTA Online', 'Final Fantasy XIV', 'Elder Scrolls Online', 'Runescape'].map((game, index) => (
                <div
                  key={index}
                  className="px-3 py-2 bg-[#141a2c] rounded-lg border border-gray-800 text-center text-sm md:text-base text-gray-300"
                >
                  {game}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 