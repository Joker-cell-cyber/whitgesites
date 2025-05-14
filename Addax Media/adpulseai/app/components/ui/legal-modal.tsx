'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';
import { X } from 'lucide-react';
import { termsContent } from '@/app/legal-pages/terms';
import { privacyContent } from '@/app/legal-pages/privacy';
import { refundContent } from '@/app/legal-pages/refund';

export type LegalDocumentType = 'terms' | 'privacy' | 'refund';

interface LegalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  documentType: LegalDocumentType;
}

interface ContentSection {
  title: string;
  text: string;
  subsections?: ContentSection[];
}

interface LegalContent {
  title: string;
  lastUpdated: string;
  content: ContentSection[];
}

export const LegalModal = ({ open, onOpenChange, documentType }: LegalModalProps) => {
  const [content, setContent] = useState<LegalContent | null>(null);

  useEffect(() => {
    switch (documentType) {
      case 'terms':
        setContent(termsContent);
        break;
      case 'privacy':
        setContent(privacyContent);
        break;
      case 'refund':
        setContent(refundContent);
        break;
      default:
        setContent(null);
    }
  }, [documentType]);

  const renderText = (text: string) => {
    return text.split('\n\n').map((paragraph, index) => (
      <p key={index} className="mb-4">
        {paragraph}
      </p>
    ));
  };

  const renderSection = (section: ContentSection, index: number) => (
    <div key={index} className="mb-6">
      <h3 className="text-lg font-bold text-orange-700 mb-3">{section.title}</h3>
      <div className="text-gray-700 text-sm">{renderText(section.text)}</div>
      {section.subsections && section.subsections.length > 0 && (
        <div className="ml-4 mt-4">
          {section.subsections.map((subsection, i) => renderSection(subsection, i))}
        </div>
      )}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader className="sticky top-0 bg-white z-10 pb-2 border-b border-orange-100">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-orange-600">
              {content?.title}
            </DialogTitle>
            <button
              onClick={() => onOpenChange(false)}
              className="rounded-full p-1 hover:bg-orange-100 transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          <p className="text-sm text-gray-500">Dernière mise à jour : {content?.lastUpdated}</p>
        </DialogHeader>
        <div className="py-4">
          {content ? (
            <div className="space-y-6">
              {content.content.map((section, index) => renderSection(section, index))}
            </div>
          ) : (
            <p className="text-center text-gray-500">Chargement...</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LegalModal; 