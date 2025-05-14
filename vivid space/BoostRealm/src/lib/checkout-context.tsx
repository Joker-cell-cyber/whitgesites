"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type PackageType = {
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

type CheckoutContextType = {
  selectedPackage: PackageType | null;
  setSelectedPackage: (pkg: PackageType | null) => void;
};

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [selectedPackage, setSelectedPackage] = useState<PackageType | null>(null);

  return (
    <CheckoutContext.Provider
      value={{
        selectedPackage,
        setSelectedPackage,
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