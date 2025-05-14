"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Define the package type based on what we saw in pricing page
export type Package = {
  price: number;
  name: string;
  description: string;
  features: string[];
  popular?: boolean;
};

type CheckoutContextType = {
  selectedPackage: Package | null;
  setSelectedPackage: (pkg: Package) => void;
  clearCheckout: () => void;
};

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  const clearCheckout = () => setSelectedPackage(null);

  return (
    <CheckoutContext.Provider
      value={{
        selectedPackage,
        setSelectedPackage,
        clearCheckout,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }
  return context;
} 