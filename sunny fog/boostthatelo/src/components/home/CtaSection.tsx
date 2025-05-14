"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="py-20 relative overflow-hidden" id="cta">
      {/* Gaming-themed background elements */}
      <div className="absolute inset-0 z-0">
        {/* Circuit patterns and game-inspired elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/5 via-transparent to-purple-900/5"></div>
        
        {/* Animated particles */}
        <div className="absolute top-20 left-[20%] w-2 h-2 bg-blue-500 rounded-full animate-float-particle"></div>
        <div className="absolute top-40 right-[30%] w-1 h-1 bg-purple-500 rounded-full animate-float-particle-delay"></div>
        <div className="absolute bottom-20 left-[50%] w-2 h-2 bg-cyan-500 rounded-full animate-float-particle-slow"></div>
        
        {/* Large translucent shapes */}
        <div className="absolute right-[10%] top-[10%] w-64 h-64 border border-blue-500/10 rotate-45 opacity-20"></div>
        <div className="absolute left-[5%] bottom-[20%] w-32 h-32 border border-purple-500/10 rotate-12 opacity-20"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0D0D14] via-[#131628] to-[#0D0D14] border border-blue-500/20 shadow-2xl shadow-blue-500/5">
          {/* Rank-up graphics */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/rank-pattern.svg')] bg-repeat opacity-5"></div>
          </div>
          
          {/* Main content */}
          <div className="py-16 px-6 md:py-20 md:px-10 relative">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-blue-900/30 text-blue-300 backdrop-blur-sm border border-blue-500/20 mb-6">
                    <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse mr-2"></span>
                    Limited Time Offer
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                    Ready to <span className="gradient-text">Dominate</span> the Competition?
                </h2>
                  
                  <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                    Join thousands of satisfied players who have reached their desired ranks with our premium boosting services. Get 15% off your first boost today!
                </p>
                
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/pricing"
                      className="px-8 py-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium text-lg shadow-lg shadow-blue-700/10 hover:shadow-blue-700/20 transition-all hover:-translate-y-1"
                    >
                      View Pricing Plans
                    </Link>
                    <Link
                      href="/contact"
                      className="px-8 py-4 rounded-lg border border-blue-500/30 text-white hover:bg-blue-900/10 transition-colors font-medium text-lg"
                    >
                      Contact a Booster
                    </Link>
                  </div>
                  
                  {/* Trust badges */}
                  <div className="mt-10 flex flex-wrap items-center gap-6">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span className="text-gray-300">Secure Boosting</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-300">Fast Delivery</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      <span className="text-gray-300">Money-Back Guarantee</span>
                    </div>
                  </div>
                </motion.div>
                
                {/* Rank-up illustration */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="hidden lg:block"
                >
                  <div className="relative">
                    {/* Gamer rank progress visualization */}
                    <div className="absolute -right-8 -top-8 z-20">
                      <div className="bg-blue-900/60 backdrop-blur-md rounded-lg p-4 border border-blue-500/40 shadow-lg shadow-blue-500/10 rotate-3 animate-float-slow">
                        <div className="text-xs uppercase tracking-wider text-blue-300 font-bold mb-2">SKILL PROGRESS</div>
                        <div className="w-48 h-3 bg-gray-800 rounded-full overflow-hidden">
                          <div className="h-full w-[85%] bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 rounded-full animate-pulse-slow"></div>
                        </div>
                        <div className="text-right text-xs text-blue-300 mt-1 font-medium">85%</div>
                      </div>
                        </div>
                        
                    <div className="rounded-2xl overflow-hidden border-2 border-indigo-600/30 shadow-xl shadow-indigo-500/10 relative">
                      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 to-transparent z-10"></div>
                      
                      {/* Gaming Rank Illustration (pure CSS/HTML) */}
                      <div className="w-full h-80 bg-gradient-to-b from-[#0A0A1A] to-[#161640] relative p-6 overflow-hidden">
                        {/* Background esport arena */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_70%)]"></div>
                        
                        {/* Geometric patterns inspired by esport arenas */}
                        <div className="absolute inset-0 overflow-hidden">
                          <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-blue-900/20 to-transparent"></div>
                          <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-purple-900/20 to-transparent"></div>
                          <div className="absolute top-[40%] left-[20%] w-[60%] h-[1px] bg-blue-500/30"></div>
                          <div className="absolute top-[60%] left-[10%] w-[80%] h-[1px] bg-purple-500/30"></div>
                        </div>
                        
                        {/* Tournament bracket visualization */}
                        <div className="absolute left-1 top-1 h-16 w-48">
                          <div className="text-xs uppercase tracking-wider text-blue-300 font-bold mb-2 px-1">TOURNAMENT PROGRESS</div>
                          <div className="flex justify-between items-center">
                            <div className="flex flex-col items-center">
                              <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/40">
                                <span className="font-bold text-[8px]">1</span>
                              </div>
                              <div className="h-[2px] w-10 bg-blue-500/40 mt-2"></div>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/40">
                                <span className="font-bold text-[8px]">2</span>
                              </div>
                              <div className="h-[2px] w-10 bg-blue-500/40 mt-2"></div>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/40">
                                <span className="font-bold text-[8px]">3</span>
                              </div>
                              <div className="h-[2px] w-10 bg-blue-500/40 mt-2"></div>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="w-8 h-8 rounded-full bg-yellow-500/40 text-yellow-300 flex items-center justify-center border border-yellow-500/60 animate-pulse-slow">
                                <span className="font-bold text-[8px]">WIN</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Victory podium */}
                        <div className="absolute left-6 bottom-2 w-[calc(100%-3rem)] h-32">
                          {/* 3rd place */}
                          <div className="absolute left-2 bottom-0 w-16 h-14 flex flex-col items-center">
                            <div className="w-14 h-14 bg-gradient-to-b from-[#A77C3D] to-[#815A28] rounded-t-md relative">
                              <span className="absolute top-1 left-1/2 transform -translate-x-1/2 text-white font-bold text-xs">3</span>
                              <div className="absolute bottom-0 left-0 w-full">
                                <div className="w-6 h-10 bg-gray-700/40 rounded-md mx-auto -mb-6 flex items-center justify-center">
                                  <div className="w-4 h-4 rounded-full bg-gray-600/70"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* 2nd place */}
                          <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 w-16 h-18 flex flex-col items-center">
                            <div className="w-14 h-18 bg-gradient-to-b from-[#C0C0C0] to-[#A7A7A7] rounded-t-md relative">
                              <span className="absolute top-1 left-1/2 transform -translate-x-1/2 text-white font-bold text-xs">2</span>
                              <div className="absolute bottom-0 left-0 w-full">
                                <div className="w-6 h-10 bg-gray-700/40 rounded-md mx-auto -mb-6 flex items-center justify-center">
                                  <div className="w-4 h-4 rounded-full bg-gray-600/70"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* 1st place - YOU with trophy */}
                          <div className="absolute right-8 bottom-0 w-20 h-24 flex flex-col items-center">
                            <div className="absolute top-0 w-full flex justify-center -mt-20">
                              <div className="w-16 h-16 relative">
                                {/* Trophy */}
                                <div className="absolute w-full h-full flex flex-col items-center animate-float-slow">
                                  <div className="w-8 h-8 bg-yellow-500 rounded-full relative overflow-hidden">
                                    <div className="absolute inset-1 bg-yellow-300 rounded-full"></div>
                                    <div className="absolute w-12 h-1 bg-yellow-600 top-3.5 left-1/2 transform -translate-x-1/2 rotate-45"></div>
                                    <div className="absolute w-12 h-1 bg-yellow-600 top-3.5 left-1/2 transform -translate-x-1/2 -rotate-45"></div>
                                  </div>
                                  <div className="w-3 h-5 bg-yellow-500 -mt-1"></div>
                                  <div className="w-7 h-1 bg-yellow-600 rounded-full"></div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="w-18 h-24 bg-gradient-to-b from-[#FFD700] to-[#E5A100] rounded-t-md relative">
                              <span className="absolute top-1 left-1/2 transform -translate-x-1/2 text-white font-bold text-lg">1</span>
                              
                              {/* Victory shine effects */}
                              <div className="absolute -top-4 left-1/2 w-0.5 h-12 bg-yellow-400 transform -translate-x-1/2 opacity-60 animate-pulse-slow"></div>
                              <div className="absolute -top-4 left-1/2 w-0.5 h-12 bg-yellow-400 transform -translate-x-1/2 rotate-30 opacity-60 animate-pulse-slow" style={{ animationDelay: '0.2s' }}></div>
                              <div className="absolute -top-4 left-1/2 w-0.5 h-12 bg-yellow-400 transform -translate-x-1/2 -rotate-30 opacity-60 animate-pulse-slow" style={{ animationDelay: '0.4s' }}></div>
                              
                              <div className="absolute top-8 w-full text-center">
                                <div className="text-xs font-bold text-white/80 uppercase bg-yellow-600/40 rounded-sm px-1 py-0.5 w-12 mx-auto">
                                  YOU
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Confetti effects */}
                          <div className="absolute -top-8 right-10 w-1 h-1 bg-red-500 animate-float-particle"></div>
                          <div className="absolute top-0 right-16 w-1.5 h-1.5 bg-yellow-500 animate-float-particle-delay"></div>
                          <div className="absolute top-4 right-6 w-1 h-1 bg-blue-500 animate-float-particle-slow"></div>
                          <div className="absolute top-2 right-20 w-1 h-1 bg-green-500 animate-float-particle"></div>
                          <div className="absolute top-10 right-8 w-1.5 h-1.5 bg-purple-500 animate-float-particle-delay"></div>
                        </div>
                        
                        {/* Player rank card */}
                        <div className="absolute top-6 right-6 w-60 h-16 bg-gradient-to-r from-blue-900/60 to-indigo-900/60 backdrop-blur-sm rounded-lg border border-blue-500/30 overflow-hidden">
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-purple-500 to-indigo-600"></div>
                          
                          <div className="p-2 flex items-center h-full">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-600/40 to-purple-600/40 border border-indigo-500/30 flex items-center justify-center relative">
                              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                <svg className="w-5 h-5 text-indigo-300" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1zm-5 8.274l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L5 10.274zm10 0l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L15 10.274z" clipRule="evenodd" />
                                </svg>
                              </div>
                            </div>
                            
                            <div className="ml-3 text-left flex-1">
                              <div className="flex justify-between items-center">
                                <div className="text-sm font-bold text-white">CHAMPION RANK</div>
                                <div className="text-xs text-indigo-300">+1500 LP</div>
                              </div>
                              <div className="mt-1 w-full h-1.5 bg-gray-800/50 rounded-full overflow-hidden">
                                <div className="h-full w-[90%] bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500"></div>
                              </div>
                              <div className="mt-1 text-xs text-gray-400 flex justify-between">
                                <span>ELO: 2450</span>
                                <span>Top 0.1%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Match stats */}
                        <div className="absolute left-6 top-24 p-2 bg-blue-900/30 backdrop-blur-sm rounded-lg border border-blue-500/20 w-44">
                          <div className="text-xs uppercase tracking-wider text-blue-300 font-bold mb-2">LAST 10 MATCHES</div>
                          <div className="flex gap-1.5">
                            {['W', 'W', 'W', 'L', 'W', 'W', 'W', 'W', 'L', 'W'].map((result, index) => (
                              <div 
                                key={index} 
                                className={`w-3 h-3 rounded-sm flex items-center justify-center text-[8px] font-bold ${
                                  result === 'W' ? 'bg-green-500/50 text-green-200' : 'bg-red-500/50 text-red-200'
                                }`}
                              >
                                {result}
                              </div>
                            ))}
                          </div>
                          <div className="mt-2 text-xs font-medium text-blue-200">Win Rate: <span className="text-green-400">80%</span></div>
                        </div>
                      </div>
                      
                      {/* Overlay gaming elements */}
                      <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full z-20 flex items-center">
                        <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse mr-2"></div>
                        <span className="text-white text-xs font-medium">CHAMPION STATUS</span>
                      </div>
                    </div>
                    
                    {/* Achievement unlock */}
                    <div className="absolute -left-8 -bottom-8 z-20">
                      <div className="bg-purple-900/60 backdrop-blur-md rounded-lg p-4 border border-purple-500/40 shadow-lg shadow-purple-500/10 -rotate-3 animate-float-medium">
                        <div className="flex items-center gap-3">
                          <div className="bg-gradient-to-br from-amber-400 to-amber-600 w-12 h-12 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zm7-10a1 1 0 01.707.293l.707.707L15.414 2a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-2-2A1 1 0 0115 4l.707.707 1.414 1.414zM10 7a3 3 0 100 6 3 3 0 000-6z" clipRule="evenodd" />
                            </svg>
                          </div>
                        <div>
                            <div className="text-xs text-amber-300 uppercase tracking-wider font-bold">ACHIEVEMENT UNLOCKED</div>
                            <div className="text-white font-bold text-lg">Master Tier Reached!</div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 