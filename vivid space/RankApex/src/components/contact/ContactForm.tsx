"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { COMPANY } from "@/app/constants/company";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    game: "",
    subject: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null);
  const [showThankYou, setShowThankYou] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission with a delay
    setTimeout(() => {
      // 95% chance of success
      const isSuccess = Math.random() < 0.95;
      
      if (isSuccess) {
        setSubmitStatus("success");
        setShowThankYou(true);
        // Reset form
        setFormData({
          name: "",
          email: "",
          projectType: "",
          game: "",
          subject: "",
          message: ""
        });
      } else {
        setSubmitStatus("error");
      }
      
      setIsSubmitting(false);
    }, 1500);
  };

  const projectOptions = [
    { label: "Select boost type", value: "" },
    { label: "Rank Boost", value: "rank-boost" },
    { label: "Placement Matches", value: "placement-matches" },
    { label: "Duo Boost", value: "duo-boost" },
    { label: "Coaching", value: "coaching" },
    { label: "Other", value: "other" }
  ];

  const gameOptions = [
    { label: "Select game", value: "" },
    { label: "League of Legends", value: "league-of-legends" },
    { label: "Valorant", value: "valorant" },
    { label: "CS2", value: "cs2" },
    { label: "Overwatch 2", value: "overwatch-2" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="card-apex p-8"
    >
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold gradient-text mb-6">Send Us a Message</h2>
        
        <p className="text-gray-300 mb-6">
          Have questions about our boosting services? Need more information about specific games or ranks? 
          Fill out the form below and our professional boosting team will respond within 24 hours.
        </p>

        {showThankYou && (
          <div className="bg-rank-emerald-900 bg-opacity-30 border border-rank-emerald-500 p-6 rounded-lg mb-8 text-center">
            <CheckCircleIcon className="w-16 h-16 mx-auto text-rank-emerald-500 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Thanks for reaching out!</h3>
            <p className="text-gray-300">
              We&apos;ve received your message about boosting services. Our team will get back to you within 24 hours to discuss your rank improvement goals.
            </p>
          </div>
        )}
        
        {submitStatus === "error" && (
          <div className="mb-6 p-4 bg-rank-orange-900/30 border border-rank-orange-700 rounded-md">
            <p className="text-rank-orange-400">
              There was an error submitting your form. Please try again or contact us directly at {COMPANY.email}.
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
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
              className="w-full px-4 py-3 bg-card-accent border border-rank-emerald-900/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-rank-emerald-500 text-white"
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
              className="w-full px-4 py-3 bg-card-accent border border-rank-emerald-900/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-rank-emerald-500 text-white"
              placeholder="Your email"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="projectType" className="block text-sm font-medium text-gray-300 mb-1">
              Boost Type
            </label>
            <select
              id="projectType"
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-card-accent border border-rank-emerald-900/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-rank-emerald-500 text-white"
            >
              {projectOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="game" className="block text-sm font-medium text-gray-300 mb-1">
              Game
            </label>
            <select
              id="game"
              name="game"
              value={formData.game}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-card-accent border border-rank-emerald-900/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-rank-emerald-500 text-white"
            >
              {gameOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="mb-6">
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
            className="w-full px-4 py-3 bg-card-accent border border-rank-emerald-900/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-rank-emerald-500 text-white"
            placeholder="What is your message about?"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Your Message</label>
          <textarea
            id="message"
            name="message"
            rows={6}
            className="w-full bg-card-accent border border-rank-emerald-900/30 rounded-lg shadow-inner p-3 text-gray-300 focus:ring-rank-emerald-500 focus:border-rank-emerald-500"
            placeholder="How can we help with your boosting needs?"
            required
            value={formData.message}
            onChange={handleChange}
          />
        </div>

        <div className="text-right">
          <button
            type="submit"
            disabled={isSubmitting}
            className="button-apex inline-flex items-center px-6 py-3 rounded-lg shadow-sm text-base font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <span>Get Your Boost Started</span>
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
} 