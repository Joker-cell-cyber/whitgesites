import { Metadata } from "next";
import { Suspense } from "react";
import CheckoutForm from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout - PokerSharper",
  description: "Complete your purchase of PokerSharper coaching services",
  robots: "noindex, nofollow",
};

function CheckoutContent() {
  return (
    <div className="py-16 bg-[#070a0c] felt-texture">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 font-montserrat text-center">
          Complete Your <span className="gradient-text">Purchase</span>
        </h1>
        <CheckoutForm />
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="py-16 bg-[#070a0c] felt-texture">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 font-montserrat text-center">
            Complete Your <span className="gradient-text">Purchase</span>
          </h1>
          <div className="max-w-6xl mx-auto p-8 bg-[#0E1317] rounded-lg border border-sky-900/20">
            <div className="flex justify-center items-center">
              <div className="animate-pulse">Loading checkout information...</div>
            </div>
          </div>
        </div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
} 