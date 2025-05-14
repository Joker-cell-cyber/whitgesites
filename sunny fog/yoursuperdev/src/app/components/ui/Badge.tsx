"use client";

import React from "react";
import { clsx } from "clsx";
import { motion } from "framer-motion";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "purple" | "popular";
  size?: "sm" | "md" | "lg";
  className?: string;
  pulse?: boolean;
}

export function Badge({
  children,
  variant = "default",
  size = "md",
  className,
  pulse = false,
}: BadgeProps) {
  const variants = {
    default: "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200",
    success: "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-300",
    warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-300",
    error: "bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-300",
    purple: "bg-purple-100 text-purple-800 dark:bg-purple-800/20 dark:text-purple-300",
    popular: "bg-gradient-to-r from-purple-600 to-pink-500 text-white",
  };

  const sizes = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-1",
    lg: "text-base px-3 py-1.5"
  };

  // Animation de pulsation
  const pulseAnimation = {
    scale: [1, 1.05, 1],
    opacity: [0.9, 1, 0.9],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  // Shadow animation pour popular
  const popularShadowAnimation = {
    boxShadow: [
      "0 0 0 rgba(236, 72, 153, 0.4)",
      "0 0 10px rgba(236, 72, 153, 0.6)",
      "0 0 0 rgba(236, 72, 153, 0.4)"
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <motion.span
      className={clsx(
        "inline-flex items-center justify-center font-medium rounded-full whitespace-nowrap",
        variants[variant],
        sizes[size],
        className
      )}
      animate={pulse ? (variant === "popular" ? { ...pulseAnimation, ...popularShadowAnimation } : pulseAnimation) : undefined}
    >
      {children}
    </motion.span>
  );
} 