'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

function ThankYouPageContent() {
    const searchParams = useSearchParams();
    const order_id = searchParams.get("order_id");

    return (
        <div className="min-h-screen bg-white py-8">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors button-hand-drawn px-4 py-2 rounded-lg"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </Link>
                </div>

                <div className="card-hand-drawn bg-white p-8 md:p-12 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <CheckCircle className="text-notion-accent-500 w-20 h-20" />
                            <div className="absolute inset-0 bg-notion-accent-500/20 rounded-full animate-ping"></div>
                        </div>
                    </div>
                    
                    <h1 className="text-3xl md:text-4xl font-bold text-black mb-4 hand-drawn-accent">
                        Thank You for Your Order!
                    </h1>
                    
                    <p className="text-lg text-gray-600 mb-6">
                        Your SuperOrganized purchase has been successfully completed and is being processed.
                    </p>
                    
                    <div className="card-hand-drawn bg-gray-50 p-6 mb-6 inline-block">
                        <p className="text-sm text-gray-500 mb-2">Order ID</p>
                        <p className="text-xl font-mono font-semibold text-black">
                            #{order_id}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ThankYouPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="h-12 w-12 text-notion-accent-500 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Loading confirmation...</p>
                </div>
            </div>
        }>
            <ThankYouPageContent />
        </Suspense>
    );
} 