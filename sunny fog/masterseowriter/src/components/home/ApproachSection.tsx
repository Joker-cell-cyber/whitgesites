"use client";

export default function ApproachSection() {
  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-turquoise-100 text-turquoise-800 text-sm font-medium mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Our Unique <span className="text-turquoise-500">Approach</span>
          </h2>
          <p className="text-lg text-gray-600">
            We stand out from competitors through our proven methodology and commitment to quality
          </p>
        </div>

        {/* Zigzag items */}
        <div className="space-y-24">
          {/* Item 1 */}
          <div className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-white rounded-xl p-8 shadow-lg relative z-10">
                  <div className="w-12 h-12 bg-turquoise-100 rounded-full flex items-center justify-center text-turquoise-600 mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">In-depth Keyword Research</h3>
                  <p className="text-gray-600 mb-6">
                    Our content strategy begins with thorough research to identify the most valuable keywords for your industry. We analyze search volume, competition, and user intent to target terms that will drive qualified traffic to your site.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-turquoise-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-600">Competitive analysis</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-turquoise-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-600">Search intent mapping</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-turquoise-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-600">Long-tail opportunity identification</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative">
                  <div className="absolute -inset-4 bg-turquoise-100 rounded-xl transform rotate-3"></div>
                  <div className="relative bg-white p-6 shadow-lg rounded-xl">
                    {/* Interactive Keyword Research Dashboard */}
                    <div className="rounded-lg overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 p-4">
                      {/* Search bar with magnifying glass */}
                      <div className="relative flex items-center mb-6">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                        <input type="text" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-turquoise-500 focus:border-turquoise-500" placeholder="digital marketing services" readOnly />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                          <div className="px-2 py-1 bg-turquoise-100 rounded text-turquoise-800 text-xs font-medium">
                            Analyze
                          </div>
                        </div>
                      </div>

                      {/* Keyword clusters visualization */}
                      <div className="relative h-44 mb-6 bg-white rounded-lg p-3 border border-gray-200 overflow-hidden">
                        <div className="text-xs text-gray-500 mb-2 font-medium">Keyword Cluster Map</div>
                        
                        {/* Main keyword */}
                        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div className="px-3 py-1.5 bg-turquoise-500 text-white rounded-full text-sm font-medium shadow-lg z-10 whitespace-nowrap">
                            digital marketing
                          </div>
                        </div>
                        
                        {/* Related keywords in a cluster */}
                        <div className="absolute left-[30%] top-[25%]">
                          <div className="px-2 py-1 bg-turquoise-100 text-turquoise-800 rounded-full text-xs font-medium shadow whitespace-nowrap">
                            SEO services
                          </div>
                        </div>
                        <div className="absolute right-[25%] top-[35%]">
                          <div className="px-2 py-1 bg-turquoise-100 text-turquoise-800 rounded-full text-xs font-medium shadow whitespace-nowrap">
                            content marketing
                          </div>
                        </div>
                        <div className="absolute left-[20%] bottom-[30%]">
                          <div className="px-2 py-1 bg-turquoise-100 text-turquoise-800 rounded-full text-xs font-medium shadow whitespace-nowrap">
                            PPC management
                          </div>
                        </div>
                        <div className="absolute right-[20%] bottom-[25%]">
                          <div className="px-2 py-1 bg-turquoise-100 text-turquoise-800 rounded-full text-xs font-medium shadow whitespace-nowrap">
                            social media
                          </div>
                        </div>
                        
                        {/* Connection lines */}
                        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
                          <line x1="50%" y1="50%" x2="30%" y2="25%" stroke="#0db5b4" strokeWidth="1" strokeDasharray="2" />
                          <line x1="50%" y1="50%" x2="75%" y2="35%" stroke="#0db5b4" strokeWidth="1" strokeDasharray="2" />
                          <line x1="50%" y1="50%" x2="20%" y2="70%" stroke="#0db5b4" strokeWidth="1" strokeDasharray="2" />
                          <line x1="50%" y1="50%" x2="80%" y2="75%" stroke="#0db5b4" strokeWidth="1" strokeDasharray="2" />
                        </svg>
                      </div>

                      {/* Keyword metrics */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-white p-3 rounded-lg border border-gray-200">
                          <div className="text-xs text-gray-500 mb-1">Search Volume</div>
                          <div className="flex justify-between items-end">
                            <div className="text-lg font-bold text-gray-800">12.4K</div>
                            <div className="flex items-center text-xs text-green-600">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                              </svg>
                              <span>18%</span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-gray-200">
                          <div className="text-xs text-gray-500 mb-1">Keyword Difficulty</div>
                          <div className="flex items-end justify-between">
                            <div className="text-lg font-bold text-turquoise-600">Medium</div>
                            <div className="text-xs text-gray-500">65/100</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Long tail suggestions */}
                      <div className="bg-white p-3 rounded-lg border border-gray-200">
                        <div className="text-xs text-gray-500 mb-2 font-medium">Long-tail Opportunities</div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="text-xs text-gray-800">affordable digital marketing for small business</div>
                            <div className="text-xs text-turquoise-600 font-medium">780</div>
                          </div>
                          <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-turquoise-500 h-full rounded-full" style={{ width: '35%' }}></div>
                          </div>
                          
                          <div className="flex justify-between items-center mt-2">
                            <div className="text-xs text-gray-800">best digital marketing strategies 2023</div>
                            <div className="text-xs text-turquoise-600 font-medium">1.2K</div>
                          </div>
                          <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-turquoise-500 h-full rounded-full" style={{ width: '48%' }}></div>
                          </div>
                          
                          <div className="flex justify-between items-center mt-2">
                            <div className="text-xs text-gray-800">digital marketing ROI calculator</div>
                            <div className="text-xs text-turquoise-600 font-medium">590</div>
                          </div>
                          <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-turquoise-500 h-full rounded-full" style={{ width: '28%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Item 2 */}
          <div className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-2">
                <div className="bg-white rounded-xl p-8 shadow-lg relative z-10">
                  <div className="w-12 h-12 bg-turquoise-100 rounded-full flex items-center justify-center text-turquoise-600 mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25-2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5m-16.5 0h12-12z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Compelling Content Creation</h3>
                  <p className="text-gray-600 mb-6">
                    Our expert writers craft high-quality, SEO-optimized content that resonates with your target audience and drives engagement. We focus on creating value-rich content that establishes your authority in your industry.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-turquoise-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-600">Engaging narratives that capture attention</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-turquoise-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-600">Strategic keyword integration</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-turquoise-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-600">Audience-specific messaging</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="order-1 lg:order-1">
                <div className="relative">
                  <div className="absolute -inset-4 bg-turquoise-100 rounded-xl transform -rotate-3"></div>
                  <div className="relative bg-white p-6 shadow-lg rounded-xl">
                    {/* Interactive Content Preview */}
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                      {/* Article Header with Title */}
                      <div className="border-b border-gray-200 p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-turquoise-500 flex items-center justify-center text-white">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500">Blog Article</div>
                              <div className="text-xs font-medium">Last edited: Today</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="px-2 py-1 bg-green-100 rounded text-green-800 text-xs font-medium">
                              Optimized
                            </div>
                          </div>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                          10 Proven Digital Marketing Strategies for 2023
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <span className="px-2 py-0.5 bg-turquoise-100 rounded text-turquoise-800 text-xs">digital marketing</span>
                          <span className="px-2 py-0.5 bg-turquoise-100 rounded text-turquoise-800 text-xs">strategies</span>
                          <span className="px-2 py-0.5 bg-turquoise-100 rounded text-turquoise-800 text-xs">SEO</span>
                        </div>
                      </div>

                      {/* Article Content with Annotations */}
                      <div className="p-4 relative">
                        {/* Introduction with keyword highlight */}
                        <div className="mb-4 relative">
                          <div className="text-xs text-gray-500 mb-1 font-medium">Introduction</div>
                          <div className="w-full h-4 bg-gray-200 rounded mb-1.5"></div>
                          <div className="w-full h-4 bg-gray-200 rounded mb-1.5"></div>
                          <div className="w-4/5 h-4 bg-gray-200 rounded"></div>
                          
                          {/* Keyword highlight tooltip */}
                          <div className="absolute -right-2 top-6 transform translate-x-full">
                            <div className="bg-turquoise-100 text-turquoise-800 text-xs px-2 py-1 rounded shadow-sm whitespace-nowrap">
                              Primary keyword placement
                              <div className="absolute left-0 top-1/2 transform -translate-x-full -translate-y-1/2">
                                <svg className="h-5 w-5 text-turquoise-100" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* H2 Section with Structured Content */}
                        <div className="mb-4">
                          <div className="font-semibold text-gray-800 mb-2 border-l-4 border-turquoise-500 pl-2">
                            1. Content Marketing in 2023
                          </div>
                          <div className="w-full h-4 bg-gray-200 rounded mb-1.5"></div>
                          <div className="w-full h-4 bg-gray-200 rounded mb-1.5"></div>
                          <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                        </div>

                        {/* H2 Section with Structured Content */}
                        <div className="mb-4">
                          <div className="font-semibold text-gray-800 mb-2 border-l-4 border-turquoise-500 pl-2">
                            2. SEO Optimization Techniques
                          </div>
                          <div className="w-full h-4 bg-gray-200 rounded mb-1.5"></div>
                          <div className="w-full h-4 bg-gray-200 rounded mb-1.5"></div>
                          <div className="w-5/6 h-4 bg-gray-200 rounded"></div>
                        </div>

                        {/* Reader Engagement Annotations */}
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                          <div className="space-y-3">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-turquoise-50 border border-turquoise-200">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-turquoise-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            </div>
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-turquoise-50 border border-turquoise-200">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-turquoise-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Content Metrics */}
                      <div className="border-t border-gray-200 p-4">
                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <div className="text-xs text-gray-500 mb-1">Readability</div>
                            <div className="flex items-center">
                              <div className="font-medium text-turquoise-600 mr-1">A+</div>
                              <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-turquoise-500 h-full rounded-full" style={{ width: '90%' }}></div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 mb-1">SEO Score</div>
                            <div className="flex items-center">
                              <div className="font-medium text-turquoise-600 mr-1">95%</div>
                              <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-turquoise-500 h-full rounded-full" style={{ width: '95%' }}></div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 mb-1">Engagement</div>
                            <div className="flex items-center">
                              <div className="font-medium text-turquoise-600 mr-1">High</div>
                              <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-turquoise-500 h-full rounded-full" style={{ width: '85%' }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}