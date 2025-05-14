"use client";

import { useState } from "react";

type MealPlanCategory = "weekly" | "monthly" | "quarterly";

export default function MealPlanComparisonTable() {
  const [selectedCategory, setSelectedCategory] = useState<MealPlanCategory>("weekly");

  const featuresByCategory = {
    weekly: {
      categoryName: "Weekly Plans",
      features: [
        { name: "Unique Recipes", basic: "5", standard: "7", enhanced: "10", professional: "7 family", premium: "Custom" },
        { name: "Nutritional Info", basic: "Basic", standard: "Detailed", enhanced: "Complete", professional: "Age ranges", premium: "Personalized" },
        { name: "Grocery Lists", basic: "Basic", standard: "Organized", enhanced: "Smart", professional: "Budget", premium: "Custom" },
        { name: "Diet Options", basic: "✗", standard: "✓", enhanced: "✓", professional: "✓", premium: "✓" },
        { name: "Calorie Tracking", basic: "✗", standard: "Basic", enhanced: "Advanced", professional: "Family", premium: "Personalized" },
        { name: "Macro Tracking", basic: "✗", standard: "✗", enhanced: "✓", professional: "✓", premium: "✓" },
        { name: "Price", basic: "€29.90", standard: "€39.90", enhanced: "€49.90", professional: "€59.90", premium: "€69.90" },
      ]
    },
    monthly: {
      categoryName: "Monthly Plans",
      features: [
        { name: "Unique Recipes", basic: "20", standard: "30", enhanced: "40", professional: "30 family", premium: "Custom" },
        { name: "Nutritional Info", basic: "Basic", standard: "Detailed", enhanced: "Complete", professional: "Age ranges", premium: "Personalized" },
        { name: "Grocery Lists", basic: "Basic", standard: "Weekly", enhanced: "Smart", professional: "Budget", premium: "Custom" },
        { name: "Diet Options", basic: "Limited", standard: "Several", enhanced: "Multiple", professional: "Family", premium: "Custom" },
        { name: "Savings", basic: "10%", standard: "15%", enhanced: "15%", professional: "15%", premium: "15%" },
        { name: "Price", basic: "€99.90", standard: "€129.90", enhanced: "€169.90", professional: "€199.90", premium: "€249.90" },
      ]
    },
    quarterly: {
      categoryName: "Quarterly Plans",
      features: [
        { name: "Unique Recipes", basic: "60", standard: "90", enhanced: "120", professional: "90 family", premium: "Custom" },
        { name: "Nutritional Info", basic: "Basic", standard: "Detailed", enhanced: "Complete", professional: "Age ranges", premium: "Personalized" },
        { name: "Reports", basic: "✗", standard: "Quarterly", enhanced: "Monthly", professional: "✗", premium: "Monthly" },
        { name: "Special Meals", basic: "✗", standard: "✗", enhanced: "Basic", professional: "✓", premium: "✓" },
        { name: "Seasonal Menu", basic: "Basic", standard: "✓", enhanced: "✓", professional: "✓", premium: "✓" },
        { name: "Savings", basic: "25%", standard: "25%", enhanced: "25%", professional: "25%", premium: "25%" },
        { name: "Price", basic: "€249.90", standard: "€349.90", enhanced: "€449.90", professional: "€549.90", premium: "€699.90" },
      ]
    }
  };

  const activeFeatures = featuresByCategory[selectedCategory].features;

  return (
    <section className="py-24 relative bg-gray-50" id="comparison">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Plan <span className="gradient-text">Comparison</span> Table
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Compare our meal plans side by side to find the perfect match for your nutritional needs
          </p>
          
          <div className="flex justify-center mb-8">
            <div className="inline-flex p-1 bg-gray-100 rounded-lg">
              {(["weekly", "monthly", "quarterly"] as MealPlanCategory[]).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-nutrition-green-600 to-carrot-500 text-white'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  {featuresByCategory[category].categoryName}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full overflow-x-auto rounded-xl bg-white shadow-lg">
          <table className="w-full min-w-[768px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="py-4 px-4 text-left text-gray-700 font-semibold w-1/6">Feature</th>
                <th className="py-4 px-4 text-center">
                  <div className="text-gray-800 font-bold">Basic</div>
                </th>
                <th className="py-4 px-4 text-center bg-nutrition-green-50 relative">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-nutrition-green-600 to-carrot-500"></div>
                  <div className="text-gray-800 font-bold">Standard</div>
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-nutrition-green-600 to-carrot-500 text-white text-xs uppercase font-bold py-1 px-2 rounded">
                    Popular
                  </div>
                </th>
                <th className="py-4 px-4 text-center">
                  <div className="text-gray-800 font-bold">Enhanced</div>
                </th>
                <th className="py-4 px-4 text-center">
                  <div className="text-gray-800 font-bold">Professional</div>
                </th>
                <th className="py-4 px-4 text-center">
                  <div className="text-gray-800 font-bold">Premium</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {activeFeatures.map((feature, index) => (
                <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition-colors`}>
                  <td className="py-3 px-4 border-b border-gray-200 font-medium text-gray-700">{feature.name}</td>
                  <td className="py-3 px-4 border-b border-gray-200 text-center">
                    {feature.basic === "✓" ? (
                      <svg className="h-5 w-5 text-nutrition-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : feature.basic === "✗" ? (
                      <svg className="h-5 w-5 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <span className="text-gray-600 text-sm">{feature.basic}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 text-center bg-nutrition-green-50">
                    {feature.standard === "✓" ? (
                      <svg className="h-5 w-5 text-nutrition-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : feature.standard === "✗" ? (
                      <svg className="h-5 w-5 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <span className="text-gray-600 text-sm">{feature.standard}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 text-center">
                    {feature.enhanced === "✓" ? (
                      <svg className="h-5 w-5 text-nutrition-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : feature.enhanced === "✗" ? (
                      <svg className="h-5 w-5 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <span className="text-gray-600 text-sm">{feature.enhanced}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 text-center">
                    {feature.professional === "✓" ? (
                      <svg className="h-5 w-5 text-nutrition-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : feature.professional === "✗" ? (
                      <svg className="h-5 w-5 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <span className="text-gray-600 text-sm">{feature.professional}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 text-center">
                    {feature.premium === "✓" ? (
                      <svg className="h-5 w-5 text-nutrition-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : feature.premium === "✗" ? (
                      <svg className="h-5 w-5 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <span className="text-gray-600 text-sm">{feature.premium}</span>
                    )}
                  </td>
                </tr>
              ))}
              <tr className="bg-nutrition-green-50">
                <td colSpan={6} className="py-4 px-4 text-center">
                  <div className="flex items-center justify-center gap-4">
                    <a href="#pricing-tabs" className="px-6 py-2 bg-gradient-to-r from-nutrition-green-600 to-carrot-500 hover:from-nutrition-green-700 hover:to-carrot-600 text-white rounded-lg transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-nutrition-green-500 focus:ring-offset-2">
                      View Detailed Plans
                    </a>
                    <a href="#pricing-faq" className="px-6 py-2 bg-white text-gray-800 rounded-lg font-medium border border-gray-200 hover:bg-gray-100 transition-colors">
                      Read FAQ
                    </a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
} 