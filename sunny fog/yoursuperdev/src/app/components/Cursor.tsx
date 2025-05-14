"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { clsx } from "clsx";

type CursorState = "default" | "hover" | "active";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Pour éviter l'effet de jank, utiliser springs pour un mouvement fluide
  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  
  // Animation d'entrée
  const [isVisible, setIsVisible] = useState(false);
  
  // État du curseur (défaut, survol, actif)
  const [cursorState, setCursorState] = useState<CursorState>("default");
  
  // Taille du curseur basée sur l'état
  const cursorSize = useTransform(
    () => {
      switch (cursorState) {
        case "hover": return "40px";
        case "active": return "36px";
        default: return "24px";
      }
    }
  );

  // Opacité du curseur dot
  const cursorDotSize = useTransform(
    () => {
      switch (cursorState) {
        case "hover": return "6px";
        case "active": return "8px";
        default: return "4px";
      }
    }
  );

  // Détecter les mouvements de la souris avec optimisation requestAnimationFrame
  const onMouseMove = useCallback((e: MouseEvent) => {
    // Utiliser requestAnimationFrame pour optimiser les performances
    window.requestAnimationFrame(() => {
      // Mettre à jour les positions
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    });
  }, [mouseX, mouseY]);

  // Gérer les événements de souris pour les éléments interactifs
  const handleMouseEvents = useCallback(() => {
    const handleMouseEnter = () => setCursorState("hover");
    const handleMouseDown = () => setCursorState("active");
    const handleMouseUp = () => setCursorState("hover");
    const handleMouseLeave = () => setCursorState("default");

    // Sélectionner tous les éléments interactifs
    const interactiveElements = document.querySelectorAll("a, button, input, textarea, select, [role='button']");
    
    // Ajouter les écouteurs d'événements
    interactiveElements.forEach(element => {
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);
      element.addEventListener("mousedown", handleMouseDown);
      element.addEventListener("mouseup", handleMouseUp);
    });

    // Nettoyage
    return () => {
      interactiveElements.forEach(element => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
        element.removeEventListener("mousedown", handleMouseDown);
        element.removeEventListener("mouseup", handleMouseUp);
      });
    };
  }, []);

  // Vérifier si on est sur mobile
  const isMobile = useCallback(() => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
           (navigator.maxTouchPoints && navigator.maxTouchPoints > 2);
  }, []);

  useEffect(() => {
    // Ne pas afficher le curseur sur mobile
    if (isMobile()) return;
    
    // Masquer le curseur natif
    document.body.style.cursor = "none";
    
    // Ajouter l'écouteur d'événement de mouvement
    window.addEventListener("mousemove", onMouseMove);
    
    // Configurer les interactions sur les éléments interactifs
    const cleanupEvents = handleMouseEvents();
    
    // Activer l'animation d'entrée
    setIsVisible(true);
    
    // Nettoyage
    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", onMouseMove);
      cleanupEvents();
    };
  }, [onMouseMove, handleMouseEvents, isMobile]);

  // Ne pas afficher sur mobile
  if (typeof window !== "undefined" && isMobile()) {
    return null;
  }

  return (
    <>
      <VisuallyHidden>Curseur personnalisé</VisuallyHidden>
      
      {/* Principale forme du curseur */}
      <motion.div
        ref={cursorRef}
        className={clsx(
          "fixed top-0 left-0 pointer-events-none z-50 rounded-full border-2 mix-blend-difference cursor-transition-in",
          isVisible ? "opacity-100" : "opacity-0",
          "transform-gpu will-change-transform" // Force GPU accelération
        )}
        style={{
          x: cursorX,
          y: cursorY,
          width: cursorSize,
          height: cursorSize,
          translateX: "-50%",
          translateY: "-50%",
          translateZ: "0", // force 3D
          borderColor: "var(--cursor-color)"
        }}
      />
      
      {/* Point central du curseur */}
      <motion.div
        ref={cursorDotRef}
        className={clsx(
          "fixed top-0 left-0 pointer-events-none z-50 rounded-full cursor-transition-in cursor-dot",
          isVisible ? "opacity-100" : "opacity-0",
          "transform-gpu will-change-transform" // Force GPU accelération
        )}
        style={{
          x: cursorX,
          y: cursorY,
          width: cursorDotSize,
          height: cursorDotSize,
          translateX: "-50%",
          translateY: "-50%",
          translateZ: "0", // force 3D
          backgroundColor: "var(--cursor-color)"
        }}
      />
      
      {/* Effet de traînée de particules (15% opacité) */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className={clsx(
            "fixed top-0 left-0 rounded-full pointer-events-none z-40 cursor-transition-in",
            isVisible ? "opacity-15" : "opacity-0",
            "transform-gpu will-change-transform" // Force GPU accelération
          )}
          style={{
            x: cursorX,
            y: cursorY,
            width: "6px",
            height: "6px",
            translateX: "-50%",
            translateY: "-50%",
            translateZ: "0", // force 3D
            opacity: 0.15 - (i * 0.02),
            transition: `all ${100 + (i * 50)}ms ease-out`,
            scale: 1 - (i * 0.15),
            backgroundColor: "var(--cursor-particle)"
          }}
        />
      ))}
    </>
  );
} 