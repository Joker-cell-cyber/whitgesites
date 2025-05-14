"use client";

import { useEffect, useMemo } from "react";
import { useCursor } from "./CursorProvider";

// Hook pour manipuler le curseur sur un élément spécifique
export function useCursorInteraction<T extends HTMLElement>(ref: React.RefObject<T | null>, options?: {
  hoverScale?: number;
  activeScale?: number;
  disableOnMobile?: boolean;
}) {
  const { isCursorEnabled } = useCursor();
  
  const opts = useMemo(() => {
    const defaultOptions = {
      hoverScale: 1.5,
      activeScale: 0.8,
      disableOnMobile: true
    };
    return { ...defaultOptions, ...options };
  }, [options]);
  
  useEffect(() => {
    if (!isCursorEnabled || !ref.current) return;
    
    // Déterminer si on est sur mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
      (navigator.maxTouchPoints && navigator.maxTouchPoints > 2);
    
    if (opts.disableOnMobile && isMobile) return;

    const element = ref.current;
    const originalTransition = window.getComputedStyle(element).transition;
    
    // Définir les classes personnalisées sur l'élément
    element.dataset.cursorInteractive = "true";
    
    // Gestion des événements de souris
    const handleMouseEnter = () => {
      // Ajouter la transformation d'échelle à l'élément
      element.style.transition = originalTransition + ", transform 0.2s cubic-bezier(0.23, 1, 0.32, 1)";
      element.style.transform = `scale(${opts.hoverScale})`;
    };
    
    const handleMouseLeave = () => {
      // Réinitialiser la transformation
      element.style.transform = "scale(1)";
    };
    
    const handleMouseDown = () => {
      // Appliquer l'échelle active
      element.style.transform = `scale(${opts.activeScale})`;
    };
    
    const handleMouseUp = () => {
      // Revenir à l'échelle de survol
      element.style.transform = `scale(${opts.hoverScale})`;
    };

    // Ajouter les écouteurs d'événements
    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);
    element.addEventListener("mousedown", handleMouseDown);
    element.addEventListener("mouseup", handleMouseUp);
    
    // Nettoyage
    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.removeEventListener("mousedown", handleMouseDown);
      element.removeEventListener("mouseup", handleMouseUp);
      
      // Réinitialiser les styles
      element.style.transition = originalTransition;
      element.style.transform = "";
      delete element.dataset.cursorInteractive;
    };
  }, [ref, isCursorEnabled, opts]);
}

// Hook pour créer un effet magnétique sur le curseur
export function useMagneticCursor<T extends HTMLElement>(ref: React.RefObject<T | null>, options?: {
  strength?: number;
  radius?: number;
  disableOnMobile?: boolean;
}) {
  const { isCursorEnabled } = useCursor();
  
  const opts = useMemo(() => {
    const defaultOptions = {
      strength: 30,
      radius: 100,
      disableOnMobile: true
    };
    return { ...defaultOptions, ...options };
  }, [options]);
  
  useEffect(() => {
    if (!isCursorEnabled || !ref.current) return;
    
    // Déterminer si on est sur mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
      (navigator.maxTouchPoints && navigator.maxTouchPoints > 2);
    
    if (opts.disableOnMobile && isMobile) return;

    const element = ref.current;
    
    // Variables pour le mouvement magnétique
    let rect = element.getBoundingClientRect();
    let centerX = rect.left + rect.width / 2;
    let centerY = rect.top + rect.height / 2;
    const distanceThreshold = opts.radius;
    const magnetStrength = opts.strength;
    
    // Mise à jour des positions du rect lorsque la fenêtre change de taille
    const updateRect = () => {
      rect = element.getBoundingClientRect();
      centerX = rect.left + rect.width / 2;
      centerY = rect.top + rect.height / 2;
    };
    
    // Effet magnétique
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Calculer la distance entre le curseur et le centre de l'élément
      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      // Appliquer l'effet magnétique si le curseur est à proximité
      if (distance < distanceThreshold) {
        // Calculer la force en fonction de la distance
        const force = (distanceThreshold - distance) / distanceThreshold;
        
        // Effet magnétique - attirer le bouton vers le curseur
        const moveX = deltaX * force * magnetStrength / 100;
        const moveY = deltaY * force * magnetStrength / 100;
        
        // Appliquer la transformation
        element.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      } else {
        // Réinitialiser la position si le curseur est trop loin
        element.style.transform = "translate3d(0, 0, 0)";
      }
    };
    
    // Réinitialiser la position lorsque la souris quitte l'élément
    const handleMouseLeave = () => {
      element.style.transform = "translate3d(0, 0, 0)";
    };
    
    // Ajouter les écouteurs d'événements
    window.addEventListener("resize", updateRect);
    window.addEventListener("scroll", updateRect);
    window.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);
    
    // Nettoyage
    return () => {
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect);
      window.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
      
      // Réinitialiser la transformation
      element.style.transform = "";
    };
  }, [ref, isCursorEnabled, opts]);
} 