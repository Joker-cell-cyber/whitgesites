"use client";

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { COMPANY } from '../constants/company';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const [packageDetails, setPackageDetails] = useState({
    name: '',
    price: 0,
    level: '',
    duration: ''
  });
  const [consent, setConsent] = useState({
    payment: false,
    terms: false
  });
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    cardNumber: '',
    expiry: '',
    cvc: ''
  });
  
  useEffect(() => {
    const name = searchParams.get('name') || '';
    const price = parseFloat(searchParams.get('price') || '0');
    const level = searchParams.get('level') || '';
    const duration = searchParams.get('duration') || '';
    
    setPackageDetails({
      name,
      price,
      level,
      duration
    });
  }, [searchParams]);
  
  // Calculate total (no tax breakdown displayed)
  const total = packageDetails.price;

  // Check if both consent checkboxes are checked
  const isFormValid = consent.payment && consent.terms;

  // Countries allowed for selection
  const allowedCountries = ["United States", "United Kingdom", "France"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle special formatting for expiry date with / separator
    if (name === 'expiry') {
      const cleanValue = value.replace(/[^0-9]/g, '');
      if (cleanValue.length <= 4) {
        const formattedValue = cleanValue.length > 2 
          ? `${cleanValue.slice(0, 2)}/${cleanValue.slice(2)}` 
          : cleanValue;
        setFormData(prev => ({ ...prev, [name]: formattedValue }));
      }
      return;
    }
    
    // Handle max length for card number and CVC
    if (name === 'cardNumber' && value.length > 16) {
      return;
    }
    
    if (name === 'cvc' && value.length > 3) {
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        Complete Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-beat-purple-500 to-beat-gold-500">Purchase</span>
      </h1>
      
      <div className="max-w-3xl mx-auto bg-gray-800/50 rounded-xl p-8 border border-gray-700">
        {/* Package Details */}
        <div className="mb-8 pb-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Your Selected Package</h2>
          
          {packageDetails.name ? (
            <div className="bg-gray-800/80 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg">{packageDetails.name}</h3>
                  <div className="flex gap-2 mt-1">
                    <span className="bg-beat-purple-500/20 text-beat-purple-400 text-xs font-medium py-1 px-2 rounded">
                      {packageDetails.level}
                    </span>
                    <span className="bg-gray-700 text-gray-300 text-xs font-medium py-1 px-2 rounded">
                      {packageDetails.duration}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold">${packageDetails.price.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-400">No package selected. Please go back to the pricing page.</p>
          )}
          
          {/* Order Summary - Only showing total */}
          {packageDetails.name && (
            <div className="bg-gray-800/80 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-xl text-beat-purple-400">${total.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Only show the form if a package is selected */}
        {packageDetails.name && (
          <form className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">First Name</label>
                  <input 
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Last Name</label>
                  <input 
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" 
                    required 
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Address Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Street Address</label>
                  <input 
                    type="text" 
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" 
                    required 
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">City</label>
                    <input 
                      type="text" 
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">State / Province</label>
                    <input 
                      type="text" 
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">ZIP / Postal Code</label>
                    <input 
                      type="text" 
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" 
                      required 
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Country</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                required
              >
                {allowedCountries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Payment Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Card Number</label>
                  <input 
                    type="text" 
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" 
                    placeholder="0000 0000 0000 0000" 
                    maxLength={16}
                    required 
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Expiration Date</label>
                    <input 
                      type="text" 
                      name="expiry"
                      value={formData.expiry}
                      onChange={handleChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" 
                      placeholder="MM/YY" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">CVC</label>
                    <input 
                      type="text" 
                      name="cvc"
                      value={formData.cvc}
                      onChange={handleChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" 
                      placeholder="123"
                      maxLength={3} 
                      required 
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-3 text-sm text-gray-400">
              Charges will appear as &quot;{COMPANY.serviceName}&quot; on your bank statement.
            </div>
            
            {/* Consent Checkboxes */}
            <div className="space-y-3 pt-2 pb-4 border-t border-gray-700">
              <div className="flex items-start mt-4">
                <input 
                  type="checkbox" 
                  id="payment-consent" 
                  className="mt-1 h-4 w-4 rounded border-gray-600 bg-gray-700 text-beat-purple-500 focus:ring-beat-purple-500"
                  checked={consent.payment}
                  onChange={() => setConsent({...consent, payment: !consent.payment})}
                  required
                />
                <label htmlFor="payment-consent" className="ml-2 block text-sm text-gray-300">
                  I consent to have my card debited for the amount of ${total.toFixed(2)} for the selected coaching package.
                </label>
              </div>
              
              <div className="flex items-start">
                <input 
                  type="checkbox" 
                  id="terms-consent" 
                  className="mt-1 h-4 w-4 rounded border-gray-600 bg-gray-700 text-beat-purple-500 focus:ring-beat-purple-500"
                  checked={consent.terms}
                  onChange={() => setConsent({...consent, terms: !consent.terms})}
                  required
                />
                <label htmlFor="terms-consent" className="ml-2 block text-sm text-gray-300">
                  I have read and agree to the <Link href="/legal/terms" className="text-beat-purple-400 hover:text-beat-purple-300 underline">Terms and Conditions</Link> and <Link href="/legal/privacy" className="text-beat-purple-400 hover:text-beat-purple-300 underline">Privacy Policy</Link>.
                </label>
              </div>
            </div>
            
            <div className="pt-4">
              <button 
                type="submit" 
                className={`w-full bg-gradient-to-r from-beat-purple-600 to-beat-gold-500 text-white font-medium py-3 px-4 rounded-lg transition-colors ${isFormValid ? 'hover:from-beat-purple-700 hover:to-beat-gold-600 button-glow' : 'opacity-70 cursor-not-allowed'}`}
                disabled={!isFormValid}
              >
                Pay ${total.toFixed(2)} Now
              </button>
              <p className="text-center text-sm text-gray-400 mt-4">
                Your payment information is secure and encrypted
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-16 flex justify-center items-center">
        <div className="text-xl">Loading checkout...</div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
} 