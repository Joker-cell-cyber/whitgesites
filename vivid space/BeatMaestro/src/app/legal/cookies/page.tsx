import { Metadata } from 'next';
import { cookiesContent } from './cookies-content';

export const metadata: Metadata = {
  title: 'Cookie Policy - BeatMaestro',
  description: 'Cookie policy for BeatMaestro, explaining how we use cookies on our website.',
};

export default function CookiesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="prose prose-invert prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: cookiesContent }} />
        </div>
      </div>
    </div>
  );
} 