import React from "react";

interface PersonalInfoFormProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nextStep: () => void;
}

export default function PersonalInfoForm({ formData, handleChange, nextStep }: PersonalInfoFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-6">Personal Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-1">
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full bg-[#0a0a14] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-ai-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-1">
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full bg-[#0a0a14] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-ai-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <div className="mb-6">
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full bg-[#0a0a14] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-ai-blue-500 focus:border-transparent"
        />
      </div>
      
      <div className="mb-8">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full bg-[#0a0a14] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-ai-blue-500 focus:border-transparent"
        />
        <p className="text-gray-500 text-xs mt-1">For order notifications (optional)</p>
      </div>
      
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!formData.firstName || !formData.lastName || !formData.email}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-ai-blue-600 to-ai-purple-600 text-white font-medium hover:from-ai-blue-700 hover:to-ai-purple-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
} 