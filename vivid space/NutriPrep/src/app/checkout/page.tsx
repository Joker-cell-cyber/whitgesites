"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { COMPANY } from "../constants/company";

// Types
type MealPlan = {
  name: string;
  price: number;
  category: string;
};

function CheckoutContent() {
  const searchParams = useSearchParams();
  const [selectedPlan, setSelectedPlan] = useState<MealPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [consent, setConsent] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    country: "United States",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });

  useEffect(() => {
    // Get product details from URL parameters
    const planName = searchParams.get("plan");
    const planPrice = searchParams.get("price");
    const planCategory = searchParams.get("category");

    if (planName && planPrice && planCategory) {
      setSelectedPlan({
        name: planName,
        price: parseFloat(planPrice),
        category: planCategory,
      });
    }
    
    setLoading(false);
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      // Cast to HTMLInputElement to access checked property
      const target = e.target as HTMLInputElement;
      setConsent(target.checked);
    } else if (name === "cardNumber") {
      // Limit card number to 16 digits
      const numbersOnly = value.replace(/\D/g, '');
      if (numbersOnly.length <= 16) {
        setFormData({
          ...formData,
          [name]: numbersOnly,
        });
      }
    } else if (name === "cardExpiry") {
      // Format MM/YY automatically
      const numbersOnly = value.replace(/\D/g, '');
      let formatted = '';

      if (numbersOnly.length > 0) {
        // First add the month part (max 2 digits)
        formatted = numbersOnly.substring(0, 2);
        
        // If we have more than 2 digits, add the year part
        if (numbersOnly.length > 2) {
          formatted += '/' + numbersOnly.substring(2, 4);
        }
      }

      setFormData({
        ...formData,
        [name]: formatted,
      });
    } else if (name === "cardCvc") {
      // Limit CVC to 3 digits
      const numbersOnly = value.replace(/\D/g, '');
      if (numbersOnly.length <= 3) {
        setFormData({
          ...formData,
          [name]: numbersOnly,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    alert("Thank you for your order! This is a simulation for compliance purposes.");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading checkout...</div>
      </div>
    );
  }

  if (!selectedPlan) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">No Plan Selected</h1>
        <p className="mb-6 text-gray-600">Please select a meal plan from our pricing page.</p>
        <Link 
          href="/pricing" 
          className="px-6 py-3 bg-gradient-to-r from-turquoise-600 to-purple-500 text-white rounded-lg font-medium"
        >
          View Plans
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold">Checkout</h1>
          <p className="text-gray-600 mt-2">Complete your purchase</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-6">Billing Information</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-turquoise-500 focus:border-turquoise-500"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-turquoise-500 focus:border-turquoise-500"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-turquoise-500 focus:border-turquoise-500"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-turquoise-500 focus:border-turquoise-500"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-turquoise-500 focus:border-turquoise-500"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-turquoise-500 focus:border-turquoise-500"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-turquoise-500 focus:border-turquoise-500"
                      value={formData.country}
                      onChange={handleInputChange}
                    >
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="France">France</option>
                    </select>
                  </div>
                </div>

                <h2 className="text-xl font-semibold mb-6">Payment Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="md:col-span-2">
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      required
                      placeholder="0000000000000000"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-turquoise-500 focus:border-turquoise-500"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      maxLength={16}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-1">
                      Expiration Date
                    </label>
                    <input
                      type="text"
                      id="cardExpiry"
                      name="cardExpiry"
                      required
                      placeholder="MM/YY"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-turquoise-500 focus:border-turquoise-500"
                      value={formData.cardExpiry}
                      onChange={handleInputChange}
                      maxLength={5}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="cardCvc" className="block text-sm font-medium text-gray-700 mb-1">
                      CVC
                    </label>
                    <input
                      type="text"
                      id="cardCvc"
                      name="cardCvc"
                      required
                      placeholder="000"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-turquoise-500 focus:border-turquoise-500"
                      value={formData.cardCvc}
                      onChange={handleInputChange}
                      maxLength={3}
                    />
                  </div>
                </div>
                
                <div className="bg-turquoise-50 border border-turquoise-200 rounded-lg p-4 mb-6">
                  <p className="text-turquoise-800 text-sm">
                    Charges will appear as &quot;{COMPANY.descriptor}&quot; on your bank statement.
                  </p>
                </div>

                <div className="mb-8">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      required
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-1 text-turquoise-500 focus:ring-turquoise-500 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      I agree to the <Link href="/legal/terms" className="text-turquoise-600 hover:underline">Terms of Service</Link> and <Link href="/legal/privacy" className="text-turquoise-600 hover:underline">Privacy Policy</Link>.
                    </span>
                  </label>
                </div>
                
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-turquoise-600 to-purple-500 text-white rounded-lg hover:from-turquoise-700 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-turquoise-500 focus:ring-offset-2 font-medium transition-colors"
                >
                  Complete Purchase
                </button>
              </form>
            </div>
          </div>
          
          {/* Right column - Order summary */}
          <div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              
              <div className="flex justify-between mb-4">
                <span className="font-medium">{selectedPlan.name} {selectedPlan.category} Plan</span>
                <span>${selectedPlan.price.toFixed(2)}</span>
              </div>
              
              <div className="border-t border-gray-200 my-4 pt-4">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${selectedPlan.price.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">One-time payment, no recurring charges</p>
              </div>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <svg className="h-5 w-5 text-turquoise-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-600">Instant access to meal plans</span>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="h-5 w-5 text-turquoise-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-600">Secure payment processing</span>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="h-5 w-5 text-turquoise-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-600">30-day guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
} 