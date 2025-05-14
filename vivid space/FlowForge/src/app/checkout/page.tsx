"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { COMPANY } from "../constants/company";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const [product, setProduct] = useState<string | null>(null);
  const [price, setPrice] = useState<string | null>(null);
  const [cardNumber, setCardNumber] = useState('');
  const [cvc, setCvc] = useState('');
  const [expDate, setExpDate] = useState('');
  const [country, setCountry] = useState('United States');
  
  // Handle card number input with 16 character limit
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 16) {
      setCardNumber(value);
    }
  };
  
  // Handle CVC input with 3 character limit
  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 3) {
      setCvc(value);
    }
  };
  
  // Handle expiry date input with automatic slash after month
  const handleExpDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    
    setExpDate(value);
  };
  
  useEffect(() => {
    // Get product from URL params
    const productParam = searchParams.get("product");
    const priceParam = searchParams.get("price");
    
    if (productParam) {
      setProduct(decodeURIComponent(productParam));
    }
    
    if (priceParam) {
      setPrice(decodeURIComponent(priceParam));
    }
  }, [searchParams]);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Checkout</h1>
            <p className="text-lg text-gray-600">Complete your purchase</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Customer Information - 3 columns on md screens */}
            <div className="md:col-span-3 bg-white rounded-xl p-8 border border-gray-200">
              <h2 className="text-xl font-semibold mb-6 text-gray-900">Customer Information</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-make-purple-500 focus:border-make-purple-500 text-gray-900"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-make-purple-500 focus:border-make-purple-500 text-gray-900"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-make-purple-500 focus:border-make-purple-500 text-gray-900"
                    placeholder="john.doe@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">Company (Optional)</label>
                  <input
                    type="text"
                    id="company"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-make-purple-500 focus:border-make-purple-500 text-gray-900"
                    placeholder="Your Company"
                  />
                </div>
                
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                  <select
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-make-purple-500 focus:border-make-purple-500 text-gray-900"
                  >
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="France">France</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-make-purple-500 focus:border-make-purple-500 text-gray-900"
                    placeholder="+1 123 456 7890"
                  />
                </div>
                
                <h3 className="text-lg font-semibold mt-8 mb-4 text-gray-900">Payment Information</h3>
                
                <div>
                  <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-2">Name on card</label>
                  <input
                    type="text"
                    id="cardName"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-make-purple-500 focus:border-make-purple-500 text-gray-900"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">Card number</label>
                  <input
                    type="text"
                    id="cardNumber"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    maxLength={16}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-make-purple-500 focus:border-make-purple-500 text-gray-900"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="expDate" className="block text-sm font-medium text-gray-700 mb-2">Expiration date</label>
                    <input
                      type="text"
                      id="expDate"
                      value={expDate}
                      onChange={handleExpDateChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-make-purple-500 focus:border-make-purple-500 text-gray-900"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-2">CVC</label>
                    <input
                      type="text"
                      id="cvc"
                      value={cvc}
                      onChange={handleCvcChange}
                      maxLength={3}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-make-purple-500 focus:border-make-purple-500 text-gray-900"
                      placeholder="123"
                    />
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 italic mt-2">
                  Charges will appear as "{COMPANY.descriptor}" on your bank statement.
                </p>
              </div>
            </div>

            {/* Order Summary - 2 columns on md screens */}
            <div className="md:col-span-2">
              <div className="bg-gray-50 rounded-xl p-8 border border-gray-200 sticky top-8">
                <h2 className="text-xl font-semibold mb-6 text-gray-900">Order Summary</h2>
                
                {product && price ? (
                  <div className="mb-6">
                    <div className="flex justify-between items-center py-4 border-b border-gray-200">
                      <div>
                        <h3 className="font-medium text-gray-900">{product}</h3>
                        <p className="text-sm text-gray-700">One-time payment</p>
                      </div>
                      <span className="text-xl font-bold text-gray-900">{price}</span>
                    </div>
                    
                    <div className="flex justify-between py-4 text-lg font-bold text-gray-900 mt-4">
                      <span>Total:</span>
                      <span>{price}</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-700">No product selected.</p>
                    <Link href="/pricing" className="text-make-purple-600 font-medium hover:text-make-purple-700 mt-2 inline-block">
                      Browse available packages
                    </Link>
                  </div>
                )}
                
                {product && price && (
                  <>
                    <button className="w-full bg-make-purple-600 text-white py-4 px-6 rounded-xl font-medium hover:bg-make-purple-700 transition-colors mb-4">
                      Complete Purchase
                    </button>
                    
                    <p className="text-center text-sm text-gray-700">
                      By completing this purchase, you agree to our <Link href="/legal/terms" className="text-make-purple-600 hover:text-make-purple-700">Terms of Service</Link>
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Checkout</h1>
              <p className="text-lg text-gray-600">Loading your purchase details...</p>
            </div>
            <div className="p-8 bg-white rounded-xl border border-gray-200 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-10 bg-gray-200 rounded mb-4"></div>
              <div className="h-10 bg-gray-200 rounded mb-4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </section>
    }>
      <CheckoutContent />
    </Suspense>
  );
} 