"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Product = {
  name: string;
  price: number;
  duration: string;
  level?: string;
};

type ProductContextType = {
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product) => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Initialize from localStorage if available
  useEffect(() => {
    const storedProduct = localStorage.getItem("selectedProduct");
    if (storedProduct) {
      try {
        setSelectedProduct(JSON.parse(storedProduct));
      } catch (e) {
        console.error("Error parsing stored product:", e);
      }
    }
  }, []);
  
  // Store to localStorage when product changes
  useEffect(() => {
    if (selectedProduct) {
      localStorage.setItem("selectedProduct", JSON.stringify(selectedProduct));
    }
  }, [selectedProduct]);
  
  return (
    <ProductContext.Provider value={{ selectedProduct, setSelectedProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
}; 