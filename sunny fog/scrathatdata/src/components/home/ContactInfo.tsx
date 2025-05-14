import React from 'react';

export function ContactInfo() {
  return (
    <ul className="list-none">
      <li className="text-gray-700 mb-2 flex items-start">
        <div className="mr-2 text-blue-500 flex-shrink-0 mt-1">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span>Our team of experts is available to answer your questions and guide you.</span>
      </li>
      <li className="text-gray-700 mb-2 flex items-start">
        <div className="mr-2 text-blue-500 flex-shrink-0 mt-1">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span>We'll call you back quickly to discuss your data extraction needs.</span>
      </li>
    </ul>
  );
} 