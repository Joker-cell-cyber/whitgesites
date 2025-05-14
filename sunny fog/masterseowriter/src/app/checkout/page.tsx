"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/context/CheckoutContext";
import { COMPANY } from "@/app/constants/company";
import Link from "next/link";

export default function Checkout() {
  const { selectedPackage, clearCheckout } = useCheckout();
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    termsAccepted: false,
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [submitting, setSubmitting] = useState(false);

  // Only allow US, UK, and France
  const countries = [
    { code: "US", name: "United States" },
    { code: "GB", name: "United Kingdom" },
    { code: "FR", name: "France" }
  ];

  useEffect(() => {
    // Redirect if no package is selected
    if (!selectedPackage) {
      router.push("/pricing");
    }
  }, [selectedPackage, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    
    if (name === "cardNumber") {
      // Limit to 16 characters and only numbers
      const numericValue = value.replace(/\D/g, '').substring(0, 16);
      setFormData({
        ...formData,
        [name]: numericValue,
      });
    } else if (name === "expiryDate") {
      // Format as MM/YY automatically
      let numericValue = value.replace(/\D/g, '');
      if (numericValue.length > 2) {
        numericValue = numericValue.substring(0, 2) + '/' + numericValue.substring(2, 4);
      }
      setFormData({
        ...formData,
        [name]: numericValue,
      });
    } else if (name === "cvv") {
      // Limit to 3 characters and only numbers
      const numericValue = value.replace(/\D/g, '').substring(0, 3);
      setFormData({
        ...formData,
        [name]: numericValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validate = () => {
    const newErrors: {[key: string]: string} = {};
    
    // Simple validation
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Valid email is required";
    }
    if (!formData.cardNumber) newErrors.cardNumber = "Card number is required";
    if (formData.cardNumber.length !== 16) newErrors.cardNumber = "Card number must be 16 digits";
    if (!formData.expiryDate) newErrors.expiryDate = "Expiry date is required";
    if (!formData.cvv) newErrors.cvv = "CVV is required";
    if (formData.cvv.length !== 3) newErrors.cvv = "CVV must be 3 digits";
    if (!formData.country) newErrors.country = "Please select a country";
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = "You must accept the terms and conditions";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setSubmitting(true);
    
    // Simulate submission - in a real app, you'd send this to an API
    setTimeout(() => {
      setSubmitting(false);
      // Show success message or redirect
      alert("Order processed successfully! This is just a simulation for compliance check purposes.");
      clearCheckout();
      router.push("/");
    }, 1500);
  };

  if (!selectedPackage) {
    return <div className="container mx-auto px-4 py-12 text-center">Loading...</div>;
  }

  return (
    <div className="bg-gray-50 py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">Complete your order</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left side - Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              <form onSubmit={handleSubmit}>
                <h2 className="text-xl font-semibold mb-6 text-gray-900">Personal Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-turquoise-500 focus:border-turquoise-500 text-gray-900`}
                    />
                    {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-turquoise-500 focus:border-turquoise-500 text-gray-900`}
                    />
                    {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-turquoise-500 focus:border-turquoise-500 text-gray-900`}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-turquoise-500 focus:border-turquoise-500 text-gray-900"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-turquoise-500 focus:border-turquoise-500 text-gray-900"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border ${errors.country ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-turquoise-500 focus:border-turquoise-500 text-gray-900`}
                    >
                      <option value="">Select a country</option>
                      {countries.map(country => (
                        <option key={country.code} value={country.code}>{country.name}</option>
                      ))}
                    </select>
                    {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-turquoise-500 focus:border-turquoise-500 text-gray-900"
                    />
                  </div>
                </div>
                
                <h2 className="text-xl font-semibold mb-6 text-gray-900">Payment Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      maxLength={16}
                      className={`w-full px-4 py-2 border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-turquoise-500 focus:border-turquoise-500 text-gray-900`}
                    />
                    {errors.cardNumber && <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date (MM/YY)
                    </label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-turquoise-500 focus:border-turquoise-500 text-gray-900`}
                    />
                    {errors.expiryDate && <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                      CVC
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={handleChange}
                      maxLength={3}
                      className={`w-full px-4 py-2 border ${errors.cvv ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-turquoise-500 focus:border-turquoise-500 text-gray-900`}
                    />
                    {errors.cvv && <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>}
                  </div>
                </div>

                <div className="mt-6 px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm text-gray-600">
                  <p className="font-medium">Charges will appear as "{COMPANY.descriptor}" on your bank statement.</p>
                </div>
                
                <div className="mt-8">
                  <div className="flex items-start">
                    <input
                      id="termsAccepted"
                      name="termsAccepted"
                      type="checkbox"
                      checked={formData.termsAccepted}
                      onChange={handleChange}
                      className={`h-4 w-4 text-turquoise-600 focus:ring-turquoise-500 border-gray-300 rounded mt-1 ${errors.termsAccepted ? 'border-red-500' : ''}`}
                    />
                    <label htmlFor="termsAccepted" className="ml-2 block text-sm text-gray-700">
                      I agree to the <Link href="/legal/terms" className="text-turquoise-600 hover:text-turquoise-500">Terms of Service</Link> and <Link href="/legal/privacy" className="text-turquoise-600 hover:text-turquoise-500">Privacy Policy</Link>
                    </label>
                  </div>
                  {errors.termsAccepted && <p className="mt-1 text-sm text-red-600">{errors.termsAccepted}</p>}
                </div>
                
                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-turquoise-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-turquoise-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-turquoise-500 transition-colors"
                  >
                    {submitting ? "Processing..." : "Complete Order"}
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          {/* Right side - Order summary */}
          <div>
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 sticky top-6">
              <h2 className="text-xl font-semibold mb-6 text-gray-900">Order Summary</h2>
              
              <div className="mb-6">
                <div className="flex justify-between text-gray-700 mb-2">
                  <span>Package</span>
                  <span className="font-medium">{selectedPackage.name}</span>
                </div>
                
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>${selectedPackage.price}</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="text-sm text-gray-500 space-y-2">
                  <p>Your payment is secure and encrypted</p>
                  <p>We accept all major credit cards</p>
                  <p>We only accept card payments at this time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 