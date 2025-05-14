import Link from "next/link";

export default function PricingPage() {
  return (
    <>
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-make-purple-100 text-make-purple-800 text-sm font-medium mb-4">
              Our Services
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
              Make.com & Zapier <span className="text-make-purple-500">Automation Services</span>
            </h1>
            <p className="text-lg text-gray-600">
              One-time implementation of custom automations to streamline your business processes. We build it, you own it.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[
              {
                name: "Simple Trigger",
                price: "$9.99",
                description: "Basic trigger-action automation for one process",
                features: [
                  "1 simple Make.com or Zapier scenario",
                  "1 trigger + 1 action setup",
                  "Basic success notification",
                  "Complete setup documentation"
                ]
              },
              {
                name: "Dual Integration",
                price: "$19.50",
                description: "Connect two apps with automated data flow",
                features: [
                  "1 Make.com or Zapier workflow",
                  "2 connected apps",
                  "Basic data field mapping",
                  "Basic error handling setup"
                ]
              },
              {
                name: "Multi-step Flow",
                price: "$29.90",
                description: "Multi-step process automation with filtering",
                features: [
                  "1 complex scenario",
                  "Up to 5 steps in workflow",
                  "Data filtering implementation",
                  "Technical documentation included"
                ],
                isPopular: true
              },
              {
                name: "Form Processor",
                price: "$39.99",
                description: "Automate form submissions with smart processing",
                features: [
                  "Form-to-database automation",
                  "Data validation setup",
                  "Conditional routing setup",
                  "Implementation documentation"
                ]
              },
              {
                name: "Data Sync Solution",
                price: "$49.90",
                description: "Keep your systems in sync automatically",
                features: [
                  "Two-way data synchronization",
                  "Custom field mapping setup",
                  "Error handling configuration",
                  "Complete technical documentation"
                ]
              },
              {
                name: "API Connector",
                price: "$59.50",
                description: "Connect to APIs with custom authentication",
                features: [
                  "Custom API integration setup",
                  "Auth configuration",
                  "Webhook implementation",
                  "Data transformation setup"
                ]
              },
              {
                name: "E-commerce Automation",
                price: "$69.99",
                description: "Streamline your e-commerce operations",
                features: [
                  "Order processing automation",
                  "Inventory update workflow",
                  "Email notification setup",
                  "Error recovery configuration"
                ],
                isPopular: true
              },
              {
                name: "CRM Integration",
                price: "$79.90",
                description: "Connect your CRM to other business tools",
                features: [
                  "CRM data workflow setup",
                  "Lead routing automation",
                  "Activity tracking setup",
                  "Field mapping configuration"
                ]
              },
              {
                name: "Document Automation",
                price: "$89.50",
                description: "Automate document creation and processing",
                features: [
                  "Document generation setup",
                  "PDF processing automation",
                  "Document routing workflow",
                  "Template configuration"
                ]
              },
              {
                name: "Business Process Automation",
                price: "$99.99",
                description: "Automate complex business processes end-to-end",
                features: [
                  "Multi-department workflow setup",
                  "Conditional logic implementation",
                  "Approval flow configuration",
                  "Process implementation guidance"
                ]
              },
              {
                name: "Enterprise Integration",
                price: "$109.90",
                description: "Connect enterprise systems with reliable automation",
                features: [
                  "Enterprise system workflow setup",
                  "Complex data transformation",
                  "Error handling implementation",
                  "Technical implementation documentation"
                ],
                isPopular: true
              },
              {
                name: "Complete Automation Package",
                price: "$119.50",
                description: "Multiple interconnected automation workflows",
                features: [
                  "Multiple workflow implementation",
                  "Cross-workflow data handling",
                  "Error notification system setup",
                  "Complete technical documentation"
                ]
              }
            ].map((plan, index) => (
              <div 
                key={index} 
                className={`rounded-2xl border ${plan.isPopular ? 'border-make-purple-200 bg-white shadow-lg' : 'border-gray-200 bg-white'} p-6 relative flex flex-col h-full`}
              >
                {plan.isPopular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-make-purple-500 text-white text-xs font-semibold py-1 px-3 rounded-full whitespace-nowrap">
                      Popular Choice
                    </span>
                  </div>
                )}
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex justify-center items-baseline my-3">
                    <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-1">one-time</span>
                  </div>
                  <p className="text-gray-600 text-sm">{plan.description}</p>
                </div>
                <ul className="space-y-2 mb-6 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 20 20" 
                        fill="currentColor" 
                        className="w-5 h-5 text-make-purple-500 flex-shrink-0"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <Link 
                    href={`/checkout?product=${encodeURIComponent(plan.name)}&price=${encodeURIComponent(plan.price)}`}
                    className={`w-full block text-center py-2 px-4 rounded-lg font-medium transition-colors text-sm ${
                      plan.isPopular 
                        ? 'bg-green-500 text-white hover:bg-green-600' 
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Need a custom automation solution?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We can build custom Make.com and Zapier automations tailored to your specific business needs.
              Contact us to discuss your workflow requirements.
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center text-make-purple-600 font-medium hover:text-make-purple-700"
            >
              Contact our team
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor" 
                className="w-5 h-5 ml-1"
              >
                <path 
                  fillRule="evenodd" 
                  d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z" 
                  clipRule="evenodd" 
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
} 