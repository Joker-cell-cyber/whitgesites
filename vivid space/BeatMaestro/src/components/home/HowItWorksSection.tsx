"use client";

import { motion } from "framer-motion";

export default function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Book Your Session",
      description: "Choose the coaching package that best fits your needs and complete the checkout process. We offer packages for all skill levels and specific focus areas.",
      icon: (
        <svg className="w-8 h-8 text-beat-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
      )
    },
    {
      number: "02",
      title: "Complete the Questionnaire",
      description: "After booking, you'll receive a detailed questionnaire to help us understand your current skill level, challenges, and specific goals. This helps us prepare a personalized coaching plan.",
      icon: (
        <svg className="w-8 h-8 text-beat-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
        </svg>
      )
    },
    {
      number: "03",
      title: "Schedule Your Session",
      description: "Once you've completed the questionnaire, you'll receive a link to our scheduling system. Choose a time slot that works best for you from our available dates and times.",
      icon: (
        <svg className="w-8 h-8 text-beat-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
      )
    },
    {
      number: "04",
      title: "Attend Your Coaching Session",
      description: "Connect with your coach via video call at your scheduled time. Come prepared with your DAW and any specific questions or projects you'd like to work on during the session.",
      icon: (
        <svg className="w-8 h-8 text-beat-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
        </svg>
      )
    },
    {
      number: "05",
      title: "Implement & Follow-Up",
      description: "After your session, you'll receive follow-up notes, resources, and action items. Apply what you've learned to your productions, and reach out if you have questions between sessions.",
      icon: (
        <svg className="w-8 h-8 text-beat-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      )
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden" id="how-it-works">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/3 right-[15%] w-64 h-64 bg-beat-purple-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 left-[10%] w-72 h-72 bg-beat-gold-500/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-beat-purple-500 to-beat-gold-500">Works</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Our streamlined process ensures you get the most out of your coaching experience
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative z-10"
            >
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 h-full">
                <div className="flex items-center mb-4">
                  <div className="mr-3 p-3 bg-gray-800 rounded-lg">
                    {step.icon}
                  </div>
                  <span className="text-lg font-bold text-beat-gold-500">{step.number}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
              
              {/* Connector line - only visible on desktop between cards except the last one */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 h-0.5 w-6 bg-gradient-to-r from-beat-purple-500 to-beat-gold-500 z-0"></div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-gray-900/30 border border-gray-800 rounded-xl p-6 md:p-8 max-w-3xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-white mb-4">Ready to elevate your music production skills?</h3>
          <p className="text-gray-400 mb-6">
            Our coaching process is designed to be efficient and effective. Book your session today and start your journey to better productions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/pricing"
              className="px-6 py-3 bg-gradient-to-r from-beat-purple-600 to-beat-gold-500 text-white rounded-lg font-medium button-glow text-center"
            >
              View Coaching Packages
            </a>
            <a
              href="/contact"
              className="px-6 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors text-center"
            >
              Contact Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 