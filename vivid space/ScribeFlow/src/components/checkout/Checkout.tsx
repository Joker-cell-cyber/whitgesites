"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { COMPANY } from "../../app/constants/company";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
  consentChecked: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  address?: string;
  city?: string;
  zipCode?: string;
  country?: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
  consentChecked?: string;
}

export default function Checkout() {
  const searchParams = useSearchParams();
  const packageName = searchParams.get("package") || "Standard E-Book";
  const price = searchParams.get("price") || "699";
  
  const [formData, setFormData] = useState<FormData>({
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
    consentChecked: false
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const countries = ["United States", "United Kingdom", "France"];
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name === "cardNumber") {
      // Limit to 16 characters
      if (value.replace(/\s/g, '').length > 16) {
        return;
      }
    } else if (name === "cardCvc") {
      // Limit to 3 characters
      if (value.length > 3) {
        return;
      }
    } else if (name === "cardExpiry") {
      // Format MM/YY
      let expiry = value.replace(/\D/g, '');
      if (expiry.length > 0) {
        expiry = expiry.match(new RegExp('.{1,2}', 'g'))?.join('/') || '';
        if (expiry.length > 5) {
          return;
        }
      }
      
      setFormData({
        ...formData,
        [name]: expiry
      });
      return;
    }
    
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    });
  };
  
  const formatPrice = (price: string) => {
    const numPrice = parseInt(price);
    return (numPrice / 100).toFixed(2);
  };
  
  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.email.includes("@")) newErrors.email = "Valid email is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.zipCode) newErrors.zipCode = "Zip code is required";
    if (!formData.country) newErrors.country = "Country is required";
    
    if (!formData.cardNumber) newErrors.cardNumber = "Card number is required";
    if (formData.cardNumber && formData.cardNumber.replace(/\s/g, "").length !== 16) newErrors.cardNumber = "Card number must be 16 digits";
    if (!formData.cardExpiry) newErrors.cardExpiry = "Expiry date is required";
    if (!formData.cardCvc) newErrors.cardCvc = "CVC is required";
    if (!formData.consentChecked) newErrors.consentChecked = "You must consent to the terms";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      
      // Simulate processing
      setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(true);
      }, 1500);
    }
  };
  
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-xl p-8 text-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful</h2>
            <p className="text-lg text-gray-600 mb-6">
              Thank you for your order! Your e-book package is now being processed.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="text-left mb-2">
                <span className="font-medium text-gray-700">Order Summary:</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">Package:</span>
                <span className="font-medium">{packageName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium">€{formatPrice(price)}</span>
              </div>
            </div>
            <Link href="/" className="inline-block bg-book-blue-500 hover:bg-book-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
              Return to Home
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-2">Complete your order for professional e-book writing services</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Order Summary */}
            <div className="md:w-1/3 bg-gradient-to-b from-book-blue-50 to-white p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
                <div className="flex justify-between mb-2 pb-2 border-b border-gray-100">
                  <span className="font-medium text-gray-900">{packageName}</span>
                  <span className="font-bold text-book-blue-500">€{formatPrice(price)}</span>
                </div>
                <div className="text-sm text-gray-600 mb-4">
                  Professional e-book writing service with expert writers tailored to your requirements.
                </div>
                <div className="border-t border-gray-100 pt-2 mt-2">
                  <div className="flex justify-between font-medium">
                    <span>Total:</span>
                    <span className="text-book-blue-600">€{formatPrice(price)}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
                <div className="flex items-start mb-3">
                  <svg className="w-5 h-5 text-book-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <p>This is a secure checkout process. Your information is encrypted and protected.</p>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-book-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                  <p>Your payment details are securely processed and never stored on our servers.</p>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p>Charges will appear as &quot;{COMPANY.descriptor}&quot; on your bank statement.</p>
                </div>
              </div>
            </div>
            
            {/* Payment Form */}
            <div className="md:w-2/3 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Details</h2>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-book-blue-500 focus:border-book-blue-500 outline-none transition ${errors.firstName ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-book-blue-500 focus:border-book-blue-500 outline-none transition ${errors.lastName ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-book-blue-500 focus:border-book-blue-500 outline-none transition ${errors.email ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-book-blue-500 focus:border-book-blue-500 outline-none transition ${errors.address ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-book-blue-500 focus:border-book-blue-500 outline-none transition ${errors.city ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
                  </div>
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-book-blue-500 focus:border-book-blue-500 outline-none transition ${errors.zipCode ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.zipCode && <p className="mt-1 text-sm text-red-500">{errors.zipCode}</p>}
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-book-blue-500 focus:border-book-blue-500 outline-none transition ${errors.country ? "border-red-500" : "border-gray-300"}`}
                    >
                      {countries.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                    {errors.country && <p className="mt-1 text-sm text-red-500">{errors.country}</p>}
                  </div>
                </div>
                
                <div className="mt-6 mb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Credit Card Information</h3>
                  <div className="mb-4">
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength={16}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-book-blue-500 focus:border-book-blue-500 outline-none transition ${errors.cardNumber ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.cardNumber && <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                      <input
                        type="text"
                        id="cardExpiry"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-book-blue-500 focus:border-book-blue-500 outline-none transition ${errors.cardExpiry ? "border-red-500" : "border-gray-300"}`}
                      />
                      {errors.cardExpiry && <p className="mt-1 text-sm text-red-500">{errors.cardExpiry}</p>}
                    </div>
                    <div>
                      <label htmlFor="cardCvc" className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                      <input
                        type="text"
                        id="cardCvc"
                        name="cardCvc"
                        value={formData.cardCvc}
                        onChange={handleChange}
                        placeholder="123"
                        maxLength={3}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-book-blue-500 focus:border-book-blue-500 outline-none transition ${errors.cardCvc ? "border-red-500" : "border-gray-300"}`}
                      />
                      {errors.cardCvc && <p className="mt-1 text-sm text-red-500">{errors.cardCvc}</p>}
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="consentChecked"
                      name="consentChecked"
                      checked={formData.consentChecked}
                      onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>}
                      className="h-5 w-5 text-book-blue-500 border-gray-300 rounded focus:ring-book-blue-500 mt-1"
                    />
                    <label htmlFor="consentChecked" className="ml-3 block text-sm text-gray-700">
                      I consent to be charged for the selected package and I accept the{" "}
                      <Link href="/legal/terms" className="text-book-blue-500 hover:text-book-blue-700 font-medium">
                        Terms and Conditions
                      </Link>{" "}
                      and{" "}
                      <Link href="/legal/privacy" className="text-book-blue-500 hover:text-book-blue-700 font-medium">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                  {errors.consentChecked && <p className="mt-1 text-sm text-red-500">{errors.consentChecked}</p>}
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-book-blue-500 to-book-blue-600 hover:from-book-blue-600 hover:to-book-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    `Complete Purchase - €${formatPrice(price)}`
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 