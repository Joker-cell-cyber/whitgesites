"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useFormFields } from "../../app/hooks/useFormFields";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProcessingLoader from "./LoaderProcessing";
import ErrorPopUp from "./ErrorPopUp";
import { CreditCard, Lock, Shield, Check, Star, CheckCircle, FileText, Calendar, Target } from "lucide-react";
import { COMPANY } from "../../app/constants/company";
import LegalPopup from "../ui/LegalPopup";
import LegalContent from "../../app/legal/LegalContent";

// Types
interface FormFieldOption {
    label: string;
    value: string;
}

// Product mapping for SuperOrganized (Campaign ID: 213, Product IDs: 44872-44883)
const PRODUCT_MAPPING: Record<string, { id: string; price: number; name: string; category: string; description: string; icon: string }> = {
    "9.99": { id: "44872", price: 9.99, name: "Basic Organizer", category: "starter", description: "Essential organization tools", icon: "📝" },
    "19.50": { id: "44873", price: 19.50, name: "Digital Planner", category: "standard", description: "Digital planning suite", icon: "📱" },
    "29.90": { id: "44874", price: 29.90, name: "Task Master", category: "standard", description: "Advanced task management", icon: "✅" },
    "39.99": { id: "44875", price: 39.99, name: "Goal Tracker", category: "premium", description: "Goal setting and tracking", icon: "🎯" },
    "49.90": { id: "44876", price: 49.90, name: "Productivity Pro", category: "premium", description: "Complete productivity suite", icon: "⚡" },
    "59.90": { id: "44877", price: 59.90, name: "Life Organizer", category: "complete", description: "Full life organization system", icon: "🌟" },
    "69.50": { id: "44878", price: 69.50, name: "Time Optimizer", category: "complete", description: "Time management mastery", icon: "⏰" },
    "79.90": { id: "44879", price: 79.90, name: "Efficiency Expert", category: "expert", description: "Expert efficiency tools", icon: "🚀" },
    "89.50": { id: "44880", price: 89.50, name: "Organization Elite", category: "expert", description: "Elite organization system", icon: "👑" },
    "99.99": { id: "44881", price: 99.99, name: "Master Planner", category: "master", description: "Master planning suite", icon: "🎖️" },
    "109.90": { id: "44882", price: 109.90, name: "Ultimate System", category: "master", description: "Ultimate organization system", icon: "💎" },
    "119.50": { id: "44883", price: 119.50, name: "Supreme Organizer", category: "master", description: "Supreme organization mastery", icon: "🏆" },
    "default": { id: "44876", price: 49.90, name: "Productivity Pro", category: "premium", description: "Complete productivity suite", icon: "⚡" }
};

export default function CheckoutForm() {
    const [isAgeVerified, setIsAgeVerified] = useState(false);
    const [isTermsAccepted, setIsTermsAccepted] = useState(false);
    const [isPaymentConsented, setIsPaymentConsented] = useState(false);
    const [billShipSame, setBillShipSame] = useState<number>(1);
    const [activePopup, setActivePopup] = useState<'terms' | 'privacy' | 'refund' | null>(null);
    
    // Valeurs initiales pour éviter erreurs validation
    const [formValues, setFormValues] = useState<Record<string, string>>({
        country: "US",
        shipCountry: "US",
        shipState: "CA",
        state: "CA",
        cardMonth: "01",
        cardYear: new Date().getFullYear().toString()
    });
    
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
    
    // Get search params for dynamic content
  const searchParams = useSearchParams();
    const nameParam = searchParams.get("name") || "Productivity Pro";
    const priceParam = searchParams.get("price") || "49.90";
    const descriptionParam = searchParams.get("description") || "Complete productivity suite";
    const categoryParam = searchParams.get("category") || "premium";
    
    const { shippingFieldsState, billingFieldsState, cardFieldsState, updateRegionOptions } = useFormFields();

    // Get product details dynamically from URL parameters
    const getProductDetails = () => {
        // Find matching product in mapping by price for the ID
        const validPrice = Object.keys(PRODUCT_MAPPING).find(price => 
            parseFloat(price) === parseFloat(priceParam)
        ) || "default";
            
        const mappedProduct = PRODUCT_MAPPING[validPrice as keyof typeof PRODUCT_MAPPING];
        
        // Use URL parameters for display, mapping only for product ID
        return {
            id: mappedProduct.id,
            name: decodeURIComponent(nameParam), // Decode URL encoding
            price: parseFloat(priceParam),
            category: categoryParam,
            description: decodeURIComponent(descriptionParam), // Decode URL encoding
            icon: mappedProduct.icon // Keep icon from mapping
        };
    };

    const productDetails = getProductDetails();

    // Get category color for visual distinction
    const getCategoryColor = (category: string) => {
        switch (category.toLowerCase()) {
            case 'starter': return 'text-green-600';
            case 'standard': return 'text-blue-600';
            case 'premium': return 'text-purple-600';
            case 'complete': return 'text-orange-600';
            case 'expert': return 'text-red-600';
            case 'master': return 'text-gray-900';
            default: return 'text-notion-accent-500';
        }
    };

    // Get category icon
    const getCategoryIcon = (category: string) => {
        switch (category.toLowerCase()) {
            case 'starter': return <FileText className="w-4 h-4" />;
            case 'standard': return <Calendar className="w-4 h-4" />;
            case 'premium': return <Target className="w-4 h-4" />;
            case 'complete': return <Star className="w-4 h-4" />;
            case 'expert': return <CheckCircle className="w-4 h-4" />;
            case 'master': return <Shield className="w-4 h-4" />;
            default: return <Star className="w-4 h-4" />;
        }
    };

    // Custom Checkbox Component with better visibility
    const CustomCheckbox = ({ id, checked, onChange, label, className = "" }: any) => (
        <div className="flex items-start gap-3">
            <div className="relative flex items-center justify-center">
                <Checkbox
                    id={id}
                    checked={checked}
                    onCheckedChange={onChange}
                    className={`w-6 h-6 text-notion-accent-500 focus:ring-notion-accent-500 border-2 border-notion-accent-400 rounded mt-1 shadow-lg ${className}`}
                />
            </div>
            <label htmlFor={id} className="text-sm text-gray-600 cursor-pointer">
                {label}
            </label>
        </div>
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const onlyNumericFields = [
            "shipPostalCode", "postalCode", "phoneNumber", 
            "cardNumber", "cardSecurityCode", "cardMonth", "cardYear",
        ];

        const newValue = onlyNumericFields.includes(name)
            ? value.replace(/\D/g, "")
            : value;

        setFormValues((prev) => ({ ...prev, [name]: newValue }));
    };

    const handleSelectChange = (value: string, name: string) => {
        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }));
        
        // Update regions when country changes
        if (name === "shipCountry" || name === "country") {
            updateRegionOptions(value);
        }
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: string[] = [];

        // Validation of shipping fields
        shippingFieldsState.forEach((field) => {
            if (!formValues[field.name] && field.required) {
                newErrors.push(`${field.errorMessage}`);
            }
        });

        // Validation of billing fields if different
        if (!billShipSame) {
            billingFieldsState.forEach((field) => {
                if (!formValues[field.name] && field.required) {
                    newErrors.push(`${field.errorMessage}`);
                }
            });
        }

        // Validation of credit card fields
        cardFieldsState.flat().forEach((field) => {
            if (!formValues[field.name] && field.required) {
                newErrors.push(`${field.errorMessage}`);
            }
        });

        // Validation of consent checkboxes
        if (!isAgeVerified)
            newErrors.push("You must certify that you are at least 18 years old.");
        if (!isTermsAccepted)
            newErrors.push("You must accept the terms and conditions.");
        if (!isPaymentConsented)
            newErrors.push("Please accept the payment conditions to proceed with your purchase.");

        if (newErrors.length > 0) {
            setErrorMessage(newErrors.join(" "));
      return;
    }
    
        if (!productDetails?.id) {
            console.log("Product ID is missing");
            throw new Error("Product ID is missing");
        }

        const allFormValues: Record<string, string> = {
            ...formValues,
            billShipSame: billShipSame.toString(),
            product1_id: productDetails?.id.toString(),
            paySource: "CREDITCARD",
        };

    setIsSubmitting(true);
    
        try {
            const response = await fetch("/api/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ allFormValues }),
            });
            const res = await response.json();
            
            if (res.result === "MERC_REDIRECT") {
                window.location.href = res.message.url;
            } else if (res.result === "SUCCESS") {
                router.push(`/thank-you?order_id=${res.message.orderId}`);
                return;
            } else {
                setIsSubmitting(false);
                setErrorMessage(`${res.message}`);
            }
        } catch (error) {
            console.error("Error:", error);
      setIsSubmitting(false);
        }
    };

    // Function to open a popup
    const openPopup = (popupType: 'terms' | 'privacy' | 'refund') => {
        setActivePopup(popupType);
    };

    // Function to close the popup
    const closePopup = () => {
        setActivePopup(null);
    };

    return (
        <>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Order Summary - Left Side */}
      <div className="lg:col-span-4 order-2 lg:order-1">
                    <div className="card-hand-drawn bg-white p-6 sticky top-8">
                        <h2 className="text-xl font-bold mb-6 text-black flex items-center">
                            <Star className="w-5 h-5 mr-2 text-notion-accent-500" />
                            Order Summary
                        </h2>
                        
                        {/* Product Details */}
                        <div className="border-b border-gray-200 pb-4 mb-4">
                            <div className="flex justify-between items-start mb-2">
                <div>
                                    <h3 className="font-semibold text-black flex items-center">
                                        <span className="text-2xl mr-2">{productDetails.icon}</span>
                                        {productDetails.name}
                                        <span className={`ml-2 ${getCategoryColor(productDetails.category)}`}>
                                            {getCategoryIcon(productDetails.category)}
                                        </span>
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-1">{productDetails.description}</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-2xl font-bold text-black">${productDetails.price.toFixed(2)}</span>
                </div>
                </div>
              </div>
              
                        {/* Bank Statement Info */}
                        <div className="bg-blue-50 rounded-lg p-3 mb-4">
                            <div className="flex items-center text-sm text-blue-800">
                                <Shield className="w-4 h-4 mr-2" />
                                <span>Will appear as &quot;{COMPANY.descriptor}&quot; on your statement</span>
              </div>
            </div>
            
                        {/* Security Info */}
                        <div className="bg-green-50 rounded-lg p-3">
                            <div className="flex items-center text-sm text-green-800">
                                <Lock className="w-4 h-4 mr-2" />
                                <span>Secure 256-bit SSL encryption</span>
                            </div>
                </div>
                
                        {/* Accepted Cards */}
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <p className="text-sm text-gray-600 mb-3 text-center">We accept:</p>
                            <div className="flex justify-center space-x-2">
                                <img src="/images/card-logos/visa.svg" alt="Visa" className="h-8" />
                                <img src="/images/card-logos/mastercard.svg" alt="Mastercard" className="h-8" />
                                <img src="/images/card-logos/amex.svg" alt="American Express" className="h-8" />
                                <img src="/images/card-logos/discover.svg" alt="Discover" className="h-8" />
                  </div>
                </div>
              </div>
            </div>
            
                {/* Checkout Form - Right Side */}
                <div className="lg:col-span-8 order-1 lg:order-2">
                    <div className="card-hand-drawn bg-white p-6 md:p-8">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-black mb-2 flex items-center">
                                <Lock className="w-6 h-6 mr-3 text-notion-accent-500" />
                                Payment Information
                            </h2>
                            <p className="text-gray-600">Complete your purchase securely below</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Shipping Information */}
                            <div>
                                <h3 className="text-lg font-semibold mb-4 text-black flex items-center">
                                    <Shield className="w-5 h-5 mr-2 text-notion-accent-500" />
                                    Shipping Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {shippingFieldsState.map((field) => (
                                        <div key={field.name} className={field.name === "shipAddress1" || field.name === "shipAddress2" ? "md:col-span-2" : ""}>
                                            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
                                                {field.label} {field.required && <span className="text-red-500">*</span>}
                                            </label>
                                            
                                            {field.type === "select" ? (
                                                <Select value={formValues[field.name] || ""} onValueChange={(value) => handleSelectChange(value, field.name)}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder={field.placeholder} />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {field.options && Array.isArray(field.options) && field.options.map((option: any) => (
                                                            <SelectItem key={typeof option === 'string' ? option : option.value} value={typeof option === 'string' ? option : option.value}>
                                                                {typeof option === 'string' ? option : option.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            ) : (
                                                <Input
                                                    id={field.name}
                                                    name={field.name}
                                                    type={field.type}
                                                    placeholder={field.placeholder}
                                                    value={formValues[field.name] || ""}
                                                    onChange={handleInputChange}
                                                    maxLength={field.maxLength}
                                                    required={field.required}
                                                    className="w-full"
                                                />
                                            )}
                                        </div>
                                    ))}
                </div>
              </div>
              
                            {/* Billing Address Checkbox */}
                            <CustomCheckbox 
                                id="billShipSame"
                                checked={billShipSame === 1}
                                onChange={(checked: boolean) => setBillShipSame(checked ? 1 : 0)}
                                label="Billing address is the same as shipping address"
                            />

                            {/* Billing Information - Only show if different from shipping */}
                            {billShipSame === 0 && (
                  <div>
                                    <h3 className="text-lg font-semibold mb-4 text-black flex items-center">
                                        <Shield className="w-5 h-5 mr-2 text-green-600" />
                                        Billing Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {billingFieldsState.map((field) => (
                                            <div key={field.name}>
                                                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
                                                    {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                                                
                                                {field.type === "select" ? (
                                                    <Select value={formValues[field.name] || ""} onValueChange={(value) => handleSelectChange(value, field.name)}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder={field.placeholder} />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {field.options && Array.isArray(field.options) && field.options.map((option: any) => (
                                                                <SelectItem key={typeof option === 'string' ? option : option.value} value={typeof option === 'string' ? option : option.value}>
                                                                    {typeof option === 'string' ? option : option.label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                ) : (
                                                    <Input
                                                        id={field.name}
                                                        name={field.name}
                                                        type={field.type}
                                                        placeholder={field.placeholder}
                                                        value={formValues[field.name] || ""}
                                                        onChange={handleInputChange}
                                                        maxLength={field.maxLength}
                                                        required={field.required}
                                                        className="w-full"
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                  </div>
                            )}

                            {/* Payment Information */}
                  <div>
                                <h3 className="text-lg font-semibold mb-4 text-black flex items-center">
                                    <CreditCard className="w-5 h-5 mr-2 text-notion-accent-500" />
                                    Payment Information
                                </h3>

                                {/* Credit Card Fields */}
                                {cardFieldsState.map((row, rowIndex) => (
                                    <div key={rowIndex} className={`grid gap-4 mb-4 ${row.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                                        {row.map((field) => (
                                            <div key={field.name}>
                                                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
                                                    {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                                                
                                                {field.type === "select" ? (
                                                    <Select value={formValues[field.name] || ""} onValueChange={(value) => handleSelectChange(value, field.name)}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder={field.placeholder} />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {field.options && Array.isArray(field.options) && field.options.map((option: any) => (
                                                                <SelectItem key={option} value={option}>
                                                                    {option}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                ) : (
                                                    <Input
                                                        id={field.name}
                                                        name={field.name}
                                                        type={field.type}
                                                        placeholder={field.placeholder}
                                                        value={formValues[field.name] || ""}
                                                        onChange={handleInputChange}
                                                        maxLength={field.maxLength}
                                                        required={field.required}
                                                        className="w-full"
                                                    />
                                                )}
                  </div>
                                        ))}
                </div>
                                ))}
            </div>
            
                            {/* Legal Consents */}
                            <div className="space-y-4 border-t border-gray-200 pt-6">
                                <h3 className="text-lg font-semibold text-black">Legal Agreements</h3>
                                
                                {/* Age Verification */}
                                <CustomCheckbox 
                                    id="ageVerification"
                                    checked={isAgeVerified}
                                    onChange={(checked: boolean) => setIsAgeVerified(checked)}
                                    label="I certify that I am at least 18 years old"
                                />

                                {/* Payment Consent Checkbox */}
                                <div className="p-4 bg-notion-accent-50 rounded-lg border border-notion-accent-200">
                                    <CustomCheckbox 
                                        id="paymentConsent"
                                        checked={isPaymentConsented}
                                        onChange={(checked: boolean) => setIsPaymentConsented(checked)}
                                        label={
                                            <>
                                                <span className="font-semibold">I explicitly consent</span> to be charged <span className="text-notion-accent-600 font-semibold">${productDetails.price.toFixed(2)}</span> today. 
                                                The charge will appear as &quot;<span className="text-notion-accent-600 font-semibold">{COMPANY.descriptor}</span>&quot; on my bank statement.
                                            </>
                                        }
                                        className="border-notion-accent-400"
                  />
                </div>

                                {/* Terms and Conditions Checkbox */}
                                <CustomCheckbox 
                                    id="terms"
                                    checked={isTermsAccepted}
                                    onChange={(checked: boolean) => setIsTermsAccepted(checked)}
                                    label={
                                        <>
                                            I accept the{' '}
                                            <button type="button" className="text-notion-accent-600 hover:underline" onClick={() => openPopup('terms')}>
                      Terms of Service
                                            </button>
                                            ,{' '}
                                            <button type="button" className="text-notion-accent-600 hover:underline" onClick={() => openPopup('privacy')}>
                      Privacy Policy
                                            </button>
                                            , and{' '}
                                            <button type="button" className="text-notion-accent-600 hover:underline" onClick={() => openPopup('refund')}>
                                                Refund Policy
                                            </button>
                                            .
                                        </>
                                    }
                                />
            </div>
            
            {/* Submit Button */}
                            <Button
              type="submit"
              disabled={isSubmitting}
                                className="w-full bg-notion-accent-500 hover:bg-notion-accent-600 text-black font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center text-lg button-hand-drawn"
            >
                                <Lock className="h-5 w-5 mr-2" />
                                {isSubmitting ? "Processing..." : `Complete Purchase - $${productDetails.price.toFixed(2)}`}
                            </Button>
          </form>
        </div>
      </div>
    </div>

            {errorMessage && (
                <ErrorPopUp 
                    isOpen={!!errorMessage}
                    onClose={() => setErrorMessage("")}
                    message={errorMessage}
                />
            )}
            {isSubmitting && <ProcessingLoader />}

            {activePopup && (
                <LegalPopup
                    isOpen={!!activePopup}
                    onClose={closePopup}
                    title={
                        activePopup === 'terms' ? 'Terms of Service' :
                        activePopup === 'privacy' ? 'Privacy Policy' :
                        'Refund Policy'
                    }
                >
                    <LegalContent type={activePopup === 'refund' ? 'refund' : activePopup} />
                </LegalPopup>
            )}
        </>
  );
} 