"use client";

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-make-blue-100 text-make-blue-800 text-sm font-medium mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Automation <span className="text-make-blue-500">Expertise</span>
          </h2>
          <p className="text-lg text-gray-600">
            We're experts in building powerful automation workflows that save you time and increase efficiency. Here's why clients choose us:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="space-y-8">
              {[
                {
                  title: "Expert Certified Developers",
                  description:
                    "Our team includes certified Make.com and Zapier experts who understand the platforms inside and out.",
                },
                {
                  title: "Custom Solutions",
                  description:
                    "We build tailor-made automation solutions that precisely meet your business requirements.",
                },
                {
                  title: "End-to-End Support",
                  description:
                    "From planning to implementation and maintenance, we provide complete support for your automation workflows.",
                },
                {
                  title: "Performance Optimization",
                  description:
                    "We ensure your workflows run efficiently, saving you operation costs and preventing errors.",
                },
              ].map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-make-blue-100 rounded-full flex items-center justify-center text-make-blue-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative p-6 bg-gradient-to-br from-make-purple-50 to-make-blue-50 rounded-2xl shadow-md">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">Streamlined Project Process</h3>
                <ol className="space-y-3">
                  {[
                    "Initial consultation to understand your needs",
                    "Workflow planning and architecture design",
                    "Development and configuration",
                    "Testing and quality assurance",
                    "Deployment and integration",
                    "Training and documentation",
                    "Ongoing support and maintenance"
                  ].map((step, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-make-purple-100 text-make-purple-600 rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </span>
                      <span className="text-gray-600">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-make-purple-100 rounded-full opacity-70"></div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-make-blue-100 rounded-full opacity-70"></div>
          </div>
        </div>
      </div>
    </section>
  );
} 