"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { COMPANY } from "../../constants/company";

export function ContactForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    service: "",
  });
  
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    
    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setFormStatus("success");
      
      // Reset form after 3 seconds of success message
      setTimeout(() => {
        setFormState({
          name: "",
          email: "",
          company: "",
          message: "",
          service: "",
        });
        setFormStatus("idle");
      }, 3000);
    } catch (_) {
      setFormStatus("error");
    }
  };
  
  const inputClasses = "w-full bg-zinc-900/60 border border-zinc-800 focus:border-purple-500 text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-200";
  
  // Success particles animation
  const SuccessParticles = () => {
    return (
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"
            initial={{ 
              x: "50%", 
              y: "50%",
              opacity: 0,
              scale: 0.5
            }}
            animate={{ 
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 2 + Math.random() * 2,
              delay: Math.random() * 0.5,
              repeat: 0,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-black to-zinc-950">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left column - Text and info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-gradient-to-r from-purple-600/20 to-pink-500/20 text-purple-300 border border-purple-500/20">
                  Contact
                </span>
              </motion.div>
              
              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
                Let&apos;s talk about your project
              </h2>
              
              <p className="text-zinc-400 text-lg">
                We're ready to transform your ideas into exceptional digital solutions. Share your needs with us.
              </p>
            </div>
            
            {/* Contact details */}
            <div className="space-y-6 pt-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-br from-purple-600/20 to-pink-500/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-purple-400">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-medium">Email</h4>
                  <a href={`mailto:${COMPANY.email}`} className="text-zinc-400 hover:text-purple-400 transition-colors">
                    {COMPANY.email}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-br from-purple-600/20 to-pink-500/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-purple-400">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-medium">Phone</h4>
                  <a href={`tel:${COMPANY.phone}`} className="text-zinc-400 hover:text-purple-400 transition-colors">
                    {COMPANY.phone}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-br from-purple-600/20 to-pink-500/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-purple-400">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-medium">Address</h4>
                  <p className="text-zinc-400">
                    {COMPANY.address}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Right column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Card variant="glass" className="relative overflow-hidden">
              {formStatus === "success" && <SuccessParticles />}
              
              <div className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-zinc-400 font-medium mb-2">
                        Full name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className={inputClasses}
                        disabled={formStatus === "submitting" || formStatus === "success"}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-zinc-400 font-medium mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className={inputClasses}
                        disabled={formStatus === "submitting" || formStatus === "success"}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="company" className="block text-zinc-400 font-medium mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formState.company}
                        onChange={handleChange}
                        className={inputClasses}
                        disabled={formStatus === "submitting" || formStatus === "success"}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="service" className="block text-zinc-400 font-medium mb-2">
                        Service needed
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formState.service}
                        onChange={handleChange}
                        className={inputClasses}
                        disabled={formStatus === "submitting" || formStatus === "success"}
                      >
                        <option value="">Select a service</option>
                        <option value="web-development">Web Development</option>
                        <option value="app-development">App Development</option>
                        <option value="ui-design">UI/UX Design</option>
                        <option value="ecommerce">E-commerce Solutions</option>
                        <option value="consulting">Technical Consulting</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-zinc-400 font-medium mb-2">
                      Project details
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      rows={5}
                      required
                      className={inputClasses}
                      disabled={formStatus === "submitting" || formStatus === "success"}
                      placeholder="Tell us about your project needs..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <Button
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      disabled={formStatus === "submitting" || formStatus === "success"}
                    >
                      {formStatus === "idle" && "Send message"}
                      {formStatus === "submitting" && (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      )}
                      {formStatus === "success" && (
                        <span className="flex items-center justify-center">
                          <svg className="-ml-1 mr-2 h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          Message sent!
                        </span>
                      )}
                      {formStatus === "error" && "Try again"}
                    </Button>
                    
                    <div className="mt-4 text-center text-zinc-500 text-sm">
                      We value your privacy. All information will remain confidential.
                    </div>
                  </div>
                </form>
              </div>
            </Card>
          </motion.div>
        </div>
      </Container>
    </section>
  );
} 