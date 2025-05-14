import React, { useRef } from 'react';
import { motion, useAnimation, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { NextjsIcon } from '../illustrations/NextjsIcon';
import { ReactIcon } from '../illustrations/ReactIcon';
import { VueIcon } from '../illustrations/VueIcon';
import { AngularIcon } from '../illustrations/AngularIcon';

interface RotatingFrameworksProps {
  className?: string;
}

export function RotatingFrameworks({ className = "" }: RotatingFrameworksProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Effet de spring pour un mouvement plus fluide
  const springX = useSpring(mouseX, { damping: 20, stiffness: 100 });
  const springY = useSpring(mouseY, { damping: 20, stiffness: 100 });
  
  const rotateX = useTransform(springY, [-100, 100], [15, -15]);
  const rotateY = useTransform(springX, [-100, 100], [-15, 15]);
  
  // Gestion du mouvement de la souris
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };
  
  // Réinitialisation de la position
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };
  
  // Animation des icônes individuelles
  const variants = {
    hover: (index: number) => ({
      y: -10,
      transition: { delay: index * 0.05, duration: 0.3 }
    }),
    rest: (index: number) => ({
      y: 0,
      transition: { delay: index * 0.05, duration: 0.3 }
    })
  };
  
  const iconControls = useAnimation();
  
  const frameworks = [
    { name: "Next.js", Icon: NextjsIcon, position: [0, -150] },
    { name: "React", Icon: ReactIcon, position: [150, 0] }, 
    { name: "Vue.js", Icon: VueIcon, position: [0, 150] },
    { name: "Angular", Icon: AngularIcon, position: [-150, 0] }
  ];
  
  return (
    <div 
      ref={containerRef}
      className={`relative w-full max-w-3xl h-[500px] mx-auto ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => iconControls.start("hover")}
    >
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        style={{ 
          rotateX: rotateX,
          rotateY: rotateY,
          perspective: 1000,
        }}
      >
        {frameworks.map((framework, index) => (
          <motion.div
            key={framework.name}
            className="absolute flex flex-col items-center"
            style={{ 
              x: framework.position[0],
              y: framework.position[1],
              z: 20 * (index + 1)
            }}
            custom={index}
            variants={variants}
            animate={iconControls}
            initial="rest"
            whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
          >
            <framework.Icon width={100} height={100} className="mb-4" />
            <motion.span 
              className="text-white/80 font-medium text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              {framework.name}
            </motion.span>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Cercle central */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div 
          className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-sm"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.6, 0.8, 0.6]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* Effet de lueur */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div 
          className="w-[600px] h-[600px] rounded-full bg-gradient-radial from-purple-500/5 to-transparent blur-xl"
          style={{ 
            x: useTransform(springX, [-100, 100], [20, -20]),
            y: useTransform(springY, [-100, 100], [20, -20]),
          }}
        />
      </div>
    </div>
  );
} 