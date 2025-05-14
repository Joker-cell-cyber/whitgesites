import React from 'react';
import { NextjsIcon } from './illustrations/NextjsIcon';
import { ReactIcon } from './illustrations/ReactIcon';
import { VueIcon } from './illustrations/VueIcon';
import { AngularIcon } from './illustrations/AngularIcon';
import { motion } from 'framer-motion';

interface FrameworkIconsProps {
  className?: string;
}

export function FrameworkIcons({ className = "" }: FrameworkIconsProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <motion.h3
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xl md:text-2xl font-semibold text-gray-100 mb-8 text-center"
      >
        Frameworks & Technologies
      </motion.h3>
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12"
      >
        <motion.div variants={item} className="flex flex-col items-center">
          <NextjsIcon width={120} height={120} className="mb-3" />
          <p className="text-center text-gray-300 font-medium">Next.js</p>
        </motion.div>
        
        <motion.div variants={item} className="flex flex-col items-center">
          <ReactIcon width={120} height={120} className="mb-3" />
          <p className="text-center text-gray-300 font-medium">React</p>
        </motion.div>
        
        <motion.div variants={item} className="flex flex-col items-center">
          <VueIcon width={120} height={120} className="mb-3" />
          <p className="text-center text-gray-300 font-medium">Vue.js</p>
        </motion.div>
        
        <motion.div variants={item} className="flex flex-col items-center">
          <AngularIcon width={120} height={120} className="mb-3" />
          <p className="text-center text-gray-300 font-medium">Angular</p>
        </motion.div>
      </motion.div>
    </div>
  );
} 