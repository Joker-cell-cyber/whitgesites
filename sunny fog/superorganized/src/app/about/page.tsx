import { Metadata } from "next";
import { COMPANY } from "../constants/company";

export const metadata: Metadata = {
  title: `About Us | ${COMPANY.serviceName}`,
  description: "Learn about our mission, vision, and values at Super-Organized",
};

export default function AboutPage() {
  return (
    <div className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-black">
            About <span className="hand-drawn-accent">Super-Organized</span>
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-semibold mb-4 text-black">Our Story</h2>
            <p className="mb-6">
              Founded in 2025, {COMPANY.serviceName} was created to address the growing need for efficient organization systems in today&apos;s digital landscape. As businesses and individuals navigate an increasingly complex world, we recognized the opportunity to create streamlined solutions that help our clients achieve their goals with less stress and greater clarity.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4 text-black">Our Mission</h2>
            <p className="mb-6">
              At {COMPANY.serviceName}, our mission is to empower individuals and businesses to reach their full potential through structured organization systems. We believe that with the right organizational framework, anyone can transform chaos into clarity and achieve their goals more efficiently.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4 text-black">Our Vision</h2>
            <p className="mb-6">
              We envision a world where organization is accessible to everyone, where technology serves as an enhancement to human productivity rather than a distraction. {COMPANY.serviceName} aims to be at the forefront of this movement, continuously innovating to provide cutting-edge organization solutions for the modern world.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4 text-black">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="font-medium text-lg mb-2">Simplicity</h3>
                <p>We believe in creating systems that are intuitive and user-friendly. Complexity is the enemy of productivity.</p>
              </div>
              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="font-medium text-lg mb-2">Efficiency</h3>
                <p>Our solutions are designed to maximize productivity while minimizing effort, allowing you to focus on what truly matters.</p>
              </div>
              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="font-medium text-lg mb-2">Innovation</h3>
                <p>We continuously explore new methods and technologies to improve our organization systems and stay ahead of evolving needs.</p>
              </div>
              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="font-medium text-lg mb-2">Quality</h3>
                <p>We are committed to delivering exceptional service and attention to detail in everything we do.</p>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold mb-4 text-black">Our Approach</h2>
            <p className="mb-6">
              {COMPANY.serviceName} takes a holistic approach to organization. We understand that every individual and business has unique needs, which is why we offer customizable solutions rather than one-size-fits-all packages. Our proven methodology involves:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Thorough assessment of current organizational challenges</li>
              <li>Custom design of tailored organization systems</li>
              <li>Implementation with clear instructions and support</li>
              <li>Follow-up to ensure optimal functionality and user satisfaction</li>
            </ul>
            
            <p>
              Whether you&apos;re an individual seeking to better organize your personal projects, a small team aiming to improve collaboration, or a large business looking to streamline operations, {COMPANY.serviceName} has the expertise and tools to help you succeed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 