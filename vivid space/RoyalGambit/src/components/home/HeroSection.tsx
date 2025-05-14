"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { KingIcon, QueenIcon, StrategyIcon } from "@/components/ui/ChessIcons";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-24" id="opening">
      {/* Background elements - Redesigned with more dramatic shapes */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-[#0a0e2a]/40 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-[#170a28]/30 via-transparent to-transparent"></div>
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-chess-purple-900/10 mix-blend-screen filter blur-[100px]"></div>
        <div className="absolute -bottom-40 -left-20 w-[30rem] h-[30rem] rounded-full bg-chess-gold-900/10 mix-blend-screen filter blur-[120px]"></div>
        
        {/* Decorative lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-chess-gold-500 to-transparent"></div>
          <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-chess-purple-500 to-transparent"></div>
          <div className="absolute left-1/3 top-0 w-px h-full bg-gradient-to-b from-transparent via-chess-gold-500 to-transparent"></div>
          <div className="absolute left-2/3 top-0 w-px h-full bg-gradient-to-b from-transparent via-chess-purple-500 to-transparent"></div>
        </div>
      </div>
      
      {/* Main content - Redesigned layout */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-8 lg:col-span-5"
          >
            <div className="inline-flex items-center rounded-full pl-1 pr-4 py-1 bg-white/5 backdrop-blur-xl border border-white/10 shadow-inner">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-chess-gold-500 mr-2">
                <KingIcon size={12} className="text-black" />
              </span>
              <span className="text-xs font-medium tracking-wide text-gray-300">Masterful Chess Coaching Strategies</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-none">
              Achieve 
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-chess-gold-400 via-white to-chess-purple-400">Checkmate</span>
              <span className="block mt-2">Against Your <span className="relative italic">
                Chess Limits
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 10C100 2 150 2 298 10" stroke="url(#paint0_linear)" strokeWidth="3" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="paint0_linear" x1="2" y1="10" x2="298" y2="10" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#F0B54F" stopOpacity="0"/>
                      <stop offset="0.5" stopColor="#F0B54F"/>
                      <stop offset="1" stopColor="#F0B54F" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                </svg>
              </span></span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-xl">
              From pawn structure mastery to grandmaster endgames — our royal coaching develops your strategic thinking and tactical precision.
            </p>
            
            <div className="pt-4">
              <Link 
                href="/#training-camp" 
                className="group relative inline-flex items-center px-8 py-4 overflow-hidden rounded-full bg-chess-purple-900 text-white transition-all duration-500 hover:bg-chess-purple-800"
              >
                <span className="absolute left-0 top-0 h-full w-0 bg-gradient-to-r from-chess-gold-500 to-chess-gold-400 transition-all duration-500 group-hover:w-full"></span>
                <span className="relative flex items-center gap-2">
                  <QueenIcon size={20} />
                  <span className="font-medium">Dominate the Board</span>
                </span>
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="relative lg:col-span-7"
          >
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden transform perspective-1000 rotate-1">
              <div className="aspect-[16/9] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-chess-purple-900/80 to-chess-gold-900/40 z-10 mix-blend-overlay"></div>
                <Image
                  src="https://images.unsplash.com/photo-1529699211952-734e80c4d42b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                  alt="Chess strategy and tactics"
                  fill
                  className="object-cover"
                  priority
                />
                
                {/* Image overlay patterns */}
                <div className="absolute inset-0 z-20 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMCAxLjEwNS0uODk1IDItMiAycy0yLS44OTUtMi0yIC44OTUtMiAyLTIgMiAuODk1IDIgMnptMC0xOGMwIDEuMTA1LS44OTUgMi0yIDJzLTItLjg5NS0yLTIgLjg5NS0yIDItMiAyIC44OTUgMiAyem0tMTggMThjMCAxLjEwNS0uODk1IDItMiAycy0yLS44OTUtMi0yIC44OTUtMiAyLTIgMiAuODk1IDIgMnptMC0xOGMwIDEuMTA1LS44OTUgMi0yIDJzLTItLjg5NS0yLTIgLjg5NS0yIDItMiAyIC44OTUgMiAyem05IDl6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
              </div>
            </div>
            
            {/* Floating elements - Redesigned with glass effect */}
            <div className="absolute -right-2 top-1/4 p-3 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-2xl transform-gpu -rotate-2 hover:rotate-0 transition-transform duration-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-chess-purple-500 to-chess-gold-500 rounded-xl flex items-center justify-center text-white shadow-inner shadow-white/10">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-semibold">Rating Growth</div>
                  <div className="text-chess-gold-400 text-sm">+200 ELO avg.</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -left-4 bottom-1/4 p-3 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-2xl transform-gpu rotate-2 hover:rotate-0 transition-transform duration-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-chess-gold-500 to-chess-purple-500 rounded-xl flex items-center justify-center text-white shadow-inner shadow-white/10">
                  <StrategyIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-white font-semibold">Strategic Depth</div>
                  <div className="text-chess-gold-400 text-sm">Advanced Tactics</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 