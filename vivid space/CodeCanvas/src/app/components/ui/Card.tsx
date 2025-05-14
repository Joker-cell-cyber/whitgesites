"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { clsx } from "clsx";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  tiltEffect?: boolean;
  glareEffect?: boolean;
  depth?: "sm" | "md" | "lg";
  variant?: "default" | "gradient" | "outline" | "glass";
  padding?: "sm" | "md" | "lg" | "none";
}

export function Card({
  children,
  className,
  tiltEffect = true,
  glareEffect = true,
  depth = "md",
  variant = "default",
  padding = "md",
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Motion values pour l'effet tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Spring pour les mouvements plus fluides
  const springConfig = { damping: 20, stiffness: 100, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), springConfig);
  
  // Effet de brillance basé sur la position
  const glareOpacity = useSpring(useTransform(
    y, 
    [-100, 0, 100], 
    [0.2, 0, 0.2]
  ), springConfig);
  
  const glarePosition = useTransform(
    y,
    [-100, 100],
    ["0% 0%", "100% 100%"]
  );
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !tiltEffect) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    x.set(mouseX);
    y.set(mouseY);
  };
  
  const handleMouseLeave = () => {
    if (!tiltEffect) return;
    
    x.set(0);
    y.set(0);
  };
  
  // Styles des variantes
  const variants = {
    default: "bg-white dark:bg-zinc-900",
    gradient: "bg-gradient-to-br from-purple-600/10 to-pink-500/10 dark:from-purple-700/20 dark:to-pink-600/20",
    outline: "bg-transparent border border-purple-600/20 dark:border-purple-500/30",
    glass: "bg-white/10 dark:bg-black/20 backdrop-filter backdrop-blur-lg border border-white/20 dark:border-white/10"
  };
  
  // Styles des ombres
  const shadows = {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg"
  };
  
  // Styles de padding
  const paddings = {
    none: "p-0",
    sm: "p-3",
    md: "p-5",
    lg: "p-8"
  };
  
  return (
    <motion.div
      ref={cardRef}
      className={clsx(
        "rounded-xl overflow-hidden relative",
        variants[variant],
        shadows[depth],
        paddings[padding],
        tiltEffect && "will-change-transform transform-gpu",
        className
      )}
      style={{
        rotateX: tiltEffect ? rotateX : 0,
        rotateY: tiltEffect ? rotateY : 0,
        transformPerspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={tiltEffect ? { scale: 1.02 } : undefined}
      transition={{ duration: 0.2 }}
    >
      {glareEffect && tiltEffect && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-white to-transparent opacity-0 pointer-events-none rounded-xl"
          style={{ 
            opacity: glareOpacity,
            backgroundPosition: glarePosition,
          }}
        />
      )}
      {children}
    </motion.div>
  );
} 