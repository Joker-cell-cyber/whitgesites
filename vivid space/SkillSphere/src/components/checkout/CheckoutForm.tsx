"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { COMPANY } from "@/app/constants/company";

interface PackageDetails {
  name: string;
  price: number;
  category: string;
  duration: string;
}

export default function CheckoutForm() {
  const searchParams = useSearchParams();
  const packageId = searchParams.get("packageId");
  const categoryParam = searchParams.get("category");
  const [packageDetails, setPackageDetails] = useState<PackageDetails | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    country: "United States",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    consentChecked: false
  });
  const [loading, setLoading] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    // Here we are simulating it for demonstration purposes
    const mockPackages: Record<string, Record<string, PackageDetails>> = {
      competitive: {
        "starter": { name: "Starter", price: 19.50, category: "Competitive", duration: "30 minutes" },
        "essentials": { name: "Essentials", price: 29.90, category: "Competitive", duration: "1 hour" },
        "advanced": { name: "Advanced", price: 39.99, category: "Competitive", duration: "1.5 hours" },
        "expert": { name: "Expert", price: 59.50, category: "Competitive", duration: "2 hours" },
        "professional": { name: "Professional", price: 79.90, category: "Competitive", duration: "3 hours" }
      },
      moba: {
        "lanebasics": { name: "Lane Basics", price: 29.90, category: "Moba", duration: "30 minutes" },
        "rankclimber": { name: "Rank Climber", price: 39.99, category: "Moba", duration: "1 hour" },
        "diamondpath": { name: "Diamond Path", price: 59.50, category: "Moba", duration: "1.5 hours" },
        "mastertier": { name: "Master Tier", price: 89.50, category: "Moba", duration: "2 hours" },
        "challenger": { name: "Challenger", price: 99.99, category: "Moba", duration: "3 hours" }
      },
      sports: {
        "rookie": { name: "Rookie", price: 39.99, category: "Sports", duration: "30 minutes" },
        "divisionclimber": { name: "Division Climber", price: 49.90, category: "Sports", duration: "1 hour" },
        "elitetactics": { name: "Elite Tactics", price: 69.99, category: "Sports", duration: "1.5 hours" },
        "championclass": { name: "Champion Class", price: 109.90, category: "Sports", duration: "2 hours" },
        "legend": { name: "Legend", price: 119.50, category: "Sports", duration: "3 hours" }
      }
    };

    // Try to find the package in our mock data
    if (packageId && categoryParam) {
      const category = categoryParam.toLowerCase();
      const id = packageId.toLowerCase();
      
      if (mockPackages[category] && mockPackages[category][id]) {
        setPackageDetails(mockPackages[category][id]);
      } else {
        // If no package is found, set a default package
        setPackageDetails({
          name: "Essentials",
          price: 19.50,
          category: "Competitive",
          duration: "1 hour"
        });
      }
    } else {
      // Default package when no query params
      setPackageDetails({
        name: "Essentials",
        price: 19.50,
        category: "Competitive",
        duration: "1 hour"
      });
    }
  }, [packageId, categoryParam]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name === 'cardNumber' && type === 'text') {
      // Limit to 16 characters for card number
      if (value.length <= 16) {
        setFormData(prev => ({ ...prev, [name]: value }));
      }
    } else if (name === 'expiryDate' && type === 'text') {
      // Format MM/YY for expiry date
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length <= 4) {
        let formatted = cleaned;
        if (cleaned.length > 2) {
          formatted = cleaned.slice(0, 2) + '/' + cleaned.slice(2);
        }
        setFormData(prev => ({ ...prev, [name]: formatted }));
      }
    } else if (name === 'cvv' && type === 'text') {
      // Limit to 3 characters for CVC
      if (value.length <= 3) {
        setFormData(prev => ({ ...prev, [name]: value }));
      }
    } else if (type === 'checkbox') {
      // @ts-expect-error - e.target.checked exists on checkbox inputs but not captured in the type
      setFormData(prev => ({ ...prev, [name]: e.target.checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setFormSubmitted(true);
    }, 1500);
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStep(2);
  };

  const handlePrevStep = () => {
    setFormStep(1);
  };

  if (formSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-[#14172c] rounded-xl p-8 border border-gray-800"
      >
        <div className="text-center py-10">
          <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
          <p className="text-gray-400 mb-6">
            Thank you for your purchase. We've sent a confirmation to your email.
          </p>
          <a 
            href="/"
            className="inline-block bg-gradient-to-r from-[#44D62C] to-[#00FFFF] text-white py-3 px-6 rounded-lg font-medium transition-transform hover:scale-105"
          >
            Return to Home
          </a>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Summary - Always visible */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-1 bg-[#14172c] rounded-xl p-6 border border-gray-800 h-fit sticky top-24"
        >
          <h2 className="text-xl font-bold mb-6 pb-4 border-b border-gray-800">Order Summary</h2>
          
          {packageDetails ? (
            <div>
              <div className="flex justify-between mb-4">
                <div>
                  <h3 className="font-medium text-white">{packageDetails.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">{packageDetails.category} • {packageDetails.duration}</p>
                </div>
                <div className="text-right">
                  <span className="font-medium">${packageDetails.price.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="py-4 border-t border-gray-800">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-400">Subtotal</span>
                  <span>${packageDetails.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium text-lg mt-4 pt-4 border-t border-gray-800">
                  <span>Total</span>
                  <span className="text-white">${packageDetails.price.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="animate-pulse">
              <div className="h-5 bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-700 rounded mb-1"></div>
              <div className="h-4 bg-gray-700 rounded mb-1"></div>
              <div className="h-6 bg-gray-700 rounded w-1/3 mt-4"></div>
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-gray-800">
            <h3 className="text-sm font-medium mb-3">Need help?</h3>
            <a href="/contact" className="text-sm text-[#44D62C] hover:text-[#44D62C]/80 flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Support
            </a>
          </div>
        </motion.div>

        {/* Checkout Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-2 bg-[#14172c] rounded-xl p-6 md:p-8 border border-gray-800"
        >
          <form onSubmit={formStep === 1 ? handleNextStep : handleSubmit}>
            {/* Form Step Indicator */}
            <div className="flex items-center mb-8">
              <div className={`rounded-full h-8 w-8 flex items-center justify-center ${formStep === 1 ? 'bg-[#44D62C] text-white' : 'bg-green-500 text-white'}`}>
                1
              </div>
              <div className={`h-1 w-12 mx-2 ${formStep === 1 ? 'bg-gray-700' : 'bg-green-500'}`}></div>
              <div className={`rounded-full h-8 w-8 flex items-center justify-center ${formStep === 2 ? 'bg-[#44D62C] text-white' : 'bg-gray-700 text-gray-300'}`}>
                2
              </div>
              <span className="ml-4 text-sm text-gray-400">
                {formStep === 1 ? 'Your Information' : 'Payment Details'}
              </span>
            </div>
            
            {formStep === 1 ? (
              /* Step 1: Personal Information */
              <div className="space-y-6">
                <h2 className="text-xl font-bold mb-6">Your Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-2">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#1c1f36] border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-vid-red-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-2">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#1c1f36] border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-vid-red-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-[#1c1f36] border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-[#44D62C] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="country" className="block text-sm font-medium mb-2">Country</label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-[#1c1f36] border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-[#44D62C] focus:border-transparent"
                  >
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="France">France</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-sm font-medium mb-2">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-[#1c1f36] border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-[#44D62C] focus:border-transparent"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium mb-2">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#1c1f36] border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-[#44D62C] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium mb-2">Zip / Postal Code</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#1c1f36] border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-[#44D62C] focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#44D62C] to-[#00FFFF] text-white py-3 rounded-lg font-medium transition-transform hover:scale-105"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            ) : (
              /* Step 2: Payment Information */
              <div className="space-y-6">
                <h2 className="text-xl font-bold mb-6">Payment Information</h2>
                
                <div className="p-4 bg-[#181b30] rounded-lg mb-6">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-5 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="text-blue-500">
                        <path fill="currentColor" d="M470.1 231.3s7.6 37.2 9.3 45H446c3.3-8.9 16-43.5 16-43.5-.2.3 3.3-9.1 5.3-14.9l2.8 13.4zM576 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48zM152.5 331.2L215.7 176h-42.5l-39.3 106-4.3-21.5-14-71.4c-2.3-9.9-9.4-12.7-18.2-13.1H32.7l-.7 3.1c15.8 4 29.9 9.8 42.2 17.1l35.8 135h42.5zm94.4.2L272.1 176h-40.2l-25.1 155.4h40.1zm139.9-50.8c.2-17.7-10.6-31.2-33.7-42.3-14.1-7.1-22.7-11.9-22.7-19.2.2-6.6 7.3-13.4 23.1-13.4 13.1-.3 22.7 2.8 29.9 5.9l3.6 1.7 5.5-33.6c-7.9-3.1-20.5-6.6-36-6.6-39.7 0-67.6 21.2-67.8 51.4-.3 22.3 20 34.7 35.2 42.2 15.5 7.6 20.8 12.6 20.8 19.3-.2 10.4-12.6 15.2-24.1 15.2-16 0-24.6-2.5-37.7-8.3l-5.3-2.5-5.6 34.9c9.4 4.3 26.8 8.1 44.8 8.3 42.2.1 69.7-20.8 70-53zM528 331.4L495.6 176h-31.1c-9.6 0-16.9 2.8-21 12.9l-59.7 142.5H426s6.9-19.2 8.4-23.3H486c1.2 5.5 4.8 23.3 4.8 23.3H528z" />
                      </svg>
                    </div>
                    <div className="w-8 h-5 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="text-red-500">
                        <path fill="currentColor" d="M576 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48zM482.9 232.3L440.1 176H176l-40.4 56.3L244 335.4h31.4L413.4 176l33.5 56.3L358.9 335.4h31.4l92.6-103.1zM198.9 335.4L54.5 232.3l43.4-56.3L244 335.4h-45.1z" />
                      </svg>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium mb-2">Card Number</label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      required
                      maxLength={19}
                      className="w-full bg-[#1c1f36] border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-vid-red-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6 mt-4">
                    <div>
                      <label htmlFor="expiryDate" className="block text-sm font-medium mb-2">Expiry Date</label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        required
                        maxLength={5}
                        className="w-full bg-[#1c1f36] border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-[#44D62C] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium mb-2">CVV</label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        required
                        maxLength={3}
                        className="w-full bg-[#1c1f36] border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-[#44D62C] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-[#181b30] border border-[#44D62C]/20 rounded-lg mb-6">
                  <p className="text-gray-300 text-sm">
                    Charges will appear as "{COMPANY.descriptor}" on your bank statement.
                  </p>
                </div>

                <div className="pt-4">
                  <div className="mb-6">
                    <label className="flex items-start cursor-pointer">
                      <input
                        type="checkbox"
                        name="consentChecked"
                        checked={formData.consentChecked}
                        onChange={handleInputChange}
                        required
                        className="rounded bg-[#1c1f36] border-gray-700 text-[#44D62C] mt-1 focus:ring-[#44D62C] h-4 w-4"
                      />
                      <span className="ml-3 text-sm text-gray-300">
                        I consent to be charged ${packageDetails?.price.toFixed(2)} for the {packageDetails?.name} package and I agree to the <a href="/legal/terms" className="text-[#44D62C] underline">Terms of Service</a> and <a href="/legal/privacy" className="text-[#44D62C] underline">Privacy Policy</a>.
                      </span>
                    </label>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="w-1/3 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={!formData.consentChecked || loading}
                      className={`w-2/3 bg-gradient-to-r from-[#44D62C] to-[#00FFFF] text-white py-3 rounded-lg font-medium transition-transform hover:scale-105 ${(!formData.consentChecked || loading) ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {loading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        `Pay $${packageDetails?.price.toFixed(2)}`
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
} 