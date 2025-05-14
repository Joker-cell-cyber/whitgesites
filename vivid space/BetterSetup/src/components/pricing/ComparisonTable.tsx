"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type PlanCategory = "personal" | "team" | "business";

interface BaseFeature {
  name: string;
  starter: string;
}

interface PersonalFeature extends BaseFeature {
  basic: string;
  standard: string;
  plus: string;
  premium: string;
}

interface TeamFeature extends BaseFeature {
  standard: string;
  plus: string;
}

interface BusinessFeature extends BaseFeature {
  standard: string;
  plus: string;
  enterprise: string;
}

type Feature = PersonalFeature | TeamFeature | BusinessFeature;

export default function ComparisonTable() {
  const [selectedCategory, setSelectedCategory] = useState<PlanCategory>("personal");

  const featuresByCategory = {
    personal: {
      categoryName: "Personal Plans",
      features: [
        { name: "Dashboard", starter: "Simple", basic: "Custom", standard: "Advanced", plus: "Advanced", premium: "Advanced" },
        { name: "Note-taking System", starter: "Basic", basic: "Standard", standard: "Custom", plus: "Custom", premium: "Custom" },
        { name: "Task Management", starter: "Simple", basic: "Standard", standard: "Advanced", plus: "Advanced", premium: "Advanced" },
        { name: "Project Tracking", starter: "✗", basic: "Basic", standard: "Standard", plus: "Advanced", premium: "Advanced" },
        { name: "Templates Included", starter: "1", basic: "3", standard: "5", plus: "7", premium: "10" },
        { name: "Connected Databases", starter: "✗", basic: "Basic", standard: "Standard", plus: "Advanced", premium: "Advanced" },
        { name: "Relation Structures", starter: "✗", basic: "Simple", standard: "Standard", plus: "Custom", premium: "Advanced" },
        { name: "Progress Tracking", starter: "✗", basic: "✗", standard: "Basic", plus: "Standard", premium: "Advanced" },
        { name: "Custom Formulas", starter: "✗", basic: "✗", standard: "Basic", plus: "Standard", premium: "Advanced" },
        { name: "Goal Tracking", starter: "✗", basic: "✗", standard: "✗", plus: "Basic", premium: "Advanced" },
        { name: "Data Visualization", starter: "✗", basic: "✗", standard: "✗", plus: "Basic", premium: "Standard" },
        { name: "Delivery Time", starter: "48 hours", basic: "48 hours", standard: "72 hours", plus: "72 hours", premium: "96 hours" }
      ] as PersonalFeature[]
    },
    team: {
      categoryName: "Team Plans",
      features: [
        { name: "Team Members", starter: "Up to 5", standard: "Up to 10", plus: "Up to 15" },
        { name: "Team Dashboard", starter: "Basic", standard: "Standard", plus: "Advanced" },
        { name: "Shared Database", starter: "Basic", standard: "Advanced", plus: "Advanced" },
        { name: "Team Wiki", starter: "Basic", standard: "Advanced", plus: "Comprehensive" },
        { name: "Project Management", starter: "Basic", standard: "Standard", plus: "Advanced" },
        { name: "Meeting Templates", starter: "1", standard: "3", plus: "5" },
        { name: "Team Templates", starter: "3", standard: "5", plus: "7" },
        { name: "Team Directory", starter: "✗", standard: "Standard", plus: "Advanced" },
        { name: "Task Assignment", starter: "Basic", standard: "Standard", plus: "Advanced" },
        { name: "Document Management", starter: "✗", standard: "Basic", plus: "Advanced" },
        { name: "Role-based Access", starter: "✗", standard: "Basic", plus: "Advanced" },
        { name: "Delivery Time", starter: "4 days", standard: "5 days", plus: "6 days" }
      ] as TeamFeature[]
    },
    business: {
      categoryName: "Business Plans",
      features: [
        { name: "Client Management", starter: "Basic", standard: "Advanced", plus: "Advanced", enterprise: "Advanced" },
        { name: "Project Tracking", starter: "Basic", standard: "Advanced", plus: "Advanced", enterprise: "Advanced" },
        { name: "Invoice Tracking", starter: "Basic", standard: "Standard", plus: "Advanced", enterprise: "Advanced" },
        { name: "Business Procedures", starter: "Basic", standard: "Standard", plus: "Advanced", enterprise: "Complete" },
        { name: "Client Portal", starter: "✗", standard: "Basic", plus: "Advanced", enterprise: "Advanced" },
        { name: "Resource Management", starter: "✗", standard: "Basic", plus: "Advanced", enterprise: "Advanced" },
        { name: "Business Metrics", starter: "✗", standard: "Basic", plus: "Advanced", enterprise: "Advanced" },
        { name: "Automated Workflows", starter: "✗", standard: "✗", plus: "Basic", enterprise: "Advanced" },
        { name: "Financial Tracking", starter: "Basic", standard: "Standard", plus: "Advanced", enterprise: "Complete" },
        { name: "Employee Onboarding", starter: "✗", standard: "✗", plus: "Basic", enterprise: "Advanced" },
        { name: "Department Integration", starter: "✗", standard: "✗", plus: "✗", enterprise: "Advanced" },
        { name: "Knowledge Management", starter: "✗", standard: "Basic", plus: "Standard", enterprise: "Advanced" },
        { name: "Delivery Time", starter: "7 days", standard: "8 days", plus: "9 days", enterprise: "10 days" }
      ] as BusinessFeature[]
    }
  };

  const activeFeatures = featuresByCategory[selectedCategory].features as Feature[];
  const prices = {
    personal: { starter: "$9.99", basic: "$19.50", standard: "$29.90", plus: "$39.99", premium: "$49.90" },
    team: { starter: "$59.50", standard: "$69.99", plus: "$79.90" },
    business: { starter: "$89.50", standard: "$99.99", plus: "$109.90", enterprise: "$119.50" }
  };

  return (
    <section className="py-24 relative bg-white" id="comparison">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 bg-notion-black-100 rounded-lg">
            {(["personal", "team", "business"] as PlanCategory[]).map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      selectedCategory === category
                    ? 'bg-notion-accent-500 text-white'
                    : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    {featuresByCategory[category].categoryName}
                  </button>
                ))}
              </div>
        </div>

        <motion.div 
          className="w-full overflow-x-auto card-hand-drawn"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          key={selectedCategory}
        >
          <table className="w-full min-w-[768px]">
            <thead className="bg-notion-black-100">
              <tr>
                <th className="py-4 px-4 text-left text-black font-semibold w-1/5">Feature</th>
                {selectedCategory === 'personal' && (
                  <>
                    <th className="py-4 px-4 text-center">
                      <div className="text-black font-bold">Starter</div>
                      <div className="text-notion-accent-600 text-xl font-bold">{prices[selectedCategory].starter}</div>
                    </th>
                    <th className="py-4 px-4 text-center relative">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-notion-accent-500"></div>
                      <div className="text-black font-bold">Basic</div>
                      <div className="text-notion-accent-600 text-xl font-bold">{prices[selectedCategory].basic}</div>
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-notion-accent-500 text-white text-xs uppercase font-bold py-1 px-2 rounded">
                        Popular
                      </div>
                    </th>
                    <th className="py-4 px-4 text-center">
                      <div className="text-black font-bold">Standard</div>
                      <div className="text-notion-accent-600 text-xl font-bold">{prices[selectedCategory].standard}</div>
                    </th>
                    <th className="py-4 px-4 text-center">
                      <div className="text-black font-bold">Plus</div>
                      <div className="text-notion-accent-600 text-xl font-bold">{prices[selectedCategory].plus}</div>
                    </th>
                    <th className="py-4 px-4 text-center">
                      <div className="text-black font-bold">Premium</div>
                      <div className="text-notion-accent-600 text-xl font-bold">{prices[selectedCategory].premium}</div>
                    </th>
                  </>
                )}
                {selectedCategory === 'team' && (
                  <>
                    <th className="py-4 px-4 text-center">
                      <div className="text-black font-bold">Team Starter</div>
                      <div className="text-notion-accent-600 text-xl font-bold">{prices[selectedCategory].starter}</div>
                    </th>
                    <th className="py-4 px-4 text-center relative">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-notion-accent-500"></div>
                      <div className="text-black font-bold">Team Standard</div>
                      <div className="text-notion-accent-600 text-xl font-bold">{prices[selectedCategory].standard}</div>
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-notion-accent-500 text-white text-xs uppercase font-bold py-1 px-2 rounded">
                        Popular
                      </div>
                    </th>
                    <th className="py-4 px-4 text-center">
                      <div className="text-black font-bold">Team Plus</div>
                      <div className="text-notion-accent-600 text-xl font-bold">{prices[selectedCategory].plus}</div>
                    </th>
                  </>
                )}
                {selectedCategory === 'business' && (
                  <>
                    <th className="py-4 px-4 text-center">
                      <div className="text-black font-bold">Business Starter</div>
                      <div className="text-notion-accent-600 text-xl font-bold">{prices[selectedCategory].starter}</div>
                    </th>
                    <th className="py-4 px-4 text-center">
                      <div className="text-black font-bold">Business Standard</div>
                      <div className="text-notion-accent-600 text-xl font-bold">{prices[selectedCategory].standard}</div>
                    </th>
                    <th className="py-4 px-4 text-center">
                      <div className="text-black font-bold">Business Plus</div>
                      <div className="text-notion-accent-600 text-xl font-bold">{prices[selectedCategory].plus}</div>
                    </th>
                    <th className="py-4 px-4 text-center relative">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-notion-accent-500"></div>
                      <div className="text-black font-bold">Enterprise</div>
                      <div className="text-notion-accent-600 text-xl font-bold">{prices[selectedCategory].enterprise}</div>
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-notion-accent-500 text-white text-xs uppercase font-bold py-1 px-2 rounded">
                        Popular
                      </div>
                    </th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {activeFeatures.map((feature, index) => (
                <tr key={index} className={`border-b border-gray-200 ${index % 2 === 1 ? 'bg-notion-black-50' : ''}`}>
                  <td className="py-3 px-4 text-black font-medium">{feature.name}</td>
                  
                  {selectedCategory === 'personal' && (
                    <>
                      <td className="py-3 px-4 text-center text-gray-700">
                        {feature.starter === "✓" ? (
                          <svg className="h-5 w-5 text-notion-accent-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : feature.starter === "✗" ? (
                          <svg className="h-5 w-5 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        ) : (
                          feature.starter
                        )}
                      </td>
                      <td className="py-3 px-4 text-center text-gray-700 bg-notion-black-100/20">
                    {selectedCategory === 'personal' && (feature as PersonalFeature).basic === "✓" ? (
                          <svg className="h-5 w-5 text-notion-accent-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : selectedCategory === 'personal' && (feature as PersonalFeature).basic === "✗" ? (
                          <svg className="h-5 w-5 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : selectedCategory === 'personal' ? (
                      (feature as PersonalFeature).basic
                    ) : null}
                  </td>
                      <td className="py-3 px-4 text-center text-gray-700">
                    {feature.standard === "✓" ? (
                          <svg className="h-5 w-5 text-notion-accent-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : feature.standard === "✗" ? (
                          <svg className="h-5 w-5 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        ) : (
                          feature.standard
                        )}
                  </td>
                      <td className="py-3 px-4 text-center text-gray-700">
                        {feature.plus === "✓" ? (
                          <svg className="h-5 w-5 text-notion-accent-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : feature.plus === "✗" ? (
                          <svg className="h-5 w-5 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        ) : (
                          feature.plus
                        )}
                      </td>
                      <td className="py-3 px-4 text-center text-gray-700">
                    {selectedCategory === 'personal' && (feature as PersonalFeature).premium === "✓" ? (
                          <svg className="h-5 w-5 text-notion-accent-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : selectedCategory === 'personal' && (feature as PersonalFeature).premium === "✗" ? (
                          <svg className="h-5 w-5 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : selectedCategory === 'personal' ? (
                      (feature as PersonalFeature).premium
                    ) : null}
                  </td>
                    </>
                  )}
                  
                  {selectedCategory === 'team' && (
                    <>
                      <td className="py-3 px-4 text-center text-gray-700">
                        {feature.starter === "✓" ? (
                          <svg className="h-5 w-5 text-notion-accent-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : feature.starter === "✗" ? (
                          <svg className="h-5 w-5 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        ) : (
                          feature.starter
                        )}
                      </td>
                      <td className="py-3 px-4 text-center text-gray-700 bg-notion-black-100/20">
                        {feature.standard === "✓" ? (
                          <svg className="h-5 w-5 text-notion-accent-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : feature.standard === "✗" ? (
                          <svg className="h-5 w-5 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        ) : (
                          feature.standard
                        )}
                      </td>
                      <td className="py-3 px-4 text-center text-gray-700">
                        {feature.plus === "✓" ? (
                          <svg className="h-5 w-5 text-notion-accent-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : feature.plus === "✗" ? (
                          <svg className="h-5 w-5 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        ) : (
                          feature.plus
                        )}
                      </td>
                    </>
                  )}
                  
                  {selectedCategory === 'business' && (
                    <>
                      <td className="py-3 px-4 text-center text-gray-700">
                        {feature.starter === "✓" ? (
                          <svg className="h-5 w-5 text-notion-accent-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : feature.starter === "✗" ? (
                          <svg className="h-5 w-5 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        ) : (
                          feature.starter
                        )}
                      </td>
                      <td className="py-3 px-4 text-center text-gray-700 bg-notion-black-100/20">
                        {feature.standard === "✓" ? (
                          <svg className="h-5 w-5 text-notion-accent-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : feature.standard === "✗" ? (
                          <svg className="h-5 w-5 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        ) : (
                          feature.standard
                        )}
                      </td>
                      <td className="py-3 px-4 text-center text-gray-700">
                        {feature.plus === "✓" ? (
                          <svg className="h-5 w-5 text-notion-accent-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : feature.plus === "✗" ? (
                          <svg className="h-5 w-5 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        ) : (
                          feature.plus
                        )}
                      </td>
                      <td className="py-3 px-4 text-center text-gray-700">
                        {selectedCategory === 'business' && (feature as BusinessFeature).enterprise === "✓" ? (
                          <svg className="h-5 w-5 text-notion-accent-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                        ) : selectedCategory === 'business' && (feature as BusinessFeature).enterprise === "✗" ? (
                          <svg className="h-5 w-5 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : selectedCategory === 'business' ? (
                          (feature as BusinessFeature).enterprise
                    ) : null}
                  </td>
                    </>
                  )}
                </tr>
              ))}
              <tr>
                <td className="py-6 px-4"></td>
                {selectedCategory === 'personal' && (
                  <>
                    <td className="py-6 px-4 text-center">
                      <a 
                        href="#pricing-tabs" 
                        className="inline-block px-4 py-2 text-black rounded-lg text-sm font-medium button-hand-drawn"
                      >
                        Starter
                      </a>
                    </td>
                    <td className="py-6 px-4 text-center">
                      <a 
                        href="#pricing-tabs" 
                        className="inline-block px-4 py-2 bg-notion-accent-500 text-white rounded-lg text-sm font-medium"
                      >
                        Basic
                      </a>
                    </td>
                    <td className="py-6 px-4 text-center">
                      <a 
                        href="#pricing-tabs" 
                        className="inline-block px-4 py-2 text-black rounded-lg text-sm font-medium button-hand-drawn"
                      >
                        Standard
                      </a>
                    </td>
                    <td className="py-6 px-4 text-center">
                      <a 
                        href="#pricing-tabs" 
                        className="inline-block px-4 py-2 text-black rounded-lg text-sm font-medium button-hand-drawn"
                      >
                        Plus
                      </a>
                    </td>
                    <td className="py-6 px-4 text-center">
                      <a 
                        href="#pricing-tabs" 
                        className="inline-block px-4 py-2 text-black rounded-lg text-sm font-medium button-hand-drawn"
                      >
                        Premium
                      </a>
                    </td>
                  </>
                )}
                {selectedCategory === 'team' && (
                  <>
                    <td className="py-6 px-4 text-center">
                      <a 
                        href="#pricing-tabs" 
                        className="inline-block px-4 py-2 text-black rounded-lg text-sm font-medium button-hand-drawn"
                      >
                        Team Starter
                      </a>
                    </td>
                    <td className="py-6 px-4 text-center">
                      <a 
                        href="#pricing-tabs" 
                        className="inline-block px-4 py-2 bg-notion-accent-500 text-white rounded-lg text-sm font-medium"
                      >
                        Team Standard
                      </a>
                    </td>
                <td className="py-6 px-4 text-center">
                  <a 
                    href="#pricing-tabs" 
                        className="inline-block px-4 py-2 text-black rounded-lg text-sm font-medium button-hand-drawn"
                  >
                        Team Plus
                  </a>
                </td>
                  </>
                )}
                {selectedCategory === 'business' && (
                  <>
                    <td className="py-6 px-4 text-center">
                  <a 
                    href="#pricing-tabs" 
                        className="inline-block px-4 py-2 text-black rounded-lg text-sm font-medium button-hand-drawn"
                  >
                        Business Starter
                  </a>
                </td>
                <td className="py-6 px-4 text-center">
                  <a 
                    href="#pricing-tabs" 
                        className="inline-block px-4 py-2 text-black rounded-lg text-sm font-medium button-hand-drawn"
                  >
                        Business Standard
                  </a>
                </td>
                <td className="py-6 px-4 text-center">
                  <a 
                    href="#pricing-tabs" 
                        className="inline-block px-4 py-2 text-black rounded-lg text-sm font-medium button-hand-drawn"
                  >
                        Business Plus
                  </a>
                </td>
                <td className="py-6 px-4 text-center">
                  <a 
                    href="#pricing-tabs" 
                        className="inline-block px-4 py-2 bg-notion-accent-500 text-white rounded-lg text-sm font-medium"
                  >
                        Enterprise
                  </a>
                </td>
                  </>
                )}
              </tr>
            </tbody>
          </table>
        </motion.div>
        
        <div className="mt-12 text-center">
          <a 
            href="/contact" 
            className="inline-flex items-center px-6 py-3 text-black rounded-lg font-medium button-hand-drawn"
          >
            Contact Us for Custom Solutions
          </a>
        </div>
      </div>
    </section>
  );
} 