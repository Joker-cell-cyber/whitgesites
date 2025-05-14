"use client";

interface PackageDetails {
  name: string;
  price: number;
  length: string;
}

interface OrderSummaryProps {
  packageDetails: PackageDetails;
}

export default function OrderSummary({ packageDetails }: OrderSummaryProps) {
  const { name, price, length } = packageDetails;
  
  // The price is final with no additional taxes
  const total = price;
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Order Summary</h2>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Package:</span>
          <span className="font-medium text-gray-800">{name}</span>
        </div>
        
        {length && (
          <div className="flex justify-between">
            <span className="text-gray-600">Length:</span>
            <span className="text-gray-800">{length}</span>
          </div>
        )}
        
        <div className="border-t pt-4 flex justify-between">
          <span className="font-semibold text-gray-800">Total (final price):</span>
          <span className="font-bold text-blue-600">${total.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-md mb-6">
        <h3 className="font-medium text-gray-700 mb-2">What's included:</h3>
        <ul className="space-y-2">
          <li className="flex">
            <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-600">Custom script for your content</span>
          </li>
          <li className="flex">
            <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-600">Professional formatting</span>
          </li>
          <li className="flex">
            <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-600">Revisions as per package</span>
          </li>
          <li className="flex">
            <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-600">Fast delivery time</span>
          </li>
        </ul>
      </div>
      
      <div className="text-sm text-gray-500">
        <p>
          Questions about your order? <a href="/contact" className="text-blue-600 hover:text-blue-800">Contact us</a>.
        </p>
      </div>
    </div>
  );
} 