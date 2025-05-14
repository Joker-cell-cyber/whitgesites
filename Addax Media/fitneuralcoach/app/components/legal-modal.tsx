'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { privacyContent } from '../legal-pages/privacy';
import { refundContent } from '../legal-pages/refund';
import { termsContent } from '../legal-pages/terms';

type LegalModalProps = {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms' | 'refund';
};

export default function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  const content = {
    privacy: privacyContent,
    terms: termsContent,
    refund: refundContent,
  }[type];

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-bold leading-6 text-gray-900 mb-6"
                >
                  {content.title}
                </Dialog.Title>
                <div className="mt-2 max-h-[70vh] overflow-y-auto">
                  {content.content.map((section, index) => (
                    <div key={index} className="mb-8">
                      <h4 className="text-xl font-semibold text-gray-900 mb-4">
                        {section.title}
                      </h4>
                      <div className="text-gray-600 whitespace-pre-line">
                        {section.text}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={onClose}
                  >
                    Fermer
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
} 