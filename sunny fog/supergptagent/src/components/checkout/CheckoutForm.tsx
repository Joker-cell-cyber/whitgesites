"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import OrderSummary from "./OrderSummary";
import PersonalInfoForm from "./PersonalInfoForm";
import PaymentDetailsForm from "./PaymentDetailsForm";

export default function CheckoutForm() {
  const searchParams = useSearchParams();
  const packageName = searchParams.get("package") || "Standard Package";
  const packagePrice = parseFloat(searchParams.get("price") || "29.90");
  
  const [formData, setFormData] = useState({
    // Personal info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    
    // Payment details
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    billingAddress: "",
    city: "",
    postalCode: "",
    country: "",
    
    // Consent
    consentChecked: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };
  
  const nextStep = () => {
    setFormStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };
  
  const prevStep = () => {
    setFormStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consentChecked) {
      alert("Please agree to the terms and conditions to proceed.");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 1500);
  };
  
  if (formSubmitted) {
    return (
      <div className="max-w-4xl mx-auto bg-[#14141e] p-8 rounded-xl shadow-lg border border-gray-800">
        <div className="text-center py-8">
          <div className="mb-4 text-green-400 text-6xl">✓</div>
          <h2 className="text-2xl font-bold mb-4">Order Confirmed!</h2>
          <p className="text-gray-400 mb-6">
            Thank you for your purchase. We&apos;ve sent a confirmation email to {formData.email}.
          </p>
          <p className="text-gray-400">
            Order reference: <span className="text-white font-mono">{Math.random().toString(36).substring(2, 12).toUpperCase()}</span>
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: Form */}
        <div className="lg:col-span-2 bg-[#14141e] p-6 rounded-xl shadow-lg border border-gray-800">
          <form onSubmit={handleSubmit}>
            {formStep === 1 && (
              <PersonalInfoForm 
                formData={formData} 
                handleChange={handleChange} 
                nextStep={nextStep}
              />
            )}
            
            {formStep === 2 && (
              <PaymentDetailsForm 
                formData={formData} 
                handleChange={handleChange} 
                prevStep={prevStep}
                nextStep={nextStep}
              />
            )}
            
            {formStep === 3 && (
              <div>
                <h3 className="text-xl font-semibold mb-6">Review & Confirm</h3>
                
                <div className="mb-8 p-4 bg-[#0a0a14] rounded-lg">
                  <h4 className="font-medium text-gray-300 mb-2">Personal Information</h4>
                  <p className="text-white mb-1">{formData.firstName} {formData.lastName}</p>
                  <p className="text-gray-400 mb-1">{formData.email}</p>
                  <p className="text-gray-400">{formData.phone}</p>
                </div>
                
                <div className="mb-8 p-4 bg-[#0a0a14] rounded-lg">
                  <h4 className="font-medium text-gray-300 mb-2">Payment Details</h4>
                  <p className="text-white mb-1">•••• •••• •••• {formData.cardNumber.slice(-4)}</p>
                  <p className="text-gray-400 mb-1">Expires: {formData.cardExpiry}</p>
                  <p className="text-gray-400 mb-2">Billing address:</p>
                  <p className="text-gray-400">{formData.billingAddress}</p>
                  <p className="text-gray-400">{formData.city}, {formData.postalCode}</p>
                  <p className="text-gray-400">{formData.country}</p>
                </div>
                
                <div className="flex mt-8 space-x-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.consentChecked}
                    className={`flex-1 px-6 py-2 rounded-lg bg-gradient-to-r from-ai-blue-600 to-ai-purple-600 text-white font-medium hover:from-ai-blue-700 hover:to-ai-purple-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed ${isSubmitting ? 'opacity-70' : ''}`}
                  >
                    {isSubmitting ? 'Processing...' : 'Complete Order'}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
        
        {/* Right column: Order summary */}
        <div className="lg:col-span-1">
          <OrderSummary packageName={packageName} packagePrice={packagePrice} />
        </div>
      </div>
    </div>
  );
} 