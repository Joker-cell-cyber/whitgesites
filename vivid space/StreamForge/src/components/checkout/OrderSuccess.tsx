import React from 'react';
import Link from 'next/link';
import { CheckIcon } from '@heroicons/react/24/outline';

interface OrderSuccessProps {
  packageName: string;
}

export default function OrderSuccess({ packageName }: OrderSuccessProps) {
  return (
    <div className="min-h-screen pt-16 pb-12 flex flex-col bg-[--cyber-deep]">
      <div className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex-shrink-0 flex justify-center">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[--neon-blue]/20">
            <CheckIcon className="h-8 w-8 text-[--neon-blue]" aria-hidden="true" />
          </div>
        </div>
        <div className="py-16 text-center">
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-white">Order Received!</h1>
          <p className="mt-4 text-lg text-gray-300">
            Thank you for your order. We've received your mock payment for the {packageName} package.
          </p>
          <div className="mt-10">
            <Link 
              href="/"
              className="inline-flex items-center rounded-md border border-transparent bg-[--neon-blue] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[--neon-blue]/80 focus:outline-none focus:ring-2 focus:ring-[--neon-blue] focus:ring-offset-2"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 