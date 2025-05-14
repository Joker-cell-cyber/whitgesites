import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-[#5F7138] to-[#7F8F55] text-white hover:from-[#4E5C2D] hover:to-[#6A7847] shadow-sm hover:shadow-md",
        destructive: "bg-[#B45A3C] text-white hover:bg-[#933F28] shadow-sm",
        outline: "border border-[#8A9D58]/70 bg-transparent text-[#5F7138] hover:bg-[#EBF1DD] hover:text-[#4E5C2D]",
        secondary: "bg-[#E8DFC7] text-[#4F4639] hover:bg-[#D9CFAF] shadow-sm",
        ghost: "text-[#4F4639] hover:bg-[#F8F4E9] hover:text-[#5F7138]",
        link: "text-[#7F8F55] underline-offset-4 underline hover:text-[#5F7138]",
        premium: "bg-gradient-to-r from-[#A69668] to-[#D4C690] text-white hover:from-[#8A7D57] hover:to-[#BFB27F] shadow-sm hover:shadow-md",
        seed: "relative overflow-hidden bg-[#8A9D58] text-white hover:bg-[#7F8F55] shadow-sm before:absolute before:inset-0 before:bg-[url('/patterns/seed-pattern.svg')] before:bg-repeat before:opacity-10 before:blur-[1px]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-lg px-10 text-base",
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