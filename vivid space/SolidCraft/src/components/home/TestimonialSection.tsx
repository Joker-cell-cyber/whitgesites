"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

const testimonials = [
  {
    quote: "SolidCraft has transformed how I build landing pages for my affiliate campaigns. I went from a 3% to a 14% conversion rate in just two weeks!",
    author: "Michael Turner",
    position: "Affiliate Marketer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    quote: "The templates are not only beautiful but actually convert. I've tried other builders before, but nothing comes close to SolidCraft's performance.",
    author: "Sophia Chen",
    position: "Digital Marketing Consultant",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    quote: "As someone with zero design skills, SolidCraft has been a game-changer. I can now launch professional landing pages that actually convert in minutes.",
    author: "James Wilson",
    position: "E-commerce Entrepreneur",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  }
];

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoplay = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
  };

  const stopAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  const handleDotClick = (index: number) => {
    stopAutoplay();
    setCurrentIndex(index);
    startAutoplay();
  };

  const handlePrevious = () => {
    stopAutoplay();
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
    startAutoplay();
  };

  const handleNext = () => {
    stopAutoplay();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    startAutoplay();
  };

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-[#f7f3ed] relative overflow-hidden" id="testimonials">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#c35a38]/5 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#0d7682]/5 rounded-full transform -translate-x-1/3 translate-y-1/3"></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block text-[#c35a38] font-medium text-sm px-3 py-1 bg-[#c35a38]/10 rounded-full mb-4"
          >
            Success Stories
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#3b332b] font-fraunces"
          >
            Thousands of affiliate marketers rely on SolidCraft to build high-converting landing pages
          </motion.h2>
        </div>

        <div className="max-w-5xl mx-auto relative">
          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className={`transition-opacity duration-500 ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0 absolute top-0 left-0 right-0'
                }`}
              >
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: index === currentIndex ? 1 : 0, y: index === currentIndex ? 0 : 20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-2xl p-8 md:p-10 shadow-xl border border-[#c35a38]/5"
                >
                  {/* Quote icon */}
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-[#c35a38]/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <svg className="w-6 h-6 md:w-8 md:h-8 text-[#c35a38]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  
                  <blockquote className="text-center">
                    <p className="text-xl md:text-2xl text-[#3b332b] mb-8 font-medium leading-relaxed">
                      {testimonial.quote}
                    </p>
                    <footer className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-[#c35a38]/20">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.author}
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-[#3b332b]">{testimonial.author}</p>
                        <p className="text-[#3b332b]/70">{testimonial.position}</p>
                      </div>
                    </footer>
                  </blockquote>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Navigation arrows */}
          <div className="flex justify-between absolute top-1/2 left-0 right-0 transform -translate-y-1/2 pointer-events-none">
            <button 
              onClick={handlePrevious}
              className="pointer-events-auto bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center text-[#3b332b] transition-all duration-300 hover:bg-[#c35a38] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#c35a38] -translate-x-1/2"
              aria-label="Previous testimonial"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={handleNext}
              className="pointer-events-auto bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center text-[#3b332b] transition-all duration-300 hover:bg-[#c35a38] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#c35a38] translate-x-1/2"
              aria-label="Next testimonial"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Dots indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-[#c35a38] w-6'
                    : 'bg-[#c35a38]/30 hover:bg-[#c35a38]/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 