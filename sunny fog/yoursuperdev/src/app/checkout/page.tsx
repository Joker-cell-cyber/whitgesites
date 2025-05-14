"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Container } from "../components/ui/Container";
import { COMPANY } from "../constants/company";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const [selectedPlan, setSelectedPlan] = useState({
    id: "",
    name: "Plan",
    price: 0,
    description: ""
  });
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    country: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    consentChecked: false
  });
  
  // Validation state
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    address?: string;
    city?: string;
    country?: string;
    cardNumber?: string;
    cardExpiry?: string;
    cardCvc?: string;
    consentChecked?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    // Get plan from URL parameters
    const planId = searchParams.get("plan");
    const planName = searchParams.get("name");
    const planPrice = searchParams.get("price");
    const planDescription = searchParams.get("description");
    
    if (planId && planName && planPrice) {
      setSelectedPlan({
        id: planId,
        name: planName,
        price: parseFloat(planPrice),
        description: planDescription || ""
      });
    }
  }, [searchParams]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };
  
  const validateForm = () => {
    const newErrors: {
      firstName?: string;
      lastName?: string;
      email?: string;
      address?: string;
      city?: string;
      country?: string;
      cardNumber?: string;
      cardExpiry?: string;
      cardCvc?: string;
      consentChecked?: string;
    } = {};
    
    // Required fields validation
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    
    // Card validation
    if (!formData.cardNumber.trim()) newErrors.cardNumber = "Card number is required";
    if (!formData.cardExpiry.trim()) newErrors.cardExpiry = "Expiry date is required";
    if (!formData.cardCvc.trim()) newErrors.cardCvc = "CVC is required";
    
    // Consent validation
    if (!formData.consentChecked) newErrors.consentChecked = "You must agree to the terms";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate processing
      setTimeout(() => {
        // Show success message or redirect
        alert("Payment processed successfully! This is a simulated transaction for compliance check purposes only.");
        setIsSubmitting(false);
      }, 1500);
    }
  };
  
  return (
    <>
      <Navbar />
      <main className="pt-28 bg-zinc-950 min-h-screen">
        {/* Decorative elements */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px] transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-pink-900/10 rounded-full blur-[120px] transform -translate-x-1/2 translate-y-1/2" />
        </div>
        
        <section className="py-12 relative z-10">
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <motion.h1
                className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Checkout
              </motion.h1>
              <motion.p
                className="text-zinc-400 text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Complete your purchase
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 sticky top-28">
                  <h2 className="text-xl font-semibold text-white mb-6">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Plan</span>
                      <span className="text-white font-medium">{selectedPlan.name}</span>
                    </div>
                    {selectedPlan.description && (
                      <div className="text-sm text-zinc-500">{selectedPlan.description}</div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Price</span>
                      <span className="text-white font-medium">${selectedPlan.price.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-zinc-800">
                    <div className="flex justify-between mb-4">
                      <span className="text-zinc-400">Subtotal</span>
                      <span className="text-white font-medium">${selectedPlan.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold">
                      <span className="text-white">Total</span>
                      <span className="text-white">${selectedPlan.price.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-zinc-800">
                    <p className="text-sm text-zinc-400 font-medium">
                      <strong>Charges will appear as "{COMPANY.descriptor}" on your bank statement.</strong>
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Checkout Form */}
              <div className="lg:col-span-2">
                <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Billing Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-zinc-400 mb-1">First Name</label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`w-full bg-zinc-800/60 border ${errors.firstName ? 'border-red-500' : 'border-zinc-700'} rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50`}
                        />
                        {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-zinc-400 mb-1">Last Name</label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={`w-full bg-zinc-800/60 border ${errors.lastName ? 'border-red-500' : 'border-zinc-700'} rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50`}
                        />
                        {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-1">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full bg-zinc-800/60 border ${errors.email ? 'border-red-500' : 'border-zinc-700'} rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50`}
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-zinc-400 mb-1">Address</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className={`w-full bg-zinc-800/60 border ${errors.address ? 'border-red-500' : 'border-zinc-700'} rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50`}
                      />
                      {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-zinc-400 mb-1">City</label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className={`w-full bg-zinc-800/60 border ${errors.city ? 'border-red-500' : 'border-zinc-700'} rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50`}
                        />
                        {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
                      </div>
                      <div>
                        <label htmlFor="country" className="block text-sm font-medium text-zinc-400 mb-1">Country</label>
                        <select
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={(e) => setFormData({...formData, country: e.target.value})}
                          className={`w-full bg-zinc-800/60 border ${errors.country ? 'border-red-500' : 'border-zinc-700'} rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50`}
                        >
                          <option value="">Select a country</option>
                          <option value="United States">United States</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="France">France</option>
                        </select>
                        {errors.country && <p className="mt-1 text-sm text-red-500">{errors.country}</p>}
                      </div>
                    </div>
                    
                    <h2 className="text-xl font-semibold text-white mb-4 pt-4">Payment Details</h2>
                    
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-zinc-400 mb-1">Card Number</label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="XXXX XXXX XXXX XXXX"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className={`w-full bg-zinc-800/60 border ${errors.cardNumber ? 'border-red-500' : 'border-zinc-700'} rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50`}
                      />
                      {errors.cardNumber && <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="cardExpiry" className="block text-sm font-medium text-zinc-400 mb-1">Expiry Date</label>
                        <input
                          type="text"
                          id="cardExpiry"
                          name="cardExpiry"
                          placeholder="MM/YY"
                          value={formData.cardExpiry}
                          onChange={handleInputChange}
                          className={`w-full bg-zinc-800/60 border ${errors.cardExpiry ? 'border-red-500' : 'border-zinc-700'} rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50`}
                        />
                        {errors.cardExpiry && <p className="mt-1 text-sm text-red-500">{errors.cardExpiry}</p>}
                      </div>
                      <div>
                        <label htmlFor="cardCvc" className="block text-sm font-medium text-zinc-400 mb-1">CVC</label>
                        <input
                          type="text"
                          id="cardCvc"
                          name="cardCvc"
                          placeholder="XXX"
                          value={formData.cardCvc}
                          onChange={handleInputChange}
                          className={`w-full bg-zinc-800/60 border ${errors.cardCvc ? 'border-red-500' : 'border-zinc-700'} rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50`}
                        />
                        {errors.cardCvc && <p className="mt-1 text-sm text-red-500">{errors.cardCvc}</p>}
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="consentChecked"
                            name="consentChecked"
                            type="checkbox"
                            checked={formData.consentChecked}
                            onChange={handleInputChange}
                            className="w-4 h-4 bg-zinc-800 border-zinc-600 rounded focus:ring-purple-500 focus:ring-offset-zinc-900"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="consentChecked" className="font-medium text-zinc-400">
                            I consent to be charged ${selectedPlan.price.toFixed(2)} for the {selectedPlan.name} and agree to the <Link href="/legal/terms" className="text-purple-400 hover:text-purple-300">Terms and Conditions</Link> and <Link href="/legal/privacy" className="text-purple-400 hover:text-purple-300">Privacy Policy</Link>.
                          </label>
                          {errors.consentChecked && <p className="mt-1 text-sm text-red-500">{errors.consentChecked}</p>}
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                          isSubmitting
                            ? 'bg-purple-700/50 text-white cursor-not-allowed'
                            : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                        }`}
                      >
                        {isSubmitting ? 'Processing...' : `Pay $${selectedPlan.price.toFixed(2)}`}
                      </button>
                      <p className="mt-3 text-sm text-center text-zinc-500">
                        <strong>Charges will appear as "{COMPANY.descriptor}" on your bank statement.</strong>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
} 