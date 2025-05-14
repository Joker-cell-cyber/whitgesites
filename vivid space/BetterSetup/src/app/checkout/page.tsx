"use client";

import { Suspense } from "react";
import CheckoutForm from "@/components/checkout/CheckoutForm";

function CheckoutContent() {
  return (
    <div className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-black">
            Complete Your <span className="hand-drawn-accent">Purchase</span>
          </h1>
          
          <CheckoutForm />
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="text-xl text-gray-800">Loading checkout...</div>
        </div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
} 