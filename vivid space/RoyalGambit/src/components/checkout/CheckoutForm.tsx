"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { COMPANY } from "@/app/constants/company";

export default function CheckoutForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    cardNumber: "",
    cardName: "",
    expiration: "",
    cvc: "",
    consent: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Validate required fields
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone', 
      'address', 'city', 'postalCode', 'country',
      'cardNumber', 'cardName', 'expiration', 'cvc'
    ];
    
    requiredFields.forEach(field => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = 'This field is required';
      }
    });
    
    // Validate email format
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Validate card number (simple check for now - just digits and length)
    if (formData.cardNumber && !/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }
    
    // Validate expiration date (MM/YY format)
    if (formData.expiration && !/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(formData.expiration)) {
      newErrors.expiration = 'Please use MM/YY format';
    }
    
    // Validate CVC (3-4 digits)
    if (formData.cvc && !/^\d{3,4}$/.test(formData.cvc)) {
      newErrors.cvc = 'Please enter a valid CVC code';
    }
    
    // Validate consent
    if (!formData.consent) {
      newErrors.consent = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // This would typically submit to a payment processor
      // For the mock, we'll just show a success message
      alert("Order placed successfully! (This is a mock checkout)");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#0e2250] rounded-xl p-6 shadow-xl"
    >
      <h2 className="text-2xl font-bold mb-6">Payment Details</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full bg-[#081326] border ${errors.firstName ? 'border-red-500' : 'border-[#1e3a6e]'} rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full bg-[#081326] border ${errors.lastName ? 'border-red-500' : 'border-[#1e3a6e]'} rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full bg-[#081326] border ${errors.email ? 'border-red-500' : 'border-[#1e3a6e]'} rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full bg-[#081326] border ${errors.phone ? 'border-red-500' : 'border-[#1e3a6e]'} rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
              </div>
            </div>
          </div>
          
          {/* Billing Address */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Billing Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`w-full bg-[#081326] border ${errors.address ? 'border-red-500' : 'border-[#1e3a6e]'} rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
              </div>
              
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-1">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={`w-full bg-[#081326] border ${errors.city ? 'border-red-500' : 'border-[#1e3a6e]'} rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
              </div>
              
              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-300 mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className={`w-full bg-[#081326] border ${errors.postalCode ? 'border-red-500' : 'border-[#1e3a6e]'} rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.postalCode && <p className="mt-1 text-sm text-red-500">{errors.postalCode}</p>}
              </div>
              
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-300 mb-1">
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className={`w-full bg-[#081326] border ${errors.country ? 'border-red-500' : 'border-[#1e3a6e]'} rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="">Select a country</option>
                  <option value="United States">United States</option>
                  <option value="France">France</option>
                  <option value="United Kingdom">United Kingdom</option>
                </select>
                {errors.country && <p className="mt-1 text-sm text-red-500">{errors.country}</p>}
              </div>
            </div>
          </div>
          
          {/* Credit Card Information */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Payment Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-300 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="XXXX XXXX XXXX XXXX"
                  className={`w-full bg-[#081326] border ${errors.cardNumber ? 'border-red-500' : 'border-[#1e3a6e]'} rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.cardNumber && <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>}
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="cardName" className="block text-sm font-medium text-gray-300 mb-1">
                  Name on Card
                </label>
                <input
                  type="text"
                  id="cardName"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  className={`w-full bg-[#081326] border ${errors.cardName ? 'border-red-500' : 'border-[#1e3a6e]'} rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.cardName && <p className="mt-1 text-sm text-red-500">{errors.cardName}</p>}
              </div>
              
              <div>
                <label htmlFor="expiration" className="block text-sm font-medium text-gray-300 mb-1">
                  Expiration Date
                </label>
                <input
                  type="text"
                  id="expiration"
                  name="expiration"
                  value={formData.expiration}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  className={`w-full bg-[#081326] border ${errors.expiration ? 'border-red-500' : 'border-[#1e3a6e]'} rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.expiration && <p className="mt-1 text-sm text-red-500">{errors.expiration}</p>}
              </div>
              
              <div>
                <label htmlFor="cvc" className="block text-sm font-medium text-gray-300 mb-1">
                  CVC
                </label>
                <input
                  type="text"
                  id="cvc"
                  name="cvc"
                  value={formData.cvc}
                  onChange={handleInputChange}
                  placeholder="123"
                  className={`w-full bg-[#081326] border ${errors.cvc ? 'border-red-500' : 'border-[#1e3a6e]'} rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.cvc && <p className="mt-1 text-sm text-red-500">{errors.cvc}</p>}
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-[#0c1d3d] rounded-lg border border-[#1e3a6e] text-sm text-gray-300">
              <p>Charges will appear as &quot;{COMPANY.descriptor}&quot; on your bank statement.</p>
            </div>
          </div>
          
          {/* Consent Checkbox */}
          <div className="mt-6">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="consent"
                  name="consent"
                  type="checkbox"
                  checked={formData.consent}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="consent" className={`text-sm ${errors.consent ? 'text-red-500' : 'text-gray-300'}`}>
                  I consent to be charged for the selected product and accept the{" "}
                  <Link href="/legal/terms" className="text-blue-400 hover:text-blue-300 underline">
                    Terms and Conditions
                  </Link>
                  {" "}and{" "}
                  <Link href="/legal/privacy" className="text-blue-400 hover:text-blue-300 underline">
                    Privacy Policy
                  </Link>
                </label>
                {errors.consent && <p className="mt-1 text-sm text-red-500">{errors.consent}</p>}
              </div>
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-chess-blue-600 to-chess-gold-500 text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Complete Purchase
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
} 