"use client";

import { COMPANY } from "@/app/constants/company";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone } from "lucide-react";

export default function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-[#1e1e1e] border border-gray-800/30 text-white rounded-lg shadow-xl p-8"
    >
      <div>
        <h2 className="text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-vid-blue-500 to-vid-white-100">Contact Information</h2>
      </div>
      
      <div className="space-y-8">
        <div className="flex items-start space-x-4">
          <div className="bg-vid-blue-500/10 p-3 rounded-lg">
            <MapPin 
              className="h-6 w-6 text-vid-blue-400"
            />
          </div>
          <div>
            <h3 className="text-lg font-medium text-vid-white-400">Our Location</h3>
            <p className="text-gray-400 mt-1">{COMPANY.address}</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-4">
          <div className="bg-vid-blue-500/10 p-3 rounded-lg">
            <Mail 
              className="h-6 w-6 text-vid-blue-400"
            />
          </div>
          <div>
            <h3 className="text-lg font-medium text-vid-white-400">Email Us</h3>
            <p className="mt-1">
              <a href={`mailto:${COMPANY.email}`} 
                className="hover:text-vid-blue-400 transition-colors duration-200"
              >
                {COMPANY.email}
              </a>
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-4">
          <div className="bg-vid-blue-500/10 p-3 rounded-lg">
            <Phone 
              className="h-6 w-6 text-vid-blue-400"
            />
          </div>
          <div>
            <h3 className="text-lg font-medium text-vid-white-400">Call Us</h3>
            <p className="mt-1">
              <a href={`tel:${COMPANY.phone}`}
                className="hover:text-vid-blue-400 transition-colors duration-200"
              >
                {COMPANY.phone}
              </a>
            </p>
            <p className="text-gray-400 mt-1">Mon-Fri from 9am to 6pm EST</p>
          </div>
        </div>
      </div>
      
      <div className="mt-12">
        <h3 className="text-lg font-medium text-vid-white-400 mb-4">Business Hours</h3>
        <div className="grid grid-cols-2 gap-2 text-gray-400">
          <div>Monday - Friday</div>
          <div>9:00 AM - 6:00 PM EST</div>
          <div>Saturday</div>
          <div>10:00 AM - 4:00 PM EST</div>
          <div>Sunday</div>
          <div>Closed</div>
        </div>
      </div>
    </motion.div>
  );
} 