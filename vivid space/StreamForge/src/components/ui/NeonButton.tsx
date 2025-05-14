"use client";

import React, { ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';

type NeonButtonProps = {
  children: ReactNode;
  color?: 'blue' | 'purple' | 'pink' | 'green';
  variant?: 'solid' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

export default function NeonButton({
  children,
  color = 'blue',
  variant = 'solid',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  type = 'button',
}: NeonButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const colorStyles = {
    blue: {
      solid: 'bg-blue-600 text-white border-blue-500 hover:bg-blue-700',
      outline: 'bg-transparent text-blue-400 border-blue-500 hover:bg-blue-900/30',
      ghost: 'bg-transparent text-blue-400 border-transparent hover:bg-blue-900/20',
      shadow: '0 0 10px rgba(0, 191, 255, 0.7), 0 0 20px rgba(0, 191, 255, 0.4), 0 0 30px rgba(0, 191, 255, 0.2)'
    },
    purple: {
      solid: 'bg-purple-600 text-white border-purple-500 hover:bg-purple-700',
      outline: 'bg-transparent text-purple-400 border-purple-500 hover:bg-purple-900/30',
      ghost: 'bg-transparent text-purple-400 border-transparent hover:bg-purple-900/20',
      shadow: '0 0 10px rgba(139, 0, 255, 0.7), 0 0 20px rgba(139, 0, 255, 0.4), 0 0 30px rgba(139, 0, 255, 0.2)'
    },
    pink: {
      solid: 'bg-pink-600 text-white border-pink-500 hover:bg-pink-700',
      outline: 'bg-transparent text-pink-400 border-pink-500 hover:bg-pink-900/30',
      ghost: 'bg-transparent text-pink-400 border-transparent hover:bg-pink-900/20',
      shadow: '0 0 10px rgba(255, 0, 170, 0.7), 0 0 20px rgba(255, 0, 170, 0.4), 0 0 30px rgba(255, 0, 170, 0.2)'
    },
    green: {
      solid: 'bg-green-600 text-white border-green-500 hover:bg-green-700',
      outline: 'bg-transparent text-green-400 border-green-500 hover:bg-green-900/30',
      ghost: 'bg-transparent text-green-400 border-transparent hover:bg-green-900/20',
      shadow: '0 0 10px rgba(0, 255, 136, 0.7), 0 0 20px rgba(0, 255, 136, 0.4), 0 0 30px rgba(0, 255, 136, 0.2)'
    }
  };

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 rounded',
    md: 'text-sm px-4 py-2 rounded-md',
    lg: 'text-base px-6 py-3 rounded-lg'
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'relative font-medium border-2 transition-all duration-200 transform active:scale-95',
        colorStyles[color][variant],
        sizeStyles[size],
        fullWidth ? 'w-full' : '',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      style={{
        boxShadow: isHovered ? colorStyles[color].shadow : 'none',
        transition: 'all 0.3s ease-in-out'
      }}
    >
      <div className="flex items-center justify-center gap-2">
        {icon && iconPosition === 'left' && <span>{icon}</span>}
        {children}
        {icon && iconPosition === 'right' && <span>{icon}</span>}
      </div>
      
      {isHovered && (
        <div 
          className="absolute inset-0 rounded-md opacity-30 pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${color === 'blue' ? '#00bfff' : color === 'purple' ? '#8b00ff' : color === 'green' ? '#00ff88' : '#ff00aa'} 0%, transparent 70%)`,
            filter: 'blur(8px)',
          }}
        />
      )}
    </button>
  );
} 