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
    experience: "beginner",
    daw: "other",
    genre: "hiphop"
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
      // This is just for show - no actual email is sent
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      setSubmitStatus("success");
      // Reset the form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        experience: "beginner",
        daw: "other",
        genre: "hiphop"
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
      className="bg-[#1a1a24] border border-gray-800/30 rounded-lg shadow-xl p-8"
    >
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-beat-purple-500 to-beat-gold-500 mb-6">Book Your Coaching Session</h2>
      
      {submitStatus === "success" && (
        <div className="mb-6 p-4 bg-green-900/20 text-green-400 border border-green-800 rounded-md">
          Thank you! Your request has been sent successfully. We&apos;ll get back to you within 24 hours to schedule your coaching session.
        </div>
      )}
      
      {submitStatus === "error" && (
        <div className="mb-6 p-4 bg-red-900/20 text-red-400 border border-red-800 rounded-md">
          There was an error sending your message. Please try again or contact us directly at {COMPANY.email}
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
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 text-white rounded-md focus:ring-2 focus:ring-beat-purple-500 focus:border-beat-purple-500"
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
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 text-white rounded-md focus:ring-2 focus:ring-beat-purple-500 focus:border-beat-purple-500"
              placeholder="your.email@example.com"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
            What do you want to achieve?
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 text-white rounded-md focus:ring-2 focus:ring-beat-purple-500 focus:border-beat-purple-500"
            placeholder="e.g., Improve my mixing skills, Learn beat-making from scratch"
          />
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="experience" className="block text-sm font-medium text-gray-300 mb-1">
              Your Experience Level
            </label>
            <select
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 text-white rounded-md focus:ring-2 focus:ring-beat-purple-500 focus:border-beat-purple-500"
            >
              <option value="beginner">Beginner - Just starting out</option>
              <option value="intermediate">Intermediate - Some experience</option>
              <option value="advanced">Advanced - Looking to refine my skills</option>
              <option value="professional">Professional - Seeking expert guidance</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="daw" className="block text-sm font-medium text-gray-300 mb-1">
              Your DAW of Choice
            </label>
            <select
              id="daw"
              name="daw"
              value={formData.daw}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 text-white rounded-md focus:ring-2 focus:ring-beat-purple-500 focus:border-beat-purple-500"
            >
              <option value="ableton">Ableton Live</option>
              <option value="flstudio">FL Studio</option>
              <option value="logic">Logic Pro</option>
              <option value="protools">Pro Tools</option>
              <option value="cubase">Cubase</option>
              <option value="other">Other/Not sure yet</option>
            </select>
          </div>
        </div>
        
        <div>
          <label htmlFor="genre" className="block text-sm font-medium text-gray-300 mb-1">
            Preferred Music Genre
          </label>
          <select
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 text-white rounded-md focus:ring-2 focus:ring-beat-purple-500 focus:border-beat-purple-500"
          >
            <option value="hiphop">Hip-Hop/Trap</option>
            <option value="electronic">Electronic (House, Techno, etc.)</option>
            <option value="pop">Pop/R&B</option>
            <option value="rock">Rock/Metal</option>
            <option value="multiple">Multiple Genres</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
            Tell us more about your goals
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 text-white rounded-md focus:ring-2 focus:ring-beat-purple-500 focus:border-beat-purple-500"
            placeholder="Tell us about your music production goals, challenges you're facing, or specific areas you need help with. The more details you provide, the better we can tailor our coaching to your needs."
          />
        </div>
        
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-6 py-3 text-white font-medium rounded-md shadow-sm ${
              isSubmitting ? "bg-beat-purple-800" : "bg-gradient-to-r from-beat-purple-600 to-beat-gold-500 hover:from-beat-purple-700 hover:to-beat-gold-600 button-glow"
            } focus:outline-none focus:ring-2 focus:ring-beat-purple-500 focus:ring-offset-2 transition-colors duration-200`}
          >
            {isSubmitting ? "Sending..." : "Request Coaching Session"}
          </button>
        </div>
      </form>
    </motion.div>
  );
} 