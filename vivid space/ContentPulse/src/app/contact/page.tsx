"use client";

import { useState } from "react";
import { COMPANY } from "@/app/constants/company";
import Link from "next/link";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    service: "",
    company: ""
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call - no actual email sent
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        service: "",
        company: ""
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ContactHero />
      {isSuccess ? (
        <SuccessMessage />
      ) : (
        <ContactForm 
          formData={formData}
          errors={errors}
          isSubmitting={isSubmitting}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
      <ContactInfo />
    </>
  );
}

function SuccessMessage() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8 md:p-12 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">Thank You!</h2>
            <p className="text-lg text-black mb-8">
              Your message has been sent successfully. We'll get back to you as soon as possible.
            </p>
            <Link 
              href="/"
              className="inline-block bg-turquoise-600 hover:bg-turquoise-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactHero() {
  return (
    <section className="relative bg-gradient-to-tr from-turquoise-700 to-turquoise-500 text-white pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-center opacity-20"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-sm font-semibold bg-white/20 rounded-full px-3 py-1 mb-6">Contact Us</span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Let's <span className="text-turquoise-100">Connect</span>
          </h1>
          
          <p className="text-lg md:text-xl text-turquoise-50 mb-10 max-w-2xl mx-auto">
            Have a question or ready to start your project? We're here to help you create content that drives results.
          </p>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/10 to-transparent"></div>
    </section>
  );
}

function ContactForm({
  formData,
  errors,
  isSubmitting,
  handleChange,
  handleSubmit
}: {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    service: string;
    company: string;
  };
  errors: Record<string, string>;
  isSubmitting: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-6">Send us a message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-black mb-1">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise-500 focus:border-turquoise-500 text-black"
                    placeholder="Your first name"
                  />
                  {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-black mb-1">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise-500 focus:border-turquoise-500 text-black"
                    placeholder="Your last name"
                  />
                  {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-black mb-1">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise-500 focus:border-turquoise-500 text-black"
                  placeholder="you@example.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-black mb-1">Phone Number (Optional)</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise-500 focus:border-turquoise-500 text-black"
                  placeholder="Your phone number"
                />
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-black mb-1">Company (Optional)</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise-500 focus:border-turquoise-500 text-black"
                  placeholder="Your company name"
                />
              </div>
              
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-black mb-1">Service of Interest</label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise-500 focus:border-turquoise-500 text-black"
                >
                  <option value="">Select a service</option>
                  <option value="blog-articles">Blog Articles & Posts</option>
                  <option value="website-copy">Website Copy</option>
                  <option value="product-descriptions">Product Descriptions</option>
                  <option value="seo-optimization">SEO Content Optimization</option>
                  <option value="email-campaigns">Email Campaigns</option>
                  <option value="long-form-content">Long-form Content</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-black mb-1">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise-500 focus:border-turquoise-500 text-black"
                  placeholder="Tell us about your project or question..."
                ></textarea>
                {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
              </div>
              
              <div className="flex items-start">
                <input
                  id="privacy-policy"
                  name="privacy-policy"
                  type="checkbox"
                  className="h-4 w-4 text-turquoise-600 focus:ring-turquoise-500 border-gray-300 rounded mt-1"
                  required
                />
                <label htmlFor="privacy-policy" className="ml-2 block text-sm text-black">
                  I agree to the <Link href="/legal/privacy" className="text-turquoise-600 hover:text-turquoise-500">Privacy Policy</Link> and consent to being contacted regarding my inquiry.
                </label>
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-turquoise-600 hover:bg-turquoise-700 text-white font-medium py-3 px-6 rounded-lg transition-colors ${isSubmitting ? 'bg-turquoise-300' : ''}`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactInfo() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ContactInfoCard
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            }
            title="Email Us"
            description="For inquiries and support"
            info={COMPANY.email}
            link={`mailto:${COMPANY.email}`}
          />
          
          <ContactInfoCard
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            }
            title="Call Us"
            description="Monday-Friday, 9AM-5PM ET"
            info={COMPANY.phone}
            link={`tel:${COMPANY.phone}`}
          />
          
          <ContactInfoCard
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            }
            title="Our Location"
            description="Office Address"
            info={COMPANY.address}
            link={`https://maps.google.com/?q=${encodeURIComponent(COMPANY.address)}`}
          />
        </div>
      </div>
    </section>
  );
}

function ContactInfoCard({ icon, title, description, info, link }: { icon: React.ReactNode; title: string; description: string; info: string; link: string }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm text-center">
      <div className="w-12 h-12 bg-turquoise-100 rounded-full flex items-center justify-center text-turquoise-600 mx-auto mb-4">
        {icon}
      </div>
      
      <h3 className="text-xl font-bold text-black mb-2">{title}</h3>
      <p className="text-black mb-4">{description}</p>
      
      <a href={link} className="text-black hover:text-black font-medium transition-colors">
        {info}
      </a>
    </div>
  );
} 