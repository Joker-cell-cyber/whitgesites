"use client";

import React from 'react';
import { cn } from '@/lib/utils';

type GlowTextProps = {
  children: React.ReactNode;
  color?: 'blue' | 'purple' | 'pink' | 'green';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  className?: string;
  animate?: boolean;
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  uppercase?: boolean;
};

export default function GlowText({
  children,
  color = 'blue',
  size = 'md',
  weight = 'normal',
  className = '',
  animate = false,
  as: Component = 'span',
  uppercase = false,
}: GlowTextProps) {
  const colorStyles = {
    blue: 'text-blue-400',
    purple: 'text-purple-400',
    pink: 'text-pink-400',
    green: 'text-green-400',
  };

  const colorShadows = {
    blue: '0 0 10px rgba(0, 191, 255, 0.7), 0 0 30px rgba(0, 191, 255, 0.3)',
    purple: '0 0 10px rgba(139, 0, 255, 0.7), 0 0 30px rgba(139, 0, 255, 0.3)',
    pink: '0 0 10px rgba(255, 0, 170, 0.7), 0 0 30px rgba(255, 0, 170, 0.3)',
    green: '0 0 10px rgba(0, 255, 136, 0.7), 0 0 30px rgba(0, 255, 136, 0.3)',
  };

  const sizeStyles = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
  };

  const weightStyles = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  const animationClass = animate ? 'animate-pulse' : '';
  
  return (
    <Component
      className={cn(
        colorStyles[color],
        sizeStyles[size],
        weightStyles[weight],
        animationClass,
        uppercase ? 'uppercase tracking-wider' : '',
        className
      )}
      style={{
        textShadow: colorShadows[color],
      }}
    >
      {children}
    </Component>
  );
} 