"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "./CartContext";
import { COMPANY } from "@/app/constants/company";

export default function CheckoutForm() {
  const router = useRouter();
  const { selectedPackage, clearCart } = useCart();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    country: "United States",
    postalCode: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
    consent: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Countries allowed for selection
  const allowedCountries = [
    "United States",
    "United Kingdom",
    "France"
  ];

  if (!selectedPackage) {
    return (
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-ug-gray-200">
        <h2 className="text-xl font-semibold text-ug-gray-900 mb-6">No package selected</h2>
        <p className="text-ug-gray-600 mb-6">You haven't selected any package yet.</p>
        <button
          onClick={() => router.push("/pricing")}
          className="px-6 py-3 bg-gradient-to-r from-ug-blue-600 to-ug-blue-500 text-white rounded-lg font-medium"
        >
          View Packages
        </button>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
    
    // Clear the error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Simple validation
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Valid email is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.postalCode) newErrors.postalCode = "Postal code is required";
    
    // Card validation (just basic length checks, not actual card validation)
    if (!formData.cardNumber) newErrors.cardNumber = "Card number is required";
    if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) newErrors.cardNumber = "Card number must be 16 digits";
    if (!formData.cardExpiry) newErrors.cardExpiry = "Expiry date is required";
    if (!/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) newErrors.cardExpiry = "Format must be MM/YY";
    if (!formData.cardCVC) newErrors.cardCVC = "CVC is required";
    if (!/^\d{3,4}$/.test(formData.cardCVC)) newErrors.cardCVC = "CVC must be 3-4 digits";
    
    // Consent is required
    if (!formData.consent) newErrors.consent = "You must agree to the terms and consent to the payment";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Clear cart after successful checkout
      setTimeout(() => {
        clearCart();
        router.push("/");
      }, 3000);
    }, 2000);
  };

  return (
    <>
      {isSuccess ? (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-ug-gray-200 text-center">
          <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-ug-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-ug-gray-600 mb-6">
            Thank you for your order. We have sent a confirmation email to your inbox.
          </p>
          <p className="text-ug-gray-600 mb-6">
            You will be redirected to the homepage in a few seconds...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Order summary */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-ug-gray-200 sticky top-24">
              <h2 className="text-xl font-semibold text-ug-gray-900 mb-6">Order Summary</h2>
              
              <div className="border-t border-ug-gray-200 pt-4 pb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-ug-gray-600">Package</span>
                  <span className="font-medium text-ug-gray-900">{selectedPackage.name} ({selectedPackage.tier})</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-ug-gray-600">Description</span>
                  <span className="text-ug-gray-900">{selectedPackage.description}</span>
                </div>
                
                <h3 className="font-medium text-ug-gray-900 mb-2">Features:</h3>
                <ul className="text-ug-gray-600 space-y-1 mb-4">
                  {selectedPackage.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-ug-blue-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="border-t border-ug-gray-200 pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-semibold text-ug-gray-900">Total</span>
                  <span className="text-xl font-bold text-ug-blue-600">${selectedPackage.price.toFixed(2)}</span>
                </div>
                <p className="text-xs text-ug-gray-500 mt-2">* One-time payment</p>
                <p className="text-xs text-ug-gray-500 mt-2">Charges will appear as "{COMPANY.serviceName}" on your bank statement.</p>
              </div>
            </div>
          </div>
          
          {/* Checkout form */}
          <div className="md:col-span-2">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-ug-gray-200">
              <h2 className="text-xl font-semibold text-ug-gray-900 mb-6">Payment Information</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-ug-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border ${errors.firstName ? 'border-red-500' : 'border-ug-gray-300'} rounded-lg focus:ring-2 focus:ring-ug-blue-500 focus:border-ug-blue-500 outline-none transition-colors`}
                    />
                    {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-ug-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border ${errors.lastName ? 'border-red-500' : 'border-ug-gray-300'} rounded-lg focus:ring-2 focus:ring-ug-blue-500 focus:border-ug-blue-500 outline-none transition-colors`}
                    />
                    {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium text-ug-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-ug-gray-300'} rounded-lg focus:ring-2 focus:ring-ug-blue-500 focus:border-ug-blue-500 outline-none transition-colors`}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>
                
                <div className="mb-6">
                  <label htmlFor="address" className="block text-sm font-medium text-ug-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${errors.address ? 'border-red-500' : 'border-ug-gray-300'} rounded-lg focus:ring-2 focus:ring-ug-blue-500 focus:border-ug-blue-500 outline-none transition-colors`}
                  />
                  {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-ug-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border ${errors.city ? 'border-red-500' : 'border-ug-gray-300'} rounded-lg focus:ring-2 focus:ring-ug-blue-500 focus:border-ug-blue-500 outline-none transition-colors`}
                    />
                    {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-ug-gray-700 mb-1">Country</label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border ${errors.country ? 'border-red-500' : 'border-ug-gray-300'} rounded-lg focus:ring-2 focus:ring-ug-blue-500 focus:border-ug-blue-500 outline-none transition-colors`}
                    >
                      {allowedCountries.map((country) => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                    {errors.country && <p className="mt-1 text-sm text-red-500">{errors.country}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-ug-gray-700 mb-1">Postal Code</label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border ${errors.postalCode ? 'border-red-500' : 'border-ug-gray-300'} rounded-lg focus:ring-2 focus:ring-ug-blue-500 focus:border-ug-blue-500 outline-none transition-colors`}
                    />
                    {errors.postalCode && <p className="mt-1 text-sm text-red-500">{errors.postalCode}</p>}
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-ug-gray-900 mb-4">Card Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-ug-gray-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="1234 5678 9012 3456"
                      className={`w-full px-4 py-2 border ${errors.cardNumber ? 'border-red-500' : 'border-ug-gray-300'} rounded-lg focus:ring-2 focus:ring-ug-blue-500 focus:border-ug-blue-500 outline-none transition-colors`}
                    />
                    {errors.cardNumber && <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="cardExpiry" className="block text-sm font-medium text-ug-gray-700 mb-1">Expiry Date</label>
                      <input
                        type="text"
                        id="cardExpiry"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        className={`w-full px-4 py-2 border ${errors.cardExpiry ? 'border-red-500' : 'border-ug-gray-300'} rounded-lg focus:ring-2 focus:ring-ug-blue-500 focus:border-ug-blue-500 outline-none transition-colors`}
                      />
                      {errors.cardExpiry && <p className="mt-1 text-sm text-red-500">{errors.cardExpiry}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="cardCVC" className="block text-sm font-medium text-ug-gray-700 mb-1">CVC</label>
                      <input
                        type="text"
                        id="cardCVC"
                        name="cardCVC"
                        value={formData.cardCVC}
                        onChange={handleChange}
                        placeholder="123"
                        className={`w-full px-4 py-2 border ${errors.cardCVC ? 'border-red-500' : 'border-ug-gray-300'} rounded-lg focus:ring-2 focus:ring-ug-blue-500 focus:border-ug-blue-500 outline-none transition-colors`}
                      />
                      {errors.cardCVC && <p className="mt-1 text-sm text-red-500">{errors.cardCVC}</p>}
                    </div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="consent"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleChange}
                      className={`h-5 w-5 rounded border-ug-gray-300 text-ug-blue-600 focus:ring-ug-blue-500 mt-0.5 ${errors.consent ? 'border-red-500' : ''}`}
                    />
                    <label htmlFor="consent" className="ml-2 block text-sm text-ug-gray-700">
                      I consent to being charged ${selectedPackage.price.toFixed(2)} for the selected package and I agree to the <a href="/legal/terms" className="text-ug-blue-600 hover:underline">Terms and Conditions</a> and <a href="/legal/privacy" className="text-ug-blue-600 hover:underline">Privacy Policy</a>.
                    </label>
                  </div>
                  {errors.consent && <p className="mt-1 text-sm text-red-500">{errors.consent}</p>}
                </div>
                
                <div className="text-ug-gray-600 text-sm mb-6">
                  <p className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-ug-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Charges will appear as "{COMPANY.serviceName}" on your bank statement.
                  </p>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-4 rounded-lg font-medium ${
                    isSubmitting
                      ? "bg-ug-blue-400 text-white cursor-not-allowed"
                      : "bg-gradient-to-r from-ug-blue-600 to-ug-blue-500 text-white hover:from-ug-blue-700 hover:to-ug-blue-600"
                  } transition-colors shadow-md`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    "Complete Purchase"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 