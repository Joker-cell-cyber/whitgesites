"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import OrderSummary from "@/components/checkout/OrderSummary";
import CheckoutSuccess from "@/components/checkout/CheckoutSuccess";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const [orderCompleted, setOrderCompleted] = useState(false);
  
  const productName = searchParams.get("name") || "Standard Plan";
  const productPrice = parseFloat(searchParams.get("price") || "29.90");
  const productDescription = searchParams.get("description") || "Professional service package";
  
  // Parse features from URL if they exist
  const featuresParam = searchParams.get("features");
  const features = featuresParam ? JSON.parse(decodeURIComponent(featuresParam)) : [
    "Full service package",
    "24/7 support",
    "Fast delivery"
  ];

  // Handle successful payment
  const handlePaymentSuccess = () => {
    setOrderCompleted(true);
  };

  // If order is completed, show success screen
  if (orderCompleted) {
    return (
      <div className="container mx-auto px-4 py-16">
        <CheckoutSuccess />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-cs-navy-900 text-center mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CheckoutForm 
              productName={productName}
              productPrice={productPrice}
              onSuccess={handlePaymentSuccess}
            />
          </motion.div>
        </div>
        
        <div>
          <OrderSummary 
            productName={productName}
            productPrice={productPrice}
            productDescription={productDescription}
            features={features}
          />
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-16 text-center">Loading checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
} 