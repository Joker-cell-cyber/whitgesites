import { Metadata } from "next";
import { Suspense } from "react";
import CheckoutForm from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout - ContentScript",
  description: "Complete your purchase of script writing services",
  robots: "noindex, nofollow",
};

function CheckoutContent() {
  return (
    <div className="bg-gray-50 py-12 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">Complete Your Order</h1>
        <CheckoutForm />
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="bg-gray-50 py-12 min-h-screen">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-8 text-gray-900">Complete Your Order</h1>
          <div className="p-6 bg-white rounded-lg shadow">Loading checkout details...</div>
        </div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
} 