"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Container } from "../components/ui/Container";
import { motion } from "framer-motion";
import Link from "next/link";

// Définir les catégories pour filtrer les plans
const categories = [
  { id: "all", name: "All Plans" },
  { id: "basic", name: "Basic" },
  { id: "standard", name: "Standard" },
  { id: "premium", name: "Premium" },
];

// Ajouter les catégories aux plans
const pricingPlansWithCategories = [
  {
    title: "Starter Plan",
    description: "Perfect for small businesses or startups. Includes basic website setup, theme customization, and more.",
    features: [
      "Basic website setup",
      "Theme customization",
      "Up to 2 pages",
      "Basic SEO setup"
    ],
    price: "9.99",
    priceValue: 9.99,
    icon: "🚀",
    popular: false,
    category: "basic"
  },
  {
    title: "Basic Plan",
    description: "Designed for growing businesses. Includes custom website design, e-commerce setup, and more.",
    features: [
      "Custom website design",
      "Responsive layout",
      "Up to 4 pages",
      "Standard SEO optimization",
      "E-commerce setup"
    ],
    price: "19.50",
    priceValue: 19.50,
    icon: "💻",
    popular: false,
    category: "basic"
  },
  {
    title: "Pro Plan",
    description: "Ideal for businesses needing advanced development and integrations. Includes custom API development, performance optimization, and more.",
    features: [
      "Advanced website development",
      "Custom API development",
      "E-commerce integration",
      "Up to 6 pages",
      "Performance optimization"
    ],
    price: "29.90",
    priceValue: 29.90,
    icon: "⚙️",
    popular: true,
    category: "standard"
  },
  {
    title: "Advanced Plan",
    description: "A step-up for businesses seeking enhanced features and performance.",
    features: [
      "Custom theme enhancements",
      "Advanced SEO strategies",
      "E-commerce performance optimization",
      "Up to 7 pages",
      "Improved website loading speeds"
    ],
    price: "39.99",
    priceValue: 39.99,
    icon: "🔍",
    popular: false,
    category: "standard"
  },
  {
    title: "Professional Plus Plan",
    description: "Designed for businesses requiring professional-grade features and seamless integrations.",
    features: [
      "Enhanced custom design elements",
      "Mobile-first optimization",
      "Advanced e-commerce tracking",
      "Up to 8 pages",
      "Custom API integration"
    ],
    price: "49.90",
    priceValue: 49.90,
    icon: "📱",
    popular: false,
    category: "standard"
  },
  {
    title: "Premium Plan",
    description: "For businesses seeking tailored solutions and high performance. Includes custom web application development, database optimization, and more.",
    features: [
      "Custom web application development",
      "Scalable architecture",
      "Up to 9 pages",
      "Advanced SEO and performance optimization",
      "Database design and optimization",
      "Security enhancements"
    ],
    price: "59.50",
    priceValue: 59.50,
    icon: "✨",
    popular: true,
    category: "premium"
  },
  {
    title: "Enterprise Plan",
    description: "Comprehensive package for large enterprises. Includes full-stack development, multi-language support, and more.",
    features: [
      "Full-stack development",
      "Multi-language support",
      "Up to 10 pages",
      "Custom CMS development",
      "Continuous integration/continuous deployment (CI/CD)",
      "Comprehensive analytics integration"
    ],
    price: "69.99",
    priceValue: 69.99,
    icon: "🏢",
    popular: false,
    category: "premium"
  },
  {
    title: "Elite Plan",
    description: "Tailored for businesses requiring scalable and future-ready solutions.",
    features: [
      "Custom web application design",
      "Scalable server architecture",
      "Enhanced security protocols",
      "Up to 11 pages",
      "Advanced e-commerce analytics"
    ],
    price: "79.90",
    priceValue: 79.90,
    icon: "🛡️",
    popular: false,
    category: "premium"
  },
  {
    title: "Ultimate Plan",
    description: "For businesses looking to implement cutting-edge technologies. Includes PWA development, AI integration, and more.",
    features: [
      "Progressive Web App (PWA) development",
      "AI and machine learning integration",
      "Up to 12 pages",
      "Cloud hosting setup and management",
      "Advanced security features",
      "Detailed analytics and custom reports"
    ],
    price: "89.50",
    priceValue: 89.50,
    icon: "🤖",
    popular: true,
    category: "premium"
  },
  {
    title: "Executive Plan",
    description: "The ultimate package for businesses leveraging the latest innovations.",
    features: [
      "AI-driven user analytics",
      "Blockchain integration for secure transactions",
      "Continuous cloud hosting management",
      "Up to 13 pages",
      "Advanced security protocols"
    ],
    price: "99.99",
    priceValue: 99.99,
    icon: "💎",
    popular: false,
    category: "premium"
  },
  {
    title: "VIP Plan",
    description: "Top-of-the-line package for enterprises needing ongoing, hands-on support. Includes dedicated development team, continuous support, and more.",
    features: [
      "End-to-end custom solutions",
      "Dedicated development team",
      "Up to 15 pages",
      "Continuous support and maintenance",
      "Priority response and resolution",
      "Regular updates and feature enhancements"
    ],
    price: "109.90",
    priceValue: 109.90,
    icon: "👑",
    popular: false,
    category: "premium"
  },
  {
    title: "Premium Plus Plan",
    description: "Ultimate experience with premium service and exclusive features.",
    features: [
      "Enterprise-grade infrastructure",
      "24/7 dedicated support",
      "Unlimited pages",
      "Custom AI-powered features",
      "Advanced security audits",
      "Premium performance optimization"
    ],
    price: "119.50",
    priceValue: 119.50,
    icon: "⚡",
    popular: false,
    category: "premium"
  }
];

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 120]);
  const [sortOption, setSortOption] = useState("default");
  const [filteredPlans, setFilteredPlans] = useState(pricingPlansWithCategories);

  // Filtrer et trier les plans en fonction des sélections
  useEffect(() => {
    let filtered = [...pricingPlansWithCategories];
    
    // Filtrer par catégorie
    if (selectedCategory !== "all") {
      filtered = filtered.filter(plan => plan.category === selectedCategory);
    }
    
    // Filtrer par fourchette de prix
    filtered = filtered.filter(
      plan => plan.priceValue >= priceRange[0] && plan.priceValue <= priceRange[1]
    );
    
    // Trier les plans
    if (sortOption === "price-asc") {
      filtered.sort((a, b) => a.priceValue - b.priceValue);
    } else if (sortOption === "price-desc") {
      filtered.sort((a, b) => b.priceValue - a.priceValue);
    } else if (sortOption === "name-asc") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "name-desc") {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    }
    
    setFilteredPlans(filtered);
  }, [selectedCategory, priceRange, sortOption]);

  return (
    <>
      <Navbar />
      <main className="pt-28 bg-zinc-950">
        {/* Decorative elements */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px] transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-pink-900/10 rounded-full blur-[120px] transform -translate-x-1/2 translate-y-1/2" />
        </div>
        
        <section className="py-16 bg-gradient-to-b from-zinc-950 to-black relative z-10">
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-block px-4 py-1 mb-4 bg-gradient-to-r from-purple-600/20 to-pink-500/20 text-purple-300 border border-purple-500/20 rounded-full text-sm font-medium">
                Transparent Pricing
              </div>
              <motion.h1
                className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Pricing Plans
              </motion.h1>
              <motion.p
                className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Choose the Plan That&apos;s Right for You
              </motion.p>
            </div>

            {/* Filtres et options de tri */}
            <div className="mb-10 p-6 bg-zinc-900/60 rounded-xl border border-zinc-800">
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                {/* Filtres par catégorie */}
                <div className="flex-1">
                  <h3 className="text-white font-medium mb-3">Category</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                          selectedCategory === category.id
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                            : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filtre par prix */}
                <div className="flex-1">
                  <h3 className="text-white font-medium mb-3">Price Range</h3>
                  <div className="px-2">
                    <div className="relative pt-1">
                      <div className="flex justify-between mb-2">
                        <span className="text-xs text-zinc-400">${priceRange[0]}</span>
                        <span className="text-xs text-zinc-400">${priceRange[1]}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="120"
                        step="10"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Options de tri */}
                <div className="flex-1">
                  <h3 className="text-white font-medium mb-3">Sort By</h3>
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="w-full px-4 py-2 bg-zinc-800 text-zinc-300 rounded-lg border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="default">Default</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name-asc">Name: A to Z</option>
                    <option value="name-desc">Name: Z to A</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-zinc-400 text-sm">
                  Showing {filteredPlans.length} of {pricingPlansWithCategories.length} plans
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setPriceRange([0, 120]);
                    setSortOption("default");
                  }}
                  className="text-purple-400 hover:text-purple-300 text-sm"
                >
                  Reset Filters
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 mb-12">
              {filteredPlans.map((plan, index) => (
                <motion.div
                  key={plan.title}
                  className={`bg-zinc-900/50 backdrop-blur-sm border ${plan.popular ? 'border-purple-500/50' : 'border-zinc-800'} hover:border-purple-500/70 rounded-xl overflow-hidden transition-all duration-300 relative ${plan.popular ? 'ring-2 ring-purple-500/20' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                        MOST POPULAR
                      </div>
                    </div>
                  )}
                  
                  <div className="p-6 md:p-8 flex flex-col h-full">
                    <div className="mb-8">
                      <div className={`w-12 h-12 rounded-lg ${plan.popular ? 'bg-gradient-to-br from-purple-600/30 to-pink-600/30' : 'bg-zinc-800/70'} flex items-center justify-center mb-4`}>
                        <span className="text-2xl text-white">{plan.icon}</span>
                      </div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold text-white mb-3">{plan.title}</h3>
                        <span className="text-xs px-2 py-1 bg-zinc-800 rounded-full text-zinc-400">
                          {plan.category.charAt(0).toUpperCase() + plan.category.slice(1)}
                        </span>
                      </div>
                      <p className="text-zinc-400 text-sm">{plan.description}</p>
                    </div>
                    
                    <div className="mb-6">
                      <div className="text-3xl font-bold text-white mb-2">${plan.price}</div>
                      <div className="text-zinc-500 text-sm"></div>
                    </div>
                    
                    <div className="border-t border-zinc-800 my-6"></div>
                    
                    <ul className="space-y-3 mb-8 flex-grow">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="text-zinc-300 flex items-start text-sm">
                          <span className="text-purple-500 mr-2 mt-0.5">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <button className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                        : 'bg-zinc-800 text-white hover:bg-zinc-700'
                    }`}>
                      <Link 
                        href={`/checkout?plan=${plan.title.toLowerCase().replace(/\s+/g, '-')}&name=${encodeURIComponent(plan.title)}&price=${plan.price}&description=${encodeURIComponent(plan.description)}`}
                        className="w-full h-full flex items-center justify-center"
                      >
                        Buy Now
                      </Link>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="max-w-3xl mx-auto mt-20 text-center">
              <div className="p-8 bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm rounded-2xl border border-purple-500/20">
                <h3 className="text-2xl font-bold text-white mb-4">Need a Custom Solution?</h3>
                <p className="text-zinc-400 mb-6">
                  Contact us to discuss your specific requirements and get a personalized quote
                </p>
                <Link href="/services#pricing">
                  <motion.button
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View pricing options
                  </motion.button>
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
} 