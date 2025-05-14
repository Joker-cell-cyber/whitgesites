"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

interface LegalPopupProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab: 'terms' | 'privacy' | 'cookies';
  termsMarkdown: string;
  privacyMarkdown: string;
  cookiesMarkdown?: string;
}

export function LegalPopup({ 
  isOpen, 
  onClose, 
  initialTab, 
  termsMarkdown, 
  privacyMarkdown,
  cookiesMarkdown
}: LegalPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy' | 'cookies'>(initialTab);
  // No need for sanitized content state, ReactMarkdown handles rendering
  // No need for isLoading state related to sanitization

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    if (isOpen) { 
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  // Effect for Escape key and click outside
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  let currentMarkdown;
  if (activeTab === 'terms') {
    currentMarkdown = termsMarkdown;
  } else if (activeTab === 'privacy') {
    currentMarkdown = privacyMarkdown;
  } else if (activeTab === 'cookies') {
    currentMarkdown = cookiesMarkdown;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div
        ref={popupRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header with Tabs */}
        <div className="px-4 pt-4 border-b flex justify-between items-center">
          <div className="flex border-b -mb-px">
            <button
              onClick={() => setActiveTab('terms')}
              className={`px-4 py-2 text-sm font-medium border-b-2 ${activeTab === 'terms' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Terms and Conditions
            </button>
            <button
              onClick={() => setActiveTab('privacy')}
              className={`px-4 py-2 text-sm font-medium border-b-2 ${activeTab === 'privacy' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setActiveTab('cookies')}
              className={`px-4 py-2 text-sm font-medium border-b-2 ${activeTab === 'cookies' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Cookie Policy
            </button>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
            aria-label="Close"
          >
             <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content Area using ReactMarkdown */}
        <div className="p-6 overflow-y-auto prose prose-sm max-w-none flex-grow text-gray-900 prose-headings:text-gray-900 prose-p:text-gray-800 prose-strong:text-black prose-li:text-gray-800">
           <ReactMarkdown rehypePlugins={[rehypeRaw]}>
             {currentMarkdown}
           </ReactMarkdown>
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary-dark transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
} 