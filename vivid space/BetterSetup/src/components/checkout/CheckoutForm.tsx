"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCheckout } from "./CheckoutContext";
import OrderSummary from "./OrderSummary";
import { COMPANY } from "@/app/constants/company";

export default function CheckoutForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { formData, setFormField, consentAccepted, setConsentAccepted } = useCheckout();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Get product details from URL parameters
  const productName = searchParams.get("name");
  const productPrice = searchParams.get("price");
  const productCategory = searchParams.get("category");
  const productDescription = searchParams.get("description");

  const { selectedProduct, setSelectedProduct } = useCheckout();

  // Set the selected product from URL parameters if available
  useEffect(() => {
    if (productName && productPrice) {
      setSelectedProduct({
        name: productName,
        price: parseFloat(productPrice),
        description: productDescription || "",
        category: productCategory || "",
      });
    }
  }, [productName, productPrice, productDescription, productCategory, setSelectedProduct]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedProduct) {
      alert("No product selected");
      return;
    }
    
    if (!consentAccepted) {
      alert("You must accept the terms and consent to be charged");
      return;
    }
    
    // Validate form
    const requiredFields = [
      "firstName", "lastName", "email", 
      "address", "city", "postalCode", "country",
      "cardNumber", "cardExpiry", "cardCvc"
    ];
    
    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        alert(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field`);
        return;
      }
    }
    
    // Show loading state
    setIsSubmitting(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderSuccess(true);
    }, 1500);
  };

  if (orderSuccess) {
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <div className="mb-6 text-green-600">
          <svg className="w-20 h-20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-black">Order Successful!</h2>
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. We&apos;ve sent a confirmation email with further details.
        </p>
        <button
          onClick={() => router.push('/')}
          className="px-6 py-3 bg-notion-accent-500 text-white rounded-lg font-medium button-hand-drawn"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Order Summary */}
      <div className="lg:col-span-4 order-2 lg:order-1">
        <OrderSummary />
      </div>
      
      {/* Checkout Form */}
      <div className="lg:col-span-8 order-1 lg:order-2">
        <div className="card-hand-drawn bg-white p-6">
          <h2 className="text-xl font-bold mb-6 text-black">Checkout Information</h2>
          
          <form onSubmit={handleSubmit}>
            {/* Personal Information */}
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4 text-black">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormField("firstName", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormField("lastName", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormField("email", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            
            {/* Billing Address */}
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4 text-black">Billing Address</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormField("address", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormField("city", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      value={formData.postalCode}
                      onChange={(e) => setFormField("postalCode", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>
                    <select
                      id="country"
                      value={formData.country}
                      onChange={(e) => setFormField("country", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      required
                    >
                      <option value="">Select a country</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="France">France</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Payment Information */}
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4 text-black">Payment Information</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    value={formData.cardNumber}
                    onChange={(e) => setFormField("cardNumber", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    placeholder="•••• •••• •••• ••••"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-1">
                      Expiration Date
                    </label>
                    <input
                      type="text"
                      id="cardExpiry"
                      value={formData.cardExpiry}
                      onChange={(e) => setFormField("cardExpiry", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="cardCvc" className="block text-sm font-medium text-gray-700 mb-1">
                      CVC
                    </label>
                    <input
                      type="text"
                      id="cardCvc"
                      value={formData.cardCvc}
                      onChange={(e) => setFormField("cardCvc", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      placeholder="•••"
                      required
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Charges will appear as &quot;{COMPANY.serviceName}&quot; on your bank statement.
                </p>
              </div>
            </div>
            
            {/* Consent */}
            <div className="mb-8">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="consent"
                    name="consent"
                    type="checkbox"
                    checked={consentAccepted}
                    onChange={(e) => setConsentAccepted(e.target.checked)}
                    className="w-4 h-4 border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="consent" className="font-medium text-gray-700">
                    I consent to be charged for the selected product and accept the{" "}
                    <a href="/legal/terms" className="text-notion-accent-600 hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="/legal/privacy" className="text-notion-accent-600 hover:underline">
                      Privacy Policy
                    </a>
                  </label>
                </div>
              </div>
            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-lg font-medium transition-colors button-hand-drawn ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Processing..." : "Complete Purchase"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 