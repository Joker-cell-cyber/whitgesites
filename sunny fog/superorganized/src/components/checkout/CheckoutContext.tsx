"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define types
export type Product = {
  name: string;
  price: number;
  description: string;
  category?: string;
};

type CheckoutContextType = {
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    cardNumber: string;
    cardExpiry: string;
    cardCvc: string;
  };
  setFormField: (field: string, value: string) => void;
  consentAccepted: boolean;
  setConsentAccepted: (value: boolean) => void;
};

// Create context with default values
const CheckoutContext = createContext<CheckoutContextType>({
  selectedProduct: null,
  setSelectedProduct: () => {},
  formData: {
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  },
  setFormField: () => {},
  consentAccepted: false,
  setConsentAccepted: () => {},
});

export const useCheckout = () => useContext(CheckoutContext);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });
  const [consentAccepted, setConsentAccepted] = useState(false);

  const setFormField = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <CheckoutContext.Provider
      value={{
        selectedProduct,
        setSelectedProduct,
        formData,
        setFormField,
        consentAccepted,
        setConsentAccepted,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
} 