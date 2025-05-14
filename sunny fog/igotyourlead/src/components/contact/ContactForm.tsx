"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { COMPANY } from "@/app/constants/company";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setFormStatus('submitting');
    
    // Fake form submission - simulate an API call
    // In a real implementation, you would send the form data to your server
    // const formData would include the recipient email as COMPANY.email
    console.log(`Form would be sent to: ${COMPANY.email}`);
    
    setTimeout(() => {
      setFormStatus('success');
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    }, 1500);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="bg-[#1F2937] border border-gray-800/30 text-white rounded-lg shadow-xl p-8"
    >
      <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-lead-blue-500 to-lead-green-500">
        Send Us a Message
      </h2>
      
      {formStatus === 'success' ? (
        <div className="bg-green-900/20 border border-green-800 text-green-300 rounded-lg p-4 mb-6">
          <p className="font-medium">Message sent successfully!</p>
          <p className="text-sm mt-1">Thank you for contacting us. Our team will get back to you shortly at <span className="text-green-200">{COMPANY.email}</span>.</p>
        </div>
      ) : formStatus === 'error' ? (
        <div className="bg-red-900/20 border border-red-800 text-red-300 rounded-lg p-4 mb-6">
          <p className="font-medium">Error sending message</p>
          <p className="text-sm mt-1">Please try again later or contact us directly at {COMPANY.email}</p>
        </div>
      ) : null}
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-300 mb-1">
              Your Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full bg-gray-800 rounded-lg border ${
                errors.name ? "border-red-500" : "border-gray-700"
              } px-4 py-2 focus:outline-none focus:border-lead-blue-500 text-white`}
              disabled={formStatus === 'submitting'}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-gray-300 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full bg-gray-800 rounded-lg border ${
                errors.email ? "border-red-500" : "border-gray-700"
              } px-4 py-2 focus:outline-none focus:border-lead-blue-500 text-white`}
              disabled={formStatus === 'submitting'}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-gray-300 mb-1">
              Phone Number (optional)
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-gray-800 rounded-lg border border-gray-700 px-4 py-2 focus:outline-none focus:border-lead-blue-500 text-white"
              disabled={formStatus === 'submitting'}
            />
          </div>
          
          <div>
            <label htmlFor="company" className="block text-gray-300 mb-1">
              Company Name (optional)
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full bg-gray-800 rounded-lg border border-gray-700 px-4 py-2 focus:outline-none focus:border-lead-blue-500 text-white"
              disabled={formStatus === 'submitting'}
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-gray-300 mb-1">
              Your Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className={`w-full bg-gray-800 rounded-lg border ${
                errors.message ? "border-red-500" : "border-gray-700"
              } px-4 py-2 focus:outline-none focus:border-lead-blue-500 text-white`}
              disabled={formStatus === 'submitting'}
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
          </div>
          
          <button
            type="submit"
            className={`w-full py-3 px-4 rounded-lg text-center font-medium transition-all ${
              formStatus === 'submitting'
                ? "bg-lead-blue-800 cursor-not-allowed"
                : "bg-gradient-to-r from-lead-blue-600 to-lead-green-500 hover:from-lead-blue-700 hover:to-lead-green-600"
            } text-white`}
            disabled={formStatus === 'submitting'}
          >
            {formStatus === 'submitting' ? "Sending..." : "Send Message"}
          </button>
          
          <p className="text-xs text-gray-400 mt-4">
            By submitting this form, you agree to our <a href="/legal/privacy" className="text-lead-blue-400 hover:underline">Privacy Policy</a> and <a href="/legal/terms" className="text-lead-blue-400 hover:underline">Terms of Service</a>.
          </p>
        </div>
      </form>
    </motion.div>
  );
} 