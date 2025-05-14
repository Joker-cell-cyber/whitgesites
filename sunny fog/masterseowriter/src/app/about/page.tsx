"use client";

import { COMPANY } from "@/app/constants/company";
import Link from 'next/link';

export default function About() {
  return (
    <>
      <AboutHero />
      <AboutMission />
      <AboutValues />
      <AboutApproach />
      <AboutCTA />
    </>
  );
}

function AboutHero() {
  return (
    <section className="relative bg-gray-50 py-20 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-turquoise-50 to-gray-50 opacity-50"></div>
      
      {/* Abstract SVG illustration */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/3 h-full opacity-20">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path fill="#0DB4B9" d="M45.7,-76.2C58.9,-69.5,69.2,-55.9,76.6,-41.3C84.1,-26.7,88.7,-11.2,87.8,4.4C86.9,19.9,80.6,35.5,70.4,47.8C60.2,60.2,46.1,69.5,31.1,75.2C16.2,80.9,0.3,83,-14.2,79.7C-28.7,76.3,-41.7,67.5,-53.1,56.8C-64.5,46.2,-74.2,33.7,-78.9,19.3C-83.6,4.9,-83.3,-11.3,-78.1,-25.9C-72.9,-40.5,-62.9,-53.5,-50,-61.9C-37.1,-70.3,-21.3,-74.1,-4.5,-67.7C12.3,-61.4,32.4,-43.8,45.7,-26.2C58.9,-8.6,72,8.9,72,21.9C72.1,34.9,58.9,43.4,45.7,52C32.5,60.6,19.3,69.3,3.9,73.8C-11.5,78.3,-23,78.7,-34.3,74.4C-45.6,70.1,-56.6,61.2,-66.2,50C-75.8,38.8,-83.9,25.4,-85.8,11.2C-87.7,-3.1,-83.3,-18,-75.8,-31C-68.2,-44,-57.4,-55,-44.6,-61.8C-31.7,-68.6,-16.9,-71.1,-0.5,-70.4C15.9,-69.6,32.5,-65.5,45.7,-56.2Z" transform="translate(100 100)" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-turquoise-100 text-turquoise-800 text-sm font-medium mb-6">
            About Us
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            The <span className="text-turquoise-500">Story</span> Behind {COMPANY.serviceName}
          </h1>
          <p className="text-xl text-gray-600 mb-10">
            Empowering businesses to stand out with exceptional SEO content that drives growth and engagement.
          </p>
        </div>
      </div>
    </section>
  );
}

function AboutMission() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
              {/* CSS-based illustration for mission */}
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-turquoise-100 rounded-full opacity-20"></div>
                <div className="absolute left-1/4 top-1/4 w-1/2 h-1/2 bg-turquoise-200 rounded-full"></div>
                <div className="absolute left-1/3 top-1/3 w-1/3 h-1/3 bg-turquoise-300 rounded-full"></div>
                <div className="absolute left-[40%] top-[40%] w-1/5 h-1/5 bg-turquoise-500 rounded-full animate-pulse"></div>
                <svg viewBox="0 0 24 24" className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-turquoise-600">
                  <path fill="currentColor" d="M12,1L21,5V11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1M12,3.18L5,6.3V11.22C5,15.54 8.25,19.82 12,20.82C15.75,19.82 19,15.54 19,11.22V6.3L12,3.18M16.08,10.83L14.67,9.42L11,13.08L9.33,11.42L7.92,12.83L11,15.92L16.08,10.83Z" />
                </svg>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                At {COMPANY.serviceName}, our mission is to empower businesses with high-quality, SEO-optimized content that drives organic traffic and establishes authority in their industries. We believe that exceptional content is the foundation of digital success, and we're committed to helping our clients achieve their online goals.
              </p>
              <p className="text-lg text-gray-600">
                We combine technical SEO expertise with compelling storytelling to create content that not only ranks well but also engages and converts readers. Our data-driven approach ensures measurable results for businesses of all sizes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutValues() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Core Values</h2>
          <p className="text-lg text-gray-600">
            These principles guide everything we do as we help businesses succeed online.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Value 1 */}
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all">
            <div className="mb-6 w-16 h-16 mx-auto bg-turquoise-100 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-8 h-8 text-turquoise-600">
                <path fill="currentColor" d="M12,15C7.58,15 4,16.79 4,19V21H20V19C20,16.79 16.42,15 12,15M8,9A4,4 0 0,0 12,13A4,4 0 0,0 16,9M11.5,2C11.2,2 11,2.21 11,2.5V5.5H10V3C10,3 7.75,3.86 7.75,6.75C7.75,6.75 7,6.89 7,8H17C16.95,6.89 16.25,6.75 16.25,6.75C16.25,3.86 14,3 14,3V5.5H13V2.5C13,2.21 12.8,2 12.5,2H11.5Z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Quality First</h3>
            <p className="text-gray-600 text-center">
              We never compromise on quality. Every piece of content we deliver is thoroughly researched, expertly crafted, and meticulously edited to exceed expectations.
            </p>
          </div>
          
          {/* Value 2 */}
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all">
            <div className="mb-6 w-16 h-16 mx-auto bg-turquoise-100 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-8 h-8 text-turquoise-600">
                <path fill="currentColor" d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M11,17V16H9V14H13V13H10A1,1 0 0,1 9,12V9A1,1 0 0,1 10,8H11V7H13V8H15V10H11V11H14A1,1 0 0,1 15,12V15A1,1 0 0,1 14,16H13V17H11Z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Data-Driven Results</h3>
            <p className="text-gray-600 text-center">
              We base our strategies on solid data and analytics. Our approach is focused on delivering measurable ROI and tangible business growth for our clients.
            </p>
          </div>
          
          {/* Value 3 */}
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all">
            <div className="mb-6 w-16 h-16 mx-auto bg-turquoise-100 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-8 h-8 text-turquoise-600">
                <path fill="currentColor" d="M18,22A2,2 0 0,0 20,20V4C20,2.89 19.1,2 18,2H12V9L9.5,7.5L7,9V2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18Z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Industry Expertise</h3>
            <p className="text-gray-600 text-center">
              We stay at the forefront of SEO trends and best practices. Our expertise allows us to create content that meets current standards and anticipates future algorithm updates.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutApproach() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="w-full md:w-1/2">
              {/* CSS/SVG illustration for approach */}
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute w-full h-full bg-gray-100 rounded-lg transform rotate-3"></div>
                <div className="absolute w-full h-full bg-turquoise-100 rounded-lg transform -rotate-3"></div>
                <div className="absolute w-full h-full bg-white rounded-lg border-2 border-gray-200 flex items-center justify-center">
                  <svg viewBox="0 0 36 36" className="w-20 h-20 text-turquoise-500">
                    <path fill="currentColor" d="M17,21V19H15V17H13V15H11V13H9V11H7V9H5V7H7V5H9V7H11V9H13V11H15V13H17V15H19V17H21V19H23V21H25V23H23V21H21V19H19V17H17V15H15V13H13V11H11V9H9V7H7V9H5V11H7V13H9V15H11V17H13V19H15V21H17M9,3H7V1H9V3M5,3H3V1H5V3M13,3H11V1H13V3M17,3H15V1H17V3M21,3H19V1H21V3M25,3H23V1H25V3M29,3H27V1H29V3M33,3H31V1H33V3M33,7H31V5H33V7M33,11H31V9H33V11M33,15H31V13H33V15M33,19H31V17H33V19M33,23H31V21H33V23M33,27H31V25H33V27M33,31H31V29H33V31M29,31H27V29H29V31M25,31H23V29H25V31M21,31H19V29H21V31M17,31H15V29H17V31M13,31H11V29H13V31M9,31H7V29H9V31M5,31H3V29H5V31M1,31H-1V29H1V31M1,27H-1V25H1V27M1,23H-1V21H1V23M1,19H-1V17H1V19M1,15H-1V13H1V15M1,11H-1V9H1V11M1,7H-1V5H1V7Z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Approach</h2>
              <p className="text-lg text-gray-600 mb-6">
                At {COMPANY.serviceName}, we take a strategic approach to content creation. We begin by understanding your business goals, target audience, and competitive landscape. This foundation allows us to develop content that not only ranks well but also serves your specific business objectives.
              </p>
              <p className="text-lg text-gray-600">
                Our process combines technical SEO expertise with creative storytelling, ensuring that your content is both search-engine friendly and engaging for human readers. We focus on creating value at every step, from keyword research to final delivery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutCTA() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-gradient-to-r from-turquoise-600 to-turquoise-500 rounded-2xl p-8 md:p-12 text-white">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to elevate your content?</h2>
            <p className="text-turquoise-50 text-lg mb-6">
              Let's collaborate to create SEO-optimized content that drives traffic and converts visitors into customers.
            </p>
            <Link
              href="/pricing"
              className="inline-block bg-white text-turquoise-600 font-medium py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"
            >
              See Our Packages
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 