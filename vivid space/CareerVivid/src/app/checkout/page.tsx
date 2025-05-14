import { Suspense } from "react";
import CheckoutPage from "@/components/checkout/CheckoutPage";

export const metadata = {
  title: "Checkout - PrepFast Career Services",
  description: "Complete your purchase of PrepFast career services securely.",
};

function CheckoutContent() {
  return <CheckoutPage />;
}

export default function Checkout() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-16 pt-32">
        <div className="glass-effect p-8 animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-1/3 mb-8"></div>
          <div className="h-20 bg-gray-700 rounded mb-4"></div>
          <div className="h-20 bg-gray-700 rounded mb-4"></div>
          <div className="h-10 bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
} 