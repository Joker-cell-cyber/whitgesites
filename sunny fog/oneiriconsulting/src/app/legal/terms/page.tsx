import fs from 'fs';
import path from 'path';
import { Metadata } from 'next';
import { COMPANY } from '../../constants/company';
import { processMdxWithCompanyVars } from '@/lib/mdx-utils';

export const metadata: Metadata = {
  title: `Terms of Service | ${COMPANY.name}`,
};

export default function TermsPage() {
  // Lire le fichier MDX
  const mdxPath = path.join(process.cwd(), 'src/app/legal/terms.mdx');
  let content = fs.readFileSync(mdxPath, 'utf8');

  // Remplacer les valeurs codées en dur par les variables de COMPANY
  content = processMdxWithCompanyVars(content);
  
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="prose prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
} 