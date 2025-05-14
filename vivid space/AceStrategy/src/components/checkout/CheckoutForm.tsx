"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import PokerChip from "../ui/PokerChip";
import { COMPANY } from "@/app/constants/company";

// Product type definition
type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  type: string;
  chipColor: 'red' | 'blue' | 'green' | 'black' | 'gold';
};

export default function CheckoutForm() {
  const searchParams = useSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    acceptTerms: false
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Mock product data - in a real app, you would fetch this from an API
  const allProducts = [
    // Cash Game Products
    {
      id: "cash-basic",
      name: "Cash Basic Session",
      price: 9.99,
      description: "One-on-one coaching focused on fundamental cash game concepts (1-hour session)",
      type: "Cash Game",
      chipColor: "red" as const
    },
    {
      id: "cash-standard",
      name: "Cash Standard",
      price: 29.50,
      description: "In-depth coaching session with pre-session preparation and post-session review (1-hour session)",
      type: "Cash Game",
      chipColor: "blue" as const
    },
    {
      id: "cash-premium",
      name: "Cash Premium",
      price: 59.90,
      description: "Premium coaching package with intensive hand analysis and personalized strategy development (2-hour session)",
      type: "Cash Game",
      chipColor: "green" as const
    },
    {
      id: "cash-elite",
      name: "Cash Elite",
      price: 99.99,
      description: "Elite coaching experience for serious players looking to master advanced GTO concepts (2-hour session)",
      type: "Cash Game",
      chipColor: "black" as const
    },
    // Tournament Products
    {
      id: "tournament-basic",
      name: "Tournament Basic",
      price: 19.50,
      description: "Essential tournament strategy coaching focused on fundamentals (1-hour session)",
      type: "Tournament",
      chipColor: "red" as const
    },
    {
      id: "tournament-standard",
      name: "Tournament Standard",
      price: 39.90,
      description: "Comprehensive tournament coaching with ICM analysis and advanced concepts (1-hour session)",
      type: "Tournament",
      chipColor: "blue" as const
    },
    {
      id: "tournament-premium",
      name: "Tournament Premium",
      price: 69.99,
      description: "Premium tournament coaching with detailed final table strategy and MTT toolkit (2-hour session)",
      type: "Tournament",
      chipColor: "green" as const
    },
    {
      id: "tournament-elite",
      name: "Tournament Elite",
      price: 109.50,
      description: "Elite tournament mastery program with personalized strategy development (2-hour session)",
      type: "Tournament",
      chipColor: "black" as const
    },
    // Spin & Go Products
    {
      id: "spin-basic",
      name: "Spin & Go Basic",
      price: 19.90,
      description: "Introduction to Spin & Go strategy and format-specific concepts (1-hour session)",
      type: "Spin & Go",
      chipColor: "red" as const
    },
    {
      id: "spin-standard",
      name: "Spin & Go Standard",
      price: 49.50,
      description: "Comprehensive Spin & Go coaching with personalized strategy development (1-hour session)",
      type: "Spin & Go",
      chipColor: "blue" as const
    },
    {
      id: "spin-premium",
      name: "Spin & Go Premium",
      price: 79.99,
      description: "Premium Spin & Go coaching with advanced push/fold analysis and multiplier-specific strategy (2-hour session)",
      type: "Spin & Go",
      chipColor: "green" as const
    },
    {
      id: "spin-elite",
      name: "Spin & Go Elite",
      price: 119.90,
      description: "Elite coaching for Spin & Go specialists looking to maximize ROI at all multiplier levels (2-hour session)",
      type: "Spin & Go",
      chipColor: "gold" as const
    }
  ];

  // Find product based on URL parameters
  useEffect(() => {
    const productId = searchParams.get("package");
    if (productId) {
      const foundProduct = allProducts.find(p => p.id === productId);
      setProduct(foundProduct || null);
    } else {
      // If no product is specified, use the first product as a fallback
      setProduct(allProducts[0]);
    }
    setIsLoading(false);
  }, [searchParams]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  // Format card expiry (MM/YY)
  const formatCardExpiry = (value: string) => {
    // Supprime les espaces et caractères non-numériques
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    // Limite l'entrée à 4 chiffres maximum (MM/YY)
    const digits = v.substring(0, 4);
    
    if (digits.length >= 2) {
      // Format MM/YY
      return `${digits.substring(0, 2)}/${digits.substring(2, 4)}`;
    }
    
    return digits;
  };

  // Handle special formatting for certain fields
  const handleSpecialFields = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'cardNumber') {
      e.target.value = formatCardNumber(value);
    } else if (name === 'cardExpiry') {
      // Pour cardExpiry, on doit tout reformater et mettre à jour le state
      const formattedValue = formatCardExpiry(value);
      e.target.value = formattedValue;
      // Mettre à jour le state pour refléter la valeur formatée
      setFormData({
        ...formData,
        cardExpiry: formattedValue
      });
    } else if (name === 'cardCvc') {
      e.target.value = value.replace(/[^\d]/g, '').substring(0, 3);
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Basic validation
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    // Card validation
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = "Card number is required";
    } else if (formData.cardNumber.replace(/\s/g, '').length < 16) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }
    
    if (!formData.cardExpiry.trim()) {
      newErrors.cardExpiry = "Expiry date is required";
    } else if (!/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) {
      newErrors.cardExpiry = "Invalid format (MM/YY)";
    }
    
    if (!formData.cardCvc.trim()) {
      newErrors.cardCvc = "CVC is required";
    } else if (formData.cardCvc.length < 3) {
      newErrors.cardCvc = "CVC must be 3 digits";
    }
    
    // Terms acceptance
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "You must agree to the terms and consent to be charged";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate form submission delay
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 1500);
    }
  };

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center py-12">Product not found.</div>;
  }

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-xl mx-auto bg-felt-900/90 p-8 rounded-xl border border-chip-gold-500/30 shadow-lg"
      >
        <div className="text-center">
          <div className="inline-block p-3 rounded-full bg-chip-gold-500/20 mb-4">
            <svg className="w-12 h-12 text-chip-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Payment Successful!</h2>
          <p className="text-gray-300 mb-6">
            Thank you for your purchase. A confirmation email has been sent to {formData.email}.
          </p>
          <a 
            href="/"
            className="inline-block py-2.5 px-6 rounded-lg bg-gradient-to-r from-chip-gold-600 to-chip-gold-400 text-black font-medium hover:shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            Return to Home
          </a>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {/* Order Summary */}
      <div className="lg:col-span-1">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-felt-900/80 backdrop-blur-sm p-6 rounded-xl border border-felt-700/50 sticky top-24"
        >
          <h2 className="text-xl font-bold mb-4 pb-4 border-b border-felt-700/50">Order Summary</h2>
          
          <div className="flex items-start mb-6">
            <PokerChip 
              color={product.chipColor} 
              size="md"
              className="mr-4 mt-1"
            />
            <div>
              <h3 className="text-xl font-bold text-white">{product.name}</h3>
              <p className="text-gray-400 text-sm">{product.type}</p>
              <p className="text-gray-300 mt-2">{product.description}</p>
            </div>
          </div>
          
          <div className="border-t border-felt-700/50 pt-4 mb-2">
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Total:</span>
              <span className="text-white">${product.price.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="border-t border-felt-700/50 pt-4 mb-4">
            <div className="flex justify-between">
              <span className="text-lg font-bold">Amount to pay:</span>
              <span className="text-xl font-bold text-chip-gold-500">${product.price.toFixed(2)}</span>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Checkout Form */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="lg:col-span-2"
      >
        <div className="bg-felt-900/80 backdrop-blur-sm p-6 rounded-xl border border-felt-700/50">
          <h2 className="text-xl font-bold mb-6 pb-4 border-b border-felt-700/50">Payment Details</h2>
          
          <div className="mb-4 p-3 bg-felt-800/80 border border-felt-700/50 rounded-lg">
            <p className="text-sm text-gray-300">
              Charges will appear as "{COMPANY.website}" on your bank statement.
            </p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-1">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 bg-felt-800 border ${errors.firstName ? 'border-red-500' : 'border-felt-700'} rounded-lg focus:outline-none focus:ring-1 focus:ring-chip-gold-500 focus:border-chip-gold-500`}
                />
                {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-1">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 bg-felt-800 border ${errors.lastName ? 'border-red-500' : 'border-felt-700'} rounded-lg focus:outline-none focus:ring-1 focus:ring-chip-gold-500 focus:border-chip-gold-500`}
                />
                {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 bg-felt-800 border ${errors.email ? 'border-red-500' : 'border-felt-700'} rounded-lg focus:outline-none focus:ring-1 focus:ring-chip-gold-500 focus:border-chip-gold-500`}
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Billing Address</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="md:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-1">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-felt-800 border border-felt-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-chip-gold-500 focus:border-chip-gold-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-1">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-felt-800 border border-felt-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-chip-gold-500 focus:border-chip-gold-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-300 mb-1">Postal Code</label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-felt-800 border border-felt-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-chip-gold-500 focus:border-chip-gold-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-300 mb-1">Country</label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-felt-800 border border-felt-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-chip-gold-500 focus:border-chip-gold-500"
                  >
                    <option value="">Select a country</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="France">France</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Payment Information</h3>
              
              <div className="mb-4">
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-300 mb-1">Card Number</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={(e) => {
                    handleInputChange(e);
                    handleSpecialFields(e);
                  }}
                  maxLength={19}
                  placeholder="XXXX XXXX XXXX XXXX"
                  className={`w-full px-4 py-2 bg-felt-800 border ${errors.cardNumber ? 'border-red-500' : 'border-felt-700'} rounded-lg focus:outline-none focus:ring-1 focus:ring-chip-gold-500 focus:border-chip-gold-500`}
                />
                {errors.cardNumber && <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-300 mb-1">Expiry Date</label>
                  <input
                    type="text"
                    id="cardExpiry"
                    name="cardExpiry"
                    value={formData.cardExpiry}
                    onChange={(e) => {
                      handleInputChange(e);
                      handleSpecialFields(e);
                    }}
                    placeholder="MM/YY"
                    maxLength={5}
                    className={`w-full px-4 py-2 bg-felt-800 border ${errors.cardExpiry ? 'border-red-500' : 'border-felt-700'} rounded-lg focus:outline-none focus:ring-1 focus:ring-chip-gold-500 focus:border-chip-gold-500`}
                  />
                  {errors.cardExpiry && <p className="mt-1 text-sm text-red-500">{errors.cardExpiry}</p>}
                </div>
                
                <div>
                  <label htmlFor="cardCvc" className="block text-sm font-medium text-gray-300 mb-1">CVC</label>
                  <input
                    type="text"
                    id="cardCvc"
                    name="cardCvc"
                    value={formData.cardCvc}
                    onChange={(e) => {
                      handleInputChange(e);
                      handleSpecialFields(e);
                    }}
                    placeholder="XXX"
                    maxLength={3}
                    className={`w-full px-4 py-2 bg-felt-800 border ${errors.cardCvc ? 'border-red-500' : 'border-felt-700'} rounded-lg focus:outline-none focus:ring-1 focus:ring-chip-gold-500 focus:border-chip-gold-500`}
                  />
                  {errors.cardCvc && <p className="mt-1 text-sm text-red-500">{errors.cardCvc}</p>}
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="acceptTerms"
                    name="acceptTerms"
                    type="checkbox"
                    checked={formData.acceptTerms}
                    onChange={handleInputChange}
                    className="w-4 h-4 bg-felt-800 border-felt-700 rounded focus:ring-chip-gold-500 text-chip-gold-500"
                  />
                </div>
                <div className="ml-3">
                  <label htmlFor="acceptTerms" className="text-sm text-gray-300">
                    I consent to be charged the amount shown for this purchase and agree to the <a href="/legal/terms" className="text-chip-gold-500 hover:underline">Terms of Service</a> and <a href="/legal/privacy" className="text-chip-gold-500 hover:underline">Privacy Policy</a>.
                  </label>
                  {errors.acceptTerms && <p className="mt-1 text-sm text-red-500">{errors.acceptTerms}</p>}
                </div>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-chip-gold-600 to-chip-gold-400 text-black font-medium hover:shadow-lg transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                `Complete Purchase - $${product.price.toFixed(2)}`
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
} 