"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ResourceIcon, BishopIcon, KnightIcon, RookIcon, KingIcon, QueenIcon, PawnIcon } from "@/components/ui/ChessIcons";
import ChessPuzzle from "@/components/ui/ChessPuzzle";
import Link from "next/link";
import Image from "next/image";

const classicGames = [
  {
    title: "The Immortal Game",
    players: "Adolf Anderssen vs Lionel Kieseritzky",
    year: 1851,
    opening: "King's Gambit Accepted",
    description: "One of the most famous chess games ever played, featuring brilliant sacrifices and an elegant checkmate.",
    pgn: "1.e4 e5 2.f4 exf4 3.Bc4 Qh4+ 4.Kf1 b5 5.Bxb5 Nf6 6.Nf3 Qh6 7.d3 Nh5 8.Nh4 Qg5 9.Nf5 c6 10.g4 Nf6 11.Rg1 cxb5 12.h4 Qg6 13.h5 Qg5 14.Qf3 Ng8 15.Bxf4 Qf6 16.Nc3 Bc5 17.Nd5 Qxb2 18.Bd6 Bxg1 19.e5 Qxa1+ 20.Ke2 Na6 21.Nxg7+ Kd8 22.Qf6+ Nxf6 23.Be7#",
    image: "https://images.unsplash.com/photo-1637779714216-cfde865930c4"
  },
  {
    title: "The Opera Game",
    players: "Paul Morphy vs Duke Karl",
    year: 1858,
    opening: "Philidor Defense",
    description: "A brilliant demonstration of development and open lines leading to a devastating attack.",
    pgn: "1.e4 e5 2.Nf3 d6 3.d4 Bg4 4.dxe5 Bxf3 5.Qxf3 dxe5 6.Bc4 Nf6 7.Qb3 Qe7 8.Nc3 c6 9.Bg5 b5 10.Nxb5 cxb5 11.Bxb5+ Nbd7 12.O-O-O Rd8 13.Rxd7 Rxd7 14.Rd1 Qe6 15.Bxd7+ Nxd7 16.Qb8+ Nxb8 17.Rd8#",
    image: "https://images.unsplash.com/photo-1604948501466-e484552e8dd9"
  },
  {
    title: "Game of the Century",
    players: "Donald Byrne vs Bobby Fischer",
    year: 1956,
    opening: "Grünfeld Defense",
    description: "13-year-old Bobby Fischer's stunning queen sacrifice and brilliant combinational play.",
    pgn: "1.Nf3 Nf6 2.c4 g6 3.Nc3 Bg7 4.d4 O-O 5.Bf4 d5 6.Qb3 dxc4 7.Qxc4 c6 8.e4 Nbd7 9.Rd1 Nb6 10.Qc5 Bg4 11.Bg5 Na4 12.Qa3 Nxc3 13.bxc3 Nxe4 14.Bxe7 Qb6 15.Bc4 Nxc3 16.Bc5 Rfe8+ 17.Kf1 Be6 18.Bxb6 Bxc4+ 19.Kg1 Ne2+ 20.Kf1 Nxd4+ 21.Kg1 Ne2+ 22.Kf1 Nc3+ 23.Kg1 axb6 24.Qb4 Ra4 25.Qxb6 Nxd1 26.h3 Rxa2 27.Kh2 Nxf2 28.Re1 Rxe1 29.Qd8+ Bf8 30.Nxe1 Bd5 31.Nf3 Ne4 32.Qb8 b5 33.h4 h5 34.Ne5 Kg7 35.Kg1 Bc5+ 36.Kf1 Ng3+ 37.Ke1 Bb4+ 38.Kd1 Bb3+ 39.Kc1 Ne2+ 40.Kb1 Nc3+ 41.Kc1 Rc2#",
    image: "https://images.unsplash.com/photo-1560174879-672e66c53f2b"
  }
];

const chessBooks = [
  {
    title: "My System",
    author: "Aron Nimzowitsch",
    category: "Strategy",
    description: "A foundational work on positional chess and the hypermodern school of chess thought.",
    icon: <KingIcon />
  },
  {
    title: "The Art of Attack in Chess",
    author: "Vladimir Vukovic",
    category: "Tactics",
    description: "Classic guide to attacking chess and sacrificial combinations.",
    icon: <QueenIcon />
  },
  {
    title: "Dvoretsky's Endgame Manual",
    author: "Mark Dvoretsky",
    category: "Endgame",
    description: "Comprehensive reference for endgame theory and practical techniques.",
    icon: <RookIcon />
  },
  {
    title: "Chess Fundamentals",
    author: "José Raúl Capablanca",
    category: "Fundamentals",
    description: "Timeless instruction from one of the greatest chess players in history.",
    icon: <BishopIcon />
  },
  {
    title: "Zurich International Chess Tournament, 1953",
    author: "David Bronstein",
    category: "Tournament",
    description: "Annotated collection of games from one of history's greatest tournaments.",
    icon: <KnightIcon />
  },
  {
    title: "Logical Chess: Move by Move",
    author: "Irving Chernev",
    category: "Instruction",
    description: "Every move of 33 classic games explained for beginners and intermediate players.",
    icon: <PawnIcon />
  }
];

export default function LibraryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  
  const filteredBooks = selectedCategory === "All" 
    ? chessBooks 
    : chessBooks.filter(book => book.category === selectedCategory);
  
  const categories = ["All", ...Array.from(new Set(chessBooks.map(book => book.category)))];
  
  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-gray-800/80 text-gray-300 backdrop-blur-sm border border-gray-700 mb-4">
            <ResourceIcon size={16} className="text-chess-gold-500 mr-2" />
            Master the Chess Universe
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Royal <span className="gradient-text">Chess Library</span>
          </h1>
          
          <p className="text-xl text-gray-300 leading-relaxed">
            Explore our curated collection of chess resources, classic games, and training materials to enhance your strategic thinking and elevate your play.
          </p>
        </motion.div>
        
        <div className="divider-chess mb-16"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          <div className="lg:col-span-2">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl font-bold mb-6 flex items-center"
            >
              <KingIcon size={28} className="text-chess-gold-500 mr-3" />
              Classic Chess Battles
            </motion.h2>
            
            <div className="space-y-8">
              {classicGames.map((game, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="glass-effect rounded-xl overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3">
                    <div className="aspect-square md:aspect-auto relative">
                      <Image 
                        src={game.image} 
                        alt={game.title} 
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#0c1d3d]/80 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-4">
                        <div className="text-sm text-chess-gold-500 font-medium">{game.year}</div>
                        <div className="text-lg font-bold text-white">{game.opening}</div>
                      </div>
                    </div>
                    
                    <div className="p-6 md:col-span-2">
                      <h3 className="text-xl font-bold text-white mb-2">{game.title}</h3>
                      <p className="text-chess-gold-400 mb-3">{game.players}</p>
                      <p className="text-gray-300 mb-4">{game.description}</p>
                      
                      <div className="mt-4">
                        <button className="chess-button text-sm">
                          Study This Game
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <ResourceIcon size={24} className="text-chess-gold-500 mr-3" />
                Daily Puzzle Challenge
              </h2>
              
              <div className="glass-effect p-6 rounded-xl mb-8">
                <ChessPuzzle puzzleId="puzzle-2" difficulty="intermediate" caption="Find the checkmate in one move. White to play." />
              </div>
              
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <BishopIcon size={24} className="text-chess-gold-500 mr-3" />
                Essential Chess Library
              </h2>
              
              <div className="bg-[#0d1b30] rounded-xl p-6 mb-4">
                <div className="flex flex-wrap gap-2 mb-6">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                        selectedCategory === category 
                          ? 'bg-chess-gold-500 text-gray-900 font-medium' 
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                
                <div className="space-y-4">
                  {filteredBooks.map((book, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="card-hover p-4 rounded-lg"
                    >
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-chess-blue-600 to-chess-gold-500 flex items-center justify-center text-white mr-4 flex-shrink-0">
                          {book.icon}
                        </div>
                        <div>
                          <h3 className="font-medium text-white">{book.title}</h3>
                          <p className="text-sm text-chess-gold-400">{book.author}</p>
                          <p className="text-xs text-gray-400 mt-1">{book.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-gray-400 mb-6">
            &quot;Chess is life in miniature. Chess is a struggle, chess battles.&quot; – Garry Kasparov
          </p>
          <Link href="/#training-camp" className="chess-button">
            Begin Your Training
          </Link>
        </div>
      </div>
    </main>
  );
} 