"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCheckout } from "@/lib/checkout-context";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { COMPANY } from "@/lib/company";

// Form schema with validation
const checkoutSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  zipCode: z.string().min(2, "Zip code is required"),
  country: z.string().min(2, "Country is required"),
  cardNumber: z.string().refine(val => /^\d{16}$/.test(val), "Card number must be 16 digits"),
  expiryDate: z.string().refine(val => /^(0[1-9]|1[0-2])\/([2-9]\d)$/.test(val), "Expiry date must be in MM/YY format"),
  cvv: z.string().refine(val => /^\d{3}$/.test(val), "CVV must be 3 digits"),
  consent: z.boolean().refine(val => val === true, "You must consent to the terms and charges"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutForm() {
  const { selectedPackage } = useCheckout();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      consent: false,
    }
  });

  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate successful checkout
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="bg-[#0d1424] border border-gray-800 rounded-lg p-8 shadow-lg rgb-border">
        <div className="text-center">
          <div className="w-16 h-16 bg-toxic-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8 text-toxic-green-500" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                clipRule="evenodd" 
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Payment Successful</h2>
          <p className="text-gray-400 mb-6">
            Thank you for your purchase! We've sent a confirmation email with details of your order.
          </p>
          <Button asChild variant="game" className="font-mono">
            <Link href="/">
              RETURN TO HOME
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!selectedPackage) {
    return (
      <div className="bg-[#0d1424] border border-gray-800 rounded-lg p-8 shadow-lg rgb-border">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">No Package Selected</h2>
          <p className="text-gray-400 mb-6">
            Please select a package from our pricing page to continue with your checkout.
          </p>
          <Button asChild variant="game" className="font-mono">
            <Link href="/pricing">
              VIEW PRICING
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Checkout Form (8 cols) */}
      <div className="lg:col-span-8">
        <div className="bg-[#0d1424] border border-gray-800 rounded-lg p-6 shadow-lg rgb-border">
          <h2 className="text-xl font-bold text-white border-b border-gray-800 pb-4 mb-6">
            Billing Information
          </h2>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-400 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  {...register("firstName")}
                  className="w-full bg-[#141a2c] border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-toxic-green-500"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-500">{errors.firstName.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-400 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  {...register("lastName")}
                  className="w-full bg-[#141a2c] border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-toxic-green-500"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-500">{errors.lastName.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  className="w-full bg-[#141a2c] border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-toxic-green-500"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-400 mb-1">
                  Country
                </label>
                <select
                  id="country"
                  {...register("country")}
                  className="w-full bg-[#141a2c] border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-toxic-green-500"
                >
                  <option value="">Select Country</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="France">France</option>
                </select>
                {errors.country && (
                  <p className="mt-1 text-sm text-red-500">{errors.country.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-400 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  {...register("address")}
                  className="w-full bg-[#141a2c] border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-toxic-green-500"
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-500">{errors.address.message}</p>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-400 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    {...register("city")}
                    className="w-full bg-[#141a2c] border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-toxic-green-500"
                  />
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-500">{errors.city.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-400 mb-1">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    {...register("zipCode")}
                    className="w-full bg-[#141a2c] border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-toxic-green-500"
                  />
                  {errors.zipCode && (
                    <p className="mt-1 text-sm text-red-500">{errors.zipCode.message}</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Payment Information */}
            <h2 className="text-xl font-bold text-white border-b border-gray-800 pb-4 mb-6">
              Payment Information
            </h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-400 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  maxLength={16}
                  {...register("cardNumber")}
                  className="w-full bg-[#141a2c] border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-toxic-green-500"
                />
                {errors.cardNumber && (
                  <p className="mt-1 text-sm text-red-500">{errors.cardNumber.message}</p>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-400 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    id="expiryDate"
                    placeholder="MM/YY"
                    maxLength={5}
                    {...register("expiryDate")}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      if (value.length <= 2) {
                        e.target.value = value;
                      } else {
                        e.target.value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
                      }
                    }}
                    className="w-full bg-[#141a2c] border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-toxic-green-500"
                  />
                  {errors.expiryDate && (
                    <p className="mt-1 text-sm text-red-500">{errors.expiryDate.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-400 mb-1">
                    CVC / CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    placeholder="123"
                    maxLength={3}
                    {...register("cvv")}
                    className="w-full bg-[#141a2c] border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-toxic-green-500"
                  />
                  {errors.cvv && (
                    <p className="mt-1 text-sm text-red-500">{errors.cvv.message}</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Consent Checkbox */}
            <div className="pt-4 border-t border-gray-800">
              <p className="text-sm text-gray-400 mb-3">
                Charges will appear as "{COMPANY.descriptor}" on your bank statement.
              </p>
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="consent"
                  {...register("consent")}
                  className="mt-1 mr-2"
                />
                <label htmlFor="consent" className="text-sm text-gray-400">
                  I agree to the terms of service and authorize my card to be charged ${selectedPackage.price.toFixed(2)} for this one-time purchase.
                </label>
              </div>
              {errors.consent && (
                <p className="mt-1 text-sm text-red-500">{errors.consent.message}</p>
              )}
            </div>
            
            {/* Submit Button */}
            <Button
              type="submit"
              variant="game"
              className="w-full py-3 font-mono"
              disabled={isSubmitting}
            >
              {isSubmitting ? "PROCESSING..." : "COMPLETE PURCHASE"}
            </Button>
          </form>
        </div>
      </div>
      
      {/* Order Summary (4 cols) */}
      <div className="lg:col-span-4">
        <div className="bg-[#0d1424] border border-gray-800 rounded-lg p-6 shadow-lg rgb-border">
          <h2 className="text-xl font-bold text-white border-b border-gray-800 pb-4 mb-6">
            Order Summary
          </h2>
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Package:</span>
              <span className="text-white font-medium">{selectedPackage.name}</span>
            </div>

            {selectedPackage.tier && (
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Tier:</span>
                <span className="text-toxic-green-500 font-medium">{selectedPackage.tier}</span>
              </div>
            )}
            
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Duration:</span>
              <span className="text-white">{selectedPackage.duration}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Delivery:</span>
              <span className="text-white">{selectedPackage.delivery}</span>
            </div>
            
            <div className="pt-4 border-t border-gray-800">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Subtotal:</span>
                <span className="text-white">${selectedPackage.price.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center mt-4 text-lg font-bold">
                <span className="text-white">Total:</span>
                <span className="text-toxic-green-500">${selectedPackage.price.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-4">
            <h3 className="font-medium text-white mb-2">Package Features:</h3>
            <ul className="space-y-1 text-sm text-gray-400">
              {selectedPackage.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-toxic-green-500 mr-2 flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 