"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { validatePaymentInfo, processPayment, type PaymentInfo, type CustomerInfo, type OrderInfo } from "@/utils/paymentUtils";
import { COMPANY } from "@/app/constants/company";

// Types pour les packages
type TranslationType = "text" | "video";
type Package = {
  name: string;
  price: number;
  volume: string;
  features: string[];
  popular?: boolean;
};

// Available countries
const AVAILABLE_COUNTRIES = ["United States", "United Kingdom", "France"];

export default function CheckoutForm() {
  const searchParams = useSearchParams();
  const packageType = searchParams.get("type") as TranslationType || "text";
  const packageName = searchParams.get("package") || "";

  // Forfaits disponibles (identiques à ceux de PricingTabs.tsx et PricingSection.tsx)
  const packages = {
    text: [
      {
        name: "Basic",
        price: 9.99,
        volume: "Up to 500 words",
        features: ["Simple documents", "1 target language", "Standard delivery"]
      },
      {
        name: "Standard",
        price: 19.50,
        volume: "Up to 1000 words",
        features: ["Simple documents", "1 target language", "Standard delivery"]
      },
      {
        name: "Advanced",
        price: 29.90,
        volume: "Up to 2000 words",
        features: ["Business documents", "1 target language", "3-day delivery"]
      },
      {
        name: "Professional",
        price: 49.99,
        volume: "Up to 5000 words",
        features: ["Technical documents", "1 target language", "3-day delivery"],
        popular: true
      },
      {
        name: "Premium",
        price: 79.50,
        volume: "Up to 10000 words",
        features: ["All document types", "2 target languages", "48-hour delivery"]
      },
      {
        name: "Enterprise",
        price: 99.90,
        volume: "15000+ words",
        features: ["All document types", "Up to 3 target languages", "Priority delivery"]
      }
    ],
    video: [
      {
        name: "Basic",
        price: 19.99,
        volume: "Up to 5 minutes",
        features: ["Simple subtitles", "1 target language", "Standard delivery"]
      },
      {
        name: "Standard",
        price: 39.50,
        volume: "Up to 15 minutes",
        features: ["Standard subtitles", "1 target language", "Standard delivery"]
      },
      {
        name: "Advanced",
        price: 59.90,
        volume: "Up to 30 minutes",
        features: ["Advanced subtitles", "1 target language", "5-day delivery"]
      },
      {
        name: "Professional",
        price: 79.99,
        volume: "Up to 60 minutes",
        features: ["Professional subtitles", "1 target language", "3-day delivery"],
        popular: true
      },
      {
        name: "Premium",
        price: 109.50,
        volume: "Up to 90 minutes",
        features: ["Premium subtitles", "2 target languages", "48-hour delivery"]
      },
      {
        name: "Enterprise",
        price: 119.90,
        volume: "120+ minutes",
        features: ["Subtitles + dubbing", "Up to 3 target languages", "Priority delivery"]
      }
    ]
  };

  // Recherche du package sélectionné
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [isConsenting, setIsConsenting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // States pour les champs du formulaire
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "United States"
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: ""
  });

  // Recherche du package sélectionné au chargement de la page
  useEffect(() => {
    if (packageName) {
      const found = packages[packageType].find(pkg => pkg.name === packageName);
      if (found) {
        setSelectedPackage(found);
      } else {
        // Si aucun package correspondant n'est trouvé, utilisez le premier
        setSelectedPackage(packages[packageType][0]);
      }
    } else {
      // Si aucun package n'est spécifié, utilisez le premier
      setSelectedPackage(packages[packageType][0]);
    }
  }, [packageName, packageType]);

  // Handler pour les changements d'informations personnelles
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handler pour les changements d'informations de paiement
  const handlePaymentInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Formatage de la carte de crédit
    if (name === 'cardNumber') {
      const formatted = value
        .replace(/\s/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim();
      
      setPaymentInfo(prev => ({
        ...prev,
        [name]: formatted
      }));
      return;
    }
    
    // Formatage de la date d'expiration
    if (name === 'expiryDate') {
      const cleaned = value.replace(/\D/g, '');
      let formatted = cleaned;
      
      if (cleaned.length >= 3) {
        formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
      }
      
      setPaymentInfo(prev => ({
        ...prev,
        [name]: formatted
      }));
      return;
    }
    
    setPaymentInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handler pour le changement de package
  const handlePackageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const packageIndex = parseInt(e.target.value);
    setSelectedPackage(packages[packageType][packageIndex]);
  };

  // Handler pour la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!isConsenting) {
      alert("Please accept the terms and conditions before continuing.");
      return;
    }
    
    if (!selectedPackage) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulation de validation de la carte
      const isCardValid = await validatePaymentInfo(paymentInfo);
      
      if (!isCardValid) {
        alert("Payment information is invalid. Please check and try again.");
        setIsSubmitting(false);
        return;
      }
      
      // Préparation des données pour le traitement du paiement
      const customerData: CustomerInfo = {
        firstName: personalInfo.firstName,
        lastName: personalInfo.lastName,
        email: personalInfo.email,
        phone: personalInfo.phone,
        country: personalInfo.country
      };
      
      const orderData: OrderInfo = {
        packageName: selectedPackage.name,
        packageType: packageType,
        price: selectedPackage.price,
        totalPrice: selectedPackage.price // Total price is just the package price without tax
      };
      
      // Simulation du traitement du paiement
      const { success, transactionId } = await processPayment(
        paymentInfo,
        customerData,
        orderData
      );
      
      if (success) {
        // Si tout est réussi, afficher le message de succès
        setIsSuccess(true);
      } else {
        alert("Le paiement n'a pas pu être traité. Veuillez réessayer plus tard.");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Une erreur est survenue lors du traitement de votre paiement. Veuillez réessayer plus tard.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Added payment descriptor notification
  const PaymentDescriptor = () => (
    <div className="mt-4 p-4 bg-blue-900/20 border border-blue-800/30 rounded-md">
      <p className="text-blue-400 text-sm">
        Charges will appear as &quot;{COMPANY.serviceName}&quot; on your bank statement.
      </p>
    </div>
  );

  // Si aucun package n'est sélectionné (pendant le chargement), afficher un loader
  if (!selectedPackage) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Si la commande a réussi, afficher un message de succès
  if (isSuccess) {
    return (
      <div className="max-w-3xl mx-auto bg-gray-800/50 rounded-xl p-8 border border-gray-700">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Order Confirmed!</h2>
          <p className="text-gray-400">
            Your order has been successfully processed. You will receive a confirmation email shortly.
          </p>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-medium text-white mb-4">Order Summary</h3>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Package:</span>
            <span className="text-white font-medium">{selectedPackage.name} ({packageType === 'text' ? 'Text' : 'Video'})</span>
          </div>
          <div className="border-t border-gray-700 pt-4 mt-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total:</span>
              <span className="text-xl font-bold text-white">${selectedPackage.price}</span>
            </div>
          </div>
        </div>
        
        <a 
          href="/"
          className="block w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg text-center hover:from-blue-700 hover:to-indigo-700 transition-colors"
        >
          Return to Homepage
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 bg-[#0a1221]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-8 text-center text-white">Complete Your Purchase</h1>
          
          <form onSubmit={handleSubmit} className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Colonne gauche: formulaire */}
              <div className="lg:col-span-7">
                {/* Section: Package sélectionné */}
                <div className="bg-gray-800/50 rounded-xl p-6 mb-8 border border-gray-700">
                  <h2 className="text-xl font-bold text-white mb-4">Selected Package</h2>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Translation Type</label>
                      <div className="text-white py-2 px-3 bg-gray-800 rounded-lg border border-gray-700">
                        {packageType === 'text' ? 'Text Translation' : 'Video Translation'}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="packageSelect" className="block text-sm font-medium text-gray-400 mb-1">Package</label>
                      <select 
                        id="packageSelect"
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-blue-500 focus:border-blue-500"
                        value={packages[packageType].findIndex(pkg => pkg.name === selectedPackage.name)}
                        onChange={handlePackageChange}
                      >
                        {packages[packageType].map((pkg, index) => (
                          <option key={index} value={index}>
                            {pkg.name} - ${pkg.price}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-white">{selectedPackage.name}</h3>
                      <span className="text-xl font-bold text-white">${selectedPackage.price}</span>
                    </div>
                    <div className="text-sm text-gray-400 mb-3">{selectedPackage.volume}</div>
                    <ul className="space-y-1">
                      {selectedPackage.features.map((feature, idx) => (
                        <li key={idx} className="text-gray-400 text-sm flex items-start">
                          <svg className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Section: Informations personnelles */}
                <div className="bg-gray-800/50 rounded-xl p-6 mb-8 border border-gray-700">
                  <h2 className="text-xl font-bold text-white mb-4">Personal Information</h2>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-400 mb-1">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        value={personalInfo.firstName}
                        onChange={handlePersonalInfoChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-400 mb-1">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        value={personalInfo.lastName}
                        onChange={handlePersonalInfoChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={personalInfo.email}
                      onChange={handlePersonalInfoChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-1">Phone</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={personalInfo.phone}
                        onChange={handlePersonalInfoChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-400 mb-1">Country</label>
                      <select
                        id="country"
                        name="country"
                        required
                        value={personalInfo.country}
                        onChange={handlePersonalInfoChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-blue-500 focus:border-blue-500"
                      >
                        {AVAILABLE_COUNTRIES.map(country => (
                          <option key={country} value={country}>{country}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                
                {/* Section: Informations de paiement */}
                <div className="bg-gray-800/50 rounded-xl p-6 mb-8 border border-gray-700">
                  <h2 className="text-xl font-bold text-white mb-4">Payment Information</h2>
                  
                  <div className="mb-4">
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-400 mb-1">Card Number</label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      maxLength={19}
                      placeholder="1234 5678 9012 3456"
                      required
                      value={paymentInfo.cardNumber}
                      onChange={handlePaymentInfoChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-400 mb-1">Expiration Date</label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        placeholder="MM/YY"
                        maxLength={5}
                        required
                        value={paymentInfo.expiryDate}
                        onChange={handlePaymentInfoChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-gray-400 mb-1">CVV</label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        placeholder="123"
                        maxLength={3}
                        required
                        value={paymentInfo.cvv}
                        onChange={handlePaymentInfoChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  
                  <PaymentDescriptor />
                </div>
              </div>
              
              {/* Colonne droite: récapitulatif et confirmation */}
              <div className="lg:col-span-5">
                <div className="sticky top-24">
                  <div className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700">
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
                      
                      <div className="space-y-4 mb-6">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Package</span>
                          <span className="text-white">{selectedPackage.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Type</span>
                          <span className="text-white">{packageType === 'text' ? 'Text Translation' : 'Video Translation'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Volume</span>
                          <span className="text-white">{selectedPackage.volume}</span>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-700 pt-4 mb-6">
                        <div className="flex justify-between items-center mt-4 text-lg font-bold">
                          <span className="text-white">Total</span>
                          <span className="text-white">${selectedPackage.price}</span>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <label className="flex items-start cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={isConsenting}
                            onChange={() => setIsConsenting(!isConsenting)}
                            required
                          />
                          <div className="relative w-5 h-5 mr-3 mt-0.5 bg-gray-700 rounded border border-gray-600 peer-checked:bg-blue-600 peer-checked:border-blue-600 flex-shrink-0">
                            <svg 
                              className={`absolute inset-0 w-full h-full text-white ${isConsenting ? 'opacity-100' : 'opacity-0'}`} 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-sm text-gray-400">
                            I accept the <a href="/legal/terms" className="text-blue-400 hover:text-blue-300">terms and conditions</a> and authorize the charge to my credit card for the amount shown above.
                          </span>
                        </label>
                      </div>
                      
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-3 rounded-lg font-medium text-white flex items-center justify-center
                          ${isSubmitting 
                            ? 'bg-gray-700 cursor-not-allowed' 
                            : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                          }`}
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          "Confirm Order"
                        )}
                      </button>
                      
                      <div className="mt-4 text-center">
                        <p className="text-xs text-gray-500">
                          Secure payment - Your information is encrypted and secured
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
} 