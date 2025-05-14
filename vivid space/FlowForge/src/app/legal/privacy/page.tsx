import LegalContent from '../LegalContent';

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-16 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">Privacy Policy</h1>
      <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
        <LegalContent type="privacy" />
      </div>
    </div>
  );
} 