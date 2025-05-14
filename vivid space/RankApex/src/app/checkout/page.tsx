"use client";

import { useSearchParams } from "next/navigation";
import { useState, Suspense, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeftIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { COMPANY } from "../constants/company";

type CheckoutFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  zipCode: string;
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
  termsAccepted: boolean;
};

function CheckoutContent() {
  const searchParams = useSearchParams();
  const packageName = searchParams.get("package") || "Starter Boost";
  const packagePrice = parseFloat(searchParams.get("price") || "9.99");
  const game = searchParams.get("game") || "League of Legends";
  
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "United States",
    zipCode: "",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    termsAccepted: false,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [formError, setFormError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Format card number to limit to 16 characters
    if (name === 'cardNumber') {
      const sanitizedValue = value.replace(/\D/g, '');
      if (sanitizedValue.length <= 16) {
        setFormData((prev) => ({
          ...prev,
          [name]: sanitizedValue,
        }));
      }
      return;
    }
    
    // Format CVV to limit to 3 characters
    if (name === 'cvv') {
      const sanitizedValue = value.replace(/\D/g, '');
      if (sanitizedValue.length <= 3) {
        setFormData((prev) => ({
          ...prev,
          [name]: sanitizedValue,
        }));
      }
      return;
    }
    
    // Format expiry date as MM/YY
    if (name === 'expiryDate') {
      let sanitizedValue = value.replace(/\D/g, '');
      
      if (sanitizedValue.length > 4) {
        sanitizedValue = sanitizedValue.slice(0, 4);
      }
      
      // Format as MM/YY
      if (sanitizedValue.length > 2) {
        sanitizedValue = sanitizedValue.slice(0, 2) + '/' + sanitizedValue.slice(2);
      }
      
      setFormData((prev) => ({
        ...prev,
        [name]: sanitizedValue,
      }));
      return;
    }
    
    // Handle checkbox
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
      return;
    }
    
    // Default behavior for other fields
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email) {
      setFormError("Please fill in all required personal information");
      return false;
    }
    
    if (!formData.cardNumber || !formData.cardName || !formData.expiryDate || !formData.cvv) {
      setFormError("Please fill in all required payment information");
      return false;
    }
    
    if (!formData.termsAccepted) {
      setFormError("You must accept the terms and conditions to proceed");
      return false;
    }
    
    setFormError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate order processing
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setOrderComplete(true);
    } catch (_) {
      setFormError("An error occurred while processing your order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const countries = [
    { value: "United States", label: "United States" },
    { value: "United Kingdom", label: "United Kingdom" },
    { value: "France", label: "France" }
  ];

  return (
    <div className="bg-[#080f0d] min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {orderComplete ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0c1410] p-8 rounded-2xl shadow-xl max-w-2xl mx-auto text-center border border-rank-emerald-900/30"
          >
            <div className="w-20 h-20 bg-rank-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircleIcon className="w-12 h-12 text-rank-emerald-500" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
            <p className="text-gray-300 mb-6">
              Thank you for your purchase. We&apos;ve sent a confirmation email to {formData.email}.
              Our team will begin working on your boost immediately.
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-rank-emerald-600 to-rank-emerald-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-rank-emerald-600/20 transition-all duration-300"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Return to Home
            </Link>
          </motion.div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <Link
                href="/pricing"
                className="inline-flex items-center text-gray-400 hover:text-rank-emerald-400 transition-colors"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-1" />
                Back to Pricing
              </Link>
              <h1 className="text-2xl font-bold">Checkout</h1>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="bg-[#0c1410] rounded-2xl p-6 md:p-8 h-fit border border-rank-emerald-900/30">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Package</span>
                    <span className="font-medium">{packageName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Game</span>
                    <span className="font-medium">{game}</span>
                  </div>
                  <div className="border-t border-rank-emerald-900/30 my-4 pt-4">
                    <div className="flex justify-between text-lg">
                      <span className="font-medium">Total</span>
                      <span className="font-bold text-rank-emerald-400">${packagePrice.toFixed(2)}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mt-4">
                    Charges will appear as &quot;{COMPANY.descriptor}&quot; on your bank statement.
                  </p>
                </div>
              </div>
              
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="bg-[#0c1410] rounded-2xl p-6 md:p-8 border border-rank-emerald-900/30">
                  {formError && (
                    <div className="bg-rank-orange-900/30 border border-rank-orange-800 text-rank-orange-300 p-4 rounded-lg mb-6">
                      {formError}
                    </div>
                  )}
                  
                  <h2 className="text-xl font-bold mb-6">Personal Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div>
                      <label htmlFor="firstName" className="block text-sm text-gray-400 mb-2">First Name *</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full bg-card-accent border border-rank-emerald-900/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-rank-emerald-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm text-gray-400 mb-2">Last Name *</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full bg-card-accent border border-rank-emerald-900/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-rank-emerald-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm text-gray-400 mb-2">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-card-accent border border-rank-emerald-900/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-rank-emerald-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm text-gray-400 mb-2">Phone</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-card-accent border border-rank-emerald-900/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-rank-emerald-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="address" className="block text-sm text-gray-400 mb-2">Address</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full bg-card-accent border border-rank-emerald-900/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-rank-emerald-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-sm text-gray-400 mb-2">City</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full bg-card-accent border border-rank-emerald-900/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-rank-emerald-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="country" className="block text-sm text-gray-400 mb-2">Country *</label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full bg-card-accent border border-rank-emerald-900/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-rank-emerald-500"
                        required
                      >
                        {countries.map((country) => (
                          <option key={country.value} value={country.value}>
                            {country.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="zipCode" className="block text-sm text-gray-400 mb-2">Zip Code</label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className="w-full bg-card-accent border border-rank-emerald-900/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-rank-emerald-500"
                      />
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-bold mb-6 mt-8">Payment Information</h2>
                  <div className="space-y-4 mb-8">
                    <div className="md:col-span-2">
                      <label htmlFor="cardNumber" className="block text-sm text-gray-400 mb-2">Card Number *</label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="XXXX XXXX XXXX XXXX"
                        className="w-full bg-card-accent border border-rank-emerald-900/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-rank-emerald-500"
                        required
                        maxLength={16}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="cardName" className="block text-sm text-gray-400 mb-2">Cardholder Name *</label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        className="w-full bg-card-accent border border-rank-emerald-900/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-rank-emerald-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="expiryDate" className="block text-sm text-gray-400 mb-2">Expiry Date *</label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        className="w-full bg-card-accent border border-rank-emerald-900/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-rank-emerald-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block text-sm text-gray-400 mb-2">CVV *</label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        placeholder="XXX"
                        className="w-full bg-card-accent border border-rank-emerald-900/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-rank-emerald-500"
                        required
                        maxLength={3}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        name="termsAccepted"
                        checked={formData.termsAccepted}
                        onChange={handleChange}
                        className="mt-0.5 h-4 w-4 rounded border-gray-700 bg-card-accent text-rank-emerald-500 focus:ring-rank-emerald-500 focus:ring-offset-[#0c1410]"
                        required
                      />
                      <span className="text-sm text-gray-400">
                        I agree to the 
                        <Link href="/legal/terms" className="text-rank-emerald-400 hover:underline mx-1">
                          Terms of Service
                        </Link>
                        and
                        <Link href="/legal/privacy" className="text-rank-emerald-400 hover:underline mx-1">
                          Privacy Policy
                        </Link>
                      </span>
                    </label>
                  </div>
                  
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 bg-gradient-to-r from-rank-emerald-600 to-rank-emerald-500 rounded-lg font-medium text-white hover:shadow-lg hover:shadow-rank-emerald-600/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      'Complete Order'
                    )}
                  </button>
                  
                  <div className="flex items-center justify-center mt-4">
                    <div className="text-rank-emerald-400 mr-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                      </svg>
                    </div>
                    <span className="text-sm text-gray-400">Secure checkout - All payment information is encrypted</span>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
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