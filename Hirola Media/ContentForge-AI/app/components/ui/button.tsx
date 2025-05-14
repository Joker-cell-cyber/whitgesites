import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-onr-purple-400/50 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-onr-purple-500 to-onr-blue-500 text-white hover:from-onr-purple-600 hover:to-onr-blue-600 shadow-lg shadow-onr-purple-500/25 hover:shadow-onr-purple-500/40 hover:-translate-y-0.5",
        primary: "bg-gradient-to-r from-onr-purple-500 to-onr-blue-500 text-white hover:from-onr-purple-600 hover:to-onr-blue-600 shadow-lg shadow-onr-purple-500/25 hover:shadow-onr-purple-500/40 hover:-translate-y-0.5",
        secondary: "border-2 border-onr-blue-400/30 bg-onr-space-800/50 backdrop-blur-md text-onr-blue-100 hover:bg-onr-space-700/50 hover:border-onr-blue-400/50 hover:-translate-y-0.5",
        outline: "border border-onr-purple-400/50 text-onr-purple-200 hover:bg-onr-purple-900/30 hover:border-onr-purple-400/70",
        destructive: "bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-700 hover:to-red-600 shadow-lg shadow-red-600/25",
        subtle: "bg-onr-space-800/70 text-onr-blue-200 border border-onr-blue-400/20 hover:bg-onr-space-700/70 hover:border-onr-blue-400/40 backdrop-blur-md",
        ghost: "text-onr-blue-200 hover:bg-onr-space-800/70 hover:text-onr-blue-100",
        link: "text-onr-blue-300 underline-offset-4 hover:underline hover:text-onr-blue-200",
        glow: "bg-gradient-to-r from-onr-purple-500 to-onr-blue-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:shadow-[0_0_25px_rgba(168,85,247,0.65)] hover:from-onr-purple-600 hover:to-onr-blue-600 hover:-translate-y-0.5"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        md: "h-10 px-4 py-2",
        lg: "h-12 rounded-xl px-6 text-base",
        xl: "h-14 rounded-xl px-8 text-base",
        icon: "h-10 w-10",
      },
      fullWidth: {
        true: "w-full",
      },
      withIcon: {
        true: "inline-flex items-center gap-2",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  fullWidth?: boolean;
  withIcon?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, fullWidth, withIcon, isLoading, leftIcon, rightIcon, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, withIcon, className }))}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && (
          <span className="mr-2 animate-spin">
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </span>
        )}
        
        {leftIcon && !isLoading && <span className="mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants }; 