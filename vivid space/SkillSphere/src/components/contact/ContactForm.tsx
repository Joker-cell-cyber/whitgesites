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
    gameType: "competitive",
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
        gameType: "competitive",
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
      className="relative"
    >
      {/* Tech border effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-indigo-600/20 rounded-xl blur-md"></div>
      <div className="absolute top-0 right-0 w-20 h-20">
        <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-cyan-500/40 to-transparent"></div>
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-cyan-500/40 to-transparent"></div>
      </div>
      <div className="absolute bottom-0 left-0 w-20 h-20">
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-cyan-500/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-px h-full bg-gradient-to-t from-cyan-500/40 to-transparent"></div>
      </div>
      
      <div className="relative bg-slate-900/90 backdrop-blur-md p-8 rounded-xl border border-indigo-600/30">
        <div className="flex items-center justify-between border-b border-indigo-600/30 pb-6 mb-8">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse mr-3"></div>
            <h2 className="text-2xl font-bold text-white font-['Montserrat']">Send Us a Message</h2>
          </div>
          <div className="flex space-x-2">
            <div className="w-2 h-2 rounded-full bg-red-500/80"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500/80"></div>
            <div className="w-2 h-2 rounded-full bg-green-500/80"></div>
          </div>
        </div>
        
        {submitStatus === "success" && (
          <div className="mb-6 p-5 bg-cyan-500/10 border border-cyan-500/30 rounded-md">
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-cyan-500 font-['Space_Grotesk']">
                Thank you! Your message has been sent successfully. We&apos;ll get back to you soon.
              </p>
            </div>
          </div>
        )}
        
        {submitStatus === "error" && (
          <div className="mb-6 p-5 bg-indigo-600/10 border border-indigo-600/30 rounded-md">
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-indigo-600/20 border border-indigo-600/40 flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <p className="text-indigo-400 font-['Space_Grotesk']">
                There was an error sending your message. Please try again later.
              </p>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2 font-['Space_Grotesk']">
                Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-800/80 border border-indigo-600/30 text-white rounded-md focus:ring-1 focus:ring-cyan-500/70 focus:border-cyan-500/70 font-['Space_Grotesk'] placeholder-gray-500"
                  placeholder="Your name"
                />
                <div className="absolute top-0 right-0 h-full w-10 flex items-center justify-center text-indigo-600/50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2 font-['Space_Grotesk']">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-800/80 border border-indigo-600/30 text-white rounded-md focus:ring-1 focus:ring-cyan-500/70 focus:border-cyan-500/70 font-['Space_Grotesk'] placeholder-gray-500"
                  placeholder="your.email@example.com"
                />
                <div className="absolute top-0 right-0 h-full w-10 flex items-center justify-center text-indigo-600/50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2 font-['Space_Grotesk']">
              Subject
            </label>
            <div className="relative">
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-slate-800/80 border border-indigo-600/30 text-white rounded-md focus:ring-1 focus:ring-cyan-500/70 focus:border-cyan-500/70 font-['Space_Grotesk'] placeholder-gray-500"
                placeholder="What is your message about?"
              />
              <div className="absolute top-0 right-0 h-full w-10 flex items-center justify-center text-indigo-600/50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="gameType" className="block text-sm font-medium text-gray-300 mb-2 font-['Space_Grotesk']">
              Game Type
            </label>
            <div className="relative">
              <select
                id="gameType"
                name="gameType"
                value={formData.gameType}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-800/80 border border-indigo-600/30 text-white rounded-md focus:ring-1 focus:ring-cyan-500/70 focus:border-cyan-500/70 font-['Space_Grotesk'] appearance-none"
              >
                <option value="competitive">Competitive Games (FPS, Battle Royale)</option>
                <option value="moba">MOBA Games</option>
                <option value="sports">Sports Games</option>
                <option value="other">Other Games</option>
              </select>
              <div className="absolute top-0 right-0 h-full w-10 flex items-center justify-center text-indigo-600/50 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2 font-['Space_Grotesk']">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 bg-slate-800/80 border border-indigo-600/30 text-white rounded-md focus:ring-1 focus:ring-cyan-500/70 focus:border-cyan-500/70 font-['Space_Grotesk'] placeholder-gray-500"
              placeholder="Tell us about what you want to improve in your gameplay"
            />
          </div>
          
          <div className="mt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="relative w-full overflow-hidden group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-200"></div>
              <div className="relative px-6 py-3.5 bg-slate-900 rounded-lg leading-none flex items-center justify-center">
                {isSubmitting ? (
                  <span className="flex items-center text-cyan-500 font-['Montserrat'] font-medium">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="text-cyan-500 group-hover:text-white transition duration-200 font-['Montserrat'] font-medium">
                    Send Message
                  </span>
                )}
              </div>
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
} 