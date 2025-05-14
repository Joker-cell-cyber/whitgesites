import { Metadata } from "next";
import { Suspense } from "react";
import CheckoutForm from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout - ProTranslator",
  description: "Complete your professional translation order with ProTranslator.",
};

function CheckoutContent() {
  return (
    <div className="py-20 pt-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-900/10 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-600/5 to-indigo-500/5 rounded-full transform translate-x-1/4 translate-y-1/4 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Complete your <span className="text-gradient-blue">order</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Please fill in the information below to confirm your order
          </p>
        </div>

        <CheckoutForm />
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="py-20 pt-32 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Complete your <span className="text-gradient-blue">order</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Loading checkout information...
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-12 bg-gray-700/30 rounded-lg"></div>
              <div className="h-12 bg-gray-700/30 rounded-lg"></div>
              <div className="h-12 bg-gray-700/30 rounded-lg"></div>
              <div className="h-12 bg-gray-700/30 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
} 