"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

type Achievement = {
  title: string;
  year?: string;
};

type Specialization = {
  name: string;
  level: number; // 1-5 for skill level
};

type CoachProfileProps = {
  name: string;
  image: string;
  role: string;
  bio: string;
  achievements: Achievement[];
  specializations: Specialization[];
  yearsExperience: number;
  className?: string;
};

export default function CoachProfile({
  name,
  image,
  role,
  bio,
  achievements,
  specializations,
  yearsExperience,
  className = '',
}: CoachProfileProps) {
  return (
    <motion.div 
      className={`rounded-xl bg-felt-900 border border-felt-800/60 overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        boxShadow: '0 8px 30px rgba(10, 46, 54, 0.3)',
        translateY: -5, 
        transition: { duration: 0.2 } 
      }}
    >
      <div className="relative h-48 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-felt-800 to-felt-900 opacity-90"></div>
        <div className="absolute inset-0" style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }}></div>
        
        {/* Profile image */}
        <div className="absolute left-6 -bottom-16 z-10">
          <div className="w-32 h-32 rounded-xl overflow-hidden border-4 border-chip-gold-500 shadow-lg">
            <Image
              src={image}
              alt={name}
              width={128}
              height={128}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        
        {/* Experience badge */}
        <div className="absolute right-6 bottom-6 px-3 py-1 bg-chip-gold-500 text-felt-900 rounded-full font-medium text-sm">
          {yearsExperience}+ Years Experience
        </div>
      </div>
      
      <div className="pt-20 px-6 pb-6">
        <div>
          <h3 className="text-2xl font-bold font-montserrat text-white">{name}</h3>
          <p className="text-chip-gold-500 font-medium">{role}</p>
        </div>
        
        <p className="mt-4 text-gray-300">{bio}</p>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Specializations */}
          <div>
            <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-3 font-medium">Specializations</h4>
            <div className="space-y-2">
              {specializations.map((specialization, index) => (
                <div key={index} className="flex flex-col">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-300">{specialization.name}</span>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div 
                          key={i} 
                          className={`w-2 h-2 rounded-full ${i < specialization.level ? 'bg-chip-gold-500' : 'bg-gray-700'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Achievements */}
          <div>
            <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-3 font-medium">Achievements</h4>
            <ul className="space-y-2">
              {achievements.map((achievement, index) => (
                <li key={index} className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-chip-gold-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 22c3.859 0 7-3.141 7-7s-3.141-7-7-7c-3.86 0-7 3.141-7 7s3.14 7 7 7zm0-12c2.757 0 5 2.243 5 5s-2.243 5-5 5-5-2.243-5-5 2.243-5 5-5zm-1-8h2v4.5h-2v-4.5zm-3.571 1.515l1.415 1.414-3.182 3.182-1.414-1.414 3.181-3.182zm9.571 1.414l1.414-1.414 3.182 3.182-1.414 1.414-3.182-3.182z" />
                  </svg>
                  <span className="text-gray-300">{achievement.title}</span>
                  {achievement.year && (
                    <span className="text-xs text-gray-500 rounded-full bg-gray-800 px-2 py-0.5 ml-auto">
                      {achievement.year}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 