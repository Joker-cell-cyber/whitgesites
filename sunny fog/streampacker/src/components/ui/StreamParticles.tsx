"use client";

import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  opacity: number;
  glowing: boolean;
  pulseSpeed: number;
  pulseDirection: boolean;
};

export default function StreamParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Set canvas to full window size
    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Create fewer particles based on screen size
    const particles: Particle[] = [];
    const colors = [
      '#ff00ff', // Magenta
      '#00ffff', // Cyan
      '#33ff33', // Neon Green
      '#ff3366', // Hot Pink
      '#6633ff', // Violet
      '#00ccff', // Bright Blue
    ];

    // Initialize particles - reduced count for performance
    const particleCount = window.innerWidth < 768 ? 30 : 50;
    
    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 2 + 1; // Smaller particles
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const speedX = (Math.random() - 0.5) * 0.5; // Slower movement
      const speedY = (Math.random() - 0.5) * 0.5; // Slower movement
      const opacity = Math.random() * 0.4 + 0.1; // Lower opacity
      const glowing = Math.random() > 0.8; // Fewer glowing particles
      const pulseSpeed = Math.random() * 0.02 + 0.005; // Slower pulse
      const pulseDirection = Math.random() > 0.5;

      particles.push({
        x, y, size, color, speedX, speedY, opacity, glowing, pulseSpeed, pulseDirection
      });
    }

    // Animation function with throttled frame rate
    let lastFrameTime = 0;
    const targetFPS = 30; // Reduce FPS for better performance
    const frameInterval = 1000 / targetFPS;
    
    const animate = (timestamp: number) => {
      // Only render if enough time has passed
      if (timestamp - lastFrameTime < frameInterval) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      
      lastFrameTime = timestamp;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        // Update positions
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Pulse effect for glowing particles
        if (particle.glowing) {
          if (particle.pulseDirection) {
            particle.opacity += particle.pulseSpeed;
            if (particle.opacity >= 0.6) {
              particle.pulseDirection = false;
            }
          } else {
            particle.opacity -= particle.pulseSpeed;
            if (particle.opacity <= 0.1) {
              particle.pulseDirection = true;
            }
          }
        }

        // Reset if out of bounds
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX = -particle.speedX;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY = -particle.speedY;
        }

        // Draw the particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();

        // Add glow effect for some particles - simplified for performance
        if (particle.glowing) {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.globalAlpha = particle.opacity * 0.3;
          // Skip the filter for performance
          ctx.fill();
        }

        ctx.globalAlpha = 1;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="stream-particles"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.5
      }}
    />
  );
} 