"use client";

import { motion } from "framer-motion";
import { COMPANY } from "@/lib/company";

export default function ContactInfo() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#0c1220] rounded-xl shadow-xl p-8 border border-gray-800 pixel-corners relative"
    >
      <div className="absolute top-0 right-0 px-2 py-1 bg-black/50 text-toxic-green-500 text-xs font-mono m-2 border border-toxic-green-500/30 rounded">
        INTEL_DATABASE
      </div>
      
      <h2 className="text-2xl font-bold mb-2 text-white flex items-center">
        <svg className="w-5 h-5 mr-2 text-toxic-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        COMMAND CENTER
      </h2>
      
      <div className="loading-bar mb-4"></div>
      
      <p className="text-gray-400 mb-8 font-mono text-sm border-l-2 border-toxic-green-500/30 pl-3">
        Secure your digital advantage with {COMPANY.serviceName} elite squad. Our operators are standing by 24/7 
        to execute your gaming objectives with tactical precision and maximum efficiency.
      </p>

      <div className="space-y-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-toxic-green-900/30 to-toxic-green-700/20 flex items-center justify-center border border-toxic-green-500/30">
            <svg className="w-5 h-5 text-toxic-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-toxic-green-500 font-mono">HEADQUARTERS</h3>
            <p className="mt-1 text-sm text-gray-300">{COMPANY.address}</p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-toxic-green-900/30 to-toxic-green-700/20 flex items-center justify-center border border-toxic-green-500/30">
            <svg className="w-5 h-5 text-toxic-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-toxic-green-500 font-mono">EMAIL COMMS</h3>
            <p className="mt-1 text-sm text-gray-300">{COMPANY.email}</p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-toxic-green-900/30 to-toxic-green-700/20 flex items-center justify-center border border-toxic-green-500/30">
            <svg className="w-5 h-5 text-toxic-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-toxic-green-500 font-mono">DIRECT UPLINK</h3>
            <p className="mt-1 text-sm text-gray-300">
              <a href={`tel:${COMPANY.phone}`} className="hover:text-toxic-green-400 transition-colors">
                {COMPANY.phone}
              </a>
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-toxic-green-900/30 to-toxic-green-700/20 flex items-center justify-center border border-toxic-green-500/30">
            <svg className="w-5 h-5 text-toxic-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-toxic-green-500 font-mono">OPERATION HOURS</h3>
            <p className="mt-1 text-sm text-gray-300">24/7/365 - Always Online</p>
            <p className="mt-1 text-sm text-gray-300">Response Time: &lt;24 hours</p>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-800">
        <h3 className="text-white text-lg font-medium mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-neon-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          TACTICAL EXPERTISE
        </h3>
        <ul className="space-y-2 text-sm text-gray-400">
          <li className="flex items-center">
            <span className="w-2 h-2 bg-toxic-green-500 rounded-full mr-2"></span>
            Elite Power Leveling & Character Advancement
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-neon-pink-500 rounded-full mr-2"></span>
            Stealth Resource Acquisition & Farming
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-plasma-purple-500 rounded-full mr-2"></span>
            Raid Carries & Boss Takedowns
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-toxic-green-500 rounded-full mr-2"></span>
            Achievement Hunting & Trophy Collection
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-neon-pink-500 rounded-full mr-2"></span>
            PvP Ranking & Tournament Representation
          </li>
        </ul>
      </div>

      <div className="mt-8 bg-black/30 rounded-lg p-4 border border-gray-800">
        <div className="flex items-center text-toxic-green-500 mb-2">
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span className="text-sm font-medium font-mono">SECURITY CLEARANCE: LEVEL 1</span>
        </div>
        <p className="text-xs text-gray-400 font-mono">
          {COMPANY.serviceName} employs elite operators with 5+ years of MMO combat experience.
          100% secure account handling with advanced VPN protocols.
          <span className="block mt-1 text-toxic-green-400">Customer satisfaction rate: 99.7%</span>
        </p>
      </div>

      <div className="mt-6 text-center">
        <div className="text-xs font-mono text-gray-500">
          <span className="inline-block px-2 py-1 bg-toxic-green-900/20 text-toxic-green-500 rounded border border-toxic-green-500/20">SYSTEM.OPERATIONAL</span>
        </div>
      </div>
    </motion.div>
  );
} 