"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { COMPANY } from '../constants/company';

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-felt-900 text-white">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/images/felt-texture.jpg')] bg-cover opacity-30 z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 z-0"></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center font-playfair text-transparent bg-clip-text bg-gradient-to-r from-poker-red-500 to-chip-gold-400">
            About {COMPANY.serviceName}
          </h1>
          
          <div className="bg-black/60 backdrop-blur-md border border-gray-800 rounded-xl p-8 mb-12 shadow-xl">
            <h2 className="text-2xl font-semibold mb-4 text-chip-gold-400 font-playfair">Our Mission</h2>
            <p className="text-gray-300 mb-6 font-raleway">
              At {COMPANY.serviceName}, our mission is to transform average poker players into strategic masters through personalized coaching and advanced analytical approaches. We believe poker is not just a game of chance, but a skill-based pursuit that rewards strategic thinking, emotional discipline, and mathematical understanding.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4 mt-10 text-chip-gold-400 font-playfair">Our Vision</h2>
            <p className="text-gray-300 mb-6 font-raleway">
              We envision a poker landscape where strategic expertise is accessible to all players, regardless of experience level. Our vision is to build a community where knowledge is shared, skills are developed, and players continuously evolve their game through data-driven insights and professional guidance.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4 mt-10 text-chip-gold-400 font-playfair">Our Approach</h2>
            <p className="text-gray-300 mb-6 font-raleway">
              Unlike traditional coaching services, {COMPANY.serviceName} combines cutting-edge game theory with practical, actionable strategies. We leverage technology to analyze player patterns, identify leaks, and develop customized improvement plans designed for each individual's unique playing style and goals.
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-10 text-chip-gold-400 font-playfair">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-felt-800/50 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-medium mb-3 text-poker-red-400 font-playfair">Strategic Excellence</h3>
                <p className="text-gray-300 font-raleway">
                  We're committed to helping our clients achieve strategic excellence in their gameplay through continuous learning and adaptation.
                </p>
              </div>
              
              <div className="bg-felt-800/50 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-medium mb-3 text-poker-red-400 font-playfair">Data-Driven Decisions</h3>
                <p className="text-gray-300 font-raleway">
                  Our coaching is based on mathematical analysis and empirical evidence, not hunches or outdated concepts.
                </p>
              </div>
              
              <div className="bg-felt-800/50 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-medium mb-3 text-poker-red-400 font-playfair">Player-Centric Focus</h3>
                <p className="text-gray-300 font-raleway">
                  Every coaching plan is tailored to the individual's specific goals, whether they're a casual player or aspiring professional.
                </p>
              </div>
              
              <div className="bg-felt-800/50 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-medium mb-3 text-poker-red-400 font-playfair">Continuous Innovation</h3>
                <p className="text-gray-300 font-raleway">
                  The poker landscape is always evolving, and so are we. Our strategies and teaching methods constantly adapt to the changing game.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold mb-4 mt-10 text-chip-gold-400 font-playfair">Our Commitment</h2>
            <p className="text-gray-300 mb-6 font-raleway">
              When you choose {COMPANY.serviceName}, you're not just getting poker lessons—you're gaining a strategic partner dedicated to your success at the tables. We're committed to providing the most comprehensive, honest, and effective poker coaching available, combining time-tested fundamentals with innovative modern strategies.
            </p>
            
            <div className="mt-10 text-center">
              <p className="text-gray-400 italic font-raleway">
                "Poker is 100% skill and 100% luck." — {COMPANY.serviceName}
              </p>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-center"
          >
            <a 
              href="/contact" 
              className="inline-block bg-gradient-to-r from-poker-red-600 to-poker-red-700 hover:from-poker-red-500 hover:to-poker-red-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl font-playfair"
            >
              Ready to Elevate Your Game? Contact Us
            </a>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
} 