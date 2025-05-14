"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { COMPANY } from "@/app/constants/company";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    project: "youtube",
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
      // In a real implementation, this would send the form data to 
      // support@vivid-script.com
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      setSubmitStatus("success");
      // Reset the form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        project: "youtube",
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
      className="bg-white border border-vid-white-300 rounded-lg shadow-xl p-8 glass-effect"
    >
      <h2 className="text-2xl font-bold gradient-text mb-6 heading-font">Send Us a Message</h2>
      
      {submitStatus === "success" && (
        <div className="mb-6 p-4 bg-green-100 text-green-800 border border-green-300 rounded-md">
          Thank you! Your message has been sent successfully. We&apos;ll get back to you soon.
        </div>
      )}
      
      {submitStatus === "error" && (
        <div className="mb-6 p-4 bg-red-100 text-red-800 border border-red-300 rounded-md">
          There was an error sending your message. Please try again later.
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-vid-blue-800 mb-1 heading-font">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-vid-white-100 border border-vid-white-300 text-vid-blue-900 rounded-md focus:ring-2 focus:ring-vid-blue-400 focus:border-vid-blue-400"
              placeholder="Your name"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-vid-blue-800 mb-1 heading-font">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-vid-white-100 border border-vid-white-300 text-vid-blue-900 rounded-md focus:ring-2 focus:ring-vid-blue-400 focus:border-vid-blue-400"
              placeholder="your.email@example.com"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-vid-blue-800 mb-1 heading-font">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-vid-white-100 border border-vid-white-300 text-vid-blue-900 rounded-md focus:ring-2 focus:ring-vid-blue-400 focus:border-vid-blue-400"
            placeholder="What is your message about?"
          />
        </div>
        
        <div>
          <label htmlFor="project" className="block text-sm font-medium text-vid-blue-800 mb-1 heading-font">
            Script Type
          </label>
          <select
            id="project"
            name="project"
            value={formData.project}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-vid-white-100 border border-vid-white-300 text-vid-blue-900 rounded-md focus:ring-2 focus:ring-vid-blue-400 focus:border-vid-blue-400"
          >
            <option value="youtube">YouTube Script</option>
            <option value="short">Short-Form Content (TikTok/Reels)</option>
            <option value="review">Product Review</option>
            <option value="tutorial">Tutorial/How-To</option>
            <option value="podcast">Podcast/Interview</option>
            <option value="ad">Commercial/Advertisement</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-vid-blue-800 mb-1 heading-font">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-4 py-2 bg-vid-white-100 border border-vid-white-300 text-vid-blue-900 rounded-md focus:ring-2 focus:ring-vid-blue-400 focus:border-vid-blue-400"
            placeholder="Tell us about your content needs or any questions you have"
          />
        </div>
        
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-6 py-3 text-white font-medium rounded-md shadow-sm heading-font ${
              isSubmitting ? "bg-vid-blue-700" : "bg-accent hover:bg-accent-hover button-glow"
            } focus:outline-none focus:ring-2 focus:ring-vid-blue-400 focus:ring-offset-2 transition-colors duration-200`}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>
    </motion.div>
  );
} 