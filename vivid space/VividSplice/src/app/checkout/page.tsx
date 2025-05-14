"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { COMPANY } from "@/app/constants/company";

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
    cardCVC: "",
    termsAccepted: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<{
    name: string;
    price: number;
    category: string;
  } | null>(null);

  // Process the query parameters
  useEffect(() => {
    if (searchParams) {
      const packageName = searchParams.get("package");
      const packagePrice = searchParams.get("price");
      const packageCategory = searchParams.get("category");

      if (packageName && packagePrice && packageCategory) {
        setSelectedPackage({
          name: packageName,
          price: parseFloat(packagePrice),
          category: packageCategory,
        });
      }
    }
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    // Special handling for cardNumber - limit to 16 characters
    if (name === 'cardNumber') {
      // Only allow digits and limit to 16 characters
      const sanitizedValue = value.replace(/\D/g, '').slice(0, 16);
      setFormData({
        ...formData,
        [name]: sanitizedValue,
      });
    }
    // Special handling for cardCVC - limit to 3 characters
    else if (name === 'cardCVC') {
      // Only allow digits and limit to 3 characters
      const sanitizedValue = value.replace(/\D/g, '').slice(0, 3);
      setFormData({
        ...formData,
        [name]: sanitizedValue,
      });
    }
    // Special handling for cardExpiry - automatically add / between MM and YY
    else if (name === 'cardExpiry') {
      // Remove any non-digit character
      let sanitizedValue = value.replace(/\D/g, '');
      
      // If the user is deleting characters and there's only 1 character left
      if (sanitizedValue.length <= 2) {
        // Just set the value without slash
        setFormData({
          ...formData,
          [name]: sanitizedValue,
        });
      } else {
        // Format as MM/YY
        sanitizedValue = `${sanitizedValue.slice(0, 2)}/${sanitizedValue.slice(2, 4)}`;
        setFormData({
          ...formData,
          [name]: sanitizedValue,
        });
      }
    }
    else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Basic validations
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "Zip code is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    
    if (!formData.cardNumber.trim()) newErrors.cardNumber = "Card number is required";
    else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) 
      newErrors.cardNumber = "Card number must be 16 digits";
    
    if (!formData.cardExpiry.trim()) newErrors.cardExpiry = "Expiry date is required";
    else if (!/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) 
      newErrors.cardExpiry = "Expiry date must be in MM/YY format";
    
    if (!formData.cardCVC.trim()) newErrors.cardCVC = "CVC is required";
    else if (!/^\d{3}$/.test(formData.cardCVC)) 
      newErrors.cardCVC = "CVC must be 3 digits";

    if (!formData.termsAccepted) 
      newErrors.termsAccepted = "You must accept the terms and conditions";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
      }, 1500);
    }
  };

  // Available countries
  const countries = [
    { code: "US", name: "United States" },
    { code: "GB", name: "United Kingdom" },
    { code: "FR", name: "France" }
  ];

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-gray-800 rounded-xl p-8 text-center">
            <div className="mb-6 inline-block p-4 bg-green-500/20 rounded-full">
              <svg className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-4 text-white">Thank You For Your Order!</h1>
            <p className="text-xl text-gray-300 mb-8">
              Your order has been received and is being processed.
            </p>
            <div className="bg-gray-700 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-bold mb-4 text-white">Order Summary</h2>
              {selectedPackage && (
                <div className="flex justify-between items-center pb-4">
                  <div className="text-left">
                    <div className="text-white font-medium">{selectedPackage.name}</div>
                    <div className="text-gray-400 text-sm">{selectedPackage.category}</div>
                  </div>
                  <div className="text-white font-bold text-xl">USD {selectedPackage.price.toFixed(2)}</div>
                </div>
              )}
            </div>
            <div className="mb-8 text-gray-400 text-sm">
              <p>A confirmation email has been sent to {formData.email}</p>
            </div>
            <Link href="/" className="inline-block px-6 py-3 bg-gradient-to-r from-vid-red-600 to-vid-orange-500 text-white rounded-lg font-medium button-glow">
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-10 text-white text-center">Checkout</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="md:col-span-1 order-2 md:order-1">
              <div className="bg-gray-800 rounded-xl p-6 sticky top-8">
                <h2 className="text-xl font-bold mb-4 text-white">Order Summary</h2>
                
                {selectedPackage ? (
                  <div>
                    <div className="p-4 bg-gray-700 rounded-lg mb-4">
                      <div className="font-medium text-white text-lg mb-1">{selectedPackage.name}</div>
                      <div className="text-gray-400 text-sm mb-2">{selectedPackage.category} editing package</div>
                      <div className="text-vid-red-500 font-bold mt-2 text-xl">USD {selectedPackage.price.toFixed(2)}</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-400 text-center py-8">
                    No package selected. Please return to the <Link href="/pricing" className="text-vid-red-500 hover:text-vid-red-400">pricing page</Link>.
                  </div>
                )}
              </div>
            </div>
            
            {/* Checkout Form */}
            <div className="md:col-span-2 order-1 md:order-2">
              <div className="bg-gray-800 rounded-xl p-6 md:p-8">
                <h2 className="text-xl font-bold mb-6 text-white">Billing Information</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-8">
                    <div>
                      <label htmlFor="firstName" className="block text-gray-300 mb-2">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full bg-gray-700 text-white rounded-lg p-3 border ${
                          errors.firstName ? "border-red-500" : "border-gray-600"
                        }`}
                      />
                      {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="block text-gray-300 mb-2">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full bg-gray-700 text-white rounded-lg p-3 border ${
                          errors.lastName ? "border-red-500" : "border-gray-600"
                        }`}
                      />
                      {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                    </div>
                    
                    <div className="sm:col-span-2">
                      <label htmlFor="email" className="block text-gray-300 mb-2">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full bg-gray-700 text-white rounded-lg p-3 border ${
                          errors.email ? "border-red-500" : "border-gray-600"
                        }`}
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    
                    <div className="sm:col-span-2">
                      <label htmlFor="address" className="block text-gray-300 mb-2">Address</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className={`w-full bg-gray-700 text-white rounded-lg p-3 border ${
                          errors.address ? "border-red-500" : "border-gray-600"
                        }`}
                      />
                      {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="city" className="block text-gray-300 mb-2">City</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`w-full bg-gray-700 text-white rounded-lg p-3 border ${
                          errors.city ? "border-red-500" : "border-gray-600"
                        }`}
                      />
                      {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="zipCode" className="block text-gray-300 mb-2">Zip Code</label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className={`w-full bg-gray-700 text-white rounded-lg p-3 border ${
                          errors.zipCode ? "border-red-500" : "border-gray-600"
                        }`}
                      />
                      {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
                    </div>
                    
                    <div className="sm:col-span-2">
                      <label htmlFor="country" className="block text-gray-300 mb-2">Country</label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className={`w-full bg-gray-700 text-white rounded-lg p-3 border ${
                          errors.country ? "border-red-500" : "border-gray-600"
                        }`}
                      >
                        <option value="">Select your country</option>
                        {countries.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                      {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-bold mb-6 text-white">Payment Information</h2>
                  
                  <div className="grid grid-cols-1 gap-x-6 gap-y-4 mb-8">
                    <div>
                      <label htmlFor="cardNumber" className="block text-gray-300 mb-2">Card Number</label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234567890123456"
                        maxLength={16}
                        className={`w-full bg-gray-700 text-white rounded-lg p-3 border ${
                          errors.cardNumber ? "border-red-500" : "border-gray-600"
                        }`}
                      />
                      {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="cardExpiry" className="block text-gray-300 mb-2">Expiry Date</label>
                        <input
                          type="text"
                          id="cardExpiry"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          className={`w-full bg-gray-700 text-white rounded-lg p-3 border ${
                            errors.cardExpiry ? "border-red-500" : "border-gray-600"
                          }`}
                        />
                        {errors.cardExpiry && <p className="text-red-500 text-sm mt-1">{errors.cardExpiry}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="cardCVC" className="block text-gray-300 mb-2">CVC</label>
                        <input
                          type="text"
                          id="cardCVC"
                          name="cardCVC"
                          value={formData.cardCVC}
                          onChange={handleInputChange}
                          placeholder="123"
                          maxLength={3}
                          className={`w-full bg-gray-700 text-white rounded-lg p-3 border ${
                            errors.cardCVC ? "border-red-500" : "border-gray-600"
                          }`}
                        />
                        {errors.cardCVC && <p className="text-red-500 text-sm mt-1">{errors.cardCVC}</p>}
                      </div>
                    </div>

                    <div className="text-sm text-gray-400 mt-2">
                      Charges will appear as "{COMPANY.descriptor}" on your bank statement.
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-700 pt-6 mb-6">
                    <div className="flex items-start mb-6">
                      <div className="flex items-center h-5">
                        <input
                          id="termsAccepted"
                          name="termsAccepted"
                          type="checkbox"
                          checked={formData.termsAccepted}
                          onChange={handleInputChange}
                          className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-vid-red-500 focus:ring-vid-red-500"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="termsAccepted" className={`font-medium ${errors.termsAccepted ? "text-red-500" : "text-gray-300"}`}>
                          I agree to the terms and conditions and consent to be charged for the selected service
                        </label>
                        <p className="text-gray-500">
                          By checking this box, you consent to have your card charged for the selected package and agree to our{" "}
                          <Link href="/legal/terms" className="text-vid-red-500">Terms of Service</Link> and{" "}
                          <Link href="/legal/privacy" className="text-vid-red-500">Privacy Policy</Link>.
                        </p>
                        {errors.termsAccepted && <p className="text-red-500 text-sm mt-1">{errors.termsAccepted}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 bg-gradient-to-r from-vid-red-600 to-vid-orange-500 text-white rounded-lg font-medium transition-all ${
                      isSubmitting ? "opacity-70" : "button-glow"
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      <span>Complete Purchase</span>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-900 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-8 text-white">Checkout</h1>
          <div className="p-8 bg-gray-800 rounded-xl">
            <div className="animate-pulse text-gray-500">Loading checkout details...</div>
          </div>
        </div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
} 