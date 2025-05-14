"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";

interface MatrixTextProps {
  text: string;
  className?: string;
  speed?: number; // Vitesse de l'animation (ms)
  color?: string; // Couleur principale du texte
  glowColor?: string; // Couleur de la lueur
  textSize?: string; // Taille du texte
  loop?: boolean; // Boucler l'animation
}

const characters = "abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[];',./";

export function MatrixText({
  text,
  className,
  speed = 50,
  color = "text-purple-500",
  glowColor = "purple",
  textSize = "text-lg sm:text-xl md:text-2xl",
  loop = true,
}: MatrixTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [scramble, setScramble] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  // Générer un caractère aléatoire
  const getRandomChar = useCallback(() => {
    return characters.charAt(Math.floor(Math.random() * characters.length));
  }, []);

  // Animation principale
  useEffect(() => {
    if (currentIndex >= text.length) {
      // Animation terminée
      if (loop) {
        // Si loop est activé, réinitialiser après un délai
        const timeout = setTimeout(() => {
          setDisplayText("");
          setCurrentIndex(0);
          setScramble(true);
        }, 3000);
        return () => clearTimeout(timeout);
      }
      return;
    }

    if (scramble) {
      // Phase de brouillage
      const scrambleCount = 3; // Nombre de changements aléatoires
      let count = 0;
      
      const interval = setInterval(() => {
        count++;
        if (count >= scrambleCount) {
          // Arrêter le brouillage et passer au caractère réel
          clearInterval(interval);
          setScramble(false);
          setDisplayText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        } else {
          // Changer le dernier caractère aléatoirement
          setDisplayText(prev => prev.slice(0, -1) + getRandomChar());
        }
      }, speed / 2);
      
      return () => clearInterval(interval);
    } else {
      // Préparer le prochain caractère
      setDisplayText(prev => prev + getRandomChar());
      const timeout = setTimeout(() => {
        setScramble(true);
      }, speed);
      
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, scramble, text, speed, getRandomChar, loop]);

  // Animation du curseur clignotant
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => clearInterval(interval);
  }, []);

  // Mapper le texte pour les transitions individuelles
  const displayTextArray = displayText.split("");

  return (
    <div 
      className={clsx(
        "font-mono tracking-wide overflow-hidden whitespace-nowrap",
        textSize,
        color,
        className
      )}
      style={{
        textShadow: `0 0 8px var(--${glowColor}-500)`,
      }}
    >
      {displayTextArray.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {char}
        </motion.span>
      ))}
      <motion.span
        animate={{ opacity: showCursor ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="ml-1 inline-block w-2 h-5 bg-current"
      />
    </div>
  );
} 