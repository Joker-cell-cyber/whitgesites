import React from 'react';

export function PackageFeatures() {
  const features = [
    { name: "Data Points", basic: "Up to 2,000", standard: "Up to 5,000", professional: "Up to 10,000", enterprise: "Unlimited" },
    { name: "Websites", basic: "2", standard: "3", professional: "5", enterprise: "50+" },
    { name: "Update Frequency", basic: "Weekly", standard: "Bi-weekly", professional: "Weekly", enterprise: "Real-time" },
    { name: "Data Formats", basic: "CSV, Excel, JSON", standard: "Any format", professional: "Any format", enterprise: "Custom integrations" },
    { name: "Customer Support", basic: "Email", standard: "Email & Chat", professional: "Priority", enterprise: "VIP & Consultation" },
    { name: "API Access", basic: "❌", standard: "✓", professional: "✓", enterprise: "✓" },
    { name: "Data Cleaning", basic: "Basic", standard: "Standard", professional: "Advanced", enterprise: "Custom" },
    { name: "Data Enrichment", basic: "❌", standard: "✓", professional: "✓", enterprise: "✓" },
    { name: "Custom Fields", basic: "Up to 10", standard: "Up to 20", professional: "Up to 30", enterprise: "Unlimited" },
    { name: "Historical Data", basic: "1 month", standard: "3 months", professional: "6 months", enterprise: "Unlimited" },
    { name: "Dedicated Manager", basic: "❌", standard: "❌", professional: "✓", enterprise: "✓" },
    { name: "Anti-Bot Bypass", basic: "Basic", standard: "Advanced", professional: "Advanced", enterprise: "Enterprise-grade" },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-950 mb-4">Features Comparison</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Compare our packages to find the perfect fit for your data needs.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Feature
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Basic
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider bg-primary/10">
                  Standard
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Professional
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Enterprise
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {features.map((feature, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-950">
                    {feature.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                    {feature.basic}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-medium bg-primary/5">
                    {feature.standard}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                    {feature.professional}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                    {feature.enterprise}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-700">
            All plans include: Data extraction, basic data cleaning, and standard formats.
          </p>
        </div>
      </div>
    </section>
  );
} 