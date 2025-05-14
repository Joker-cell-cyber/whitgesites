"use client";

import { Suspense } from "react";
import CheckoutForm from "@/components/checkout/CheckoutForm";

function CheckoutContent() {
  return (
    <main className="py-16 bg-gradient-to-b from-[#0a0a14] to-[#14141e]">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-3xl font-bold text-center mb-8">
          <span className="gradient-text">Complete Your Order</span>
        </h1>
        <CheckoutForm />
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <main className="py-16 bg-gradient-to-b from-[#0a0a14] to-[#14141e]">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="text-xl text-gray-300">Loading checkout...</div>
        </div>
      </main>
    }>
      <CheckoutContent />
    </Suspense>
  );
} 