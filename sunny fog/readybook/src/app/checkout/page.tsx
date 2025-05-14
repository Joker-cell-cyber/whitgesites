import { Suspense } from "react";
import Checkout from "@/components/checkout/Checkout";

export const metadata = {
  title: "Checkout - ReadyBook E-Book Writing Services",
  description: "Complete your order for professional e-book writing services.",
};

function CheckoutContent() {
  return <Checkout />;
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
            <p className="text-gray-600 mt-2">Loading your order details...</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden p-6 animate-pulse">
            <div className="h-6 bg-gray-200 rounded-full w-1/4 mb-4"></div>
            <div className="h-12 bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-12 bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-12 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
} 