import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-[#1A7BA4] to-[#26A69A] text-white hover:from-[#166285] hover:to-[#1E8C82] shadow-sm hover:shadow-md transition-all duration-300 ease-in-out",
        destructive: "bg-[#FF6B6B] text-white hover:bg-[#EB5757] shadow-sm",
        outline: "border border-[#18BDD9]/70 bg-transparent text-[#1A7BA4] hover:bg-[#EBF8FC]",
        secondary: "bg-[#D3E9DD] text-[#14304D] hover:bg-[#BDE0D0]",
        ghost: "text-[#14304D] hover:bg-[#EBF8FC] hover:text-[#1A7BA4]",
        link: "text-[#18BDD9] underline-offset-4 hover:underline",
        ocean: "bg-[#14304D] text-white hover:bg-[#0B2538] shadow-sm",
        coral: "bg-[#EE7D69] text-white hover:bg-[#E56954] shadow-sm",
        wave: "relative overflow-hidden bg-[#18BDD9] text-white hover:bg-[#14A6BF] shadow-sm before:absolute before:inset-0 before:bg-[url('/patterns/wave-pattern.svg')] before:bg-repeat before:opacity-10 before:animate-pulse",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-lg px-6 text-base",
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