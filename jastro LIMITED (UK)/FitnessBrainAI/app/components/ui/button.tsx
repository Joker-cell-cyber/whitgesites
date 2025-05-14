import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#A590DC] hover:bg-[#9480CB] text-white shadow-sm hover:shadow-md transition-all duration-300 ease-in-out",
        destructive: "bg-[#F2889B] text-white hover:bg-[#E0758A]",
        outline: "border border-[#D0C9E8] bg-transparent text-[#6C5F9B] hover:bg-[#F5F2FC]",
        secondary: "bg-[#D0C9E8] text-[#6C5F9B] hover:bg-[#BEB5DB]",
        ghost: "hover:bg-[#F5F2FC] text-[#6C5F9B]",
        link: "text-[#A590DC] underline-offset-4 hover:underline",
        soft: "bg-[#F2E6FF] text-[#6C5F9B] hover:bg-[#E5D9F2] transition-all duration-300",
        minimal: "bg-white border border-[#E5E7EB] text-[#6C5F9B] hover:border-[#D0C9E8] shadow-sm hover:shadow transition-all duration-300",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-lg px-6 text-base",
        icon: "h-9 w-9",
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