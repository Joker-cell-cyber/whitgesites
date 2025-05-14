"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    scriptType: "cold",
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
        scriptType: "cold",
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
      className="bg-white border border-cs-blue-100 rounded-xl shadow-xl p-8"
    >
      <h2 className="text-2xl font-bold text-cs-navy-900 mb-6">Send Us a Message</h2>
      
      {submitStatus === "success" && (
        <div className="mb-6 p-4 bg-green-50 text-green-700 border border-green-200 rounded-md">
          Thank you! Your message has been sent successfully. We&apos;ll get back to you soon.
        </div>
      )}
      
      {submitStatus === "error" && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-md">
          There was an error sending your message. Please try again later.
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-cs-navy-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-white border border-cs-blue-200 text-cs-navy-900 rounded-lg focus:ring-2 focus:ring-cs-blue-500 focus:border-cs-blue-500"
              placeholder="Your name"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-cs-navy-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-white border border-cs-blue-200 text-cs-navy-900 rounded-lg focus:ring-2 focus:ring-cs-blue-500 focus:border-cs-blue-500"
              placeholder="your.email@example.com"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-cs-navy-700 mb-1">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-white border border-cs-blue-200 text-cs-navy-900 rounded-lg focus:ring-2 focus:ring-cs-blue-500 focus:border-cs-blue-500"
            placeholder="What is your message about?"
          />
        </div>
        
        <div>
          <label htmlFor="scriptType" className="block text-sm font-medium text-cs-navy-700 mb-1">
            Script Type
          </label>
          <select
            id="scriptType"
            name="scriptType"
            value={formData.scriptType}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white border border-cs-blue-200 text-cs-navy-900 rounded-lg focus:ring-2 focus:ring-cs-blue-500 focus:border-cs-blue-500"
          >
            <option value="cold">Cold Calling Script</option>
            <option value="closing">Sales Closing Script</option>
            <option value="follow">Follow-Up Sequence</option>
            <option value="custom">Custom Script Solution</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-cs-navy-700 mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-4 py-2 bg-white border border-cs-blue-200 text-cs-navy-900 rounded-lg focus:ring-2 focus:ring-cs-blue-500 focus:border-cs-blue-500"
            placeholder="Tell us about your business needs or any questions you have"
          />
        </div>
        
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-6 py-3 text-white font-medium rounded-lg shadow-sm ${
              isSubmitting ? "bg-cs-blue-400" : "bg-gradient-to-r from-cs-blue-600 to-cs-navy-600 hover:from-cs-blue-700 hover:to-cs-navy-700 button-glow"
            } focus:outline-none focus:ring-2 focus:ring-cs-blue-500 focus:ring-offset-2 transition-colors duration-200`}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>
    </motion.div>
  );
} 