import React from "react";
import { clsx } from "clsx";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  as?: React.ElementType;
}

export function Container({
  children,
  className,
  size = "lg",
  as: Component = "div",
}: ContainerProps) {
  const sizes = {
    sm: "max-w-3xl",
    md: "max-w-4xl",
    lg: "max-w-6xl",
    xl: "max-w-7xl",
    full: "max-w-full",
  };

  return (
    <Component
      className={clsx(
        "mx-auto px-4 sm:px-6 lg:px-8",
        sizes[size],
        className
      )}
    >
      {children}
    </Component>
  );
} 