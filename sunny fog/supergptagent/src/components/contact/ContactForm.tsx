"use client";

import { useState } from "react";
import { motion } from "framer-motion";

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
      className="bg-[#1e1e1e] border border-gray-800/30 rounded-lg shadow-xl p-8"
    >
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-ai-blue-500 to-ai-purple-500 mb-6">Send Us a Message</h2>
      
      {submitStatus === "success" && (
        <div className="mb-6 p-4 bg-green-900/20 text-green-400 border border-green-800 rounded-md">
          Thank you! Your message has been sent successfully. We&apos;ll get back to you soon.
        </div>
      )}
      
      {submitStatus === "error" && (
        <div className="mb-6 p-4 bg-red-900/20 text-red-400 border border-red-800 rounded-md">
          There was an error sending your message. Please try again later.
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 text-white rounded-md focus:ring-2 focus:ring-ai-blue-500 focus:border-ai-blue-500"
              placeholder="Your name"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 text-white rounded-md focus:ring-2 focus:ring-ai-blue-500 focus:border-ai-blue-500"
              placeholder="your.email@example.com"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 text-white rounded-md focus:ring-2 focus:ring-ai-blue-500 focus:border-ai-blue-500"
            placeholder="What is your message about?"
          />
        </div>
        
        <div>
          <label htmlFor="project" className="block text-sm font-medium text-gray-300 mb-1">
            AI Service Type
          </label>
          <select
            id="project"
            name="project"
            value={formData.project}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 text-white rounded-md focus:ring-2 focus:ring-ai-blue-500 focus:border-ai-blue-500"
          >
            <option value="basic">Basic AI Agents</option>
            <option value="enhanced">Enhanced AI Agents</option>
            <option value="enterprise">Enterprise AI Solutions</option>
            <option value="custom">Custom AI Development</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 text-white rounded-md focus:ring-2 focus:ring-ai-blue-500 focus:border-ai-blue-500"
            placeholder="Tell us about your AI agent needs or questions"
          />
        </div>
        
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-6 py-3 text-white font-medium rounded-md shadow-sm ${
              isSubmitting ? "bg-ai-blue-800" : "bg-gradient-to-r from-ai-blue-600 to-ai-purple-500 hover:from-ai-blue-700 hover:to-ai-purple-600 button-glow"
            } focus:outline-none focus:ring-2 focus:ring-ai-blue-500 focus:ring-offset-2 transition-colors duration-200`}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>
    </motion.div>
  );
} 