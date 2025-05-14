import React from 'react';
import Link from 'next/link';

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
        
        <p className="text-gray-600 mb-8">
          Thank you for your order. We've received your payment and are now processing your data extraction request.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">What happens next?</h2>
          
          <div className="flex flex-col space-y-4">
            <div className="flex items-start">
              <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3">
                <span className="text-white font-medium">1</span>
              </div>
              <div className="text-left">
                <p className="text-gray-700">Our team will start working on your data extraction right away.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3">
                <span className="text-white font-medium">2</span>
              </div>
              <div className="text-left">
                <p className="text-gray-700">You'll receive an email confirmation with your order details.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3">
                <span className="text-white font-medium">3</span>
              </div>
              <div className="text-left">
                <p className="text-gray-700">Once completed, we'll email you with a secure link to download your data.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="btn btn-outline px-6 py-3"
          >
            Return to Home
          </Link>
          
          <Link
            href="/contact"
            className="btn btn-primary px-6 py-3"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
} 