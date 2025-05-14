"use client";

import React from "react";

export default function AnimationStyles() {
  return (
    <style jsx global>{`
      @keyframes bounce-slow {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-15px);
        }
      }
      .animate-bounce-slow {
        animation: bounce-slow 3s infinite;
      }
    `}</style>
  );
} 