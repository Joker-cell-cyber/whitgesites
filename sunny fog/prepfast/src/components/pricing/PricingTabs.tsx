"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type VideoCategory = "short" | "long" | "advertising";

export default function PricingTabs() {
  const [selectedCategory, setSelectedCategory] = useState<VideoCategory>("short");

  // Define pricing tiers with more detailed information
  const pricingCategories = {
    short: [
      {
        name: "Basic Short",
        price: 9.99,
        duration: "Up to 30 sec",
        complexity: "Basic",
        description: "Simple edits, perfect for beginners on social media",
        features: [
          "Basic cuts and transitions",
          "Text overlays",
          "Background music",
          "1 revision round"
        ],
        notIncluded: [
          "Motion graphics",
          "Sound effects",
          "Color grading",
          "Stock footage"
        ],
        delivery: "48 hours",
        idealFor: "Social media beginners, simple content creators"
      },
      {
        name: "Standard Short",
        price: 19.50,
        duration: "Up to 30 sec",
        complexity: "Standard",
        description: "Enhanced edits with effects for better engagement",
        features: [
          "Dynamic transitions",
          "Basic motion graphics",
          "Sound effects",
          "2 revision rounds",
          "Social media aspect ratios",
          "Basic color correction"
        ],
        notIncluded: [
          "Advanced motion graphics",
          "Advanced color grading",
          "Custom animations",
          "Stock footage"
        ],
        delivery: "48 hours",
        popular: true,
        idealFor: "Content creators, small businesses, influencers"
      },
      {
        name: "Premium Short",
        price: 29.90,
        duration: "Up to 45 sec",
        complexity: "Advanced",
        description: "Professional edits with advanced effects",
        features: [
          "Premium effects & transitions",
          "Advanced motion graphics",
          "Audio mixing & enhancement",
          "3 revision rounds",
          "Custom text animations",
          "Color grading",
          "Music & sound design"
        ],
        notIncluded: [
          "Complex visual effects",
          "3D animations",
          "Unlimited revisions",
          "Stock footage"
        ],
        delivery: "72 hours",
        idealFor: "Brands, professional influencers, marketing teams"
      },
      {
        name: "Enhanced Short",
        price: 39.99,
        duration: "Up to 60 sec",
        complexity: "Advanced+",
        description: "Professional short videos with premium features",
        features: [
          "Premium effects & transitions",
          "Advanced motion graphics",
          "Complete audio enhancement",
          "3 revision rounds",
          "Custom text animations",
          "Professional color grading",
          "Music & sound design",
          "1 stock footage clip included"
        ],
        notIncluded: [
          "Complex visual effects",
          "3D animations",
          "Unlimited revisions"
        ],
        delivery: "72 hours",
        idealFor: "Professional content creators, brand campaigns"
      },
      {
        name: "Ultra Short",
        price: 49.90,
        duration: "Up to 60 sec",
        complexity: "Complex",
        description: "Highest quality short-form content that stands out",
        features: [
          "Custom visual effects",
          "Advanced color grading",
          "Professional sound design",
          "Unlimited revisions",
          "Custom animations",
          "3 stock footage clips included",
          "Multiple aspect ratios",
          "Detailed project consultation",
          "VFX & motion tracking if needed"
        ],
        notIncluded: [
          "None - this is our most comprehensive package"
        ],
        delivery: "96 hours",
        idealFor: "Premium brands, professional content creators, advertising"
      }
    ],
    long: [
      {
        name: "Basic Long",
        price: 59.50,
        duration: "Up to 5 min",
        complexity: "Basic",
        description: "Simple long-form video editing for YouTube",
        features: [
          "Basic cuts and transitions",
          "Simple intro/outro",
          "Background music",
          "1 revision round",
          "Basic text overlays",
          "Minimal color correction"
        ],
        notIncluded: [
          "Motion graphics",
          "Sound effects",
          "Advanced color grading",
          "Stock footage",
          "B-roll integration"
        ],
        delivery: "4 days",
        idealFor: "YouTube beginners, simple instructional videos"
      },
      {
        name: "Standard Long",
        price: 69.99,
        duration: "Up to 10 min",
        complexity: "Standard",
        description: "Professional editing for engaging YouTube content",
        features: [
          "Dynamic transitions",
          "Branded intro/outro",
          "Sound design",
          "2 revision rounds",
          "Basic motion graphics",
          "Color correction",
          "Audio enhancement",
          "Basic lower thirds",
          "2 stock footage clips included"
        ],
        notIncluded: [
          "Advanced motion graphics",
          "Advanced color grading",
          "Custom animations",
          "Complex sound design"
        ],
        delivery: "5 days",
        popular: true,
        idealFor: "Regular YouTubers, businesses, educational content"
      },
      {
        name: "Enhanced Long",
        price: 79.90,
        duration: "Up to 12 min",
        complexity: "Advanced",
        description: "Enhanced editing for professional YouTube content",
        features: [
          "Professional transitions",
          "Custom intro/outro",
          "Enhanced sound design",
          "2 revision rounds",
          "Standard motion graphics",
          "Color correction",
          "Complete audio enhancement",
          "Animated lower thirds",
          "3 stock footage clips included"
        ],
        notIncluded: [
          "Complex 3D animations",
          "Extensive VFX",
          "Unlimited revisions"
        ],
        delivery: "6 days",
        idealFor: "Growing YouTubers, business presentations, educational series"
      },
      {
        name: "Premium Long",
        price: 99.99,
        duration: "Up to 15 min",
        complexity: "Advanced+",
        description: "High-quality editing for professional content creators",
        features: [
          "Advanced visual effects",
          "Color correction & grading",
          "Complete audio enhancement",
          "3 revision rounds",
          "Custom motion graphics",
          "Animated text & titles",
          "Professional sound design",
          "5 stock footage clips included",
          "Custom thumbnail design",
          "End screens & cards"
        ],
        notIncluded: [
          "Complex 3D animations",
          "Unlimited revisions",
          "Extensive VFX"
        ],
        delivery: "7 days",
        idealFor: "Professional YouTubers, corporate videos, documentaries"
      },
      {
        name: "Expert Long",
        price: 109.90,
        duration: "Up to 15 min",
        complexity: "Professional",
        description: "Expert-level editing for high-end content creators",
        features: [
          "Advanced visual effects",
          "Professional color grading",
          "Complete audio enhancement",
          "4 revision rounds",
          "Professional motion graphics",
          "Custom animated titles",
          "Professional sound design",
          "7 stock footage clips included",
          "Custom thumbnail design",
          "End screens & cards",
          "Audience retention optimization"
        ],
        notIncluded: [
          "Complex 3D animations",
          "Unlimited revisions"
        ],
        delivery: "8 days",
        idealFor: "Professional content creators, documentary filmmakers"
      },
      {
        name: "Ultra Long",
        price: 119.50,
        duration: "Up to 20 min",
        complexity: "Complex",
        description: "Cinematic editing for premium content",
        features: [
          "Cinematic style editing",
          "Advanced motion graphics",
          "Professional color grading",
          "Unlimited revisions",
          "Custom animations",
          "Full sound design",
          "10 stock footage clips included",
          "Detailed project consultation",
          "Multicam editing if needed",
          "Custom graphic elements",
          "Custom music selection",
          "Audience retention optimization"
        ],
        notIncluded: [
          "None - this is our most comprehensive package"
        ],
        delivery: "10 days",
        idealFor: "High-end YouTubers, premium documentaries, TV-quality productions"
      }
    ],
    advertising: [
      {
        name: "Basic Ad",
        price: 29.90,
        duration: "Up to 30 sec",
        complexity: "Basic",
        description: "Simple promotional videos for products/services",
        features: [
          "Clean, professional cuts",
          "Text overlays",
          "Background music",
          "1 revision round",
          "Basic color correction",
          "Logo integration",
          "Call-to-action"
        ],
        notIncluded: [
          "Advanced animations",
          "Custom motion graphics",
          "Professional voice-over",
          "Sound design",
          "Stock footage"
        ],
        delivery: "3 days",
        idealFor: "Small businesses, social media ads, simple product showcases"
      },
      {
        name: "Standard Ad",
        price: 49.90,
        duration: "Up to 45 sec",
        complexity: "Standard",
        description: "Engaging ads that convert viewers into customers",
        features: [
          "Animated logo",
          "Motion graphics elements",
          "Voice-over integration",
          "2 revision rounds",
          "Color grading",
          "Sound effects",
          "Custom text animations",
          "2 stock footage clips included",
          "Multiple social media formats"
        ],
        notIncluded: [
          "3D animations",
          "Advanced VFX",
          "Multiple versions",
          "Extensive scriptwriting"
        ],
        delivery: "4 days",
        popular: true,
        idealFor: "Growing businesses, product launches, social media campaigns"
      },
      {
        name: "Enhanced Ad",
        price: 59.50,
        duration: "Up to 60 sec",
        complexity: "Standard+",
        description: "Superior advertising content with enhanced features",
        features: [
          "Animated logo",
          "Advanced motion graphics",
          "Professional voice-over",
          "2 revision rounds",
          "Color grading",
          "Sound effects package",
          "Custom text animations",
          "3 stock footage clips included",
          "Multiple social media formats"
        ],
        notIncluded: [
          "3D animations",
          "Complex visual effects",
          "Multiple language versions"
        ],
        delivery: "5 days",
        idealFor: "Established businesses, product campaigns, social media advertising"
      },
      {
        name: "Professional Ad",
        price: 89.50,
        duration: "Up to 90 sec",
        complexity: "Advanced",
        description: "High-impact ads with professional production value",
        features: [
          "Storytelling structure",
          "Custom animations",
          "Professional sound design",
          "3 revision rounds",
          "Advanced motion graphics",
          "Professional color grading",
          "5 stock footage clips included",
          "Audience targeting optimization",
          "Multiple aspect ratios",
          "Engagement analytics recommendations"
        ],
        notIncluded: [
          "3D product animations",
          "Unlimited revisions",
          "Multiple language versions"
        ],
        delivery: "7 days",
        idealFor: "Established brands, product demonstrations, marketing campaigns"
      },
      {
        name: "Premium Ad",
        price: 119.50,
        duration: "Up to 2 min",
        complexity: "Complex",
        description: "Broadcast-quality commercial production",
        features: [
          "Cinematic production quality",
          "Advanced visual effects",
          "Complete sound design",
          "Unlimited revisions",
          "Custom 2D/3D animations",
          "Professional color grading",
          "10 stock footage clips included",
          "Detailed storyboarding",
          "Multiple delivery formats",
          "Two language versions",
          "A/B testing versions"
        ],
        notIncluded: [
          "None - this is our most comprehensive package"
        ],
        delivery: "10 days",
        idealFor: "Premium brands, TV commercials, major product launches"
      }
    ]
  };
  
  const activePricingPlans = pricingCategories[selectedCategory];

  return (
    <section className="py-20 relative overflow-hidden" id="pricing-tabs">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-vid-red-900/10 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-vid-red-600/5 to-vid-orange-500/5 rounded-full transform translate-x-1/4 translate-y-1/4 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="gradient-text">Pricing</span> Packages
            </h2>
            <p className="text-gray-400 text-lg">
              Choose the perfect package for your video editing needs with our transparent pricing model
            </p>
          </motion.div>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 bg-gray-800 rounded-lg">
            <button
              onClick={() => setSelectedCategory('short')}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
                selectedCategory === 'short'
                  ? 'bg-gradient-to-r from-vid-red-600 to-vid-orange-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Short-Form Content
            </button>
            <button
              onClick={() => setSelectedCategory('long')}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
                selectedCategory === 'long'
                  ? 'bg-gradient-to-r from-vid-red-600 to-vid-orange-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Long-Form Content
            </button>
            <button
              onClick={() => setSelectedCategory('advertising')}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
                selectedCategory === 'advertising'
                  ? 'bg-gradient-to-r from-vid-red-600 to-vid-orange-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Advertising Videos
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          key={selectedCategory} // This forces a re-render when category changes
        >
          {activePricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`card-hover rounded-xl overflow-hidden relative ${
                plan.popular ? 'border-vid-red-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-vid-red-600 to-vid-orange-500 text-white text-center text-xs py-1 font-medium">
                  MOST POPULAR
                </div>
              )}
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm px-2 py-0.5 rounded bg-gray-800 text-gray-300">
                        {plan.duration}
                      </span>
                      <span className="text-sm px-2 py-0.5 rounded bg-gray-800 text-gray-300">
                        {plan.complexity}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white">${plan.price.toFixed(2)}</div>
                    <div className="text-sm text-gray-400">one-time</div>
                  </div>
                </div>
                
                <p className="text-gray-400 text-sm mb-4">
                  {plan.description}
                </p>

                <div className="mb-4">
                  <div className="text-sm font-semibold text-gray-300 mb-1">Ideal for:</div>
                  <div className="text-gray-400 text-sm">{plan.idealFor}</div>
                </div>
                
                <div className="border-b border-gray-800 mb-4 pb-1">
                  <div className="text-sm font-semibold text-gray-300 mb-2">What&apos;s included:</div>
                  <ul className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="text-gray-400 text-sm flex items-start">
                        <svg className="h-5 w-5 text-vid-red-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-5">
                  <div className="text-sm font-semibold text-gray-300 mb-2">Not included:</div>
                  <ul className="space-y-2">
                    {plan.notIncluded.map((item, idx) => (
                      <li key={idx} className="text-gray-400 text-sm flex items-start">
                        <svg className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-400 mb-5">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-vid-red-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Delivery: {plan.delivery}</span>
                  </div>
                </div>
                
                <Link 
                  href={`/checkout?name=${encodeURIComponent(plan.name)}&price=${plan.price}&category=${encodeURIComponent(selectedCategory)}`}
                  className="w-full py-3 px-4 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 inline-block text-center"
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-6">
            Need a custom solution? Contact us for personalized video editing services.
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center text-vid-red-400 hover:text-vid-red-300 transition-colors"
          >
            <span>Get in touch</span>
            <svg className="ml-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
} 