"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { COMPANY } from "@/app/constants/company";

interface OrderSummary {
  name: string;
  price: number;
  category: string;
}

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const [orderSummary, setOrderSummary] = useState<OrderSummary | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    country: "United States",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    termsAccepted: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const countries = ["United States", "United Kingdom", "France"];

  useEffect(() => {
    // Get product information from URL parameters
    const name = searchParams.get("name");
    const price = searchParams.get("price");
    const category = searchParams.get("category");

    if (name && price && category) {
      setOrderSummary({
        name,
        price: parseFloat(price),
        category,
      });
    }
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (name === "cardNumber") {
      // Limit to 16 characters
      const cardValue = value.replace(/\D/g, '').slice(0, 16);
      setFormData({
        ...formData,
        [name]: cardValue,
      });
    } else if (name === "cardExpiry") {
      // Format as MM/YY
      const expiry = value.replace(/\D/g, '');
      
      if (expiry.length <= 2) {
        setFormData({
          ...formData,
          [name]: expiry,
        });
      } else {
        setFormData({
          ...formData,
          [name]: `${expiry.slice(0, 2)}/${expiry.slice(2, 4)}`,
        });
      }
    } else if (name === "cardCvc") {
      // Limit to 3 characters
      const cvcValue = value.replace(/\D/g, '').slice(0, 3);
      setFormData({
        ...formData,
        [name]: cvcValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsCompleted(true);
    }, 2000);
  };

  // Generate a random price suffix
  const getRandomPriceSuffix = () => {
    const suffixes = ['.50', '.90', '.99'];
    const randomIndex = Math.floor(Math.random() * suffixes.length);
    return suffixes[randomIndex];
  };

  // Format the price with a random suffix
  const formatPrice = (price: number) => {
    const basePrice = Math.floor(price);
    return basePrice + getRandomPriceSuffix();
  };

  // Format the price with a random suffix if not already formatted
  const price = orderSummary?.price.toString().includes(".") 
    ? orderSummary.price 
    : parseFloat(formatPrice(orderSummary?.price || 0));

  if (isCompleted) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="glass-effect p-8 text-center">
          <svg
            className="w-16 h-16 text-prep-teal-500 mx-auto mb-6 animate-float"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <h2 className="responsive-heading mb-4 gradient-text">Order Confirmed!</h2>
          <p className="responsive-subtitle mb-8">
            Thank you for your purchase. You will receive a confirmation email shortly.
          </p>
          <Link
            href="/"
            className="button-glow px-6 py-3 bg-gradient-to-r from-[#0078D7] to-[#00B2A9] text-white font-medium rounded-lg"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!orderSummary) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h2 className="responsive-heading mb-4">No product selected</h2>
        <p className="responsive-subtitle mb-8">Please select a product from our pricing page.</p>
        <Link
          href="/pricing"
          className="button-glow px-6 py-3 bg-gradient-to-r from-[#0078D7] to-[#00B2A9] text-white font-medium rounded-lg"
        >
          View Pricing
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="responsive-heading mb-10 text-center gradient-text">Secure Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="glass-effect p-6">
            <h2 className="text-xl font-semibold mb-4 pb-4 border-b border-gray-700">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-lg">{orderSummary?.name}</p>
                  <p className="text-sm text-gray-400">{orderSummary?.category}</p>
                </div>
                <p className="font-medium text-lg">${price.toFixed(2)}</p>
              </div>
              
              <div className="pt-4 border-t border-gray-700 mt-6">
                <div className="flex justify-between items-center">
                  <p className="text-lg font-bold gradient-text">Total</p>
                  <p className="text-lg font-bold">${price.toFixed(2)}</p>
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-400">
                <p>Charges will appear as &quot;{COMPANY.descriptor}&quot; on your bank statement.</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Checkout Form */}
        <div className="lg:w-2/3">
          <form onSubmit={handleSubmit} className="glass-effect p-6">
            <h2 className="text-xl font-semibold mb-6">Payment Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-[#0078D7] focus:border-[#0078D7]"
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-[#0078D7] focus:border-[#0078D7]"
                />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-[#0078D7] focus:border-[#0078D7]"
                />
              </div>
              
              <div>
                <label htmlFor="country" className="block text-sm font-medium mb-1">
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-[#0078D7] focus:border-[#0078D7]"
                >
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium mb-1">
                  Billing Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-[#0078D7] focus:border-[#0078D7]"
                />
              </div>
            </div>
            
            <h3 className="text-lg font-medium mb-4">Card Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="md:col-span-2">
                <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  required
                  maxLength={16}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-[#0078D7] focus:border-[#0078D7]"
                />
              </div>
              
              <div>
                <label htmlFor="cardExpiry" className="block text-sm font-medium mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  id="cardExpiry"
                  name="cardExpiry"
                  value={formData.cardExpiry}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  required
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-[#0078D7] focus:border-[#0078D7]"
                />
              </div>
              
              <div>
                <label htmlFor="cardCvc" className="block text-sm font-medium mb-1">
                  CVC
                </label>
                <input
                  type="text"
                  id="cardCvc"
                  name="cardCvc"
                  value={formData.cardCvc}
                  onChange={handleInputChange}
                  placeholder="123"
                  required
                  maxLength={3}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-[#0078D7] focus:border-[#0078D7]"
                />
              </div>
            </div>
            
            <div className="mb-8">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="termsAccepted"
                    name="termsAccepted"
                    type="checkbox"
                    checked={formData.termsAccepted}
                    onChange={handleInputChange}
                    required
                    className="h-4 w-4 text-[#0078D7] focus:ring-[#00B2A9] border-gray-700 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="termsAccepted" className="font-medium">
                    I agree to be charged ${price.toFixed(2)} for {orderSummary?.name} and accept the{" "}
                    <Link href="/legal/terms" className="text-[#00B2A9] hover:underline">
                      Terms and Conditions
                    </Link>
                  </label>
                </div>
              </div>
            </div>
            
            <div>
              <p className="mb-6 text-sm text-gray-400">
                We accept credit card payments only. Your payment information is securely processed.
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
                  isSubmitting
                    ? "bg-gray-600"
                    : "button-glow bg-gradient-to-r from-[#0078D7] to-[#00B2A9] hover:opacity-90"
                }`}
              >
                {isSubmitting ? "Processing..." : `Pay $${price.toFixed(2)}`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 