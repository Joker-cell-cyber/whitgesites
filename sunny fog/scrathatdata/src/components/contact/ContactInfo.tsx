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
      <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
      
      <div className="space-y-6">
        {contactMethods.map((method, index) => (
          <div key={index} className="flex">
            <div className="flex-shrink-0 h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
              {method.icon}
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">{method.title}</h3>
              <p className="text-gray-800">{method.value}</p>
              <p className="text-sm text-gray-700">{method.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Business Hours</h3>
        <div className="space-y-1 text-gray-800">
          <p>Monday - Friday: 9:00 AM - 5:00 PM EST</p>
          <p>Saturday: 10:00 AM - 2:00 PM EST</p>
          <p>Sunday: Closed</p>
        </div>
        <p className="mt-4 text-sm text-gray-700">
          Our support team is available during business hours. For urgent matters outside these hours, please email us and we&apos;ll respond as soon as possible.
        </p>
      </div>
    </div>
  );
} 