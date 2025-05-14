"use client";

import React, { useRef, useEffect } from "react";
import { clsx } from "clsx";

interface ParticleCanvasProps {
  className?: string;
  particleCount?: number;
  particleColor?: string;
  lineColor?: string;
  backgroundColor?: string;
  particleSize?: number;
  speed?: number;
  interactive?: boolean;
  maxLineDistance?: number;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export function ParticleCanvas({
  className,
  particleCount = 80,
  particleColor = "rgba(124, 58, 237, 0.8)",
  lineColor = "rgba(236, 72, 153, 0.3)",
  backgroundColor = "transparent",
  particleSize = 2,
  speed = 0.5,
  interactive = true,
  maxLineDistance = 150,
}: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number; y: number; radius: number }>({
    x: 0,
    y: 0,
    radius: 200,
  });
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      
      ctx.scale(dpr, dpr);
      
      // Réinitialiser les particules lors du redimensionnement
      initParticles();
    };

    // Initialisation des particules
    const initParticles = () => {
      if (!canvas) return;
      
      particlesRef.current = [];
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          size: Math.random() * particleSize + 1,
          speedX: (Math.random() - 0.5) * speed,
          speedY: (Math.random() - 0.5) * speed,
          opacity: Math.random() * 0.5 + 0.5,
        });
      }
    };

    // Animation des particules
    const animate = () => {
      if (!canvas || !ctx) return;
      
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      
      // Dessiner le fond
      if (backgroundColor !== "transparent") {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      }

      // Mettre à jour et dessiner les particules
      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i];
        
        // Mettre à jour la position
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Rebondir sur les bords
        if (p.x > canvas.offsetWidth || p.x < 0) {
          p.speedX = -p.speedX;
        }
        if (p.y > canvas.offsetHeight || p.y < 0) {
          p.speedY = -p.speedY;
        }
        
        // Dessiner la particule
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();
        
        // Tracer les lignes entre particules proches
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p2 = particlesRef.current[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxLineDistance) {
            // Opacité basée sur la distance
            const opacity = 1 - (distance / maxLineDistance);
            
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = lineColor.replace(/[\d\.]+\)$/, `${opacity})`);
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
        
        // Interaction avec la souris
        if (interactive) {
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouseRef.current.radius) {
            // Repousser légèrement la particule
            const force = (mouseRef.current.radius - distance) / mouseRef.current.radius;
            const directionX = dx / distance || 0;
            const directionY = dy / distance || 0;
            
            p.x += directionX * force * speed * 5;
            p.y += directionY * force * speed * 5;
          }
        }
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Gestion des événements souris
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseOut = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    // Configuration initiale
    resizeCanvas();
    animate();
    
    // Event listeners
    window.addEventListener("resize", resizeCanvas);
    
    if (interactive) {
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseout", handleMouseOut);
    }

    // Nettoyage
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      
      if (interactive && canvas) {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseout", handleMouseOut);
      }
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [
    particleCount,
    particleColor,
    lineColor,
    backgroundColor,
    particleSize,
    speed,
    interactive,
    maxLineDistance,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={clsx("w-full h-full", className)}
      style={{ pointerEvents: interactive ? "auto" : "none" }}
    />
  );
} 