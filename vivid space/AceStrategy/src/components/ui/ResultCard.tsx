"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

type FormatMetric = {
  label: string;
  value: string;
  isPositive?: boolean;
};

type InfoCardProps = {
  name: string;
  image?: string;
  info: string;
  format: string;
  metrics: FormatMetric[];
  isFlipped?: boolean;
  onFlip?: () => void;
  className?: string;
};

export default function InfoCard({
  name,
  image = '/default-avatar.png',
  info,
  format,
  metrics,
  isFlipped = false,
  onFlip,
  className = '',
}: InfoCardProps) {
  return (
    <motion.div 
      className={`rounded-xl overflow-hidden perspective-1000 ${className}`}
      whileHover={{ translateY: -5, transition: { duration: 0.2 } }}
    >
      <div 
        className={`relative w-full h-full transition-all duration-700 transform-style-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
        onClick={onFlip}
      >
        {/* Front of card */}
        <div className={`absolute w-full h-full bg-felt-900 border border-felt-700/30 rounded-xl p-6 backface-hidden ${isFlipped ? 'hidden' : ''}`}>
          <div className="flex items-start gap-4">
            <div className="relative h-12 w-12 flex-shrink-0">
              <Image
                src={image}
                alt={name}
                width={48}
                height={48}
                className="rounded-full object-cover border-2 border-chip-gold-500"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-felt-800 rounded-full flex items-center justify-center">
                {format.toLowerCase().includes('cash') ? (
                  <span className="text-xs text-chip-gold-500">♦</span>
                ) : format.toLowerCase().includes('tournament') || format.toLowerCase().includes('mtt') || format.toLowerCase().includes('sit') ? (
                  <span className="text-xs text-chip-gold-500">♠</span>
                ) : (
                  <span className="text-xs text-chip-gold-500">♥</span>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-lg font-montserrat">{name}</h3>
              <p className="text-sm text-gray-400">Poker Format</p>
            </div>
          </div>
          
          <div className="mt-6 space-y-4">
            {metrics.map((metric, index) => (
              <div key={index} className="relative">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-400">{metric.label}</span>
                  <span className={metric.isPositive === false ? "text-poker-red-400 font-roboto-mono text-sm" : "text-chip-gold-500 font-roboto-mono text-sm"}>
                    {metric.value}
                  </span>
                </div>
                <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className={metric.isPositive === false ? "h-full bg-gradient-to-r from-felt-700 to-poker-red-700 rounded-full" : "h-full bg-gradient-to-r from-felt-700 to-chip-gold-500 rounded-full"}
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="absolute bottom-3 right-3">
            <div className="text-gray-500 text-xs flex items-center gap-1">
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>More info</span>
            </div>
          </div>
        </div>
        
        {/* Back of card */}
        <div className={`absolute w-full h-full bg-felt-900 border border-felt-700/30 rounded-xl p-6 backface-hidden rotate-y-180 ${!isFlipped ? 'hidden' : ''}`}>
          <div className="h-full flex flex-col">
            <div className="flex-1">
              <svg className="h-8 w-8 text-chip-gold-500 mb-4 opacity-25" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              
              <h4 className="text-lg font-medium mb-2 font-montserrat">Format Characteristics</h4>
              <p className="text-gray-300 mb-4">{info}</p>
            </div>
            
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-800">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{name}</span>
              </div>
              
              <span className="text-xs text-gray-500">Theoretical Information</span>
            </div>
          </div>
          
          <div className="absolute bottom-3 right-3">
            <div className="text-gray-500 text-xs flex items-center gap-1">
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span>View statistics</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 