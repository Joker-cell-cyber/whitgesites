import { COMPANY } from "../constants/company";

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-make-purple-100 text-make-purple-800 text-sm font-medium mb-4">
            About Us
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Reimagining Business <span className="text-make-purple-500">Automation</span>
          </h1>
          <p className="text-xl text-gray-800">
            We're on a mission to make automation accessible and powerful for businesses of all sizes.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-10 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <div className="bg-make-purple-100 p-6 rounded-xl mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
                  <p className="text-gray-800">
                    {COMPANY.serviceName} was founded in 2025 with a clear vision: to democratize workflow automation. 
                    We recognized that businesses across industries were struggling with repetitive tasks, disconnected systems, and inefficient processes.
                  </p>
                  
                  <p className="text-gray-800 mt-4">
                    What started as a small team of automation enthusiasts has grown into a dedicated group of experts who specialize in creating custom automation solutions that solve real business challenges.
                  </p>
                </div>
                
                <div className="bg-make-blue-100 p-6 rounded-xl">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
                  <p className="text-gray-800">
                    Our mission is simple: to help businesses save time, reduce errors, and unlock their full potential through intelligent automation.
                    We believe that when teams are freed from repetitive tasks, they can focus on what really matters - innovation, growth, and delivering exceptional value to their customers.
                  </p>
                </div>
              </div>
              
              <div>
                <div className="bg-make-purple-50 p-6 rounded-xl mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Approach</h2>
                  <p className="text-gray-800">
                    We take a consultative approach to automation, focusing on understanding your unique business needs before recommending solutions. 
                    Our expertise spans various automation platforms including Make.com (formerly Integromat) and Zapier, allowing us to select the right tool for each specific use case.
                  </p>
                  
                  <p className="text-gray-800 mt-4">
                    We pride ourselves on delivering solutions that are:
                  </p>
                  
                  <ul className="mt-2 space-y-2 text-gray-800">
                    <li className="flex items-center">
                      <span className="text-make-purple-500 mr-2">✓</span>
                      <span><strong>Tailored:</strong> Custom-built for your specific business requirements</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-make-purple-500 mr-2">✓</span>
                      <span><strong>Scalable:</strong> Designed to grow with your business</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-make-purple-500 mr-2">✓</span>
                      <span><strong>Reliable:</strong> Engineered to work flawlessly without constant maintenance</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-make-purple-500 mr-2">✓</span>
                      <span><strong>Cost-effective:</strong> Focused on delivering maximum ROI</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-make-purple-600 to-make-blue-600 rounded-2xl shadow-lg p-10 text-white">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Core Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-3">Innovation</h3>
                <p className="text-white/90">
                  We're constantly exploring new ways to push the boundaries of what's possible with automation technology.
                </p>
              </div>
              
              <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-3">Excellence</h3>
                <p className="text-white/90">
                  We hold ourselves to the highest standards in every solution we deliver.
                </p>
              </div>
              
              <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-3">Simplicity</h3>
                <p className="text-white/90">
                  We believe in making complex technologies accessible through intuitive designs and clear communication.
                </p>
              </div>
              
              <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-3">Partnership</h3>
                <p className="text-white/90">
                  We view our clients as partners and measure our success by your success.
                </p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to transform your business with automation?</h2>
              <p className="mb-6 text-white/90">Let's discuss how we can help you automate your workflows and boost productivity.</p>
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-make-purple-700 bg-white hover:bg-gray-100 transition-colors"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 