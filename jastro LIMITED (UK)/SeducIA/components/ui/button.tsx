import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-[#FF5C3E] to-[#FFA728] text-white hover:from-[#F05538] hover:to-[#F5961F] shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105",
        destructive: "bg-[#FF3A5E] text-white hover:bg-[#E52B4D] shadow-sm",
        outline: "border-2 border-[#FFA728] bg-transparent text-[#FF5C3E] hover:bg-[#FFF8F0]",
        secondary: "bg-[#FFF8F0] text-[#E74F2C] hover:bg-[#FFE8D0]",
        ghost: "text-[#E74F2C] hover:bg-[#FFF8F0]",
        link: "text-[#FF5C3E] underline-offset-4 hover:underline",
        vibrant: "bg-[#FF3A5E] text-white hover:bg-[#E52B4D] shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105",
        subtle: "bg-[#FFEBE2] text-[#E74F2C] hover:bg-[#FFD5C2] shadow-sm",
        glow: "relative bg-gradient-to-r from-[#FF5C3E] to-[#FFA728] text-white hover:from-[#F05538] hover:to-[#F5961F] shadow-md hover:shadow-lg transition-all duration-300 ease-in-out after:absolute after:inset-0 after:bg-gradient-to-r after:from-[#FF5C3E] after:to-[#FFA728] after:blur-md after:opacity-50 after:-z-10 hover:after:opacity-75",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-lg px-8 text-base font-semibold",
        icon: "h-10 w-10",
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
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants }; 