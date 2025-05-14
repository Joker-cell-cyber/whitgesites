"use client";

import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                Ready to boost your <span className="text-turquoise-600">online presence</span>?
              </h2>
              <p className="text-gray-600 mb-8">
                Our writers create quality SEO content that attracts your target audience and converts visitors into customers. Contact us today to get optimized texts that stand out.
              </p>
              <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex">
                <Link
                  href="/contact"
                  className="inline-block bg-turquoise-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-turquoise-700 transition-colors w-full md:w-auto text-center"
                >
                  Contact Us
                </Link>
                <Link
                  href="/pricing"
                  className="inline-block bg-white text-turquoise-600 border border-turquoise-600 py-3 px-6 rounded-lg font-medium hover:bg-turquoise-50 transition-colors w-full md:w-auto text-center"
                >
                  View Our Packages
                </Link>
              </div>
            </div>

            <div className="lg:w-1/2 bg-turquoise-600 p-8 md:p-12 text-white">
              <h3 className="text-xl font-bold mb-6">Why Choose Our Writing Services</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-3 text-white flex-shrink-0 mt-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Content optimized for search engines</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-3 text-white flex-shrink-0 mt-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Writers specialized in various sectors</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-3 text-white flex-shrink-0 mt-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Engaging content that converts your visitors</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-3 text-white flex-shrink-0 mt-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Fast delivery and deadline compliance</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-3 text-white flex-shrink-0 mt-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Expertise in SEO writing and current techniques</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 