"use client";

import React from 'react';
import { cookiesContent } from './cookies-content';
import { COMPANY } from '../../constants/company';

export default function CookiePolicyPage() {
  return (
    <div className="bg-felt-900 text-white min-h-screen">
      <div className="container mx-auto py-16 px-4 max-w-5xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-poker-red-600 to-chip-gold-400 font-playfair">
          Cookie Policy
        </h1>
        
        <div className="prose prose-invert prose-lg max-w-none font-raleway">
          <div dangerouslySetInnerHTML={{ __html: cookiesContent }} />
        </div>
        
        <div className="mt-12 text-center">
          <a 
            href="/contact"
            className="inline-flex items-center bg-poker-red-600 hover:bg-poker-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors mr-4"
          >
            Contact Us
          </a>
          <a 
            href="/"
            className="inline-flex items-center bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
} 