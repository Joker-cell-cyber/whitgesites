"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import OrderSuccess from "@/components/checkout/OrderSuccess";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const [packageName, setPackageName] = useState<string>("");
  const [packagePrice, setPackagePrice] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (searchParams) {
      const packageParam = searchParams.get("package");
      if (packageParam) {
        setPackageName(packageParam);
        // Find the package price based on the name - this is a mock implementation
        // In a real app, you'd fetch this from an API or store
        const priceMap: Record<string, number> = {
          "Starter": 9.9,
          "Essential": 19.9,
          "Standard": 29.9,
          "Enhanced": 39.9,
          "Pro": 49.9,
          "Elite": 59.9,
          "Premium": 69.9,
          "Advanced": 79.9,
          "Expert": 89.9,
          "Master": 99.9,
          "Ultimate": 109.9,
          "Legendary": 119.9,
          // Add prices for video editing packages if needed
          "Basic Short": 9.9,
          "Standard Short": 19.9,
          "Premium Short": 29.9,
          "Enhanced Short": 39.9,
          "Ultra Short": 49.9,
          "Basic Long": 59.9,
          "Standard Long": 69.9,
          "Enhanced Long": 79.9
        };
        setPackagePrice(priceMap[packageParam] || 0);
      }
    }
  }, [searchParams]);

  const handleSubmit = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  if (success) {
    return <OrderSuccess packageName={packageName} />;
  }

  return (
    <div className="bg-[--cyber-deep] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto lg:max-w-5xl">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl mb-8">Checkout</h1>
          
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
            <div className="lg:col-span-7">
              <CheckoutForm 
                packageName={packageName}
                packagePrice={packagePrice}
                onSubmit={handleSubmit}
                isLoading={loading}
              />
            </div>

            <div className="mt-10 lg:mt-0 lg:col-span-5">
              <CheckoutSummary packageName={packageName} packagePrice={packagePrice} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Checkout() {
  return (
    <Suspense fallback={
      <div className="bg-[--cyber-deep] min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto lg:max-w-5xl">
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl mb-8">Checkout</h1>
            <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
              <div className="lg:col-span-7">
                <div className="animate-pulse space-y-6">
                  <div className="h-12 bg-gray-700 rounded"></div>
                  <div className="h-12 bg-gray-700 rounded"></div>
                  <div className="h-12 bg-gray-700 rounded"></div>
                  <div className="h-12 bg-gray-700 rounded"></div>
                </div>
              </div>
              <div className="mt-10 lg:mt-0 lg:col-span-5">
                <div className="animate-pulse">
                  <div className="h-40 bg-gray-700 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
} 