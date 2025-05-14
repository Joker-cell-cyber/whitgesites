import { COMPANY } from '../app/constants/company';

/**
 * Remplace les valeurs codées en dur dans un texte MDX par les variables de COMPANY
 */
export function processMdxWithCompanyVars(content: string): string {
  const replacements = [
    { pattern: /Make It Auto/g, value: COMPANY.serviceName },
    { pattern: /\(480\) 852-2213/g, value: COMPANY.phone },
    { pattern: /support@makeitauto\.com/g, value: COMPANY.email },
    { pattern: /makeitauto\.com/g, value: COMPANY.website },
    { pattern: /3063 S Sailors Way, GILBERT, AZ 85295/g, value: COMPANY.address },
    { pattern: /33-3564610/g, value: COMPANY.ein },
    { pattern: /Sunny Fog LLC/g, value: COMPANY.name },
  ];

  let processedContent = content;
  for (const { pattern, value } of replacements) {
    processedContent = processedContent.replace(pattern, value);
  }
  
  return processedContent;
}
