import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Order Confirmed - ContentScript",
  description: "Your script writing order has been confirmed",
  robots: "noindex, nofollow",
};

export default function SuccessPage() {
  return (
    <div className="bg-gray-50 py-16 min-h-screen flex items-center">
      <div className="container mx-auto px-4 text-center">
        <div className="bg-white p-8 max-w-2xl mx-auto rounded-lg shadow-sm">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-lg text-gray-600 mb-8">Thank you for your order. We'll be in touch shortly.</p>
          
          <div className="bg-gray-50 p-4 rounded-md mb-8 text-left">
            <h2 className="font-semibold text-gray-800 mb-3">Order Details</h2>
            <p className="text-gray-600 mb-1">Order Number: <span className="font-medium">CS-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</span></p>
            <p className="text-gray-600 mb-1">Date: <span className="font-medium">{new Date().toLocaleDateString()}</span></p>
            <p className="text-gray-600">You will receive a confirmation email shortly.</p>
          </div>
          
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
            <Link 
              href="/"
              className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 px-6 rounded-lg font-medium transition-colors"
            >
              Back to Home
            </Link>
            
            <Link 
              href="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg font-medium transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 