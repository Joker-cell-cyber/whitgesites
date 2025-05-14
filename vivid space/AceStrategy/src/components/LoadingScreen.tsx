"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PokerChip from './ui/PokerChip';

const cardSuits = ['♠', '♥', '♦', '♣'];
const loadingPhrases = [
  "Shuffling the deck...",
  "Placing your bets...",
  "Dealing your cards...",
  "Calculating the odds..."
];

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentPhrase, setCurrentPhrase] = useState(loadingPhrases[0]);
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    let phraseIndex = 0;
    
    // Update loading phrase
    const updatePhrase = () => {
      phraseIndex = (phraseIndex + 1) % loadingPhrases.length;
      setCurrentPhrase(loadingPhrases[phraseIndex]);
    };
    
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          
          // Hide loading screen after a short delay
          timer = setTimeout(() => {
            setIsVisible(false);
          }, 500);
          
          return 100;
        }
        
        // Update phrase every 25%
        if (Math.floor(prev / 25) < Math.floor((prev + 5) / 25)) {
          updatePhrase();
        }
        
        return prev + 5;
      });
    }, 150);
    
    return () => {
      clearInterval(interval);
      if (timer) clearTimeout(timer);
    };
  }, []);
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center space-y-12 max-w-md text-center px-4">
            {/* Logo placeholder */}
            <div className="relative w-52 h-52">
              {/* Rotating card stack */}
              <div className="absolute inset-0 flex items-center justify-center">
                {[0, 1, 2, 3].map((index) => (
                  <motion.div
                    key={index}
                    className="absolute w-28 h-40 bg-white rounded-lg shadow-xl border border-gray-200"
                    initial={{ rotate: index * 90, scale: 0.8, y: 0 }}
                    animate={{ 
                      rotate: [index * 90, index * 90 + 360],
                      scale: [0.8, 0.8],
                      y: [0, -10, 0],
                    }}
                    transition={{
                      rotate: { 
                        repeat: Infinity, 
                        duration: 8, 
                        ease: "linear",
                      },
                      y: {
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut",
                        delay: index * 0.5
                      }
                    }}
                  >
                    <div className="h-full w-full flex items-center justify-center text-5xl">
                      <span className={`${index % 2 === 0 ? 'text-black' : 'text-poker-red-700'}`}>
                        {cardSuits[index]}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Central chip */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <PokerChip color="gold" size="lg" spinning={true} />
              </div>
            </div>

            {/* Text and progress bar */}
            <div className="w-full space-y-4">
              <h2 className="text-2xl font-playfair text-white">
                <span className="text-chip-gold-500">Poker</span>Sharper
              </h2>
              
              <p className="text-gray-400 h-6 font-raleway">
                {currentPhrase}
              </p>
              
              <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-felt-800 via-poker-red-700 to-chip-gold-500"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 