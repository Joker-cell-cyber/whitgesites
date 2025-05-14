"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCheckout } from "@/lib/checkout-context";
import { ButtonHTMLAttributes } from "react";

interface BuyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  packageData: {
    name: string;
    price: number;
    tier?: string;
    duration: string;
    complexity: string;
    description: string;
    features: string[];
    delivery: string;
    popular?: boolean;
  };
  variant?: "game" | "outline" | "default";
  className?: string;
}

export default function BuyButton({ 
  packageData, 
  variant = "game", 
  className = "", 
  ...props 
}: BuyButtonProps) {
  const router = useRouter();
  const { setSelectedPackage } = useCheckout();
  
  const handleBuyClick = () => {
    setSelectedPackage(packageData);
    router.push("/checkout");
  };
  
  return (
    <Button
      onClick={handleBuyClick}
      variant={variant}
      className={`font-mono ${className}`}
      {...props}
    >
      BUY NOW
    </Button>
  );
} 