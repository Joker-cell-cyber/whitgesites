import { Suspense } from "react";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import { Metadata } from "next";
import { COMPANY } from "../constants/company";

export const metadata: Metadata = {
  title: `Checkout - ${COMPANY.serviceName}`,
  description: "Complete your purchase of gaming coaching packages",
};

function CheckoutContent() {
  return (
    <main className="relative overflow-hidden py-16 md:py-24">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#44D62C]/10 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-[#44D62C]/5 to-[#00FFFF]/5 rounded-full transform translate-x-1/4 translate-y-1/4 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Complete Your <span className="gradient-text">Order</span>
          </h1>
          <p className="text-gray-400 text-lg">
            You're just a few steps away from unlocking your gaming potential
          </p>
        </div>
        
        <CheckoutForm />
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <main className="relative overflow-hidden py-16 md:py-24">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Complete Your <span className="gradient-text">Order</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Loading your order details...
            </p>
          </div>
          <div className="max-w-3xl mx-auto bg-[#14172c] rounded-xl p-8 border border-gray-800 flex justify-center">
            <div className="animate-pulse">Loading checkout...</div>
          </div>
        </div>
      </main>
    }>
      <CheckoutContent />
    </Suspense>
  );
} 