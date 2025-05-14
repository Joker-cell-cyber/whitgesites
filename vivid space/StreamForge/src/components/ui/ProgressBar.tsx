"use client";

import React, { useEffect, useState } from 'react';

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calcul du pourcentage de défilement
      const scrollTop = window.scrollY;
      const docHeight = document.body.offsetHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      setProgress(scrollPercent * 100);
    };

    // Ajout de l'écouteur d'événement
    window.addEventListener('scroll', handleScroll);
    
    // Nettoyage de l'écouteur d'événement
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div 
      className="progress-bar"
      style={{ width: `${progress}%` }}
    />
  );
} 