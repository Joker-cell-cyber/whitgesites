"use client";

import React, { forwardRef } from "react";
import { clsx } from "clsx";
import { motion } from "framer-motion";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  fullWidth?: boolean;
  asChild?: boolean;
  href?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      fullWidth = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = "rounded-full font-medium transition-all duration-300 transform-gpu focus:outline-none flex items-center justify-center relative";
    
    const variants = {
      primary:
        "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl hover:shadow-cyan-500/20",
      secondary:
        "bg-white/10 backdrop-filter backdrop-blur-sm border border-white/20 text-white hover:bg-white/20",
      outline:
        "bg-transparent border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500/10",
      ghost:
        "bg-transparent text-cyan-500 hover:bg-cyan-500/10",
    };
    
    const sizes = {
      sm: "text-sm py-2 px-4",
      md: "text-base py-3 px-6",
      lg: "text-lg py-4 px-8",
    };
    
    const widthClass = fullWidth ? "w-full" : "";
    const disabledClass = disabled || isLoading ? "opacity-70 cursor-not-allowed" : "";
    
    return (
      <button
        ref={ref}
        className={clsx(
          baseStyles,
          variants[variant],
          sizes[size],
          widthClass,
          disabledClass,
          "hover:scale-105 active:scale-95",
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-5 w-5 rounded-full border-2 border-t-transparent border-white animate-spin" />
          </div>
        ) : null}
        <span className={clsx(isLoading && "opacity-0")}>{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button }; 