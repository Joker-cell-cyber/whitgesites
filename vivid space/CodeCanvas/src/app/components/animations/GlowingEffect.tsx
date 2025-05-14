import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface GlowingEffectProps {
  color1?: string;
  color2?: string;
  speed?: number;
  size?: "sm" | "md" | "lg";
}

export function GlowingEffect({
  color1 = "rgba(124, 58, 237, 0.1)",
  color2 = "rgba(236, 72, 153, 0.1)",
  speed = 0.01,
  size = "md",
}: GlowingEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext("2d");
    if (!context) return;
    
    let time = 0;
    let animationFrameId: number;
    
    // Set canvas to full window size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resize();
    window.addEventListener("resize", resize);
    
    // Déterminer la taille des "blobs" en fonction du paramètre size
    const getBlobSize = () => {
      switch (size) {
        case "sm": return { min: 50, max: 150 };
        case "lg": return { min: 200, max: 400 };
        default: return { min: 100, max: 250 }; // md
      }
    };
    
    const blobSize = getBlobSize();
    
    // Créer des points aléatoires pour les blobs
    const numBlobs = 5;
    const blobs = Array.from({ length: numBlobs }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: blobSize.min + Math.random() * (blobSize.max - blobSize.min),
      speed: 0.2 + Math.random() * 0.3,
      color: Math.random() > 0.5 ? color1 : color2,
      angle: Math.random() * Math.PI * 2,
    }));
    
    // Animation
    const animate = () => {
      time += speed;
      
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      // Dessiner les blobs avec des mouvements fluides
      blobs.forEach((blob) => {
        // Mettre à jour la position avec un mouvement lissé
        blob.angle += blob.speed * 0.01;
        blob.x += Math.cos(blob.angle + time) * blob.speed;
        blob.y += Math.sin(blob.angle + time * 0.8) * blob.speed;
        
        // Rebondir aux bords
        if (blob.x < -blob.size) blob.x = canvas.width + blob.size;
        if (blob.x > canvas.width + blob.size) blob.x = -blob.size;
        if (blob.y < -blob.size) blob.y = canvas.height + blob.size;
        if (blob.y > canvas.height + blob.size) blob.y = -blob.size;
        
        // Dessiner le blob avec un dégradé radial
        const gradient = context.createRadialGradient(
          blob.x, blob.y, 0,
          blob.x, blob.y, blob.size
        );
        
        gradient.addColorStop(0, blob.color);
        gradient.addColorStop(1, "transparent");
        
        context.beginPath();
        context.fillStyle = gradient;
        context.arc(blob.x, blob.y, blob.size, 0, Math.PI * 2);
        context.fill();
      });
      
      animationFrameId = window.requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, [color1, color2, speed, size]);
  
  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    />
  );
} 