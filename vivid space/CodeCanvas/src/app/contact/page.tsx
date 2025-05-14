"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "../components/ui/Container";
import { Card } from "../components/ui/Card";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { COMPANY } from "../constants/company";

export default function ContactPage() {
  const [formState, setFormState] = React.useState({
    name: "",
    email: "",
    company: "",
    message: "",
    service: "",
  });
  
  const [formStatus, setFormStatus] = React.useState<"idle" | "submitting" | "success" | "error">("idle");
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    
    // Simuler l'envoi du formulaire
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setFormStatus("success");
      
      // Réinitialiser le formulaire après 3 secondes du message de réussite
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

  return (
    <>
      <Navbar />
      <main>
        <section className="py-24 bg-gradient-to-b from-black to-zinc-950 relative">
          {/* Éléments décoratifs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-[500px] left-1/3 w-[1000px] h-[1000px] rounded-full bg-purple-900/10 blur-3xl opacity-30" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
          </div>
          
          <Container className="relative z-10">
            {/* En-tête de page */}
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-gradient-to-r from-purple-600/20 to-pink-500/20 text-purple-300 border border-purple-500/20">
                  Contact Us
                </span>
              </motion.div>
              
              <motion.h1
                className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Get in touch with our team
              </motion.h1>
              
              <motion.p
                className="text-zinc-400 text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Have a question or project in mind? We&apos;d love to hear from you.
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Coordonnées */}
              <motion.div
                className="lg:col-span-1"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="h-full p-8 bg-zinc-900/50 border-zinc-800">
                  <h2 className="text-2xl font-bold text-white mb-6">Our Contact Info</h2>
                  
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-purple-400 font-medium mb-2">Company</h3>
                      <p className="text-white font-medium">{COMPANY.name}</p>
                      <p className="text-zinc-400 mt-1">EIN: {COMPANY.ein}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-purple-400 font-medium mb-2">Address</h3>
                      <p className="text-zinc-400">{COMPANY.address}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-purple-400 font-medium mb-2">Email</h3>
                      <a 
                        href={`mailto:${COMPANY.email}`}
                        className="text-zinc-300 hover:text-purple-400 transition-colors duration-200"
                      >
                        {COMPANY.email}
                      </a>
                    </div>

                    <div>
                      <h3 className="text-purple-400 font-medium mb-2">Phone</h3>
                      <a 
                        href={`tel:${COMPANY.phone}`}
                        className="text-zinc-300 hover:text-purple-400 transition-colors duration-200"
                      >
                        {COMPANY.phone}
                      </a>
                    </div>
                  </div>
                </Card>
              </motion.div>
              
              {/* Formulaire de contact */}
              <motion.div
                className="lg:col-span-2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="p-8 bg-zinc-900/50 border-zinc-800">
                  <h2 className="text-2xl font-bold text-white mb-6">Send us a message</h2>
                  
                  {formStatus === "success" ? (
                    <div className="text-center py-12">
                      <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/20 text-purple-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Message sent successfully!</h3>
                      <p className="text-zinc-400">Thank you for contacting us. We'll get back to you as soon as possible.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-zinc-400 font-medium mb-2">
                            Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            required
                            className={inputClasses}
                            disabled={formStatus === "submitting"}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-zinc-400 font-medium mb-2">
                            Email <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formState.email}
                            onChange={handleChange}
                            required
                            className={inputClasses}
                            disabled={formStatus === "submitting"}
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
                            disabled={formStatus === "submitting"}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="service" className="block text-zinc-400 font-medium mb-2">
                            Service Needed
                          </label>
                          <select
                            id="service"
                            name="service"
                            value={formState.service}
                            onChange={handleChange}
                            className={inputClasses}
                            disabled={formStatus === "submitting"}
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
                          Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formState.message}
                          onChange={handleChange}
                          rows={5}
                          required
                          className={inputClasses}
                          disabled={formStatus === "submitting"}
                          placeholder="Tell us about your project or inquiry..."
                        ></textarea>
                      </div>
                      
                      <div>
                        <button
                          type="submit"
                          disabled={formStatus === "submitting"}
                          className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
                            formStatus === "submitting" 
                              ? "bg-purple-900/50 text-zinc-400 cursor-not-allowed" 
                              : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
                          }`}
                        >
                          {formStatus === "idle" && "Send Message"}
                          {formStatus === "submitting" && (
                            <span className="flex items-center justify-center">
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Sending...
                            </span>
                          )}
                          {formStatus === "error" && "Try Again"}
                        </button>
                        
                        <div className="mt-4 text-center text-zinc-500 text-sm">
                          We value your privacy. All information will be treated confidentially.
                        </div>
                      </div>
                    </form>
                  )}
                </Card>
              </motion.div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}