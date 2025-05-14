"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type Package = {
  name: string;
  price: number;
  description: string;
  features: string[];
  tier: 'micro' | 'mid' | 'established';
};

type CartContextType = {
  selectedPackage: Package | null;
  setSelectedPackage: (pkg: Package | null) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  const clearCart = () => {
    setSelectedPackage(null);
  };

  return (
    <CartContext.Provider value={{ selectedPackage, setSelectedPackage, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}; 