"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { KingIcon, QueenIcon, StrategyIcon } from "@/components/ui/ChessIcons";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-24" id="opening">
      {/* Background elements - Fixed positioning and z-index */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-20 right-[10%] w-72 h-72 bg-chess-blue-600/20 rounded-full filter blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 left-[5%] w-80 h-80 bg-chess-gold-500/15 rounded-full filter blur-3xl"></div>
        <div className="absolute top-40 left-[30%] w-64 h-64 bg-gradient-to-r from-chess-blue-600/10 to-chess-gold-600/10 rounded-full filter blur-2xl animate-float"></div>
      </div>
      
      {/* Main content - Improved z-index and spacing */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 max-w-xl"
          >
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-gray-800/80 text-gray-300 backdrop-blur-sm border border-gray-700">
              <KingIcon size={16} className="text-chess-gold-500 mr-2" />
              Masterful Chess Coaching Strategies
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Achieve <span className="gradient-text">Checkmate</span> Against Your <span className="relative">
                <span className="relative z-10">Chess Limits</span>
                <svg className="absolute bottom-0 left-0 w-full h-[0.2em] text-chess-gold-600/30" viewBox="0 0 200 8" preserveAspectRatio="none">
                  <path d="M0,0 C50,5 80,5 200,0" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              From pawn structure mastery to grandmaster endgames — our royal coaching develops your strategic thinking and tactical precision.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                href="/#training-camp" 
                className="chess-button flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-chess-blue-600 to-chess-blue-700 hover:from-chess-blue-500 hover:to-chess-blue-600 text-white rounded-lg font-medium shadow-lg transition-all duration-300 hover:shadow-chess-blue-500/30 hover:shadow-xl"
              >
                <QueenIcon size={20} />
                Dominate the Board
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-gray-800/50">
              <div className="aspect-video relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-chess-blue-900/30 to-chess-gold-900/30 z-10"></div>
                <Image
                  src="https://images.unsplash.com/photo-1529699211952-734e80c4d42b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                  alt="Chess strategy and tactics"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            
            {/* Floating elements - Fixed positioning and responsive sizing */}
            <div className="absolute -right-6 top-1/4 p-3 bg-[#1e1e1e] rounded-lg shadow-xl border border-gray-800 rotate-3 animate-float glass-effect z-20 transform-gpu">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-chess-blue-500 to-chess-gold-500 rounded-lg flex items-center justify-center text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-medium">Rating Growth</div>
                  <div className="text-gray-400 text-sm">+200 ELO avg.</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -left-6 bottom-1/4 p-3 bg-[#1e1e1e] rounded-lg shadow-xl border border-gray-800 -rotate-6 animate-float-delay glass-effect z-20 transform-gpu">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-chess-blue-500 to-chess-gold-500 rounded-lg flex items-center justify-center text-white">
                  <StrategyIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-white font-medium">Strategic Depth</div>
                  <div className="text-gray-400 text-sm">Advanced Tactics</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 