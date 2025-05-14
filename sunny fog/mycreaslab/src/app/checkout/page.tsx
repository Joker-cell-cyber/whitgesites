"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { COMPANY } from "../constants/company";

// Types
type Package = {
  id: number;
  name: string;
  price: number;
  popular: boolean;
};

// Helper function to generate random cents (50, 90, or 99)
const getRandomCents = () => {
  const cents = [50, 90, 99];
  return cents[Math.floor(Math.random() * cents.length)];
};

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const packageId = searchParams.get("package");

  // Packages data (copied from packages page)
  const PACKAGES: Package[] = [
    { id: 1, name: "Starter Plan", price: 9.99, popular: false },
    { id: 2, name: "Basic Plan", price: 19.50, popular: false },
    { id: 3, name: "Pro Plan", price: 29.90, popular: false },
    { id: 4, name: "Advanced Plan", price: 39.99, popular: true },
    { id: 5, name: "Professional Plus Plan", price: 49.90, popular: false },
    { id: 6, name: "Premium Plan", price: 59.50, popular: false },
    { id: 7, name: "Enterprise Plan", price: 69.99, popular: false },
    { id: 8, name: "Elite Plan", price: 79.90, popular: false },
    { id: 9, name: "Ultimate Plan", price: 89.99, popular: false },
    { id: 10, name: "Executive Plan", price: 99.50, popular: false },
    { id: 11, name: "VIP Plan", price: 109.90, popular: false },
    { id: 12, name: "Agency Plan", price: 119.99, popular: false },
  ];

  // Form data
  const [formData, setFormData] = useState({
    packageId: "",
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    country: "",
    zipCode: "",
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
    consentToCharge: false,
    acceptTerms: false
  });

  // Selected package
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  // Progress states
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState("");

  // Set initial package selection
  useEffect(() => {
    if (packageId) {
      const pkg = PACKAGES.find(p => p.id === Number(packageId));
      if (pkg) {
        setSelectedPackage(pkg);
        setFormData(prev => ({ ...prev, packageId }));
      }
    }
  }, [packageId]);

  // Form change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    // For card expiry date: automatically add a slash after MM
    if (name === 'expiryDate') {
      let formattedValue = value.replace(/[^0-9]/g, '');
      if (formattedValue.length > 2) {
        formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2, 4);
      }
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue
      }));
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Package selection handler
  const handlePackageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    const pkg = PACKAGES.find(p => p.id === Number(id));
    setSelectedPackage(pkg || null);
    setFormData(prev => ({ ...prev, packageId: id }));
  };

  // Next step handler
  const handleNextStep = () => {
    if (currentStep === 1 && !selectedPackage) {
      setError("Please select a package to continue");
      return;
    }
    
    if (currentStep === 2) {
      // Validate personal info
      if (!formData.firstName || !formData.lastName || !formData.email) {
        setError("Please fill in all required fields");
        return;
      }
    }
    
    setError("");
    setCurrentStep(prev => prev + 1);
  };

  // Previous step handler
  const handlePrevStep = () => {
    setError("");
    setCurrentStep(prev => prev - 1);
  };

  // Form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.consentToCharge || !formData.acceptTerms) {
      setError("You must consent to the charge and accept our terms and conditions");
      return;
    }
    
    if (!formData.cardNumber || !formData.cardHolder || !formData.expiryDate || !formData.cvv) {
      setError("Please fill in all payment details");
      return;
    }
    
    // Process checkout (simulated)
    setIsSubmitting(true);
    setError("");
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsComplete(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Header */}
      <section className="bg-gradient-to-b from-teal-50 to-white dark:from-gray-900 dark:to-gray-800 py-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {isComplete ? "Order Confirmation" : "Secure Checkout"}
          </h1>
          {!isComplete && (
            <div className="flex justify-center items-center space-x-2 md:space-x-4 mb-4">
              <div className={`flex items-center ${currentStep >= 1 ? "text-teal-600 dark:text-teal-400" : "text-gray-400"}`}>
                <div className={`w-8 h-8 rounded-full ${currentStep >= 1 ? "bg-teal-600 dark:bg-teal-400" : "bg-gray-300 dark:bg-gray-600"} flex items-center justify-center text-white mr-2`}>
                  1
                </div>
                <span className="hidden md:inline">Package</span>
              </div>
              <div className="w-8 h-1 bg-gray-300 dark:bg-gray-600"></div>
              <div className={`flex items-center ${currentStep >= 2 ? "text-teal-600 dark:text-teal-400" : "text-gray-400"}`}>
                <div className={`w-8 h-8 rounded-full ${currentStep >= 2 ? "bg-teal-600 dark:bg-teal-400" : "bg-gray-300 dark:bg-gray-600"} flex items-center justify-center text-white mr-2`}>
                  2
                </div>
                <span className="hidden md:inline">Information</span>
              </div>
              <div className="w-8 h-1 bg-gray-300 dark:bg-gray-600"></div>
              <div className={`flex items-center ${currentStep >= 3 ? "text-teal-600 dark:text-teal-400" : "text-gray-400"}`}>
                <div className={`w-8 h-8 rounded-full ${currentStep >= 3 ? "bg-teal-600 dark:bg-teal-400" : "bg-gray-300 dark:bg-gray-600"} flex items-center justify-center text-white mr-2`}>
                  3
                </div>
                <span className="hidden md:inline">Payment</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg max-w-3xl mx-auto">
              {error}
            </div>
          )}

          {isComplete ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-3xl mx-auto text-center">
              <div className="mb-6 w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4">Thank you for your order!</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Your order for the <strong>{selectedPackage?.name}</strong> package has been successfully placed. 
                We'll send you a confirmation email shortly.
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                <div className="flex justify-between mb-2">
                  <span>Package:</span>
                  <span>{selectedPackage?.name}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Price:</span>
                  <span>${selectedPackage?.price.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-600 my-4"></div>
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>${selectedPackage?.price.toFixed(2)}</span>
                </div>
              </div>
              <Link 
                href="/"
                className="inline-block bg-gradient-to-r from-teal-600 to-yellow-500 text-white font-medium py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                Return to Home
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Main Form */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                  <form onSubmit={handleSubmit}>
                    {/* Step 1: Package Selection */}
                    {currentStep === 1 && (
                      <div className="p-8">
                        <h2 className="text-2xl font-bold mb-6">Choose Your Package</h2>
                        <div className="mb-6">
                          <label htmlFor="packageId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Select a package *
                          </label>
                          <select
                            id="packageId"
                            name="packageId"
                            value={formData.packageId}
                            onChange={handlePackageChange}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            required
                          >
                            <option value="">Select a package</option>
                            {PACKAGES.map(pkg => (
                              <option key={pkg.id} value={pkg.id}>
                                {pkg.name} - ${pkg.price.toFixed(2)}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        {selectedPackage && (
                          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
                            <h3 className="text-lg font-semibold mb-4">Package Details</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                              You have selected the <strong>{selectedPackage.name}</strong> package at ${selectedPackage.price.toFixed(2)}.
                            </p>
                          </div>
                        )}
                        
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={handleNextStep}
                            className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl flex items-center"
                          >
                            Continue to Information
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {/* Step 2: Personal Information */}
                    {currentStep === 2 && (
                      <div className="p-8">
                        <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              First Name *
                            </label>
                            <input
                              type="text"
                              id="firstName"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                              required
                              placeholder="John"
                            />
                          </div>
                          <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Last Name *
                            </label>
                            <input
                              type="text"
                              id="lastName"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                              required
                              placeholder="Doe"
                            />
                          </div>
                        </div>
                        
                        <div className="mb-6">
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            required
                            placeholder="john.doe@example.com"
                          />
                        </div>
                        
                        <div className="mb-6">
                          <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Address *
                          </label>
                          <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            required
                            placeholder="123 Main St"
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                          <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              City *
                            </label>
                            <input
                              type="text"
                              id="city"
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                              required
                              placeholder="New York"
                            />
                          </div>
                          <div>
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Country *
                            </label>
                            <select
                              id="country"
                              name="country"
                              value={formData.country}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                              required
                            >
                              <option value="">Select a country</option>
                              <option value="United States">United States</option>
                              <option value="United Kingdom">United Kingdom</option>
                              <option value="France">France</option>
                            </select>
                          </div>
                          <div>
                            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Zip Code *
                            </label>
                            <input
                              type="text"
                              id="zipCode"
                              name="zipCode"
                              value={formData.zipCode}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                              required
                              placeholder="10001"
                            />
                          </div>
                        </div>
                        
                        <div className="flex justify-between">
                          <button
                            type="button"
                            onClick={handlePrevStep}
                            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium rounded-lg transition-colors duration-300 flex items-center"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                            Back
                          </button>
                          <button
                            type="button"
                            onClick={handleNextStep}
                            className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl flex items-center"
                          >
                            Continue to Payment
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {/* Step 3: Payment Information */}
                    {currentStep === 3 && (
                      <div className="p-8">
                        <h2 className="text-2xl font-bold mb-6">Payment Information</h2>
                        <div className="mb-6">
                          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Card Number *
                          </label>
                          <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            placeholder="1234 5678 9012 3456"
                            maxLength={16}
                            required
                          />
                        </div>
                        
                        <div className="mb-6">
                          <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Card Holder Name *
                          </label>
                          <input
                            type="text"
                            id="cardHolder"
                            name="cardHolder"
                            value={formData.cardHolder}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            placeholder="John Doe"
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                          <div>
                            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Expiry Date *
                            </label>
                            <input
                              type="text"
                              id="expiryDate"
                              name="expiryDate"
                              value={formData.expiryDate}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                              placeholder="MM/YY"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Security Code (CVV) *
                            </label>
                            <input
                              type="text"
                              id="cvv"
                              name="cvv"
                              value={formData.cvv}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                              placeholder="123"
                              required
                              maxLength={3}
                            />
                          </div>
                        </div>
                        
                        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm text-gray-600 dark:text-gray-300">
                          <p>
                            Charges will appear as "{COMPANY.serviceName}" on your bank statement.
                          </p>
                        </div>
                        
                        <div className="mb-8 space-y-4">
                          <div className="flex items-start">
                            <input
                              type="checkbox"
                              id="consentToCharge"
                              name="consentToCharge"
                              checked={formData.consentToCharge}
                              onChange={handleChange}
                              className="mt-1 mr-2"
                              required
                            />
                            <label htmlFor="consentToCharge" className="text-gray-700 dark:text-gray-300">
                              I consent to being charged ${selectedPackage?.price.toFixed(2)} for the selected {selectedPackage?.name} package. *
                            </label>
                          </div>
                          
                          <div className="flex items-start">
                            <input
                              type="checkbox"
                              id="acceptTerms"
                              name="acceptTerms"
                              checked={formData.acceptTerms}
                              onChange={handleChange}
                              className="mt-1 mr-2"
                              required
                            />
                            <label htmlFor="acceptTerms" className="text-gray-700 dark:text-gray-300">
                              I accept the <Link href="/legal/terms" className="text-teal-600 hover:underline">Terms and Conditions</Link> and <Link href="/legal/privacy" className="text-teal-600 hover:underline">Privacy Policy</Link>. *
                            </label>
                          </div>
                        </div>
                        
                        <div className="flex justify-between">
                          <button
                            type="button"
                            onClick={handlePrevStep}
                            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium rounded-lg transition-colors duration-300 flex items-center"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                            Back
                          </button>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl flex items-center"
                          >
                            {isSubmitting ? (
                              <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                              </>
                            ) : (
                              <>
                                Complete Order
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </form>
                </div>
              </div>
              
              {/* Order Summary */}
              <div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sticky top-24">
                  <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                  
                  {selectedPackage ? (
                    <>
                      <div className="mb-4">
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600 dark:text-gray-300">Package:</span>
                          <span className="font-medium">{selectedPackage.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Price:</span>
                          <span className="font-medium">${selectedPackage.price.toFixed(2)}</span>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>
                      
                      <div className="flex justify-between mb-6">
                        <span className="font-semibold">Total:</span>
                        <span className="font-bold text-xl">${selectedPackage.price.toFixed(2)}</span>
                      </div>
                      
                      <div className="rounded-lg bg-gray-50 dark:bg-gray-700 p-4 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600 dark:text-teal-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>Secure checkout</span>
                        </div>
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600 dark:text-teal-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                            <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-5h2v5a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1v-2a1 1 0 00-.293-.707L16 8.586V5a1 1 0 00-1-1H3z" />
                          </svg>
                          <span>Fast delivery</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 italic">
                      Select a package to see the order summary
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-24 pb-16">
        <section className="bg-gradient-to-b from-teal-50 to-white dark:from-gray-900 dark:to-gray-800 py-10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Secure Checkout
            </h1>
            <div className="flex justify-center items-center space-x-2 md:space-x-4 mb-4">
              <div className="flex items-center text-teal-600 dark:text-teal-400">
                <div className="w-8 h-8 rounded-full bg-teal-600 dark:bg-teal-400 flex items-center justify-center text-white mr-2">
                  1
                </div>
                <span className="hidden md:inline">Loading...</span>
              </div>
            </div>
          </div>
        </section>
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-3xl mx-auto">
              <div className="animate-pulse">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
} 