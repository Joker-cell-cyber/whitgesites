import React from 'react';
import { COMPANY } from '@/app/constants/company';

export function ContactInfo() {
  const contactMethods = [
    {
      title: "Email",
      value: COMPANY.email,
      description: "For general inquiries and support",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Phone",
      value: COMPANY.phone,
      description: "Monday-Friday, 9AM-5PM EST",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      )
    },
    {
      title: "Address",
      value: COMPANY.address,
      description: "Our main office location",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8 text-white">Contact Information</h2>
      
      <div className="space-y-8">
        {contactMethods.map((method, index) => (
          <div key={index} className="group flex items-start transition-all duration-300 hover:transform hover:translate-x-1">
            <div className="flex-shrink-0 h-14 w-14 rounded-xl bg-gradient-to-br from-purple-600/20 to-indigo-600/20 backdrop-blur-sm border border-purple-500/20 flex items-center justify-center text-indigo-300 shadow-lg shadow-purple-500/5 mr-4 group-hover:shadow-purple-500/20 transition-all duration-300">
              {method.icon}
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-indigo-400 transition-all duration-300">
                {method.title}
              </h3>
              <p className="text-indigo-200 font-medium">{method.value}</p>
              <p className="text-sm text-indigo-300 mt-1">{method.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 p-6 rounded-xl border border-indigo-500/20 backdrop-blur-sm bg-gradient-to-br from-indigo-900/20 to-purple-900/20 shadow-lg shadow-purple-500/5">
        <div className="flex items-center mb-4">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-600/20 to-indigo-600/20 backdrop-blur-sm border border-purple-500/20 flex items-center justify-center text-indigo-300 shadow-lg shadow-purple-500/5 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-white">Business Hours</h3>
        </div>
        
        <div className="space-y-2 text-indigo-200 pl-1">
          <div className="flex items-center">
            <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 mr-2"></div>
            <p>Monday - Friday: 9:00 AM - 5:00 PM EST</p>
          </div>
          <div className="flex items-center">
            <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 mr-2"></div>
            <p>Saturday: 10:00 AM - 2:00 PM EST</p>
          </div>
          <div className="flex items-center">
            <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 mr-2"></div>
            <p>Sunday: Closed</p>
          </div>
        </div>
        
        <div className="mt-5 pt-5 border-t border-indigo-500/20">
          <p className="text-sm text-indigo-200 italic">
            Our support team is available during business hours. For urgent matters outside these hours, please email us and we&apos;ll respond as soon as possible.
          </p>
        </div>
      </div>
    </div>
  );
} 