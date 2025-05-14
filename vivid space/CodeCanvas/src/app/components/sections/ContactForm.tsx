"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { COMPANY } from "../../constants/company";
import Link from "next/link";

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
  
  const inputClasses = "w-full bg-transparent border-b-2 border-teal-500/30 focus:border-teal-500 text-white px-2 py-3 outline-none transition-all duration-200";
  
  // Success particles animation
  const SuccessParticles = () => {
    return (
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500"
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
    <section id="contact" className="py-24 bg-black relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(4,78,70,0.2)_0%,transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(circle_at_70%_80%,rgba(4,78,70,0.15)_0%,transparent_60%)]"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left column - Text and info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:w-2/5 space-y-8"
          >
            <div className="inline-flex flex-col items-start">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 60 }}
                transition={{ duration: 0.8 }}
                className="h-1 bg-teal-500 mb-6"
              />
              
              <span className="text-sm uppercase tracking-widest font-semibold text-teal-400 mb-3">
                Contact
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                Let&apos;s talk about your project
              </h2>
              
              <p className="text-zinc-400 text-lg">
                We're ready to transform your ideas into exceptional digital solutions. Share your needs with us.
              </p>
              
              <div className="mt-6">
                <Link href="/services#pricing">
                  <Button 
                    variant="outline"
                    className="border-teal-500/30 hover:border-teal-500 text-teal-500 hover:text-teal-400 px-6 py-3"
                  >
                    <span className="mr-2">View our pricing</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Contact details */}
            <div className="space-y-8 pt-8 border-l-2 border-teal-500/30 pl-6">
              <div className="relative">
                <div className="absolute -left-[calc(1.5rem+1px)] top-0 w-3 h-3 rounded-full bg-teal-500" />
                <h4 className="text-white font-bold">Email</h4>
                <a href={`mailto:${COMPANY.email}`} className="text-zinc-400 hover:text-teal-400 transition-colors block mt-1">
                  {COMPANY.email}
                </a>
              </div>
              
              <div className="relative">
                <div className="absolute -left-[calc(1.5rem+1px)] top-0 w-3 h-3 rounded-full bg-teal-500" />
                <h4 className="text-white font-bold">Phone</h4>
                <a href={`tel:${COMPANY.phone}`} className="text-zinc-400 hover:text-teal-400 transition-colors block mt-1">
                  {COMPANY.phone}
                </a>
              </div>
              
              <div className="relative">
                <div className="absolute -left-[calc(1.5rem+1px)] top-0 w-3 h-3 rounded-full bg-teal-500" />
                <h4 className="text-white font-bold">Address</h4>
                <address className="text-zinc-400 not-italic mt-1">
                  {COMPANY.address}
                </address>
              </div>
            </div>
          </motion.div>
          
          {/* Right column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:w-3/5"
          >
            <div className="relative bg-zinc-900/40 border border-zinc-800 backdrop-blur-sm p-8 md:p-10 rounded-none">
              {formStatus === "success" && <SuccessParticles />}
              
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="name" className="block text-teal-400 text-sm uppercase tracking-wider font-medium mb-2">
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
                    <label htmlFor="email" className="block text-teal-400 text-sm uppercase tracking-wider font-medium mb-2">
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="company" className="block text-teal-400 text-sm uppercase tracking-wider font-medium mb-2">
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
                    <label htmlFor="service" className="block text-teal-400 text-sm uppercase tracking-wider font-medium mb-2">
                      Service needed
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formState.service}
                      onChange={handleChange}
                      className={`${inputClasses} bg-black/30`}
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
                  <label htmlFor="message" className="block text-teal-400 text-sm uppercase tracking-wider font-medium mb-2">
                    Project details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    className={`${inputClasses} resize-none bg-black/30 rounded-none border border-teal-500/30`}
                    disabled={formStatus === "submitting" || formStatus === "success"}
                    placeholder="Tell us about your project needs..."
                  ></textarea>
                </div>
                
                <div>
                  <button
                    type="submit"
                    className={`w-full relative py-4 overflow-hidden group ${
                      formStatus === "submitting" || formStatus === "success" 
                        ? "bg-teal-900/50 cursor-not-allowed" 
                        : "bg-teal-900/30 hover:bg-teal-800/50"
                    } text-white font-medium transition-all duration-300 border-l-2 border-teal-500`}
                    disabled={formStatus === "submitting" || formStatus === "success"}
                  >
                    <span className="absolute left-0 top-0 h-full w-0 bg-gradient-to-r from-teal-500 to-teal-400 group-hover:w-full transition-all duration-700 -z-10"></span>
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
                  </button>
                  
                  <div className="mt-4 text-center text-zinc-500 text-sm">
                    We value your privacy. All information will remain confidential.
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
} 