import React from "react";
import { COMPANY } from "../../app/constants/company";

interface PaymentDetailsFormProps {
  formData: {
    cardNumber: string;
    cardExpiry: string;
    cardCvc: string;
    billingAddress: string;
    city: string;
    postalCode: string;
    country: string;
    consentChecked?: boolean;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  prevStep: () => void;
  nextStep: () => void;
}

export default function PaymentDetailsForm({ 
  formData, 
  handleChange, 
  prevStep, 
  nextStep 
}: PaymentDetailsFormProps) {
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };
  
  // Format card number with spaces
  const formatCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, "");
    const formatted = value.replace(/(\d{4})/g, "$1 ").trim();
    
    e.target.value = formatted;
    handleChange(e);
  };
  
  // Format card expiry with slash
  const formatCardExpiry = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\//g, "");
    
    if (value.length > 2) {
      e.target.value = value.substring(0, 2) + "/" + value.substring(2, 4);
    } else {
      e.target.value = value;
    }
    
    handleChange(e);
  };
  
  const countries = [
    "United States", "United Kingdom", "France"
  ];
  
  const isFormValid = () => {
    return (
      formData.cardNumber.replace(/\s/g, "").length >= 16 &&
      formData.cardExpiry.length === 5 &&
      formData.cardCvc.length >= 3 &&
      formData.billingAddress &&
      formData.city &&
      formData.postalCode &&
      formData.country
    );
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-6">Payment Details</h3>
      
      <div className="mb-6">
        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-300 mb-1">
          Card Number *
        </label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={formatCardNumber}
          maxLength={19}
          placeholder="0000 0000 0000 0000"
          required
          className="w-full bg-[#0a0a14] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-ai-blue-500 focus:border-transparent"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-300 mb-1">
            Expiry Date *
          </label>
          <input
            type="text"
            id="cardExpiry"
            name="cardExpiry"
            value={formData.cardExpiry}
            onChange={formatCardExpiry}
            maxLength={5}
            placeholder="MM/YY"
            required
            className="w-full bg-[#0a0a14] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-ai-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label htmlFor="cardCvc" className="block text-sm font-medium text-gray-300 mb-1">
            CVC/CVV *
          </label>
          <input
            type="text"
            id="cardCvc"
            name="cardCvc"
            value={formData.cardCvc}
            onChange={handleChange}
            maxLength={4}
            placeholder="000"
            required
            className="w-full bg-[#0a0a14] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-ai-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <h4 className="text-md font-medium text-gray-300 mb-4 mt-8">Billing Address</h4>
      
      <div className="mb-4">
        <label htmlFor="billingAddress" className="block text-sm font-medium text-gray-300 mb-1">
          Street Address *
        </label>
        <input
          type="text"
          id="billingAddress"
          name="billingAddress"
          value={formData.billingAddress}
          onChange={handleChange}
          required
          className="w-full bg-[#0a0a14] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-ai-blue-500 focus:border-transparent"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-1">
            City *
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full bg-[#0a0a14] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-ai-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label htmlFor="postalCode" className="block text-sm font-medium text-gray-300 mb-1">
            Postal Code *
          </label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            required
            className="w-full bg-[#0a0a14] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-ai-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <div className="mb-8">
        <label htmlFor="country" className="block text-sm font-medium text-gray-300 mb-1">
          Country *
        </label>
        <select
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
          className="w-full bg-[#0a0a14] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-ai-blue-500 focus:border-transparent"
        >
          <option value="">Select a country</option>
          {countries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>
      
      <div className="mt-6 p-4 bg-[#0a0a14] rounded-lg border border-gray-800">
        <label className="flex items-start cursor-pointer">
          <div className="flex items-center h-5">
            <input
              type="checkbox"
              name="consentChecked"
              checked={formData.consentChecked || false}
              onChange={handleChange}
              className="w-4 h-4 text-ai-blue-600 bg-gray-900 border-gray-700 rounded focus:ring-ai-blue-500 focus:ring-2 focus:ring-offset-0"
              required
            />
          </div>
          <div className="ml-3 text-sm">
            <span className="font-medium text-gray-300">
              I authorize payment and accept terms
            </span>
            <p className="text-gray-500 text-xs mt-1">
              By checking this box, I confirm that I have read and agree to the <a href="/legal/terms" className="text-ai-blue-400 hover:underline">Terms of Service</a>, <a href="/legal/privacy" className="text-ai-blue-400 hover:underline">Privacy Policy</a>, and <a href="/legal/cookies" className="text-ai-blue-400 hover:underline">Cookie Policy</a>.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Charges will appear as &quot;{COMPANY.descriptor} &quot; on your bank statement.
            </p>
          </div>
        </label>
      </div>
      
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isFormValid() || !(formData.consentChecked || false)}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-ai-blue-600 to-ai-purple-600 text-white font-medium hover:from-ai-blue-700 hover:to-ai-purple-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          Review Order
        </button>
      </div>
    </div>
  );
} 