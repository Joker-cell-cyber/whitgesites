"use client";

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import PlayingCard from './PlayingCard';

export type FloatingAceProps = {
  size?: 'md' | 'lg' | 'xl';
  showParticles?: boolean;
  rotationSpeed?: number;
  className?: string;
  style?: React.CSSProperties;
};

export default function FloatingAce({
  size = 'lg',
  showParticles = true,
  rotationSpeed = 1,
  className = '',
  style
}: FloatingAceProps) {
  const particlesRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!showParticles || !particlesRef.current) return;
    
    const canvas = particlesRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle system
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speed: number;
      color: string;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
    }> = [];
    
    const colors = ['#d4af37', '#a51c30', '#0a3b32'];
    
    const createParticle = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) * 0.6;
      const angle = Math.random() * Math.PI * 2;
      
      // Position on the circular path
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      
      // Random velocity directed somewhat toward the center
      const vx = (Math.random() - 0.5) * 0.5 - (x - centerX) * 0.01;
      const vy = (Math.random() - 0.5) * 0.5 - (y - centerY) * 0.01;
      
      particles.push({
        x,
        y,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 1 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx,
        vy,
        life: 0,
        maxLife: Math.random() * 100 + 50
      });
    };
    
    const animate = () => {
      if (!ctx) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create new particles
      if (Math.random() > 0.8) {
        createParticle();
      }
      
      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        p.life++;
        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          i--;
          continue;
        }
        
        p.x += p.vx * p.speed;
        p.y += p.vy * p.speed;
        
        // Fade out as life increases
        const alpha = 1 - p.life / p.maxLife;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.round(alpha * 255).toString(16).padStart(2, '0');
        ctx.fill();
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [showParticles]);
  
  return (
    <div className={`relative ${className}`} style={style}>
      {showParticles && (
        <canvas 
          ref={particlesRef}
          className="absolute inset-0 w-full h-full z-0"
        />
      )}
      
      <motion.div
        className="relative z-10"
        animate={{ 
          rotateY: [0, 360],
        }}
        transition={{
          rotateY: {
            repeat: Infinity,
            duration: 8 / rotationSpeed,
            ease: "linear"
          }
        }}
      >
        <PlayingCard
          suit="spades"
          rank="A"
          size={size}
          floating={true}
          className="shadow-2xl shadow-neon-blue-500/20"
        />
      </motion.div>
    </div>
  );
} 