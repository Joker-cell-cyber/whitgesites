"use client";

import { useState } from 'react';
import { COMPANY } from '@/app/constants/company';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
    package: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call - no actual email is sent
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        subject: '',
        message: '',
        package: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-white">Send Us a Message</h2>
      
      {submitSuccess && (
        <div className="mb-6 p-4 bg-indigo-900/50 border border-indigo-500/50 text-indigo-200 rounded-xl backdrop-blur-sm">
          <div className="flex items-center">
            <div className="mr-3 flex-shrink-0">
              <svg className="h-5 w-5 text-indigo-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <p>Thank you for your message! Our team will get back to you shortly.</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-indigo-200 mb-1">
              Full Name *
            </label>
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-slate-700/50 border rounded-xl focus:outline-none focus:ring-2 placeholder-slate-400 text-white ${
                  errors.name 
                    ? 'border-red-500 focus:ring-red-500/50' 
                    : 'border-slate-600 focus:border-indigo-500 focus:ring-indigo-500/50'
                }`}
                placeholder="Enter your name"
              />
              {errors.name && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-indigo-200 mb-1">
              Email Address *
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-slate-700/50 border rounded-xl focus:outline-none focus:ring-2 placeholder-slate-400 text-white ${
                  errors.email 
                    ? 'border-red-500 focus:ring-red-500/50' 
                    : 'border-slate-600 focus:border-indigo-500 focus:ring-indigo-500/50'
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
          </div>
          
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-indigo-200 mb-1">
              Company
            </label>
            <input
              id="company"
              name="company"
              type="text"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 placeholder-slate-400 text-white"
              placeholder="Your company name"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-indigo-200 mb-1">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 placeholder-slate-400 text-white"
              placeholder="Your phone number"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-indigo-200 mb-1">
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 placeholder-slate-400 text-white"
            placeholder="What is your message about?"
          />
        </div>
        
        <div>
          <label htmlFor="package" className="block text-sm font-medium text-indigo-200 mb-1">
            Interested Package
          </label>
          <div className="relative">
            <select
              id="package"
              name="package"
              value={formData.package}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 appearance-none text-white"
            >
              <option value="" className="bg-slate-800">Select a package</option>
              <option value="starter" className="bg-slate-800">Starter - $9.90</option>
              <option value="basic" className="bg-slate-800">Basic - $19.50</option>
              <option value="standard" className="bg-slate-800">Standard - $29.99</option>
              <option value="professional" className="bg-slate-800">Professional - $39.90</option>
              <option value="advanced" className="bg-slate-800">Advanced - $49.99</option>
              <option value="business" className="bg-slate-800">Business - $59.50</option>
              <option value="business-plus" className="bg-slate-800">Business Plus - $69.90</option>
              <option value="enterprise-starter" className="bg-slate-800">Enterprise Starter - $79.99</option>
              <option value="enterprise" className="bg-slate-800">Enterprise - $89.50</option>
              <option value="enterprise-plus" className="bg-slate-800">Enterprise Plus - $99.90</option>
              <option value="enterprise-pro" className="bg-slate-800">Enterprise Pro - $109.99</option>
              <option value="enterprise-ultimate" className="bg-slate-800">Enterprise Ultimate - $119.50</option>
              <option value="custom" className="bg-slate-800">Custom Solution</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-indigo-300">
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-indigo-200 mb-1">
            Message *
          </label>
          <div className="relative">
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-slate-700/50 border rounded-xl focus:outline-none focus:ring-2 placeholder-slate-400 text-white ${
                errors.message 
                  ? 'border-red-500 focus:ring-red-500/50' 
                  : 'border-slate-600 focus:border-indigo-500 focus:ring-indigo-500/50'
              }`}
              placeholder="How can we help you?"
            ></textarea>
            {errors.message && (
              <div className="absolute top-3 right-3 pointer-events-none">
                <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-6 py-4 rounded-xl text-white font-medium transition-all duration-300 transform 
              ${isSubmitting 
                ? 'bg-indigo-700/50 cursor-not-allowed' 
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-[1.01]'
              }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </div>
            ) : 'Send Message'}
          </button>
        </div>
      </form>
    </div>
  );
} 