import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-white transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-adfi-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-adfi-blue-600 text-white hover:bg-adfi-blue-700 shadow-lg shadow-adfi-blue-600/15 hover:shadow-adfi-blue-600/25 hover:-translate-y-0.5 active:translate-y-0 active:shadow-inner",
        primary: "bg-adfi-blue-600 text-white hover:bg-adfi-blue-700 shadow-lg shadow-adfi-blue-600/15 hover:shadow-adfi-blue-600/25 hover:-translate-y-0.5 active:translate-y-0 active:shadow-inner",
        secondary: "bg-white text-adfi-slate-900 hover:bg-adfi-slate-50 border border-adfi-slate-200 hover:border-adfi-slate-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-inner",
        outline: "border border-adfi-slate-200 bg-transparent hover:bg-adfi-slate-50 text-adfi-slate-800 hover:border-adfi-slate-300 hover:shadow-sm active:shadow-inner",
        destructive: "bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-600/15 hover:shadow-red-600/25 hover:-translate-y-0.5 active:translate-y-0 active:shadow-inner",
        ghost: "hover:bg-adfi-slate-100 text-adfi-slate-800 hover:text-adfi-slate-900 hover:shadow-sm active:shadow-inner",
        link: "text-adfi-blue-600 underline-offset-4 hover:underline hover:text-adfi-blue-700 transition-colors",
        gradient: "bg-gradient-to-r from-adfi-blue-600 to-adfi-blue-500 text-white hover:from-adfi-blue-700 hover:to-adfi-blue-600 shadow-lg shadow-adfi-blue-600/15 hover:shadow-adfi-blue-600/25 hover:-translate-y-0.5 active:translate-y-0 active:shadow-inner relative overflow-hidden before:absolute before:inset-0 before:bg-white/10 before:translate-x-[-100%] hover:before:animate-shimmer"
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
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, fullWidth, isLoading, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        <span className="relative z-10">{children}</span>
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants }; 