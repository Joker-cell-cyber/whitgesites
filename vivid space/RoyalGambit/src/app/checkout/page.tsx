import CheckoutForm from "@/components/checkout/CheckoutForm";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export const metadata = {
  title: "Checkout - Your Chess Coach",
  description: "Complete your purchase and get started with your chess coaching program",
};

export default function CheckoutPage() {
  return (
    <div className="bg-[#0a1628] pt-24 pb-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8">
          <Link 
            href="/pricing" 
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ChevronLeftIcon className="w-5 h-5 mr-1" />
            Back to pricing
          </Link>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-8">
          Complete Your <span className="gradient-text">Purchase</span>
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CheckoutForm />
          </div>
          <div>
            <CheckoutSummary />
          </div>
        </div>
      </div>
    </div>
  );
} 