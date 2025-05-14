"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { COMPANY } from "@/app/constants/company";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  cardNumber: string;
  expiryDate: string;
  cvc: string;
  termsAccepted: boolean;
};

export default function CheckoutForm({ 
  productName, 
  productPrice,
  onSuccess 
}: { 
  productName: string; 
  productPrice: number;
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    country: "United States",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when field is edited
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Format expiry date with slash
  useEffect(() => {
    if (formData.expiryDate) {
      const expiry = formData.expiryDate.replace(/\D/g, '');
      if (expiry.length > 0) {
        if (expiry.length <= 2) {
          setFormData(prev => ({ ...prev, expiryDate: expiry }));
        } else {
          setFormData(prev => ({ 
            ...prev, 
            expiryDate: `${expiry.slice(0,2)}/${expiry.slice(2,4)}` 
          }));
        }
      }
    }
  }, [formData.expiryDate]);

  // Format card number
  useEffect(() => {
    if (formData.cardNumber) {
      const cleaned = formData.cardNumber.replace(/\D/g, '');
      if (cleaned.length > 16) {
        setFormData(prev => ({ ...prev, cardNumber: cleaned.substring(0, 16) }));
      } else {
        setFormData(prev => ({ ...prev, cardNumber: cleaned }));
      }
    }
  }, [formData.cardNumber]);

  // Format CVC to max 3 characters
  useEffect(() => {
    if (formData.cvc) {
      const cleaned = formData.cvc.replace(/\D/g, '');
      if (cleaned.length > 3) {
        setFormData(prev => ({ ...prev, cvc: cleaned.substring(0, 3) }));
      } else {
        setFormData(prev => ({ ...prev, cvc: cleaned }));
      }
    }
  }, [formData.cvc]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.streetAddress.trim()) newErrors.streetAddress = "Street address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "Zip code is required";
    
    if (!formData.cardNumber.trim()) newErrors.cardNumber = "Card number is required";
    else if (formData.cardNumber.replace(/\D/g, '').length !== 16) newErrors.cardNumber = "Card number must be 16 digits";
    
    if (!formData.expiryDate.trim()) newErrors.expiryDate = "Expiry date is required";
    else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) newErrors.expiryDate = "Use MM/YY format";
    
    if (!formData.cvc.trim()) newErrors.cvc = "CVC is required";
    else if (formData.cvc.length !== 3) newErrors.cvc = "CVC must be 3 digits";
    
    if (!formData.termsAccepted) newErrors.termsAccepted = "You must accept the terms";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsProcessing(true);
      
      // Simulate processing
      setTimeout(() => {
        setIsProcessing(false);
        onSuccess();
      }, 1500);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
      <h2 className="text-2xl font-bold text-cs-navy-900 mb-6">Complete Your Order</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-cs-navy-800 mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-cs-navy-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cs-blue-500 focus:border-cs-blue-500 outline-none transition-colors ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-cs-navy-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cs-blue-500 focus:border-cs-blue-500 outline-none transition-colors ${
                  errors.lastName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
              )}
            </div>
          </div>
          
          <div className="mt-4">
            <label htmlFor="email" className="block text-sm font-medium text-cs-navy-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cs-blue-500 focus:border-cs-blue-500 outline-none transition-colors ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="mt-4">
            <label htmlFor="country" className="block text-sm font-medium text-cs-navy-700 mb-1">
              Country
            </label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cs-blue-500 focus:border-cs-blue-500 outline-none transition-colors ${
                errors.country ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="France">France</option>
            </select>
            {errors.country && (
              <p className="mt-1 text-sm text-red-500">{errors.country}</p>
            )}
          </div>

          <div className="mt-4">
            <label htmlFor="streetAddress" className="block text-sm font-medium text-cs-navy-700 mb-1">
              Street Address
            </label>
            <input
              type="text"
              id="streetAddress"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cs-blue-500 focus:border-cs-blue-500 outline-none transition-colors ${
                errors.streetAddress ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.streetAddress && (
              <p className="mt-1 text-sm text-red-500">{errors.streetAddress}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-cs-navy-700 mb-1">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cs-blue-500 focus:border-cs-blue-500 outline-none transition-colors ${
                  errors.city ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.city && (
                <p className="mt-1 text-sm text-red-500">{errors.city}</p>
              )}
            </div>
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-cs-navy-700 mb-1">
                State / Province
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cs-blue-500 focus:border-cs-blue-500 outline-none transition-colors ${
                  errors.state ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.state && (
                <p className="mt-1 text-sm text-red-500">{errors.state}</p>
              )}
            </div>
            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium text-cs-navy-700 mb-1">
                Zip / Postal Code
              </label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cs-blue-500 focus:border-cs-blue-500 outline-none transition-colors ${
                  errors.zipCode ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.zipCode && (
                <p className="mt-1 text-sm text-red-500">{errors.zipCode}</p>
              )}
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-cs-navy-800 mb-4">Payment Information</h3>
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-cs-navy-700 mb-1">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="1234567890123456"
              maxLength={16}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cs-blue-500 focus:border-cs-blue-500 outline-none transition-colors ${
                errors.cardNumber ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.cardNumber && (
              <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-cs-navy-700 mb-1">
                Expiry Date
              </label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                placeholder="MM/YY"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cs-blue-500 focus:border-cs-blue-500 outline-none transition-colors ${
                  errors.expiryDate ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.expiryDate && (
                <p className="mt-1 text-sm text-red-500">{errors.expiryDate}</p>
              )}
            </div>
            <div>
              <label htmlFor="cvc" className="block text-sm font-medium text-cs-navy-700 mb-1">
                CVC
              </label>
              <input
                type="text"
                id="cvc"
                name="cvc"
                value={formData.cvc}
                onChange={handleChange}
                placeholder="123"
                maxLength={3}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cs-blue-500 focus:border-cs-blue-500 outline-none transition-colors ${
                  errors.cvc ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.cvc && (
                <p className="mt-1 text-sm text-red-500">{errors.cvc}</p>
              )}
            </div>
          </div>

          <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">
              Charges will appear as "{COMPANY.descriptor}" on your bank statement.
            </p>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="termsAccepted"
                name="termsAccepted"
                type="checkbox"
                checked={formData.termsAccepted}
                onChange={handleChange}
                className="w-4 h-4 text-cs-blue-600 border-gray-300 rounded focus:ring-cs-blue-500"
              />
            </div>
            <label htmlFor="termsAccepted" className="ml-2 text-sm text-cs-navy-700">
              I agree to be charged ${productPrice.toFixed(2)} for {productName} and accept the{" "}
              <a href="/legal/terms" className="text-cs-blue-600 hover:text-cs-blue-800 underline">
                Terms and Conditions
              </a>
            </label>
          </div>
          {errors.termsAccepted && (
            <p className="mt-1 text-sm text-red-500">{errors.termsAccepted}</p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isProcessing}
          className={`w-full py-3 rounded-lg font-medium relative overflow-hidden group bg-gradient-to-r from-cs-blue-600 to-cs-navy-600 text-white hover:shadow-lg transition-shadow ${
            isProcessing ? "opacity-80" : ""
          }`}
        >
          <span className="relative z-10">
            {isProcessing ? "Processing..." : `Pay $${productPrice.toFixed(2)}`}
          </span>
          <span className="absolute top-0 left-0 w-full h-full bg-white opacity-0 group-hover:opacity-10 transition-opacity"></span>
        </button>
      </form>
    </div>
  );
} 