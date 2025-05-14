"use client";

import { motion } from "framer-motion";

export default function PricingHero() {
  return (
    <section className="relative pt-36 pb-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-900/10 to-transparent"></div>
        <div className="absolute top-20 right-[10%] w-72 h-72 bg-blue-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 left-[5%] w-80 h-80 bg-turquoise-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjAyQzVBIiBzdHJva2Utb3BhY2l0eT0iMC4wNSIgc3Ryb2tlLXdpZHRoPSIyIj48cGF0aCBkPSJNLTYuOTI4MiAxNWwxNS0xNU01My4wNzIgMTVsMTUtMTVNLTYuOTI4MiAxNWwxNSAxNU0zMy4wNzIgNTRsMzAtMzBNNDMuMDcyIDQ0bDEwIDEwTTMuMDcyIDU0bDEwIDEwTTE4LjA3MiAyOWw1IDVNLTEuOTI4MiA0MGw1IDVNMjguMDcyIDI5bDUgNSIvPjwvZz48L3N2Zz4=')] opacity-5"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-block mb-4">
            <div className="h-1 w-10 bg-blue-500 inline-block mr-2"></div>
            <div className="h-1 w-5 bg-turquoise-500 inline-block"></div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-display">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-turquoise-500">Perfect</span> Editing Package
          </h1>
          
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Transparent pricing with packages designed for every need and budget. No hidden fees, just professional video editing services.
          </p>

          <div className="flex flex-wrap justify-center gap-4 items-center mb-16">
            <a 
              href="#pricing-tabs" 
              className="px-6 py-3.5 bg-gradient-to-r from-blue-600 to-turquoise-500 text-white rounded-lg font-medium shadow-lg hover:shadow-turquoise-500/25 hover:-translate-y-0.5 transition-all duration-300 font-accent"
            >
              View Packages
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Fast Turnaround",
                description: "Get your videos back in as little as 48 hours depending on complexity",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                title: "Satisfaction Guarantee",
                description: "Not happy? We'll revise until you love it or refund your payment",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                )
              },
              {
                title: "Expert Editors",
                description: "Experienced professionals with years of video editing expertise",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )
              }
            ].map((feature, index) => (
              <div key={index} className="bg-[#1a1a24] p-8 rounded-xl border border-gray-800/50 shadow-lg group hover:border-turquoise-900/50 transition-all duration-300 hover:-translate-y-1">
                <div className="mb-6 relative mx-auto w-16 h-16">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-turquoise-500/30 rounded-full blur-md group-hover:blur-lg group-hover:scale-110 transition-all duration-300"></div>
                  <div className="relative w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-turquoise-500 flex items-center justify-center text-white shadow-lg">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 text-center font-display">{feature.title}</h3>
                <p className="text-gray-300 text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 