"use client";

import { motion } from "framer-motion";
import { COMPANY } from "@/app/constants/company";

export default function ContactMap() {
  return (
    <div className="bg-[#fff8e9] py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#3b332b] mb-4 font-fraunces">
            Visit Our Office
          </h2>
          <p className="text-lg text-[#3b332b]/70">
            We're always happy to meet our clients in person. Feel free to stop by our office during business hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-2 rounded-2xl overflow-hidden bg-white shadow-lg h-96 relative">
            <iframe
              src="https://maps.google.com/maps?q=2620%20EASTGATE%20RD%20APT%2021%20TOLEDO%2C%20OH%2043614&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            ></iframe>
          </div>

          <div className="flex flex-col justify-center">
            <div className="bg-[#c35a38] text-white p-6 rounded-2xl shadow-lg shadow-[#c35a38]/20">
              <h3 className="font-bold text-white">SolidCraft Headquarters</h3>
              <address className="not-italic mt-4 space-y-3">
                <p className="flex items-start">
                  <svg className="w-5 h-5 mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{COMPANY.address}</span>
                </p>
                <p className="flex items-start">
                  <svg className="w-5 h-5 mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{COMPANY.phone}</span>
                </p>
                <p className="flex items-start">
                  <svg className="w-5 h-5 mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{COMPANY.email}</span>
                </p>
              </address>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 