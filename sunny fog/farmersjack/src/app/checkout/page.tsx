import { Metadata } from "next";
import CheckoutForm from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout | FarmersJack",
  description: "Complete your purchase of premium gaming services.",
};

export default function CheckoutPage() {
  return (
    <main className="bg-[#070b14] min-h-screen relative">
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
      
      {/* Glow effects */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-toxic-green-900/20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-neon-pink-900/20 rounded-full blur-[100px]"></div>
      
      <div className="relative z-10 py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-white text-center">
              Complete Your <span className="text-toxic-green-500">Purchase</span>
            </h1>
            <CheckoutForm />
          </div>
        </div>
      </div>
    </main>
  );
} 