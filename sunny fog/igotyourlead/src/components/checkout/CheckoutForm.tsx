"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { COMPANY } from '@/app/constants/company';

interface CheckoutFormProps {
  price: number;
}

export default function CheckoutForm({ price }: CheckoutFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'United States',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
    agreeToTerms: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    
    if (name === 'cardNumber') {
      // Limit to 16 characters for card number
      if (value.replace(/\s/g, '').length > 16) return;
    }
    
    if (name === 'cardCVC') {
      // Limit to 3 characters for CVC
      if (value.length > 3) return;
    }
    
    if (name === 'cardExpiry') {
      // Format expiry date with slash after MM
      const expiry = value.replace(/[^0-9]/g, '');
      if (expiry.length > 4) return;
      
      let formattedExpiry = '';
      if (expiry.length > 2) {
        formattedExpiry = expiry.slice(0, 2) + '/' + expiry.slice(2);
      } else {
        formattedExpiry = expiry;
      }
      
      setFormData({
        ...formData,
        [name]: formattedExpiry
      });
      
      // Clear the error for this field
      if (errors[name]) {
        setErrors({
          ...errors,
          [name]: ''
        });
      }
      
      return;
    }
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear the error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (formData.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }
    
    if (!formData.cardExpiry.trim()) {
      newErrors.cardExpiry = 'Card expiry is required';
    }
    
    if (!formData.cardCVC.trim()) {
      newErrors.cardCVC = 'Security code is required';
    } else if (formData.cardCVC.length !== 3) {
      newErrors.cardCVC = 'CVC must be 3 digits';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Here you would normally make API calls to process payment
      // For now, we'll just simulate a successful submission
      
      setTimeout(() => {
        router.push('/checkout/success');
      }, 1500);
    } catch (error) {
      console.error('Error processing checkout:', error);
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4 text-white">Billing Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="firstName" className="block text-gray-400 mb-1">First Name*</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`w-full bg-zinc-800 rounded-lg px-4 py-2 border ${errors.firstName ? 'border-red-500' : 'border-zinc-700'} focus:outline-none focus:border-lead-blue-500`}
          />
          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
        </div>
        
        <div>
          <label htmlFor="lastName" className="block text-gray-400 mb-1">Last Name*</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`w-full bg-zinc-800 rounded-lg px-4 py-2 border ${errors.lastName ? 'border-red-500' : 'border-zinc-700'} focus:outline-none focus:border-lead-blue-500`}
          />
          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="email" className="block text-gray-400 mb-1">Email*</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full bg-zinc-800 rounded-lg px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-zinc-700'} focus:outline-none focus:border-lead-blue-500`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-gray-400 mb-1">Phone*</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full bg-zinc-800 rounded-lg px-4 py-2 border ${errors.phone ? 'border-red-500' : 'border-zinc-700'} focus:outline-none focus:border-lead-blue-500`}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>
      </div>
      
      <div className="mb-6">
        <label htmlFor="address" className="block text-gray-400 mb-1">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full bg-zinc-800 rounded-lg px-4 py-2 border border-zinc-700 focus:outline-none focus:border-lead-blue-500"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div>
          <label htmlFor="city" className="block text-gray-400 mb-1">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full bg-zinc-800 rounded-lg px-4 py-2 border border-zinc-700 focus:outline-none focus:border-lead-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="zipCode" className="block text-gray-400 mb-1">Zip Code</label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            className="w-full bg-zinc-800 rounded-lg px-4 py-2 border border-zinc-700 focus:outline-none focus:border-lead-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="country" className="block text-gray-400 mb-1">Country</label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full bg-zinc-800 rounded-lg px-4 py-2 border border-zinc-700 focus:outline-none focus:border-lead-blue-500"
          >
            <option value="United States">United States</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="France">France</option>
          </select>
        </div>
      </div>
      
      <h2 className="text-xl font-bold mb-4 text-white">Payment Information</h2>
      
      <div className="mb-6">
        <label htmlFor="cardNumber" className="block text-gray-400 mb-1">Card Number*</label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleChange}
          placeholder="XXXX XXXX XXXX XXXX"
          maxLength={16}
          className={`w-full bg-zinc-800 rounded-lg px-4 py-2 border ${errors.cardNumber ? 'border-red-500' : 'border-zinc-700'} focus:outline-none focus:border-lead-blue-500`}
        />
        {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="cardExpiry" className="block text-gray-400 mb-1">Expiry Date*</label>
          <input
            type="text"
            id="cardExpiry"
            name="cardExpiry"
            value={formData.cardExpiry}
            onChange={handleChange}
            placeholder="MM/YY"
            className={`w-full bg-zinc-800 rounded-lg px-4 py-2 border ${errors.cardExpiry ? 'border-red-500' : 'border-zinc-700'} focus:outline-none focus:border-lead-blue-500`}
          />
          {errors.cardExpiry && <p className="text-red-500 text-sm mt-1">{errors.cardExpiry}</p>}
        </div>
        
        <div>
          <label htmlFor="cardCVC" className="block text-gray-400 mb-1">Security Code (CVC)*</label>
          <input
            type="text"
            id="cardCVC"
            name="cardCVC"
            value={formData.cardCVC}
            onChange={handleChange}
            placeholder="CVC"
            maxLength={3}
            className={`w-full bg-zinc-800 rounded-lg px-4 py-2 border ${errors.cardCVC ? 'border-red-500' : 'border-zinc-700'} focus:outline-none focus:border-lead-blue-500`}
          />
          {errors.cardCVC && <p className="text-red-500 text-sm mt-1">{errors.cardCVC}</p>}
        </div>
      </div>
      
      <div className="px-4 py-3 mb-6 bg-zinc-900 rounded-lg border border-zinc-800">
        <p className="text-gray-400 text-sm">
          Charges will appear as &quot;{COMPANY.website}&quot; on your bank statement.
        </p>
      </div>
      
      <div className="mb-8">
        <label className="flex items-start cursor-pointer">
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            className="mt-1 bg-zinc-800 border-zinc-700 rounded text-lead-blue-500"
          />
          <span className="ml-2 text-gray-400 text-sm">
            I agree to the <a href="/legal/terms" className="text-lead-blue-500 hover:text-lead-blue-400" target="_blank" rel="noopener noreferrer">Terms of Service</a> and <a href="/legal/privacy" className="text-lead-blue-500 hover:text-lead-blue-400" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
          </span>
        </label>
        {errors.agreeToTerms && <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms}</p>}
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-3 px-4 rounded-lg text-center font-medium transition-all bg-gradient-to-r ${
          isSubmitting 
            ? 'from-lead-blue-800 to-lead-green-800 cursor-not-allowed' 
            : 'from-lead-blue-600 to-lead-green-500 hover:from-lead-blue-700 hover:to-lead-green-600'
        } text-white`}
      >
        {isSubmitting ? 'Processing...' : `Pay $${price.toFixed(2)} USD`}
      </button>
      
      <p className="text-center text-gray-500 text-sm mt-4">
        Your payment is secure and encrypted
      </p>
    </form>
  );
} 