"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { COMPANY } from "../constants/company";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    termsAccepted: false
  });
  
  const [packageInfo, setPackageInfo] = useState({
    name: "",
    price: 0
  });
  
  useEffect(() => {
    // Get package info from URL params
    const name = searchParams.get("package");
    const price = searchParams.get("price");
    
    if (name && price) {
      setPackageInfo({
        name,
        price: parseFloat(price)
      });
    }
  }, [searchParams]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const type = (e.target as HTMLInputElement).type;
    const checked = (e.target as HTMLInputElement).checked;
    
    if (name === 'cardNumber') {
      // Limit to 16 characters
      if (value.length > 16) return;
    } else if (name === 'cardExpiry') {
      // Format MM/YY
      let formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 0) {
        if (formattedValue.length <= 2) {
          // Just the month part
          formattedValue = formattedValue;
        } else {
          // Month and year parts with separator
          formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2, 4);
        }
      }
      
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue
      }));
      return;
    } else if (name === 'cardCvc') {
      // Limit to 3 characters
      if (value.length > 3) return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // This would normally connect to a payment processor
    // For now, just show an alert
    if (!formData.termsAccepted) {
      alert("Please accept the terms and conditions to proceed.");
      return;
    }
    
    alert("Order processed successfully! This is a demo for bank compliance check only.");
  };

  return (
    <div className="bg-[#0a0a0a] py-16 min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1 bg-[#1a1a1a] p-6 rounded-xl h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            {packageInfo.name ? (
              <div className="space-y-4">
                <div className="flex justify-between border-b border-gray-800 pb-4">
                  <span className="text-gray-400">Package</span>
                  <span className="font-medium">{packageInfo.name}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Price</span>
                  <span className="font-medium">${packageInfo.price.toFixed(2)}</span>
                </div>
                
                <div className="border-t border-gray-800 pt-4 mt-4">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${packageInfo.price.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-400">No package selected. Please select a package from our <Link href="/pricing" className="text-vid-red-500 hover:underline">pricing page</Link>.</p>
            )}
          </div>
          
          {/* Checkout Form */}
          <div className="lg:col-span-2 bg-[#1a1a1a] p-6 rounded-xl">
            <form onSubmit={handleSubmit}>
              <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div>
                  <label htmlFor="firstName" className="block text-sm text-gray-400 mb-1">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#232323] border border-gray-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-vid-red-500"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm text-gray-400 mb-1">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#232323] border border-gray-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-vid-red-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm text-gray-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#232323] border border-gray-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-vid-red-500"
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm text-gray-400 mb-1">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#232323] border border-gray-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-vid-red-500"
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm text-gray-400 mb-1">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#232323] border border-gray-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-vid-red-500"
                  />
                </div>
                <div>
                  <label htmlFor="zipCode" className="block text-sm text-gray-400 mb-1">Zip Code</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#232323] border border-gray-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-vid-red-500"
                  />
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm text-gray-400 mb-1">Country</label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#232323] border border-gray-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-vid-red-500"
                  >
                    <option value="">Select Country</option>
                    <option value="US">United States</option>
                    <option value="GB">United Kingdom</option>
                    <option value="FR">France</option>
                  </select>
                </div>
              </div>
              
              <h2 className="text-xl font-semibold mb-6">Payment Information</h2>
              <p className="text-gray-400 mb-4">
                We only accept payment by credit/debit card. Charges will appear as &quot;{COMPANY.descriptor}&quot; on your bank statement.
              </p>
              <div className="space-y-4 mb-8">
                <div>
                  <label htmlFor="cardNumber" className="block text-sm text-gray-400 mb-1">Card Number</label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    required
                    maxLength={16}
                    className="w-full bg-[#232323] border border-gray-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-vid-red-500"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="cardExpiry" className="block text-sm text-gray-400 mb-1">Expiry Date</label>
                    <input
                      type="text"
                      id="cardExpiry"
                      name="cardExpiry"
                      value={formData.cardExpiry}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      required
                      maxLength={5}
                      className="w-full bg-[#232323] border border-gray-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-vid-red-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="cardCvc" className="block text-sm text-gray-400 mb-1">CVC</label>
                    <input
                      type="text"
                      id="cardCvc"
                      name="cardCvc"
                      value={formData.cardCvc}
                      onChange={handleChange}
                      placeholder="123"
                      required
                      maxLength={3}
                      className="w-full bg-[#232323] border border-gray-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-vid-red-500"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="termsAccepted"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    required
                    className="mt-1 mr-2"
                  />
                  <label htmlFor="termsAccepted" className="text-sm text-gray-400">
                    I consent to be charged ${packageInfo.price.toFixed(2)} for the {packageInfo.name} package and accept the 
                    <Link href="/legal/terms" className="text-vid-red-500 hover:underline ml-1">Terms and Conditions</Link>.
                  </label>
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-vid-red-500 text-white font-semibold py-3 rounded-lg hover:bg-vid-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-vid-red-500 focus:ring-offset-2 focus:ring-offset-[#1a1a1a]"
                disabled={!packageInfo.name}
              >
                Complete Purchase
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="bg-[#0a0a0a] py-16 min-h-screen flex items-center justify-center">
      <div className="text-xl">Loading checkout...</div>
    </div>}>
      <CheckoutContent />
    </Suspense>
  );
} 