import React, { useState } from 'react';
import Link from 'next/link';
import { COMPANY } from '@/app/constants/company';

interface CheckoutFormProps {
  packageName: string;
  packagePrice: number;
  onSubmit: () => void;
  isLoading: boolean;
}

export default function CheckoutForm({ packageName, packagePrice, onSubmit, isLoading }: CheckoutFormProps) {
  const [agreed, setAgreed] = useState(false);
  const [formComplete, setFormComplete] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [country, setCountry] = useState('United States');

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, '');
    return digits.slice(0, 16);
  };

  // Format expiry date with slash
  const formatExpiryDate = (value: string) => {
    const digits = value.replace(/\D/g, '');
    
    if (digits.length <= 2) {
      return digits;
    }
    
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
  };

  // Format CVC - limit to 3 digits
  const formatCVC = (value: string) => {
    const digits = value.replace(/\D/g, '');
    return digits.slice(0, 3);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(formatCardNumber(e.target.value));
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpiryDate(formatExpiryDate(e.target.value));
  };

  const handleCVCChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCvc(formatCVC(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <section aria-labelledby="contact-info-heading" className="mt-10 border border-gray-800 rounded-lg p-6 mb-8">
        <h2 id="contact-info-heading" className="text-lg font-medium text-white mb-4">Contact information</h2>

        <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
          <div>
            <label htmlFor="first-name" className="block text-sm font-medium text-gray-300">
              First name
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="first-name"
                name="first-name"
                autoComplete="given-name"
                className="block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-gray-200 focus:ring-[--neon-blue] focus:border-[--neon-blue]"
                required
                onChange={() => setFormComplete(true)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="last-name" className="block text-sm font-medium text-gray-300">
              Last name
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="last-name"
                name="last-name"
                autoComplete="family-name"
                className="block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-gray-200 focus:ring-[--neon-blue] focus:border-[--neon-blue]"
                required
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <div className="mt-1">
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                className="block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-gray-200 focus:ring-[--neon-blue] focus:border-[--neon-blue]"
                required
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="country" className="block text-sm font-medium text-gray-300">
              Country
            </label>
            <div className="mt-1">
              <select
                id="country"
                name="country"
                autoComplete="country-name"
                className="block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-gray-200 focus:ring-[--neon-blue] focus:border-[--neon-blue]"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              >
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="France">France</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="payment-heading" className="border border-gray-800 rounded-lg p-6 mb-8">
        <h2 id="payment-heading" className="text-lg font-medium text-white mb-4">Payment details</h2>

        <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
          <div className="sm:col-span-2">
            <label htmlFor="card-number" className="block text-sm font-medium text-gray-300">
              Card number
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="card-number"
                name="card-number"
                autoComplete="cc-number"
                className="block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-gray-200 focus:ring-[--neon-blue] focus:border-[--neon-blue]"
                placeholder="**** **** **** ****"
                value={cardNumber}
                onChange={handleCardNumberChange}
                maxLength={16}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-300">
              Expiration date (MM/YY)
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="expiration-date"
                name="expiration-date"
                autoComplete="cc-exp"
                className="block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-gray-200 focus:ring-[--neon-blue] focus:border-[--neon-blue]"
                placeholder="MM/YY"
                value={expiryDate}
                onChange={handleExpiryDateChange}
                maxLength={5}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="cvc" className="block text-sm font-medium text-gray-300">
              CVC
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="cvc"
                name="cvc"
                autoComplete="csc"
                className="block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-gray-200 focus:ring-[--neon-blue] focus:border-[--neon-blue]"
                placeholder="***"
                value={cvc}
                onChange={handleCVCChange}
                maxLength={3}
                required
              />
            </div>
          </div>
        </div>

        <div className="mt-6 text-sm text-gray-400">
          <p>Charges will appear as "{COMPANY.descriptor}" on your bank statement.</p>
        </div>
      </section>

      <div className="border border-gray-800 rounded-lg p-6 mb-8">
        <div className="relative flex items-start">
          <div className="flex items-center h-5">
            <input
              id="terms"
              aria-describedby="terms-description"
              name="terms"
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="h-4 w-4 text-[--neon-blue] bg-gray-800 border-gray-700 rounded focus:ring-[--neon-blue]"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="font-medium text-gray-300">
              I agree to the charges and terms
            </label>
            <p id="terms-description" className="text-gray-400">
              I agree to be charged ${packagePrice.toFixed(2)} for the {packageName} package and accept the 
              <Link href="/legal/terms" className="text-[--neon-blue] ml-1">
                terms and conditions
              </Link>
              .
            </p>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={!formComplete || !agreed || isLoading}
        className={`w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-white ${
          formComplete && agreed
            ? "bg-gradient-to-r from-[--neon-purple] to-[--neon-blue] hover:opacity-90"
            : "bg-gray-700 cursor-not-allowed"
        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--neon-blue]`}
      >
        {isLoading ? (
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : null}
        {isLoading ? "Processing..." : "Complete Order"}
      </button>
    </form>
  );
} 