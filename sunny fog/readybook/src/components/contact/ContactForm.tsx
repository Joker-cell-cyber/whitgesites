"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { COMPANY } from "../../app/constants/company";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    project: "basic",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Here you would connect this to your actual form submission API
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      setSubmitStatus("success");
      // Reset the form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        project: "basic",
      });
    } catch (error) {
      setSubmitStatus("error");
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white border border-book-blue-100 rounded-lg shadow-lg p-8"
    >
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-book-blue-600 to-book-green-500 mb-6">Send Us a Message</h2>
      
      {submitStatus === "success" && (
        <div className="mb-6 p-4 bg-green-100 text-green-700 border border-green-200 rounded-md">
          Thank you! Your message has been sent successfully. We&apos;ll get back to you soon.
        </div>
      )}
      
      {submitStatus === "error" && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 border border-red-200 rounded-md">
          An error occurred while sending your message. Please try again later.
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-book-blue-800 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-book-blue-50 border border-book-blue-200 text-book-blue-900 rounded-md focus:ring-2 focus:ring-book-blue-500 focus:border-book-blue-500"
              placeholder="Your name"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-book-blue-800 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-book-blue-50 border border-book-blue-200 text-book-blue-900 rounded-md focus:ring-2 focus:ring-book-blue-500 focus:border-book-blue-500"
              placeholder={COMPANY.email}
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-book-blue-800 mb-1">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-book-blue-50 border border-book-blue-200 text-book-blue-900 rounded-md focus:ring-2 focus:ring-book-blue-500 focus:border-book-blue-500"
            placeholder="What is your message about?"
          />
        </div>
        
        <div>
          <label htmlFor="project" className="block text-sm font-medium text-book-blue-800 mb-1">
            Project Type
          </label>
          <select
            id="project"
            name="project"
            value={formData.project}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-book-blue-50 border border-book-blue-200 text-book-blue-900 rounded-md focus:ring-2 focus:ring-book-blue-500 focus:border-book-blue-500"
          >
            <option value="basic">E-Book Basic (5,000 words)</option>
            <option value="standard">E-Book Standard (10,000 words)</option>
            <option value="premium">E-Book Premium (15,000 words)</option>
            <option value="professional">E-Book Professional (20,000+ words)</option>
            <option value="custom">Custom Project</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-book-blue-800 mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-4 py-2 bg-book-blue-50 border border-book-blue-200 text-book-blue-900 rounded-md focus:ring-2 focus:ring-book-blue-500 focus:border-book-blue-500"
            placeholder="Tell us about your project or question"
          />
        </div>
        
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-6 py-3 text-white font-medium rounded-md shadow-sm ${
              isSubmitting ? "bg-book-blue-400" : "bg-gradient-to-r from-book-blue-600 to-book-green-500 hover:from-book-blue-700 hover:to-book-green-600 button-glow"
            } focus:outline-none focus:ring-2 focus:ring-book-blue-500 focus:ring-offset-2 transition-colors duration-200`}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>
    </motion.div>
  );
} 