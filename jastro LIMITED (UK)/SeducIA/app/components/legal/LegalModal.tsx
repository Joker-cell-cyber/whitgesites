'use client';

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X } from 'lucide-react';
import { termsContent } from '@/app/legal-pages/terms';
import { privacyContent } from '@/app/legal-pages/privacy';
import { legalContent } from '@/app/legal-pages/legal';
import { refundContent } from '@/app/legal-pages/refund';

type LegalType = 'terms' | 'privacy' | 'legal' | 'refund';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  legalType: LegalType;
}

export default function LegalModal({ isOpen, onClose, legalType }: LegalModalProps) {
  const getContent = () => {
    switch (legalType) {
      case 'terms':
        return termsContent;
      case 'privacy':
        return privacyContent;
      case 'legal':
        return legalContent;
      case 'refund':
        return refundContent;
      default:
        return termsContent;
    }
  };

  const content = getContent();

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
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
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
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-xl bg-[#FAF8F4] border border-[#F1EDE8] p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title as="h3" className="text-xl font-bold text-[#45301C]">
                    {content.title}
                  </Dialog.Title>
                  <button
                    type="button"
                    className="text-[#64748b] hover:text-[#45301C] transition-colors"
                    onClick={onClose}
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="max-h-[70vh] overflow-y-auto pr-2 text-[#45301C] scrollbar-thin scrollbar-thumb-[#E46D4B]/20 scrollbar-track-transparent">
                  {content.content.map((section, index) => (
                    <div key={index} className="mb-6">
                      <h4 className="text-lg font-semibold text-[#E46D4B] mb-2">{section.title}</h4>
                      <div className="text-sm space-y-2">
                        {section.text.split('\n\n').map((paragraph, pIndex) => (
                          <p key={pIndex}>{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    className="px-4 py-2 bg-[#E46D4B] hover:bg-[#D85A36] text-white font-medium rounded-lg transition-colors"
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