import React from 'react';
import { COMPANY } from '../constants/company';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-white">About {COMPANY.serviceName}</h1>
      
      <div className="space-y-8">
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">Our Story</h2>
          <p className="text-gray-300">
            Founded in 2025, {COMPANY.serviceName} was built with a singular vision: to empower businesses and individuals with creative design solutions that stand out in today's digital landscape. As technology continues to evolve, so do the needs of our clients, and we are committed to staying at the forefront of design innovation.
          </p>
        </div>

        <div className="bg-zinc-900 rounded-xl border border-zinc-800 shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">Our Mission</h2>
          <p className="text-gray-300">
            At {COMPANY.serviceName}, our mission is to democratize access to professional design tools and services, making high-quality creative solutions available to businesses of all sizes. We believe that exceptional design should not be a luxury, but an accessible resource that helps brands communicate effectively and authentically with their audiences.
          </p>
        </div>

        <div className="bg-zinc-900 rounded-xl border border-zinc-800 shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">Our Vision</h2>
          <p className="text-gray-300">
            We envision a world where businesses can easily translate their ideas into compelling visual stories. Our platform bridges the gap between technical design expertise and intuitive user experience, enabling our clients to create impactful designs without struggling with complex software or prohibitive costs.
          </p>
        </div>

        <div className="bg-zinc-900 rounded-xl border border-zinc-800 shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">Our Values</h2>
          <ul className="text-gray-300 space-y-2 list-disc pl-5">
            <li><strong>Innovation:</strong> We continuously explore new technologies and design methodologies to provide cutting-edge solutions.</li>
            <li><strong>Quality:</strong> We are committed to delivering excellence in every aspect of our service, from user experience to final deliverables.</li>
            <li><strong>Accessibility:</strong> We believe great design should be accessible to everyone, regardless of technical skill or budget.</li>
            <li><strong>Integrity:</strong> We operate with transparency and honesty in all our client relationships and business practices.</li>
            <li><strong>Client Success:</strong> Your success is our success. We measure our achievements through the positive outcomes we create for our clients.</li>
          </ul>
        </div>

        <div className="bg-zinc-900 rounded-xl border border-zinc-800 shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">Our Approach</h2>
          <p className="text-gray-300">
            At {COMPANY.serviceName}, we take a results-driven approach to design, focusing on creating solutions that not only look exceptional but also achieve your business objectives. Our streamlined process combines technological efficiency with creative expertise, allowing us to deliver high-quality designs efficiently and consistently.
          </p>
          <p className="text-gray-300 mt-4">
            We are continuously evolving our platform and services based on client feedback and emerging trends, ensuring that we remain at the forefront of the creative technology industry.
          </p>
        </div>
      </div>
    </div>
  );
} 