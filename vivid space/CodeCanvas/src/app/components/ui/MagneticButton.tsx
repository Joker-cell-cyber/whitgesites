"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./Button";
import { clsx } from "clsx";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  strength?: number; // Force de l'effet magnétique
  fullWidth?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function MagneticButton({
  children,
  variant = "primary",
  size = "md",
  strength = 30,
  fullWidth = false,
  className,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Distance du curseur par rapport au centre
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    // Calcul du mouvement en fonction de la force
    const moveX = (distanceX / rect.width) * strength;
    const moveY = (distanceY / rect.height) * strength;
    
    setPosition({ x: moveX, y: moveY });
  };

  const handleMouseLeave = () => {
    // Réinitialiser la position
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div 
      ref={buttonRef}
      className={clsx(
        "relative inline-block z-0 overflow-hidden",
        fullWidth && "w-full"
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        className={clsx("relative z-10", fullWidth && "w-full")}
      >
        <Button 
          variant={variant} 
          size={size}
          fullWidth={fullWidth}
          className={className}
          {...props}
        >
          {children}
        </Button>
      </motion.div>
      
      {/* Effet de lueur néon */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-cyan-500/40 to-blue-600/40 rounded-full blur-xl"
        animate={{ 
          x: position.x * 0.3, 
          y: position.y * 0.3,
          scale: position.x !== 0 || position.y !== 0 ? 1.1 : 0.95
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      />
    </div>
  );
} 