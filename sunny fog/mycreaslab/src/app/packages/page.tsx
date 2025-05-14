"use client";

import Link from "next/link";

// Package prices
const PACKAGES = [
  { id: 1, name: "Starter Plan", price: 9.99, popular: false },
  { id: 2, name: "Basic Plan", price: 19.50, popular: false },
  { id: 3, name: "Pro Plan", price: 29.90, popular: false },
  { id: 4, name: "Advanced Plan", price: 39.99, popular: true },
  { id: 5, name: "Professional Plus Plan", price: 49.90, popular: false },
  { id: 6, name: "Premium Plan", price: 59.50, popular: false },
  { id: 7, name: "Enterprise Plan", price: 69.99, popular: false },
  { id: 8, name: "Elite Plan", price: 79.90, popular: false },
  { id: 9, name: "Ultimate Plan", price: 89.50, popular: false },
  { id: 10, name: "Executive Plan", price: 99.99, popular: false },
  { id: 11, name: "VIP Plan", price: 109.90, popular: false },
  { id: 12, name: "Agency Plan", price: 119.50, popular: false },
];

// Package features focusing only on deliverables
const FEATURES = {
  1: ["1 creative advertising design", "JPG & PNG formats", "Single format size"],
  2: ["2 creative advertising designs", "JPG & PNG formats", "Single format size"],
  3: ["3 creative advertising designs", "PDF, JPG & PNG formats", "Two format sizes"],
  4: ["4 creative advertising designs", "All standard formats", "Multiple format sizes"],
  5: ["5 creative advertising designs", "All standard formats", "Multiple format sizes", "Including 1 logo variant"],
  6: ["6 creative advertising designs", "All standard formats", "Multiple format sizes", "Including 2 logo variants"],
  7: ["7 creative advertising designs", "All formats", "All format sizes", "Including 2 logo variants", "Source files included"],
  8: ["8 creative advertising designs", "All formats", "All format sizes", "Including 2 logo variants", "Source files included"],
  9: ["10 creative advertising designs", "All formats", "All format sizes", "Including 3 logo variants", "Source files included"],
  10: ["12 creative advertising designs", "All formats", "All format sizes", "Including 3 logo variants", "Source files included"],
  11: ["15 creative advertising designs", "All formats", "All format sizes", "Including complete logo package", "Source files included", "Social media templates"],
  12: ["20 creative advertising designs", "All formats", "All format sizes", "Including complete branding package", "Source files included", "Social media templates", "Marketing strategy consultation"],
};

export default function PackagesPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-teal-50 to-white dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Our Creative Packages
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
            Creative advertising designs for all your marketing needs.
            Choose the package that best fits your campaign requirements.
          </p>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PACKAGES.map((pkg) => (
              <div 
                key={pkg.id}
                className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
                  pkg.popular ? "border-2 border-teal-500" : ""
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-teal-500 text-white py-1 px-4 text-sm font-bold rounded-bl-lg">
                    Popular
                  </div>
                )}
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">${pkg.price.toFixed(2)}</span>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {FEATURES[pkg.id as keyof typeof FEATURES].map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg 
                          className="w-5 h-5 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link 
                    href={`/checkout?package=${pkg.id}`}
                    className={`block w-full py-3 px-6 text-center rounded-lg font-medium ${
                      pkg.popular
                        ? "bg-gradient-to-r from-teal-600 to-yellow-500 text-white shadow-lg hover:shadow-xl"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                    } transition-all duration-300`}
                  >
                    Choose this package
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Need a custom package?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Contact us to discuss your specific requirements.
          </p>
          
          <Link 
            href="/contact"
            className="inline-block bg-gradient-to-r from-teal-600 to-yellow-500 text-white font-medium py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            Contact us
          </Link>
        </div>
      </section>
    </div>
  );
} 