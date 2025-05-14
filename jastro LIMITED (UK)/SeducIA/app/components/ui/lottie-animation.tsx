'use client';

import React, { useRef, useEffect } from 'react';
import lottie, { AnimationItem } from 'lottie-web';

interface LottieAnimationProps {
  animationData: any;
  loop?: boolean;
  autoplay?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export default function LottieAnimation({
  animationData,
  loop = true,
  autoplay = true,
  style = {},
  className = ''
}: LottieAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<AnimationItem | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Créer l'animation
    animationRef.current = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop,
      autoplay,
      animationData
    });

    // Nettoyage
    return () => {
      if (animationRef.current) {
        animationRef.current.destroy();
      }
    };
  }, [animationData, loop, autoplay]);

  return (
    <div 
      ref={containerRef} 
      style={style} 
      className={className}
      aria-hidden="true"
    />
  );
} 