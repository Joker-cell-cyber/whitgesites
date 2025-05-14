"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-lg border border-adfi-slate-200 bg-white px-3 py-2 text-sm text-adfi-slate-900 shadow-sm transition-all duration-300 ease-in-out",
          "placeholder:text-adfi-slate-400",
          "focus:border-adfi-blue-500 focus:outline-none focus:ring-2 focus:ring-adfi-blue-500/20 focus:shadow-md focus:shadow-adfi-blue-500/5",
          "hover:border-adfi-slate-300 hover:shadow-sm",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-adfi-slate-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input }; 