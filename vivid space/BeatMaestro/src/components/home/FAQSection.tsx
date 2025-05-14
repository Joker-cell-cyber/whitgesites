"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function FAQSection() {
  const faqs = [
    {
      question: "How do the music coaching sessions work?",
      answer: "Our coaching sessions are customized: you first choose a package that suits your needs. Then, we schedule an initial call to discuss your specific goals. Your coach will guide you with exercises and techniques adapted to your level. After each session, you receive practical exercises and personalized feedback to help you progress effectively."
    },
    {
      question: "Which music production software do you use for teaching?",
      answer: "We cover all major DAWs (Digital Audio Workstations) on the market, including Ableton Live, FL Studio, Logic Pro, and Pro Tools. We adapt our teaching to the software you're already using. If you're a beginner and haven't chosen a DAW yet, we'll recommend one that best matches your music style and goals."
    },
    {
      question: "How many sessions are needed to see progress?",
      answer: "The number of sessions varies depending on your starting level and goals. For beginners, a package of 8-10 sessions typically provides a solid foundation. For specific skill enhancement, 4-6 sessions may be sufficient. Our packages are flexible and can be adjusted based on your progress. Regular practice between sessions is also crucial for significant improvement."
    },
    {
      question: "What's the typical time between coaching sessions?",
      answer: "For optimal learning, we recommend weekly sessions, allowing sufficient time to practice the concepts covered. For intensive projects, bi-weekly sessions are possible. For lighter coaching, sessions can be spaced two weeks apart. We adapt to your schedule and learning pace."
    },
    {
      question: "Do you provide samples and presets for the courses?",
      answer: "Yes, all our packages include access to a library of royalty-free samples and presets. Premium and Ultra packages also include exclusive packs tailored to your music style. We'll also teach you how to create your own sounds and develop your unique sonic signature."
    },
    {
      question: "Do you offer specific sessions for mastering?",
      answer: "Absolutely, we offer specialized sessions in audio mastering. Since mastering is an advanced skill, we recommend having good foundations in mixing first. Our mastering courses cover professional techniques, specific tools, and optimization for different streaming platforms and physical media."
    },
    {
      question: "What happens if I'm not satisfied with a session?",
      answer: "Your satisfaction is our priority. If a session doesn't meet your expectations, we offer a free complementary session to address points that weren't sufficiently covered. If you feel the teaching approach doesn't suit you, we can offer another coach or a partial refund depending on the circumstances."
    },
    {
      question: "How do remote sessions work?",
      answer: "Remote sessions take place via Zoom or Discord with screen sharing and high-quality audio. We use tools like Audiomovers to ensure lossless audio transmission. You'll need a stable internet connection, quality headphones, and your DAW installed. Each session is recorded and sent to you afterward so you can review it."
    }
  ];

  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <section className="py-24 bg-gradient-to-r from-[#070d15] to-[#0d1018]" id="faq">
      <div className="container mx-auto px-4">
        <div className="relative z-10">
          {/* Large decorative "FAQ" background text */}
          <div className="absolute -top-10 left-0 w-full overflow-hidden pointer-events-none opacity-5 select-none">
            <div className="text-[20rem] font-black tracking-tighter text-white">
              FAQ
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-20 items-start relative">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:sticky lg:top-20"
            >
              <div className="max-w-md">
                <div className="inline-flex items-center p-1 px-3 rounded-full bg-beat-gold-500/10 border border-beat-gold-500/20 text-beat-gold-400 text-sm font-medium mb-4">
                  Got Questions?
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  Frequently Asked <span className="block mt-2 text-beat-gold-500">Questions</span>
                </h2>
                <p className="text-gray-400 text-lg mb-8">
                  Everything you need to know about our music coaching services
                </p>
                
                <a 
                  href="/contact" 
                  className="inline-flex items-center px-6 py-3 rounded-full bg-beat-purple-500 hover:bg-beat-purple-600 text-white transition-colors duration-200 shadow-lg shadow-beat-purple-500/20"
                >
                  <span>Contact us for more</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </motion.div>
            
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className={`bg-gradient-to-r ${index % 2 === 0 ? 'from-beat-purple-900/20 to-black/20' : 'from-beat-gold-900/20 to-black/20'} backdrop-blur-sm border ${index % 2 === 0 ? 'border-beat-purple-500/10' : 'border-beat-gold-500/10'} rounded-xl overflow-hidden transition-all duration-300`}
                  >
                    <button
                      onClick={() => toggleQuestion(index)}
                      className="flex justify-between items-center w-full p-6 text-left focus:outline-none"
                    >
                      <h3 className="text-xl font-semibold text-white pr-8">{faq.question}</h3>
                      <div className={`flex-shrink-0 h-8 w-8 rounded-full ${index % 2 === 0 ? 'bg-beat-purple-500/20 text-beat-purple-400' : 'bg-beat-gold-500/20 text-beat-gold-400'} flex items-center justify-center transition-transform duration-300 ${openQuestion === index ? 'rotate-45' : ''}`}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                    </button>
                    
                    <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openQuestion === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="p-6 pt-0 text-gray-400">
                        <div className={`w-full h-px ${index % 2 === 0 ? 'bg-beat-purple-500/20' : 'bg-beat-gold-500/20'} mb-6`}></div>
                        {faq.answer}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-12 flex justify-center lg:justify-start"
              >
                <p className="text-gray-400 text-center lg:text-left">
                  Still have questions? <a href="/contact" className="text-beat-gold-400 hover:text-beat-gold-300 transition-colors font-medium">Contact our support team</a>
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 