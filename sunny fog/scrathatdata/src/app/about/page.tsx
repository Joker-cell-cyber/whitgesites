import { COMPANY } from '../constants/company';

export const metadata = {
  title: `About Us - ${COMPANY.serviceName}`,
  description: "Learn about our mission, values, and vision for revolutionizing data extraction",
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About {COMPANY.serviceName}</h1>
            <p className="text-xl text-gray-800 mb-8">
              Revolutionizing how businesses access and utilize data
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-gray-800 mb-6">
                At {COMPANY.serviceName}, our mission is to democratize access to valuable web data, 
                making it accessible, usable, and actionable for businesses of all sizes. We believe that 
                data should be a resource available to everyone, not just to those with technical expertise 
                or large budgets.
              </p>
              <p className="text-lg text-gray-800">
                We're committed to providing powerful data extraction solutions that are easy to use, 
                reliable, and deliver exceptional value. By removing the technical barriers to data access, 
                we empower businesses to make better decisions and drive innovation.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Values</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                  <p className="text-gray-800">
                    We continuously improve our technology to deliver the most effective data extraction solutions.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Integrity</h3>
                  <p className="text-gray-800">
                    We operate with transparency and respect for digital ethics and data privacy regulations.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
                  <p className="text-gray-800">
                    We make powerful data tools available to businesses of all sizes, not just large enterprises.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Quality</h3>
                  <p className="text-gray-800">
                    We prioritize accuracy, reliability, and usefulness in all the data we deliver.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Our Vision</h2>
            <p className="text-xl text-gray-800 mb-8">
              We envision a future where any business, regardless of size or technical resources, 
              can harness the power of web data to drive growth, innovation, and competitive advantage.
            </p>
            <p className="text-xl text-gray-800">
              By continuing to develop cutting-edge extraction technologies and user-friendly 
              interfaces, we aim to become the global leader in accessible data solutions, 
              helping organizations transform raw information into actionable insights.
            </p>
          </div>
        </div>
      </section>

      {/* Company Approach Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Approach</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Ethical Data Collection</h3>
              <p className="text-gray-800">
                We adhere to the highest standards of web scraping ethics, respecting website terms of service 
                and robots.txt directives. Our solutions are designed to minimize server impact and operate 
                within legal and ethical boundaries.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Cutting-Edge Technology</h3>
              <p className="text-gray-800">
                We employ advanced algorithms, machine learning, and distributed computing to overcome 
                the challenges of modern web scraping, ensuring reliable data extraction even from 
                complex, dynamic websites.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Data Quality Focus</h3>
              <p className="text-gray-800">
                We go beyond simple data extraction by implementing robust validation, cleaning, and 
                transformation processes. This ensures you receive accurate, structured, and immediately 
                usable data every time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Your Data?
          </h2>
          <p className="text-xl text-white mb-10 max-w-2xl mx-auto">
            Choose a package or request a custom solution tailored to your specific data extraction needs.
          </p>
          <a
            href="/packages"
            className="btn px-8 py-4 text-lg bg-white text-primary hover:bg-gray-100 transition duration-300 transform hover:scale-105"
          >
            View Packages
          </a>
        </div>
      </section>
    </div>
  );
} 