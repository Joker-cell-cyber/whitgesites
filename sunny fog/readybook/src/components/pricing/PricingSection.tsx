"use client";

import { motion } from "framer-motion";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const tiers = [
  {
    name: "Basic E-Book",
    priceMonthly: 399,
    wordCount: "Up to 10,000 words",
    description: "For short guides, mini e-books or product manuals.",
    features: [
      "Professional writing",
      "Basic research",
      "1 round of revisions",
      "Simple formatting",
      "PDF format"
    ],
    exclusive: [
      "2+ revision rounds",
      "Custom illustrations",
      "Premium formatting"
    ],
    delivery: "7-10 business days",
    href: "/contact",
    featured: false,
  },
  {
    name: "Standard E-Book",
    priceMonthly: 699,
    wordCount: "Up to 20,000 words",
    description: "For comprehensive guides, how-to books, and short stories.",
    features: [
      "Professional writing",
      "In-depth research",
      "2 rounds of revisions",
      "Professional formatting",
      "PDF and EPUB formats",
      "Basic SEO optimization"
    ],
    exclusive: [
      "Custom illustrations",
      "Dedicated editor",
      "Marketing materials"
    ],
    delivery: "14-21 business days",
    href: "/contact",
    featured: true,
  },
  {
    name: "Premium E-Book",
    priceMonthly: 1299,
    wordCount: "Up to 40,000 words",
    description: "For complete books, novels, and in-depth professional guides.",
    features: [
      "Expert-level writing",
      "Comprehensive research",
      "3 rounds of revisions",
      "Premium formatting",
      "All digital formats",
      "Complete SEO optimization",
      "Custom cover design"
    ],
    exclusive: [
      "Print-ready files",
      "Audiobook production",
      "Full marketing package"
    ],
    delivery: "30-45 business days",
    href: "/contact",
    featured: false,
  },
  {
    name: "Enhanced E-Book",
    priceMonthly: 1899,
    wordCount: "Up to 60,000 words",
    description: "For comprehensive books requiring extensive expertise and detail.",
    features: [
      "Subject matter expert writing",
      "Expert research & citations",
      "Unlimited revisions",
      "Premium formatting",
      "All digital formats",
      "Complete SEO optimization",
      "Custom cover design",
      "Basic illustrations"
    ],
    exclusive: [
      "Audiobook production",
      "Full marketing package"
    ],
    delivery: "45-60 business days",
    href: "/contact",
    featured: false,
  },
  {
    name: "Professional E-Book",
    priceMonthly: 2999,
    wordCount: "Up to 100,000 words",
    description: "For professional publications requiring the highest quality.",
    features: [
      "Industry expert writing",
      "Comprehensive research & citations",
      "Unlimited revisions",
      "Premium formatting",
      "All digital formats",
      "Complete SEO optimization",
      "Custom cover design",
      "Professional illustrations",
      "Print-ready files"
    ],
    exclusive: [
      "Full marketing package"
    ],
    delivery: "60-90 business days",
    href: "/contact",
    featured: false,
  },
  {
    name: "Enterprise E-Book",
    priceMonthly: null,
    wordCount: "Custom word count",
    description: "For large-scale projects with unique requirements.",
    features: [
      "Expert team collaboration",
      "Comprehensive research",
      "Unlimited revisions",
      "Premium formatting",
      "All digital formats",
      "Complete SEO optimization",
      "Custom cover design",
      "Professional illustrations",
      "Print-ready files",
      "Audiobook option",
      "Marketing materials"
    ],
    exclusive: [],
    delivery: "Custom timeline",
    href: "/contact",
    featured: false,
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function PricingSection() {
  return (
    <section className="py-20 bg-white" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose the package that suits your needs. Each tier includes professional writing services tailored to your specific requirements.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {tiers.slice(0, 3).map((tier) => (
            <motion.div
              key={tier.name}
              variants={cardVariants}
              className={`rounded-2xl shadow-xl overflow-hidden border-2 transition-all duration-300 hover:shadow-2xl relative flex flex-col ${
                tier.featured
                  ? "border-book-blue-500 transform hover:-translate-y-2"
                  : "border-gray-200 transform hover:-translate-y-1"
              }`}
            >
              {tier.featured && (
                <div className="absolute top-0 inset-x-0 bg-book-blue-500 text-white text-center py-2 text-sm font-medium">
                  Most Popular
                </div>
              )}
              <div
                className={`p-8 ${
                  tier.featured ? "pt-14" : "pt-8"
                } flex-grow flex flex-col`}
              >
                <h3 className="text-2xl font-bold text-gray-900">{tier.name}</h3>
                <div className="mt-4 flex items-baseline">
                  {tier.priceMonthly ? (
                    <>
                      <span className="text-4xl font-extrabold text-gray-900">
                        ${tier.priceMonthly}
                      </span>
                      <span className="ml-1 text-xl font-medium text-gray-500">
                        USD
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-extrabold text-gray-900">
                      Custom Quote
                    </span>
                  )}
                </div>
                <p className="mt-1 text-lg text-book-blue-700 font-medium">
                  {tier.wordCount}
                </p>
                <p className="mt-4 text-gray-600">{tier.description}</p>

                <div className="mt-6 space-y-4 flex-grow">
                  <div className="flex items-center">
                    <span className="bg-book-blue-100 rounded-full p-1 mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-book-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </span>
                    <span className="text-gray-700">Delivery: {tier.delivery}</span>
                  </div>

                  <h4 className="font-medium text-gray-900 mt-4">Included:</h4>
                  <ul className="space-y-2">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex">
                        <CheckIcon
                          className="h-5 w-5 text-book-green-500 shrink-0 mr-2"
                          aria-hidden="true"
                        />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {tier.exclusive.length > 0 && (
                    <>
                      <h4 className="font-medium text-gray-900 mt-4">Not included:</h4>
                      <ul className="space-y-2">
                        {tier.exclusive.map((item) => (
                          <li key={item} className="flex">
                            <XMarkIcon
                              className="h-5 w-5 text-gray-400 shrink-0 mr-2"
                              aria-hidden="true"
                            />
                            <span className="text-gray-500">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
              <div className="p-6 bg-gray-50">
                <div className="mt-6">
                  <Link
                    href={`/checkout?package=${encodeURIComponent(tier.name)}&price=${tier.priceMonthly}`}
                    className={`w-full inline-flex justify-center items-center px-5 py-3 text-base font-medium rounded-md text-white ${
                      tier.featured
                        ? "bg-gradient-to-r from-book-blue-500 to-book-blue-600 hover:from-book-blue-600 hover:to-book-blue-700"
                        : "bg-gray-800 hover:bg-gray-700"
                    }`}
                  >
                    Buy Now
                    <ArrowRightIcon className="ml-2 -mr-0.5 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <Link
            href="/pricing"
            className="inline-flex items-center text-book-blue-600 hover:text-book-blue-800 font-medium"
          >
            View all pricing options
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
} 