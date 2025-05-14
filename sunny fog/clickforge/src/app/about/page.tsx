import { Metadata } from 'next';
import { COMPANY } from '../constants/company';

export const metadata: Metadata = {
  title: `About Us | ${COMPANY.serviceName}`,
  description: 'Learn about our mission, vision, and values at ClickForge - the leading landing page design service.',
};

export default function AboutPage() {
  return (
    <main className="bg-[#121212] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
            <span className="block">About</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
              {COMPANY.serviceName}
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-400">
            We&apos;re revolutionizing how businesses create high-converting landing pages.
          </p>
        </div>

        <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl overflow-hidden p-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Our Story</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Founded in 2023, {COMPANY.serviceName} emerged from a simple observation: creating effective landing pages was too complex, too time-consuming, and too expensive for most businesses.
                </p>
                <p>
                  We set out to create a solution that would democratize access to high-quality landing pages that actually convert - without the complexity, long timelines, or subscription fees that plague the industry.
                </p>
                <p>
                  Today, we&apos;re proud to offer premium landing page design services with transparent pricing, quick turnaround times, and designs optimized for conversion.
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Our Approach</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  At {COMPANY.serviceName}, we believe that a great landing page is not just about beautiful design, but about achieving business goals. Our approach combines aesthetic appeal with conversion-focused strategies.
                </p>
                <p>
                  We&apos;ve eliminated the complexities that typically come with website development. Our process is streamlined, transparent, and focused on delivering results quickly without sacrificing quality.
                </p>
                <p>
                  By offering our services for a one-time fee rather than ongoing subscriptions, we ensure our incentives are aligned with yours - creating a high-converting page that delivers long-term value.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6">
            <div className="w-12 h-12 bg-indigo-600/20 rounded-lg flex items-center justify-center mb-5">
              <svg className="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Our Mission</h3>
            <p className="text-gray-400">
              To empower businesses of all sizes with high-converting landing pages that drive growth, without the complexity and ongoing costs of traditional web development.
            </p>
          </div>

          <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6">
            <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-5">
              <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Our Vision</h3>
            <p className="text-gray-400">
              To become the global standard for landing page design, known for our perfect balance of beautiful aesthetics, conversion optimization, and value-driven pricing.
            </p>
          </div>

          <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6">
            <div className="w-12 h-12 bg-pink-600/20 rounded-lg flex items-center justify-center mb-5">
              <svg className="w-6 h-6 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Our Values</h3>
            <p className="text-gray-400">
              Transparency in every interaction, excellence in every design, efficiency in every process, and results for every client - these are the principles that guide everything we do.
            </p>
          </div>
        </div>

        <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl overflow-hidden p-8">
          <h2 className="text-2xl font-bold mb-8 text-center">Why Choose {COMPANY.serviceName}?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-indigo-600/20 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Quick Turnaround</h3>
                <p className="text-gray-400">
                  We deliver high-quality landing pages in days, not weeks or months, so you can start capturing leads sooner.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-indigo-600/20 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Transparent Pricing</h3>
                <p className="text-gray-400">
                  One-time fees with no hidden costs or ongoing subscriptions. You&apos;ll know exactly what you&apos;re paying for.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-indigo-600/20 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Conversion-Focused</h3>
                <p className="text-gray-400">
                  Our designs aren&apos;t just beautiful - they&apos;re strategically crafted to convert visitors into customers.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-indigo-600/20 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Full Ownership</h3>
                <p className="text-gray-400">
                  Once delivered, your landing page is completely yours - no licensing fees or restricted usage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 